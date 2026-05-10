'use client';
import { useRouter } from 'next/navigation';
import { Activity, GitBranch, FlaskConical, BookOpen } from 'lucide-react';
import { useStore } from '../store';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import RepoHeader from './RepoHeader';
import OptimizationScore from './OptimizationScore';
import SystemVitality from './SystemVitality';
import AITriagePath from './AITriagePath';
import OptimizationEngine from './OptimizationEngine';
import RepoTopography from './RepoTopography';
import TestCoverage from './TestCoverage';
import AIInsightSummary from './AIInsightSummary';
import SecurityHealth from './SecurityHealth';

const links = [
  { to: '/repositories', label: 'Repositories', icon: <GitBranch className="w-4 h-4" /> },
  { to: '/analysis', label: 'Analysis', icon: <FlaskConical className="w-4 h-4" /> },
  { to: '/docs', label: 'Docs', icon: <BookOpen className="w-4 h-4" /> },
];

export default function Analysis() {
  const router = useRouter();
  const { githubUser, githubToken } = useStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pathname = '/analysis';

  return (
    <div style={{ background: 'var(--md-background)', minHeight: '100vh' }}>
      {/* AppNav — identical to Repository page */}
      <nav
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-16"
        style={{
          background: 'var(--md-surface-container)',
          borderBottom: '1px solid var(--md-outline-variant)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'var(--md-primary-container)' }}
          >
            <Activity className="w-4 h-4" style={{ color: 'var(--md-on-primary-container)' }} />
          </div>
          <span
            className="font-bold text-sm tracking-widest uppercase"
            style={{ color: 'var(--md-on-surface)' }}
          >
            Agent.OS
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                href={l.to}
                className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={
                  isActive
                    ? { background: 'var(--md-secondary-container)', color: 'var(--md-on-secondary-container)' }
                    : { color: 'var(--md-on-surface-variant)' }
                }
              >
                {l.icon}
                <span className="hidden sm:inline">{l.label}</span>
              </Link>
            );
          })}
        </div>

        {mounted && githubToken && githubUser ? (
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/repositories')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={githubUser.avatar_url}
              alt="avatar"
              className="w-8 h-8 rounded-full"
              style={{ border: '2px solid var(--md-primary)' }}
            />
            <span className="text-sm font-medium hidden sm:block" style={{ color: 'var(--md-on-surface-variant)' }}>
              {githubUser.name || githubUser.login}
            </span>
          </div>
        ) : (
          <button
            onClick={() => router.push('/connect')}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: 'var(--md-primary-container)',
              color: 'var(--md-on-primary-container)',
              border: '1px solid var(--md-primary)',
            }}
          >
            <GitBranch className="w-4 h-4" />
            <span className="hidden sm:inline">Connect GitHub</span>
          </button>
        )}
      </nav>

      {/* Main content — same centered layout as Repository page */}
      <main className="max-w-7xl mx-auto px-8 pt-24 pb-16">
        <RepoHeader />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          <OptimizationScore />
          <SystemVitality />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <AITriagePath />
            <OptimizationEngine />
          </div>

          <RepoTopography />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <TestCoverage />
            <AIInsightSummary />
          </div>

          <SecurityHealth />
        </div>
      </main>
    </div>
  );
}
