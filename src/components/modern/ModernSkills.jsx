import { skillGroups } from "../../data/index.js";

export default function ModernSkills() {
  return (
    <section id="skills">
      <div className="label">Toolbox</div>
      <h2>Skills</h2>
      <div className="grid">
        {skillGroups.map((g) => (
          <div key={g.title} className="card">
            <h3 style={{ fontSize: 17 }}>{g.title}</h3>
            <div className="chips">
              {g.skills.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
