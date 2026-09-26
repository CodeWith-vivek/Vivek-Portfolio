import { useEffect, useRef, useState } from "react";
import { asset } from "../utils/asset";

// Frames and gaze tags come from scripts/extract_hero_frames.py. Each frame
// carries the direction it looks (gx: +right, gy: +up, length 1 = full turn).
// Light-theme frames already have their backdrop baked to transparent there;
// nothing here touches pixels, so loading never blocks scrolling.
const EYE_Y = 0.36; // eye line as a fraction of frame height, used as the tracking origin
const HAIR_TOP = 0.09; // top of the hair as a fraction of frame height (measured 0.094-0.111)
const MOBILE_GAP = 12; // px between the name and the top of the hair on phones
const ASPECT = 870 / 720; // frame width / height (crop 0.16-0.84 of 1280x720)
const REACH = 0.42; // cursor this far from the eyes (fraction of the shorter viewport side) = full turn
const DEADZONE = 0.08; // normalised distance treated as "looking at me"
const FOLLOW = 0.45; // smoothing towards the cursor per frame (higher = less lag)
const MAG_WEIGHT = 0.02; // tie-break only: direction decides the frame, turn strength picks among equals
const SWITCH_MARGIN = 0.004; // hysteresis so near-equal frames don't flicker
const DESKTOP_MIN = 768;

// With a mouse the head follows the cursor from the start. On touch screens it
// follows the finger instead, and the other ~110 frames only download once the
// visitor first touches the screen, so phones that never interact stay light.
const hasMouse = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const TOUCH_HOLD_MS = 2500; // keep looking at the last touch this long, then back to eye contact

const getTheme = () =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

// Resolve once the image is decoded, so the first drawImage doesn't stall a frame.
async function loadImage(src) {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

// Offset of `el` from `ancestor`, ignoring CSS transforms (the name text
// slides in with GSAP, which would skew getBoundingClientRect).
function offsetWithin(el, ancestor) {
  let top = 0;
  let node = el;
  while (node && node !== ancestor) {
    top += node.offsetTop;
    node = node.offsetParent;
  }
  return top;
}

const angleDiff = (a, b) => Math.abs(((a - b + 3 * Math.PI) % (2 * Math.PI)) - Math.PI);

// Draws exactly one pre-extracted frame on a 2D canvas: no CSS 3D, no video
// seeking, no blending between frames.
const HeroCharacter = () => {
  const canvasRef = useRef(null);
  const manifestRef = useRef([]);
  const setsRef = useRef({}); // theme -> sparse array of decoded frames, filled as they arrive
  const loadingRef = useRef({}); // theme -> in-flight load promise
  const themeRef = useRef(getTheme());
  const pointerRef = useRef(null);
  const dirtyRef = useRef(true);
  const loadRestRef = useRef(() => {}); // loads every frame for the active theme
  const [ready, setReady] = useState(false);

  // Load the centre frame first so the hero shows immediately, then the rest.
  useEffect(() => {
    let cancelled = false;

    let tracking = hasMouse(); // becomes true on first touch for touch screens
    const restLoading = {};
    const url = (theme, m) => asset(`frames/${theme}/${m.file}`);

    // Centre frame first so the hero shows immediately.
    const loadTheme = (theme) => {
      if (loadingRef.current[theme]) return loadingRef.current[theme];
      const manifest = manifestRef.current;
      const set = new Array(manifest.length).fill(null);
      setsRef.current[theme] = set;
      const centre = manifest.findIndex((m) => m.gx === 0 && m.gy === 0);

      const promise = loadImage(url(theme, manifest[centre])).then((img) => {
        if (cancelled) return;
        set[centre] = img;
        if (theme === themeRef.current) {
          dirtyRef.current = true;
          setReady(true);
        }
        if (tracking) loadRest(theme);
      });
      loadingRef.current[theme] = promise;
      return promise;
    };

    // Every other frame, needed only once the head can actually turn.
    const loadRest = (theme) => {
      const set = setsRef.current[theme];
      if (restLoading[theme] || !set) return;
      restLoading[theme] = true;
      manifestRef.current.forEach((m, i) => {
        if (set[i]) return;
        loadImage(url(theme, m))
          .then((frame) => {
            if (!cancelled) set[i] = frame;
          })
          .catch(() => {});
      });
    };

    loadRestRef.current = () => {
      tracking = true;
      if (manifestRef.current.length) loadRest(themeRef.current);
    };

    (async () => {
      const res = await fetch(asset("frames/manifest.json"));
      manifestRef.current = (await res.json()).map((m) => ({
        ...m,
        mag: Math.min(Math.hypot(m.gx, m.gy), 1),
        angle: Math.atan2(m.gy, m.gx),
      }));
      if (cancelled) return;

      // The other theme's set (5-9 MB) loads only if the visitor toggles.
      await loadTheme(themeRef.current);
    })().catch(() => {});

    // Theme toggle: switch as soon as the new set's centre frame is ready.
    const observer = new MutationObserver(() => {
      const theme = getTheme();
      if (theme === themeRef.current || !manifestRef.current.length) return;
      themeRef.current = theme;
      dirtyRef.current = true;
      loadTheme(theme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let releaseTimer;
    const onMove = (e) => {
      if (e.pointerType !== "mouse") return; // touches are handled below
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = (e) => {
      if (e.pointerType === "mouse") pointerRef.current = null;
    };
    // Touch: look where the finger is (tap or drag, including while scrolling),
    // hold that gaze briefly after lifting, then return to eye contact.
    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      clearTimeout(releaseTimer);
      pointerRef.current = { x: t.clientX, y: t.clientY };
      loadRestRef.current();
    };
    const onTouchEnd = () => {
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => {
        pointerRef.current = null;
      }, TOUCH_HOLD_MS);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      clearTimeout(releaseTimer);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Desktop: eye line level with the "VIVEK ANAND" name, beside it.
  // Phones: the name spans the width, so the head starts just below it and the
  // character fills the rest of the screen, shoulders running off the edges.
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest("section");
    if (!canvas || !section) return undefined;

    const layout = () => {
      const names = section.querySelectorAll(".name-text");
      if (names.length === 0) {
        canvas.style.height = "";
        return;
      }
      const first = names[0];
      const last = names[names.length - 1];
      const nameTop = offsetWithin(first, section);
      const nameBottom = offsetWithin(last, section) + last.offsetHeight;
      const sectionH = section.clientHeight;

      if (window.innerWidth < DESKTOP_MIN) {
        const height = (sectionH - nameBottom - MOBILE_GAP) / (1 - HAIR_TOP);
        canvas.style.height = `${Math.max(height, sectionH * 0.4)}px`;
        return;
      }
      const nameMid = (nameTop + nameBottom) / 2;
      const height = Math.min((sectionH - nameMid) / (1 - EYE_Y), sectionH * 1.1);
      canvas.style.height = `${Math.max(height, sectionH * 0.5)}px`;
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(section);
    document.fonts?.ready.then(layout);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const manifest = manifestRef.current;
    const centerIndex = manifest.findIndex((m) => m.mag === 0);

    // Size and on-screen position are cached, not read every frame: reading
    // layout inside the render loop forced a reflow on each tick.
    const box = { w: canvas.clientWidth, h: canvas.clientHeight };
    let rect = null; // refreshed lazily after scroll/resize

    const resize = (w, h) => {
      box.w = w;
      box.h = h;
      rect = null;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Resizing the canvas resets context state, so reapply every time.
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      dirtyRef.current = true;
    };
    resize(box.w, box.h);
    const ro = new ResizeObserver(([entry]) =>
      resize(entry.contentRect.width, entry.contentRect.height)
    );
    ro.observe(canvas);
    const invalidateRect = () => {
      rect = null;
    };
    window.addEventListener("scroll", invalidateRect, { passive: true });

    const gaze = { x: 0, y: 0 };
    let current = centerIndex;
    let drawn = null;
    let rafId = null;

    // Direction first, then turn strength: a slight right cursor never picks a
    // "slightly left" frame just because its magnitude is closer. Frames still
    // downloading are skipped.
    const score = (m, i, set, angle, mag) => {
      if (!set[i]) return Infinity;
      if (m.mag < 0.12) return mag < DEADZONE * 2 ? 0 : Infinity;
      const da = angleDiff(angle, m.angle) / Math.PI;
      return da * da + MAG_WEIGHT * (mag - m.mag) ** 2;
    };

    const pickFrame = (x, y, set) => {
      const mag = Math.min(Math.hypot(x, y), 1);
      if (mag < DEADZONE) return centerIndex;
      const angle = Math.atan2(y, x);
      let best = current;
      let bestS = Infinity;
      manifest.forEach((m, i) => {
        const s = score(m, i, set, angle, mag);
        if (s < bestS) {
          bestS = s;
          best = i;
        }
      });
      if (bestS === Infinity) return centerIndex;
      return score(manifest[current], current, set, angle, mag) - bestS > SWITCH_MARGIN
        ? best
        : current;
    };

    const draw = () => {
      rafId = requestAnimationFrame(draw);

      // Keep showing the previous theme until the new one's first frame lands.
      let set = setsRef.current[themeRef.current];
      if (!set?.[centerIndex]) set = setsRef.current[themeRef.current === "dark" ? "light" : "dark"];
      if (!set) return;

      const { w: cw, h: ch } = box;
      if (!cw || !ch) return;

      // Same scale on both axes so the cursor's direction is preserved.
      let tx = 0;
      let ty = 0;
      const p = pointerRef.current;
      if (p) {
        rect ??= canvas.getBoundingClientRect();
        const reach = Math.min(window.innerWidth, window.innerHeight) * REACH;
        tx = (p.x - (rect.left + rect.width / 2)) / reach;
        ty = -(p.y - (rect.top + rect.height * EYE_Y)) / reach;
        const len = Math.hypot(tx, ty);
        if (len > 1) {
          tx /= len;
          ty /= len;
        }
      }
      gaze.x += (tx - gaze.x) * FOLLOW;
      gaze.y += (ty - gaze.y) * FOLLOW;

      current = pickFrame(gaze.x, gaze.y, set);
      const img = set[current] || set[centerIndex];
      // Only repaint when the picture actually changes.
      if (!img || (img === drawn && !dirtyRef.current)) return;
      drawn = img;
      dirtyRef.current = false;

      const scale = Math.min(cw / img.width, ch / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, ch - dh, dw, dh);
    };

    // Run the loop only while the hero is on screen.
    const start = () => {
      if (rafId === null) {
        dirtyRef.current = true;
        rafId = requestAnimationFrame(draw);
      }
    };
    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);

    return () => {
      window.removeEventListener("scroll", invalidateRect);
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [ready]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ aspectRatio: ASPECT }}
      className="hero-character absolute bottom-0 left-1/2 -translate-x-1/2 block max-w-none"
    />
  );
};

export default HeroCharacter;
