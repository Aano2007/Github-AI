'use client';
import { useState } from 'react';
import { ShieldWarning, Warning, CircleHalf, CheckCircle, CaretDown, CaretUp, Info } from '@phosphor-icons/react';

const mono = "'JetBrains Mono','Fira Code','Courier New',monospace";

const segments = [
  { Icon: ShieldWarning, iconColor: '#f87171', count: 2,   label: 'Critical',   sub: 'vulnerabilities' },
  { Icon: Warning,       iconColor: '#fb923c', count: 5,   label: 'High',       sub: 'vulnerabilities' },
  { Icon: CircleHalf,    iconColor: '#facc15', count: 7,   label: 'Medium',     sub: 'vulnerabilities' },
  { Icon: CheckCircle,   iconColor: '#4ade80', count: 128, label: 'Up to date', sub: 'dependencies'    },
];

const details = [
  { severity: 'CRITICAL', pkg: 'lodash@4.17.20',    desc: 'Prototype pollution (CVE-2021-23337)',          fix: 'Upgrade to 4.17.21+' },
  { severity: 'HIGH',     pkg: 'node-fetch@2.6.0',  desc: 'SSRF vulnerability',                            fix: 'Upgrade to 2.6.7+'   },
  { severity: 'MEDIUM',   pkg: 'multiple packages', desc: 'Known medium-severity issues in dependencies',  fix: 'Run npm audit'       },
];

export default function SecurityHealth() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>Security &amp; Dependency Health</span>
        <Info size={14} weight="regular" style={{ color: '#52525b' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {segments.map(({ Icon, iconColor, count, label, sub }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#18181b', border: '1px solid #27272a', borderRadius: '10px', padding: '14px 16px' }}>
              <Icon size={18} weight="fill" style={{ color: iconColor, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#e4e4e7', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{count}</div>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#71717a', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                <div style={{ fontSize: '10px', color: '#3f3f46', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: '1px solid #27272a', borderRadius: '8px', padding: '8px 14px', fontSize: '12px', color: '#71717a', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0, transition: 'border-color 120ms ease' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#3f3f46'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#27272a'}
        >
          Expand details {expanded ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
        </button>
      </div>

      {expanded && (
        <div style={{ marginTop: '14px', border: '1px solid #27272a', borderRadius: '8px', overflow: 'hidden' }}>
          {details.map(({ severity, pkg, desc, fix }, i) => (
            <div key={severity} style={{
              display: 'grid', gridTemplateColumns: '72px 1fr auto',
              alignItems: 'center', gap: '16px',
              padding: '12px 16px',
              borderTop: i === 0 ? 'none' : '1px solid #27272a',
              background: '#18181b',
            }}>
              <span style={{ fontFamily: mono, fontSize: '9px', fontWeight: 700, color: '#3f3f46', textTransform: 'uppercase', letterSpacing: '0.18em' }}>{severity}</span>
              <div>
                <span style={{ fontFamily: mono, fontSize: '11px', color: '#71717a' }}>{pkg}</span>
                <span style={{ fontSize: '11px', color: '#3f3f46', marginLeft: '8px' }}>— {desc}</span>
              </div>
              <span style={{ fontFamily: mono, fontSize: '10px', color: '#52525b', whiteSpace: 'nowrap' }}>{fix}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
