import {clamp} from './rig';
export const COMEBACK_RULESET='dynamic-comeback-2';
export const BOOSTS={
 'SECOND WIND':{duration:7200,cooldown:26000,limit:2,speed:1.48,acceleration:1.25,restore:.28,color:'#83b6a2'},
 'RAGE MODE':{duration:3600,cooldown:23000,limit:2,speed:1.95,acceleration:1.65,restore:.04,color:'#e96f61'},
 'ADRENALINE RUSH':{duration:4400,cooldown:22000,limit:3,speed:1.65,acceleration:1.55,restore:.13,color:'#f3b767'},
 'PERFECT RHYTHM':{duration:6800,cooldown:19000,limit:3,speed:1.34,acceleration:1.2,restore:.06,color:'#78aebe'},
 'LUCKY RECOVERY':{duration:1500,cooldown:18000,limit:3,speed:1.08,acceleration:1.1,restore:0,color:'#c5a760'},
 'COMEBACK SURGE':{duration:14200,cooldown:90000,limit:1,speed:2.25,acceleration:1.8,restore:.32,color:'#ab83d2'}
} as const;
export type Boost=keyof typeof BOOSTS;
export const BOOST_NAMES=Object.keys(BOOSTS) as Boost[];
export const isBoost=(type:string):type is Boost=>Object.hasOwn(BOOSTS,type);
export type Situation={gap:number;remaining:number;energy:number;speed:number;balance:number;endurance:number;traction:number;curve:number;rank:number;recentCrash:boolean};
// Opportunities, not ranks: no outcome or position is assigned by these rules.
export function comebackPressure(c:Situation){const gap=clamp((c.gap-.035)/.20,0,1),late=clamp((35000-c.remaining)/30000,0,1),need=clamp((.8-c.energy)/.6,0,1),risk=1-c.traction;return clamp(gap*(.65+late*.2+need*.1+risk*.05),0,1)}
export function softBand(c:Situation){if(c.rank===0||c.gap<.05)return 1;return 1+Math.min(.16,comebackPressure(c)*.16)*(.65+c.endurance/285)}
export function chooseOpportunity(c:Situation,roll:number,pick:number):Boost|null {
 const pressure=comebackPressure(c),chance=.23+pressure*.48+(c.remaining<=25000?.08:0);
 if(c.remaining<2500||roll>chance)return null;
 const weights:[Boost,number][]=[['SECOND WIND',.32+(1-c.energy)*.6],['RAGE MODE',.18+pressure*.38],['PERFECT RHYTHM',.35+c.balance/300],['ADRENALINE RUSH',(c.recentCrash||c.gap>.1)?.18+pressure*.18:0],['COMEBACK SURGE',c.gap>.1&&c.remaining<38000||c.gap>.16&&c.remaining<60000?.12+pressure*.48:0]];
 const sum=weights.reduce((n,[,w])=>n+w,0);let at=pick*sum;for(const [type,w] of weights){at-=w;if(at<=0)return type}return 'PERFECT RHYTHM';
}
export function boostEffect(type:string,elapsed:number,duration:number){if(!isBoost(type))return {speed:1,acceleration:1};const rule=BOOSTS[type],ramp=type==='PERFECT RHYTHM'?clamp(elapsed/1800,0,1):clamp(elapsed/450,0,1),fade=clamp((duration-elapsed)/700,0,1),strength=ramp*fade;return {speed:1+(rule.speed-1)*strength,acceleration:1+(rule.acceleration-1)*strength}}
export const FROZEN_RULES={id:COMEBACK_RULESET,shapeWeight:.3,variationWeight:.7,maxBand:.16,finalPushAt:65000,maxCombinedSpeed:2.35,boosts:BOOSTS};

