import Terminal from './Terminal.jsx'
import useTypewriter from '../hooks/useTypewriter.js'
import { profile, contact } from '../data/index.js'

function AnimatedWord({ word, baseDelay = 0, className = '' }) {
  return (
    <span className={className}>
      {word.split('').map((ch, i) => (
        <span key={i} className="letter-in" style={{ animationDelay: `${baseDelay + i * 55}ms` }}>
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function HeroCreative({ showGrid = true }) {
  const typedRole = useTypewriter(profile.heroLine, { speed: 45, startDelay: 1400 })

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-[-10%] h-80 w-80 rounded-full bg-emerald-700/10 blur-3xl" />
        {showGrid && (
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
        )}
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="fade-up inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Available for work
            </span>

            <p className="fade-up mt-6 text-sm text-zinc-500" style={{ animationDelay: '150ms' }}>
              Hi, I&apos;m
            </p>
            <h1
              className="mt-1 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-6xl"
              aria-label={`${profile.name}`}
            >
              <AnimatedWord word={profile.name.split(' ')[0]} baseDelay={250} className="block text-white" />
              <AnimatedWord word={profile.name.split(' ')[1]} baseDelay={650} className="block text-emerald-400" />
            </h1>

            <p className="mt-5 min-h-[1.6em] font-mono text-sm text-zinc-300 sm:text-base">
              {typedRole}
              <span className="caret" />
            </p>

            <p className="fade-up mt-6 max-w-xl text-base leading-relaxed text-zinc-400" style={{ animationDelay: '1800ms' }}>
              {profile.tagline}
            </p>

            <div className="fade-up mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: '2000ms' }}>
              <a
                href="#contact"
                className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                Contact Me
              </a>
              <a
                href={contact.resume}
                download
                className="rounded-lg border border-zinc-700 bg-zinc-900/60 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-emerald-500/50 hover:text-emerald-400"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="fade-up" style={{ animationDelay: '900ms' }}>
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  )
}
