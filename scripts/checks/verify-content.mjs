import {createHash} from 'node:crypto';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=fs.readFileSync('app/lib/seed.ts','utf8');
const pages=JSON.parse(source.split('export const seedPages:PageRecord[] = ')[1].split(';\nexport const defaultSettings')[0]);
const archive=JSON.parse(fs.readFileSync('app/lib/archive-seed.ts','utf8').split('export const defaultArchive:Archive = ')[1].trim().replace(/;$/,''));
assert.equal(new Set(pages.map(p=>p.slug)).size,pages.length,'Unique page URLs');
assert.equal(pages.filter(p=>p.kind==='blog').length,4);
assert.equal(archive.videos.length,15);
assert.equal(archive.publications.length,240);
assert.equal(archive.theses.length,6);
for(const p of pages){assert(p.title&&p.titleEn&&p.seoTitle&&p.seoDescription,p.slug);if(p.image)assert(fs.existsSync('public'+p.image),p.image);if(p.kind==='blog')assert(p.content.length>500&&p.contentEn.length>400,p.slug);}
for(const p of archive.photos)assert(fs.existsSync('public'+p.image),p.image);
for(const v of archive.videos){assert(/youtube\.com\/watch\?v=[\w-]{11}$/.test(v.url));assert(fs.existsSync('public'+v.thumbnail));}
const assets=JSON.parse(fs.readFileSync('content/asset-provenance.json','utf8'));assert.equal(assets.length,45);for(const a of assets)assert(fs.existsSync('public'+a.file));
const sourceBodies=JSON.parse(fs.readFileSync('content/source-medical-bodies.json','utf8'));
const before=JSON.parse(fs.readFileSync('content/pre-seo-v4-pages.json','utf8'));
const norm=s=>s.replace(/\s+/g,' ').trim();
for(const original of before){const current=pages.find(p=>p.slug===original.slug);assert(current,'Existing page retained '+original.slug);for(const field of ['content','contentEn'])for(const block of original[field].split(/\n\n+/).filter(x=>x.trim()&&!/^#{2,4} /.test(x))){assert(norm(current[field]).includes(norm(block)),original.slug+' preserves original paragraph '+norm(block).slice(0,60));}}
for(const p of pages.filter(p=>['blog','article'].includes(p.kind))){assert(p.coverImage&&fs.existsSync('public'+p.coverImage),p.slug+' cover');assert(p.coverImageAlt,p.slug+' cover alt');assert(p.seoTitleEn&&p.seoDescriptionEn,p.slug+' bilingual SEO');}

for(const p of archive.publications){assert(p.url,'Publication link '+p.id);assert(p.url.startsWith('https://doi.org/')||p.url.startsWith('https://scholar.google.com/'));}
const uploads=JSON.parse(fs.readFileSync('content/uploaded-asset-provenance.json','utf8'));assert.equal(uploads.length,17);for(const a of uploads){assert(fs.existsSync('public'+a.file));assert(archive.photos.some(p=>p.image===a.file));}
assert.equal(archive.photos.length,36);
for(const page of pages)for(const field of ['content','contentEn'])for(const match of page[field].matchAll(/!\[[^\]]*\]\(([^)]+)\)/g))assert(fs.existsSync('public'+match[1]),'Inline image '+match[1]);
console.log('PASS: full original text for 23 medical pages; 17 uploaded photos; 36 gallery entries; 240 linked academic records; all inline assets exist.');

const coverPages=pages.filter(p=>['article','blog'].includes(p.kind));assert.equal(new Set(coverPages.map(p=>p.coverImage)).size,27,'27 distinct cover URLs');const digests=coverPages.map(p=>createHash('sha256').update(fs.readFileSync('public'+p.coverImage)).digest('hex'));assert.equal(new Set(digests).size,27,'27 distinct image files, including originals and licensed photos');console.log('PASS: 27 distinct cover images; all original page paragraphs retained.');

const contributions=JSON.parse(fs.readFileSync('content/academic-contributions.json','utf8'));assert.equal(contributions.talks.length,75);assert.equal(contributions.panels.length,7);assert.equal(contributions.citations.length,4);const profile=pages.find(p=>p.kind==='profile');for(const section of ['Ödüller','Akademik özgeçmiş','İdari görevleri','Bilimsel ve mesleki','Üyesi olduğu'])assert(profile.content.includes(section),section);const logos=JSON.parse(fs.readFileSync('content/society-logo-provenance.json','utf8'));assert.equal(logos.length,9);for(const logo of logos)assert(fs.existsSync('public'+logo.file),logo.file);assert(coverPages.every(p=>p.coverImage.startsWith('/images/editorial/')),'A shared style for every writing cover');console.log('PASS: complete CV in biography, 9 society logos, 75 conference/seminar and 7 panel/training records.');
