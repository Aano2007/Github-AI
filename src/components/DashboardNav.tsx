'use client';
import { useState } from 'react';

export default function DashboardNav() {
  const [activeTab, setActiveTab] = useState<'analysis' | 'history'>('analysis');

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      height: '48px',
      background: 'var(--bg-base)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* LEFT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

          {/* Hexagon logo */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <polygon
              points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5"
              fill="var(--accent-cyan)"
            />
          </svg>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['analysis', 'history'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                    paddingBottom: '2px',
                    padding: '4px 8px',
                    fontSize: '14px',
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    fontFamily: 'inherit',
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

          <NavButton icon="↻" label="Re-Scan" />
          <NavButton icon="↗" label="View Repository" />

          {/* Three-dot button */}
          <button
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              transition: 'all 120ms ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-input)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            ⋯
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid var(--border-light)',
        borderRadius: '6px',
        padding: '6px 14px',
        fontSize: '13px',
        color: 'var(--text-secondary)',
        background: 'transparent',
        cursor: 'pointer',
        transition: 'all 120ms ease',
        fontFamily: 'inherit',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#3A4455';
        e.currentTarget.style.color = 'var(--text-primary)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-light)';
        e.currentTarget.style.color = 'var(--text-secondary)';
      }}
    >
      <span style={{ fontSize: '13px', marginRight: '6px' }}>{icon}</span>
      {label}
    </button>
  );
}
