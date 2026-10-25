import {englishLegacyPaths} from '../lib/legacy-paths';
import {notFound,permanentRedirect} from 'next/navigation';
import type {Metadata} from 'next';
import {getPages,getSettings,getArchive,absolute} from '../lib/cms';
import {Home,Article,Contact,Privacy,Shell,StructuredData} from '../components/Site';
import Icon from '../components/Icon';
import {ArchivePage,archiveTitles} from '../components/ArchivePages';
export const dynamic='force-dynamic';
function parse(path:string[]=[]){const en=path[0]==='en';return {en,slug:(en?path.slice(1):path).join('/')};}
export async function generateMetadata({params}:{params:Promise<{path?:string[]}>}):Promise<Metadata>{
 const {en,slug}=parse((await params).path);const [s,pages]=await Promise.all([getSettings(),getPages()]);const page=pages.find(p=>p.slug===slug);
 const title=archiveTitles[slug]?archiveTitles[slug][en?1:0]+' | '+s.name:page?(en?(page.seoTitleEn||page.titleEn+' | '+s.name):page.seoTitle):slug==='iletisim'?(en?'Contact & appointments':'İletişim ve randevu')+' | '+s.name:slug==='gizlilik'?(en?'Privacy':'Gizlilik')+' | '+s.name:en?s.name+' | Interventional Radiology, Istanbul':s.seoTitle;
 const description=archiveTitles[slug]?archiveTitles[slug][en?3:2]:page?(en?(page.seoDescriptionEn||page.summaryEn):page.seoDescription):en?s.heroSummaryEn:s.seoDescription;
 const path=slug?'/'+slug:'';const url=absolute(s,(en?'/en':'')+path);const isArticle=page&&['article','blog'].includes(page.kind);const image=page?.coverImage||page?.image||'/images/social.jpg';const imageAlt=page?.coverImageAlt||page?.imageAlt||s.name;
 return {title,description,alternates:{canonical:url,languages:{tr:absolute(s,path),en:absolute(s,'/en'+path),'x-default':absolute(s,path)}},robots:{index:s.indexing,follow:s.indexing},...(s.googleSiteVerification?{verification:{google:s.googleSiteVerification}}:{}),openGraph:{type:isArticle?'article':'website',title,description,url,siteName:s.name,locale:en?'en_GB':'tr_TR',alternateLocale:en?'tr_TR':'en_GB',images:[{url:absolute(s,image),alt:imageAlt}]},twitter:{card:'summary_large_image',title,description,images:[absolute(s,image)]}};
}
export default async function Page({params}:{params:Promise<{path?:string[]}>}){const {en,slug}=parse((await params).path);const pre=en?'/en':'';if(en&&englishLegacyPaths[slug])permanentRedirect('/en/'+englishLegacyPaths[slug]);if(['index','index.html'].includes(slug))permanentRedirect(pre||'/');if(slug==='tedaviler/transarteriyal-radyoembolizasyon')permanentRedirect(pre+'/tedaviler/radyoembolizasyon-tedavisi');if(slug==='videolar')permanentRedirect(pre+'/video-galeri');const [s,pages,archive]=await Promise.all([getSettings(),getPages(),getArchive()]);const page=pages.find(p=>p.slug===slug);if(!slug)return <><StructuredData s={s} en={en}/><Home s={s} pages={pages} archive={archive} en={en}/></>;if(archiveTitles[slug])return <><StructuredData s={s} en={en}/><ArchivePage slug={slug} s={s} pages={pages} archive={archive} en={en}/></>;if(slug==='iletisim')return <><StructuredData s={s} en={en}/><Contact s={s} en={en}/></>;if(slug==='gizlilik')return <Privacy s={s} en={en}/>;if(!page)notFound();return <><StructuredData s={s} page={page} en={en}/><Article s={s} pages={pages} page={page} en={en}/></>;}
