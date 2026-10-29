"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** The case hero's photo card: it starts inset with rounded corners and, over the first few hundred
    pixels of scrolling, grows out to the edges of the window, its corners going square. Only the
    sides, top and radius move; the bottom edge stays where the classes put it. */
export default function CaseHeroGround({ className = "", style, children }: { className?: string; style?: CSSProperties; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const inset = window.innerWidth >= 768 ? 12 : 8;
      const p = Math.min(1, Math.max(0, window.scrollY / 320));
      const ease = 1 - (1 - p) ** 2;
      const px = `${(inset * (1 - ease)).toFixed(2)}px`;
      el.style.left = px;
      el.style.right = px;
      el.style.top = px;
      el.style.borderRadius = `${(18 * (1 - ease)).toFixed(2)}px`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style} aria-hidden="true">
      {children}
    </div>
  );
}
