'use client';
import { Canvas } from '@react-three/fiber';
import { ShardsBackground } from './ShardsBackground';

export default function ShardsCanvas() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      zIndex: 0, pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.2 }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        shadows
      >
        <ShardsBackground />
      </Canvas>
    </div>
  );
}
