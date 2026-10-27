import Icon from './Icon';
import type {PageRecord} from '../lib/types';

const topics=[
 {key:'gebelik-ultrasonu',tr:'Gebelik ultrasonu',en:'Pregnancy ultrasound',detail:'Anne ve bebek',detailEn:'Mother and baby'},
 {key:'karaciger-ultrasonu',tr:'Karaciğer ultrasonu',en:'Liver ultrasound',detail:'Karaciğer ve safra yolları',detailEn:'Liver and bile ducts'},
 {key:'meme-ultrasonu',tr:'Meme ultrasonu',en:'Breast ultrasound',detail:'Meme dokusu',detailEn:'Breast tissue'},
 {key:'karin-ultrasonu',tr:'Karın ultrasonu',en:'Abdominal ultrasound',detail:'Karın içi organlar',detailEn:'Abdominal organs'},
 {key:'tiroid-ultrasonu',tr:'Tiroid ultrasonu',en:'Thyroid ultrasound',detail:'Tiroid bezi ve boyun',detailEn:'Thyroid and neck'},
 {key:'uriner-sistem-ve-urogenital-ultrason',tr:'Ürogenital ultrason',en:'Genitourinary ultrasound',detail:'Böbrek ve üriner sistem',detailEn:'Kidneys and urinary tract'},
];

/** Decorative topic symbols, not diagnostic anatomy illustrations. */
function OrganSymbol({name}:{name:string}){
 return <div className="organ-symbol" aria-hidden="true"><svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
  {name==='gebelik-ultrasonu'&&<><path d="M23 11c-1 8-5 12-7 17-4 11 1 24 13 27 11 3 23-4 24-15 1-10-5-16-13-19-6-2-10-6-10-10"/><circle cx="35" cy="32" r="5"/><path d="M29 38c-6 1-8 8-3 11 4 3 11 0 13-5M32 43l7-1M19 26l8-4"/></>}
  {name==='karaciger-ultrasonu'&&<><path d="M8 25c5-9 17-11 28-8l19 5c3 1 4 5 1 7-6 5-13 6-20 7-9 2-16 5-23 10-3 2-6 0-6-3l1-18Z" fill="currentColor" fillOpacity=".07"/><path d="m34 18-7 18M13 34c4-5 9-8 16-10M38 34l-1 7c0 3-5 3-5 0l1-6"/></>}
  {name==='meme-ultrasonu'&&<><path d="M22 10c0 9-4 12-8 16M42 10c0 9 4 12 8 16M14 26c-3 8-3 19 1 28M50 26c3 8 3 19-1 28M32 24v15"/><path d="M16 31c4-3 11-1 12 5 1 7-5 11-12 8M48 31c-4-3-11-1-12 5-1 7 5 11 12 8M25 50h14"/><path d="M19 37h2M43 37h2"/></>}
  {name==='karin-ultrasonu'&&<><path d="M20 9c0 7-3 12-5 17-3 9-2 19 2 29M44 9c0 7 3 12 5 17 3 9 2 19-2 29M22 14h20"/><path d="M24 28c-6 2-5 10 0 11h16c5 1 5 8 0 9H24M24 34h16c5 0 5 7 0 7H25M32 18v5M32 52v3"/></>}
  {name==='tiroid-ultrasonu'&&<><path d="M25 9v12M39 9v12M20 52h24M29 12h6M29 17h6"/><path d="M29 28c-5-2-9-10-14-8-5 3-5 18-1 24 4 6 12 3 15-3h6c3 6 11 9 15 3 4-6 4-21-1-24-5-2-9 6-14 8Z" fill="currentColor" fillOpacity=".07"/><path d="M29 28v13M35 28v13M21 28c-2 3-2 8 0 11M43 28c2 3 2 8 0 11"/></>}
  {name==='uriner-sistem-ve-urogenital-ultrason'&&<><path d="M21 12c-9-2-15 7-14 16 1 8 8 12 13 8 4-3 3-6 0-9-3-4 7-11 1-15ZM43 12c9-2 15 7 14 16-1 8-8 12-13 8-4-3-3-6 0-9 3-4-7-11-1-15Z" fill="currentColor" fillOpacity=".07"/><path d="M22 29c5 3 4 11 5 17M42 29c-5 3-4 11-5 17M25 46c-3 2-2 8 1 10 3 2 9 2 12 0 3-2 4-8 1-10-4-3-10-3-14 0ZM32 58v3"/></>}
 </svg></div>;
}

export default function UltrasoundTopics({pages,en=false}:{pages:PageRecord[];en?:boolean}){
 const pre=en?'/en':'';
 return <section className="ultrasound-overview ultrasound-topics"><div className="wrap">
  <div className="ultrasound-overview-heading"><div><span className="eyebrow">{en?'ULTRASOUND EXAMINATIONS':'ULTRASON İNCELEMELERİ'}</span><h2>{en?'Explore by organ and region':'Organ ve bölgeye göre inceleyin'}</h2></div><a className="text-link" href={pre+'/ultrason-girisimsel-radyoloji'}>{en?'All ultrasound topics':'Tüm ultrason başlıkları'}<Icon name="arrow" size={16}/></a></div>
  <div className="ultrasound-organ-grid">{topics.filter(t=>pages.some(p=>p.slug==='ultrason-girisimsel-radyoloji/'+t.key)).map(t=><a href={pre+'/ultrason-girisimsel-radyoloji/'+t.key} className="organ-tile" key={t.key}><OrganSymbol name={t.key}/><span className="organ-label">{en?t.en:t.tr}</span><small>{en?t.detailEn:t.detail}</small><Icon name="arrow" size={16}/></a>)}</div>
 </div></section>;
}
