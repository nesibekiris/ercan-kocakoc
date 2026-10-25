import './globals.css';
import './admin.css';
import './visual-refresh.css';
import './academic-refresh.css';
export const metadata={icons:{icon:'/favicon.svg'},formatDetection:{telephone:false}};
export default async function RootLayout({children,params}:{children:React.ReactNode;params:Promise<{path?:string[]}>}){const p=await params;return <html lang={p.path?.[0]==='en'?'en':'tr'}><body>{children}</body></html>}
