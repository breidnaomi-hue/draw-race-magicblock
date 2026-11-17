import {readFile} from 'node:fs/promises';
import {verifyRace,auditSimulation} from '../lib/game';
import {verifyVrfProof} from '../lib/verify-vrf';
const input=JSON.parse(await readFile(process.argv[2]||'public/vrf-demo.json','utf8')),race=input.race||input;
if(!race.vrf)throw Error('This local replay has no MagicBlock VRF');
const seedMatches=await verifyRace(input.code,race),chainVerified=await verifyVrfProof(race.vrf),physicsMatches=await auditSimulation(race);
console.log(JSON.stringify({seedMatches,chainVerified,physicsMatches,programId:race.vrf.programId,request:race.vrf.requestSignature,fulfillment:race.vrf.fulfillmentSignature},null,2));
if(!seedMatches||!chainVerified||!physicsMatches)process.exitCode=1;
