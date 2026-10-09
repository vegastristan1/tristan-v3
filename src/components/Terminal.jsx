import { useEffect, useState } from 'react'

const script = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'tristan-vegas' },
  { kind: 'cmd', text: 'cat skills.txt' },
  { kind: 'out', text: 'Next.js · React · Node.js · Laravel · OpenAI' },
  { kind: 'cmd', text: 'cat status.txt' },
  { kind: 'out', text: 'Open to work ✓' },
]

function Line({ line }) {
  if (line.kind === 'cmd') {
    return (
      <div className="text-zinc-100">
        <span className="text-emerald-400">$ </span>
        {line.text}
      </div>
    )
  }
  return (
    <div className="pl-3 text-emerald-400">
      <span className="text-zinc-600">▸ </span>
      {line.text}
    </div>
  )
}

export default function Terminal() {
  const [history, setHistory] = useState([])
  const [typed, setTyped] = useState(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setHistory(script)
      return
    }

    let cancelled = false
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

    async function typeLine(line) {
      const body = line.text
      for (let i = 1; i <= body.length; i++) {
        if (cancelled) return
        setTyped({ kind: line.kind, text: body.slice(0, i) })
        await sleep(line.kind === 'cmd' ? 55 : 35)
      }
      if (cancelled) return
      setHistory((h) => [...h, line])
      setTyped(null)
    }

    async function run() {
      while (!cancelled) {
        setHistory([])
        setTyped(null)
        for (const line of script) {
          if (cancelled) return
          await typeLine(line)
          await sleep(line.kind === 'cmd' ? 300 : 650)
        }
        await sleep(3000)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-900/90 shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-800/70 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-2 font-mono text-xs text-zinc-500">tristan@portfolio: ~</span>
      </div>
      <div className="min-h-[196px] space-y-1.5 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        {history.map((line, i) => (
          <Line key={i} line={line} />
        ))}
        {typed ? (
          <div className={typed.kind === 'cmd' ? 'text-zinc-100' : 'pl-3 text-emerald-400'}>
            {typed.kind === 'cmd' && <span className="text-emerald-400">$ </span>}
            {typed.text}
            <span className="caret" />
          </div>
        ) : (
          <div>
            <span className="text-emerald-400">$ </span>
            <span className="caret" />
          </div>
        )}
      </div>
    </div>
  )
}
