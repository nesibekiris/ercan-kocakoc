export default function ConsultationPrep({en=false}:{en?:boolean}){
 const steps=en?[
  ['Prepare your images','Bring the original images together with your written reports.'],
  ['Gather your documents','Prepare your medication list and relevant earlier test results.'],
  ['Ask about preparation','Check whether your examination requires any special preparation.'],
 ]:[
  ['Görüntülerinizi hazırlayın','Yazılı raporların yanında orijinal görüntülerinizi de yanınızda bulundurun.'],
  ['Belgelerinizi bir araya getirin','İlaç listenizi ve ilgili önceki tetkiklerinizi hazırlayın.'],
  ['Hazırlık bilgisini sorun','İncelemeniz için özel bir hazırlık gerekip gerekmediğini öğrenin.'],
 ];
 return <section className="section wrap consultation-prep"><div className="consultation-prep-inner"><div className="consultation-prep-heading"><span className="eyebrow">{en?'BEFORE YOUR VISIT':'GÖRÜŞME ÖNCESİNDE'}</span><h2>{en?'Come prepared.':'Görüşmeye hazırlıklı gelin.'}</h2></div><ol>{steps.map(([title,body],i)=><li key={title}><span className="prep-number">{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></div></section>;
}
