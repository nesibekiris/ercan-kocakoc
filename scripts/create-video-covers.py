"""Build topic-matched 16:9 video covers from the supplied Canva image system.

The public video titles, URLs and imported YouTube thumbnails are preserved.
The output mirrors the pale blue/green medical illustrations used throughout
the article archive while retaining readable YouTube-size titles.
"""
from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/images/video-covers"
OUT.mkdir(exist_ok=True)
SEED = ROOT / "app/lib/archive-seed.ts"
source = SEED.read_text()
archive = json.loads(source.split("export const defaultArchive:Archive = ")[1].rstrip(";\n"))

SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
INK = "#173f52"
BLUE = "#247397"
TEAL = "#2f7b78"
PAPER = "#f7f8f3"

# The image contains a concise display title. The complete original YouTube
# title remains visible in the card and video dialog.
SPECS = [
    ("BV3nDCJdBDY", "Tümör ablasyon\ntedavisi", "Girişimsel tedaviler", "tedaviler--karaciger-tumor-ablasyon-tedavisi.webp", 0.50, False),
    ("M-rNAfF35W8", "Miyom\nembolizasyonu", "Girişimsel tedaviler", "tedaviler--diger-bolgelerdeki-tumor-embolizasyonu.webp", 0.53, False),
    ("snUnd3uf-mI", "Radyoloji\nüzerine", "Söyleşi", "ikinci-gorus--abdomen-karin-bolgesi-tanisal-2-gorus.webp", 0.52, False),
    ("oukB8wqUnGA", "TAKE\nKemoembolizasyon", "Girişimsel tedaviler", "tedaviler--kemoembolizasyon.webp", 0.48, False),
    ("XcmZVLOTQIs", "Girişimsel\nradyoloji nedir?", "Radyoloji", "ikinci-gorus--karin-bolgesi-radyolojisi.webp", 0.55, False),
    ("wWxUEdUHtcE", "Kapalı miyom\ntedavisi", "Söyleşi", "tedaviler--diger-bolgelerdeki-tumor-embolizasyonu.webp", 0.46, True),
    ("z1Qntrc_4ac", "Prostat füzyon\nbiyopsisi", "Biyopsi", "biyopsi--prostat-fuzyon-biyopsi.webp", 0.51, False),
    ("ThwQSg278X0", "Görüntüleme eşliğinde\nbiyopsi", "Biyopsi", "biyopsi--yumusak-doku-biyopsi.webp", 0.50, False),
    ("BDPGDgOGalg", "Akciğer\nbiyopsisi", "Biyopsi", "biyopsi--akciger-biyopsi.webp", 0.52, False),
    ("ivrXSzDNpVk", "Lenf nodu\nbiyopsisi", "Biyopsi", "biyopsi--lenf-bezi-biyopsi.webp", 0.50, False),
    ("UvUPTOXD1uQ", "Tiroid\nbiyopsisi", "Biyopsi", "biyopsi--tiroid-biyopsi.webp", 0.54, False),
    ("rG-F8sV4U3E", "Mikrodalga\nablasyon", "Girişimsel tedaviler", "biyopsi--karaciger-biyopsi.webp", 0.47, True),
    ("b3LKpmqd9zA", "Kadınlarda ve erkeklerde\nkanser türleri", "Söyleşi", "biyopsi--meme-biyopsi.webp", 0.53, False),
    ("CMmy3SpZ_W4", "Karaciğer tümörlerinde\nTAKE ve TARE", "Girişimsel tedaviler", "tedaviler--radyoembolizasyon-tedavisi.webp", 0.50, False),
    ("jG9wz33S_ak", "RF ablasyon", "Girişimsel tedaviler", "tedaviler--karaciger-tumor-ablasyon-tedavisi.webp", 0.43, True),
]


def font(path, size):
    return ImageFont.truetype(path, size)


def cover_image(filename, focus, mirror):
    image = Image.open(ROOT / "public/images/blog-covers" / filename).convert("RGB")
    if mirror:
        image = ImageOps.mirror(image)
    target_w, target_h = 850, 720
    scale = max(target_w / image.width, target_h / image.height)
    image = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    left = max(0, min(image.width - target_w, round(image.width * focus - target_w / 2)))
    image = image.crop((left, 0, left + target_w, target_h))
    image = ImageEnhance.Color(image).enhance(0.93)
    return ImageEnhance.Contrast(image).enhance(0.98)


def draw_cover(display_title, category, filename, focus, mirror, number):
    canvas = Image.new("RGB", (1280, 720), PAPER)
    canvas.paste(cover_image(filename, focus, mirror), (430, 0))

    # Soft paper-to-illustration transition, matching the article cards.
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    pixels = overlay.load()
    paper = (247, 248, 243)
    for x in range(300, 700):
        alpha = max(0, min(255, round(255 * (700 - x) / 400)))
        for y in range(720):
            pixels[x, y] = (*paper, alpha)
    canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(canvas)

    draw.line((56, 51, 1224, 51), fill="#8cb8c5", width=2)
    draw.text((58, 72), "PROF. DR. ERCAN KOCAKOÇ", font=font(SANS, 20), fill=INK)
    badge_font = font(SANS, 16)
    badge = category.upper()
    badge_box = draw.textbbox((0, 0), badge, font=badge_font)
    badge_w = badge_box[2] - badge_box[0] + 32
    draw.rounded_rectangle((58, 143, 58 + badge_w, 183), radius=20, fill="#e4eff0")
    draw.text((74, 153), badge, font=badge_font, fill=TEAL)

    title_lines = display_title.split("\n")
    longest = max(len(line) for line in title_lines)
    title_size = 53 if longest <= 20 else 46
    y = 224 if len(title_lines) > 1 else 271
    for line in title_lines:
        draw.text((58, y), line, font=font(SERIF, title_size), fill=INK)
        y += title_size + 18

    draw.line((58, 518, 122, 518), fill="#d08a63", width=4)
    draw.text((58, 547), "VİDEO ARŞİVİ", font=font(SANS, 17), fill=BLUE)
    draw.text((58, 583), "Hekimin anlatımıyla", font=font(SANS, 19), fill="#657d86")
    draw.text((1195, 654), f"{number:02d}", anchor="ra", font=font(SANS, 17), fill="#668c99")
    return canvas.convert("RGB")


records = []
for number, (video_id, title, category, image, focus, mirror) in enumerate(SPECS, 1):
    video = next(v for v in archive["videos"] if v["id"] == video_id)
    output = OUT / f"{video_id}.jpg"
    draw_cover(title, category, image, focus, mirror, number).save(output, quality=72, optimize=True, progressive=True, subsampling=2)
    video["thumbnail"] = f"/images/video-covers/{video_id}.jpg"
    video["category"] = category
    records.append({
        "id": video_id,
        "originalTitle": video["title"],
        "youtubeUrl": video["url"],
        "originalThumbnail": f"/images/videos/{video_id}.jpg",
        "cover": video["thumbnail"],
        "imageReference": f"/images/blog-covers/{image}",
        "size": [1280, 720],
        "style": "Canva-derived pale medical illustration with the site editorial frame",
    })

SEED.write_text(source.split("export const defaultArchive:Archive = ")[0] + "export const defaultArchive:Archive = " + json.dumps(archive, ensure_ascii=False, indent=2) + ";\n")
(ROOT / "content/video-covers-v10.json").write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n")
print("Created 15 distinct 1280x720 topic-matched video covers; preserved original titles, URLs and imported thumbnails.")
