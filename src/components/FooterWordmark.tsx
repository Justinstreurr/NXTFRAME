"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The wordmark as the last thing on the page, at the full width of the footer.
 *
 * It is a picture: the lettering was rendered as soft lime clay, matching the pillow-soft look
 * of the mascot, and its background was keyed out so it sits straight on the footer with its own
 * shadow intact. See public/images/footer-wordmark.png. That file is big, so it goes through
 * next/image, which serves it as WebP at the width the screen actually needs.
 *
 * On top of that sits the arrival: when the footer first comes up the mark is a little too big,
 * growing out from its centre past both edges of the footer, and pushed down; it settles into
 * place as the visitor keeps scrolling. Nothing clips it on the way. The mark is the last thing on the page, so it can only ever rise as far as the page
 * bottom lets it; the travel is capped at that, or it would never settle.
 */
export default function FooterWordmark() {
  const box = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const b = box.current;
    const m = mark.current;
    if (!b || !m) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const place = () => {
      raf = 0;
      const r = b.getBoundingClientRect();
      const h = window.innerHeight;
      const tail = document.documentElement.scrollHeight - (r.top + window.scrollY);
      const travel = Math.max(1, Math.min(h * 0.9, tail));
      // 0 the moment the box touches the bottom of the window, 1 once it has settled
      const p = still.matches ? 1 : Math.min(Math.max((h - r.top) / travel, 0), 1);
      m.style.transform = `translateY(${(1 - p) * 9}%) scale(${1 + 0.14 * (1 - p)})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };

    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={box} className="footer-wordmark relative mt-20 md:mt-28">
      <Image
        ref={mark}
        src="/images/footer-wordmark.png"
        alt="NXT Frame"
        width={2804}
        height={561}
        sizes="100vw"
        className="block h-auto w-full origin-bottom will-change-transform"
      />
    </div>
  );
}
