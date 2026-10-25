import records from '../../content/academic-contributions.json';
import Icon from './Icon';

export default function AcademicContributions({en=false}:{en?:boolean}) {
  const years=[...new Set(records.talks.map(t=>t.year))].sort((a,b)=>Number(b)-Number(a));
  return <div className="academic-contributions">
    <nav className="contribution-nav" aria-label={en?'Academic contribution sections':'Akademik katkı bölümleri'}>
      <a href="#atiflar">{en?'Citations':'Atıflar'}<Icon name="down" size={15}/></a>
      <a href="#konferanslar">{en?'Conferences & seminars':'Konferans ve seminerler'}<span>75</span></a>
      <a href="#paneller">{en?'Panels & education':'Paneller ve eğitimler'}<span>7</span></a>
    </nav>
    <section className="citation-section" aria-labelledby="atiflar">
      <div className="contribution-heading"><span className="eyebrow">{en?'RESEARCH IMPACT':'ARAŞTIRMALARIN ETKİSİ'}</span><h2 id="atiflar">{en?'Citations to his work':'Çalışmalarına yapılan atıflar'}</h2><p>{en?'Figures reported in the supplied academic CV. The source does not state a measurement date; these are archival figures, not live citation counts.':'Paylaşılan akademik özgeçmişte bildirilen veriler. Kaynakta ölçüm tarihi belirtilmemiştir; sayılar arşiv kaydıdır ve güncel atıf sayısını göstermez.'}</p></div>
      <div className="citation-metrics">{[
        ['Scopus','1116','19',records.citations[1]],
        ['Google Akademik','2257','27',records.citations[2]],
        ['SCI','1056','18',records.citations[3]],
      ].map(([name,count,index,text])=><article key={name}><div><span>{name}</span><Icon name="page" size={21}/></div><strong>{count}<small>{en?'citations':'atıf'}</small></strong><span className="h-index">h-index <b>{index}</b></span><p>{text}</p></article>)}</div>
      <p className="citation-source-detail">{records.citations[0]}</p>
    </section>
    <section className="conference-section" aria-labelledby="konferanslar">
      <div className="contribution-heading"><span className="eyebrow">{en?'SCIENTIFIC EXCHANGE':'BİLİMSEL PAYLAŞIM'}</span><h2 id="konferanslar">{en?'Conferences and seminars':'Verdiği konferans ve seminerler'}</h2><p>{en?'All 75 records from the supplied CV, grouped by year. Original titles and meeting information are retained.':'Paylaşılan özgeçmişteki 75 kayıt, yıllara göre düzenlendi. Başlıklar ve toplantı bilgileri eksiksiz korundu.'}</p></div>
      <div className="conference-years">{years.map((year,i)=>{
        const talks=records.talks.filter(t=>t.year===year);
        return <details className="conference-year" key={year} open={i===0}><summary><span>{year}</span><small>{talks.length} {en?'records':'kayıt'}</small><Icon name="plus" size={20}/></summary><ol>{talks.map(t=><li key={t.id} value={t.id}><span className="conference-number">{String(t.id).padStart(2,'0')}</span><p>{t.text}</p></li>)}</ol></details>;
      })}</div>
    </section>
    <section className="panel-section" aria-labelledby="paneller">
      <div className="contribution-heading"><span className="eyebrow">{en?'ACADEMIC EDUCATION':'AKADEMİK EĞİTİM'}</span><h2 id="paneller">{en?'Panels, other meetings and educational activities':'Panel, diğer toplantılar ve eğitimle ilgili diğer belgeler'}</h2></div>
      <ol className="academic-panel-list">{records.panels.map((text,i)=><li key={text}><span>{String(i+1).padStart(2,'0')}</span><p>{text}</p></li>)}</ol>
    </section>
  </div>;
}
