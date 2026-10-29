"use client";

import { useEffect } from "react";

const NAV_HEIGHT = 72;

/**
 * Page palette zones. Sections declare `data-zone="green" | "cherry"`; this sets the same
 * attribute on <html> for the last section whose top has passed 60% of the viewport, so the
 * whole visible page flips palette together (see the zone tokens in globals.css). A section
 * with `data-zone-scrolled` (the hero) switches to that zone as soon as the visitor scrolls.
 */
export default function NavPalette() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-zone]"));
    if (sections.length === 0) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const pivot = window.innerHeight * 0.6;
      let current = sections[0];
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= pivot) current = s;
        else break;
      }
      let zone = current.dataset.zone ?? "green";
      if (current.dataset.zoneScrolled && window.scrollY > NAV_HEIGHT / 3) zone = current.dataset.zoneScrolled;
      if (root.dataset.zone !== zone) root.dataset.zone = zone;
      // the nav shares the hero's tinted background only while the hero is the current section
      root.toggleAttribute("data-at-hero", Boolean(current.dataset.zoneScrolled));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      delete root.dataset.zone;
      root.removeAttribute("data-at-hero");
    };
  }, []);
  return null;
}
