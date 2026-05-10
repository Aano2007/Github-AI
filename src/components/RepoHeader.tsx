'use client';

function NavButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      style={{ display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#9CA3AF', background: 'transparent', cursor: 'pointer', transition: 'all 120ms ease', fontFamily: 'inherit' }}
      onMouseEnter={e => { e.currentTarget.style.color = '#E2E2E9'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
    >
      <span>{icon}</span>{label}
    </button>
  );
}

const keyMetrics = [
  { label: 'Health Score', value: '75%',    color: '#00D4FF' },
  { label: 'Risk Level',   value: 'Medium', color: '#E8C23C' },
  { label: 'Coverage',     value: '62%',    color: '#3DD68C' },
];

export default function RepoHeader() {
  return (
    <div style={{ marginBottom: '32px' }}>

      {/* Row 1 — breadcrumb + actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#E2E2E9', margin: 0, letterSpacing: '-0.01em' }}>codebase-ai</h1>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.4 }}>
            <rect x="3" y="7" width="10" height="8" rx="1.5" fill="none" stroke="#9CA3AF" strokeWidth="1.4" />
            <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="11" r="1" fill="#9CA3AF" />
          </svg>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ background: 'rgba(59,130,246,0.15)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '5px', fontSize: '11px', padding: '2px 8px', fontWeight: 500 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>TS</span> TypeScript
            </span>
            <span style={{ background: 'rgba(255,255,255,0.05)', color: '#9CA3AF', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '5px', fontSize: '11px', padding: '2px 8px', fontWeight: 500 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>N</span> Next.js
            </span>
            <span style={{ background: 'rgba(255,255,255,0.05)', color: '#9CA3AF', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '5px', fontSize: '11px', padding: '2px 8px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              ⎇ main
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#6B7280' }}>· 2 mins ago</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <NavButton icon="↻" label="Re-Scan" />
          <NavButton icon="↗" label="View Repository" />
        </div>
      </div>

      {/* Row 2 — AI summary + key metrics */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1D2024', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1 }}>
          <span style={{ fontSize: '13px', color: '#7C6FF7', marginTop: '1px', flexShrink: 0 }}>✦</span>
          <p style={{ margin: 0, fontSize: '13px', color: '#9CA3AF', lineHeight: 1.65, maxWidth: '540px' }}>
            This repository has{' '}
            <span style={{ color: '#E8C23C', fontWeight: 500 }}>moderate performance issues</span> and{' '}
            <span style={{ color: '#3DD68C', fontWeight: 500 }}>strong security</span>, with key improvements needed in data processing and component structure.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '32px', flexShrink: 0, marginLeft: '32px' }}>
          {keyMetrics.map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{value}</div>
              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
