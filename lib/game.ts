import {analyze,terrainScore} from './traits';
import {courseFor} from './course';
import {simulate,replayFor,poseAt,tapePayload} from './physics';
import type {ReplayTape} from './physics';
import type {RigMarks,Spec} from './rig';
import {specFor} from './rig';
import {COMEBACK_RULESET} from './comeback';
export const VERSION = 'draw-race-v6-comeback-2';
export const SUPPORTED_VERSIONS=[VERSION,'draw-race-v5-matter-rig'];
export const DURATION = 90000;
export const COLORS = ['#b393ee','#f7976e','#93bd9a','#efce62'];
export type Point = [number, number];
export type Stroke = {color:string; width:number; erase:boolean; points:Point[]};
export type Drawing = Stroke[];
export type Player = {id:string; name:string; drawing:Drawing; rig?:RigMarks;spec?:Spec; ready:boolean; nonce:string; lastSeen:number; token:string; rematch:boolean};
export type PublicPlayer = Omit<Player,'token'>;
export type RaceExample={id:number;key?:string;category:string;description:string;markers:{at:number;label:string}[];counterfactual?:string;variant?:boolean};
export type Race = {seed:string; secret:string; startAt:number; duration:number; track:number; round:number; players:PublicPlayer[]; commitment:string; version:string;tape?:ReplayTape;example?:RaceExample};
export type Room = {code:string; revision:number; capacity:2|4; host:string; created:number; expires:number; deadline:number; round:number; secret:string; commitment:string; players:Player[]; race:Race|null; history:Race[]};
export type PublicRoom = Omit<Room,'secret'|'players'|'history'> & {players:PublicPlayer[]; history:Race[]; serverTime:number};
export const hex = (bytes:Uint8Array) => Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
export const randomHex = (n=32) => hex(crypto.getRandomValues(new Uint8Array(n)));
export async function sha(text:string) { return hex(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)))); }
export const seedInput = (secret:string, code:string, round:number, players:{id:string;nonce:string;drawing?:Drawing;rig?:RigMarks;spec?:Spec}[],version=VERSION) => JSON.stringify([version,secret,code,round,players.map(p=>[p.id,p.nonce,p.drawing||[],p.rig||null,p.spec||null])]);
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
export type Plan={ranking:number[];finishes:number[];events:ReplayTape['events'];duration:number;tape:ReplayTape};
export function planFor(race:Race):Plan {const {tape}=replayFor(race);return {ranking:tape.ranking,finishes:tape.finishes,events:tape.events,duration:tape.duration,tape};}
export function makePlan(seed:string,n:number,duration=DURATION,drawings?:Drawing[],track=0):Plan {if(!drawings||drawings.length!==n)throw Error('Physics requires the frozen drawings');const tape=simulate(seed,drawings,[],track,{duration});return {ranking:tape.ranking,finishes:tape.finishes,events:tape.events,duration,tape};}
export function raceOrder(seed:string,drawings:Drawing[],track:number) {return simulate(seed,drawings,[],track).ranking;}
export function progress(plan:Plan,lane:number,elapsed:number) {return Math.min(1,Math.max(0,poseAt(plan.tape,lane,elapsed).x/plan.tape.course.length));}
export async function attachTape(race:Race){const tape=simulate(race.seed,race.players.map(p=>p.drawing),race.players.map(p=>p.rig),race.track,{specs:race.players.map(p=>p.spec!).every(Boolean)?race.players.map(p=>p.spec!):undefined});tape.hash=await sha(tapePayload(tape));race.tape=tape;return race;}
export async function verifyRace(code:string,race:Race) {return SUPPORTED_VERSIONS.includes(race.version)&&race.duration===DURATION&&race.track===parseInt(race.seed.slice(2,4),16)%3&&(race.players.length===2||race.players.length===4)&&await sha(race.secret)===race.commitment&&await sha(seedInput(race.secret,code,race.round,race.players,race.version))===race.seed&&(!race.tape||await sha(tapePayload(race.tape))===race.tape.hash);}
export async function auditSimulation(race:Race){if(race.version!==VERSION||!race.tape||race.tape.rules?.id!==COMEBACK_RULESET)return false;const specs=race.players.map(p=>specFor(p.drawing,p.rig)),tape=simulate(race.seed,race.players.map(p=>p.drawing),race.players.map(p=>p.rig),race.track,{specs,...(race.example?.variant?{course:race.tape.course}:{})});return await sha(tapePayload(tape))===race.tape.hash;}
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




