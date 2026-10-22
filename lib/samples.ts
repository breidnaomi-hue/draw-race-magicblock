import type {Drawing,Point} from './game';
import {exampleHorse} from './drawing';
const line=(points:Point[],width=10)=>({color:'#704a98',width,erase:false,points});
const ellipse=(cx:number,cy:number,rx:number,ry:number)=>line(Array.from({length:49},(_,i)=>[cx+Math.cos(i/48*Math.PI*2)*rx,cy+Math.sin(i/48*Math.PI*2)*ry]));
export const samples:{name:string;drawing:Drawing}[]=[
  {name:'Horse',drawing:exampleHorse(0)},
  {name:'Blob',drawing:[ellipse(295,220,140,83),line([[213,283],[200,328],[230,328]]),line([[375,283],[390,328],[420,328]]),ellipse(380,189,4,5)]},
  {name:'Lanky',drawing:[ellipse(285,145,90,34),line([[220,168],[190,365],[220,365]]),line([[345,170],[380,365],[415,365]]),line([[354,132],[398,65],[443,73],[470,102],[415,103],[377,149]]),ellipse(439,85,3,3)]},
  {name:'Long neck',drawing:[ellipse(200,250,80,38),line([[145,273],[125,326],[155,326]]),line([[250,278],[270,327],[300,327]]),line([[268,232],[365,75],[590,75],[606,108],[390,108],[280,264]]),ellipse(572,88,3,4)]},
  {name:'Box',drawing:[line([[175,146],[390,146],[390,272],[175,272],[175,146]]),line([[215,272],[215,329],[250,329]]),line([[350,272],[350,329],[385,329]]),line([[390,146],[420,90],[482,90],[482,145],[420,145]]),ellipse(461,109,3,4)]}
];
