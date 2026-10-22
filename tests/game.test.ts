import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Room,randomHex,sha,makePlan,progress,verifyRace,seedInput,validateDrawing,raceOrder,DURATION,headplant} from '../lib/game';
import {createRoom,act,publicRoom,Store,api} from '../lib/rooms';
import {analyze,terrainScore} from '../lib/traits';
import {exampleHorse} from '../lib/drawing';
import {FileStore} from '../server/file-store';
import {courseFor,routeY} from '../lib/course';
import {demoRace} from '../lib/demo';
class Memory implements Store{map=new Map<string,Room>();async get(code:string){return structuredClone(this.map.get(code)||null)}async create(r:Room){if(this.map.has(r.code))return false;this.map.set(r.code,structuredClone(r));return true}async save(r:Room,v:number){if(this.map.get(r.code)?.revision!==v)return false;this.map.set(r.code,structuredClone(r));return true}}
const horse=exampleHorse(0),ready=(drawing=horse)=>({drawing,nonce:randomHex(),name:'Tester'});
test('shipped home demo and drawing preview contain valid race seeds',()=>{for(const seed of [demoRace.seed,'1234'+demoRace.seed.slice(4)]){assert.match(seed,/^[a-f0-9]{64}$/);assert.equal(makePlan(seed,4,DURATION,demoRace.players.map(p=>p.drawing)).ranking.length,4)}});
for(const n of [2,4] as const)test(n+' players: concurrent joins/ready, secret, replay, locked roster, rematch',async()=>{
  const db=new Memory(),tokens=Array.from({length:n},()=>randomHex()),created=await createRoom(db,tokens[0],'Host',n,1000),code=created.room.code;
  assert.equal('secret' in created.room,false);assert.equal(JSON.stringify(created).includes(tokens[0]),false);
  await Promise.all(tokens.slice(1).map(t=>act(db,code,t,'join',{name:'Friend'},1100)));
  await Promise.all(tokens.map((t,i)=>act(db,code,t,'ready',ready(exampleHorse(i)),1200)));
  const room=(await db.get(code))!;assert.equal(room.players.length,n);assert.ok(room.race);assert.equal(await verifyRace(code,room.race),true);
  assert.equal(room.race.commitment,created.room.commitment);assert.equal(new Set(room.players.map(p=>p.id)).size,n);
  await assert.rejects(act(db,code,randomHex(),'join',{},1300));await assert.rejects(act(db,code,tokens[0],'ready',ready(),1400));
  const a=makePlan(room.race.seed,n,room.race.duration,room.race.players.map(p=>p.drawing),room.race.track),b=makePlan(room.race.seed,n,room.race.duration,room.race.players.map(p=>p.drawing),room.race.track);assert.deepEqual(a,b);
  assert.deepEqual([...a.finishes.keys()].sort((x,y)=>a.finishes[x]-a.finishes[y]),a.ranking);
  for(let lane=0;lane<n;lane++){let last=0;for(let t=0;t<=DURATION+1000;t+=50){const p=progress(a,lane,t);assert.ok(p>=last&&p<=1);last=p}assert.equal(last,1)}
  await assert.rejects(act(db,code,tokens[0],'rematch',{},1500));
  await Promise.all(tokens.map(t=>act(db,code,t,'rematch',{},200000)));
  const rematch=(await db.get(code))!;assert.equal(rematch.race,null);assert.equal(rematch.round,2);assert.notEqual(rematch.commitment,room.commitment);assert.equal(rematch.history.length,1);assert.ok(rematch.players.every(p=>!p.ready&&p.drawing.length));
});
test('forged receipt, modified drawing and different room fail verification',async()=>{const db=new Memory(),a=randomHex(),b=randomHex(),c=await createRoom(db,a,'A',2,0),code=c.room.code;await act(db,code,b,'join',{},1);await act(db,code,a,'ready',ready(),2);await act(db,code,b,'ready',ready(),3);const race=(await db.get(code))!.race!;assert.ok(await verifyRace(code,race));assert.equal(await verifyRace('OTHER1',race),false);assert.equal(await verifyRace(code,{...race,seed:randomHex()}),false);const fake=structuredClone(race);fake.players[0].drawing[0].width++;assert.equal(await verifyRace(code,fake),false)});
test('host privileges, ready lock, timeout and offline seat management',async()=>{const db=new Memory(),a=randomHex(),b=randomHex(),c=await createRoom(db,a,'A',2,0),code=c.room.code;await act(db,code,b,'join',{},1);await assert.rejects(act(db,code,b,'reset',{},2));await assert.rejects(act(db,code,a,'kick',{id:(await db.get(code))!.players[1].id},1000));await act(db,code,a,'kick',{id:(await db.get(code))!.players[1].id},46000);assert.equal((await db.get(code))!.players.length,1);await assert.rejects(act(db,code,a,'ready',ready(),700000));await act(db,code,a,'reset',{},700001);assert.ok((await db.get(code))!.deadline>700001)});
test('reload resumes seat using token; impostors cannot read or mutate',async()=>{const db=new Memory(),token=randomHex(),c=await createRoom(db,token,'Alice',2),code=c.room.code;const again=await act(db,code,token,'join',{name:'Wrong'});assert.equal(again.playerId,c.playerId);assert.equal(again.room.players.length,1);const res=await api(new Request('http://local/api/rooms/'+code,{headers:{Authorization:'Bearer '+randomHex()}}),db);assert.equal(res.status,403);await assert.rejects(act(db,code,randomHex(),'heartbeat'))});
test('drawing inputs are bounded; scripts and invalid numbers rejected',()=>{assert.throws(()=>validateDrawing([]));assert.throws(()=>validateDrawing([{color:'javascript:alert(1)',width:9,points:[[5,5]]}]));assert.throws(()=>validateDrawing([{color:'#123456',width:NaN,points:[[5,5]]}]));assert.throws(()=>validateDrawing([{color:'#123456',width:9,points:[[Infinity,5]]}]));assert.throws(()=>validateDrawing(Array(251).fill(horse[0])));assert.deepEqual(validateDrawing(horse),horse.map(s=>({...s,points:s.points.map(([x,y])=>[Math.round(x*10)/10,Math.round(y*10)/10])})))});
test('every build has the same 150-point budget with bounded attributes',()=>{for(let i=0;i<4;i++){const t=analyze(exampleHorse(i));assert.ok(Math.abs(t.speed+t.jump+t.grip-150)<1e-8);for(const s of [t.speed,t.jump,t.grip])assert.ok(s>=25&&s<=75)}const light={speed:65,jump:60,grip:25,build:'Speedster' as const,body:0,legs:1,neck:0,overhang:0,headRisk:0},heavy={...light,speed:35,jump:40,grip:75,build:'Tank' as const};assert.ok(terrainScore(light,0)>terrainScore(heavy,0));assert.ok(terrainScore(heavy,2)>terrainScore(light,2))});
test('equal drawings have no seat advantage within sampling tolerance',async()=>{const counts=[0,0,0,0];for(let i=0;i<1000;i++){const seed=await sha('balance-'+i);counts[raceOrder(seed,[horse,horse,horse,horse],i%3)[0]]++}counts.forEach(c=>assert.ok(c>205&&c<295,counts.join(',')))});
test('file repository persists across instances and uses revision compare-and-swap',async()=>{const directory=await mkdtemp(join(tmpdir(),'draw-race-test-')),a=new FileStore(directory),token=randomHex(),c=await createRoom(a,token,'Persistent',2),b=new FileStore(directory),r=(await b.get(c.room.code))!;assert.equal(r.players[0].name,'Persistent');r.revision++;assert.equal(await a.save(r,0),true);assert.equal(await a.save(r,0),false)});
test('90-second circuit has deterministic bends, obstacles and diverse weather',async()=>{assert.equal(DURATION,90000);const weather=new Set<string>();for(let i=0;i<30;i++){const seed=await sha('weather'+i),course=courseFor(seed,i%3);assert.deepEqual(course,courseFor(seed,i%3));assert.equal(course.obstacles.length,8);assert.equal(course.bends.length,5);assert.ok(course.obstacles.every(o=>o.position>0&&o.position<1));weather.add(course.weather)}assert.equal(weather.size,5);assert.ok(routeY(.1)>0);assert.ok(routeY(.35)<0)});
test('long muzzle increases headplant risk; extreme leverage tips, and penalties can change places',async()=>{
  const torso={color:'#222222',width:9,erase:false,points:[[100,200],[260,200],[260,260],[100,260],[100,200]] as [number,number][]};
  const build=(length:number)=>[torso,{...torso,points:[[260,200],[280,130],[280+length,130]] as [number,number][]}];
  const short=build(40),long=build(300);assert.ok(analyze(long).headRisk>analyze(short).headRisk);assert.equal(analyze(long).headRisk,1);
  let changed=0;for(let i=0;i<60;i++){const seed=await sha('neck'+i),fall=headplant(seed,long,0,i%3),plan=makePlan(seed,2,DURATION,[long,short],i%3);assert.ok(fall.occurs&&fall.extreme);assert.ok(plan.events.some(e=>e.type==='topple'&&e.lane===0));assert.deepEqual(plan,makePlan(seed,2,DURATION,[long,short],i%3));const equal=raceOrder(seed,[short,short],i%3);if(equal[0]!==plan.ranking[0])changed++}assert.ok(changed>0);
});
