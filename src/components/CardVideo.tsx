"use client";

import { useEffect, useRef } from "react";

/**
 * A silent looping video inside a card that only plays while it is on screen. The work rows
 * repeat every card several times for the seamless marquee, so without this every copy would
 * be decoding at once; paused videos cost nothing. Nothing is fetched beyond the first frame
 * until the card comes into view, and motion-free visitors get that first frame standing still.
 */
export default function CardVideo({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "80px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return <video ref={ref} src={src} className={className} muted loop playsInline preload="metadata" aria-hidden="true" />;
}
