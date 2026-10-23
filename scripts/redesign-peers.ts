import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
import {samples} from '../lib/samples';
const code=process.argv[2];if(!/^[A-Z2-9]{6}$/.test(code))throw Error('Room code required');
const base='http://127.0.0.1:8788',tokens=Array.from({length:3},()=>randomBytes(32).toString('hex')),names=['Sir Scribbles','Pony Express','Sketchy'];
const call=async(token:string,action='',body?:unknown)=>{const r=await fetch(base+'/api/rooms/'+code+action,{method:body===undefined?'GET':'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)}),v:any=await r.json();assert.ok(r.ok,JSON.stringify(v));return v.room};
for(let i=0;i<3;i++){await call(tokens[i],'/join',{name:names[i]});await call(tokens[i],'/ready',{name:names[i],drawing:samples[i].drawing,nonce:randomBytes(32).toString('hex')})}
console.log(JSON.stringify({stage:'three peers ready',room:code}));
let race:any,round=0,loops=0;
while(loops++<240){const rooms=await Promise.all(tokens.map(t=>call(t)));await Promise.all(tokens.map(t=>call(t,'/heartbeat',{})));if(rooms[0].race){race=rooms[0].race;round=rooms[0].round;assert.equal(new Set(rooms.map(r=>r.race.tape.hash)).size,1);if(Date.now()>=race.startAt+race.duration)break;}await new Promise(r=>setTimeout(r,2500));}
assert.ok(race&&Date.now()>=race.startAt+race.duration,'Host did not complete the race');
for(const t of tokens)await call(t,'/rematch',{});
console.log(JSON.stringify({stage:'three peers want rematch',room:code,hash:race.tape.hash}));
let next;for(let i=0;i<150;i++){next=await call(tokens[0]);if(next.round===round+1)break;await Promise.all(tokens.map(t=>call(t,'/heartbeat',{})));await new Promise(r=>setTimeout(r,2000))}
assert.equal(next.round,round+1);assert.equal(next.race,null);
await writeFile('docs/redesign-ui-four.json',JSON.stringify({room:code,players:4,duration:race.duration,frames:race.tape.frames,identicalPeerHash:race.tape.hash,ranking:race.tape.ranking,rematchRound:next.round},null,2));
console.log(JSON.stringify({stage:'four-player UI rematch passed',round:next.round}));
