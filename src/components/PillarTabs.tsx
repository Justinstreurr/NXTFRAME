"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/** How long a pillar stays up before the next one takes over, in milliseconds. */
const DWELL = 6000;

/**
 * The three pillars without three times the page height: the heading, then the claims under each
 * other on the left and one card on the right that shows whichever is current. Pointing at a
 * claim or picking it folds its text open and cross-fades the card beside it, and left alone the
 * three take turns.
 *
 * The turn only runs while the section is on screen and nobody is pointing at it or tabbing
 * through it, and it never runs for a visitor who asked for less motion. Its countdown restarts
 * on every change, so a claim you picked yourself still gets its full time. The mark beside the
 * current claim fills up over that countdown, so you can see the change coming; it is keyed on
 * the same things that restart the timer, so the two never drift apart.
 *
 * All three cards stay mounted so the demos keep their place instead of starting over on every
 * switch; the ones out of view are paused from CSS.
 *
 * It behaves as a set of tabs, because that is what it is: arrow keys move through the claims,
 * and each card is the panel of the claim above it.
 */
export default function PillarTabs({
  heading,
  titles,
  copy,
  children,
}: {
  heading: ReactNode;
  titles: ReactNode[];
  copy: ReactNode[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cards = Children.toArray(children);
  const count = titles.length;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (held || !onScreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % count), DWELL);
    return () => clearTimeout(id);
  }, [active, held, onScreen, count]);

  const onKeyDown = (e: React.KeyboardEvent, k: number) => {
    const last = count - 1;
    const to =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? k === last
          ? 0
          : k + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? k === 0
            ? last
            : k - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : -1;
    if (to < 0) return;
    e.preventDefault();
    setActive(to);
    tabs.current[to]?.focus();
  };

  return (
    <div>
      <div className="mb-12 md:mb-14">{heading}</div>
      <div
        ref={wrap}
        className="grid w-full items-center gap-10 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-16"
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocusCapture={() => setHeld(true)}
        onBlurCapture={() => setHeld(false)}
      >
        <div
          className={`pillar-tabs ${held || !onScreen ? "is-paused" : ""}`}
          role="tablist"
          aria-label="Drie pijlers"
          aria-orientation="vertical"
        >
          {titles.map((t, k) => (
            <div key={k} className={`pillar-tab ${k === active ? "is-active" : ""}`}>
              <button
                ref={(el) => {
                  tabs.current[k] = el;
                }}
                type="button"
                role="tab"
                id={`pillar-tab-${k}`}
                aria-selected={k === active}
                aria-controls={`pillar-card-${k}`}
                tabIndex={k === active ? 0 : -1}
                onClick={() => setActive(k)}
                onMouseEnter={() => setActive(k)}
                onKeyDown={(e) => onKeyDown(e, k)}
                className="pillar-tab-button"
              >
                <span className="pillar-tab-mark" aria-hidden="true">
                  {k === active && (
                    <span
                      key={`${active}-${held}-${onScreen}`}
                      className="pillar-tab-fill"
                      style={{ animationDuration: `${DWELL}ms` }}
                    />
                  )}
                </span>
                <span className="font-display text-2xl leading-tight tracking-tight text-forest md:text-[28px]">
                  {t}
                </span>
              </button>
              <div className="pillar-tab-body">
                <div>
                  <div className="pillar-tab-copy">{copy[k]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pillar-panel relative h-[340px] md:h-[420px]">
          {cards.map((card, k) => (
            <div
              key={k}
              id={`pillar-card-${k}`}
              role="tabpanel"
              aria-labelledby={`pillar-tab-${k}`}
              aria-hidden={k !== active}
              className={`pillar-card-slot ${k === active ? "is-active" : ""}`}
            >
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
