import { useState } from "react";
import { projects } from "../../data/index.js";
import ProjectLightbox from "./ProjectLightbox.jsx";

export default function ModernProjects() {
  /* lb = { project, opener } — opener gets focus back on close (design behavior) */
  const [lb, setLb] = useState(null);
  const open = (project, e) => setLb({ project, opener: e.currentTarget });
  const close = () => {
    lb?.opener?.focus();
    setLb(null);
  };

  return (
    <section id="projects">
      <div className="label">Selected work</div>
      <h2>Projects</h2>
      <div className="grid">
        {projects.map((p, i) => {
          const feat = i < 2;
          const media = Array.isArray(p.shots) ? (
            <div
              className="album"
              role="button"
              tabIndex={0}
              aria-label={`Open ${p.name} screenshots`}
              onClick={(e) => open(p, e)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(p, e);
                }
              }}
            >
              {p.shots.map((s, k) => (
                <img
                  key={s.src}
                  src={s.src}
                  alt=""
                  loading="lazy"
                  style={{ "--p": k, zIndex: p.shots.length - k }}
                />
              ))}
              <span className="albumcap">{p.shots.length} screenshots · click to view</span>
            </div>
          ) : p.shots === "soon" ? (
            <div className="soon" aria-hidden="true">
              <span>
                📷 Screenshot
                <br />
                coming soon
              </span>
            </div>
          ) : null;

          return (
            <div
              key={p.name}
              className={`card${feat ? " feat" : ""}${feat && media ? " has-album" : ""}`}
            >
              {media}
              <div className="meta">
                {[p.period, (p.tools || []).join(", ")].filter(Boolean).join(" · ")}
              </div>
              <h3>{p.name}</h3>
              <p style={{ margin: 0 }}>{p.description}</p>
              {p.url && (
                <a
                  className="btn demo-btn"
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.urlLabel || "Live demo"} ↗
                </a>
              )}
            </div>
          );
        })}
      </div>
      {lb && <ProjectLightbox project={lb.project} onClose={close} />}
    </section>
  );
}
