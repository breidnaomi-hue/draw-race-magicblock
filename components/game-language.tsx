'use client';
import {createContext,useContext,useEffect,useState} from 'react';
type Lang='en'|'ru';
const Context=createContext({lang:'en' as Lang,setLang:(_l:Lang)=>{},tx:(en:string,_ru:string)=>en});
export function GameLanguage({children}:{children:React.ReactNode}){
 const [lang,setLanguage]=useState<Lang>('en');
 useEffect(()=>{try{if(localStorage.getItem('dr-language')==='ru')setLanguage('ru')}catch{}},[]);
 useEffect(()=>{document.documentElement.lang=lang},[lang]);
 const setLang=(l:Lang)=>{setLanguage(l);try{localStorage.setItem('dr-language',l)}catch{}};
 return <Context.Provider value={{lang,setLang,tx:(en,ru)=>lang==='ru'?ru:en}}>{children}</Context.Provider>;
}
export const useGameLanguage=()=>useContext(Context);
