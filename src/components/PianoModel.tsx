"use client";
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const SCROLL_IDLE_MS = 160;

function useScrollIdle() {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        timeoutRef.current = null;
      }, SCROLL_IDLE_MS);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return isScrolling;
}

function Model() {
  const { scene } = useGLTF('/black_piano.glb');
  const groupRef = useRef<THREE.Group>(null);

  // Animazione di galleggiamento (floating)
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Galleggiamento millimetrico
    groupRef.current.position.y = -1.6 + Math.sin(t * 0.8) * 0.1;
  });
  
  return (
    // Ho cambiato la posizione Y da -1.5 a -2.0 per abbassarlo
    <group ref={groupRef} position={[0, -2.0, 0]}>
      <primitive 
        object={scene} 
        scale={2.0}             // SCALE ORIGINALE
        rotation={[0, 0.5, 0]}  // ROTAZIONE ORIGINALE
      />
    </group>
  );
}

export default function PianoModel() {
  const isScrolling = useScrollIdle();

  return (
    <div
      className="w-full h-full"
      style={{ pointerEvents: isScrolling ? 'none' : 'auto' }}
    >
      <Canvas
        frameloop={isScrolling ? 'never' : 'always'}
        camera={{ position: [0, 2, 9], fov: 45 }} // CAMERA ORIGINALE
      >
        
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
        
        <Suspense fallback={null}>
          <Model />
          <Environment preset="city" /> 
          {/* Anche l'ombra deve essere abbassata per seguire il piano */}
          <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          autoRotate={false}   // ROTAZIONE DISATTIVATA
          enablePan={false}
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}