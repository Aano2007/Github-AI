'use client';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

type Issue = {
  num: number;
  title: string;
  description: string;
  file: string;
  severity: string;
  severityColor: string;
  badgeBg: string;
  badgeColor: string;
};

const issues: Issue[] = [
  { num: 1, title: 'Inefficient Loop in useData.ts', description: 'High time complexity causing performance issues', file: 'src/hooks/useData.ts:45', severity: 'Critical', severityColor: 'var(--status-critical)', badgeBg: 'rgba(232,69,60,0.18)', badgeColor: 'var(--status-critical)' },
  { num: 2, title: 'Large Component: Dashboard.tsx', description: 'Component is doing too many things', file: 'src/components/Dashboard.tsx:1', severity: 'High', severityColor: 'var(--status-high)', badgeBg: 'rgba(232,134,60,0.18)', badgeColor: 'var(--status-high)' },
  { num: 3, title: 'Unused Dependencies', description: '7 unused dependencies detected', file: 'package.json', severity: 'Medium', severityColor: 'var(--status-medium)', badgeBg: 'rgba(232,194,60,0.18)', badgeColor: 'var(--status-medium)' },
  { num: 4, title: 'Duplicate Logic Detected', description: 'Similar code found in 3 places', file: 'Multiple files', severity: 'Low', severityColor: 'var(--status-low)', badgeBg: 'rgba(75,168,255,0.18)', badgeColor: 'var(--status-low)' },
  { num: 5, title: 'Missing Error Boundaries', description: 'Add error boundaries for better stability', file: 'src/App.tsx', severity: 'Low', severityColor: 'var(--status-low)', badgeBg: 'rgba(75,168,255,0.18)', badgeColor: 'var(--status-low)' },
];

export default function AITriagePath() {
  const [hoveredIssue, setHoveredIssue] = useState<number | null>(null);

  return (
    <div className="card flex flex-col">
      {/* Header */}
      <div className="mb-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-200">AI Triage Path</span>
          <Sparkles size={14} style={{ color: '#7C6FF7' }} />
        </div>
        <div className="text-xs text-gray-500">Top issues to fix for maximum impact</div>
      </div>

      {/* Issues */}
      <div className="flex flex-col gap-0.5 mt-4">
        {issues.map((issue) => (
          <div
            key={issue.num}
            onMouseEnter={() => setHoveredIssue(issue.num)}
            onMouseLeave={() => setHoveredIssue(null)}
            className="flex items-start gap-3 p-3 rounded-lg transition-colors"
            style={{ background: hoveredIssue === issue.num ? '#1D2024' : 'transparent' }}
          >
            {/* Number badge */}
            <div
              className="w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: issue.badgeBg, color: issue.badgeColor }}
            >
              {issue.num}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-gray-200 mb-0.5">{issue.title}</div>
              <div className="text-[11px] text-gray-400 mb-1">{issue.description}</div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500 font-mono">{issue.file}</span>
                <span className="flex items-center gap-1">
                  <span className="w-[5px] h-[5px] rounded-full inline-block" style={{ background: issue.severityColor }} />
                  <span className="text-[11px]" style={{ color: issue.severityColor }}>{issue.severity}</span>
                </span>
              </div>
            </div>

            {/* Auto-Fix PR button */}
            <button className="flex items-center gap-1.5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-400 bg-transparent cursor-pointer shrink-0 whitespace-nowrap hover:border-white/30 transition-colors font-[inherit]">
              <Sparkles size={12} style={{ color: 'var(--accent-cyan)' }} /> Auto-Fix PR
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pl-3">
        <button className="bg-transparent border-none p-0 text-xs cursor-pointer font-[inherit]" style={{ color: 'var(--accent-cyan)' }}>
          View all issues (42) →
        </button>
      </div>
    </div>
  );
}
