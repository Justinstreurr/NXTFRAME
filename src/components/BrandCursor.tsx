"use client";

import { useEffect, useRef } from "react";
import { FrameGlyph } from "./Logo";

/**
 * The pointer as the brand glyph: the two frame corners, in lime, framing the spot you point at.
 * Mouse and trackpad only; on touch there is no pointer to replace. Over links and buttons the
 * corners open up a little, over text fields the native text cursor takes over again.
 * Styles live in globals.css (.brand-cursor-el, html.brand-cursor).
 */
export default function BrandCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("brand-cursor");

    let raf = 0, x = -100, y = -100;
    const place = () => {
      raf = 0;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(place);
      el.classList.add("is-in");
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element;
      el.classList.toggle("is-hot", t.closest("a, button, [role='button'], label, summary, select") !== null);
      el.classList.toggle("is-text", t.closest("input, textarea, [contenteditable='true']") !== null);
    };
    const out = (e: MouseEvent) => {
      if (!e.relatedTarget) el.classList.remove("is-in");
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("mouseout", out);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("brand-cursor");
    };
  }, []);

  return (
    <div ref={ref} className="brand-cursor-el" aria-hidden="true">
      <FrameGlyph className="size-6" />
    </div>
  );
}
