'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import {languageOf,translate,type Lang,type Translator} from '../lib/i18n';
const Context=createContext<{lang:Lang;setLang:(l:Lang)=>void;tx:Translator}>({lang:'en',setLang:()=>{},tx:en=>en});
export function GameLanguage({children,initialLanguage='en'}:{children:React.ReactNode;initialLanguage?:Lang}){
 const [lang,setLanguage]=useState<Lang>(initialLanguage);
 useEffect(()=>{try{const saved=localStorage.getItem('dr-language');if(saved)setLanguage(languageOf(saved))}catch{}},[]);
 useEffect(()=>{document.documentElement.lang=lang==='zh'?'zh-CN':lang},[lang]);
 const setLang=(l:Lang)=>{setLanguage(l);try{localStorage.setItem('dr-language',l)}catch{}};
 return <Context.Provider value={{lang,setLang,tx:(en,ru,zh)=>translate(lang,en,ru,zh)}}>{children}</Context.Provider>;
}
export const useGameLanguage=()=>useContext(Context);
