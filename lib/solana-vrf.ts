import {
  address, getAddressEncoder, getAddressDecoder, getProgramDerivedAddress,
  createKeyPairSignerFromPrivateKeyBytes, createTransactionMessage,
  setTransactionMessageFeePayerSigner, setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstructions, signTransactionMessageWithSigners,
  getBase64EncodedWireTransaction, getSignatureFromTransaction, pipe,
  type Instruction, type TransactionSigner,
} from '@solana/kit';
import {DEVNET_GENESIS,VRF_PROGRAM,VRF_QUEUE,VRF_FEE_LAMPORTS,decodeReceipt,fromBase64,fromHex,type VrfProof} from './vrf';

export type VrfEnv={VRF_PROGRAM_ID?:string;VRF_SPONSOR_SEED?:string;SOLANA_RPC_URL?:string};
export type PreparedRequest={signature:string;account:string;transaction:string;lastValidBlockHeight:number};
export interface VrfService {
  readonly programId:string; readonly rpcUrl:string; readonly configured:boolean;
  prepare(commitment:string):Promise<PreparedRequest>;
  broadcast(transaction:string):Promise<string>;
  observe(commitment:string,account:string,requestSignature:string):Promise<VrfProof|null>;
  requestState(account:string,signature:string,lastValidBlockHeight:number):Promise<'accepted'|'unconfirmed'|'failed'|'expired'>;
  height():Promise<number>;
}
export async function rpcCall(url:string,method:string,params:unknown[]=[]) {
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method,params}),signal:AbortSignal.timeout(12000)});
  if(!response.ok)throw Error('Solana Devnet RPC unavailable ('+response.status+'). Try again.');
  const result=await response.json() as {result?:any;error?:{message?:string}};
  if(result.error)throw Error('Solana Devnet: '+(result.error.message||'RPC error'));
  if(!('result' in result))throw Error('Invalid Solana RPC response');
  return result.result;
}
export async function assertDevnet(url:string) {
  if(await rpcCall(url,'getGenesisHash')!==DEVNET_GENESIS)throw Error('DRAW RACE accepts Solana Devnet only.');
}
export async function signedWire(rpcUrl:string,payer:TransactionSigner,instructions:Instruction[]) {
  const latest=await rpcCall(rpcUrl,'getLatestBlockhash',[{commitment:'confirmed'}]);
  // v0 keeps the small request compatible with existing Solana wallets and developer tooling.
  const message=pipe(createTransactionMessage({version:0}),
    m=>setTransactionMessageFeePayerSigner(payer,m),
    m=>setTransactionMessageLifetimeUsingBlockhash(latest.value,m),
    m=>appendTransactionMessageInstructions(instructions,m));
  const signed=await signTransactionMessageWithSigners(message);
  const transaction=getBase64EncodedWireTransaction(signed);
  const simulation=await rpcCall(rpcUrl,'simulateTransaction',[transaction,{encoding:'base64',sigVerify:true,commitment:'confirmed'}]);
  if(simulation.value.err)throw Error('Devnet simulation failed: '+JSON.stringify(simulation.value.err)+' '+(simulation.value.logs||[]).slice(-5).join(' '));
  return {transaction,signature:getSignatureFromTransaction(signed),lastValidBlockHeight:Number(latest.value.lastValidBlockHeight),units:Number(simulation.value.unitsConsumed||0)};
}
export class MagicBlockVrf implements VrfService {
  readonly programId:string;readonly rpcUrl:string;readonly configured:boolean;
  private signer?:Promise<Awaited<ReturnType<typeof createKeyPairSignerFromPrivateKeyBytes>>>;
  private checked?:Promise<void>;
  constructor(private env:VrfEnv){this.programId=env.VRF_PROGRAM_ID||'';this.rpcUrl=env.SOLANA_RPC_URL||'https://api.devnet.solana.com';this.configured=!!env.VRF_PROGRAM_ID&&!!env.VRF_SPONSOR_SEED;}
  private ensureDevnet(){return this.checked??=assertDevnet(this.rpcUrl).catch(e=>{this.checked=undefined;throw e});}
  async prepare(commitment:string){
    if(!this.configured)throw Error('MagicBlock VRF sponsor is not configured.');
    await this.ensureDevnet();
    const payer=await(this.signer??=createKeyPairSignerFromPrivateKeyBytes(fromHex(this.env.VRF_SPONSOR_SEED!)));
    const program=address(this.programId),encoder=getAddressEncoder();
    const [account]=await getProgramDerivedAddress({programAddress:program,seeds:[new TextEncoder().encode('race'),encoder.encode(payer.address),fromHex(commitment)]});
    const [identity]=await getProgramDerivedAddress({programAddress:program,seeds:[new TextEncoder().encode('identity')]});
    const existing=await rpcCall(this.rpcUrl,'getAccountInfo',[account,{encoding:'base64',commitment:'confirmed'}]);
    if(existing.value)throw Error('This race request already exists. Reconnect to recover its result.');
    const data=new Uint8Array(33);data.set(fromHex(commitment),1);
    const ix:Instruction={programAddress:program,accounts:[
      {address:payer.address,role:3},{address:account,role:1},{address:identity,role:0},
      {address:address(VRF_QUEUE),role:1},{address:address(VRF_PROGRAM),role:0},
      {address:address('SysvarS1otHashes111111111111111111111111111'),role:0},
      {address:address('11111111111111111111111111111111'),role:0},
    ],data};
    const wire=await signedWire(this.rpcUrl,payer,[ix]);
    return {...wire,account};
  }
  async broadcast(transaction:string){await this.ensureDevnet();return rpcCall(this.rpcUrl,'sendTransaction',[transaction,{encoding:'base64',skipPreflight:false,maxRetries:3,preflightCommitment:'confirmed'}]);}
  async height(){await this.ensureDevnet();return Number(await rpcCall(this.rpcUrl,'getBlockHeight',[{commitment:'confirmed'}]));}
  async requestState(account:string,signature:string,lastValidBlockHeight:number):Promise<'accepted'|'unconfirmed'|'failed'|'expired'>{
    await this.ensureDevnet();
    const info=await rpcCall(this.rpcUrl,'getAccountInfo',[account,{encoding:'base64',commitment:'confirmed'}]);
    if(info.value){if(info.value.owner!==this.programId)throw Error('Unexpected VRF receipt owner');return 'accepted';}
    const result=await rpcCall(this.rpcUrl,'getSignatureStatuses',[[signature],{searchTransactionHistory:true}]);
    if(result.value?.[0]?.err)return 'failed';
    return await this.height()>lastValidBlockHeight?'expired':'unconfirmed';
  }
  async observe(commitment:string,account:string,requestSignature:string):Promise<VrfProof|null>{
    await this.ensureDevnet();
    const info=await rpcCall(this.rpcUrl,'getAccountInfo',[account,{encoding:'base64',commitment:'confirmed'}]);
    if(!info.value)return null;
    if(info.value.owner!==this.programId||info.value.executable)throw Error('Unexpected VRF receipt owner');
    const state=decodeReceipt(fromBase64(info.value.data[0]),b=>getAddressDecoder().decode(b));
    if(state.commitment!==commitment)throw Error('VRF receipt does not match the locked drawings');
    if(state.status!==2)return null;
    if(state.fulfillmentSlot<=state.requestSlot)throw Error('Invalid VRF fulfillment slot');
    const signatures=await rpcCall(this.rpcUrl,'getSignaturesForAddress',[account,{limit:10,commitment:'confirmed'}]);
    const fulfillment=signatures.find((s:any)=>s.err===null&&Number(s.slot)===state.fulfillmentSlot);
    if(!fulfillment)return null;
    const tx=await rpcCall(this.rpcUrl,'getTransaction',[fulfillment.signature,{encoding:'json',commitment:'confirmed',maxSupportedTransactionVersion:1}]);
    const logs:string[]=tx?.meta?.logMessages||[];
    if(tx?.meta?.err||!logs.includes('Program log: DRAW_RACE_VRF_FULFILLED '+account)||!logs.some(s=>s.startsWith('Program '+VRF_PROGRAM+' invoke')))throw Error('Authenticated VRF callback transaction not found');
    const request=await rpcCall(this.rpcUrl,'getSignatureStatuses',[[requestSignature],{searchTransactionHistory:true}]);
    if(!request.value?.[0]||request.value[0].err||!['confirmed','finalized'].includes(request.value[0].confirmationStatus)||Number(request.value[0].slot)!==state.requestSlot)return null;
    return {provider:'magicblock-vrf',cluster:'devnet',programId:this.programId,account,payer:state.payer,commitment,randomness:state.randomness,requestSignature,fulfillmentSignature:fulfillment.signature,requestSlot:state.requestSlot,fulfillmentSlot:state.fulfillmentSlot,feeLamports:VRF_FEE_LAMPORTS};
  }
}
