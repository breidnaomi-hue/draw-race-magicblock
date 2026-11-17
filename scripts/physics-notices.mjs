import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
const blocks=new Set(),notices=[];
for(const name of await readdir('node_modules/@stdlib')){
  const root='node_modules/@stdlib/'+name+'/';
  try{notices.push('Package: @stdlib/'+name+'\n'+await readFile(root+'NOTICE','utf8'));}catch{}
  try{const main=await readFile(root+'lib/main.js','utf8'),header=main.match(/^\/\*\*[\s\S]*?\*\//);if(header)blocks.add(header[0]);}catch{}
}
await mkdir('public/licenses',{recursive:true});
await writeFile('public/licenses/stdlib-NOTICES.txt',notices.join('\n\n---\n\n'));
await writeFile('public/licenses/stdlib-LICENSE-HEADERS.txt',Array.from(blocks).join('\n\n---\n\n'));
await writeFile('public/licenses/stdlib-Apache-2.0.txt',await readFile('node_modules/@stdlib/math-base-special-sin/LICENSE'));
await writeFile('public/licenses/matter-js-MIT.txt',await readFile('node_modules/matter-js/LICENSE'));
