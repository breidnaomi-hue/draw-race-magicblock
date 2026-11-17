import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {raceCamera,RaceCameraMotion} from '../lib/race-camera';
import {decodeTape,poseAt} from '../lib/physics';
const files=['public/vrf-reproducible.json',...[20,1328,3971,16].map(id=>'public/showcases/'+id+'.json')];
const cases=[];
for(const file of files){
 const input=JSON.parse(await readFile(file,'utf8')),race=input.race||input,tape=race.tape,decoded=decodeTape(tape);
 for(const [width,height] of [[1280,600],[390,702]]){
  const motion=new RaceCameraMotion(),stats=[{maxFrameShiftPx:0,framesOver30px:0},{maxFrameShiftPx:0,framesOver30px:0}];
  const previous:(ReturnType<typeof raceCamera>|undefined)[]=[];
  for(let frame=0;frame<5400;frame++){
   const t=frame*1000/60,poses=Array.from({length:tape.lanes},(_,i)=>poseAt(tape,i,t,decoded)),target=raceCamera(poses,tape,t,width,false,height);
   const views=[target,motion.next(target,width,height,1000/60)];
   views.forEach((view,index)=>{
    const prev=previous[index];
    if(prev){
     const center=prev.camera+width/prev.scale/2;
     const pixels=Math.max(...[-width/2,0,width/2].map(x=>Math.abs((center+x/prev.scale-view.camera)*view.scale-(width/2+x))));
     stats[index].maxFrameShiftPx=Math.max(stats[index].maxFrameShiftPx,pixels);
     if(pixels>30)stats[index].framesOver30px++;
    }
    previous[index]=view;
   });
  }
  assert.equal(stats[1].framesOver30px,0);
  cases.push({file,width,height,before:stats[0],after:stats[1]});
 }
}
await writeFile('docs/playback-validation.json',JSON.stringify({checkedAt:new Date().toISOString(),fps:60,secondsPerCase:90,metric:'Camera-only screen displacement of static world samples at left/center/right in CSS pixels. This measures continuity, not renderer FPS.',cases,browserVisualQA:'Unverified: local browser use is disabled in Work settings.'},null,2)+'\n');
console.log(JSON.stringify({cases:cases.length,framesOver30pxAfter:0,largestFrameShiftAfter:Math.max(...cases.map(c=>c.after.maxFrameShiftPx))}));
