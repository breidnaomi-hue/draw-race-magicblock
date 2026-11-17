// A stable epoch clock shared by replay controls and the animation loop.
// Changing the OS wall clock must not move an already running race backwards.
export function monotonicNow(){
 const p=globalThis.performance;
 return p&&Number.isFinite(p.timeOrigin)?p.timeOrigin+p.now():Date.now();
}

export class RacePlaybackClock {
 private elapsed=0;
 private lastFrame:number|undefined;
 private source='';
 private seeking=false;
 sample(frame:number,target:number,source:string,seek?:number){
  const delta=this.lastFrame===undefined?0:Math.max(0,frame-this.lastFrame);
  const reset=this.lastFrame===undefined||source!==this.source||seek!==undefined||this.seeking||delta>1000;
  if(reset||(this.elapsed<0&&target<0))this.elapsed=seek??target;
  else{
   const predicted=this.elapsed+delta;
   // Network offset corrections change playback speed by at most 5%, rather
   // than skipping or repeating recorded poses on every room poll.
   const limit=delta*.05;
   this.elapsed=predicted+Math.max(-limit,Math.min(limit,target-predicted));
  }
  this.lastFrame=frame;this.source=source;this.seeking=seek!==undefined;
  return {elapsed:this.elapsed,delta,reset};
 }
}
