import { profile, contact } from '../data/index.js'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-[-10%] h-80 w-80 rounded-full bg-emerald-700/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8">
        <div className="reveal is-visible">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available for work
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <span className="text-emerald-400">{profile.name.split(' ')[0]}</span>
            <br />
            <span className="text-zinc-400">{profile.name.split(' ')[1]}</span>
          </h1>

          <p className="mt-5 font-mono text-sm text-emerald-400 sm:text-base">{profile.heroLine}</p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">{profile.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
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

          <div className="mt-14 grid max-w-2xl grid-cols-2 gap-6 border-t border-zinc-800 pt-8 sm:grid-cols-4">
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '7+', label: 'Projects' },
              { value: '10+', label: 'Technologies' },
              { value: 'BS', label: 'IT Graduate' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
