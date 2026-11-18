/** Real-chain integration exercise. Test SOL only; requires the local ignored sponsor seed. */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createKeyPairSignerFromPrivateKeyBytes,getBase64EncodedWireTransaction,getTransactionDecoder,signTransaction,type Instruction} from '@solana/kit';
import {getTransferSolInstruction} from '@solana-program/system';
import {api,type Store} from '../lib/rooms';
import {randomHex,sha,type Room,type PublicRoom} from '../lib/game';
import {MagicBlockVrf,assertDevnet,rpcCall,signedWire} from '../lib/solana-vrf';
import {SolEscrow} from '../lib/sol-escrow';
import {bankAddresses,depositInstruction,initializeBankInstruction,receiptAddress,refundInstruction,settleInstruction,stakeDistribution,type StakeState} from '../lib/sol-stakes';
import {DRAW_RACE_VRF_PROGRAM,fromBase64,fromHex,explorer} from '../lib/vrf';
import {exampleHorse} from '../lib/drawing';
if(!process.argv.includes('--run'))throw Error('Pass --run to spend free Devnet test SOL. This script rejects Mainnet.');
const rpc=process.env.SOLANA_RPC_URL||'https://rpc.magicblock.app/devnet';await assertDevnet(rpc);
const root=new URL('../',import.meta.url),deployment=JSON.parse(await readFile(new URL('docs/escrow/deployment.json',root),'utf8'));
const secrets=JSON.parse(await readFile(new URL('.sites-runtime/vrf-devnet-secrets.json',root),'utf8'));
const testFile=new URL('.sites-runtime/escrow-test-secrets.json',root);
const test=await readFile(testFile,'utf8').then(JSON.parse).catch(async()=>{const data={players:Array.from({length:4},()=>randomHex())};await writeFile(testFile,JSON.stringify(data),{mode:0o600});return data;});
const payer=await createKeyPairSignerFromPrivateKeyBytes(fromHex(secrets.sponsor)),players=await Promise.all(test.players.map((seed:string)=>createKeyPairSignerFromPrivateKeyBytes(fromHex(seed))));
const env={ESCROW_PROGRAM_ID:deployment.programId,VRF_PROGRAM_ID:DRAW_RACE_VRF_PROGRAM,VRF_SPONSOR_SEED:secrets.sponsor,SOLANA_RPC_URL:rpc};
const service=new SolEscrow(env),vrf=new MagicBlockVrf(env),tokens=players.map(()=>randomHex());
const walletFor=new Map(tokens.map((t:string,i:number)=>[t,players[i].address]));
class Memory implements Store {map=new Map<string,Room>();async get(code:string){return structuredClone(this.map.get(code)||null)}async create(room:Room){this.map.set(room.code,structuredClone(room));return true}async save(room:Room,previous:number){if(this.map.get(room.code)?.revision!==previous)return false;this.map.set(room.code,structuredClone(room));return true}}
const db=new Memory(),sleep=(ms:number)=>new Promise(resolve=>setTimeout(resolve,ms));
const report:any={cluster:'devnet',programId:deployment.programId,operator:payer.address,startedAt:new Date().toISOString(),races:[],checks:[]};
await mkdir(new URL('docs/escrow/',root),{recursive:true});
const save=()=>writeFile(new URL('docs/escrow/live-evidence.json',root),JSON.stringify(report,null,2)+'\n');
async function call(path:string,i=0,data?:unknown){const response=await api(new Request('https://draw-race.test'+path,{method:data===undefined?'GET':'POST',headers:{Authorization:'Bearer '+tokens[i]},body:data===undefined?undefined:JSON.stringify(data)}),db,'poll',vrf,{service,verifiedWallet:async token=>{const w=walletFor.get(token);if(!w)throw Error('Wallet not verified');return w;}});const result:any=await response.json();if(!response.ok)throw Error(response.status+' '+JSON.stringify(result));return result;}
async function confirmed(wire:{transaction:string;signature:string;lastValidBlockHeight:number}){await service.broadcast(wire.transaction);for(let i=0;i<60;i++){const s=await service.state(wire.signature,wire.lastValidBlockHeight);if(s==='confirmed')return wire.signature;if(s==='failed'||s==='expired')throw Error('Transaction '+s);await sleep(1000);}throw Error('Confirmation timeout');}
async function rejectIx(ix:Instruction,payerOverride=payer,label='Rejected invalid instruction'){await assert.rejects(signedWire(rpc,payerOverride,[ix]),/simulation failed/);report.checks.push({label,passed:true,type:'Devnet simulation rejection'});console.log(label);await save();}
for(const player of players){const balance=(await rpcCall(rpc,'getBalance',[player.address,{commitment:'confirmed'}])).value;if(balance<70000000){const topup=80000000-balance;const wire=await signedWire(rpc,payer,[getTransferSolInstruction({source:payer,destination:player.address,amount:topup})]);await confirmed(wire);console.log('Funded test wallet '+player.address);}}
async function start(capacity:2|4){
 const created=await call('/api/rooms',0,{capacity,name:'Test rider 1',stake:true,amountSol:'0.02'}),code=created.room.code;
 for(let i=1;i<capacity;i++)await call('/api/rooms/'+code+'/join',i,{name:'Test rider '+(i+1)});
 for(let i=0;i<capacity;i++)await call('/api/rooms/'+code+'/stakeaccept',i,{termsHash:created.room.stake.termsHash});
 for(let i=0;i<capacity;i++)await call('/api/rooms/'+code+'/ready',i,{drawing:exampleHorse(i%3),name:'Test rider '+(i+1),nonce:randomHex()});
 const locked=(await db.get(code))!;await assert.rejects((async()=>{const r=await call('/api/rooms/'+code+'/randomness',0,{});return r;})(),/deposit/);
 let r:PublicRoom;for(let attempt=0;attempt<30;attempt++){r=(await call('/api/rooms/'+code+'/stakeprogress',0,{})).room;if(r.stake!.initSignature)break;await sleep(3000);}r=(await call('/api/rooms/'+code)).room;assert.ok(r.stake!.initSignature,r.stake!.error);
 const stake=r.stake!,before=await Promise.all(players.slice(0,capacity).map(async p=>(await rpcCall(rpc,'getBalance',[p.address,{commitment:'confirmed'}])).value));
 await rejectIx(depositInstruction(service.programId,stake.bank!,players[capacity===2?2:1].address,0),players[capacity===2?2:1],'Wrong wallet cannot deposit into another seat');
 for(let i=0;i<capacity;i++){
  const prepared=await call('/api/rooms/'+code+'/stakeprepare',i,{}),tx=getTransactionDecoder().decode(fromBase64(prepared.transaction));
  const signed=await signTransaction([players[i].keyPair],tx),transaction=getBase64EncodedWireTransaction(signed);
  await call('/api/rooms/'+code+'/stakesubmit',i,{transaction});
  for(let n=0;n<20;n++){r=(await call('/api/rooms/'+code+'/stakeprogress',0,{})).room;if(r.stake!.paidMask&(1<<i))break;await sleep(3000);}assert.ok(r!.stake!.paidMask&(1<<i),r!.stake!.error);
  if(i===0)await rejectIx(depositInstruction(service.programId,stake.bank!,players[0].address,0),players[0],'A second deposit for the same seat is rejected');
 }
 r=(await call('/api/rooms/'+code)).room;assert.equal(r.stake!.paidMask,(1<<capacity)-1);assert.ok(!r.randomness!.signature);
 await rejectIx(refundInstruction(service.programId,stake.bank!,{...stake,wallets:players.slice(0,capacity).map(p=>p.address)},payer.address),payer,'Fully funded bank cannot be refunded before timeout');
 await rejectIx(settleInstruction(service.programId,stake.bank!,{...stake,wallets:players.slice(0,capacity).map(p=>p.address)},await receiptAddress(payer.address,locked.randomness!.commitment!),0,'00'.repeat(32)),payer,'Early payout without fulfilled VRF is rejected');
 for(let n=0;n<40;n++){r=(await call('/api/rooms/'+code+'/randomness',0,{})).room;if(r.race)break;await sleep(4000);}assert.ok(r!.race,r!.randomness?.error);assert.ok(r!.race!.vrf);
 const record={code,capacity,before,after:[] as number[],room:r!,proofs:{bank:explorer(stake.bank!),vrf:explorer(r!.race!.vrf!.requestSignature,'tx')}};report.races.push(record);await save();console.log('Race running '+code+' · '+capacity+' riders · '+r!.race!.vrf!.requestSignature);
 return {code,capacity,record};
}
const duel=await start(2),party=await start(4);
for(const run of [duel,party]){
 let room:PublicRoom;
 for(let n=0;n<80;n++){room=(await call('/api/rooms/'+run.code+'/stakeprogress',0,{})).room;if(room.stake!.status==='settled')break;await sleep(4000);}assert.equal(room!.stake!.status,'settled',room!.stake!.error);
 const stake=room!.stake!,tape=room!.race!.tape!,winner=tape.ranking[0],amounts=stakeDistribution(stake.amountLamports,run.capacity,stake.feeBps);
 const after=await Promise.all(players.slice(0,run.capacity).map(async p=>(await rpcCall(rpc,'getBalance',[p.address,{commitment:'confirmed'}])).value));
 // Inspect individual chain transactions, since the same wallets enter both races.
 const tx=await rpcCall(rpc,'getTransaction',[stake.settlementSignature,{encoding:'json',commitment:'confirmed',maxSupportedTransactionVersion:0}]);assert.equal(tx.meta.err,null);
 const addresses=tx.transaction.message.accountKeys.map((a:any)=>typeof a==='string'?a:a.pubkey),wi=addresses.indexOf(stake.winnerWallet),oi=addresses.indexOf(payer.address);
 assert.equal(tx.meta.postBalances[wi]-tx.meta.preBalances[wi],Number(amounts.prize));
 const rent=await rpcCall(rpc,'getMinimumBalanceForRentExemption',[320]);assert.equal(tx.meta.postBalances[oi]-tx.meta.preBalances[oi],Number(amounts.fee)+rent-tx.meta.fee);
 assert.equal(await service.bank(stake.bank!),null);assert.equal(stake.winnerWallet,players[winner].address);
 run.record.room=room!;run.record.after=after;(run.record.proofs as any).payout=explorer(stake.settlementSignature!,'tx');
 report.checks.push({label:run.capacity+'-player winner receives exactly 95% and operator receives 5% plus reclaimed bank rent, less transaction fee',passed:true,type:'confirmed Devnet transaction balance inspection'});await save();
 await rejectIx(settleInstruction(service.programId,stake.bank!,{...stake,wallets:players.slice(0,run.capacity).map(p=>p.address)},room!.race!.vrf!.account,winner,tape.hash!),payer,'Closed bank cannot pay a second time');
 const {counter}=await bankAddresses(service.programId,payer.address,stake.nonce!),freshCommitment=await sha(randomHex());await rejectIx(initializeBankInstruction(service.programId,{...stake,wallets:players.slice(0,run.capacity).map(p=>p.address)},stake.nonce!,freshCommitment,counter,stake.bank!,await receiptAddress(payer.address,freshCommitment)),payer,'Closed bank nonce cannot be reopened');
 console.log('Payout verified '+run.code+' · '+stake.settlementSignature);
}
// Partial funding cancellation: full stake returns, rent is reclaimed, fee is zero.
const created=await call('/api/rooms',0,{capacity:2,name:'Refund tester',stake:true,amountSol:'0.02'}),code=created.room.code;
await call('/api/rooms/'+code+'/join',1,{name:'Offline opponent'});
for(let i=0;i<2;i++){await call('/api/rooms/'+code+'/stakeaccept',i,{termsHash:created.room.stake.termsHash});await call('/api/rooms/'+code+'/ready',i,{drawing:exampleHorse(),nonce:randomHex()});}
for(let n=0;n<30;n++){const r=await call('/api/rooms/'+code+'/stakeprogress',0,{});if(r.room.stake.initSignature)break;await sleep(3000);}
const prepared=await call('/api/rooms/'+code+'/stakeprepare',0,{}),signed=await signTransaction([players[0].keyPair],getTransactionDecoder().decode(fromBase64(prepared.transaction)));
await call('/api/rooms/'+code+'/stakesubmit',0,{transaction:getBase64EncodedWireTransaction(signed)});await sleep(4000);await call('/api/rooms/'+code+'/stakeprogress',0,{});await sleep(3000);
for(let n=0;n<30;n++){const r=await call('/api/rooms/'+code+'/stakerefund',0,{});if(r.room.stake.status==='refunded'){const tx=await rpcCall(rpc,'getTransaction',[r.room.stake.refundSignature,{encoding:'json',commitment:'confirmed',maxSupportedTransactionVersion:0}]);const index=tx.transaction.message.accountKeys.indexOf(players[0].address);assert.equal(tx.meta.postBalances[index]-tx.meta.preBalances[index],20000000);report.refund=r.room;break;}await sleep(3000);}
assert.equal(report.refund?.stake.status,'refunded');report.checks.push({label:'Partial funding cancels with full 0.02 SOL refund and zero game fee',passed:true,type:'confirmed Devnet transaction balance inspection'});
report.completedAt=new Date().toISOString();await save();console.log('Real Devnet races and partial refund passed.');
