import { ai } from "../../data/index.js";

export default function ModernAi() {
  return (
    <section id="ai">
      <div className="label">Now exploring</div>
      <h2>AI learning</h2>
      <div className="card">
        <p className="ai-p">{ai.statement}</p>
        <div className="chips">
          {ai.items.map((i) => (
            <span key={i.name} className="chip">{i.name} · {i.status}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
