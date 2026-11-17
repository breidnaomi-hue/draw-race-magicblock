import {Drawing,Room,PublicRoom,randomHex,sha,seedInput,VERSION,DURATION,validateDrawing,attachTape} from './game';
import {validateRig,specFor} from './rig';
import {demoPlayers} from './demo';
import {vrfSeedInput,VRF_FEE_LAMPORTS} from './vrf';
import type {VrfService} from './solana-vrf';
export interface Store {get(code:string):Promise<Room|null>; create(room:Room):Promise<boolean>; save(room:Room,previous:number):Promise<boolean>}
export class GameError extends Error {constructor(message:string,public status=400){super(message);}}
const pubPlayer=({token,...p}:Room['players'][number])=>p;
export const publicRoom=(r:Room,now=Date.now()):PublicRoom=> {const {secret,players,history,randomness,...rest}=r; const visible=randomness?(({transaction,lastValidBlockHeight,leaseUntil,...state})=>state)(randomness):undefined;return {...rest,randomness:visible,players:players.map(pubPlayer),history:history.slice(-3),serverTime:now};};
const nameOf=(v:any)=>typeof v==='string'?v.trim().slice(0,18)||'Doodler':'Doodler';
const checkedToken=(v:string)=>{if(!/^[a-f0-9]{64}$/.test(v)) throw new GameError('Invalid player session',401);return v;};
export async function createRoom(store:Store,token:string,name:string,capacity:2|4,now=Date.now(),options:{vrf?:boolean;practice?:boolean}={}) {
  checkedToken(token); if(capacity!==2&&capacity!==4)throw new GameError('Choose two or four players.');
  const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for(let attempt=0;attempt<4;attempt++) {
    const b=crypto.getRandomValues(new Uint8Array(6)),code=Array.from(b,v=>chars[v%chars.length]).join('');
    const secret=randomHex(),id=randomHex(8);
    const room:Room={code,revision:0,capacity,host:id,created:now,expires:now+86400000,deadline:now+600000,round:1,secret,commitment:await sha(secret),players:[{id,token,name:nameOf(name),drawing:[],ready:false,nonce:'',lastSeen:now,rematch:false}],race:null,history:[]};
    if(options.vrf)room.randomness={status:'drawing'};
    if(options.practice){room.practice=true;room.capacity=4;room.players.push(...demoPlayers.slice(1).map(p=>({...p,id:randomHex(8),token:randomHex(),nonce:randomHex(),lastSeen:now,rematch:true,bot:true,spec:specFor(p.drawing)})));}
    if(await store.create(room))return {room:publicRoom(room,now),playerId:id};
  } throw new GameError('Could not create a room. Try again.',503);
}
export async function act(store:Store,code:string,token:string,action:string,data:any={},now=Date.now()) {
  checkedToken(token);
  for(let attempt=0;attempt<8;attempt++) {
    const room=await store.get(code); if(!room||room.expires<now)throw new GameError('Room expired or does not exist.',404);
    const previous=room.revision;
    let p=room.players.find(p=>p.token===token);
    if(action==='join') {
      if(!p) {
        if(room.practice||room.race||room.randomness?.commitment||room.players.length>=room.capacity)throw new GameError('This room is full or already racing.',409);
        p={id:randomHex(8),token,name:nameOf(data.name),drawing:[],ready:false,nonce:'',lastSeen:now,rematch:false};room.players.push(p);
      }
    } else if(!p)throw new GameError('Join this room first.',403);
    if(!p)throw new GameError('Player missing.',403);
    const playerId=p.id;
    p.lastSeen=now;
    if(action==='ready') {
      if(room.race)throw new GameError('A race is already in progress.',409);
      if(now>room.deadline)throw new GameError('Drawing time expired. The host can reset the room.',409);
      if(p.ready)throw new GameError('Already ready. Wait for the other riders.',409);
      if(!/^[a-f0-9]{64}$/.test(data.nonce))throw new GameError('Invalid random contribution');
      p.drawing=validateDrawing(data.drawing);p.rig=validateRig(data.rig);p.spec=specFor(p.drawing,p.rig);p.nonce=data.nonce;p.ready=true;p.name=nameOf(data.name);
      if(room.players.length===room.capacity&&room.players.every(x=>x.ready)) {
        const seed=await sha(seedInput(room.secret,room.code,room.round,room.players));
        if(room.randomness){room.randomness={status:'locked',commitment:seed,version:VERSION};}
        else {const began=Date.now();room.race=await attachTape({seed,secret:room.secret,startAt:now+4500,duration:DURATION,track:parseInt(seed.slice(2,4),16)%3,round:room.round,players:room.players.map(pubPlayer),commitment:room.commitment,version:VERSION});room.race.startAt=now+(Date.now()-began)+5000;}
      }
    } else if(action==='rematch') {
      if(!room.race||now<room.race.startAt+room.race.duration)throw new GameError('Finish the race first.',409);
      p.rematch=true;
      if(room.players.every(x=>x.bot||x.rematch))await reset(room,now);
    } else if(action==='reset') {
      if(p.id!==room.host)throw new GameError('Only the host can reset the room.',403);
      if(room.race&&now<room.race.startAt+room.race.duration)throw new GameError('The race must finish first.',409);
      if(room.randomness?.commitment&&!room.race&&now-(room.randomness.requestedAt||now)<180000)throw new GameError('VRF is still pending. Check again; the host can cancel the round after three minutes.',409);
      await reset(room,now);
    } else if(action==='kick') {
      if(p.id!==room.host||room.race||room.randomness?.commitment)throw new GameError('Only the host can free an offline seat before racing.',403);
      const target=room.players.find(x=>x.id===data.id);
      if(!target||target.id===p.id||now-target.lastSeen<45000)throw new GameError('This player is still connected.');
      room.players=room.players.filter(x=>x.id!==target.id);
    } else if(action==='leave') {
      if(!room.race&&!room.randomness?.commitment){room.players=room.players.filter(x=>x.id!==p!.id);if(room.host===p.id)room.host=room.players[0]?.id||'';}
    } else if(!['join','heartbeat','ready','rematch','reset','kick','leave'].includes(action))throw new GameError('Unknown action');
    room.revision++;
    if(await store.save(room,previous))return {room:publicRoom(room,now),playerId};
  }throw new GameError('The room is busy. Please try again.',409);
}
async function reset(room:Room,now:number){if(room.race)room.history=[...room.history,room.race].slice(-3);room.race=null;room.secret=randomHex();room.commitment=await sha(room.secret);room.round++;room.deadline=now+600000;if(room.randomness)room.randomness={status:'drawing'};room.players.forEach(p=>{p.ready=!!p.bot;p.nonce=p.bot?randomHex():'';p.rematch=!!p.bot;});}

export async function progressRandomness(store:Store,code:string,token:string,service:VrfService,now=Date.now()) {
  checkedToken(token);
  let locked:Room|undefined;
  for(let attempt=0;attempt<8;attempt++){
    const room=await store.get(code);
    if(!room||room.expires<now)throw new GameError('Room expired or does not exist.',404);
    if(!room.players.some(p=>p.token===token))throw new GameError('Join this room first.',403);
    if(room.race)return {room:publicRoom(room),playerId:room.players.find(p=>p.token===token)!.id};
    if(!room.randomness?.commitment||!room.players.every(p=>p.ready))throw new GameError('Lock every horse before requesting VRF.',409);
    if((room.randomness.leaseUntil||0)>now)return {room:publicRoom(room),playerId:room.players.find(p=>p.token===token)!.id};
    const previous=room.revision;
    room.randomness={...room.randomness,status:room.randomness.transaction?'pending':'requesting',error:undefined,requestedAt:room.randomness.requestedAt||now,leaseUntil:now+60000};
    room.revision++;
    if(await store.save(room,previous)){locked=room;break;}
  }
  if(!locked)throw new GameError('The room is busy. Please try again.',409);
  const commitment=locked.randomness!.commitment!;
  const update=async(change:(room:Room)=>void)=>{
    for(let i=0;i<8;i++){
      const current=await store.get(code);
      // A cancelled round or late oracle response cannot satisfy a newer round.
      if(!current||current.round!==locked!.round||current.randomness?.commitment!==commitment)return null;
      const previous=current.revision;change(current);current.revision++;
      if(await store.save(current,previous))return current;
    }throw new GameError('The room is busy. Reconnect to recover the saved request.',409);
  };
  try {
    let state=locked.randomness!;
    if(!state.transaction){
      const prepared=await service.prepare(commitment);
      const saved=await update(r=>{r.randomness={...r.randomness!,...prepared,status:'pending',requestedAt:state.requestedAt,leaseUntil:Date.now()+60000};});
      if(!saved)throw new GameError('The round changed before submission.',409);
      state=saved.randomness!;
      // Durable signature + exact wire bytes precede broadcast. Timeouts only resend this transaction.
      await service.broadcast(state.transaction!);
    }else{
      const proof=await service.observe(commitment,state.account!,state.signature!);
      if(proof){
        // Requests saved before this release used v6. Keep their locked seed
        // format when recovering; a deployment must never purchase a reroll.
        const version=state.version||'draw-race-v6-comeback-2';
        const frozen=await sha(seedInput(locked.secret,locked.code,locked.round,locked.players,version));
        if(proof.commitment!==frozen||proof.provider!=='magicblock-vrf'||proof.cluster!=='devnet')throw Error('VRF response does not match this race.');
        const seed=await sha(vrfSeedInput(commitment,proof.randomness));
        const race=await attachTape({seed,secret:locked.secret,startAt:0,duration:DURATION,track:parseInt(seed.slice(2,4),16)%3,round:locked.round,players:locked.players.map(pubPlayer),commitment:locked.commitment,version,vrf:proof});
        race.startAt=Date.now()+5000;
        await update(r=>{if(!r.race){r.race=race;r.randomness={...r.randomness!,status:'fulfilled',proof,error:undefined,transaction:undefined,leaseUntil:0};}});
      }else{
        const acceptance=await service.requestState(state.account!,state.signature!,state.lastValidBlockHeight!);
        if(acceptance==='unconfirmed')await service.broadcast(state.transaction);
        else if(acceptance==='expired'||acceptance==='failed'){
          await update(r=>{r.randomness={status:'error',commitment,version:state.version,requestedAt:state.requestedAt,error:acceptance==='expired'?'Transaction expired before acceptance. Retry the same locked race.':'Transaction failed before VRF acceptance. Retry the same locked race.',leaseUntil:0};});
        }
      }
    }
    await update(r=>{r.randomness!.leaseUntil=Date.now()+3000;});
  }catch(error){
    await update(r=>{r.randomness={...r.randomness!,status:r.randomness!.transaction?'pending':'error',error:(error instanceof Error?error.message:'VRF connection failed').slice(0,450),leaseUntil:Date.now()+3000};});
  }
  const room=(await store.get(code))!;
  return {room:publicRoom(room),playerId:room.players.find(p=>p.token===token)!.id};
}
export async function api(request:Request,store:Store,transport='poll',vrf?:VrfService) {
  try {
    const url=new URL(request.url),path=url.pathname;
    if(path==='/api/config')return response({transport,stakeEnabled:false,version:VERSION,vrf:{enabled:!!vrf,configured:!!vrf?.configured,programId:vrf?.programId||null,cluster:'devnet',feeLamports:VRF_FEE_LAMPORTS,sponsored:true}});
    const token=checkedToken(request.headers.get('authorization')?.replace(/^Bearer /,'')||'');
    if(request.method==='POST'&&Number(request.headers.get('content-length')||0)>650000)throw new GameError('Drawing too large.',413);
    if(path==='/api/rooms'&&request.method==='POST') {const data=await body(request);return response(await createRoom(store,token,data.name,data.capacity,Date.now(),{vrf:!!vrf,practice:data.practice===true}),201);}
    const match=path.match(/^\/api\/rooms\/([A-Z2-9]{6})(?:\/([a-z]+))?$/);
    if(!match)throw new GameError('Not found',404);
    const [,code,action]=match;
    if(request.method==='GET'&&!action) {
      const room=await store.get(code);if(!room||room.expires<Date.now())throw new GameError('Room expired or does not exist.',404);
      const p=room.players.find(p=>p.token===token);if(!p)throw new GameError('Join this room first.',403);
      const result=publicRoom(room);if(result.race&&url.searchParams.get('known')===result.race.seed)result.race={...result.race,tape:undefined};result.history=result.history.map(r=>({...r,tape:undefined}));return response({room:result,playerId:p.id});
    }
    if(request.method==='POST'&&action){if(action==='randomness'){if(!vrf)throw new GameError('MagicBlock VRF is not configured.',503);return response(await progressRandomness(store,code,token,vrf));}return response(await act(store,code,token,action,await body(request)));}
    throw new GameError('Method not allowed',405);
  }catch(e){return response({error:e instanceof Error?e.message:'Unexpected error'},e instanceof GameError?e.status:400);}
}
async function body(req:Request){const text=await req.text();if(text.length>650000)throw new GameError('Drawing too large.',413);try{return JSON.parse(text)}catch{throw new GameError('Invalid request body')}}
export function response(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})}
