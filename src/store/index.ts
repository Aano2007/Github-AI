'use client';
import { create } from 'zustand';

export type Repo = {
  id: string;
  name: string;
  language: string;
  debtScore: number;
  productionReadiness: number;
  activeAgents: number;
  lastScan: string;
  status: 'clean' | 'scanning' | 'issues';
  full_name?: string;
  html_url?: string;
  pushed_at?: string;
  open_issues_count?: number;
  stargazers_count?: number;
  forks_count?: number;
  description?: string | null;
  private?: boolean;
};

export type GithubUser = {
  login: string;
  avatar_url: string;
  name: string;
};

type Store = {
  repos: Repo[];
  selectedRepo: Repo | null;
  setSelectedRepo: (repo: Repo) => void;
  selectedGithubRepo: Record<string, unknown> | null;
  setSelectedGithubRepo: (repo: Record<string, unknown>) => void;
  githubToken: string | null;
  githubUser: GithubUser | null;
  setGithubSession: (token: string, user: GithubUser) => void;
  clearGithubSession: () => void;
};

export const useStore = create<Store>(() => ({
  repos: [
    { id: '1', name: 'frontend-client', language: 'TypeScript', debtScore: 18, productionReadiness: 94, activeAgents: 3, lastScan: '2m ago', status: 'clean' },
    { id: '2', name: 'legacy-api', language: 'JavaScript', debtScore: 74, productionReadiness: 41, activeAgents: 7, lastScan: '5m ago', status: 'issues' },
    { id: '3', name: 'auth-service', language: 'Go', debtScore: 9, productionReadiness: 98, activeAgents: 1, lastScan: '12m ago', status: 'clean' },
    { id: '4', name: 'data-pipeline', language: 'Python', debtScore: 52, productionReadiness: 63, activeAgents: 4, lastScan: '1m ago', status: 'scanning' },
    { id: '5', name: 'infra-core', language: 'Terraform', debtScore: 31, productionReadiness: 82, activeAgents: 2, lastScan: '8m ago', status: 'clean' },
    { id: '6', name: 'ml-inference', language: 'Python', debtScore: 45, productionReadiness: 71, activeAgents: 5, lastScan: '3m ago', status: 'scanning' },
  ],
  selectedRepo: null,
  setSelectedRepo: (repo) => useStore.setState({ selectedRepo: repo }),
  selectedGithubRepo: null,
  setSelectedGithubRepo: (repo) => useStore.setState({ selectedGithubRepo: repo }),
  githubToken: typeof window !== 'undefined' ? localStorage.getItem('agentOS_token') : null,
  githubUser: typeof window !== 'undefined'
    ? (() => { const u = localStorage.getItem('agentOS_user'); return u ? JSON.parse(u) : null; })()
    : null,
  setGithubSession: (token, user) => {
    localStorage.setItem('agentOS_token', token);
    localStorage.setItem('agentOS_user', JSON.stringify(user));
    useStore.setState({ githubToken: token, githubUser: user });
  },
  clearGithubSession: () => {
    localStorage.removeItem('agentOS_token');
    localStorage.removeItem('agentOS_user');
    useStore.setState({ githubToken: null, githubUser: null });
  },
}));
