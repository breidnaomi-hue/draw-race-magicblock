import test from 'node:test';
import assert from 'node:assert/strict';
import {createKeyPairSignerFromPrivateKeyBytes,createTransactionMessage,setTransactionMessageFeePayer,setTransactionMessageLifetimeUsingBlockhash,appendTransactionMessageInstructions,compileTransaction,getBase64EncodedWireTransaction,getTransactionDecoder,signTransaction,address,blockhash} from '@solana/kit';
import {createRoom,act,progressRandomness,publicRoom,type Store} from '../lib/rooms';
import {acceptStakes,progressStakes,prepareStakeDeposit,submitStakeDeposit} from '../lib/stake-rooms';
import {validateSignedDeposit,type EscrowService} from '../lib/sol-escrow';
import {parseSol,formatSol,validateStake,stakeDistribution,bankAddresses,receiptAddress,depositInstruction,type StakeState,type BankState} from '../lib/sol-stakes';
import {attachTape,randomHex,sha,type Room} from '../lib/game';
import {vrfSeedInput,fromBase64,DRAW_RACE_VRF_PROGRAM,type VrfProof} from '../lib/vrf';
import {exampleHorse} from '../lib/drawing';
import type {VrfService} from '../lib/solana-vrf';
const programId='9aT2ra9HdSrVLv7gBmCaZbW3DGu22XDCfXS3CEQAeCux',operator='CH8xVUgsf5CLXWUce7S61HD8fBcGNDMXgq5mwruMoKhW';
const signer=(n:number)=>createKeyPairSignerFromPrivateKeyBytes(new Uint8Array(32).fill(n));
class Memory implements Store{map=new Map<string,Room>();async get(code:string){return structuredClone(this.map.get(code)||null)}async create(r:Room){this.map.set(r.code,structuredClone(r));return true}async save(r:Room,previous:number){if(this.map.get(r.code)?.revision!==previous)return false;this.map.set(r.code,structuredClone(r));return true}}
class Chain implements EscrowService{
 programId=programId;configured=true;prepares=0;sends:string[]=[];failSend=false;pending=false;bankState:BankState|null=null;created:BankState|null=null;settled:{winner:number;hash:string}|null=null;
 async operator(){return operator}
 async prepareInit(s:StakeState,commitment:string){this.prepares++;await new Promise(r=>setTimeout(r,5));const {bank}=await bankAddresses(programId,operator,'0');this.created={capacity:s.wallets.length as 2|4,status:'funding',paidMask:0,amountLamports:s.amountLamports,feeBps:s.feeBps,nonce:'0',operator,treasury:s.treasury,commitment,receipt:await receiptAddress(operator,commitment),wallets:s.wallets,fundingDeadline:Date.now()+600000,fundedAt:0,settlementDeadline:0,timeout:600};return {bank,nonce:'0',signature:'init-signature',transaction:'exact-init-wire',lastValidBlockHeight:123};}
 async bank(){return this.bankState}
 async prepareDeposit(s:StakeState,wallet:string,index:number){
  let m=setTransactionMessageFeePayer(address(wallet),createTransactionMessage({version:0}));const l=setTransactionMessageLifetimeUsingBlockhash({blockhash:blockhash('11111111111111111111111111111111'),lastValidBlockHeight:BigInt(123)},m);
  const tx=compileTransaction(appendTransactionMessageInstructions([depositInstruction(programId,s.bank!,wallet,index)],l));return {transaction:getBase64EncodedWireTransaction(tx),message:btoa(String.fromCharCode(...tx.messageBytes)),lastValidBlockHeight:123};
 }
 async prepareSettle(s:StakeState,c:string,winner:number,hash:string){this.settled={winner,hash};return {transaction:'exact-payout-wire',signature:'payout-signature',lastValidBlockHeight:123};}
 async prepareRefund(){return {transaction:'exact-refund-wire',signature:'refund-signature',lastValidBlockHeight:123};}
 async state(){return this.pending?'pending' as const:'confirmed' as const}
 async broadcast(wire:string){this.sends.push(wire);if(wire==='exact-init-wire')this.bankState=this.created;if(wire==='exact-payout-wire'||wire==='exact-refund-wire')this.bankState=null;if(this.failSend)throw Error('Lost broadcast response');return 'signature';}
 async closure(){return null}
 async initialization(){return this.bankState?'init-signature':null}
}
async function setup(){
 const db=new Memory(),keys=await Promise.all([signer(11),signer(12)]),tokens=[randomHex(),randomHex()],chain=new Chain();
 const created=await createRoom(db,tokens[0],'One',2,Date.now(),{vrf:true,stake:{amountLamports:'20000000',feeBps:500,programId,operator,treasury:operator}}),code=created.room.code;
 await act(db,code,tokens[1],'join',{name:'Two'});return {db,keys,tokens,chain,code};
}
async function lock(s:Awaited<ReturnType<typeof setup>>){for(let i=0;i<2;i++){const r=(await s.db.get(s.code))!;await acceptStakes(s.db,s.code,s.tokens[i],s.keys[i].address,r.stake!.termsHash);await act(s.db,s.code,s.tokens[i],'ready',{drawing:exampleHorse(),nonce:randomHex()},Date.now(),{wallet:s.keys[i].address});}}
test('SOL amounts use exact integer lamports; party amount is fixed and fee is 5% of the pool',()=>{
 assert.equal(parseSol('0.020000001'),BigInt(20000001));assert.equal(formatSol('20000001'),'0.020000001');
 for(const v of ['0.0000000001','NaN','1e-3','-1','1,5',1])assert.throws(()=>parseSol(v));
 assert.throws(()=>validateStake(2,'0.019999999'));assert.throws(()=>validateStake(2,'1.000000001'));
 assert.equal(validateStake(4,'999'),BigInt(14000000));assert.deepEqual(stakeDistribution('14000000',4,500),{pot:'56000000',fee:'2800000',prize:'53200000'});
});
test('ready requires current verified wallet and acceptance; two seats cannot share a wallet',async()=>{
 const s=await setup(),terms=(await s.db.get(s.code))!.stake!.termsHash;
 await assert.rejects(act(s.db,s.code,s.tokens[0],'ready',{drawing:exampleHorse(),nonce:randomHex()}),/accept/);
 await assert.rejects(acceptStakes(s.db,s.code,s.tokens[0],s.keys[0].address,'stale'),/changed/);
 await acceptStakes(s.db,s.code,s.tokens[0],s.keys[0].address,terms);
 await assert.rejects(acceptStakes(s.db,s.code,s.tokens[1],s.keys[0].address,terms),/different/);
 await assert.rejects(act(s.db,s.code,s.tokens[0],'ready',{drawing:exampleHorse(),nonce:randomHex()},Date.now(),{wallet:s.keys[1].address}),/Connect/);
});
test('one durable init survives concurrent clients and a lost broadcast response; room hides signed wires',async()=>{
 const s=await setup();await lock(s);s.chain.failSend=true;
 await Promise.all([progressStakes(s.db,s.code,s.tokens[0],s.chain),progressStakes(s.db,s.code,s.tokens[1],s.chain)]);
 let r=(await s.db.get(s.code))!;assert.equal(s.chain.prepares,1);assert.equal(r.stake!.pending!.transaction,'exact-init-wire');assert.match(r.stake!.error!,/Lost/);
 assert.equal((publicRoom(r).stake as any).pending,undefined);assert.equal((publicRoom(r).stake as any).leaseUntil,undefined);
 s.chain.failSend=false;s.chain.pending=true;await progressStakes(s.db,s.code,s.tokens[0],s.chain,Date.now()+10000);assert.deepEqual(s.chain.sends,['exact-init-wire','exact-init-wire']);
 s.chain.pending=false;await progressStakes(s.db,s.code,s.tokens[0],s.chain,Date.now()+20000);r=(await s.db.get(s.code))!;assert.equal(r.stake!.initSignature,'init-signature');assert.equal(s.chain.prepares,1);
 for(const action of ['reset','rematch','kick','leave'])await assert.rejects(act(s.db,s.code,s.tokens[0],action),/payout or refund/);
});
test('MagicBlock is never called before every deposit; client-supplied winner cannot settle early',async()=>{
 const s=await setup();await lock(s);let calls=0;const vrf={prepare:async()=>{calls++;throw Error('Should not run')}} as unknown as VrfService;
 await assert.rejects(progressRandomness(s.db,s.code,s.tokens[0],vrf),/deposit/);assert.equal(calls,0);
 await progressStakes(s.db,s.code,s.tokens[0],s.chain);await progressStakes(s.db,s.code,s.tokens[0],s.chain,Date.now()+5000);
 s.chain.bankState!.paidMask=3;s.chain.bankState!.status='funded';s.chain.bankState!.fundedAt=Date.now();s.chain.bankState!.settlementDeadline=Date.now()+600000;
 await progressStakes(s.db,s.code,s.tokens[0],s.chain,Date.now()+10000);assert.equal((await s.db.get(s.code))!.stake!.status,'funded');assert.equal(s.chain.settled,null);
 const r=(await s.db.get(s.code))!,commitment=r.randomness!.commitment!,randomness='aa'.repeat(32),proof:VrfProof={provider:'magicblock-vrf',cluster:'devnet',programId:DRAW_RACE_VRF_PROGRAM,account:'receipt',payer:operator,commitment,randomness,requestSignature:'request',fulfillmentSignature:'oracle',requestSlot:1,fulfillmentSlot:2,feeLamports:500000},seed=await sha(vrfSeedInput(commitment,randomness));
 const {token,...first}=r.players[0],{token:token2,...second}=r.players[1];
 r.race=await attachTape({seed,secret:r.secret,startAt:Date.now()+5000,duration:90000,track:parseInt(seed.slice(2,4),16)%3,round:r.round,players:[first,second],commitment:r.commitment,version:r.randomness!.version!,vrf:proof});r.revision++;assert.ok(await s.db.save(r,r.revision-1));
 await progressStakes(s.db,s.code,s.tokens[0],s.chain,Date.now()+15000);assert.equal(s.chain.settled,null);
 const finished=(await s.db.get(s.code))!;finished.race!.startAt=Date.now()-100000;finished.revision++;await s.db.save(finished,finished.revision-1);
 await progressStakes(s.db,s.code,s.tokens[0],s.chain,Date.now()+20000);assert.deepEqual(s.chain.settled,{winner:finished.race!.tape!.ranking[0],hash:finished.race!.tape!.hash});
 await progressStakes(s.db,s.code,s.tokens[0],s.chain,Date.now()+25000);const paid=(await s.db.get(s.code))!;assert.equal(paid.stake!.status,'settled');assert.equal(paid.race!.stake!.settlementSignature,'payout-signature');assert.equal(paid.stake!.prizeLamports,'38000000');
 await act(s.db,s.code,s.tokens[0],'reset');const next=(await s.db.get(s.code))!;assert.equal(next.round,2);assert.notEqual(next.stake!.termsHash,paid.stake!.termsHash);assert.equal(next.stake!.bank,undefined);assert.ok(next.players.every(p=>!p.stakeAccepted));assert.equal(next.history[0].stake!.status,'settled');
});
test('wallet deposits require the exact message and signature; accepted bytes persist before send',async()=>{
 const s=await setup();await lock(s);await progressStakes(s.db,s.code,s.tokens[0],s.chain);await progressStakes(s.db,s.code,s.tokens[0],s.chain,Date.now()+5000);
 const prepared=await prepareStakeDeposit(s.db,s.code,s.tokens[0],s.keys[0].address,s.chain),plan=prepared.room.stake!.depositPlans![s.keys[0].address],unsigned=getTransactionDecoder().decode(fromBase64(plan.transaction));
 const signed=await signTransaction([s.keys[0].keyPair],unsigned),wire=getBase64EncodedWireTransaction(signed);
 assert.ok(await validateSignedDeposit(plan,s.keys[0].address,wire));
 await assert.rejects(validateSignedDeposit(plan,s.keys[1].address,wire),/enrolled/);
 const altered={...plan,message:plan.message.slice(0,-4)+'AAAA'};await assert.rejects(validateSignedDeposit(altered,s.keys[0].address,wire),/changed/);
 const bytes=fromBase64(wire);bytes[3]^=1;await assert.rejects(validateSignedDeposit(plan,s.keys[0].address,btoa(String.fromCharCode(...bytes))),/signature/);
 s.chain.failSend=true;await assert.rejects(submitStakeDeposit(s.db,s.code,s.tokens[0],s.keys[0].address,wire,s.chain),/Lost/);
 const r=(await s.db.get(s.code))!;assert.equal(r.stake!.depositPlans![s.keys[0].address].signed,wire);assert.equal((publicRoom(r).stake as any).depositPlans,undefined);
});
test('partial funding refund prevents round reset until confirmed, then clears terms on reset',async()=>{
 const s=await setup();await lock(s);await progressStakes(s.db,s.code,s.tokens[0],s.chain);await progressStakes(s.db,s.code,s.tokens[0],s.chain,Date.now()+5000);
 s.chain.bankState!.paidMask=1;await progressStakes(s.db,s.code,s.tokens[0],s.chain,Date.now()+10000,true);assert.equal((await s.db.get(s.code))!.stake!.pending!.action,'refund');
 await assert.rejects(act(s.db,s.code,s.tokens[0],'reset'),/refund/);await progressStakes(s.db,s.code,s.tokens[0],s.chain,Date.now()+15000);assert.equal((await s.db.get(s.code))!.stake!.status,'refunded');
 await act(s.db,s.code,s.tokens[0],'reset');assert.equal((await s.db.get(s.code))!.stake!.status,'drawing');
});
