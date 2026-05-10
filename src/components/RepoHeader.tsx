'use client';

const keyMetrics = [
  { label: 'Health Score', value: '75%',    color: 'var(--neon-cyan)' },
  { label: 'Risk Level',   value: 'Medium', color: 'var(--neon-yellow)' },
  { label: 'Coverage',     value: '62%',    color: 'var(--neon-green)' },
];

export default function RepoHeader() {
  return (
    <div style={{ marginBottom: '28px' }}>
      {/* Row 1 — repo name + badges + last analyzed */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#E2E2E9', margin: 0, letterSpacing: '-0.01em' }}>codebase-ai</h1>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.4 }}>
            <rect x="3" y="7" width="10" height="8" rx="1.5" fill="none" stroke="#9CA3AF" strokeWidth="1.4" />
            <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="11" r="1" fill="#9CA3AF" />
          </svg>
          <span style={{ background: 'rgba(59,130,246,0.12)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '5px', fontSize: '11px', padding: '2px 8px', fontWeight: 500 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>TS</span> TypeScript
          </span>
          <span style={{ background: 'rgba(255,255,255,0.05)', color: '#9CA3AF', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '5px', fontSize: '11px', padding: '2px 8px', fontWeight: 500 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>N</span> Next.js
          </span>
          <span style={{ background: 'rgba(255,255,255,0.05)', color: '#9CA3AF', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '5px', fontSize: '11px', padding: '2px 8px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            ⎇ main
          </span>
        </div>
        <span style={{ fontSize: '12px', color: '#8E9099' }}>Last analyzed: 2 mins ago</span>
      </div>

      {/* Row 2 — AI summary card */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1 }}>
          <span style={{ fontSize: '13px', color: '#7C6FF7', marginTop: '1px', flexShrink: 0 }}>✦</span>
          <p style={{ margin: 0, fontSize: '13px', color: '#8E9099', lineHeight: 1.65, maxWidth: '540px' }}>
            This repository has{' '}
            <span style={{ color: '#E8C23C', fontWeight: 500 }}>moderate performance issues</span> and{' '}
            <span style={{ color: '#3DD68C', fontWeight: 500 }}>strong security</span>, with key improvements needed in data processing and component structure.
          </p>
        </div>
        <div style={{ display: 'flex', flexShrink: 0, marginLeft: '32px' }}>
          {keyMetrics.map(({ label, value, color }, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'stretch' }}>
              {/* vertical divider before each item */}
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 24px', alignSelf: 'stretch' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{value}</div>
                <div style={{ fontSize: '10px', color: '#8E9099', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
