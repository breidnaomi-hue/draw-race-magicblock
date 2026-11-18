import test from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {GameLanguage} from '../components/game-language';
import RoomSetup from '../components/room-setup';
import StakePanel from '../components/stake-panel';
import type {PublicRoom} from '../lib/game';
import type {Lang} from '../lib/i18n';
const noop=()=>{};
test('room creation and settlement details render in English, Russian and Chinese',()=>{
 for(const [lang,label] of [['en','Four-player room'],['ru','Комната на четверых'],['zh','四人房间']] as [Lang,string][]){const html=renderToStaticMarkup(createElement(GameLanguage,{initialLanguage:lang,children:createElement(RoomSetup,{capacity:4,busy:false,create:noop,connect:noop})}));assert.ok(html.includes(label));assert.ok(html.includes('Devnet'));}
 const room={capacity:2,players:[],stake:{mode:'sol-devnet',amountLamports:'20000000',feeBps:500,programId:'9aT2ra9HdSrVLv7gBmCaZbW3DGu22XDCfXS3CEQAeCux',operator:'operator',treasury:'operator',termsHash:'terms',status:'settled',wallets:[],paidMask:3,settlementSignature:'confirmed-payout'}} as unknown as PublicRoom;
 for(const lang of ['en','ru','zh'] as Lang[]){const html=renderToStaticMarkup(createElement(GameLanguage,{initialLanguage:lang,children:createElement(StakePanel,{room,me:'me',now:Date.now(),busy:false,connected:false,onWallet:noop,onAccept:noop,onDeposit:noop,onRefund:noop,onRefresh:noop})}));assert.ok(html.includes('0.038 SOL'));assert.ok(html.includes('cluster=devnet'));assert.ok(html.includes('/tx/confirmed-payout'));assert.ok(!html.includes('Mainnet'));}
});
