import {createCanvas} from '@napi-rs/canvas';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {paint} from '../lib/drawing';
import {decodeTape,poseAt} from '../lib/physics';
import {skinPoint} from '../lib/skin';
import {weatherAt} from '../lib/physics-course';
import {drawBackground,bend,warp} from '../components/race-surface';
import {weatherVisualProfile,drawWeatherParticles} from '../lib/weather-visuals';
import type {Race} from '../lib/game';
const root=new URL('../',import.meta.url),sample=JSON.parse(await readFile(new URL('public/vrf-demo.json',root),'utf8'));
const race:Race=sample.race,tape=race.tape!,decoded=decodeTape(tape),proof=race.vrf!;
const out=new URL('outputs/vrf/clip-frames/',root);await mkdir(out,{recursive:true});
const w=1280,h=720,fps=30,seconds=12,canvas=createCanvas(w,h),g=canvas.getContext('2d');
const inks=race.players.map(p=>{const c=createCanvas(640,400);paint(c.getContext('2d') as any,p.drawing);return c;});
const colors=['#b393ee','#f7976e','#93bd9a','#efce62'];
function text(value:string,x:number,y:number,size=22,color='#34273f',weight=700){g.fillStyle=color;g.font=weight+' '+size+'px sans-serif';g.fillText(value,x,y);}
function box(x:number,y:number,width:number,height:number,color:string,r=18){g.fillStyle=color;g.beginPath();g.roundRect(x,y,width,height,r);g.fill();}
for(let frame=0;frame<fps*seconds;frame++){
 const sec=frame/fps;g.resetTransform();g.globalAlpha=1;g.globalCompositeOperation='source-over';g.fillStyle='#faf5e9';g.fillRect(0,0,w,h);
 text('DRAW RACE',48,59,37);text('Draw your horse. Race your friends.',48,96,21,'#736178',600);
 box(850,27,382,61,'#e4daf2');text('MagicBlock VRF  ·  SOLANA DEVNET',870,64,18,'#53377d');
 if(sec<1.8){
  box(45,130,1190,435,'#fffdf8');text('DRAW YOUR CONTENDER',80,182,25);
  g.save();g.translate(340,185);g.scale(.95,.95);const drawing=race.players[0].drawing,total=drawing.reduce((sum,s)=>sum+s.points.length,0),limit=Math.floor(Math.min(1,(sec+.25)/1.65)*total);let drawn=0;
  const partial=drawing.map(s=>{const points=s.points.slice(0,Math.max(0,limit-drawn));drawn+=s.points.length;return {...s,points};}).filter(s=>s.points.length);
  const ink=createCanvas(640,400);paint(ink.getContext('2d') as any,partial);g.drawImage(ink,0,0);g.restore();
  text('Drawings locked before the single VRF request.',80,537,22,'#72596e');
 }else if(sec<10.2){
  const t=25500+(sec-1.8)*1000,poses=race.players.map((_,i)=>poseAt(tape,i,t,decoded)),left=Math.min(...poses.map(p=>p.x)),right=Math.max(...poses.map(p=>p.x));
  const scale=Math.min(1.25,w*.79/(right-left+230)),camera=Math.max(-85,(left+right)/2-w/scale*.5),top=65,lh=88;
  g.save();g.translate(0,132);g.beginPath();g.rect(0,0,w,440);g.clip();drawBackground(g as any,w,440,tape.course,t,camera,scale,top,lh,4,false,false,true);
  const regions:any[]=[];
  for(let lane=0;lane<4;lane++){
   const p=poses[lane],spec=tape.specs[lane],sx=(x:number)=>(x-camera)*scale,sy=(y:number)=>top+(lane+1)*lh+bend(tape.course,p.x)*.65+y*scale*.78;
   const verts=new Float32Array(25*17*2);
   for(let row=0;row<17;row++)for(let col=0;col<25;col++){const point=skinPoint(col/24*640,row/16*400,spec,p),i=(row*25+col)*2;verts[i]=sx(point.x);verts[i+1]=sy(point.y);}
   warp(g as any,inks[lane] as any,verts);
   const px=sx(p.x),py=Math.max(28,sy(Math.min(p.y,p.headY))-44);box(px-84,py-16,168,25,'#fffdf4',7);text(race.players[lane].name,px-76,py+2,15,'#34273f');
   regions.push({x:px-100,y:py-25,width:200,height:110});
  }
  const weather=weatherAt(tape.course,t),profile=weatherVisualProfile(weather.kind,w,440,false,false);
  const particles=createCanvas(w,440);drawWeatherParticles(particles.getContext('2d') as any,w,440,weather.kind,weather.wind,t,profile,regions);g.drawImage(particles,0,0);g.restore();
  box(48,143,340,42,'#fffaf0');text('RECORDED RACE  '+(t/1000).toFixed(1)+'s  ·  '+weather.kind,61,170,16);
 }else{
  const winner=tape.ranking[0];box(45,135,1190,428,'#eadff3');text('THE DOODLE DERBY HAS A WINNER',75,192,25,'#62417e');
  g.drawImage(inks[winner],310,168,650,406);text(race.players[winner].name+' wins!',75,534,32);
 }
 box(45,586,1190,101,'#382740');text('ONE VRF REQUEST. REAL RANDOMNESS. SAME RIDICULOUS HORSES.',66,618,21,'#fff4dc');
 text('Request: '+proof.requestSignature.slice(0,25)+'…'+proof.requestSignature.slice(-12),66,648,17,'#dfc6f3',500);
 text('Replay rendered from the recorded Devnet race  ·  draw-race-party.breid222.chatgpt.site',66,674,16,'#e5d8e9',500);
 await writeFile(new URL(String(frame).padStart(4,'0')+'.png',out),canvas.toBuffer('image/png'));
 if(frame%90===0)console.log('Rendered frame '+frame+'/'+fps*seconds);
}
await writeFile(new URL('outputs/vrf/clip-manifest.json',root),JSON.stringify({fps,seconds,width:w,height:h,source:'public/vrf-demo.json',seed:race.seed,proof,method:'Offline replay of the real tape, using original background, warp and skinPoint renderers; not a browser screen recording.'},null,2));
console.log('Clip frames ready.');
