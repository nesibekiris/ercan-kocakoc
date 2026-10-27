export function journalCardBlocks(text:string){
 const blocks=text.split(/\n\n+/).filter(Boolean);
 const output:string[]=[];
 for(let i=0;i<blocks.length;i++){
  const block=blocks[i];output.push(block);
  if(!/^### (Yurt dışı dergi editörlük|Hakemlik yapılan uluslar arası ve ulusal dergiler)/.test(block))continue;
  const entries:string[]=[];
  while(i+1<blocks.length&&!/^#/.test(blocks[i+1])){
   const next=blocks[i+1];
   if(!/^\d+\s*[–—.\-]/.test(next))break;
   entries.push(next.replace(/^\d+\s*[–—.\-]\s*/,''));i++;
  }
  if(entries.length)output.push('{{journal-cards}}\n'+entries.join('\n'));
 }
 return output;
}

export default function JournalCards({text}:{text:string}){
 const entries=text.split('\n').slice(1).filter(Boolean);
 return <ul className="journal-name-grid">{entries.map(entry=>{
  const colon=entry.indexOf(':');
  const name=colon<0?entry:entry.slice(0,colon).trim();
  const role=colon<0?'':entry.slice(colon+1).trim();
  return <li key={entry}><span>{name}</span>{role&&<small>{role}</small>}</li>;
 })}</ul>;
}
