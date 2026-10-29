"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** A marker in the page: from here on down the whole background (and the text) turns to these colours,
    once the marker passes `at` of the window's height (0.5 the middle, 0.9 near the bottom) */
export function BgMark({ bg, fg, at = 0.5 }: { bg: string; fg: string; at?: number }) {
  return <div data-bg={bg} data-fg={fg} data-at={at} aria-hidden="true" />;
}

/** The page's <main id="main">: its background and text colour are those of the last marker it has passed, so the whole page changes colour at set points as you scroll, with a soft fade. */
export default function CaseBgShift({ children, bg, fg, className = "" }: { children: ReactNode; bg: string; fg: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const marks = [...el.querySelectorAll<HTMLElement>("[data-bg]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      let b = bg, f = fg;
      for (const m of marks) {
        if (m.getBoundingClientRect().top > window.innerHeight * Number(m.dataset.at)) break;
        b = m.dataset.bg!;
        f = m.dataset.fg!;
      }
      el.style.backgroundColor = b;
      el.style.color = f;
    };
    const on = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(frame); };
  }, [bg, fg]);

  return (
    <main id="main" ref={ref} className={`overflow-x-clip transition-colors duration-700 ease-out ${className}`} style={{ backgroundColor: bg, color: fg }}>
      {children}
    </main>
  );
}
