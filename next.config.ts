import path from "node:path";
import type { NextConfig } from "next";

const vercelCloudflareShim = path.resolve("app/lib/vercel-cloudflare-shim.ts");

const nextConfig: NextConfig = {
  turbopack: process.env.VERCEL
    ? { resolveAlias: { "cloudflare:workers": "./app/lib/vercel-cloudflare-shim.ts" } }
    : undefined,
  ...(process.env.VERCEL ? {
    webpack(config) {
      config.resolve.alias["cloudflare:workers"] = vercelCloudflareShim;
      return config;
    },
  } : {}),
};

export default nextConfig;
