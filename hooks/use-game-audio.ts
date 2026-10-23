'use client';
import {useEffect,useRef,useState,useCallback} from 'react';
import {AudioPreferences,AudioState,DEFAULT_AUDIO,audioPreferences,GameAudioEngine,musicCueFor} from '../lib/game-audio';
export function useGameAudio(scene:{view:'home'|'draw'|'race'|'results';elapsed:number;key:string;paused:boolean}){
 const engine=useRef<GameAudioEngine|undefined>(undefined),[settings,setSettings]=useState<AudioPreferences>(DEFAULT_AUDIO),[status,setStatus]=useState<AudioState>({unlocked:false,loading:false,playing:null,title:'',error:false,paused:false});
 useEffect(()=>{let preferences={...DEFAULT_AUDIO};try{preferences=audioPreferences(JSON.parse(localStorage.getItem('dr-audio-v1')||'null'),JSON.parse(localStorage.getItem('dr-sound')||'true'))}catch{}setSettings(preferences);
  const bus=new GameAudioEngine(setStatus);engine.current=bus;bus.setPreferences(preferences);void bus.prepare();
  const unlock=()=>void bus.unlock(),visibility=()=>bus.visibility(document.hidden);window.addEventListener('pointerdown',unlock,{passive:true});window.addEventListener('keydown',unlock);document.addEventListener('visibilitychange',visibility);
  return()=>{window.removeEventListener('pointerdown',unlock);window.removeEventListener('keydown',unlock);document.removeEventListener('visibilitychange',visibility);bus.dispose();engine.current=undefined};
 },[]);
 useEffect(()=>{engine.current?.setPreferences(settings)},[settings]);
 const cue=musicCueFor(scene.view,scene.elapsed);
 useEffect(()=>{engine.current?.setScene({cue,key:scene.key,elapsed:scene.elapsed,paused:scene.paused})},[cue,scene.key,scene.elapsed,scene.paused]);
 const update=useCallback((patch:Partial<AudioPreferences>)=>{setSettings(old=>{const next=audioPreferences({...old,...patch});try{localStorage.setItem('dr-audio-v1',JSON.stringify(next));localStorage.setItem('dr-sound',JSON.stringify(!next.muted))}catch{}return next})},[]);
 return {settings,status,update,unlock:()=>void engine.current?.unlock()};
}
