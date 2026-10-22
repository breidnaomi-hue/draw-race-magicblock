import {simulate,poseAt,decodeTape,STATES} from '../lib/physics';
import {sha} from '../lib/game';
import {samples} from '../lib/samples';
import {writeFile} from 'node:fs/promises';
const total=Number(process.argv[2]||1000),wins=Array(5).fill(0),starts=Array(5).fill(0),seatWins=[0,0],events:Record<string,number>={},distances=Array(5).fill(0),finish=Array(5).fill(0),begin=Date.now();
const pairs=Array.from({length:5},(_,a)=>Array.from({length:4-a},(_,j)=>[a,a+j+1])).flat();
let falls=0,recoveries=0,maxAir=0;
for(let i=0;i<total;i++){
  const equal=i<total/2,pair=equal?[i%5,i%5]:pairs[Math.floor((i-total/2)/50)%10],a=pair[i%2],b=pair[1-i%2];
  const seed=await sha('physics-regression-v5-'+i),p=simulate(seed,[samples[a].drawing,samples[b].drawing],[],i%3),d=decodeTape(p);
  for(let lane=0;lane<2;lane++){const type=lane?b:a;starts[type]++;distances[type]+=p.distances[lane];if(p.finishes[lane])finish[type]++;for(let t=0;t<=90000;t+=1000){const q=poseAt(p,lane,t,d);if(!Object.values(q).every(Number.isFinite)||Math.abs(q.y)>600||q.x<0)throw Error('Unstable sample '+i+' '+lane+' '+t)}}
  if(equal)seatWins[p.ranking[0]]++;else wins[p.ranking[0]?b:a]++;
  for(const e of p.events){if(!STATES.includes(e.type)||e.at<0||e.at>90000)throw Error('Bad event');events[e.type]=(events[e.type]||0)+1}
  falls+=p.diagnostics.falls;recoveries+=p.diagnostics.recoveries;maxAir=Math.max(maxAir,p.diagnostics.maxAir);
  if((i+1)%50===0)console.log(JSON.stringify({done:i+1,total,seconds:Math.round((Date.now()-begin)/1000)}));
}
const report={total,seconds:(Date.now()-begin)/1000,equalBuildSeatWins:seatWins,mixedBuildWins:wins,samples:samples.map((s,i)=>({name:s.name,starts:starts[i],meanDistance:Math.round(distances[i]/starts[i]),finishRate:finish[i]/starts[i]})),events,falls,recoveries,maxAir};
await writeFile('docs/physics-batch.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));


