import type { ReactNode } from "react";
import { FrameGlyph } from "./Logo";
import MoreOnMobile from "./MoreOnMobile";
import { ArrowIcon, Button, Container, Eyebrow, Reassure } from "./ui";

/** a way to start: a figure when there is one (otherwise quoted), what it is, how long, what is in it */
export type PriceWay = { name: string; from?: string; body: string; time: string; items: string[]; highlight?: boolean };

/* the cards in turn: white, forest (the one most pick), white, as "Wat kost het" on the homepage */
const tones = [
  { card: "bg-paper text-forest ring-1 ring-forest/10", muted: "text-forest/70", pill: "bg-forest text-lime", line: "border-forest/15", check: "bg-forest text-lime" },
  { card: "bg-forest text-cream", muted: "text-cream/70", pill: "bg-lime text-forest", line: "border-cream/15", check: "bg-lime text-forest" },
  { card: "bg-paper text-forest ring-1 ring-forest/10", muted: "text-forest/70", pill: "bg-forest text-lime", line: "border-forest/15", check: "bg-forest text-lime" },
];

const Check = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={`size-4 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 8.5 3 3 7-7" /></svg>
);

/**
 * Investering on the branch pages with their own page (/makelaars, /financieel-advies), built like
 * "Wat kost het" on the homepage: the heading centred, three solid cards (white, forest, white) with
 * the name, the figure, what it is, how long, what is in it and a link; under them what every site
 * comes with, in two columns between hairlines, and one decision at the foot.
 */
export default function BranchPricing({
  title,
  intro,
  ways,
  includedTitle,
  included,
  smallPrint,
}: {
  title: ReactNode;
  intro: string;
  ways: PriceWay[];
  includedTitle: string;
  included: string[];
  smallPrint: string;
}) {
  return (
    <section className="bg-cream pb-16 pt-4 text-forest md:pb-32 md:pt-8">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mx-auto">Investering</Eyebrow>
          <h2 className="mt-6 t-section md:mt-8">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">{intro}</p>
        </div>

        <ul className="mt-12 grid items-stretch gap-5 md:mt-16 lg:grid-cols-3">
          {ways.map((w, i) => {
            const c = tones[i % tones.length];
            return (
              <li key={w.name} className={w.highlight ? "order-first lg:order-none lg:-my-4" : ""}>
                <a href="/contact" className={`group flex h-full flex-col rounded-[14px] p-6 md:p-8 ${c.card} ${w.highlight ? "lg:pb-12 lg:pt-12" : ""}`}>
                  <span className="flex items-center justify-between gap-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${c.pill}`}>
                      <FrameGlyph className="size-2.5" />
                      {w.name}
                    </span>
                    {w.highlight && <span className={`text-xs font-semibold ${c.muted}`}>Meest gekozen</span>}
                  </span>

                  <span className="mt-8 block">
                    <span className={`block text-sm ${c.muted}`}>{w.from ? "vanaf" : "prijs"}</span>
                    <span className="block font-display text-5xl font-semibold leading-none tracking-[-0.03em] md:text-6xl">{w.from ? `€ ${w.from}` : "Op maat"}</span>
                  </span>
                  <span className={`mt-5 block text-base leading-relaxed ${c.muted}`}>{w.body}</span>
                  <span className={`mt-4 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${c.line}`}>
                    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="8" cy="8" r="6.2" /><path d="M8 4.8V8l2.2 1.4" strokeLinecap="round" /></svg>
                    {w.time}
                  </span>

                  <span className={`mt-7 block border-t pt-6 ${c.line}`}>
                    <span className="grid gap-3">
                      {w.items.map((it) => (
                        <span key={it} className="flex items-start gap-3 text-[15px] leading-snug">
                          <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${c.check}`}>✓</span>
                          {it}
                        </span>
                      ))}
                    </span>
                  </span>

                  {/* at least 2rem of air, more where a card is taller, so the links line up */}
                  <span className="block min-h-8 flex-1" aria-hidden="true" />
                  <span className="inline-flex w-fit items-center gap-2 border-b border-current/40 pb-0.5 text-[15px] font-semibold transition-colors group-hover:border-current">
                    {w.from ? "Plan een kennismaking" : "Vraag een prijs op maat"}
                    <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <h3 className="mt-20 text-center font-display text-2xl font-semibold tracking-tight md:mt-28 md:text-[28px]">{includedTitle}</h3>
        <MoreOnMobile show={4} label={`Toon alle ${included.length}`} as="ul" className="mt-10 grid gap-x-16 sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex items-center justify-between gap-4 border-b border-forest/15 py-4 text-[15px] text-forest/80">
              {item}
              <Check className="text-forest" />
            </li>
          ))}
        </MoreOnMobile>

        {/* one decision at the foot: the main button, the line that takes the doubt away, the small print */}
        <div className="mt-12 flex flex-col items-center gap-3 text-center md:mt-16">
          <Button variant="dark" className="px-8 py-4 text-base" href="/contact">
            Plan een kennismaking
          </Button>
          <Reassure />
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-forest/60">
            {smallPrint} De doorlooptijd telt vanaf het moment dat teksten, foto&apos;s en toegang binnen zijn. <a href="/prijzen" className="underline underline-offset-2 hover:text-forest">Bekijk alle prijzen</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
