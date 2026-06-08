"""
Video hero MarsAI — theme « futurs souhaitables ».
Aube chaleureuse, horizon lumineux, trajectoires d'espoir (pas cosmos/etoiles).
Couleurs : #51A2FF (bleu), #FFB020 (or), #FF8C42 (orange).
"""

import math
import random
from pathlib import Path

import imageio.v3 as iio
import numpy as np
from PIL import Image, ImageFilter

WIDTH = 1920
HEIGHT = 1080
FPS = 24
DURATION = 12
OUTPUT = Path(__file__).resolve().parents[1] / "front" / "public" / "imgs" / "backgroundSections" / "HomeSectionHero.mp4"

BLUE = np.array([81, 162, 255], dtype=np.float32)
GOLD = np.array([255, 176, 32], dtype=np.float32)
ORANGE = np.array([255, 140, 66], dtype=np.float32)
TWILIGHT = np.array([18, 28, 48], dtype=np.float32)
WARM_SKY = np.array([42, 32, 58], dtype=np.float32)

random.seed(42)
np.random.seed(42)

RIBBONS = [
    {"y": 0.58, "amp": 0.04, "freq": 2.2, "phase": 0.0, "speed": 0.6, "color": GOLD, "alpha": 0.22},
    {"y": 0.66, "amp": 0.03, "freq": 1.6, "phase": 1.8, "speed": 0.45, "color": ORANGE, "alpha": 0.18},
    {"y": 0.48, "amp": 0.025, "freq": 2.8, "phase": 3.2, "speed": 0.55, "color": BLUE * 0.5 + GOLD * 0.5, "alpha": 0.14},
]

SKYLINE = [
    (0.04, 0.14), (0.07, 0.22), (0.10, 0.11), (0.14, 0.28), (0.18, 0.16),
    (0.22, 0.34), (0.27, 0.19), (0.31, 0.26), (0.36, 0.15), (0.41, 0.32),
    (0.46, 0.18), (0.52, 0.38), (0.58, 0.21), (0.64, 0.30), (0.70, 0.17),
    (0.76, 0.35), (0.82, 0.20), (0.88, 0.27), (0.93, 0.14), (0.97, 0.20),
]

MOTES = [
    {
        "x": random.uniform(0.05, 0.95),
        "y": random.uniform(0.42, 0.92),
        "size": random.uniform(8, 28),
        "phase": random.uniform(0, math.tau),
        "speed": random.uniform(0.2, 0.7),
        "drift": random.uniform(0.008, 0.02),
        "warmth": random.uniform(0.5, 1.0),
    }
    for _ in range(24)
]

YS = np.linspace(0, 1, HEIGHT, dtype=np.float32)
XS = np.linspace(0, 1, WIDTH, dtype=np.float32)
GRID_Y, GRID_X = np.meshgrid(YS, XS, indexing="ij")
RAY_OFFSETS = np.array([-0.18, -0.08, 0.0, 0.1, 0.2], dtype=np.float32)
FALLOFF = np.clip((0.82 - GRID_Y) / 0.5, 0.0, 1.0) ** 2
DY_RAY = np.clip(0.78 - GRID_Y, 0.001, 1.0)
VIGNETTE = np.clip(1.0 - 0.35 * np.sqrt((GRID_X - 0.5) ** 2 + (GRID_Y - 0.42) ** 2), 0.55, 1.0)


def _sky_gradient():
    top = 1.0 - GRID_Y
    horizon = np.clip((GRID_Y - 0.38) / 0.55, 0.0, 1.0) ** 1.4
    sky = TWILIGHT[None, None, :] * top[:, :, None] + WARM_SKY[None, None, :] * (1 - top[:, :, None])
    warm = (GOLD * 0.55 + ORANGE * 0.45)[None, None, :]
    return sky + warm * horizon[:, :, None] * 0.55


def _skyline_base():
    xs = np.linspace(0, 1, WIDTH, dtype=np.float32)
    heights = np.zeros(WIDTH, dtype=np.float32)
    for i in range(len(SKYLINE) - 1):
        x0, h0 = SKYLINE[i]
        x1, h1 = SKYLINE[i + 1]
        mask = (xs >= x0) & (xs <= x1)
        t = (xs[mask] - x0) / max(x1 - x0, 1e-6)
        heights[mask] = h0 + (h1 - h0) * t
    base_y = 0.82
    top_y = base_y - heights * 0.35
    y_idx = np.arange(HEIGHT, dtype=np.float32) / HEIGHT
    buildings = y_idx[:, None] >= top_y[None, :]
    layer = np.zeros((HEIGHT, WIDTH, 3), dtype=np.float32)
    layer[buildings] = np.array([8, 12, 22])
    reflect = np.exp(-((GRID_Y - base_y) ** 2) / 0.003) * np.clip((base_y - GRID_Y) * 4, 0, 1)
    layer += (ORANGE * 0.3 + GOLD * 0.7)[None, None, :] * reflect[:, :, None] * 0.15
    return layer, buildings, base_y


STATIC_SKY = _sky_gradient()
STATIC_SKYLINE, SKYLINE_MASK, SKYLINE_BASE = _skyline_base()


def horizon_glow(angle: float):
    y_center = 0.72 + 0.015 * math.sin(angle * 1.1)
    band = np.exp(-((GRID_Y - y_center) ** 2) / 0.008)
    pulse = 0.88 + 0.12 * math.sin(angle * 2)
    color = GOLD * 0.45 + ORANGE * 0.55
    return color[None, None, :] * band[:, :, None] * 0.42 * pulse


def light_rays(angle: float):
    cx = 0.5 + 0.08 * math.sin(angle * 0.7)
    origins = cx + RAY_OFFSETS
    dx = GRID_X[None, :, :] - origins[:, None, None]
    ray_angle = np.arctan2(dx, DY_RAY[None, :, :])
    spread = np.exp(-(ray_angle ** 2) / 0.015)
    phase = 0.06 + 0.02 * np.sin(angle * 1.5 + np.arange(5, dtype=np.float32)[:, None, None])
    intensity = (spread * FALLOFF[None, :, :] * phase).sum(axis=0)
    warm = (GOLD * 0.6 + ORANGE * 0.4)[None, None, :]
    return warm * intensity[:, :, None]


def flowing_ribbons(angle: float):
    layer = np.zeros((HEIGHT, WIDTH, 3), dtype=np.float32)
    for rib in RIBBONS:
        wave = rib["amp"] * np.sin(GRID_X * math.tau * rib["freq"] + angle * rib["speed"] + rib["phase"])
        line = np.exp(-((GRID_Y - rib["y"] - wave) ** 2) / 0.0012)
        layer += rib["color"][None, None, :] * line[:, :, None] * rib["alpha"]
    return layer


def skyline_silhouette(angle: float):
    pulse = int(0.04 * math.sin(angle * 0.8) * 8)
    layer = np.roll(STATIC_SKYLINE, pulse, axis=1).copy()
    reflect_pulse = 0.12 * math.sin(angle * 0.8)
    extra = np.exp(-((GRID_Y - SKYLINE_BASE) ** 2) / 0.003) * np.clip((SKYLINE_BASE - GRID_Y) * 4, 0, 1)
    layer += (ORANGE * 0.3 + GOLD * 0.7)[None, None, :] * extra[:, :, None] * reflect_pulse
    return layer


def light_motes(angle: float):
    layer = np.zeros((HEIGHT, WIDTH, 3), dtype=np.float32)
    for m in MOTES:
        px = (m["x"] + m["drift"] * math.sin(angle + m["phase"])) % 1.0
        py = m["y"] + 0.02 * math.sin(angle * m["speed"] + m["phase"])
        pulse = 0.5 + 0.5 * math.sin(angle * m["speed"] + m["phase"])
        r = m["size"] * (0.7 + 0.3 * pulse)
        cx, cy = int(px * WIDTH), int(py * HEIGHT)
        ri = int(r * 1.5) + 1
        x0, x1 = max(0, cx - ri), min(WIDTH, cx + ri + 1)
        y0, y1 = max(0, cy - ri), min(HEIGHT, cy + ri + 1)
        if x0 >= x1 or y0 >= y1:
            continue
        color = GOLD * m["warmth"] + ORANGE * (1 - m["warmth"] * 0.5)
        local_y, local_x = np.ogrid[y0:y1, x0:x1]
        dist = ((local_x - cx) ** 2 + (local_y - cy) ** 2) / max(r * r, 1)
        glow = np.exp(-dist * 3.5) * 0.35 * pulse
        layer[y0:y1, x0:x1] += color * glow[:, :, None]
    return layer


def render_frame(t: float) -> np.ndarray:
    angle = (t % DURATION) / DURATION * math.tau
    frame = STATIC_SKY.copy()
    frame += horizon_glow(angle)
    frame += light_rays(angle)
    frame += flowing_ribbons(angle)
    frame += skyline_silhouette(angle)
    frame += light_motes(angle)

    arr = np.clip(frame, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr).filter(ImageFilter.GaussianBlur(radius=1.0))
    result = np.array(img, dtype=np.float32) * VIGNETTE[:, :, None]
    return np.clip(result, 0, 255).astype(np.uint8)


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    total_frames = FPS * DURATION
    print(f"Generation de {total_frames} images ({WIDTH}x{HEIGHT})...")

    frames = []
    for i in range(total_frames):
        frames.append(render_frame(i / FPS))
        if (i + 1) % 24 == 0:
            print(f"  {i + 1}/{total_frames}")

    print(f"Encodage vers {OUTPUT}")
    iio.imwrite(
        OUTPUT,
        frames,
        fps=FPS,
        codec="libx264",
        pixelformat="yuv420p",
        output_params=["-crf", "23", "-preset", "medium", "-movflags", "+faststart"],
    )
    print(f"Termine : {OUTPUT.stat().st_size / (1024 * 1024):.2f} Mo")


if __name__ == "__main__":
    main()
