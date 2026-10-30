"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A swipe row that moves on by itself: every few seconds it scrolls to the next card, and after the
 * last one back to the first. Only while the row is on screen and actually scrolls (on wide screens
 * the cards sit in a grid and nothing moves). A visitor who touches or scrolls it takes over; it
 * waits a while and then carries on. Motion-free visitors get a still row.
 */
export default function AutoSwipe({ children, className = "", every = 2600, label }: { children: ReactNode; className?: string; every?: number; label: string }) {
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = row.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let onScreen = false;
    let holdUntil = 0;
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    const hold = () => (holdUntil = Date.now() + 8000);
    el.addEventListener("pointerdown", hold);
    el.addEventListener("wheel", hold, { passive: true });
    const id = window.setInterval(() => {
      if (!onScreen || Date.now() < holdUntil || el.scrollWidth <= el.clientWidth + 4) return;
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
      const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
      // the first card that starts past the current one is the next stop; at the end, back to the start
      const next = cards.find((c) => c.offsetLeft - pad > el.scrollLeft + 8);
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      el.scrollTo({ left: !next || atEnd ? 0 : next.offsetLeft - pad, behavior: "smooth" });
    }, every);
    return () => {
      io.disconnect();
      window.clearInterval(id);
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("wheel", hold);
    };
  }, [every]);

  return (
    <div ref={row} tabIndex={0} role="region" aria-label={label} className={`relative ${className}`}>
      {children}
    </div>
  );
}
