/* Original DRAW RACE arrangement and oscillator/noise synthesis.
 * Neural note motifs and their provenance are retained in docs/audio.
 * No third-party audio samples, soundfonts or runtime model dependencies.
 * Run: node scripts/music/synthesize-soundtrack.cjs [outside-repo-master-directory]
 */
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..'),masters=path.resolve(process.argv[2]||path.join(root,'../work/music-tools/masters')),destination=path.join(root,'public/music');
const motifs=JSON.parse(fs.readFileSync(path.join(root,'docs/audio/musicvae-motifs.json'),'utf8')).motifs;
const SR=32000,TAU=2*Math.PI,scale=[0,2,4,5,7,9,11],sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const tool=name=>process.env[name.toUpperCase()+'_PATH']||(process.platform==='win32'&&fs.existsSync(path.join(root,'../work/music-tools/node_modules/@'+name+'-installer/win32-x64/'+name+'.exe'))?path.join(root,'../work/music-tools/node_modules/@'+name+'-installer/win32-x64/'+name+'.exe'):name),FFMPEG=tool('ffmpeg'),FFPROBE=tool('ffprobe');
fs.mkdirSync(masters,{recursive:true});fs.mkdirSync(destination,{recursive:true});
const definitions=[
 {id:'lobby',title:'Paddock Doodles',bpm:104,bars:16,loop:true,lufs:-18,seed:20261023,lead:['lobby-1'],brief:'Light marimba, plucked strings, soft sine bass and shaker; friendly waiting-room bounce; 16 bars.'},
 {id:'race',title:'Hooves in a Hurry',bpm:132,bars:32,loop:true,lufs:-17,seed:20261123,lead:['race-1','race-2'],brief:'Playful cartoon arcade race; bouncy bass, original drums, marimba lead and light bell answers; 32 bars.'},
 {id:'final',title:'One More Gallop',bpm:156,bars:16,loop:true,lufs:-16,seed:20261223,lead:['final-3','final-2'],brief:'Urgent but cheerful final push; brighter mallets, running bass, tighter kick/snare and rising fills; 16 bars.'},
 {id:'results',title:'A Very Doodled Victory',bpm:144,bars:4,loop:false,lufs:-17,seed:20261323,lead:['results-3'],brief:'Short joyful soft-brass and mallet fanfare with a major-key cadence and natural room tail; 4 bars plus tail.'}
];
function rng(seed){let v=seed>>>0;return()=>{v^=v<<13;v^=v>>>17;v^=v<<5;return(v>>>0)/4294967296}}
const hz=p=>440*2**((p-69)/12);
function nearest(p,allowed){let best=p,dist=100;for(let n=Math.floor(p)-12;n<=p+12;n++)if(allowed.includes((n%12+12)%12)&&Math.abs(n-p)<dist){best=n;dist=Math.abs(n-p)}return best}
function fit(raw,octave,shift=0,chord=null){let p=raw;while(p<octave)p+=12;while(p>octave+16)p-=12;p=nearest(p,scale);const oct=Math.floor(p/12),deg=scale.indexOf(p%12),d=deg+shift;p=(oct+Math.floor(d/7))*12+scale[(d%7+7)%7];if(chord)p=nearest(p,chord);return p}
function wav(file,data){const b=Buffer.alloc(44+data.length*4);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(3,20);b.writeUInt16LE(1,22);b.writeUInt32LE(SR,24);b.writeUInt32LE(SR*4,28);b.writeUInt16LE(4,32);b.writeUInt16LE(32,34);b.write('data',36);b.writeUInt32LE(data.length*4,40);for(let i=0;i<data.length;i++)b.writeFloatLE(data[i],44+i*4);fs.writeFileSync(file,b)}
function analyse(file){const r=cp.spawnSync(FFMPEG,['-hide_banner','-i',file,'-af','loudnorm=I=-17:TP=-2:LRA=11:print_format=json','-f','null','-'],{encoding:'utf8',maxBuffer:3e6});if(r.status!==0)throw r.error||Error(r.stderr);const m=r.stderr.match(/\{\s*"input_i"[\s\S]*?\}/);if(!m)throw Error('Missing loudness analysis');return JSON.parse(m[0])}
function synthesize(def){
 const beat=60/def.bpm,body=def.bars*4*beat,seconds=def.loop?body:body+4/3,N=Math.round(seconds*SR),dry=new Float32Array(N),random=rng(def.seed),events=[];
 const emit=(kind,pitch,start,duration,amp)=>{if(start>=body&&def.loop)return;events.push({kind,pitch,start,duration,amp});const freq=hz(pitch),tail=kind==='marimba'?1.15:kind==='pizz'?.7:kind==='brass'?.32:kind==='bell'?1.3:.08,len=Math.ceil((duration+tail)*SR),at=Math.round(start*SR);let low=0,slow=0;
  for(let j=0;j<len;j++){const t=j/SR;if(t>seconds&&!def.loop)break;let value=0,env=0;
   if(kind==='marimba'){env=(1-Math.exp(-t*650))*Math.exp(-t/(.12+duration*.34));value=(Math.sin(TAU*freq*t)+.29*Math.sin(TAU*freq*3.98*t)*Math.exp(-t*15)+.07*Math.sin(TAU*freq*9.2*t)*Math.exp(-t*29))*env}
   else if(kind==='pizz'){env=(1-Math.exp(-t*900))*Math.exp(-t/(.08+duration*.25));for(let h=1;h<=5;h++)value+=Math.sin(TAU*freq*h*t)*Math.exp(-h*t*3)/(h*h);value*=env}
   else if(kind==='bass'){env=Math.min(1,t/.012)*Math.exp(-t/(.11+duration*.3))*Math.min(1,Math.max(0,(duration+.08-t)/.08));value=(Math.sin(TAU*freq*t)+.19*Math.sin(TAU*freq*2*t)+.05*Math.sin(TAU*freq*3*t))*env}
   else if(kind==='bell'){env=(1-Math.exp(-t*300))*Math.exp(-t/(.18+duration*.4));value=(Math.sin(TAU*freq*t)+.18*Math.sin(TAU*freq*2*t)+.05*Math.sin(TAU*freq*3*t))*env}
   else if(kind==='brass'){env=Math.min(1,t/.028)*(.64+.36*Math.exp(-t*10))*Math.min(1,Math.max(0,(duration+.24-t)/.24));value=(Math.sin(TAU*freq*t)+.3*Math.sin(TAU*freq*2*t)+.12*Math.sin(TAU*freq*3*t)+.04*Math.sin(TAU*freq*4*t))*env}
   else if(kind==='kick'){env=(1-Math.exp(-t*1200))*Math.exp(-t*25);const phase=TAU*(48*t+95*(1-Math.exp(-35*t))/35);value=Math.sin(phase)*env+.015*(random()*2-1)*Math.exp(-t*120)}
   else{const noise=random()*2-1;low+=.48*(noise-low);slow+=.08*(noise-slow);const band=kind==='snare'?low-slow:noise-low;env=(1-Math.exp(-t*1000))*Math.exp(-t*(kind==='snare'?20:60));value=band*env+(kind==='snare'?.18*Math.sin(TAU*180*t)*Math.exp(-t*32):0)}
   let k=at+j;if(def.loop)k=((k%N)+N)%N;else if(k<0||k>=N)continue;dry[k]+=value*amp;
  }
 };
 const progression=[0,9,5,7],chordAt=bar=>{const pc=progression[Math.floor(bar)%4];return {pc,pitches:[pc,(pc+(pc===9?3:4))%12,(pc+7)%12]}};
 // Accompaniment: original score; note-level neural melody is layered below.
 for(let bar=0;bar<def.bars;bar++){
  const chord=chordAt(bar),barStart=bar*4*beat,final=def.id==='final',race=def.id==='race',lobby=def.id==='lobby',result=def.id==='results',section=Math.floor(bar/8)%2;
  const bassBeats=lobby?[0,1.5,2,3.5]:final?[0,.5,1,1.5,2,2.5,3,3.5]:[0,.75,1.5,2,2.75,3.5];
  for(let i=0;i<bassBeats.length;i++){let pitch=36+chord.pc+(i%3===2?7:0);while(pitch>52)pitch-=12;emit('bass',pitch,barStart+bassBeats[i]*beat,beat*(lobby?.44:.34),lobby?.075:final?.105:.095)}
  for(let eighth=0;eighth<8;eighth++){const b=eighth*.5,off=eighth%2===1;if(off||lobby){const pitch=60+chord.pitches[(eighth+bar)%3];emit('pizz',pitch,barStart+b*beat+(random()-.5)*.007,beat*.22,lobby?.026:result?.035:.04)}}
  for(let eighth=0;eighth<8;eighth++){if(lobby&&eighth%2===0)continue;emit(lobby?'shaker':'hat',0,barStart+eighth*.5*beat,0,lobby?.026:final?.022:.018)}
  if(!lobby){for(const b of final?[0,1,2,3]:[0,1.5,2,3.25])emit('kick',0,barStart+b*beat,.1,result?.11:.15);for(const b of [1,3])emit('snare',0,barStart+b*beat,.11,final?.14:.105)}
  else if(bar%2===0)emit('kick',0,barStart,.1,.055);
  if((bar+1)%8===0||result&&bar===2){for(let i=0;i<4;i++)emit('snare',0,barStart+(3+i*.25)*beat,.07,.045+i*.012)}
  if(!lobby&&bar%4===2){for(let i=0;i<3;i++)emit('bell',72+chord.pitches[i],barStart+(2.5+i*.5)*beat,beat*.3,.025)}
  if(final){for(let i=0;i<8;i++)emit('marimba',72+chord.pitches[i%3],barStart+i*.5*beat,beat*.14,.022+(i%2)*.008)}
 }
 for(let phrase=0;phrase<Math.ceil(def.bars/2);phrase++){
  const motif=motifs.find(m=>m.id===def.lead[phrase%def.lead.length]),startBar=phrase*2,shift=[0,0,2,0,0,-1,2,0][phrase%8],octave=def.id==='final'?67:def.id==='lobby'?60:64;
  let previous=72;
  for(const note of motif.sequence.notes){
   const s=Number(note.quantizedStartStep),end=Number(note.quantizedEndStep),absoluteBeats=startBar*4+s/4,bar=Math.floor(absoluteBeats/4);
   if(bar>=def.bars||def.id==='results'&&absoluteBeats>=12)continue;
   const chord=chordAt(bar),isDown=s%8===0;
   let p=fit(note.pitch,octave,shift,isDown?chord.pitches:null);while(p-previous>9)p-=12;while(previous-p>9)p+=12;while(p<58)p+=12;while(p>86)p-=12;previous=p;
   const duration=Math.min((end-s)/4*beat*.83,beat*1.4),amp=def.id==='lobby'?.086:def.id==='final'?.105:.10;
   emit(def.id==='results'?'brass':'marimba',p,absoluteBeats*beat+(random()-.5)*.004,duration,amp*(.87+random()*.2));
   if(def.id==='race'&&phrase%4===3&&s%4===0)emit('bell',p+12,absoluteBeats*beat+.035,beat*.2,.018);
  }
 }
 if(def.id==='results'){
  // Authored finishing cadence, following the neural phrase, with a clean tail.
  for(const [i,p]of [72,76,79,84].entries())emit('brass',p,(12+i*.5)*beat,beat*.34,.105);
  for(const p of [60,64,67,72,79])emit('brass',p,14*beat,beat*1.3,.052);
  emit('bell',84,14*beat,.8,.055);emit('kick',0,14*beat,.12,.13);
 }
 // Circular room reflections preserve periodic tails instead of fading loops.
 const wet=new Float32Array(N),taps=[[.047,.11],[.101,.073],[.173,.047],[.283,.025]],drive=def.id==='lobby'?8:12;
 for(let i=0;i<N;i++){let v=dry[i];for(const [delay,gain]of taps){const j=i-Math.round(delay*SR);if(def.loop)v+=dry[(j+N)%N]*gain;else if(j>=0)v+=dry[j]*gain}wet[i]=Math.tanh(v*drive)/drive}
 // Choose a quiet zero crossing near the score boundary by circular rotation.
 // This retains the complete periodic signal and introduces no boundary fade.
 let phaseOffset=0;
 if(def.loop){let best=Infinity;const radius=Math.round(.04*SR);for(let k=-radius;k<=radius;k++){const at=(k+N)%N,prev=wet[(at-1+N)%N],next=wet[at];if(prev*next>0)continue;let energy=0;for(let j=-128;j<128;j++)energy+=wet[(at+j+N)%N]**2;const score=energy/256+Math.abs(next-prev)*.02;if(score<best){best=score;phaseOffset=at}}if(phaseOffset){const rotated=wet.slice();for(let i=0;i<N;i++)wet[i]=rotated[(i+phaseOffset)%N]}}
 if(!def.loop)for(let i=Math.max(0,N-Math.round(.15*SR));i<N;i++)wet[i]*=(N-i)/(.15*SR);
 const raw=path.join(masters,def.id+'-raw.wav');wav(raw,wet);const measured=analyse(raw);
 const gainDb=Math.min(def.lufs-Number(measured.input_i),-2.4-Number(measured.input_tp)),gain=10**(gainDb/20);
 let peak=0,sum=0,clipped=0,finite=true;for(let i=0;i<N;i++){wet[i]*=gain;peak=Math.max(peak,Math.abs(wet[i]));sum+=wet[i]**2;if(Math.abs(wet[i])>=1)clipped++;if(!Number.isFinite(wet[i]))finite=false}
 if(!finite||clipped)throw Error('Invalid master '+def.id);
 const master=path.join(masters,def.id+'.wav');wav(master,wet);const mp3=path.join(destination,def.id+'.mp3');
 const encoded=cp.spawnSync(FFMPEG,['-y','-hide_banner','-loglevel','error','-i',master,'-codec:a','libmp3lame','-b:a','80k','-ar',String(SR),'-ac','1','-write_xing','1','-id3v2_version','3','-metadata','title='+def.title,'-metadata','artist=DRAW RACE','-metadata','comment=Original MusicVAE motifs, original arrangement and oscillator/noise synthesis',mp3],{encoding:'utf8'});if(encoded.status!==0)throw encoded.error||Error(encoded.stderr);
 const probe=JSON.parse(cp.execFileSync(FFPROBE,['-v','error','-show_format','-show_streams','-of','json',mp3],{encoding:'utf8'}));
 const decoded=cp.spawnSync(FFMPEG,['-hide_banner','-loglevel','error','-i',mp3,'-f','f32le','-ac','1','-ar',String(SR),'-'],{maxBuffer:30e6});if(decoded.status!==0)throw decoded.error||Error(decoded.stderr.toString());
 const pcm=decoded.stdout,decodedCount=pcm.length/4;let decodedPeak=0,decodedSq=0;for(let i=0;i<decodedCount;i++){const v=pcm.readFloatLE(i*4);decodedPeak=Math.max(decodedPeak,Math.abs(v));decodedSq+=v*v}
 const dLast=pcm.readFloatLE((decodedCount-1)*4),dFirst=pcm.readFloatLE(0),masterJump=Math.abs(wet[0]-wet[N-1]),decodedJump=Math.abs(dFirst-dLast),finalMeasured=analyse(mp3);
 const data=fs.readFileSync(mp3),report={id:def.id,pcmSamples:N,sampleRate:SR,pcmDuration:N/SR,mp3ContainerDuration:Number(probe.format.duration),decodedSamples:decodedCount,decodedDuration:decodedCount/SR,masterPeakDb:20*Math.log10(peak),decodedPeakDb:20*Math.log10(decodedPeak),masterRmsDb:10*Math.log10(sum/N),decodedRmsDb:10*Math.log10(decodedSq/decodedCount),integratedLUFS:Number(finalMeasured.input_i),truePeakDb:Number(finalMeasured.input_tp),staticGainDb:gainDb,softSaturationDrive:drive,circularPhaseOffsetSamples:phaseOffset,clippedSamples:clipped,masterLoopBoundaryJump:masterJump,decodedLoopBoundaryJump:decodedJump,loopBoundaryDb:20*Math.log10(Math.max(decodedJump,1e-12)),bytes:data.length,sha256:sha(data),sampleCountExact:decodedCount===N};
 if(decodedPeak>=1||decodedCount!==N)throw Error('Decode validation failed '+def.id);
 console.log(JSON.stringify(report));
 return {track:{id:def.id,title:def.title,url:'/music/'+def.id+'.mp3',duration:N/SR,loop:def.loop,loopStart:0,loopEnd:N/SR,bpm:def.bpm,bytes:data.length,sha256:sha(data),sampleRate:SR,pcmSamples:N,motifs:def.lead},report};
}
const rendered=definitions.map(synthesize),total=rendered.reduce((n,x)=>n+x.track.bytes,0);if(total>1_500_000)throw Error('Music byte budget exceeded');
fs.writeFileSync(path.join(destination,'manifest.json'),JSON.stringify({version:1,generator:'Magenta MusicVAE mel_2bar_small + original DRAW RACE arrangement and oscillator/noise synthesis',tracks:rendered.map(x=>x.track)},null,2)+'\n');
fs.writeFileSync(path.join(root,'docs/audio/mastering-report.json'),JSON.stringify({generatedAt:new Date().toISOString(),totalBytes:total,listeningReview:false,measurement:'ffprobe container metadata; gapless ffmpeg float decode; ffmpeg loudnorm analysis; PCM statistics; periodic synthesis and room tails',tracks:rendered.map(x=>x.report)},null,2)+'\n');
fs.writeFileSync(path.join(root,'docs/audio/production-briefs.json'),JSON.stringify({generator:'MusicVAE symbolic model, not natural-language conditioned',arrangement:'Original oscillator/noise instrument synthesis; neural motifs octave-folded, major-scale/chord-fitted and phrase-varied. Harmony, bass, drums, countermelodies and final cadence are authored arrangement.',themes:definitions},null,2)+'\n');
console.log('Soundtrack complete: '+total+' MP3 bytes');
