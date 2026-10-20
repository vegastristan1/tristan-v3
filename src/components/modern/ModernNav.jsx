import { flushSync } from "react-dom";

/* Theme switch expands as a circle from the button (View Transitions API),
   plain instant toggle when unsupported or reduced-motion is on. */
function reveal(e, apply) {
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches)
    return apply();
  const b = e.currentTarget.getBoundingClientRect();
  const x = b.left + b.width / 2,
    y = b.top + b.height / 2;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document
    .startViewTransition(() => flushSync(apply))
    .ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 600, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
      ),
    )
    .catch(() => {}); // rapid double-click skips a transition — nothing to animate
}

export default function ModernNav({ dark, toggleTheme }) {
  return (
    <header>
      <div className="wrap">
        <nav>
          <a className="logo" href="#top">tristan.</a>
          <div className="links">
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <button
              className="theme"
              aria-label="Toggle dark mode"
              onClick={(e) => reveal(e, toggleTheme)}
            >
              {dark ? "☀" : "☾"}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
