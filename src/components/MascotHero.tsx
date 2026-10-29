"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { MascotPose } from "./mascot/Mascot3D";
import useNear from "./mascot/useNear";

// WebGL only runs in the browser, so the 3D mascot is client-only and code-split.
const Mascot3D = dynamic(() => import("./mascot/Mascot3D"), { ssr: false });

/**
 * Wrapper that gives the 3D mascot a sized box and the element carrying the palette
 * tokens (any ancestor inside `.hero` works, so the mascot recolours with the theme).
 *
 * `mountBelow="md"` keeps the box but leaves the scene out on wider screens: hiding a canvas
 * with CSS still renders it every frame, so where another mascot takes over on desktop the
 * hidden one must not exist at all.
 */
export default function MascotHero({
  className = "",
  style,
  interactive = true,
  pose,
  mountBelow,
}: {
  className?: string;
  style?: CSSProperties;
  interactive?: boolean;
  pose?: MascotPose;
  mountBelow?: "md";
}) {
  const box = useRef<HTMLDivElement>(null);
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [mount, setMount] = useState(!mountBelow);
  // the scene (and three.js with it) only loads once the visitor scrolls near the box
  const near = useNear(box);
  useEffect(() => setEl(box.current), []);
  useEffect(() => {
    if (!mountBelow) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setMount(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [mountBelow]);
  return (
    <div ref={box} className={className} style={style} aria-hidden="true">
      {el && mount && near && <Mascot3D paletteEl={el} interactive={interactive} pose={pose} />}
    </div>
  );
}
