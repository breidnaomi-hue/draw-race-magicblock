import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {randomHex,verifyRace,auditSimulation,planFor,VERSION,type PublicRoom,type Race} from '../lib/game';
import {PHYSICS_VERSION} from '../lib/physics';
import {exampleHorse} from '../lib/drawing';
import {verifyVrfProof} from '../lib/verify-vrf';
import {assertDevnet,rpcCall} from '../lib/solana-vrf';

// This creates real, sponsored Devnet races. No credentials are written to evidence.
const base=process.env.E2E_BASE_URL||'https://draw-race-party.breid222.chatgpt.site';
const rpc='https://rpc.magicblock.app/devnet',sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
const evidence:{base:string;startedAt:string;completedAt?:string;result?:string;races:any[]}={base,startedAt:new Date().toISOString(),races:[]};
await assertDevnet(rpc);
function client(){
  const token=randomHex();
  return {async request(path:string,body?:unknown):Promise<{room:PublicRoom;playerId:string}>{
    const response=await fetch(base+path,{method:body===undefined?'GET':'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(60000)});
    const data=await response.json() as any;
    if(!response.ok)throw Error(path+' HTTP '+response.status+': '+JSON.stringify(data));
    return data;
  }};
}
async function finish(clients:ReturnType<typeof client>[],code:string,label:string):Promise<Race>{
  for(let attempt=0;attempt<55;attempt++){
    const data=await clients[0].request('/api/rooms/'+code+'/randomness',{});
    if(data.room.randomness?.status==='error')throw Error(data.room.randomness.error);
    const race=data.room.race;
    if(race){
      assert.equal(race.version,VERSION);assert.equal(race.tape?.version,PHYSICS_VERSION);
      assert.ok(race.vrf);assert.ok(await verifyRace(code,race),'Seed/locked drawing verification');
      assert.ok(await verifyVrfProof(race.vrf),'Direct Devnet account/transaction verification');
      assert.ok(await auditSimulation(race),'Full Cloudflare/Node physics record must match');
      for(const peer of clients){
        const other=(await peer.request('/api/rooms/'+code)).room.race;
        assert.equal(other?.seed,race.seed);assert.deepEqual(other?.tape,race.tape,'Peers receive the same tape');
      }
      const history=await rpcCall(rpc,'getSignaturesForAddress',[race.vrf.account,{limit:10,commitment:'confirmed'}]);
      assert.equal(history.filter((item:any)=>!item.err).length,2,'Exactly one request and one callback');
      const tx=await rpcCall(rpc,'getTransaction',[race.vrf.requestSignature,{encoding:'json',commitment:'confirmed',maxSupportedTransactionVersion:1}]);
      const result={label,code,race,seedVerified:true,chainVerified:true,fullPhysicsMatches:true,peersChecked:clients.length,successfulTransactions:2,payerDebitLamports:tx.meta.preBalances[0]-tx.meta.postBalances[0],winner:race.players[planFor(race).ranking[0]].name};
      evidence.races.push(result);
      console.log(JSON.stringify({label,code,seedVerified:true,chainVerified:true,fullPhysicsMatches:true,request:race.vrf.requestSignature,winner:result.winner}));
      return race;
    }
    if(attempt%5===0)console.log(label+': waiting for '+data.room.randomness?.status);
    await sleep(4000);
  }
  throw Error('Oracle timeout; do not reroll the accepted request.');
}
async function start(capacity:2|4,practice=false){
  const clients=Array.from({length:practice?1:capacity},()=>client());
  let data=await clients[0].request('/api/rooms',{name:'VRF Artist',capacity,practice});
  const code=data.room.code,label=practice?'quick-race':capacity+'-players';
  for(let i=1;i<clients.length;i++)await clients[i].request('/api/rooms/'+code+'/join',{name:'Friend '+i});
  for(let i=0;i<clients.length;i++)data=await clients[i].request('/api/rooms/'+code+'/ready',{name:i?'Friend '+i:'VRF Artist',drawing:exampleHorse(i),nonce:randomHex()});
  assert.equal(data.room.race,null);assert.equal(data.room.randomness?.status,'locked');
  return {clients,code,race:await finish(clients,code,label)};
}
const quick=await start(4,true);
await start(2);await start(4);
if(process.argv.includes('--rematch')){
  console.log('Waiting for actual 90-second quick race before rematch');
  while(Date.now()<quick.race.startAt+quick.race.duration+200){
    await quick.clients[0].request('/api/rooms/'+quick.code+'/heartbeat',{});
    await sleep(Math.min(8000,Math.max(1,quick.race.startAt+quick.race.duration+200-Date.now())));
  }
  const next=(await quick.clients[0].request('/api/rooms/'+quick.code+'/rematch',{})).room;
  assert.equal(next.round,2);assert.equal(next.race,null);assert.equal(next.randomness?.status,'drawing');
  await quick.clients[0].request('/api/rooms/'+quick.code+'/ready',{name:'VRF Artist',drawing:exampleHorse(2),nonce:randomHex()});
  const rematch=await finish(quick.clients,quick.code,'rematch');
  assert.notEqual(rematch.seed,quick.race.seed);assert.notEqual(rematch.vrf!.requestSignature,quick.race.vrf!.requestSignature);
}
evidence.completedAt=new Date().toISOString();evidence.result='pass';
await mkdir('outputs/runtime',{recursive:true});
await writeFile('outputs/runtime/public-vrf.json',JSON.stringify(evidence,null,2));
console.log(JSON.stringify({result:'pass',races:evidence.races.length,fullCloudflareNodeTapesMatch:true}));
