"use client";
/* eslint-disable react-hooks/immutability -- the frame loop mutates three.js objects and motion refs by design */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { bracketOutline, chevronOutline, handOutline, limbGeometry, pillowGeometry } from "./geometry";

/**
 * The NXT Frame mascot as a real 3D character: four pillow-soft corner brackets,
 * the "next" chevron as its face, tube limbs and little frame corners for hands.
 *
 * Poses: "point" (hero: points at the CTA, follows the cursor), "wave" (footer),
 * "walk" (driven by a `motion` ref: heading, speed and stride phase from scrolling),
 * "push" (same motion ref, but both arms out in front and the body leaning into the push).
 *
 * Colours come from the hero palette tokens on `paletteEl` (`--hp-brand` for the body
 * and hands, `--hp-btn-fg` for chevron and limbs) and ease whenever the theme switches.
 */

export type MascotPose = "point" | "wave" | "walk" | "push";
export type MascotMotion = { heading: number; speed: number; phase: number }; // heading: 1 right, -1 left, near 0 faces the visitor

// real colours (three.js cannot parse CSS variables): the green palette the hero opens in
const BODY_FALLBACK = "#dafc92";
const INK_FALLBACK = "#02261e";

function readVar(el: HTMLElement | null, name: string, fallback: string) {
  if (!el) return fallback;
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  return raw || fallback;
}

type CharacterProps = {
  paletteEl: HTMLElement | null;
  pointer: React.MutableRefObject<{ x: number; y: number } | null>;
  interactive: boolean;
  pose: MascotPose;
  motion?: React.MutableRefObject<MascotMotion>;
};

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function Character({ paletteEl, pointer, interactive, pose, motion }: CharacterProps) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);

  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: BODY_FALLBACK,
        roughness: 0.55,
        metalness: 0,
        clearcoat: 0.35,
        clearcoatRoughness: 0.6,
        sheen: 0.3,
        sheenRoughness: 0.8,
      }),
    [],
  );
  const inkMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: INK_FALLBACK,
        roughness: 0.42,
        metalness: 0,
        clearcoat: 0.7,
        clearcoatRoughness: 0.35,
      }),
    [],
  );

  // theme colours: re-read when the palette attributes on <html> change
  const target = useRef({ body: new THREE.Color(BODY_FALLBACK), ink: new THREE.Color(INK_FALLBACK) });
  useEffect(() => {
    const sync = () => {
      target.current.body.set(readVar(paletteEl, "--hp-brand", BODY_FALLBACK));
      target.current.ink.set(readVar(paletteEl, "--hp-btn-fg", INK_FALLBACK));
    };
    sync();
    // first paint in the right colours straight away; later palette changes ease in the frame loop
    bodyMat.color.copy(target.current.body);
    inkMat.color.copy(target.current.ink);
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true });
    return () => mo.disconnect();
  }, [paletteEl, bodyMat, inkMat]);

  // geometry (arms depend on the pose)
  const g = useMemo(() => {
    const bracket = pillowGeometry(bracketOutline(), { depth: 0.16, bevel: 0.12, bevelSegments: 12 });
    const chevron = pillowGeometry(chevronOutline(), { depth: 0.08, bevel: 0.1, bevelSegments: 12 });
    const hand = pillowGeometry(handOutline(), { depth: 0.08, bevel: 0.08, bevelSegments: 10 });
    const r = 0.18;
    const shoulderL = V(-0.84, -0.42, -0.1);
    const shoulderR = V(0.84, -0.42, -0.1);
    const hangL = { pts: [shoulderL, V(-1.12, -0.66, -0.16), V(-1.26, -0.98, -0.02)], hand: { p: [-1.39, -1.25, 0.08], rz: 0.36 } };
    const hangR = { pts: [shoulderR, V(1.12, -0.66, -0.16), V(1.26, -0.98, -0.02)], hand: { p: [1.39, -1.25, 0.08], rz: Math.PI / 2 - 0.36 } };
    const pointR = { pts: [V(0.82, -0.3, 0.12), V(1.16, -0.3, 0.28), V(1.46, -0.26, 0.42)], hand: { p: [1.78, -0.22, 0.5], rz: 2.48 } };
    const waveL = { pts: [V(-0.84, -0.4, -0.1), V(-1.18, -0.12, -0.08), V(-1.28, 0.42, 0.06)], hand: { p: [-1.46, 0.62, 0.1], rz: -Math.PI / 2 + 0.2 } };
    // push: both arms reach out to -x (the side the mascot pushes towards), the right one across the chest
    const pushL = { pts: [shoulderL, V(-1.22, -0.5, 0.14), V(-1.64, -0.56, 0.3)], hand: { p: [-1.94, -0.6, 0.36], rz: 0.36 } };
    const pushR = { pts: [shoulderR, V(0.5, -0.68, 0.5), V(-0.18, -0.74, 0.62)], hand: { p: [-0.52, -0.78, 0.66], rz: 0.36 } };
    const left = pose === "wave" ? waveL : pose === "push" ? pushL : hangL;
    const right = pose === "point" ? pointR : pose === "push" ? pushR : hangR;
    const armLeft = limbGeometry(left.pts, r);
    const armRight = limbGeometry(right.pts, r);
    const hipL = V(-0.48, -0.92, -0.05);
    const hipR = V(0.42, -0.92, 0.02);
    const legLeft = limbGeometry([hipL, V(-0.74, -1.32, -0.1), V(-0.86, -1.66, 0.02)], 0.19);
    const legRight = limbGeometry([hipR, V(0.56, -1.3, 0.1), V(0.64, -1.66, 0.16)], 0.19);
    return { bracket, chevron, hand, r, left, right, armLeft, armRight, hipL, hipR, legLeft, legRight };
  }, [pose]);

  const smooth = useRef({ rx: 0, ry: 0, stride: 0 });

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const k = 1 - Math.pow(0.001, dt); // frame-rate independent easing
    bodyMat.color.lerp(target.current.body, k * 0.9);
    inkMat.color.lerp(target.current.ink, k * 0.9);
    // lift dark limbs so they read warm; light inks (white on the Aanpak path) get no lift
    const lum = 0.2126 * inkMat.color.r + 0.7152 * inkMat.color.g + 0.0722 * inkMat.color.b;
    inkMat.emissive.copy(inkMat.color).multiplyScalar(0.3 * (1 - lum));

    if ((pose === "walk" || pose === "push") && motion) {
      const push = pose === "push";
      // stride amplitude follows scroll speed and settles when scrolling stops
      const { speed, phase: ph, heading } = motion.current;
      const wantStride = Math.min(1, speed);
      smooth.current.stride += (wantStride - smooth.current.stride) * k * 0.7;
      motion.current.speed = speed * (1 - k * 0.55);
      const s = smooth.current.stride;
      if (root.current) root.current.position.y = Math.abs(Math.sin(ph)) * 0.08 * s;
      if (body.current) {
        // walking: turns the way it goes; pushing: stays mostly towards the visitor and leans into the push
        const ty = heading * (push ? 0.35 : 0.85);
        smooth.current.ry += (ty - smooth.current.ry) * k * 0.5;
        const lean = push ? -heading * 0.24 * (0.45 + 0.55 * s) : 0;
        body.current.rotation.set(0.06 * s, smooth.current.ry, lean - 0.03 * s * heading);
      }
      if (legL.current) legL.current.rotation.x = Math.sin(ph) * 0.75 * s;
      if (legR.current) legR.current.rotation.x = Math.sin(ph + Math.PI) * 0.75 * s;
      if (push) {
        // arms stay out in front, with a small pump in step with the legs
        if (armL.current) armL.current.rotation.z = Math.sin(ph * 2) * 0.05 * s;
        if (armR.current) armR.current.rotation.z = Math.sin(ph * 2 + 1) * 0.04 * s;
      } else {
        if (armL.current) armL.current.rotation.x = Math.sin(ph + Math.PI) * 0.5 * s;
        if (armR.current) armR.current.rotation.x = Math.sin(ph) * 0.5 * s;
      }
      return;
    }

    if (root.current) root.current.position.y = Math.sin(t * 1.7) * 0.045;
    if (body.current) {
      const p = interactive ? pointer.current : null;
      const ty = p ? (p.x - 0.5) * 0.9 : 0.08;
      const tx = p ? (p.y - 0.5) * 0.35 : 0.05;
      smooth.current.ry += (ty - smooth.current.ry) * k * 0.6;
      smooth.current.rx += (tx - smooth.current.rx) * k * 0.6;
      body.current.rotation.set(smooth.current.rx, smooth.current.ry, -0.06 + Math.sin(t * 1.7) * 0.01);
    }
    if (pose === "wave") {
      if (armL.current) armL.current.rotation.z = Math.sin(t * 5.2) * 0.22;
      if (armR.current) armR.current.rotation.z = Math.sin(t * 1.9 + 1) * 0.03;
    } else {
      if (armR.current) {
        armR.current.rotation.z = Math.sin(t * 2.3) * 0.05;
        armR.current.rotation.y = Math.sin(t * 1.1) * 0.04;
      }
      if (armL.current) armL.current.rotation.z = Math.sin(t * 1.9 + 1) * 0.03;
    }
  });

  const sphere = (p: THREE.Vector3, rad: number, mat: THREE.Material) => (
    <mesh position={p} material={mat} castShadow>
      <sphereGeometry args={[rad, 24, 24]} />
    </mesh>
  );

  // a limb group pivoting at `pivot`: children are authored in body space
  const pivotGroup = (ref: React.RefObject<THREE.Group | null>, pivot: THREE.Vector3, children: React.ReactNode) => (
    <group ref={ref} position={pivot}>
      <group position={[-pivot.x, -pivot.y, -pivot.z]}>{children}</group>
    </group>
  );

  return (
    <group ref={root} position={[0, 0.25, 0]}>
      <group ref={body}>
        {/* body brackets: the same top-left slab rotated around the centre */}
        {[0, -Math.PI / 2, Math.PI, Math.PI / 2].map((rz, i) => (
          <mesh key={i} geometry={g.bracket} material={bodyMat} rotation={[0, 0, rz]} castShadow />
        ))}
        {/* chevron face, sits slightly proud of the body */}
        <mesh geometry={g.chevron} material={inkMat} position={[0.02, 0, 0.1]} castShadow />

        {/* arms, pivoting at the shoulders; hands are frame corners */}
        {pivotGroup(
          armL,
          g.left.pts[0],
          <>
            <mesh geometry={g.armLeft.tube} material={inkMat} castShadow />
            {sphere(g.armLeft.start, g.r, inkMat)}
            {sphere(g.armLeft.end, g.r, inkMat)}
            <mesh geometry={g.hand} material={bodyMat} position={g.left.hand.p as [number, number, number]} rotation={[0, 0, g.left.hand.rz]} castShadow />
          </>,
        )}
        {pivotGroup(
          armR,
          g.right.pts[0],
          <>
            <mesh geometry={g.armRight.tube} material={inkMat} castShadow />
            {sphere(g.armRight.start, g.r, inkMat)}
            {sphere(g.armRight.end, g.r, inkMat)}
            <mesh geometry={g.hand} material={bodyMat} position={g.right.hand.p as [number, number, number]} rotation={[0, 0, g.right.hand.rz]} castShadow />
          </>,
        )}

        {/* legs, pivoting at the hips, with chunky feet */}
        {pivotGroup(
          legL,
          g.hipL,
          <>
            <mesh geometry={g.legLeft.tube} material={inkMat} castShadow />
            {sphere(g.legLeft.start, 0.19, inkMat)}
            <mesh position={[-0.94, -1.76, 0.1]} rotation={[0, 0.5, 0]} scale={[1.5, 0.9, 1.15]} material={inkMat} castShadow>
              <sphereGeometry args={[0.28, 28, 24]} />
            </mesh>
          </>,
        )}
        {pivotGroup(
          legR,
          g.hipR,
          <>
            <mesh geometry={g.legRight.tube} material={inkMat} castShadow />
            {sphere(g.legRight.start, 0.19, inkMat)}
            <mesh position={[0.72, -1.78, 0.24]} rotation={[0, -0.35, 0]} scale={[1.5, 0.9, 1.15]} material={inkMat} castShadow>
              <sphereGeometry args={[0.28, 28, 24]} />
            </mesh>
          </>,
        )}
      </group>
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0.15, 0.55, 8.6);
    camera.lookAt(0.15, -0.35, 0);
  }, [camera]);
  return null;
}

export default function Mascot3D({
  paletteEl,
  interactive = true,
  pose = "point",
  motion,
  className = "",
}: {
  paletteEl: HTMLElement | null;
  interactive?: boolean;
  pose?: MascotPose;
  motion?: React.MutableRefObject<MascotMotion>;
  className?: string;
}) {
  const pointer = useRef<{ x: number; y: number } | null>(null);
  // fade the canvas in once WebGL is up, instead of popping into the page
  const [ready, setReady] = useState(false);
  // Only draw while the mascot is near the screen. Several of these live on one page, and a
  // scene that keeps rendering off screen costs as much as one you can see.
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!paletteEl) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: "160px 0px" });
    io.observe(paletteEl);
    return () => io.disconnect();
  }, [paletteEl]);
  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive]);

  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      frameloop={live ? "always" : "never"}
      camera={{ fov: 26, near: 0.1, far: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      flat
      shadows={{ type: THREE.PCFShadowMap }}
      style={{ background: "transparent", opacity: ready ? 1 : 0, transition: "opacity 600ms ease" }}
      onCreated={() => setReady(true)}
    >
      <Rig />
      {/* soft studio lighting: warm key from top-left, cool fill from the right, rim from behind */}
      <hemisphereLight args={["#ffffff", "#efe3dd", 1.4]} />
      <directionalLight position={[-3, 5, 6]} intensity={1.9} color="#fff8f0" castShadow shadow-mapSize={[512, 512]} />
      <directionalLight position={[4, 2, 4]} intensity={0.7} color="#f6f2ff" />
      <directionalLight position={[0, 3, -5]} intensity={0.5} color="#ffffff" />
      <Character paletteEl={paletteEl} pointer={pointer} interactive={interactive} pose={pose} motion={motion} />
      {/* baked once: a soft blob under the feet does not need re-rendering every frame */}
      <ContactShadows frames={1} position={[0, -1.66, 0]} opacity={0.2} scale={6} blur={2.6} far={2.2} color={INK_FALLBACK} />
    </Canvas>
  );
}
