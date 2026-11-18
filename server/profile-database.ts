import {DatabaseSync} from 'node:sqlite';
import type {ProfileDatabase,SqlCommand,SqlValue} from '../lib/profile-store';
export class SqliteProfileDatabase implements ProfileDatabase {
 readonly database:DatabaseSync;
 constructor(path:string){this.database=new DatabaseSync(path);this.database.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000');}
 async all<T>(sql:string,values:SqlValue[]=[]){return this.database.prepare(sql).all(...values) as T[];}
 async run(sql:string,values:SqlValue[]=[]){return Number(this.database.prepare(sql).run(...values).changes);}
 async batch(commands:SqlCommand[]){
  this.database.exec('BEGIN IMMEDIATE');
  try{for(const c of commands)this.database.prepare(c.sql).run(...(c.values||[]));this.database.exec('COMMIT');}
  catch(error){this.database.exec('ROLLBACK');throw error;}
 }
 close(){this.database.close();}
}
