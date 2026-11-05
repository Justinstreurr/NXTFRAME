"use client";

import { useState } from "react";

export type Review = { name: string; role: string; logo: string; href: string; quote: string };

const SECONDS = 7;

/**
 * The reviews one at a time, changing every few seconds. Left: a large counter ("01 — 02"), one thin
 * bar per review that fills as the countdown runs, and the client's name in small capitals. Right:
 * the quote as one large statement with the client's logo set in the line before it, who said it,
 * and the way to the case.
 *
 * Cheap to run: the countdown is a CSS animation on a transform (the GPU runs it) and its end moves
 * to the next review; the reviews share one grid cell and cross-fade by opacity, so the block keeps
 * the height of the longest and nothing below it jumps. Pointer over it or focus inside pauses the
 * countdown, and a pause button stops it for good (auto-changing content needs one).
 */
export default function ReviewStack({ reviews }: { reviews: Review[] }) {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [stopped, setStopped] = useState(false);
  const n = reviews.length;
  const next = () => setActive((a) => (a + 1) % n);
  const paused = hold || stopped;
  const pad = (i: number) => String(i).padStart(2, "0");

  return (
    <div
      className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-16"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false);
      }}
    >
      {/* left: counter, bars, name */}
      <div className="lg:pt-3">
        <p className="flex items-baseline gap-3 text-forest" aria-hidden="true">
          <span className="serif-italic text-[64px] leading-none md:text-[84px]">{pad(active + 1)}</span>
          <span className="text-[15px] text-forest/70">— {pad(n)}</span>
        </p>
        <div className="mt-6 flex max-w-[220px] gap-1.5">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Review ${i + 1} van ${n}: ${r.name}`}
              aria-current={i === active}
              className="group relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 block h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-forest/15">
                <span
                  key={i === active ? `on-${active}` : `off-${i}`}
                  className={`absolute inset-0 origin-left rounded-full bg-forest ${i < active ? "scale-x-100" : i > active ? "scale-x-0" : "review-fill"}`}
                  style={i === active ? { animationDuration: `${SECONDS}s`, animationPlayState: paused ? "paused" : "running" } : undefined}
                  onAnimationEnd={i === active ? next : undefined}
                />
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-forest/70">{reviews[active].name}</p>
          <button
            type="button"
            onClick={() => setStopped((s) => !s)}
            aria-label={stopped ? "Reviews laten wisselen" : "Reviews stilzetten"}
            className="grid size-6 place-items-center rounded-full border border-forest/20 text-forest/70 hover:border-forest hover:text-forest"
          >
            {stopped ? (
              <svg viewBox="0 0 16 16" className="size-2.5" fill="currentColor" aria-hidden="true"><path d="M5 3.5v9l7-4.5z" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" className="size-2.5" fill="currentColor" aria-hidden="true"><path d="M4.5 3h2.5v10H4.5zM9 3h2.5v10H9z" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* right: the quotes in one grid cell, cross-fading */}
      <div className="grid" role="group" aria-roledescription="carrousel" aria-label="Reviews van klanten">
        {reviews.map((r, i) => {
          const on = i === active;
          return (
            <figure
              key={r.name}
              // out first, then in: the old quote fades in 300ms, the new one follows after it, so they never overlap
              className={`col-start-1 row-start-1 transition-opacity ease-out ${on ? "opacity-100 delay-300 duration-500" : "pointer-events-none opacity-0 duration-300"}`}
              aria-hidden={!on}
              inert={!on}
            >
              <blockquote className="font-display text-[clamp(1.5rem,3vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.025em] text-forest">
                <img src={r.logo} alt={r.name} className="mr-3 inline-block h-[0.72em] w-auto align-baseline brightness-0" loading="lazy" />
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <span className="text-[15px] leading-snug text-forest/70">
                  <span className="block font-semibold text-forest">{r.name}</span>
                  {r.role}
                </span>
                <a
                  href={r.href}
                  className="inline-flex items-center gap-3 rounded-full bg-forest py-1.5 pl-5 pr-1.5 text-[14px] font-semibold text-cream transition-colors hover:bg-forest-hover"
                >
                  Bekijk de case
                  <span className="grid size-7 place-items-center rounded-full bg-cream text-forest" aria-hidden="true">
                    <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11 11 5M6 5h5v5" /></svg>
                  </span>
                </a>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
