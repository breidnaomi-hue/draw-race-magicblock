import type {Pose,ReplayTape} from './physics';
import {clamp} from './rig';
export function raceCamera(poses:Pose[],tape:ReplayTape,t:number,width:number,compact:boolean,height=600){
 const order=poses.map((_,i)=>i).sort((a,b)=>poses[b].x-poses[a].x),leader=order[0],normal=compact?.65:Math.min(height<420?.62:1.22,clamp(width/850,.78,1.22)),baseCamera=Math.max(-85,poses[leader].x-width/normal*.59);
 if(compact)return {scale:normal,camera:baseCamera,focus:leader,comeback:false};
 const left=Math.min(...poses.map(q=>q.x)),right=Math.max(...poses.map(q=>q.x));
 // Portrait framing keeps a reasonably close field together without changing
 // a single recorded position. Widely separated fields retain action framing.
 if(width<600&&right-left<1800){const scale=Math.min(normal,width*.74/(right-left+200));return {scale,camera:Math.max(-85,(left+right)/2-width/scale*.5),focus:leader,comeback:false};}
 const charges=tape.events.filter(e=>['COMEBACK SURGE','RAGE MODE','ADRENALINE RUSH'].includes(e.type)&&e.at<t&&e.at+e.duration>t&&e.lane!==leader&&poses[e.lane]?.vx>poses[leader].vx+.15&&(e.gap||0)>.05);
 const score=(e:typeof charges[number])=>(e.type==='COMEBACK SURGE'?1200:0)+poses[e.lane].vx*180-Math.abs(poses[e.lane].x-poses[leader].x)*.6;
 const charge=charges.sort((a,b)=>score(b)-score(a))[0];
 let focus=charge?.lane??leader,other=leader;
 if(!charge&&t>=65000&&order.length>1&&poses[leader].x-poses[order[1]].x<850)focus=order[1];
 if(focus===other)return {scale:normal,camera:baseCamera,focus,comeback:false};
 const gap=Math.abs(poses[focus].x-poses[other].x),targetScale=clamp(width*.70/(gap+220),normal*.16,normal),mid=(poses[focus].x+poses[other].x)/2;
 const ease=charge?Math.min(clamp((t-charge.at)/650,0,1),clamp((charge.at+charge.duration-t)/850,0,1)):clamp((t-65000)/1200,0,1);
 const scale=normal+(targetScale-normal)*ease,camera=baseCamera+(Math.max(-85,mid-width/scale*.5)-baseCamera)*ease;
 return {scale,camera,focus,comeback:!!charge};
}

type CameraView=ReturnType<typeof raceCamera>;
function damp(value:number,target:number,velocity:number,time:number,maxSpeed:number,dt:number){
 const omega=2/time,change=clamp(value-target,-maxSpeed*time,maxSpeed*time),goal=value-change;
 const decay=Math.exp(-omega*dt),step=(velocity+omega*change)*dt;
 return {value:goal+(change+step)*decay,velocity:(velocity-omega*step)*decay};
}

// raceCamera selects a composition from the immutable tape. Only its display
// transition has memory: a boost/leader switch must not cut across the track.
export class RaceCameraMotion {
 private center=0;
 private zoom=0;
 private centerVelocity=0;
 private zoomVelocity=0;
 private width=0;
 private height=0;
 next(target:CameraView,width:number,height:number,deltaMs:number,reset=false):CameraView{
  const targetZoom=Math.log(target.scale),targetCenter=target.camera+width/(target.scale*2);
  if(reset||width!==this.width||height!==this.height){
   this.center=targetCenter;this.zoom=targetZoom;this.centerVelocity=0;this.zoomVelocity=0;
  }else{
   const dt=Math.max(0,Math.min(deltaMs/1000,.1));
   const zoom=damp(this.zoom,targetZoom,this.zoomVelocity,.4,.85,dt);
   const center=damp(this.center,targetCenter,this.centerVelocity,.34,width/Math.exp(this.zoom)*.65,dt);
   this.zoom=zoom.value;this.zoomVelocity=zoom.velocity;this.center=center.value;this.centerVelocity=center.velocity;
  }
  this.width=width;this.height=height;
  const scale=Math.exp(this.zoom),camera=Math.max(-85,this.center-width/(scale*2));
  this.center=camera+width/(scale*2);
  return {...target,scale,camera};
 }
}
