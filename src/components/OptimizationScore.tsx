'use client';
import { Info } from '@phosphor-icons/react';

export default function OptimizationScore() {
  return (
    <div className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>Optimization Score</span>
        <Info size={14} weight="regular" style={{ color: '#52525b' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '72px', fontWeight: 900, color: '#ffffff', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em', lineHeight: 1 }}>75</span>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff' }}>%</span>
            <span style={{ fontSize: '15px', color: '#71717a', marginLeft: '8px', fontWeight: 400 }}>Optimized</span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '10px', background: '#1c1c1f', border: '1px solid #27272a', borderRadius: '20px', padding: '3px 10px' }}>
            <span style={{ fontSize: '12px', color: '#52525b' }}>▲</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#a1a1aa' }}>8% vs last scan</span>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ position: 'relative', height: '20px', marginBottom: '4px' }}>
            <span style={{ position: 'absolute', left: '75%', transform: 'translateX(-50%)', fontSize: '11px', color: '#a1a1aa', fontFamily: 'monospace', fontWeight: 700, whiteSpace: 'nowrap' }}>75%</span>
          </div>
          <div style={{ position: 'relative', height: '4px', borderRadius: '2px', background: '#27272a' }}>
            <div style={{ width: '75%', height: '100%', borderRadius: '2px 0 0 2px', background: '#ffffff' }} />
            <div style={{ position: 'absolute', top: '-4px', left: '75%', width: '2px', height: '12px', background: '#ffffff', borderRadius: '1px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <span style={{ fontSize: '10px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>0%</span>
            <span style={{ fontSize: '10px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>50%</span>
            <span style={{ fontSize: '10px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
