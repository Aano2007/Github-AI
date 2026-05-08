'use client';
import { useState } from 'react';
import { BookOpen, Terminal, Zap, Shield, Code2, ChevronRight } from 'lucide-react';

const NAV = [
  { id: 'quickstart', label: 'Quick Start', icon: <Zap className="w-4 h-4" /> },
  { id: 'installation', label: 'Installation', icon: <Terminal className="w-4 h-4" /> },
  { id: 'api', label: 'API Reference', icon: <Code2 className="w-4 h-4" /> },
  { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
];

const CodeBlock = ({ code, lang = 'bash' }: { code: string; lang?: string }) => (
  <div className="rounded-xl overflow-hidden border border-white/10 my-4 shadow-[0_0_20px_rgba(22,46,147,0.1)]">
    <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/10">
      <span className="text-xs font-mono text-beige/40 uppercase tracking-widest">{lang}</span>
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-red-500/50" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <span className="w-2 h-2 rounded-full bg-emerald-500/50" />
      </div>
    </div>
    <pre className="p-4 text-xs font-mono text-beige/80 overflow-x-auto bg-black/50 leading-relaxed">{code}</pre>
  </div>
);

const Endpoint = ({ method, path, desc }: { method: string; path: string; desc: string }) => {
  const colors: Record<string, string> = {
    GET: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    POST: 'text-secondary border-secondary/40 bg-secondary/10',
    DELETE: 'text-red-400 border-red-500/40 bg-red-500/10',
    PATCH: 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10',
  };
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3 hover:border-secondary/30 transition-colors">
      <span className={`text-xs font-mono font-bold px-2 py-1 rounded border shrink-0 ${colors[method]}`}>{method}</span>
      <div>
        <code className="text-sm font-mono text-cream">{path}</code>
        <p className="text-xs text-beige/50 mt-1">{desc}</p>
      </div>
    </div>
  );
};

const CONTENT: Record<string, React.ReactNode> = {
  quickstart: (
    <div>
      <h2 className="text-2xl font-black uppercase tracking-widest text-cream mb-2">Quick Start</h2>
      <p className="text-beige/60 text-sm leading-relaxed mb-6">Get Agent.OS running in under 60 seconds.</p>
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-3 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" />1. Install the CLI</h3>
      <CodeBlock code="npm install -g @agent-os/cli" />
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-3 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" />2. Authenticate</h3>
      <CodeBlock code="agent-os auth login --token <YOUR_API_TOKEN>" />
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-3 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" />3. Connect a repository</h3>
      <CodeBlock code={`cd your-project\nagent-os init\nagent-os connect --repo github.com/your-org/your-repo`} />
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-3 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" />4. Run your first scan</h3>
      <CodeBlock code="agent-os scan --full --auto-fix" />
      <div className="rounded-xl p-4 bg-emerald-500/10 border border-emerald-500/30 mt-6">
        <p className="text-xs font-mono text-emerald-400">✓ Agent.OS will now autonomously monitor, refactor, test, and deploy your code on every push.</p>
      </div>
    </div>
  ),
  installation: (
    <div>
      <h2 className="text-2xl font-black uppercase tracking-widest text-cream mb-2">Installation</h2>
      <p className="text-beige/60 text-sm leading-relaxed mb-6">Agent.OS supports multiple installation methods.</p>
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-3 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" />NPM</h3>
      <CodeBlock code="npm install @agent-os/sdk" lang="bash" />
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-3 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" />Docker</h3>
      <CodeBlock code={`docker pull agentOS/core:latest\ndocker run -d \\\n  -e AGENT_TOKEN=<YOUR_TOKEN> \\\n  -v $(pwd):/workspace \\\n  agentOS/core:latest`} lang="docker" />
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-3 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" />GitHub Actions</h3>
      <CodeBlock code={`- name: Agent.OS Scan\n  uses: agent-os/action@v2\n  with:\n    token: \${{ secrets.AGENT_OS_TOKEN }}\n    auto-fix: true\n    auto-merge: true`} lang="yaml" />
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-3 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" />SDK Initialization</h3>
      <CodeBlock code={`import { AgentOS } from '@agent-os/sdk';\n\nconst agent = new AgentOS({\n  token: process.env.AGENT_OS_TOKEN,\n  repo: 'your-org/your-repo',\n  autoFix: true,\n  cicd: 'github-actions',\n});`} lang="typescript" />
    </div>
  ),
  api: (
    <div>
      <h2 className="text-2xl font-black uppercase tracking-widest text-cream mb-2">API Reference</h2>
      <p className="text-beige/60 text-sm leading-relaxed mb-6">Base URL: <code className="text-secondary font-mono">https://api.agent-os.dev/v2</code></p>
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-4">Repositories</h3>
      <Endpoint method="GET" path="/repos" desc="List all connected repositories for the authenticated user." />
      <Endpoint method="POST" path="/repos/connect" desc="Connect a new repository to Agent.OS for autonomous monitoring." />
      <Endpoint method="DELETE" path="/repos/:id" desc="Disconnect a repository and stop all active agents." />
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-4 mt-6">Scans</h3>
      <Endpoint method="POST" path="/repos/:id/scan" desc="Trigger a full AST scan and autonomous refactor pipeline." />
      <Endpoint method="GET" path="/repos/:id/scan/:scanId" desc="Get the status and results of a specific scan." />
      <Endpoint method="PATCH" path="/repos/:id/scan/:scanId/approve" desc="Approve and merge the generated pull request." />
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-4 mt-6">Example Response</h3>
      <CodeBlock code={`{\n  "id": "scan_9xKp2",\n  "status": "completed",\n  "debtScore": 18,\n  "productionReadiness": 94,\n  "patchesApplied": 5,\n  "testsGenerated": 23,\n  "coverage": "94.2%",\n  "pr": {\n    "id": 47,\n    "url": "https://github.com/org/repo/pull/47",\n    "status": "merged"\n  }\n}`} lang="json" />
    </div>
  ),
  security: (
    <div>
      <h2 className="text-2xl font-black uppercase tracking-widest text-cream mb-2">Security</h2>
      <p className="text-beige/60 text-sm leading-relaxed mb-6">Agent.OS is SOC2 Type II certified. All code analysis happens in isolated sandboxes with zero data retention.</p>
      {[
        { title: 'Zero Data Retention', desc: 'Your source code is never stored. All analysis runs in ephemeral containers that are destroyed after each scan.' },
        { title: 'End-to-End Encryption', desc: 'All data in transit is encrypted with TLS 1.3. API tokens are hashed with bcrypt and never stored in plaintext.' },
        { title: 'Isolated Sandboxes', desc: 'Each repository scan runs in a fully isolated Docker container with no network access and read-only filesystem mounts.' },
        { title: 'Audit Logs', desc: 'Every agent action is logged with full attribution. Logs are immutable and retained for 90 days.' },
      ].map((item, i) => (
        <div key={i} className="rounded-xl p-4 bg-white/[0.03] border border-white/[0.06] mb-3 hover:border-secondary/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-secondary" />
            <span className="text-sm font-bold text-cream">{item.title}</span>
          </div>
          <p className="text-xs text-beige/50 leading-relaxed">{item.desc}</p>
        </div>
      ))}
      <h3 className="text-sm font-bold uppercase tracking-widest text-cream mb-3 mt-6 flex items-center gap-2"><ChevronRight className="w-4 h-4 text-secondary" />Token Scopes</h3>
      <CodeBlock code={`// Minimum required scopes\nconst token = await AgentOS.createToken({\n  scopes: ['repo:read', 'repo:write', 'pr:create'],\n  expiry: '30d',\n});`} lang="typescript" />
    </div>
  ),
};

export default function Docs() {
  const [active, setActive] = useState('quickstart');

  return (
    <div className="min-h-screen text-white px-6 py-28 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-secondary mb-3">Agent.OS</p>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-cream flex items-center gap-4">
            <BookOpen className="w-9 h-9 text-secondary" /> Documentation
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-56 shrink-0">
            <div className="rounded-2xl p-3 bg-white/5 border border-white/10 backdrop-blur-md sticky top-24 [background:linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)]">
              {NAV.map(n => (
                <button key={n.id} onClick={() => setActive(n.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all mb-1 ${active === n.id ? 'bg-secondary/20 border border-secondary/50 text-cream shadow-[0_0_15px_rgba(22,46,147,0.3)]' : 'text-beige/50 hover:text-cream hover:bg-white/[0.05]'}`}>
                  {n.icon}{n.label}
                </button>
              ))}
            </div>
          </aside>
          <main className="flex-1 rounded-2xl p-8 bg-white/5 border border-white/10 backdrop-blur-md min-h-[60vh] [background:linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)]">
            {CONTENT[active]}
          </main>
        </div>
      </div>
    </div>
  );
}
