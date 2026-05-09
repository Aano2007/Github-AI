'use client'

import { Lock, Info, Github, TrendingUp } from 'lucide-react'

export default function OptimizationScoreCard() {
  return (
    <div className="w-full bg-black p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Title, Lock Icon, and Badges */}
        <div className="flex items-center gap-4">
          {/* Title */}
          <h1 className="text-white font-bold text-xl">codebase-ai</h1>

          {/* Green Padlock Icon */}
          <Lock size={16} className="text-green-500" />

          {/* Badges */}
          <div className="flex items-center gap-2">
            {/* TypeScript Badge */}
            <div className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
              TS TypeScript
            </div>

            {/* Next.js Badge */}
            <div className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
              N Next.js
            </div>

            {/* GitHub Branch Badge */}
            <div className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Github size={12} />
              main
            </div>
          </div>
        </div>

        {/* Right: Last Analyzed */}
        <span className="text-gray-500 text-xs">Last analyzed: 2 mins ago</span>
      </div>

      {/* Main Card */}
      <div className="bg-slate-900 border border-gray-700 rounded-lg p-8 flex gap-12">
        {/* Left Side: Score and Info */}
        <div className="flex flex-col justify-center min-w-fit">
          {/* Title with Info Icon */}
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-gray-300 font-semibold text-sm">Optimization Score</h2>
            <Info size={16} className="text-gray-600" />
          </div>

          {/* Score Number */}
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-cyan-400 font-bold text-8xl leading-none">75</span>
            <span className="text-cyan-400 font-bold text-2xl mb-8">%</span>
            <span className="text-gray-500 text-sm ml-4">Optimized</span>
          </div>

          {/* Improvement Badge */}
          <div className="bg-gray-800 text-green-400 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
            <TrendingUp size={14} />
            8% vs last scan
          </div>
        </div>

        {/* Right Side: Progress Bar */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Progress Track with Markers */}
          <div className="mb-8">
            {/* Track Background */}
            <div className="relative h-2 bg-gray-700 rounded-full overflow-visible mb-10">
              {/* Tick Marks */}
              <div className="absolute w-full h-2 flex justify-between px-0">
                <div className="absolute left-0 top-2 w-0.5 h-3 bg-gray-600" />
                <div className="absolute left-1/2 -translate-x-1/2 top-2 w-0.5 h-3 bg-gray-600" />
                <div className="absolute right-0 top-2 w-0.5 h-3 bg-gray-600" />
              </div>

              {/* Filled Progress Bar - Gradient from Blue to Cyan */}
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                style={{ width: '75%' }}
              />

              {/* Cyan Marker at 75% */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-full"
                style={{ left: '75%', transform: 'translateX(-50%) translateY(-50%)' }}
              />

              {/* 75% Label */}
              <div
                className="absolute -top-8 text-cyan-400 font-bold text-sm whitespace-nowrap"
                style={{ left: '75%', transform: 'translateX(-50%)' }}
              >
                75%
              </div>
            </div>

            {/* Percentage Labels */}
            <div className="flex justify-between px-0 text-gray-500 text-xs">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
