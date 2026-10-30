"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowIcon, Container, Eyebrow, TextLink } from "./ui";
import { services } from "./services";
import BranchIcon from "./BranchIcons";

const ROW = 62; // px between two names on the wheel: clear air above and below the pill
const STEP_MS = 4200; // how long each service stays up: long enough to read its pitch
const HOLD_MS = 8000; // how long the wheel waits after the visitor picks a service

/* where the four photos sit. Wide screens (xl): a loose collage around the centre column, two
   left and two right, staggered, each in its own outer band so they never touch the wheel.
   Below that the photos are a row above the wheel: four on tablets, the middle two on phones. */
const slots = [
  "hidden md:block xl:absolute xl:left-0 xl:top-[2%]",
  "xl:absolute xl:left-[15%] xl:top-[40%]",
  "xl:absolute xl:right-[15%] xl:top-[30%]",
  "hidden md:block xl:absolute xl:right-0 xl:top-[6%]",
];

/**
 * Diensten on the homepage as a rolling wheel. The six services turn upwards through a glass pill
 * in the middle of a forest stage, one at a time, each with its icon; the one in the pill has a lime arrow to its page
 * and its pitch right under the wheel, and four photos around it change with it.
 *
 * It turns by itself every few seconds while on screen. When the visitor picks a service (tap or
 * click) it holds that one for a while, then turns on again. Motion-free visitors get a still wheel
 * they step through. Photos load only once their
 * service comes up (or is next), so the stage costs a handful of pictures, not twenty-four.
 */
export default function ServicesWheel({ overlap = false }: { overlap?: boolean }) {
  const n = services.length;
  // the service in the middle, the one before it (to tell which names wrap round) and the services
  // whose photos may load: the current one and the next, so a swap never waits on the network
  const [{ active, from, seen }, setPos] = useState({ active: 0, from: 0, seen: [0, 1] });
  const go = (next: (a: number) => number) =>
    setPos((p) => {
      const a = next(p.active);
      const add = [a, (a + 1) % n].filter((x) => !p.seen.includes(x));
      return { active: a, from: p.active, seen: add.length ? [...p.seen, ...add] : p.seen };
    });
  const host = useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  // after the visitor picks a service the wheel holds still for a while, then turns on by itself
  const holdTurns = useRef(0);
  // when the mouse last moved over the names, and until when a hover may not turn the wheel again
  const lastMove = useRef(0);
  const hoverLock = useRef(0);

  // turn only while the stage is on screen (and the visitor allows motion)
  useEffect(() => {
    const el = host.current;
    // phones: no turning by itself, the visitor taps through; one moving thing per screen is enough
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen) return;
    const id = window.setInterval(() => {
      if (holdTurns.current > 0) holdTurns.current -= 1;
      else go((a) => (a + 1) % n);
    }, STEP_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- go only wraps the stable setPos
  }, [onScreen, n]);

  const pick = (i: number) => {
    holdTurns.current = Math.round(HOLD_MS / STEP_MS);
    go(() => i);
  };

  // offset of service i from the middle, in rows: -3 .. 2 (the -3 row sits hidden above the wheel)
  const offset = (i: number, a: number) => {
    let o = (i - a + n) % n;
    if (o > n / 2 - 1) o -= n;
    return o;
  };

  const current = services[active];

  const photo = (slot: number): ReactNode =>
    services.map((s, i) => {
      const src = s.imgs?.[slot];
      if (!src || !seen.includes(i)) return null;
      return (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 size-full object-cover transition-[opacity,scale] duration-700 ease-out ${i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );
    });

  return (
    <section
      ref={host}
      data-zone="green"
      className={`bg-forest py-12 text-cream md:py-32 ${overlap ? "relative z-20 rounded-t-[36px] md:rounded-t-[48px]" : ""}`}
    >
      <Container className="text-center">
        <Eyebrow tone="light" className="mx-auto">Diensten</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-4xl t-section md:mt-8">
          Van eerste schets tot <span className="serif-italic text-lime">site die verkoopt</span>
        </h2>
      </Container>

      <Container>
        {/* the stage: on wide screens it holds the photo collage with the wheel in the middle */}
        <div className="relative mx-auto mt-12 max-w-[1240px] md:mt-16 xl:h-[560px]">
          {/* the photos: a row above the wheel, or (xl) the collage around it */}
          <div className="flex justify-center gap-3 md:gap-4 xl:contents" aria-hidden="true">
            {slots.map((cls, slot) => (
              <div
                key={slot}
                className={`relative aspect-[3/4] w-[46%] max-w-[200px] overflow-hidden rounded-xl bg-cream/5 md:w-[23%] xl:w-[14%] xl:max-w-none ${cls}`}
              >
                {photo(slot)}
              </div>
            ))}
          </div>

          {/* the centre column: the wheel with the pitch of the service in the pill right under it */}
          <div className="relative mx-auto mt-10 w-full max-w-[420px] xl:absolute xl:inset-x-0 xl:top-1/2 xl:mt-0 xl:w-[32%] xl:-translate-y-1/2">
            <div className="relative h-[250px] md:h-[310px]">
              {/* the glass pill the middle name sits in, with the arrow to that service */}
              <div className="absolute inset-x-0 top-1/2 h-14 -translate-y-1/2 rounded-full bg-cream/10 ring-1 ring-cream/15" aria-hidden="true" />
              <a
                href={current.href ?? "/diensten"}
                className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-lime text-forest transition-colors hover:bg-lime-hover"
                aria-label={`Bekijk ${current.title}`}
              >
                <ArrowIcon className="size-4" />
              </a>
              <ul
                onPointerMove={(e) => (lastMove.current = e.timeStamp)}
                className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]">
                {services.map((s, i) => {
                  const o = offset(i, active);
                  // a name that wraps from the top round to the bottom (or back) jumps there unseen;
                  // every other name glides, also when a click moves the wheel by several rows
                  const wrapped = Math.abs(o - offset(i, from)) > n / 2;
                  const dist = Math.abs(o);
                  return (
                    <li
                      key={s.title}
                      // two or more rows from the pill a name is faded scenery, too pale to read, so it is
                      // out of reach for clicks, keys and screen readers
                      inert={dist > 1}
                      className={`absolute inset-x-0 top-1/2 flex justify-center pl-3 pr-12 md:px-12 xl:pl-3 xl:pr-12 ${wrapped ? "" : "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"}`}
                      style={{
                        transform: `translateY(calc(-50% + ${o * ROW}px))`,
                        opacity: dist === 0 ? 1 : dist === 1 ? 0.5 : dist === 2 ? 0.25 : 0,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => pick(i)}
                        // a mouse moving onto another name turns the wheel to it; only real pointer
                        // movement counts, and only once per turn, so a name sliding in under a still
                        // pointer never sets off a chain of turns
                        onPointerEnter={(e) => {
                          if (e.pointerType !== "mouse" || dist === 0) return;
                          if (e.timeStamp - lastMove.current > 80 || e.timeStamp < hoverLock.current) return;
                          hoverLock.current = e.timeStamp + 550;
                          pick(i);
                        }}
                        aria-current={dist === 0 ? "true" : undefined}
                        className={`group/svc flex max-w-full items-center gap-3 py-1.5 text-[15px] transition-colors md:text-[17px] ${dist === 0 ? "font-semibold text-cream" : "font-medium text-cream hover:text-lime"}`}
                      >
                        {/* the service's icon, as on the old grid: lime in the pill, quiet on the others */}
                        <span
                          className={`grid size-8 shrink-0 place-items-center rounded-lg transition-colors duration-500 ${dist === 0 ? "bg-lime text-forest" : "bg-cream/10 text-cream group-hover/svc:text-lime"}`}
                          aria-hidden="true"
                        >
                          <BranchIcon name={s.icon ?? "grid"} className="size-4" />
                        </span>
                        <span className="truncate">{s.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* the pitch of the service in the pill; read out only once the visitor drives the wheel,
                not every few seconds while it turns by itself */}
            <p
              key={active}
              className="svc-pitch mx-auto mt-4 min-h-[6.5em] max-w-md text-center text-base leading-relaxed text-cream/80"
              aria-live="off"
            >
              {current.body}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center xl:mt-4">
          <TextLink light href="/diensten">Alle diensten</TextLink>
        </div>
      </Container>
    </section>
  );
}
