"use client";

import { useEffect, useRef } from "react";

/**
 * The line of the Aanpak path. It measures the `.step-node` circles of its parent and draws a
 * smooth curve through their centres: a zigzag on desktop, where the nodes alternate sides,
 * and a straight vertical line on phones. A faint base line is always visible; the lime line
 * on top is filled up to the current scroll progress (PathWalker walks the mascot along the
 * same curve at the same progress). Everything is written straight to the DOM, so scrolling
 * never re-renders React.
 */
export default function ZigzagPath() {
  const svg = useRef<SVGSVGElement>(null);
  const base = useRef<SVGPathElement>(null);
  const line = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = svg.current;
    const parent = el?.parentElement;
    const basePath = base.current;
    const linePath = line.current;
    if (!el || !parent || !basePath || !linePath) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let len = 0;

    const measure = () => {
      const box = parent.getBoundingClientRect();
      const nodes = Array.from(parent.querySelectorAll<HTMLElement>(".step-node"));
      const pts = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      if (pts.length < 2) return;
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const my = (a.y + b.y) / 2;
        d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
      }
      basePath.setAttribute("d", d);
      linePath.setAttribute("d", d);
      len = linePath.getTotalLength();
      linePath.style.strokeDasharray = `${len}`;
    };

    let raf = 0;
    const place = () => {
      raf = 0;
      if (!len) return;
      const r = parent.getBoundingClientRect();
      const pivot = window.innerHeight * 0.6;
      const p = reduce ? 1 : Math.min(Math.max((pivot - r.top) / r.height, 0), 1);
      linePath.style.strokeDashoffset = `${len * (1 - p)}`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };

    measure();
    place();
    const ro = new ResizeObserver(() => {
      measure();
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

  return (
    <svg ref={svg} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <path ref={base} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
      <path
        ref={line}
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 120ms linear" }}
      />
    </svg>
  );
}
