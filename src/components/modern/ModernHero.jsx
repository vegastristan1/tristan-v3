import { contact, modernCopy } from "../../data/index.js";

// Profile picture: public/avatar.webp (was the chibi SVG placeholder — see README.md in this folder to restore it).
// Hover avatar → crossfade to public/original-avatar.png (pixel-dissolve upgrade noted in modern.css).
const widestWord = [...modernCopy.heroRotating].sort((a, b) => b.length - a.length)[0];
export default function ModernHero() {
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
              <b key={w} style={{ animationDelay: `${i * 3}s` }}>{w}</b>
            ))}
          </span>
          <span className="sr-only">{modernCopy.heroRotating[0]}</span> that feel easy.
        </h1>
        <p>{modernCopy.intro}</p>
        <div className="btns">
          <a className="btn p" href="#projects">View projects</a>
          <a className="btn" href={contact.resume}>Resume (PDF)</a>
        </div>
        <div className="social">
          <a href={contact.github}>GitHub</a>
          <a href={contact.linkedin}>LinkedIn</a>
          <a href={`mailto:${contact.email}`}>Email</a>
        </div>
      </div>
      <label className="avatar">
        <img src="/avatar.webp" alt="Tristan Vegas" />
        <img className="alt" src="/original-avatar.png" alt="" aria-hidden="true" />
      </label>
    </div>
  );
}
