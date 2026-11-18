import type {Wallet} from '@wallet-standard/base';
import type {StandardConnectFeature,StandardDisconnectFeature,StandardEventsFeature} from '@wallet-standard/features';
import type {SolanaSignMessageFeature,SolanaSignTransactionFeature} from '@solana/wallet-standard-features';
import {getAddressDecoder} from '@solana/kit';
import type {PlayerProfile} from './achievements';
export type ProfileWallet=Wallet&{features:StandardConnectFeature&StandardEventsFeature&SolanaSignMessageFeature&Partial<StandardDisconnectFeature&SolanaSignTransactionFeature>};
export function isProfileWallet(wallet:Wallet):wallet is ProfileWallet{
 return wallet.chains.some(chain=>chain.startsWith('solana:'))&&['standard:connect','standard:events','solana:signMessage'].every(feature=>feature in wallet.features);
}
export type ProfileRequest=<T>(path:string,body?:unknown)=>Promise<T>;
export async function signDevnetDeposit(wallet:ProfileWallet|null,walletAddress:string,transaction:string){
 if(!wallet)throw Error('Reconnect your enrolled wallet before approving the deposit.');
 const feature=wallet.features['solana:signTransaction'];
 const account=wallet.accounts.find(a=>a.address===walletAddress&&a.chains.includes('solana:devnet')&&a.features.includes('solana:signTransaction'));
 if(!feature?.supportedTransactionVersions.includes(0)||!account)throw Error('Enable Solana Devnet in a wallet that supports signing v0 transactions.');
 const bytes=Uint8Array.from(atob(transaction),c=>c.charCodeAt(0));
 const [signed]=await feature.signTransaction({account,chain:'solana:devnet',transaction:bytes,options:{preflightCommitment:'confirmed'}});
 if(!signed||signed.signedTransaction.length>1600)throw Error('Wallet did not return a valid signed deposit.');
 return btoa(String.fromCharCode(...signed.signedTransaction));
}
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
