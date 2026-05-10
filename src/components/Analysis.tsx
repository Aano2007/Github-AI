'use client';
import AppNav from './AppNav';
import RepoHeader from './RepoHeader';
import OptimizationScore from './OptimizationScore';
import SystemVitality from './SystemVitality';
import AITriagePath from './AITriagePath';
import OptimizationEngine from './OptimizationEngine';
import RepoTopography from './RepoTopography';
import TestCoverage from './TestCoverage';
import AIInsightSummary from './AIInsightSummary';
import SecurityHealth from './SecurityHealth';

function GlowDivider() {
  return (
    <div style={{ margin: '20px 0', position: 'relative', height: '1px' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, transparent 0%, rgba(103,232,249,0.5) 50%, transparent 100%)',
        boxShadow: '0 0 8px rgba(103,232,249,0.25)',
      }} />
    </div>
  );
}

export default function Analysis() {
  return (
    <div style={{ background: 'var(--md-background)', minHeight: '100vh' }}>
      <AppNav />
      <main className="max-w-7xl mx-auto px-8 py-10" style={{ paddingTop: '80px' }}>
        <RepoHeader />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Section 1 — Scores & Vitality */}
          <OptimizationScore />
          <SystemVitality />

          <GlowDivider />

          {/* Section 2 — AI Analysis */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <AITriagePath />
            <OptimizationEngine />
          </div>

          <GlowDivider />

          {/* Section 3 — Topography */}
          <RepoTopography />

          <GlowDivider />

          {/* Section 4 — Coverage & Insights */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <TestCoverage />
            <AIInsightSummary />
          </div>

          <GlowDivider />

          {/* Section 5 — Security */}
          <SecurityHealth />

        </div>
      </main>
    </div>
  );
}
