"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, PresentationControls, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

function Model() {
  const { scene: rawScene } = useGLTF('/black_piano.glb');
  const scene = useMemo(() => rawScene, [rawScene]);
  const groupRef = useRef<THREE.Group>(null);
  const baseYRef = useRef(0);

  useGSAP(() => {
    if (!groupRef.current) return;

    const materials: THREE.Material[] = [];
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const meshMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        meshMaterials.forEach((material) => {
          if (!material) return;
          material.transparent = true;
          (material as THREE.Material & { opacity?: number }).opacity = 0;
          materials.push(material);
        });
      }
    });

    const tl = gsap.timeline();
    tl.fromTo(
      groupRef.current.position,
      { y: -0.5 },
      { y: 0, duration: 1.5, ease: 'power3.out' },
      0
    )
      .fromTo(
        groupRef.current.scale,
        { x: 0.9, y: 0.9, z: 0.9 },
        { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power3.out' },
        0
      )
      .fromTo(materials, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.1);
  }, { scope: groupRef, dependencies: [scene] });

  // Animazione di galleggiamento (floating)
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Galleggiamento millimetrico
    groupRef.current.position.y = baseYRef.current + Math.sin(t * 0.8) * 0.1;
  });
  
  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        rotation={[0, 0.5, 0]}  // ROTAZIONE ORIGINALE
      />
    </group>
  );
}

useGLTF.preload('/black_piano.glb');

export default function PianoModel({
  bp1600,
  bp1245,
  bp919,
  bpMobile,
}: {
  bp1600?: { scale?: number; posX?: number; posY?: number };
  bp1245?: { scale?: number; posX?: number; posY?: number };
  bp919?: { scale?: number; posX?: number; posY?: number };
  bpMobile?: { scale?: number; posX?: number; posY?: number };
} = {}) {
  const { viewport, size } = useThree();

  let currentScale = 0.35; // NOTA: Cursor, adatta questo valore base se il piano o la chitarra sono nativamente molto più grandi o piccoli
  let posX = 0;
  let posY = 0;

  if (size.width >= 1600) {
    currentScale = bp1600?.scale ?? 1.6;
    posX = bp1600?.posX ?? viewport.width * 0.05;
    posY = bp1600?.posY ?? -1.0;
  } else if (size.width >= 1245) {
    currentScale = bp1245?.scale ?? 1.4;
    posX = bp1245?.posX ?? viewport.width * 0.03;
    posY = bp1245?.posY ?? -1.0;
  } else if (size.width >= 919) {
    currentScale = bp919?.scale ?? 1.0;
    posX = bp919?.posX ?? viewport.width * 0.05;
    posY = bp919?.posY ?? -0.8;
  } else {
    currentScale = bpMobile?.scale ?? 0.25;
    posX = bpMobile?.posX ?? 0;
    posY = bpMobile?.posY ?? -viewport.height * 0.15;
  }

  return (
    <>
      <ambientLight intensity={0.7} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />

      <group position={[posX, posY, 0]} scale={currentScale}>
        <PresentationControls
          global={true}
          cursor={true}
          snap={true}
          speed={1}
          zoom={1}
          rotation={[0, -0.5, 0]}
          polar={[-0.05, 0.05]}
          azimuth={[-0.4, 0.4]}
        >
          <Model />
        </PresentationControls>
      </group>
      <Environment preset="city" />
      {/* Anche l'ombra deve essere abbassata per seguire il piano */}
      <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </>
  );
}