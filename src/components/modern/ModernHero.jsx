import { useEffect, useRef } from "react";
import { contact, modernCopy } from "../../data/index.js";

/* Ring cursor that grows over links and buttons */
function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      el.classList.toggle("big", !!e.target.closest("a,button"));
    };
    addEventListener("mousemove", move);
    return () => removeEventListener("mousemove", move);
  }, []);
  return <div className="cursor" ref={ref} />;
}

/* Buttons that lean toward the cursor */
const mag = {
  onMouseMove: (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${
      (e.clientY - r.top - r.height / 2) * 0.3
    }px)`;
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.transform = "";
  },
};

export default function ModernHero() {
  const stageRef = useRef(null);
  const tiltRef = useRef(null);

  /* Smooth 3D tilt: rAF lerp writes --mx/--my on the tilt (vanilla port of the demo) */
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stage = stageRef.current,
      tilt = tiltRef.current;
    if (!stage || !tilt) return;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      id;
    const move = (e) => {
      const r = stage.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const leave = () => {
      tx = ty = 0;
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      tilt.style.setProperty("--mx", cx * 2);
      tilt.style.setProperty("--my", cy * 2);
      id = requestAnimationFrame(loop);
    };
    stage.addEventListener("mousemove", move);
    stage.addEventListener("mouseleave", leave);
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      stage.removeEventListener("mousemove", move);
      stage.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <Cursor />
      <div className="hero">
        <div>
          <span className="eyebrow fade">{modernCopy.eyebrow}</span>
          <h1>
            <span className="line">
              <span style={{ "--i": 0 }}>Hi, I’m Tristan.</span>
            </span>
            <span className="line">
              <span style={{ "--i": 1 }}>
                I build <em>web apps</em>
              </span>
            </span>
            <span className="line">
              <span style={{ "--i": 2 }}>that feel alive.</span>
            </span>
          </h1>
          <p className="fade">{modernCopy.intro}</p>
          <div className="btns fade">
            <a className="btn p" href="#projects" {...mag}>
              View projects
            </a>
            <a className="btn" href={contact.resume} download {...mag}>
              Resume (PDF)
            </a>
          </div>
          <div className="social fade">
            <a href={contact.github}>GitHub</a>
            <a href={contact.linkedin}>LinkedIn</a>
            <a href={`mailto:${contact.email}`}>Email</a>
          </div>
        </div>

        <div className="stage" ref={stageRef}>
          <div className="tilt" ref={tiltRef}>
            <div className="blob" />
            <div className="ring" />
            <div className="photo">
              <img src="/avatar.webp" alt="Tristan Vegas" />
            </div>
            <span className="tchip c1">Next.js</span>
            <span className="tchip c2">React</span>
            <span className="tchip c3">OpenAI</span>
          </div>
        </div>
      </div>
    </>
  );
}
