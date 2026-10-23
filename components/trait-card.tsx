'use client';
import {useMemo} from 'react';
import {Zap,TrendingUp,Shield,ArrowUp,Heart,Info} from 'lucide-react';
import {specFor} from '../lib/rig';
import {Drawing} from '../lib/game';
import {ProgressBar,StatusBadge} from './game-ui';
import {useGameLanguage} from './game-language';
export default function TraitCard({drawing}:{drawing:Drawing}){
 const s=useMemo(()=>specFor(drawing),[drawing]),{tx}=useGameLanguage();
 const traits=[['speed',Zap,tx('Speed','Скорость')],['acceleration',TrendingUp,tx('Acceleration','Разгон')],['balance',Shield,tx('Balance','Баланс')],['jump',ArrowUp,tx('Jump','Прыжок')],['endurance',Heart,tx('Endurance','Выносливость')]] as const;
 return <section className="trait-card"><div className="trait-title"><h3>{tx('Your horse’s build','Характер вашей лошади')}</h3><StatusBadge tone="purple">30 / 70</StatusBadge></div><div className="trait-bars">{traits.map(([k,Icon,label])=><div key={k}><Icon size={16}/><span>{label}</span><ProgressBar value={s.attributes[k]} label={label}/><b>{Math.round(s.attributes[k])}</b></div>)}</div><div className={'balance-risk '+(s.headRisk>.3?'risky':'')}><span>{tx('Head balance','Вес головы')}</span><b>{s.headRisk>.7?tx('TOP HEAVY','ПЕРЕВЕШИВАЕТ'):s.headRisk>.3?tx('UNSTABLE','НЕУСТОЙЧИВАЯ'):tx('BALANCED','СБАЛАНСИРОВАНА')}</b></div><details><summary><Info size={14}/>{tx('How your drawing matters','Как влияет рисунок')}</summary><p>{tx('A shared 250-point budget: light builds trade stability for speed and jump; sturdy builds gain balance and endurance. Each motor stat mixes 30% shape and 70% seeded variation. A long head adds forward weight.','Общий бюджет — 250 очков: лёгкие лошади быстрее и прыгучее, крепкие устойчивее и выносливее. Параметры смешивают 30% рисунка и 70% случайности seed. Длинная голова добавляет вес спереди.')}</p></details></section>;
}
