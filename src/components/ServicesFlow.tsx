"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import BranchIcon, { type IconKey } from "./BranchIcons";
import { tiers } from "./pricing";
import { Container, Eyebrow } from "./ui";

/* left: what NXT Frame builds */
const build: { label: string; short: string; href: string; icon: IconKey; img: string }[] = [
  { label: "Nieuwe website", short: "Website", href: "/website-laten-maken", icon: "layout", img: "/images/services/nieuwe-website.webp" },
  { label: "Webshop", short: "Webshop", href: "/webshop-laten-maken", icon: "bag", img: "/images/tiles/happy-flops.webp" },
  { label: "Redesign", short: "Redesign", href: "/website-redesign", icon: "sparkle", img: "/images/services/redesign.webp" },
  { label: "Vindbaar in Google en AI", short: "Vindbaar", href: "/vindbaar-in-google-en-chatgpt", icon: "search", img: "/images/services/vindbaar.webp" },
  { label: "Teksten en content", short: "Teksten", href: "/website-teksten", icon: "pen", img: "/images/services/teksten.webp" },
  { label: "Onderhoud", short: "Onderhoud", href: "/website-onderhoud", icon: "refresh", img: "/images/services/onderhoud.webp" },
];

/* right: what a site like that brings in, as the messages its owner gets. Examples of the kind of
   message, not figures from a client ("jouw plaats"), like the films on the branch pages */
const results: { title: string; meta: string; time: string; icon: IconKey; tone: string }[] = [
  { title: "Nieuwe offerteaanvraag", meta: "Badkamer · 3 foto's bijgevoegd", time: "nu", icon: "wrench", tone: "bg-lime text-forest" },
  { title: "Afspraak ingepland", meta: "Do 19:30 · kennismaking", time: "2 min", icon: "chat", tone: "bg-[#fcbbb9] text-[#440220]" },
  { title: "Bestelling betaald", meta: "€ 89,90 · iDEAL", time: "14 min", icon: "cart", tone: "bg-forest text-lime" },
  { title: "Gevonden in Google", meta: "“badkamer renoveren jouw plaats”", time: "1 u", icon: "search", tone: "bg-cream text-forest" },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** a short stack of messages, as the site's owner gets them */
function Notes({ items, from }: { items: typeof results; from: number }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((r, i) => (
        <li
          key={r.title}
          className="sf-note flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-forest shadow-[0_18px_36px_-22px_rgb(2_38_30/0.35)] ring-1 ring-forest/5"
          style={delay(500 + (from + i) * 160)}
        >
          <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${r.tone}`} aria-hidden="true">
            <BranchIcon name={r.icon} className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold leading-tight">{r.title}</span>
            <span className="mt-0.5 block truncate text-[13px] leading-tight text-forest/70">{r.meta}</span>
          </span>
          <span className="flex shrink-0 flex-col items-end gap-1">
            <span className="text-[11px] text-forest/70">{r.time}</span>
            {from + i === 0 && <span className="size-2 rounded-full bg-lime ring-2 ring-lime/30" aria-hidden="true" />}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Diensten as a turning wheel of services (after Framer's ImageWheel) with what they bring in on
 * either side: requests on the left, sales and being found on the right, as the messages the owner
 * receives. The wheel is pure CSS in 2D (.orb-* in globals.css): each card runs along an ellipse
 * by two plain moves, sideways and up-down a quarter turn apart, and grows towards the front; no 3D,
 * which measured too heavy. The browser runs it on the compositor, it pauses when the stage is off screen and stands still for visitors who prefer
 * less motion. The cards are pictures; the services are links in the row under the wheel.
 */
export default function ServicesFlow() {
  const stage = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "ready" | "in">("idle");
  // the wheel only turns while the stage is on screen
  const [spinning, setSpinning] = useState(false);

  // while the visitor scrolls past, the wheel turns faster, and eases back once the scrolling stops.
  // The speed is changed through the animations' playbackRate, which keeps every card where it is
  // (no jump), and only a handful of times per scroll, never per frame.
  useEffect(() => {
    const el = stage.current;
    if (!el || !spinning || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anims = el
      .getAnimations({ subtree: true })
      .filter((a) => a instanceof CSSAnimation && a.animationName.startsWith("orb"));
    const steps = [1.6, 2.2, 2.6]; // ramp up
    const down = [2, 1.5, 1.2, 1]; // ease back
    let rate = 1;
    let timers: number[] = [];
    let idle = 0;
    const setRate = (r: number) => {
      if (r === rate) return;
      rate = r;
      anims.forEach((a) => a.updatePlaybackRate(r));
    };
    const run = (seq: number[]) => {
      timers.forEach(clearTimeout);
      timers = seq.map((r, i) => window.setTimeout(() => setRate(r), i * 90));
    };
    let fast = false;
    const onScroll = () => {
      if (!fast) {
        fast = true;
        run(steps);
      }
      clearTimeout(idle);
      idle = window.setTimeout(() => {
        fast = false;
        run(down);
      }, 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      timers.forEach(clearTimeout);
      clearTimeout(idle);
      anims.forEach((a) => a.updatePlaybackRate(1));
    };
  }, [spinning]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSpinning(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already in view: no replay
    setState("ready");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setState("in");
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const colLabel = "text-[11px] font-semibold uppercase tracking-[0.2em] text-forest/70";

  return (
    <section data-zone="green" className="overflow-x-clip bg-cream pb-16 pt-14 text-forest md:pb-32 md:pt-24">
      <Container>
        {/* a centred, large header in the manner of Apple's product pages */}
        <div className="text-center">
          <Eyebrow className="mx-auto">Diensten</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-5xl font-display text-[clamp(2.5rem,1.4rem+4.2vw,5.25rem)] leading-[0.98] tracking-[-0.035em] text-forest md:mt-8">
            Wat ik bouw, <span className="serif-italic">en wat het oplevert</span>
          </h2>
          <div>
            <p className="mx-auto mt-6 max-w-2xl text-forest/75 t-lead">
              Eén maker voor alles wat je site nodig heeft. Niet om er mooi uit te zien, maar om aanvragen, afspraken en bestellingen binnen te halen.
            </p>
            <Link href="/diensten" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium underline-offset-4 hover:underline">
              Alle diensten
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 11 11 5M6 5h5v5" />
              </svg>
            </Link>
          </div>
        </div>

        {/* the stage, open on the cream: the services turn on a large tilted wheel in the middle,
            what they bring in stands left and right */}
        <div
          ref={stage}
          data-state={state}
          className={`sf-stage relative mt-6 md:mt-8 ${spinning ? "" : "wheel-paused"}`}
        >
          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] lg:gap-8">
            {/* left: requests coming in */}
            <div className="relative z-10 order-2 lg:order-none">
              <p className={colLabel}>Aanvragen</p>
              <Notes items={results.slice(0, 2)} from={0} />
            </div>

            {/* middle: the wheel of services */}
            <div className="order-1 lg:order-none">
              <div className="wheel relative h-[290px] md:h-[450px] xl:h-[500px]" aria-hidden="true">
                <div className="wheel-tilt absolute inset-0">
                  {build.map((b, i) => (
                    <div key={b.label} className="orb" style={{ "--p": i / build.length } as CSSProperties}>
                      <div className="orb-x size-full">
                        <div className="orb-y size-full">
                          <div className="relative size-full overflow-hidden bg-forest">
                            <img src={b.img} alt="" width={800} height={1000} className="size-full object-cover" loading="lazy" decoding="async" />
                            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgb(0_0_0/0.6),transparent)]" />
                            <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-lg bg-white p-1.5 text-[11px] font-semibold leading-tight text-forest md:bottom-3 md:left-3 md:right-3 md:gap-2 md:rounded-xl md:px-2.5 md:py-1.5 md:text-[13px]">
                              <BranchIcon name={b.icon} className="size-3 shrink-0 md:size-3.5" />
                              <span className="hidden truncate md:inline">{b.short}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* the same services as links: the turning cards are pictures, these are the way in */}
              <ul className="relative mt-4 flex flex-wrap justify-center gap-2">
                {build.map((b) => (
                  <li key={b.label}>
                    <Link href={b.href} className="inline-block rounded-full bg-white px-3.5 py-1.5 text-[14px] text-forest ring-1 ring-forest/10 transition-colors hover:bg-forest hover:text-lime">
                      {b.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* right: sales and being found */}
            <div className="relative z-10 order-3 lg:order-none">
              <p className={colLabel}>Omzet en vindbaarheid</p>
              <Notes items={results.slice(2)} from={2} />
            </div>
          </div>

          {/* the foot of the stage: three plain facts */}
          <ul className="relative mt-12 flex flex-wrap justify-center gap-x-10 gap-y-3 border-t border-forest/10 pt-8 text-[15px] text-forest/75 md:mt-16">
            {["Eén aanspreekpunt, van schets tot lancering", "Eén vaste prijs vooraf", `Een complete site live in ${tiers[0].time}`].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-forest" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
