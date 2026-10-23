import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {raceHighlight} from '../lib/race-highlights';
import {raceCamera} from '../lib/race-camera';
import {decodeTape,poseAt,tapePayload} from '../lib/physics';
test('highlights seek actual recorded events and leave the entire race untouched',async()=>{
 for(const id of [20,1328,3971,16]){
  const r=JSON.parse(await readFile(new URL('../public/showcases/'+id+'.json',import.meta.url),'utf8')),before=tapePayload(r.tape),h=raceHighlight(r.tape);
  assert.ok(Number.isFinite(h.at)&&h.at>=0&&h.at<r.duration);assert.ok(r.players[h.lane]);
  if(h.event)assert.ok(r.tape.events.some((e:any)=>e.type===h.event&&e.lane===h.lane&&Math.abs(e.at-h.at)<=1201));
  if(id===1328){assert.equal(h.kind,'comeback');assert.ok(h.gap>24&&h.gap<25)}
  assert.equal(tapePayload(r.tape),before);
 }
});
test('portrait action camera contains a nearby field and is independent of frame order',async()=>{
 const r=JSON.parse(await readFile(new URL('../public/showcases/1328.json',import.meta.url),'utf8')),d=decodeTape(r.tape),poses=Array.from({length:4},(_,i)=>poseAt(r.tape,i,10000,d)),a=raceCamera(poses,r.tape,10000,390,false,702);
 for(const p of poses)assert.ok((p.x-a.camera)*a.scale>=0&&(p.x-a.camera)*a.scale<=390);
 raceCamera(poses,r.tape,65000,390,false,702);assert.deepEqual(raceCamera(poses,r.tape,10000,390,false,702),a);
});
