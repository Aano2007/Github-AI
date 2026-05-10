'use client';
import { useState } from 'react';
import { LayoutGrid, Search, MessageCircle } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'grid', icon: LayoutGrid, label: 'Dashboard' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'chat', icon: MessageCircle, label: 'Chat' },
];

export default function AnalysisSidebar() {
  const [active, setActive] = useState('grid');
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside
      style={{
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
        paddingTop: '56px',
        zIndex: 200,
        gap: '4px',
      }}
    >
      {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
        const isActive = active === id;
        const isHovered = hovered === id;
        return (
          <div key={id} style={{ position: 'relative' }}>
            <button
              onClick={() => setActive(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              title={label}
              aria-label={label}
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isActive ? 'var(--accent-cyan-dim)' : isHovered ? 'var(--bg-input)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-tertiary)',
                transition: 'all 120ms ease',
              }}
            >
              <Icon size={18} />
            </button>

            {isHovered && (
              <div
                style={{
                  position: 'absolute',
                  left: '44px',
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
                }}
              >
                {label}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
