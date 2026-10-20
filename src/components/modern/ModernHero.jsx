import { useEffect, useRef, useState } from "react";
import { avatarTransition, contact, modernCopy } from "../../data/index.js";

// Profile picture: public/avatar.webp (was the chibi SVG placeholder — see README.md in this folder to restore it).
// Avatar auto-swaps every 3s: fade = crossfade, pixel1 = current photo pops out in tiles revealing the new one,
// pixel2 = new photo fills in tile-by-tile. Layer stack lives in modern.css.
const widestWord = [...modernCopy.heroRotating].sort(
  (a, b) => b.length - a.length,
)[0];

const PX_GRID = 50; // 50×50 = 2500 tiny tiles — raise = smaller pixels
const PX_LADDER = Array.from({ length: 15 }, (_, i) => (i / 10) ** 2); // fraction of tiles present: .01 = 1 box → 1 = all 100 (quadratic = slow start, accelerating fill)
const PX_STEP_MS = 67;
const isPixel = avatarTransition === "pixel1" || avatarTransition === "pixel2";

function shuffledTiles() {
  const t = Array.from({ length: PX_GRID * PX_GRID }, (_, i) => i);
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

function drawTiles(canvas, img, frac, order) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  if (!frac || !img.naturalWidth) return;
  const nw = img.naturalWidth,
    nh = img.naturalHeight;
  // cover-crop centered = CSS object-fit: cover on the imgs below (canvas aspect must match .avatar)
  const s = Math.max(W / nw, H / nh),
    sw = W / s,
    sh = H / s,
    sx = (nw - sw) / 2,
    sy = (nh - sh) / 2,
    tw = sw / PX_GRID,
    th = sh / PX_GRID,
    dW = W / PX_GRID,
    dH = H / PX_GRID;
  const shown = Math.round(frac * PX_GRID * PX_GRID);
  for (let k = 0; k < shown; k++) {
    const idx = order[k],
      c = idx % PX_GRID,
      r = (idx / PX_GRID) | 0;
    ctx.drawImage(
      img,
      sx + c * tw,
      sy + r * th,
      tw,
      th,
      c * dW,
      r * dH,
      dW,
      dH,
    );
  }
}

export default function ModernHero() {
  const [showAlt, setShowAlt] = useState(false);
  const baseRef = useRef(null);
  const altRef = useRef(null);
  const pxlRef = useRef(null);
  const animRef = useRef({ t: 0, seq: 0 });
  const showRef = useRef(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; // static avatar, no auto-cycling
    const play = (toAlt) => {
      if (!isPixel) return;
      const canvas = pxlRef.current,
        base = baseRef.current,
        alt = altRef.current;
      if (!canvas || !base || !alt) return;
      const a = animRef.current;
      clearTimeout(a.t);
      const seq = ++a.seq;
      const p1 = avatarTransition === "pixel1";
      const ascending = p1 ? !toAlt : toAlt;
      const frames = ascending ? PX_LADDER : [...PX_LADDER].reverse();
      const src = p1 ? base : alt;
      const order = shuffledTiles();
      let i = 0;
      const step = () => {
        if (a.seq !== seq) return;
        const frac = frames[i++];
        // pixel1 handoffs: swap img↔canvas in the same tick as the matching frame, so it's never visible
        if (p1 && toAlt && i === 1) {
          base.style.opacity = "0";
          alt.style.opacity = "1";
        }
        drawTiles(canvas, src, frac, order);
        if (i < frames.length) a.t = setTimeout(step, PX_STEP_MS);
        else if (p1 && !toAlt) {
          base.style.opacity = "1";
          alt.style.opacity = "0";
          drawTiles(canvas, src, 0, order);
        }
      };
      step();
    };
    const id = setInterval(() => {
      const next = !showRef.current;
      showRef.current = next;
      setShowAlt(next);
      play(next);
    }, 3000);
    return () => {
      clearInterval(id);
      clearTimeout(animRef.current.t);
    };
  }, []);

  return (
    <div className="hero">
      <div>
        <span className="eyebrow">{modernCopy.eyebrow}</span>
        <h1>
          Hi, I’m Tristan.
          <br />I build{" "}
          <span className="rot" aria-hidden="true">
            <span className="sizer">{widestWord}</span>
            {modernCopy.heroRotating.map((w, i) => (
              <b key={w} style={{ animationDelay: `${i * 3}s` }}>
                {w}
              </b>
            ))}
          </span>
          <span className="sr-only">{modernCopy.heroRotating[0]}</span> that
          feel easy.
        </h1>
        <p>{modernCopy.intro}</p>
        <div className="btns">
          <a className="btn p" href="#projects">
            View projects
          </a>
          <a className="btn" href={contact.resume}>
            Resume (PDF)
          </a>
        </div>
        <div className="social">
          <a href={contact.github}>GitHub</a>
          <a href={contact.linkedin}>LinkedIn</a>
          <a href={`mailto:${contact.email}`}>Email</a>
        </div>
      </div>
      <label
        className={`avatar ${avatarTransition}${showAlt ? " show-alt" : ""}`}
      >
        <img ref={baseRef} src="/avatar.webp" alt="Tristan Vegas" />
        <img
          ref={altRef}
          className="alt"
          src="/original-avatar.png"
          alt=""
          aria-hidden="true"
        />
        <canvas
          ref={pxlRef}
          className="pxl"
          width="900"
          height="1200"
          aria-hidden="true"
        />
      </label>
    </div>
  );
}
