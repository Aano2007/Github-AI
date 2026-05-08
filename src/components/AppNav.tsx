'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Activity, GitBranch, FlaskConical, BookOpen } from 'lucide-react';
import { useStore } from '../store';
import { useEffect, useState } from 'react';

const links = [
  { to: '/repositories', label: 'Repositories', icon: <GitBranch className="w-4 h-4" /> },
  { to: '/analysis',     label: 'Analysis',     icon: <FlaskConical className="w-4 h-4" /> },
  { to: '/docs',         label: 'Docs',         icon: <BookOpen className="w-4 h-4" /> },
];

export default function AppNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { githubUser, githubToken } = useStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-16"
      style={{
        background: 'var(--md-surface-container)',
        borderBottom: '1px solid var(--md-outline-variant)',
        backdropFilter: 'blur(20px)',
      }}>

      {/* Brand */}
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--md-primary-container)' }}>
          <Activity className="w-4 h-4" style={{ color: 'var(--md-on-primary-container)' }} />
        </div>
        <span className="font-bold text-sm tracking-widest uppercase"
          style={{ color: 'var(--md-on-surface)' }}>Agent.OS</span>
      </Link>

      {/* MD3 Navigation tabs */}
      <div className="flex items-center gap-1">
        {links.map(l => {
          const isActive = pathname === l.to;
          return (
            <Link key={l.to} href={l.to}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={isActive ? {
                background: 'var(--md-secondary-container)',
                color: 'var(--md-on-secondary-container)',
              } : {
                color: 'var(--md-on-surface-variant)',
              }}>
              {l.icon}
              <span className="hidden sm:inline">{l.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Connect / Avatar */}
      {mounted && githubToken && githubUser ? (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/repositories')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={githubUser.avatar_url} alt="avatar" className="w-8 h-8 rounded-full"
            style={{ border: '2px solid var(--md-primary)' }} />
          <span className="text-sm font-medium hidden sm:block"
            style={{ color: 'var(--md-on-surface-variant)' }}>
            {githubUser.name || githubUser.login}
          </span>
        </div>
      ) : (
        <button onClick={() => router.push('/connect')}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
          style={{
            background: 'var(--md-primary-container)',
            color: 'var(--md-on-primary-container)',
            border: '1px solid var(--md-primary)',
          }}>
          <GitBranch className="w-4 h-4" />
          <span className="hidden sm:inline">Connect GitHub</span>
        </button>
      )}
    </nav>
  );
}
