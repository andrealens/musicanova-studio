"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Musigramma() {
  const ref = useRef<THREE.Object3D | null>(null);
  const { scene } = useGLTF("/musigramma_materials.glb");

  useMemo(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      const material = child.material;
      if (!material) return;

      const materials = Array.isArray(material) ? material : [material];
      materials.forEach((mat) => {
        if (!(mat instanceof THREE.MeshStandardMaterial)) return;

        if (mat.color && mat.color.r < 0.05) {
          mat.metalness = 0.85;
          mat.roughness = 0.2;
        } else if (mat.color && mat.color.r > 0.9 && mat.color.g > 0.9) {
          mat.metalness = 0.1;
          mat.roughness = 0.15;
        } else {
          mat.metalness = 0.2;
          mat.roughness = 0.35;
        }

        mat.envMapIntensity = 1.4;
      });
    });
  }, [scene]);

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.004;
    ref.current.rotation.x += (mouse.y * 0.25 - ref.current.rotation.x) * 0.04;
    ref.current.rotation.z += (-mouse.x * 0.12 - ref.current.rotation.z) * 0.04;
  });

  return <primitive ref={ref} object={scene} scale={0.35} position={[0, -0.4, 0]} />;
}

function Lights() {
  const l1 = useRef<THREE.PointLight | null>(null);
  const l2 = useRef<THREE.PointLight | null>(null);
  const l3 = useRef<THREE.PointLight | null>(null);
  const l4 = useRef<THREE.PointLight | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (l1.current) {
      l1.current.position.x = Math.sin(t * 0.6) * 3;
      l1.current.position.z = Math.cos(t * 0.6) * 3;
      l1.current.lookAt(0, 0, 0);
    }

    if (l2.current) {
      l2.current.position.x = Math.sin(t * 0.4 + 2) * 2.2;
      l2.current.position.z = Math.cos(t * 0.4 + 2) * 2.2;
      l2.current.lookAt(0, 0, 0);
    }

    if (l3.current) {
      l3.current.lookAt(0, 0, 0);
    }

    if (l4.current) {
      l4.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} color="#1a2240" />
      <pointLight ref={l1} color="#aaccff" intensity={4} distance={18} position={[4, 3, 3]} />
      <pointLight ref={l2} color="#ffaa44" intensity={2.5} distance={14} position={[-3, -2, 2]} />
      <pointLight ref={l3} color="#ffffff" intensity={1.2} distance={20} position={[0, 6, 0]} />
      <pointLight ref={l4} color="#4466ff" intensity={1} distance={10} position={[0, -3, -1]} />
    </>
  );
}

function Particles({ count = 220 }: { count?: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 1) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  return (
    <points>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial color="#6699ff" size={0.035} transparent opacity={0.4} />
    </points>
  );
}

export default function MusigrammaModel() {
  return (
    <div style={{ width: "100%", height: "100%", touchAction: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        shadows
        style={{ width: "100%", height: "100%", touchAction: "none" }}
      >
        <Lights />
        <OrbitControls autoRotate={true} autoRotateSpeed={0.5} enablePan={false} enableZoom={false} />
        <Particles count={220} />
        <Suspense fallback={null}>
          <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.25}>
            <Musigramma />
          </Float>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/musigramma_materials.glb");
