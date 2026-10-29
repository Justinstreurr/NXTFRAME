"use client";

import { useEffect, useRef, type ReactNode } from "react";
import BranchIcon, { type IconKey } from "./BranchIcons";
import { ArrowIcon, Container } from "./ui";

export type Gain = { label: string; icon: IconKey; img: string; pos: string; title: ReactNode; body: string; cta: string; href: string };

/**
 * "Wat je krijgt" as a pinned scene. The text (`header`) and the three photo cards pin under the
 * nav while the visitor scrolls: first everything stands still so the first two cards can be read,
 * then the row slides left, and only once the third card is fully in view does the page scroll on.
 * On phones and tablets nothing pins: the cards are a row you swipe sideways.
 */
export default function GainsRail({ items, header }: { items: Gain[]; header?: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = host.current;
    const st = stage.current;
    const row = track.current;
    if (!el || !st || !row) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let distance = 0;
    let hold = 0;
    let raf = 0;
    const place = () => {
      raf = 0;
      if (!distance) return;
      // the stage has pinned once the host's top passes the sticky offset; from there the visitor
      // scrolls `hold` px with everything still, then `distance` px of sliding
      const stickyTop = parseFloat(getComputedStyle(st).top) || 0;
      const travelled = stickyTop - el.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (travelled - hold) / distance));
      const eased = p * p * (3 - 2 * p);
      row.style.transform = `translate3d(${-eased * distance}px, 0, 0)`;
    };
    const measure = () => {
      if (!desktop.matches || reduce) {
        el.style.height = "";
        row.style.transform = "";
        distance = 0;
        return;
      }
      distance = Math.max(0, row.scrollWidth - (row.parentElement?.clientWidth ?? 0));
      hold = Math.round(window.innerHeight * 0.35);
      el.style.height = `${st.offsetHeight + hold + distance}px`;
      place();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(place);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    desktop.addEventListener("change", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={host} className="relative">
      {/* pinned under the nav on desktop; the text first, the cards under it */}
      <div ref={stage} className="lg:sticky lg:top-24 lg:overflow-hidden lg:pb-6">
        {header}
        <Container className="mt-10 md:mt-12">
          {/* on desktop the row is cut off at the left page margin, as if the cards slide in behind a
              panel there, and runs on freely to the right */}
          <div className="-mx-6 overflow-x-auto px-6 pb-2 md:-mx-12 md:px-12 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0 lg:[clip-path:inset(-4rem_-100vw_-4rem_0)]">
            <ul ref={track} className="flex w-max snap-x snap-mandatory gap-5 will-change-transform lg:snap-none">
              {items.map((g, i) => (
                <li
                  key={g.label}
                  className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[calc((min(100vw,1720px)-6rem-1.25rem)/2)] xl:w-[calc((min(100vw,1720px)-10rem-1.25rem)/2)]"
                >
                  <a href={g.href} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-forest sm:aspect-[4/3] lg:aspect-[16/10]">
                    <img src={g.img} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" style={{ objectPosition: g.pos }} loading="lazy" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2.5 rounded-full bg-black/35 px-4 py-2.5 text-sm font-medium text-paper backdrop-blur-md">
                      <BranchIcon name={g.icon} className="size-4" />
                      {g.label}
                    </span>
                    <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-paper text-forest transition-colors group-hover:bg-lime" aria-hidden="true">
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                    {/* the promise on the photo, on a soft dark fade so it reads on any picture */}
                    <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/90 via-black/65 to-transparent px-6 pb-6 pt-36 text-paper [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] md:px-8 md:pb-8">
                      <span className="text-sm font-medium text-lime">0{i + 1}</span>
                      <span className="mt-1 block font-display text-2xl leading-tight tracking-tight md:text-3xl">{g.title}</span>
                      <span className="mt-3 block max-w-lg text-base leading-relaxed text-paper/95">{g.body}</span>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-paper">
                        {g.cta}
                        <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}
