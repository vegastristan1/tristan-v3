import { useEffect, useState } from "react";

// Theme choice persists like the design (localStorage "theme"); no choice = follow system.
export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("theme") || ""; } catch { return ""; }
  });
  useEffect(() => {
    try { if (theme) localStorage.setItem("theme", theme); } catch { /* private mode */ }
  }, [theme]);
  const dark = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  return { theme, dark, toggle: () => setTheme(dark ? "light" : "dark") };
}
