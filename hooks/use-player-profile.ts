'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {getWallets} from '@wallet-standard/app';
import {isProfileWallet,linkSolanaWallet,signDevnetDeposit,walletError,type ProfileWallet,type ProfileRequest} from '../lib/solana-wallet';
import type {PlayerProfile} from '../lib/achievements';
import type {PublicRoom} from '../lib/game';

export function usePlayerProfile(token:string|undefined){
 const [profile,setProfile]=useState<PlayerProfile|null>(null),[loading,setLoading]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(''),[wallets,setWallets]=useState<ProfileWallet[]>([]),[selected,setSelected]=useState<ProfileWallet|null>(null);
 const registrations=useRef(new Set<string>()),mounted=useRef(true),generation=useRef(0),disconnecting=useRef(false);
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false}},[]);
 const request:ProfileRequest=useCallback(async<T,>(path:string,body?:unknown):Promise<T>=>{
  if(!token)throw Error('profile_session_required');
  const response=await fetch(path,{method:body===undefined?'GET':'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),cache:'no-store',signal:AbortSignal.timeout(15000)});
  const data=await response.json() as any;if(!response.ok)throw Error(data.error||'profile_service_unavailable');return data;
 },[token]);
 const refresh=useCallback(async()=>{
  if(!token)return;const started=generation.current;setLoading(true);
  try{const data=await request<{profile:PlayerProfile}>('/api/profile');if(mounted.current&&started===generation.current){setProfile(data.profile);setError('');}return data.profile;}
  catch(e){if(mounted.current)setError(walletError(e));}
  finally{if(mounted.current)setLoading(false);}
 },[token,request]);
 useEffect(()=>{void refresh();const visible=()=>{if(!document.hidden)void refresh()};document.addEventListener('visibilitychange',visible);return()=>document.removeEventListener('visibilitychange',visible)},[refresh]);
 useEffect(()=>{const registry=getWallets(),update=()=>setWallets(registry.get().filter(isProfileWallet));update();const off=registry.on('register',update),off2=registry.on('unregister',update);return()=>{off();off2()}},[]);
 const connect=useCallback(async(wallet:ProfileWallet)=>{
  setBusy(true);setError('');try{const data=await linkSolanaWallet(wallet,request);generation.current++;if(mounted.current){setProfile(data);setSelected(wallet);}return data;}
  catch(e){if(mounted.current)setError(walletError(e));}
  finally{if(mounted.current)setBusy(false);}
 },[request]);
 const disconnect=useCallback(async()=>{
  if(disconnecting.current)return;disconnecting.current=true;
  setBusy(true);setError('');try{
   const data=await request<{profile:PlayerProfile}>('/api/profile/wallet/disconnect',{});
   generation.current++;
   if(mounted.current){setProfile(data.profile);setSelected(null);}
   await selected?.features['standard:disconnect']?.disconnect().catch(()=>{});
  }catch(e){if(mounted.current)setError(walletError(e));}finally{disconnecting.current=false;if(mounted.current)setBusy(false);}
 },[request,selected]);
 useEffect(()=>{
  if(!selected||!profile?.walletAddress)return;
  if(!selected.accounts.some(account=>account.address===profile.walletAddress)){void disconnect();return;}
  return selected.features['standard:events'].on('change',change=>{
   if(change.accounts&&!change.accounts.some(account=>account.address===profile.walletAddress))void disconnect();
  });
 },[selected,profile?.walletAddress,disconnect]);
 const rename=useCallback(async(name:string)=>{
  const started=generation.current;
  try{const result=await request<{profile:PlayerProfile}>('/api/profile/name',{name});if(started===generation.current){setProfile(result.profile);setError('');}return result.profile;}
  catch(e){setError(walletError(e));throw e;}
 },[request]);
 const registerRace=useCallback(async(room:PublicRoom)=>{
  const race=room.race;if(!race||!token||!race.vrf)return false;
  const key=room.code+':'+race.seed,started=generation.current;
  if(registrations.current.has(key))return true;registrations.current.add(key);
  try{const result=await request<{profile:PlayerProfile}>('/api/profile/race',{code:room.code,seed:race.seed});if(mounted.current&&started===generation.current){setProfile(result.profile);setError('');}return true;}
  catch(e){registrations.current.delete(key);if(mounted.current)setError(walletError(e));return false;}
 },[request,token]);
 const signDeposit=useCallback(async(transaction:string,wallet:string)=>{
  if(profile?.walletAddress!==wallet)throw Error('Reconnect the Solana wallet enrolled in this race.');
  setBusy(true);setError('');try{return await signDevnetDeposit(selected,wallet,transaction);}catch(e){setError(walletError(e));throw e;}finally{setBusy(false);}
 },[selected,profile?.walletAddress]);
 return {profile,loading,busy,error,wallets,selected,refresh,connect,disconnect,rename,registerRace,signDeposit,clearError:()=>setError('')};
}
export type PlayerProfileControl=ReturnType<typeof usePlayerProfile>;
