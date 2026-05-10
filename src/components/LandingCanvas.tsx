'use client';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { useStore } from '../store';
import { Scene } from './Scene';

export default function LandingCanvas() {
  const router = useRouter();
  const { githubToken } = useStore();
  const connectHref = githubToken ? '/repositories' : '/connect';

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.2 }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        shadows
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault(), false);
        }}
      >
        <ScrollControls pages={5} damping={0.8} maxSpeed={0.3}>
          <Scene onConnect={() => router.push(connectHref)} />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
