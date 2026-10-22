export type Weather='Clear skies'|'Rain showers'|'Headwind'|'Tailwind'|'Frost';
export type Obstacle={position:number;type:'hurdle'|'puddle'|'mud'|'ice';width:number};
export const BENDS=[.12,.29,.46,.63,.80];
export type Course={weather:Weather;wind:number;slippery:number;obstacles:Obstacle[];bends:number[]};
// All lanes use the same winding centerline and equal normalized race distance.
// Artwork extent is never a finish trigger.
export function routeY(p:number){return Math.sin(p*Math.PI*4)*.7+Math.sin(p*Math.PI*8)*.18;}
export function routeSlope(p:number){return Math.cos(p*Math.PI*4)*.7*4*Math.PI+Math.cos(p*Math.PI*8)*.18*8*Math.PI;}
export function courseFor(seed:string,track:number):Course{
  const bytes=seed.match(/../g)?.map(v=>parseInt(v,16))||Array(32).fill(0);
  const weather:Weather=(['Clear skies','Rain showers','Headwind','Tailwind','Frost'] as const)[bytes[24]%5];
  const wind=weather==='Headwind'?-1:weather==='Tailwind'?1:0;
  const slippery=weather==='Frost'?1:weather==='Rain showers'?.65:track===2?.45:.05;
  const obstacles:Obstacle[]=[];
  for(let i=0;i<8;i++){const position=.08+i*.11+(bytes[(25+i)%32]%9)/600;let type:Obstacle['type']=track===1&&i%2===0?'hurdle':track===2&&i%3!==0?'ice':i%3===0?'hurdle':i%2===0?'puddle':'mud';if(weather==='Frost'&&type!=='hurdle')type='ice';obstacles.push({position,type,width:type==='hurdle'?.02:.035});}
  return {weather,wind,slippery,obstacles,bends:BENDS};
}
