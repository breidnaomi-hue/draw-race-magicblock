import Matter from 'matter-js';
import type {Drawing} from './game';
import {Spec,RigMarks,specFor,clamp} from './rig';
import {PhysicsCourse,physicsCourse,weatherAt,groundAt,sectionAt,curveAt} from './physics-course';
const {Engine,Bodies,Body,Composite,Constraint,Events}=Matter;
export const PHYSICS_VERSION='matter-0.20-spring-rig-1';
export const STEP=1000/60,SAMPLE_HZ=10,STRIDE=17;
export const STATES=['RUN','JUMP','SLIP','CRASH','GET UP','SECOND WIND','RAGE MODE','EXHAUSTION','PANIC','PERFECT LANDING','LUCKY JUMP'] as const;
export type StateKind=typeof STATES[number];
export type PhysicsEvent={at:number;lane:number;type:StateKind;duration:number;obstacle?:number};
export type ReplayTape={version:string;hz:number;stride:number;frames:number;lanes:number;duration:number;data:string;hash?:string;ranking:number[];finishes:number[];distances:number[];events:PhysicsEvent[];course:PhysicsCourse;specs:Spec[];diagnostics:{jumps:number;barrierContacts:number;landings:number;slips:number;falls:number;recoveries:number;maxAir:number}};
export type Pose={x:number;y:number;angle:number;headX:number;headY:number;headAngle:number;vx:number;vy:number;phase:number;compression:number;state:number;frontX:number;frontY:number;rearX:number;rearY:number;energy:number;ground:number};
const scales=[2,8,1000,2,8,1000,100,100,1000,1000,1,2,8,2,8,10000,8];
const angle=(x:number)=>Math.atan2(Math.sin(x),Math.cos(x));
export function randomFor(seed:string,salt=0){let s=(parseInt(seed.slice(salt%48,salt%48+8),16)^Math.imul(salt+1,2654435761))>>>0;return()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
export function blendAttribute(shape:number,random:number,weight=.3){return weight*shape+(1-weight)*random}
function encode(values:number[]){const bytes=new Uint8Array(values.length*2),view=new DataView(bytes.buffer);values.forEach((v,i)=>view.setInt16(i*2,clamp(Math.round(v*scales[i%STRIDE]),-32760,32760),true));let result='';for(let i=0;i<bytes.length;i+=16384)result+=String.fromCharCode(...bytes.subarray(i,i+16384));return btoa(result)}
export function decodeTape(tape:ReplayTape){const s=atob(tape.data),buf=new ArrayBuffer(s.length),bytes=new Uint8Array(buf);for(let i=0;i<s.length;i++)bytes[i]=s.charCodeAt(i);return new DataView(buf)}
export function poseAt(tape:ReplayTape,lane:number,ms:number,decoded?:DataView):Pose{
  const d=decoded||decodeTape(tape),at=clamp(ms/1000*tape.hz,0,tape.frames-1),a=Math.floor(at),b=Math.min(tape.frames-1,a+1),f=at-a,values:number[]=[];
  for(let k=0;k<STRIDE;k++){const x=d.getInt16(((a*tape.lanes+lane)*STRIDE+k)*2,true)/scales[k],y=d.getInt16(((b*tape.lanes+lane)*STRIDE+k)*2,true)/scales[k];values[k]=k===10?x:k===2||k===5||k===8?x+angle(y-x)*f:x+(y-x)*f}
  const [x,y,rotation,headX,headY,headAngle,vx,vy,phase,compression,state,frontX,frontY,rearX,rearY,energy,ground]=values;return {x,y,angle:rotation,headX,headY,headAngle,vx,vy,phase,compression,state,frontX,frontY,rearX,rearY,energy,ground};
}
export function tapePayload(t:ReplayTape){const {hash,...payload}=t;return JSON.stringify(payload)}
type Options={duration?:number;course?:PhysicsCourse;traitWeight?:number;disableEvents?:boolean;forcedDriver?:{at:number;lane:number;type:StateKind;duration:number}[];specs?:Spec[]};
export function simulate(seed:string,drawings:Drawing[],rigs:(RigMarks|undefined)[]=[],track=0,options:Options={}):ReplayTape {
  if(!/^[a-f0-9]{64}$/i.test(seed)||![2,4].includes(drawings.length))throw Error('Invalid physical race input');
  const course=options.course||physicsCourse(seed,track),duration=options.duration||90000,n=drawings.length,specs=options.specs||drawings.map((d,i)=>specFor(d,rigs[i]));
  const supportAt=(x:number)=>{const o=course.obstacles.find(o=>o.type==='barrier'&&x>=o.x&&x<=o.x+o.width);return groundAt(course,x)-(o?.height||0)};
  const events:PhysicsEvent[]=[],values:number[]=[],finishes=Array(n).fill(0),diagnostics={jumps:0,barrierContacts:0,landings:0,slips:0,falls:0,recoveries:0,maxAir:0};
  // Pin the engine's construction order. Runtime positions come solely from the
  // fixed-step solver; no finish order or position curve is supplied to it.
  (Matter.Common as any)._nextId=0;(Matter.Common as any)._seed=1;
  const racers=specs.map((spec,lane)=>{
    const rand=randomFor(seed,lane*9+3),engine=Engine.create({positionIterations:6,velocityIterations:5,constraintIterations:3,enableSleeping:false});engine.gravity.y=1;engine.gravity.scale=.001;
    const body=Bodies.rectangle(70,groundAt(course,70)-spec.legLength-11,54,23,{chamfer:{radius:8},mass:spec.mass,friction:.2,frictionAir:.007,restitution:.08,label:'torso'});
    const head=Bodies.circle(body.position.x+spec.headOffset[0],body.position.y+spec.headOffset[1],10+spec.headRisk*3,{mass:.3+spec.headRisk*.65,friction:.1,frictionAir:.02,restitution:.2,label:'head'});
    const group=Body.nextGroup(true);body.collisionFilter.group=group;head.collisionFilter.group=group;
    const neck=Constraint.create({bodyA:body,pointA:{x:20,y:-8},bodyB:head,pointB:{x:-6,y:7},length:Math.max(8,Math.hypot(spec.headOffset[0]-26,spec.headOffset[1]+15)),stiffness:.3,damping:.13});
    const terrain:Matter.Body[]=[];
    for(let x=-160;x<course.length+2200;x+=80){const a=groundAt(course,x),b=groundAt(course,x+80),dy=b-a;terrain.push(Bodies.rectangle(x+40,(a+b)/2+40,Math.hypot(80,dy)+2,80,{isStatic:true,angle:Math.atan2(dy,80),friction:.8,label:'ground'}))}
    for(const o of course.obstacles)if(o.type==='barrier')terrain.push(Bodies.rectangle(o.x+o.width/2,groundAt(course,o.x)-o.height/2,o.width,o.height,{isStatic:true,friction:.22,restitution:.1,label:'barrier:'+o.id}));
    Composite.add(engine.world,[...terrain,body,head,neck]);
    const parameters=Object.fromEntries(Object.entries(spec.attributes).map(([key,v])=>[key,blendAttribute(v,25+rand()*50,options.traitWeight??.3)])) as Spec['attributes'];
    const racer={engine,body,head,spec,parameters,rand,lane,phase:rand()*6.28,feet:Array.from({length:4},()=>({x:body.position.x,y:0,stance:false})),state:0,mode:0,modeUntil:0,nextMode:11000+rand()*7000,fallenAt:-1,slipUntil:0,panicUntil:0,lastJump:-5000,lastImpact:-5000,air:false,airAt:0,energy:.95,lastSurface:-1,obstacleTried:new Set<number>(),eventCooldown:0,finished:false,finalPose:[] as number[]};
    Events.on(engine,'collisionStart',e=>{for(const pair of e.pairs){const obstacle=[pair.bodyA,pair.bodyB].find(b=>b.label.startsWith('barrier:'));const actor=[pair.bodyA,pair.bodyB].find(b=>b===body||b===head);if(obstacle&&actor&&racer.lastImpact<engine.timing.timestamp-900){racer.lastImpact=engine.timing.timestamp;racer.panicUntil=engine.timing.timestamp+800;diagnostics.barrierContacts++;events.push({at:Math.round(engine.timing.timestamp),lane,type:'CRASH',duration:1500,obstacle:Number(obstacle.label.split(':')[1])});const force=body.mass*.012;Body.applyForce(body,{x:body.position.x+27,y:body.position.y-8},{x:-force*.12,y:force});}}});
    return racer;
  });
  const log=(lane:number,type:StateKind,at:number,len:number,obstacle?:number)=>events.push({at:Math.round(at),lane,type,duration:len,...(obstacle===undefined?{}:{obstacle})});
  const steps=Math.ceil(duration/STEP);
  for(const r of racers){const b=r.body,h=r.head;values.push(b.position.x,b.position.y,0,h.position.x,h.position.y,0,0,0,angle(r.phase),0,0,b.position.x+20,supportAt(b.position.x+20),b.position.x-20,supportAt(b.position.x-20),r.energy,groundAt(course,b.position.x));}
  for(let tick=1;tick<=steps;tick++){
    const ms=tick*STEP,weather=weatherAt(course,ms);
    for(const r of racers){
      if(r.finished){if(tick%6===0)values.push(...r.finalPose);continue;}
      const {body:b,head,spec,parameters:a,engine,lane}=r,x=b.position.x,ground=supportAt(x),tilt=angle(b.angle),distance=ground-b.position.y;
      const surface=course.obstacles.find(o=>o.type!=='barrier'&&x>o.x&&x<o.x+o.width),touching=distance<spec.legLength+25&&b.velocity.y>-.9;
      const slippery=clamp(weather.ice+(surface?.type==='ice'?.75:surface?.type==='puddle'?.5:0)+weather.wet*.35,0,.98),mud=surface?.type==='mud'?1:0;
      const traction=clamp(1-slippery*(1-a.balance/150),.1,1)*(ms<r.slipUntil?.65:1);
      b.friction=slippery>.5?.015:mud?.65:.18;head.friction=b.friction;
      b.frictionAir=.007+mud*.014+(r.mode===7?.006:0);
      if(!options.disableEvents&&ms>=r.nextMode&&r.fallenAt<0&&r.eventCooldown<ms){
        const forced=options.forcedDriver?.find(e=>e.lane===lane&&e.at<=ms&&e.at>ms-STEP*1.1),type=forced?.type||(['SECOND WIND','RAGE MODE','EXHAUSTION','PANIC'] as const)[Math.floor(r.rand()*4)];
        r.mode=STATES.indexOf(type);r.modeUntil=ms+(forced?.duration||2500+r.rand()*2200);r.nextMode=ms+9500+r.rand()*7000;r.eventCooldown=ms+6000;if(r.mode===5)r.energy=Math.min(1,r.energy+.2);log(lane,type,ms,r.modeUntil-ms);
      }
      for(const forced of options.forcedDriver||[])if(forced.lane===lane&&forced.at<=ms&&forced.at>ms-STEP){r.mode=STATES.indexOf(forced.type);r.modeUntil=ms+forced.duration;log(lane,forced.type,ms,forced.duration)}
      if(ms>r.modeUntil)r.mode=0;
      r.energy=clamp(r.energy-(.000045+(Math.abs(b.velocity.x)/5)*.000015)*(1.4-a.endurance/120),.2,1);
      if(Math.abs(tilt)>.9&&r.fallenAt<0&&ms>1000){r.fallenAt=ms;diagnostics.falls++;log(lane,'CRASH',ms,2200)}
      const fallen=r.fallenAt>=0,fallenFor=fallen?ms-r.fallenAt:0;
      if(fallen&&fallenFor>1500&&Math.abs(tilt)<.28&&distance>spec.legLength*.7){r.fallenAt=-1;r.panicUntil=ms+350;diagnostics.recoveries++;log(lane,'GET UP',ms,650)}
      let target=(2.25+a.speed/100)*(.6+.4*r.energy);
      if(r.mode===5)target*=1.42;if(r.mode===6)target*=1.8;if(r.mode===7)target*=.58;if(r.mode===8)target*=.72;
      const turn=Math.abs(curveAt(course,x));target*=1-turn*(1-a.balance/110)*.28;
      if(fallen)target*=fallenFor<1300?.08:.38;
      const motor=clamp((target-b.velocity.x)*(.000075+a.acceleration*.0000012),-.0008,.0012)*(fallen?.2:traction)*(mud?.42:1);
      r.phase+=Math.abs(b.velocity.x)*.038;
      let front:{x:number;y:number}|undefined,rear:{x:number;y:number}|undefined;
      for(let leg=0;leg<4;leg++){
        const frontLeg=leg<2,localX=frontLeg?20:-20,ph=(r.phase+(leg===0||leg===3?0:Math.PI))%(Math.PI*2),stance=ph<Math.PI*1.2&&distance<spec.legLength+26;
        const hip={x:b.position.x+Math.cos(tilt)*localX-Math.sin(tilt)*9,y:b.position.y+Math.sin(tilt)*localX+Math.cos(tilt)*9};
        const foot=r.feet[leg],stride=17+Math.abs(b.velocity.x)*3;
        if(stance&&!foot.stance)foot.x=hip.x+stride*.5;
        if(!stance||fallen){foot.x=hip.x+Math.cos(ph)*stride*.65;foot.y=hip.y+spec.legLength-Math.max(0,-Math.sin(ph))*18;}else{foot.x+=slippery*b.velocity.x*.18;foot.y=supportAt(foot.x);}
        foot.stance=stance;
        const compression=spec.legLength-(foot.y-hip.y);
        if(stance&&!fallen&&compression>0&&compression<spec.legLength+30&&hip.y<foot.y){const lift=clamp(compression*.00065+b.velocity.y*.0003,0,.0055)*b.mass/2;Body.applyForce(b,hip,{x:motor*b.mass/2,y:-lift});}
        if(leg===0)front=foot;if(leg===2)rear=foot;
      }
      // Air control and ground propulsion are forces, not position assignments.
      if(!touching)Body.applyForce(b,b.position,{x:motor*b.mass*.16,y:0});
      Body.applyForce(b,b.position,{x:weather.wind*b.mass*.000045,y:0});
      Body.applyForce(head,head.position,{x:weather.wind*head.mass*.00011*(1+spec.headRisk),y:0});
      if(mud&&touching)Body.applyForce(b,b.position,{x:-b.velocity.x*b.mass*.00011,y:0});
      if(surface&&surface.id!==r.lastSurface&&touching){r.lastSurface=surface.id;if(slippery>.25&&!options.disableEvents&&r.rand()<.22+slippery*.45+(1-a.balance/100)*.2){r.slipUntil=ms+900;diagnostics.slips++;log(lane,'SLIP',ms,1100,surface.id);Body.applyForce(b,{x:b.position.x+22,y:b.position.y-8},{x:b.mass*.0012,y:b.mass*.002*(r.rand()>.3?1:-1)})}}
      const upcoming=course.obstacles.find(o=>(o.type==='barrier'||o.type==='ramp')&&o.x>x&&o.x-x<Math.max(65,b.velocity.x*25)*(.6+.4*weather.visibility)&&!r.obstacleTried.has(o.id));
      if(upcoming&&touching&&!fallen&&ms-r.lastJump>1350){r.obstacleTried.add(upcoming.id);if(upcoming.type==='barrier'&&r.rand()>.08+(100-a.jump)/900){const lucky=r.rand()<.2;Body.applyForce(b,{x:b.position.x+4,y:b.position.y},{x:b.mass*.0005,y:-b.mass*(.019+a.jump*.0001)*(lucky?1.12:1)});r.lastJump=ms;diagnostics.jumps++;log(lane,lucky?'LUCKY JUMP':'JUMP',ms,900,upcoming.id)}}
      const targetAngle=Math.atan2(groundAt(course,x+15)-groundAt(course,x-15),30);
      if((!fallen&&ms>r.panicUntil)||fallenFor>1000){const gain=fallen?.0007:(.00022+a.balance*.0000025)*traction*(1-spec.headRisk*.4);b.torque+=(-clamp(angle(b.angle-targetAngle),-.6,.6)*gain-b.angularVelocity*.003)*b.inertia;}
      if(fallen&&fallenFor>1400&&distance<spec.legLength+12)Body.applyForce(b,b.position,{x:b.mass*.0007,y:-b.mass*.0035});
      if(!fallen&&distance<spec.legLength+28&&Math.abs(b.velocity.x)<.4&&ms-r.lastJump>2200&&course.obstacles.some(o=>(o.type==='barrier'||o.type==='ramp'||o.type==='pit')&&o.x+o.width>x-60&&o.x<x+120)){Body.applyForce(b,b.position,{x:b.mass*.003,y:-b.mass*.035});r.lastJump=ms;diagnostics.jumps++;log(lane,'GET UP',ms,900);}
      // A spring neck plus two colliders: head lag and torque are solved by Matter.
      const hx=b.position.x+Math.cos(b.angle)*spec.headOffset[0]-Math.sin(b.angle)*spec.headOffset[1],hy=b.position.y+Math.sin(b.angle)*spec.headOffset[0]+Math.cos(b.angle)*spec.headOffset[1];
      const neckForce={x:((hx-head.position.x)*.00004-(head.velocity.x-b.velocity.x)*.0003)*head.mass,y:((hy-head.position.y)*.00004-(head.velocity.y-b.velocity.y)*.0003-(.00075-spec.headRisk*.00025))*head.mass};
      Body.applyForce(head,head.position,neckForce);
      // Neck muscles are internal: their equal reaction loads the torso.
      Body.applyForce(b,{x:b.position.x+20,y:b.position.y-8},{x:-neckForce.x,y:-neckForce.y});
      const neckTorque=(-angle(head.angle-b.angle)*.0003-(head.angularVelocity-b.angularVelocity)*.002)*head.inertia;head.torque+=neckTorque;b.torque-=neckTorque;
      const wasAir=r.air;Engine.update(engine,STEP);
      r.air=supportAt(b.position.x)-b.position.y>spec.legLength+20;
      if(r.air&&!wasAir)r.airAt=ms;
      if(!r.air&&wasAir&&ms-r.airAt>220){diagnostics.landings++;const perfect=Math.abs(angle(b.angle))<.3;if(perfect){r.energy=clamp(r.energy+.012,.2,1);Body.applyForce(b,b.position,{x:b.mass*.0004,y:0});}log(lane,perfect?'PERFECT LANDING':'CRASH',ms,700)}
      diagnostics.maxAir=Math.max(diagnostics.maxAir,groundAt(course,b.position.x)-b.position.y-spec.legLength);
      if(b.position.x>=course.length&&!r.finished){finishes[lane]=Math.round(ms);r.finished=true;}
      if(b.position.y>250||!Number.isFinite(b.position.x))throw Error('Physical simulation became unstable '+JSON.stringify({ms,x:b.position.x,y:b.position.y,angle:b.angle,vx:b.velocity.x,lane}));
      r.state=fallen?(fallenFor<1300?3:4):ms<r.slipUntil?2:r.air?(ms-r.lastJump<1400?1:1):ms<r.panicUntil?8:r.mode;
      if(tick%6===0||r.finished){const f=front!,z=rear!;const frame=[b.position.x,b.position.y,angle(b.angle),head.position.x,head.position.y,angle(head.angle),b.velocity.x,b.velocity.y,angle(r.phase),clamp((spec.legLength-distance)/30,-.4,.4),r.state,f.x,f.y,z.x,z.y,r.energy,groundAt(course,b.position.x)];if(tick%6===0)values.push(...frame);if(r.finished)r.finalPose=frame;}
    }
  }
  const distances=racers.map(r=>Math.round(r.body.position.x*100)/100),ranking=Array.from({length:n},(_,i)=>i).sort((a,b)=>finishes[a]&&finishes[b]?finishes[a]-finishes[b]:finishes[a]?-1:finishes[b]?1:distances[b]-distances[a]);
  racers.forEach(r=>{Composite.clear(r.engine.world,false);Engine.clear(r.engine)});
  return {version:PHYSICS_VERSION,hz:SAMPLE_HZ,stride:STRIDE,frames:Math.floor(steps/6)+1,lanes:n,duration,data:encode(values),ranking,finishes,distances,events:events.sort((a,b)=>a.at-b.at||a.lane-b.lane),course,specs,diagnostics};
}
const cache=new Map<string,{tape:ReplayTape;decoded:DataView}>();
export function replayFor(race:{seed:string;players:{drawing:Drawing;rig?:RigMarks}[];track:number;tape?:ReplayTape}){
  const key=race.seed+':'+(race.tape?.hash||PHYSICS_VERSION+JSON.stringify(race.players.map(p=>[p.drawing,p.rig])));let r=cache.get(key);if(r)return r;
  const tape=race.tape||simulate(race.seed,race.players.map(p=>p.drawing),race.players.map(p=>p.rig),race.track);r={tape,decoded:decodeTape(tape)};cache.set(key,r);if(cache.size>8)cache.delete(cache.keys().next().value!);return r;
}






