import test from 'node:test';
import assert from 'node:assert/strict';
import {audioPreferences,musicCueFor,GameAudioEngine,DEFAULT_AUDIO} from '../lib/game-audio';
test('music follows the actual view and the final-push boundary',()=>{
 assert.equal(musicCueFor('home',90000),'lobby');assert.equal(musicCueFor('draw',0),'lobby');assert.equal(musicCueFor('race',-1),'lobby');
 assert.equal(musicCueFor('race',0),'race');assert.equal(musicCueFor('race',64999),'race');assert.equal(musicCueFor('race',65000),'final');assert.equal(musicCueFor('race',89999),'final');assert.equal(musicCueFor('results',90000),'results');
});
test('audio lifecycle crossfades phases, honors mute, and plays the winner jingle once',async t=>{
 const sources:any[]=[],originalFetch=globalThis.fetch,originalWindow=(globalThis as any).window;
 class Param{value=1;events:unknown[][]=[];setValueAtTime(v:number,at:number){this.value=v;this.events.push(['set',v,at]);return this}linearRampToValueAtTime(v:number,at:number){this.value=v;this.events.push(['ramp',v,at]);return this}setTargetAtTime(v:number,at:number,tau:number){this.value=v;this.events.push(['target',v,at,tau]);return this}cancelScheduledValues(){return this}}
 class Gain{gain=new Param();connect(){return this}disconnect(){}}
 class Context{state='suspended';currentTime=1;destination={};resume(){this.state='running';return Promise.resolve()}suspend(){this.state='suspended';return Promise.resolve()}close(){return Promise.resolve()}createGain(){return new Gain()}decodeAudioData(){return Promise.resolve({duration:40})}createBufferSource(){const source={loop:false,loopEnd:0,loopStart:0,buffer:null,onended:null as null|(()=>void),connect(){return this},disconnect(){},start(at:number,offset:number){Object.assign(this,{startedAt:at,offset})},stop(at:number){Object.assign(this,{stoppedAt:at})}};sources.push(source);return source}}
 (globalThis as any).window={AudioContext:Context};globalThis.fetch=(async(url:string|URL|Request)=>new Response(String(url).endsWith('manifest.json')?JSON.stringify({tracks:['lobby','race','final','results'].map(id=>({id,title:id,url:'/music/'+id+'.mp3',duration:36,loop:id!=='results',loopStart:0,loopEnd:36}))}):new Uint8Array([1,2,3]))) as typeof fetch;
 const bus=new GameAudioEngine(()=>{});t.after(()=>{bus.dispose();globalThis.fetch=originalFetch;(globalThis as any).window=originalWindow});
 const flush=async()=>{await new Promise(r=>setImmediate(r));await new Promise(r=>setImmediate(r))};
 await bus.prepare();assert.equal(sources.length,0,'preloading must not bypass autoplay');
 await bus.unlock();await flush();assert.equal(sources.length,1);assert.equal(sources[0].loop,true);
 bus.setScene({cue:'race',key:'r1',elapsed:12000,paused:false});await flush();assert.equal(sources.length,2);assert.equal(sources[1].offset,12);assert.ok(sources[0].stoppedAt>1,'old cue fades before stopping');
 bus.setScene({cue:'final',key:'r1',elapsed:66000,paused:false});await flush();assert.equal(sources.length,3);assert.equal(sources[2].offset,1);
 bus.setScene({cue:'results',key:'r1',elapsed:90000,paused:false});await flush();assert.equal(sources.length,4);assert.equal(sources[3].loop,false);sources[3].onended();
 for(let i=0;i<5;i++)bus.setScene({cue:'results',key:'r1',elapsed:90000+i*100,paused:false});await flush();assert.equal(sources.length,4,'ended jingle must not restart on every game tick');
 bus.setPreferences({...DEFAULT_AUDIO,muted:true});bus.setScene({cue:'lobby',key:'menu',elapsed:0,paused:false});await flush();assert.equal(sources.length,4);
 bus.setPreferences({...DEFAULT_AUDIO,muted:false});await flush();assert.equal(sources.length,5);
});
test('corrupt/legacy audio settings cannot force invalid gains or lose a mute preference',()=>{
 assert.deepEqual(audioPreferences(null,false),{muted:true,musicEnabled:true,sfxEnabled:false,musicVolume:.42,sfxVolume:.7});
 assert.equal(audioPreferences({musicVolume:Infinity,sfxVolume:NaN}).musicVolume,.42);
 const p=audioPreferences({musicVolume:9,sfxVolume:-2,musicEnabled:false,sfxEnabled:true,muted:false});assert.equal(p.musicVolume,1);assert.equal(p.sfxVolume,0);assert.equal(p.musicEnabled,false);assert.equal(p.sfxEnabled,true);
});
