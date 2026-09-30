import { profile } from '../data/index.js'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-zinc-500 sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name} — Built with React &amp; Tailwind CSS.
        </p>
        <a
          href="#top"
          className="flex items-center gap-1.5 text-zinc-400 transition hover:text-emerald-400"
        >
          Back to top
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
