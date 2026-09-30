import Reveal from './Reveal.jsx'
import { education, languages, sectionNum } from '../data/index.js'

export default function Education() {
  return (
    <section id="education" className="border-t border-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-sm text-emerald-400">{sectionNum.education}. Education &amp; Languages</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Background</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 80} className="lg:col-span-2">
              <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 transition hover:border-emerald-500/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <span className="font-mono text-xs text-emerald-400">{e.period}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">{e.degree}</h3>
                <p className="mt-1 text-sm text-zinc-400">{e.school}</p>
                <p className="mt-1 text-sm text-zinc-500">{e.place}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={160}>
            <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 transition hover:border-emerald-500/40">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Languages</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {languages.map((l) => (
                  <li key={l} className="flex items-center justify-between text-sm text-zinc-300">
                    <span>{l}</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
