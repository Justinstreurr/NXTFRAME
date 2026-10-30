"use client";

import type { ReactNode } from "react";
import { FrameGlyph } from "./Logo";
import MoreOnMobile from "./MoreOnMobile";
import { show, useStep } from "./SmartBento";

/** what the three cards say and what their films show, per branch */
export type FindContent = {
  google: {
    title: string; body: string; result: string;
    /** what is typed, the two other results around the own page, and the own page itself */
    query: string; others: [string, string][]; url: string; page: string; snippet: string;
  };
  map: { title: string; body: string; result: string; name: string; meta: string };
  ai: { body: string; result: string; question: string; name: string; answer: string; source: string };
};

/* ---------- 1. Google: the search is typed, the results come in, and the office's own page is among them ---------- */

const result = "rounded-2xl bg-white px-5 py-4 shadow-[0_18px_40px_-22px_rgba(2,38,30,0.45)]";

function GoogleSearch({ step, c }: { step: number; c: FindContent["google"] }) {
  const other = (url: string, title: string, at: number) => (
    <div className={`${result} ${show(step >= at)}`}>
      <p className="text-[12px] text-forest/70">{url}</p>
      <p className="mt-0.5 text-[15px] font-semibold text-forest/70">{title}</p>
      <span className="mt-2 block h-1.5 w-10/12 rounded-full bg-forest/[0.07]" />
    </div>
  );
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3.5 text-[15px] text-forest shadow-[0_18px_40px_-22px_rgba(2,38,30,0.45)]">
        <img src="/images/logos/google.webp" alt="" className="size-5 shrink-0 object-contain" loading="lazy" />
        <span>{c.query}</span>
        <span className="h-4 w-px animate-pulse bg-forest/60" aria-hidden="true" />
      </div>
      {other(c.others[0][0], c.others[0][1], 1)}
      {/* the office's own page: lit up, no number in front of it (nobody can promise a place) */}
      <div className={`${result} ring-2 ring-lime ${show(step >= 2)}`}>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] text-forest/70">{c.url}</p>
          <span className={`whitespace-nowrap rounded-full bg-lime px-2.5 py-0.5 text-[11px] font-semibold text-forest ${show(step >= 3)}`}>Jouw pagina</span>
        </div>
        <p className="mt-0.5 text-[15px] font-semibold text-forest">{c.page}</p>
        <p className="mt-1 text-[13px] leading-snug text-forest/65">{c.snippet}</p>
      </div>
      {other(c.others[1][0], c.others[1][1], 1)}
    </div>
  );
}

/* ---------- 2. The map: the office's pin drops in among the others and its profile slides up ---------- */

function MapProfile({ step, c }: { step: number; c: FindContent["map"] }) {
  return (
    <div
      className="relative size-full"
      style={{ backgroundImage: "linear-gradient(115deg, transparent 44%, rgba(255,255,255,0.9) 44%, rgba(255,255,255,0.9) 49%, transparent 49%), linear-gradient(20deg, transparent 58%, rgba(255,255,255,0.9) 58%, rgba(255,255,255,0.9) 62%, transparent 62%), linear-gradient(90deg, transparent 76%, rgba(255,255,255,0.7) 76%, rgba(255,255,255,0.7) 78%, transparent 78%)" }}
    >
      <span className="absolute left-[18%] top-[22%] size-3 rounded-full bg-[#440220]/25 ring-4 ring-white/60" />
      <span className="absolute left-[74%] top-[14%] size-3 rounded-full bg-[#440220]/25 ring-4 ring-white/60" />
      <span className="absolute left-[64%] top-[46%] size-3 rounded-full bg-[#440220]/25 ring-4 ring-white/60" />
      <span className="absolute left-[26%] top-[52%] size-3 rounded-full bg-[#440220]/25 ring-4 ring-white/60" />
      {step >= 1 && (
        <svg key="pin" viewBox="0 0 24 24" className="sb-pop absolute left-[42%] top-[10%] size-12 text-[#440220] drop-shadow-[0_8px_10px_rgba(68,2,32,0.35)]" fill="currentColor" aria-hidden="true">
          <path d="M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
          <circle cx="12" cy="10" r="2.6" fill="#fcbbb9" />
        </svg>
      )}
      <div className={`absolute inset-x-5 bottom-5 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-18px_rgba(2,38,30,0.45)] ${show(step >= 2)}`}>
        <div className="flex items-start justify-between gap-3">
          <span>
            <span className="block text-[15px] font-semibold text-forest">{c.name}</span>
            <span className="block text-[12px] text-forest/70">{c.meta}</span>
          </span>
          <span className="whitespace-nowrap text-[13px] font-semibold text-forest">
            4,9 <span className={`tracking-[0.08em] text-[#e0a526] transition-opacity duration-500 ${step >= 3 ? "opacity-100" : "opacity-25"}`}>★★★★★</span>
          </span>
        </div>
        <div className={`mt-3 flex gap-2 ${show(step >= 4)}`}>
          <span className="rounded-full bg-[#440220] px-3 py-1 text-[12px] font-semibold text-[#fcbbb9]">Route</span>
          <span className="rounded-full bg-forest/[0.07] px-3 py-1 text-[12px] font-semibold text-forest">Website</span>
          <span className="rounded-full bg-forest/[0.07] px-3 py-1 text-[12px] font-semibold text-forest">Bellen</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. ChatGPT: the seller asks, the answer names the office and points to its site ---------- */

function AiAnswer({ step, c }: { step: number; c: FindContent["ai"] }) {
  const glass = "rounded-2xl bg-white/10 ring-1 ring-white/20 shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_14px_30px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md";
  return (
    <div className="flex flex-col gap-3 text-[15px] leading-snug text-cream">
      <p className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-lime px-4 py-3 text-forest">
        {c.question}
      </p>
      <div className="flex max-w-[92%] items-end gap-2.5 self-start">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white shadow-[0_6px_14px_-8px_rgba(2,38,30,0.35)]"><img src="/images/logos/chatgpt.webp" alt="" className="size-5 object-contain" loading="lazy" /></span>
        <div className={`${glass} rounded-bl-md px-4 py-3`}>
          {step < 2 ? (
            <span className="flex gap-1.5 py-1.5" aria-hidden="true">
              {[0, 1, 2].map((d) => <span key={d} className="sb-dot size-2 rounded-full bg-cream/70" style={{ animationDelay: `${d * 150}ms` }} />)}
            </span>
          ) : (
            <span className="sb-pop block">
              Kijk eens bij <b className="font-semibold text-lime">{c.name}</b>. {c.answer}
            </span>
          )}
        </div>
      </div>
      <span className={`${glass} ml-[42px] flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[12px] text-cream/70 ${show(step >= 3)}`}>
        <span className="grid size-4 place-items-center rounded-full bg-lime text-forest"><FrameGlyph className="size-2" /></span>
        Bron: {c.source}
      </span>
    </div>
  );
}

/* ---------- the grid ---------- */

type Card = {
  where: string;
  /** the logo of where it is, so it is recognised at a glance */
  logo: string;
  title: string;
  body: string;
  result: string;
  bg: string;
  text: string;
  muted: string;
  /** the card's shape in the grid and its height */
  box: string;
  /** how wide the copy runs, so it stays clear of a film beside it */
  copy: string;
  /** where the film sits: under the copy on phones, from lg up positioned inside the card, running off an edge */
  stage: string;
  film: (step: number) => ReactNode;
};

const cardsFor = (c: FindContent): Card[] => [
  {
    where: "Google", logo: "/images/logos/google.webp", title: c.google.title, body: c.google.body, result: c.google.result,
    bg: "sb-bg-paper", text: "text-forest", muted: "text-forest/65",
    box: "lg:col-span-7 lg:h-[520px]", copy: "max-w-md lg:max-w-[44%]",
    stage: "-mb-10 px-6 md:px-9 lg:right-9 lg:top-9 lg:mb-0 lg:w-[52%] lg:px-0",
    film: (s) => <GoogleSearch step={s} c={c.google} />,
  },
  {
    where: "De kaart in Google", logo: "/images/logos/google-maps.webp", title: c.map.title, body: c.map.body, result: c.map.result,
    bg: "fb-bg-blush", text: "text-[#440220]", muted: "text-[#440220]/70",
    box: "lg:col-span-5 lg:h-[520px]", copy: "max-w-md",
    stage: "h-[260px] lg:inset-x-0 lg:bottom-0 lg:top-[270px] lg:h-auto",
    film: (s) => <MapProfile step={s} c={c.map} />,
  },
  {
    where: "ChatGPT en andere AI", logo: "/images/logos/chatgpt.webp", title: "Leesbaar voor AI", body: c.ai.body, result: c.ai.result,
    bg: "fb-glass", text: "text-cream", muted: "text-cream/70",
    box: "lg:col-span-12 lg:h-[340px]", copy: "max-w-md lg:max-w-[42%]",
    stage: "px-6 pb-8 md:px-9 lg:right-9 lg:top-1/2 lg:w-[48%] lg:-translate-y-1/2 lg:px-0 lg:pb-0",
    film: (s) => <AiAnswer step={s} c={c.ai} />,
  },
];

/**
 * Vindbaar in je werkgebied on the branch pages, in the shape of the homepage's Meer dan een website
 * (SmartBento) but more compact: the three places a customer looks for the business, each a card with
 * where, title, a line and what it brings, and a small film of the office turning up there, all on
 * the bento's clock. No film puts the office at number one: nobody can promise a place.
 */
export default function FindBento({ content }: { content: FindContent }) {
  const { host, step } = useStep();
  const cards = cardsFor(content);
  return (
    // on phones the first two cards, the rest behind a button
    <div ref={host}>
      <MoreOnMobile show={2} label={`Toon alle ${cards.length} plekken`} className="grid gap-4 md:gap-5 lg:grid-cols-12">
      {cards.map((c) => (
        <article key={c.title} className={`relative overflow-hidden rounded-[14px] ${c.bg} ${c.text} ${c.box}`}>
          <div className={`relative z-10 p-7 md:p-9 ${c.copy}`}>
            <p className={`flex items-center gap-2.5 text-sm font-medium ${c.muted}`}>
              <span className="grid size-8 place-items-center rounded-lg bg-white shadow-[0_6px_14px_-8px_rgba(2,38,30,0.35)]">
                <img src={c.logo} alt="" className="size-5 object-contain" loading="lazy" />
              </span>
              {c.where}
            </p>
            <h3 className="mt-2 font-display text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[2rem]">{c.title}</h3>
            <p className={`mt-3 text-[15px] leading-relaxed ${c.muted}`}>{c.body}</p>
            <p className="mt-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 text-[13px] font-semibold text-forest">
                <FrameGlyph className="size-2.5" />
                {c.result}
              </span>
            </p>
          </div>
          <div className={`relative lg:absolute ${c.stage}`} aria-hidden="true">
            {c.film(step)}
          </div>
        </article>
      ))}
      </MoreOnMobile>
    </div>
  );
}
