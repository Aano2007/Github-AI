'use client'
import { LucideIcon } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

interface StatCardProps {
  label: string
  value: string
  sub: string
  Icon: LucideIcon
  suitIndex?: number
}

const SUITS = ['♠', '♥', '♦', '♣']
const SUIT_COLORS = ['#1a1a1a', '#e53e3e', '#e53e3e', '#1a1a1a']

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

export default function StatCard({ label, value, sub, Icon, suitIndex = 0 }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0, inside: false })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, inside: true })
  }

  const slashIndex = value.indexOf('/')
  const isRatio = slashIndex !== -1
  const numeric = parseFloat(isRatio ? value.slice(0, slashIndex) : value.replace(/[^0-9.]/g, ''))
  const suffix = isRatio ? value.slice(slashIndex) : value.replace(/[0-9.]/g, '')
  const animated = useCountUp(isNaN(numeric) ? 0 : numeric)
  const display = isNaN(numeric) ? value : `${animated}${suffix}`

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursor(c => ({ ...c, inside: false }))}
      className="stat-card group p-8 aspect-square flex flex-col justify-between overflow-hidden relative rounded-lg border border-white/10"
      style={{ background: '#1D2024' }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="opacity-60 font-serif" style={{ fontSize: '12rem', lineHeight: 1, width: '12rem', height: '12rem', display: 'block', textAlign: 'center', overflow: 'hidden', color: SUIT_COLORS[suitIndex % 4] }}>
          {SUITS[suitIndex % 4]}
        </span>
      </div>
      <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300" style={{ opacity: cursor.inside ? 1 : 0, background: cursor.inside ? `radial-gradient(circle 120px at ${cursor.x}px ${cursor.y}px, rgba(99,130,246,0.15) 0%, transparent 80%)` : 'none' }} />

      <div className="flex justify-between items-start relative z-20">
        <p className="text-base font-semibold text-gray-200">{label}</p>
        <div className="bg-zinc-800 text-zinc-400 p-2 rounded-xl group-hover:[&>svg]:rotate-12 transition-transform duration-300">
          <Icon className="w-5 h-5 transition-transform duration-300" />
        </div>
      </div>

      <div className="relative z-20">
        <h3 className="text-3xl font-bold mb-1 tabular-nums text-white">{display}</h3>
        <div className="overflow-hidden">
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
            <div className="h-px bg-white/10 mb-2 mt-1" />
            <p className="text-sm text-gray-400">{sub}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
