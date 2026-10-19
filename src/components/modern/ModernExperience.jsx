import { experience } from "../../data/index.js";

export default function ModernExperience() {
  return (
    <section id="experience">
      <div className="label">Career</div>
      <h2>Experience</h2>
      <div className="tl">
        {experience.map((e) => (
          <div key={e.title} className="job">
            <h3>{e.title} · {e.company}</h3>
            <div className="when">{[e.period, e.place].filter(Boolean).join(" · ")}</div>
            <ul>
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
