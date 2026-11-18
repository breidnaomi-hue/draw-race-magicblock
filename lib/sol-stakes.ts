import {address,getAddressEncoder,getAddressDecoder,getProgramDerivedAddress,type Instruction} from '@solana/kit';
import {sha} from './game';
import {DRAW_RACE_VRF_PROGRAM,fromHex} from './vrf';
export const LAMPORTS_PER_SOL=BigInt(1_000_000_000);
export const FOUR_PLAYER_LAMPORTS=BigInt(14_000_000);
export const DUEL_MIN_LAMPORTS=BigInt(20_000_000);
export const MAX_STAKE_LAMPORTS=BigInt(1_000_000_000);
export const GAME_FEE_BPS=500;
export const SOL_PRICE_REFERENCE={usd:72.825,checkedAt:'2026-11-18T21:59:28.282Z',source:'https://api.coinbase.com/v2/prices/SOL-USD/spot'};
const system=address('11111111111111111111111111111111'),encode=getAddressEncoder(),decode=getAddressDecoder();
export type StakeTransaction={transaction:string;signature:string;lastValidBlockHeight:number};
export type StakeState={
 mode:'sol-devnet';amountLamports:string;feeBps:number;programId:string;operator:string;treasury:string;termsHash:string;
 status:'drawing'|'funding'|'funded'|'racing'|'settling'|'settled'|'refunding'|'refunded';
 wallets:string[];bank?:string;nonce?:string;paidMask:number;fundingDeadline?:number;settlementDeadline?:number;
 initSignature?:string;depositSignatures?:Record<string,string>;settlementSignature?:string;refundSignature?:string;
 winnerWallet?:string;prizeLamports?:string;feeLamports?:string;error?:string;
 // Private room recovery fields. Never return these from publicRoom.
 pending?:StakeTransaction&{action:'init'|'settle'|'refund'};leaseUntil?:number;leaseId?:string;
 depositPlans?:Record<string,{transaction:string;message:string;lastValidBlockHeight:number;signature?:string;signed?:string}>;
};
export type PublicStakeState=Omit<StakeState,'pending'|'leaseUntil'|'leaseId'|'depositPlans'>;
export type BankState={capacity:2|4;status:'funding'|'funded';paidMask:number;amountLamports:string;feeBps:number;nonce:string;operator:string;treasury:string;commitment:string;receipt:string;wallets:string[];fundingDeadline:number;fundedAt:number;settlementDeadline:number;timeout:number};
export function parseSol(value:unknown){
 if(typeof value!=='string'||!/^\d{1,3}(?:\.\d{1,9})?$/.test(value.trim()))throw Error('Enter a SOL amount with up to 9 decimal places.');
 const [whole,fraction='']=value.trim().split('.');return BigInt(whole)*LAMPORTS_PER_SOL+BigInt(fraction.padEnd(9,'0'));
}
export function formatSol(value:string|bigint){const n=BigInt(value),whole=n/LAMPORTS_PER_SOL,fraction=(n%LAMPORTS_PER_SOL).toString().padStart(9,'0').replace(/0+$/,'');return whole.toString()+(fraction?'.'+fraction:'');}
export function validateStake(capacity:2|4,value:unknown){const amount=capacity===4?FOUR_PLAYER_LAMPORTS:parseSol(value);if(capacity===2&&amount<DUEL_MIN_LAMPORTS||amount>MAX_STAKE_LAMPORTS)throw Error('Duel stakes must be between 0.02 and 1 test SOL per player.');return amount;}
export function stakeDistribution(amount:string|bigint,capacity:number,feeBps:number){const pot=BigInt(amount)*BigInt(capacity),fee=pot*BigInt(feeBps)/BigInt(10000);return {pot:pot.toString(),fee:fee.toString(),prize:(pot-fee).toString()};}
export const publicStake=(s:StakeState):PublicStakeState=>{const {pending,leaseUntil,leaseId,depositPlans,...visible}=s;return visible;};
export const stakeTermsHash=(code:string,round:number,capacity:number,s:Pick<StakeState,'amountLamports'|'feeBps'|'programId'|'operator'|'treasury'>)=>sha(JSON.stringify(['draw-race-sol-stake-v1',code,round,capacity,s.amountLamports,s.feeBps,s.programId,s.operator,s.treasury]));
export async function bankAddresses(programId:string,operator:string,nonce:string){const program=address(programId),n=new Uint8Array(8);new DataView(n.buffer).setBigUint64(0,BigInt(nonce),true);const [counter]=await getProgramDerivedAddress({programAddress:program,seeds:[new TextEncoder().encode('counter'),encode.encode(address(operator))]});const [bank]=await getProgramDerivedAddress({programAddress:program,seeds:[new TextEncoder().encode('bank'),encode.encode(address(operator)),n]});return {counter,bank};}
export async function receiptAddress(operator:string,commitment:string){return (await getProgramDerivedAddress({programAddress:address(DRAW_RACE_VRF_PROGRAM),seeds:[new TextEncoder().encode('race'),encode.encode(address(operator)),fromHex(commitment)]}))[0];}
export function decodeBank(bytes:Uint8Array):BankState {
 if(bytes.length!==320||new TextDecoder().decode(bytes.slice(0,8))!=='DRBANK01'||![1,2].includes(bytes[8])||![2,4].includes(bytes[9]))throw Error('Invalid SOL escrow account');
 const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),key=(offset:number)=>decode.decode(bytes.slice(offset,offset+32)),cap=bytes[9] as 2|4;
 return {capacity:cap,status:bytes[8]===1?'funding':'funded',paidMask:bytes[10],amountLamports:v.getBigUint64(12,true).toString(),feeBps:v.getUint16(20,true),nonce:v.getBigUint64(22,true).toString(),operator:key(30),treasury:key(62),commitment:BufferlessHex(bytes.slice(94,126)),receipt:key(126),wallets:Array.from({length:cap},(_,i)=>key(158+i*32)),fundingDeadline:Number(v.getBigInt64(286,true))*1000,fundedAt:Number(v.getBigInt64(294,true))*1000,settlementDeadline:Number(v.getBigInt64(302,true))*1000,timeout:v.getUint32(310,true)};
}
const BufferlessHex=(bytes:Uint8Array)=>Array.from(bytes,n=>n.toString(16).padStart(2,'0')).join('');
export function initializeBankInstruction(programId:string,s:Pick<StakeState,'operator'|'treasury'|'amountLamports'|'feeBps'|'wallets'>,nonce:string,commitment:string,counter:string,bank:string,receipt:string,fundingSeconds=600,settleSeconds=600):Instruction {
 if(![2,4].includes(s.wallets.length))throw Error('A SOL bank requires two or four wallets.');
 const data=new Uint8Array(220),v=new DataView(data.buffer);v.setBigUint64(1,BigInt(nonce),true);data[9]=s.wallets.length;v.setBigUint64(10,BigInt(s.amountLamports),true);v.setUint16(18,s.feeBps,true);data.set(encode.encode(address(s.treasury)),20);data.set(fromHex(commitment),52);s.wallets.forEach((w,i)=>data.set(encode.encode(address(w)),84+i*32));v.setUint32(212,fundingSeconds,true);v.setUint32(216,settleSeconds,true);
 return {programAddress:address(programId),accounts:[{address:address(s.operator),role:3},{address:address(counter),role:1},{address:address(bank),role:1},{address:address(receipt),role:0},{address:system,role:0}],data};
}
export function depositInstruction(programId:string,bank:string,wallet:string,index:number):Instruction{return {programAddress:address(programId),accounts:[{address:address(wallet),role:3},{address:address(bank),role:1},{address:system,role:0}],data:new Uint8Array([1,index])};}
export function settleInstruction(programId:string,bank:string,s:Pick<StakeState,'operator'|'treasury'|'wallets'>,receipt:string,winner:number,tapeHash:string):Instruction{const data=new Uint8Array(34);data[0]=2;data[1]=winner;data.set(fromHex(tapeHash),2);return {programAddress:address(programId),accounts:[{address:address(s.operator),role:3},{address:address(bank),role:1},{address:address(receipt),role:0},{address:address(s.treasury),role:1},{address:address(s.wallets[winner]),role:1}],data};}
export function refundInstruction(programId:string,bank:string,s:Pick<StakeState,'operator'|'wallets'>,caller:string):Instruction{return {programAddress:address(programId),accounts:[{address:address(caller),role:3},{address:address(bank),role:1},{address:address(s.operator),role:1},...s.wallets.map(w=>({address:address(w),role:1 as const}))],data:new Uint8Array([3])};}
