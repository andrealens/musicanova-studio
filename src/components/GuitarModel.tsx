"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, PresentationControls, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

function Model() {
  const { scene: rawScene } = useGLTF('/guitar.glb');
  const groupRef = useRef<THREE.Group>(null);
  const baseYRef = useRef(0);

  /*
   * useMemo con [rawScene] come dipendenza:
   * - Gira UNA sola volta al mount (o se il GLB cambia, cosa che non accade)
   * - Ritorna la scena con i materiali già processati e stabili
   * - I riferimenti ai materiali non cambiano tra render → GSAP anima
   *   gli oggetti giusti, non fantasmi già sostituiti
   *
   * Perché NON usiamo scene.clone():
   * PianoModel funziona senza clone() e questo va bene perché
   * il processing avviene dentro useMemo. Clonare la scena crea
   * nuovi oggetti ad ogni call di useMemo — stessa instabilità,
   * solo spostata. Se useGLTF.preload() è attivo, la scena è
   * già in cache e condivisa: il clone non è necessario.
   */
  const scene = useMemo(() => {
    rawScene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      if (!mesh.material) return;

      // Cloniamo il materiale (non la scena) per evitare mutazioni globali
      // che potrebbero impattare altri consumer dello stesso GLB
      const mat = (mesh.material as THREE.MeshStandardMaterial).clone();

      // Rendering su entrambi i lati — salva mesh con normali invertiti
      mat.side = THREE.DoubleSide;

      // Risolve trasparenza non voluta su materiali già trasparenti nel GLB
      if (mat.transparent) {
        mat.alphaTest = 0.5;
      }

      // Boost materiali metallici (ponte, meccaniche, tasti)
      if (mat.name.toLowerCase().includes('metal') || mat.metalness > 0.5) {
        mat.metalness = 0.9;
        mat.roughness = 0.15;
        mat.envMapIntensity = 2.5;
      } else {
        mat.roughness = 0.3;
        mat.envMapIntensity = 1.5;
      }

      mesh.material = mat;
    });

    return rawScene;
  }, [rawScene]);

  /*
   * useGSAP con [scene] come dipendenza:
   * - "scene" ora è stabile (viene dall'useMemo sopra)
   * - I materiali raccolti qui sono gli stessi che Three.js sta usando
   * - L'animazione opacity 0→1 funziona perché i riferimenti non cambiano
   */
  useGSAP(() => {
    if (!groupRef.current) return;

    const materials: THREE.Material[] = [];
    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      const meshMaterials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      meshMaterials.forEach((material) => {
        if (!material) return;
        material.transparent = true;
        (material as THREE.MeshStandardMaterial).opacity = 0;
        materials.push(material);
      });
    });

    gsap
      .timeline()
      .fromTo(
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
      .fromTo(
        materials,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' },
        0.1
      );
  }, { scope: groupRef, dependencies: [scene] });

  // Floating millimetrico — identico a PianoModel
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = baseYRef.current + Math.sin(t * 0.8) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} rotation={[0, -0.2, 0]} />
    </group>
  );
}

useGLTF.preload('/guitar.glb');

export default function GuitarScene() {
  const { viewport, size } = useThree();

  // Breakpoint identici a PianoModel — adatta i valori numerici al tuo gusto visivo
  let currentScale = 0.35;
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
      <ambientLight intensity={0.8} />
      <spotLight position={[10, 10, 10]} angle={0.15} intensity={15} penumbra={1} />
      <pointLight position={[-10, 0, -10]} intensity={5} color="#6366f1" />

      {/*
       * Struttura identica a PianoModel: group esterno per posizione/scala,
       * PresentationControls dentro, Model dentro i controls.
       * Float rimosso: era dentro PresentationControls e interferiva con
       * il useFrame floating del Model. Ora il floating è gestito solo
       * da useFrame in Model, come in PianoModel.
       */}
      <group position={[posX, posY, 0]} scale={currentScale}>
        <PresentationControls
          global={true}
          cursor={true}
          snap={true}
          speed={1.5}
          zoom={1}
          polar={[-Math.PI / 6, Math.PI / 6]}
          azimuth={[-Math.PI / 5, Math.PI / 5]}
        >
          <Model />
        </PresentationControls>
      </group>

      <Environment preset="city" />
      <ContactShadows
        position={[posX, posY - currentScale * 3.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
      />
    </>
  );
}