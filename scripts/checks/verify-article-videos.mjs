import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync('app/lib/seed.ts','utf8');
const pages=JSON.parse(source.split('export const seedPages:PageRecord[] = ')[1].split(';\nexport const defaultSettings')[0]);
const archive=JSON.parse(fs.readFileSync('app/lib/archive-seed.ts','utf8').split('export const defaultArchive:Archive = ')[1].trim().replace(/;$/,''));
const {articleVideoIds,relatedArticleVideos}=await import('../../app/lib/article-videos.ts');
const {applyEditorialReview}=await import('../../app/lib/content-editorial.ts');
const covered=new Set();
for(const [slug,ids] of Object.entries(articleVideoIds)){
 assert(pages.some(p=>p.slug===slug&&p.status==='published'),'Published article '+slug);
 assert.equal(new Set(ids).size,ids.length,'No duplicate videos in '+slug);
 for(const id of ids){assert(archive.videos.some(v=>v.id===id),'Existing video '+id);covered.add(id);}
 assert.equal(relatedArticleVideos(slug,archive.videos).length,ids.length);
}
assert.equal(covered.size,15,'Every archive video has a corresponding article');
assert.deepEqual(relatedArticleVideos('ultrason-girisimsel-radyoloji/meme-ultrasonu',archive.videos),[],'No unrelated breast ultrasound video');
assert(!articleVideoIds['tedaviler/radyoembolizasyon-tedavisi'].includes('oukB8wqUnGA'),'TACE-only clip is not attached to TARE');
const journal=JSON.parse(fs.readFileSync('content/editorial-review-2026-10-28.json','utf8'));
const breast=journal.revisions.find(r=>r.slug.endsWith('/meme-ultrasonu'));
assert.equal(applyEditorialReview(breast.before).content,breast.after.content,'Legacy CMS text is migrated');
const edited={...breast.before,content:'A later physician-approved custom text',contentEn:'A later edited English text'};
assert.deepEqual(applyEditorialReview(edited),edited,'Later CMS edits are preserved');
assert(!breast.after.content.includes('parankimden yoğun'));
assert(!breast.after.content.includes('5-7 gün'));
assert(breast.after.content.includes('mamografinin yerini almaz'));
console.log('PASS: 15 videos mapped to published articles; unrelated clips excluded; legacy text migration and later CMS edits verified.');
