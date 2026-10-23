import {mkdir,readFile,writeFile,rename,unlink} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {randomUUID} from 'node:crypto';
import type {Store} from '../lib/rooms';
import type {Room} from '../lib/game';
// One Node process owns the file store. Reads must share the write queue on
// Windows, where an open reader can temporarily prevent atomic replacement.
const queues=new Map<string,Promise<void>>();
export class FileStore implements Store {
 constructor(private directory:string){this.directory=resolve(directory)}
 private async read(code:string){try{return JSON.parse(await readFile(join(this.directory,code+'.json'),'utf8')) as Room}catch(e:any){if(e.code==='ENOENT')return null;throw e}}
 private lock<T>(code:string,fn:()=>Promise<T>):Promise<T>{const key=join(this.directory,code),task=(queues.get(key)||Promise.resolve()).then(fn),gate=task.then(()=>{},()=>{});queues.set(key,gate);void gate.then(()=>{if(queues.get(key)===gate)queues.delete(key)});return task}
 get(code:string){return this.lock(code,()=>this.read(code))}
 create(room:Room){return this.lock(room.code,async()=>{if(await this.read(room.code))return false;await this.write(room);return true})}
 save(room:Room,previous:number){return this.lock(room.code,async()=>{const old=await this.read(room.code);if(!old||old.revision!==previous)return false;await this.write(room);return true})}
 private async write(room:Room){
  await mkdir(this.directory,{recursive:true});const file=join(this.directory,room.code+'.json'),temp=file+'.'+randomUUID()+'.tmp';
  try{await writeFile(temp,JSON.stringify(room),{mode:0o600});for(let attempt=0;;attempt++){try{await rename(temp,file);break}catch(e:any){if(attempt>=4||!['EPERM','EACCES','EBUSY'].includes(e.code))throw e;await new Promise(r=>setTimeout(r,10*2**attempt))}}}finally{await unlink(temp).catch((e:any)=>{if(e.code!=='ENOENT')throw e})}
 }
}
