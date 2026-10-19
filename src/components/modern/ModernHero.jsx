import { contact, modernCopy } from "../../data/index.js";

// Profile picture: public/avatar.webp (was the chibi SVG placeholder — see README.md in this folder to restore it).
export default function ModernHero() {
  return (
    <div className="hero">
      <div>
        <span className="eyebrow">{modernCopy.eyebrow}</span>
        <h1>
          Hi, I’m Tristan.
          <br />I build <span>web apps</span> that feel easy.
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
      </label>
    </div>
  );
}
