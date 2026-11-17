import {mkdir,writeFile} from 'node:fs/promises';
import {randomHex,verifyRace,planFor,sha,type Race,type PublicRoom} from '../lib/game';
import {exampleHorse} from '../lib/drawing';
import {verifyVrfProof} from '../lib/verify-vrf';
import {rpcCall,assertDevnet,signedWire} from '../lib/solana-vrf';
import {DRAW_RACE_VRF_PROGRAM,VRF_PROGRAM,VRF_QUEUE,fromHex} from '../lib/vrf';
import {address,createKeyPairSignerFromPrivateKeyBytes,getProgramDerivedAddress,type Instruction} from '@solana/kit';
const base=process.env.E2E_BASE_URL||'http://localhost:8788',rpc='https://rpc.magicblock.app/devnet';
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
await assertDevnet(rpc);
for(let n=0;;n++){
 const program=await rpcCall(rpc,'getAccountInfo',[DRAW_RACE_VRF_PROGRAM,{encoding:'base64',commitment:'confirmed'}]);
 if(program.value?.executable)break;if(n>180)throw Error('Program deployment did not finish');await sleep(3000);
}
const evidence:any={startedAt:new Date().toISOString(),base,cluster:'devnet',programId:DRAW_RACE_VRF_PROGRAM,races:[],negativeChecks:[]};
async function client(token=randomHex()){
 return {token,async request(path:string,body?:unknown):Promise<{room:PublicRoom;playerId:string}>{const r=await fetch(base+path,{method:body===undefined?'GET':'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(45000)});const data=await r.json() as any;if(!r.ok)throw Error(JSON.stringify(data));return data;}};
}
async function start(capacity:2|4,practice=false){
 const clients=await Promise.all(Array.from({length:practice?1:capacity},()=>client()));
 let data=await clients[0].request('/api/rooms',{name:'VRF Artist',capacity,practice});const code=data.room.code;
 for(let i=1;i<clients.length;i++)await clients[i].request('/api/rooms/'+code+'/join',{name:'Friend '+i});
 for(let i=0;i<clients.length;i++)data=await clients[i].request('/api/rooms/'+code+'/ready',{name:i?'Friend '+i:'VRF Artist',drawing:exampleHorse(i),nonce:randomHex()});
 if(data.room.race||data.room.randomness?.status!=='locked')throw Error('Race ran before VRF');
 console.log('Locked '+code+' ('+(practice?'solo + bots':capacity+' players')+')');
 const race=await finishRequest(clients[0],code);
 return {clients,code,race};
}
async function finishRequest(rider:Awaited<ReturnType<typeof client>>,code:string){
 for(let n=0;n<55;n++){
  const data=await rider.request('/api/rooms/'+code+'/randomness',{});
  if(data.room.randomness?.status==='error')throw Error(data.room.randomness.error);
  if(data.room.race){
   const race=data.room.race;
   if(!race.vrf||!await verifyRace(code,race)||!await verifyVrfProof(race.vrf))throw Error('Race proof verification failed');
   const plan=planFor(race),history=await rpcCall(rpc,'getSignaturesForAddress',[race.vrf.account,{limit:10,commitment:'confirmed'}]);
   if(history.filter((x:any)=>!x.err).length!==2)throw Error('Expected exactly one request and one callback');
   const tx=await rpcCall(rpc,'getTransaction',[race.vrf.requestSignature,{encoding:'json',commitment:'confirmed',maxSupportedTransactionVersion:1}]);
   evidence.races.push({code,round:race.round,players:race.players.length,seed:race.seed,proof:race.vrf,tapeHash:race.tape!.hash,winner:race.players[plan.ranking[0]].name,weather:race.tape!.course.weather,successfulTransactions:history.filter((x:any)=>!x.err).length,transactionFeeLamports:tx.meta.fee,payerDebitLamports:tx.meta.preBalances[0]-tx.meta.postBalances[0]});
   console.log('Verified live VRF race '+code+' / '+race.seed.slice(0,12)+' / '+race.vrf.requestSignature);
   return race;
  }
  if(n%5===0)console.log('Waiting for oracle: '+code+' '+data.room.randomness?.status);
  await sleep(4000);
 }
 throw Error('VRF callback timed out; the accepted request remains recoverable.');
}
const solo=await start(4,true);
await mkdir(new URL('../docs/vrf/',import.meta.url),{recursive:true});
await writeFile(new URL('../public/vrf-demo.json',import.meta.url),JSON.stringify({code:solo.code,race:solo.race}));
// Simulation-only negative transactions. They never get submitted or spend Devnet SOL.
if(process.env.VRF_SPONSOR_SEED){
 const payer=await createKeyPairSignerFromPrivateKeyBytes(fromHex(process.env.VRF_SPONSOR_SEED));
 const bytes=new Uint8Array(65);bytes[0]=1;bytes.set(fromHex(solo.race.vrf!.commitment),33);
 const spoof:Instruction={programAddress:address(DRAW_RACE_VRF_PROGRAM),accounts:[{address:payer.address,role:3},{address:address(solo.race.vrf!.account),role:1}],data:bytes};
 try{await signedWire(rpc,payer,[spoof]);throw Error('Spoofed callback unexpectedly accepted');}catch(e){if(!String(e).includes('MissingRequiredSignature'))throw e;evidence.negativeChecks.push({check:'Direct callback with wallet signer',result:'Rejected by on-chain program in simulation',error:String(e)});}
 const [identity]=await getProgramDerivedAddress({programAddress:address(DRAW_RACE_VRF_PROGRAM),seeds:[new TextEncoder().encode('identity')]});
 const repeated=new Uint8Array(33);repeated.set(fromHex(solo.race.vrf!.commitment),1);
 const request:Instruction={programAddress:address(DRAW_RACE_VRF_PROGRAM),accounts:[{address:payer.address,role:3},{address:address(solo.race.vrf!.account),role:1},{address:identity,role:0},{address:address(VRF_QUEUE),role:1},{address:address(VRF_PROGRAM),role:0},{address:address('SysvarS1otHashes111111111111111111111111111'),role:0},{address:address('11111111111111111111111111111111'),role:0}],data:repeated};
 try{await signedWire(rpc,payer,[request]);throw Error('Duplicate request unexpectedly accepted');}catch(e){if(!String(e).includes('AccountAlreadyInitialized'))throw e;evidence.negativeChecks.push({check:'Second request for same locked race',result:'Rejected by on-chain program in simulation',error:String(e)});}
}
const duo=await start(2),party=await start(4);
// Real wall-clock lifecycle: wait for the first 90-second race and request a rematch.
while(Date.now()<solo.race.startAt+solo.race.duration+200){
 await solo.clients[0].request('/api/rooms/'+solo.code+'/heartbeat',{});await sleep(Math.min(8000,Math.max(1,solo.race.startAt+solo.race.duration+200-Date.now())));
}
let next=await solo.clients[0].request('/api/rooms/'+solo.code+'/rematch',{});
if(next.room.round!==2||next.room.race||next.room.randomness?.status!=='drawing')throw Error('Rematch failed');
await solo.clients[0].request('/api/rooms/'+solo.code+'/ready',{name:'VRF Artist',drawing:exampleHorse(2),nonce:randomHex()});
const rematch=await finishRequest(solo.clients[0],solo.code);
if(rematch.vrf!.requestSignature===solo.race.vrf!.requestSignature||rematch.seed===solo.race.seed)throw Error('Rematch reused randomness');
evidence.completedAt=new Date().toISOString();evidence.result='pass';
await writeFile(new URL('../docs/vrf/live-evidence.json',import.meta.url),JSON.stringify(evidence,null,2));
console.log(JSON.stringify({result:'pass',races:evidence.races.length,negativeChecks:evidence.negativeChecks.length}));
