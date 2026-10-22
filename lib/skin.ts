import type {Spec} from './rig';
import {clamp} from './rig';
import type {Pose} from './physics';
// Skin the original ink. The solver owns the torso, head and foot targets;
// these weights only distribute their motion across the drawing's vertices.
export function skinPoint(x:number,y:number,s:Spec,p:Pose){
  const r=s.rig,k=s.inkScale,c=Math.cos(p.angle),z=Math.sin(p.angle);
  const local=(anchor:[number,number],angle=p.angle)=>{const dx=(x-anchor[0])*k,dy=(y-anchor[1])*k;return {x:Math.cos(angle)*dx-Math.sin(angle)*dy,y:Math.sin(angle)*dx+Math.cos(angle)*dy}};
  const b=local(r.body);b.y*=1-clamp(p.compression,-.3,.3)*.22;
  const base={x:p.x+b.x,y:p.y+b.y};
  const head=local(r.head,p.headAngle),ht={x:p.headX+head.x,y:p.headY+head.y};
  const lower=clamp((y-r.body[1])/(r.bounds.h*.29),0,1),upper=clamp((r.body[1]+r.bounds.h*.1-y)/(r.bounds.h*.27),0,1);
  const headNear=Math.exp(-(((x-r.head[0])/(r.bounds.w*.27))**2+((y-r.head[1])/(r.bounds.h*.34))**2)*2)*upper;
  const neckNear=Math.exp(-(((x-r.neck[0])/(r.bounds.w*.2))**2+((y-r.neck[1])/(r.bounds.h*.28))**2)*2)*upper*(1-headNear);
  let out={x:base.x+(ht.x-base.x)*(headNear+neckNear*.45),y:base.y+(ht.y-base.y)*(headNear+neckNear*.45)};
  for(const key of ['front','rear'] as const){const anchor=r[key],near=Math.exp(-(((x-anchor[0])/(r.bounds.w*.16))**2+((y-anchor[1])/(r.bounds.h*.36))**2)*1.5)*lower;
    const ax=(anchor[0]-r.body[0])*k,ay=(anchor[1]-r.body[1])*k,rest={x:p.x+c*ax-z*ay,y:p.y+z*ax+c*ay};
    const fx=key==='front'?p.frontX:p.rearX,fy=key==='front'?p.frontY:p.rearY;
    out.x+=(fx-rest.x)*near;out.y+=(fy-rest.y)*near;
  }
  return out;
}
