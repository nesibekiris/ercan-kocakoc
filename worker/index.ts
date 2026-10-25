import {englishLegacyPaths} from '../app/lib/legacy-paths';
import handler from "vinext/server/fetch-handler";
import { runWithConnectorBinding } from "../lib/connector-context";
import type { ConnectorBinding } from "../lib/connector-contract.mjs";

const worker = {
  fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext<{ CONNECTORS?: ConnectorBinding }>) {
    const url = new URL(request.url);
    const isEnglish=url.pathname.startsWith('/en/');
    const slug=(isEnglish?url.pathname.slice(4):url.pathname.slice(1)).replace(/\/$/,'');
    const prefix=isEnglish?'/en':'';
    let target=isEnglish&&englishLegacyPaths[slug]?'/en/'+englishLegacyPaths[slug]:null;
    if(['index','index.html'].includes(slug))target=prefix||'/';
    if(slug==='videolar')target=prefix+'/video-galeri';
    if(slug==='tedaviler/transarteriyal-radyoembolizasyon')target=prefix+'/tedaviler/radyoembolizasyon-tedavisi';
    if(target)return new Response(null,{status:308,headers:{Location:target+url.search}});
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
