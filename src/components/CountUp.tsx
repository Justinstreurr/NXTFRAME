"use client";

import { useEffect, useRef } from "react";

/**
 * A number that counts up from zero to its value the first time it scrolls into view, with an
 * ease-out so it lands softly. Renders the final value on the server, so it also reads without
 * JavaScript; motion-free visitors get the final value straight away.
 */
export default function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => n.toFixed(decimals).replace(".", ",");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = fmt(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(value * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, duration]);

  return (
    <>
      {prefix}
      <span ref={ref}>{fmt(value)}</span>
      {suffix}
    </>
  );
}
