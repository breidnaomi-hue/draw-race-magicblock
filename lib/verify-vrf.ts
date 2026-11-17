import {address,getAddressEncoder,getAddressDecoder,getProgramDerivedAddress} from '@solana/kit';
import {DEVNET_GENESIS,DRAW_RACE_VRF_PROGRAM,VRF_PROGRAM,decodeReceipt,fromBase64,fromHex,type VrfProof} from './vrf';
/** Independent public-RPC check; does not trust the game's receipt endpoint. */
export async function verifyVrfProof(proof:VrfProof,rpc='https://rpc.magicblock.app/devnet') {
  if(proof.cluster!=='devnet'||proof.provider!=='magicblock-vrf'||proof.programId!==DRAW_RACE_VRF_PROGRAM)throw Error('Unknown VRF program or network');
  const call=async(method:string,params:unknown[]=[])=>{
    const response=await fetch(rpc,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method,params}),signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw Error('Devnet RPC unavailable');
    const data=await response.json() as {error?:unknown;result?:any};if(data.error||!('result' in data))throw Error('Devnet verification is unavailable');return data.result;
  };
  if(await call('getGenesisHash')!==DEVNET_GENESIS)throw Error('RPC is not Solana Devnet');
  const [expected]=await getProgramDerivedAddress({programAddress:address(proof.programId),seeds:[new TextEncoder().encode('race'),getAddressEncoder().encode(address(proof.payer)),fromHex(proof.commitment)]});
  if(expected!==proof.account)throw Error('Receipt address does not match the race');
  const info=await call('getAccountInfo',[proof.account,{encoding:'base64',commitment:'confirmed'}]);
  if(!info.value||info.value.owner!==proof.programId||info.value.executable)throw Error('Receipt is not owned by DRAW RACE');
  const state=decodeReceipt(fromBase64(info.value.data[0]),b=>getAddressDecoder().decode(b));
  if(state.status!==2||state.commitment!==proof.commitment||state.randomness!==proof.randomness||state.payer!==proof.payer||state.requestSlot!==proof.requestSlot||state.fulfillmentSlot!==proof.fulfillmentSlot)throw Error('On-chain randomness differs from this race');
  for(const [signature,marker,slot] of [[proof.requestSignature,'REQUEST',state.requestSlot],[proof.fulfillmentSignature,'FULFILLED',state.fulfillmentSlot]] as const){
    const tx=await call('getTransaction',[signature,{encoding:'json',commitment:'confirmed',maxSupportedTransactionVersion:1}]);
    if(!tx||tx.meta?.err||tx.slot!==slot||!tx.meta?.logMessages?.includes('Program log: DRAW_RACE_VRF_'+marker+' '+proof.account)||!tx.meta.logMessages.some((line:string)=>line.startsWith('Program '+VRF_PROGRAM+' invoke')))throw Error('MagicBlock transaction does not match');
  }
  return true;
}
