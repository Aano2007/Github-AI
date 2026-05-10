'use client';

const metrics = [
  { icon: '◎', iconColor: '#3DD68C', label: 'Quality',        score: 82, color: '#3DD68C', desc: 'Well-structured modules with good separation of concerns' },
  { icon: '≋', iconColor: '#7C6FF7', label: 'Performance',    score: 74, color: '#E8C23C', desc: 'Performance affected by heavy loops in data processing' },
  { icon: '⛨', iconColor: '#3DD68C', label: 'Security',       score: 91, color: '#3DD68C', desc: 'Dependencies up to date, no critical vulnerabilities' },
  { icon: '◷', iconColor: '#E8C23C', label: 'Technical Debt', score: 64, color: '#E8C23C', desc: 'Several large components need refactoring' },
];

const statusLabel = (s: number) => s >= 85 ? 'Excellent' : s >= 75 ? 'Good' : s >= 65 ? 'Fair' : 'Moderate';

export default function SystemVitality() {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#E2E2E9' }}>System Vitality</span>
        <a href="#" style={{ fontSize: '12px', color: '#9CA3AF', textDecoration: 'none' }}>View full metrics →</a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {metrics.map(({ icon, iconColor, label, score, color, desc }) => (
          <div key={label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '5px' }}>
              <span style={{ fontSize: '14px', color: iconColor, width: '18px', textAlign: 'center', flexShrink: 0 }}>{icon}</span>
              <span style={{ fontSize: '13px', color: '#E2E2E9', fontWeight: 500, width: '112px', flexShrink: 0 }}>{label}</span>
              <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)' }}>
                <div style={{ width: `${score}%`, height: '100%', borderRadius: '2px', background: color }} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color, fontFamily: 'JetBrains Mono, monospace', width: '28px', textAlign: 'right', flexShrink: 0 }}>{score}</span>
              <span style={{ fontSize: '11px', color: '#6B7280', width: '58px', flexShrink: 0 }}>{statusLabel(score)}</span>
            </div>
            <div style={{ paddingLeft: '30px', fontSize: '11px', color: '#6B7280', lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
