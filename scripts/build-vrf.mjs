import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir = new URL('../programs/draw-race-vrf/', import.meta.url);
const output = new URL('../outputs/vrf/', import.meta.url);
await mkdir(output, {recursive:true});
const source = await readFile(new URL('src/lib.rs', dir), 'utf8');
const prior = await readFile(new URL('build.json', output), 'utf8').then(JSON.parse).catch(()=>({}));
// Official Solana Playground build service. Sends public program SOURCE only, never keys.
const res = await fetch('https://api.solpg.io/build', {
  method:'POST', headers:{'Content-Type':'application/json'},
  body:JSON.stringify({files:[['/src/lib.rs',source]], uuid:prior.uuid || null}),
});
if(!res.ok) throw Error(`Solana Playground build ${res.status}: ${(await res.text()).slice(0,1500)}`);
const result = await res.json();
const uuid=result.uuid || prior.uuid;
await writeFile(new URL('build.json',output), JSON.stringify({...result,uuid,sourceSha256:createHash('sha256').update(source).digest('hex')},null,2));
console.log(result.stderr);
if(!uuid || /error:/.test(result.stderr)) throw Error('Program compilation failed');
const binary = await fetch('https://api.solpg.io/deploy/'+uuid);
if(!binary.ok) throw Error(`Binary download ${binary.status}`);
const bytes = new Uint8Array(await binary.arrayBuffer());
if(bytes[0]!==127 || bytes[1]!==69 || bytes[2]!==76 || bytes[3]!==70) throw Error('Build did not return ELF');
await writeFile(new URL('draw_race_vrf.so',output),bytes);
console.log(JSON.stringify({uuid,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}));
