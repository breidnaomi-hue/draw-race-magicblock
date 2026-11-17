import test from 'node:test';
import assert from 'node:assert/strict';
import {Room,randomHex,sha,seedInput,verifyRace,auditSimulation} from '../lib/game';
import {createRoom,act,progressRandomness,Store,publicRoom} from '../lib/rooms';
import {exampleHorse} from '../lib/drawing';
import {DRAW_RACE_VRF_PROGRAM,vrfSeedInput,type VrfProof} from '../lib/vrf';
import type {VrfService} from '../lib/solana-vrf';
class Memory implements Store{
 map=new Map<string,Room>();
 async get(c:string){return structuredClone(this.map.get(c)||null)}
 async create(r:Room){this.map.set(r.code,structuredClone(r));return true}
 async save(r:Room,v:number){if(this.map.get(r.code)?.revision!==v)return false;this.map.set(r.code,structuredClone(r));return true}
}
class Oracle implements VrfService{
 programId=DRAW_RACE_VRF_PROGRAM;rpcUrl='https://rpc.magicblock.app/devnet';configured=true;
 prepares=0;sends:string[]=[];failSend=false;proof:VrfProof|null=null;state:'accepted'|'unconfirmed'|'expired'|'failed'='accepted';
 async prepare(commitment:string){this.prepares++;await new Promise(r=>setTimeout(r,10));return {signature:'saved-signature',account:'saved-account',transaction:'saved-exact-wire',lastValidBlockHeight:123};}
 async broadcast(wire:string){this.sends.push(wire);if(this.failSend)throw Error('Connection lost after broadcast');return 'saved-signature'}
 async observe(){return this.proof}
 async requestState(){return this.state}
 async height(){return 100}
}
async function locked(practice=true){const db=new Memory(),token=randomHex(),created=await createRoom(db,token,'Artist',4,Date.now(),{vrf:true,practice});if(practice)await act(db,created.room.code,token,'ready',{drawing:exampleHorse(),nonce:randomHex(),name:'Artist'});return {db,token,code:created.room.code,oracle:new Oracle()};}
function proof(commitment:string):VrfProof{return {provider:'magicblock-vrf',cluster:'devnet',programId:DRAW_RACE_VRF_PROGRAM,account:'saved-account',payer:'payer',commitment,randomness:'a7'.repeat(32),requestSignature:'saved-signature',fulfillmentSignature:'oracle-signature',requestSlot:10,fulfillmentSlot:11,feeLamports:500000};}
test('concurrent clients purchase one VRF request; race waits for fulfillment and uses its seed',async()=>{
 const {db,token,code,oracle}=await locked();const before=(await db.get(code))!;
 assert.equal(before.race,null);assert.equal(before.randomness!.status,'locked');
 await Promise.all([progressRandomness(db,code,token,oracle),progressRandomness(db,code,token,oracle)]);
 assert.equal(oracle.prepares,1);assert.equal(oracle.sends.length,1);
 const pending=(await db.get(code))!;assert.equal(pending.race,null);assert.equal(publicRoom(pending).randomness!.transaction,undefined);assert.equal(publicRoom(pending).randomness!.leaseUntil,undefined);
 oracle.proof=proof(pending.randomness!.commitment!);
 await progressRandomness(db,code,token,oracle,Date.now()+10000);
 const race=(await db.get(code))!.race!;assert.ok(race?.vrf);
 assert.equal(race.seed,await sha(vrfSeedInput(oracle.proof.commitment,oracle.proof.randomness)));
 assert.ok(await verifyRace(code,race));assert.ok(await auditSimulation(race));
 const altered=structuredClone(race);altered.vrf!.randomness='b8'.repeat(32);assert.equal(await verifyRace(code,altered),false);
 const changedDrawing=structuredClone(race);changedDrawing.players[0].drawing[0].width++;assert.equal(await verifyRace(code,changedDrawing),false);
});
test('lost broadcast response recovers exact stored transaction without buying another outcome',async()=>{
 const {db,token,code,oracle}=await locked();oracle.failSend=true;
 await progressRandomness(db,code,token,oracle);const pending=(await db.get(code))!.randomness!;
 assert.equal(pending.status,'pending');assert.equal(pending.signature,'saved-signature');assert.match(pending.error!,/Connection lost/);
 oracle.failSend=false;oracle.state='unconfirmed';await progressRandomness(db,code,token,oracle,Date.now()+10000);
 assert.equal(oracle.prepares,1);assert.deepEqual(oracle.sends,['saved-exact-wire','saved-exact-wire']);assert.equal((await db.get(code))!.race,null);
});
test('failed unaccepted transaction can retry; accepted pending requests never reroll on timeout',async()=>{
 const {db,token,code,oracle}=await locked();await progressRandomness(db,code,token,oracle);
 oracle.state='accepted';await progressRandomness(db,code,token,oracle,Date.now()+200000);
 assert.equal(oracle.prepares,1);assert.equal((await db.get(code))!.randomness!.signature,'saved-signature');
 oracle.state='expired';await progressRandomness(db,code,token,oracle,Date.now()+210000);
 assert.equal((await db.get(code))!.randomness!.status,'error');assert.equal((await db.get(code))!.randomness!.transaction,undefined);
 await progressRandomness(db,code,token,oracle,Date.now()+220000);assert.equal(oracle.prepares,2);
});
test('callback for a different commitment cannot start a race; cancel creates a separate round',async()=>{
 const {db,token,code,oracle}=await locked();await progressRandomness(db,code,token,oracle);oracle.proof=proof('00'.repeat(32));
 await progressRandomness(db,code,token,oracle,Date.now()+10000);assert.equal((await db.get(code))!.race,null);
 await assert.rejects(act(db,code,token,'reset',{},Date.now()),/still pending/);
 await act(db,code,token,'reset',{},Date.now()+200000);const room=(await db.get(code))!;assert.equal(room.round,2);assert.equal(room.randomness!.status,'drawing');assert.ok(room.players.slice(1).every(p=>p.bot&&p.ready));
 await assert.rejects(progressRandomness(db,code,randomHex(),oracle),/Join/);
});
test('a pending pre-upgrade request keeps its original version and never buys a reroll',async()=>{
 const {db,token,code,oracle}=await locked(),room=(await db.get(code))!,previous=room.revision;
 const version='draw-race-v6-comeback-2',commitment=await sha(seedInput(room.secret,room.code,room.round,room.players,version));
 room.randomness={status:'locked',commitment};room.revision++;assert.ok(await db.save(room,previous));
 await progressRandomness(db,code,token,oracle);oracle.proof=proof(commitment);
 await progressRandomness(db,code,token,oracle,Date.now()+10000);
 const race=(await db.get(code))!.race!;
 assert.equal(oracle.prepares,1);assert.equal(race.version,version);assert.equal(race.vrf!.commitment,commitment);
 assert.ok(await verifyRace(code,race));assert.ok(await auditSimulation(race));
});
