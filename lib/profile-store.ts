export type SqlValue=string|number|null;
export type SqlCommand={sql:string;values?:SqlValue[]};
export interface ProfileDatabase {
 all<T>(sql:string,values?:SqlValue[]):Promise<T[]>;
 run(sql:string,values?:SqlValue[]):Promise<number>;
 batch(commands:SqlCommand[]):Promise<void>;
}
export const PROFILE_SCHEMA=[
 'CREATE TABLE IF NOT EXISTS drp_profiles (id TEXT PRIMARY KEY, name TEXT NOT NULL, created_at INTEGER NOT NULL)',
 'CREATE TABLE IF NOT EXISTS drp_sessions (token_hash TEXT PRIMARY KEY, wallet TEXT NOT NULL, expires_at INTEGER NOT NULL)',
 'CREATE TABLE IF NOT EXISTS drp_challenges (token_hash TEXT PRIMARY KEY, id TEXT NOT NULL UNIQUE, wallet TEXT NOT NULL, origin TEXT NOT NULL, message TEXT NOT NULL, expires_at INTEGER NOT NULL, used INTEGER NOT NULL DEFAULT 0)',
 'CREATE TABLE IF NOT EXISTS drp_race_rewards (id TEXT PRIMARY KEY, profile_id TEXT NOT NULL, receipt TEXT NOT NULL, player_id TEXT NOT NULL, code TEXT NOT NULL, seed TEXT NOT NULL, mode TEXT NOT NULL, place INTEGER NOT NULL, points INTEGER NOT NULL, track INTEGER NOT NULL, comeback INTEGER NOT NULL, completed_at INTEGER NOT NULL, created_at INTEGER NOT NULL, UNIQUE(receipt,player_id))',
 'CREATE INDEX IF NOT EXISTS drp_rewards_profile ON drp_race_rewards(profile_id,completed_at)',
 'CREATE TABLE IF NOT EXISTS drp_achievements (profile_id TEXT NOT NULL, id TEXT NOT NULL, points INTEGER NOT NULL, unlocked_at INTEGER NOT NULL, PRIMARY KEY(profile_id,id))'
];
export class D1ProfileDatabase implements ProfileDatabase {
 constructor(private db:D1Database){}
 private primary(){return this.db.withSession('first-primary');}
 async all<T>(sql:string,values:SqlValue[]=[]){return (await this.primary().prepare(sql).bind(...values).all<T>()).results;}
 async run(sql:string,values:SqlValue[]=[]){return (await this.primary().prepare(sql).bind(...values).run()).meta.changes;}
 async batch(commands:SqlCommand[]){const db=this.primary();await db.batch(commands.map(c=>db.prepare(c.sql).bind(...(c.values||[]))));}
}
