import Reveal from './Reveal.jsx'
import { skillGroups, softSkills, sectionNum } from '../data/index.js'

export default function Skills() {
  return (
    <section id="skills" className="border-t border-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-sm text-emerald-400">{sectionNum.skills}. Skills</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Technologies I work with</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 60}>
              <div className="group h-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-emerald-500/40 hover:bg-zinc-900/70">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <h3 className="font-semibold text-white">{group.title}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-zinc-700/70 bg-zinc-800/60 px-3 py-1 text-xs text-zinc-300 transition group-hover:border-zinc-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Soft skills</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {softSkills.map((s) => (
                <span key={s} className="rounded-lg bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 ring-1 ring-emerald-500/20">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
