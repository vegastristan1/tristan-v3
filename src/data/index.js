// Single global data source — every version (v1 modern, v2, v3) reads resume.js.
// Update your info there once; all versions change together.
export * from "./resume.js";

const path = typeof window !== "undefined" ? window.location.pathname : "/";
export const version = /^\/v2\/?$/.test(path) ? "v2" : /^\/v1\/?$/.test(path) ? "v1" : "v3";
export const isV2 = version === "v2";

// Version-specific presentation copy (design text only — shared facts live in resume.js).
export const modernCopy = {
  eyebrow: "Open to work · Philippines 🇵🇭",
  intro:
    "Full-stack web developer with a BSIT degree, working with Next.js, React, TypeScript, Laravel and PostgreSQL. Lately I’m shipping AI-powered apps with human-in-the-loop workflows.",
  basedLine: "Based in San Fernando, Camarines Sur. Remote-friendly.",
  contactBlurb: "Have a project, a role, or just a question? My inbox is open.",
  footer: "© 2026 Tristan Vegas · Built with care",
};
