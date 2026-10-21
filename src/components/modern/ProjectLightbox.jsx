import { useEffect, useRef, useState } from "react";

/* Fullscreen screenshot viewer — port of the design HTML's lightbox (vanilla JS → React).
   Esc/arrow keys, backdrop click, focus to close button on open + focus returned by parent. */
export default function ProjectLightbox({ project, onClose }) {
  const shots = project.shots;
  const n = shots.length;
  const [i, setI] = useState(0);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const key = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") setI((v) => (v - 1 + n) % n);
      else if (e.key === "ArrowRight") setI((v) => (v + 1) % n);
    };
    addEventListener("keydown", key);
    return () => {
      removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [n, onClose]);

  const step = (d) => setI((v) => (v + d + n) % n);
  const shot = shots[i];

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label="Project screenshots"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lbbox">
        <div className="lbhead">
          <strong>
            {project.name} — {shot.label} ({i + 1}/{n})
          </strong>
          <button ref={closeRef} className="lbx" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="lbframe">
          <div className="lbsc">
            <img src={shot.src} alt={`${project.name}: ${shot.label}`} />
          </div>
          <button className="lbn lbp" onClick={() => step(-1)} aria-label="Previous screenshot">
            ‹
          </button>
          <button className="lbn lbnx" onClick={() => step(1)} aria-label="Next screenshot">
            ›
          </button>
        </div>
        <div className="lbth">
          {shots.map((s, k) => (
            <button
              key={s.src}
              className={k === i ? "on" : ""}
              onClick={() => setI(k)}
              aria-label={s.label}
            >
              <img src={s.src} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
