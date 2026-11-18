import {getAddressEncoder,address} from '@solana/kit';
import {ACHIEVEMENTS,achievementProgress,racePoints,type PlayerProfile,type ProgressStats,type AchievementAward,type ProfileRace} from './achievements';
import {PROFILE_SCHEMA,type ProfileDatabase} from './profile-store';
import {randomHex,sha} from './game';
import {DRAW_RACE_VRF_PROGRAM} from './vrf';
import {isBoost} from './comeback';
import type {Store} from './rooms';

export class ProfileError extends Error {constructor(readonly code:string,readonly status=400){super(code);}}
const cleanName=(value:unknown)=>typeof value==='string'?value.trim().slice(0,18)||'Doodler':'Doodler';
type Identity={id:string;guest:string;tokenHash:string;wallet:string|null};
type Challenge={id:string;token_hash:string;wallet:string;origin:string;message:string;expires_at:number;used:number};
export class PlayerProfiles {
 private initialized:Promise<void>|undefined;
 constructor(readonly db:ProfileDatabase,private now=()=>Date.now()){}
 private ready(){return this.initialized??=this.db.batch(PROFILE_SCHEMA.map(sql=>({sql}))).catch(error=>{this.initialized=undefined;throw error;});}
 private async identity(token:string):Promise<Identity>{
  if(!/^[a-f0-9]{64}$/i.test(token))throw new ProfileError('profile_session_required',401);
  await this.ready();const tokenHash=await sha(token),guest='guest:'+tokenHash;
  const [session]=await this.db.all<{wallet:string}>('SELECT wallet FROM drp_sessions WHERE token_hash=? AND expires_at>?',[tokenHash,this.now()]);
  return {id:session?'wallet:'+session.wallet:guest,guest,tokenHash,wallet:session?.wallet||null};
 }
 private async ensure(id:string,name='Doodler'){await this.db.run('INSERT OR IGNORE INTO drp_profiles(id,name,created_at) VALUES(?,?,?)',[id,name,this.now()]);}
 async verifiedWallet(token:string){const owner=await this.identity(token);if(!owner.wallet)throw new ProfileError('Connect and verify your Solana wallet first.',401);return owner.wallet;}
 async read(token:string):Promise<PlayerProfile>{
  const owner=await this.identity(token);await this.ensure(owner.id);
  const [[person],[raw],awards,pending,recent]=await Promise.all([
   this.db.all<{name:string}>('SELECT name FROM drp_profiles WHERE id=?',[owner.id]),
   this.db.all<ProgressStats>(`SELECT COUNT(*) AS races, COALESCE(SUM(place=1),0) AS wins, COALESCE(SUM(mode!='practice'),0) AS multiplayer, COALESCE(SUM(mode='party'),0) AS parties, COUNT(DISTINCT track) AS courses, COALESCE(SUM(comeback),0) AS comebacks, COALESCE(SUM(points),0) AS racePoints FROM drp_race_rewards WHERE profile_id=? AND completed_at<=?`,[owner.id,this.now()]),
   this.db.all<AchievementAward>('SELECT id,points,unlocked_at AS unlockedAt FROM drp_achievements WHERE profile_id=?',[owner.id]),
   this.db.all<{count:number}>('SELECT COUNT(*) AS count FROM drp_race_rewards WHERE profile_id=? AND completed_at>?',[owner.id,this.now()]),
   this.db.all<ProfileRace>('SELECT id,code,seed,place,points,completed_at AS completedAt,mode FROM drp_race_rewards WHERE profile_id=? AND completed_at<=? ORDER BY completed_at DESC LIMIT 12',[owner.id,this.now()])
  ]);
  const missing=ACHIEVEMENTS.filter(a=>!awards.some(x=>x.id===a.id)&&achievementProgress(a.id,raw,!!owner.wallet)>=a.target);
  if(missing.length)await this.db.batch(missing.map(a=>({sql:'INSERT OR IGNORE INTO drp_achievements(profile_id,id,points,unlocked_at) VALUES(?,?,?,?)',values:[owner.id,a.id,a.points,this.now()]})));
  const all=missing.length?await this.db.all<AchievementAward>('SELECT id,points,unlocked_at AS unlockedAt FROM drp_achievements WHERE profile_id=?',[owner.id]):awards;
  const achievementPoints=all.reduce((sum,a)=>sum+a.points,0);
  return {kind:owner.wallet?'wallet':'guest',walletAddress:owner.wallet,name:person.name,points:raw.racePoints+achievementPoints,racePoints:raw.racePoints,achievementPoints,stats:raw,awards:all,recent,pendingRaces:pending[0].count,newlyUnlocked:missing.map(a=>a.id)};
 }
 async rename(token:string,name:unknown){const owner=await this.identity(token);await this.ensure(owner.id);await this.db.run('UPDATE drp_profiles SET name=? WHERE id=?',[cleanName(name),owner.id]);return this.read(token);}
 async challenge(token:string,wallet:unknown,origin:string){
  const owner=await this.identity(token);if(typeof wallet!=='string')throw new ProfileError('invalid_wallet');
  try{getAddressEncoder().encode(address(wallet));}catch{throw new ProfileError('invalid_wallet');}
  const id=randomHex(),expiresAt=this.now()+300000;
  const message=`DRAW RACE\n\nLink this Solana wallet to your player profile and save your game points.\nThis is a free sign-in message. It does not authorize transactions or transfers.\n\nOrigin: ${origin}\nWallet: ${wallet}\nNonce: ${id}\nIssued at: ${new Date(this.now()).toISOString()}\nExpires at: ${new Date(expiresAt).toISOString()}`;
  await this.db.run('INSERT INTO drp_challenges(token_hash,id,wallet,origin,message,expires_at,used) VALUES(?,?,?,?,?,?,0) ON CONFLICT(token_hash) DO UPDATE SET id=excluded.id,wallet=excluded.wallet,origin=excluded.origin,message=excluded.message,expires_at=excluded.expires_at,used=0',[owner.tokenHash,id,wallet,origin,message,expiresAt]);
  return {id,message,expiresAt};
 }
 async verify(token:string,id:unknown,signature:unknown,origin:string){
  const owner=await this.identity(token);if(typeof id!=='string'||typeof signature!=='string'||signature.length>100)throw new ProfileError('invalid_wallet_signature');
  const [challenge]=await this.db.all<Challenge>('SELECT * FROM drp_challenges WHERE token_hash=? AND id=?',[owner.tokenHash,id]);
  if(!challenge||challenge.used||challenge.expires_at<=this.now()||challenge.origin!==origin)throw new ProfileError('wallet_challenge_expired');
  let verified=false;
  try{
   const bytes=Uint8Array.from(atob(signature),c=>c.charCodeAt(0));
   const publicKey=await crypto.subtle.importKey('raw',new Uint8Array(getAddressEncoder().encode(address(challenge.wallet))),'Ed25519',false,['verify']);
   verified=bytes.length===64&&await crypto.subtle.verify('Ed25519',publicKey,bytes,new TextEncoder().encode(challenge.message));
  }catch{}
  if(!verified)throw new ProfileError('invalid_wallet_signature');
  const consumed=await this.db.run('UPDATE drp_challenges SET used=1 WHERE token_hash=? AND id=? AND used=0 AND expires_at>?',[owner.tokenHash,id,this.now()]);
  if(consumed!==1)throw new ProfileError('wallet_challenge_expired');
  const walletId='wallet:'+challenge.wallet;await this.ensure(owner.guest);
  const [guest]=await this.db.all<{name:string}>('SELECT name FROM drp_profiles WHERE id=?',[owner.guest]);
  await this.db.batch([
   {sql:'INSERT OR IGNORE INTO drp_profiles(id,name,created_at) VALUES(?,?,?)',values:[walletId,guest.name,this.now()]},
   {sql:'UPDATE drp_race_rewards SET profile_id=? WHERE profile_id=?',values:[walletId,owner.guest]},
   {sql:'INSERT OR IGNORE INTO drp_achievements(profile_id,id,points,unlocked_at) SELECT ?,id,points,unlocked_at FROM drp_achievements WHERE profile_id=?',values:[walletId,owner.guest]},
   {sql:'DELETE FROM drp_achievements WHERE profile_id=?',values:[owner.guest]},
   {sql:'INSERT INTO drp_sessions(token_hash,wallet,expires_at) VALUES(?,?,?) ON CONFLICT(token_hash) DO UPDATE SET wallet=excluded.wallet,expires_at=excluded.expires_at',values:[owner.tokenHash,challenge.wallet,this.now()+7*86400000]}
  ]);
  return this.read(token);
 }
 async disconnect(token:string){const owner=await this.identity(token);await this.db.run('DELETE FROM drp_sessions WHERE token_hash=?',[owner.tokenHash]);return this.read(token);}
 async registerRace(token:string,code:unknown,seed:unknown,rooms:Store){
  const owner=await this.identity(token);
  if(typeof code!=='string'||!/^([A-Z2-9]{6})$/.test(code)||typeof seed!=='string'||!/^[a-f0-9]{64}$/.test(seed))throw new ProfileError('invalid_profile_race');
  const room=await rooms.get(code),entrant=room?.players.find(p=>p.token===token&&!p.bot);
  const race=room&&[room.race,...room.history].find(r=>r?.seed===seed);
  if(!room||!entrant||!race||race.example||!race.tape||race.vrf?.provider!=='magicblock-vrf'||race.vrf.cluster!=='devnet'||race.vrf.programId!==DRAW_RACE_VRF_PROGRAM)throw new ProfileError('race_not_eligible',403);
  const lane=race.players.findIndex(p=>p.id===entrant.id&&!p.bot),place=race.tape.ranking.indexOf(lane)+1;
  if(lane<0||place<1||place>4)throw new ProfileError('race_not_eligible',403);
  const mode=room.practice?'practice':room.capacity===2?'duel':'party',points=racePoints(place,mode!=='practice'),id=race.vrf.account+':'+entrant.id;
  const comeback=place===1&&race.tape.events.some(e=>e.lane===lane&&isBoost(e.type)&&(e.gap||0)>.05);
  await this.ensure(owner.id);
  // Resolve session identity in the INSERT itself: a concurrent wallet link
  // must not leave a newly registered reward behind in the merged guest.
  await this.db.run("INSERT OR IGNORE INTO drp_race_rewards(id,profile_id,receipt,player_id,code,seed,mode,place,points,track,comeback,completed_at,created_at) VALUES(?,COALESCE((SELECT 'wallet:'||wallet FROM drp_sessions WHERE token_hash=? AND expires_at>?),?),?,?,?,?,?,?,?,?,?,?,?)",[id,owner.tokenHash,this.now(),owner.guest,race.vrf.account,entrant.id,code,seed,mode,place,points,race.track,Number(comeback),race.startAt+race.duration,this.now()]);
  return this.read(token);
 }
}

export async function profileApi(request:Request,profiles:PlayerProfiles,rooms:Store){
 try{
  const path=new URL(request.url).pathname,origin=new URL(request.url).origin,token=request.headers.get('authorization')?.replace(/^Bearer /,'')||'';
  if(request.method==='GET'&&path==='/api/profile')return profileResponse({profile:await profiles.read(token)});
  if(request.method!=='POST')return profileResponse({error:'profile_not_found'},404);
  if(Number(request.headers.get('content-length')||0)>8192)throw new ProfileError('profile_request_too_large',413);
  const text=await request.text();if(text.length>8192)throw new ProfileError('profile_request_too_large',413);
  let data:any;try{data=JSON.parse(text);}catch{throw new ProfileError('invalid_profile_request');}
  if(!data||typeof data!=='object'||Array.isArray(data))throw new ProfileError('invalid_profile_request');
  if(path==='/api/profile/name')return profileResponse({profile:await profiles.rename(token,data.name)});
  if(path==='/api/profile/wallet/challenge')return profileResponse(await profiles.challenge(token,data.address,origin));
  if(path==='/api/profile/wallet/verify')return profileResponse({profile:await profiles.verify(token,data.id,data.signature,origin)});
  if(path==='/api/profile/wallet/disconnect')return profileResponse({profile:await profiles.disconnect(token)});
  if(path==='/api/profile/race')return profileResponse({profile:await profiles.registerRace(token,data.code,data.seed,rooms)});
  return profileResponse({error:'profile_not_found'},404);
 }catch(error){if(!(error instanceof ProfileError))console.error('Profile operation failed',error);return profileResponse({error:error instanceof ProfileError?error.code:'profile_service_unavailable'},error instanceof ProfileError?error.status:503);}
}
function profileResponse(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});}
