"""Génère images de démo (covers, jury, awards, events) pour MarsAI."""
from __future__ import annotations

import shutil
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
UPLOADS = ROOT / "back" / "uploads"

PALETTES = [
    ("#0B0F1A", "#FF8C42", "#FFB020"),
    ("#07040F", "#51A2FF", "#00D492"),
    ("#1a0a2e", "#FFC857", "#FF8C42"),
    ("#0d1b2a", "#2B7FFF", "#FF8C42"),
    ("#14141f", "#00D3F2", "#FFC857"),
    ("#12081a", "#E9FFF2", "#18C36B"),
    ("#101820", "#FFF3E0", "#FF8C42"),
    ("#0a1628", "#EAF1FF", "#2B7FFF"),
]


def _font(size: int):
    for name in ("arialbd.ttf", "arial.ttf", "segoeui.ttf", "calibri.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def gradient_cover(path: Path, title: str, subtitle: str, palette_idx: int) -> None:
    bg, accent, accent2 = PALETTES[palette_idx % len(PALETTES)]
    w, h = 1280, 720
    img = Image.new("RGB", (w, h), bg)
    draw = ImageDraw.Draw(img)

    for y in range(h):
        t = y / h
        r = int(int(bg[1:3], 16) * (1 - t) + int(accent[1:3], 16) * t * 0.35)
        g = int(int(bg[3:5], 16) * (1 - t) + int(accent[3:5], 16) * t * 0.35)
        b = int(int(bg[5:7], 16) * (1 - t) + int(accent[5:7], 16) * t * 0.35)
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    draw.rounded_rectangle((60, 60, w - 60, h - 60), radius=40, outline=accent2, width=4)
    draw.text((100, 280), "MARS.AI", fill=accent, font=_font(36))
    draw.text((100, 340), title, fill="#FFFFFF", font=_font(64))
    draw.text((100, 430), subtitle, fill="#FFFFFFAA", font=_font(28))
    draw.text((100, h - 120), "60s · IA · Futurs souhaitables", fill=accent2, font=_font(22))

    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, quality=92)


# Photos réalistes (Unsplash, licence libre) — recadrées en portrait 400×500
JURY_PHOTOS = [
    (
        "demo-jury-julien-valros.jpg",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=faces",
    ),
    (
        "demo-jury-julie-masson.jpg",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=faces",
    ),
    (
        "demo-jury-sarah-chen.jpg",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=faces",
    ),
    (
        "demo-jury-marc-dubois.jpg",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=faces",
    ),
    (
        "demo-jury-aisha-okafor.jpg",
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop&crop=faces",
    ),
    (
        "demo-jury-elena-rossi.jpg",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=faces",
    ),
    (
        "demo-jury-lucas-petit.jpg",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=faces",
    ),
]


def _crop_center(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    """Recadre au centre pour obtenir le ratio cible."""
    src_w, src_h = img.size
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h

    if src_ratio > target_ratio:
        new_w = int(src_h * target_ratio)
        left = (src_w - new_w) // 2
        img = img.crop((left, 0, left + new_w, src_h))
    else:
        new_h = int(src_w / target_ratio)
        top = (src_h - new_h) // 2
        img = img.crop((0, top, src_w, top + new_h))

    return img.resize((target_w, target_h), Image.Resampling.LANCZOS)


def download_portrait(path: Path, url: str) -> None:
    """Télécharge une photo humaine réaliste et la sauvegarde en portrait."""
    req = urllib.request.Request(url, headers={"User-Agent": "MarsAI-Demo-Asset-Generator/1.0"})
    with urllib.request.urlopen(req, timeout=30) as response:
        data = response.read()

    img = Image.open(BytesIO(data)).convert("RGB")
    img = _crop_center(img, 400, 500)
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, quality=92)


def award_badge(path: Path, label: str, palette_idx: int) -> None:
    bg, accent, accent2 = PALETTES[palette_idx % len(PALETTES)]
    size = 256
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.ellipse((8, 8, size - 8, size - 8), fill=accent)
    draw.ellipse((28, 28, size - 28, size - 28), fill=bg)
    draw.text((size // 2, size // 2 - 10), "★", fill=accent2, font=_font(72), anchor="mm")
    draw.text((size // 2, size // 2 + 55), label, fill="#FFFFFF", font=_font(18), anchor="mm")
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path)


def event_banner(path: Path, title: str, palette_idx: int) -> None:
    gradient_cover(path, title, "Marseille · La Plateforme", palette_idx)


def poster_cover(path: Path, src: Path) -> None:
    img = Image.open(src).convert("RGB")
    img = img.resize((1280, 720), Image.Resampling.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, quality=92)


def main() -> None:
    covers_dir = UPLOADS / "covers"
    jury_dir = UPLOADS / "jury"
    medias_dir = UPLOADS / "medias"
    awards_dir = UPLOADS / "awards"

    poster_covers = [
        ("posters/poster-01-marseille-2050.png", "demo-cover-05-marseille-2050.jpg"),
        ("posters/poster-02-futur-souhaitable.png", "demo-cover-08-futur-souhaitable.jpg"),
        ("posters/poster-03-marsai-demain.png", "demo-cover-11-marsai-demain.jpg"),
    ]
    poster_names = {dst for _, dst in poster_covers}
    for src_rel, dst_fname in poster_covers:
        src = covers_dir / src_rel
        if src.exists():
            poster_cover(covers_dir / dst_fname, src)

    films = [
        ("demo-cover-05-marseille-2050.jpg", "Marseille 2050", "Festival MarsAI · France"),
        ("demo-cover-08-futur-souhaitable.jpg", "Futur souhaitable", "Amine Benali · Maroc"),
        ("demo-cover-09-neon-dreams.jpg", "Neon Dreams", "Sofia Martins · Portugal"),
        ("demo-cover-10-ocean-code.jpg", "Ocean Code", "Yuki Tanaka · Japon"),
        ("demo-cover-11-marsai-demain.jpg", "MarsAI Demain", "Elena Rossi · Italie"),
        ("demo-cover-12-last-garden.jpg", "Last Garden", "Kwame Osei · Ghana"),
        ("demo-cover-13-marseille-2080.jpg", "Marseille 2080", "Léa Dubois · France"),
        ("demo-cover-14-echo-bloom.jpg", "Echo Bloom", "Maya Chen · Canada"),
        ("demo-cover-15-stellar-dust.jpg", "Stellar Dust", "Omar Haddad · Égypte"),
    ]

    for i, (fname, title, sub) in enumerate(films):
        if fname in poster_names:
            continue
        gradient_cover(covers_dir / fname, title, sub, i)

    for fname, url in JURY_PHOTOS:
        download_portrait(jury_dir / fname, url)

    for i, label in enumerate(["GRAND PRIX", "PUBLIC", "INNOVATION"], start=1):
        award_badge(awards_dir / f"demo-award-0{i}.png", label, i)

    events = [
        ("demo-event-01-accueil.jpg", "Accueil & Networking"),
        ("demo-event-02-conference.jpg", "Conférence IA & Cinéma"),
        ("demo-event-03-workshop.jpg", "Atelier Montage IA"),
        ("demo-event-04-awards.jpg", "Remise des Prix"),
        ("demo-event-05-closing.jpg", "Soirée de Clôture"),
    ]
    for i, (fname, title) in enumerate(events):
        event_banner(medias_dir / fname, title, i + 3)

    # Vidéo locale réutilisable pour les nouvelles entrées démo
    src_mp4 = covers_dir.parent / "videos" / "1770038850058-765059-172528-847499874_tiny.mp4"
    if src_mp4.exists():
        for n in range(8, 16):
            dst = UPLOADS / "videos" / f"demo-video-{n:02d}.mp4"
            if not dst.exists():
                shutil.copy2(src_mp4, dst)

    print(f"Assets générés dans {UPLOADS}")


if __name__ == "__main__":
    main()
