"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { FrameGlyph } from "./Logo";

/* ---------- The Happy Flops showreel ----------
   Built after Adidas' mini showreel: a short film of hard cuts on a fast beat, each shot a few tenths
   of a second. It opens on the logo on black, then the wordmark huge and cut off with a slipper in
   front of it on changing grounds, a wall of screens, screens floating over a campaign photo,
   one screen at a time on flat colours, a row of product cards sliding in, the brand words as a
   pattern, the credit with both logos, two campaign photos stacked and the shop panning past. Every shot is code, sized
   in cqw (the film's width), so it stays sharp at any size; the motion inside a shot is a CSS animation
   that lasts as long as the shot (--d). The photos and packshots are Happy Flops' own, from their shop. */

const R = "/images/hf-reel/";
const UI = "/images/hf-ui/";
const SHOT = "/images/cases/happy-flops/";
const LOGO = `${UI}logo-white.webp`;

type Scene = { d: number; el: ReactNode };

const cover = "absolute inset-0 size-full object-cover";
const anim = (name: string, extra = "") => ({ animation: `${name} var(--d) ${extra || "linear"} both` });

/** the wordmark huge and cut off at both sides, a packshot (cut out of its white ground) in front of it */
function TypeShot({ bg, photo, dark, pack, tilt = -8 }: { bg?: string; photo?: string; dark?: boolean; pack?: string; tilt?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: bg }}>
      {photo && <img src={photo} alt="" className={cover} style={anim("hfr-push")} />}
      <img
        src={LOGO}
        alt=""
        className="absolute left-1/2 top-1/2 w-[132cqw] max-w-none -translate-x-1/2 -translate-y-1/2"
        style={{ filter: dark ? "brightness(0)" : undefined, ...anim("hfr-type") }}
      />
      {pack && (
        <img
          src={pack}
          alt=""
          className="absolute left-1/2 top-[60%] w-[54cqw] max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_2.4cqw_2cqw_rgba(0,0,0,0.28)]"
          style={{ rotate: `${tilt}deg`, ...anim("hfr-pack", "cubic-bezier(0.2,0.8,0.2,1)") }}
        />
      )}
    </div>
  );
}

/** a screen as a white card with a soft shadow, cut to a phone's proportions */
function Screen({ src, className = "", style }: { src: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`overflow-hidden rounded-[0.6cqw] bg-white shadow-[0_1.6cqw_3cqw_-1cqw_rgba(0,0,0,0.45)] ${className}`} style={style}>
      <img src={src} alt="" className="block size-full object-cover object-top" />
    </div>
  );
}

const wall: string[][] = [
  [`${SHOT}m-home.webp`, `${R}c-clogs.webp`, `${UI}card-original.webp`],
  [`${R}lp4.webp`, `${SHOT}m-product.webp`, `${UI}blk-tree.webp`],
  [`${UI}card-kids.webp`, `${R}c-orig.webp`, `${SHOT}m-collection.webp`],
  [`${SHOT}m-product.webp`, `${UI}blk-sofa.webp`, `${R}c-stock.webp`],
  [`${R}hb4b.webp`, `${UI}card-cusher.webp`, `${SHOT}m-home.webp`],
  [`${UI}blk-bike.webp`, `${SHOT}m-collection.webp`, `${R}c-kids.webp`],
  [`${R}c-le.webp`, `${UI}card-stockholm.webp`, `${UI}hero-phone.webp`],
];

const strip = ["card-original", "card-kids", "blk-tree", "card-cusher", "blk-sofa", "card-stockholm", "blk-bike", "blk-limited"];

const scenes: Scene[] = [
  /* the logo on black */
  { d: 1.1, el: (
    <div className="absolute inset-0 bg-black">
      <img src={LOGO} alt="" className="absolute left-1/2 top-1/2 w-[40cqw] -translate-x-1/2 -translate-y-1/2" style={anim("hfr-logo", "cubic-bezier(0.2,0.8,0.2,1)")} />
    </div>
  ) },
  /* the wordmark, cut off, on changing grounds */
  { d: 0.6, el: <TypeShot bg="#fff" dark pack={`${R}p-yellow.webp`} /> },
  { d: 0.6, el: <TypeShot photo={`${R}c-clogs.webp`} /> },
  { d: 0.6, el: <TypeShot bg="#4b9ecf" pack={`${R}p-rose.webp`} tilt={6} /> },
  { d: 0.7, el: <TypeShot bg="#fcb716" dark pack={`${R}p-sky.webp`} tilt={-4} /> },
  /* a wall of screens and photos on black, slowly closer */
  { d: 1.5, el: (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div className="absolute inset-[-6cqw] flex gap-[1cqw]" style={anim("hfr-wall")}>
        {wall.map((col, i) => (
          <div key={i} className="flex flex-1 flex-col gap-[1cqw]" style={{ marginTop: `${(i % 3) * -5}cqw` }}>
            {[...col, ...col].map((src, j) => (
              <div key={j} className="relative w-full overflow-hidden rounded-[0.4cqw] bg-white" style={{ aspectRatio: j % 3 === 1 ? "4 / 5" : "9 / 16" }}>
                <img src={src} alt="" className={`${cover} object-top`} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ) },
  /* three screens over a campaign photo */
  { d: 1.3, el: (
    <div className="absolute inset-0 overflow-hidden">
      <img src={`${R}c-orig.webp`} alt="" className={cover} style={anim("hfr-push")} />
      <div className="absolute inset-0 bg-black/25" />
      <Screen src={`${SHOT}m-collection.webp`} className="absolute left-[9cqw] top-[7cqw] h-[50cqw] w-[25cqw]" style={anim("hfr-rise", "cubic-bezier(0.2,0.8,0.2,1)")} />
      <Screen src={`${SHOT}m-product.webp`} className="absolute left-[38cqw] top-[12cqw] h-[48cqw] w-[24cqw]" style={{ ...anim("hfr-rise", "cubic-bezier(0.2,0.8,0.2,1)"), animationDelay: "0.08s" }} />
      <Screen src={`${SHOT}m-home.webp`} className="absolute left-[67cqw] top-[5cqw] h-[44cqw] w-[23cqw]" style={{ ...anim("hfr-rise", "cubic-bezier(0.2,0.8,0.2,1)"), animationDelay: "0.16s" }} />
    </div>
  ) },
  /* one screen at a time on flat colours */
  ...[
    ["#cfe3dc", `${SHOT}m-home.webp`],
    ["#f3ede2", `${SHOT}m-product.webp`],
    ["#fcd3dc", `${SHOT}m-collection.webp`],
    ["#7d8a5c", `${UI}hero-phone.webp`],
  ].map(([bg, src]) => ({ d: 0.42, el: (
    <div className="absolute inset-0" style={{ background: bg }}>
      <Screen src={src} className="absolute left-1/2 top-1/2 h-[56cqw] w-[28cqw] -translate-x-1/2 -translate-y-1/2" />
    </div>
  ) })),
  /* a row of product cards sliding in on dark grey */
  { d: 1.6, el: (
    <div className="absolute inset-0 overflow-hidden bg-[#2f2f2f]">
      <div className="absolute left-[8cqw] top-1/2 flex -translate-y-1/2 gap-[1.4cqw]" style={anim("hfr-drift")}>
        {strip.map((n, i) => (
          <div key={n} className="h-[30cqw] flex-none overflow-hidden rounded-[0.5cqw] bg-white" style={{ animation: `hfr-slide 0.5s cubic-bezier(0.2,0.8,0.2,1) ${i * 0.11}s both` }}>
            <img src={`${UI}${n}.webp`} alt="" className="h-full w-auto" />
          </div>
        ))}
      </div>
    </div>
  ) },
  /* the brand words as a pattern */
  { d: 0.9, el: (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-[-2cqw] flex flex-col">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="whitespace-nowrap font-display text-[8.4cqw] font-extrabold uppercase leading-[0.86] tracking-[-0.02em] text-[#4b9ecf]" style={{ animation: `${i % 2 ? "hfr-row-r" : "hfr-row-l"} var(--d) linear both` }}>
            {"Zacht · Happy · Flops · Zacht · Happy · Flops · "}
          </div>
        ))}
      </div>
    </div>
  ) },
  /* the credit: both logos, as they are */
  { d: 1.1, el: (
    <div className="absolute inset-0 flex items-center justify-center gap-[5cqw] bg-[#4b9ecf] text-white">
      <img src={LOGO} alt="" className="w-[30cqw]" style={{ animation: "hfr-blink 0.3s steps(3) 0.1s both" }} />
      <span className="font-display text-[4cqw] font-light" style={{ animation: "hfr-blink 0.3s steps(3) 0.25s both" }}>×</span>
      <span className="inline-flex items-baseline leading-none" style={{ animation: "hfr-blink 0.3s steps(3) 0.4s both" }}>
        <span className="font-display text-[6.4cqw] font-bold tracking-[-0.03em]">nxt</span>
        <span className="serif-italic ml-[0.03em] text-[7.8cqw]">frame</span>
        <FrameGlyph className="ml-[0.2em] size-[3.5cqw] translate-y-[-0.02em]" />
      </span>
    </div>
  ) },
  /* two campaign photos stacked */
  { d: 0.9, el: (
    <div className="absolute inset-0 grid grid-rows-[3fr_2fr] gap-[0.6cqw] bg-white">
      <div className="relative overflow-hidden"><img src={`${R}c-stock.webp`} alt="" className={cover} style={{ objectPosition: "50% 35%", ...anim("hfr-push") }} /></div>
      <div className="relative overflow-hidden"><img src={`${R}img139.webp`} alt="" className={cover} style={{ objectPosition: "50% 70%", ...anim("hfr-pan-x") }} /></div>
    </div>
  ) },
  /* the shop panning past */
  { d: 1.2, el: (
    <div className="absolute inset-0 overflow-hidden bg-[#f4f4f2]">
      <div className="absolute left-[4cqw] top-1/2 flex -translate-y-1/2 items-center gap-[2cqw]" style={anim("hfr-pan")}>
        <Screen src={`${SHOT}m-product.webp`} className="h-[46cqw] w-[23cqw] flex-none" />
        <div className="h-[34cqw] w-[54cqw] flex-none overflow-hidden rounded-[0.6cqw] bg-white shadow-[0_1.6cqw_3cqw_-1cqw_rgba(0,0,0,0.3)]"><img src={`${SHOT}d-product.webp`} alt="" className="size-full object-cover object-top" /></div>
        <div className="h-[34cqw] w-[54cqw] flex-none overflow-hidden rounded-[0.6cqw] bg-white shadow-[0_1.6cqw_3cqw_-1cqw_rgba(0,0,0,0.3)]"><img src={`${SHOT}d-collection.webp`} alt="" className="size-full object-cover object-top" /></div>
      </div>
    </div>
  ) },
];

/* every image of the film, loaded up front so no cut shows an empty frame */
const preload = [...new Set([LOGO, ...wall.flat(), ...strip.map((n) => `${UI}${n}.webp`),
  ...["p-yellow", "p-rose", "p-sky", "c-clogs", "c-orig", "c-stock", "img139"].map((n) => `${R}${n}.webp`),
  ...["m-home", "m-product", "m-collection", "d-product", "d-collection"].map((n) => `${SHOT}${n}.webp`), `${UI}hero-phone.webp`])];

/** plays the shots in a loop while the film is on screen; with reduced motion it shows the wordmark shot */
export default function HappyFlopsReel() {
  const box = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(1);
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let started = false;
    const io = new IntersectionObserver(([e]) => {
      /* the first time it comes into view it starts from the logo */
      if (e.isIntersecting && !started) { started = true; setI(0); }
      setPlaying(e.isIntersecting);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setI((n) => (n + 1) % scenes.length);
      setRun((r) => r + 1);
    }, scenes[i].d * 1000);
    return () => clearTimeout(t);
  }, [playing, i, run]);

  return (
    <div ref={box} className="relative aspect-[3/2] w-full overflow-hidden rounded-[14px] bg-black [container-type:inline-size]" role="img" aria-label="Showreel van Happy Flops: het logo, campagnebeelden, slippers in alle kleuren en de schermen van de nieuwe webshop">
      <div key={`${i}-${run}`} className="absolute inset-0" style={{ "--d": `${scenes[i].d}s` } as CSSProperties}>
        {scenes[i].el}
      </div>
      <div className="hidden" aria-hidden="true">
        {preload.map((src) => <img key={src} src={src} alt="" />)}
      </div>
    </div>
  );
}
