import type { ReactNode } from "react";
import BranchIcon, { type IconKey } from "./BranchIcons";
import FindBento, { type FindContent } from "./FindBento";
import { LinkIn, LinkOut, type LinkRequest, type LinkSource, type LinkTile } from "./LinkFlow";
import { LinkCalc } from "./LinkCalc";
import { FrameGlyph } from "./Logo";
import MoreOnMobile from "./MoreOnMobile";
import StackCards, { type StackCard } from "./StackCards";
import { Button, Container, Eyebrow, Marquee } from "./ui";

/* ---------- Herkenbaar: what goes wrong today, recognition before any solution ---------- */

/* each pain points to the section that solves it */
const fixes = ["#wat-je-krijgt", "#koppelingen", "#vindbaar"];

/**
 * Herkenbaar on the branch pages, built like Wat je krijgt on the homepage: the eyebrow, title and
 * lead centred, then the three pains as cards that stack while you scroll (StackCards), lime, wine
 * and blush, each with a short label, the pain with its key words in serif italic, one paragraph, a
 * round photo and a link to the part of the page that solves it.
 */
export function BranchPains({ title, lead, pains }: { title: ReactNode; lead: string; pains: { label: string; title: ReactNode; body: string; src: string; pos?: string }[] }) {
  const items: StackCard[] = pains.map((p, n) => ({
    label: p.label, title: p.title, body: p.body, img: p.src, pos: p.pos ?? "50% 50%",
    cta: "Zo los ik het op", href: fixes[n % fixes.length],
  }));
  return (
    <section data-zone="green" className="bg-cream py-12 text-forest md:py-32">
      <Container>
        <Eyebrow className="mx-auto w-fit">Herkenbaar?</Eyebrow>
        <h2 className="mt-6 text-center t-section md:mt-8">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-forest/75 t-lead">{lead}</p>
        <div className="mt-12 md:mt-16">
          <StackCards items={items} />
        </div>
      </Container>
    </section>
  );
}

/* ---------- Koppelingen: what comes into the site and what goes back to the owner ---------- */

export type LinksContent = {
  title: ReactNode;
  lead: string;
  /** the left card: what feeds the site (LinkIn), or with `calculator` the glass calculator widget of the homepage (LinkCalc) */
  into: { title: string; body: string; icon: IconKey; sources: LinkSource[]; page: string; tiles: LinkTile[]; tileIcon: IconKey; calculator?: boolean };
  /** the right card: the requests that come back (LinkOut) */
  back: { title: string; body: string; icon: IconKey; requests: LinkRequest[] };
  /** three plain facts under the cards, said as they are */
  facts: { title: string; body: string }[];
};

/**
 * Koppelingen on the branch pages, after Relume's "The engine": the heading left and the lead right,
 * then two cards, each a moving picture on a faint grid over its text (LinkFlow): wine for what comes
 * in, lime for what goes back. Three plain facts, centred, under them.
 */
export function BranchLinks({ content: c }: { content: LinksContent }) {
  const cards = [
    { Picture: () => (c.into.calculator ? <LinkCalc /> : <LinkIn sources={c.into.sources} page={c.into.page} tiles={c.into.tiles} icon={c.into.tileIcon} />), icon: c.into.icon, card: "bg-[#440220] text-[#fcbbb9]", muted: "text-cream/80", tile: "ring-[#fcbbb9]/30", title: c.into.title, body: c.into.body },
    { Picture: () => <LinkOut requests={c.back.requests} />, icon: c.back.icon, card: "bg-lime text-forest", muted: "text-forest/75", tile: "ring-forest/20", title: c.back.title, body: c.back.body },
  ];
  return (
    <section id="koppelingen" className="scroll-mt-20 bg-cream py-12 text-forest md:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Eyebrow className="max-w-xl">Koppelingen</Eyebrow>
            <h2 className="mt-6 t-section md:mt-8">{c.title}</h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-forest/75 md:text-xl">{c.lead}</p>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-2">
          {cards.map(({ Picture, icon, card, muted, tile, title, body }) => (
            <article key={title} className={`overflow-hidden rounded-3xl ${card}`}>
              <Picture />
              <div className="p-8 pt-6 md:p-10 md:pt-8">
                <span className={`grid size-9 place-items-center rounded-lg ring-1 ${tile}`} aria-hidden="true">
                  <BranchIcon name={icon} className="size-[18px]" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
                <p className={`mt-3 max-w-lg text-[15px] leading-relaxed ${muted}`}>{body}</p>
              </div>
            </article>
          ))}
        </div>

        <MoreOnMobile show={1} label="Meer over koppelen" as="dl" className="mt-12 grid gap-x-12 gap-y-8 text-center md:mt-16 lg:grid-cols-3" buttonClassName="mx-auto flex">
          {c.facts.map((f) => (
            <div key={f.title} className="mx-auto max-w-sm">
              <dt className="flex items-center justify-center gap-3 font-display text-xl font-semibold tracking-tight">
                <FrameGlyph className="size-3 shrink-0" />
                {f.title}
              </dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-forest/75">{f.body}</dd>
            </div>
          ))}
        </MoreOnMobile>
      </Container>
    </section>
  );
}

/* ---------- Vindbaar in je werkgebied, with the searches the pages are built on under it ---------- */

const logos = {
  google: { name: "Google", src: "/images/logos/google.webp" },
  maps: { name: "Google Maps", src: "/images/logos/google-maps.webp" },
  chatgpt: { name: "ChatGPT", src: "/images/logos/chatgpt.webp" },
};

export type FindSectionContent = {
  title: ReactNode;
  lead: string;
  bento: FindContent;
  /** the photo card: "Gebouwd op wat {who}" / "echt zoeken", and eight searches with where they are typed */
  who: string;
  searches: { q: string; on: keyof typeof logos }[];
  /** PLACEHOLDER: every branch borrows the makelaars photo until it has its own */
  photo?: { src: string; webp?: string; alt: string; pos?: string };
};

const defaultPhoto = { src: "/images/makelaars-zoeken.jpg", webp: "/images/makelaars-zoeken.webp", alt: "Een man in een roze shirt zoekt iets op zijn laptop, op een terras aan zee", pos: "48% 30%" };

/**
 * Vindbaar in je werkgebied on the branch pages: the heading and lead, the three places a customer
 * looks (FindBento), and under it the searches the pages are built on, as one wide photo card: the
 * title and the next step in the sky, the photo free in the middle, and the searches as one slow
 * row of pills along the bottom edge, each with the logo of where it is typed. From lg up the photo
 * runs 12% below the card so his head sits under the title. No promise of a position.
 */
export function BranchFind({ content: c }: { content: FindSectionContent }) {
  const photo = c.photo ?? defaultPhoto;
  return (
    <section id="vindbaar" data-zone="green" className="scroll-mt-20 bg-cream pt-4 text-forest md:pt-8">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Eyebrow className="max-w-xl">Vindbaar in je werkgebied</Eyebrow>
            <h2 className="mt-6 t-section md:mt-8">{c.title}</h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-forest/75 md:text-xl">{c.lead}</p>
        </div>
        <div className="mt-12 md:mt-16">
          <FindBento content={c.bento} />
        </div>
      </Container>

      {/* phones: the title and button on their own moss ground, the photo below them, so neither sits on his head;
            from md up the photo fills the card, zoomed from its top edge so his head drops under the button */}
      <div className="relative isolate mt-12 h-[640px] overflow-hidden bg-moss md:mt-24 md:h-[660px] lg:h-[720px]">
        <picture className="absolute inset-x-0 top-[250px] -z-20 h-[calc(100%-250px)] md:top-0 md:h-full md:origin-top md:scale-[1.2] lg:h-[112%]">
          {photo.webp && <source srcSet={photo.webp} type="image/webp" />}
          <img
            src={photo.src}
            alt={photo.alt}
            className="size-full object-cover"
            style={photo.pos ? { objectPosition: photo.pos } : undefined}
            loading="lazy"
            decoding="async"
          />
        </picture>
        <span className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.45)_0%,rgb(0_0_0/0.05)_30%,transparent_55%,rgb(0_0_0/0.6)_100%)]" aria-hidden="true" />
        {/* phones: the photo's top edge melts into the moss above it */}
        <span className="absolute inset-x-0 top-[250px] -z-10 h-20 bg-gradient-to-b from-moss to-transparent md:hidden" aria-hidden="true" />

        <div className="flex flex-col items-center px-6 pt-12 text-center md:pt-16">
          <h3 className="t-section text-paper">
            Gebouwd op wat {c.who}
            <br />
            <span className="serif-italic text-lime">echt zoeken</span>
          </h3>
          <Button href="/contact" className="mt-7 w-fit px-7 py-4 text-base">Plan een kennismaking</Button>
        </div>

        {/* the searches, one slow row along the bottom edge so the photo stays free */}
        <div className="absolute inset-x-0 bottom-8 md:bottom-12">
          <Marquee gap="gap-3" className="py-3">
            {c.searches.map((s) => (
              <span
                key={s.q}
                className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white/95 py-1.5 pl-1.5 pr-5 text-[15px] font-medium text-forest shadow-[0_18px_36px_-18px_rgba(0,0,0,0.6)] ring-1 ring-black/[0.06] backdrop-blur-md"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-paper ring-1 ring-forest/10">
                  <img src={logos[s.on].src} alt={logos[s.on].name} className="size-[18px] object-contain" loading="lazy" />
                </span>
                <span className="whitespace-nowrap">
                  {/* "[plaats]" in a search is the customer's own town: a lime tag instead of brackets */}
                  {s.q.split(/\[(.+?)\]/).map((part, i) =>
                    i % 2 ? <span key={i} className="rounded-md bg-lime px-1.5 py-0.5 text-[13px] font-semibold">{part}</span> : part,
                  )}
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
