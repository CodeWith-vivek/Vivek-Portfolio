"""
Extract the WebP frame sequence used by the cursor-tracking hero.

public/video/characterDark.mp4 and characterLight.mp4 share the same motion
(1280x720, 24fps, 240 frames). The head starts looking straight at the camera,
turns up -> up-right -> right -> down-right (frames 0-124), then down ->
down-left -> left -> up-left (frames 124-200), and eases back to centre
(frames 200-239).

Every 2nd frame is cropped to the character and saved, and each one is tagged
with the direction it is looking (gx: +right, gy: +up, length 1 = full turn),
interpolated from the hand-checked anchors below. At runtime the hero picks
the frame whose gaze vector is closest to the cursor's direction from the
face, so the eyes follow the pointer.

Frames are upscaled for sharpness on large/retina screens: Real-ESRGAN x4
(realesrgan-ncnn-vulkan, set ESRGAN_BIN to its .exe) is blended with a
Lanczos resize of the source, then saved at OUT_HEIGHT. Without ESRGAN_BIN it
falls back to Lanczos + sharpen.

Run: ESRGAN_BIN=/path/to/realesrgan-ncnn-vulkan.exe python scripts/extract_hero_frames.py
     python scripts/extract_hero_frames.py --key-only   (re-bake transparency only)
Requires: opencv-python-headless
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time

import cv2
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEO_DIR = os.path.join(ROOT, "public", "video")
FRAMES_DIR = os.path.join(ROOT, "public", "frames")

THEMES = {"dark": "characterDark.mp4", "light": "characterLight.mp4"}
STEP = 2
WEBP_QUALITY = 86
CROP_X = (0.16, 0.84)  # full shoulder width (subject spans ~0.19-0.81) plus a small margin
OUT_HEIGHT = 1440  # 2x source; sharp at full-height hero on retina screens
AI_MIX = 0.6  # share of Real-ESRGAN detail vs. plain Lanczos
ESRGAN_BIN = os.environ.get("ESRGAN_BIN")
# Light frames sit on a bright cream card that shows as a halo on the page, so
# their backdrop is baked to transparent here (not in the browser, where
# per-pixel work over 111 frames froze scrolling). The dark backdrop already
# matches the dark page, so it is left opaque.
KEYED_THEMES = {"light"}
KEY_LOW = 22  # colour distance to the backdrop: below = fully transparent
KEY_HIGH = 60  # above = fully opaque; alpha ramps in between

# (video frame, gaze x, gaze y) checked by eye from the viewer's perspective.
ANCHORS = [
    (0, 0.0, 0.0),
    (4, 0.0, 0.2),
    (8, 0.0, 0.5),
    (12, 0.0, 0.75),
    (16, 0.0, 1.0),
    (28, 0.05, 1.0),
    (32, 0.15, 0.95),
    (36, 0.35, 0.9),
    (40, 0.5, 0.8),
    (44, 0.65, 0.7),
    (60, 0.7, 0.65),
    (64, 0.8, 0.55),
    (72, 0.8, 0.55),
    (76, 0.9, 0.35),
    (80, 0.95, 0.2),
    (84, 1.0, 0.05),
    (88, 1.0, -0.05),
    (92, 1.0, -0.15),
    (96, 0.95, -0.3),
    (100, 0.9, -0.4),
    (104, 0.8, -0.55),
    (112, 0.75, -0.65),
    (120, 0.7, -0.7),
    (128, 0.6, -0.8),
    (132, 0.45, -0.9),
    (136, 0.3, -0.95),
    (140, 0.15, -1.0),
    (148, 0.05, -1.0),
    (152, -0.1, -1.0),
    (156, -0.25, -0.95),
    (160, -0.45, -0.85),
    (164, -0.6, -0.75),
    (168, -0.75, -0.6),
    (172, -0.85, -0.45),
    (176, -0.95, -0.25),
    (180, -1.0, -0.1),
    (184, -1.0, 0.1),
    (188, -0.9, 0.4),
    (192, -0.75, 0.65),
    (196, -0.7, 0.7),
    (200, -0.7, 0.5),
    (204, -0.6, 0.3),
    (208, -0.4, 0.1),
    (212, -0.25, 0.05),
    (216, -0.1, 0.0),
    (222, 0.0, 0.0),
    (239, 0.0, 0.0),
]


def gaze_at(frame_idx):
    for (f0, x0, y0), (f1, x1, y1) in zip(ANCHORS, ANCHORS[1:]):
        if f0 <= frame_idx <= f1:
            t = (frame_idx - f0) / (f1 - f0)
            return round(x0 + (x1 - x0) * t, 3), round(y0 + (y1 - y0) * t, 3)
    return 0.0, 0.0


def build_manifest(total):
    manifest = []
    seen_center = False
    for idx in range(0, total, STEP):
        gx, gy = gaze_at(idx)
        if gx == 0 and gy == 0:
            if seen_center:
                continue  # one centre frame is enough
            seen_center = True
        manifest.append({"src": idx, "file": f"f_{len(manifest):03d}.webp", "gx": gx, "gy": gy})
    return manifest


def unsharp(img, amount, sigma):
    blur = cv2.GaussianBlur(img, (0, 0), sigma)
    return cv2.addWeighted(img, 1 + amount, blur, -amount, 0)


def upscale_dir(src_dir, dst_dir):
    """Run Real-ESRGAN x4 over every PNG in src_dir. Returns False if unavailable."""
    if not ESRGAN_BIN or not os.path.isfile(ESRGAN_BIN):
        return False
    os.makedirs(dst_dir, exist_ok=True)
    subprocess.run(
        [ESRGAN_BIN, "-i", src_dir, "-o", dst_dir, "-n", "realesrgan-x4plus", "-f", "png"],
        cwd=os.path.dirname(ESRGAN_BIN),
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    return True


def key_backdrop(img):
    """Return BGRA with the flat backdrop made transparent.

    Only backdrop-coloured regions connected to the image border are removed,
    so similar colours inside the subject (eye whites, highlights) stay solid.
    Distance to the backdrop colour ramps alpha between KEY_LOW and KEY_HIGH
    for a soft hairline instead of a hard cutout.
    """
    h, w = img.shape[:2]
    corners = np.array([img[2, 2], img[2, w - 3]], dtype=np.float32)
    bg = corners.mean(axis=0)
    dist = np.linalg.norm(img.astype(np.float32) - bg, axis=2)

    near_bg = (dist < KEY_HIGH).astype(np.uint8)
    count, labels = cv2.connectedComponents(near_bg, connectivity=4)
    border = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
    backdrop = np.isin(labels, border[border != 0]) if count > 1 else np.zeros_like(near_bg, bool)

    ramp = np.clip((dist - KEY_LOW) / (KEY_HIGH - KEY_LOW), 0, 1)
    alpha = np.where(backdrop, ramp, 1.0)
    alpha = cv2.GaussianBlur(alpha.astype(np.float32), (0, 0), 0.8)  # soften stair-steps
    return np.dstack([img, (alpha * 255).astype(np.uint8)])


def write_frame(path, img, theme):
    if theme in KEYED_THEMES:
        img = key_backdrop(img)
    cv2.imwrite(path, img, [cv2.IMWRITE_WEBP_QUALITY, WEBP_QUALITY])


def finish(crop, ai):
    """Resize a source crop to the output size, mixing in AI detail when present."""
    size = (int(crop.shape[1] * OUT_HEIGHT / crop.shape[0]), OUT_HEIGHT)
    base = cv2.resize(crop, size, interpolation=cv2.INTER_LANCZOS4)
    if ai is None:
        return unsharp(base, 0.6, 1.2)
    detail = cv2.resize(ai, size, interpolation=cv2.INTER_AREA)
    # Pure ESRGAN output looks waxy on skin and beard; keep some source texture.
    return unsharp(cv2.addWeighted(detail, AI_MIX, base, 1 - AI_MIX, 0), 0.35, 1.0)


def extract(theme, filename, manifest, work_dir):
    cap = cv2.VideoCapture(os.path.join(VIDEO_DIR, filename))
    if not cap.isOpened():
        raise SystemExit(f"could not open {filename}")
    out_dir = os.path.join(FRAMES_DIR, theme)
    os.makedirs(out_dir, exist_ok=True)
    raw_dir = os.path.join(work_dir, theme, "raw")
    ai_dir = os.path.join(work_dir, theme, "x4")
    os.makedirs(raw_dir, exist_ok=True)

    for entry in manifest:
        cap.set(cv2.CAP_PROP_POS_FRAMES, entry["src"])
        ok, frame = cap.read()
        if not ok:
            raise SystemExit(f"failed to read frame {entry['src']} from {filename}")
        w = frame.shape[1]
        crop = frame[:, int(w * CROP_X[0]):int(w * CROP_X[1])]
        cv2.imwrite(os.path.join(raw_dir, entry["file"].replace(".webp", ".png")), crop)
    cap.release()

    print(f"{theme}: upscaling {len(manifest)} frames...", flush=True)
    has_ai = upscale_dir(raw_dir, ai_dir)
    if not has_ai:
        print(f"{theme}: ESRGAN_BIN not set, using Lanczos + sharpen only")

    for entry in manifest:
        png = entry["file"].replace(".webp", ".png")
        crop = cv2.imread(os.path.join(raw_dir, png))
        ai = cv2.imread(os.path.join(ai_dir, png)) if has_ai else None
        write_frame(os.path.join(out_dir, entry["file"]), finish(crop, ai), theme)

    print(f"{theme}: {len(manifest)} frames -> {out_dir}")


def key_existing():
    """Bake transparency into already-extracted frames without re-upscaling."""
    for theme in KEYED_THEMES:
        theme_dir = os.path.join(FRAMES_DIR, theme)
        done = 0
        for name in sorted(os.listdir(theme_dir)):
            path = os.path.join(theme_dir, name)
            img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
            if img is None or img.shape[2] == 4:
                continue  # unreadable or already keyed
            write_frame(path, img, theme)
            done += 1
        print(f"{theme}: keyed {done} frames in place")


def swap_into_place(staging, final):
    """Replace final with staging. Windows can briefly lock a folder a dev
    server is watching, so retry, and never delete the old one before the new
    one is in place."""
    backup = final + ".old"
    for attempt in range(3):
        try:
            if os.path.isdir(backup):
                shutil.rmtree(backup)
            if os.path.isdir(final):
                os.replace(final, backup)
            os.replace(staging, final)
            shutil.rmtree(backup, ignore_errors=True)
            return
        except PermissionError:
            if os.path.isdir(backup) and not os.path.isdir(final):
                os.replace(backup, final)  # restore the working set
            time.sleep(1 + attempt)
    # A watching dev server can hold the folder itself; overwriting the files
    # inside it still works (same file names, so nothing goes stale).
    shutil.copytree(staging, final, dirs_exist_ok=True)
    shutil.rmtree(staging, ignore_errors=True)


if __name__ == "__main__":
    if "--key-only" in sys.argv:
        key_existing()
        raise SystemExit(0)

    probe = cv2.VideoCapture(os.path.join(VIDEO_DIR, THEMES["dark"]))
    total = int(probe.get(cv2.CAP_PROP_FRAME_COUNT))
    probe.release()

    # Build into a staging folder so the live frames keep working until the end.
    final_dir = FRAMES_DIR
    FRAMES_DIR = final_dir + ".new"
    if os.path.isdir(FRAMES_DIR):
        shutil.rmtree(FRAMES_DIR)

    manifest = build_manifest(total)
    with tempfile.TemporaryDirectory() as work_dir:
        for theme, filename in THEMES.items():
            extract(theme, filename, manifest, work_dir)

    with open(os.path.join(FRAMES_DIR, "manifest.json"), "w") as f:
        json.dump([{"file": m["file"], "gx": m["gx"], "gy": m["gy"]} for m in manifest], f)

    swap_into_place(FRAMES_DIR, final_dir)
    print("manifest:", len(manifest), "entries ->", final_dir)
