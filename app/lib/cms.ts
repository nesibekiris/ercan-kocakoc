import {cache} from 'react';
import {env} from 'cloudflare:workers';
import {defaultArchive} from './archive-seed';
import {seedPages,defaultSettings} from './seed';
import {getChatGPTUser} from '../chatgpt-auth';
import type {PageRecord,Settings,Archive} from './types';
import {applyPageSeo,applyVideoSeo} from './content-seo';
export function db(){if(!env.DB)throw new Error('Veritabanı bağlantısı bulunamadı.');return env.DB;}
export const getPages=cache(async (all=false):Promise<PageRecord[]>=>{
 const {results}=env.DB?await db().prepare("SELECT key, value FROM documents WHERE key LIKE 'page:%'").all<{key:string;value:string}>():{results:[] as {key:string;value:string}[]};
 const map=new Map(seedPages.map(p=>[p.slug,p]));for(const r of results)map.set(r.key.slice(5),JSON.parse(r.value));
 return [...map.values()].filter(p=>all?p.status!=='deleted':p.status==='published').map(applyPageSeo);
});
export const getSettings=cache(async ():Promise<Settings>=>{const row=env.DB?await db().prepare('SELECT value FROM documents WHERE key = ?').bind('settings').first<{value:string}>():null;return {...defaultSettings,...(row?JSON.parse(row.value):{})};});
export async function getPage(slug:string){return (await getPages()).find(p=>p.slug===slug);}
export async function admin(){
 const user=await getChatGPTUser();if(!user)return null;
 if(!env.DB)return null;
 const config=env as unknown as {CMS_ADMIN_EMAIL?:string;CMS_PRIVATE_SETUP?:string};
 if(config.CMS_ADMIN_EMAIL)return config.CMS_ADMIN_EMAIL.toLowerCase()===user.email.toLowerCase()?user:null;
 let row=await db().prepare('SELECT value FROM documents WHERE key = ?').bind('cms:owner').first<{value:string}>();
 // The control plane enables this only for the newly created, owner-private Site.
 // Persist the first authenticated owner; later users never gain administration.
 if(!row&&config.CMS_PRIVATE_SETUP==='1'){
  await db().prepare('INSERT INTO documents (key,value,updated_at) VALUES (?,?,?) ON CONFLICT(key) DO NOTHING').bind('cms:owner',user.userId,new Date().toISOString()).run();
  row=await db().prepare('SELECT value FROM documents WHERE key = ?').bind('cms:owner').first<{value:string}>();
 }
 return row?.value===user.userId?user:null;
}
export function safeJSON(data:unknown){return JSON.stringify(data).replace(/</g,'\\u003c');}
export function absolute(s:Settings,path=''){return s.siteUrl.replace(/\/$/,'')+(path.startsWith('/')?path:'/'+path);}

export const getArchive=cache(async ():Promise<Archive>=>{const row=env.DB?await db().prepare('SELECT value FROM documents WHERE key = ?').bind('archive').first<{value:string}>():null;const archive:Archive=row?JSON.parse(row.value):defaultArchive;return {...archive,videos:archive.videos.map(applyVideoSeo)};});
