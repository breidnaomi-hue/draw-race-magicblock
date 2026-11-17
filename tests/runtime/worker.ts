import {simulate} from '../../lib/physics';
export default {async fetch(request:Request){
  const input=await request.json() as any,race=input.race||input;
  const specs=race.players.map((p:any)=>p.spec);
  const tape=simulate(race.seed,race.players.map((p:any)=>p.drawing),race.players.map((p:any)=>p.rig),race.track,{specs:specs.every(Boolean)?specs:undefined});
  return Response.json({tape});
}};
