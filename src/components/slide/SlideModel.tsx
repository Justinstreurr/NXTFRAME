"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * The Happy Flops "cloud" slide as procedural geometry, built to the product photos:
 * a thick pillow sole with fine horizontal grooves around its wall, and a wide ribbed band
 * that arches across the forefoot from one sole edge to the other, taller at the toe side
 * and sloping down towards the heel.
 *
 * Axes: x runs along the foot (toe at +x), y is up, z across the foot.
 * The sole is 1 unit long; everything else is sized against that.
 */

/* Catmull-Rom through control points, closed, returned as a dense polygon */
function smoothClosed(pts: [number, number][], per = 12): THREE.Vector2[] {
  const curve = new THREE.CatmullRomCurve3(pts.map(([x, y]) => new THREE.Vector3(x, y, 0)), true, "catmullrom", 0.5);
  return curve.getPoints(pts.length * per).map((p) => new THREE.Vector2(p.x, p.y));
}

/* the footprint, seen from above (x along the foot, "y" here is across it): heel narrower, ball wider, toe round */
const FOOTPRINT: [number, number][] = [
  [-0.5, 0.0], [-0.47, 0.13], [-0.36, 0.18], [-0.12, 0.195], [0.14, 0.225], [0.36, 0.215], [0.48, 0.13], [0.5, 0.0],
  [0.48, -0.13], [0.36, -0.215], [0.14, -0.225], [-0.12, -0.195], [-0.36, -0.18], [-0.47, -0.13],
];

export const SOLE_H = 0.175; // total sole height, measured mid-foot
const SOLE_BEVEL = 0.055; // rounding of the top and bottom rims
const WAIST = 0.022; // how far the wall bows inward between the rims

export function useSoleGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape(smoothClosed(FOOTPRINT));
    const raw = new THREE.ExtrudeGeometry(shape, {
      depth: SOLE_H - 2 * SOLE_BEVEL,
      bevelEnabled: true,
      bevelThickness: SOLE_BEVEL,
      bevelSize: SOLE_BEVEL,
      bevelSegments: 12,
      curveSegments: 24,
    });
    // welded, so the normals are smooth and the waist below moves the wall as one surface
    raw.deleteAttribute("uv"); // no textures, and differing uvs would keep the seams apart
    const g = mergeVertices(raw, 1e-4);
    raw.dispose();
    // extruded along z by default; stand it up so it extrudes along y, bottom at y = 0
    g.rotateX(-Math.PI / 2);
    g.translate(0, SOLE_BEVEL, 0);
    // the wall bows inward between the two rims, moved along the outward normal; then the toe lifts
    // like a rocker: the bottom curves up over the last fifth, the top only a little
    g.computeVertexNormals();
    const pos = g.attributes.position as THREE.BufferAttribute;
    const nrm = g.attributes.normal as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y0 = pos.getY(i);
      const w = WAIST * Math.pow(Math.sin((Math.PI * y0) / SOLE_H), 2);
      const nx = nrm.getX(i), nz = nrm.getZ(i);
      pos.setX(i, pos.getX(i) - nx * w);
      pos.setZ(i, pos.getZ(i) - nz * w);
    }
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const toe = Math.pow(THREE.MathUtils.smoothstep(x, 0.26, 0.5), 1.5);
      const heel = Math.pow(THREE.MathUtils.smoothstep(-x, 0.36, 0.5), 1.5);
      const depth = THREE.MathUtils.clamp(y / SOLE_H, 0, 1); // 0 at the bottom, 1 at the top
      const lift = (0.08 * toe + 0.02 * heel) * THREE.MathUtils.lerp(1, 0.45, depth);
      pos.setY(i, y + lift);
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);
}

/* the band: where it sits along the foot, its half width, its height at the toe and heel edges, thickness */
const STRAP_X0 = -0.06; // heel-side edge, where the foot goes in
const STRAP_X1 = 0.28; // toe-side edge
const STRAP_A = 0.19; // half width across the foot: narrower than the sole, the band lands on the top surface
const STRAP_H_TOE = 0.075; // height above the sole top at the toe-side edge
const STRAP_H_HEEL = 0.145; // and at the heel-side edge, the tall open end
const BOXY = 3.0; // superellipse exponent of the arch: 2 is a half ellipse, higher is flatter on top with straighter sides
const STRAP_T = 0.04; // wall thickness
const SINK = 0.015; // how deep the ends sink into the sole top
const LEAN = -0.05; // the band leans a touch towards the heel as it rises
const EDGE_R = 0.04; // rounding of the front and back edges

const sgnPow = (v: number) => Math.sign(v) * Math.pow(Math.abs(v), 2 / BOXY);

export function useStrapGeometry() {
  return useMemo(() => {
    // profile across the foot, in (z, y) with y relative to the sole top: a thick half ellipse, open at the bottom
    const a = STRAP_A, b = Math.max(STRAP_H_TOE, STRAP_H_HEEL) + SINK, t = STRAP_T, n = 40;
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= n; i++) {
      const th = (i / n) * Math.PI;
      pts.push(new THREE.Vector2(a * sgnPow(Math.cos(th)), b * sgnPow(Math.sin(th)) - SINK));
    }
    for (let i = n; i >= 0; i--) {
      const th = (i / n) * Math.PI;
      pts.push(new THREE.Vector2((a - t) * sgnPow(Math.cos(th)), (b - t) * sgnPow(Math.sin(th)) - SINK));
    }
    const L = STRAP_X1 - STRAP_X0;
    const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts), {
      depth: L - 2 * EDGE_R,
      bevelEnabled: true,
      bevelThickness: EDGE_R,
      bevelSize: EDGE_R * 0.9,
      bevelSegments: 5,
      curveSegments: 8,
    });
    // extruded along its own z: turn that into the foot's x, heel-side edge at STRAP_X0
    g.rotateY(Math.PI / 2);
    g.translate(STRAP_X0 + EDGE_R, 0, 0);
    // taper: tall at the heel side, low at the toe side, and a lean towards the heel
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const u = THREE.MathUtils.clamp((x - STRAP_X0) / L, 0, 1);
      // the top edge bows up a little between the two ends
      const k = ((THREE.MathUtils.lerp(STRAP_H_HEEL, STRAP_H_TOE, u) + SINK) / b) * (1 + 0.1 * Math.sin(u * Math.PI));
      const yy = (y + SINK) * k - SINK;
      pos.setXYZ(i, x + Math.max(0, yy) * LEAN, yy + SOLE_H, pos.getZ(i));
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);
}

/**
 * Matte EVA foam in the sage green of the reference, with grooves added in the shader:
 * `ribs: "sole"` cuts fine horizontal grooves into the sole wall;
 * `ribs: "strap"` cuts ridges that run across the band from one sole edge to the other.
 */
export function useFoamMaterial(ribs: "sole" | "strap", color = "#93aa8c") {
  return useMemo(() => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: 0.66, metalness: 0 });
    m.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
        .replace("#include <worldpos_vertex>", "#include <worldpos_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;");
      const perturb =
        ribs === "sole"
          ? `
            // horizontal grooves around the wall, on steep faces only, fading out near the top edge
            float wall = 1.0 - abs(normal.y);
            float rim = 1.0 - smoothstep(0.12, 0.165, vWPos.y);
            float g = sin(vWPos.y * 380.0);
            normal = normalize(normal + vec3(0.0, g * 0.5 * wall * wall * rim, 0.0));`
          : `
            // ridges running over the arch: spaced along the foot, not on the front and back edges
            float side = 1.0 - abs(normal.x);
            float g = sin(vWPos.x * 520.0);
            normal = normalize(normal + vec3(g * 1.1 * side, 0.0, 0.0));`;
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
        .replace("#include <normal_fragment_maps>", "#include <normal_fragment_maps>" + perturb);
    };
    return m;
  }, [ribs, color]);
}

export function Slide({ color = "#93aa8c" }: { color?: string }) {
  const sole = useSoleGeometry();
  const strap = useStrapGeometry();
  const soleMat = useFoamMaterial("sole", color);
  const strapMat = useFoamMaterial("strap", color);
  return (
    <group>
      <mesh geometry={sole} material={soleMat} castShadow receiveShadow />
      <mesh geometry={strap} material={strapMat} castShadow receiveShadow />
    </group>
  );
}
