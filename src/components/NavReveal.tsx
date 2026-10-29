"use client";

import { useEffect, useRef } from "react";

/**
 * Tucks the header away while the visitor scrolls down and brings it back the moment they scroll
 * up, so it never sits over content they are reading but is always one flick away.
 *
 * It renders nothing itself; it toggles `nav-hidden` on its parent, the header. It leaves the
 * header alone near the top of the page, while a menu inside it is open, and while the pointer
 * is on it. Small scroll jitters are ignored so the bar does not flicker.
 */
export default function NavReveal() {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = probe.current?.parentElement;
    // switched off: the bar stays put while scrolling. Remove this line to let it tuck away again.
    const enabled = false;
    if (!header || !enabled) return;

    let last = window.scrollY;
    let hidden = false;
    let raf = 0;

    const place = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - last;
      if (Math.abs(dy) < 6) return;
      last = y;
      const menuOpen = header.querySelector('[aria-expanded="true"]') !== null;
      const away = dy > 0 && y > 120 && !menuOpen && !header.matches(":hover");
      if (away !== hidden) {
        hidden = away;
        header.classList.toggle("nav-hidden", hidden);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      header.classList.remove("nav-hidden");
    };
  }, []);

  return <span ref={probe} hidden />;
}
