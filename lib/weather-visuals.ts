import type {WeatherKind} from './physics-course';

export type WeatherVisualKind=WeatherKind|'Dust storm';
export type WeatherTier='desktop'|'mobile'|'low';
export type ClearRegion={x:number;y:number;width:number;height:number};
export function weatherVisualProfile(kind:WeatherVisualKind,width:number,height:number,low=false,reducedMotion=false){
 const tier:WeatherTier=low?'low':width<700||height<450?'mobile':'desktop';
 const factor=tier==='desktop'?1:tier==='mobile'?.48:.26;
 const base=kind==='Rain'?84:kind==='Snow & ice'?58:kind==='Fog'?12:kind==='Strong wind'||kind==='Dust storm'?30:0;
 return {tier,particles:reducedMotion?0:Math.floor(base*factor),particleAlpha:tier==='desktop'?.36:tier==='mobile'?.27:.22,
  // Haze belongs only to the distant scenery, never the track or actors.
  backgroundHaze:kind==='Fog'?(tier==='desktop'?.16:.10):kind==='Dust storm'?(tier==='desktop'?.10:.06):0,
  foregroundHaze:0 as const,fullScreenTint:0 as const};
}
export function drawDistantHaze(g:CanvasRenderingContext2D,width:number,bottom:number,opacity:number,dust=false){
 if(opacity<=0||bottom<=0)return;
 g.save();const gradient=g.createLinearGradient(0,0,0,bottom);
 gradient.addColorStop(0,dust?'rgba(219,184,130,0)':'rgba(245,247,240,0)');
 gradient.addColorStop(.6,dust?'rgba(219,184,130,'+opacity+')':'rgba(245,247,240,'+opacity+')');
 gradient.addColorStop(1,dust?'rgba(219,184,130,0)':'rgba(245,247,240,0)');
 g.fillStyle=gradient;g.fillRect(0,0,width,bottom);g.restore();
}
export function drawWeatherParticles(g:CanvasRenderingContext2D,width:number,height:number,kind:WeatherVisualKind,wind:number,t:number,profile:ReturnType<typeof weatherVisualProfile>,clear:ClearRegion[]){
 g.clearRect(0,0,width,height);if(!profile.particles)return;
 const mod=(v:number,n:number)=>(v%n+n)%n;
 g.save();g.globalAlpha=profile.particleAlpha;g.lineWidth=kind==='Rain'?1.1:1.4;
 for(let j=0;j<profile.particles;j++){
  if(kind==='Rain'){const x=mod(j*137-t*.26,width),y=mod(j*83+t*.55,height);g.strokeStyle='#376f87';g.beginPath();g.moveTo(x,y);g.lineTo(x-4,y+11);g.stroke();}
  else if(kind==='Snow & ice'){const x=mod(j*173-t*.035+Math.sin(t/1100+j)*9,width),y=mod(j*79+t*.024,height);g.fillStyle=j%3?'#fffef6':'#7993a1';g.beginPath();g.arc(x,y,1+j%2*.45,0,7);g.fill();}
  else if(kind==='Fog'){
   // Sparse drifting wisps replace the former 66%-opaque screen-wide veil.
   const x=mod(j*193+t*.018,width+120)-60,y=mod(j*97,height);
   g.strokeStyle='#a6b6af';g.globalAlpha=profile.particleAlpha*.45;g.beginPath();g.ellipse(x,y,18+j%3*9,2,0,0,Math.PI);g.stroke();
  }else if(kind==='Strong wind'||kind==='Dust storm'){
   const direction=wind<0?-1:1,x=mod(j*151+t*direction*.45,width+80)-40,y=mod(j*67+Math.sin(t/600+j)*5,height);
   g.strokeStyle=kind==='Dust storm'?'#a67a3b':'#718f75';g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+direction*13,y-4,x+direction*(21+j%3*5),y-2);g.stroke();
   if(kind==='Dust storm'){g.fillStyle='#a77c44';g.fillRect(x-7,y+5,2,1);}
  }
 }
 g.restore();
 // Keep the immediate horse, name and obstacle areas free of particles.
 for(const r of clear)g.clearRect(r.x,r.y,r.width,r.height);
}
