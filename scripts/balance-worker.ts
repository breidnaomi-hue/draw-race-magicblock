import {createHash} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
import {samples} from '../lib/samples';
import {specFor} from '../lib/rig';
const [phase,startText,endText,out]=process.argv.slice(2),start=+startText,end=+endText;
const physics:any=phase==='before'?await import('../tests/baseline/physics'):await import('../lib/physics');
const rows:any[]=[];
for(let id=start;id<end;id++){
 const seed=createHash('sha256').update('draw-race-comeback-study-1:'+id).digest('hex');
 const picks=Array.from({length:4},(_,lane)=>id%5===0?Math.floor(id/5)%5:(id*7+lane*3+Math.floor(id/5))%5),drawings=picks.map(i=>samples[i].drawing);
 const specs=drawings.map(d=>specFor(d)),tape=physics.simulate(seed,drawings,[],id%3,{specs}),d=physics.decodeTape(tape);
 const positions=(t:number)=>Array.from({length:4},(_,lane)=>physics.poseAt(tape,lane,t,d).x);
 const checkpoints=[30000,45000,65000].map(t=>{const x=positions(t),order=x.map((_,i)=>i).sort((a,b)=>x[b]-x[a]),leader=order[0];return {leader,gap:(x[leader]-x[order[1]])/tape.course.length*100,finished:tape.finishes.some((f:number)=>f>0&&f<=t),deficits:x.map(v=>(x[leader]-v)/tape.course.length*100)}});
 let changes=0,previous=0,maxDeficit=0,maxDeficitAt=0;
 for(let t=5000;t<=90000;t+=1000){const x=positions(t);if(x.some(v=>!Number.isFinite(v)))throw Error('Nonfinite record '+id);const lead=x.indexOf(Math.max(...x));if(t===5000)previous=lead;if(lead!==previous&&x[lead]>x[previous]+8){changes++;previous=lead}if(!tape.finishes.some((f:number)=>f&&f<t)&&t>=20000){const deficit=(Math.max(...x)-x[tape.ranking[0]])/tape.course.length*100;if(deficit>maxDeficit){maxDeficit=deficit;maxDeficitAt=t}}}
 const counts:Record<string,number>={};for(const e of tape.events)counts[e.type]=(counts[e.type]||0)+1;
 rows.push({id,seed,picks,winner:tape.ranking[0],checkpoints,changes,maxDeficit,maxDeficitAt,counts,diagnostics:tape.diagnostics,finishes:tape.finishes,distances:tape.distances,types:[...new Set(tape.course.obstacles.map((o:{type:string})=>o.type))]});
 if((id-start+1)%100===0)console.log(JSON.stringify({phase,done:id-start+1,total:end-start}));
}
await writeFile(out,rows.map(r=>JSON.stringify(r)).join('\n')+'\n');console.log(JSON.stringify({phase,completed:rows.length,out}));



