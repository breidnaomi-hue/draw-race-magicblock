'use client';
import {Check,Crown,Plus,WifiOff,X} from 'lucide-react';
import {Drawing} from '../lib/game';
import HorseThumb from './horse-thumb';
import {StatusBadge,IconButton} from './game-ui';
import {useGameLanguage} from './game-language';
export default function PlayerCard({name,drawing,color,index,self,host,ready,offline,bot,onInvite,onKick}:{name?:string;drawing?:Drawing;color:string;index:number;self?:boolean;host?:boolean;ready?:boolean;offline?:boolean;bot?:boolean;onInvite?:()=>void;onKick?:()=>void}){
 const {tx}=useGameLanguage();
 if(!name)return <button className="player-card player-empty" onClick={onInvite} style={{'--rider':color} as React.CSSProperties}><span className="empty-portrait"><Plus size={28}/></span><strong>{tx('Open spot','Свободное место')}</strong><small>{tx('Invite a friend','Пригласить друга')}</small><span className="seat-number">{index+1}</span></button>;
 return <article className={'player-card '+(ready?'is-ready':'')} style={{'--rider':color} as React.CSSProperties}><span className="seat-number">{index+1}</span>{host&&<Crown className="host-crown" size={19}/>}<div className="player-portrait">{drawing?.length?<HorseThumb drawing={drawing}/>:<span className="player-initial">{name.slice(0,1).toUpperCase()}</span>}</div><strong>{name} {self&&<small>{tx('YOU','ВЫ')}</small>}</strong><StatusBadge tone={offline?'coral':ready?'mint':'neutral'}>{offline?<><WifiOff size={13}/>{tx('Reconnecting','Нет связи')}</>:ready?<><Check size={14}/>{bot?tx('BOT · READY','БОТ · ГОТОВ'):tx('READY','ГОТОВ')}</>:tx('Drawing…','Рисует…')}</StatusBadge>{onKick&&<IconButton label={tx('Free offline seat','Освободить место')} onClick={onKick}><X size={15}/></IconButton>}</article>;
}
