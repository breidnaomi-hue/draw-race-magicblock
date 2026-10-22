import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
import {join} from 'node:path';
import type {Store} from '../lib/rooms';
import type {Room} from '../lib/game';
export class FileStore implements Store {
  private queue:Promise<unknown>=Promise.resolve();
  constructor(private directory:string){}
  async get(code:string){try{return JSON.parse(await readFile(join(this.directory,code+'.json'),'utf8')) as Room}catch(e:any){if(e.code==='ENOENT')return null;throw e}}
  private lock<T>(fn:()=>Promise<T>):Promise<T>{const result=this.queue.then(fn);this.queue=result.catch(()=>{});return result;}
  async create(room:Room){return this.lock(async()=>{if(await this.get(room.code))return false;await this.write(room);return true})}
  async save(room:Room,previous:number){return this.lock(async()=>{const old=await this.get(room.code);if(!old||old.revision!==previous)return false;await this.write(room);return true})}
  private async write(room:Room){await mkdir(this.directory,{recursive:true});const file=join(this.directory,room.code+'.json'),temp=file+'.tmp';await writeFile(temp,JSON.stringify(room));await rename(temp,file)}
}
