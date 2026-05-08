'use client';
import { useStore } from '../store';
import { useRouter } from 'next/navigation';
import { AlertTriangle, CheckCircle, Loader, BarChart2, Cpu, Network, Zap, Activity } from 'lucide-react';

const statusIcon = (s: string) => {
  if (s === 'clean') return <CheckCircle className="w-4 h-4 text-emerald-400" />;
  if (s === 'issues') return <AlertTriangle className="w-4 h-4 text-red-400" />;
  return <Loader className="w-4 h-4 text-yellow-400 animate-spin" />;
};

const Bar = ({ value, color }: { value: number; color: string }) => (
  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
    <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%`, transition: 'width 1s ease' }} />
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
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-secondary mb-3">Agent.OS — Dashboard</p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-widest text-cream">Mission Control</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Avg Debt Score', value: `${avgDebt}%`, icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />, glow: 'rgba(234,179,8,0.12)' },
            { label: 'Prod Readiness', value: `${avgReady}%`, icon: <CheckCircle className="w-5 h-5 text-emerald-400" />, glow: 'rgba(52,211,153,0.12)' },
            { label: 'Active Agents', value: String(totalAgents), icon: <Cpu className="w-5 h-5 text-secondary" />, glow: 'rgba(22,46,147,0.2)' },
            { label: 'Network', value: 'OPTIMAL', icon: <Network className="w-5 h-5 text-emerald-400" />, glow: 'rgba(52,211,153,0.12)' },
          ].map((m, i) => (
            <div key={i} className="rounded-2xl p-5 bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-2 [background:linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)]" style={{ boxShadow: `0 0 24px ${m.glow}` }}>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-beige/50 font-semibold">{m.label}</span>
                {m.icon}
              </div>
              <span className="text-2xl font-black text-cream font-mono">{m.value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-md [background:linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)]">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="w-5 h-5 text-secondary" />
              <span className="text-sm font-bold uppercase tracking-widest text-cream">Technical Debt by Repo</span>
            </div>
            <div className="flex flex-col gap-5">
              {repos.map(r => (
                <div key={r.id} className="flex items-center gap-4">
                  <span className="text-xs font-mono text-beige/60 w-32 truncate">{r.name}</span>
                  <div className="flex-1">
                    <Bar value={r.debtScore} color={r.debtScore > 60 ? 'bg-red-500' : r.debtScore > 30 ? 'bg-yellow-500' : 'bg-emerald-500'} />
                  </div>
                  <span className="text-xs font-mono text-beige/60 w-8 text-right">{r.debtScore}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-4 [background:linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)]">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-secondary" />
              <span className="text-sm font-bold uppercase tracking-widest text-cream">Telemetry</span>
            </div>
            {[
              { label: 'CPU Load', value: 34, color: 'bg-secondary' },
              { label: 'Memory', value: 61, color: 'bg-violet-500' },
              { label: 'Pipeline Health', value: 88, color: 'bg-emerald-500' },
              { label: 'Agent Efficiency', value: 92, color: 'bg-cyan-400' },
            ].map((t, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono text-beige/50">
                  <span>{t.label}</span><span>{t.value}%</span>
                </div>
                <Bar value={t.value} color={t.color} />
              </div>
            ))}
            <div className="mt-auto pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400">All systems nominal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2">
          <Zap className="w-5 h-5 text-secondary" />
          <span className="text-sm font-bold uppercase tracking-widest text-cream">Connected Repositories</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map(r => (
            <button key={r.id}
              onClick={() => { useStore.getState().setSelectedRepo(r); router.push('/analysis'); }}
              className="text-left rounded-2xl p-5 bg-white/5 border border-white/10 backdrop-blur-md hover:border-secondary/60 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(22,46,147,0.3)] transition-all duration-300 group [background:linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {statusIcon(r.status)}
                    <span className="font-bold text-cream text-sm">{r.name}</span>
                  </div>
                  <span className="text-xs font-mono text-beige/40">{r.language} · {r.lastScan}</span>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded-full border ${r.status === 'clean' ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : r.status === 'issues' ? 'border-red-500/40 text-red-400 bg-red-500/10' : 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10'}`}>{r.status}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-mono text-beige/40"><span>Debt</span><span>{r.debtScore}%</span></div>
                <Bar value={r.debtScore} color={r.debtScore > 60 ? 'bg-red-500' : r.debtScore > 30 ? 'bg-yellow-500' : 'bg-emerald-500'} />
                <div className="flex justify-between text-xs font-mono text-beige/40 mt-1"><span>Prod Ready</span><span>{r.productionReadiness}%</span></div>
                <Bar value={r.productionReadiness} color="bg-secondary" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-beige/40">{r.activeAgents} agents active</span>
                <span className="text-xs text-secondary font-mono opacity-0 group-hover:opacity-100 transition-opacity">Analyze →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
