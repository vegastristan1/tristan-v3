// Single global data source — every version (v1 modern, v2, v3) reads resume.js.
// Update your info there once; all versions change together.
export * from "./resume.js";

// Root view: set VITE_ROOT_VERSION env var (v1|v2|v3) in Vercel + redeploy; defaults to v1.
const ROOT_VERSION = import.meta.env.VITE_ROOT_VERSION || "v1";
// Avatar auto-swap effect: set VITE_AVATAR_TRANSITION (fade|pixel1|pixel2) + redeploy; defaults to pixel1.
export const avatarTransition =
  import.meta.env.VITE_AVATAR_TRANSITION || "pixel2";
const path = typeof window !== "undefined" ? window.location.pathname : "/";
export const version = /^\/v1\/?$/.test(path)
  ? "v1"
  : /^\/v2\/?$/.test(path)
    ? "v2"
    : /^\/v3\/?$/.test(path)
      ? "v3"
      : ROOT_VERSION;
export const isV2 = version === "v2";

// Version-specific presentation copy (design text only — shared facts live in resume.js).
export const modernCopy = {
  eyebrow: "Open to work · Philippines 🇵🇭",
  intro:
    "Full-stack web developer with a BSIT degree, working with Next.js, React, TypeScript, Laravel and PostgreSQL. Lately I’m shipping AI-powered apps with human-in-the-loop workflows.",
  heroRotating: ["web apps", "mobile apps", "AI apps", "UI/UX"],
  basedLine: "Based in San Fernando, Camarines Sur. Remote-friendly.",
  contactBlurb: "Have a project, a role, or just a question? My inbox is open.",
  footer: "© 2026 Tristan Vegas · Built with care",
};
