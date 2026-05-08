'use client';
import { Activity, Zap, ShieldCheck, Cpu, Network, Code2, Box, Layers, Server, Cloud, Database, GitBranch } from 'lucide-react';

export const Overlay = ({ onConnect }: { onConnect: () => void }) => {

  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none text-white z-10" style={{ height: '500vh' }}>

      {/* Hero Section */}
      <section className="h-[100vh] flex flex-col items-center justify-center relative px-6">
        <div className="mb-10 flex flex-col items-center w-fit max-w-4xl px-10 py-8" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 50%, rgba(0,0,0,0.6) 30%, transparent 70%)' }}>
          <h1 className="text-6xl md:text-8xl font-black tracking-[0.1em] text-center mb-6 leading-tight uppercase">
            <span className="block text-cream drop-shadow-md mb-2">THE END OF</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cream via-beige to-secondary">TECHNICAL DEBT.</span>
          </h1>
          <p className="text-xl md:text-2xl text-beige/80 max-w-2xl text-center font-medium tracking-wide">
            The seamless transition from legacy code to autonomous, self-healing repositories.
          </p>
        </div>
        <button className="pointer-events-auto blob-btn" onClick={onConnect}>
          <span className="relative z-10 flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Connect GitHub
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

        {/* Integrations Bar */}
        <div className="absolute bottom-12 w-full flex flex-col items-center">
          <div className="pointer-events-auto flex flex-col items-center gap-5 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_24px_rgba(22,46,147,0.15)] [background:linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)]">
            <p className="text-xs uppercase tracking-[0.2em] text-beige/50 font-semibold">Native Integrations</p>
            <div className="flex gap-10 items-center justify-center opacity-80">
              <Box className="w-6 h-6 text-beige/80 hover:text-cream transition-colors cursor-pointer" />
              <Layers className="w-6 h-6 text-beige/80 hover:text-cream transition-colors cursor-pointer" />
              <Server className="w-6 h-6 text-beige/80 hover:text-cream transition-colors cursor-pointer" />
              <Cloud className="w-6 h-6 text-beige/80 hover:text-cream transition-colors cursor-pointer" />
              <Database className="w-6 h-6 text-beige/80 hover:text-cream transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="h-[100vh] flex flex-col items-center justify-center px-6">
        <div className="mb-16 px-10 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_24px_rgba(22,46,147,0.15)] [background:linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)]">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-center text-cream/90">Autonomous Pipeline</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          <div className="pointer-events-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-8 hover:bg-white/10 transition-colors duration-300 hover:shadow-[0_0_30px_rgba(22,46,147,0.4)]">
            <div className="w-12 h-12 bg-secondary/40 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="text-cream w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-cream">Predictive Error Mapping</h3>
            <p className="text-beige/70 leading-relaxed font-medium">Identifying logic gaps before they crash.</p>
          </div>
          <div className="pointer-events-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-8 hover:bg-white/10 transition-colors duration-300 hover:shadow-[0_0_30px_rgba(22,46,147,0.4)]">
            <div className="w-12 h-12 bg-secondary/40 rounded-2xl flex items-center justify-center mb-6">
              <Activity className="text-cream w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-cream">Autonomous Refactoring</h3>
            <p className="text-beige/70 leading-relaxed font-medium">Rewriting code to production-grade architecture.</p>
          </div>
          <div className="pointer-events-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-8 hover:bg-white/10 transition-colors duration-300 hover:shadow-[0_0_30px_rgba(22,46,147,0.4)]">
            <div className="w-12 h-12 bg-secondary/40 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-cream w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-cream">Verified CI/CD</h3>
            <p className="text-beige/70 leading-relaxed font-medium">Auto-deploying to main once the &quot;Production Score&quot; is met.</p>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="h-[100vh] flex flex-col items-center justify-center px-6">
        <div className="pointer-events-auto flex flex-col items-center px-12 py-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_24px_rgba(22,46,147,0.15)] [background:linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] max-w-5xl w-full">
          <h2 className="text-4xl font-bold mb-16 text-center text-cream/90">Intelligent Architecture</h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full items-center justify-center">
            <div className="pointer-events-auto flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center border border-secondary/50 shadow-[0_0_30px_rgba(22,46,147,0.4)]">
                <Code2 className="w-10 h-10 text-cream" />
              </div>
              <h4 className="text-xl font-bold text-cream">1. AST Parsing</h4>
              <p className="text-beige/70 max-w-xs">Deep code comprehension mapping every logic node.</p>
            </div>
            <div className="hidden md:block w-16 h-px bg-secondary/50"></div>
            <div className="pointer-events-auto flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center border border-secondary/50 shadow-[0_0_30px_rgba(22,46,147,0.4)]">
                <Cpu className="w-10 h-10 text-cream" />
              </div>
              <h4 className="text-xl font-bold text-cream">2. Neural Analysis</h4>
              <p className="text-beige/70 max-w-xs">AI identifies vulnerabilities and optimization paths.</p>
            </div>
            <div className="hidden md:block w-16 h-px bg-secondary/50"></div>
            <div className="pointer-events-auto flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center border border-secondary/50 shadow-[0_0_30px_rgba(22,46,147,0.4)]">
                <Network className="w-10 h-10 text-cream" />
              </div>
              <h4 className="text-xl font-bold text-cream">3. Auto-Resolution</h4>
              <p className="text-beige/70 max-w-xs">Direct PR generation with self-healing patches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="h-[100vh] flex flex-col items-center justify-center px-6">
        <div className="mb-16 px-10 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_24px_rgba(22,46,147,0.15)] [background:linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)]">
          <h2 className="text-4xl font-bold text-center text-cream/90">Enterprise Grade</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full">
          {[['99.9%', 'Uptime SLA'], ['50M+', 'Lines Analyzed'], ['<2s', 'Patch Latency'], ['SOC2', 'Certified Secure']].map(([val, label]) => (
            <div key={label} className="pointer-events-auto flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl hover:bg-white/10 transition-colors duration-300">
              <span className="text-5xl font-extrabold text-cream mb-3">{val}</span>
              <span className="text-sm text-beige/70 uppercase tracking-widest text-center font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / CTA section */}
      <section className="h-[100vh] flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest mb-8 text-cream drop-shadow-lg">
          Ready to evolve?
        </h2>
        <button className="pointer-events-auto px-8 py-4 rounded-full bg-cream text-background font-bold text-lg hover:bg-beige transition-colors shadow-[0_0_20px_rgba(255,248,240,0.3)]" onClick={onConnect}>
          Connect GitHub
        </button>
      </section>

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
