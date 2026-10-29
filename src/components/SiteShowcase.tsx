"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Film of a website, after Instrument's Nike Digital Design System piece. Used for the Happy Flops
 * case (HfShowcase) and, with several sites in a row, in the homepage hero.
 * One loop, all real pixels of the site:
 *   1. a bare phone screen shows the page and it scrolls down in quick steps, with motion blur;
 *   2. the screen melts into a card and blocks of that same site pop on top of it, fast,
 *      each a little offset, until there is a pile;
 *   3. the pile bursts apart and the cards spread over the whole box at different sizes,
 *      the middle one sharp and the near and far ones out of focus;
 *   4. the middle card, which already shows the next page, grows back into the screen while
 *      the others fade, and the loop starts over with that page.
 * Driven by the Web Animations API from one async timeline; motion-free visitors get the screen.
 * The box is sized by the parent (className); `scale` shrinks the screen and the cards inside it.
 */
export type ShowcaseCard = {
  src: string;
  /** rendered width in px (at scale 1); the image keeps its own aspect ratio */
  w: number;
};

export type ShowcasePage = {
  /** the whole page as one tall screenshot, 780px wide */
  full: string;
  /** the top of the page, 780x1688: the card that grows into the screen */
  screen: string;
  /** scroll stops, in screenshot pixels; the first one is 0 */
  stops: number[];
  /** blocks of this page, taken apart, that pile up after the scroll (up to twelve) */
  cards: ShowcaseCard[];
};

/* where each card sits: offset from the centre in the pile (px at scale 1), and its resting spot
   in the spread: % of the box width and height, scale (depth), tilt, focus. Slot 0 is the middle
   card of the spread: it always shows the top of the next page. */
type Slot = { pile: [number, number]; spread: { x: number; y: number; s: number; r: number; b: number } };
const slots: Slot[] = [
  { pile: [0, 0], spread: { x: 0, y: 0, s: 1, r: 0, b: 0 } },
  { pile: [-70, -60], spread: { x: -30, y: -22, s: 0.9, r: -4, b: 1.2 } },
  { pile: [80, -40], spread: { x: 28, y: -24, s: 1.05, r: 3, b: 0.6 } },
  { pile: [-90, 70], spread: { x: -34, y: 20, s: 1.1, r: 5, b: 1.8 } },
  { pile: [95, 60], spread: { x: 33, y: 22, s: 0.85, r: -3, b: 2.2 } },
  { pile: [-40, -100], spread: { x: -12, y: -34, s: 0.75, r: 2, b: 2.6 } },
  { pile: [50, 100], spread: { x: 12, y: 34, s: 1.15, r: -2, b: 1.4 } },
  { pile: [-110, -10], spread: { x: -22, y: 2, s: 0.7, r: -6, b: 3 } },
  { pile: [110, 10], spread: { x: 20, y: 4, s: 0.8, r: 4, b: 1 } },
  { pile: [0, -130], spread: { x: 4, y: -31, s: 0.9, r: -1, b: 2 } },
  { pile: [20, 140], spread: { x: -6, y: 31, s: 0.8, r: 1, b: 1.6 } },
  { pile: [-130, 120], spread: { x: -36, y: -2, s: 0.95, r: -5, b: 0.8 } },
  { pile: [130, -120], spread: { x: 36, y: -4, s: 1, r: 6, b: 1.5 } },
];
const SCREEN_W = 200;

/* where the chosen card lies after the shuffle, in turn: the middle, off to the left, right, low
   on the left; from there it is pulled to the middle and becomes the screen. % of the box. */
const spots = [
  { x: 0, y: 0 },
  { x: -28, y: 12 },
  { x: 26, y: -10 },
  { x: -22, y: -18 },
];

const SNAP = "cubic-bezier(0.8, 0, 0.2, 1)";
const POP = "cubic-bezier(0.2, 0.9, 0.3, 1)";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* start a new animation on an element, keeping whatever the previous ones left behind */
function play(el: HTMLElement, frames: Keyframe[], opts: KeyframeAnimationOptions) {
  for (const a of el.getAnimations()) {
    try {
      a.commitStyles();
    } catch {
      /* not rendered yet */
    }
    a.cancel();
  }
  return el.animate(frames, { fill: "forwards", ...opts });
}

/* the card in slot i (1..12) for a page: its blocks in order, repeated if there are fewer than twelve */
const cardFor = (page: ShowcasePage, i: number) => page.cards[(i - 1) % page.cards.length];

export default function SiteShowcase({
  pages,
  scale = 1,
  className = "",
  label = "De website, in beweging",
}: {
  pages: ShowcasePage[];
  scale?: number;
  className?: string;
  label?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const pageImgs = useRef<(HTMLImageElement | null)[]>([]);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const cardImgs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (pages.length === 0) return;
    let alive = true;
    const root = box.current!;
    const els = cardEls.current as HTMLDivElement[];
    const imgs = cardImgs.current as HTMLImageElement[];
    const pageEls = pageImgs.current as HTMLImageElement[];

    const pileT = (s: Slot, k = 1) => `translate(-50%, -50%) translate(${s.pile[0] * scale}px, ${s.pile[1] * scale}px) scale(${k})`;
    const spreadT = (s: Slot) => {
      const vw = root.clientWidth / 100, vh = root.clientHeight / 100;
      return `translate(-50%, -50%) translate(${s.spread.x * vw}px, ${s.spread.y * vh}px) rotate(${s.spread.r}deg) scale(${s.spread.s})`;
    };
    const setCard = (i: number, src: string, w: number) => {
      if (imgs[i].getAttribute("src") !== src) imgs[i].src = src;
      els[i].style.setProperty("--w", `${Math.round(w * scale)}px`);
    };
    const loaded = (img: HTMLImageElement) =>
      img.complete ? Promise.resolve() : new Promise((r) => { img.onload = r; img.onerror = r; });
    let spot = 0;

    async function cycle(idx: number): Promise<number> {
      const page = pages[idx], nextIdx = (idx + 1) % pages.length, next = pages[nextIdx];
      const scr = screen.current!, ph = phone.current!;
      const s = scr.clientWidth / 780;
      // the middle card's resting spot in this shuffle
      const zero: Slot = { ...slots[0], spread: { ...slots[0].spread, ...spots[spot] } };

      // 1. the screen, scrolling; meanwhile the cards get this page's blocks
      pageEls.forEach((img, i) => { img.style.opacity = i === idx ? "1" : "0"; img.style.transform = "translateY(0)"; });
      setCard(0, next.screen, SCREEN_W);
      for (let i = 1; i < slots.length; i++) setCard(i, cardFor(page, i).src, cardFor(page, i).w);
      play(ph, [{ opacity: 1, transform: "scale(1)" }], { duration: 1 });
      await sleep(1100);
      const pg = pageEls[idx];
      let prev = 0;
      for (const stop of page.stops.slice(1)) {
        if (!alive) return idx;
        await play(pg, [
          { transform: `translateY(${-prev * s}px)`, filter: "blur(0px)" },
          { filter: "blur(5px)", offset: 0.45 },
          { transform: `translateY(${-stop * s}px)`, filter: "blur(0px)" },
        ], { duration: 640, easing: SNAP }).finished;
        prev = stop;
        await sleep(560);
      }
      await Promise.all(imgs.map(loaded));

      // 2. the screen becomes a card and the pile grows on top of it
      play(ph, [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(0.9)" }], { duration: 380, easing: "ease-in" });
      for (let i = 0; i < slots.length; i++) {
        if (!alive) return idx;
        els[i].style.zIndex = String(10 + i);
        play(els[i], [{ opacity: 0, transform: pileT(slots[i], 0.82) }, { opacity: 1, transform: pileT(slots[i]) }], { duration: 240, easing: POP });
        await sleep(i === 0 ? 260 : 115);
      }
      await sleep(650);

      // 3. the pile bursts into the spread
      const burst = slots.map((s0, i) => {
        const sl = i === 0 ? zero : s0;
        els[i].style.zIndex = String(Math.round(sl.spread.s * 100) + (i === 0 ? 200 : 0));
        return play(els[i], [{ transform: pileT(sl), filter: "blur(0px)" }, { transform: spreadT(sl), filter: `blur(${sl.spread.b}px)` }], { duration: 1100, easing: SNAP });
      });
      await Promise.all(burst.map((a) => a.finished));
      await sleep(2300);

      // 4. the chosen card is pulled from its spot to the middle and grows into the screen, showing
      //    the next page; the rest fades
      if (!alive) return idx;
      const grow = scr.clientWidth / els[0].clientWidth;
      els[0].style.zIndex = "300";
      slots.forEach((sl, i) => {
        if (i === 0) return;
        play(els[i], [{ opacity: 1, transform: spreadT(sl) }, { opacity: 0, transform: `${spreadT(sl)} scale(0.94)` }], { duration: 520, easing: "ease-out" });
      });
      await play(els[0], [{ transform: spreadT(zero) }, { transform: `translate(-50%, -50%) scale(${grow})` }], { duration: 820, easing: SNAP }).finished;
      pageEls.forEach((img, i) => { img.style.opacity = i === nextIdx ? "1" : "0"; img.style.transform = "translateY(0)"; });
      for (const a of pageEls[nextIdx].getAnimations()) a.cancel();
      await play(ph, [{ opacity: 0, transform: "scale(1)" }, { opacity: 1, transform: "scale(1)" }], { duration: 420, easing: "ease-out" }).finished;
      play(els[0], [{ opacity: 1 }, { opacity: 0 }], { duration: 160 });
      await sleep(200);
      for (const el of els) { for (const a of el.getAnimations()) a.cancel(); el.style.opacity = "0"; }
      spot = (spot + 1) % spots.length;
      return nextIdx;
    }

    (async () => {
      // warm the caches so nothing pops in half-loaded: the pages and screens now, every block later
      await Promise.all([...imgs, ...pageEls].map(loaded));
      for (const p of pages) for (const c of p.cards) { const im = new Image(); im.src = c.src; }
      // a copy that is display:none (the other breakpoint) waits until it is shown
      while (alive && root.getClientRects().length === 0) await sleep(500);
      let idx = 0;
      while (alive) idx = await cycle(idx);
    })();

    return () => { alive = false; };
  }, [pages, scale]);

  const first = pages[0];
  const second = pages[1 % pages.length];

  return (
    <div
      ref={box}
      className={`hf-hero overflow-hidden ${className}`}
      style={{ "--pw-sm": `${Math.round(236 * scale)}px`, "--pw-md": `${Math.round(300 * scale)}px` } as CSSProperties}
      aria-label={label}
      role="img"
    >
      <div className="absolute inset-0 grid place-items-center">
        {/* the site, taken apart into cards; hidden until the timeline calls them. The middle card
            (slot 0) does not bob: it is the one that is pulled in and becomes the screen, and it must
            not drift while it grows. */}
        {slots.map((_, i) => {
          const card = i === 0 ? { src: second.screen, w: SCREEN_W } : cardFor(first, i);
          return (
            <div
              key={i}
              ref={(el) => { cardEls.current[i] = el; }}
              className="hf-card pointer-events-none absolute left-1/2 top-1/2 opacity-0"
              style={{ "--w": `${Math.round(card.w * scale)}px`, transform: "translate(-50%, -50%)" } as CSSProperties}
              aria-hidden="true"
            >
              <img
                ref={(el) => { cardImgs.current[i] = el; }}
                src={card.src}
                alt=""
                className={`${i === 0 ? "" : "hf-bob"} block h-auto w-full rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]`}
                style={i === 0 ? undefined : { animationDelay: `${-i * 0.7}s` }}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          );
        })}

        {/* the screen, bare, with the real site scrolling on it; no phone frame, like the Nike film */}
        <div ref={phone} className="hf-phone relative z-20">
          <div ref={screen} className="relative aspect-[390/844] overflow-hidden rounded-[1.6rem] bg-paper shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] md:rounded-[2rem]">
            {pages.map((p, i) => (
              <img
                key={p.full}
                ref={(el) => { pageImgs.current[i] = el; }}
                src={p.full}
                alt=""
                className="absolute left-0 top-0 w-full"
                style={{ opacity: i === 0 ? 1 : 0, willChange: "transform, filter" }}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
