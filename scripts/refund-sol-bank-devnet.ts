/** Permissionless fixed-recipient refund, independent of the game server. */
import {readFile} from 'node:fs/promises';
import {createKeyPairSignerFromBytes,createKeyPairSignerFromPrivateKeyBytes} from '@solana/kit';
import {assertDevnet,rpcCall,signedWire} from '../lib/solana-vrf';
import {SolEscrow} from '../lib/sol-escrow';
import {refundInstruction} from '../lib/sol-stakes';
import {explorer} from '../lib/vrf';
const option=(name:string)=>{const i=process.argv.indexOf(name);return i<0?undefined:process.argv[i+1];};
const bank=option('--bank'),keyFile=option('--payer-file'),programId='9aT2ra9HdSrVLv7gBmCaZbW3DGu22XDCfXS3CEQAeCux';
if(!bank||!keyFile)throw Error('Usage: tsx scripts/refund-sol-bank-devnet.ts --bank ADDRESS --payer-file LOCAL_DEVNET_KEYPAIR.json [--send]');
const rpc=option('--rpc')||'https://rpc.magicblock.app/devnet';await assertDevnet(rpc);
const service=new SolEscrow({ESCROW_PROGRAM_ID:programId,SOLANA_RPC_URL:rpc}),state=await service.bank(bank);
if(!state)throw Error('This bank is already closed or does not exist.');
const raw=JSON.parse(await readFile(keyFile,'utf8'));
if(!Array.isArray(raw)||![32,64].includes(raw.length)||raw.some(n=>!Number.isInteger(n)||n<0||n>255))throw Error('Use a local disposable Devnet JSON keypair array, 32 or 64 bytes.');
const bytes=new Uint8Array(raw),payer=bytes.length===64?await createKeyPairSignerFromBytes(bytes):await createKeyPairSignerFromPrivateKeyBytes(bytes);
console.log(JSON.stringify({cluster:'devnet',bank,operator:state.operator,refundRecipients:state.wallets,paidMask:state.paidMask,stakeLamports:state.amountLamports,settlementDeadline:state.settlementDeadline?new Date(state.settlementDeadline).toISOString():null}));
const wire=await signedWire(rpc,payer,[refundInstruction(programId,bank,state,payer.address)]);
if(!process.argv.includes('--send')){console.log('Devnet simulation passed. Add --send to submit this fixed-recipient refund.');process.exit(0);}
await service.broadcast(wire.transaction);
for(let n=0;n<60;n++){const status=await service.state(wire.signature,wire.lastValidBlockHeight);if(status==='confirmed'){console.log('Refund confirmed: '+explorer(wire.signature,'tx'));process.exit(0);}if(status==='failed'||status==='expired')throw Error('Refund '+status+'; inspect '+explorer(wire.signature,'tx'));await new Promise(r=>setTimeout(r,1000));}
throw Error('Refund confirmation pending: '+explorer(wire.signature,'tx'));
