'use client'

import { useState } from 'react'
import {
  LayoutGrid, Search, MessageSquare, RefreshCw,
  ExternalLink, MoreHorizontal, Lock, GitBranch, Info
} from 'lucide-react'

// ── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar() {
  const icons = [
    { Icon: LayoutGrid, active: true },
    { Icon: Search,     active: false },
    { Icon: MessageSquare, active: false },
  ]
  return (
    <aside className="fixed top-0 left-0 h-screen w-12 flex flex-col items-center pt-3 gap-1 z-50"
      style={{ background: '#05070A', borderRight: '1px solid #1a1f2e' }}>
      {/* Logo */}
      <div className="w-7 h-7 mb-4 mt-1 flex items-center justify-center">
        <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
          <polygon points="14,2 26,8 26,20 14,26 2,20 2,8"
            fill="none" stroke="#00D4FF" strokeWidth="1.5" />
          <polygon points="14,7 21,11 21,17 14,21 7,17 7,11"
            fill="#00D4FF" opacity="0.3" />
        </svg>
      </div>
      {icons.map(({ Icon, active }, i) => (
        <button key={i}
          className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
          style={{
            background: active ? 'rgba(0,212,255,0.1)' : 'transparent',
            color: active ? '#00D4FF' : '#4a5568',
          }}>
          <Icon size={16} />
        </button>
      ))}
    </aside>
  )
}

// ── Top Nav ───────────────────────────────────────────────────────────────────
function TopNav() {
  const [active, setActive] = useState<'Analysis' | 'History'>('Analysis')
  return (
    <header className="fixed top-0 left-12 right-0 h-11 flex items-center justify-between px-4 z-40"
      style={{ background: '#05070A', borderBottom: '1px solid #1a1f2e' }}>
      {/* Tabs */}
      <div className="flex items-center gap-1">
        {(['Analysis', 'History'] as const).map(tab => (
          <button key={tab} onClick={() => setActive(tab)}
            className="px-3 py-1 text-sm font-medium transition-colors relative"
            style={{ color: active === tab ? '#e2e8f0' : '#4a5568', background: 'transparent', border: 'none' }}>
            {tab}
            {active === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: '#00D4FF' }} />
            )}
          </button>
        ))}
      </div>
      {/* Right buttons */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-colors"
          style={{ border: '1px solid #1a1f2e', color: '#8892a4', background: 'transparent' }}>
          <RefreshCw size={12} /> Re-Scan
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-colors"
          style={{ border: '1px solid #1a1f2e', color: '#8892a4', background: 'transparent' }}>
          View Repository <ExternalLink size={12} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md"
          style={{ border: '1px solid #1a1f2e', color: '#8892a4' }}>
          <MoreHorizontal size={14} />
        </button>
      </div>
    </header>
  )
}

// ── Repo Header ───────────────────────────────────────────────────────────────
function RepoHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-white">codebase-ai</span>
        <Lock size={13} className="text-green-400" />
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium"
            style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)' }}>
            <span className="font-mono font-bold">TS</span> TypeScript
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#8892a4', border: '1px solid #1a1f2e' }}>
            <span className="font-mono font-bold">N</span> Next.js
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#8892a4', border: '1px solid #1a1f2e' }}>
            <GitBranch size={11} /> main
          </span>
        </div>
      </div>
      <span className="text-xs" style={{ color: '#4a5568' }}>Last analyzed: 2 mins ago</span>
    </div>
  )
}

// ── Card wrapper ──────────────────────────────────────────────────────────────
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl p-5 ${className}`}
      style={{ background: '#0B0E14', border: '1px solid #1a1f2e' }}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-200 mb-4">
      {children}
      <Info size={13} className="text-gray-600" />
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function DashboardShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#05070A', fontFamily: 'Inter, Geist, sans-serif' }}>
      <Sidebar />
      <TopNav />
      <main className="ml-12 pt-11">
        <div className="max-w-[900px] mx-auto px-5 py-5">
          <RepoHeader />
          {children}
        </div>
      </main>
    </div>
  )
}

export { Card, SectionTitle }
