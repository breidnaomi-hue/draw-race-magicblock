import {readFile,writeFile,readdir,mkdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root='docs/comeback',out='../outputs',data=out+'/balance-data';
const json=async name=>JSON.parse(await readFile(root+'/'+name+'.json','utf8'));
const [before,after,candidate,ablation,examples]=await Promise.all(['before-summary','after-summary','candidate1-summary','ablation','showcases'].map(json));
if(before.total!==10000||after.total!==10000||examples.phase!=='after')throw Error('Final complete study and final examples required');
const pct=n=>n===null?'—':(n*100).toFixed(1)+'%',cell=r=>`${r.wins}/${r.count} (${pct(r.rate)})`;
const comparison=key=>before.checkpoints.map((b,i)=>`| ${b.second} s | ${cell(b[key])} | ${cell(after.checkpoints[i][key])} |`).join('\n');
const names=['Horse','Blob','Lanky','Longneck','Box'];
const rows=[];await mkdir(data,{recursive:true});
for(const phase of ['before','after']){
 const files=(await readdir(root)).filter(n=>n.startsWith('raw-'+phase+'-')&&n.endsWith('.jsonl'));
 const all=(await Promise.all(files.map(f=>readFile(root+'/'+f,'utf8')))).flatMap(s=>s.trim().split('\n').map(JSON.parse)).sort((a,b)=>a.id-b.id);
 if(all.length!==10000||new Set(all.map(r=>r.id)).size!==10000)throw Error('Incomplete raw phase '+phase);
 const header=['id','seed','form0','form1','form2','form3','winner','leadChanges','winnerMaxDeficitPP','winnerMaxDeficitAtMS',...['30','45','65'].flatMap(t=>['leader'+t,'gapPP'+t,'alreadyFinished'+t,...[0,1,2,3].map(i=>'deficit'+t+'Lane'+i)]),'falls','recoveries','jumps','barrierContacts',...[0,1,2,3].map(i=>'finishMSLane'+i),...[0,1,2,3].map(i=>'distanceLane'+i)];
 const lines=all.map(r=>[r.id,r.seed,...r.picks,r.winner,r.changes,r.maxDeficit,r.maxDeficitAt,...r.checkpoints.flatMap(c=>[c.leader,c.gap,c.finished?1:0,...c.deficits]),r.diagnostics.falls,r.diagnostics.recoveries,r.diagnostics.jumps,r.diagnostics.barrierContacts,...r.finishes,...r.distances].join(','));
 await writeFile(data+'/'+phase+'.csv',header.join(',')+'\n'+lines.join('\n')+'\n');rows.push(all);
}
if(rows[0].some((r,i)=>r.seed!==rows[1][i].seed||r.picks.join()!==rows[1][i].picks.join()))throw Error('Unpaired input schedule');
const hashes={};for(const f of ['lib/physics.ts','lib/comeback.ts','lib/physics-course.ts','tests/baseline/physics.ts','tests/baseline/physics-course.ts'])hashes[f]=createHash('sha256').update((await readFile(f,'utf8')).replace(/\r\n/g,'\n')).digest('hex');
await writeFile(root+'/provenance.json',JSON.stringify({rules:'dynamic-comeback-2',physics:'matter-0.20-comeback-2',node:process.version,hashNormalization:'UTF-8 with LF line endings',seedRule:'SHA256(draw-race-comeback-study-1:<id>)',ids:'0..9999',hashes},null,2));
const report=`# DRAW RACE — проверка камбэков

Проверена финальная модель dynamic-comeback-2: 10 000 гонок до изменений и 10 000 после на парных seed. Отдельно сохранён отклонённый кандидат (ещё 10 000 гонок). Все гонки вычислены настоящим Matter.js, по четыре участника, 5 400 шагов, 90 секунд. Победитель определяется результатом физики.

## Что изменилось

Шесть усилений с разными эффектами, лимитами и расходом энергии; мягкая помощь отстающим; физические штрафы за перегрев, усталость, приземление, скользкий поворот, столкновение и спотыкание. На 65-й секунде FINAL PUSH открывает последнюю возможность для редкого рывка. Новые зоны и препятствия влияют на скорость и столкновения. Телепортаций и назначенного победителя нет.

Сохранены рисунки, инструменты, комнаты на 2/4 человека, 90 секунд, погода, повторы и внешний стиль. Стартовый секрет, параметры, события и запись позиций фиксируются. Старые записи v5 проигрываются исходной лентой.

## Победа текущего лидера

До финиша первого участника, отрыв любой:

| Момент | До | После |
|---|---:|---:|
${comparison('allLeaders')}

Лидер опережает ближайшего соперника на 15–20 процентных пунктов длины трассы:

| Момент | До | После |
|---|---:|---:|
${comparison('leader15to20')}

Условные группы формируются отдельно в каждой модели: это одинаковые исходные seed, но разные физические состояния, а не один и тот же набор «лидерских» гонок. Небольшие знаменатели, особенно на 30/45 с, не позволяют уверенно оценить редкие большие отрывы. «20 пунктов» означает 20% всей трассы, а не 20% от пробега лидера. До изменений на 65 с уже закончились ${before.checkpoints[2].alreadyFinished} гонки; они исключены из этого среза. После — ${after.checkpoints[2].alreadyFinished}.

Вероятность победы участника, который в указанный момент отстаёт на 10–20 пунктов; знаменатель — подходящие участники, а не гонки:

| Момент | До | После |
|---|---:|---:|
${comparison('trailing10to20')}

Гонок хотя бы с одной сменой лидера после пятой секунды: ${before.racesWithLeadChange}/10000 → ${after.racesWithLeadChange}/10000. Среднее число смен: ${before.meanLeadChanges.toFixed(2)} → ${after.meanLeadChanges.toFixed(2)}. Для подсчёта используется срез раз в секунду и порог 8 единиц, поэтому очень короткие обгоны не учитываются.

Победитель имел отставание не менее 10 пунктов после 20 с и до первого финиша: ${before.comeback10} → ${after.comeback10} гонок; не менее 15 пунктов: ${before.comeback15} → ${after.comeback15}. Падения на 40 000 участников: ${before.falls} → ${after.falls}; завершённые восстановления: ${before.recoveries} → ${after.recoveries}. Повторные падения одного участника учитываются отдельно.

## Почему первый вариант отклонён

В кандидате 1 лидер с отрывом 15–20 пунктов на 65 с выиграл ${cell(candidate.checkpoints[2].leader15to20)}. Усиления уже работали, но редкий мощный рывок часто гасился перегревом и скользкой зоной. В финальной модели он тратит энергию, имеет ограниченную длительность и одно использование, но лучше держит сцепление и прыжки, а перегрев не прерывает его. Оба результата сохранены; итоговая модель измерена повторно на всех 10 000 seed.

## 30/70 и различия форм

Пять эффективных параметров равны 0,30 × нормализованный параметр рисунка + 0,70 × seeded variation. Это проверено по замороженным параметрам ленты, а также по изменению движения. Формула не равна «рисунок определяет ровно 30% побед»: геометрия головы, масса и столкновения тоже влияют.

Дополнительная абляция на ${ablation.total} парных seed финальной модели: при обнулении вклада параметров рисунка победитель изменился в ${ablation.changedByTraits}/${ablation.total} гонок (${pct(ablation.changedByTraits/ablation.total)}); при отключении мягкой помощи и запланированных камбэк-возможностей — в ${ablation.changedByComeback}/${ablation.total} (${pct(ablation.changedByComeback/ablation.total)}). Геометрия рисунка в первой абляции сохранена; во второй остаются обычные поверхности и физика восстановления. Это чувствительность конкретной выборки, не доля причинной дисперсии и не заданная вероятность победы.

Смешанные гонки: по 6 400 участий каждой тестовой формы, четыре разные формы в гонке:

| Форма | До | После |
|---|---:|---:|
${before.forms.map((b,i)=>`| ${names[i]} | ${cell(b)} | ${cell(after.forms[i])} |`).join('\n')}

Разница между формами остаётся заметной: Box сильнее, экстремальная Longneck слабее. Нельзя называть это равными шансами всех рисунков. Новый камбэк устраняет раннюю предрешённость лучше, но не завершает баланс произвольной пользовательской геометрии.

В 2 000 гонках с одинаковой формой на всех дорожках победы по местам старта: до ${before.equalSeatWins.join(' / ')}, после ${after.equalSeatWins.join(' / ')}. Дорожки и seeded variation остаются разными; это проверка грубого перекоса стартовых мест.

## Четыре найденных примера

Примеры выбраны поиском по рассчитанной выборке; их исход не задавался. Кнопки момента только перематывают запись.

${examples.entries.map(e=>`- [${e.category}](https://draw-race-party.breid222.chatgpt.site/?example=${e.key}) — seed ID ${e.id}. ${e.description}`).join('\n')}

Для примера с барьером есть отдельная физическая симуляция: тот же seed, те же лошади и правила, удалён только один барьер. Она меняет победителя. Это проверяемое «что если», а не альтернативный монтаж исходной записи.

## Проверки и воспроизводимость

28 автоматических тестов: силы всех шести усилений; постепенный ритм; лимиты и паузы; физические затраты; зоны; формула 30/70; идентичная запись; FINAL PUSH; комнаты 2/4, синхронность, фиксация рисунка, права и хранение; старый v5 replay. Независимый пересчёт выявляет изменённый рейтинг даже после повторного хеширования ленты. Отдельно проверяются TypeScript, обе сборки, HTTP/WebSocket и интерфейс в Chromium. В Chromium обнаружено расхождение независимого пересчёта: при одинаковых параметрах и трассе траектории и победитель отличились от Node. Поэтому проверку между средами нельзя считать универсальным доказательством честности; исходная серверная запись и её проигрывание при этом сохраняются. Проверка полной идентичности проходит в эталонной Node-среде.

Основной seed: SHA-256 от строки draw-race-comeback-study-1:<id>, id 0…9999. Каждая пятая гонка использует одну форму на всех четырёх местах, остальные — четыре из пяти форм с циклической перестановкой. Трасса id % 3. Базовая модель — сохранённый исходный движок до правок. После изменены и камбэки, и длина/препятствия трассы; основной замер оценивает всё обновление. Изоляцию возможностей на новой трассе даёт отдельная абляция.

Команды воспроизведения находятся в README. CSV содержит seed, формы, победителя, отрывы и лидеров на 30/45/65 с, смены, падения, прыжки, контакты, финиши и дистанции. Итоги, абляции и SHA-256 исходников сохранены рядом. Ни один из 10 000 прогонов не дал нестабильного или нечислового состояния.

## Практические ограничения

Повтор воспроизводит серверную запись, не вычисляет исход заново на каждом клиенте. Проверка хеша — целостность; независимый пересчёт — более сильная проверка правил. Сервер всё ещё может прервать комнату, а различия floating point между JS-движками могут влиять на локальный пересчёт. Это не on-chain proof и не VRF. Ставки, escrow и выплаты отключены.

Повороты меняют сцепление/нагрузку в боковой физике; свободного 3D-управления нет. RISKY SHORTCUT — ускоряющий участок отдельной дорожки, а не сокращённая геометрическая ветка. Отбор примеров не является оценкой частоты камбэков — её показывают таблицы выше.
`;
await mkdir(out,{recursive:true});await writeFile(root+'/BALANCE.md',report);await writeFile(out+'/DRAW-RACE-TESTS.md',report);await copyFile('README.md',out+'/DRAW-RACE-README.md');
for(const name of ['before-summary','after-summary','candidate1-summary','ablation','candidate1-ablation','showcases','provenance'])await copyFile(root+'/'+name+'.json',data+'/'+name+'.json');
console.log(JSON.stringify({report:root+'/BALANCE.md',csvRows:rows.map(r=>r.length),data}));
