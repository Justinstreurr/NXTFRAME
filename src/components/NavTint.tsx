"use client";

import { useEffect, useRef } from "react";

/**
 * For a header that floats see-through over a photo hero (Nav theme="photo"): toggles
 * `nav-solid` on its parent, the header, once the visitor has scrolled past the top of the page,
 * so the bar gets its solid background only when there is content to keep it legible over.
 * The colours themselves live in globals.css (.nav-photo / .nav-photo.nav-solid).
 */
export default function NavTint() {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = probe.current?.parentElement;
    if (!header) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      header.classList.toggle("nav-solid", window.scrollY > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      header.classList.remove("nav-solid");
    };
  }, []);

  return <span ref={probe} hidden />;
}
