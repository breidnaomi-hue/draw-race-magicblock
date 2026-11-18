import handler from "vinext/server/fetch-handler";
import { runWithConnectorBinding } from "../lib/connector-context";
import type { ConnectorBinding } from "../lib/connector-contract.mjs";
import { api, response } from '../lib/rooms';
import { D1Store } from '../lib/d1-store';
import {MagicBlockVrf} from '../lib/solana-vrf';
import {PlayerProfiles,profileApi} from '../lib/player-profile';
import {D1ProfileDatabase} from '../lib/profile-store';
import {SolEscrow} from '../lib/sol-escrow';
const profilesByDatabase=new WeakMap<D1Database,PlayerProfiles>();

const worker = {
  fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext<{ CONNECTORS?: ConnectorBinding }>) {
    if(new URL(request.url).pathname.startsWith('/api/')) {
      if(!env.DB)return response({error:'Room service is not configured.'},503);
      if(request.method==='POST'&&request.headers.get('origin')&&request.headers.get('origin')!==new URL(request.url).origin)return response({error:'Origin not allowed'},403);
      let profiles=profilesByDatabase.get(env.DB);if(!profiles){profiles=new PlayerProfiles(new D1ProfileDatabase(env.DB));profilesByDatabase.set(env.DB,profiles);}
      if(new URL(request.url).pathname.startsWith('/api/profile')){
        return profileApi(request,profiles,new D1Store(env.DB));
      }
      return api(request,new D1Store(env.DB),'poll',new MagicBlockVrf(env),{service:new SolEscrow(env),verifiedWallet:token=>profiles!.verifiedWallet(token)});
    }
    let binding = ctx.props?.CONNECTORS;
    // Local preview emulates the same request-scoped capability. This branch and
    // the auxiliary service binding are absent from production builds.
    if (import.meta.env.DEV && !binding && env.CONNECTORS) {
      const preview = env.CONNECTORS;
      const expiresAt = Date.now() + 60_000;
      binding = {
        async getContext() {
          if (Date.now() >= expiresAt) return { status: "request_context_expired" };
          return preview.getContext?.() ?? { status: "binding_unavailable" };
        },
        async invoke(connectorId, actionName, args) {
          if (Date.now() >= expiresAt) {
            return { status: "request_context_expired", message: "This request has expired. Please try again." };
          }
          return preview.invoke(connectorId, actionName, args);
        },
      };
    }
    return runWithConnectorBinding(binding, () => handler.fetch(request, env, ctx));
  },
};

export default worker;
