import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {getAddressDecoder} from '@solana/kit';
import {randomHex,verifyRace,auditSimulation} from '../lib/game';
import {exampleHorse} from '../lib/drawing';
import {verifyVrfProof} from '../lib/verify-vrf';
import {racePoints} from '../lib/achievements';
const base=process.env.E2E_BASE_URL||'https://draw-race-party.breid222.chatgpt.site',startedAt=new Date().toISOString();
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
function client(){
 const token=randomHex();
 async function raw(path:string,body?:unknown){
  const response=await fetch(base+path,{method:body===undefined?'GET':'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json',Origin:base},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(60000)});
  const data=await response.json() as any;return {status:response.status,data};
 }
 return {raw,async call(path:string,body?:unknown){const r=await raw(path,body);if(r.status<200||r.status>=300)throw Error(path+' HTTP '+r.status+': '+JSON.stringify(r.data));return r.data;}};
}
const rider=client(),device2=client(),key=await crypto.subtle.generateKey('Ed25519',true,['sign','verify']);
const wallet=getAddressDecoder().decode(new Uint8Array(await crypto.subtle.exportKey('raw',key.publicKey)));
async function link(c:ReturnType<typeof client>){
 const challenge=await c.call('/api/profile/wallet/challenge',{address:wallet});
 assert.ok(challenge.message.includes(new URL(base).origin));
 const bytes=new Uint8Array(await crypto.subtle.sign('Ed25519',key.privateKey,new TextEncoder().encode(challenge.message))),signature=btoa(String.fromCharCode(...bytes));
 const result=await c.call('/api/profile/wallet/verify',{id:challenge.id,signature});
 return {profile:result.profile,challenge,signature};
}
const initial=(await rider.call('/api/profile')).profile;assert.equal(initial.points,0);assert.equal(initial.kind,'guest');
await rider.call('/api/profile/name',{name:'中文骑手'});
console.log('Public profile store initialized; guest profile saved.');
const config=await rider.call('/api/config');assert.equal(config.vrf.cluster,'devnet');assert.ok(config.vrf.configured);
const created=await rider.call('/api/rooms',{name:'中文骑手',capacity:4,practice:true}),code=created.room.code;
await rider.call('/api/rooms/'+code+'/ready',{name:'中文骑手',drawing:exampleHorse(0),nonce:randomHex()});
let race:any;
for(let attempt=0;attempt<55;attempt++){
 const data=await rider.call('/api/rooms/'+code+'/randomness',{});
 if(data.room.randomness?.status==='error')throw Error(data.room.randomness.error);
 if(data.room.race){race=data.room.race;break;}
 if(attempt%5===0)console.log('Waiting for public MagicBlock VRF: '+data.room.randomness?.status);
 await sleep(4000);
}
assert.ok(race,'VRF fulfillment must produce a race');
assert.ok(await verifyRace(code,race));assert.ok(await verifyVrfProof(race.vrf));assert.ok(await auditSimulation(race));
const pending=(await rider.call('/api/profile/race',{code,seed:race.seed,points:99999999})).profile;
assert.equal(pending.points,0);assert.equal(pending.pendingRaces,1);
console.log('Real VRF race '+code+' registered. Points remain locked until its actual finish.');
while(Date.now()<race.startAt+race.duration+700){
 await rider.call('/api/rooms/'+code+'/heartbeat',{});
 await sleep(Math.min(8000,Math.max(1,race.startAt+race.duration+700-Date.now())));
}
const guest=(await rider.call('/api/profile')).profile,lane=race.players.findIndex((p:any)=>p.name==='中文骑手'),place=race.tape.ranking.indexOf(lane)+1;
assert.equal(guest.stats.races,1);assert.equal(guest.racePoints,racePoints(place,false));assert.ok(guest.awards.some((a:any)=>a.id==='first-finish'));
assert.equal(guest.stats.wins,Number(place===1));assert.equal(guest.points,guest.racePoints+guest.awards.reduce((sum:number,a:any)=>sum+a.points,0));
for(let i=0;i<3;i++){const duplicate=(await rider.call('/api/profile/race',{code,seed:race.seed,points:99999999})).profile;assert.equal(duplicate.points,guest.points);assert.equal(duplicate.stats.races,1);}
console.log('Race completed: '+guest.points+' guest points; duplicate requests add nothing.');
const linked=await link(rider);assert.equal(linked.profile.walletAddress,wallet);assert.equal(linked.profile.name,'中文骑手');assert.equal(linked.profile.points,guest.points+25);
const replay=await rider.raw('/api/profile/wallet/verify',{id:linked.challenge.id,signature:linked.signature});assert.equal(replay.status,400);assert.equal(replay.data.error,'wallet_challenge_expired');
const restored=await link(device2);assert.equal(restored.profile.points,linked.profile.points);assert.equal(restored.profile.stats.races,1);
const spectator=await device2.raw('/api/profile/race',{code,seed:race.seed});assert.equal(spectator.status,403);
assert.equal((await rider.call('/api/profile/wallet/disconnect',{})).profile.kind,'guest');
const reconnect=await link(rider);assert.equal(reconnect.profile.points,linked.profile.points);
await mkdir('outputs/profile',{recursive:true});
await writeFile('outputs/profile/live-race.json',JSON.stringify({code,race}));
const evidence={site:base,startedAt,completedAt:new Date().toISOString(),result:'pass',method:'Production HTTP API and Ed25519 signatures from a generated, unfunded test key. No browser extension, private key export or wallet transaction signing.',wallet,room:code,request:race.vrf.requestSignature,callback:race.vrf.fulfillmentSignature,receipt:race.vrf.account,seed:race.seed,tapeHash:race.tape.hash,seedVerified:true,chainVerified:true,fullPhysicsMatches:true,profile:{name:linked.profile.name,place,pendingPoints:pending.points,guestRacePoints:guest.racePoints,guestTotal:guest.points,walletTotal:linked.profile.points,awards:linked.profile.awards,duplicateGrants:false,secondDeviceRestored:true,challengeReplayRejected:true,spectatorGrantRejected:true,reconnectPreserved:true}};
await writeFile('docs/profile-live-evidence.json',JSON.stringify(evidence,null,2)+'\n');
console.log(JSON.stringify({result:'pass',room:code,walletTotal:linked.profile.points,secondDeviceRestored:true,challengeReplayRejected:true,duplicateGrants:false,request:race.vrf.requestSignature}));
