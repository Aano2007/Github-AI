'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CheckCircle2, Cpu, Database } from 'lucide-react';
import { useStore } from '../store';
import StatCard from './StatCard';
import RepoCard from './RepoCard';

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60)    return 'just now';
  if (s < 3600)  return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  const d = Math.floor(s / 86400);
  if (d < 30)  return `${d}d ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

interface GithubRepo {
  id: number;
  name: string;
  language: string | null;
  open_issues_count: number;
  forks_count: number;
  stargazers_count: number;
  pushed_at: string;
  updated_at: string;
  description: string | null;
  private: boolean;
  html_url: string;
}

const mockDebt   = (r: GithubRepo) => Math.min(95, Math.max(5, (r.open_issues_count * 3 + (r.forks_count % 30)) % 90 + 10));
const mockReady  = (r: GithubRepo) => Math.min(98, Math.max(20, 100 - mockDebt(r) + Math.floor(r.stargazers_count % 20)));
const mockAgents = (r: GithubRepo) => Math.max(1, r.open_issues_count % 8 + 1);

export const Repositories = () => {
  const router = useRouter();
  const { githubToken, githubUser, setSelectedGithubRepo } = useStore();
  const token = githubToken || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const [repos,   setRepos]   = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!token) { router.push('/connect'); return; }
    const fetchAll = async () => {
      try {
        let page = 1, all: GithubRepo[] = [];
        while (true) {
          const res = await fetch(`https://api.github.com/user/repos?per_page=100&page=${page}&sort=updated`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error();
          const data: GithubRepo[] = await res.json();
          if (!Array.isArray(data) || !data.length) break;
          all = [...all, ...data];
          page++;
        }
        setRepos(all);
      } catch {
        router.push('/connect');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [token, router]);

  const filtered = repos.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  const avgDebt     = repos.length ? Math.round(repos.reduce((a, r) => a + mockDebt(r),  0) / repos.length) : 0;
  const avgReady    = repos.length ? Math.round(repos.reduce((a, r) => a + mockReady(r), 0) / repos.length) : 0;
  const totalAgents = repos.reduce((a, r) => a + mockAgents(r), 0);
  const cleanCount  = repos.filter(r => mockDebt(r) <= 35).length;

  const stats = [
    { label: 'Avg Debt Score',  value: `${avgDebt}%`,                    sub: 'across all repos',    Icon: ShieldCheck  },
    { label: 'Prod Readiness',  value: `${avgReady}%`,                   sub: 'average score',       Icon: CheckCircle2 },
    { label: 'Active Agents',   value: String(totalAgents),              sub: 'running now',         Icon: Cpu          },
    { label: 'Clean Repos',     value: `${cleanCount}/${repos.length}`,  sub: 'no issues detected',  Icon: Database     },
  ];

  return (
    <main className="max-w-7xl mx-auto px-8 py-10">
      <header className="mb-10">
        <p className="text-zinc-500 mb-2" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}>
          Hey, {mounted ? (githubUser?.name || githubUser?.login || 'there') : 'there'}
        </p>
        <h1 className="text-4xl font-semibold mb-2">Available Repositories</h1>
        <p className="text-gray-500 text-sm">
          {repos.length} repositories · {cleanCount} clean · {totalAgents} agents active
        </p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-48 gap-5">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-zinc-800" />
            <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-r-transparent border-b-transparent animate-spin border-l-zinc-500" />
          </div>
          <p className="text-sm font-medium text-gray-500">Scanning repositories…</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => <StatCard key={s.label} {...s} suitIndex={i} />)}
          </div>

          <div className="space-y-4 mb-8">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search repositories..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-3.5 pl-12 pr-6 outline-none focus:border-zinc-600 transition-all text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="px-5 py-1.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-200 border border-zinc-700">All</button>
                <button className="px-5 py-1.5 rounded-full text-xs font-medium border border-zinc-800 text-zinc-500 hover:border-zinc-600">Clean {cleanCount}</button>
                <button className="px-5 py-1.5 rounded-full text-xs font-medium border border-zinc-800 text-zinc-500 hover:border-zinc-600">Issues {repos.filter(r => mockDebt(r) > 60).length}</button>
                <button className="px-5 py-1.5 rounded-full text-xs font-medium border border-zinc-800 text-zinc-500 hover:border-zinc-600">Scanning {repos.filter(r => mockDebt(r) > 35 && mockDebt(r) <= 60).length}</button>
              </div>
              <span className="text-xs text-zinc-500 font-medium">{filtered.length} results</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => (
              <RepoCard
                key={r.id}
                name={r.name}
                language={r.language || 'Unknown'}
                debtScore={mockDebt(r)}
                prodReadiness={mockReady(r)}
                lastPush={timeAgo(r.pushed_at || r.updated_at)}
                agents={mockAgents(r)}
                pulse={i === 0}
                onClick={() => {
                  setSelectedGithubRepo(r as unknown as Record<string, unknown>);
                  router.push('/analysis');
                }}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
};
