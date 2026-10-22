import assert from 'node:assert/strict';
import {randomBytes} from 'node:crypto';
import {WebSocket} from 'ws';
const base=process.env.TEST_ORIGIN||'http://127.0.0.1:8788';
const call=async(path,token,data)=>{const response=await fetch(base+path,{method:data===undefined?'GET':'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data)});const value=await response.json();assert.ok(response.ok,JSON.stringify(value));return value};
for(const n of [2,4]){
  const tokens=Array.from({length:n},()=>randomBytes(32).toString('hex')),created=await call('/api/rooms',tokens[0],{capacity:n,name:'HTTP host'}),code=created.room.code;
  const conf=await call('/api/config',tokens[0]);let ws;if(conf.transport==='websocket'){ws=new WebSocket(base.replace('http','ws')+'/ws');await new Promise((resolve,reject)=>{ws.on('open',()=>ws.send(JSON.stringify({code,token:tokens[0]})));ws.once('message',resolve);ws.once('error',reject)})}
  await Promise.all(tokens.slice(1).map((t,i)=>call('/api/rooms/'+code+'/join',t,{name:'HTTP friend '+i})));
  const drawing=[{color:'#282637',width:9,erase:false,points:[[100,150],[400,150],[450,90],[500,150],[400,200],[100,200],[100,150]]}];
  await Promise.all(tokens.map(t=>call('/api/rooms/'+code+'/ready',t,{drawing,nonce:randomBytes(32).toString('hex')})));
  const snapshots=await Promise.all(tokens.map(t=>call('/api/rooms/'+code,t)));
  assert.equal(new Set(snapshots.map(s=>s.room.race.seed)).size,1);assert.equal(new Set(snapshots.map(s=>s.room.race.startAt)).size,1);assert.equal(snapshots[0].room.race.players.length,n);assert.equal(new Set(snapshots.map(s=>s.room.race.tape.hash)).size,1);assert.equal(snapshots[0].room.race.tape.frames,901);assert.ok(snapshots[0].room.race.tape.diagnostics.jumps>0);ws?.close();console.log('PASS '+n+' independent HTTP players: same physics tape hash, 901 frames, seed, start timestamp and locked roster; '+conf.transport);
}

