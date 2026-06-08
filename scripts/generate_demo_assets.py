"""Génère images de démo (covers, jury, awards, events) pour MarsAI."""
from __future__ import annotations

import shutil
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


def avatar(path: Path, initials: str, palette_idx: int) -> None:
    bg, accent, _ = PALETTES[palette_idx % len(PALETTES)]
    size = 400
    img = Image.new("RGB", (size, size), bg)
    draw = ImageDraw.Draw(img)
    draw.ellipse((20, 20, size - 20, size - 20), fill=accent)
    draw.ellipse((40, 40, size - 40, size - 40), fill=bg)
    draw.text((size // 2, size // 2), initials, fill="#FFFFFF", font=_font(120), anchor="mm")
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, quality=90)


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

    jury_members = [
        ("demo-jury-julien-valros.jpg", "JV"),
        ("demo-jury-julie-masson.jpg", "JM"),
        ("demo-jury-sarah-chen.jpg", "SC"),
        ("demo-jury-marc-dubois.jpg", "MD"),
        ("demo-jury-aisha-okafor.jpg", "AO"),
        ("demo-jury-elena-rossi.jpg", "ER"),
    ]
    for i, (fname, initials) in enumerate(jury_members):
        avatar(jury_dir / fname, initials, i + 2)

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
