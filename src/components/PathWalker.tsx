"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { MascotMotion } from "./mascot/Mascot3D";
import useNear from "./mascot/useNear";

const Mascot3D = dynamic(() => import("./mascot/Mascot3D"), { ssr: false });

const W = 144;
const H = 128;
const FOOT_LIFT = 30; // px from the canvas bottom up to the mascot's feet

/**
 * The mascot walks the Aanpak path: it sits on the curve that ZigzagPath draws through the
 * step nodes, at the same scroll progress the lime line is filled to, so the line appears
 * behind it as it walks. Scrolling drives the stride; it turns to face the way it is going.
 * Desktop only: on phones the steps stack and the path runs straight through the text.
 * `onLight` dresses it for a light section.
 */
export default function PathWalker({ onLight = false }: { onLight?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [el, setEl] = useState<HTMLElement | null>(null);
  const motion = useRef<MascotMotion>({ heading: 1, speed: 0, phase: 0 });
  const near = useNear(host);

  useEffect(() => {
    const box = host.current;
    const parent = box?.parentElement;
    if (!box || !parent) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let path: SVGPathElement | null = null;
    let len = 0;
    let lastL = -1;
    let lastT = performance.now();
    let raf = 0;

    const find = () => {
      path = parent.querySelector<SVGPathElement>("svg path");
      len = path && path.getAttribute("d") ? path.getTotalLength() : 0;
    };
    const place = () => {
      raf = 0;
      if (!path || !len) find();
      if (!path || !len) return;
      const r = parent.getBoundingClientRect();
      const pivot = window.innerHeight * 0.6;
      const p = Math.min(Math.max((pivot - r.top) / r.height, 0), 1);
      const L = p * len;
      const pt = path.getPointAtLength(L);
      const ahead = path.getPointAtLength(Math.min(len, L + 10));
      const dx = ahead.x - pt.x;
      const m = motion.current;
      if (Math.abs(dx) > 0.5) m.heading = dx > 0 ? 1 : -1;
      const now = performance.now();
      const dt = Math.max(16, now - lastT);
      lastT = now;
      if (lastL >= 0) {
        const dL = L - lastL;
        m.speed = Math.min(1.5, (Math.abs(dL) / dt) * 16 / 5);
        m.phase += dL / 26;
      }
      lastL = L;
      box.style.transform = `translate(${pt.x - W / 2}px, ${pt.y - H + FOOT_LIFT}px)`;
      box.style.opacity = "1";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };

    setEl(box);
    find();
    place();
    const ro = new ResizeObserver(() => {
      find();
      lastL = -1;
      place();
    });
    ro.observe(parent);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const style: CSSProperties = {
    width: W,
    height: H,
    opacity: 0,
    // on forest: lime with white limbs, like the Aanpak text, so the chevron reads on the dark green.
    // On a light ground: forest with lime limbs, like the logo. Fixed colours, not the tokens: a
    // section may redefine those for itself (Platform tone="cream").
    "--hp-brand": onLight ? "#02261e" : "var(--color-lime)",
    "--hp-btn-fg": onLight ? "#dafc92" : "#ffffff",
  } as CSSProperties;

  return (
    <div ref={host} className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block" style={style} aria-hidden="true">
      {el && near && <Mascot3D paletteEl={el} interactive={false} pose="walk" motion={motion} />}
    </div>
  );
}
