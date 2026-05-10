'use client';
import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import * as THREE from 'three';

const SHARD_COUNT = 60;

function Shards() {
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const geometries = useMemo(() => {
    const geos = [
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(1, 0),
    ];
    geos.forEach(geo => geo.scale(1, 2.5 + Math.random() * 1.5, 1));
    return geos;
  }, []);

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.15,
    transmission: 0.5,
    ior: 1.5,
    thickness: 2.5,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  }), []);

  const shardData = useMemo(() => Array.from({ length: SHARD_COUNT }, () => {
    const py = (Math.random() - 0.5) * 40;
    return {
      geo: Math.floor(Math.random() * 3),
      px: (Math.random() - 0.5) * 40,
      py,
      pz: (Math.random() - 0.5) * 40 - 15,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      scale: Math.random() * 0.24 + 0.12,
      userData: {
        rx: (Math.random() - 0.5) * 0.002,
        ry: (Math.random() - 0.5) * 0.002,
        rz: (Math.random() - 0.5) * 0.002,
        dy: (Math.random() - 0.5) * 0.005 + 0.002,
        originalY: py,
      },
    };
  }), []);

  useEffect(() => {
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    const onMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX - windowHalfX) / windowHalfX;
      mouse.current.y = (event.clientY - windowHalfY) / windowHalfY;
    };
    const onResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useFrame((state) => {
    let elapsedTime = 0;
    try { elapsedTime = state.clock.getElapsedTime(); } catch { return; }
    const cam = camera as THREE.PerspectiveCamera;

    meshRefs.current.forEach((mesh) => {
      if (!mesh) return;
      mesh.rotation.x += mesh.userData.rx;
      mesh.rotation.y += mesh.userData.ry;
      mesh.rotation.z += mesh.userData.rz;
      mesh.position.y += Math.sin(elapsedTime * 0.5 + mesh.userData.originalY) * 0.005;
      if (mesh.position.z > cam.position.z + 8) {
        mesh.position.z -= 80;
        mesh.position.x = (Math.random() - 0.5) * 40;
        mesh.position.y = (Math.random() - 0.5) * 40;
        mesh.userData.originalY = mesh.position.y;
      }
      if (mesh.position.z < cam.position.z - 80) {
        mesh.position.z += 80;
        mesh.position.x = (Math.random() - 0.5) * 40;
        mesh.position.y = (Math.random() - 0.5) * 40;
        mesh.userData.originalY = mesh.position.y;
      }
    });

    const targetX = mouse.current.x * 2;
    const targetY = -(mouse.current.y * 2);
    cam.position.x += (targetX - cam.position.x) * 0.02;
    cam.position.y += (targetY - cam.position.y) * 0.02;
    cam.lookAt(cam.position.x * 0.5, cam.position.y * 0.5, 0);
  });

  return (
    <>
      {shardData.map((d, i) => (
        <mesh
          key={i}
          ref={el => { if (el) { meshRefs.current[i] = el; el.userData = d.userData; } }}
          geometry={geometries[d.geo]}
          material={material}
          position={[d.px, d.py, d.pz]}
          rotation={[d.rx, d.ry, d.rz]}
          scale={d.scale}
        />
      ))}
    </>
  );
}

export function ShardsBackground() {
  return (
    <>
      <color attach="background" args={['#09090b']} />
      <fogExp2 attach="fog" args={[0x09090b, 0.025]} />
      <ambientLight color={0x222233} intensity={1.5} />
      <pointLight color={0x00e5ff} intensity={5} distance={50} position={[10, 15, 10]} />
      <pointLight color={0xb388ff} intensity={4} distance={50} position={[-10, -15, 10]} />
      <pointLight color={0xffffff} intensity={2} distance={60} position={[0, 0, -20]} />
      <Environment preset="city" />
      <Shards />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  );
}
