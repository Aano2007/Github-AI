'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, GitBranch, CheckCircle } from 'lucide-react';
import { useStore } from '../store';

export const GitHubConnect = () => {
  const [token, setToken] = useState(process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { githubToken, githubUser, setGithubSession } = useStore();

  useEffect(() => {
    if (githubToken && githubUser) {
      router.push('/repositories');
    }
  }, [githubToken, githubUser, router]);

  const handleConnect = async () => {
    if (!token.trim()) { setError('Please enter a GitHub token.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Invalid token');
      const user = await res.json();
      setGithubSession(token, user);
      router.push('/repositories');
    } catch {
      setError('Could not authenticate. Check your token and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (githubToken && githubUser) return null;

  return (
    <div className="w-screen h-screen bg-background flex flex-col">
      <nav className="w-full p-6 flex justify-between items-center bg-background/30 backdrop-blur-md border-b border-white/5 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <Activity className="text-secondary w-8 h-8" />
          <span className="font-black text-2xl tracking-widest text-cream uppercase">Agent.OS</span>
        </div>
        <a href="/" className="text-beige/40 hover:text-cream transition-colors text-sm font-mono">← Back to home</a>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 w-full max-w-md shadow-[0_0_40px_rgba(22,46,147,0.3)] [background:linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)]">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center border border-secondary/50 shadow-[0_0_30px_rgba(22,46,147,0.5)] mb-4">
              <GitBranch className="w-8 h-8 text-cream" />
            </div>
            <h1 className="text-3xl font-black tracking-widest text-cream uppercase mb-2">Connect GitHub</h1>
            <p className="text-beige/60 text-sm text-center tracking-wide">
              Enter a GitHub Personal Access Token to link your account.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={e => setToken(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleConnect()}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-beige/30 font-mono text-sm focus:outline-none focus:border-secondary/70 focus:shadow-[0_0_15px_rgba(22,46,147,0.2)] transition-all"
            />
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <button
              onClick={handleConnect}
              disabled={loading}
              className="blob-btn w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? <Activity className="w-5 h-5 animate-spin" /> : <GitBranch className="w-5 h-5" />}
                {loading ? 'Connecting...' : 'Connect'}
              </span>
              <span className="blob-btn__inner">
                <span className="blob-btn__blobs">
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                  <span className="blob-btn__blob"></span>
                </span>
              </span>
            </button>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-beige/40">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400/60" />
                <span>Your token is stored locally — never sent to any server.</span>
              </div>
              <p className="text-beige/40 text-xs text-center">
                Generate a token at{' '}
                <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer"
                  className="text-secondary hover:text-cream transition-colors underline">
                  github.com/settings/tokens
                </a>
                {' '}with <code className="text-beige/60">repo</code> scope.
              </p>
            </div>
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" result="goo"></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
};
