import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {WebSocketServer,WebSocket} from 'ws';
import {FileStore} from './file-store';
import {api} from '../lib/rooms';
import {MagicBlockVrf} from '../lib/solana-vrf';
const vrf=new MagicBlockVrf({VRF_PROGRAM_ID:process.env.VRF_PROGRAM_ID,VRF_SPONSOR_SEED:process.env.VRF_SPONSOR_SEED,SOLANA_RPC_URL:process.env.SOLANA_RPC_URL});
const store=new FileStore(resolve(process.env.ROOM_DATA||'room-data'));
const root=resolve('standalone-dist'),port=Number(process.env.PORT||8788),rate=new Map<string,{count:number;until:number}>();
const server=createServer(async(req,res)=>{
  try{
    const host=req.headers.host||'localhost:'+port,path=new URL(req.url||'/',`http://${host}`).pathname;
    if(req.method==='POST'&&req.headers.origin&&new URL(req.headers.origin).host!==host){res.writeHead(403);res.end('Origin not allowed');return}
    const ip=req.socket.remoteAddress||'local',r=rate.get(ip)||{count:0,until:Date.now()+60000};if(Date.now()>r.until){r.count=0;r.until=Date.now()+60000}r.count++;rate.set(ip,r);if(r.count>400){res.writeHead(429);res.end('Too many requests');return}
    if(path.startsWith('/api/')){
      const chunks:Buffer[]=[];let length=0;for await(const chunk of req){length+=chunk.length;if(length>650000){res.writeHead(413);res.end('Drawing too large');return}chunks.push(Buffer.from(chunk))}
      const headers=new Headers();for(const [k,v] of Object.entries(req.headers))if(v)headers.set(k,Array.isArray(v)?v.join(','):v);
      const request=new Request(`http://${host}${req.url}`,{method:req.method,headers,...(chunks.length?{body:Buffer.concat(chunks)}:{})});
      const response=await api(request,store,'websocket',vrf);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
      const match=path.match(/\/api\/rooms\/([A-Z2-9]{6})\//);if(req.method==='POST'&&response.ok&&match)broadcast(match[1]);return;
    }
    let file=resolve(root,'.'+decodeURIComponent(path));if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return}
    try{if((await stat(file)).isDirectory())file=resolve(file,'index.html')}catch{file=resolve(root,'index.html')}
    const data=await readFile(file),types:Record<string,string>={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.woff2':'font/woff2'};
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(data);
  }catch(e){res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Server error'}));console.error(e)}
});
const wss=new WebSocketServer({noServer:true,maxPayload:2048}),subscriptions=new Map<WebSocket,string>();
server.on('upgrade',(req,socket,head)=>{if(req.url!=='/ws'||(req.headers.origin&&new URL(req.headers.origin).host!==req.headers.host)){socket.destroy();return}wss.handleUpgrade(req,socket,head,ws=>wss.emit('connection',ws,req))});
wss.on('connection',ws=>{const timeout=setTimeout(()=>{if(!subscriptions.has(ws))ws.close()},5000);ws.on('message',async raw=>{try{const {code,token}=JSON.parse(raw.toString());if(!/^[A-Z2-9]{6}$/.test(code))return ws.close();const room=await store.get(code);if(!room||!room.players.some(p=>p.token===token))return ws.close();subscriptions.set(ws,code);clearTimeout(timeout);ws.send(JSON.stringify({changed:code}))}catch{ws.close()}});ws.on('close',()=>{subscriptions.delete(ws);clearTimeout(timeout)})});
function broadcast(code:string){for(const [ws,c] of subscriptions)if(c===code&&ws.readyState===WebSocket.OPEN)ws.send(JSON.stringify({changed:code}))}
setInterval(()=>{for(const [key,value] of rate)if(value.until<Date.now())rate.delete(key)},60000).unref();
server.listen(port,process.env.HOST||'0.0.0.0',()=>console.log(`DRAW RACE server http://localhost:${port}`));
function shutdown(){wss.clients.forEach(ws=>ws.close());server.close(()=>process.exit(0))}process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
