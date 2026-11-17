export const VRF_PROGRAM = 'Vrf1RNUjXmQGjmQrQLvJHs9SNkvDJEsRVFPkfSQUwGz';
export const DRAW_RACE_VRF_PROGRAM = 'Gz9wroDHou467yg7AFmf3pcoPUq92qkoawpXPaF7m3zP';
export const VRF_QUEUE = 'Cuj97ggrhhidhbu39TijNVqE74xvKJ69gDervRUXAxGh';
export const DEVNET_GENESIS = 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG';
export const VRF_FEE_LAMPORTS = 500000;
export const VRF_SEED_DOMAIN = 'draw-race-magicblock-vrf-v1';
export type VrfProof = {
  provider:'magicblock-vrf'; cluster:'devnet'; programId:string; account:string; payer:string;
  commitment:string; randomness:string; requestSignature:string; fulfillmentSignature:string;
  requestSlot:number; fulfillmentSlot:number; feeLamports:number;
};
export type RandomnessState = {
  status:'drawing'|'locked'|'requesting'|'pending'|'fulfilled'|'error';
  commitment?:string; signature?:string; account?:string; requestedAt?:number;
  error?:string; proof?:VrfProof;
  // Server-only recovery state. publicRoom strips it. A signed transaction is saved BEFORE sending.
  transaction?:string; lastValidBlockHeight?:number; leaseUntil?:number;
};
export const vrfSeedInput=(commitment:string, randomness:string)=>JSON.stringify([VRF_SEED_DOMAIN,commitment,randomness]);
export const explorer=(id:string,kind:'address'|'tx'='address')=>'https://explorer.solana.com/'+kind+'/'+encodeURIComponent(id)+'?cluster=devnet';
export const fromHex=(v:string)=>{
  if(!/^[a-f0-9]{64}$/i.test(v))throw Error('Invalid 32-byte value');
  return Uint8Array.from(v.match(/../g)!,n=>parseInt(n,16));
};
export const toHex=(v:Uint8Array)=>Array.from(v,b=>b.toString(16).padStart(2,'0')).join('');
export const fromBase64=(v:string)=>Uint8Array.from(atob(v),c=>c.charCodeAt(0));
export type ChainReceipt={status:1|2;payer:string;commitment:string;randomness:string;requestSlot:number;fulfillmentSlot:number};
export function decodeReceipt(bytes:Uint8Array,encodeAddress:(bytes:Uint8Array)=>string):ChainReceipt {
  if(bytes.length!==121||new TextDecoder().decode(bytes.slice(0,8))!=='DRVRF001'||![1,2].includes(bytes[8]))throw Error('Invalid DRAW RACE VRF account');
  const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
  const readSlot=(offset:number)=>view.getUint32(offset,true)+view.getUint32(offset+4,true)*4294967296;
  return {status:bytes[8] as 1|2,payer:encodeAddress(bytes.slice(9,41)),commitment:toHex(bytes.slice(41,73)),randomness:toHex(bytes.slice(73,105)),requestSlot:readSlot(105),fulfillmentSlot:readSlot(113)};
}
