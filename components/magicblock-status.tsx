'use client';
import {useState} from 'react';
import {ShieldCheck,ExternalLink,RefreshCw} from 'lucide-react';
import type {PublicRoom,Race} from '../lib/game';
import {DRAW_RACE_VRF_PROGRAM,explorer} from '../lib/vrf';
import {verifyVrfProof} from '../lib/verify-vrf';
import {useGameLanguage} from './game-language';
export default function MagicBlockStatus({room,race,retry,cancel,now=Date.now()}:{room:PublicRoom|null;race:Race|null;retry?:()=>void;cancel?:()=>void;now?:number}) {
 const {tx}=useGameLanguage(),[check,setCheck]=useState(''),[checking,setChecking]=useState(false);
 const state=room?.randomness,proof=race?.vrf;
 const waitingDeposits=!!room?.stake&&!['funded','racing','settling','settled'].includes(room.stake.status);
 const pending=state&&state.status!=='drawing'&&state.status!=='fulfilled'&&!waitingDeposits;
 const legacy=!!race&&!proof;
 return <section className={'magicblock-status'+(pending?' vrf-pending':'')} aria-label="MagicBlock VRF · Solana Devnet">
   <div className="vrf-title"><ShieldCheck size={19}/><strong>{legacy?tx('Local replay','Локальный повтор'):'MagicBlock VRF'}</strong><span className="devnet-badge">{legacy?tx('NO VRF','БЕЗ VRF'):'SOLANA DEVNET'}</span></div>
   <p>{proof?tx('Confirmed randomness drives this race’s weather, obstacles and boosts.','Подтверждённая случайность управляет погодой, препятствиями и бонусами этой гонки.'):waitingDeposits?tx('One MagicBlock VRF request starts only after all test SOL deposits are confirmed.','Один запрос MagicBlock VRF запускается только после подтверждения всех взносов тестовыми SOL.','所有测试 SOL 存款确认后才会发起一次 MagicBlock VRF 请求。'):pending?tx('Horses locked. Waiting for MagicBlock’s verifiable randomness…','Лошади зафиксированы. Ждём проверяемую случайность MagicBlock…'):legacy?tx('This saved example uses the original local seed.','Этот сохранённый пример использует исходный локальный seed.'):tx('One VRF request per race. Free races need no wallet; optional test SOL stakes use Devnet.','Один VRF-запрос на гонку. Бесплатные гонки без кошелька; ставки тестовыми SOL работают в Devnet.','每场比赛请求一次 VRF。免费模式无需钱包；可选测试 SOL 下注使用 Devnet。')}</p>
   <div className="vrf-links">
     {!legacy&&<a href={explorer(proof?.programId||DRAW_RACE_VRF_PROGRAM)} target="_blank" rel="noreferrer">{tx('Program','Программа')} <ExternalLink size={13}/></a>}
     {!room&&!race&&!pending&&<><a href="/?vrf=demo">{tx('Watch a recorded VRF race','Повтор настоящей VRF-гонки')}</a><a href="/?stakes=demo">{tx('Recorded SOL payout','Запись выплаты SOL','SOL 支付回放')}</a></>}
     {(proof?.requestSignature||state?.signature)&&<a href={explorer(proof?.requestSignature||state!.signature!,'tx')} target="_blank" rel="noreferrer">{tx('VRF request','VRF-запрос')} <ExternalLink size={13}/></a>}
     {proof&&<><a href={explorer(proof.fulfillmentSignature,'tx')} target="_blank" rel="noreferrer">{tx('Oracle response','Ответ оракула')} <ExternalLink size={13}/></a><a href={explorer(proof.account)} target="_blank" rel="noreferrer">{tx('On-chain receipt','Запись в Solana')} <ExternalLink size={13}/></a><button disabled={checking} onClick={async()=>{setChecking(true);setCheck('');try{await verifyVrfProof(proof);setCheck(tx('Verified directly against Solana Devnet.','Проверено напрямую в Solana Devnet.'))}catch(e){setCheck((e as Error).message)}finally{setChecking(false)}}}>{checking?tx('Checking…','Проверяем…'):tx('Verify on Solana','Проверить в Solana')}</button></>}
     {pending&&retry&&<button onClick={retry}><RefreshCw size={13}/>{state.status==='error'?tx('Retry request','Повторить запрос'):tx('Check again','Проверить снова')}</button>}
     {pending&&cancel&&state.requestedAt&&now-state.requestedAt>=180000&&<button onClick={cancel}>{tx('Cancel this round','Отменить этот раунд')}</button>}
   </div>
   {state?.error&&pending&&<p className="vrf-error" role="alert">{state.error} {tx('The race will wait; no local randomness is substituted.','Гонка подождёт; локальная случайность не подставляется.')}</p>}
   {check&&<p role="status">{check}</p>}
 </section>;
}
