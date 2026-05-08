'use client';
import dynamic from 'next/dynamic';
import AppNav from '../../components/AppNav';
import Dashboard from '../../components/Dashboard';

const ShardsCanvas = dynamic(() => import('../../components/ShardsCanvas'), { ssr: false });

export default function DashboardPage() {
  return (
    <div style={{ background: '#010409', minHeight: '100vh' }}>
      <ShardsCanvas />
      <AppNav />
      <Dashboard />
    </div>
  );
}
