'use client'
import { GitBranch, ExternalLink, CornerDownRight, Star, Cpu, LineChart, StopCircle } from 'lucide-react'
import { useState } from 'react'

interface RepoCardProps {
  name: string
  language: string
  debtScore: number
  prodReadiness: number
  lastPush: string
  agents: number
  pulse?: boolean
  onClick?: () => void
}

export default function RepoCard({ name, language, debtScore, prodReadiness, lastPush, agents, pulse, onClick }: RepoCardProps) {
  const [analyzing, setAnalyzing] = useState(false)
  return (
    <div className="md3-surface md3-card p-6 cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700 text-zinc-500">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-base flex items-center gap-2">
              {name} <ExternalLink className="w-3 h-3 text-gray-500" />
            </h4>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{language}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-[10px] font-bold border border-zinc-700 uppercase">
          <div className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${pulse ? 'animate-pulse' : ''}`} /> clean
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between text-[11px] font-medium text-gray-400 mb-1">
            <span>Debt Score</span><span>{debtScore}%</span>
          </div>
          <div className="progress-bg overflow-hidden">
            <div className="h-full bg-zinc-600" style={{ width: `${debtScore}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[11px] font-medium text-gray-400 mb-1">
            <span>Prod Readiness</span><span>{prodReadiness}%</span>
          </div>
          <div className="progress-bg overflow-hidden">
            <div className="h-full bg-zinc-600" style={{ width: `${prodReadiness}%` }} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-zinc-600 text-[10px] mb-6 border-t border-zinc-800 pt-4">
        <span className="flex items-center gap-1"><CornerDownRight className="w-3 h-3" /> Last push</span>
        <span className="ml-auto font-medium text-gray-300">{lastPush}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-gray-500">
          <Star className="w-4 h-4 cursor-pointer hover:text-yellow-400 transition-colors" />
          <div className="flex items-center gap-1.5 bg-[#2d2f31] px-3 py-1 rounded-lg text-white">
            <Cpu className="w-3 h-3" /> <span className="text-xs font-medium">{agents} agent</span>
          </div>
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            if (onClick) return onClick();
            setAnalyzing(v => !v);
          }}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-2 ${
            analyzing
              ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
          }`}
        >
          {analyzing
            ? <><StopCircle className="w-3.5 h-3.5" /> Stop</>
            : <><LineChart className="w-3.5 h-3.5" /> Analyze</>}
        </button>
      </div>
    </div>
  )
}
