import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import HeroCreative from './components/HeroCreative.jsx'
import HeroHex from './components/HeroHex.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import AiLearning from './components/AiLearning.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import VersionSwitcher from './components/VersionSwitcher.jsx'
import HexBand from './components/HexBand.jsx'
import { version } from './data/index.js'

export default function App() {
  useEffect(() => {
    if (version === 'v2') document.title = 'Tristan Vegas — Portfolio V2 (Creative Hero)'
    if (version === 'v3') document.title = 'Tristan Vegas — Portfolio V3 (Tech Hexagons)'
  }, [])

  return (
    <div className="min-h-screen">
      {version === 'v3' && (
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-40" aria-hidden="true">
          <HexBand />
        </div>
      )}
      <Navbar />
      <main>
        {version === 'v1' && <Hero />}
        {version === 'v2' && <HeroCreative />}
        {version === 'v3' && <HeroHex />}
        <About />
        <Skills />
        <AiLearning />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <VersionSwitcher />
    </div>
  )
}
