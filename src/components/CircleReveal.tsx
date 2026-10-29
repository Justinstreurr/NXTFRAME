"use client";

import { useEffect, useRef } from "react";
import { Button } from "./ui";

/* the animated mockup on the right; until the file exists the frame shows a placeholder */
const MOCKUP_VIDEO: string | null = null;

/**
 * "Niet alleen mooi, ook converterend" as a scroll scene. The section is taller than the window and
 * its stage sticks; while you scroll, a lime circle rises from the bottom of the window and grows
 * until it fills the screen while the statement grows in at the centre. Then a forest panel is
 * pushed in from the right edge until it sits behind everything, the statement slides left and turns
 * cream on it, the copy comes in under it and an animated mockup appears on the right. Driven by one progress value `--p` (0 -> 1) on the stage; the CSS in
 * globals.css (.cr-*) maps it. Motion-free visitors get the finished state.
 */
export default function CircleReveal() {
  const host = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    const st = stage.current;
    if (!el || !st) return;
    // how far the title block has to sit right of its column to be centred on the screen at the start
    const measure = () => {
      const g = grid.current;
      const t = title.current;
      if (!g || !t) return;
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const shift = wide ? g.clientWidth / 2 - (t.offsetLeft + t.offsetWidth / 2) : 0;
      st.style.setProperty("--shift", `${Math.max(0, shift)}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      st.style.setProperty("--p", "1");
      return () => window.removeEventListener("resize", measure);
    }
    let raf = 0;
    const place = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / r.height));
      st.style.setProperty("--p", p.toFixed(4));
      // the circle grows from the bottom of the window and may spill up over Ons werk above it: its
      // layer reaches one window height above the stage, so y is measured from that layer's top
      const off = Math.max(0, r.top);
      const vmax = Math.max(vh, window.innerWidth);
      const c = Math.min(1, Math.max(0, (p - 0.2) / 0.3));
      const eased = 1 - Math.pow(1 - c, 2);
      const drop = 0.24 * vmax * (1 - eased);
      const cy = vh + (vh - off) + drop;
      const radius = eased * 1.3 * vmax;
      st.style.setProperty("--clip", `circle(${Math.max(0, radius).toFixed(1)}px at 50% ${cy.toFixed(1)}px)`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={host} data-zone="green" className="cr-scene relative z-10 h-[260vh] bg-cream">
      <div ref={stage} className="cr-stage sticky top-0 h-[100svh] overflow-x-clip" style={{ "--p": 0 } as React.CSSProperties}>
        {/* the circle, growing from below the bottom edge until it covers the window */}
        <div className="cr-circle pointer-events-none absolute inset-x-0 bottom-0 h-[200svh] bg-lime" aria-hidden="true" />

        <div className="absolute inset-0 flex items-center pt-16">
          <div className="relative mx-auto h-[min(78svh,660px)] w-full max-w-[1720px] px-6 md:px-12 xl:px-20">
            {/* the forest panel, pushed in from the right edge until it sits behind all the text */}
            <div className="cr-panel absolute inset-y-0 left-6 right-6 overflow-hidden rounded-3xl bg-forest md:left-12 md:right-12 xl:left-20 xl:right-20" aria-hidden="true">
              <div className="absolute -right-1/4 -top-1/3 size-[80%] rounded-full bg-lime/10 blur-3xl" />
            </div>

            <div ref={grid} className="relative z-10 grid h-full grid-cols-1 content-center gap-10 px-6 md:px-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 xl:px-16">
              {/* left: the statement grows in centred, slides into this column and turns cream as the
                  photo arrives; the copy and the button come in under it */}
              <div ref={title} className="cr-one w-fit max-w-full justify-self-center text-center lg:justify-self-start lg:text-left">
                <h2 className="cr-ink font-display text-[clamp(2.5rem,4.8vw,4.75rem)] leading-[1] tracking-[-0.03em]">
                  Niet alleen mooi, <span className="serif-italic cr-accent">ook converterend</span>
                </h2>
                <div className="cr-two">
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/85">
                    Een website moet kloppen bij jouw merk én bezoekers omzetten in klanten. Zo wordt design geen
                    kostenpost, maar je beste verkoper.
                  </p>
                  <Button className="mt-8" href="/contact">Plan een kennismaking</Button>
                </div>
              </div>
              {/* right: the animated mockup */}
              <div className="cr-rows relative hidden aspect-[16/10] w-full overflow-hidden rounded-2xl border border-paper/15 bg-paper/5 lg:block">
                {MOCKUP_VIDEO ? (
                  <video src={MOCKUP_VIDEO} className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline aria-hidden="true" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-sm uppercase tracking-[0.16em] text-paper/40">
                    Animatie-mockup
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
