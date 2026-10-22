import {Room} from './game';
import {Store} from './rooms';
export class D1Store implements Store {
  constructor(private db:D1Database){}
  private primary(){return this.db.withSession('first-primary');}
  async get(code:string){const row=await this.primary().prepare('SELECT data FROM race_rooms WHERE code = ?').bind(code).first<{data:string}>();return row?JSON.parse(row.data) as Room:null;}
  async create(room:Room){const r=await this.primary().prepare('INSERT OR IGNORE INTO race_rooms(code,revision,data,expires) VALUES(?,?,?,?)').bind(room.code,room.revision,JSON.stringify(room),room.expires).run();return r.meta.changes===1;}
  async save(room:Room,previous:number){const r=await this.primary().prepare('UPDATE race_rooms SET revision=?,data=?,expires=? WHERE code=? AND revision=?').bind(room.revision,JSON.stringify(room),room.expires,room.code,previous).run();return r.meta.changes===1;}
}
