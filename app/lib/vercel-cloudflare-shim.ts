/**
 * Build/runtime compatibility for the public Vercel mirror.
 * The authoritative Sites deployment injects real D1/R2 bindings.
 */
export const env: {
  DB?: D1Database;
  BUCKET?: R2Bucket;
  CMS_ADMIN_EMAIL?: string;
  CMS_PRIVATE_SETUP?: string;
} = {};
