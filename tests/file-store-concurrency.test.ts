import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {FileStore} from '../server/file-store';
import {createRoom,act as mutateRoom} from '../lib/rooms';
import {randomHex} from '../lib/game';
test('concurrent file reads, peer heartbeats and CAS saves share a room queue',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'draw-race-io-')),a=new FileStore(dir),b=new FileStore(dir),tokens=Array.from({length:4},()=>randomHex()),created=await createRoom(a,tokens[0],'Host',4),code=created.room.code;
 for(let i=1;i<4;i++)await mutateRoom(a,code,tokens[i],'join',{name:'Peer '+i});
 for(let round=0;round<12;round++){
  const all=await Promise.all([...tokens.map((token,i)=>mutateRoom(i%2?a:b,code,token,'heartbeat',{})),...Array.from({length:20},(_,i)=>(i%2?a:b).get(code))]);
  assert.ok(all.every(Boolean));
 }
 const room=(await a.get(code))!,revision=room.revision;room.revision++;
 const attempts=await Promise.all(Array.from({length:12},(_,i)=>(i%2?a:b).save(room,revision)));
 assert.equal(attempts.filter(Boolean).length,1);assert.equal((await b.get(code))!.revision,revision+1);
});
