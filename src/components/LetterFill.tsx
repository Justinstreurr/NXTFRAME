"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Text that fills in from light grey to the full green one letter at a time, left to right, tied
 * to the scroll position: scrolling down darkens the sentence, scrolling back up lets it fade to
 * grey again. The script only writes one custom property (`--p`, 0 -> 1) on the wrapper; CSS turns
 * that into a per-letter colour from the letter's index in `--i` (see .letter-fill in globals.css),
 * so scrolling never re-renders React. Words are kept whole so lines never break inside one, and
 * screen readers get the plain sentence instead of the letters.
 */
type Part = { text: string; italic?: boolean };

export default function LetterFill({
  parts,
  className = "",
  start = 0.85,
  end = 0.45,
}: {
  parts: Part[];
  className?: string;
  /** where in the window (0 = top, 1 = bottom) the fill starts and where it is complete */
  start?: number;
  end?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let raf = 0;
    const place = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // grey while the sentence is still low in the window, fully green once it has risen past the middle
      const startY = vh * start;
      const endY = vh * end;
      const travel = startY - endY + r.height;
      const p = Math.min(Math.max((startY - r.top) / travel, 0), 1);
      el.style.setProperty("--p", `${p}`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [start, end]);

  let i = 0;
  const letters = parts.map((p, pi) =>
    p.text.split(/(\s+)/).map((chunk, ci) => {
      if (chunk === "") return null;
      if (/^\s+$/.test(chunk)) return " ";
      return (
        <span key={`${pi}-${ci}`} className={`inline-block whitespace-nowrap ${p.italic ? "italic" : ""}`}>
          {Array.from(chunk).map((ch, k) => (
            <span key={k} className="lf" style={{ "--i": i++ } as CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
      );
    }),
  );

  return (
    <span ref={ref} className={`letter-fill ${className}`} style={{ "--n": i } as CSSProperties}>
      {/* the plain sentence for screen readers only: kept out of text selection, or copying the
          statement would give the sentence twice (once from here, once from the letters) */}
      <span className="sr-only select-none">{parts.map((p) => p.text).join("")}</span>
      <span aria-hidden="true">{letters}</span>
    </span>
  );
}
