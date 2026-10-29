import type { CSSProperties, ReactNode } from "react";
import { ArrowIcon } from "./ui";

export type StackCard = { label: string; img: string; pos: string; title: ReactNode; body: string; cta: string; href: string };

export type StackTone = { card: string; body: string };

/* one colour set per card, in order: lime, wine, blush */
const defaultTones: StackTone[] = [
  { card: "bg-lime text-forest", body: "text-forest/80" },
  { card: "bg-[#440220] text-[#fcbbb9]", body: "text-cream/85" },
  { card: "bg-[#fcbbb9] text-[#440220]", body: "text-[#440220]/80" },
];

/* where the first card sticks (right under the floating nav: pill bottom at 80px on tablets and up,
   12 + 64 px on phones) and how much of each card stays visible as a tab once the next one covers
   it: exactly the number pill row */
const TOP = 96;
const TAB = 64;
const TOP_M = 88;

/**
 * Cards that stack while you scroll: each card sticks a tab's height lower than the one before, so
 * the next card slides up over it and leaves only its number and label showing. Pure CSS (sticky),
 * no scroll script. The section title above does not stick; it scrolls away with the page.
 */
export default function StackCards({ items, tones = defaultTones }: { items: StackCard[]; /** other colour sets, for a section whose ground already is one of the three */ tones?: StackTone[] }) {
  return (
    <ol className="mx-auto w-full max-w-[1100px]">
      {items.map((it, i) => {
        const t = tones[i % tones.length];
        return (
          <li
            key={it.label}
            className="stack-card mb-4 last:mb-0 md:mb-16"
            style={{ "--top": `${TOP + i * TAB}px`, "--top-m": `${TOP_M + i * TAB}px` } as CSSProperties}
          >
            <article className={`flex flex-col rounded-3xl p-6 md:h-[420px] md:flex-row md:gap-10 ${t.card}`}>
              <div className="flex flex-1 flex-col">
                {/* the tab: this row is what stays visible once the next card covers the card */}
                <p className="flex h-10 items-center gap-3 text-[15px] font-medium">
                  <span className="grid h-10 w-14 place-items-center rounded-full border border-current font-display text-base font-semibold italic">
                    {i + 1}
                  </span>
                  {it.label}
                </p>
                <h3 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.03em] md:mt-auto">
                  {it.title}
                </h3>
                <p className={`mt-5 max-w-md text-base leading-relaxed md:text-lg ${t.body}`}>{it.body}</p>
                <a
                  href={it.href}
                  className="group/l relative mt-8 inline-flex w-fit items-center gap-2 border-b border-current/40 pb-0.5 text-[15px] font-semibold transition-colors after:absolute after:inset-x-0 after:-inset-y-2.5 after:content-[''] hover:border-current md:mb-auto"
                >
                  {it.cta}
                  <ArrowIcon className="size-3.5" />
                </a>
              </div>
              <div className="mt-5 flex items-center justify-center md:mt-0 md:w-[42%]">
                <img
                  src={it.img}
                  alt=""
                  className="aspect-square w-full max-w-[130px] rounded-full object-cover sm:max-w-[300px] md:max-w-[340px]"
                  style={{ objectPosition: it.pos }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
