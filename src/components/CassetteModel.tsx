"use client";
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// Interfaccia per i tipi - Risolve gli errori "any" in Cursor
interface ModelProps {
  position: [number, number, number];
  scale: number;
  baseRotation: [number, number, number];
}

function Model({ position, scale, baseRotation }: ModelProps) {
  const { scene } = useGLTF('/cassette_tape.glb');
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Fluttuazione minima ed elegante
    groupRef.current.position.y = position[1] + Math.sin(t * 1.0) * 0.015;
  });

  return (
    <group ref={groupRef} position={position}>
      <group rotation={baseRotation} scale={scale}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

export default function CassetteModel() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 25 }} 
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} intensity={2} angle={0.3} penumbra={1} />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            snap // snap come booleano per evitare errori TypeScript
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]} 
            azimuth={[-Math.PI / 3, Math.PI / 3]}
          >
            <Model
              // POSIZIONE: Spostata a 1.5 per allontanarla bene dal testo
              position={[0.8, -0.1, 0]} 
              // SCALA: 0.55 per renderla leggermente più grande e d'impatto
              scale={0.45} 
              baseRotation={[Math.PI / 2, 0, 0]} 
            />
          </PresentationControls>

          <Environment preset="city" />
          
          <ContactShadows 
            // Ombra allineata alla nuova posizione X
            position={[1.5, -1.8, 0]} 
            opacity={0.3} 
            scale={5} 
            blur={3} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}