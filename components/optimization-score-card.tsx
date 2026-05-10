'use client'

import { Lock, Github, TrendingUp, Info } from 'lucide-react'

export default function OptimizationScoreCard() {
  return (
    <div className="min-h-screen bg-black p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-lg">codebase-ai</span>
          <Lock size={14} className="text-green-400" />
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              TS TypeScript
            </span>
            <span className="flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">
              <span className="w-2 h-2 rounded-full bg-gray-500" />
              N Next.js
            </span>
            <span className="flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">
              <Github size={11} />
              main
            </span>
          </div>
        </div>
        <span className="text-gray-500 text-xs">Last analyzed: 2 mins ago</span>
      </div>

      {/* Main Card */}
      <div className="w-full bg-slate-900 border border-gray-800 rounded-2xl p-8 flex gap-12 items-center">

        {/* Left — Score */}
        <div className="flex flex-col shrink-0">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-gray-300 text-sm font-semibold">Optimization Score</span>
            <Info size={14} className="text-gray-600" />
          </div>

          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-cyan-400 font-bold leading-none" style={{ fontSize: '88px' }}>75</span>
            <span className="text-cyan-400 font-bold text-3xl mb-4">%</span>
            <span className="text-gray-500 text-sm ml-3 mb-2">Optimized</span>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-800 text-green-400 text-xs font-medium px-3 py-1.5 rounded-full w-fit mt-2">
            <TrendingUp size={13} />
            8% vs last scan
          </div>
        </div>

        {/* Right — Progress Bar */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="relative mb-3">

            {/* 75% floating label */}
            <div
              className="absolute -top-7 text-cyan-400 font-bold text-sm whitespace-nowrap"
              style={{ left: '75%', transform: 'translateX(-50%)' }}
            >
              75%
            </div>

            {/* Track */}
            <div className="relative h-2.5 bg-gray-800 rounded-full overflow-visible">

              {/* Fill */}
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                style={{ width: '75%' }}
              />

              {/* Cyan marker at 75% */}
              <div
                className="absolute top-1/2 w-0.5 h-6 bg-cyan-400 rounded-full"
                style={{ left: '75%', transform: 'translateX(-50%) translateY(-50%)' }}
              />

              {/* Tick marks */}
              <div className="absolute inset-0">
                <div className="absolute left-0 top-full mt-0.5 w-px h-2 bg-gray-600" />
                <div className="absolute left-1/2 top-full mt-0.5 w-px h-2 bg-gray-600 -translate-x-1/2" />
                <div className="absolute right-0 top-full mt-0.5 w-px h-2 bg-gray-600" />
              </div>
            </div>
          </div>

          {/* Scale labels */}
          <div className="flex justify-between text-gray-600 text-xs mt-3 px-0">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

      </div>
    </div>
  )
}
