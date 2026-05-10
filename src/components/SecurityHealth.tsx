'use client';
import { useState } from 'react';
import { Info, ShieldAlert, AlertTriangle, CircleDot, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

const vulns = [
  { icon: ShieldAlert, color: '#E8453C', count: 2, label: 'Critical', sublabel: 'vulnerabilities' },
  { icon: AlertTriangle, color: '#E8863C', count: 5, label: 'High', sublabel: 'vulnerabilities' },
  { icon: CircleDot, color: '#E8C23C', count: 7, label: 'Medium', sublabel: 'vulnerabilities' },
  { icon: CheckCircle2, color: '#3DD68C', count: 128, label: 'Up to date', sublabel: 'dependencies' },
];

export default function SecurityHealth() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm font-semibold text-gray-200">Security &amp; Dependency Health</span>
        <Info size={14} className="text-gray-500" />
      </div>

      <div className="flex items-center">
        {vulns.map(({ icon: Icon, color, count, label, sublabel }, i) => (
          <div key={label} className="flex-1 flex items-center gap-2.5 px-4"
            style={{ borderRight: i < vulns.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
            <Icon size={18} style={{ color }} className="shrink-0" />
            <span className="text-[28px] font-bold text-white tabular-nums" style={{ lineHeight: 1 }}>{count}</span>
            <div>
              <div className="text-xs font-medium text-gray-200">{label}</div>
              <div className="text-[11px] text-gray-500">{sublabel}</div>
            </div>
          </div>
        ))}

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 bg-transparent border border-white/10 rounded-lg px-4 py-2 text-[13px] text-gray-400 cursor-pointer font-[inherit] whitespace-nowrap shrink-0 ml-4 hover:border-white/30 transition-colors"
        >
          Expand details {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 p-3.5 rounded-lg text-xs text-gray-400 leading-relaxed"
          style={{ background: '#1D2024', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="m-0 mb-2"><strong style={{ color: '#E8453C' }}>Critical:</strong> lodash@4.17.20 — Prototype pollution (CVE-2021-23337). Upgrade to 4.17.21+</p>
          <p className="m-0 mb-2"><strong style={{ color: '#E8863C' }}>High:</strong> node-fetch@2.6.0 — SSRF vulnerability. Upgrade to 2.6.7+</p>
          <p className="m-0"><strong style={{ color: '#E8C23C' }}>Medium:</strong> Multiple packages with known medium-severity issues. Run npm audit for full list.</p>
        </div>
      )}
    </div>
  );
}
