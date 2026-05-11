'use client';
import { useState } from 'react';
import { ArrowClockwise, ArrowSquareOut, DotsThree } from '@phosphor-icons/react';

export default function AnalysisNav() {
  const [activeTab, setActiveTab] = useState<'analysis' | 'history'>('analysis');

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: '48px',
        right: 0,
        height: '48px',
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 100,
      }}
    >
      {/* Left: Logo + Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* Logo */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" stroke="var(--accent-cyan)" strokeWidth="1.5" fill="none" />
          <polygon points="12,6 16,8.5 16,13.5 12,16 8,13.5 8,8.5" fill="var(--accent-cyan)" opacity="0.3" />
        </svg>

        {/* Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => setActiveTab('analysis')}
            style={{
              background: 'none',
              border: 'none',
              padding: '14px 0',
              fontSize: '14px',
              fontWeight: activeTab === 'analysis' ? 600 : 400,
              color: activeTab === 'analysis' ? 'var(--text-primary)' : 'var(--text-tertiary)',
              borderBottom: activeTab === 'analysis' ? '2px solid var(--text-primary)' : '2px solid transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 120ms ease',
            }}
          >
            Analysis
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={{
              background: 'none',
              border: 'none',
              padding: '14px 0',
              fontSize: '14px',
              fontWeight: activeTab === 'history' ? 600 : 400,
              color: activeTab === 'history' ? 'var(--text-primary)' : 'var(--text-tertiary)',
              borderBottom: activeTab === 'history' ? '2px solid var(--text-primary)' : '2px solid transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 120ms ease',
            }}
          >
            History
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'transparent',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '6px 14px',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 120ms ease',
          }}
        >
          <ArrowClockwise size={14} weight="bold" />
          Re-Scan
        </button>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'transparent',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '6px 14px',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 120ms ease',
          }}
        >
          View Repository
          <ArrowSquareOut size={14} weight="bold" />
        </button>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '6px 8px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 120ms ease',
          }}
        >
          <DotsThree size={16} weight="bold" />
        </button>
      </div>
    </nav>
  );
}
