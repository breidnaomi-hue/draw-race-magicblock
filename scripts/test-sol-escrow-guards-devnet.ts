import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createKeyPairSignerFromPrivateKeyBytes,address,type Instruction} from '@solana/kit';
import {getTransferSolInstruction} from '@solana-program/system';
import {assertDevnet,rpcCall,signedWire} from '../lib/solana-vrf';
import {SolEscrow} from '../lib/sol-escrow';
import {bankAddresses,receiptAddress,initializeBankInstruction,depositInstruction,refundInstruction,settleInstruction,type StakeState} from '../lib/sol-stakes';
import {randomHex} from '../lib/game';
import {fromHex,fromBase64,DRAW_RACE_VRF_PROGRAM,explorer} from '../lib/vrf';
if(!process.argv.includes('--run'))throw Error('Pass --run for real Devnet guard checks.');
const root=new URL('../',import.meta.url),rpc=process.env.SOLANA_RPC_URL||'https://rpc.magicblock.app/devnet';await assertDevnet(rpc);
const deployment=JSON.parse(await readFile(new URL('docs/escrow/deployment.json',root),'utf8')),funding=JSON.parse(await readFile(new URL('.sites-runtime/vrf-devnet-secrets.json',root),'utf8')),test=JSON.parse(await readFile(new URL('.sites-runtime/escrow-test-secrets.json',root),'utf8'));
const file=new URL('.sites-runtime/escrow-guards-secrets.json',root),secret=await readFile(file,'utf8').then(JSON.parse).catch(async()=>{const d={operator:randomHex()};await writeFile(file,JSON.stringify(d),{mode:0o600});return d;});
const payer=await createKeyPairSignerFromPrivateKeyBytes(fromHex(funding.sponsor)),operator=await createKeyPairSignerFromPrivateKeyBytes(fromHex(secret.operator)),players=await Promise.all(test.players.map((s:string)=>createKeyPairSignerFromPrivateKeyBytes(fromHex(s))));
const service=new SolEscrow({ESCROW_PROGRAM_ID:deployment.programId,VRF_PROGRAM_ID:DRAW_RACE_VRF_PROGRAM,VRF_SPONSOR_SEED:secret.operator,SOLANA_RPC_URL:rpc});
const report:any={cluster:'devnet',programId:deployment.programId,operator:operator.address,startedAt:new Date().toISOString(),checks:[]},sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
const save=()=>writeFile(new URL('docs/escrow/guard-evidence.json',root),JSON.stringify(report,null,2)+'\n');
async function send(ix:Instruction[],signer=operator){const wire=await signedWire(rpc,signer,ix);await service.broadcast(wire.transaction);for(let n=0;n<60;n++){const state=await service.state(wire.signature,wire.lastValidBlockHeight);if(state==='confirmed')return wire.signature;if(['failed','expired'].includes(state))throw Error('Devnet transaction '+state);await sleep(1000);}throw Error('Confirmation pending');}
async function reject(ix:Instruction,label:string,signer=operator){await assert.rejects(signedWire(rpc,signer,[ix]),/simulation failed/);report.checks.push({label,passed:true,type:'Devnet simulation rejection'});console.log(label);await save();}
const balance=(await rpcCall(rpc,'getBalance',[operator.address])).value;if(balance<10000000)await send([getTransferSolInstruction({source:payer,destination:operator.address,amount:20000000-balance})],payer);
const {counter}=await bankAddresses(service.programId,operator.address,'0');const counterInfo=(await rpcCall(rpc,'getAccountInfo',[counter,{encoding:'base64',commitment:'confirmed'}])).value,counterBytes=counterInfo?fromBase64(counterInfo.data[0]):new Uint8Array();const nonce=counterBytes.length===16?new DataView(counterBytes.buffer).getBigUint64(8,true).toString():'0';
const {bank}=await bankAddresses(service.programId,operator.address,nonce),commitment=randomHex(),receipt=await receiptAddress(operator.address,commitment);
const rent0=await rpcCall(rpc,'getMinimumBalanceForRentExemption',[0]);
report.prefunding=await send([...(counterBytes.length?[]:[getTransferSolInstruction({source:operator,destination:counter,amount:rent0})]),getTransferSolInstruction({source:operator,destination:bank,amount:rent0})]);report.counterPrefundedThisRun=!counterBytes.length;
const stake:StakeState={mode:'sol-devnet',amountLamports:'20000000',feeBps:500,programId:service.programId,operator:operator.address,treasury:operator.address,termsHash:'guard-check',status:'funding',wallets:players.slice(0,2).map(p=>p.address),bank,nonce,paidMask:0};
report.bank=bank;report.initSignature=await send([initializeBankInstruction(service.programId,stake,nonce,commitment,counter,bank,receipt,600,180)]);
assert.equal((await service.bank(bank))!.amountLamports,'20000000');report.checks.push({label:counterBytes.length?'Prefunded bank initializes successfully with persistent counter':'Prefunded counter and bank initialize successfully',passed:true,type:'confirmed Devnet transaction'});
for(let i=0;i<2;i++)await send([depositInstruction(service.programId,bank,players[i].address,i)],players[i]);
const funded=(await service.bank(bank))!;assert.equal(funded.paidMask,3);report.deadline=new Date(funded.settlementDeadline).toISOString();await save();
await reject(refundInstruction(service.programId,bank,stake,players[2].address),'Unrelated caller cannot refund a full bank before timeout',players[2]);
const wrongTreasury=settleInstruction(service.programId,bank,{...stake,treasury:players[2].address},receipt,0,randomHex());await reject(wrongTreasury,'Payout cannot redirect the frozen treasury');
const badWinner=settleInstruction(service.programId,bank,stake,receipt,0,randomHex());(badWinner.accounts as any[])[4]={address:players[2].address,role:1};await reject(badWinner,'Payout cannot redirect the frozen winner wallet');
const ev=JSON.parse(await readFile(new URL('docs/escrow/live-evidence.json',root),'utf8')),old=ev.races[0].room.race.vrf,original=await bankAddresses(service.programId,payer.address,'0');
const c=(await rpcCall(rpc,'getAccountInfo',[original.counter,{encoding:'base64',commitment:'confirmed'}])).value,bytes=fromBase64(c.data[0]),payerNonce=new DataView(bytes.buffer).getBigUint64(8,true).toString(),fresh=await bankAddresses(service.programId,payer.address,payerNonce);
await reject(initializeBankInstruction(service.programId,{...stake,operator:payer.address,treasury:payer.address},payerNonce,old.commitment,original.counter,fresh.bank,old.account),'A bank cannot be created after its VRF result is known',payer);
while(Date.now()<funded.fundedAt+95000){console.log('Waiting for the on-chain 90-second payout boundary…');await sleep(Math.min(15000,funded.fundedAt+95000-Date.now()));}
await reject(settleInstruction(service.programId,bank,stake,receipt,0,randomHex()),'Even after 90 seconds a bank without fulfilled VRF cannot pay');
await reject(settleInstruction(service.programId,bank,stake,old.account,0,randomHex()),'A fulfilled VRF receipt from a different race cannot pay this bank');
while(Date.now()<funded.settlementDeadline+6000){console.log('Waiting for the real on-chain refund timeout…');await sleep(Math.min(15000,funded.settlementDeadline+6000-Date.now()));}
report.refundSignature=await send([refundInstruction(service.programId,bank,stake,players[2].address)],players[2]);
const tx=await rpcCall(rpc,'getTransaction',[report.refundSignature,{encoding:'json',commitment:'confirmed',maxSupportedTransactionVersion:0}]);assert.equal(tx.meta.err,null);
for(let i=0;i<2;i++){const index=tx.transaction.message.accountKeys.indexOf(players[i].address);assert.equal(tx.meta.postBalances[index]-tx.meta.preBalances[index],20000000);}
assert.equal(await service.bank(bank),null);report.checks.push({label:'After timeout an unrelated signer refunds all players their exact stakes with zero game fee',passed:true,type:'confirmed Devnet transaction balance inspection'});
const nextCommit=randomHex();await reject(initializeBankInstruction(service.programId,stake,nonce,nextCommit,counter,bank,await receiptAddress(operator.address,nextCommit)),'Closed bank address cannot be reopened with its old nonce');
await reject(refundInstruction(service.programId,bank,stake,players[2].address),'Closed bank cannot refund a second time',players[2]);
report.refundExplorer=explorer(report.refundSignature,'tx');report.completedAt=new Date().toISOString();await save();console.log('On-chain guards and permissionless timeout refund verified: '+report.refundSignature);
