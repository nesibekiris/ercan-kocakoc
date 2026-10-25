import Icon from './Icon';

const societies = [
  {match:'Türk Radyoloji Derneği',file:'trd.jpg',url:'https://turkrad.org.tr/'},
  {match:'Tıbbi Ultrasonografi Derneği',file:'tud.png',url:'https://www.tud.org.tr/'},
  {match:'Türk Manyetik Rezonans Derneği',file:'tmrd.svg',url:'https://tmrd.org.tr/'},
  {match:'Türk Girişimsel Radyoloji Derneği',file:'tgrd.svg',url:'https://www.tgrd.org.tr/'},
  {match:'ESGAR',file:'esgar.svg',url:'https://esgar.org/'},
  {match:'ESR',file:'esr.svg',url:'https://www.myesr.org/'},
  {match:'ESUR',file:'esur.png',url:'https://www.esur.org/'},
  {match:'Korean Society of Radiology',file:'ksr.png',url:'https://www.radiology.kr/'},
  {match:'RSNA',file:'rsna.svg',url:'https://www.rsna.org/'},
];

export function isMembershipBlock(text:string) {
  const lines=text.split('\n').filter(Boolean);
  return lines.length===9 && societies.every(s=>lines.some(line=>line.includes(s.match)));
}

export default function Memberships({text}:{text:string}) {
  const lines=text.split('\n').filter(Boolean);
  return <ul className="society-grid">{societies.map(s=>{
    const label=lines.find(line=>line.includes(s.match))!.replace(/^\d+[.\-–]?\s*/,'');
    const role=label.match(/\((Fellow|international membership|corresponding member)\)$/i)?.[1];
    return <li key={s.match}><a href={s.url} target="_blank" rel="noopener noreferrer">
      <div className="society-logo"><img src={'/images/societies/'+s.file} alt={s.match+' logosu'} width="240" height="110" loading="lazy"/></div>
      <span className="society-name">{role?label.slice(0,label.lastIndexOf('(')).trim():label}</span>
      <span className="society-role">{role||'Üyelik'}<Icon name="external" size={14}/></span>
    </a></li>;
  })}</ul>;
}
