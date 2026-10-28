"""Build branded favicons and 1200×630 share cards from existing site assets."""
import base64
import io
import json
import re
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
source = (PUBLIC / 'favicon.svg').read_text()
embedded = Image.open(io.BytesIO(base64.b64decode(re.search(r'base64,([^\"]+)', source)[1]))).convert('RGBA')
symbol = embedded.crop((610, 50, 960, 400))
for size, name in [(32,'favicon-32.png'),(48,'favicon-48.png'),(96,'favicon-96.png'),(180,'apple-touch-icon.png'),(192,'icon-192.png'),(512,'icon-512.png')]:
    canvas = Image.new('RGBA',(size,size),'white')
    mark = symbol.resize((round(size*.86),round(size*.86)),Image.Resampling.LANCZOS)
    canvas.alpha_composite(mark,((size-mark.width)//2,(size-mark.height)//2))
    canvas.convert('RGB').save(PUBLIC/name)
Image.open(PUBLIC/'icon-512.png').save(PUBLIC/'favicon.ico',sizes=[(16,16),(32,32),(48,48)])

extract = "import {seedPages} from './app/lib/seed.ts';import {applyPageSeo} from './app/lib/content-seo.ts';import {applyEditorialReview} from './app/lib/content-editorial.ts';console.log(JSON.stringify(seedPages.map(applyPageSeo).map(applyEditorialReview)));"
pages = json.loads(subprocess.check_output(['node','--experimental-strip-types','--input-type=module','-e',extract],cwd=ROOT,text=True))
by_slug = {p['slug']:p for p in pages if p['status']=='published'}
records = json.loads((ROOT/'content/seo-audit-v7.json').read_text())['records']
fallbacks = {
    'biyopsi':'/images/original/prostat-fuzyon-biyopsi.webp',
    'tedaviler':'/images/original/karaciger-tumor-ablasyon-tedavisi.webp',
    'ultrason-girisimsel-radyoloji':'/images/licensed/ultrasound-monitor.webp',
    '2-uzman-gorusu':'/images/original/bobrek-ureme-sistemleri.webp',
    'blog':'/images/licensed/ultrasound-scanner.webp',
    'video-galeri':'/images/responsive/clinic-16-800.webp',
    'fotograf-galeri':'/images/responsive/clinic-06-800.webp',
    'yayinlar':'/images/edited/abdominal-radyoloji-book.webp',
    'tezler':'/images/edited/abdominal-radyoloji-book.webp',
    'akademik-calismalar':'/images/edited/abdominal-radyoloji-book.webp',
}
out = PUBLIC/'images/social'; out.mkdir(exist_ok=True)
manifest = {}
for r in records:
    path = r['path']; en = path=='/en' or path.startswith('/en/')
    slug = path[4:] if en else path.lstrip('/')
    p = by_slug.get(slug)
    title = (p['titleEn'] if en else p['title']) if p else r['title'].split(' | ')[0]
    if not slug: title = 'Interventional & abdominal radiology' if en else 'Girişimsel ve abdominal radyoloji'
    src = ((p.get('coverImage') or p.get('image')) if p else '') or fallbacks.get(slug,'/images/portraits/ercan-kocakoc-transparent.webp')
    card = Image.new('RGB',(1200,630),'#f3f8fa'); d=ImageDraw.Draw(card)
    d.rectangle((0,0,1199,9),fill='#247c9b')
    d.rectangle((820,10,1199,629),fill='#e2eff3')
    d.line((820,50,820,580),fill='#c8dce4',width=2)
    mark = symbol.resize((62,62),Image.Resampling.LANCZOS)
    card.paste(mark,(54,44),mark)
    d.text((134,48),'PROF. DR. ERCAN KOCAKOÇ',font=ImageFont.truetype(BOLD,24),fill='#173c50')
    d.text((134,81),'RADIOLOGY · ISTANBUL' if en else 'RADYOLOJİ · İSTANBUL',font=ImageFont.truetype(FONT,17),fill='#487487')
    font_size=47
    while True:
        font=ImageFont.truetype(BOLD,font_size);lines=[];line=''
        for word in title.split():
            attempt=(line+' '+word).strip()
            if d.textlength(attempt,font=font)>700 and line:lines.append(line);line=word
            else:line=attempt
        if line:lines.append(line)
        if len(lines)<=4:break
        font_size-=1
    y=195+(220-len(lines)*(font_size+13))//2
    for line in lines:
        d.text((56,y),line,font=font,fill='#173c50');y+=font_size+13
    d.line((56,476,754,476),fill='#c5dce5',width=2)
    d.text((56,504),'Information · Clinical experience · Academic work' if en else 'Bilgilendirme · Klinik deneyim · Akademik birikim',font=ImageFont.truetype(FONT,20),fill='#397386')
    d.text((56,557),'Prof. Dr. Ercan Kocakoç',font=ImageFont.truetype(FONT,19),fill='#536d7a')
    im=Image.open(PUBLIC/src.lstrip('/')).convert('RGBA')
    if 'portraits/' in src or 'edited/' in src:
        im.thumbnail((310,435),Image.Resampling.LANCZOS)
        card.paste(im,(1010-im.width//2,120+(435-im.height)//2),im)
    else:
        im=ImageOps.fit(im,(312,400),method=Image.Resampling.LANCZOS)
        mask=Image.new('L',im.size,0);ImageDraw.Draw(mask).rounded_rectangle((0,0,311,399),radius=18,fill=255)
        card.paste(im,(854,128),mask)
    filename=('en' if en else 'tr')+'--'+(slug.replace('/','--') or 'home')+'.jpg'
    card.save(out/filename,quality=88,optimize=True)
    manifest[path]={'url':'/images/social/'+filename,'width':1200,'height':630,'title':title,'source':src,'pageTitle':(p['titleEn'] if en else p['title']) if p else None}
(ROOT/'app/lib/social-images.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(f'Created {len(manifest)} bilingual share cards and 7 favicon assets.')
