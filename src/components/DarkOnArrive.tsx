"use client";

import { useEffect, useRef } from "react";

/**
 * Puts `is-dark` on the parent section once the section's own halfway point has risen to the
 * middle of the window, and takes it off again when the visitor scrolls back above that point.
 * It watches an invisible marker placed halfway down the section (the section must be
 * position: relative). The colours themselves, and their fade, live in CSS; this only flips the
 * class. One IntersectionObserver, no scroll listener.
 */
export default function DarkOnArrive() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = marker.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    const io = new IntersectionObserver(
      ([e]) => {
        // dark once the marker is above the middle of the window, and it stays dark further down
        section.classList.toggle("is-dark", e.isIntersecting || e.boundingClientRect.top < 0);
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      section.classList.remove("is-dark");
    };
  }, []);

  return <span ref={marker} className="pointer-events-none absolute left-0 top-1/2 h-px w-px" aria-hidden="true" />;
}
