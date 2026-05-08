'use client';
import { Scroll } from '@react-three/drei';
import { ShardsBackground } from './ShardsBackground';
import { Overlay } from './Overlay';

export const Scene = ({ onConnect }: { onConnect: () => void }) => {
  return (
    <>
      <ShardsBackground />
      <Scroll html style={{ width: '100vw' }}>
        <Overlay onConnect={onConnect} />
      </Scroll>
    </>
  );
};
