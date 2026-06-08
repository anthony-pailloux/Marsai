"""Genere les logos MARSAI (header + footer) — palette bleu / orange dore."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
MEDIAS = ROOT / "back" / "uploads" / "medias"

BLUE = (81, 162, 255)
GOLD = (255, 176, 32)
ORANGE = (255, 140, 66)
WHITE = (255, 255, 255)
DARK = (7, 4, 15)

LOGO_FILES = [
    "logo.png",
    "1771511243648-300954571.png",
    "1771511243703-79202520.png",
]


def _font(size: int):
    for name in ("arialbd.ttf", "arial.ttf", "segoeui.ttf", "calibrib.ttf", "calibri.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def _lerp(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def _gradient_letter(text: str, size: int, top: tuple[int, int, int], bottom: tuple[int, int, int]) -> Image.Image:
    font = _font(size)
    bbox = font.getbbox(text)
    w, h = bbox[2] - bbox[0] + 8, bbox[3] - bbox[1] + 8
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).text((4 - bbox[0], 4 - bbox[1]), text, fill=255, font=font)
    arr = np.zeros((h, w, 4), dtype=np.uint8)
    for y in range(h):
        t = y / max(h - 1, 1)
        color = _lerp(top, bottom, t)
        row = arr[y, :, :3]
        alpha = np.array(mask)[:, y] if False else np.array(mask)[y, :]
        row[alpha > 0] = color
        arr[y, :, 3] = alpha
    return Image.fromarray(arr, "RGBA")


def _solid_letter(text: str, size: int, color: tuple[int, int, int]) -> Image.Image:
    return _gradient_letter(text, size, color, color)


def _stroked_letter(
    text: str,
    size: int,
    fill: tuple[int, int, int],
    stroke_fill: tuple[int, int, int] = DARK,
    stroke_width: int = 5,
) -> Image.Image:
    font = _font(size)
    bbox = font.getbbox(text)
    pad = stroke_width * 2
    w = bbox[2] - bbox[0] + pad * 2
    h = bbox[3] - bbox[1] + pad * 2
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.text(
        (pad - bbox[0], pad - bbox[1]),
        text,
        font=font,
        fill=fill + (255,),
        stroke_width=stroke_width,
        stroke_fill=stroke_fill + (255,),
    )
    return img


def generate_logo(width: int = 1621, height: int = 337, mars_on_dark: bool = False) -> Image.Image:
    font_size = 280
    mars_color = DARK if mars_on_dark else WHITE
    parts = [
        ("M", "mars", mars_color),
        ("A", "mars", mars_color),
        ("R", "mars", mars_color),
        ("S", "mars", mars_color),
        ("A", "grad", (BLUE, GOLD)),
        ("I", "grad", (GOLD, ORANGE)),
    ]

    letters = []
    for text, kind, colors in parts:
        if kind == "mars":
            letters.append(_stroked_letter(text, font_size, colors))
        elif kind == "solid":
            letters.append(_solid_letter(text, font_size, colors))
        else:
            letters.append(_gradient_letter(text, font_size, colors[0], colors[1]))

    gap = 6
    total_w = sum(img.width for img in letters) + gap * (len(letters) - 1)
    max_h = max(img.height for img in letters)

    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    x = (width - total_w) // 2
    y = (height - max_h) // 2
    for img in letters:
        canvas.paste(img, (x, y), img)
        x += img.width + gap
    return canvas


def main() -> None:
    MEDIAS.mkdir(parents=True, exist_ok=True)

    logo_light = generate_logo(mars_on_dark=False)
    logo_dark = generate_logo(mars_on_dark=True)

    for name in LOGO_FILES:
        logo_light.save(MEDIAS / name)
        print(f"Saved {MEDIAS / name}")

        dark_name = name.replace(".png", "-dark.png")
        logo_dark.save(MEDIAS / dark_name)
        print(f"Saved {MEDIAS / dark_name}")


if __name__ == "__main__":
    main()
