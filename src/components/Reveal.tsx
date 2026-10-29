"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Adds the `in` class once the element scrolls into view; CSS does the animating. */
export default function Reveal({
  children,
  className = "",
  style,
  threshold = 0.35,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
