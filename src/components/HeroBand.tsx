"use client";

import { useEffect, useRef } from "react";
import { Marquee } from "./ui";
import { FrameCorners } from "./Logo";
import { work } from "./workData";

/**
 * The photo band under the homepage hero, back from the earlier design. On desktop it sits over
 * the foot of the hero photo, so the meadow runs on behind the tiles. One row of pictures at
 * mixed widths that drifts left on its own and speeds up while the visitor scrolls, then eases
 * back. The cases from workData are the tiles with a name and a link; a few loose photos sit
 * between them so the row never shows a gap. Brand corners appear on the tile under the pointer.
 */
const fillers = ["/images/tile-1.jpg", "/images/tile-2.jpg", "/images/tile-4.jpg", "/images/tile-8.jpg", "/images/tile-11.jpg"];
const widths = ["w-[230px] md:w-[300px]", "w-[180px] md:w-[230px]", "w-[250px] md:w-[330px]", "w-[200px] md:w-[250px]"];

type Tile = { src: string; pos?: string; name?: string; kind?: string; href?: string };

/* case, photo, case, photo... so the row reads as work, not as a photo wall */
const tiles: Tile[] = work.flatMap((w, i) => {
  const item: Tile = { src: w.img, pos: w.pos, name: w.name, kind: w.kind, href: w.href };
  const filler = fillers[i % fillers.length];
  return filler ? [item, { src: filler }] : [item];
});

export default function HeroBand() {
  const rowRef = useRef<HTMLDivElement>(null);

  // the row runs faster while scrolling, then eases back to its normal speed
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = row.querySelector<HTMLElement>('[class*="animate-marquee"]');
    if (!track) return;
    let anim: Animation | undefined;
    let raf = 0;
    let lastY = window.scrollY;
    let target = 1;
    const getAnim = () => (anim ??= track.getAnimations()[0]);
    const tick = () => {
      const a = getAnim();
      if (!a) return;
      target += (1 - target) * 0.08;
      a.playbackRate += (target - a.playbackRate) * 0.2;
      if (Math.abs(a.playbackRate - 1) > 0.01 || Math.abs(target - 1) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        a.playbackRate = 1;
        raf = 0;
      }
    };
    const onScroll = () => {
      const y = window.scrollY;
      const dy = Math.abs(y - lastY);
      lastY = y;
      target = Math.min(target + dy / 12, 10);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      const a = getAnim();
      if (a) a.playbackRate = 1;
    };
  }, []);

  return (
    <section data-zone="cherry" className="relative z-10 bg-cream pb-6 pt-6 text-forest md:pb-8 md:pt-8 lg:-mt-[22rem] lg:bg-transparent lg:pt-0" aria-label="Ons werk">
      <div ref={rowRef} className="relative">
        <Marquee speed="slow" fade={false}>
          {tiles.map((t, i) => {
            const cls = `group relative mr-3 block h-[220px] shrink-0 overflow-hidden rounded-2xl bg-forest/[0.06] md:mr-4 md:h-[280px] ${widths[i % widths.length]}`;
            const inner = (
              <>
                <img src={t.src} alt={t.name ?? ""} className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" style={t.pos ? { objectPosition: t.pos } : undefined} loading="lazy" draggable={false} />
                <FrameCorners className="text-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100" inset="inset-3" />
                {t.name && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-4 pt-16">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.12em] text-lime">{t.kind}</span>
                    <span className="mt-0.5 block font-display text-xl font-medium tracking-tight text-paper md:text-2xl">{t.name}</span>
                  </span>
                )}
              </>
            );
            return t.href ? (
              <a key={`${t.src}-${i}`} href={t.href} target={t.href.startsWith("http") ? "_blank" : undefined} rel={t.href.startsWith("http") ? "noopener noreferrer" : undefined} className={cls}>
                {inner}
              </a>
            ) : (
              <div key={`${t.src}-${i}`} className={cls} aria-hidden="true">
                {inner}
              </div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}
