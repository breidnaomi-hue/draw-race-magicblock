import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {RacePlaybackClock} from '../lib/race-playback';
import {raceCamera,RaceCameraMotion} from '../lib/race-camera';
import {decodeTape,poseAt,tapePayload} from '../lib/physics';

test('room-clock corrections never repeat or skip running animation frames',()=>{
 const clock=new RacePlaybackClock(),dt=1000/60;
 let previous=clock.sample(0,5000,'live').elapsed;
 for(let frame=1;frame<1800;frame++){
  const offset=[0,450,-300,180,-100][Math.floor(frame/90)%5];
  const tick=clock.sample(frame*dt,5000+frame*dt+offset,'live'),step=tick.elapsed-previous;
  assert.ok(step>=dt*.95-1e-8&&step<=dt*1.05+1e-8,'Network jitter must only slew playback');
  assert.equal(tick.reset,false);previous=tick.elapsed;
 }
 for(let frame=1800;frame<2400;frame++)previous=clock.sample(frame*dt,5000+frame*dt,'live').elapsed;
 assert.ok(Math.abs(previous-(5000+2399*dt))<.001,'Clock converges when latency stabilizes');
});

test('pause, explicit seek, replay restart and background resume keep exact controls',()=>{
 const clock=new RacePlaybackClock();
 clock.sample(0,12000,'live');
 assert.equal(clock.sample(20,12020,'live',35000).elapsed,35000);
 assert.equal(clock.sample(40,12040,'live',35000).elapsed,35000);
 assert.equal(clock.sample(60,35000,'replay:1').elapsed,35000);
 assert.equal(clock.sample(80,2000,'replay:2').elapsed,2000);
 assert.equal(clock.sample(5000,6920,'replay:2').elapsed,6920);
 assert.equal(clock.sample(5020,0,'demo:next-loop').elapsed,0);
});

test('camera seeks and viewport changes reset framing without a long catch-up pan',()=>{
 const motion=new RaceCameraMotion(),first={camera:100,scale:1.22,focus:0,comeback:false},next={camera:10000,scale:.24,focus:1,comeback:true};
 motion.next(first,1280,600,16);
 const transition=motion.next(next,1280,600,16);
 assert.ok(transition.camera<1000&&transition.scale>1,'Event changes must not cut to the next shot');
 const seek=motion.next(next,1280,600,16,true);
 assert.ok(Math.abs(seek.camera-next.camera)<1e-9&&Math.abs(seek.scale-next.scale)<1e-9);
 const resize=motion.next(first,390,702,16);
 assert.ok(Math.abs(resize.camera-first.camera)<1e-9&&Math.abs(resize.scale-first.scale)<1e-9);
});

test('recorded races have continuous camera motion across desktop, portrait and frame rates',async()=>{
 const races=[JSON.parse(await readFile(new URL('../public/vrf-reproducible.json',import.meta.url),'utf8')).race,...await Promise.all([20,1328,3971,16].map(async id=>JSON.parse(await readFile(new URL('../public/showcases/'+id+'.json',import.meta.url),'utf8'))))];
 for(const race of races){
  const tape=race.tape,before=tapePayload(tape),decoded=decodeTape(tape);
  for(const [width,height] of [[1280,600],[390,702]])for(const fps of [30,60,120]){
   const motion=new RaceCameraMotion();let previous:ReturnType<typeof raceCamera>|undefined;
   for(let frame=0;frame<fps*90;frame++){
    const t=frame*1000/fps,poses=Array.from({length:tape.lanes},(_,i)=>poseAt(tape,i,t,decoded)),target=raceCamera(poses,tape,t,width,false,height),view=motion.next(target,width,height,1000/fps);
    assert.ok(Number.isFinite(view.camera)&&view.scale>0);
    if(previous){
     const center=previous.camera+width/previous.scale/2;
     const motionPx=Math.max(...[-width/2,0,width/2].map(x=>Math.abs((center+x/previous!.scale-view.camera)*view.scale-(width/2+x))));
     assert.ok(motionPx*fps/60<width*.025,'Camera must not cut when a boost/leader/framing target changes');
    }
    previous=view;
   }
  }
  assert.equal(tapePayload(tape),before,'Camera must never alter the recorded physical race');
 }
});
