import test from 'node:test';
import assert from 'node:assert/strict';
import {getAddressDecoder} from '@solana/kit';
import {isProfileWallet,linkSolanaWallet,signDevnetDeposit,walletError,type ProfileWallet,type ProfileRequest} from '../lib/solana-wallet';
import {PlayerProfiles,profileApi} from '../lib/player-profile';
import {SqliteProfileDatabase} from '../server/profile-database';
const token='d'.repeat(64),origin='https://draw-race.example';
async function setup(){
 const database=new SqliteProfileDatabase(':memory:'),profiles=new PlayerProfiles(database),calls:string[]=[];
 const keys=await crypto.subtle.generateKey('Ed25519',true,['sign','verify']),publicKey=new Uint8Array(await crypto.subtle.exportKey('raw',keys.publicKey));
 const account={address:getAddressDecoder().decode(publicKey),publicKey,chains:['solana:devnet'] as const,features:['solana:signMessage'] as const};
 const wallet:ProfileWallet={version:'1.0.0',name:'Test Wallet',icon:'data:image/png;base64,',chains:['solana:devnet'],accounts:[account],features:{
  'standard:connect':{version:'1.0.0',connect:async()=>{calls.push('connect');return {accounts:[account]};}},
  'standard:events':{version:'1.0.0',on:()=>()=>{}},
  'solana:signMessage':{version:'1.0.0',signMessage:async(...inputs)=>{calls.push('signMessage');return Promise.all(inputs.map(async input=>({signedMessage:input.message,signature:new Uint8Array(await crypto.subtle.sign('Ed25519',keys.privateKey,new Uint8Array(input.message)))})));}}
 }};
 const request:ProfileRequest=async<T,>(path:string,body?:unknown)=>{
  calls.push(path);const response=await profileApi(new Request(origin+path,{method:body?'POST':'GET',headers:{Authorization:'Bearer '+token},body:body?JSON.stringify(body):undefined}),profiles,{get:async()=>null,create:async()=>false,save:async()=>false});
  const data=await response.json() as any;if(!response.ok)throw Error(data.error);return data as T;
 };
 return {database,profiles,wallet,request,calls};
}
test('Wallet Standard performs connect + message verification without requesting a transaction',async()=>{
 const s=await setup();try{
  assert.ok(isProfileWallet(s.wallet));const p=await linkSolanaWallet(s.wallet,s.request);
  assert.equal(p.kind,'wallet');assert.equal(p.walletAddress,s.wallet.accounts[0].address);assert.equal(p.points,25);
  assert.deepEqual(s.calls,['connect','/api/profile/wallet/challenge','signMessage','/api/profile/wallet/verify']);
 }finally{s.database.close();}
});
test('wallet rejection remains retryable and never authenticates a profile',async()=>{
 const s=await setup();try{
  const rejecting={...s.wallet,features:{...s.wallet.features,'standard:connect':{version:'1.0.0' as const,connect:async()=>{throw Object.assign(Error('User rejected the request'),{code:4001});}}}};
  await assert.rejects(linkSolanaWallet(rejecting,s.request),/rejected/);assert.equal((await s.profiles.read(token)).kind,'guest');
  assert.equal(walletError({code:4001}),'wallet_request_rejected');
 }finally{s.database.close();}
});
test('modified sign-message bytes and unsupported wallets are rejected',async()=>{
 const s=await setup();try{
  const changed={...s.wallet,features:{...s.wallet.features,'solana:signMessage':{version:'1.0.0' as const,signMessage:async()=>[{signedMessage:new Uint8Array([1]),signature:new Uint8Array(64)}]}}};
  await assert.rejects(linkSolanaWallet(changed,s.request),/wallet_message_changed/);
  assert.ok(!s.calls.includes('/api/profile/wallet/verify'));assert.equal((await s.profiles.read(token)).points,0);
  assert.equal(isProfileWallet({...s.wallet,chains:['eip155:1']}),false);
 }finally{s.database.close();}
});
test('deposit approval explicitly uses Devnet, requires the enrolled account, and never sends via wallet',async()=>{
 const s=await setup();try{
  const received:any[]=[],account={...s.wallet.accounts[0],features:['solana:signMessage','solana:signTransaction'] as const};
  const wallet:ProfileWallet={...s.wallet,accounts:[account],features:{...s.wallet.features,'solana:signTransaction':{version:'1.0.0',supportedTransactionVersions:[0],signTransaction:async(...inputs)=>{received.push(...inputs);return [{signedTransaction:new Uint8Array([9,8,7])}];}}}};
  assert.equal(await signDevnetDeposit(wallet,account.address,'AQID'),'CQgH');assert.equal(received.length,1);assert.equal(received[0].chain,'solana:devnet');assert.equal(received[0].account,account);assert.deepEqual(Array.from(received[0].transaction),[1,2,3]);
  await assert.rejects(signDevnetDeposit(null,account.address,'AQID'),/Reconnect/);
  await assert.rejects(signDevnetDeposit({...wallet,accounts:[{...account,chains:['solana:mainnet']}]},account.address,'AQID'),/Devnet/);
  await assert.rejects(signDevnetDeposit(wallet,'another account','AQID'),/Devnet/);assert.equal(received.length,1);
 }finally{s.database.close();}
});
test('declining a deposit propagates a retryable wallet error without a second signature request',async()=>{
 const s=await setup();try{
  let calls=0;const account={...s.wallet.accounts[0],features:['solana:signMessage','solana:signTransaction'] as const};
  const wallet:ProfileWallet={...s.wallet,accounts:[account],features:{...s.wallet.features,'solana:signTransaction':{version:'1.0.0',supportedTransactionVersions:[0],signTransaction:async()=>{calls++;throw Object.assign(Error('User rejected'),{code:4001});}}}};
  await assert.rejects(signDevnetDeposit(wallet,account.address,'AQID'),/rejected/);assert.equal(calls,1);
 }finally{s.database.close();}
});
