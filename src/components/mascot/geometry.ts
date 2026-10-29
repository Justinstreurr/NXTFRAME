import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * Geometry helpers for the NXT Frame mascot.
 *
 * The body brackets and the chevron are "pillow slabs": a 2D stroke outline (round caps,
 * round joins) extruded with a big quarter-circle bevel so every edge is soft, like the
 * matte vinyl-toy look of the reference render. Limbs are tubes with sphere caps.
 */

export type V2 = [number, number];

const v = (a: V2, b: V2, s = 1): V2 => [a[0] + b[0] * s, a[1] + b[1] * s];
const sub = (a: V2, b: V2): V2 => [a[0] - b[0], a[1] - b[1]];
const len = (a: V2) => Math.hypot(a[0], a[1]);
const norm = (a: V2): V2 => {
  const l = len(a) || 1;
  return [a[0] / l, a[1] / l];
};
const left = (d: V2): V2 => [-d[1], d[0]];
const cross = (a: V2, b: V2) => a[0] * b[1] - a[1] * b[0];
const ang = (a: V2) => Math.atan2(a[1], a[0]);

/** Replace every interior corner of a polyline with an arc of radius r. */
export function roundPolyline(pts: V2[], r: number, segs = 10): V2[] {
  if (pts.length < 3 || r <= 0) return pts;
  const out: V2[] = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const d1 = norm(sub(p, pts[i - 1]));
    const d2 = norm(sub(pts[i + 1], p));
    const turn = Math.acos(Math.max(-1, Math.min(1, d1[0] * d2[0] + d1[1] * d2[1])));
    if (turn < 1e-4) {
      out.push(p);
      continue;
    }
    const t = r * Math.tan(turn / 2);
    const s: V2 = v(p, d1, -t);
    const e: V2 = v(p, d2, t);
    const side = Math.sign(cross(d1, d2)) || 1; // +1 = left turn
    const c: V2 = v(s, left(d1), r * side);
    const a0 = ang(sub(s, c));
    let a1 = ang(sub(e, c));
    // sweep in the turn direction
    if (side > 0 && a1 < a0) a1 += Math.PI * 2;
    if (side < 0 && a1 > a0) a1 -= Math.PI * 2;
    for (let k = 0; k <= segs; k++) {
      const a = a0 + (a1 - a0) * (k / segs);
      out.push([c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

/**
 * Outline of a stroked open polyline with round joins (half-width h). Ends are rounded
 * rectangles with corner radius `capR` (pass capR >= h for fully round caps); the stroke
 * extends `capExt` beyond the end points.
 */
export function strokeOutline(pts: V2[], h: number, capR = h, capExt = h, capSegs = 12): V2[] {
  const n = pts.length;
  const dirs: V2[] = [];
  for (let i = 0; i < n - 1; i++) dirs.push(norm(sub(pts[i + 1], pts[i])));

  const arc = (c: V2, a0: number, a1: number, r: number, into: V2[]) => {
    for (let k = 1; k < capSegs; k++) {
      const a = a0 + (a1 - a0) * (k / capSegs);
      into.push([c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r]);
    }
  };

  // one side of the stroke; sign = +1 for left, -1 for right; walk forward
  const side = (sign: number): V2[] => {
    const out: V2[] = [];
    out.push(v(pts[0], left(dirs[0]), h * sign));
    for (let i = 1; i < n - 1; i++) {
      const p = pts[i];
      const n1 = left(dirs[i - 1]);
      const n2 = left(dirs[i]);
      const turnLeft = cross(dirs[i - 1], dirs[i]) > 0;
      const isInner = (sign > 0) === turnLeft;
      if (isInner) {
        // miter point, clamped
        const m = norm(v(n1, n2));
        const cosHalf = Math.max(0.35, m[0] * n1[0] + m[1] * n1[1]);
        out.push(v(p, m, (h * sign) / cosHalf));
      } else {
        // round join: arc around the vertex from n1 to n2
        const a0 = ang(n1) + (sign < 0 ? Math.PI : 0);
        let a1 = ang(n2) + (sign < 0 ? Math.PI : 0);
        if (turnLeft && a1 < a0) a1 += Math.PI * 2;
        if (!turnLeft && a1 > a0) a1 -= Math.PI * 2;
        out.push([p[0] + Math.cos(a0) * h, p[1] + Math.sin(a0) * h]);
        arc(p, a0, a1, h, out);
        out.push([p[0] + Math.cos(a1) * h, p[1] + Math.sin(a1) * h]);
      }
    }
    out.push(v(pts[n - 1], left(dirs[n - 2]), h * sign));
    return out;
  };

  const L = side(1);
  const R = side(-1).reverse();
  const outline: V2[] = [...L];
  const rc = Math.min(capR, h);
  // cap at point p heading in direction d, walking from the left offset to the right offset
  const cap = (p: V2, d: V2, into: V2[]) => {
    const nl = left(d);
    if (rc >= h - 1e-6) {
      into.push(v(p, nl, h));
      arc(p, ang(nl), ang(nl) - Math.PI, h, into);
      into.push(v(p, nl, -h));
      return;
    }
    const e = Math.max(capExt, rc); // the end must reach at least as far as its corner radius
    const c1 = v(v(p, nl, h - rc), d, e - rc);
    const c2 = v(v(p, nl, -(h - rc)), d, e - rc);
    // angles relative to the left normal so the sweep never wraps the long way round
    const a0 = ang(nl);
    into.push(v(p, nl, h));
    into.push(v(c1, nl, rc));
    arc(c1, a0, a0 - Math.PI / 2, rc, into);
    into.push(v(c1, d, rc));
    into.push(v(c2, d, rc));
    arc(c2, a0 - Math.PI / 2, a0 - Math.PI, rc, into);
    into.push(v(c2, nl, -rc));
    into.push(v(p, nl, -h));
  };
  cap(pts[n - 1], dirs[n - 2], outline);
  outline.push(...R);
  cap(pts[0], [-dirs[0][0], -dirs[0][1]], outline);
  return outline;
}

export function pillowGeometry(
  outline: V2[],
  { depth = 0.04, bevel = 0.13, bevelSegments = 7 }: { depth?: number; bevel?: number; bevelSegments?: number } = {},
) {
  const shape = new THREE.Shape();
  shape.moveTo(outline[0][0], outline[0][1]);
  for (let i = 1; i < outline.length; i++) shape.lineTo(outline[i][0], outline[i][1]);
  shape.closePath();
  let geo: THREE.BufferGeometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelOffset: -bevel,
    bevelSegments,
    curveSegments: 8,
    steps: 1,
  });
  geo.translate(0, 0, -depth / 2);
  // drop per-face attributes so mergeVertices can weld the bevel rings, then smooth-shade
  geo.deleteAttribute("uv");
  geo.deleteAttribute("normal");
  geo = mergeVertices(geo, 1e-4);
  geo.computeVertexNormals();
  return geo;
}

/**
 * One corner bracket of the body, top-left, in body units (body spans -1..1).
 * w = stroke width, L = arm length measured from the outer corner.
 */
export function bracketOutline(w = 0.44, L = 0.9, cornerR = 0.24, capR = 0.15) {
  const h = w / 2;
  const ext = 0.18; // rounded-rect end extends this far past the path end (>= capR)
  const path: V2[] = [
    [-1 + L - ext, 1 - h],
    [-1 + h, 1 - h],
    [-1 + h, 1 - L + ext],
  ];
  // capR must stay above the extrude bevel, or the inset face contour self-intersects
  return strokeOutline(roundPolyline(path, cornerR), h, capR, ext);
}

/** The "next" chevron, centred on the body. */
export function chevronOutline(w = 0.3, reach = 0.44, tipX = 0.3, backX = -0.26, capR = 0.12) {
  const h = w / 2;
  const path: V2[] = [
    [backX, reach],
    [tipX, 0],
    [backX, -reach],
  ];
  return strokeOutline(roundPolyline(path, 0.06), h, capR, 0.12);
}

/** Tube along a smooth curve through the given 3D points, with sphere caps. */
export function limbGeometry(points: THREE.Vector3[], radius: number, tubular = 32) {
  const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.6);
  const tube = new THREE.TubeGeometry(curve, tubular, radius, 18, false);
  return { tube, start: points[0], end: points[points.length - 1] };
}

/** A little frame corner used as a hand, centred on its own corner so it can be rotated in place. */
export function handOutline(w = 0.2, L = 0.38, cornerR = 0.1, capR = 0.1) {
  const h = w / 2;
  const ext = 0.1;
  const c = L / 2;
  const path: V2[] = [
    [c - ext, c - h],
    [-c + h, c - h],
    [-c + h, -c + ext],
  ];
  return strokeOutline(roundPolyline(path, cornerR), h, capR, ext);
}
