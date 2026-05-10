'use client';
import { Sparkles, Info, CheckCircle2, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

const takeaways = [
  { Icon: CheckCircle2, color: '#4ade80', title: 'Solid Foundation',       text: 'Well-structured modules with strong separation of concerns.' },
  { Icon: Zap,          color: '#fb923c', title: 'Performance Bottlenecks', text: 'Data processing loops and oversized components need refactoring.' },
  { Icon: ShieldCheck,  color: '#38bdf8', title: 'Strong Security Posture', text: 'No critical vulnerabilities. Dependencies are up to date.' },
  { Icon: TrendingUp,   color: '#a78bfa', title: 'Refactor Opportunity',    text: 'Extract reusable hooks to reduce duplication across components.' },
];

const subcards = [
  { label: 'Strengths',     text: 'Good test coverage' },
  { label: 'Risks',         text: 'Performance bottlenecks' },
  { label: 'Opportunities', text: 'Refactor large components' },
];

export default function AIInsightSummary() {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#27272a', border: '1px solid #3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={13} style={{ color: '#a1a1aa' }} />
        </div>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>AI Insight Summary</span>
        <Info size={14} style={{ color: '#52525b' }} />
      </div>

      <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#71717a', lineHeight: 1.6 }}>
        Codebase is <span style={{ color: '#e4e4e7', fontWeight: 600 }}>production-ready</span> with targeted improvements needed in performance and component architecture.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '18px' }}>
        {takeaways.map(({ Icon, color, title, text }) => (
          <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Icon size={13} style={{ color, flexShrink: 0, marginTop: '2px' }} />
            <div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#e4e4e7' }}>{title} — </span>
              <span style={{ fontSize: '12px', color: '#71717a' }}>{text}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {subcards.map(({ label, text }) => (
          <div key={label} style={{ background: '#1c1c1f', border: '1px solid #27272a', borderRadius: '8px', padding: '10px 12px' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '11px', color: '#a1a1aa', lineHeight: 1.4 }}>{text}</div>
          </div>
        ))}
      </div>

      <button style={{ marginTop: '14px', background: 'transparent', border: 'none', padding: 0, fontSize: '12px', color: '#a1a1aa', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
        Read detailed analysis →
      </button>
    </div>
  );
}
