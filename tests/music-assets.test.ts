import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
test('all four shipped AI-assisted themes match their playback manifest and size budget',()=>{
 const manifest=JSON.parse(readFileSync('public/music/manifest.json','utf8'));
 assert.deepEqual(manifest.tracks.map((t:any)=>t.id),['lobby','race','final','results']);
 let bytes=0;for(const t of manifest.tracks){const file=readFileSync('public'+t.url);bytes+=file.length;assert.equal(file.length,t.bytes);assert.equal(createHash('sha256').update(file).digest('hex'),t.sha256);assert.equal(t.loop,t.id!=='results');assert.equal(t.loopStart,0);assert.ok(t.loopEnd>0&&t.loopEnd<=t.duration+.001)}
 assert.ok(bytes<1_500_000);
 const raw=JSON.parse(readFileSync('docs/audio/musicvae-motifs.json','utf8'));assert.equal(raw.motifs.length,12);assert.ok(raw.motifs.every((m:any)=>m.latent.length===256&&m.sequence?.notes?.length>0));
});
