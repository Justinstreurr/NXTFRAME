"use client";

import { useEffect, useRef } from "react";

/** what happens on a screen while the camera is in on it: a tap at `tap` (percent of the tile), after
    which the `next` screen slides up over it and/or a `sheet` slides up from the bottom; `bar` is a
    button that sits on the screen all along (and is where the tap lands), `badge` a counter that pops
    up, e.g. on the cart icon */
export type ReelAction = {
  tap?: [number, number];
  next?: string;
  sheet?: { title: string; text: string; cta?: string };
  bar?: string;
  badge?: [number, number];
};
export type ReelTile = { src: string; alt: string; /** width / height */ ratio: number; pos?: string; act?: ReelAction };

/* one turn of the film, in seconds: in on a screen and the action, out, drift, in on the next */
const TAP = 0.9, DONE = 1.35, OUT = 3.4, WIDE = 5.0, RESET = 7.5, IN = 10.4, TURN = 12;
/* the rows: five, each 24% of the box high with 2.6% between them, the middle one centred (the screens
   with an action are in there), the outer two cut off by the edges */
const ROWS = 5, ROW = 24, GAP = 2.6;
/* a tile then fills 72% of the box. The wall is laid out at this zoom (the camera is ZOOM times
   the box) and shrunk when the camera is out, so the screens are drawn sharp when it is in */
const ZOOM = 3;

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
const clamp = (x: number) => Math.min(1, Math.max(0, x));

/** Suitsupply's overview video rebuilt in code: rows of screens, product cards and photos on a
    flat ground, all drifting slowly to the left. The camera starts in on one screen of the middle row,
    something happens there (a tap, a product into the cart, the next page sliding up), then it pulls
    back to show the wall, drifts a while and goes in on the next screen. Sizes are in cqh (the camera's
    height), so the film keeps its proportions in any box. */
export default function CaseReel({ rows, bg }: { rows: ReelTile[][]; bg: string }) {
  const box = useRef<HTMLDivElement>(null);
  const cam = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current, camera = cam.current;
    if (!el || !camera) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tracks = [...el.querySelectorAll<HTMLElement>("[data-track]")];
    const middle = tracks[2];
    const speeds = [0.011, 0.013, 0.01, 0.012, 0.0115]; // box heights per second, zoomed out
    const starts = [0.35, 0.7, 0, 0.15, 0.55]; // where each row starts, in copy widths
    let t = 0, last = 0, frame = 0, visible = false;
    let focus: HTMLElement | null = null, next: HTMLElement | null = null;
    let done: HTMLElement | null = null;

    const offset = (i: number, at: number, H: number) => {
      const W = (tracks[i].firstElementChild as HTMLElement).offsetWidth;
      return -((at * speeds[i] * H + starts[i] * W) % W);
    };
    /* the actionable screen of the middle row whose centre will be nearest the middle at `at` */
    const pick = (at: number, W: number, H: number, not: HTMLElement | null) => {
      const x = offset(2, at, H);
      let best: HTMLElement | null = null, gap = Infinity;
      for (const tile of middle.querySelectorAll<HTMLElement>("[data-act]")) {
        const d = Math.abs(x + tile.offsetLeft + tile.offsetWidth / 2 - W / 2);
        if (d < gap && tile.dataset.src !== not?.dataset.src) { gap = d; best = tile; }
      }
      return best;
    };

    const draw = (now: number) => {
      frame = 0;
      if (last) t += Math.min(0.1, (now - last) / 1000);
      last = now;
      const W = el.clientWidth, H = el.clientHeight, Wc = camera.clientWidth, Hc = camera.clientHeight;
      tracks.forEach((tr, i) => { tr.style.transform = `translate3d(${offset(i, t, Hc).toFixed(1)}px,0,0)`; });

      const p = t % TURN;
      if (!focus) focus = pick(t, Wc, Hc, null);
      if (p >= IN && !next) next = pick(t + TURN - p, Wc, Hc, focus);
      if (p < IN && next) { focus = next; next = null; }

      /* the action on the screen in focus, and undoing it while the wall drifts */
      if (focus) {
        if (p >= TAP && p < DONE) focus.dataset.step = "tap";
        else if (p >= DONE && p < RESET) { focus.dataset.step = "done"; done = focus; }
      }
      if (p >= RESET && done) { delete done.dataset.step; done = null; }

      /* the camera: in on the focus, out, wide, in on the next */
      const target = p >= IN ? next : focus;
      const e = p < OUT ? 1 : p < WIDE ? 1 - ease((p - OUT) / (WIDE - OUT)) : p < IN ? 0 : ease(clamp((p - IN) / (TURN - IN)));
      let cx = Wc / 2, cy = Hc / 2;
      if (target && e > 0) {
        const fx = offset(2, t, Hc) + target.offsetLeft + target.offsetWidth / 2;
        const fy = (middle.parentElement as HTMLElement).offsetTop + target.offsetHeight / 2;
        cx += (fx - cx) * e;
        cy += (fy - cy) * e;
      }
      const s = (1 + (ZOOM - 1) * e) / ZOOM;
      camera.style.transform = `translate3d(${(W / 2 - s * cx).toFixed(1)}px,${(H / 2 - s * cy).toFixed(1)}px,0) scale(${s.toFixed(4)})`;

      if (visible) frame = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) { last = 0; frame = requestAnimationFrame(draw); }
    });
    io.observe(el);
    frame = requestAnimationFrame(draw);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div ref={box} className="absolute inset-0 overflow-hidden" style={{ background: bg }} aria-hidden="true">
      <div ref={cam} className="reel-cam absolute left-0 top-0 origin-top-left will-change-transform [container-type:size]" style={{ width: `${ZOOM * 100}%`, height: `${ZOOM * 100}%` }}>
        {/* the given rows dealt over five, the second given row (with the actions) in the middle */}
        {Array.from({ length: ROWS }, (_, i) => rows[(i + 2) % rows.length]).map((row, i) => (
          <div key={i} className="absolute inset-x-0" style={{ top: `${50 - ROW / 2 + (i - 2) * (ROW + GAP)}cqh`, height: `${ROW}cqh` }}>
            {/* the row twice in a row, so it can drift on without a seam */}
            <div data-track="" className="flex h-full w-max will-change-transform">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex h-full" style={{ gap: `${GAP}cqh`, paddingRight: `${GAP}cqh` }}>
                  {row.map((tile) => <Tile key={tile.src} tile={tile} />)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tile({ tile }: { tile: ReelTile }) {
  const a = tile.act;
  const tap = a?.tap ?? [50, 93];
  return (
    <div data-act={a ? "" : undefined} data-src={tile.src} className="reel-tile relative h-full flex-none overflow-hidden bg-white" style={{ aspectRatio: tile.ratio }}>
      <img src={tile.src} alt="" className="size-full object-cover" style={{ objectPosition: tile.pos ?? "50% 0%" }} loading="lazy" decoding="async" />
      {a?.next && <img src={a.next} alt="" className="reel-next absolute inset-0 size-full object-cover object-top" loading="lazy" decoding="async" />}
      {a?.bar && (
        <span className="absolute inset-x-[6%] bottom-[3%] flex h-[1.44cqh] items-center justify-center rounded-full bg-black text-[0.54cqh] font-semibold text-white">{a.bar}</span>
      )}
      {a?.badge && (
        <span className="reel-badge absolute flex size-[0.78cqh] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e8443a] text-[0.45cqh] font-bold text-white" style={{ left: `${a.badge[0]}%`, top: `${a.badge[1]}%` }}>1</span>
      )}
      {a?.sheet && (
        <div className="reel-sheet absolute inset-x-0 bottom-0 rounded-t-[0.84cqh] bg-white px-[0.96cqh] pb-[1.08cqh] pt-[0.72cqh] text-[#111] shadow-[0_-0.6cqh_1.8cqh_rgba(0,0,0,0.18)]">
          <span className="mx-auto mb-[0.72cqh] block h-[0.21cqh] w-[1.8cqh] rounded-full bg-black/15" />
          <span className="flex items-center gap-[0.48cqh]">
            <span className="flex size-[1.2cqh] flex-none items-center justify-center rounded-full bg-[#1f9d55] text-white">
              <svg viewBox="0 0 16 16" className="size-[0.66cqh]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
            </span>
            <span className="text-[0.69cqh] font-semibold leading-tight">{a.sheet.title}</span>
          </span>
          <span className="mt-[0.48cqh] block text-[0.51cqh] leading-snug text-black/60">{a.sheet.text}</span>
          {a.sheet.cta && <span className="mt-[0.72cqh] flex h-[1.44cqh] items-center justify-center rounded-full bg-black text-[0.54cqh] font-semibold text-white">{a.sheet.cta}</span>}
        </div>
      )}
      {a && (
        <span className="reel-tap pointer-events-none absolute size-[1.56cqh] -translate-x-1/2 -translate-y-1/2" style={{ left: `${tap[0]}%`, top: `${tap[1]}%` }}>
          <span className="reel-ring absolute inset-0 rounded-full border-[0.12cqh] border-white" />
          <span className="reel-dot absolute inset-[22%] rounded-full bg-white/90 shadow-[0_0.18cqh_0.6cqh_rgba(0,0,0,0.35)]" />
        </span>
      )}
    </div>
  );
}
