import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {createKeyPairSignerFromPrivateKeyBytes} from '@solana/kit';
import {assertDevnet,rpcCall} from '../lib/solana-vrf';
import {DRAW_RACE_VRF_PROGRAM} from '../lib/vrf';
const dir=new URL('../.sites-runtime/',import.meta.url);await mkdir(dir,{recursive:true});
const file=new URL('vrf-devnet-secrets.json',dir);
const keys=await readFile(file,'utf8').then(JSON.parse).catch(()=>({sponsor:randomBytes(32).toString('hex'),program:randomBytes(32).toString('hex'),buffer:randomBytes(32).toString('hex')}));
await writeFile(file,JSON.stringify(keys),{mode:0o600});
const sponsor=await createKeyPairSignerFromPrivateKeyBytes(Uint8Array.from(Buffer.from(keys.sponsor,'hex')));
const program=await createKeyPairSignerFromPrivateKeyBytes(Uint8Array.from(Buffer.from(keys.program,'hex')));
const rpc=process.env.SOLANA_RPC_URL||'https://rpc.magicblock.app/devnet';
const programId=process.env.VRF_PROGRAM_ID||DRAW_RACE_VRF_PROGRAM;
await assertDevnet(rpc);
console.log(JSON.stringify({cluster:'devnet',sponsor:sponsor.address,programId}));
await writeFile(new URL('../.dev.vars',import.meta.url),`SOLANA_RPC_URL=${rpc}\nVRF_PROGRAM_ID=${programId}\nVRF_SPONSOR_SEED=${keys.sponsor}\n`,{mode:0o600});
const before=await rpcCall(rpc,'getBalance',[sponsor.address,{commitment:'confirmed'}]);
console.log('Devnet balance:',before.value);
if(Number(before.value)<800000000){
 const signature=await rpcCall(rpc,'requestAirdrop',[sponsor.address,1000000000]);
 console.log('Free Devnet airdrop:',signature);
}
await mkdir(new URL('../outputs/vrf/',import.meta.url),{recursive:true});
await writeFile(new URL('../outputs/vrf/devnet-addresses.json',import.meta.url),JSON.stringify({cluster:'devnet',rpc,sponsor:sponsor.address,programId},null,2));
