import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const pkg=JSON.parse(await readFile(new URL('../node_modules/matter-js/package.json',import.meta.url),'utf8'));
if(pkg.version!=='0.20.0')throw Error('Review the physics vendor before changing Matter.js');
const original=await readFile(new URL('../node_modules/matter-js/build/matter.js',import.meta.url),'utf8');
const header="// DRAW RACE: private deterministic Math; upstream engine code below is unchanged.\nconst Math = require('../lib/physics-math.cjs');\n";
const target=new URL('../vendor/matter.cjs',import.meta.url);
if(process.argv.includes('--check')){
  if(await readFile(target,'utf8')!==header+original)throw Error('Vendored Matter differs from the pinned engine plus the private Math binding');
  console.log('Pinned Matter source verified.');
  process.exit(0);
}
await writeFile(target,header+original);
await writeFile(new URL('../vendor/matter-provenance.json',import.meta.url),JSON.stringify({package:'matter-js',version:pkg.version,source:'build/matter.js',upstreamSha256:createHash('sha256').update(original).digest('hex'),modification:'Prepend a module-local Math binding; upstream source is otherwise byte-identical.'},null,2)+'\n');
console.log('Vendored Matter.js 0.20.0 with module-local deterministic math.');
