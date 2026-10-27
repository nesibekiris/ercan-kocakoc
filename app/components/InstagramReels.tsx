'use client';
import {useEffect,useRef} from 'react';

export default function InstagramReels(){
 const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const container=host.current;
  if(!container)return;
  // Mount the third-party widget only after React has hydrated the page.
  const widget=document.createElement('div');
  widget.className='sk-ww-instagram-reels';
  widget.dataset.embedId='25725368';
  const script=document.createElement('script');
  script.src='https://widgets.sociablekit.com/instagram-reels/widget.js';
  script.defer=true;
  container.appendChild(widget);
  container.appendChild(script);
  return ()=>container.replaceChildren();
 },[]);
 return <div ref={host} className="instagram-feed-frame"/>;
}
