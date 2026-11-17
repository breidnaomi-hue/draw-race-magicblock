import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createKeyPairSignerFromPrivateKeyBytes,getAddressEncoder,getProgramDerivedAddress,address,type Instruction} from '@solana/kit';
import {getCreateAccountInstruction} from '@solana-program/system';
import {getInitializeBufferInstruction,getWriteInstruction,getDeployWithMaxDataLenInstruction,LOADER_V3_PROGRAM_ADDRESS} from '@solana-program/loader-v3';
import {assertDevnet,rpcCall,signedWire} from '../lib/solana-vrf';
const root=new URL('../',import.meta.url),rpc=process.env.SOLANA_RPC_URL||'https://rpc.magicblock.app/devnet';
await assertDevnet(rpc);
const keys=JSON.parse(await readFile(new URL('.sites-runtime/vrf-devnet-secrets.json',root),'utf8'));
const signer=async(seed:string)=>createKeyPairSignerFromPrivateKeyBytes(Uint8Array.from(Buffer.from(seed,'hex')));
const payer=await signer(keys.sponsor),program=await signer(keys.program),buffer=await signer(keys.buffer);
await writeFile(new URL('.dev.vars',root),`SOLANA_RPC_URL=${rpc}\nVRF_PROGRAM_ID=${program.address}\nVRF_SPONSOR_SEED=${keys.sponsor}\n`,{mode:0o600});
const binary=new Uint8Array(await readFile(new URL('outputs/vrf/draw_race_vrf.so',root)));
if(binary[0]!==127||binary[1]!==69||binary[2]!==76||binary[3]!==70)throw Error('Not an ELF binary');
const progressFile=new URL('.sites-runtime/vrf-deployment.json',root);
const receipt=await readFile(progressFile,'utf8').then(JSON.parse).catch(()=>({cluster:'devnet',programId:program.address,payer:payer.address,writes:[]}));
const account=async(key:string)=>(await rpcCall(rpc,'getAccountInfo',[key,{encoding:'base64',commitment:'confirmed'}])).value;
async function send(instructions:Instruction[],label:string){
  const wire=await signedWire(rpc,payer,instructions);
  console.log(label+' simulation OK ('+wire.units+' CU)');
  await rpcCall(rpc,'sendTransaction',[wire.transaction,{encoding:'base64',skipPreflight:false,maxRetries:4,preflightCommitment:'confirmed'}]);
  for(let attempt=0;attempt<45;attempt++){
    const r=await rpcCall(rpc,'getSignatureStatuses',[[wire.signature],{searchTransactionHistory:true}]);
    const s=r.value[0];if(s?.err)throw Error(label+': '+JSON.stringify(s.err));
    if(s&&['confirmed','finalized'].includes(s.confirmationStatus)){console.log(label+' confirmed: '+wire.signature);return wire.signature;}
    if(attempt>0&&attempt%5===0)await rpcCall(rpc,'sendTransaction',[wire.transaction,{encoding:'base64',skipPreflight:false,maxRetries:4,preflightCommitment:'confirmed'}]);
    await new Promise(resolve=>setTimeout(resolve,1000));
  }throw Error(label+' pending; rerun to reconcile without replacing accepted writes.');
}
const existing=await account(program.address);
if(!existing?.executable){
  if(!await account(buffer.address)){
    const space=binary.length+37,rent=await rpcCall(rpc,'getMinimumBalanceForRentExemption',[space]);
    receipt.buffer=await send([
      getCreateAccountInstruction({payer,newAccount:buffer,lamports:rent,space,programAddress:LOADER_V3_PROGRAM_ADDRESS}),
      getInitializeBufferInstruction({sourceAccount:buffer.address,bufferAuthority:payer.address}),
    ],'Create deployment buffer');
    await writeFile(progressFile,JSON.stringify(receipt,null,2));
  }
  const stored=await account(buffer.address),bytes=Buffer.from(stored.data[0],'base64').subarray(37);
  for(let offset=0;offset<binary.length;offset+=900){
    const chunk=binary.slice(offset,offset+900);
    if(Buffer.from(chunk).equals(bytes.subarray(offset,offset+chunk.length)))continue;
    const signature=await send([getWriteInstruction({bufferAccount:buffer.address,bufferAuthority:payer,offset,bytes:chunk})],'Write '+offset+'/'+binary.length);
    receipt.writes.push(signature);await writeFile(progressFile,JSON.stringify(receipt,null,2));
  }
  const [programData]=await getProgramDerivedAddress({programAddress:LOADER_V3_PROGRAM_ADDRESS,seeds:[getAddressEncoder().encode(program.address)]});
  const rent=await rpcCall(rpc,'getMinimumBalanceForRentExemption',[36]);
  receipt.deploymentSignature=await send([
    getCreateAccountInstruction({payer,newAccount:program,lamports:rent,space:36,programAddress:LOADER_V3_PROGRAM_ADDRESS}),
    getDeployWithMaxDataLenInstruction({payerAccount:payer,programDataAccount:programData,programAccount:program.address,bufferAccount:buffer.address,authority:payer,maxDataLen:binary.length}),
  ],'Deploy DRAW RACE VRF');
  receipt.programData=programData;
}
const live=await account(program.address);
if(!live?.executable||live.owner!==LOADER_V3_PROGRAM_ADDRESS)throw Error('Program is not executable on Devnet');
const [programData]=await getProgramDerivedAddress({programAddress:LOADER_V3_PROGRAM_ADDRESS,seeds:[getAddressEncoder().encode(program.address)]});
const liveData=await account(programData),deployed=Buffer.from(liveData.data[0],'base64').subarray(45,45+binary.length);
if(!deployed.equals(Buffer.from(binary)))throw Error('Deployed binary differs from compiled source');
receipt.binarySha256=createHash('sha256').update(binary).digest('hex');receipt.binaryBytes=binary.length;receipt.programData=programData;receipt.verifiedAt=new Date().toISOString();
await writeFile(progressFile,JSON.stringify(receipt,null,2));
await mkdir(new URL('docs/vrf/',root),{recursive:true});
await writeFile(new URL('docs/vrf/deployment.json',root),JSON.stringify(receipt,null,2));
console.log(JSON.stringify({programId:program.address,programData,signature:receipt.deploymentSignature,binaryMatches:true,balance:(await rpcCall(rpc,'getBalance',[payer.address])).value}));
