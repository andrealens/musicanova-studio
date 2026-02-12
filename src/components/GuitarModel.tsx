"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  useGLTF, 
  Float, 
  Environment, 
  Center, 
  PresentationControls, 
  ContactShadows 
} from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/tom_morello.glb');
  
  // Ottimizzazione materiali per la massima nitidezza visiva
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        (mesh.material as THREE.MeshStandardMaterial).needsUpdate = true;
      }
    }
  });

  return (
    <Center>
      <primitive 
        object={scene} 
        scale={3.5} 
        rotation={[0.2, -1.5, 0]} 
      />
    </Center>
  );
}

export default function GuitarScene() {
  return (
    <div className="w-full h-full">
      <Canvas 
        dpr={[1, 2]} // Qualità Retina per eliminare l'effetto sgranato
        camera={{ position: [0, 0, 9], fov: 35 }} 
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        {/* --- ILLUMINAZIONE CINEMATICA --- */}
        {/* Luce ambientale soffusa con tono freddo */}
        <ambientLight intensity={0.4} color="#1a1a2e" />

        {/* Luce principale bianca per i dettagli */}
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={5} 
          color="#ffffff" 
        />

        {/* Riflesso Indigo (sinistra) - Richiama i blob dello sfondo */}
        <pointLight 
          position={[-10, 2, 5]} 
          intensity={15} 
          distance={20}
          color="#6366f1" 
        /> 

        {/* Riflesso Fuchsia (destra/basso) - Effetto neon dinamico */}
        <spotLight 
          position={[5, -5, 5]} 
          angle={0.3}
          penumbra={1}
          intensity={10} 
          color="#d946ef" 
        />

        <Suspense fallback={null}>
          <PresentationControls
            global={false}
            cursor={true}
            snap={true}
            speed={1.5}
            zoom={1}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 6, Math.PI / 6]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Float 
              speed={2} 
              rotationIntensity={0.2} 
              floatIntensity={0.5}
            >
              <Model />
            </Float>
          </PresentationControls>
          
          <Environment preset="city" />
          
          {/* Ombra ottimizzata: calcolata 1 volta sola per non pesare sullo scroll */}
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.4} 
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

useGLTF.preload('/tom_morello.glb');