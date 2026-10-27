import type {VideoRecord} from './types';

// Explicit subject matches. Never infer a match from a broad CMS category.
export const articleVideoIds:Record<string,string[]>={
 'biyopsi/prostat-fuzyon-biyopsi':['z1Qntrc_4ac'],
 'blog/prostat-fuzyon-biyopsi-nedir':['z1Qntrc_4ac'],
 'blog/biyopsi-oncesi-hangi-sorulari-sormalisiniz':['ThwQSg278X0'],
 'biyopsi/akciger-biyopsi':['BDPGDgOGalg'],
 'biyopsi/lenf-bezi-biyopsi':['ivrXSzDNpVk'],
 'biyopsi/tiroid-biyopsi':['UvUPTOXD1uQ'],
 'tedaviler/karaciger-tumor-ablasyon-tedavisi':['BV3nDCJdBDY','rG-F8sV4U3E','jG9wz33S_ak'],
 'tedaviler/diger-bolgelerdeki-tumor-embolizasyonu':['M-rNAfF35W8','wWxUEdUHtcE'],
 'tedaviler/kemoembolizasyon':['oukB8wqUnGA','CMmy3SpZ_W4'],
 'tedaviler/radyoembolizasyon-tedavisi':['CMmy3SpZ_W4'],
 'blog/girisimsel-radyoloji-nedir':['XcmZVLOTQIs'],
 'blog/kanser-taramasi-ve-tani':['b3LKpmqd9zA'],
 'blog/ercan-kocakoc-medico-tv-soylesisi':['snUnd3uf-mI'],
};
export function relatedArticleVideos(slug:string,videos:VideoRecord[]){
 const ids=articleVideoIds[slug]||[];
 return ids.flatMap(id=>videos.filter(v=>v.id===id&&v.status==='published'));
}
