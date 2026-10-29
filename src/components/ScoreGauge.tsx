"use client";

import { useEffect, useRef } from "react";

/**
 * A Lighthouse-style score tile: four rings (performance, accessibility, best practices, SEO)
 * that sweep clockwise from empty to their score while the number in the middle counts up,
 * the first time the tile scrolls into view, one ring starting a beat after the other. The
 * final values are rendered on the server, so the tile reads without JavaScript, and
 * motion-free visitors get them straight away. `caption` only names the tile for assistive
 * technology; nothing is printed under the rings.
 *
 * The scores are real measurements: update them when the site is re-measured.
 */
const R = 40;
const C = 2 * Math.PI * R;

const labels = ["Prestaties", "Toegankelijkheid", "Best practices", "SEO"] as const;

export default function ScoreGauge({
  scores = [100, 100, 100, 100],
  caption = "Lighthouse, mobiel",
  className = "",
}: {
  scores?: [number, number, number, number];
  caption?: string;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rings = Array.from(el.querySelectorAll<SVGCircleElement>("[data-ring]"));
    const nums = Array.from(el.querySelectorAll<HTMLElement>("[data-num]"));
    // start empty
    rings.forEach((r) => (r.style.strokeDashoffset = `${C}`));
    nums.forEach((n) => (n.textContent = "0"));

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1500;
        const stagger = 140;
        const tick = (t: number) => {
          let done = true;
          scores.forEach((score, i) => {
            const p = Math.min(1, Math.max(0, (t - start - i * stagger) / duration));
            if (p < 1) done = false;
            const eased = 1 - Math.pow(1 - p, 3);
            const v = score * eased;
            if (rings[i]) rings[i].style.strokeDashoffset = `${C * (1 - v / 100)}`;
            if (nums[i]) nums[i].textContent = `${Math.round(v)}`;
          });
          if (!done) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [scores]);

  return (
    <div
      ref={root}
      className={`relative flex flex-col overflow-hidden rounded-2xl bg-forest p-5 text-cream md:p-6 ${className}`}
      role="img"
      aria-label={`${caption}: ${labels.map((l, i) => `${l} ${scores[i]}`).join(", ")}`}
    >
      <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3">
        {labels.map((label, i) => (
          <div key={label} className="flex flex-col items-center justify-center text-center">
            <div className="relative aspect-square w-full max-w-[6.5rem]">
              <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
                <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="7" />
                <circle
                  data-ring
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke="var(--color-lime)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - scores[i] / 100)}
                />
              </svg>
              <span data-num className="absolute inset-0 grid place-items-center font-display text-2xl font-semibold tracking-[-0.03em] tabular-nums md:text-[1.7rem]">
                {scores[i]}
              </span>
            </div>
            <span className="mt-1.5 text-[11px] font-medium leading-tight text-cream/70">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
