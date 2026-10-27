import Icon from './Icon';
import {Baby,Activity,ScanLine,Scan,Stethoscope,Droplets} from 'lucide-react';
import type {PageRecord} from '../lib/types';

const topics=[
 {key:'gebelik-ultrasonu',icon:Baby,tr:'Gebelik ultrasonu',en:'Pregnancy ultrasound',detail:'Anne ve bebek',detailEn:'Mother and baby'},
 {key:'karaciger-ultrasonu',icon:Activity,tr:'Karaciğer ultrasonu',en:'Liver ultrasound',detail:'Karaciğer ve safra yolları',detailEn:'Liver and bile ducts'},
 {key:'meme-ultrasonu',icon:ScanLine,tr:'Meme ultrasonu',en:'Breast ultrasound',detail:'Meme dokusu',detailEn:'Breast tissue'},
 {key:'karin-ultrasonu',icon:Scan,tr:'Karın ultrasonu',en:'Abdominal ultrasound',detail:'Karın içi organlar',detailEn:'Abdominal organs'},
 {key:'tiroid-ultrasonu',icon:Stethoscope,tr:'Tiroid ultrasonu',en:'Thyroid ultrasound',detail:'Tiroid bezi ve boyun',detailEn:'Thyroid and neck'},
 {key:'uriner-sistem-ve-urogenital-ultrason',icon:Droplets,tr:'Ürogenital ultrason',en:'Genitourinary ultrasound',detail:'Böbrek ve üriner sistem',detailEn:'Kidneys and urinary tract'},
];

export default function UltrasoundTopics({pages,en=false}:{pages:PageRecord[];en?:boolean}){
 const pre=en?'/en':'';
 return <section className="ultrasound-overview ultrasound-topics"><div className="wrap">
  <div className="ultrasound-overview-heading"><div><span className="eyebrow">{en?'ULTRASOUND EXAMINATIONS':'ULTRASON İNCELEMELERİ'}</span><h2>{en?'Explore by organ and region':'Organ ve bölgeye göre inceleyin'}</h2></div><a className="text-link" href={pre+'/ultrason-girisimsel-radyoloji'}>{en?'All ultrasound topics':'Tüm ultrason başlıkları'}<Icon name="arrow" size={16}/></a></div>
  <div className="ultrasound-organ-grid">{topics.filter(t=>pages.some(p=>p.slug==='ultrason-girisimsel-radyoloji/'+t.key)).map(t=><a href={pre+'/ultrason-girisimsel-radyoloji/'+t.key} className="organ-tile" key={t.key}><div className="topic-symbol" aria-hidden="true"><t.icon size={24} strokeWidth={1.6}/></div><span className="organ-label">{en?t.en:t.tr}</span><small>{en?t.detailEn:t.detail}</small><Icon name="arrow" size={16}/></a>)}</div>
 </div></section>;
}
