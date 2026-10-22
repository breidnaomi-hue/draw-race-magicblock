'use client';
import {useEffect,useRef} from 'react';
import {Drawing} from '../lib/game';
import {drawingCanvas} from '../lib/drawing';
export default function HorseThumb({drawing}:{drawing:Drawing}){const ref=useRef<HTMLCanvasElement>(null);useEffect(()=>{const c=ref.current;if(c){const src=drawingCanvas(drawing);c.getContext('2d')!.clearRect(0,0,400,280);c.getContext('2d')!.drawImage(src,0,0);}},[drawing]);return <canvas className="horse-thumb" width={400} height={280} ref={ref}/>;}
