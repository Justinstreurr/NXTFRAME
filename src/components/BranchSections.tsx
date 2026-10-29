import type { CSSProperties, ReactNode } from "react";
import BranchIcon, { type IconKey } from "./BranchIcons";
import FindBento, { type FindContent } from "./FindBento";
import { LinkIn, LinkOut, type LinkRequest, type LinkSource, type LinkTile } from "./LinkFlow";
import { LinkCalc } from "./LinkCalc";
import { FrameGlyph } from "./Logo";
import MoreOnMobile from "./MoreOnMobile";
import StackCards, { type StackCard } from "./StackCards";
import { Button, Container, Eyebrow } from "./ui";

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
    <section data-zone="green" className="bg-cream py-16 text-forest md:py-32">
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
    <section id="koppelingen" className="scroll-mt-20 bg-cream py-16 text-forest md:py-32">
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

/* where each pill floats in the sky of the photo card from lg up, left and right of the man at his
   laptop in /images/makelaars-zoeken; the searches fill these spots in order */
const spots = [
  { x: "5%", y: "33%" }, { x: "21%", y: "40%" }, { x: "4%", y: "49%" }, { x: "20%", y: "57%" },
  { x: "61%", y: "27%" }, { x: "77%", y: "35%" }, { x: "62%", y: "44%" }, { x: "76%", y: "53%" },
];

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
 * title in the sky, the searches floating around the man at his laptop as pills with the logo of
 * where they are typed. From lg up the photo runs 12% below the card so his head sits under the
 * title. On phones the pills wrap in a row. No promise of a position.
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

      <div className="relative isolate mt-16 overflow-hidden bg-moss md:mt-24 lg:h-[720px]">
        <picture className="absolute inset-x-0 top-0 -z-20 h-full lg:h-[112%]">
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

        <h3 className="px-6 pt-12 text-center t-section text-paper md:pt-16">
          Gebouwd op wat {c.who}
          <br />
          <span className="serif-italic text-lime">echt zoeken</span>
        </h3>

        <ul className="mt-8 flex flex-wrap justify-center gap-2.5 px-6 lg:mt-0 lg:block lg:p-0">
          {c.searches.slice(0, spots.length).map((s, n) => (
            <li
              key={s.q}
              className="lg:absolute lg:left-[var(--x)] lg:top-[var(--y)]"
              style={{ "--x": spots[n].x, "--y": spots[n].y } as CSSProperties}
            >
              <span
                className="search-pill inline-flex items-center gap-2.5 rounded-xl bg-paper/95 py-2 pl-2.5 pr-4 text-[15px] font-semibold text-forest shadow-[0_14px_30px_-16px_rgba(0,0,0,0.5)] ring-1 ring-black/5 backdrop-blur"
                style={{ animationDelay: `${(n % 4) * -1.3}s` }}
              >
                <img src={logos[s.on].src} alt={logos[s.on].name} className="size-5 object-contain" loading="lazy" />
                {s.q}
              </span>
            </li>
          ))}
        </ul>

        {/* the foot, on the page margins: the next step, bottom right */}
        <Container className="mt-10 flex pb-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:justify-end lg:pb-14">
          <Button href="/contact" className="w-fit shrink-0 px-7 py-4 text-base">Plan een kennismaking</Button>
        </Container>
      </div>
    </section>
  );
}
