"use client";

import { useEffect, useRef } from "react";

/**
 * Toggles `className` on the parent section once the heading inside it (the first h2) has reached
 * the middle of the window while scrolling down, and takes it off again when scrolling back up.
 * It also sets `data-statement-sand` on <html> so the section below can turn sand with it.
 */
export default function BgOnCenter({ className }: { className: string }) {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = probe.current?.parentElement;
    const target = section?.querySelector("h2") ?? section;
    if (!section || !target) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const r = target.getBoundingClientRect();
      const on = r.top + r.height / 2 <= window.innerHeight / 2;
      section.classList.toggle(className, on);
      // Wat je krijgt (below) follows along via this flag on <html>
      document.documentElement.toggleAttribute("data-statement-sand", on);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      section.classList.remove(className);
      document.documentElement.removeAttribute("data-statement-sand");
    };
  }, [className]);

  return <span ref={probe} hidden />;
}
