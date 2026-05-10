'use client';
import { Sparkles, Info } from 'lucide-react';

const chips = [
  { category: 'Strengths', text: 'Good test coverage', bg: 'rgba(61,214,140,0.1)', color: '#3DD68C', border: '1px solid rgba(61,214,140,0.22)' },
  { category: 'Risks', text: 'Performance bottlenecks', bg: 'rgba(232,69,60,0.1)', color: '#E8453C', border: '1px solid rgba(232,69,60,0.22)' },
  { category: 'Opportunities', text: 'Refactor large components', bg: 'rgba(124,111,247,0.1)', color: '#7C6FF7', border: '1px solid rgba(124,111,247,0.25)' },
];

export default function AIInsightSummary() {
  return (
    <div className="card flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={14} style={{ color: '#7C6FF7' }} />
        <span className="text-sm font-semibold text-gray-200">AI Insight Summary</span>
        <Info size={14} className="text-gray-500" />
      </div>

      <p className="m-0 text-[13px] text-gray-400 leading-relaxed">
        Your codebase shows a solid foundation with well-structured modules and excellent
        separation of concerns. Performance can be significantly improved by optimizing data
        processing loops and reducing component complexity. Security posture is strong with
        up-to-date dependencies.
      </p>

      <div className="flex gap-2 mt-5">
        {chips.map(({ category, text, bg, color, border }) => (
          <div key={category} className="flex-1 rounded-lg px-3 py-2" style={{ background: bg, color, border }}>
            <div className="text-[11px] font-semibold mb-1">{category}</div>
            <div className="text-[11px] opacity-85">{text}</div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button className="bg-transparent border-none p-0 text-xs cursor-pointer font-[inherit]" style={{ color: '#00D4FF' }}>
          Read detailed analysis →
        </button>
      </div>
    </div>
  );
}
