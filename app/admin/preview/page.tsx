import {notFound} from 'next/navigation';
import {admin,getPages,getSettings} from '../../lib/cms';
import {Article} from '../../components/Site';
export const dynamic='force-dynamic';
export default async function Preview({searchParams}:{searchParams:Promise<{slug?:string;lang?:string}>}){if(!await admin())notFound();const q=await searchParams;const [pages,s]=await Promise.all([getPages(true),getSettings()]);const page=pages.find(p=>p.slug===q.slug);if(!page)notFound();return <Article s={s} pages={pages} page={page} en={q.lang==='en'} preview/>}
