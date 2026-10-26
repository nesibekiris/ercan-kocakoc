import type {Publication} from './types';

const journalLead=/^(?:J\s|Journal\s|Turk\s|Türk\s|Eur\s|European\s|Radiol\s|Ultrasound\s|Acta\s|Case\s+Rep\s)/i;

function looksLikeAuthorList(value:string){
 const words=value.replace(/[.,;]/g,' ').split(/\s+/).filter(Boolean);
 const commas=(value.match(/,/g)||[]).length;
 const initials=words.filter(w=>/^[A-ZÇĞİÖŞÜ]{1,4}$/u.test(w)).length;
 return commas>=2&&words.length<24&&initials>=2;
}

/** The source archive often stores the full citation without a separate title. */
export function publicationTitle(p:Publication){
 if(p.title?.trim())return p.title.trim();
 const citation=p.citation.replace(/\s+/g,' ').trim();
 if(citation.includes('[Kaynak sitedeki kayıt'))return 'Kaynak sitede eksik kalan yayın kaydı';
 const chapter=citation.match(/Chapter\s+\d+\s*:\s*([^()]+?)(?=\s*\(|$)/i);
 if(chapter)return chapter[1].trim().replace(/[.;]$/,'');
 const firstSource=citation.search(/\.\s+(?:J\s|Journal\s|Turk\s|Türk\s|Eur\s|European\s|Radiol\s|Ultrasound\s|Acta\s|Case\s+Rep\s)/i);
 const lead=firstSource>0?citation.slice(0,firstSource):citation;
 const authorMatches=[...lead.matchAll(/\b[A-ZÇĞİÖŞÜ][a-zçğıöşü'’-]+\s+[A-ZÇĞİÖŞÜ]{1,4}\b/gu)];
 if(firstSource>0&&authorMatches.length>=2){
  const last=authorMatches.at(-1)!;
  const inlineTitle=lead.slice((last.index||0)+last[0].length).replace(/^[,.;:\s-]+/,'').trim();
  if(inlineTitle.length>=16)return inlineTitle;
 }
 const pieces=citation.split(/(?<=\.)\s+/).map(x=>x.trim()).filter(Boolean);
 for(let i=0;i<pieces.length;i++){
  const candidate=pieces[i].replace(/[.;]$/,'');
  const words=candidate.split(/\s+/).filter(Boolean);
  if(words.length<3||candidate.length<16||journalLead.test(candidate)||looksLikeAuthorList(candidate))continue;
  if(i===0&&candidate.includes(',')&&/Kocako[çc]/i.test(candidate))continue;
  return candidate;
 }
 const afterAuthors=citation.match(/Kocako[çc](?:\s+[A-ZÇĞİÖŞÜ]{1,4})?[^.]{0,90}\.\s+([^.]{16,})/i);
 if(afterAuthors)return afterAuthors[1].trim().replace(/[.;]$/,'');
 return citation.replace(/[.;]$/,'');
}
