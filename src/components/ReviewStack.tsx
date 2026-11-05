"use client";

import { useId, useState } from "react";

export type Review = { name: string; role: string; logo: string; href: string; quote: string };

const initials = (s: string) =>
  s
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/**
 * Client testimonials as one narrow stack, after the studio site Haptic: every client is a slim grey
 * row with a small square avatar, the name and role, and the brand's mark on the right; the open
 * row also shows the quote. Clicking a row opens that one instead. No animation on scroll; the
 * opening itself just swaps content, so nothing has to be repainted while the page moves.
 */
export default function ReviewStack({ reviews }: { reviews: Review[] }) {
  const [open, setOpen] = useState(0);
  const base = useId();

  return (
    <ul className="space-y-1.5">
      {reviews.map((r, i) => {
        const on = i === open;
        const panel = `${base}-p${i}`;
        return (
          <li key={r.name} className="rounded-lg bg-[#efece6]">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-expanded={on}
                aria-controls={panel}
                className="flex w-full items-center gap-3 p-3 text-left"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-forest text-[12px] font-semibold text-cream" aria-hidden="true">
                  {initials(r.name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold leading-tight text-forest">{r.name}</span>
                  <span className="block truncate text-[13px] leading-tight text-forest/70">{r.role}</span>
                </span>
                <span className="grid h-9 shrink-0 place-items-center rounded-md bg-forest px-2.5" aria-hidden="true">
                  <img src={r.logo} alt="" className="h-3 w-auto max-w-[72px] brightness-0 invert" loading="lazy" />
                </span>
              </button>
            </h3>
            <div id={panel} hidden={!on}>
              <figure className="px-3 pb-5 pt-6 md:px-4 md:pb-6 md:pt-10">
                <blockquote className="text-[17px] font-medium leading-snug tracking-[-0.01em] text-forest md:text-[19px]">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5">
                  <a href={r.href} className="text-[14px] font-medium text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest">
                    Bekijk de case van {r.name}
                  </a>
                </figcaption>
              </figure>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
