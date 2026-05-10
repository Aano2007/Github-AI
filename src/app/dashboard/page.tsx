'use client';
import RepoHeader         from '../../components/RepoHeader';
import OptimizationScore  from '../../components/OptimizationScore';
import SystemVitality     from '../../components/SystemVitality';
import AITriagePath       from '../../components/AITriagePath';
import OptimizationEngine from '../../components/OptimizationEngine';
import RepoTopography     from '../../components/RepoTopography';
import TestCoverage       from '../../components/TestCoverage';
import AIInsightSummary   from '../../components/AIInsightSummary';
import SecurityHealth     from '../../components/SecurityHealth';

export default function DashboardPage() {
  return (
    <main style={{
      background: '#111318',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: '#E2E2E9',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>

        <RepoHeader />

        <div style={{ marginBottom: '24px' }}><OptimizationScore /></div>
        <div style={{ marginBottom: '24px' }}><SystemVitality /></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <AITriagePath />
          <OptimizationEngine />
        </div>

        <div style={{ marginBottom: '24px' }}><RepoTopography /></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <TestCoverage />
          <AIInsightSummary />
        </div>

        <div style={{ marginBottom: '40px' }}><SecurityHealth /></div>
      </div>
    </main>
  );
}
