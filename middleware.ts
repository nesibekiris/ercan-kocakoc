import {NextResponse,type NextRequest} from 'next/server';

export function middleware(request:NextRequest){
 const headers=new Headers(request.headers);
 const path=request.nextUrl.pathname;
 // Derive language from the requested URL, never from the browser language or
 // a client-supplied header. Root layouts cannot rely on child route params.
 headers.set('x-site-language',path==='/en'||path.startsWith('/en/')?'en':'tr');
 return NextResponse.next({request:{headers}});
}

export const config={matcher:['/((?!_next/static|_next/image|images/).*)']};
