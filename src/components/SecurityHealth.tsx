'use client';
import { useState } from 'react';
import { ShieldAlert, AlertTriangle, CircleDot, CheckCircle2, ChevronDown, ChevronUp, Info } from 'lucide-react';

const segments = [
  { Icon: ShieldAlert,   iconColor: '#f87171', dot: '#f87171', count: 2,   label: 'Critical',   sub: 'vulnerabilities' },
  { Icon: AlertTriangle, iconColor: '#fb923c', dot: '#fb923c', count: 5,   label: 'High',       sub: 'vulnerabilities' },
  { Icon: CircleDot,     iconColor: '#facc15', dot: '#facc15', count: 7,   label: 'Medium',     sub: 'vulnerabilities' },
  { Icon: CheckCircle2,  iconColor: '#4ade80', dot: '#4ade80', count: 128, label: 'Up to date', sub: 'dependencies' },
];
const details = [
  { dot: '#f87171', label: 'Critical', text: 'lodash@4.17.20 — Prototype pollution (CVE-2021-23337). Upgrade to 4.17.21+' },
  { dot: '#fb923c', label: 'High',     text: 'node-fetch@2.6.0 — SSRF vulnerability. Upgrade to 2.6.7+' },
  { dot: '#facc15', label: 'Medium',   text: 'Multiple packages with known medium-severity issues. Run npm audit for full list.' },
];

export default function SecurityHealth() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>Security &amp; Dependency Health</span>
        <Info size={14} style={{ color: '#52525b' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {segments.map(({ Icon, iconColor, dot, count, label, sub }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#1c1c1f', border: '1px solid #27272a', borderRadius: '10px', padding: '14px 16px' }}>
              <Icon size={18} style={{ color: iconColor, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#e4e4e7', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{count}</div>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#a1a1aa', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                <div style={{ fontSize: '10px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: '1px solid #27272a', borderRadius: '8px', padding: '8px 14px', fontSize: '12px', color: '#a1a1aa', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0, transition: 'border-color 120ms ease' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#3f3f46'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#27272a'}
        >
          Expand details {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {expanded && (
        <div style={{ marginTop: '14px', background: '#1c1c1f', border: '1px solid #27272a', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {details.map(({ dot, label, text }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#71717a', lineHeight: 1.6 }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: dot, flexShrink: 0, marginTop: '5px' }} />
              <span><span style={{ fontWeight: 600, color: '#a1a1aa' }}>{label}: </span>{text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
