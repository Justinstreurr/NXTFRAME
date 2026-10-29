"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { MascotMotion, MascotPose } from "./mascot/Mascot3D";

const Mascot3D = dynamic(() => import("./mascot/Mascot3D"), { ssr: false });

/**
 * Where the end box sits in the viewport when the mascot gets there, as a share of the window
 * height. This sets the pace of the walk: the mascot has to cover the whole distance in exactly
 * the scrolling that brings the statement up to this line.
 */
const ARRIVE_AT = 0.62;

/**
 * The hero mascot walks from beside the buttons to its spot beside the statement under the hero.
 *
 * At the top of the page it stands on the (then invisible) mascot box next to the hero's buttons,
 * pointing at them and following the pointer. As the visitor scrolls it walks, at scroll pace, in
 * one straight line to the `[data-mascot-end]` box to the right of the big serif sentence, and
 * stands still there. Halfway it leaves the dark hero, so its limbs switch from cream to forest
 * green; that is driven by `data-mascot-landed` on <html>, because the mascot re-reads its palette
 * when an attribute there changes. The parent of this element is the positioning context, so it
 * has to contain both the hero and the statement.
 *
 * Desktop only, and motion-free visitors get the mascot parked in the hero.
 */
export default function MascotWalkdown() {
  const host = useRef<HTMLDivElement>(null);
  const [el, setEl] = useState<HTMLElement | null>(null);
  const motion = useRef<MascotMotion>({ heading: 1, speed: 0, phase: 0 });
  const [pose, setPose] = useState<MascotPose>("point");

  useEffect(() => {
    const box = host.current;
    const wrap = box?.parentElement;
    if (!box || !wrap) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let from = { x: 0, y: 0 };
    let to = { x: 0, y: 0 };
    let wrapTop = 0;
    let last: { x: number; y: number } | null = null;
    let lastT = performance.now();
    let raf = 0;
    let landed = false;

    const measure = () => {
      const w = wrap.getBoundingClientRect();
      wrapTop = w.top + window.scrollY;
      const start = wrap.querySelector(".hero-mascot")?.getBoundingClientRect();
      const end = wrap.querySelector("[data-mascot-end]")?.getBoundingClientRect();
      if (!start || !end) return;
      from = { x: start.left - w.left, y: start.top - w.top };
      to = { x: end.left - w.left, y: end.top - w.top };
    };

    const place = () => {
      raf = 0;
      const dist = Math.hypot(to.x - from.x, to.y - from.y);
      if (dist <= 0) return;

      // Driven by how far the page has scrolled past the mascot's starting point, so at the top of
      // the page it always stands beside the buttons. The walk is done by the time the end box
      // reaches ARRIVE_AT, which keeps the mascot on screen the whole way down.
      const h = window.innerHeight;
      const startScroll = Math.max(0, wrapTop + from.y - h * 0.6);
      const endScroll = Math.max(startScroll + 1, wrapTop + to.y - h * ARRIVE_AT);
      const s = window.scrollY - startScroll;
      const p = Math.min(Math.max(s / (endScroll - startScroll), 0), 1);
      setPose(p > 0.01 && p < 0.99 ? "walk" : "point");

      const x = from.x + (to.x - from.x) * p;
      const y = from.y + (to.y - from.y) * p;

      const now = performance.now();
      const dt = Math.max(16, now - lastT);
      lastT = now;
      const m = motion.current;
      if (last) {
        const dx = x - last.x;
        const step = Math.hypot(dx, y - last.y);
        if (Math.abs(dx) > 0.5) m.heading = dx > 0 ? 1 : -1;
        // an unhurried stride however fast the page is scrolled
        m.speed = Math.min(0.9, ((step / dt) * 16) / 9);
        m.phase += step / 26;
      } else {
        m.heading = to.x >= from.x ? 1 : -1;
      }
      last = { x, y };

      box.style.transform = `translate(${x}px, ${y}px)`;
      box.style.opacity = "1";

      const isLanded = p > 0.5;
      if (isLanded !== landed) {
        landed = isLanded;
        document.documentElement.toggleAttribute("data-mascot-landed", landed);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };

    setEl(box);
    measure();
    if (reduce) {
      box.style.transform = `translate(${from.x}px, ${from.y}px)`;
      box.style.opacity = "1";
      return;
    }
    place();
    const ro = new ResizeObserver(() => {
      measure();
      last = null;
      place();
    });
    ro.observe(wrap);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.removeAttribute("data-mascot-landed");
    };
  }, []);

  const style: CSSProperties = { opacity: 0 };

  return (
    <div
      ref={host}
      className="mascot-walkdown pointer-events-none absolute left-0 top-0 z-20 hidden h-32 w-40 md:block"
      style={style}
      aria-hidden="true"
    >
      {el && <Mascot3D paletteEl={el} interactive={pose === "point"} pose={pose} motion={motion} />}
    </div>
  );
}
