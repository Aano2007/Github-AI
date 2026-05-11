'use client';
import { useState } from 'react';
import { CheckCircle, Sparkle, Info } from '@phosphor-icons/react';

const mono = "'JetBrains Mono','Fira Code','Courier New',monospace";

const beforeLines = [
  { n: 42, code: 'for (let i = 0; i < data.length; i++) {', removed: true },
  { n: 43, code: '  const item = data[i];',                  removed: true },
  { n: 44, code: '  if (item.active) {',                     removed: true },
  { n: 45, code: '    result.push(process(item));',          removed: true },
  { n: 46, code: '  }',                                      removed: true },
  { n: 47, code: '}',                                        removed: true },
  { n: 48, code: 'return result;',                           removed: false },
];
const afterLines = [
  { n: 42, code: 'return data',                   added: true },
  { n: 43, code: '  .filter(item => item.active)', added: true },
  { n: 44, code: '  .map(process);',               added: true },
];

function Line({ n, code, removed, added }: { n: number; code: string; removed?: boolean; added?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '2px 12px', background: 'transparent' }}>
      <span style={{ width: '22px', flexShrink: 0, textAlign: 'right', paddingRight: '14px', fontSize: '11px', color: '#52525b', fontFamily: mono, userSelect: 'none' }}>{n}</span>
      <span style={{ fontSize: '11.5px', fontFamily: mono, whiteSpace: 'pre', lineHeight: 1.75,
        color: removed ? '#f87171' : added ? '#4ade80' : '#71717a',
      }}>
        {removed ? '− ' : added ? '+ ' : '  '}{code}
      </span>
    </div>
  );
}

export default function OptimizationEngine() {
  const [applied, setApplied] = useState(false);

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>Optimization Engine</span>
          <Info size={14} weight="regular" style={{ color: '#52525b' }} />
          <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: '#27272a', color: '#a1a1aa', border: '1px solid #3f3f46', marginLeft: '2px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Beta</span>
        </div>
        <div style={{ fontSize: '10px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500 }}>AI suggests a refactor to improve performance</div>
      </div>

      {/* Diff panel */}
      <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #27272a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ padding: '7px 14px', fontSize: '10px', color: '#71717a', fontFamily: mono, background: '#1c1c1f', borderBottom: '1px solid #27272a', borderRight: '1px solid #27272a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            − Before (useData.ts)
          </div>
          <div style={{ padding: '7px 14px', fontSize: '10px', color: '#71717a', fontFamily: mono, background: '#1c1c1f', borderBottom: '1px solid #27272a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            + After (AI Suggestion)
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: '#141417', padding: '8px 0', borderRight: '1px solid #27272a', borderLeft: '2px solid #3f3f46' }}>
            {beforeLines.map(l => <Line key={l.n} n={l.n} code={l.code} removed={l.removed} />)}
          </div>
          <div style={{ background: '#141417', padding: '8px 0', borderLeft: '2px solid #3f3f46' }}>
            {afterLines.map(l => <Line key={l.n} n={l.n} code={l.code} added={l.added} />)}
          </div>
        </div>
      </div>

      {/* Why this is better */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '16px', padding: '14px', background: '#1c1c1f', border: '1px solid #27272a', borderRadius: '8px' }}>
        <CheckCircle size={15} weight="fill" style={{ color: '#52525b', flexShrink: 0, marginTop: '1px' }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#e4e4e7', marginBottom: '4px' }}>Why this is better?</div>
          <div style={{ fontSize: '12px', color: '#71717a', lineHeight: 1.65 }}>
            Reduces time complexity from O(n) with extra operations to optimized filter + map chain. More readable.
          </div>
        </div>
      </div>

      {/* Apply button */}
      <button
        onClick={() => setApplied(true)}
        style={{
          marginTop: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
          background: applied ? '#27272a' : '#ffffff',
          color: applied ? '#71717a' : '#09090b',
          border: '1px solid #3f3f46',
          borderRadius: '8px', padding: '10px',
          fontSize: '13px', fontWeight: 700,
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'all 200ms ease',
          letterSpacing: '0.01em',
        }}
      >
        <Sparkle size={14} weight="fill" />
        {applied ? 'Suggestion Applied ✓' : 'Apply Suggestion'}
      </button>
    </div>
  );
}
