'use client';
import { useState } from 'react';
import { Info, Sparkles, CheckCircle } from 'lucide-react';

const monoFont = "'JetBrains Mono', 'Fira Code', monospace";

const beforeLines = [
  { num: 42, code: 'for (let i = 0; i < data.length; i++) {', removed: true },
  { num: 43, code: '  const item = data[i];', removed: true },
  { num: 44, code: '  if (item.active) {', removed: true },
  { num: 45, code: '    result.push(process(item));', removed: true },
  { num: 46, code: '  }', removed: true },
  { num: 47, code: '}', removed: true },
  { num: 48, code: 'return result;', removed: false },
];

const afterLines = [
  { num: 42, code: 'return data', added: true },
  { num: 43, code: '  .filter(item => item.active)', added: true },
  { num: 44, code: '  .map(process);', added: true },
];

function CodeLine({ num, code, removed, added }: { num: number; code: string; removed?: boolean; added?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      background: removed ? '#3A1A1A' : added ? '#1A3A2A' : 'transparent',
      padding: '0 12px',
    }}>
      <span style={{
        width: '28px', flexShrink: 0, textAlign: 'right', paddingRight: '12px',
        fontSize: '11px', color: '#6B7280', fontFamily: monoFont, userSelect: 'none',
      }}>{num}</span>
      <span style={{
        fontSize: '11.5px', fontFamily: monoFont, whiteSpace: 'pre',
        color: removed ? '#E8453C' : added ? '#3DD68C' : '#9CA3AF',
      }}>{code}</span>
    </div>
  );
}

export default function OptimizationEngine() {
  const [applied, setApplied] = useState(false);

  return (
    <div className="card flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-200">Optimization Engine</span>
          <Info size={14} className="text-gray-500" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">AI suggests a refactor to improve performance</span>
          <span className="text-[10px] font-medium px-2 py-px rounded" style={{
            background: 'rgba(124,111,247,0.18)', color: '#7C6FF7',
            border: '1px solid rgba(124,111,247,0.3)',
          }}>Beta</span>
        </div>
      </div>

      {/* Diff panel */}
      <div className="rounded-lg overflow-hidden text-xs" style={{ border: '1px solid rgba(255,255,255,0.08)', lineHeight: 1.6 }}>
        <div className="grid grid-cols-2">
          <div className="px-3.5 py-2 text-[11px] text-gray-400" style={{ background: '#1D2024', borderBottom: '1px solid rgba(255,255,255,0.08)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>Before (useData.ts)</div>
          <div className="px-3.5 py-2 text-[11px] text-gray-400" style={{ background: '#1D2024', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>After (AI Suggestion)</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="py-2" style={{ background: '#111318', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            {beforeLines.map((l) => <CodeLine key={l.num} num={l.num} code={l.code} removed={l.removed} />)}
          </div>
          <div className="py-2" style={{ background: '#111318' }}>
            {afterLines.map((l) => <CodeLine key={l.num} num={l.num} code={l.code} added={l.added} />)}
          </div>
        </div>
      </div>

      {/* Why better */}
      <div className="flex items-start gap-2.5 mt-4">
        <CheckCircle size={16} style={{ color: '#3DD68C', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div className="text-[13px] font-medium text-gray-200">Why this is better?</div>
          <div className="text-xs text-gray-400 mt-1 leading-relaxed">
            Reduces time complexity from O(n) with extra operations to optimized filter + map chain. More readable.
          </div>
        </div>
      </div>

      {/* Apply button — cyan reserved for primary action */}
      <button
        onClick={() => setApplied(true)}
        className="mt-4 w-full flex items-center justify-center gap-2 font-semibold text-[13px] rounded-xl py-2.5 border-none cursor-pointer transition-opacity font-[inherit]"
        style={{ background: '#00D4FF', color: '#000' }}
      >
        <Sparkles size={14} />
        {applied ? 'Suggestion Applied ✓' : 'Apply Suggestion'}
      </button>
    </div>
  );
}
