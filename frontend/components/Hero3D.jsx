import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Hook: returns a smoothed scroll value in [0..1] across page height.
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = (h.scrollHeight - h.clientHeight) || 1;
        setY(Math.min(1, Math.max(0, h.scrollTop / max)));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return y;
}

// Camera that drifts with scroll for a parallax-y feel
function ScrollCamera({ scrollY }) {
  useFrame(({ camera }) => {
    const targetY = -scrollY * 1.6;
    const targetZ = 6.5 + scrollY * 1.2;
    camera.position.y += (targetY - camera.position.y) * 0.08;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// Glowing distorted crystal orb at the center
function Crystal() {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.25;
      ref.current.rotation.x += dt * 0.1;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.2}>
        <icosahedronGeometry args={[1.4, 4]} />
        <MeshDistortMaterial
          color="#8B5CF6"
          emissive="#A78BFA"
          emissiveIntensity={0.6}
          distort={0.42}
          speed={1.8}
          roughness={0.12}
          metalness={0.65}
        />
      </mesh>
    </Float>
  );
}

// Wireframe halo ring orbiting the crystal
function Ring() {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.4;
      ref.current.rotation.y += dt * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.4, 0.02, 16, 100]} />
      <meshBasicMaterial color="#EC4899" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

// Floating little geometry — represents subjects
function Atoms() {
  const items = useMemo(() => [
    { pos: [-3.2, 1.4, -1], color: '#06B6D4', shape: 'sphere' },
    { pos: [3.0, -0.8, -0.5], color: '#A78BFA', shape: 'octa' },
    { pos: [-2.6, -1.6, 0.8], color: '#F472B6', shape: 'tetra' },
    { pos: [2.8, 1.7, 0.6], color: '#22D3EE', shape: 'dodeca' },
  ], []);

  return items.map((it, i) => (
    <Float key={i} speed={1 + i * 0.3} rotationIntensity={1.2} floatIntensity={1.6}>
      <mesh position={it.pos}>
        {it.shape === 'sphere'  && <sphereGeometry args={[0.22, 24, 24]} />}
        {it.shape === 'octa'    && <octahedronGeometry args={[0.28]} />}
        {it.shape === 'tetra'   && <tetrahedronGeometry args={[0.3]} />}
        {it.shape === 'dodeca'  && <dodecahedronGeometry args={[0.24]} />}
        <meshStandardMaterial color={it.color} emissive={it.color} emissiveIntensity={0.6} roughness={0.3} />
      </mesh>
    </Float>
  ));
}

export default function Hero3D() {
  const scrollY = useScrollY();
  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      opacity: Math.max(0, 1 - scrollY * 2.2),
      transition: 'opacity 0.2s linear',
    }}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <ScrollCamera scrollY={scrollY} />
        <color attach="background" args={['#0B0F1F']} />
        <fog attach="fog" args={['#0B0F1F', 6, 14]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} color="#A78BFA" />
        <pointLight position={[-4, -2, 3]} intensity={1.0} color="#EC4899" />
        <pointLight position={[4, 3, -3]} intensity={0.8} color="#06B6D4" />

        <Suspense fallback={null}>
          <Crystal />
          <Ring />
          <Atoms />
          <Sparkles count={100} scale={11} size={3} speed={0.35} color="#A78BFA" opacity={0.8} />
          <Stars radius={50} depth={30} count={1800} factor={3.5} saturation={0} fade speed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
