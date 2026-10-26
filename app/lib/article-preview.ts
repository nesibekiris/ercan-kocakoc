import type {PageRecord} from './types';
export type ArticlePreview=Pick<PageRecord,'slug'|'title'|'titleEn'|'summary'|'summaryEn'|'category'|'kind'|'source'|'image'|'imageAlt'|'coverImage'|'coverImageAlt'>&{readingMinutes:number;readingMinutesEn:number};
export function articlePreview(p:PageRecord):ArticlePreview{const {slug,title,titleEn,summary,summaryEn,category,kind,source,image,imageAlt,coverImage,coverImageAlt}=p;return {slug,title,titleEn,summary,summaryEn,category,kind,source,image,imageAlt,coverImage,coverImageAlt,readingMinutes:Math.max(1,Math.ceil(p.content.split(/\s+/).length/180)),readingMinutesEn:Math.max(1,Math.ceil(p.contentEn.split(/\s+/).length/180))}}
export type ExpertisePage=Pick<PageRecord,'slug'|'title'|'titleEn'|'category'|'kind'>;
export function expertisePage(p:PageRecord):ExpertisePage{return {slug:p.slug,title:p.title,titleEn:p.titleEn,category:p.category,kind:p.kind}}
