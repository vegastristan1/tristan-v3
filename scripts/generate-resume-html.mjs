// Generates scripts/resume-v2.html from src/data/resume.js — the single data source.
// Run automatically by build-resume-v2.ps1, or: node scripts/generate-resume-html.mjs
// Items with `resume: false` are skipped. References are rendered here ONLY (never on the site).
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  profile,
  contact,
  experience,
  projects,
  skillGroups,
  ai,
  softSkills,
  education,
  languages,
  references,
} from "../src/data/resume.js";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// Consistent en dash for ranges like "2021 - Present"
const period = (s) => esc(String(s).replace(/ - /g, " – "));

const on = (items) => items.filter((i) => i.resume !== false);

const expHtml = on(experience)
  .map((e) => {
    const meta = [period(e.period), e.type, e.place].filter(Boolean).join(" &nbsp;|&nbsp; ");
    const stack = e.stack?.length
      ? `\n    <p class="stack">${e.stack.map(esc).join(" &nbsp;·&nbsp; ")}</p>`
      : "";
    const bullets = e.bullets?.length
      ? `\n    <ul>${e.bullets.map((b) => `\n      <li>${esc(b)}</li>`).join("\n    ")}</ul>`
      : "";
    return `\n    <h3>${esc(e.title)} &nbsp;|&nbsp; ${esc(e.company)}</h3>\n    <p class="meta">${meta}</p>${stack}${bullets}`;
  })
  .join("\n");

const skillsHtml = skillGroups
  .map(
    (g) =>
      `\n    <div class="row"><b>${esc(g.title)}:</b> ${g.skills.map(esc).join(", ")}</div>`
  )
  .join("");

const projHtml = on(projects)
  .map((p) => {
    const bullets = p.bullets?.length
      ? `\n      <ul>${p.bullets.map((b) => `\n        <li>${esc(b)}</li>`).join("\n      ")}</ul>`
      : "";
    const live = p.url ? `\n      <p class="muted">Live: ${esc(p.url.replace(/^https?:\/\//, ""))}</p>` : "";
    const tools = p.tools?.length
      ? `\n      <p class="tools">${p.tools.map(esc).join(" &nbsp;·&nbsp; ")}</p>`
      : "";
    return `\n    <div class="proj">\n      <h3>${esc(p.name)}</h3>\n      <p>${esc(p.description)}</p>${bullets}${live}${tools}\n    </div>`;
  })
  .join("\n");

const aiChips = ai.items
  .map((i) => `\n    <span class="chip">${esc(i.name)} &mdash; ${esc(i.status)}</span>`)
  .join("");

const refsHtml = references.length
  ? `\n    <h2>References</h2>${references
      .map(
        (r) => `\n    <div class="row">
      <b>${esc(r.name)}</b> &mdash; ${esc(r.title)}, ${esc(r.company)}<br />
      <span class="muted">${esc(r.email)} &nbsp;·&nbsp; ${esc(r.phone)}</span>
    </div>`
      )
      .join("\n")}`
  : "";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${esc(profile.name)} — Resume V2</title>
    <style>
      @page {
        size: A4;
        margin: 14mm 15mm;
      }
      * {
        box-sizing: border-box;
      }
      body {
        font-family: "Segoe UI", Calibri, Arial, sans-serif;
        color: #18181b;
        font-size: 10.5pt;
        line-height: 1.45;
        margin: 0;
      }
      h1 {
        font-size: 24pt;
        margin: 0 0 2pt;
        letter-spacing: -0.5pt;
      }
      .headline {
        color: #047857;
        font-size: 11.5pt;
        font-weight: 700;
        margin: 0 0 6pt;
      }
      .contact {
        color: #52525b;
        font-size: 9pt;
        margin: 0;
      }
      .contact span {
        white-space: nowrap;
      }
      hr.rule {
        border: none;
        border-top: 2pt solid #059669;
        margin: 10pt 0;
      }
      h2 {
        color: #047857;
        font-size: 12pt;
        text-transform: uppercase;
        letter-spacing: 0.6pt;
        margin: 14pt 0 6pt;
        border-bottom: 0.75pt solid #a7f3d0;
        padding-bottom: 3pt;
      }
      h3 {
        font-size: 11pt;
        margin: 9pt 0 1pt;
      }
      .meta {
        color: #52525b;
        font-size: 9pt;
        margin: 0 0 2pt;
      }
      .stack {
        color: #047857;
        font-size: 9pt;
        font-weight: 600;
        margin: 0 0 3pt;
      }
      ul {
        margin: 3pt 0 6pt;
        padding-left: 16pt;
      }
      li {
        margin-bottom: 2pt;
      }
      .row {
        margin-bottom: 3pt;
      }
      .row b {
        color: #18181b;
      }
      .proj {
        margin-bottom: 8pt;
      }
      .proj .tools {
        color: #047857;
        font-size: 9pt;
        margin: 1pt 0 0;
      }
      p.summary {
        margin: 0 0 4pt;
        text-align: justify;
      }
      .muted {
        color: #52525b;
        font-size: 9pt;
      }
      .chip {
        display: inline-block;
        background: #ecfdf5;
        border: 0.75pt solid #6ee7b7;
        color: #047857;
        border-radius: 6pt;
        padding: 1pt 6pt;
        font-size: 8.5pt;
        margin: 0 3pt 3pt 0;
      }
    </style>
  </head>
  <body>
    <h1>${esc(profile.name)}</h1>
    <p class="headline">${esc(profile.heroLine).replace(/ · /g, " &nbsp;|&nbsp; ")}</p>
    <p class="contact">
      <span>${esc(contact.location)}</span> &nbsp;|&nbsp;
      <span>${esc(contact.phone)}</span> &nbsp;|&nbsp;
      <span>${esc(contact.email)}</span><br />
      <span>${esc(contact.githubLabel)}</span> &nbsp;|&nbsp;
      <span>${esc(contact.linkedinLabel)}</span> &nbsp;|&nbsp;
      <span>${esc(contact.websiteLabel)}</span>
    </p>
    <hr class="rule" />

    <h2>Profile</h2>
    <p class="summary">${esc(profile.tagline)}</p>
    <p class="summary">${esc(profile.summary)}</p>

    <h2>Experience</h2>
${expHtml}

    <h2>Technical Skills</h2>
${skillsHtml}
    <div class="row"><b>Soft Skills:</b> ${softSkills.map(esc).join(", ")}</div>

    <h2>AI Integration — Building &amp; Shipping</h2>
    <p class="summary">${esc(ai.statement)}</p>
${aiChips}

    <h2>Projects</h2>
${projHtml}

    <h2>Education</h2>${education
      .map(
        (e) => `\n    <h3>${esc(e.degree)}</h3>\n    <p class="meta">${esc(e.school)} &nbsp;|&nbsp; ${esc(e.place)} &nbsp;|&nbsp; ${period(e.period)}</p>`
      )
      .join("")}

    <h2>Languages</h2>
    <p>${languages.map(esc).join(", ")}</p>
${refsHtml}
  </body>
</html>
`;

const out = join(dirname(fileURLToPath(import.meta.url)), "resume-v2.html");
writeFileSync(out, html, "utf8");
console.log(
  `GENERATED: ${out} (${experience.length} experience, ${on(projects).length}/${projects.length} projects, ${references.length} references)`
);
