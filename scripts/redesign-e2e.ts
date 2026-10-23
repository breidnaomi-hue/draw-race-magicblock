import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
import {samples} from '../lib/samples';
import {verifyRace,auditSimulation} from '../lib/game';
const base=process.env.TEST_ORIGIN||'http://127.0.0.1:8788';
const call=async(path:string,token:string,data?:unknown)=>{const r=await fetch(base+path,{method:data===undefined?'GET':'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data)}),v:any=await r.json();assert.ok(r.ok,JSON.stringify(v));return v};
const rooms=[];
for(const n of [2,4]){
 const tokens=Array.from({length:n},()=>randomBytes(32).toString('hex')),v=await call('/api/rooms',tokens[0],{capacity:n,name:'QA host'}),code=v.room.code;
 for(let i=1;i<n;i++)await call('/api/rooms/'+code+'/join',tokens[i],{name:'QA rider '+(i+1)});
 for(let i=0;i<n;i++)await call('/api/rooms/'+code+'/ready',tokens[i],{drawing:samples[i].drawing,nonce:randomBytes(32).toString('hex')});
 const snapshots=await Promise.all(tokens.map(t=>call('/api/rooms/'+code,t))),race=snapshots[0].room.race;
 assert.equal(new Set(snapshots.map(s=>s.room.race.tape.hash)).size,1);assert.equal(race.players.length,n);assert.equal(race.duration,90000);assert.ok(await verifyRace(code,race));assert.ok(await auditSimulation(race));
 rooms.push({n,code,tokens,race});console.log(JSON.stringify({stage:'started',players:n,room:code,version:race.version}));
}
const ends=Math.max(...rooms.map(r=>r.race.startAt+r.race.duration));let tick=0;
while(Date.now()<ends){await new Promise(r=>setTimeout(r,Math.min(15000,Math.max(250,ends-Date.now()))));tick++;for(const r of rooms){const v=await call('/api/rooms/'+r.code,r.tokens[0]);assert.equal(v.room.race.tape.hash,r.race.tape.hash);await call('/api/rooms/'+r.code+'/heartbeat',r.tokens[0],{});}console.log(JSON.stringify({stage:'running',elapsedCheck:tick,remainingSeconds:Math.max(0,Math.ceil((ends-Date.now())/1000))}));}
const results=[];
for(const r of rooms){
 const final=await call('/api/rooms/'+r.code,r.tokens[0]);assert.equal(final.room.race.tape.hash,r.race.tape.hash);assert.deepEqual(final.room.race.tape.ranking,r.race.tape.ranking);
 for(const token of r.tokens)await call('/api/rooms/'+r.code+'/rematch',token,{});
 const next=await call('/api/rooms/'+r.code,r.tokens[0]);assert.equal(next.room.round,2);assert.equal(next.room.race,null);assert.ok(next.room.players.every((p:any)=>!p.ready));assert.equal(next.room.history.length,1);assert.notEqual(next.room.commitment,r.race.commitment);
 results.push({players:r.n,room:r.code,seconds:90,frames:r.race.tape.frames,recordHash:r.race.tape.hash,seedVerified:true,referenceAudit:true,identicalClients:true,rematchRound:next.room.round,historyRetained:true});console.log(JSON.stringify({stage:'passed',players:r.n,rematch:next.room.round}));
}
await writeFile('docs/redesign-e2e.json',JSON.stringify({base,date:new Date().toISOString(),results},null,2));
