import './globals.css';
import './admin.css';
import './visual-refresh.css';
import './academic-refresh.css';
import './brand-theme.css';
import {headers} from 'next/headers';
export const metadata={icons:{icon:[{url:'/favicon.ico',sizes:'16x16 32x32 48x48'},{url:'/favicon-32.png',sizes:'32x32',type:'image/png'},{url:'/favicon-48.png',sizes:'48x48',type:'image/png'},{url:'/favicon-96.png',sizes:'96x96',type:'image/png'}],apple:[{url:'/apple-touch-icon.png',sizes:'180x180',type:'image/png'}]},manifest:'/site.webmanifest',formatDetection:{telephone:false}};
export default async function RootLayout({children}:{children:React.ReactNode}){const language=(await headers()).get('x-site-language')==='en'?'en':'tr';return <html lang={language}><body>{children}</body></html>}
