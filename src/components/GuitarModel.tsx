"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  useGLTF, 
  Float, 
  Environment, 
  PresentationControls, 
  ContactShadows 
} from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/guitar.glb');
  
  // --- COLOR FIX ---
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        const material = mesh.material as THREE.MeshStandardMaterial;
        const hsl = { h: 0, s: 0, l: 0 };
        material.color.getHSL(hsl);

        if ((hsl.h < 0.08 || hsl.h > 0.92) && hsl.s > 0.2) {
           material.color.set("#6366f1"); 
           material.roughness = 0.2; 
           material.metalness = 0.5;
        } else {
           material.envMapIntensity = 2.5; 
           material.roughness = 0.3;
           material.metalness = 0.6;
        }
        material.needsUpdate = true;
      }
    }
  });

  return (
    <primitive 
      object={scene} 
      scale={0.9} // Proporzione confermata
      position={[3.2, -2.5, 0]} // Posizione confermata
      rotation={[0, -0.2, 0]} 
    />
  );
}

export default function GuitarScene() {
  return (
    <div className="w-full h-full">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 17], fov: 40 }} 
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0, 
        }}
        className="pointer-events-auto"
      >
        <ambientLight intensity={0.7} color="#2a2a40" />
        <spotLight position={[5, 8, 8]} angle={0.5} penumbra={0.5} intensity={10} color="#ffffff" castShadow />
        <pointLight position={[-5, 0, 5]} intensity={8} color="#818cf8" />
        <spotLight position={[2, -5, 5]} angle={0.5} intensity={10} color="#d946ef" />

        <Suspense fallback={null}>
          <PresentationControls
            global={true}
            cursor={true}
            snap={true}
            speed={1.5}
            zoom={1}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 6, Math.PI / 6]}
            azimuth={[-Math.PI / 5, Math.PI / 5]}
          >
            {/* --- EFFETTO FLUTTUAZIONE POTENZIATO --- */}
            <Float 
              speed={4} // Velocità dell'oscillazione (da 3 a 4)
              rotationIntensity={0.8} // Intensità della rotazione casuale (da 0.1 a 0.8)
              floatIntensity={2} // Ampiezza del movimento verticale (da 0.2 a 2)
            >
              <Model />
            </Float>
          </PresentationControls>
          
          <Environment preset="city" />
          
          <ContactShadows 
            position={[3.2, -4.5, 0]} 
            opacity={0.5} 
            scale={10} 
            blur={2.5} 
            far={4} 
            resolution={256} 
            frames={1} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/guitar.glb');