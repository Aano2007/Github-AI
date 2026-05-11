'use client'

import { Info, TrendingUp } from 'lucide-react'

function Sparkline({ path, color }: { path: string; color: string }) {
  return (
    <svg width="100%" height="28" viewBox="0 0 120 28" preserveAspectRatio="none" fill="none">
      <path d={path} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const sparks = {
  quality:     'M0,20 C15,18 25,14 35,12 C45,10 55,11 65,9 C75,7 85,8 95,6 C105,4 115,5 120,3',
  performance: 'M0,16 C10,12 20,20 30,14 C40,8 50,18 60,12 C70,6 80,16 90,10 C100,14 110,8 120,12',
  security:    'M0,18 C15,17 30,16 45,16 C60,15 75,14 90,12 C100,11 110,10 120,8',
  debt:        'M0,10 C10,12 20,8 30,14 C40,18 50,12 60,16 C70,20 80,14 90,18 C100,20 110,17 120,19',
}

export function OptimizationScore() {
  return (
    <div className="rounded-xl p-5 mb-4" style={{ background: '#0B0E14', border: '1px solid #1a1f2e' }}>
      <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-200 mb-4">
        Optimization Score <Info size={13} className="text-gray-600" />
      </div>
      <div className="flex items-center gap-10">
        {/* Score */}
        <div className="shrink-0">
          <div className="flex items-baseline gap-1 leading-none">
            <span style={{ fontSize: '72px', fontWeight: 700, color: '#00D4FF', lineHeight: 1, fontFamily: 'monospace' }}>75</span>
            <span style={{ fontSize: '28px', fontWeight: 700, color: '#00D4FF' }}>%</span>
            <span className="text-sm ml-2" style={{ color: '#4a5568' }}>Optimized</span>
          </div>
          <div className="flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full w-fit text-xs font-medium"
            style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>
            <TrendingUp size={11} /> 8% vs last scan
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex-1">
          <div className="relative mb-2" style={{ height: '20px' }}>
            <span className="absolute text-xs font-bold" style={{ left: '75%', transform: 'translateX(-50%)', color: '#00D4FF', bottom: 0 }}>75%</span>
          </div>
          <div className="relative rounded-full" style={{ height: '10px', background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full" style={{ width: '75%', background: 'linear-gradient(to right, #3b82f6, #00D4FF)' }} />
            <div className="absolute rounded-full" style={{ left: '75%', top: '50%', transform: 'translateX(-50%) translateY(-50%)', width: '2px', height: '20px', background: '#00D4FF' }} />
          </div>
          <div className="flex justify-between mt-2 text-xs" style={{ color: '#4a5568' }}>
            <span>0%</span><span>50%</span><span>100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const vitals = [
  { label: 'Quality',        icon: '◎', iconColor: '#3b82f6', score: 82, status: 'Good',      dotColor: '#22c55e', spark: 'quality'     as const },
  { label: 'Performance',    icon: '≋', iconColor: '#a855f7', score: 74, status: 'Fair',      dotColor: '#eab308', spark: 'performance' as const },
  { label: 'Security',       icon: '⛨', iconColor: '#22c55e', score: 91, status: 'Excellent', dotColor: '#22c55e', spark: 'security'    as const },
  { label: 'Technical Debt', icon: '◷', iconColor: '#f59e0b', score: 64, status: 'Moderate',  dotColor: '#f59e0b', spark: 'debt'        as const },
]

const sparkColors: Record<string, string> = {
  quality: '#22c55e', performance: '#a855f7', security: '#22c55e', debt: '#f59e0b',
}

export function SystemVitality() {
  return (
    <div className="rounded-xl p-5 mb-4" style={{ background: '#0B0E14', border: '1px solid #1a1f2e' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-200">
          System Vitality <Info size={13} className="text-gray-600" />
        </div>
        <button className="text-xs" style={{ color: '#8892a4' }}>View full metrics →</button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {vitals.map(({ label, icon, iconColor, score, status, dotColor, spark }) => (
          <div key={label} className="rounded-lg p-4" style={{ background: '#0f1318', border: '1px solid #1a1f2e' }}>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: '15px', color: iconColor }}>{icon}</span>
              <span className="text-xs" style={{ color: '#8892a4' }}>{label}</span>
            </div>
            <div className="flex items-baseline gap-0.5 mb-2">
              <span style={{ fontSize: '32px', fontWeight: 700, color: '#e2e8f0', lineHeight: 1, fontFamily: 'monospace' }}>{score}</span>
              <span className="text-sm" style={{ color: '#4a5568' }}>/100</span>
            </div>
            <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: dotColor }}>
              <span style={{ fontSize: '8px' }}>●</span>{status}
            </div>
            <Sparkline path={sparks[spark]} color={sparkColors[spark]} />
          </div>
        ))}
      </div>
    </div>
  )
}
