"""Render the site's authored vector cover system as YouTube-size JPEGs.

Original video titles, URLs and imported YouTube thumbnails remain intact.
Requires Inkscape and Pillow; not used by the production build.
"""
from pathlib import Path
import copy
import html
import json
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images/video-covers'
OUT.mkdir(exist_ok=True)
seed = ROOT / 'app/lib/archive-seed.ts'
source = seed.read_text()
archive = json.loads(source.split('export const defaultArchive:Archive = ')[1].rstrip(';\n'))

palettes = {
    'teal': ('#1c6570', '#ffffff', '#bce3dc', '#ffffff', '#e9bb7e'),
    'green': ('#286e60', '#ffffff', '#c0e3d6', '#ffffff', '#e9bb7e'),
    'indigo': ('#3d6093', '#ffffff', '#c7d9ed', '#ffffff', '#e9bb7e'),
    'navy': ('#193f53', '#ffffff', '#b6dae4', '#ffffff', '#e9bb7e'),
    'blue': ('#247397', '#ffffff', '#b4dae9', '#ffffff', '#e9bb7e'),
}
specs = [
 ('BV3nDCJdBDY', ['Tümör ablasyon','tedavisi'], 'RF ve mikrodalga ablasyon', 'Girişimsel tedaviler', 'green', 'tedaviler--karaciger-tumor-ablasyon-tedavisi.svg'),
 ('M-rNAfF35W8', ['Miyom','embolizasyonu'], 'Yönteme genel bakış', 'Girişimsel tedaviler', 'indigo', 'tedaviler--diger-bolgelerdeki-tumor-embolizasyonu.svg'),
 ('snUnd3uf-mI', ['Radyoloji','üzerine'], 'Medico TV söyleşisi', 'Söyleşi', 'navy', None),
 ('oukB8wqUnGA', ['TAKE','Kemoembolizasyon'], 'Nedir, nasıl yapılır?', 'Girişimsel tedaviler', 'teal', 'tedaviler--kemoembolizasyon.svg'),
 ('XcmZVLOTQIs', ['Girişimsel','radyoloji'], 'Nedir?', 'Radyoloji', 'blue', 'blog--ultrason-randevusuna-hazirlik.svg'),
 ('wWxUEdUHtcE', ['Kapalı miyom','tedavisi'], 'Woman TV söyleşisi', 'Söyleşi', 'navy', 'tedaviler--diger-bolgelerdeki-tumor-embolizasyonu.svg'),
 ('z1Qntrc_4ac', ['Prostat füzyon','biyopsisi'], 'MR ve ultrason rehberliğinde', 'Biyopsi', 'blue', 'blog--prostat-fuzyon-biyopsi-nedir.svg'),
 ('ThwQSg278X0', ['Biyopsi'], 'Görüntüleme eşliğinde örnekleme', 'Biyopsi', 'green', 'biyopsi--yumusak-doku-biyopsi.svg'),
 ('BDPGDgOGalg', ['Akciğer','biyopsisi'], 'Görüntüleme eşliğinde örnekleme', 'Biyopsi', 'blue', 'biyopsi--akciger-biyopsi.svg'),
 ('ivrXSzDNpVk', ['Lenf nodu','biyopsisi'], 'Görüntüleme eşliğinde örnekleme', 'Biyopsi', 'indigo', 'biyopsi--lenf-bezi-biyopsi.svg'),
 ('UvUPTOXD1uQ', ['Tiroid','biyopsisi'], 'Nodüllerin değerlendirilmesi', 'Biyopsi', 'navy', 'biyopsi--tiroid-biyopsi.svg'),
 ('rG-F8sV4U3E', ['Mikrodalga','ablasyon'], 'Yönteme genel bakış', 'Girişimsel tedaviler', 'teal', 'tedaviler--karaciger-tumor-ablasyon-tedavisi.svg'),
 ('b3LKpmqd9zA', ['Kadınlarda ve','erkeklerde kanser'], 'Kanser türleri üzerine söyleşi', 'Söyleşi', 'indigo', '2-uzman-gorusu--abdomen-karin-bolgesi-tanisal-2-gorus.svg'),
 ('CMmy3SpZ_W4', ['Karaciğer tümörleri','TAKE ve TARE'], 'Girişimsel tedavi yöntemleri', 'Girişimsel tedaviler', 'green', 'tedaviler--radyoembolizasyon-tedavisi.svg'),
 ('jG9wz33S_ak', ['RF ablasyon'], 'Yönteme genel bakış', 'Girişimsel tedaviler', 'blue', 'tedaviler--karaciger-tumor-ablasyon-tedavisi.svg'),
]
NS = '{http://www.w3.org/2000/svg}'
records = []
for number,(id,lines,subtitle,category,palette,reference) in enumerate(specs,1):
    video = next(v for v in archive['videos'] if v['id'] == id)
    bg,ink,art,white,accent = palettes[palette]
    if reference:
        original = ET.parse(ROOT/'public/images/editorial'/reference).getroot()
        organ = copy.deepcopy(next(g for g in original.findall(NS+'g') if 'translate(515' in g.get('transform','')))
        organ.set('transform','translate(1020 340) scale(.94)')
        organ.set('stroke',art)
        ET.register_namespace('', 'http://www.w3.org/2000/svg')
        illustration = ET.tostring(organ,encoding='unicode')
    else:
        illustration = f'<g transform="translate(1020 340)" fill="none" stroke="{art}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><rect x="-48" y="-130" width="96" height="160" rx="48"/><path d="M-90-30V-9Q-90 83 0 83Q90 83 90-9V-30M0 83V139M-50 139H50"/><path d="M-130-83L-150-93M130-83L150-93M-132 23L-155 28M132 23L155 28"/></g>'
    y = 286 if len(lines)>1 else 322
    title = ''.join(f'<tspan x="64" y="{y+i*78}">{html.escape(line)}</tspan>' for i,line in enumerate(lines))
    font_size = 53 if max(map(len,lines))>17 else 58
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720"><title>{html.escape(video['title'])}</title>
<rect width="1280" height="720" fill="{bg}"/><path d="M841 0H1280V720H894Q780 360 841 0Z" fill="{white}" opacity=".10"/>
<circle cx="1020" cy="340" r="190" fill="{white}" opacity=".22"/><circle cx="1020" cy="340" r="158" fill="none" stroke="{art}" opacity=".18" stroke-width="2"/>
<path d="M842 160V132H870M1171 132H1199V160M842 520V548H870M1171 548H1199V520" fill="none" stroke="{art}" stroke-width="3" opacity=".7"/>
<path d="M64 121H751" stroke="{ink}" opacity=".18" stroke-width="1"/>
<text x="64" y="82" fill="{ink}" font-family="DejaVu Sans,sans-serif" font-size="27" letter-spacing=".5">Prof. Dr. Ercan Kocakoç</text>
<text x="64" y="187" fill="{ink}" opacity="1" font-family="DejaVu Sans,sans-serif" font-size="18" letter-spacing="3">{html.escape(category.upper())}</text>
<text fill="{ink}" font-family="DejaVu Serif,serif" font-size="{font_size}" font-weight="400" letter-spacing="-1.3">{title}</text>
<path d="M64 428H131" stroke="{accent}" stroke-width="5"/>
<text x="64" y="483" fill="{ink}" opacity="1" font-family="DejaVu Sans,sans-serif" font-size="25">{html.escape(subtitle)}</text>
{illustration}
<rect x="64" y="599" width="42" height="32" rx="7" fill="{ink}" opacity=".9"/><path d="M81 607L94 615L81 623Z" fill="{bg}"/>
<text x="124" y="623" fill="{ink}" font-family="DejaVu Sans,sans-serif" font-size="18" letter-spacing="2">VİDEO ARŞİVİ</text>
<text x="1187" y="628" text-anchor="end" fill="{art}" font-family="DejaVu Sans,sans-serif" font-size="20">{number:02d}</text></svg>'''
    svg_path = OUT/(id+'.svg')
    svg_path.write_text(svg)
    with tempfile.TemporaryDirectory() as tmp:
        png=Path(tmp)/'cover.png'
        subprocess.run(['inkscape',str(svg_path),'--export-type=png','--export-filename='+str(png)],check=True,capture_output=True)
        Image.open(png).convert('RGB').save(OUT/(id+'.jpg'),quality=92,optimize=True)
    previous='/images/videos/'+id+'.jpg'
    video['thumbnail']='/images/video-covers/'+id+'.jpg'
    video['category']=category
    records.append({'id':id,'originalTitle':video['title'],'youtubeUrl':video['url'],'originalThumbnail':previous,'cover':video['thumbnail'],'editableVector':'/images/video-covers/'+id+'.svg','palette':palette,'size':[1280,720],'illustrationReference':reference,'style':'Editorial line illustration with restrained medical palette'})

seed.write_text(source.split('export const defaultArchive:Archive = ')[0]+'export const defaultArchive:Archive = '+json.dumps(archive,ensure_ascii=False,indent=2)+';\n')
(ROOT/'content/video-covers-v7.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
print('Created 15 distinct 1280×720 JPEG covers and editable SVG sources; preserved original video titles, URLs and thumbnails.')
