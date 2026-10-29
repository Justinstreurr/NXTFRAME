"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element has come within `margin` of the window, and stays true. The mascots use
 * it to hold off loading three.js and setting up their WebGL scene until the visitor scrolls near
 * them; once up, a scene stays mounted (Mascot3D pauses it off screen), because tearing down and
 * rebuilding a WebGL context costs more than keeping it.
 */
export default function useNear(ref: RefObject<HTMLElement | null>, margin = "600px 0px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}
