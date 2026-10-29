"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Slide } from "./SlideModel";

/**
 * Test bench for the slide: one fixed camera per view, chosen with ?view=side|angle|top|pair,
 * so headless screenshots can be laid next to the product photos.
 */
const views: Record<string, { pos: [number, number, number]; look: [number, number, number]; fov: number }> = {
  side: { pos: [0, 0.16, -3.2], look: [0, 0.14, 0], fov: 20 },
  angle: { pos: [2.3, 1.5, -1.7], look: [0, 0.1, 0], fov: 20 },
  top: { pos: [0.4, 3.2, 0.9], look: [0, 0, 0], fov: 20 },
  front: { pos: [3.2, 0.6, 0.2], look: [0, 0.15, 0], fov: 20 },
  orbit: { pos: [2.1, 1.2, -1.9], look: [0, 0.12, 0], fov: 22 },
};

export default function SlideLab({ view = "side", pair = false }: { view?: string; pair?: boolean }) {
  const v = views[view] ?? views.side;
  return (
    <Canvas
      dpr={1}
      camera={{ fov: v.fov, near: 0.1, far: 50, position: v.pos }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      shadows={{ type: THREE.PCFSoftShadowMap }}
      onCreated={({ camera }) => camera.lookAt(...v.look)}
      style={{ width: "100%", height: "100%", background: "#f4f4f2" }}
    >
      <hemisphereLight args={["#ffffff", "#d9d6cf", 1.1]} />
      <directionalLight position={[-2.5, 4, 3]} intensity={2.2} color="#fffaf3" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[3, 2, -2]} intensity={0.6} color="#eef2ff" />
      <directionalLight position={[1, 1.5, 4]} intensity={0.5} color="#ffffff" />
      {pair ? (
        <>
          <group position={[0.05, 0, -0.34]} rotation={[0, 0.12, 0]}>
            <Slide />
          </group>
          <group position={[-0.1, 0, 0.3]} rotation={[0, -0.1, 0]} scale={[1, 1, -1]}>
            <Slide />
          </group>
        </>
      ) : (
        <Slide />
      )}
      {view === "orbit" && <OrbitControls target={[0, 0.12, 0]} enablePan={false} minDistance={1.6} maxDistance={5} autoRotate autoRotateSpeed={0.8} />}
      <ContactShadows frames={1} position={[0, 0.001, 0]} opacity={0.35} scale={4} blur={1.8} far={1} color="#2a3a2a" />
    </Canvas>
  );
}
