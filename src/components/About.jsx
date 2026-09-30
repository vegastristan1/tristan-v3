import Reveal from './Reveal.jsx'
import { profile, contact, sectionNum } from '../data/index.js'

const facts = [
  { label: 'Location', value: contact.location },
  { label: 'Email', value: contact.email },
  { label: 'Education', value: 'BS Information Technology' },
  { label: 'Focus', value: 'Full-Stack & Data Analysis' },
]

export default function About() {
  return (
    <section id="about" className="border-t border-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-sm text-emerald-400">{sectionNum.about}. About Me</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Quality-driven developer &amp; analyst
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3" delay={100}>
            <div className="space-y-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
              <p>{profile.tagline}</p>
              <p>{profile.summary}</p>
              <p>
                From warehouse data analysis with SQL to full-stack web platforms and mobile applications, I bring a
                complete perspective — building the systems and making sure the data behind them stays accurate.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={200}>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Quick facts</h3>
              <dl className="mt-5 space-y-4">
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col gap-1 border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                    <dt className="text-xs uppercase tracking-wider text-zinc-500">{f.label}</dt>
                    <dd className="text-sm text-zinc-200">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
