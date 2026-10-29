"use client";

import { useEffect, useRef } from "react";

/**
 * A round "Bekijk case" label that takes the place of the pointer over the work cards. It lives
 * inside the rows, follows the pointer with a little lag, and only shows while the pointer is on
 * a card. Mouse and trackpad only: a finger has no pointer to replace.
 */
export default function WorkCursor() {
  const badge = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = badge.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let shown = false;

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = shown || Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const over = (e: PointerEvent) => {
      const on = (e.target as Element).closest("li a") !== null; // the case cards, not the links in the heading
      if (on === shown) return;
      shown = on;
      if (on) {
        // start under the pointer instead of flying in from wherever it was last
        x = tx;
        y = ty;
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
      el.classList.toggle("is-on", on);
      // the badge takes the pointer's place, so the brand corners step aside while it shows
      document.documentElement.classList.toggle("work-cursor-on", on);
      if (on && !raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => {
      shown = false;
      el.classList.remove("is-on");
      document.documentElement.classList.remove("work-cursor-on");
    };

    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerover", over);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerover", over);
      host.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("work-cursor-on");
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={badge} className="work-cursor" aria-hidden="true">
      Bekijk case
    </div>
  );
}
