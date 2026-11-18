export type ProgressStats={races:number;wins:number;multiplayer:number;parties:number;courses:number;comebacks:number;racePoints:number};
export const ACHIEVEMENTS=[
 {id:'first-finish',icon:'flag',points:50,stat:'races',target:1,title:['Off to the races','Первый финиш','初次完赛'],description:['Complete your first race.','Завершите первый забег.','完成你的第一场比赛。']},
 {id:'first-win',icon:'trophy',points:100,stat:'wins',target:1,title:['Winner’s circle','Первая победа','冠军时刻'],description:['Win a race.','Победите в забеге.','赢得一场比赛。']},
 {id:'friends',icon:'users',points:75,stat:'multiplayer',target:1,title:['Better together','Вместе веселее','一起更好玩'],description:['Complete a race with other players.','Завершите забег с другими игроками.','与其他玩家完成一场比赛。']},
 {id:'full-herd',icon:'users',points:100,stat:'parties',target:1,title:['The whole herd','Полная команда','全员到齐'],description:['Complete a four-player room race.','Завершите гонку в комнате на четверых.','完成一场四人房间比赛。']},
 {id:'five-races',icon:'flame',points:150,stat:'races',target:5,title:['On a roll','Вошёл во вкус','渐入佳境'],description:['Complete 5 races.','Завершите 5 забегов.','完成 5 场比赛。']},
 {id:'ten-races',icon:'medal',points:300,stat:'races',target:10,title:['Derby regular','Завсегдатай скачек','赛马常客'],description:['Complete 10 races.','Завершите 10 забегов.','完成 10 场比赛。']},
 {id:'hat-trick',icon:'trophy',points:200,stat:'wins',target:3,title:['Hat trick','Хет-трик','帽子戏法'],description:['Win 3 races.','Выиграйте 3 забега.','赢得 3 场比赛。']},
 {id:'explorer',icon:'compass',points:150,stat:'courses',target:3,title:['Track explorer','Исследователь трасс','赛道探索者'],description:['Race on all 3 tracks.','Пройдите все 3 трассы.','在全部 3 条赛道上完成比赛。']},
 {id:'comeback',icon:'zap',points:200,stat:'comebacks',target:1,title:['Comeback champion','Мастер камбэка','逆袭冠军'],description:['Win after a recorded comeback boost.','Победите после бонуса камбэка в записи гонки.','在比赛中获得逆袭加成后赢得胜利。']},
 {id:'wallet-linked',icon:'wallet',points:25,stat:'wallet',target:1,title:['Connected rider','Кошелёк на старте','钱包骑手'],description:['Verify your Solana wallet with a message.','Подтвердите Solana-кошелёк подписью сообщения.','签署消息以验证你的 Solana 钱包。']}
] as const;
export type AchievementId=typeof ACHIEVEMENTS[number]['id'];
export const racePoints=(place:number,multiplayer:boolean)=>25+([50,25,10,0][place-1]??0)+(multiplayer?10:0);
export function achievementProgress(id:AchievementId,stats:ProgressStats,wallet:boolean){const a=ACHIEVEMENTS.find(a=>a.id===id)!;return Math.min(a.target,a.stat==='wallet'?Number(wallet):stats[a.stat]);}
export type AchievementAward={id:AchievementId;points:number;unlockedAt:number};
export type ProfileRace={id:string;code:string;seed:string;place:number;points:number;completedAt:number;mode:'practice'|'duel'|'party'};
export type PlayerProfile={kind:'guest'|'wallet';walletAddress:string|null;name:string;points:number;racePoints:number;achievementPoints:number;stats:ProgressStats;awards:AchievementAward[];recent:ProfileRace[];pendingRaces:number;newlyUnlocked:AchievementId[]};
