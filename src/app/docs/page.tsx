'use client';
import AppNav from '../../components/AppNav';
import Docs from '../../components/Docs';

export default function DocsPage() {
  return (
    <div style={{ background: 'var(--md-background)', minHeight: '100vh' }}>
      <AppNav />
      <Docs />
    </div>
  );
}
