import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const archive=JSON.parse(fs.readFileSync('app/lib/archive-seed.ts','utf8').split('export const defaultArchive:Archive = ')[1].trim().replace(/;$/,''));
const before=JSON.parse(fs.readFileSync('content/pre-video-covers-v7.json','utf8'));
const covers=JSON.parse(fs.readFileSync('content/video-covers-v7.json','utf8'));
assert.equal(covers.length,15);
const hashes=[];
for(const old of before){
 const video=archive.videos.find(v=>v.id===old.id);
 assert(video,old.id);
 const cover=covers.find(c=>c.id===video.id);
 for(const key of ['id','url','status'])assert.equal(video[key],old[key],old.id+' '+key+' retained');
 assert.equal(cover.originalTitle,old.title,old.id+' original source title retained');
 assert.equal(video.thumbnail,cover.cover);
 for(const src of [cover.cover,cover.editableVector,cover.originalThumbnail])assert(fs.existsSync('public'+src),src);
 assert.deepEqual(cover.size,[1280,720]);
 hashes.push(createHash('sha256').update(fs.readFileSync('public'+cover.cover)).digest('hex'));
}
assert.equal(new Set(hashes).size,15,'15 distinct cover images');

const luminance=hex=>{
 const values=hex.replace('#','').match(/../g).map(n=>parseInt(n,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return values[0]*.2126+values[1]*.7152+values[2]*.0722;
};
const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const palette={blue:'#247397',navy:'#173849',teal:'#1e7686',green:'#286e60',indigo:'#3d6093',organ4:'#236b8a',organ5:'#246f76'};
const contrast=Object.entries(palette).map(([role,color])=>({role,foreground:'#ffffff',background:color,ratio:Number(ratio('#ffffff',color).toFixed(2))}));
for(const c of contrast)assert(c.ratio>=4.5,c.role+' white-text contrast');
const result={
 updated:'2026-10-25',
 findingsResolved:[
  'Six unrelated, muted ultrasound card tones replaced by the existing blue family and one controlled green accent.',
  'Ultrasound, category, video, CTA and academic accents now share the public brand palette.',
  'Georgia headings and Arial body typography retained; no unrelated display font added to public pages.',
  '15 image covers share one composition, readable topic headlines and related line illustrations.',
  'Video cards use 16:9 without center play icons obscuring the cover headline.',
 ],
 videoCovers:15,originalSourceVideoTitlesAndUrlsPreserved:true,seoDisplayTitlesAppliedAtRuntime:true,originalThumbnailsPreserved:true,
 contrast,notes:'Calculated checks for the listed foreground/background pairs; not a certification of every site state. Official third-party logos retain their original colors.',
};
fs.writeFileSync('content/color-style-audit-v7.json',JSON.stringify(result,null,2));
console.log('PASS: 15 distinct topic covers; source titles, URLs and original thumbnails retained; all seven solid card colors meet the 4.5:1 target for white text.');
