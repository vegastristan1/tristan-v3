import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'
import { ai, sectionNum } from '../data/index.js'

const ROADMAP = [
  {
    group: 'Python & Data Foundations',
    items: [
      { id: 'py-basics', title: 'Python fundamentals', link: { label: 'Python tutorial', url: 'https://docs.python.org/3/tutorial/' } },
      { id: 'numpy-pandas', title: 'NumPy & pandas for data work', link: { label: 'pandas docs', url: 'https://pandas.pydata.org/docs/' } },
      { id: 'sql-refresher', title: 'SQL refresher for analysis', link: { label: 'SQLBolt', url: 'https://sqlbolt.com/' } },
    ],
  },
  {
    group: 'Machine Learning Basics',
    items: [
      { id: 'sklearn', title: 'ML fundamentals with scikit-learn', link: { label: 'scikit-learn', url: 'https://scikit-learn.org/stable/' } },
      { id: 'dlai', title: 'DeepLearning.AI short courses', link: { label: 'deeplearning.ai', url: 'https://www.deeplearning.ai/short-courses/' } },
      { id: 'hf-course', title: 'Deep learning with Hugging Face', link: { label: 'HF course', url: 'https://huggingface.co/learn' } },
    ],
  },
  {
    group: 'LLM API Integration',
    items: [
      { id: 'openai-api', title: 'OpenAI API — chat, streaming, tools', link: { label: 'OpenAI docs', url: 'https://platform.openai.com/docs/' } },
      { id: 'claude-api', title: 'Claude API (Anthropic)', link: { label: 'Anthropic docs', url: 'https://docs.anthropic.com/' } },
      { id: 'prompting', title: 'Prompt engineering guide', link: { label: 'promptingguide.ai', url: 'https://www.promptingguide.ai/' } },
    ],
  },
  {
    group: 'RAG & Vector Search',
    items: [
      { id: 'embeddings', title: 'Embeddings concepts', link: { label: 'Embeddings guide', url: 'https://platform.openai.com/docs/guides/embeddings' } },
      { id: 'vector-db', title: 'Vector databases (Chroma / pgvector)', link: { label: 'Chroma docs', url: 'https://docs.trychroma.com/' } },
      { id: 'rag-build', title: 'Build a full RAG pipeline', link: { label: 'OpenAI cookbook', url: 'https://cookbook.openai.com/' } },
    ],
  },
  {
    group: 'Agents & AI-Powered Web Apps',
    items: [
      { id: 'agents', title: 'AI agents & tool use', link: { label: 'Agents SDK', url: 'https://openai.github.io/openai-agents-python/' } },
      { id: 'ai-sdk', title: 'Streaming AI UIs with Vercel AI SDK', link: { label: 'AI SDK docs', url: 'https://sdk.vercel.ai/docs' } },
      { id: 'mcp', title: 'Model Context Protocol (MCP)', link: { label: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io/' } },
    ],
  },
  {
    group: 'Ship, Evaluate & Deploy',
    items: [
      { id: 'evals', title: 'Evals & testing LLM outputs', link: { label: 'OpenAI evals', url: 'https://platform.openai.com/docs/guides/evals' } },
      { id: 'cost-safety', title: 'Cost, latency & safety guardrails', link: null },
      { id: 'deploy', title: 'Deploy AI apps (Docker / serverless)', link: { label: 'Docker docs', url: 'https://docs.docker.com/' } },
    ],
  },
]

const ALL_ITEMS = ROADMAP.flatMap((g) => g.items)
const STORAGE_KEY = 'tv-ai-roadmap-progress'
const UNLOCK_KEY = 'tv-ai-unlocked'
const LOCK_HASH = '274bdbc411261833251faa80e7af2fdb82cb91d5ef1abad8a57491c846b7275c'

async function sha256Hex(text) {
  if (!globalThis.crypto?.subtle) return null
  try {
    const buf = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    return null
  }
}

const ANATOMY = [
  { part: 'Role', desc: 'Who the AI should act as — "You are a senior React developer."' },
  { part: 'Context', desc: 'Background it needs: code, schema, audience, what already happened.' },
  { part: 'Task', desc: 'One clear action — "Find the bug", "Summarize", "Write the query".' },
  { part: 'Format', desc: 'Output shape — bullets, table, code blocks, JSON, word limit.' },
  { part: 'Constraints', desc: 'Rules — "No fabrication", "under 150 words", "modern JS only".' },
]

const PAIRS = [
  {
    bad: 'Fix my code.',
    good: 'You are a senior React developer. This list re-renders on every keystroke: [paste code]. Find the root cause, give the minimal fix, and add one test that prevents regression. Reply with numbered steps + code blocks only.',
  },
  {
    bad: 'Write SQL for sales.',
    good: 'PostgreSQL schema: orders(id, customer_id, total_cents, created_at). Write a query for 2024 monthly revenue per customer where total > 1000, sorted by revenue desc. Then add one index suggestion and one sanity-check query.',
  },
]

const SAMPLES = [
  {
    cat: 'Coding',
    prompts: [
      {
        id: 'c1',
        title: 'Debug an error',
        text: `You are a senior {stack} developer.
Error:
{error}
Code:
{code}
Deliver: 1) root cause  2) minimal fix  3) a test that prevents regression.
Format: numbered steps + code blocks only.`,
      },
      {
        id: 'c2',
        title: 'Refactor safely',
        text: `Refactor the code below for readability (extract functions, clearer names).
Rules: keep behavior identical, do not add features, list any breaking changes at the end.

{code}`,
      },
      {
        id: 'c3',
        title: 'Write tests',
        text: `Write unit tests for the function below using {vitest|jest}.
Cover: happy path, edge cases, error cases.
Pattern: Arrange-Act-Assert with a one-line comment per case.

{code}`,
      },
    ],
  },
  {
    cat: 'Job hunt',
    prompts: [
      {
        id: 'j1',
        title: 'Match JD to my resume',
        text: `Job description:
{jd}

My experience:
{resume bullets}

1) Extract the top 5 keywords.
2) Map each keyword to my experience.
3) Rewrite my top 3 bullets to match — do not invent experience I do not have.`,
      },
      {
        id: 'j2',
        title: 'Cover letter (150 words)',
        text: `Write a 150-word cover letter for {role} at {company}.
Use my two achievements: {achievements}.
Tone: confident and concrete. Avoid cliches ("passionate", "fast learner").
End with a clear call to action.`,
      },
      {
        id: 'j3',
        title: 'Interview prep set',
        text: `Generate 10 interview questions for {role}: 4 behavioral (STAR format) and 6 technical for {tech stack}.
For each question give a strong answer outline based on this experience:
{experience}`,
      },
    ],
  },
  {
    cat: 'Data analysis',
    prompts: [
      {
        id: 'd1',
        title: 'SQL from schema',
        text: `Schema:
{tables}

Question: {question}

Write the PostgreSQL query, explain the joins, add one index suggestion, then give 2 sanity-check queries to validate the result.`,
      },
      {
        id: 'd2',
        title: 'Find anomalies',
        text: `Sales / inventory data:
{data}

Deliver: 5 key findings, any anomalies or data-quality issues, 3 recommended actions.
Format: table + one-line summary per row.`,
      },
      {
        id: 'd3',
        title: 'Executive summary',
        text: `Turn this raw data into an executive summary for management:
{data}

Rules: 5 bullets max, plain language (no jargon), highlight the trend, the risk, and the one number that matters most.`,
      },
    ],
  },
  {
    cat: 'Daily productivity',
    prompts: [
      {
        id: 'p1',
        title: '5-bullet summary',
        text: `Summarize the text below in 5 bullets for a busy reader.
Keep all numbers and dates exact. End with a one-line takeaway.

{text}`,
      },
      {
        id: 'p2',
        title: 'Rewrite for tone',
        text: `Rewrite the text below to be {tone} for {audience}, under {n} words, preserving the key message.

{text}`,
      },
      {
        id: 'p3',
        title: 'Decision table',
        text: `I am deciding between: {options}.
Criteria: {criteria}.

Build a comparison table, recommend one option with reasoning, and state the biggest risk of each.`,
      },
    ],
  },
]

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function AiLearning() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('roadmap')
  const [done, setDone] = useState({})
  const [copied, setCopied] = useState(null)
  const [cat, setCat] = useState(SAMPLES[0].cat)
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(UNLOCK_KEY) === '1'
    } catch {
      return false
    }
  })
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved && typeof saved === 'object') setDone(saved)
    } catch {
      /* ignore corrupt storage */
    }
  }, [])

  const toggle = (id) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        /* storage unavailable */
      }
      return next
    })
  }

  const copy = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.text)
      setCopied(prompt.id)
      setTimeout(() => setCopied((c) => (c === prompt.id ? null : c)), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  const handleUnlock = async (e) => {
    e.preventDefault()
    const hex = await sha256Hex(pwInput)
    if (hex && hex === LOCK_HASH) {
      try {
        sessionStorage.setItem(UNLOCK_KEY, '1')
      } catch {
        /* storage unavailable */
      }
      setUnlocked(true)
      setPwError(false)
      setPwInput('')
      setOpen(true)
    } else {
      setPwError(true)
      setShake(true)
      setTimeout(() => setShake(false), 450)
    }
  }

  const handleLock = () => {
    try {
      sessionStorage.removeItem(UNLOCK_KEY)
    } catch {
      /* storage unavailable */
    }
    setUnlocked(false)
    setOpen(false)
    setPwInput('')
    setPwError(false)
  }

  if (!ai) return null

  const completed = ALL_ITEMS.filter((it) => done[it.id]).length
  const total = ALL_ITEMS.length
  const pct = Math.round((completed / total) * 100)
  const activePrompts = SAMPLES.find((s) => s.cat === cat)?.prompts || []

  return (
    <section id="ai" className="border-t border-zinc-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-sm text-emerald-400">{sectionNum.ai}. AI &amp; Currently Learning</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Growing toward <span className="text-emerald-400">AI-powered</span> development
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">{ai.statement}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ai.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 70}>
              <div className="group flex h-full flex-col rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 p-6 transition hover:border-emerald-500/50 hover:bg-zinc-900/60">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4" />
                    <path d="m16.2 7.8 2.9-2.9" />
                    <path d="M18 12h4" />
                    <path d="m16.2 16.2 2.9 2.9" />
                    <path d="M12 18v4" />
                    <path d="m4.9 19.1 2.9-2.9" />
                    <path d="M2 12h4" />
                    <path d="m4.9 4.9 2.9 2.9" />
                  </svg>
                  {item.status}
                </span>
                <h3 className="mt-4 flex-1 font-semibold text-white transition group-hover:text-emerald-400">
                  {item.name}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/20"
            aria-expanded={open}
          >
            {!unlocked
              ? open
                ? 'Hide'
                : 'View full learning roadmap & prompt guide 🔒'
              : open
                ? 'Hide learning roadmap'
                : 'View full learning roadmap & prompt guide'}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${open ? 'rotate-180' : ''}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </Reveal>

        {open && !unlocked && (
          <div className="fade-up mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
            <form onSubmit={handleUnlock} className={`mx-auto max-w-sm text-center ${shake ? 'animate-shake' : ''}`}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto text-zinc-500"
                aria-hidden="true"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <h3 className="mt-3 text-lg font-semibold text-white">Private learning roadmap</h3>
              <p className="mt-1 text-sm text-zinc-400">This area is password-protected — enter the password to unlock it.</p>
              <div className="mt-4 flex gap-2">
                <input
                  type="password"
                  value={pwInput}
                  onChange={(e) => {
                    setPwInput(e.target.value)
                    setPwError(false)
                  }}
                  placeholder="Password"
                  autoFocus
                  aria-label="Password"
                  className={`min-w-0 flex-1 rounded-lg border bg-zinc-950 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 ${
                    pwError
                      ? 'border-red-500 focus:ring-red-500/30'
                      : 'border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500/30'
                  }`}
                />
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
                >
                  Unlock
                </button>
              </div>
              {pwError && <p className="mt-2 text-xs font-medium text-red-400">Incorrect password — try again.</p>}
            </form>
          </div>
        )}

        {open && unlocked && (
          <div className="fade-up mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-7">
            <div className="flex gap-2 border-b border-zinc-800 pb-4">
              {[
                { id: 'roadmap', label: 'Learning roadmap' },
                { id: 'prompts', label: 'Prompt guide' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    tab === t.id ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
              <button
                type="button"
                onClick={handleLock}
                title="Lock the roadmap"
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:border-red-500/50 hover:text-red-400"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                </svg>
                Lock
              </button>
            </div>

            {tab === 'roadmap' && (
              <div className="mt-5">
                <div className="flex items-center gap-4">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="font-mono text-xs text-emerald-400">
                    {completed}/{total} completed
                  </span>
                </div>

                <div className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {ROADMAP.map((g, gi) => (
                    <div key={g.group}>
                      <h4 className="flex items-baseline gap-2 text-sm font-semibold text-white">
                        <span className="font-mono text-xs text-emerald-400">{String(gi + 1).padStart(2, '0')}</span>
                        {g.group}
                      </h4>
                      <ul className="mt-3 space-y-2.5">
                        {g.items.map((item) => {
                          const checked = !!done[item.id]
                          return (
                            <li key={item.id} className="flex items-start gap-3">
                              <button
                                type="button"
                                role="checkbox"
                                aria-checked={checked}
                                onClick={() => toggle(item.id)}
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                                  checked
                                    ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
                                    : 'border-zinc-600 text-transparent hover:border-emerald-400'
                                }`}
                              >
                                <CheckIcon />
                              </button>
                              <span className="flex-1 text-sm leading-snug">
                                <span className={checked ? 'text-zinc-500 line-through' : 'text-zinc-300'}>{item.title}</span>
                                {item.link && (
                                  <a
                                    href={item.link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ml-2 inline-flex items-center gap-0.5 whitespace-nowrap text-xs text-emerald-500/80 transition hover:text-emerald-400"
                                  >
                                    {item.link.label} ↗
                                  </a>
                                )}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'prompts' && (
              <div className="mt-5 space-y-8">
                <div>
                  <h4 className="text-sm font-semibold text-white">Anatomy of a good prompt</h4>
                  <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {ANATOMY.map((a, i) => (
                      <li key={a.part} className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-3.5">
                        <span className="font-mono text-xs text-emerald-400">{i + 1} · {a.part}</span>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-400">{a.desc}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white">Weak vs strong prompts</h4>
                  <div className="mt-3 grid gap-3 lg:grid-cols-2">
                    {PAIRS.map((p) => (
                      <div key={p.bad} className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-red-400/90">✗ Weak</p>
                        <p className="mt-1 text-sm italic text-zinc-500">&ldquo;{p.bad}&rdquo;</p>
                        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">✓ Strong</p>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-300">{p.good}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white">Sample prompt library</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SAMPLES.map((s) => (
                      <button
                        key={s.cat}
                        type="button"
                        onClick={() => setCat(s.cat)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                          cat === s.cat
                            ? 'bg-emerald-500 text-zinc-950'
                            : 'border border-zinc-700 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-400'
                        }`}
                      >
                        {s.cat}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 grid gap-3 lg:grid-cols-3">
                    {activePrompts.map((p) => (
                      <div key={p.id} className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <h5 className="text-sm font-semibold text-white">{p.title}</h5>
                          <button
                            type="button"
                            onClick={() => copy(p)}
                            className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${
                              copied === p.id
                                ? 'bg-emerald-500 text-zinc-950'
                                : 'border border-zinc-700 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-400'
                            }`}
                          >
                            {copied === p.id ? '✓ Copied!' : '⧉ Copy'}
                          </button>
                        </div>
                        <pre className="mt-2.5 flex-1 whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-zinc-400">{p.text}</pre>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
