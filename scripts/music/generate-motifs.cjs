const fs=require('node:fs/promises');
const path=require('node:path');
const crypto=require('node:crypto');
const http=require('node:http');
const toolsRoot=path.resolve(process.env.MUSIC_TOOLS_DIR||path.join(__dirname,'../../../work/music-tools'));
const {MusicVAE}=require(path.join(toolsRoot,'node_modules/@magenta/music/node/music_vae'));
const tf=require(path.join(toolsRoot,'node_modules/@tensorflow/tfjs'));
const root=toolsRoot,checkpoint=path.join(root,'checkpoint-mel_2bar_small'),out=path.join(root,'generated');
const official='https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
async function main(){
 await fs.mkdir(checkpoint,{recursive:true});await fs.mkdir(out,{recursive:true});
 const downloads=[];
 async function cache(name){const target=path.join(checkpoint,name);let data;try{data=await fs.readFile(target)}catch{const r=await fetch(official+'/'+name);if(!r.ok)throw Error('Checkpoint download '+r.status+' '+name);data=Buffer.from(await r.arrayBuffer());await fs.writeFile(target,data)}downloads.push({name,bytes:data.length,sha256:sha(data),source:official+'/'+name});return data}
 const config=JSON.parse(await cache('config.json')),manifest=JSON.parse(await cache('weights_manifest.json'));
 for(const name of [...new Set(manifest.flatMap(x=>x.paths))])await cache(name);
 const server=http.createServer(async(req,res)=>{try{const name=path.basename(new URL(req.url,'http://localhost').pathname);const data=await fs.readFile(path.join(checkpoint,name));res.end(data)}catch{res.statusCode=404;res.end()}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=server.address().port;
 const model=new MusicVAE('http://127.0.0.1:'+port);
 try{
  await tf.setBackend('cpu');await tf.ready();console.log('Initializing cached official model');await model.initialize();console.log('Initialized zDims='+model.zDims);
  const themes=[{id:'lobby',qpm:104,seed:20261023},{id:'race',qpm:132,seed:20261123},{id:'final',qpm:156,seed:20261223},{id:'results',qpm:144,seed:20261323}];
  const motifs=[];
  for(const theme of themes){
   for(let candidate=0;candidate<3;candidate++){
    const seed=theme.seed+candidate,z=tf.randomNormal([1,model.zDims],0,1,'float32',seed);
    const latent=Array.from(await z.data()),seq=(await model.decode(z,0,undefined,4,theme.qpm))[0];z.dispose();
    const item={id:theme.id+'-'+(candidate+1),theme:theme.id,qpm:theme.qpm,seed,temperature:0,latent,sequence:seq};motifs.push(item);
    await fs.writeFile(path.join(out,item.id+'.json'),JSON.stringify(item,null,2)+'\n');
    console.log(item.id+' notes='+seq.notes.length+' distinct='+new Set(seq.notes.map(n=>n.pitch)).size);
   }
  }
  // Repeat one explicitly seeded decode to verify real reproducibility on this backend.
  const z=tf.randomNormal([1,model.zDims],0,1,'float32',themes[0].seed),again=(await model.decode(z,0,undefined,4,themes[0].qpm))[0];z.dispose();
  const repeat=JSON.stringify(again)===JSON.stringify(motifs[0].sequence);
  if(!repeat)throw Error('Seeded CPU repeated output differs');
  await fs.writeFile(path.join(out,'musicvae-motifs.json'),JSON.stringify({model:'MusicVAE',checkpoint:'mel_2bar_small',motifs},null,2)+'\n');
  const provenance={generatedAt:new Date().toISOString(),generator:'Google Magenta MusicVAE',package:'@magenta/music',packageVersion:require(path.join(toolsRoot,'node_modules/@magenta/music/package.json')).version,tensorflowVersion:tf.version.tfjs,backend:'cpu',nodeVersion:process.version,modelSource:official,checkpointFiles:downloads,config,method:'Seeded tf.randomNormal latent vectors decoded with temperature=0 (argmax); no copyrighted prompt/song input or reference audio; exact latent vectors and raw outputs retained',seedBase:20261023,repeatedDecodeIdentical:repeat,outputSha256:sha(await fs.readFile(path.join(out,'musicvae-motifs.json'))),license:{code:'Apache-2.0',codeSource:'https://github.com/magenta/magenta-js/blob/master/LICENSE',checkpointPublication:'https://github.com/magenta/magenta-js/blob/master/music/checkpoints/README.md',note:'Official checkpoint docs explicitly allow use in apps and local/self-hosted downloads. No separate output-rights warranty or explicit older-checkpoint model-card license was found; code license is not a guarantee of generated output copyright or exclusivity. Do not redistribute third-party soundfonts. Final synthesis should use original oscillators/noise.'}};
  await fs.writeFile(path.join(out,'provenance.json'),JSON.stringify(provenance,null,2)+'\n');
  console.log(JSON.stringify({ok:true,motifs:motifs.length,repeatedDecodeIdentical:repeat,out}));
 }finally{model.dispose();await new Promise(r=>server.close(r))}
}
main().catch(e=>{console.error(e);process.exitCode=1});
