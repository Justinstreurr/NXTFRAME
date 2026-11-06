"use client";

import type { ReactNode } from "react";
import { FrameGlyph } from "./Logo";
import { Connections, LaptopChat, PhoneHand, WidgetCalculator, show, useStep } from "./SmartBento";

/* ---------- the agenda card: a week, and one slot that gets booked while you look ---------- */
function Agenda({ step }: { step: number }) {
  const days = ["Ma", "Di", "Wo", "Do", "Vr"];
  // which slots are already taken (day, row); the free one at Do 2 is booked at step 2
  const taken = new Set(["0-0", "1-1", "2-0", "2-2", "4-1", "3-0", "0-2"]);
  return (
    <div className="relative w-full bg-white p-4 text-forest shadow-[0_24px_50px_-28px_rgb(2_38_30/0.45)]">
      <div className="flex items-center justify-between text-[12px] font-semibold">
        <span>Week 46</span>
        <span className="text-forest/70">jouwbedrijf.nl/afspraak</span>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {days.map((d) => (
          <span key={d} className="text-center text-[11px] text-forest/70">{d}</span>
        ))}
        {[0, 1, 2].flatMap((r) =>
          days.map((_, c) => {
            const key = `${c}-${r}`;
            const booked = key === "3-1" && step >= 2;
            return (
              <span
                key={key}
                className={`h-5 transition-colors duration-500 ${booked ? "bg-forest" : taken.has(key) ? "bg-forest/10" : "bg-lime/60"}`}
              />
            );
          }),
        )}
      </div>
      <div className={`absolute inset-x-3 bottom-3 flex items-center gap-2 bg-forest px-3 py-2 text-[12px] text-cream ${show(step >= 3 && step < 7)}`}>
        <span className="grid size-5 shrink-0 place-items-center bg-lime text-forest"><FrameGlyph className="size-2.5" /></span>
        <span className="min-w-0">
          <span className="block font-semibold">Do 19:30 ingepland</span>
          <span className="block truncate text-cream/70">Bevestiging en herinnering gaan vanzelf</span>
        </span>
      </div>
    </div>
  );
}

type Card = {
  title: string;
  body: string;
  /** colours of the card */
  tone: string;
  muted: string;
  /** place in the grid (desktop) and height on phones */
  span: string;
  /** where the film sits inside the card */
  stage: string;
  film: (step: number, near: boolean) => ReactNode;
};

/* the grid, desktop: four columns, two rows; the follow-up card stands the full height on the right */
const cards: Card[] = [
  {
    title: "Direct een prijs",
    body: "Een hypotheek, zonnepanelen of een nieuwe badkamer: bezoekers rekenen zelf uit wat het kost en vragen meteen een offerte aan.",
    tone: "sb-bg-paper text-forest",
    muted: "text-forest/70",
    span: "h-[460px] md:col-span-2 lg:h-auto",
    stage: "bottom-[-12%] right-[-4%] w-[min(78%,340px)] md:w-[46%] md:right-[2%] md:bottom-[-14%]",
    film: (s) => <WidgetCalculator step={s} />,
  },
  {
    title: "Offertes en facturen klaargezet",
    body: "Een aanvraag wordt een offerte, een akkoord een factuur. Jij kijkt het na en verstuurt.",
    tone: "bg-[#440220] text-[#fcbbb9]",
    muted: "text-[#fcbbb9]/80",
    span: "h-[460px] lg:h-auto",
    stage: "inset-x-0 bottom-0 top-[44%]",
    film: (s, near) => <Connections step={s} near={near} />,
  },
  {
    title: "Klanten opvolgen zonder eraan te denken",
    body: "Elke aanvraag krijgt meteen antwoord, een offerte die blijft liggen een herinnering, en na de klus vraagt je site om een review.",
    tone: "sb-bg-studio text-forest",
    muted: "text-forest/70",
    span: "h-[560px] lg:row-span-2 lg:h-auto",
    stage: "left-1/2 top-[34%] w-[130%] -translate-x-1/2 md:top-[30%]",
    film: (s) => <PhoneHand step={s} />,
  },
  {
    title: "Vragen beantwoord, ook 's nachts",
    body: "Een assistent met de kennis van jouw bedrijf. Weet hij het niet, dan krijg jij de vraag.",
    tone: "sb-bg-night text-cream",
    muted: "text-cream/70",
    span: "h-[460px] md:col-span-2 lg:h-auto",
    stage: "bottom-[-10%] left-1/2 w-[110%] -translate-x-1/2 md:left-auto md:right-[-8%] md:w-[74%] md:translate-x-0 md:bottom-[-14%]",
    film: (s) => <LaptopChat step={s} />,
  },
  {
    title: "Afspraken direct in je agenda",
    body: "Klanten kiezen zelf een vrij moment. Bevestiging en herinnering gaan vanzelf.",
    tone: "bg-lime text-forest",
    muted: "text-forest/75",
    span: "h-[460px] md:col-span-2 lg:col-span-1 lg:h-auto",
    stage: "inset-x-6 bottom-6 md:inset-x-7 md:bottom-7",
    film: (s) => <Agenda step={s} />,
  },
];

/**
 * Meer dan een website as a bento grid: four columns and two rows of square colour blocks, a wide
 * card and a coloured one on top, a tall card standing the full height on the right, a wide dark
 * card and a lime one below. Title and a line on top, the tool at work underneath, running off the
 * edge where it is large. All films run on one clock (useStep), paused off screen.
 */
export default function SmartGrid() {
  const { host, step, near } = useStep();
  return (
    <div ref={host} className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:grid-rows-[400px_400px]">
      {cards.map((c) => (
        <article key={c.title} className={`relative overflow-hidden ${c.tone} ${c.span}`}>
          <div className="relative z-10 max-w-sm p-6 md:p-7">
            <h3 className="font-display text-[1.375rem] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[1.5rem]">{c.title}</h3>
            <p className={`mt-2.5 text-[15px] leading-relaxed ${c.muted}`}>{c.body}</p>
          </div>
          <div className={`absolute ${c.stage}`} aria-hidden="true">
            {c.film(step, near)}
          </div>
        </article>
      ))}
    </div>
  );
}
