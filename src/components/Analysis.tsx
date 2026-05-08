'use client';
import { useState } from 'react';
import { useStore } from '../store';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, FileCode2, GitBranch, ArrowRight, ShieldCheck, Layers, Sparkles } from 'lucide-react';

export default function Analysis() {
  const { selectedRepo, selectedGithubRepo } = useStore();
  const router = useRouter();
  const [suggestionApplied, setSuggestionApplied] = useState(false);

  const selected = selectedRepo ?? (selectedGithubRepo as any);
  const repoName = selected?.name ?? 'frontend-client';
  const repoLanguage = selected?.language ?? 'TypeScript';
  const repoBranch = selected?.default_branch ?? 'main';
  const repoPrivate = selected?.private ?? false;

  const systemVitals = [
    { title: 'Quality', value: 82, accent: 'bg-emerald-500' },
    { title: 'Performance', value: 74, accent: 'bg-cyan-500' },
    { title: 'Security', value: 91, accent: 'bg-violet-500' },
    { title: 'Technical Debt', value: 64, accent: 'bg-orange-500' },
  ];

  const triageItems = [
    { title: 'Inefficient loop in useData.ts', label: 'Critical', description: 'High time complexity causing performance issues', severity: 'bg-red-500/15 text-red-300 border-red-500/20' },
    { title: 'Large component: Dashboard.tsx', label: 'High', description: 'Component renders too many nested elements at once', severity: 'bg-orange-500/15 text-orange-300 border-orange-500/20' },
    { title: 'Unused dependencies in package.json', label: 'Medium', description: 'Reduces install size and bundle bloat', severity: 'bg-amber-500/15 text-amber-300 border-amber-500/20' },
    { title: 'Duplicate logic in 3 places', label: 'Low', description: 'Consolidate repeated logic into shared modules', severity: 'bg-slate-500/15 text-slate-300 border-slate-500/20' },
    { title: 'Missing error boundaries', label: 'Low', description: 'Add guards for component-level failures', severity: 'bg-slate-500/15 text-slate-300 border-slate-500/20' },
  ];

  const coverageFiles = [
    { path: 'src/lib/processor.ts', pct: 32, color: 'bg-red-500' },
    { path: 'src/hooks/useData.ts', pct: 45, color: 'bg-orange-500' },
    { path: 'src/components/Table.tsx', pct: 51, color: 'bg-yellow-500' },
  ];

  const insight = {
    strengths: ['Good test coverage', 'Strong separation of concerns', 'Secure dependency posture'],
    risks: ['Performance bottlenecks', 'Large component bundles', 'Missing runtime guards'],
    opportunities: ['Refactor large components', 'Optimize data pipelines', 'Trim unused dependencies'],
  };

  return (
    <div className="min-h-screen bg-[#02050a] text-white px-6 py-10 md:px-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400 font-mono">
              <span className="text-emerald-400">Analysis</span>
              <span className="text-slate-600">|</span>
              <button className="text-slate-400 hover:text-white transition-colors">History</button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-4xl md:text-5xl font-black uppercase tracking-[0.25em] text-cream">{repoName}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                <Lock className="w-3.5 h-3.5 text-slate-300" /> {repoPrivate ? 'Private' : 'Public'}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <FileCode2 className="w-4 h-4 text-slate-300" /> {repoLanguage}
              </span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <GitBranch className="w-4 h-4 text-slate-300" /> {repoBranch}
              </span>
            </div>
          </div>
          <button onClick={() => router.push('/repositories')} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.18em] text-slate-300 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to repos
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_0_45px_rgba(14,57,116,0.2)]">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl bg-[#071329] p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">Optimization Score</p>
                  <p className="text-5xl font-black text-emerald-400">75%</p>
                  <p className="mt-3 text-xs text-slate-500">Code quality, performance and security</p>
                </div>
                <div className="rounded-3xl bg-[#071329] p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">Language</p>
                  <p className="text-2xl font-black text-cream">{repoLanguage}</p>
                </div>
                <div className="rounded-3xl bg-[#071329] p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">Branch</p>
                  <p className="text-2xl font-black text-cream">{repoBranch}</p>
                </div>
                <div className="rounded-3xl bg-[#071329] p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">Visibility</p>
                  <p className="text-2xl font-black text-cream">{repoPrivate ? 'Private' : 'Public'}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[32px] border border-white/10 bg-[#071329] p-6 shadow-[0_0_40px_rgba(14,57,116,0.18)]">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">AI Triage Path</p>
                    <h2 className="text-2xl font-black text-cream mt-2">Top issues to fix for maximum impact</h2>
                  </div>
                  <button className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-900/30">Auto-Fix PR</button>
                </div>
                <div className="space-y-4">
                  {triageItems.map(item => (
                    <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-4 hover:border-blue-500/30 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-cream">{item.title}</p>
                          <p className="mt-2 text-xs text-slate-400">{item.description}</p>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] ${item.severity}`}>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[#071329] shadow-[0_0_40px_rgba(14,57,116,0.18)] overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Optimization Engine</p>
                  <h2 className="text-2xl font-black text-cream mt-2">Before & after AI suggestion</h2>
                  <p className="mt-2 text-sm text-slate-400">Compare the current code with the optimized version.</p>
                </div>
                <div className="grid gap-4 p-6 md:grid-cols-2">
                  <div className="rounded-3xl bg-[#081a2a] p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Before</span>
                      <span className="text-[10px] uppercase tracking-[0.28em] text-red-400 font-bold">Inefficient</span>
                    </div>
                    <pre className="max-h-56 overflow-x-auto text-xs font-mono leading-6 text-slate-200">{`for (let i = 0; i < data.length; i++) {
  const item = data[i];
  if (item.active) {
    result.push(process(item));
  }
}
return result;`}</pre>
                  </div>
                  <div className="rounded-3xl bg-[#081a2a] p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-[0.22em] text-slate-400">After</span>
                      <span className="text-[10px] uppercase tracking-[0.28em] text-emerald-300 font-bold">Optimized</span>
                    </div>
                    <pre className="max-h-56 overflow-x-auto text-xs font-mono leading-6 text-slate-200">{`return data
  .filter((item) => item.active)
  .map(process);`}</pre>
                  </div>
                </div>
                <div className="p-6 border-t border-white/10 bg-[#06121d]">
                  <button onClick={() => setSuggestionApplied(true)} className="w-full rounded-3xl bg-emerald-400 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-emerald-300">Apply Suggestion</button>
                  {suggestionApplied && <p className="mt-4 text-sm text-emerald-300">Suggestion applied successfully. The code has been updated to the optimized version.</p>}
                </div>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="rounded-[32px] border border-white/10 bg-[#071329] p-6 shadow-[0_0_40px_rgba(14,57,116,0.18)]">
                <div className="flex items-center gap-3 mb-5 text-slate-400 uppercase tracking-[0.24em] text-xs font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> System Vitality
                </div>
                <div className="grid gap-4">
                  {systemVitals.map(item => (
                    <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{item.title}</p>
                        <span className={`h-2.5 w-2.5 rounded-full ${item.accent}`} />
                      </div>
                      <p className="text-3xl font-black text-cream">{item.value}%</p>
                      <div className="mt-3 h-2.5 rounded-full bg-white/10 overflow-hidden">
                        <div className={`${item.accent} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-[#071329] p-6 shadow-[0_0_40px_rgba(14,57,116,0.18)]">
                <div className="flex items-center gap-3 mb-5 text-slate-400 uppercase tracking-[0.24em] text-xs font-mono">
                  <Layers className="w-4 h-4 text-cyan-400" /> Repository Topography
                </div>
                <div className="aspect-[4/3] rounded-3xl bg-[#081c2f] p-4 border border-white/10">
                  <div className="grid h-full grid-cols-6 gap-2">
                    {Array.from({ length: 30 }).map((_, idx) => (
                      <div key={idx} className={`rounded-2xl ${idx % 7 === 0 ? 'bg-red-500' : idx % 5 === 0 ? 'bg-yellow-500' : 'bg-cyan-500/60'}`} style={{ minHeight: '1.25rem' }} />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-400">This heatmap highlights complexity and module coupling across the repository.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#071329] p-6 shadow-[0_0_40px_rgba(14,57,116,0.18)]">
              <div className="flex items-center gap-3 mb-5 text-slate-400 uppercase tracking-[0.24em] text-xs font-mono">
                <Sparkles className="w-4 h-4 text-blue-400" /> Architecture Map
              </div>
              <div className="rounded-[32px] border border-white/10 bg-[#081c2f] p-4 overflow-hidden">
                <svg viewBox="0 0 300 220" className="w-full h-72">
                  <defs>
                    <filter id="glow2"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  </defs>
                  <line x1="60" y1="160" x2="120" y2="80" stroke="#5b85ff" strokeWidth="2" filter="url(#glow2)" />
                  <line x1="60" y1="160" x2="40" y2="50" stroke="#33d7ff" strokeWidth="2" filter="url(#glow2)" />
                  <line x1="120" y1="80" x2="210" y2="90" stroke="#8c5bff" strokeWidth="2" filter="url(#glow2)" />
                  <line x1="120" y1="80" x2="230" y2="170" stroke="#ff7b59" strokeWidth="2" filter="url(#glow2)" />
                  <circle cx="60" cy="160" r="12" fill="#5b85ff" />
                  <circle cx="40" cy="50" r="10" fill="#33d7ff" />
                  <circle cx="120" cy="80" r="12" fill="#8c5bff" />
                  <circle cx="210" cy="90" r="10" fill="#82ffbb" />
                  <circle cx="230" cy="170" r="12" fill="#ff9f6d" />
                  <text x="60" y="164" textAnchor="middle" fontSize="8" fill="#fff">UI</text>
                  <text x="40" y="54" textAnchor="middle" fontSize="8" fill="#fff">Auth</text>
                  <text x="120" y="84" textAnchor="middle" fontSize="8" fill="#fff">API</text>
                  <text x="210" y="94" textAnchor="middle" fontSize="8" fill="#fff">DB</text>
                  <text x="230" y="174" textAnchor="middle" fontSize="8" fill="#fff">Jobs</text>
                </svg>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#071329] p-6 shadow-[0_0_40px_rgba(14,57,116,0.18)]">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Test Coverage</p>
                  <h2 className="text-2xl font-black text-cream mt-2">Coverage & insights</h2>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">62% covered</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-[#081a2f] p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-4">Coverage breakdown</p>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-4xl font-black text-cream">62%</p>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">1,348 lines</span>
                  </div>
                  {coverageFiles.map(item => (
                    <div key={item.path} className="mb-4">
                      <div className="flex justify-between text-xs text-slate-400 mb-2"><span>{item.path}</span><span>{item.pct}%</span></div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className="rounded-3xl bg-[#081a2f] p-5 border border-white/10">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-4">AI insight summary</p>
                  <div className="space-y-4 text-sm text-slate-300">
                    <div>
                      <p className="font-semibold text-cream">Strengths</p>
                      <ul className="mt-3 list-disc list-inside space-y-2 text-slate-300">
                        {insight.strengths.map(str => <li key={str}>{str}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-cream">Risks</p>
                      <ul className="mt-3 list-disc list-inside space-y-2 text-slate-300">
                        {insight.risks.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-cream">Opportunities</p>
                      <ul className="mt-3 list-disc list-inside space-y-2 text-slate-300">
                        {insight.opportunities.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#071329] p-6 shadow-[0_0_40px_rgba(14,57,116,0.18)]">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Security & Dependency Health</p>
                  <h2 className="text-2xl font-black text-cream mt-2">Risk posture</h2>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">128 deps up to date</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Critical vulnerabilities', count: 2, badge: 'bg-red-500 text-red-100' },
                  { label: 'High vulnerabilities', count: 5, badge: 'bg-orange-400 text-orange-950' },
                  { label: 'Medium vulnerabilities', count: 7, badge: 'bg-yellow-400 text-yellow-950' },
                ].map(item => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-[#081a2f] p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-cream">{item.label}</p>
                      <p className="text-xs text-slate-400">Remediate these dependencies first</p>
                    </div>
                    <span className={`rounded-2xl px-3 py-2 text-sm font-bold ${item.badge}`}>{item.count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-3xl border border-white/10 bg-[#081a2f] p-4 text-sm text-slate-300">
                <p className="font-semibold text-cream mb-2">Dependency health</p>
                <p>128 dependencies are up to date. Regular upgrades reduce attack surface and keep the repository stable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
