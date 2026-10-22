import { useEffect, useState } from 'react'
import { contact } from '../data/index.js'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2 font-semibold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/30 transition group-hover:bg-emerald-500/25">
            TV
          </span>
          <span className="hidden sm:inline">
            Tristan<span className="text-emerald-400">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
            >
              {l.label}
            </a>
          ))}
          <a
            href={contact.resume}
            download
            className="ml-3 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
          >
            Download CV
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-300 transition hover:bg-zinc-900 md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-zinc-800/80 bg-zinc-950/95 px-5 pb-5 pt-2 backdrop-blur-md md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={contact.resume}
            download
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-emerald-500 px-3 py-3 text-center text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
          >
            Download CV
          </a>
        </div>
      )}
    </header>
  )
}
