"use client";
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/cassette_tape.glb');

function Model() {
  const { scene } = useGLTF('/cassette_tape.glb');
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Fluttuazione minima ed elegante
    groupRef.current.position.y = Math.sin(t * 1.0) * 0.015;
  });

  return (
    <group ref={groupRef}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

export default function CassetteModel() {
  const { viewport, size } = useThree();

  let currentScale = 0.35;
  let posX = 0;
  let posY = 0;

  if (size.width >= 1600) {
    // Desktop Grande
    currentScale = 0.40;
    posX = viewport.width * 0.20;
    posY = -0.05;
  } else if (size.width >= 1366) {
    // Desktop Medio/Laptop (es. 1598px) - Spostata leggermente più a sinistra
    currentScale = 0.32;
    posX = viewport.width * 0.20;
    posY = -0.05;
  } else if (size.width >= 1024) {
    // Tablet orizzontale / Laptop piccoli
    currentScale = 0.28;
    posX = viewport.width * 0.20;
    posY = -0.05;
  } else {
    // Mobile
    currentScale = 0.25;
    posX = 0;
    posY = -viewport.height * 0.15;
  }

  return (
    <group position={[posX, posY, 0]} scale={currentScale}>
      <Model />
    </group>
  );
}