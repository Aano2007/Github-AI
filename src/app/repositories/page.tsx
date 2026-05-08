'use client';
import AppNav from '../../components/AppNav';
import { Repositories } from '../../components/Repositories';

export default function RepositoriesPage() {
  return (
    <div style={{ background: 'var(--md-background)', minHeight: '100vh' }}>
      <AppNav />
      <Repositories />
    </div>
  );
}
