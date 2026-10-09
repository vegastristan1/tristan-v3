import { useEffect, useRef, useState } from 'react'
import {
  siReact,
  siNodedotjs,
  siTypescript,
  siJavascript,
  siPhp,
  siLaravel,
  siVuedotjs,
  siAngular,
  siMysql,
  siPostgresql,
  siDocker,
  siSharp,
  siSwift,
  siFirebase,
  siGit,
  siNextdotjs,
  siPrisma,
  siVercel,
} from 'simple-icons'

const TECHS = [
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'React', icon: siReact },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'PHP', icon: siPhp },
  { name: 'Laravel', icon: siLaravel },
  { name: 'Vue.js', icon: siVuedotjs },
  { name: 'Angular', icon: siAngular },
  { name: 'MySQL', icon: siMysql },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'Prisma', icon: siPrisma },
  { name: 'Docker', icon: siDocker },
  { name: 'AWS', label: 'AWS' },
  { name: 'Vercel', icon: siVercel },
  { name: 'OpenAI', label: 'OpenAI' },
  { name: 'C# / .NET', icon: siSharp },
  { name: 'Swift (iOS)', icon: siSwift },
  { name: 'Firebase', icon: siFirebase },
  { name: 'Git', icon: siGit },
]

const SIZES = [92, 64, 108, 72, 96, 58, 104, 80, 66, 88, 100, 70, 84, 60, 94, 76, 110, 68]

const items = []
TECHS.forEach((t, i) => {
  items.push({ ...t, size: SIZES[i % SIZES.length] })
  if ([2, 6, 10, 13].includes(i)) {
    items.push({ empty: true, name: '', size: SIZES[(i + 7) % SIZES.length] })
  }
})

function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function Hex({ item }) {
  return (
    <div className="relative h-full w-full">
      <div className={`hex-clip absolute inset-0 ${item.empty ? 'bg-zinc-800/60' : 'bg-zinc-700/50'}`} />
      <div className="hex-clip absolute inset-[1.5px] flex items-center justify-center">
        {item.empty ? (
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
        ) : item.icon ? (
          <svg viewBox="0 0 24 24" role="img" aria-label={item.name} className="h-[46%] w-[46%] opacity-70">
            <path d={item.icon.path} fill={`#${item.icon.hex}`} />
          </svg>
        ) : (
          <span className="text-[11px] font-bold tracking-wide text-zinc-500">{item.label}</span>
        )}
      </div>
    </div>
  )
}

export default function HexBand() {
  const wrapRef = useRef(null)
  const hexRefs = useRef([])
  const pushRef = useRef(0)
  const [dims, setDims] = useState(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setReduced(true)
    const el = wrapRef.current
    if (!el) return
    const update = () => setDims({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!dims || dims.w === 0 || dims.h === 0) return

    const rand = mulberry32(1337)
    const bodies = items.map((it) => {
      const angle = rand() * Math.PI * 2
      const speed = 0.15 + rand() * 0.3
      return {
        x: rand() * (dims.w + it.size) - it.size / 2,
        y: rand() * (dims.h + it.size) - it.size / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: it.size,
      }
    })

    const place = (i, b) => {
      const el = hexRefs.current[i]
      if (el) el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`
    }

    if (reduced) {
      bodies.forEach((b, i) => place(i, b))
      return
    }

    const onMove = (e) => {
      const rel = e.clientX / window.innerWidth - 0.5
      pushRef.current = Math.max(-0.5, Math.min(0.5, rel)) * 6
    }
    const onLeaveWindow = () => {
      pushRef.current = 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeaveWindow)

    let raf
    let push = 0
    const tick = () => {
      push += (pushRef.current - push) * 0.06
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i]
        b.x += b.vx + push
        b.y += b.vy
        if (b.x > dims.w) b.x = -b.size
        else if (b.x + b.size < 0) b.x = dims.w
        if (b.y > dims.h) b.y = -b.size
        else if (b.y + b.size < 0) b.y = dims.h
        place(i, b)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
    }
  }, [dims, reduced])

  return (
    <div ref={wrapRef} className="relative h-full w-full select-none">
      {items.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            hexRefs.current[i] = el
          }}
          className="absolute left-0 top-0"
          style={{ width: item.size, height: item.size }}
        >
          <Hex item={item} />
        </div>
      ))}
    </div>
  )
}
