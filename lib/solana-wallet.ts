import type {Wallet} from '@wallet-standard/base';
import type {StandardConnectFeature,StandardDisconnectFeature,StandardEventsFeature} from '@wallet-standard/features';
import type {SolanaSignMessageFeature} from '@solana/wallet-standard-features';
import {getAddressDecoder} from '@solana/kit';
import type {PlayerProfile} from './achievements';
export type ProfileWallet=Wallet&{features:StandardConnectFeature&StandardEventsFeature&SolanaSignMessageFeature&Partial<StandardDisconnectFeature>};
export function isProfileWallet(wallet:Wallet):wallet is ProfileWallet{
 return wallet.chains.some(chain=>chain.startsWith('solana:'))&&['standard:connect','standard:events','solana:signMessage'].every(feature=>feature in wallet.features);
}
export type ProfileRequest=<T>(path:string,body?:unknown)=>Promise<T>;
export async function linkSolanaWallet(wallet:ProfileWallet,request:ProfileRequest){
 const {accounts}=await wallet.features['standard:connect'].connect();
 const account=accounts.find(a=>a.chains.some(chain=>chain.startsWith('solana:'))&&a.features.includes('solana:signMessage'));
 if(!account||account.publicKey.length!==32||getAddressDecoder().decode(account.publicKey)!==account.address)throw Error('wallet_account_unavailable');
 const challenge=await request<{id:string;message:string;expiresAt:number}>('/api/profile/wallet/challenge',{address:account.address});
 const message=new TextEncoder().encode(challenge.message);
 const [signed]=await wallet.features['solana:signMessage'].signMessage({account,message});
 if(!signed||signed.signature.length!==64||signed.signedMessage.length!==message.length||signed.signedMessage.some((value,i)=>value!==message[i]))throw Error('wallet_message_changed');
 const result=await request<{profile:PlayerProfile}>('/api/profile/wallet/verify',{id:challenge.id,signature:btoa(String.fromCharCode(...signed.signature))});
 if(result.profile.walletAddress!==account.address)throw Error('wallet_account_unavailable');
 return result.profile;
}
export function walletError(error:unknown){
 if(error&&typeof error==='object'&&'code' in error&&error.code===4001)return 'wallet_request_rejected';
 const message=error instanceof Error?error.message:String(error);
 return /reject|declin|cancel/i.test(message)?'wallet_request_rejected':message;
}
