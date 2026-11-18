import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {getAddressDecoder} from '@solana/kit';
import {SqliteProfileDatabase} from '../server/profile-database';
import {PlayerProfiles,profileApi} from '../lib/player-profile';
import {racePoints} from '../lib/achievements';
import type {Room} from '../lib/game';
import type {Store} from '../lib/rooms';
const token='a'.repeat(64),other='b'.repeat(64),origin='https://draw-race.example';
const fixture=JSON.parse(await readFile(new URL('../public/vrf-reproducible.json',import.meta.url),'utf8'));
class Rooms implements Store {
 rooms=new Map<string,Room>();async get(code:string){return this.rooms.get(code)||null;}
 async create(room:Room){this.rooms.set(room.code,room);return true;}
 async save(room:Room){this.rooms.set(room.code,room);return true;}
}
function setup(){
 const db=new SqliteProfileDatabase(':memory:'),rooms=new Rooms();let now=1000;
 const profiles=new PlayerProfiles(db,()=>now);
 const room:Room={code:'ABC234',revision:0,capacity:4,host:'rider',created:0,expires:86400000,deadline:600000,round:1,secret:'',commitment:'',practice:true,players:[],race:structuredClone(fixture.race),history:[]};
 room.race!.startAt=1000;room.race!.players[0].id='rider';
 room.players=room.race!.players.map((p,i)=>({...p,token:i?'c'.repeat(64):token,lastSeen:0,rematch:false}));
 rooms.rooms.set(room.code,room);
 return {db,profiles,rooms,room,setNow:(n:number)=>{now=n;}};
}
async function wallet(){
 const keys=await crypto.subtle.generateKey('Ed25519',true,['sign','verify']);
 const publicKey=new Uint8Array(await crypto.subtle.exportKey('raw',keys.publicKey));
 const address=getAddressDecoder().decode(publicKey);
 return {address,async sign(message:string){const bytes=new Uint8Array(await crypto.subtle.sign('Ed25519',keys.privateKey,new TextEncoder().encode(message)));return btoa(String.fromCharCode(...bytes));}};
}
async function login(profiles:PlayerProfiles,who:string,key:Awaited<ReturnType<typeof wallet>>){const c=await profiles.challenge(who,key.address,origin);return profiles.verify(who,c.id,await key.sign(c.message),origin);}

test('server ledger counts finished races once and ignores client-supplied points',async()=>{
 const s=setup();try{
  assert.equal((await s.profiles.read(token)).points,0);
  const request=()=>profileApi(new Request(origin+'/api/profile/race',{method:'POST',headers:{Authorization:'Bearer '+token},body:JSON.stringify({code:s.room.code,seed:s.room.race!.seed,points:999999,place:1})}),s.profiles,s.rooms);
  const responses=await Promise.all(Array.from({length:12},request));assert.ok(responses.every(r=>r.ok));
  const pending=await s.profiles.read(token);assert.equal(pending.points,0);assert.equal(pending.pendingRaces,1);
  s.setNow(91000);const complete=await s.profiles.read(token);
  assert.equal(complete.stats.races,1);assert.equal(complete.stats.wins,1);assert.equal(complete.racePoints,75);assert.equal(complete.points,225);
  await request();assert.equal((await s.profiles.read(token)).points,225);
  assert.equal((await s.db.all<{n:number}>('SELECT COUNT(*) AS n FROM drp_race_rewards'))[0].n,1);
 }finally{s.db.close();}
});
test('spectators, fabricated races and local study replays cannot earn points',async()=>{
 const s=setup();try{
  await assert.rejects(s.profiles.registerRace(other,s.room.code,s.room.race!.seed,s.rooms),/race_not_eligible/);
  await assert.rejects(s.profiles.registerRace(token,s.room.code,'0'.repeat(64),s.rooms),/race_not_eligible/);
  delete s.room.race!.vrf;
  await assert.rejects(s.profiles.registerRace(token,s.room.code,s.room.race!.seed,s.rooms),/race_not_eligible/);
  assert.equal((await s.profiles.read(token)).points,0);
 }finally{s.db.close();}
});
test('wallet login verifies Ed25519, domain, token, expiry and single use',async()=>{
 const s=setup();try{
  const key=await wallet(),wrong=await wallet(),c=await s.profiles.challenge(token,key.address,origin);
  await assert.rejects(s.profiles.verify(token,c.id,await wrong.sign(c.message),origin),/invalid_wallet_signature/);
  await assert.rejects(s.profiles.verify(other,c.id,await key.sign(c.message),origin),/wallet_challenge_expired/);
  await assert.rejects(s.profiles.verify(token,c.id,await key.sign(c.message),'https://other.example'),/wallet_challenge_expired/);
  const signed=await key.sign(c.message),p=await s.profiles.verify(token,c.id,signed,origin);
  assert.equal(p.walletAddress,key.address);assert.equal(p.points,25);
  await assert.rejects(s.profiles.verify(token,c.id,signed,origin),/wallet_challenge_expired/);
  const expired=await s.profiles.challenge(token,key.address,origin);s.setNow(301001);
  await assert.rejects(s.profiles.verify(token,expired.id,await key.sign(expired.message),origin),/wallet_challenge_expired/);
 }finally{s.db.close();}
});
test('wallet merge preserves guest rewards and works on another device without duplicate bonuses',async()=>{
 const s=setup();try{
  await s.profiles.rename(token,'快乐小马');await s.profiles.registerRace(token,s.room.code,s.room.race!.seed,s.rooms);s.setNow(92000);
  assert.equal((await s.profiles.read(token)).points,225);
  const key=await wallet(),linked=await login(s.profiles,token,key);assert.equal(linked.points,250);assert.equal(linked.name,'快乐小马');
  const second=await login(s.profiles,other,key);assert.equal(second.points,250);assert.equal(second.stats.races,1);
  assert.equal((await s.profiles.disconnect(token)).points,0);
  assert.equal((await login(s.profiles,token,key)).points,250);
  assert.equal((await s.db.all<{n:number}>('SELECT COUNT(*) AS n FROM drp_achievements WHERE profile_id=?',['wallet:'+key.address]))[0].n,3);
  s.setNow(8*86400000);assert.equal((await s.profiles.read(token)).kind,'guest');
  assert.equal((await login(s.profiles,token,key)).points,250);
 }finally{s.db.close();}
});
test('concurrent wallet verification consumes only one challenge',async()=>{
 const s=setup();try{
  const key=await wallet(),c=await s.profiles.challenge(token,key.address,origin),signature=await key.sign(c.message);
  const results=await Promise.allSettled(Array.from({length:5},()=>s.profiles.verify(token,c.id,signature,origin)));
  assert.equal(results.filter(r=>r.status==='fulfilled').length,1);
  assert.equal((await s.profiles.read(token)).points,25);
 }finally{s.db.close();}
});
test('placement and multiplayer rewards follow the published game point rules',()=>{
 assert.deepEqual([1,2,3,4].map(place=>racePoints(place,false)),[75,50,35,25]);
 assert.deepEqual([1,2,3,4].map(place=>racePoints(place,true)),[85,60,45,35]);
});

test('merging two guest ledgers into one wallet never pays the same achievement twice',async()=>{
 const s=setup();try{
  await s.profiles.registerRace(token,s.room.code,s.room.race!.seed,s.rooms);
  const second=structuredClone(s.room);second.code='DEF567';second.players[0].token=other;second.players[0].id='second-rider';second.race!.players[0].id='second-rider';s.rooms.rooms.set(second.code,second);
  await s.profiles.registerRace(other,second.code,second.race!.seed,s.rooms);s.setNow(92000);
  assert.equal((await s.profiles.read(token)).points,225);assert.equal((await s.profiles.read(other)).points,225);
  const key=await wallet();await login(s.profiles,token,key);const merged=await login(s.profiles,other,key);
  assert.equal(merged.stats.races,2);assert.equal(merged.racePoints,150);assert.equal(merged.achievementPoints,175);assert.equal(merged.points,325);
 }finally{s.db.close();}
});

test('a race registered during wallet linking resolves to the authenticated identity',async()=>{
 const s=setup();try{
  await s.profiles.read(token);const original=s.db.run.bind(s.db);let release!:()=>void,entered!:()=>void;
  const gate=new Promise<void>(r=>{release=r}),started=new Promise<void>(r=>{entered=r});
  s.db.run=async(sql,values)=>{if(sql.startsWith('INSERT OR IGNORE INTO drp_race_rewards')){entered();await gate;}return original(sql,values);};
  const registering=s.profiles.registerRace(token,s.room.code,s.room.race!.seed,s.rooms);await started;
  const key=await wallet();await login(s.profiles,token,key);release();await registering;s.setNow(92000);
  const p=await s.profiles.read(token);assert.equal(p.kind,'wallet');assert.equal(p.stats.races,1);assert.equal(p.points,250);
  const rows=await s.db.all<{profile_id:string}>('SELECT profile_id FROM drp_race_rewards');assert.equal(rows[0].profile_id,'wallet:'+key.address);
 }finally{s.db.close();}
});
