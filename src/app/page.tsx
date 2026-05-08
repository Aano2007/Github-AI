'use client';
import dynamic from 'next/dynamic';
import { FixedUI } from '../components/FixedUI';
import Timeline from '../components/Timeline';

const LandingCanvas = dynamic(() => import('../components/LandingCanvas'), { ssr: false });

export default function Home() {
  return (
    <div style={{ width: '100vw', background: '#010409' }}>
      <FixedUI />
      <LandingCanvas />
      <Timeline />
    </div>
  );
}
