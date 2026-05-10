'use client';
import { useState } from 'react';
import { Info, ExternalLink } from 'lucide-react';

const SHADES = ['#181E25', '#1D3040', '#1A4A5A', '#0D7A99', '#00B8E0', '#00D4FF'];

const TILES: number[] = [
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

const NW = 80, NH = 26, NR = 5;

type NodeDef = { id: string; x: number; y: number; label: string };
type EdgeDef = { from: string; to: string };

const NODES: NodeDef[] = [
  { id: 'app', x: 60, y: 20, label: 'app' },
  { id: 'pages', x: 200, y: 20, label: 'pages' },
  { id: 'components', x: 60, y: 80, label: 'components' },
  { id: 'lib', x: 220, y: 80, label: 'lib' },
  { id: 'ui', x: 20, y: 145, label: 'ui' },
  { id: 'layout', x: 100, y: 145, label: 'layout' },
  { id: 'utils', x: 185, y: 145, label: 'utils' },
  { id: 'services', x: 275, y: 145, label: 'services' },
  { id: 'types', x: 205, y: 205, label: 'types' },
];

const EDGES: EdgeDef[] = [
  { from: 'app', to: 'pages' },
  { from: 'components', to: 'lib' },
  { from: 'components', to: 'ui' },
  { from: 'components', to: 'layout' },
  { from: 'components', to: 'utils' },
  { from: 'components', to: 'services' },
  { from: 'lib', to: 'types' },
  { from: 'utils', to: 'types' },
];

const DIR_LABELS = ['src/', 'components/', 'hooks/', 'lib/', 'utils/', 'services/', 'types/'];

function nodeCenter(n: NodeDef) {
  return { cx: n.x + NW / 2, cy: n.y + NH / 2 };
}

export default function RepoTopography() {
  const [activeView, setActiveView] = useState<'heatmap' | 'arch'>('heatmap');
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-200">Repository Topography</span>
          <Info size={14} className="text-gray-500" />
        </div>
        <button className="flex items-center gap-1.5 bg-transparent border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-400 cursor-pointer font-[inherit] hover:border-white/30 transition-colors">
          Expand <ExternalLink size={12} />
        </button>
      </div>

      {/* Toggle */}
      <div className="inline-flex gap-1 mb-5">
        <button
          onClick={() => setActiveView('heatmap')}
          className="flex items-center gap-1.5 rounded-lg text-xs px-3.5 py-1.5 cursor-pointer font-[inherit] transition-colors"
          style={{
            background: activeView === 'heatmap' ? '#1D2024' : 'transparent',
            color: activeView === 'heatmap' ? '#E2E2E9' : '#9CA3AF',
            border: activeView === 'heatmap' ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
          }}
        >
          <span className="text-[13px]">▦</span> Complexity Heatmap
        </button>
        <button
          onClick={() => setActiveView('arch')}
          className="flex items-center gap-1.5 rounded-lg text-xs px-3.5 py-1.5 cursor-pointer font-[inherit] transition-colors"
          style={{
            background: activeView === 'arch' ? '#1D2024' : 'transparent',
            color: activeView === 'arch' ? '#E2E2E9' : '#9CA3AF',
            border: activeView === 'arch' ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
          }}
        >
          <span className="text-[13px]">◎</span> Architecture Map
        </button>
      </div>

      {/* Content: Both shown side by side */}
      <div className="flex gap-8 items-start">
        {/* Heatmap */}
        <div className="shrink-0 w-fit">
          <div className="grid gap-[3px]" style={{ gridTemplateColumns: 'repeat(12, 20px)' }}>
            {TILES.map((level, i) => (
              <div key={i} className="w-5 h-5 rounded-sm" style={{ background: SHADES[level] }} />
            ))}
          </div>
          <div className="mt-2.5">
            <div className="h-1.5 rounded-sm w-full" style={{ background: 'linear-gradient(to right, #1D3040, #00D4FF)' }} />
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px] text-gray-500">Low Complexity</span>
              <span className="text-[11px] text-gray-500">High Complexity</span>
            </div>
          </div>
        </div>

        {/* Architecture Map */}
        <div className="flex-1 min-w-0">
          <svg width="100%" viewBox="0 0 380 240" fill="none" style={{ overflow: 'visible' }}>
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.1)" />
              </marker>
            </defs>
            {DIR_LABELS.map((label, i) => (
              <text key={label} x="0" y={18 + i * 26} fontSize="10" fill="#6B7280" textAnchor="start" fontFamily="'JetBrains Mono', monospace" opacity="0.6">{label}</text>
            ))}
            {EDGES.map(({ from, to }) => {
              const s = nodeMap[from], t = nodeMap[to];
              const { cx: sx, cy: sy } = nodeCenter(s);
              const { cx: tx, cy: ty } = nodeCenter(t);
              const dx = tx - sx, dy = ty - sy;
              const len = Math.sqrt(dx * dx + dy * dy);
              const ex = tx - (dx / len) * (NW / 2 + 4);
              const ey = ty - (dy / len) * (NH / 2 + 4);
              return <line key={`${from}-${to}`} x1={sx} y1={sy} x2={ex} y2={ey} stroke="rgba(255,255,255,0.1)" strokeWidth="1" markerEnd="url(#arrow)" />;
            })}
            {NODES.map((n) => (
              <g key={n.id}>
                <rect x={n.x} y={n.y} width={NW} height={NH} rx={NR} fill="#1D2024" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <text x={n.x + NW / 2} y={n.y + NH / 2 + 4} fontSize="11" fill="#9CA3AF" textAnchor="middle" fontFamily="'Inter', sans-serif">{n.label}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
