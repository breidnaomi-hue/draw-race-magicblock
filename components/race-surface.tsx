'use client';
import {useEffect,useRef,useState} from 'react';
import {Race,COLORS,makePlan,progress} from '../lib/game';
import {drawingCanvas} from '../lib/drawing';
import {analyze} from '../lib/traits';
import {courseFor,routeY,routeSlope,Course} from '../lib/course';
type Props={race:Race;clockOffset?:number;demo?:boolean;replayAt?:number};
export default function RaceSurface(props:Props){
  const host=useRef<HTMLDivElement>(null),back=useRef<HTMLCanvasElement>(null),state=useRef(props),[fallback,setFallback]=useState(false);state.current=props;
  useEffect(()=>{
    let disposed=false,frame=0,resize:ResizeObserver|undefined,app:any,meshes:any[]=[],ctx:CanvasRenderingContext2D|null=null;
    const root=host.current!,bg=back.current!,plan=makePlan(props.race.seed,props.race.players.length,props.race.duration,props.race.players.map(p=>p.drawing),props.race.track),course=courseFor(props.race.seed,props.race.track);
    const drawings=props.race.players.map(p=>drawingCanvas(p.drawing)),traits=props.race.players.map(p=>analyze(p.drawing));
    let w=800,h=420,dpr=Math.min(devicePixelRatio||1,2),useCanvas=false,front:HTMLCanvasElement;
    const onResize=()=>{w=root.clientWidth;h=root.clientHeight;bg.width=Math.round(w*dpr);bg.height=Math.round(h*dpr);if(app)app.renderer.resize(w,h);if(useCanvas&&front){front.width=Math.round(w*dpr);front.height=Math.round(h*dpr)}};
    async function init(){
      try{const {Application,MeshPlane,Texture}=await import('pixi.js');if(disposed)return;app=new Application();await app.init({width:w,height:h,resolution:dpr,autoDensity:true,backgroundAlpha:0,antialias:true,autoStart:false,preference:'webgl'});if(disposed){app.destroy(true);return}front=app.canvas;front.className='race-actors';root.appendChild(front);drawings.forEach(c=>{const m=new MeshPlane({texture:Texture.from(c),verticesX:13,verticesY:9});m.pivot.set(200,280);app.stage.addChild(m);meshes.push(m)})}
      catch{if(disposed)return;useCanvas=true;setFallback(true);front=document.createElement('canvas');front.className='race-actors';root.appendChild(front);ctx=front.getContext('2d')}
      onResize();resize=new ResizeObserver(onResize);resize.observe(root);animate();
    }
    function animate(){
      if(disposed)return;
      const p=state.current,now=Date.now(),elapsed=p.demo?(now%(p.race.duration+5000))-3500:p.replayAt?now-p.replayAt-3500:now+(p.clockOffset||0)-p.race.startAt,t=Math.max(0,elapsed),n=drawings.length;
      const compact=h<250,laneH=Math.min(72,(h-(compact?72:150))/n),top=h-n*laneH-(compact?24:38),bendAmplitude=compact?8:18;
      const leader=Math.max(...drawings.map((_,i)=>progress(plan,i,t))),scroll=leader*7800,worldW=compact?w:w*3.4,camera=Math.max(0,Math.min(worldW-w,56+leader*(worldW-130)-w*.64));
      const g=bg.getContext('2d')!;g.setTransform(dpr,0,0,dpr,0,0);g.save();g.translate(-camera,0);drawScene(g,worldW,h,top,laneH,n,scroll,p.race.track,leader,course,t,bendAmplitude,compact,camera,w);g.restore();
      if(useCanvas){ctx!.setTransform(dpr,0,0,dpr,0,0);ctx!.clearRect(0,0,w,h)}
      drawings.forEach((drawing,i)=>{
        const at=progress(plan,i,t),finished=t>=plan.finishes[i];
        const active=plan.events.filter(e=>e.lane===i&&t>=e.at&&t<e.at+e.duration),fall=active.find(e=>e.type==='headplant'||e.type==='topple'),event=fall||active[0],stumble=event?.type==='stumble',phase=t/96+i*1.8;
        const fallPhase=fall?Math.max(0,Math.min(1,(t-fall.at)/fall.duration)):0,fallAmount=fall?Math.sin(fallPhase*Math.PI):0;
        const amp=elapsed<0?0:finished?2:stumble?5:10;
        const obstacle=course.obstacles.find(o=>Math.abs(at-o.position)<o.width*1.6),obstaclePhase=obstacle?(at-obstacle.position)/(obstacle.width*1.6):0;
        const jump=obstacle?.type==='hurdle'?Math.max(0,Math.cos(obstaclePhase*Math.PI/2))*laneH*(.3+traits[i].jump/190):0;
        const slip=(obstacle?.type==='ice'||obstacle?.type==='puddle')?Math.sin(phase/2)*(1-traits[i].grip/100)*12:0;
        const x=56+at*(worldW-130)-camera+slip,y=top+(i+1)*laneH-9+routeY(at)*bendAmplitude-Math.abs(Math.sin(phase))*amp-jump+fallAmount*laneH*.30;
        const scale=Math.min(laneH/225,w/1000+.06),stretch=1+Math.sin(phase*2)*.045;
        const tilt=fallAmount*(fall?.type==='topple'?2.1:.9)+Math.sin(phase)*(stumble?(.3-traits[i].grip/500):.025)+routeSlope(at)*.006;
        g.save();g.fillStyle='#39242c1f';g.beginPath();g.ellipse(x,y+7,55*scale*2,4,0,0,Math.PI*2);g.fill();
        // Visible body timing marker, so extending the nose never advances finish.
        g.fillStyle=COLORS[i];g.beginPath();g.moveTo(x,y+7);g.lineTo(x+4,y+11);g.lineTo(x,y+15);g.lineTo(x-4,y+11);g.closePath();g.fill();g.restore();
        if(!useCanvas){const mesh=meshes[i],buffer=mesh.geometry.getAttribute('aPosition').buffer,data=buffer.data as Float32Array;
          for(let row=0;row<9;row++)for(let col=0;col<13;col++){const ix=(row*13+col)*2,u=col/12,v=row/8,leg=Math.max(0,(v-.53)/.47),head=Math.max(0,(u-.58)/.42)*Math.max(0,(.65-v)/.65);data[ix]=u*400+Math.sin(phase+u*7)*leg*amp*2-head*fallAmount*25;data[ix+1]=v*280+Math.sin(phase+u*6)*amp*(.25+leg*.6)+head*fallAmount*95}buffer.update();mesh.position.set(x,y);mesh.scale.set(scale*stretch,scale/stretch);mesh.rotation=tilt;
        }else{ctx!.save();ctx!.translate(x,y);ctx!.rotate(tilt);ctx!.scale(scale*stretch,scale/stretch);for(let col=0;col<25;col++){const u=col/25;ctx!.drawImage(drawing,u*400,0,17,280,u*400-200+Math.sin(phase+u*7)*amp,-280+Math.sin(phase+u*6)*amp,17,280)}ctx!.restore()}
        let label=event?(event.type==='topple'?'TOP HEAVY!':event.type==='headplant'?'FACEPLANT!':event.type==='stumble'?'WHOOPS!':event.type==='drift'?'HOLD THE TURN!':event.type==='comeback'?'COMEBACK!':'ZOOM!'):obstacle?.type==='ice'?'SLIPPERY!':obstacle?.type==='mud'?'SQUELCH!':'';
        if(label&&!finished&&elapsed>=0&&!compact){g.save();g.textAlign='center';g.font='bold 9px sans-serif';g.fillStyle=fall?'#a34f3b':'#494053';g.fillText(label,x,y-laneH+5);g.restore()}
        if(fallAmount>.6){g.save();g.fillStyle='#b9a27a';for(let k=0;k<5;k++){g.beginPath();g.arc(x+26+Math.cos(k+t*.01)*12,y+7-Math.abs(Math.sin(k+t*.01))*12,2.5,0,7);g.fill()}g.restore()}
      });
      if(!useCanvas)app.renderer.render(app.stage);frame=requestAnimationFrame(animate);
    }
    onResize();void init();return()=>{disposed=true;cancelAnimationFrame(frame);resize?.disconnect();if(app?.renderer)app.destroy(true,{children:true,texture:true,textureSource:true});if(useCanvas)front?.remove()};
  },[props.race.seed]);
  return <div ref={host} className={'race-surface track-'+props.race.track}><canvas ref={back} className="race-scenery"/>{fallback&&<span className="renderer-note">Canvas mode</span>}</div>;
}
function drawScene(g:CanvasRenderingContext2D,w:number,h:number,top:number,lh:number,n:number,s:number,track:number,leader:number,c:Course,t:number,amp:number,compact:boolean,camera:number,viewport:number){
  const sky=c.weather==='Rain showers'?'#cdd5dc':c.weather==='Frost'?'#dde6ed':['#e4ebe2','#efe2d9','#e6dff0'][track];g.fillStyle=sky;g.fillRect(0,0,w,h);
  if(c.weather!=='Rain showers'){g.fillStyle='#ffedaa';g.beginPath();g.arc(w*.78,38,23,0,7);g.fill()}
  for(let i=-1;i<w/230+2;i++){const x=i*230-(s*.08%230);g.fillStyle=['#c2d1b2','#d8bfa2','#c4b4d2'][track];g.beginPath();g.ellipse(x,top-8,180,70,0,0,7);g.fill()}
  g.fillStyle=c.weather==='Rain showers'?'#aab9c6':'#faf6eb';for(let i=-1;i<5;i++){const x=i*280-(s*.04%280);g.beginPath();g.ellipse(x,35,40,11,0,0,7);g.ellipse(x+25,30,30,15,0,0,7);g.fill()}
  const yAt=(x:number)=>routeY(Math.max(0,Math.min(1,(x-56)/(w-130))))*amp;
  const path=(base:number,reverse=false)=>{for(let k=0;k<=70;k++){const x=(reverse?1-k/70:k/70)*w,y=base+yAt(x);if(k===0)g.moveTo(x,y);else g.lineTo(x,y)}};
  for(let lane=0;lane<n;lane++){g.beginPath();path(top+lane*lh);for(let k=70;k>=0;k--){const x=k/70*w;g.lineTo(x,top+(lane+1)*lh+yAt(x))}g.closePath();g.fillStyle=lane%2?'#e7d6b5':'#ede0c5';g.fill();g.beginPath();path(top+(lane+1)*lh);g.strokeStyle='#ccbb9b';g.lineWidth=1;g.setLineDash([5,7]);g.stroke();g.setLineDash([])}
  g.strokeStyle='#fff9e9';g.lineWidth=5;g.beginPath();path(top-10);g.stroke();
  for(let i=-1;i<w/75+2;i++){const x=i*75-(s*.5%75);g.strokeStyle='#c3ad88';g.lineWidth=3;g.beginPath();g.moveTo(x,top-22+yAt(x));g.lineTo(x,top+3+yAt(x));g.stroke()}
  for(const bend of c.bends){const x=56+bend*(w-130),y=top-25+yAt(x);g.fillStyle='#ede6d5';g.strokeStyle='#a2917e';g.lineWidth=1;g.fillRect(x-7,y-10,14,13);g.strokeRect(x-7,y-10,14,13);g.fillStyle='#7d6c80';g.font='bold 11px sans-serif';g.textAlign='center';g.fillText('↷',x,y+1)}
  for(let lane=0;lane<n;lane++)for(const o of c.obstacles){const x=56+o.position*(w-130),y=top+(lane+1)*lh-9+routeY(o.position)*amp;if(o.type==='hurdle'){g.strokeStyle='#8d6b8e';g.lineWidth=3;g.beginPath();g.moveTo(x-3,y);g.lineTo(x-3,y-16);g.lineTo(x+6,y-16);g.lineTo(x+6,y);g.stroke();g.strokeStyle='#fbefdb';g.lineWidth=2;g.beginPath();g.moveTo(x-3,y-11);g.lineTo(x+6,y-11);g.stroke()}else{g.fillStyle=o.type==='ice'?'#a2c9dfaa':o.type==='puddle'?'#91b0bd99':'#b7956c88';g.beginPath();g.ellipse(x,y+2,Math.max(8,o.width*(w-130)),4,0,0,7);g.fill();if(o.type==='ice'){g.strokeStyle='#fff9';g.lineWidth=1;g.beginPath();g.moveTo(x-5,y);g.lineTo(x+4,y-1);g.stroke()}}}
  const finish=w-74,fy=routeY(1)*amp;for(let k=0;k<n*lh/7;k++)for(let j=0;j<2;j++){g.fillStyle=(k+j)%2?'#fff5e3':'#78716a';g.fillRect(finish+j*7,top+fy+k*7,7,7)}
  g.fillStyle='#675d66';g.font='bold 8px sans-serif';g.textAlign='center';g.fillText('FINISH',finish+7,top-10);
  if(!compact){g.fillStyle='#f8f3e4cf';g.fillRect(camera+10,9,Math.min(viewport-20,260),27);g.fillStyle='#716176';g.textAlign='left';g.font='bold 9px sans-serif';g.fillText(c.weather.toUpperCase()+'  ·  '+(leader>.88?'FINAL SPRINT':Math.floor(leader*100)+'% OF THE CIRCUIT'),camera+20,26)}
  if(c.weather==='Rain showers'||c.weather==='Frost'){g.strokeStyle=c.weather==='Frost'?'#ffffffc0':'#7b97b780';g.lineWidth=c.weather==='Frost'?2:1;for(let i=0;i<55;i++){const x=(i*71+t*.06)%w,y=(i*37+t*(c.weather==='Frost'?.035:.2))%h;g.beginPath();g.moveTo(x,y);g.lineTo(x+(c.weather==='Frost'?1:-4),y+(c.weather==='Frost'?1:9));g.stroke()}}
  if(c.wind){g.strokeStyle='#ffffff99';g.lineWidth=1.5;for(let i=0;i<13;i++){const raw=i*151+c.wind*t*.13,x=((raw%w)+w)%w,y=20+i*23%Math.max(30,top-5);g.beginPath();g.moveTo(x,y);g.lineTo(x+24,y-2);g.stroke()}}
  if(leader>.97){for(let i=0;i<24;i++){g.fillStyle=['#a180ce','#ef956c','#e8c351'][i%3];const x=finish+Math.sin(i*3+s*.01)*50,y=(s*.4+i*31)%h;g.save();g.translate(x,y);g.rotate(i+s*.01);g.fillRect(0,0,4,7);g.restore()}}
}
