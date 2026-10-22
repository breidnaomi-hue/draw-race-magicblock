import type {Drawing} from './game';
export type Traits={speed:number;jump:number;grip:number;build:'Speedster'|'All-rounder'|'Tank';body:number;legs:number;overhang:number;neck:number;headRisk:number};
// Pure shared geometry heuristic, not anatomical recognition. Rasterize to a small
// occupancy mask; colors and absolute drawing scale have no effect. The client and
// server derive the same bounded, constant-budget attributes from frozen strokes.
export function analyze(drawing:Drawing):Traits {
  const size=80,grid=new Uint8Array(size*size);
  for(const stroke of drawing){for(let i=0;i<stroke.points.length;i++){const a=stroke.points[Math.max(0,i-1)],b=stroke.points[i],steps=Math.max(1,Math.ceil(Math.hypot(a[0]-b[0],a[1]-b[1])/4));for(let j=0;j<=steps;j++){const x=(a[0]+(b[0]-a[0])*j/steps)/640*size,y=(a[1]+(b[1]-a[1])*j/steps)/400*size,r=Math.max(.6,stroke.width/640*size/2);for(let yy=Math.floor(y-r);yy<=y+r;yy++)for(let xx=Math.floor(x-r);xx<=x+r;xx++)if(xx>=0&&yy>=0&&xx<size&&yy<size&&(xx-x)**2+(yy-y)**2<r*r+1)grid[yy*size+xx]=stroke.erase?0:1;}}}
  let x1=size,x2=0,y1=size,y2=0;for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(grid[y*size+x]){x1=Math.min(x1,x);x2=Math.max(x2,x);y1=Math.min(y1,y);y2=Math.max(y2,y);}
  if(x1>=x2||y1>=y2)return {speed:50,jump:50,grip:50,build:'All-rounder',body:.5,legs:.5,overhang:0,neck:0,headRisk:0};
  const width=x2-x1,height=y2-y1;let upper=0,bottom=0;const columns=new Uint8Array(width+1);
  for(let y=y1;y<=y2;y++)for(let x=x1;x<=x2;x++)if(grid[y*size+x]){if(y<y1+height*.6)upper++;else{bottom++;columns[x-x1]=1;}}
  let runs=0;for(let i=0;i<columns.length;i++)if(columns[i]&&(i===0||!columns[i-1]))runs++;
  const density=upper/(width*height*.6),aspect=height*.625/width;
  const body=Math.max(0,Math.min(1,.5+(density-.16)*1.2+(aspect-.55)*.5));
  const legs=Math.max(0,Math.min(1,(bottom/(upper+bottom)-.1)*1.7+Math.min(runs,4)*.08));
  // All allocations sum to 150. A big bonus always carries a cost elsewhere.
  let speed=50+(0.5-body)*32+(legs-.5)*9,jump=50+(0.5-body)*22+(legs-.5)*13;
  let grip=150-speed-jump;const low=Math.min(speed,jump,grip),high=Math.max(speed,jump,grip),scale=Math.min(1,25/Math.max(25,50-low,high-50));
  speed=50+(speed-50)*scale;jump=50+(jump-50)*scale;grip=150-speed-jump;
  // Estimate a torso from the longest horizontal run in the middle/lower mask.
  // Right-facing head extent above that torso is a lever, never a finish bonus.
  let torsoStart=x1+width*.2,torsoEnd=x1+width*.7,torsoY=y1+height*.58,best=0;
  for(let y=Math.floor(y1+height*.26);y<=y1+height*.77;y++){let start=-1;for(let x=x1;x<=x2+1;x++){if(x<=x2&&grid[y*size+x]){if(start<0)start=x}else if(start>=0){const len=x-start,score=len*(1+(y-y1)/height*.15);if(score>best&&len>width*.18){best=score;torsoStart=start;torsoEnd=x-1;torsoY=y}start=-1}}}
  const torsoWidth=Math.max(width*.25,torsoEnd-torsoStart);let headRight=torsoEnd,headTop=torsoY;
  for(let y=y1;y<torsoY-height*.12;y++)for(let x=Math.floor(torsoStart+torsoWidth*.65);x<=x2;x++)if(grid[y*size+x]){headRight=Math.max(headRight,x);headTop=Math.min(headTop,y)}
  const overhang=Math.max(0,(headRight-torsoEnd)/torsoWidth),neck=Math.max(0,(torsoY-headTop)*.625/torsoWidth);
  const lever=Math.max(0,overhang-.5)*.9+Math.max(0,neck-.9)*.7;
  const headRisk=lever>=1.05?1:Math.min(.8,Math.max(0,lever*.85));
  return {speed,jump,grip,build:body<.36?'Speedster':body>.64?'Tank':'All-rounder',body,legs,overhang,neck,headRisk};
}
export function terrainScore(t:Traits,track:number){const weights=track===0?[.6,.25,.15]:track===1?[.2,.6,.2]:[.15,.2,.65];return (t.speed*weights[0]+t.jump*weights[1]+t.grip*weights[2])/100;}
