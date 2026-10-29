"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { FrameGlyph } from "./Logo";
import MoreOnMobile from "./MoreOnMobile";

/**
 * "Wat je krijgt" on /makelaars and /financieel-advies: the parts of the site, as a quiet grid between
 * hairlines, on sand, a shade darker than the cream around it. Hovering a cell sets off a burst of dots from its middle:
 * each dot lights up a little later the further out it sits (plus some chance), in the cell's
 * two colours, and fades again, so a ring of dots runs out over the cell and leaves it clean. On touch screens a cell plays it once
 * as it scrolls into view. Nothing moves with reduced motion.
 */

/* a part of the site: what it is, what it does, and what it brings the office */
export type SiteFeature = { icon: IconName; title: string; body: string; result: string };

/* two colours per cell, in turn: wine and blush, forest and lime, blush and lime */
const palettes = [
  ["#440220", "#e8817c"],
  ["#02261e", "#9cc43a"],
  ["#e8817c", "#9cc43a"],
];

const GAP = 14; // px between dots
const DOT = 2.4; // px, the side of a dot
const SPREAD = 650; // ms for the wave to reach the far corner
const JITTER = 260; // ms of chance on top of that
const LIFE = 520; // ms a dot stays lit, before chance

function burst(canvas: HTMLCanvasElement, colors: string[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const dpr = window.devicePixelRatio || 1;
  const { width: w, height: h } = canvas.getBoundingClientRect();
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.scale(dpr, dpr);

  const cx = w / 2;
  const cy = h / 2;
  const far = Math.hypot(cx, cy);
  const dots: { x: number; y: number; start: number; life: number; color: string }[] = [];
  for (let x = (w % GAP) / 2; x < w; x += GAP) {
    for (let y = (h % GAP) / 2; y < h; y += GAP) {
      if (Math.random() < 0.3) continue; // leave gaps, so it reads as a scatter
      const d = Math.hypot(x - cx, y - cy) / far;
      dots.push({
        x, y,
        start: d * SPREAD + Math.random() * JITTER,
        life: LIFE * (0.6 + Math.random() * 0.8),
        color: colors[Math.random() < 0.55 ? 0 : 1],
      });
    }
  }
  const end = SPREAD + JITTER + LIFE * 1.4;

  let raf = 0;
  const t0 = performance.now();
  const frame = (now: number) => {
    const t = now - t0;
    ctx.clearRect(0, 0, w, h);
    for (const p of dots) {
      const local = t - p.start;
      if (local < 0 || local > p.life) continue;
      // up fast, a short hold, then out
      const k = local / p.life;
      ctx.globalAlpha = k < 0.15 ? k / 0.15 : k > 0.55 ? 1 - (k - 0.55) / 0.45 : 1;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - DOT / 2, p.y - DOT / 2, DOT, DOT);
    }
    if (t < end) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, w, h);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

function Cell({ item, index }: { item: SiteFeature; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const busy = useRef(false);

  const play = () => {
    if (busy.current || !canvas.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    busy.current = true;
    burst(canvas.current, palettes[index % palettes.length]);
    window.setTimeout(() => (busy.current = false), SPREAD + JITTER + LIFE * 1.4);
  };

  // touch screens have no hover: play once when the cell is well in view
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.7 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li ref={ref} onMouseEnter={play} className="relative overflow-hidden bg-sand px-8 py-12 text-center md:py-14">
      <canvas ref={canvas} className="pointer-events-none absolute inset-0 size-full" aria-hidden="true" />
      <span className="relative mx-auto grid size-12 place-items-center rounded-[14px] bg-paper shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_18px_-10px_rgba(2,38,30,0.35)] ring-1 ring-forest/[0.08]">
        <SellerIcon name={item.icon} />
      </span>
      <h3 className="relative mt-6 font-display text-lg font-semibold tracking-tight md:text-xl">{item.title}</h3>
      <p className="relative mx-auto mt-2 max-w-[34ch] text-[15px] leading-relaxed text-forest/65">{item.body}</p>
      {/* what it brings the office, the line a makelaar reads first */}
      <p className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-[13px] font-semibold text-[#440220] ring-1 ring-forest/[0.08]">
        <FrameGlyph className="size-2.5 text-[#440220]" />
        {item.result}
      </p>
    </li>
  );
}

export default function SellerGrid({ items }: { items: SiteFeature[] }) {
  return (
    // on phones the first three, the rest behind a button
    <MoreOnMobile show={3} label={`Toon alle ${items.length}`} as="ul" className="grid gap-px border-y border-forest/10 bg-forest/10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Cell key={it.title} item={it} index={i} />
      ))}
    </MoreOnMobile>
  );
}

/* ---------- the icons: duotone, a lime shape under a forest line, drawn on a 24 grid ---------- */

export type IconName = "value" | "area" | "team" | "sold" | "read" | "cost" | "speed" | "edit";

const fill = "#dafc92";
const ink = "#02261e";

const icons: Record<IconName, ReactNode> = {
  // a house with a euro coin in front: what it is worth
  value: (
    <>
      <path d="M3.5 11 12 4l8.5 7v8.5H3.5z" fill={fill} />
      <path d="M3.5 11 12 4l8.5 7M5.5 9.5v10h13v-10" />
      <circle cx="16.5" cy="16.5" r="4.5" fill="#fff" />
      <path d="M18.3 14.6a2.6 2.6 0 1 0 0 3.8M13.9 15.9h3M13.9 17.2h3" />
      <circle cx="16.5" cy="16.5" r="4.5" />
    </>
  ),
  // a pin on a folded map: the area
  area: (
    <>
      <path d="M3.5 6.5 9 4.5l6 2 5.5-2v13L15 19.5l-6-2-5.5 2z" fill={fill} />
      <path d="M3.5 6.5 9 4.5l6 2 5.5-2v13L15 19.5l-6-2-5.5 2zM9 4.5v13M15 6.5v13" />
      <path d="M12 14.5s-3-2.6-3-5a3 3 0 0 1 6 0c0 2.4-3 5-3 5z" fill="#fff" />
      <circle cx="12" cy="9.5" r="1" fill={ink} stroke="none" />
    </>
  ),
  // two people, the front one filled: the team
  team: (
    <>
      <circle cx="9" cy="8.5" r="3.2" fill={fill} />
      <path d="M3.5 19.5c.4-3.3 2.6-5.3 5.5-5.3s5.1 2 5.5 5.3z" fill={fill} />
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5c.4-3.3 2.6-5.3 5.5-5.3s5.1 2 5.5 5.3" />
      <path d="M15.5 5.6a3 3 0 0 1 0 5.8M17 14.4c2 .5 3.2 2.3 3.5 5.1" />
    </>
  ),
  // a sale sign with a tick: sold
  sold: (
    <>
      <path d="M5 6h14v8H5z" fill={fill} />
      <path d="M5 21V4M5 6h14v8H5" />
      <path d="m9 10 2 2 4-4" />
    </>
  ),
  // an open book: knowledge
  read: (
    <>
      <path d="M12 7c-2-1.6-4.8-2.2-8.5-2v12.5c3.7-.2 6.5.4 8.5 2z" fill={fill} />
      <path d="M12 7c-2-1.6-4.8-2.2-8.5-2v12.5c3.7-.2 6.5.4 8.5 2M12 7c2-1.6 4.8-2.2 8.5-2v12.5c-3.7-.2-6.5.4-8.5 2M12 7v12.5" />
    </>
  ),
  // a phone with a bolt on its screen: fast on mobile
  speed: (
    <>
      <rect x="6.5" y="3" width="11" height="18" rx="2.5" fill={fill} />
      <rect x="6.5" y="3" width="11" height="18" rx="2.5" />
      <path d="m12.8 7.5-2.6 4.2h3.6l-2.6 4.3" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  // a pencil over a page: edit it yourself
  edit: (
    <>
      <path d="M5 3.5h9l4 4v13H5z" fill={fill} />
      <path d="M13 20.5H5v-17h9l4 4v3" />
      <path d="M8 9h5M8 12.5h3" />
      <path d="m14 19.5.5-2.5 5-5a1.4 1.4 0 0 1 2 2l-5 5z" fill="#fff" />
    </>
  ),
  // a speech bubble with a question mark: the price question
  cost: (
    <>
      <path d="M4 5.5h16v10.5h-8.5L7 20v-4H4z" fill={fill} />
      <path d="M4 5.5h16v10.5h-8.5L7 20v-4H4z" />
      <path d="M10.2 9.2a1.9 1.9 0 1 1 2.6 1.8c-.5.2-.8.6-.8 1.1v.4" />
      <circle cx="12" cy="13.9" r=".8" fill={ink} stroke="none" />
    </>
  ),
};

function SellerIcon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}
