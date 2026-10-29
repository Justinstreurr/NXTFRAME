"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

/**
 * A water effect for a case photo, for a mouse only. While the pointer is over the card the photo
 * wobbles as if seen through moving water (an SVG turbulence feeding a displacement map, its
 * strength easing in and out), rings run out from the pointer, and a soft light follows it. The
 * filter is only switched on while the effect plays, so a still card costs nothing; touch screens
 * and visitors who prefer less motion get the plain photo. Listens on the card frame (the parent),
 * since the labels and the shade lie over the photo.
 */
export default function WaterHover({ children }: { children: ReactNode }) {
  const id = `water-${useId().replace(/:/g, "")}`;
  const layer = useRef<HTMLSpanElement>(null);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const rings = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = layer.current;
    const frame = el?.parentElement;
    if (!el || !frame || !turb.current || !disp.current) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let on = false;
    let strength = 0; // the displacement, eased towards its target
    let t = 0;
    let last = 0;
    let lastRing = 0;

    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      t += dt;
      strength += ((on ? 26 : 0) - strength) * (1 - Math.pow(0.02, dt));
      // the water keeps moving: the noise frequency breathes slowly
      const fx = 0.011 + Math.sin(t * 0.9) * 0.0025;
      const fy = 0.017 + Math.cos(t * 0.7) * 0.003;
      turb.current?.setAttribute("baseFrequency", `${fx.toFixed(4)} ${fy.toFixed(4)}`);
      disp.current?.setAttribute("scale", strength.toFixed(2));
      if (!on && strength < 0.3) {
        el.style.filter = "";
        raf = 0;
        last = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const ring = (x: number, y: number) => {
      const box = rings.current;
      if (!box) return;
      const r = document.createElement("span");
      r.className = "water-ring";
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      box.appendChild(r);
      r.addEventListener("animationend", () => r.remove());
    };

    const point = (e: PointerEvent) => {
      const b = frame.getBoundingClientRect();
      const x = e.clientX - b.left;
      const y = e.clientY - b.top;
      frame.style.setProperty("--wx", `${x}px`);
      frame.style.setProperty("--wy", `${y}px`);
      if (e.timeStamp - lastRing > 260) {
        lastRing = e.timeStamp;
        ring(x, y);
      }
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      on = true;
      frame.classList.add("is-water");
      el.style.filter = `url(#${id})`;
      point(e);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => {
      on = false;
      frame.classList.remove("is-water");
      if (!raf) raf = requestAnimationFrame(tick);
    };

    frame.addEventListener("pointerenter", enter);
    frame.addEventListener("pointermove", point);
    frame.addEventListener("pointerleave", leave);
    return () => {
      frame.removeEventListener("pointerenter", enter);
      frame.removeEventListener("pointermove", point);
      frame.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [id]);

  return (
    <>
      <svg className="pointer-events-none absolute size-0" aria-hidden="true" focusable="false">
        <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.011 0.017" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <span ref={layer} className="absolute inset-0 block">
        {children}
      </span>
      {/* the rings from the pointer, and the light that follows it (see .water-* in globals.css) */}
      <span ref={rings} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" />
      <span className="water-light pointer-events-none absolute inset-0" aria-hidden="true" />
    </>
  );
}
