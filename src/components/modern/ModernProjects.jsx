import { projects } from "../../data/index.js";

export default function ModernProjects() {
  return (
    <section id="projects">
      <div className="label">Selected work</div>
      <h2>Projects</h2>
      <div className="grid">
        {projects.map((p, i) => (
          <div key={p.name} className={i < 2 ? "card feat" : "card"}>
            <div className="meta">
              {[p.period, (p.tools || []).join(", ")].filter(Boolean).join(" · ")}
            </div>
            <h3>{p.name}</h3>
            <p style={{ margin: 0 }}>{p.description}</p>
            {p.url && (
              <a className="btn demo-btn" href={p.url}>
                Live demo ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
