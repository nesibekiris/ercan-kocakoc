import cards from './social-images.json';
import {imageSize} from './images';
import type {PageRecord} from './types';

type Card={url:string;width:number;height:number;title:string;source:string;pageTitle:string|null};
const images:Record<string,Card>=cards;
export function socialImage(path:string,page:PageRecord|undefined,en:boolean){
 const card=images[path];
 // A later CMS edit must not retain an image containing an outdated title or cover.
 const current=page?.coverImage||page?.image;
 if(card&&(!page||(card.pageTitle===(en?page.titleEn:page.title)&&(!current||current===card.source))))return {url:card.url,width:card.width,height:card.height,alt:card.title+' · Prof. Dr. Ercan Kocakoç',type:'image/jpeg'};
 if(current)return {url:current,...imageSize(current),alt:page?.coverImageAlt||page?.imageAlt||'Prof. Dr. Ercan Kocakoç'};
 return {url:'/images/social.jpg',width:1200,height:630,alt:'Prof. Dr. Ercan Kocakoç',type:'image/jpeg'};
}
