"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import BranchIcon, { type IconKey } from "./BranchIcons";
import { ArrowIcon, Container } from "./ui";

/* body replaces the tag line where a card needs a sentence; pos places the photo (a screenshot sits at its top) */
export type Segment = { label: string; icon: IconKey; title: string; tags?: string[]; body?: string; img: string; pos?: string; href: string };

/* the card colours in turn: forest, blush, lime, wine */
const tones = [
  { card: "bg-forest text-cream", muted: "text-cream/70", count: "text-lime", tab: "bg-cream/10" },
  { card: "bg-[#fcbbb9] text-[#440220]", muted: "text-[#440220]/75", count: "text-[#440220]/75", tab: "bg-[#440220]/10" },
  { card: "bg-lime text-forest", muted: "text-forest/70", count: "text-forest/70", tab: "bg-forest/10" },
  { card: "bg-[#440220] text-[#fcbbb9]", muted: "text-cream/75", count: "text-[#fcbbb9]/70", tab: "bg-cream/10" },
];

/**
 * Voor wie as a carousel: the heading left with round arrows on the right, and under it a row of
 * tall cards, one colour each, that runs from the page margin off the right edge. Each card has
 * its number, the branch with its icon, a bold line, what the site does for it, and a photo at
 * the foot. The row is a plain scroll-snap strip, so swiping and trackpads work natively; the
 * arrows move it one card and grey out at either end.
 */
export default function BranchCarousel({
  header,
  items,
  cta = "Bekijk de branche",
  noun = "branche",
}: {
  header: ReactNode;
  items: Segment[];
  /** the link line on every card */
  cta?: string;
  /** what one card is, for the arrow labels */
  noun?: string;
}) {
  const strip = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // one card (plus the gap) per click
  const move = (dir: 1 | -1) => {
    const el = strip.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(card.parentElement!).columnGap) || 20;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  const arrow = "grid size-12 place-items-center rounded-full border border-forest/25 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream disabled:pointer-events-none disabled:opacity-30";

  return (
    <>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-0 flex-1">{header}</div>
          <div className="hidden gap-3 md:flex">
            <button type="button" className={arrow} onClick={() => move(-1)} disabled={atStart} aria-label={`Vorige ${noun}`}>
              <ArrowIcon className="size-4 -rotate-[135deg]" />
            </button>
            <button type="button" className={arrow} onClick={() => move(1)} disabled={atEnd} aria-label={`Volgende ${noun}`}>
              <ArrowIcon className="size-4 rotate-45" />
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={strip}
        className="bleed-left mt-12 snap-x snap-mandatory scroll-pl-6 overflow-x-auto pb-4 md:mt-16 md:scroll-pl-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-5 pr-6 md:pr-12">
          {items.map((sg, i) => {
            const t = tones[i % tones.length];
            return (
              <li key={sg.label} className="w-[300px] shrink-0 snap-start md:w-[420px]">
                <a href={sg.href} className={`group flex h-[480px] flex-col overflow-hidden rounded-t-3xl md:h-[540px] ${t.card}`}>
                  <span className="block p-6 md:p-8">
                    <span className={`block text-[13px] font-semibold tabular-nums ${t.count}`}>
                      {i + 1}/{items.length}
                    </span>
                    <span className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${t.tab}`}>
                      <BranchIcon name={sg.icon} className="size-4" />
                      {sg.label}
                    </span>
                    <span className="mt-4 block font-display text-[1.75rem] font-semibold leading-[1.08] tracking-tight md:text-[2rem]">
                      {sg.title}
                    </span>
                    <span className={`mt-3 block text-sm leading-relaxed ${t.muted}`}>{sg.body ?? sg.tags?.join(" · ")}</span>
                    <span className="mt-4 inline-flex items-center gap-2 border-b border-current/40 pb-0.5 text-sm font-semibold">
                      {cta}
                      <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </span>
                  {/* the photo fills the foot of the card, edge to edge, square: only the colour block on top
                      is rounded (the card rounds its top) */}
                  <span className="relative block min-h-0 flex-1 overflow-hidden">
                    <img
                      src={sg.img}
                      alt=""
                      style={sg.pos ? { objectPosition: sg.pos } : undefined}
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
