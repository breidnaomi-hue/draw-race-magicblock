import {Drawing,Room,PublicRoom,randomHex,sha,seedInput,VERSION,DURATION,validateDrawing} from './game';
export interface Store {get(code:string):Promise<Room|null>; create(room:Room):Promise<boolean>; save(room:Room,previous:number):Promise<boolean>}
export class GameError extends Error {constructor(message:string,public status=400){super(message);}}
const pubPlayer=({token,...p}:Room['players'][number])=>p;
export const publicRoom=(r:Room,now=Date.now()):PublicRoom=> {const {secret,players,history,...rest}=r; return {...rest,players:players.map(pubPlayer),history:history.slice(-3),serverTime:now};};
const nameOf=(v:any)=>typeof v==='string'?v.trim().slice(0,18)||'Doodler':'Doodler';
const checkedToken=(v:string)=>{if(!/^[a-f0-9]{64}$/.test(v)) throw new GameError('Invalid player session',401);return v;};
export async function createRoom(store:Store,token:string,name:string,capacity:2|4,now=Date.now()) {
  checkedToken(token); if(capacity!==2&&capacity!==4)throw new GameError('Choose two or four players.');
  const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for(let attempt=0;attempt<4;attempt++) {
    const b=crypto.getRandomValues(new Uint8Array(6)),code=Array.from(b,v=>chars[v%chars.length]).join('');
    const secret=randomHex(),id=randomHex(8);
    const room:Room={code,revision:0,capacity,host:id,created:now,expires:now+86400000,deadline:now+600000,round:1,secret,commitment:await sha(secret),players:[{id,token,name:nameOf(name),drawing:[],ready:false,nonce:'',lastSeen:now,rematch:false}],race:null,history:[]};
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
        if(room.race||room.players.length>=room.capacity)throw new GameError('This room is full or already racing.',409);
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
      p.drawing=validateDrawing(data.drawing);p.nonce=data.nonce;p.ready=true;p.name=nameOf(data.name);
      if(room.players.length===room.capacity&&room.players.every(x=>x.ready)) {
        const seed=await sha(seedInput(room.secret,room.code,room.round,room.players));
        room.race={seed,secret:room.secret,startAt:now+4500,duration:DURATION,track:parseInt(seed.slice(2,4),16)%3,round:room.round,players:room.players.map(pubPlayer),commitment:room.commitment,version:VERSION};
      }
    } else if(action==='rematch') {
      if(!room.race||now<room.race.startAt+room.race.duration)throw new GameError('Finish the race first.',409);
      p.rematch=true;
      if(room.players.every(x=>x.rematch))await reset(room,now);
    } else if(action==='reset') {
      if(p.id!==room.host)throw new GameError('Only the host can reset the room.',403);
      if(room.race&&now<room.race.startAt+room.race.duration)throw new GameError('The race must finish first.',409);
      await reset(room,now);
    } else if(action==='kick') {
      if(p.id!==room.host||room.race)throw new GameError('Only the host can free an offline seat before racing.',403);
      const target=room.players.find(x=>x.id===data.id);
      if(!target||target.id===p.id||now-target.lastSeen<45000)throw new GameError('This player is still connected.');
      room.players=room.players.filter(x=>x.id!==target.id);
    } else if(action==='leave') {
      if(!room.race){room.players=room.players.filter(x=>x.id!==p!.id);if(room.host===p.id)room.host=room.players[0]?.id||'';}
    } else if(!['join','heartbeat','ready','rematch','reset','kick','leave'].includes(action))throw new GameError('Unknown action');
    room.revision++;
    if(await store.save(room,previous))return {room:publicRoom(room,now),playerId};
  }throw new GameError('The room is busy. Please try again.',409);
}
async function reset(room:Room,now:number){if(room.race)room.history=[...room.history,room.race].slice(-3);room.race=null;room.secret=randomHex();room.commitment=await sha(room.secret);room.round++;room.deadline=now+600000;room.players.forEach(p=>{p.ready=false;p.nonce='';p.rematch=false;});}
export async function api(request:Request,store:Store,transport='poll') {
  try {
    const url=new URL(request.url),path=url.pathname;
    if(path==='/api/config')return response({transport,stakeEnabled:false,version:VERSION});
    const token=checkedToken(request.headers.get('authorization')?.replace(/^Bearer /,'')||'');
    if(request.method==='POST'&&Number(request.headers.get('content-length')||0)>650000)throw new GameError('Drawing too large.',413);
    if(path==='/api/rooms'&&request.method==='POST') {const data=await body(request);return response(await createRoom(store,token,data.name,data.capacity),201);}
    const match=path.match(/^\/api\/rooms\/([A-Z2-9]{6})(?:\/([a-z]+))?$/);
    if(!match)throw new GameError('Not found',404);
    const [,code,action]=match;
    if(request.method==='GET'&&!action) {
      const room=await store.get(code);if(!room||room.expires<Date.now())throw new GameError('Room expired or does not exist.',404);
      const p=room.players.find(p=>p.token===token);if(!p)throw new GameError('Join this room first.',403);
      return response({room:publicRoom(room),playerId:p.id});
    }
    if(request.method==='POST'&&action)return response(await act(store,code,token,action,await body(request)));
    throw new GameError('Method not allowed',405);
  }catch(e){return response({error:e instanceof Error?e.message:'Unexpected error'},e instanceof GameError?e.status:400);}
}
async function body(req:Request){const text=await req.text();if(text.length>650000)throw new GameError('Drawing too large.',413);try{return JSON.parse(text)}catch{throw new GameError('Invalid request body')}}
export function response(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})}
