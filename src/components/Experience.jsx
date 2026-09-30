import Reveal from './Reveal.jsx'
import { experience, sectionNum } from '../data/index.js'

export default function Experience() {
  return (
    <section id="experience" className="border-t border-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-sm text-emerald-400">{sectionNum.experience}. Experience</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Where I&apos;ve worked</h2>
        </Reveal>

        <div className="relative mt-12">
          <div className="absolute left-0 top-2 hidden h-full w-px bg-gradient-to-b from-emerald-500/60 via-zinc-800 to-transparent sm:block sm:translate-x-[7px]" />
          <div className="space-y-10">
            {experience.map((job, i) => (
              <Reveal key={job.company + job.title} delay={i * 60}>
                <article className="relative sm:pl-10">
                  <span className="absolute left-0 top-2 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-emerald-500 bg-zinc-950 sm:block" />
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-emerald-500/40 sm:p-7">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-xs text-emerald-400">{job.period}</span>
                      <span className="rounded-full border border-zinc-700 px-2.5 py-0.5 text-[11px] text-zinc-400">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">
                      {job.title}
                      <span className="text-zinc-500"> · </span>
                      <span className="text-emerald-400">{job.company}</span>
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">{job.place}</p>
                    {job.stack && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <ul className="mt-4 space-y-2.5">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/70" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
