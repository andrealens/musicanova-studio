"use client";
import React, { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF, Float, Environment, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

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
      rotation={[0, -0.2, 0]} 
    />
  );
}

useGLTF.preload('/guitar.glb');

export default function GuitarScene() {
  const { viewport, size } = useThree();

  let currentScale = 0.35; // NOTA: Cursor, adatta questo valore base se il piano o la chitarra sono nativamente molto più grandi o piccoli
  let posX = 0;
  let posY = 0;

  if (size.width >= 1600) {
    currentScale = 0.75;
    posX = viewport.width * 0.15;
    posY = -2.55;
  } else if (size.width >= 1366) {
    currentScale = 0.65;
    posX = viewport.width * 0.15;
    posY = -2.55;
  } else if (size.width >= 1024) {
    currentScale = 0.45;
    posX = viewport.width * 0.15;
    posY = -2.00;
  } else {
    currentScale = 0.25;
    posX = 0;
    posY = -viewport.height * 0.15;
  }

  return (
    <>
      <ambientLight intensity={0.8} /> {/* LUCE AMBIENTE ALZATA */}
      <spotLight position={[10, 10, 10]} angle={0.15} intensity={15} penumbra={1} />
      <pointLight position={[-10, 0, -10]} intensity={5} color="#6366f1" />

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
          <group position={[posX, posY, 0]} scale={currentScale}>
            <Model />
          </group>
        </Float>
      </PresentationControls>
      <Environment preset="city" />
      <ContactShadows position={[3.0, -4.5, 0]} opacity={0.4} scale={10} blur={2.5} />
    </>
  );
}