'use client';
import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'analysis',  icon: '◈', label: 'Analysis'     },
  { id: 'repos',     icon: '⊞', label: 'Repositories' },
  { id: 'history',   icon: '◷', label: 'History'      },
  { id: 'security',  icon: '⛨', label: 'Security'     },
  { id: 'settings',  icon: '⚙', label: 'Settings'     },
];

export default function Sidebar() {
  const [active, setActive] = useState('analysis');
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '48px',
      background: 'var(--bg-card)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '12px',
      zIndex: 200,
      gap: '2px',
    }}>

      {/* Logo */}
      <div style={{ marginBottom: '16px', padding: '6px' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5" fill="var(--accent-cyan)" />
        </svg>
      </div>

      {/* Nav items */}
      {NAV_ITEMS.map(({ id, icon, label }) => {
        const isActive = active === id;
        const isHovered = hovered === id;
        return (
          <div key={id} style={{ position: 'relative', width: '100%' }}>
            <button
              onClick={() => setActive(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              title={label}
              style={{
                width: '100%',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isActive ? 'var(--accent-cyan-dim)' : isHovered ? 'var(--bg-input)' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '16px',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-tertiary)',
                transition: 'all 120ms ease',
                fontFamily: 'inherit',
              }}
            >
              {icon}
            </button>

            {/* Tooltip */}
            {isHovered && (
              <div style={{
                position: 'absolute',
                left: '52px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-light)',
                borderRadius: '5px',
                padding: '4px 10px',
                fontSize: '12px',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 300,
              }}>
                {label}
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom spacer + avatar */}
      <div style={{ marginTop: 'auto', marginBottom: '12px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'var(--accent-purple-dim)',
          border: '1px solid var(--accent-purple)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          color: 'var(--accent-purple)',
          fontWeight: 600,
          cursor: 'pointer',
        }}>
          A
        </div>
      </div>
    </aside>
  );
}
