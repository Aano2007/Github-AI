'use client';
import { Info } from 'lucide-react';

const Sparkline = ({ color, points }: { color: string; points: number[] }) => {
  const w = 100, h = 44;
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 1;
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map(p => h - ((p - min) / range) * (h - 6) - 3);
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
  const fill = `${d} L${w},${h} L0,${h} Z`;
  const id = `sg-${color.replace(/[^a-z0-9]/gi, '')}`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const metrics = [
  { label: 'Quality',        score: 82, color: 'var(--neon-green)',  spark: [70,74,72,78,80,79,82], status: 'Good',     dot: 'var(--neon-green)' },
  { label: 'Performance',    score: 74, color: 'var(--neon-yellow)', spark: [68,71,69,73,70,72,74], status: 'Fair',     dot: 'var(--neon-yellow)' },
  { label: 'Security',       score: 91, color: 'var(--neon-green)',  spark: [85,87,88,86,89,90,91], status: 'Excellent',dot: 'var(--neon-green)' },
  { label: 'Technical Debt', score: 64, color: 'var(--neon-orange)', spark: [72,69,67,70,66,65,64], status: 'Moderate', dot: 'var(--neon-orange)' },
];

export default function SystemVitality() {
  return (
    <div className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>System Vitality</span>
          <Info size={14} style={{ color: '#8E9099' }} />
        </div>
        <a href="#" style={{ fontSize: '12px', color: '#C4C6D0', textDecoration: 'none' }}>View full metrics →</a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {metrics.map(({ label, score, color, spark, status, dot }) => (
          <div key={label} style={{ background: '#1c1c1f', border: '1px solid #27272a', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10px', color: '#8E9099', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: dot }} />
                <span style={{ fontSize: '10px', color: dot }}>{status}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '36px', fontWeight: 900, color: '#E2E2E9', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: '13px', color: '#8E9099' }}>/100</span>
            </div>
            <div style={{ marginTop: '4px' }}>
              <Sparkline color={color} points={spark} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
