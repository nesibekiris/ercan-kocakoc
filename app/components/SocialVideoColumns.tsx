import {VideoGallery} from './Experiences';
import InstagramReels from './InstagramReels';
import type {VideoRecord} from '../lib/types';

export default function SocialVideoColumns({videos,en=false,compact=false}:{videos:VideoRecord[];en?:boolean;compact?:boolean}){
 return <div className={'social-video-columns'+(compact?' social-video-home':'')}>
  <div className="youtube-video-column"><h2 className="social-video-heading"><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor"/><path d="m10 9 6 3-6 3Z" fill="white"/></svg>YouTube</h2><VideoGallery videos={videos} en={en} compact={compact}/></div>
  <div className="instagram-video-column"><h2 className="social-video-heading"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>Instagram Reels</h2><InstagramReels/><a className="instagram-profile-link" href="https://www.instagram.com/drercankocakoc/" target="_blank" rel="noopener noreferrer">{en?'Open Instagram profile':'Instagram profilini açın'} ↗</a></div>
 </div>;
}
