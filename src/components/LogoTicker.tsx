"use client";

import { useEffect, useState } from "react";

export type TickerLogo = { name: string; src: string; avif?: string; h: string; href: string };

/** how long the logos stay before they switch, ms */
const HOLD = 5000;
/** the slide itself, ms; must match the transition in globals.css (.logo-ticker) */
const SLIDE = 600;

/**
 * The brands side by side, one slot each, and every few seconds they all switch at once with the
 * same move as the button labels: the logo in each slot slides up and out and the next brand comes
 * in from below. Slot k starts at logo k, so with two brands the left one opens on the first, the
 * right one on the second, and after the switch they have swapped places. Inside a slot all logos
 * are stacked in one grid cell; the one that just left waits above until its slide is done and
 * is then dropped to the bottom without a transition, ready to come up again.
 * Motion-free visitors get the same turns without the slide (globals.css).
 */
export default function LogoTicker({ logos, className = "" }: { logos: TickerLogo[]; className?: string }) {
  const n = logos.length;
  const [step, setStep] = useState(0);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    if (n < 2) return;
    let drop = 0;
    const tick = window.setInterval(() => {
      setStep((s) => s + 1);
      setSliding(true);
      window.clearTimeout(drop);
      drop = window.setTimeout(() => setSliding(false), SLIDE + 50);
    }, HOLD);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(drop);
    };
  }, [n]);

  return (
    <div className={`flex flex-wrap items-center gap-x-12 gap-y-5 md:gap-x-16 ${className}`}>
      {logos.map((_, k) => {
        const active = (step + k) % n;
        const leaving = sliding ? (step - 1 + k + n) % n : -1;
        return (
          <div key={k} className="logo-ticker grid h-8 items-center justify-items-start overflow-hidden">
            {logos.map((l, i) => {
              const state = i === active ? "in" : i === leaving ? "out" : "wait";
              return (
                <a
                  key={l.name}
                  href={l.href}
                  data-state={state}
                  className="block"
                  aria-hidden={state !== "in"}
                  tabIndex={state === "in" ? 0 : -1}
                >
                  <picture className="flex items-center">
                    {l.avif && <source srcSet={l.avif} type="image/avif" />}
                    {/* any logo colour to cream, so every brand reads the same on the photo */}
                    <img src={l.src} alt={l.name} className={`w-auto brightness-0 invert ${l.h}`} loading="lazy" />
                  </picture>
                </a>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
