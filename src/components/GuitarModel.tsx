"use client";
import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float, Environment, PresentationControls, ContactShadows } from '@react-three/drei';
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
  const { scene: rawScene } = useGLTF('/guitar.glb');
  const scene = useMemo(() => rawScene.clone(), [rawScene]);
  
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        // Cloniamo il materiale per evitare mutazioni globali
        const material = (mesh.material as THREE.MeshStandardMaterial).clone();
        
        // Forziamo il rendering su entrambi i lati (salva la mesh se i normals sono invertiti o i piani monodimensionali)
        material.side = THREE.DoubleSide;
        
        // Risolve bug di trasparenza non voluta
        if (material.transparent) {
          material.alphaTest = 0.5;
        }
        
        // Boost ai materiali metallici per far staccare visivamente ponte e meccaniche
        if (material.name.toLowerCase().includes('metal') || material.metalness > 0.5) {
          material.metalness = 0.9;
          material.roughness = 0.15;
          material.envMapIntensity = 2.5; 
        } else {
          material.roughness = 0.3;
          material.envMapIntensity = 1.5;
        }
        
        mesh.material = material;
      }
    }
  });

  return (
    <primitive 
      object={scene} 
      scale={0.9} 
      position={[3.0, -2.2, 0]} 
      rotation={[0, -0.2, 0]} 
    />
  );
}

useGLTF.preload('/guitar.glb');

export default function GuitarScene() {
  const isScrolling = useScrollIdle();
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        rendererRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ pointerEvents: isScrolling ? 'none' : 'auto' }}
    >
      <Canvas
        onCreated={({ gl }) => { rendererRef.current = gl; }}
        frameloop={isScrolling ? 'never' : 'always'}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 16], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <ambientLight intensity={0.8} /> {/* LUCE AMBIENTE ALZATA */}
        <spotLight position={[10, 10, 10]} angle={0.15} intensity={15} penumbra={1} />
        <pointLight position={[-10, 0, -10]} intensity={5} color="#6366f1" />

        <Suspense fallback={null}>
          <PresentationControls
            global={true} // Fondamentale per ruotare ovunque
            cursor={true}
            snap={true}
            speed={1.5}
            zoom={1}
            polar={[-Math.PI / 6, Math.PI / 6]}
            azimuth={[-Math.PI / 5, Math.PI / 5]}
          >
            <Float speed={4} rotationIntensity={0.6} floatIntensity={1.5}>
              <Model />
            </Float>
          </PresentationControls>
          <Environment preset="city" /> 
          <ContactShadows position={[3.0, -4.5, 0]} opacity={0.4} scale={10} blur={2.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}