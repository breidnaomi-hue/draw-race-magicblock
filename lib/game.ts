import {analyze,terrainScore} from './traits';
import {courseFor} from './course';
export const VERSION = 'draw-race-v4-90s-circuit';
export const DURATION = 90000;
export const COLORS = ['#b393ee','#f7976e','#93bd9a','#efce62'];
export type Point = [number, number];
export type Stroke = {color:string; width:number; erase:boolean; points:Point[]};
export type Drawing = Stroke[];
export type Player = {id:string; name:string; drawing:Drawing; ready:boolean; nonce:string; lastSeen:number; token:string; rematch:boolean};
export type PublicPlayer = Omit<Player,'token'>;
export type Race = {seed:string; secret:string; startAt:number; duration:number; track:number; round:number; players:PublicPlayer[]; commitment:string; version:string};
export type Room = {code:string; revision:number; capacity:2|4; host:string; created:number; expires:number; deadline:number; round:number; secret:string; commitment:string; players:Player[]; race:Race|null; history:Race[]};
export type PublicRoom = Omit<Room,'secret'|'players'|'history'> & {players:PublicPlayer[]; history:Race[]; serverTime:number};
export const hex = (bytes:Uint8Array) => Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
export const randomHex = (n=32) => hex(crypto.getRandomValues(new Uint8Array(n)));
export async function sha(text:string) { return hex(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)))); }
export const seedInput = (secret:string, code:string, round:number, players:{id:string;nonce:string;drawing?:Drawing}[]) => JSON.stringify([VERSION,secret,code,round,players.map(p=>[p.id,p.nonce,p.drawing||[]])]);
export function rng(seed:string) {
  let a = parseInt(seed.slice(0,8),16)>>>0;
  return () => { a += 0x6D2B79F5; let t=a; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; };
}
// Legacy equal-build ordering helper, also validates seed format.
export function order(seed:string,n:number) {
  if(n!==2&&n!==4) throw Error('Race requires two or four entrants');
  if(!/^[a-f0-9]{64}$/i.test(seed))throw Error('Invalid seed');
  const bytes=seed.match(/../g)?.map(x=>parseInt(x,16))||[];
  if(bytes.length!==32||bytes.some(x=>!Number.isFinite(x))) throw Error('Invalid seed');
  const winner=bytes[0]%n, rest=Array.from({length:n},(_,i)=>i).filter(i=>i!==winner);
  let pos=1;const fallback=rng(seed);
  for(let i=rest.length-1;i>0;i--) { const limit=256-256%(i+1); let b; do { b=pos<32?bytes[pos++]:Math.floor(fallback()*256); } while(b>=limit); const j=b%(i+1); [rest[i],rest[j]]=[rest[j],rest[i]]; }
  return [winner,...rest];
}
export type Event = {at:number; type:'boost'|'stumble'|'comeback'|'headplant'|'topple'|'drift'; lane:number; duration:number};
export type Plan = {ranking:number[]; finishes:number[]; events:Event[]; curves:number[][]; duration:number};
export function headplant(seed:string,drawing:Drawing,lane:number,track:number){const t=analyze(drawing),c=courseFor(seed,track),risk=Math.min(1,t.headRisk*(c.wind<0?1.3:1)+(c.slippery*t.headRisk*.15)),roll=parseInt(seed.slice(32+lane*2,34+lane*2),16)/256;return {occurs:roll<risk,extreme:t.headRisk===1,risk};}
export function raceOrder(seed:string,drawings:Drawing[],track:number) {
  const n=drawings.length;order(seed,n); // validate seed and field size
  const bytes=seed.match(/../g)!.map(s=>parseInt(s,16));
  // Separate 32-bit samples per entrant from SHA-256 seed. 70% random score,
  // 30% bounded terrain aptitude. These are score weights, not win probabilities.
  const c=courseFor(seed,track);
  const scores=drawings.map((d,i)=>{const k=i*4,random=(bytes[k]*16777216+bytes[k+1]*65536+bytes[k+2]*256+bytes[k+3])/4294967296,t=analyze(d),fall=headplant(seed,d,i,track);let aptitude=terrainScore(t,track);aptitude-=(.06+c.slippery*.12)*(1-t.grip/100);if(c.wind<0)aptitude-=t.headRisk*.1;else if(c.wind>0)aptitude+=(t.speed/100)*.04;if(fall.occurs)aptitude-=fall.extreme?.5:.24;return .7*random+.3*Math.max(0,Math.min(1,aptitude))});
  return Array.from({length:n},(_,i)=>i).sort((a,b)=>scores[b]-scores[a]||a-b);
}
export function makePlan(seed:string,n:number,duration=DURATION,drawings?:Drawing[],track=0):Plan {
  const rand=rng(seed.slice(8)+seed.slice(0,8)),ranking=drawings?raceOrder(seed,drawings,track):order(seed,n);
  const finishes=Array.from({length:n},(_,i)=>duration-900+ranking.indexOf(i)*260+rand()*100);
  const events:Event[]=[];
  const curves=Array.from({length:n},(_,i)=>{
    const traits=drawings?analyze(drawings[i]):null;
    const weights=Array.from({length:42},()=>0.65+rand()*1.1);
    if(drawings){const fall=headplant(seed,drawings[i],i,track);if(fall.occurs){const step=10+Math.floor(rand()*20);weights[step]*=fall.extreme?.025:.10;events.push({at:step/42*finishes[i],type:fall.extreme?'topple':'headplant',lane:i,duration:finishes[i]/42});}}
    for(let j=0;j<12;j++) { const step=2+Math.floor(rand()*36), type=j%3===0?'stumble':j%3===1?'boost':'comeback'; weights[step]*=type==='stumble'?(.3+(traits?.grip||50)/100*.3):1.5; events.push({at:step/42*finishes[i],type,lane:i,duration:finishes[i]/42}); }
    courseFor(seed,track).bends.forEach(b=>{const step=Math.floor(b*42);weights[step]*=.55+(traits?.grip||50)/150;events.push({at:step/42*finishes[i],type:'drift',lane:i,duration:finishes[i]/42})});
    let sum=weights.reduce((a,b)=>a+b,0),acc=0;
    return [0,...weights.map(w=>(acc+=w)/sum)];
  });
  return {ranking,finishes,events:events.sort((a,b)=>a.at-b.at),curves,duration};
}
export function progress(plan:Plan,lane:number,elapsed:number) {
  const t=Math.max(0,elapsed)/plan.finishes[lane]; if(t>=1) return 1;
  const x=t*(plan.curves[lane].length-1),i=Math.floor(x),f=x-i;
  const s=f*f*(3-2*f); return plan.curves[lane][i]*(1-s)+plan.curves[lane][i+1]*s;
}
export async function verifyRace(code:string,race:Race) {
  return race.version===VERSION && race.duration===DURATION && race.track===parseInt(race.seed.slice(2,4),16)%3 && (race.players.length===2||race.players.length===4) && await sha(race.secret)===race.commitment && await sha(seedInput(race.secret,code,race.round,race.players))===race.seed;
}
export function validateDrawing(value:unknown):Drawing {
  if(!Array.isArray(value)||value.length<1||value.length>250) throw Error('Draw your horse first (up to 250 strokes).');
  let total=0;
  const result=value.map((s:any)=>{
    if(!s||!/^#[0-9a-f]{6}$/i.test(s.color)||!Number.isFinite(s.width)||s.width<1||s.width>50||!Array.isArray(s.points)||s.points.length<1||s.points.length>3000) throw Error('Invalid drawing');
    total+=s.points.length;
    return {color:s.color,width:s.width,erase:!!s.erase,points:s.points.map((p:unknown)=>{
      if(!Array.isArray(p)||p.length!==2||p.some(v=>!Number.isFinite(v)||v<0||v>640)) throw Error('Invalid drawing coordinates');
      return [Math.round(p[0]*10)/10,Math.round(p[1]*10)/10] as Point;
    })};
  });
  if(total>16000||!result.some(s=>!s.erase)) throw Error('Drawing is empty or too detailed.');
  return result;
}
