'use client';
import { Info } from '@phosphor-icons/react';

const mono = "'JetBrains Mono','Fira Code','Courier New',monospace";
const R = 36, C = 2 * Math.PI * R;

const segments = [
  { pct: 0.62, color: '#3f3f46' },
  { pct: 0.28, color: '#27272a' },
  { pct: 0.10, color: '#1c1c1f' },
];
const legend = [
  { dot: '#4ade80', label: 'Covered',   value: '62%', detail: '1,348 lines' },
  { dot: '#facc15', label: 'Uncovered', value: '28%', detail: '624 lines' },
  { dot: '#3f3f46', label: 'Excluded',  value: '10%', detail: '198 lines' },
];
const uncovered = [
  { file: 'src/lib/processor.ts',     pct: 32 },
  { file: 'src/hooks/useData.ts',     pct: 45 },
  { file: 'src/components/Table.tsx', pct: 51 },
];

export default function TestCoverage() {
  let offset = 0;
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>Test Coverage</span>
        <Info size={14} weight="regular" style={{ color: '#52525b' }} />
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <svg width="100" height="100" viewBox="0 0 90 90" style={{ flexShrink: 0 }}>
          <circle cx="45" cy="45" r={R} fill="none" stroke="#1c1c1f" strokeWidth="8" />
          {segments.map(({ pct, color }, i) => {
            const dash = C * pct;
            const off = -offset * C - C * 0.25;
            offset += pct;
            return <circle key={i} cx="45" cy="45" r={R} fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={off} />;
          })}
          <text x="45" y="41" textAnchor="middle" fontSize="17" fontWeight="900" fill="#ffffff" fontFamily="inherit">62%</text>
          <text x="45" y="54" textAnchor="middle" fontSize="9" fill="#52525b" fontFamily="inherit" letterSpacing="0.08em">COVERED</text>
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
          {legend.map(({ dot, label, value, detail }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: dot, flexShrink: 0 }} />
              <span style={{ fontSize: '11px', color: '#e4e4e7', fontWeight: 500 }}>{label}</span>
              <span style={{ fontFamily: mono, fontSize: '11px', color: '#a1a1aa' }}>{value}</span>
              <span style={{ fontFamily: mono, fontSize: '10px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{detail}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, paddingLeft: '20px', borderLeft: '1px solid #27272a' }}>
          <div style={{ fontSize: '10px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600, marginBottom: '12px' }}>Uncovered Areas</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {uncovered.map(({ file, pct }) => (
              <div key={file}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontFamily: mono, fontSize: '10.5px', color: '#52525b', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file}</span>
                  <span style={{ fontFamily: mono, fontSize: '11px', fontWeight: 700, color: '#71717a', marginLeft: 'auto', paddingLeft: '8px', textAlign: 'right', minWidth: '36px', display: 'block' }}>{pct}%</span>
                </div>
                <div style={{ height: '2px', borderRadius: '1px', background: '#27272a' }}>
                  <div style={{ width: `${pct}%`, height: '100%', borderRadius: '1px', background: '#3f3f46' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button style={{ marginTop: '20px', background: 'transparent', border: 'none', padding: 0, fontSize: '12px', color: '#71717a', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
        View full coverage report →
      </button>
    </div>
  );
}
