import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {simulate} from '../lib/physics';
import {exampleHorse} from '../lib/drawing';
import {verifyRace,auditSimulation,planFor,VERSION,SUPPORTED_VERSIONS} from '../lib/game';
test('physics keeps global Math intact and has a distinct engine revision',()=>{
 const native={sin:Math.sin,cos:Math.cos,atan2:Math.atan2,pow:Math.pow,hypot:Math.hypot};
 const tape=simulate('1234567890abcdef'.repeat(4),[exampleHorse(0),exampleHorse(1)],[],0,{duration:2000});
 assert.equal(tape.version,'matter-0.20-comeback-3-deterministic');
 for(const [key,value] of Object.entries(native))assert.equal(Math[key as keyof typeof native],value);
});
test('existing VRF receipts keep their original seed and recorded winner',async()=>{
 const data=JSON.parse(await readFile(new URL('../public/vrf-production.json',import.meta.url),'utf8'));
 assert.notEqual(data.race.version,VERSION);assert.ok(SUPPORTED_VERSIONS.includes(data.race.version));
 assert.ok(await verifyRace(data.code,data.race));
 assert.deepEqual(planFor(data.race).ranking,data.race.tape.ranking);
});

test('recorded public Cloudflare VRF race reproduces its full physics tape',async()=>{
 const data=JSON.parse(await readFile(new URL('../public/vrf-reproducible.json',import.meta.url),'utf8'));
 assert.equal(data.race.version,VERSION);
 assert.ok(await verifyRace(data.code,data.race));
 assert.ok(await auditSimulation(data.race),'New-engine Cloudflare tape must independently match');
});
