import { version } from '../data/index.js'

const versions = [
  { href: '/v1', id: 'v1', label: 'V1' },
  { href: '/v2', id: 'v2', label: 'V2' },
  { href: '/', id: 'v3', label: 'V3' },
]

export default function VersionSwitcher() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-900/90 p-1 text-xs shadow-xl shadow-black/40 backdrop-blur-md">
      <span className="px-2 text-zinc-500">Viewing</span>
      {versions.map((v) => (
        <a
          key={v.id}
          href={v.href}
          className={`rounded-full px-3 py-1.5 font-semibold transition ${
            version === v.id
              ? 'bg-emerald-500 text-zinc-950'
              : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
          }`}
        >
          {v.label}
        </a>
      ))}
    </div>
  )
}
