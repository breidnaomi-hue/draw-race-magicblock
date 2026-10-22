import type {Pose,ReplayTape} from './physics';
import {clamp} from './rig';
export function raceCamera(poses:Pose[],tape:ReplayTape,t:number,width:number,compact:boolean){
 const order=poses.map((_,i)=>i).sort((a,b)=>poses[b].x-poses[a].x),leader=order[0],normal=compact?.65:clamp(width/850,.78,1.22),baseCamera=Math.max(-85,poses[leader].x-width/normal*.59);
 if(compact)return {scale:normal,camera:baseCamera,focus:leader,comeback:false};
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
