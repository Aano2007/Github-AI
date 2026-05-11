'use client';
import { Sparkle, Info, CheckCircle, Lightning, ShieldCheck, TrendUp } from '@phosphor-icons/react';

const takeaways = [
  { Icon: CheckCircle, title: 'Solid Foundation',       text: 'Well-structured modules with strong separation of concerns.' },
  { Icon: Lightning,   title: 'Performance Bottlenecks', text: 'Data processing loops and oversized components need refactoring.' },
  { Icon: ShieldCheck, title: 'Strong Security Posture', text: 'No critical vulnerabilities. Dependencies are up to date.' },
  { Icon: TrendUp,     title: 'Refactor Opportunity',    text: 'Extract reusable hooks to reduce duplication across components.' },
];

const subcards = [
  { label: 'Strengths',     text: 'Good test coverage',        dot: '#4ade80' },
  { label: 'Risks',         text: 'Performance bottlenecks',   dot: '#fb7185' },
  { label: 'Opportunities', text: 'Refactor large components',  dot: '#a1a1aa' },
];

export default function AIInsightSummary() {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#27272a', border: '1px solid #3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkle size={13} style={{ color: '#a1a1aa' }} weight="fill" />
        </div>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>AI Insight Summary</span>
        <Info size={14} weight="regular" style={{ color: '#52525b' }} />
      </div>

      <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#71717a', lineHeight: 1.6 }}>
        Codebase is <span style={{ color: '#e4e4e7', fontWeight: 600 }}>production-ready</span> with targeted improvements needed in performance and component architecture.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '18px' }}>
        {takeaways.map(({ Icon, title, text }) => (
          <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Icon size={13} weight="fill" style={{ color: '#52525b', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#e4e4e7' }}>{title} — </span>
              <span style={{ fontSize: '12px', color: '#71717a' }}>{text}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '4px', borderTop: '1px solid #27272a' }}>
        {subcards.map(({ label, text, dot }) => (
          <div key={label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: dot, flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#e4e4e7', letterSpacing: '0.01em' }}>{label}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#52525b', lineHeight: 1.55, paddingLeft: '11px' }}>{text}</div>
          </div>
        ))}
      </div>

      <button style={{ marginTop: '14px', background: 'transparent', border: 'none', padding: 0, fontSize: '12px', color: '#a1a1aa', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
        Read detailed analysis →
      </button>
    </div>
  );
}
