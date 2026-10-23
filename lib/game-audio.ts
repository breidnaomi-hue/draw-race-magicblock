export type MusicCue='lobby'|'race'|'final'|'results';
export type AudioPreferences={muted:boolean;musicEnabled:boolean;sfxEnabled:boolean;musicVolume:number;sfxVolume:number};
export const DEFAULT_AUDIO:AudioPreferences={muted:false,musicEnabled:true,sfxEnabled:true,musicVolume:.42,sfxVolume:.7};
export function audioPreferences(value:unknown,legacySound=true):AudioPreferences{
 const v=value&&typeof value==='object'?value as Partial<AudioPreferences>:{};
 const number=(n:unknown,fallback:number)=>typeof n==='number'&&Number.isFinite(n)?Math.max(0,Math.min(1,n)):fallback;
 return {muted:typeof v.muted==='boolean'?v.muted:!legacySound,musicEnabled:typeof v.musicEnabled==='boolean'?v.musicEnabled:true,sfxEnabled:typeof v.sfxEnabled==='boolean'?v.sfxEnabled:legacySound,musicVolume:number(v.musicVolume,.42),sfxVolume:number(v.sfxVolume,.7)};
}
export function musicCueFor(view:'home'|'draw'|'race'|'results',elapsed:number):MusicCue{
 return view==='results'?'results':view==='race'&&elapsed>=0?(elapsed>=65000?'final':'race'):'lobby';
}
export type AudioScene={cue:MusicCue;key:string;elapsed:number;paused:boolean};
export type AudioState={unlocked:boolean;loading:boolean;playing:MusicCue|null;title:string;error:boolean;paused:boolean};
type Track={id:MusicCue;title:string;url:string;duration:number;loop:boolean;loopStart:number;loopEnd:number};
type Voice={source:AudioBufferSourceNode;gain:GainNode;stamp:string};
let activeEngine:GameAudioEngine|undefined;
export function playGameTone(frequency:number,duration:number,volume=.05,important=false){activeEngine?.tone(frequency,duration,volume,important)}

export class GameAudioEngine {
 private context?:AudioContext;
 private music?:GainNode;private duck?:GainNode;private sfx?:GainNode;
 private preferences:AudioPreferences={...DEFAULT_AUDIO};
 private tracks=new Map<MusicCue,Track>();private bytes=new Map<MusicCue,ArrayBuffer>();private buffers=new Map<MusicCue,AudioBuffer>();private pending=new Map<MusicCue,Promise<AudioBuffer|undefined>>();
 private preparation?:Promise<void>;private voice?:Voice;private lastStarted='';private generation=0;private disposed=false;private hidden=false;private backgroundTimer?:ReturnType<typeof setTimeout>;
 private scene:AudioScene={cue:'lobby',key:'menu',elapsed:0,paused:false};
 private state:AudioState={unlocked:false,loading:false,playing:null,title:'',error:false,paused:false};
 constructor(private changed:(state:AudioState)=>void){activeEngine=this;}
 private emit(patch:Partial<AudioState>){if(this.disposed)return;const next={...this.state,...patch};if(JSON.stringify(next)!==JSON.stringify(this.state)){this.state=next;this.changed(next)}}
 async prepare(){
  if(this.preparation)return this.preparation;
  this.preparation=(async()=>{try{
   const response=await fetch('/music/manifest.json');if(!response.ok)throw Error('Manifest');
   const manifest=await response.json() as {tracks:Track[]};
   for(const track of manifest.tracks){if(['lobby','race','final','results'].includes(track.id)&&track.url.startsWith('/music/'))this.tracks.set(track.id,track)}
   if(this.tracks.size!==4)throw Error('Tracks');
   // Lobby has priority; compressed race/final/result files then preload independently.
   const fetchTrack=async(id:MusicCue)=>{const track=this.tracks.get(id)!;const r=await fetch(track.url);if(!r.ok)throw Error('Audio');const bytes=await r.arrayBuffer();if(!this.disposed)this.bytes.set(id,bytes)};
   await fetchTrack('lobby');void this.applyScene();
   for(const pair of [['race','final'],['results']] as MusicCue[][])await Promise.all(pair.map(fetchTrack));
   this.emit({error:false});if(this.context)void Promise.all([...this.tracks.keys()].map(id=>this.decode(id)));void this.applyScene();
  }catch{this.preparation=undefined;this.emit({loading:false,error:true})}})();
  return this.preparation;
 }
 async unlock(){
  if(this.disposed)return;
  try{
   if(!this.context){const Context=window.AudioContext||(window as Window&{webkitAudioContext?:typeof AudioContext}).webkitAudioContext;if(!Context)throw Error('Unsupported');this.context=new Context({latencyHint:'interactive'});this.music=this.context.createGain();this.duck=this.context.createGain();this.sfx=this.context.createGain();this.music.gain.value=0;this.music.connect(this.duck).connect(this.context.destination);this.sfx.connect(this.context.destination);this.setPreferences(this.preferences)}
   // Called directly from a trusted click/key handler, including on iOS.
   await this.context.resume();if(this.disposed)return;this.emit({unlocked:this.context.state==='running',error:false});void this.prepare();void this.applyScene();
  }catch{this.emit({unlocked:false})}
 }
 setPreferences(preferences:AudioPreferences){
  this.preferences={...preferences};const c=this.context;
  if(c&&this.music&&this.sfx){const audible=!preferences.muted;this.sfx.gain.setTargetAtTime(audible&&preferences.sfxEnabled?preferences.sfxVolume:0,c.currentTime,.025);this.music.gain.setTargetAtTime(audible&&preferences.musicEnabled&&!this.scene.paused?preferences.musicVolume:0,c.currentTime,.10)}
  if(preferences.muted||!preferences.musicEnabled){this.lastStarted='';this.fadeOut(.22);this.emit({playing:null,loading:false})}else void this.applyScene();
 }
 setScene(scene:AudioScene){const wasPaused=this.scene.paused;this.scene=scene;this.emit({paused:scene.paused});if(scene.paused&&!wasPaused){this.lastStarted='';this.fadeOut(.12);this.emit({playing:null})}if(scene.paused!==wasPaused&&this.context&&this.music)this.music.gain.setTargetAtTime(scene.paused?0:(!this.preferences.muted&&this.preferences.musicEnabled?this.preferences.musicVolume:0),this.context.currentTime,.10);void this.applyScene();}
 private async decode(id:MusicCue){
  if(this.buffers.has(id))return this.buffers.get(id);
  if(this.pending.has(id))return this.pending.get(id);
  const bytes=this.bytes.get(id),context=this.context;if(!bytes||!context)return;
  const task=context.decodeAudioData(bytes.slice(0)).then(buffer=>{if(!this.disposed){this.buffers.set(id,buffer);this.bytes.delete(id)}return buffer}).catch(()=>{this.emit({loading:false,error:true});return undefined}).finally(()=>this.pending.delete(id));
  this.pending.set(id,task);return task;
 }
 private async applyScene(){
  const {context:c,preferences:p,scene:s}=this;if(!c||c.state!=='running'||this.hidden||this.disposed||p.muted||!p.musicEnabled||s.paused)return;
  const stamp=s.cue+':'+s.key;if(this.voice?.stamp===stamp||this.lastStarted===stamp&&!this.voice)return;
  const track=this.tracks.get(s.cue);if(!track){void this.prepare();return}
  const generation=++this.generation;this.emit({loading:true});
  const buffer=await this.decode(s.cue);if(!buffer){this.emit({loading:!this.state.error});return}
  if(this.disposed||generation!==this.generation||this.scene.cue!==s.cue||this.scene.key!==s.key||this.hidden||this.preferences.muted||!this.preferences.musicEnabled||this.scene.paused)return;
  const source=c.createBufferSource(),gain=c.createGain();source.buffer=buffer;source.loop=track.loop;source.loopStart=track.loopStart||0;source.loopEnd=Math.min(track.loopEnd||buffer.duration,buffer.duration);source.connect(gain).connect(this.music!);
  const offset=s.cue==='race'?Math.max(0,s.elapsed)/1000:s.cue==='final'?Math.max(0,s.elapsed-65000)/1000:0;
  const fade=s.cue==='results'?.38:1.0;gain.gain.setValueAtTime(0,c.currentTime);gain.gain.linearRampToValueAtTime(1,c.currentTime+fade);
  this.fadeOut(fade);this.lastStarted=stamp;this.voice={source,gain,stamp};source.onended=()=>{if(this.voice?.source===source){this.voice=undefined;this.emit({playing:null})}source.disconnect();gain.disconnect()};
  source.start(0,track.loop?offset%source.loopEnd:0);this.music!.gain.setTargetAtTime(this.preferences.musicVolume,c.currentTime,.08);this.emit({loading:false,error:false,playing:s.cue,title:track.title});
 }
 private fadeOut(seconds:number){const old=this.voice,c=this.context;if(!old||!c)return;this.voice=undefined;old.gain.gain.cancelScheduledValues(c.currentTime);old.gain.gain.setValueAtTime(old.gain.gain.value,c.currentTime);old.gain.gain.linearRampToValueAtTime(0,c.currentTime+seconds);try{old.source.stop(c.currentTime+seconds+.03)}catch{}}
 tone(frequency:number,duration:number,volume:number,important:boolean){
  const c=this.context,p=this.preferences;if(!c||c.state!=='running'||p.muted||!p.sfxEnabled||this.hidden)return;
  const osc=c.createOscillator(),gain=c.createGain();osc.type='triangle';osc.frequency.value=frequency;gain.gain.setValueAtTime(Math.min(.24,volume*(important?3:1.15)),c.currentTime);gain.gain.exponentialRampToValueAtTime(.0001,c.currentTime+duration);osc.connect(gain).connect(this.sfx!);osc.onended=()=>{osc.disconnect();gain.disconnect()};osc.start();osc.stop(c.currentTime+duration+.02);
  if(important&&this.duck){const g=this.duck.gain;g.cancelScheduledValues(c.currentTime);g.setTargetAtTime(.62,c.currentTime,.018);g.setTargetAtTime(1,c.currentTime+Math.min(.45,duration+.12),.16)}
 }
 visibility(hidden:boolean){this.hidden=hidden;clearTimeout(this.backgroundTimer);if(hidden){this.generation++;this.lastStarted='';this.fadeOut(.08);if(this.context)this.backgroundTimer=setTimeout(()=>{if(this.hidden)void this.context?.suspend().catch(()=>{})},110)}else if(this.state.unlocked){void this.unlock()}}
 dispose(){this.disposed=true;this.generation++;clearTimeout(this.backgroundTimer);this.fadeOut(.01);void this.context?.close().catch(()=>{});this.buffers.clear();this.bytes.clear();if(activeEngine===this)activeEngine=undefined}
}
