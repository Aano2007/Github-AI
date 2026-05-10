'use client';

const subMetrics = [
  { label: 'Performance',     value: 74, color: '#E8C23C' },
  { label: 'Security',        value: 91, color: '#3DD68C' },
  { label: 'Maintainability', value: 68, color: '#E8C23C' },
];

export default function OptimizationScore() {
  return (
    <div className="card">

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '3px' }}>Overall Health Score</div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#E2E2E9' }}>Optimization Score</div>
        </div>
        <button
          style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#9CA3AF', background: 'transparent', cursor: 'pointer', transition: 'all 120ms ease', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#E2E2E9'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        >
          View detailed report →
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>

        {/* Score */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', lineHeight: 1 }}>
            <span style={{ fontSize: '56px', fontWeight: 700, color: '#ffffff', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', lineHeight: 1 }}>75</span>
            <span style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff' }}>%</span>
          </div>
          <div style={{ fontSize: '12px', color: '#3DD68C', marginTop: '6px' }}>▲ 8% vs last scan</div>
        </div>

        {/* Bar + sub-metrics */}
        <div style={{ flex: 1 }}>
          {/* Main bar */}
          <div style={{ position: 'relative', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }}>
            <div style={{ width: '75%', height: '100%', borderRadius: '3px', background: 'linear-gradient(to right, #006680, #00D4FF)' }} />
            <span style={{ position: 'absolute', top: '-18px', left: '75%', transform: 'translateX(-50%)', fontSize: '11px', color: '#00D4FF', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap' }}>75%</span>
          </div>

          {/* Sub-metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {subMetrics.map(({ label, value, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: '#9CA3AF', width: '110px', flexShrink: 0 }}>{label}</span>
                <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)' }}>
                  <div style={{ width: `${value}%`, height: '100%', borderRadius: '2px', background: color }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color, fontFamily: 'JetBrains Mono, monospace', width: '28px', textAlign: 'right' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
