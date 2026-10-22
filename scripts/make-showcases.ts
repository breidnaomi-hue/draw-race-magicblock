import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {simulate,decodeTape,poseAt,tapePayload,ReplayTape} from '../lib/physics';
import {Race,VERSION,sha} from '../lib/game';
import {samples} from '../lib/samples';
import {specFor} from '../lib/rig';
const phase=process.argv[2]||'after',root='docs/comeback',files=(await readdir(root)).filter(f=>f.startsWith('raw-'+phase+'-')&&f.endsWith('.jsonl'));
const rows=(await Promise.all(files.map(f=>readFile(root+'/'+f,'utf8')))).flatMap(s=>s.trim().split('\n').map(s=>JSON.parse(s))),entries:any[]=[];
await mkdir('public/showcases',{recursive:true});
function inputs(row:any){const drawings=row.picks.map((i:number)=>samples[i].drawing);return {drawings,specs:drawings.map((d:any)=>specFor(d))}}
async function save(row:any,category:string,description:string,markers:{at:number;label:string}[],tape?:ReplayTape,suffix='',counterfactual?:string){const {drawings,specs}=inputs(row);tape??=simulate(row.seed,drawings,[],row.id%3,{specs});tape.hash=await sha(tapePayload(tape));const key=category.startsWith("Leader holds")?"held":category.startsWith("From behind")?"comeback":category.startsWith("Lead keeps")?"changes":category.startsWith("The barrier")?"barrier":"counterfactual";const race:Race={seed:row.seed,secret:'',commitment:'',version:VERSION,round:1,startAt:0,duration:90000,track:row.id%3,players:drawings.map((drawing:any,lane:number)=>({id:'study-'+lane,name:samples[row.picks[lane]].name+' '+(lane+1),drawing,spec:specs[lane],nonce:'0'.repeat(64),ready:true,lastSeen:0,rematch:false})),tape,example:{id:row.id,key,category,description,markers,counterfactual,variant:!!suffix}},url='/showcases/'+row.id+suffix+'.json';await writeFile('public'+url,JSON.stringify(race));if(!suffix)entries.push({id:row.id,key,category,description,url});console.log(JSON.stringify({category,id:row.id,seed:row.seed,winner:tape.ranking[0],markers}));return race;}
const held=rows.find(r=>!r.checkpoints[1].finished&&r.checkpoints[1].gap>5&&r.checkpoints[1].leader===r.winner)!;
await save(held,'Leader holds on',`A ${held.checkpoints[1].gap.toFixed(1)}-point lead at 45s survives the chase.`,[{at:45000,label:'Leader ahead'},{at:65000,label:'Final push'},{at:88000,label:'Final metres'}]);
const comeback=rows.filter(r=>r.maxDeficit>=10&&r.maxDeficitAt>=60000).sort((a,b)=>b.maxDeficit-a.maxDeficit)[0]||rows.filter(r=>r.maxDeficit>=10).sort((a,b)=>b.maxDeficit-a.maxDeficit)[0];
const comebackTape=simulate(comeback.seed,inputs(comeback).drawings,[],comeback.id%3,{specs:inputs(comeback).specs}),boost=comebackTape.events.find(e=>e.lane===comeback.winner&&['COMEBACK SURGE','RAGE MODE','ADRENALINE RUSH'].includes(e.type)&&e.at>=comeback.maxDeficitAt-5000);
await save(comeback,'From behind to winner',`The winner was ${comeback.maxDeficit.toFixed(1)} points behind at ${(comeback.maxDeficitAt/1000).toFixed(0)}s.`,[{at:comeback.maxDeficitAt,label:'Maximum deficit'},...(boost?[{at:boost.at+1200,label:boost.type}]:[]),{at:88000,label:'Final metres'}],comebackTape);
const changes=rows.filter(r=>r.changes>=4).sort((a,b)=>b.changes-a.changes)[0];
await save(changes,'Lead keeps changing',`${changes.changes} lead changes after the opening five seconds.`,[{at:30000,label:'First third'},{at:65000,label:'Final push'},{at:88000,label:'Final metres'}]);
let found=false,tries=0;
for(const row of rows.filter(r=>r.counts['OBSTACLE CRASH']&&r.changes>0&&!entries.some(e=>e.id===r.id)).slice(0,350)){
 const {drawings,specs}=inputs(row),tape=simulate(row.seed,drawings,[],row.id%3,{specs}),d=decodeTape(tape);
 for(const e of tape.events.filter(e=>e.type==='OBSTACLE CRASH'&&e.at>15000&&e.at<82000&&e.lane!==row.winner)){
  const before=tape.specs.map((_,lane)=>poseAt(tape,lane,e.at-600,d).x);if(before.indexOf(Math.max(...before))!==e.lane)continue;
  const course=structuredClone(tape.course);course.obstacles=course.obstacles.filter(o=>o.id!==e.obstacle);
  const alternative=simulate(row.seed,drawings,[],row.id%3,{specs,course});tries++;
  if(alternative.ranking[0]!==e.lane)continue;
  await save(row,'The barrier changes the result',`At ${(e.at/1000).toFixed(1)}s the leader hits a barrier. Removing only that barrier changes the winner.`,[{at:e.at-700,label:'Before contact'},{at:e.at+700,label:'After contact'},{at:88000,label:'Final metres'}],tape,'','/showcases/'+row.id+'-without-barrier.json');
  await save(row,'Counterfactual: barrier removed','Same seed and rules; one collider removed. This is a separate physical simulation.',[{at:e.at,label:'Former collision point'},{at:88000,label:'Final metres'}],alternative,'-without-barrier');
  found=true;break;
 }
 if(found)break;
}
if(!found)throw Error('No decisive obstacle seed found; counterfactuals tested '+tries);
await writeFile('public/showcases/index.json',JSON.stringify(entries,null,2));await writeFile('docs/comeback/showcases.json',JSON.stringify({phase,entries,counterfactualTries:tries},null,2));



