"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FrameGlyph } from "./Logo";
import MoreOnMobile from "./MoreOnMobile";
import { quadMatrix } from "./quad";

/* one shared clock for all four films: a step every 1.3 s, eight steps a loop */
const STEPS = 8;
const TICK = 1300;

/** the clock, paused while the grid is off screen; with reduced motion it stands on the last step */
export function useStep() {
  const host = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(STEPS - 1);
  // true once the grid is within a screen or so; heavy pictures wait for it, so they don't compete with the first screen
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const ahead = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setNear(true);
      ahead.disconnect();
    }, { rootMargin: "800px 0px" });
    ahead.observe(el);
    return () => ahead.disconnect();
  }, []);
  useEffect(() => {
    const el = host.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e.isIntersecting) {
        setStep(0);
        timer = window.setInterval(() => setStep((s) => (s + 1) % STEPS), TICK);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);
  return { host, step, near };
}

export const show = (on: boolean) => `transition-all duration-500 ease-out ${on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`;

/* ---------- 1. Direct een prijs: the glossy glass calculator widget, with what it yields popping up around it ---------- */

/** what the calculation yields: two results and the step the visitor takes after it */
type CalcExample = { lines: [string, string][]; done: string };
const MORTGAGE: CalcExample = { lines: [["Maandlast", "€ 1.229"], ["Rente", "3,9% · 30 jaar"]], done: "Adviesgesprek ingepland" };

/** the widget render floats; one by one the results of a calculation appear beside it */
export function WidgetCalculator({ step, example = MORTGAGE }: { step: number; example?: CalcExample }) {
  const chip = "absolute flex items-center gap-2 whitespace-nowrap rounded-2xl bg-white/90 px-3.5 py-2.5 text-[13px] font-medium text-forest shadow-[0_18px_40px_-18px_rgba(2,38,30,0.45)] backdrop-blur";
  return (
    <div className="relative aspect-square w-full">
      <img src="/images/widget-rekentool.webp" alt="" className="sb-float absolute inset-0 size-full object-contain" loading="lazy" decoding="async" />
      <span className={`${chip} left-[2%] top-[4%] ${show(step >= 1 && step < 7)}`}>
        <span className="text-forest/70">{example.lines[0][0]}</span>
        <span className="font-semibold tabular-nums">{example.lines[0][1]}</span>
      </span>
      <span className={`${chip} right-[6%] top-[14%] ${show(step >= 2 && step < 7)}`}>
        <span className="text-forest/70">{example.lines[1][0]}</span>
        <span className="font-semibold tabular-nums">{example.lines[1][1]}</span>
      </span>
      <span className={`${chip} bottom-[30%] left-[0%] bg-forest/95 text-cream ${show(step >= 4 && step < 7)}`}>
        <span className="grid size-5 place-items-center rounded-full bg-lime text-[10px] text-forest">✓</span>
        {example.done}
      </span>
    </div>
  );
}

/* ---------- 2. Offertes en facturen: the glossy icon with thick pipes to the paperwork, a pulse running along one ----------
   The pills sit close to the icon (x 150-540): on a phone the sliced viewBox only shows the middle of the stage. */

const pipes = [
  { name: "Offerte", d: "M280 175 H150 Q120 175 120 145 V80 Q120 50 90 50 H-40", at: [205, 175] },
  { name: "Factuur", d: "M420 175 H560 Q590 175 590 205 V255 Q590 285 620 285 H760", at: [495, 175] },
  { name: "Agenda", d: "M350 245 V400", at: [350, 318] },
  { name: "Boekhouding", d: "M350 105 V70 Q350 40 380 40 H760", at: [455, 40] },
];

function Connections({ step, near }: { step: number; near: boolean }) {
  const active = step % pipes.length;
  return (
    <svg viewBox="0 0 700 350" preserveAspectRatio="xMidYMax slice" className="size-full" aria-hidden="true">
      <defs>
        <filter id="sb-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {/* the pipes: thick, soft white, like tubes on the surface */}
      {pipes.map((p) => (
        <path key={p.name} d={p.d} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {/* the current running through the active pipe, from the site out to the system */}
      {pipes.map((p, n) =>
        n === active ? (
          <g key={`${p.name}-${step}`}>
            <path d={p.d} fill="none" stroke="#9be15d" strokeWidth="8" strokeLinecap="round" pathLength={100} className="sb-current" filter="url(#sb-glow)" />
            <path d={p.d} fill="none" stroke="#02261e" strokeWidth="4" strokeLinecap="round" pathLength={100} className="sb-current" />
          </g>
        ) : null,
      )}
      {/* the systems, sitting on their pipe */}
      {pipes.map((p, n) => {
        const w = p.name.length * 8.4 + 34;
        const on = n === active;
        return (
          <g key={`${p.name}-pill`} transform={`translate(${p.at[0] - w / 2} ${p.at[1] - 17})`} className="transition-opacity">
            <rect width={w} height="34" rx="17" fill={on ? "#02261e" : "#ffffff"} className="transition-colors duration-500" style={{ filter: "drop-shadow(0 6px 10px rgba(2,38,30,0.12))" }} />
            <text x={w / 2} y="22" textAnchor="middle" fontSize="14" fontWeight="600" fill={on ? "#dafc92" : "#02261e"} className="font-sans">
              {p.name}
            </text>
          </g>
        );
      })}
      {/* the site: the glossy icon, floating gently */}
      <g className="sb-float">
        <ellipse cx="350" cy="262" rx="62" ry="10" fill="rgba(2,38,30,0.18)" filter="url(#sb-glow)" />
        {/* an SVG image can't load lazily, so it waits for the grid to come near */}
        {near && <image href="/images/icon-koppelingen.webp" x="265" y="90" width="170" height="170" />}
      </g>
    </svg>
  );
}

/* ---------- 3. AI-assistent: the chat on the screen of the laptop render, which runs off the foot of the card ---------- */

/* where the screen sits in public/images/laptop-assistent.webp, in % of the image (measured from the render) */
const SCREEN = { left: 13.82, top: 8.18, width: 72.43, height: 74.6 };

function LaptopChat({ step }: { step: number }) {
  const dots = (
    <span className="flex gap-[0.3em] py-[0.3em]" aria-hidden="true">
      {[0, 1, 2].map((d) => <span key={d} className="sb-dot size-[0.45em] rounded-full bg-cream/70" style={{ animationDelay: `${d * 150}ms` }} />)}
    </span>
  );
  return (
    <div className="relative aspect-[16/9] w-full">
      <img src="/images/laptop-assistent.webp" alt="" className="absolute inset-0 size-full" loading="lazy" decoding="async" />
      {/* the screen: everything inside is sized in em off the screen width (container units), so it scales with the render */}
      <div
        className="absolute overflow-hidden [container-type:inline-size]"
        style={{ left: `${SCREEN.left}%`, top: `${SCREEN.top}%`, width: `${SCREEN.width}%`, height: `${SCREEN.height}%` }}
      >
        <div className="flex size-full flex-col bg-[radial-gradient(80%_70%_at_50%_0%,rgba(155,225,93,0.12),transparent_70%)] text-[2.55cqw] leading-snug">
          <div className="flex items-center justify-between border-b border-cream/10 px-[1.4em] py-[0.8em]">
            <span className="flex items-center gap-[0.6em]">
              <span className="grid size-[2em] place-items-center rounded-full bg-lime text-forest"><FrameGlyph className="size-[0.9em]" /></span>
              <span>
                <span className="block font-semibold text-cream">Assistent</span>
                <span className="flex items-center gap-[0.4em] text-[0.8em] text-cream/55"><span className="size-[0.45em] rounded-full bg-lime" /> Online, antwoordt direct</span>
              </span>
            </span>
            <span className="text-[0.8em] text-cream/40">jouwbedrijf.nl</span>
          </div>
          <div className="flex flex-1 flex-col gap-[0.7em] px-[1.4em] py-[1.1em]">
            <p className={`max-w-[72%] self-end rounded-[1.1em] rounded-br-[0.3em] bg-lime px-[1em] py-[0.6em] text-forest ${show(true)}`}>
              Hebben jullie zaterdag nog plek?
            </p>
            <div className="max-w-[78%] self-start rounded-[1.1em] rounded-bl-[0.3em] bg-cream/[0.09] px-[1em] py-[0.6em] text-cream">
              {step < 2 ? dots : <span className="sb-pop block">Zeker! Zaterdag om 10:30 en 13:00 is er nog plek. Welke past jou het best?</span>}
            </div>
            <p className={`max-w-[72%] self-end rounded-[1.1em] rounded-br-[0.3em] bg-lime px-[1em] py-[0.6em] text-forest ${show(step >= 3)}`}>13:00 graag</p>
            <div className={`flex w-fit items-center gap-[0.6em] self-start rounded-[1.1em] bg-cream px-[1em] py-[0.7em] text-forest ${show(step >= 4)}`}>
              <span className="grid size-[1.5em] place-items-center rounded-full bg-forest text-[0.8em] text-lime">✓</span>
              <span>
                <span className="block font-semibold">Afspraak ingepland</span>
                <span className="block text-[0.8em] text-forest/70">Za 13:00 · bevestiging is gemaild</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. Slimme opvolging: the notifications on the tilted phone in the hands photo ---------- */

/* the photo (public/images/phone-hand.webp) is 736 x 919; the screen's four corners in it, measured
   from the photo. The top edge runs down to the right (y 171 at x 380, y 177 at x 500), so the top
   corners follow that line; the bottom corners are nudged out a little to cover the rounded corners */
const PHOTO = { w: 736, h: 919 };
const SCREEN_PX = { w: 300, h: 650 };
const CORNERS: [number, number][] = [[324.7, 168.3], [525.6, 178.3], [432.3, 640.8], [226.3, 627.6]];

const PHONE_MATRIX = quadMatrix(SCREEN_PX.w, SCREEN_PX.h, CORNERS);

function PhoneHand({ step }: { step: number }) {
  // the photo scales with the card; the screen layer is laid out at photo size and scaled along
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / PHOTO.w));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const notes = [
    { at: 1, title: "Nieuwe aanvraag", body: "J. Bakker wil een offerte voor een badkamer", tag: "Warme lead" },
    { at: 3, title: "Bevestiging verstuurd", body: "Persoonlijke mail naar de klant" },
    { at: 4, title: "Offerte nog niet getekend", body: "Herinnering gaat morgen om 10:00 uit" },
    { at: 5, title: "Klus afgerond", body: "Review gevraagd, met link naar Google" },
  ];
  return (
    <div ref={box} className="relative w-full" style={{ aspectRatio: `${PHOTO.w} / ${PHOTO.h}` }}>
      <img src="/images/phone-hand.webp" alt="" className="sb-fade-top absolute inset-0 size-full" loading="lazy" decoding="async" />
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: PHOTO.w, height: PHOTO.h, transform: `scale(${scale})` }}>
        <div
          className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-[34px] bg-[#f4f6ef]"
          style={{ width: SCREEN_PX.w, height: SCREEN_PX.h, transform: PHONE_MATRIX }}
        >
          <span className="absolute left-1/2 top-[11px] h-[28px] w-[96px] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center justify-between px-7 pt-[14px] text-[15px] font-semibold text-forest">
            <span>9:41</span>
            <span className="tracking-widest">●●●</span>
          </div>
          <p className="px-6 pt-8 font-display text-[26px] font-semibold text-forest">Aanvragen</p>
          <div className="mt-4 flex flex-col gap-2.5 px-4">
            {notes.map((n) => (
              <div key={n.title} className={`rounded-[18px] bg-white p-3.5 text-forest shadow-[0_4px_14px_-6px_rgba(2,38,30,0.25)] ${show(step >= n.at)}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 whitespace-nowrap text-[14px] font-semibold">
                    <span className="grid size-6 place-items-center rounded-lg bg-forest text-lime"><FrameGlyph className="size-3" /></span>
                    {n.title}
                  </span>
                  {n.tag && <span className={`whitespace-nowrap rounded-full bg-lime px-2 py-0.5 text-[10.5px] font-semibold ${show(step >= 2)}`}>{n.tag}</span>}
                </div>
                <p className="mt-1.5 pl-8 text-[12.5px] text-forest/70">{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- the grid ---------- */

type Card = {
  title: string;
  body: string;
  bg: string;
  text: string;
  muted: string;
  btn: string;
  span: string;
  /** where the film sits: positioned inside the card, mostly running off an edge */
  stage: string;
  /** the card's height; most are 560px, a short film gets a shorter card on phones */
  h?: string;
  film: (step: number, near: boolean) => ReactNode;
};

/* the homepage example: a price worked out for a job, then the quote asked for */
const QUOTE: CalcExample = { lines: [["Prijsindicatie", "€ 4.250"], ["Zonnepanelen", "10 stuks · 4,1 kWp"]], done: "Offerte aangevraagd" };

/* top row narrow + wide, bottom row wide + narrow, like a bento box */
const cards: Card[] = [
  {
    title: "Direct een prijs",
    body: "Een taart op maat, zonnepanelen of een nieuwe badkamer: bezoekers rekenen zelf uit wat het kost en vragen meteen een offerte aan.",
    bg: "sb-bg-paper", text: "text-forest", muted: "text-forest/65", btn: "bg-forest text-cream hover:bg-forest-hover",
    span: "lg:col-span-5",
    stage: "left-[16%] top-[215px] w-[80%]",
    film: (s) => <WidgetCalculator step={s} example={QUOTE} />,
  },
  {
    title: "Offertes en facturen vanzelf",
    body: "Een aanvraag wordt een offerte, een akkoord een factuur, en alles staat in je boekhouding en agenda. Geen overtypen, geen stapel papier.",
    bg: "sb-bg-aurora", text: "text-forest", muted: "text-forest/65", btn: "bg-forest text-cream hover:bg-forest-hover",
    span: "lg:col-span-7",
    stage: "inset-x-0 bottom-0 top-[210px]",
    film: (s, near) => <Connections step={s} near={near} />,
  },
  {
    title: "Vragen beantwoord, ook 's nachts",
    body: "Een assistent op je site met de kennis van jouw bedrijf. Hij beantwoordt vragen over prijzen en openingstijden en plant meteen een afspraak in. Weet hij het niet, dan krijg jij de vraag.",
    bg: "sb-bg-night", text: "text-cream", muted: "text-cream/65", btn: "bg-cream text-forest hover:bg-lime",
    span: "lg:col-span-7",
    stage: "left-1/2 bottom-[-6%] w-[92%] -translate-x-1/2",
    // on phones the laptop is small, so the card shrinks to it instead of leaving a black gap above it
    h: "h-[500px] md:h-[560px]",
    film: (s) => <LaptopChat step={s} />,
  },
  {
    title: "Klanten opvolgen zonder eraan te denken",
    body: "Elke aanvraag krijgt meteen antwoord, een offerte die blijft liggen een herinnering, en na de klus vraagt je site om een review.",
    bg: "sb-bg-studio", text: "text-forest", muted: "text-forest/70", btn: "bg-forest text-cream hover:bg-forest-hover",
    span: "lg:col-span-5",
    stage: "left-1/2 top-[120px] w-[120%] -translate-x-1/2",
    film: (s) => <PhoneHand step={s} />,
  },
];

/**
 * Meer dan een website as a bento grid, after the agency grids where the visual is large and runs
 * off the card: four cards with title, a line and a button on top and a film of the tool at work
 * underneath, all on one clock (useStep). The films are markup and CSS; the offertes card uses
 * the glossy icon render (public/images/icon-koppelingen.webp), the assistant card the laptop render
 * (public/images/laptop-assistent.webp), the price card the glass widget render (public/images/widget-rekentool.webp), the follow-up card
 * the phone in hands (public/images/phone-hand.webp).
 */
export default function SmartBento() {
  const { host, step, near } = useStep();
  return (
    // on phones the first two cards, the other two behind a button
    <div ref={host}>
      <MoreOnMobile show={2} label="Toon nog 2 voorbeelden" className="grid gap-4 md:gap-5 lg:grid-cols-12">
      {cards.map((c) => (
        <article key={c.title} className={`relative ${c.h ?? "h-[560px]"} overflow-hidden rounded-[14px] ${c.bg} ${c.text} ${c.span}`}>
          <div className="relative z-10 p-7 md:p-9">
            <h3 className="font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[2.25rem]">{c.title}</h3>
            <p className={`mt-3 max-w-md text-[15px] leading-relaxed md:text-base ${c.muted}`}>{c.body}</p>
            <a href="/contact" className={`mt-6 inline-flex w-fit items-center rounded-xl px-5 py-3 text-[15px] font-semibold transition-colors ${c.btn}`}>
              Vraag ernaar
            </a>
          </div>
          <div className={`absolute ${c.stage}`} aria-hidden="true">
            {c.film(step, near)}
          </div>
        </article>
      ))}
      </MoreOnMobile>
    </div>
  );
}
