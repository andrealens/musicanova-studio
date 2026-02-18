"use client";
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, ContactShadows } from '@react-three/drei';

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
  // Carica il file dalla cartella public
  const { scene } = useGLTF('/black_piano.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={2.0}             // <--- RIDOTTO (da 2.5 a 1.2) per farlo meno ingombrante
      position={[0, -1.5, 0]} // Posizione Y per tenerlo "appoggiato" a terra
      rotation={[0, 0.5, 0]} 
    />
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
        camera={{ position: [0, 2, 9], fov: 45 }}
      >
        
        {/* Luci ambientali per far brillare il nero lucido del piano */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Suspense fallback={null}>
          <Model />
          <Environment preset="city" /> 
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          autoRotate={true}  
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
    </div>
  );
}