"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A section whose ground changes once you are halfway through it: `data-shifted` flips when the
 * middle of the section passes the middle of the screen. The colours themselves live in the classes
 * (`data-[shifted=true]:…`, and `group-data-[shifted=true]:…` for what is inside).
 */
export default function ShiftSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      el.dataset.shifted = String(r.top + r.height / 2 < window.innerHeight / 2);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={ref} className={`group transition-colors duration-700 ${className}`}>
      {children}
    </section>
  );
}
