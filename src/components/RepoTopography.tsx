'use client';
import { useState } from 'react';
import { Info } from 'lucide-react';

const mono = "'JetBrains Mono','Fira Code','Courier New',monospace";

// Glassmorphic rectangular node for Architecture Map
function ArchNode({ x, y, label, wide }: { x: number; y: number; label: string; wide?: boolean }) {
  const w = wide ? 90 : 70;
  const h = 26;
  const r = 3;
  return (
    <g>
      {/* glass bg */}
      <rect x={x} y={y} width={w} height={h} rx={r}
        fill="rgba(15,17,35,0.7)"
        stroke="rgba(103,232,249,0.45)"
        strokeWidth="1"
        style={{ filter: 'drop-shadow(0 0 4px rgba(103,232,249,0.2))' }}
      />
      {/* top-edge rim */}
      <rect x={x} y={y} width={w} height={1} rx={0}
        fill="rgba(255,255,255,0.12)"
      />
      <text
        x={x + w / 2} y={y + h / 2 + 4}
        fontSize="9.5"
        fill="rgba(103,232,249,0.85)"
        textAnchor="middle"
        fontFamily="'JetBrains Mono','Fira Code','Courier New',monospace"
        fontWeight="600"
      >{label}</text>
    </g>
  );
}

const SHADES = [
  'transparent',
  'rgba(30,27,75,0.5)',
  'rgba(55,48,163,0.55)',
  'rgba(6,182,212,0.45)',
  'rgba(34,211,238,0.75)',
  'rgba(217,70,239,0.9)',
];
const GLOW: Record<number, string> = {
  5: '0 0 8px rgba(217,70,239,0.7)',
};
const TILES = [
  1,1,1,2,1,2,1,2,2,3,3,2,
  1,2,1,2,2,2,3,2,3,3,3,3,
  0,2,2,2,2,3,3,3,3,3,4,3,
  2,2,2,3,3,3,3,3,4,3,4,4,
  2,2,3,3,3,3,3,4,4,4,4,4,
  2,3,3,3,3,3,4,4,4,4,5,4,
  3,3,3,3,4,4,4,4,4,5,4,5,
  0,3,3,4,4,4,4,4,5,5,5,4,
  3,3,4,4,4,4,5,5,5,5,5,0,
  3,4,4,4,5,5,5,5,5,5,0,5,
];


const hotspots = [
  { file: 'src/components/Dashboard.tsx', score: 94, color: '#FCA5A5' },
  { file: 'src/hooks/useData.ts',          score: 87, color: '#FDBA74' },
  { file: 'src/lib/processor.ts',          score: 81, color: '#FCD34D' },
];

const TABS = [
  { id: 'heatmap', label: 'Complexity Heatmap' },
  { id: 'arch',    label: 'Architecture Map' },
] as const;

export default function RepoTopography() {
  const [tab, setTab] = useState<'heatmap' | 'arch'>('heatmap');

  return (
    <div className="glass-card">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>Repository Topography</span>
          <Info size={14} style={{ color: '#8E9099' }} />
        </div>

        {/* Minimal text-link tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {TABS.map(({ id, label }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  background: 'none', border: 'none', padding: '4px 0',
                  fontSize: '12px', fontWeight: active ? 600 : 400,
                  color: active ? '#ffffff' : '#8E9099',
                  cursor: 'pointer', fontFamily: 'inherit',
                  position: 'relative',
                  transition: 'color 150ms ease',
                  // glowing cyan underline for active
                  borderBottom: active
                    ? '2px solid rgba(103,232,249,0.9)'
                    : '2px solid transparent',
                  textShadow: active ? '0 0 12px rgba(103,232,249,0.5)' : 'none',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Heatmap tab — two-column */}
      {tab === 'heatmap' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
          {/* LEFT — heatmap + scoped gradient bar */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2px', marginBottom: '12px' }}>
              {TILES.map((lvl, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: '2px', background: SHADES[lvl], boxShadow: GLOW[lvl] || 'none' }} />
              ))}
            </div>
            <div style={{ height: '5px', borderRadius: '3px', background: 'linear-gradient(to right, rgba(30,27,75,0.5), rgba(6,182,212,0.7), rgba(217,70,239,0.9))', marginBottom: '6px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10px', color: '#8E9099', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 500 }}>Low Complexity</span>
              <span style={{ fontSize: '10px', color: '#8E9099', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 500 }}>High Complexity</span>
            </div>
          </div>

          {/* RIGHT — Complexity Hotspots */}
          <div>
            <div style={{ fontSize: '10px', color: '#8E9099', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600, marginBottom: '14px' }}>
              Complexity Hotspots
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {hotspots.map(({ file, score, color }, i) => (
                <div key={file} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px' }}>
                  <span style={{ fontFamily: mono, fontSize: '11px', color: 'rgba(103,232,249,0.4)', fontWeight: 600, flexShrink: 0, width: '16px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: mono, fontSize: '11px', color: 'rgba(196,198,208,0.75)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file}</div>
                  </div>
                  <span style={{ fontFamily: mono, fontSize: '12px', fontWeight: 700, color, flexShrink: 0 }}>{score}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '14px', fontSize: '10px', color: '#8E9099', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Complexity score / 100
            </div>
          </div>
        </div>
      )}

      {/* Architecture Map tab */}
      {tab === 'arch' && (
        <div style={{ overflowX: 'auto' }}>
          <svg width="100%" viewBox="0 0 480 300" fill="none" style={{ overflow: 'visible', minWidth: '360px' }}>
            <defs>
              {/* cyan glow filter for lines */}
              <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <marker id="arrowH" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                <path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(103,232,249,0.5)" />
              </marker>
            </defs>

            {/* ── ORTHOGONAL CONNECTIONS ── */}
            {/* Row 0 → Row 1: app→components, pages→components, pages→lib */}
            {/* app (cx=60) down to components (cx=140) */}
            <polyline points="60,36 60,68 140,68 140,100" stroke="rgba(103,232,249,0.35)" strokeWidth="1" fill="none" filter="url(#lineGlow)" markerEnd="url(#arrowH)" />
            {/* pages (cx=200) down to components */}
            <polyline points="200,36 200,68 140,68 140,100" stroke="rgba(103,232,249,0.35)" strokeWidth="1" fill="none" filter="url(#lineGlow)" />
            {/* pages (cx=200) down to lib (cx=340) */}
            <polyline points="200,36 200,52 340,52 340,100" stroke="rgba(103,232,249,0.25)" strokeWidth="1" fill="none" filter="url(#lineGlow)" markerEnd="url(#arrowH)" />

            {/* Row 1 → Row 2: components→ui,hooks,utils,services  lib→types */}
            {/* components (cx=140) → ui (cx=40) */}
            <polyline points="140,126 140,168 40,168 40,200" stroke="rgba(103,232,249,0.35)" strokeWidth="1" fill="none" filter="url(#lineGlow)" markerEnd="url(#arrowH)" />
            {/* components → hooks (cx=130) */}
            <polyline points="140,126 140,168 130,168 130,200" stroke="rgba(103,232,249,0.35)" strokeWidth="1" fill="none" filter="url(#lineGlow)" markerEnd="url(#arrowH)" />
            {/* components → utils (cx=240) */}
            <polyline points="140,126 140,168 240,168 240,200" stroke="rgba(103,232,249,0.35)" strokeWidth="1" fill="none" filter="url(#lineGlow)" markerEnd="url(#arrowH)" />
            {/* components → services (cx=360) */}
            <polyline points="140,126 140,168 360,168 360,200" stroke="rgba(103,232,249,0.25)" strokeWidth="1" fill="none" filter="url(#lineGlow)" markerEnd="url(#arrowH)" />
            {/* lib (cx=340) → types (cx=440) */}
            <polyline points="340,126 340,168 440,168 440,200" stroke="rgba(103,232,249,0.25)" strokeWidth="1" fill="none" filter="url(#lineGlow)" markerEnd="url(#arrowH)" />

            {/* ── NODES ── */}
            {/* Row 0 — app/, pages/ */}
            <ArchNode x={20}  y={8}  label="app/" />
            <ArchNode x={160} y={8}  label="pages/" />

            {/* Row 1 — components/, lib/ */}
            <ArchNode x={80}  y={100} label="components/" wide />
            <ArchNode x={300} y={100} label="lib/" />

            {/* Row 2 — ui/, hooks/, utils/, services/, types/ */}
            <ArchNode x={0}   y={200} label="ui/" />
            <ArchNode x={90}  y={200} label="hooks/" />
            <ArchNode x={195} y={200} label="utils/" />
            <ArchNode x={310} y={200} label="services/" wide />
            <ArchNode x={410} y={200} label="types/" />
          </svg>
        </div>
      )}
    </div>
  );
}
