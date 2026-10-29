"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import MascotHero from "./MascotHero";

/**
 * The mascot climbing up from behind the work rows. It lives in a box standing on the top edge of
 * the rows, clipped at that edge, and the scroll lifts it out: fully hidden while the rows enter
 * the window, fully up (waving, and following the pointer) once they reach the upper half. A
 * small bob on the way up makes it read as pulling itself up rather than sliding.
 * Desktop only; motion-free visitors get it standing up straight away.
 */
/* lime body, forest limbs: the section sits on cream */
const palette = { "--hp-brand": "#dafc92", "--hp-btn-fg": "#02261e" } as CSSProperties;

export default function WorkPeek() {
  const clip = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = clip.current;
    const el = body.current;
    const rows = box?.parentElement;
    if (!box || !el || !rows) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "translate3d(0, 24%, 0)";
      return;
    }
    let raf = 0;
    const place = () => {
      raf = 0;
      const top = rows.getBoundingClientRect().top;
      const vh = window.innerHeight;
      // 0 while the rows' top edge is at the bottom of the window, 1 once it reaches 45% of it
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.55)));
      const eased = 1 - Math.pow(1 - p, 3);
      const bob = Math.sin(p * Math.PI * 3) * 6 * (1 - p);
      // fully up is still 24% down: legs and hips stay behind the cards, head and arms over the edge
      el.style.transform = `translate3d(0, ${24 + (1 - eased) * 76}%, 0) translate3d(0, ${bob}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={clip}
      className="pointer-events-none absolute bottom-full right-[4%] z-0 hidden h-44 w-48 overflow-hidden md:block"
      aria-hidden="true"
    >
      <div ref={body} className="size-full will-change-transform" style={{ transform: "translate3d(0, 100%, 0)" }}>
        <MascotHero className="size-full" style={palette} pose="wave" />
      </div>
    </div>
  );
}
