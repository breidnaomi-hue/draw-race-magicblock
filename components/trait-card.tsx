'use client';
import {useMemo} from 'react';
import {analyze} from '../lib/traits';
import {Drawing} from '../lib/game';
export default function TraitCard({drawing}:{drawing:Drawing}){const t=useMemo(()=>analyze(drawing),[drawing]);return <div className="trait-card"><div className="trait-title"><b>{t.build}</b><span>SHAPE 30% · CHAOS 70%</span></div><div className="trait-bars">{(['speed','jump','grip'] as const).map((s,i)=><div key={s}><span>{['SPEED','JUMP','GRIP'][i]}</span><div><i style={{width:t[s]+'%'}}/></div><b>{Math.round(t[s])}</b></div>)}</div><div className={'balance-risk '+(t.headRisk>.3?'risky':'')}><b>HEADPLANT RISK</b><span>{Math.round(t.headRisk*100)}%{t.headRisk===1?' · TOP HEAVY':''}</span></div><p>{t.headRisk>.3?'Long neck or muzzle: your front end can dig into the track. Headwind and ice make it worse.':'One shared stat budget. Faster horses trade stability. Sturdy ones keep their footing.'} Geometry estimate; actual risk changes with weather.</p></div>}
