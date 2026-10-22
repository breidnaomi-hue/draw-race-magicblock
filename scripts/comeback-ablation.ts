import {createHash} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
import {simulate,poseAt,decodeTape} from '../lib/physics';
import {samples} from '../lib/samples';
import {specFor} from '../lib/rig';
const total=Number(process.argv[2]||500);let changedByTraits=0,changedByComeback=0;const sampleWins=Array(5).fill(0),offWins=Array(5).fill(0);const rows=[];
for(let i=0;i<total;i++){
 const seed=createHash('sha256').update('draw-race-comeback-ablation:'+i).digest('hex'),picks=Array.from({length:4},(_,j)=>(i+j*3)%5),drawings=picks.map(k=>samples[k].drawing),specs=drawings.map(d=>specFor(d));
 const normal=simulate(seed,drawings,[],i%3,{specs}),noTraits=simulate(seed,drawings,[],i%3,{specs,course:normal.course,traitWeight:0}),noComeback=simulate(seed,drawings,[],i%3,{specs,course:normal.course,comeback:false});
 if(normal.ranking[0]!==noTraits.ranking[0])changedByTraits++;if(normal.ranking[0]!==noComeback.ranking[0])changedByComeback++;sampleWins[picks[normal.ranking[0]]]++;offWins[picks[noTraits.ranking[0]]]++;
 rows.push({id:i,seed,picks,normal:normal.ranking[0],noTraits:noTraits.ranking[0],noComeback:noComeback.ranking[0]});if((i+1)%50===0)console.log(JSON.stringify({ablation:i+1,total}));
}
await writeFile('docs/comeback/ablation.json',JSON.stringify({total,changedByTraits,changedByComeback,sampleWins,traitWeightZeroWins:offWins,interpretation:'Matched seeds and new courses; removing the .30 stat contribution retains physical shape geometry. Comeback-off disables soft-band and scheduled comeback opportunities; ordinary surfaces and recovery physics remain.',rows},null,2));
