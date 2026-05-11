'use client';
import { useStore } from '../store';
import { useRouter } from 'next/navigation';
import { AlertTriangle, CheckCircle, Loader, BarChart2, Cpu, Network, Zap, Activity } from 'lucide-react';

const statusIcon = (s: string) => {
  if (s === 'clean') return <CheckCircle className="w-4 h-4 text-zinc-400" />;
  if (s === 'issues') return <AlertTriangle className="w-4 h-4 text-zinc-400" />;
  return <Loader className="w-4 h-4 text-zinc-400 animate-spin" />;
};

const statusDot = (s: string) => {
  const color = s === 'clean' ? '#4ade80' : s === 'issues' ? '#f87171' : '#facc15';
  return <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />;
};

const Bar = ({ value }: { value: number }) => (
  <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
    <div className="h-full rounded-full bg-zinc-600" style={{ width: `${value}%`, transition: 'width 1s ease' }} />
  </div>
);

export default function Dashboard() {
  const { repos } = useStore();
  const router = useRouter();

  const avgDebt = Math.round(repos.reduce((a, r) => a + r.debtScore, 0) / repos.length);
  const avgReady = Math.round(repos.reduce((a, r) => a + r.productionReadiness, 0) / repos.length);
  const totalAgents = repos.reduce((a, r) => a + r.activeAgents, 0);

  return (
    <div className="min-h-screen text-white px-6 py-28 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 mb-3">Agent.OS — Dashboard</p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-widest text-white">Mission Control</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Avg Debt Score', value: `${avgDebt}%`, icon: <AlertTriangle className="w-4 h-4 text-zinc-500" /> },
            { label: 'Prod Readiness', value: `${avgReady}%`, icon: <CheckCircle className="w-4 h-4 text-zinc-500" /> },
            { label: 'Active Agents',  value: String(totalAgents), icon: <Cpu className="w-4 h-4 text-zinc-500" /> },
            { label: 'Network',        value: 'OPTIMAL', icon: <Network className="w-4 h-4 text-zinc-500" /> },
          ].map((m, i) => (
            <div key={i} className="rounded-xl p-5 bg-zinc-900 border border-zinc-800 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">{m.label}</span>
                {m.icon}
              </div>
              <span className="text-2xl font-black text-white font-mono">{m.value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 rounded-xl p-6 bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-bold uppercase tracking-widest text-white">Technical Debt by Repo</span>
            </div>
            <div className="flex flex-col gap-5">
              {repos.map(r => (
                <div key={r.id} className="flex items-center gap-4">
                  <span className="text-xs font-mono text-zinc-500 w-32 truncate">{r.name}</span>
                  <div className="flex-1"><Bar value={r.debtScore} /></div>
                  <span className="text-xs font-mono text-zinc-500 w-8 text-right">{r.debtScore}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-6 bg-zinc-900 border border-zinc-800 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-bold uppercase tracking-widest text-white">Telemetry</span>
            </div>
            {[
              { label: 'CPU Load',        value: 34 },
              { label: 'Memory',          value: 61 },
              { label: 'Pipeline Health', value: 88 },
              { label: 'Agent Efficiency',value: 92 },
            ].map((t, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono text-zinc-500">
                  <span>{t.label}</span><span>{t.value}%</span>
                </div>
                <Bar value={t.value} />
              </div>
            ))}
            <div className="mt-auto pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-zinc-400">All systems nominal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2">
          <Zap className="w-4 h-4 text-zinc-500" />
          <span className="text-sm font-bold uppercase tracking-widest text-white">Connected Repositories</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map(r => (
            <button key={r.id}
              onClick={() => { useStore.getState().setSelectedRepo(r); router.push('/analysis'); }}
              className="text-left rounded-xl p-5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-all duration-200 group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {statusDot(r.status)}
                    <span className="font-bold text-white text-sm">{r.name}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-600">{r.language} · {r.lastScan}</span>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded-full border border-zinc-700 text-zinc-500">{r.status}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-mono text-zinc-600"><span>Debt</span><span>{r.debtScore}%</span></div>
                <Bar value={r.debtScore} />
                <div className="flex justify-between text-xs font-mono text-zinc-600 mt-1"><span>Prod Ready</span><span>{r.productionReadiness}%</span></div>
                <Bar value={r.productionReadiness} />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-600">{r.activeAgents} agents active</span>
                <span className="text-xs text-zinc-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">Analyze →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
