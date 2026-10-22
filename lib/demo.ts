import {Race,DURATION,VERSION} from './game';
import {exampleHorse} from './drawing';
export const demoPlayers=Array.from({length:4},(_,i)=>({id:'demo'+i,name:['Sir Scribbles','Neigh Sayer','Potato Pony','Lil’ Chaos'][i],drawing:exampleHorse(i),nonce:'0'.repeat(64),ready:true,lastSeen:0,rematch:false}));
export const demoRace:Race={seed:'5269a4495cf12edda478fabef933c55eb2a419382c2355dedfed0b738ba91109',secret:'',startAt:0,duration:DURATION,track:0,round:1,players:demoPlayers,commitment:'',version:VERSION};
