import type {Room} from './game';
import {randomHex,sha,verifyRace} from './game';
import {tapePayload} from './physics';
import {GameError,type Store} from './rooms';
import {publicStake,stakeDistribution,type BankState,type StakeState} from './sol-stakes';
import {validateSignedDeposit,type EscrowService} from './sol-escrow';

export type StakeContext={service:EscrowService;verifiedWallet:(token:string)=>Promise<string>};
export const activeBank=(s:StakeState|undefined)=>!!s&&(!!s.bank||!!s.pending)&&!['settled','refunded'].includes(s.status);
async function update(store:Store,code:string,round:number,change:(r:Room)=>void){
 for(let i=0;i<10;i++){const r=await store.get(code);if(!r||r.round!==round)throw new GameError('The round changed. Refresh the room.',409);const previous=r.revision;change(r);r.revision++;if(await store.save(r,previous))return r;}
 throw new GameError('The room is busy. Please try again.',409);
}
function checkBank(r:Room,b:BankState){const s=r.stake!;if(b.commitment!==r.randomness?.commitment||b.capacity!==r.capacity||b.amountLamports!==s.amountLamports||b.feeBps!==s.feeBps||b.operator!==s.operator||b.treasury!==s.treasury||JSON.stringify(b.wallets)!==JSON.stringify(s.wallets))throw Error('SOL bank does not match the frozen race.');}
const terminal=(s:StakeState)=>['settled','refunded'].includes(s.status);
function attachStake(r:Room){if(r.race)r.race.stake=publicStake(r.stake!);}

// Every signed operator transaction is saved by room CAS before it is sent.
// A timeout can only resend those exact bytes until failure/expiry is proven.
export async function progressStakes(store:Store,code:string,token:string,service:EscrowService,now=Date.now(),cancel=false):Promise<Room>{
 let locked:Room|undefined;const leaseId=randomHex(8);
 for(let i=0;i<10;i++){
  const r=await store.get(code);if(!r||r.expires<now)throw new GameError('Room expired or does not exist.',404);
  if(!r.players.some(p=>p.token===token))throw new GameError('Join this room first.',403);
  if(!r.stake)throw new GameError('This is a free room.');if(terminal(r.stake))return r;
  if((r.stake.leaseUntil||0)>now){if(cancel)throw new GameError('Payments are updating. Try the refund again in a few seconds.',409);return r;}
  const previous=r.revision;r.stake.leaseUntil=now+60000;r.stake.leaseId=leaseId;r.revision++;if(await store.save(r,previous)){locked=r;break;}
 }
 if(!locked)throw new GameError('The room is busy. Please try again.',409);
 const round=locked.round,mutate=(fn:(r:Room)=>void)=>update(store,code,round,r=>{if(r.stake?.leaseId!==leaseId)throw new GameError('Payment update continued in another request. Refresh the room.',409);fn(r);});
 try{
  let r=locked,s=r.stake!;
  if(s.pending){
   const pending=s.pending,state=await service.state(pending.signature,pending.lastValidBlockHeight);
   if(state==='pending'){await service.broadcast(pending.transaction);return r;}
   if(state==='confirmed'){
    if(pending.action==='init'){
     const b=await service.bank(s.bank!);if(!b)throw Error('Confirmed SOL bank is not yet visible. Try again.');checkBank(r,b);
     r=await mutate(r=>{r.stake!.initSignature=pending.signature;r.stake!.pending=undefined;r.stake!.status=b.status;r.stake!.fundingDeadline=b.fundingDeadline;r.stake!.settlementDeadline=b.settlementDeadline;});
    }else{
     if(await service.bank(s.bank!))throw Error('Confirmed payout is not yet visible. Try again.');
     r=await mutate(r=>{const s=r.stake!;s.status=pending.action==='settle'?'settled':'refunded';if(pending.action==='settle')s.settlementSignature=pending.signature;else s.refundSignature=pending.signature;s.pending=undefined;s.error=undefined;attachStake(r);});
     return r;
    }
   }else{
    // A failed/expired init may have lost a counter race to a different room.
    // It is safe to choose a new nonce only after the old wire cannot land.
    const observed=pending.action==='init'&&s.bank?await service.bank(s.bank):null;
    let recovered:string|null=null;if(observed&&observed.commitment===r.randomness?.commitment){checkBank(r,observed);recovered=await service.initialization(s.bank!);if(!recovered)throw Error('The SOL bank exists. Waiting to recover its confirmed initialization; do not deposit again.');}
    r=await mutate(r=>{const s=r.stake!;s.pending=undefined;if(pending.action==='init'){if(recovered&&observed){s.initSignature=recovered;s.status=observed.status;s.paidMask=observed.paidMask;s.fundingDeadline=observed.fundingDeadline;s.settlementDeadline=observed.settlementDeadline;}else{s.bank=undefined;s.nonce=undefined;s.status='drawing';}}else s.status=s.paidMask===(1<<r.capacity)-1?'funded':'funding';s.error=recovered?undefined:'Devnet transaction '+state+'. Retry the saved round.';});
   }
   s=r.stake!;
  }
  if(!s.bank){
   if(cancel){await mutate(r=>{r.stake!.status='refunded';r.stake!.error=undefined;});return (await store.get(code))!;}
   if(!r.randomness?.commitment||!r.players.every(p=>p.ready)||r.players.length!==r.capacity)return r;
   if(!r.players.every(p=>p.stakeWallet&&p.stakeAccepted===s.termsHash)||new Set(r.players.map(p=>p.stakeWallet)).size!==r.capacity)throw Error('Every player must accept these stakes with a different verified Solana wallet.');
   const frozen={...s,wallets:r.players.map(p=>p.stakeWallet!)};
   const prepared=await service.prepareInit(frozen,r.randomness.commitment);
   r=await mutate(r=>{const s=r.stake!;if(s.bank||s.pending||r.randomness?.commitment!==locked!.randomness?.commitment)throw new GameError('The bank was initialized by another request. Refresh the room.',409);s.wallets=frozen.wallets;s.bank=prepared.bank;s.nonce=prepared.nonce;s.status='funding';s.error=undefined;s.pending={transaction:prepared.transaction,signature:prepared.signature,lastValidBlockHeight:prepared.lastValidBlockHeight,action:'init'};});
   await service.broadcast(prepared.transaction);return r;
  }
  let b=await service.bank(s.bank);
  if(!b){
   const closed=await service.closure(s.bank);if(!closed)throw Error('SOL bank is unavailable. Reconnect to recover it; do not send another deposit.');
   return await mutate(r=>{const s=r.stake!;s.status=closed.kind;if(closed.kind==='refunded')s.refundSignature=closed.signature;else s.settlementSignature=closed.signature;s.error=undefined;s.pending=undefined;attachStake(r);});
  }
  checkBank(r,b);
  // Recover wallet deposits even when the browser lost the submission response.
  for(const [wallet,plan] of Object.entries(s.depositPlans||{})){
   if(!plan.signature||!plan.signed)continue;
   const state=await service.state(plan.signature,plan.lastValidBlockHeight);
   if(state==='pending')await service.broadcast(plan.signed);
   if(state==='confirmed')await mutate(r=>{r.stake!.depositSignatures={...r.stake!.depositSignatures,[wallet]:plan.signature!};delete r.stake!.depositPlans?.[wallet];});
   if(state==='failed'||state==='expired')await mutate(r=>{delete r.stake!.depositPlans?.[wallet];r.stake!.error='Wallet deposit '+state+'. Prepare it again.';});
  }
  b=await service.bank(s.bank);if(!b)throw Error('SOL bank closed. Refresh to recover its refund.');checkBank(r,b);
  r=await mutate(r=>{const s=r.stake!;s.paidMask=b!.paidMask;s.fundingDeadline=b!.fundingDeadline;s.settlementDeadline=b!.settlementDeadline;s.status=r.race?'racing':b!.status;attachStake(r);});s=r.stake!;
  if(cancel&&b.status==='funded'&&now<=b.settlementDeadline)throw new GameError('All deposits are locked. Refunds become available after the 10-minute settlement timeout.',409);
  const refund=cancel||b.status==='funding'&&now>b.fundingDeadline||b.status==='funded'&&now>b.settlementDeadline;
  if(refund){
   const wire=await service.prepareRefund(s);r=await mutate(r=>{r.stake!.status='refunding';r.stake!.error=undefined;r.stake!.pending={...wire,action:'refund'};});await service.broadcast(wire.transaction);return r;
  }
  if(r.race&&now>=r.race.startAt+r.race.duration){
   const race=r.race;
   if(!race.vrf||race.vrf.commitment!==r.randomness?.commitment||!race.tape||!await verifyRace(code,race)||await sha(tapePayload(race.tape))!==race.tape.hash)throw Error('The race receipt cannot be verified. Stakes will be refundable after timeout.');
   const winner=race.tape.ranking[0];if(!Number.isInteger(winner)||winner<0||winner>=r.capacity||race.players[winner].stakeWallet!==s.wallets[winner])throw Error('Winner does not match the enrolled wallets.');
   const wire=await service.prepareSettle(s,race.vrf.commitment,winner,race.tape.hash),amounts=stakeDistribution(s.amountLamports,r.capacity,s.feeBps);
   r=await mutate(r=>{const s=r.stake!;s.winnerWallet=s.wallets[winner];s.prizeLamports=amounts.prize;s.feeLamports=amounts.fee;s.status='settling';s.error=undefined;s.pending={...wire,action:'settle'};attachStake(r);});
   await service.broadcast(wire.transaction);
  }
  return r;
 }catch(error){await mutate(r=>{r.stake!.error=(error instanceof Error?error.message:'SOL connection failed.').slice(0,500);});if(cancel&&error instanceof GameError)throw error;return (await store.get(code))!;
 }finally{await update(store,code,round,r=>{if(r.stake?.leaseId===leaseId){r.stake.leaseUntil=Date.now()+2500;r.stake.leaseId=undefined;}}).catch(()=>{});}
}

export async function acceptStakes(store:Store,code:string,token:string,wallet:string,termsHash:unknown){
 const initial=await store.get(code);if(!initial)throw new GameError('Room not found.',404);
 return update(store,code,initial.round,r=>{
  const p=r.players.find(p=>p.token===token),s=r.stake;if(!p)throw new GameError('Join this room first.',403);if(!s||termsHash!==s.termsHash)throw new GameError('Stake terms changed. Read and accept the current terms.',409);
  if(s.status!=='drawing'||r.randomness?.commitment||p.ready)throw new GameError('The stakes are already frozen.',409);
  if(r.players.some(other=>other.id!==p.id&&other.stakeWallet===wallet))throw new GameError('Each rider needs a different verified Solana wallet.',409);
  p.stakeWallet=wallet;p.stakeAccepted=s.termsHash;
 });
}
export async function prepareStakeDeposit(store:Store,code:string,token:string,wallet:string,service:EscrowService){
 const r=await store.get(code),p=r?.players.find(p=>p.token===token),s=r?.stake;if(!r||!p||!s)throw new GameError('Join a SOL stakes room first.',403);
 const index=s.wallets.indexOf(wallet);if(index<0||p.stakeWallet!==wallet||p.stakeAccepted!==s.termsHash)throw new GameError('Reconnect the Solana wallet enrolled in this race.',403);
 if(!s.bank||s.pending||s.status!=='funding')throw new GameError('Wait for the SOL bank to be confirmed.',409);
 if(s.depositPlans?.[wallet]?.signature){const old=s.depositPlans[wallet],state=await service.state(old.signature!,old.lastValidBlockHeight);if(!['failed','expired'].includes(state))throw new GameError('Your deposit is already submitted. Refresh to recover it.',409);}
 const plan=await service.prepareDeposit(s,wallet,index);
 const saved=await update(store,code,r.round,r=>{const current=r.stake;if(!current||current.bank!==s.bank||current.status!=='funding'||current.paidMask&(1<<index))throw new GameError('Deposit state changed. Refresh the room.',409);const previous=current.depositPlans?.[wallet];if(previous?.signature&&previous.signature!==s.depositPlans?.[wallet]?.signature)throw new GameError('A deposit is already in progress.',409);current.depositPlans={...current.depositPlans,[wallet]:plan};current.error=undefined;});
 return {room:saved,transaction:plan.transaction};
}
export async function submitStakeDeposit(store:Store,code:string,token:string,wallet:string,wire:unknown,service:EscrowService){
 const r=await store.get(code),p=r?.players.find(p=>p.token===token),s=r?.stake,plan=s?.depositPlans?.[wallet];
 if(!r||!p||!s||p.stakeWallet!==wallet||!plan||!s.bank||s.status!=='funding')throw new GameError('Prepare your deposit again.',409);
 const signature=await validateSignedDeposit(plan,wallet,wire);
 const saved=await update(store,code,r.round,r=>{const current=r.stake?.depositPlans?.[wallet];if(!current||current.message!==plan.message||r.stake!.bank!==s.bank||r.stake!.status!=='funding')throw new GameError('Deposit expired. Prepare it again.',409);if(current.signature&&current.signature!==signature)throw new GameError('A different deposit is already submitted.',409);current.signed=wire as string;current.signature=signature;r.stake!.error=undefined;});
 await service.broadcast(wire as string);return saved;
}
