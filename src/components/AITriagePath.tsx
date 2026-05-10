'use client';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const mono = "'JetBrains Mono','Fira Code','Courier New',monospace";

const issues = [
  { num: '01', title: 'Inefficient Loop in useData.ts',  desc: 'High time complexity causing performance issues', file: 'src/hooks/useData.ts:45',       dot: '#f87171' },
  { num: '02', title: 'Large Component: Dashboard.tsx',  desc: 'Component is doing too many things',             file: 'src/components/Dashboard.tsx:1', dot: '#fb923c' },
  { num: '03', title: 'Unused Dependencies',             desc: '7 unused dependencies detected',                 file: 'package.json',                   dot: '#facc15' },
  { num: '04', title: 'Duplicate Logic Detected',        desc: 'Similar code found in 3 places',                 file: 'Multiple files',                 dot: '#60a5fa' },
  { num: '05', title: 'Missing Error Boundaries',        desc: 'Add error boundaries for better stability',      file: 'src/App.tsx',                    dot: '#60a5fa' },
];

export default function AITriagePath() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [btnHovered, setBtnHovered] = useState<number | null>(null);

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>AI Triage Path</span>
          <Sparkles size={14} style={{ color: '#52525b' }} />
        </div>
        <div style={{ fontSize: '10px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500 }}>Top issues to fix for maximum impact</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {issues.map(({ num, title, desc, file, dot }, i) => (
          <div
            key={num}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 8px', borderRadius: '6px', background: hovered === i ? '#1c1c1f' : 'transparent', transition: 'background 120ms ease' }}
          >
            <span style={{ fontFamily: mono, fontSize: '11px', fontWeight: 600, color: '#3f3f46', letterSpacing: '0.04em', flexShrink: 0, width: '22px' }}>{num}</span>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#e4e4e7', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
              <div style={{ fontSize: '11px', color: '#71717a', marginBottom: '3px' }}>{desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: dot, flexShrink: 0 }} />
                <span style={{ fontFamily: mono, fontSize: '10.5px', color: '#3f3f46' }}>{file}</span>
              </div>
            </div>

            <button
              onMouseEnter={() => setBtnHovered(i)}
              onMouseLeave={() => setBtnHovered(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: 'transparent',
                border: btnHovered === i ? '1px solid #3f3f46' : '1px solid transparent',
                borderRadius: '6px', padding: '5px 11px',
                fontSize: '11px', fontWeight: 500,
                color: btnHovered === i ? '#e4e4e7' : '#52525b',
                cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit',
                whiteSpace: 'nowrap', transition: 'all 150ms ease',
              }}
            >
              <Sparkles size={10} /> Auto-Fix PR
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '16px', paddingLeft: '4px' }}>
        <button style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '12px', color: '#71717a', cursor: 'pointer', fontFamily: 'inherit' }}>
          View all issues (42) →
        </button>
      </div>
    </div>
  );
}
