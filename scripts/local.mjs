import {spawn} from 'node:child_process';
const workers=[spawn(process.execPath,['--import','tsx','--watch','server/node.ts'],{stdio:'inherit'}),spawn(process.execPath,['node_modules/vite/bin/vite.js','--config','vite.standalone.config.ts'],{stdio:'inherit'})];
const stop=()=>workers.forEach(p=>p.kill());process.on('SIGINT',stop);process.on('SIGTERM',stop);workers.forEach(p=>p.on('exit',code=>{if(code)stop()}));
