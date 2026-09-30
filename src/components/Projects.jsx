import Reveal from './Reveal.jsx'
import { projects, sectionNum } from '../data/index.js'

export default function Projects() {
  return (
    <section id="projects" className="border-t border-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-sm text-emerald-400">{sectionNum.projects}. Projects</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Things I&apos;ve built</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal
              key={p.name}
              delay={(i % 3) * 70}
              className={p.featured ? 'md:col-span-1' : ''}
            >
              <article className="group flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-zinc-900/70">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 transition group-hover:bg-emerald-500/20">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m16 18 6-6-6-6" />
                      <path d="m8 6-6 6 6 6" />
                    </svg>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500">{p.period}</span>
                </div>

                <h3 className="mt-4 font-semibold text-white transition group-hover:text-emerald-400">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.description}</p>

                <ul className="mt-4 flex-1 space-y-2">
                  {p.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex gap-2.5 text-xs leading-relaxed text-zinc-500">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500/70" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-zinc-800 pt-4">
                  {p.tools.map((t) => (
                    <span key={t} className="rounded-md bg-zinc-800/80 px-2 py-1 font-mono text-[11px] text-emerald-400">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
