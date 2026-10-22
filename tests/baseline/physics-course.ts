import {clamp} from '../../lib/rig';
export type WeatherKind='Sunshine'|'Rain'|'Strong wind'|'Fog'|'Snow & ice';
export type WeatherPhase={at:number;kind:WeatherKind;wet:number;wind:number;visibility:number;ice:number};
export type PhysicsObstacle={id:number;x:number;width:number;height:number;type:'barrier'|'pit'|'puddle'|'mud'|'ramp'|'ice'};
export type Section={from:number;to:number;type:'straight'|'sweeper'|'hairpin'|'uphill'|'downhill'|'hazards'|'finish';curve:number};
export type PhysicsCourse={length:number;environment:'Woodland'|'Farmyard'|'Snowfield';obstacles:PhysicsObstacle[];weather:WeatherPhase[];sections:Section[]};
function random(seed:string){let s=parseInt(seed.slice(0,8),16)||1;return()=>{s^=s<<13;s^=s>>>17;s^=s<<5;return(s>>>0)/4294967296}}
export function physicsCourse(seed:string,track:number):PhysicsCourse {
  const rand=random(seed.slice(16)+seed.slice(0,16)),length=8400;
  const kinds:WeatherKind[]=['Sunshine','Rain','Strong wind','Fog','Snow & ice'];
  const weather=[0,26000+rand()*6000,54000+rand()*5000,76000].map((at,i)=>{const kind=kinds[(Math.floor(rand()*5)+(track===2?4:0))%5];return {at:Math.round(at),kind,wet:kind==='Rain'?.8:kind==='Snow & ice'?.25:.05,wind:kind==='Strong wind'?(rand()>.5?1:-1)*(.65+rand()*.35):0,visibility:kind==='Fog'?.35:1,ice:kind==='Snow & ice'?.9:0}});
  const types:PhysicsObstacle['type'][]=['barrier','puddle','pit','mud','ramp','barrier','ice','mud','barrier','puddle','ramp'];
  const obstacles=types.map((type,id)=>({id,type,x:650+id*625+Math.round(rand()*90),width:type==='barrier'?18:type==='ramp'?110:140+rand()*70,height:type==='barrier'?37+rand()*20:type==='pit'?27:type==='ramp'?38:0}));
  const sections:Section[]=[{from:0,to:1100,type:'straight',curve:0},{from:1100,to:2100,type:'sweeper',curve:.55},{from:2100,to:3100,type:'uphill',curve:0},{from:3100,to:4050,type:'hairpin',curve:-1},{from:4050,to:4900,type:'downhill',curve:0},{from:4900,to:6300,type:'hazards',curve:.2},{from:6300,to:7400,type:'sweeper',curve:.75},{from:7400,to:9000,type:'finish',curve:0}];
  return {length,environment:['Woodland','Farmyard','Snowfield'][track%3] as PhysicsCourse['environment'],obstacles,weather,sections};
}
export function weatherAt(course:PhysicsCourse,ms:number):WeatherPhase {return [...course.weather].reverse().find(w=>w.at<=ms)||course.weather[0]}
export function sectionAt(course:PhysicsCourse,x:number){return course.sections.find(s=>x>=s.from&&x<s.to)||course.sections.at(-1)!}
export function groundAt(course:PhysicsCourse,x:number){
  let y=0;if(x>1900&&x<4900)y=-Math.sin((x-1900)/3000*Math.PI)*55;
  for(const o of course.obstacles){if(o.type==='pit'&&x>o.x&&x<o.x+o.width)y+=Math.sin((x-o.x)/o.width*Math.PI)*o.height;if(o.type==='ramp'&&x>o.x&&x<o.x+o.width)y-=((x-o.x)/o.width)*o.height;}
  return y;
}
export function curveAt(course:PhysicsCourse,x:number){const s=sectionAt(course,x),p=clamp((x-s.from)/(s.to-s.from),0,1);return s.curve*Math.sin(p*Math.PI);}

