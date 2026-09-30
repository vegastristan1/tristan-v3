import Reveal from './Reveal.jsx'
import { contact, sectionNum } from '../data/index.js'

const channels = [
  {
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: (
      <>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
  },
  {
    label: 'Phone',
    value: contact.phone,
    href: `tel:${contact.phoneHref}`,
    icon: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </>
    ),
  },
  {
    label: 'GitHub',
    value: contact.githubLabel,
    href: contact.github,
    external: true,
    icon: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.4.5-.7 1.1-.8 1.7-.1.6-.1 1.3 0 1.9v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </>
    ),
  },
  {
    label: 'Location',
    value: contact.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(contact.location)}`,
    external: true,
    icon: (
      <>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
]

if (contact.linkedin) {
  channels.splice(3, 0, {
    label: 'LinkedIn',
    value: contact.linkedinLabel,
    href: contact.linkedin,
    external: true,
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  })
}

export default function Contact() {
  return (
    <section id="contact" className="border-t border-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-sm text-emerald-400">{sectionNum.contact}. Contact</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mt-4 max-w-xl text-zinc-400">
            I&apos;m open to freelance projects, full-time roles, and collaborations. The fastest way to reach me is by
            email — I&apos;ll get back to you as soon as I can.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 70}>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex h-full items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-zinc-900/70"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 transition group-hover:bg-emerald-500/20">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon}
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-zinc-500">{c.label}</div>
                  <div className="mt-1 break-words text-sm text-zinc-200 transition group-hover:text-emerald-400">
                    {c.value}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
            >
              Send an Email
            </a>
            <a
              href={contact.resume}
              download
              className="rounded-lg border border-zinc-700 bg-zinc-900/60 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-emerald-500/50 hover:text-emerald-400"
            >
              Download CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
