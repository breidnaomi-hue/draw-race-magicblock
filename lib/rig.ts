import type {Drawing,Point} from './game';
import {analyze} from './traits';
import Math from './physics-math.cjs';
export type RigKey='body'|'neck'|'head'|'front'|'rear';
export const RIG_KEYS:RigKey[]=['body','head','neck','front','rear'];
export type RigMarks=Record<RigKey,Point>;
export type Rig=RigMarks&{bounds:{x:number;y:number;w:number;h:number};automatic:boolean};
export type Attributes={speed:number;acceleration:number;balance:number;jump:number;endurance:number};
export type Spec={rig:Rig;attributes:Attributes;headRisk:number;mass:number;legLength:number;headOffset:Point;inkScale:number};
export const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
function closedTorso(d:Drawing){let best:{x:number;y:number;w:number;h:number}|undefined;for(const s of d){if(s.erase||s.points.length<5||(s.points.length>6&&s.points.length<25))continue;const first=s.points[0],last=s.points.at(-1)!;if(Math.hypot(first[0]-last[0],first[1]-last[1])>12)continue;const xs=s.points.map(p=>p[0]),ys=s.points.map(p=>p[1]),box={x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};if(box.w>70&&box.h>25&&(!best||box.w*box.h>best.w*best.h))best=box;}return best;}
export function autoRig(d:Drawing,custom?:RigMarks):Rig {
  const points=d.filter(s=>!s.erase).flatMap(s=>s.points);let x=640,y=400,right=0,bottom=0;
  points.forEach(p=>{x=Math.min(x,p[0]);y=Math.min(y,p[1]);right=Math.max(right,p[0]);bottom=Math.max(bottom,p[1])});
  if(!points.length){x=120;y=60;right=520;bottom=350}
  const w=Math.max(40,right-x),h=Math.max(40,bottom-y),nearest=(u:number,v:number,region:(p:Point)=>boolean):Point=>{const target:Point=[x+w*u,y+h*v];let result:Point=target,best=Infinity;for(const p of points){if(!region(p))continue;const dist=((p[0]-target[0])/w)**2+((p[1]-target[1])/h)**2;if(dist<best){best=dist;result=[p[0],p[1]]}}return result};
  const marks:RigMarks={body:[x+w*.46,y+h*.57],neck:[x+w*.66,y+h*.48],head:nearest(.84,.22,p=>p[0]>x+w*.6&&p[1]<y+h*.48),front:nearest(.7,.96,p=>p[0]>x+w*.5&&p[1]>y+h*.65),rear:nearest(.27,.96,p=>p[0]<x+w*.5&&p[1]>y+h*.65)};
  const torso=closedTorso(d);if(torso){marks.body=[torso.x+torso.w/2,torso.y+torso.h/2];marks.neck=[torso.x+torso.w*.88,torso.y+torso.h*.3];}
  return {...(custom||marks),bounds:{x,y,w,h},automatic:!custom};
}
export function validateRig(value:unknown):RigMarks|undefined {
  if(value===undefined||value===null)return undefined;const v=value as RigMarks,result={} as RigMarks;
  for(const k of RIG_KEYS){if(!Array.isArray(v[k])||v[k].length!==2||!v[k].every(Number.isFinite)||v[k][0]<0||v[k][0]>640||v[k][1]<0||v[k][1]>400)throw Error('Invalid joint marker');result[k]=v[k].map(n=>Math.round(n*10)/10) as Point}
  return result;
}
export function specFor(d:Drawing,custom?:RigMarks):Spec {
  const t=analyze(d),rig=autoRig(d,custom);
  const torso=closedTorso(d),body=torso?clamp(.2+(torso.h/torso.w-.28)*1.6,.15,.85):t.body,legs=torso?clamp((rig.front[1]-rig.body[1]-torso.h*.35)/(rig.bounds.h*.45),0,1):t.legs;
  const raw={speed:50+(.5-body)*24+(legs-.5)*10,acceleration:50+(legs-.5)*18-(body-.5)*18,balance:50+(body-.5)*32-(legs-.5)*8,jump:50+(.5-body)*20+(legs-.5)*16,endurance:50+(body-.5)*22-(legs-.5)*8};
  const values=Object.values(raw),mean=values.reduce((a,b)=>a+b,0)/5,scale=Math.min(1,25/Math.max(25,...values.map(v=>Math.abs(v-mean))));
  const attributes=Object.fromEntries(Object.entries(raw).map(([k,v])=>[k,Math.round((50+(v-mean)*scale)*100)/100])) as Attributes;
  const inkScale=110/Math.max(rig.bounds.w,rig.bounds.h*.7);
  return {rig,attributes,headRisk:t.headRisk,mass:2.5+body,legLength:32+(legs-.5)*6,headOffset:[clamp((rig.head[0]-rig.body[0])*inkScale,18,70),clamp((rig.head[1]-rig.body[1])*inkScale,-58,-14)],inkScale};
}

