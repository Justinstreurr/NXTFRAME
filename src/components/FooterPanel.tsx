"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The footer panel sliding up over the sticky call to action. While it rises it grows from an
 * inset card to nearly the full width: the side gutter eases from `from` to `to` pixels as the
 * panel's top edge travels from the bottom of the window to near the top. Motion-free visitors
 * get the wide panel straight away.
 */
export default function FooterPanel({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const set = (p: number) => {
      const wide = window.matchMedia("(min-width: 768px)").matches;
      const from = wide ? 56 : 14;
      const to = wide ? 8 : 6;
      el.style.setProperty("--fp-gutter", `${from + (to - from) * p}px`);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(1);
      return;
    }
    let raf = 0;
    const place = () => {
      raf = 0;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.8)));
      set(1 - Math.pow(1 - p, 2));
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
    <div ref={wrap} className="footer-panel relative z-10" style={{ paddingInline: "var(--fp-gutter, 56px)" }}>
      {children}
    </div>
  );
}
