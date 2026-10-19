import { contact, education, languages, modernCopy } from "../../data/index.js";

export default function ModernEducation() {
  return (
    <section>
      <div className="two">
        <div>
          <div className="label">Education</div>
          <h2>Background</h2>
          {education.map((e) => (
            <div key={e.degree} className="card">
              <h3>{e.degree}</h3>
              <p>{[e.school, e.period].filter(Boolean).join(" · ")}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="label">Languages</div>
          <h2>I speak</h2>
          <div className="card">
            <div className="chips">
              {languages.map((l) => (
                <span key={l} className="chip">{l}</span>
              ))}
            </div>
            <p>{modernCopy.basedLine}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
