// Read-only Devnet RPC. Does not generate keys, request airdrops or send funds.
const rpc=process.env.SOLANA_RPC_URL||'https://api.devnet.solana.com';
if(!/devnet|localhost|127\.0\.0\.1/.test(rpc))throw Error('This estimator is restricted to devnet/localnet.');
let id=0;
async function call(method,params=[]){const response=await fetch(rpc,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:++id,method,params}),signal:AbortSignal.timeout(15000)});const data=await response.json();if(data.error)throw Error(JSON.stringify(data.error));return data.result;}
const sizes={splTokenAccount:165,matchAccountIllustrative:640,mintAccount:82},rent={};
for(const [name,size] of Object.entries(sizes))rent[name]=await call('getMinimumBalanceForRentExemption',[size]);
const vrfProgram='Vrf1RNUjXmQGjmQrQLvJHs9SNkvDJEsRVFPkfSQUwGz',queue='Cuj97ggrhhidhbu39TijNVqE74xvKJ69gDervRUXAxGh';
const program=await call('getAccountInfo',[vrfProgram,{encoding:'base64',dataSlice:{offset:0,length:0}}]);
const q=await call('getAccountInfo',[queue,{encoding:'base64',dataSlice:{offset:0,length:0}}]);
const vrfFee=process.env.VRF_FEE_LAMPORTS?Number(process.env.VRF_FEE_LAMPORTS):null;
const estimate=n=>({players:n,assumedSignatures:n+4,baseFeesLowerBoundLamports:(n+4)*5000,escrowTokenAccountRentLamports:rent.splTokenAccount,illustrativeMatchRentLamports:rent.matchAccountIllustrative,vrfFeeLamports:vrfFee,priorityFeeLamports:'query getFeeForMessage after building actual transactions',totalLamports:vrfFee===null?null:(n+4)*5000+rent.splTokenAccount+rent.matchAccountIllustrative+vrfFee});
console.log(JSON.stringify({queriedAt:new Date().toISOString(),rpc,rentExemptLamports:rent,baseFeePerSignatureLamports:5000,vrfProgramExists:!!program.value,vrfProgramExecutable:program.value?.executable,baseQueueExists:!!q.value,estimates:[estimate(2),estimate(4)],limitations:['This is an estimate, not measured escrow transaction cost.','Match size and transaction count are illustrative until the contract is compiled.','Token account rent is a refundable deposit when the account is closed.','No USD conversion or fixed VRF price is invented. Set VRF_FEE_LAMPORTS only after checking the current base-layer queue fee.','Existing user token accounts add zero creation rent. Missing player/winner/treasury ATAs add 165-byte rent per new account.','A sponsor may pay network fees but cannot sign a player token transfer without that player.']},null,2));
