import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createKeyPairSignerFromPrivateKeyBytes,getBase64EncodedWireTransaction,getTransactionDecoder,signTransaction} from '@solana/kit';
import {fromHex,fromBase64,explorer} from '../lib/vrf';
import {randomHex,verifyRace,auditSimulation} from '../lib/game';
import {verifyVrfProof} from '../lib/verify-vrf';
import {rpcCall,assertDevnet} from '../lib/solana-vrf';
import {exampleHorse} from '../lib/drawing';
import {stakeDistribution} from '../lib/sol-stakes';
if(!process.argv.includes('--run'))throw Error('Pass --run to use generated local Devnet test wallets.');
const base=process.env.E2E_BASE_URL||'https://draw-race-party.breid222.chatgpt.site',rpc='https://rpc.magicblock.app/devnet';await assertDevnet(rpc);
const secrets=JSON.parse(await readFile('.sites-runtime/escrow-test-secrets.json','utf8')),keys=await Promise.all(secrets.players.slice(0,2).map((s:string)=>createKeyPairSignerFromPrivateKeyBytes(fromHex(s)))),tokens=keys.map(()=>randomHex()),sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
const report:any={site:base,cluster:'devnet',startedAt:new Date().toISOString(),method:'Public production HTTP API, real Ed25519 wallet messages and explicitly signed Devnet deposits from generated local test keys. Wallet Standard extension prompts are not exercised by this HTTP script.',runs:[],checks:[]};
await mkdir('docs/escrow',{recursive:true});
const save=()=>writeFile('docs/escrow/public-evidence.json',JSON.stringify(report,null,2)+'\n');
async function raw(path:string,i=0,data?:unknown){const response=await fetch(base+path,{method:data===undefined?'GET':'POST',headers:{Authorization:'Bearer '+tokens[i],Origin:new URL(base).origin,'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data),signal:AbortSignal.timeout(60000)});return {status:response.status,data:await response.json() as any};}
async function call(path:string,i=0,data?:unknown){const r=await raw(path,i,data);if(r.status>=400)throw Error(path+' '+r.status+' '+JSON.stringify(r.data));return r.data;}
async function reject(path:string,i:number,data:unknown,label:string){const result=await raw(path,i,data);assert.ok(result.status>=400,label);report.checks.push({label,status:result.status,passed:true});}
const config=await call('/api/config');assert.equal(config.stakeEnabled,true);assert.equal(config.stakes.feeBps,500);assert.equal(config.vrf.configured,true);
await reject('/api/rooms',0,{capacity:2,stake:true,amountSol:'0.02'},'Guest cannot create a staked room without verifying a wallet');
for(let i=0;i<keys.length;i++){
 const challenge=await call('/api/profile/wallet/challenge',i,{address:keys[i].address});assert.ok(challenge.message.includes(new URL(base).origin));
 const sig=new Uint8Array(await crypto.subtle.sign('Ed25519',keys[i].keyPair.privateKey,new TextEncoder().encode(challenge.message)));
 const p=(await call('/api/profile/wallet/verify',i,{id:challenge.id,signature:btoa(String.fromCharCode(...sig))})).profile;assert.equal(p.walletAddress,keys[i].address);
}
let code='';
for(let round=0;round<2;round++){
 if(!round){const created=await call('/api/rooms',0,{capacity:2,stake:true,amountSol:'0.02',name:'Devnet horse 1'});code=created.room.code;await call('/api/rooms/'+code+'/join',1,{name:'Devnet horse 2'});}
 else{await call('/api/rooms/'+code+'/rematch',0,{});await call('/api/rooms/'+code+'/rematch',1,{});}
 await writeFile('.sites-runtime/escrow-public-run.json',JSON.stringify({base,code,tokens,round}),{mode:0o600});
 let room=(await call('/api/rooms/'+code)).room;assert.equal(room.stake.status,'drawing');assert.equal(room.stake.bank,undefined);const terms=room.stake.termsHash;
 await reject('/api/rooms/'+code+'/ready',0,{drawing:exampleHorse(),nonce:randomHex()},'Horse cannot lock before stake terms are accepted');
 for(let i=0;i<2;i++){await call('/api/rooms/'+code+'/stakeaccept',i,{termsHash:terms});await call('/api/rooms/'+code+'/ready',i,{drawing:exampleHorse(i),nonce:randomHex(),name:'Devnet horse '+(i+1)});}
 await reject('/api/rooms/'+code+'/randomness',0,{},'No MagicBlock purchase before confirmed deposits');
 for(let n=0;n<40;n++){room=(await call('/api/rooms/'+code+'/stakeprogress',0,{})).room;if(room.stake.initSignature)break;await sleep(3500);}assert.ok(room.stake.initSignature,room.stake.error);assert.equal(room.stake.pending,undefined);assert.equal(room.stake.depositPlans,undefined);assert.equal(room.stake.leaseId,undefined);
 for(let i=0;i<2;i++){
  // Simulate a declined prompt: prepare, do not sign, then retry normally.
  await call('/api/rooms/'+code+'/stakeprepare',i,{});const prepared=await call('/api/rooms/'+code+'/stakeprepare',i,{});
  const tx=await signTransaction([keys[i].keyPair],getTransactionDecoder().decode(fromBase64(prepared.transaction))),wire=getBase64EncodedWireTransaction(tx);
  if(i===0){const damaged=fromBase64(wire);damaged[3]^=1;await reject('/api/rooms/'+code+'/stakesubmit',i,{transaction:btoa(String.fromCharCode(...damaged))},'Tampered deposit signature is rejected before broadcast');}
  await call('/api/rooms/'+code+'/stakesubmit',i,{transaction:wire});
  // Repeated submission cannot create a second deposit or fee transfer.
  await raw('/api/rooms/'+code+'/stakesubmit',i,{transaction:wire});
  for(let n=0;n<25;n++){room=(await call('/api/rooms/'+code+'/stakeprogress',0,{})).room;if(room.stake.paidMask&(1<<i))break;await sleep(3500);}assert.ok(room.stake.paidMask&(1<<i),room.stake.error);
 }
 await reject('/api/rooms/'+code+'/reset',0,{},'A funded bank cannot be discarded by resetting the room');
 for(let n=0;n<50;n++){room=(await call('/api/rooms/'+code+'/randomness',0,{})).room;if(room.race)break;if(room.randomness.status==='error')throw Error(room.randomness.error);await sleep(4000);}assert.ok(room.race,room.randomness.error);
 assert.ok(await verifyRace(code,room.race));assert.ok(await verifyVrfProof(room.race.vrf));assert.ok(await auditSimulation(room.race));
 for(let i=0;i<2;i++)await call('/api/profile/race',i,{code,seed:room.race.seed,points:999999});
 await reject('/api/rooms/'+code+'/rematch',0,{},'Rematch cannot discard a pending payout');
 console.log('Public staked race '+code+' round '+(round+1)+' running: '+room.race.vrf.requestSignature);
 const record={round:round+1,code,seed:room.race.seed,bank:room.stake.bank,termsHash:terms,room,proofs:{vrf:explorer(room.race.vrf.requestSignature,'tx'),bank:explorer(room.stake.bank)}};report.runs.push(record);await save();
 for(let n=0;n<70;n++){room=(await call('/api/rooms/'+code+'/stakeprogress',0,{})).room;if(room.stake.status==='settled')break;await sleep(4000);}assert.equal(room.stake.status,'settled',room.stake.error);
 const proof=room.stake,tx=await rpcCall(rpc,'getTransaction',[proof.settlementSignature,{encoding:'json',commitment:'confirmed',maxSupportedTransactionVersion:0}]);assert.equal(tx.meta.err,null);const wi=tx.transaction.message.accountKeys.indexOf(proof.winnerWallet),totals=stakeDistribution(proof.amountLamports,2,500);assert.equal(tx.meta.postBalances[wi]-tx.meta.preBalances[wi],Number(totals.prize));
 const profiles=await Promise.all(keys.map((_,i)=>call('/api/profile',i).then(r=>r.profile)));assert.ok(profiles.every(p=>p.stats.races>=round+1&&p.stats.multiplayer>=round+1));
 record.room=room;(record.proofs as any).payout=explorer(proof.settlementSignature,'tx');(record as any).profiles=profiles.map(p=>({wallet:p.walletAddress,races:p.stats.races,points:p.points,awards:p.awards}));
 report.checks.push({label:'Public round '+(round+1)+' pays exactly 95%, preserves verified VRF/physics, and awards server profile points',passed:true});await save();console.log('Public payout verified: '+proof.settlementSignature);
}
assert.notEqual(report.runs[0].bank,report.runs[1].bank);assert.notEqual(report.runs[0].termsHash,report.runs[1].termsHash);assert.notEqual(report.runs[0].seed,report.runs[1].seed);assert.notEqual(report.runs[0].room.race.vrf.requestSignature,report.runs[1].room.race.vrf.requestSignature);
report.result='pass';report.completedAt=new Date().toISOString();await save();console.log('Public Devnet staking, paid rematch and profile checks passed.');
