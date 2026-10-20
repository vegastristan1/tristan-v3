# Modern components (v1) — notes

## Profile picture placeholder (chibi SVG)

The hero/header section of the modern v1 design originally used a hand-drawn chibi SVG illustration of Tristan as a **profile-picture placeholder** (inside the circular `.avatar` frame), with a "📷 click to add your photo" tag and an upload-on-click handler.

It was replaced on 2026-10-20 by a real photo: `public/avatar.webp`. The same day the hero became the interactive 3D tilt stage (from `new-version-modern/Interactive Hero Demo/`), so the photo now renders inside the stage's `.photo` frame in `ModernHero.jsx`:

```jsx
<div className="photo">
  <img src="/avatar.webp" alt="Tristan Vegas" />
</div>
```

The photo auto-swaps to `public/original-avatar.png` every 3s with a 0.4s fade crossfade (`.photo img.alt` in `modern.css`); under `prefers-reduced-motion` it stays on `avatar.webp`. No pixel/canvas mode — fade only.

### To restore the chibi placeholder

Add this component to `ModernHero.jsx` and render `<Chibi />` instead of the `<img>`:

```jsx
function Chibi() {
  return (
    <svg viewBox="0 0 200 200" aria-label="Chibi illustration of Tristan">
      <ellipse cx="100" cy="186" rx="52" ry="8" fill="#000" opacity=".08" />
      <path d="M58 190c0-30 18-46 42-46s42 16 42 46z" fill="#c4552d" />
      <path d="M88 146l12 14 12-14" fill="none" stroke="#f6e1d6" strokeWidth="4" strokeLinecap="round" />
      <rect x="72" y="158" width="56" height="32" rx="4" fill="#3b3a40" /><circle cx="100" cy="174" r="4" fill="#f08a5d" />
      <circle cx="100" cy="88" r="52" fill="#f5cfae" />
      <path d="M46 86c-4-44 28-56 54-56s60 12 54 56c-6-20-20-28-34-30-14 6-34 8-48 2-14 4-22 14-26 28z" fill="#2a2420" />
      <circle cx="80" cy="94" r="7" fill="#2a2420" /><circle cx="120" cy="94" r="7" fill="#2a2420" />
      <circle cx="82.5" cy="91.5" r="2.5" fill="#fff" /><circle cx="122.5" cy="91.5" r="2.5" fill="#fff" />
      <ellipse cx="68" cy="108" rx="8" ry="5" fill="#f19a8a" opacity=".7" /><ellipse cx="132" cy="108" rx="8" ry="5" fill="#f19a8a" opacity=".7" />
      <path d="M90 112q10 9 20 0" fill="none" stroke="#2a2420" strokeWidth="3" strokeLinecap="round" />
      <g fill="none" stroke="#2a2420" strokeWidth="3"><circle cx="80" cy="94" r="13" /><circle cx="120" cy="94" r="13" /><path d="M93 94h14" /></g>
    </svg>
  );
}
```

The original click-to-upload behavior (FileReader → replace SVG with the chosen image) and the `.tag` element are gone. Note: the old `.avatar` / `.avatar .tag` CSS was removed with the tilt-stage port — the chibi SVG now lives inside `.photo` (which clips it, so drop the bottom ellipse if it gets cut).
