'use client';
import {useEffect,useState} from 'react';
import {Play,ArrowUpRight} from 'lucide-react';
import type {Race} from '../lib/game';
type Entry={id:number;category:string;description:string;url:string};
export default function RaceExamples({onOpen}:{onOpen:(race:Race)=>void}){
 const [entries,setEntries]=useState<Entry[]>([]),[busy,setBusy]=useState<number|null>(null),[error,setError]=useState('');
 useEffect(()=>{let live=true;fetch('/showcases/index.json').then(r=>r.ok?r.json():[]).then(r=>{if(live&&Array.isArray(r))setEntries(r as Entry[])}).catch(()=>{});return()=>{live=false}},[]);
 if(!entries.length)return null;
 return <div className="race-examples"><div className="eyebrow">REAL SEEDS / FOUR RIDERS / 90 SECONDS</div><h3>The race can turn.</h3><p>Four replays found in the balance study. Same physics, no scripted winners.</p>{entries.map(e=><button key={e.id+e.category} disabled={busy!==null} onClick={async()=>{setBusy(e.id);setError('');try{const r=await fetch(e.url);if(!r.ok)throw Error('Replay is unavailable');onOpen(await r.json())}catch(err){setError((err as Error).message)}finally{setBusy(null)}}}><Play size={17}/><span><b>{e.category}</b><small>{e.description}</small></span><ArrowUpRight size={14}/></button>)}{error&&<p role="alert">{error}</p>}</div>
}

