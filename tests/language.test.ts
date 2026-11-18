import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import ts from 'typescript';
import {renderToStaticMarkup} from 'react-dom/server';
import {createElement} from 'react';
import {GameLanguage} from '../components/game-language';
import PlayerProfile from '../components/player-profile';
import {languageOf,translate,ZH} from '../lib/i18n';
import type {PlayerProfileControl} from '../hooks/use-player-profile';
test('Chinese language persists as zh with compatible zh-CN input and keeps other translations',()=>{
 assert.equal(languageOf('zh'),'zh');assert.equal(languageOf('zh-CN'),'zh');assert.equal(languageOf('ru'),'ru');assert.equal(languageOf(null),'en');
 assert.equal(translate('zh','Race history','История'),'比赛记录');assert.equal(translate('ru','Race history','История'),'История');assert.equal(translate('en','Race history','История'),'Race history');
 assert.equal(translate('zh','Something','Что-то','某事'),'某事');
});
test('every static interface translation has a Chinese catalog entry or explicit text',async()=>{
 const missing:string[]=[];
 for(const file of (await readdir(new URL('../components/',import.meta.url))).filter(f=>f.endsWith('.tsx'))){
  const text=await readFile(new URL('../components/'+file,import.meta.url),'utf8'),source=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  const visit=(node:ts.Node)=>{if(ts.isCallExpression(node)&&node.expression.getText(source)==='tx'&&node.arguments.length<3&&node.arguments[0]&&ts.isStringLiteralLike(node.arguments[0])){const key=node.arguments[0].text.replace(/\s+/g,' ').trim();if(/[a-z]/i.test(key)&&!ZH[key])missing.push(file+': '+key);}ts.forEachChild(node,visit);};visit(source);
 }
 assert.deepEqual(missing,[]);
});
test('profile renders Chinese achievements, points, wallet discovery and a guest fallback',()=>{
 const control={profile:{kind:'guest',walletAddress:null,name:'画马高手',points:0,racePoints:0,achievementPoints:0,stats:{races:0,wins:0,multiplayer:0,parties:0,courses:0,comebacks:0,racePoints:0},awards:[],recent:[],pendingRaces:0,newlyUnlocked:[]},wallets:[],loading:false,busy:false,error:'',refresh:async()=>{},rename:async()=>{},connect:async()=>{},disconnect:async()=>{},registerRace:async()=>false,clearError:()=>{},selected:null} as unknown as PlayerProfileControl;
 const html=renderToStaticMarkup(createElement(GameLanguage,{initialLanguage:'zh',children:createElement(PlayerProfile,{control,name:'画马高手',saveName:()=>{}})}));
 for(const label of ['你的玩家档案','竞赛积分','初次完赛','未检测到 Solana 钱包','如何获得积分'])assert.ok(html.includes(label));
 assert.ok(!html.includes('Your player profile'));
});
