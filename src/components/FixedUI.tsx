'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, Activity, Menu, GitBranch } from 'lucide-react';
import { useStore } from '../store';

const LOGS = [
  "> ANALYZING REPO...",
  "> MAP_AST: OK",
  "> DETECTING ANOMALIES...",
  "> 4 LOGIC GAPS FIXED",
  "> RUNNING CI/CD PIPELINE...",
  "> DEPLOYMENT SECURED.",
  "> AGENT.OS STANDING BY."
];

export const FixedUI = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const { githubToken } = useStore();
  const router = useRouter();
  const connectHref = githubToken ? '/repositories' : '/connect';

  useEffect(() => {
    if (logIndex < LOGS.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, LOGS[logIndex]]);
        setLogIndex(logIndex + 1);
      }, Math.random() * 1500 + 500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLogs([]);
        setLogIndex(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [logIndex]);

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-auto bg-background/30 backdrop-blur-md border-b border-white/5 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <Activity className="text-secondary w-8 h-8" />
          <span className="font-black text-2xl tracking-widest text-cream uppercase">Agent.OS</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold tracking-widest text-beige/80 uppercase">
          <a href="#" className="hover:text-cream transition-colors">Platform</a>
          <a href="#" className="hover:text-cream transition-colors">Solutions</a>
          <a href="#" className="hover:text-cream transition-colors">Documentation</a>
        </div>
        <button
          className="hidden md:flex px-6 py-3 border border-secondary/50 text-cream rounded-full hover:bg-secondary/20 transition-all font-semibold tracking-widest text-sm uppercase shadow-[0_0_15px_rgba(22,46,147,0.3)] items-center gap-2"
          onClick={() => router.push(connectHref)}
        >
          <GitBranch className="w-4 h-4" />
          Connect GitHub
        </button>
        <button className="md:hidden text-cream"><Menu /></button>
      </nav>

      {/* Left Telemetry Panel */}
      <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50 pointer-events-auto">
        <div className="bg-background/80 backdrop-blur-md border border-secondary/30 rounded-2xl p-4 w-48 shadow-[0_0_20px_rgba(22,46,147,0.2)]">
          <div className="text-xs text-beige/50 uppercase tracking-widest mb-1 font-semibold">Network Status</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-mono text-sm">OPTIMAL</span>
          </div>
        </div>
        <div className="bg-background/80 backdrop-blur-md border border-secondary/30 rounded-2xl p-4 w-48 shadow-[0_0_20px_rgba(22,46,147,0.2)]">
          <div className="text-xs text-beige/50 uppercase tracking-widest mb-1 font-semibold">Active Agents</div>
          <div className="text-cream font-mono text-xl">12,408</div>
        </div>
        <div className="bg-background/80 backdrop-blur-md border border-secondary/30 rounded-2xl p-4 w-48 shadow-[0_0_20px_rgba(22,46,147,0.2)]">
          <div className="text-xs text-beige/50 uppercase tracking-widest mb-1 font-semibold">Global Latency</div>
          <div className="text-cream font-mono text-xl">14ms</div>
        </div>
      </div>

      {/* Terminal HUD */}
      <div className="pointer-events-auto fixed bottom-8 right-8 w-80 bg-background/90 backdrop-blur-md border border-secondary/30 rounded-3xl p-4 font-mono text-sm shadow-[0_0_20px_rgba(22,46,147,0.3)] z-50">
        <div className="flex items-center gap-2 mb-3 border-b border-secondary/30 pb-2">
          <Terminal className="w-4 h-4 text-secondary" />
          <span className="text-secondary font-semibold text-xs tracking-wider uppercase">Agent.OS Terminal</span>
        </div>
        <div className="flex flex-col gap-1 min-h-[140px] justify-end overflow-hidden">
          {logs.map((log, i) => (
            <div key={i} className="text-cream transition-opacity duration-300">{log}</div>
          ))}
          <div className="text-cream animate-pulse mt-1">_</div>
        </div>
      </div>
    </>
  );
};
