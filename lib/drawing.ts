import {Drawing,Stroke} from './game';
export const W=640,H=400;
export function paint(ctx:CanvasRenderingContext2D,drawing:Drawing,w=W,h=H) {
  ctx.clearRect(0,0,w,h);ctx.save();ctx.scale(w/W,h/H);
  for(const s of drawing){ctx.globalCompositeOperation=s.erase?'destination-out':'source-over';ctx.strokeStyle=s.color;ctx.fillStyle=s.color;ctx.lineWidth=s.width;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();s.points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));if(s.points.length===1){ctx.arc(s.points[0][0],s.points[0][1],s.width/2,0,Math.PI*2);ctx.fill();}else ctx.stroke();}
  ctx.restore();ctx.globalCompositeOperation='source-over';
}
export function drawingCanvas(drawing:Drawing,crop=true) {
  const raw=document.createElement('canvas');raw.width=W;raw.height=H;const ctx=raw.getContext('2d')!;paint(ctx,drawing);
  if(!crop)return raw;
  const a=ctx.getImageData(0,0,W,H).data;let x1=W,y1=H,x2=0,y2=0;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(a[(y*W+x)*4+3]>10){x1=Math.min(x1,x);y1=Math.min(y1,y);x2=Math.max(x2,x);y2=Math.max(y2,y);}
  const out=document.createElement('canvas');out.width=400;out.height=280;
  if(x2>=x1&&y2>=y1){const sw=x2-x1+20,sh=y2-y1+20,scale=Math.min(360/sw,240/sh);out.getContext('2d')!.drawImage(raw,x1-10,y1-10,sw,sh,(400-sw*scale)/2,280-sh*scale-12,sw*scale,sh*scale);}
  return out;
}
export function hasInk(drawing:Drawing){const c=drawingCanvas(drawing,false);const a=c.getContext('2d')!.getImageData(0,0,W,H).data;let n=0;for(let i=3;i<a.length;i+=4)if(a[i]>10&&++n>20)return true;return false;}
export function downloadDrawing(drawing:Drawing){const a=document.createElement('a');a.href=drawingCanvas(drawing,false).toDataURL('image/png');a.download='my-draw-race-horse.png';a.click();}
const line=(points:number[][],color:string,width=10):Stroke=>({color,width,erase:false,points:points as [number,number][]});
function oval(cx:number,cy:number,rx:number,ry:number,color:string,width=9){return line(Array.from({length:65},(_,i)=>[cx+Math.cos(i/64*Math.PI*2)*rx,cy+Math.sin(i/64*Math.PI*2)*ry]),color,width);}
export function exampleHorse(index=0):Drawing {
  const ink=['#633a9b','#d96235','#417b57','#9c740f'][index%4];
  if(index%4===2)return [oval(296,218,125,61,ink,12),line([[215,262],[192,323],[237,323]],ink),line([[342,267],[362,323],[399,323]],ink),line([[368,185],[407,90],[445,84],[480,128],[459,155],[417,150],[398,222]],ink,12),line([[408,99],[403,60],[429,88],[444,52],[450,86]],ink,8),line([[176,214],[140,179],[143,232]],ink),oval(448,112,3,5,ink,8),line([[427,145],[447,148]],ink,5)];
  if(index%4===3)return [oval(305,210,106,91,ink,12),line([[247,280],[229,327],[254,327]],ink),line([[348,285],[367,328],[390,328]],ink),line([[379,174],[405,97],[450,102],[481,144],[465,170],[422,160]],ink,12),line([[409,104],[405,70],[424,99]],ink),oval(443,128,3,5,ink),line([[199,206],[160,179],[173,236]],ink),line([[280,190],[296,180],[311,192]],ink,5),line([[327,231],[344,225]],ink,5)];
  return [line([[176,195],[188,167],[329,167],[362,126],[381,90],[432,88],[472,133],[465,155],[423,155],[404,206],[365,241],[228,239],[194,221],[176,195]],ink,11),line([[228,235],[206,317],[237,317]],ink),line([[262,241],[278,314],[306,314]],ink),line([[340,242],[319,316],[351,316]],ink),line([[369,233],[395,310],[428,310]],ink),line([[382,96],[374,57],[400,87],[422,86],[429,54],[437,91]],ink,9),line([[184,175],[147,145],[147,212],[126,190]],ink,9),line([[360,128],[379,139],[366,153],[379,163]],ink,8),oval(432,117,2,4,ink,8),line([[446,144],[458,140]],ink,5),...(index===1?[line([[267,144],[279,118],[299,145],[318,123],[327,157]],'#edba39',8)]:[])];
}
