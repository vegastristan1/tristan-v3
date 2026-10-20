// npm i motion lenis   (Lenis is optional, see bottom)
// Put avatar.webp in /public and hero.css next to this file.
import { useRef, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import "./hero.css";

/* Buttons that lean toward the cursor */
function Magnetic({ className, ...props }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 14 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 14 });
  return (
    <motion.a
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      {...props}
    />
  );
}

/* Dark mode toggle that expands as a circle from the button */
function ThemeToggle() {
  const root = document.documentElement;
  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  const [dark, setDark] = useState(isDark);

  useEffect(() => {
    try { const t = localStorage.getItem("theme"); if (t) { root.dataset.theme = t; setDark(t === "dark"); } } catch {}
  }, []);

  const toggle = (e) => {
    const next = dark ? "light" : "dark";
    const apply = () => flushSync(() => {
      root.dataset.theme = next;
      setDark(!dark);
      try { localStorage.setItem("theme", next); } catch {}
    });
    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion:reduce)").matches) return apply();
    const b = e.currentTarget.getBoundingClientRect();
    const x = b.left + b.width / 2, y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() =>
      root.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 600, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      )
    );
  };
  return <button className="theme" onClick={toggle} aria-label="Toggle dark mode">{dark ? "☀" : "☾"}</button>;
}

/* Ring cursor that grows over links and buttons */
function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      el.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      el.classList.toggle("big", !!e.target.closest("a,button"));
    };
    addEventListener("mousemove", move);
    return () => removeEventListener("mousemove", move);
  }, []);
  return <div className="cursor" ref={ref} />;
}

export default function Hero() {
  const mx = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const rotateY = useTransform(mx, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(my, [-0.5, 0.5], [12, -12]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <>
      <Cursor />
      <ThemeToggle />
      <section className="hero">
        <div>
          <span className="eyebrow fade">Open to work · Philippines 🇵🇭</span>
          <h1>
            <span className="line"><span style={{ "--i": 0 }}>Hi, I’m Tristan.</span></span>
            <span className="line"><span style={{ "--i": 1 }}>I build <em>web apps</em></span></span>
            <span className="line"><span style={{ "--i": 2 }}>that feel alive.</span></span>
          </h1>
          <p className="fade">Full-stack developer working with Next.js, React, TypeScript, Laravel and PostgreSQL, now shipping AI-powered apps.</p>
          <div className="btns fade">
            <Magnetic className="btn p" href="#projects">View projects</Magnetic>
            <Magnetic className="btn" href="/Tristan-Vegas-Resume.pdf">Resume (PDF)</Magnetic>
          </div>
        </div>

        <div className="stage" onMouseMove={onMove} onMouseLeave={reset}>
          <motion.div className="tilt" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
            <div className="blob" />
            <div className="ring" />
            <div className="photo"><img src="/avatar.webp" alt="Tristan Vegas" /></div>
            <span className="chip c1">Next.js</span>
            <span className="chip c2">React</span>
            <span className="chip c3">OpenAI</span>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* Smooth scrolling: add once in main.jsx / App.jsx
import Lenis from "lenis";
useEffect(() => {
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const lenis = new Lenis();
  let id; const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
  id = requestAnimationFrame(raf);
  return () => { cancelAnimationFrame(id); lenis.destroy(); };
}, []);
*/
