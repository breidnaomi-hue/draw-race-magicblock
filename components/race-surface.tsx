'use client';
import {useEffect,useRef,useState} from 'react';
import {Race,COLORS} from '../lib/game';
import {drawingCanvas} from '../lib/drawing';
import {replayFor,poseAt,STATES,Pose} from '../lib/physics';
import {weatherAt,groundAt,sectionAt,curveAt,PhysicsCourse} from '../lib/physics-course';
import {skinPoint} from '../lib/skin';
import {clamp} from '../lib/rig';
type Props={race:Race;clockOffset?:number;demo?:boolean;replayAt?:number;sound?:boolean;seek?:number};
const NX=25,NY=17;
function bend(c:PhysicsCourse,x:number){const s=sectionAt(c,x),q=clamp((x-s.from)/(s.to-s.from),0,1);return Math.sin(q*Math.PI)**2*s.curve*48}
export default function RaceSurface(props:Props){
  const host=useRef<HTMLDivElement>(null),back=useRef<HTMLCanvasElement>(null),state=useRef(props),[fallback,setFallback]=useState(false);state.current=props;
  useEffect(()=>{
    let disposed=false,raf=0,app:any,meshes:any[]=[],front:HTMLCanvasElement,ctx:CanvasRenderingContext2D|null=null,w=800,h=420,dpr=1,lastTime=-1,lastBeat=-1,lastEvent=-1,audio:AudioContext|undefined;
    const root=host.current!,bg=back.current!,{tape,decoded}=replayFor(props.race),course=tape.course,drawings=props.race.players.map(p=>drawingCanvas(p.drawing,false));
    const start=Date.now(),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    function size(){w=root.clientWidth;h=root.clientHeight;dpr=Math.min(devicePixelRatio||1,2);bg.width=w*dpr;bg.height=h*dpr;if(app)app.renderer.resize(w,h);if(ctx){front.width=w*dpr;front.height=h*dpr;}}
    const resize=new ResizeObserver(size);resize.observe(root);size();
    function tone(freq:number,len:number,volume=.025){if(!state.current.sound||state.current.demo||state.current.seek!==undefined)return;try{audio??=new AudioContext();void audio.resume();const osc=audio.createOscillator(),gain=audio.createGain();osc.type='triangle';osc.frequency.value=freq;gain.gain.setValueAtTime(volume,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+len);osc.connect(gain).connect(audio.destination);osc.start();osc.stop(audio.currentTime+len)}catch{}}
    async function init(){try{const {Application,MeshPlane,Texture}=await import('pixi.js');if(disposed)return;app=new Application();await app.init({width:w,height:h,resolution:dpr,autoDensity:true,backgroundAlpha:0,antialias:true,autoStart:false,preference:'webgl'});if(disposed){app.destroy(true);return}front=app.canvas;front.className='race-actors';root.appendChild(front);drawings.forEach(c=>{const mesh=new MeshPlane({texture:Texture.from(c),verticesX:NX,verticesY:NY});app.stage.addChild(mesh);meshes.push(mesh)})}catch{if(disposed)return;setFallback(true);front=document.createElement('canvas');front.className='race-actors';root.appendChild(front);ctx=front.getContext('2d')}size();draw()}
    function draw(){if(disposed)return;const p=state.current,now=Date.now(),elapsed=p.seek??(p.demo?((now-start+4000)%(p.race.duration+3500)):p.replayAt?now-p.replayAt-3500:now+(p.clockOffset||0)-p.race.startAt),t=clamp(elapsed,0,tape.duration),compact=h<250,n=tape.lanes;
      const poses=Array.from({length:n},(_,i)=>poseAt(tape,i,t,decoded)),ordered=Array.from({length:n},(_,i)=>i).sort((a,b)=>poses[b].x-poses[a].x),leader=poses[ordered[0]],scale=compact?.65:clamp(w/850,.78,1.22),laneH=compact?(h-54)/n:Math.min(76,(h-108)/n),top=compact?29:h-n*laneH-24,camera=Math.max(-85,leader.x-w/scale*.59),weather=weatherAt(course,t);
      const sx=(x:number)=>(x-camera)*scale,base=(lane:number,x:number)=>top+(lane+1)*laneH+bend(course,x)*(compact?.28:.65),sy=(lane:number,x:number,y:number)=>base(lane,x)+y*scale*.78;
      const g=bg.getContext('2d')!;g.setTransform(dpr,0,0,dpr,0,0);drawBackground(g,w,h,course,t,camera,scale,top,laneH,n,compact,reduce);
      if(ctx){ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h)}
      // Original texture vertices are skinned to the physical pose, never to a progress curve.
      drawings.forEach((ink,lane)=>{const q=poses[lane],spec=tape.specs[lane],px=sx(q.x),py=sy(lane,q.x,q.y),groundY=sy(lane,q.x,groundAt(course,q.x)),visible=px>-180&&px<w+180;
        if(!visible){if(meshes[lane])meshes[lane].visible=false;return}if(meshes[lane])meshes[lane].visible=true;
        g.fillStyle='#30283624';g.beginPath();g.ellipse(px,groundY+2,35*scale,4,0,0,7);g.fill();
        const verts=new Float32Array(NX*NY*2);for(let row=0;row<NY;row++)for(let col=0;col<NX;col++){const v=skinPoint(col/(NX-1)*640,row/(NY-1)*400,spec,q),i=(row*NX+col)*2;verts[i]=sx(v.x);verts[i+1]=sy(lane,q.x,v.y)}
        if(ctx)warp(ctx,ink,verts);else{const b=meshes[lane].geometry.getAttribute('aPosition').buffer;b.data.set(verts);b.update()}
        const ev=tape.events.findLast(e=>e.lane===lane&&e.at<=t&&e.at+e.duration>t),label=ev?.type||(q.state?STATES[q.state]:'');
        if(!compact){g.font='800 9px sans-serif';g.textAlign='center';g.fillStyle=COLORS[lane];g.fillText(p.race.players[lane].name,px,py-55*scale);if(label){const text=label==='CRASH'&&spec.headRisk>.5?'HEAD FIRST!':label;g.font='800 9px sans-serif';const tw=g.measureText(text).width;g.fillStyle=label==='CRASH'?'#f6d2b7':'#f9f5ed';g.fillRect(px-tw/2-6,py-47*scale,tw+12,15);g.fillStyle='#4e3c53';g.fillText(text,px,py-36*scale)}}
        // Dust and water come from recorded contact/landing states.
        const surf=course.obstacles.find(o=>q.x>=o.x&&q.x<=o.x+o.width),contact=groundY-py<55*scale;
        if(!reduce&&contact&&(surf?.type==='mud'||surf?.type==='puddle'||q.state===2||q.state===3)){g.fillStyle=surf?.type==='puddle'?'#87bec6aa':'#b38c6999';for(let j=0;j<8;j++){const phase=(t*.004+j*.79)%1;g.beginPath();g.arc(px-28*scale-phase*28,groundY-phase*(15+j%3*7),1.5+phase,0,7);g.fill()}}
        if(!reduce&&(q.state===5||q.state===6)){g.strokeStyle=q.state===6?'#ed8b4a88':'#bc9ee999';for(let j=0;j<3;j++){g.beginPath();g.moveTo(px-60,py-16+j*12);g.lineTo(px-30,py-16+j*12);g.stroke()}}
        g.fillStyle=COLORS[lane];g.beginPath();g.moveTo(px,groundY+7);g.lineTo(px-4,groundY+12);g.lineTo(px+4,groundY+12);g.closePath();g.fill();
      });
      if(!compact&&w>550){const mx=w-151,my=24,mw=128;g.fillStyle='#fcf8efe6';g.fillRect(mx-12,my-12,mw+23,45);g.strokeStyle='#b8a9b9';g.lineWidth=3;g.beginPath();for(let i=0;i<=40;i++){const q=i/40,x=mx+q*mw,y=my+8+bend(course,q*course.length)*.13;i?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();poses.forEach((q,i)=>{const f=clamp(q.x/course.length,0,1);g.fillStyle=COLORS[i];g.beginPath();g.arc(mx+f*mw,my+8+bend(course,q.x)*.13,4,0,7);g.fill()});g.lineWidth=1;g.fillStyle='#66566c';g.font='700 7px sans-serif';g.textAlign='left';g.fillText('THE WHOLE HERD',mx,my-2)}
      if(!ctx)app.renderer.render(app.stage);
      // Draw weather above the actors on the same WebGL canvas via a small DOM overlay canvas.
      drawWeather(overlay,w,h,weather,t,leader.vx,reduce,compact);
      if(elapsed>=0&&t>lastTime&&lastTime>=0&&t-lastTime<500){const beat=Math.floor(t/(leader.vx>2.8?155:205));if(beat!==lastBeat&&leader.state!==1&&leader.state!==3){tone(75+(beat%2)*28,.045,.018);lastBeat=beat}const event=tape.events.findLastIndex(e=>e.at<=t);if(event!==lastEvent&&event>=0){const e=tape.events[event];if(e.type==='CRASH')tone(55,.18,.05);if(e.type==='SECOND WIND'||e.type==='LUCKY JUMP')tone(620,.12);lastEvent=event}}lastTime=t;raf=requestAnimationFrame(draw);
    }
    const overlay=document.createElement('canvas');overlay.className='race-atmosphere';root.appendChild(overlay);
    void init();return()=>{disposed=true;cancelAnimationFrame(raf);resize.disconnect();audio?.close().catch(()=>{});overlay.remove();if(app?.renderer)app.destroy(true,{children:true,texture:true,textureSource:true});else front?.remove()};
  },[props.race.seed]);
  return <div ref={host} className={'race-surface physics-surface track-'+props.race.track}><canvas ref={back} className="race-scenery"/>{fallback&&<span className="renderer-note">Canvas renderer</span>}</div>;
}
function drawBackground(g:CanvasRenderingContext2D,w:number,h:number,c:PhysicsCourse,t:number,camera:number,scale:number,top:number,lh:number,n:number,compact:boolean,reduce:boolean){
  const weather=weatherAt(c,t),snow=c.environment==='Snowfield',farm=c.environment==='Farmyard',sx=(x:number)=>(x-camera)*scale,base=(lane:number,x:number)=>top+(lane+1)*lh+bend(c,x)*(compact?.28:.65)+groundAt(c,x)*scale*.78;
  g.fillStyle=weather.kind==='Rain'?'#c4d2d8':snow?'#d9e6ed':farm?'#eee1ce':'#dce6df';g.fillRect(0,0,w,h);
  g.fillStyle='#ffe6a3';g.beginPath();g.arc(w*.8,compact?20:41,compact?12:23,0,7);g.fill();
  for(let layer=0;layer<2;layer++){const rate=layer?.22:.09;g.fillStyle=layer?(snow?'#bccfd0':farm?'#d2b992':'#a9c0a5'):(snow?'#c8d9df':'#c5d3b9');for(let j=-1;j<w/220+2;j++){const x=j*220-((camera*rate)%220);g.beginPath();g.ellipse(x,top+18-layer*10,165,compact?37:64,0,0,7);g.fill()}}
  // Midground landmarks make speed readable even when the camera follows a horse.
  for(let world=Math.floor((camera-200)/220)*220;world<camera+w/scale+300;world+=220){const x=sx(world),y=top+groundAt(c,world)*scale*.25-14;if(farm){g.fillStyle='#bc8266';g.fillRect(x-20,y-35,40,34);g.fillStyle='#8f6161';g.beginPath();g.moveTo(x-26,y-35);g.lineTo(x,y-55);g.lineTo(x+26,y-35);g.fill();g.fillStyle='#f0d3a3';g.fillRect(x-4,y-20,10,20)}else{const sway=Math.sin(t/380+world)*weather.wind*8;g.fillStyle=snow?'#6e9290':'#678b6c';g.beginPath();g.moveTo(x+sway,y-65);g.lineTo(x-24,y);g.lineTo(x+24,y);g.fill();g.fillStyle='#806f61';g.fillRect(x-3,y,6,13);if(snow){g.fillStyle='#e5eeee';g.beginPath();g.moveTo(x+sway,y-65);g.lineTo(x-14,y-29);g.lineTo(x+14,y-29);g.fill()}}}
  for(let lane=0;lane<n;lane++){g.beginPath();for(let x=-40;x<w+50;x+=25){const world=camera+x/scale,y=base(lane,world);x===-40?g.moveTo(x,y-lh):g.lineTo(x,y-lh)}for(let x=w+35;x>=-40;x-=25)g.lineTo(x,base(lane,camera+x/scale));g.closePath();g.fillStyle=snow?(lane%2?'#e4e9df':'#edf0e7'):(lane%2?'#d7bd96':'#e1c8a3');g.fill();g.strokeStyle='#9d856146';g.setLineDash([8,12]);g.beginPath();for(let x=-40;x<w+50;x+=20){const y=base(lane,camera+x/scale);x===-40?g.moveTo(x,y):g.lineTo(x,y)}g.stroke();g.setLineDash([]);
    for(const o of c.obstacles){const x=sx(o.x),ow=o.width*scale;if(x>w+40||x+ow<0)continue;const y=base(lane,o.x);if(o.type==='barrier'){g.fillStyle='#8b6a51';g.fillRect(x,y-o.height*scale*.78,o.width*scale,o.height*scale*.78);g.fillStyle='#eee5c9';g.fillRect(x-3,y-o.height*scale*.78-4,ow+6,6);g.fillStyle='#c77f62';g.fillRect(x-3,y-o.height*scale*.78+8,ow+6,5)}else if(o.type==='ramp'){g.fillStyle='#a68a66';g.beginPath();g.moveTo(x,y+2);g.lineTo(x+ow,y-o.height*scale*.78);g.lineTo(x+ow,y+8);g.closePath();g.fill();g.strokeStyle='#765e47';g.stroke()}else{g.fillStyle=o.type==='puddle'?'#86b7c4':o.type==='ice'?'#b5d8dd':o.type==='mud'?'#927357':'#a88763';g.beginPath();g.ellipse(x+ow/2,y+2,ow/2,Math.min(9,lh*.16),0,0,7);g.fill();if(o.type==='puddle'||o.type==='ice'){g.strokeStyle='#dcecf1';g.beginPath();g.moveTo(x+8,y);g.lineTo(x+ow-12,y);g.stroke()}}}
  }
  const finish=sx(c.length);if(finish>-20&&finish<w+20)for(let lane=0;lane<n;lane++)for(let k=0;k<6;k++){g.fillStyle=(k+lane)%2?'#faf7ef':'#524655';g.fillRect(finish,base(lane,c.length)-lh+k*lh/6,12,lh/6)}
  // Winding route and all racers remain visible even if the field spreads out.
  if(!compact){const sec=sectionAt(c,camera+w/scale*.59);g.fillStyle='#fcf8efeb';g.fillRect(14,12,Math.min(w-28,270),39);g.fillStyle='#514556';g.font='800 10px sans-serif';g.textAlign='left';g.fillText(c.environment.toUpperCase()+' / '+sec.type.toUpperCase(),24,28);g.font='10px sans-serif';g.fillText(weather.kind+(weather.wind?'  '+(weather.wind>0?'TAILWIND':'HEADWIND'):''),24,43);g.font='9px sans-serif';g.fillStyle='#554653';g.fillText('TORSO COUNTS AT THE LINE',14,h-10)}
  if(!reduce&&!compact){g.strokeStyle='#fff9';const speed=scale*2;for(let j=0;j<9;j++){const x=((j*157-t*speed*.19)%w+w)%w,y=top+(j%3)*lh+12;g.beginPath();g.moveTo(x,y);g.lineTo(x+16,y);g.stroke()}}
}
function drawWeather(canvas:HTMLCanvasElement,w:number,h:number,weather:ReturnType<typeof weatherAt>,t:number,speed:number,reduce:boolean,compact:boolean){if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}const g=canvas.getContext('2d')!;g.clearRect(0,0,w,h);if(weather.kind==='Fog'){g.fillStyle='#edf0e6a8';g.fillRect(0,0,w,h);return}if(reduce)return;if(weather.kind==='Rain'){g.strokeStyle='#5f899777';for(let j=0;j<(compact?25:100);j++){const x=(j*73-t*.35)%w,y=(j*109+t*.7)%h;g.beginPath();g.moveTo((x+w)%w,y);g.lineTo((x+w)%w-6,y+15);g.stroke()}}if(weather.kind==='Snow & ice'){g.fillStyle='#fff';for(let j=0;j<(compact?20:70);j++){g.beginPath();g.arc(((j*93-t*.08)%w+w)%w,(j*57+t*.04)%h,1+j%2,0,7);g.fill()}}if(weather.kind==='Strong wind'){g.strokeStyle='#ffffff8a';for(let j=0;j<20;j++){const x=((j*133+t*weather.wind*.65)%w+w)%w,y=(j*43)%h;g.beginPath();g.moveTo(x,y);g.lineTo(x+weather.wind*35,y-3);g.stroke()}}}
function warp(g:CanvasRenderingContext2D,ink:HTMLCanvasElement,v:Float32Array){
  // Affine textured triangles provide the same skin when WebGL is unavailable.
  for(let row=0;row<NY-1;row+=2)for(let col=0;col<NX-1;col+=2){const ids=[row*NX+col,row*NX+col+2,(row+2)*NX+col,(row+2)*NX+col+2];for(const tr of [[0,1,2],[1,3,2]]){const a=ids[tr[0]],b=ids[tr[1]],c=ids[tr[2]],x0=a%NX/(NX-1)*640,y0=Math.floor(a/NX)/(NY-1)*400,x1=b%NX/(NX-1)*640,y1=Math.floor(b/NX)/(NY-1)*400,x2=c%NX/(NX-1)*640,y2=Math.floor(c/NX)/(NY-1)*400,den=(x1-x0)*(y2-y0)-(x2-x0)*(y1-y0);const ax=((v[b*2]-v[a*2])*(y2-y0)-(v[c*2]-v[a*2])*(y1-y0))/den,bx=((v[c*2]-v[a*2])*(x1-x0)-(v[b*2]-v[a*2])*(x2-x0))/den,ay=((v[b*2+1]-v[a*2+1])*(y2-y0)-(v[c*2+1]-v[a*2+1])*(y1-y0))/den,by=((v[c*2+1]-v[a*2+1])*(x1-x0)-(v[b*2+1]-v[a*2+1])*(x2-x0))/den;g.save();g.beginPath();g.moveTo(v[a*2],v[a*2+1]);g.lineTo(v[b*2],v[b*2+1]);g.lineTo(v[c*2],v[c*2+1]);g.closePath();g.clip();g.transform(ax,ay,bx,by,v[a*2]-ax*x0-bx*y0,v[a*2+1]-ay*x0-by*y0);g.drawImage(ink,0,0);g.restore()}}
}
