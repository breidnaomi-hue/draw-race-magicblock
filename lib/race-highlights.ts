import {decodeTape,poseAt,ReplayTape} from './physics';
export type RaceHighlight={kind:'comeback'|'recovery'|'crash'|'sprint'|'finish';at:number;lane:number;gap:number;event?:string};
export function raceHighlight(tape:ReplayTape):RaceHighlight{
 const decoded=decodeTape(tape),winner=tape.ranking[0];let maxGap=0,maxAt=0;
 for(let at=20000;at<=tape.duration;at+=1000){if(tape.finishes.some(f=>f>0&&f<at))break;const x=Array.from({length:tape.lanes},(_,i)=>poseAt(tape,i,at,decoded).x),gap=(Math.max(...x)-x[winner])/tape.course.length*100;if(gap>maxGap){maxGap=gap;maxAt=at}}
 if(maxGap>=8){const event=tape.events.find(e=>e.lane===winner&&e.at>=maxAt-4000&&['COMEBACK SURGE','RAGE MODE','ADRENALINE RUSH','SECOND WIND'].includes(e.type));return {kind:'comeback',at:Math.min(tape.duration-1000,event?event.at+1200:maxAt),lane:winner,gap:maxGap,event:event?.type}}
 const recovery=tape.events.find(e=>e.type==='LUCKY RECOVERY'&&e.at>20000&&e.lane===winner);if(recovery)return {kind:'recovery',at:recovery.at+600,lane:recovery.lane,gap:0,event:recovery.type};
 const crash=tape.events.find(e=>e.type==='OBSTACLE CRASH'&&e.at>20000&&e.at<tape.duration-8000&&e.lane===Array.from({length:tape.lanes},(_,i)=>i).sort((a,b)=>poseAt(tape,b,e.at-600,decoded).x-poseAt(tape,a,e.at-600,decoded).x)[0]);if(crash)return {kind:'crash',at:crash.at+400,lane:crash.lane,gap:0,event:crash.type};
 const sprint=tape.events.find(e=>e.lane===winner&&e.at>45000&&['RAGE MODE','COMEBACK SURGE'].includes(e.type));if(sprint)return {kind:'sprint',at:sprint.at+1000,lane:winner,gap:0,event:sprint.type};
 const finishes=tape.finishes.filter(f=>f>0),first=finishes.length?Math.min(...finishes):0;return {kind:'finish',at:Math.max(0,Math.min(tape.duration-1000,(first||tape.duration)-1700)),lane:winner,gap:0};
}
