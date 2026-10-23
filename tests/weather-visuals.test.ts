import test from 'node:test';
import assert from 'node:assert/strict';
import {weatherVisualProfile,drawWeatherParticles} from '../lib/weather-visuals';
test('every weather preset protects gameplay; mobile/low budgets are lower',()=>{
 for(const kind of ['Fog','Dust storm','Rain','Snow & ice','Strong wind','Sunshine'] as const){
  const desktop=weatherVisualProfile(kind,1280,720),mobile=weatherVisualProfile(kind,390,844),landscape=weatherVisualProfile(kind,844,390),low=weatherVisualProfile(kind,390,844,true);
  for(const p of [desktop,mobile,landscape,low]){assert.equal(p.foregroundHaze,0);assert.equal(p.fullScreenTint,0);assert.ok(p.backgroundHaze<=.16);assert.ok(p.particles<=84);assert.ok(p.particleAlpha<=.36)}
  assert.ok(mobile.particles<=desktop.particles);assert.ok(low.particles<=mobile.particles);assert.equal(landscape.tier,'mobile');assert.equal(weatherVisualProfile(kind,390,844,false,true).particles,0);
 }
});
test('particle protection clears exact horse and obstacle regions after drawing',()=>{
 const calls:unknown[][]=[],g=new Proxy({},{get:(_,key)=>key==='globalAlpha'||key==='lineWidth'?1:(...args:unknown[])=>{calls.push([key,...args])},set:()=>true}) as CanvasRenderingContext2D;
 const protectedAreas=[{x:20,y:40,width:80,height:60},{x:140,y:160,width:20,height:45}];
 drawWeatherParticles(g,390,844,'Dust storm',-1,30000,weatherVisualProfile('Dust storm',390,844),protectedAreas);
 assert.deepEqual(calls.slice(-2),protectedAreas.map(r=>['clearRect',r.x,r.y,r.width,r.height]));
 assert.equal(calls.filter(c=>c[0]==='fillRect').every(c=>c[3]===2&&c[4]===1),true);
});
