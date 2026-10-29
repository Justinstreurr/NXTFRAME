"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The call to action in the nav, handing over from the hero. While the hero's own buttons (marked
 * `data-hero-cta`) are in view, the nav shows no button of its own; once they slide up under the
 * bar, the nav button grows in from the right and the links make room, and it folds away again on
 * the way back up. Pages without such a hero show the nav button straight away.
 *
 * `waitForHero` is set for the photo nav, whose pages open on a hero with buttons: the button then
 * starts hidden, so it never flashes in and out on load. The width animates through a 0fr -> 1fr
 * grid column (see .nav-cta in globals.css), so nothing jumps.
 */
export default function NavCta({ children, waitForHero = false }: { children: ReactNode; waitForHero?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(!waitForHero);

  useEffect(() => {
    const hero = document.querySelector("[data-hero-cta]");
    if (!hero) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- no hero on this page: show the button
      setOn(true);
      return;
    }
    // the bar's bottom edge: the hero buttons count as gone once they are fully under it
    const bar = box.current?.closest("header")?.getBoundingClientRect().bottom ?? 80;
    const io = new IntersectionObserver(
      ([e]) => setOn(!e.isIntersecting && e.boundingClientRect.top < bar),
      { rootMargin: `-${Math.round(bar)}px 0px 0px 0px` },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className={`nav-cta grid ${on ? "is-on" : ""}`} aria-hidden={!on} inert={!on}>
      <div className="min-w-0 overflow-hidden">{children}</div>
    </div>
  );
}
