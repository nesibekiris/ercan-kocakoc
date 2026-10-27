'use client';
import {useState} from 'react';
import {VideoGallery} from './Experiences';
import InstagramReels from './InstagramReels';
import type {VideoRecord} from '../lib/types';

export default function SocialVideoColumns({videos,en=false}:{videos:VideoRecord[];en?:boolean}){
 const [channel,setChannel]=useState<'youtube'|'instagram'>('youtube');
 return <div className="media-channel-archive">
  <div className="media-channel-tabs" role="tablist" aria-label={en?'Video channels':'Video kanalları'} onKeyDown={e=>{
   if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
   e.preventDefault();
   const next=e.key==='Home'?'youtube':e.key==='End'?'instagram':channel==='youtube'?'instagram':'youtube';
   setChannel(next);
   e.currentTarget.querySelector<HTMLButtonElement>('#channel-tab-'+next)?.focus();
  }}>
   <button id="channel-tab-youtube" role="tab" aria-controls="channel-panel-youtube" aria-selected={channel==='youtube'} tabIndex={channel==='youtube'?0:-1} onClick={()=>setChannel('youtube')}><svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor"/><path d="m10 9 6 3-6 3Z" fill="var(--channel-play,#fff)"/></svg>YouTube<span>{videos.filter(v=>v.status==='published').length}</span></button>
   <button id="channel-tab-instagram" role="tab" aria-controls="channel-panel-instagram" aria-selected={channel==='instagram'} tabIndex={channel==='instagram'?0:-1} onClick={()=>setChannel('instagram')}><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>Instagram Reels</button>
  </div>
  <div id="channel-panel-youtube" role="tabpanel" aria-labelledby="channel-tab-youtube" hidden={channel!=='youtube'}>
   <div className="media-channel-intro"><h2>{en?'Video explanations':'Videolu bilgilendirme'}</h2><p>{en?'Explore the physician’s explanations by topic.':'İlgilendiğiniz konuyu seçerek hekimin anlatımını izleyebilirsiniz.'}</p></div>
   <VideoGallery videos={videos} en={en}/>
  </div>
  <div id="channel-panel-instagram" role="tabpanel" aria-labelledby="channel-tab-instagram" hidden={channel!=='instagram'}>
   {channel==='instagram'&&<section className="reels-archive-panel"><div className="reels-panel-heading"><div><span className="eyebrow">INSTAGRAM REELS</span><h2>{en?'Short videos from the clinic':'Klinikten kısa videolar'}</h2><p>{en?'Browse the latest videos shared by Prof. Dr. Ercan Kocakoç.':'Prof. Dr. Ercan Kocakoç’un Instagram hesabında paylaştığı güncel videoları inceleyin.'}</p></div><a href="https://www.instagram.com/drercankocakoc/" target="_blank" rel="noopener noreferrer">@drercankocakoc ↗</a></div><InstagramReels/></section>}
  </div>
 </div>;
}
