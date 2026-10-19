export default function ModernNav({ dark, toggleTheme }) {
  return (
    <header>
      <div className="wrap">
        <nav>
          <a className="logo" href="#top">tristan.</a>
          <div className="links">
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <button className="theme" aria-label="Toggle dark mode" onClick={toggleTheme}>
              {dark ? "☀" : "☾"}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
