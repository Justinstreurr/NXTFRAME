"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ---------- The scroll effects of the dark case page (after Instrument's Nike case) ----------
   Each piece reads how far its element has travelled through the window (0 as its top enters at the
   bottom, 1 as its bottom leaves at the top) and turns that into one style, throttled to a frame.
   With reduced motion every piece shows its end state. */

function useProgress<T extends HTMLElement>(apply: (p: number, el: T) => void) {
  const ref = useRef<T>(null);
  const cb = useRef(apply);
  useEffect(() => { cb.current = apply; });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { cb.current(1, el); return; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      cb.current(Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))), el);
    };
    const on = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(frame); };
  }, []);
  return ref;
}

const clamp = (x: number) => Math.min(1, Math.max(0, x));

/** a giant title that comes into focus as it rises: blurred and lower at first, sharp by mid-screen */
export function Deblur({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useProgress<HTMLHeadingElement>((p, el) => {
    const k = 1 - clamp((p - 0.08) / 0.32);
    el.style.filter = `blur(${(k * 18).toFixed(1)}px)`;
    el.style.opacity = String(1 - k * 0.7);
    el.style.transform = `translateY(${(k * 60).toFixed(1)}px)`;
  });
  return <h2 ref={ref} className={className}>{children}</h2>;
}

/** a thin vertical line that fills as its section scrolls by */
export function ScrollLine({ className = "" }: { className?: string }) {
  const ref = useProgress<HTMLSpanElement>((p, el) => {
    (el.firstElementChild as HTMLElement).style.transform = `scaleY(${clamp((p - 0.1) / 0.6).toFixed(3)})`;
  });
  return (
    <span ref={ref} className={`block w-[3px] overflow-hidden bg-current/20 ${className}`} aria-hidden="true">
      <span className="block size-full origin-top bg-current" />
    </span>
  );
}

/** moves its content a little against the scroll, `speed` px per 100px scrolled */
export function Parallax({ children, speed = 10, className = "", style }: { children: ReactNode; speed?: number; className?: string; style?: CSSProperties }) {
  const ref = useProgress<HTMLDivElement>((p, el) => {
    el.style.transform = `translate3d(0,${((0.5 - p) * speed * 8).toFixed(1)}px,0)`;
  });
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

/** giant words that fill from grey to the text colour, top to bottom, one after the other as they scroll by
    (the fill is currentColor, so the letters are see-through with text-fill-color, not with color) */
export function FillWords({ words, className = "" }: { words: string[]; className?: string }) {
  const ref = useProgress<HTMLDivElement>((p, el) => {
    const span = 0.5 / words.length;
    [...el.children].forEach((w, i) => {
      const f = clamp((p - 0.18 - i * span) / span) * 100;
      (w as HTMLElement).style.backgroundImage = `linear-gradient(to bottom, currentColor ${f}%, #9b9b9b ${f}%)`;
    });
  });
  return (
    <div ref={ref} className={className}>
      {words.map((w) => (
        <span key={w} className="block bg-clip-text [-webkit-text-fill-color:transparent] [background-image:linear-gradient(#9b9b9b,#9b9b9b)]">{w}</span>
      ))}
    </div>
  );
}

/** a play/pause toggle in the corner of a moving visual; the visual's animations follow `data-paused` */
export function Pausable({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`group/pause relative ${className}`} style={style} data-paused={paused ? "" : undefined}>
      {children}
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        className="absolute bottom-4 left-4 z-10 flex size-7 items-center justify-center rounded-full bg-black/85 text-white after:absolute after:-inset-2 after:content-[''] md:bottom-5 md:left-5"
        aria-label={paused ? "Afspelen" : "Pauzeren"}
      >
        {paused ? (
          <svg viewBox="0 0 12 12" className="size-2.5" fill="currentColor" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" /></svg>
        ) : (
          <svg viewBox="0 0 12 12" className="size-2.5" fill="currentColor" aria-hidden="true"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" /></svg>
        )}
      </button>
    </div>
  );
}
