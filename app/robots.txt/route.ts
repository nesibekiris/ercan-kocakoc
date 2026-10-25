import {getSettings,absolute} from '../lib/cms';
export async function GET(){const s=await getSettings();return new Response(s.indexing?'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: '+absolute(s,'sitemap.xml')+'\n':'User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-cache'}});}
