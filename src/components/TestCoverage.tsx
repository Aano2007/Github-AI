'use client';
import { Info } from 'lucide-react';

const C = 2 * Math.PI * 35;
const segments = [
  { pct: 0.62, stroke: '#3DD68C', offset: 0 },
  { pct: 0.28, stroke: '#E8C23C', offset: -(C * 0.62) },
  { pct: 0.10, stroke: 'rgba(255,255,255,0.1)', offset: -(C * 0.90) },
];

const legend = [
  { dot: '#3DD68C', label: 'Covered', value: '62%', detail: '(1,348 lines)' },
  { dot: '#E8C23C', label: 'Uncovered', value: '28%', detail: '(624 lines)' },
  { dot: 'rgba(255,255,255,0.15)', label: 'Excluded', value: '10%', detail: '(198 lines)' },
];

const uncovered = [
  { file: 'src/lib/processor.ts', pct: 32, color: '#E8453C' },
  { file: 'src/hooks/useData.ts', pct: 45, color: '#E8863C' },
  { file: 'src/components/Table.tsx', pct: 51, color: '#E8453C' },
];

export default function TestCoverage() {
  return (
    <div className="card flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm font-semibold text-gray-200">Test Coverage</span>
        <Info size={14} className="text-gray-500" />
      </div>

      <div className="flex gap-5">
        {/* Donut */}
        <div className="flex flex-col items-center gap-3">
          <svg width="100" height="100" viewBox="0 0 90 90" className="shrink-0">
            <circle cx="45" cy="45" r="35" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
            {segments.map((s, i) => (
              <circle key={i} cx="45" cy="45" r="35" fill="none" stroke={s.stroke} strokeWidth="10"
                strokeDasharray={`${C * s.pct} ${C * (1 - s.pct)}`} strokeDashoffset={s.offset}
                transform="rotate(-90 45 45)" />
            ))}
            <text x="45" y="42" textAnchor="middle" fontSize="16" fontWeight="600" fill="#E2E2E9" fontFamily="inherit">62%</text>
            <text x="45" y="55" textAnchor="middle" fontSize="10" fill="#9CA3AF" fontFamily="inherit">Covered</text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 justify-center">
          {legend.map(({ dot, label, value, detail }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ background: dot }} />
              <span className="text-xs text-gray-200 font-medium">{label}</span>
              <span className="text-xs text-gray-400">{value}</span>
              <span className="text-[11px] text-gray-500">{detail}</span>
            </div>
          ))}
        </div>

        {/* Uncovered areas */}
        <div className="flex-1 pl-5" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="text-xs font-medium text-gray-400 mb-3">Uncovered Areas</div>
          <div className="flex flex-col gap-2.5">
            {uncovered.map(({ file, pct, color }) => (
              <div key={file} className="flex justify-between items-center">
                <span className="text-[11px] text-gray-400 font-mono">{file}</span>
                <span className="text-xs font-semibold font-mono" style={{ color }}>{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="bg-transparent border-none p-0 text-xs cursor-pointer font-[inherit]" style={{ color: '#00D4FF' }}>
          View full coverage report →
        </button>
      </div>
    </div>
  );
}
