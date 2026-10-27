import journal from '../../content/editorial-review-2026-10-28.json' with {type:'json'};
import type {PageRecord} from './types';

// Upgrade the known legacy CMS text without overwriting later administrator edits.
const revisions=new Map(journal.revisions.map(r=>[r.slug,r]));
export function applyEditorialReview(page:PageRecord):PageRecord{
 const revision=revisions.get(page.slug);
 if(!revision)return page;
 const tr=page.content===revision.before.content;
 const en=page.contentEn===revision.before.contentEn;
 if(!tr&&!en)return page;
 return {...page,...(tr?{content:revision.after.content}:{}),...(en?{contentEn:revision.after.contentEn}:{}),updatedAt:'2026-10-28'};
}
