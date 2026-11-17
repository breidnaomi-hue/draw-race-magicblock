import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {simulate,tapePayload} from '../lib/physics';
import {exampleHorse} from '../lib/drawing';
import {samples} from '../lib/samples';
import {sha} from '../lib/game';
const endpoint=process.env.RUNTIME_PROBE_URL||'http://127.0.0.1:8799/';
const original=JSON.parse(await readFile('public/vrf-production.json','utf8')).race;
const cases=[{name:'original-production-counterexample',...original},...await Promise.all(Array.from({length:20},async(_,i)=>({name:'corpus-'+i,seed:await sha('draw-race-runtime-v1:'+i),track:i%3,players:Array.from({length:i%2?2:4},(_,lane)=>({drawing:(i%3?samples[(i+lane)%samples.length].drawing:exampleHorse(lane))}))})))];
const nativeSin=Math.sin,nativeCos=Math.cos,results=[];
for(const item of cases){
 const specs=item.players.map((p:any)=>p.spec),node=simulate(item.seed,item.players.map((p:any)=>p.drawing),item.players.map((p:any)=>p.rig),item.track,{specs:specs.every(Boolean)?specs:undefined});
 const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(item),signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw Error('Worker probe '+response.status+': '+(await response.text()).slice(0,400));
 const worker=(await response.json() as any).tape;
 assert.equal(tapePayload(worker),tapePayload(node),'Full Node/Worker tape differs for '+item.name);
 assert.equal(Math.sin,nativeSin);assert.equal(Math.cos,nativeCos);
 results.push({name:item.name,seed:item.seed,lanes:node.lanes,ranking:node.ranking,hash:await sha(tapePayload(node))});
}
await mkdir('outputs/runtime',{recursive:true});
await writeFile('outputs/runtime/corpus.json',JSON.stringify({checkedAt:new Date().toISOString(),environments:['Node.js '+process.version+' / '+process.platform,'local Cloudflare workerd'],cases:results,fullTapesMatch:true,globalMathUnchanged:true},null,2));
console.log(JSON.stringify({cases:results.length,fullTapesMatch:true,globalMathUnchanged:true}));
