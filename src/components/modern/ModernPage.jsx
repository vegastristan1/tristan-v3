import "./modern.css";
import useTheme from "./useTheme.js";
import ModernNav from "./ModernNav.jsx";
import ModernHero from "./ModernHero.jsx";
import ModernProjects from "./ModernProjects.jsx";
import ModernSkills from "./ModernSkills.jsx";
import ModernAi from "./ModernAi.jsx";
import ModernExperience from "./ModernExperience.jsx";
import ModernEducation from "./ModernEducation.jsx";
import ModernContact from "./ModernContact.jsx";
import ModernFooter from "./ModernFooter.jsx";

export default function ModernPage() {
  const { theme, dark, toggle } = useTheme();
  return (
    <div className="modern" data-theme={theme || undefined}>
      <ModernNav dark={dark} toggleTheme={toggle} />
      <main className="wrap" id="top">
        <ModernHero />
        <ModernProjects />
        <ModernSkills />
        <ModernAi />
        <ModernExperience />
        <ModernEducation />
        <ModernContact />
      </main>
      <ModernFooter />
    </div>
  );
}
