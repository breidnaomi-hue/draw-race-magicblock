import {address,appendTransactionMessageInstructions,compileTransaction,createKeyPairSignerFromPrivateKeyBytes,createTransactionMessage,getAddressEncoder,getBase58Decoder,getBase64EncodedWireTransaction,getTransactionDecoder,pipe,setTransactionMessageFeePayer,setTransactionMessageLifetimeUsingBlockhash} from '@solana/kit';
import {assertDevnet,rpcCall,signedWire,type VrfEnv} from './solana-vrf';
import {fromBase64,fromHex,DRAW_RACE_VRF_PROGRAM} from './vrf';
import {bankAddresses,decodeBank,depositInstruction,initializeBankInstruction,receiptAddress,refundInstruction,settleInstruction,type BankState,type StakeState,type StakeTransaction} from './sol-stakes';
const base64=(b:Iterable<number>)=>btoa(String.fromCharCode(...b));
export type DepositPlan={transaction:string;message:string;lastValidBlockHeight:number;signature?:string;signed?:string};
export type EscrowEnv=VrfEnv&{ESCROW_PROGRAM_ID?:string};
export interface EscrowService {
 readonly programId:string;readonly configured:boolean;
 operator():Promise<string>;
 prepareInit(stake:StakeState,commitment:string):Promise<StakeTransaction&{bank:string;nonce:string}>;
 bank(key:string):Promise<BankState|null>;
 prepareDeposit(stake:StakeState,wallet:string,index:number):Promise<DepositPlan>;
 prepareSettle(stake:StakeState,commitment:string,winner:number,tapeHash:string):Promise<StakeTransaction>;
 prepareRefund(stake:StakeState):Promise<StakeTransaction>;
 state(signature:string,lastValidBlockHeight:number):Promise<'confirmed'|'failed'|'pending'|'expired'>;
 broadcast(transaction:string):Promise<string>;
 closure(bank:string):Promise<{kind:'settled'|'refunded';signature:string}|null>;
 initialization(bank:string):Promise<string|null>;
}
// A wallet may only sign the exact server-prepared deposit. No added transfer,
// changed fee payer, changed program, or different stake can pass this check.
export async function validateSignedDeposit(plan:DepositPlan,wallet:string,wire:unknown){
 if(typeof wire!=='string'||wire.length>4000)throw Error('Invalid signed deposit.');
 const tx=getTransactionDecoder().decode(fromBase64(wire));
 if(base64(tx.messageBytes)!==plan.message||Object.keys(tx.signatures).length!==1)throw Error('Wallet changed the deposit transaction. Prepare it again.');
 const signature=tx.signatures[address(wallet)];if(!signature||signature.length!==64)throw Error('Deposit must be signed by the enrolled wallet.');
 const key=await crypto.subtle.importKey('raw',new Uint8Array(getAddressEncoder().encode(address(wallet))),'Ed25519',false,['verify']);
 if(!await crypto.subtle.verify('Ed25519',key,new Uint8Array(signature),new Uint8Array(tx.messageBytes)))throw Error('Invalid wallet deposit signature.');
 return getBase58Decoder().decode(signature);
}
export class SolEscrow implements EscrowService {
 readonly programId:string;readonly configured:boolean;readonly rpcUrl:string;
 private payer?:ReturnType<typeof createKeyPairSignerFromPrivateKeyBytes>;
 constructor(private env:EscrowEnv){this.programId=env.ESCROW_PROGRAM_ID||'';this.rpcUrl=env.SOLANA_RPC_URL||'https://rpc.magicblock.app/devnet';this.configured=!!this.programId&&!!env.VRF_SPONSOR_SEED&&env.VRF_PROGRAM_ID===DRAW_RACE_VRF_PROGRAM;}
 private async signer(){if(!this.configured)throw Error('SOL Devnet stakes are not configured.');await assertDevnet(this.rpcUrl);return this.payer??=createKeyPairSignerFromPrivateKeyBytes(fromHex(this.env.VRF_SPONSOR_SEED!));}
 async operator(){return (await this.signer()).address;}
 private async account(key:string){return (await rpcCall(this.rpcUrl,'getAccountInfo',[key,{encoding:'base64',commitment:'confirmed'}])).value;}
 async bank(key:string){await assertDevnet(this.rpcUrl);const info=await this.account(key);if(!info||info.owner==='11111111111111111111111111111111'&&!fromBase64(info.data[0]).length)return null;if(info.owner!==this.programId||info.executable)throw Error('Unexpected SOL escrow owner.');return decodeBank(fromBase64(info.data[0]));}
 async prepareInit(stake:StakeState,commitment:string){
  const payer=await this.signer();if(payer.address!==stake.operator)throw Error('SOL operator changed.');
  const first=await bankAddresses(this.programId,payer.address,'0'),counter=await this.account(first.counter);
  let nonce='0';if(counter){const bytes=fromBase64(counter.data[0]);if(counter.owner!==this.programId||bytes.length!==16||new TextDecoder().decode(bytes.slice(0,8))!=='DRCOUNT1')throw Error('Invalid SOL escrow counter.');nonce=new DataView(bytes.buffer).getBigUint64(8,true).toString();}
  const {bank}=await bankAddresses(this.programId,payer.address,nonce),receipt=await receiptAddress(payer.address,commitment);
  const wire=await signedWire(this.rpcUrl,payer,[initializeBankInstruction(this.programId,stake,nonce,commitment,first.counter,bank,receipt)]);
  return {...wire,bank,nonce};
 }
 async prepareDeposit(stake:StakeState,wallet:string,index:number){
  await assertDevnet(this.rpcUrl);if(!stake.bank)throw Error('Wait for the SOL bank to be created.');
  const bank=await this.bank(stake.bank);if(!bank||bank.status!=='funding'||bank.paidMask&(1<<index)||bank.wallets[index]!==wallet||Date.now()>bank.fundingDeadline)throw Error('Deposit is no longer available. Refresh the room.');
  const latest=await rpcCall(this.rpcUrl,'getLatestBlockhash',[{commitment:'confirmed'}]);
  const message=pipe(createTransactionMessage({version:0}),m=>setTransactionMessageFeePayer(address(wallet),m),m=>setTransactionMessageLifetimeUsingBlockhash(latest.value,m),m=>appendTransactionMessageInstructions([depositInstruction(this.programId,stake.bank!,wallet,index)],m));
  const tx=compileTransaction(message),transaction=getBase64EncodedWireTransaction(tx);
  const simulation=await rpcCall(this.rpcUrl,'simulateTransaction',[transaction,{encoding:'base64',sigVerify:false,commitment:'confirmed'}]);
  if(simulation.value.err)throw Error('Deposit cannot be sent. Check your Devnet SOL balance and refresh the room.');
  return {transaction,message:base64(tx.messageBytes),lastValidBlockHeight:Number(latest.value.lastValidBlockHeight)};
 }
 async prepareSettle(stake:StakeState,commitment:string,winner:number,tapeHash:string){const payer=await this.signer();return signedWire(this.rpcUrl,payer,[settleInstruction(this.programId,stake.bank!,stake,await receiptAddress(stake.operator,commitment),winner,tapeHash)]);}
 async prepareRefund(stake:StakeState){const payer=await this.signer();return signedWire(this.rpcUrl,payer,[refundInstruction(this.programId,stake.bank!,stake,payer.address)]);}
 async state(signature:string,lastValidBlockHeight:number){
  await assertDevnet(this.rpcUrl);const info=(await rpcCall(this.rpcUrl,'getSignatureStatuses',[[signature],{searchTransactionHistory:true}])).value?.[0];
  if(info?.err)return 'failed' as const;if(info&&['confirmed','finalized'].includes(info.confirmationStatus))return 'confirmed' as const;
  return Number(await rpcCall(this.rpcUrl,'getBlockHeight',[{commitment:'confirmed'}]))>lastValidBlockHeight?'expired' as const:'pending' as const;
 }
 async broadcast(transaction:string){await assertDevnet(this.rpcUrl);return rpcCall(this.rpcUrl,'sendTransaction',[transaction,{encoding:'base64',skipPreflight:false,maxRetries:3,preflightCommitment:'confirmed'}]);}
 async closure(bank:string){
  await assertDevnet(this.rpcUrl);const signatures=await rpcCall(this.rpcUrl,'getSignaturesForAddress',[bank,{limit:12,commitment:'confirmed'}]);
  for(const item of signatures){if(item.err)continue;const tx=await rpcCall(this.rpcUrl,'getTransaction',[item.signature,{encoding:'json',commitment:'confirmed',maxSupportedTransactionVersion:0}]);const logs:string[]=tx?.meta?.logMessages||[];if(!tx||tx.meta?.err||!logs.includes('Program '+this.programId+' invoke [1]'))continue;
   if(logs.some(l=>l.startsWith('Program log: DRAW_RACE_SOL_REFUNDED '+bank+' ')))return {kind:'refunded' as const,signature:item.signature};
   if(logs.some(l=>l.startsWith('Program log: DRAW_RACE_SOL_SETTLED '+bank+' ')))return {kind:'settled' as const,signature:item.signature};
  }return null;
 }
 async initialization(bank:string){await assertDevnet(this.rpcUrl);const signatures=await rpcCall(this.rpcUrl,'getSignaturesForAddress',[bank,{limit:20,commitment:'confirmed'}]);for(const item of signatures){if(item.err)continue;const tx=await rpcCall(this.rpcUrl,'getTransaction',[item.signature,{encoding:'json',commitment:'confirmed',maxSupportedTransactionVersion:0}]);const logs:string[]=tx?.meta?.logMessages||[];if(tx&&!tx.meta?.err&&logs.includes('Program '+this.programId+' invoke [1]')&&logs.some(l=>l.startsWith('Program log: DRAW_RACE_SOL_INIT '+bank+' ')))return item.signature;}return null;}
}
