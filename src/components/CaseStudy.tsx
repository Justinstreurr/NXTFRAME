import type { CSSProperties, ReactNode } from "react";
import CaseHeroGround from "./CaseHeroGround";
import CaseReel, { type ReelTile } from "./CaseReel";
import CountUp from "./CountUp";
import { work } from "./workData";
import { ArrowIcon, Button, Container, Marquee } from "./ui";

/* ---------- The case page, one shape for every case (Happy Flops is the first) ----------
   Learnt from four top cases: Webfluencer's Lake Cycling (an inset photo hero with pills, the story as
   one big sentence with an indented first line, the result offset to the right on a dark ground),
   Clay's Joe & The Juice (the services as a bold list beside the story, titles left with the text
   beside them, the next case as one big link), Instrument's Nike (a giant all-caps statement, then the
   work on a light panel) and Build in Amsterdam's Suitsupply (full-bleed halves with a small caption,
   a full-bleed photo with a centred caption, and walls of screens and components that keep moving,
   their case videos rebuilt in CSS). A case is one data object (CaseData) whose `blocks` run in order,
   with visuals built from the pieces below, so the next case is a new page file, not a new design. */

export type CaseBlock =
  /** a title left, the text beside it, and a visual under both */
  | { kind: "chapter"; label: string; title: ReactNode; body: string; visual: ReactNode }
  /** the title, the text and a few numbered problems between hairlines on the left (Clay's perks),
      three rows of screens drifting past on the right (Suitsupply's overview video, see CaseReel) */
  | { kind: "challenge"; label: string; title: ReactNode; body: string; points: { title: string; text: string }[]; reel: { bg: string; rows: ReelTile[][] } }
  /** a few words in giant capitals on the dark ground, with an optional visual on a light panel under them */
  | { kind: "statement"; label: string; lines: string[]; visual?: ReactNode }
  /** columns of screens moving up and down past each other, full width */
  | { kind: "wall"; label: string; text: string; columns: { src: string; alt: string }[][]; bg: string }
  /** two full-bleed halves, a small caption in the corner of the right one */
  /** a title and a short text top left, then a few phones side by side, each a step lower than the last
      (a customer's route through the site, left to right) */
  /** a film (e.g. a showreel) the full width of the container */
  | { kind: "film"; visual: ReactNode }
  | { kind: "phones"; label: string; title: ReactNode; body: string; phones: { src: string; alt: string }[] }
  | { kind: "split"; left: ReactNode; right: ReactNode; label: string; text: string; dark?: boolean }
  /** one full-bleed photo with a caption in the middle */
  | { kind: "photo"; src: string; alt: string; label: string; text: ReactNode; pos?: string }
  /** the building blocks of the site, in rows that drift past */
  | { kind: "kit"; label: string; title: ReactNode; body: string; rows: ReactNode[][] };

export type CaseData = {
  name: string;
  /** the client's logo in white, shown big in the hero; the name is used where there is none */
  logo?: { src: string; width: number; height: number };
  /** what was made, as pills in the hero and a bold list beside the story */
  services: string[];
  liveUrl: string;
  /** the hero's ground (a photo or colour) and what stands on it, e.g. phones rising from the bottom */
  heroBg: CSSProperties;
  heroVisual?: ReactNode;
  /** the case in one long sentence (first line indented) and a short paragraph under it */
  intro: { lead: ReactNode; body: string };
  facts: { label: string; value: string; href?: string }[];
  blocks: CaseBlock[];
  /** the result in one long sentence and a short paragraph, on the dark ground */
  result: { lead: ReactNode; body: string };
  /** PLACEHOLDER figures until the client confirms them */
  stats?: { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }[];
  quote?: { text: string; who: string };
  /** a last big photo, after the result */
  closing?: { src: string; alt: string; pos?: string };
  roles: { group: string; items: string[] }[];
};

/* ---------- the pieces a block's visual is built from ---------- */

/** a browser window with a screenshot of the live site; with `scroll` the window keeps a screen's
    height and the (full-page) screenshot scrolls inside it, like the real site. With `href` the bar
    gets an "Open de live site" button and a click on the page opens the live site in a new tab (the
    live site itself cannot be framed: shops send X-Frame-Options DENY) */
export function CaseWindow({ url, src, alt = "", className = "", scroll = false, eager = false, href }: { url: string; src: string; alt?: string; className?: string; scroll?: boolean; eager?: boolean; href?: string }) {
  const page = <img src={src} alt={alt} className="block w-full" loading={eager ? "eager" : "lazy"} decoding="async" />;
  const linked = href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group/page relative block cursor-pointer" aria-label={`${alt}, open de live site in een nieuw tabblad`}>
      {page}
      <span className="pointer-events-none absolute inset-0 bg-forest/0 transition-colors duration-300 group-hover/page:bg-forest/5" aria-hidden="true" />
    </a>
  ) : page;
  return (
    <div className={`overflow-hidden rounded-xl bg-paper shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] ring-1 ring-black/5 ${className}`}>
      <div className="flex h-8 items-center gap-3 border-b border-black/5 bg-[#f3f4f0] px-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex h-5 flex-1 items-center truncate rounded-md bg-paper px-2 text-[11px] text-forest/50">{url}</span>
        {scroll && (
          <span className="hidden items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-forest/55 md:flex">
            Scroll door de site
            <svg viewBox="0 0 16 16" className="size-3 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3v10M4 9l4 4 4-4" /></svg>
          </span>
        )}
        {href && (
          <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-forest px-2.5 py-1 text-[11px] font-semibold text-lime transition-colors hover:bg-forest-hover">
            Open de live site
            <ArrowIcon className="size-2.5" />
          </a>
        )}
      </div>
      {scroll ? (
        <div className="case-scroll aspect-[16/10] overflow-y-auto overscroll-auto" tabIndex={0} aria-label={`${alt}, scrollbaar`}>
          {linked}
        </div>
      ) : linked}
    </div>
  );
}

/** a phone with a screenshot of the live site */
export function CasePhone({ src, alt = "", className = "", eager = false }: { src: string; alt?: string; className?: string; eager?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[2.2rem] border-[7px] border-[#111] bg-[#111] shadow-[0_40px_70px_-28px_rgba(0,0,0,0.6)] ${className}`}>
      <img src={src} alt={alt} className="block w-full rounded-[1.75rem]" loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

/** the coloured ground a visual stands on, full width of the container */
export function CasePanel({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`relative overflow-hidden rounded-[14px] ${className}`} style={style}>
      {children}
    </div>
  );
}

/** one piece of the site on a white card with a soft shadow: a screen, a product card, a button */
export function CaseCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`overflow-hidden rounded-[10px] bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] ${className}`}>{children}</div>;
}

/* ---------- the small type the blocks share ---------- */

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${className}`}>{children}</p>;
}

/** Suitsupply's corner caption: a label in capitals over two or three lines in serif */
function Caption({ label, text, className = "" }: { label: string; text: string; className?: string }) {
  return (
    <div className={`max-w-[19rem] ${className}`}>
      <Label>{label}</Label>
      <p className="mt-2 text-[17px] leading-snug">{text}</p>
    </div>
  );
}

/* ---------- the blocks ---------- */

function Chapter({ b, n }: { b: Extract<CaseBlock, { kind: "chapter" }>; n: number }) {
  return (
    <section className="bg-cream pb-20 pt-20 text-forest md:pb-40 md:pt-36">
      <Container>
        <div className="grid gap-6 border-t border-forest/15 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Label className="text-forest/50">0{n} · {b.label}</Label>
            <h2 className="mt-5 t-section">{b.title}</h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-forest/70 md:text-xl lg:col-span-5 lg:col-start-8 lg:pt-10">{b.body}</p>
        </div>
        <div className="mt-12 md:mt-16">{b.visual}</div>
      </Container>
    </section>
  );
}

/** with `bleed` (the next block is the phones, on the same cream) the reel runs on over that block's top
    padding, down to where its text starts */
function Challenge({ b, n, bleed }: { b: Extract<CaseBlock, { kind: "challenge" }>; n: number; bleed?: boolean }) {
  return (
    <section className="relative overflow-x-clip bg-cream text-forest">
      <Container>
        {/* the text in the left half; the reel fills the right half of the window, from the section's top edge
            to its bottom edge (so it meets the block under it) and from the middle to the right edge */}
        <div>
          <div className="py-20 md:py-40 lg:w-1/2 lg:pb-80 lg:pr-16 lg:pt-48">
            <Label className="text-forest/50">0{n} · {b.label}</Label>
            <h2 className="mt-5 t-section">{b.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-forest/70">{b.body}</p>
            <ol className="mt-10 border-t border-forest/15">
              {b.points.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-forest/15 py-5 md:py-6">
                  <span className="serif-italic text-3xl leading-none text-forest/35">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-lg font-semibold tracking-tight">{p.title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-forest/65">{p.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {/* below the text on narrow screens, as a portrait box running to the edges */}
          <div className={`relative z-10 -mx-6 aspect-[4/5] md:-mx-12 md:aspect-[5/4] lg:absolute lg:inset-y-0 lg:left-1/2 lg:right-0 lg:mx-0 lg:aspect-auto ${bleed ? "lg:-mb-40" : ""}`}>
            <CaseReel rows={b.reel.rows} bg={b.reel.bg} />
            <p className="sr-only">Schermen: {b.reel.rows.flat().map((t) => t.alt).join(", ")}.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Statement({ b }: { b: Extract<CaseBlock, { kind: "statement" }> }) {
  return (
    <section data-zone="green" className="overflow-hidden bg-forest py-24 text-cream md:py-40">
      <Container>
        <Label className="text-center text-cream/60">{b.label}</Label>
        <h2 className="mt-6 text-center font-display text-[clamp(2.4rem,11.5vw,13rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.045em]">
          {b.lines.map((line) => <span key={line} className="block">{line}</span>)}
        </h2>
        {b.visual && <div className="mt-16 md:mt-24">{b.visual}</div>}
      </Container>
    </section>
  );
}

/** the columns run twice in a row and slide by half their height, so the loop has no seam; every
    second column runs the other way and a little slower (Suitsupply's overview video) */
function Wall({ b }: { b: Extract<CaseBlock, { kind: "wall" }> }) {
  return (
    <section className="relative overflow-hidden" style={{ background: b.bg }}>
      <div className="case-wall-mask grid h-[86svh] max-h-[980px] min-h-[560px] grid-cols-3 gap-3 px-3 md:grid-cols-5 md:gap-4 md:px-4" aria-hidden="true">
        {b.columns.map((col, i) => (
          <div key={i} className={`overflow-hidden ${i > 2 ? "hidden md:block" : ""}`}>
            <div className="case-wall-col" data-rev={i % 2 ? "" : undefined} style={{ animationDuration: `${48 + i * 7}s` }}>
              {[0, 1].map((copy) => (
                <div key={copy}>
                  {col.map((s) => (
                    <CaseCard key={s.src} className="mb-3 md:mb-4">
                      <img src={s.src} alt="" className="block w-full" loading="lazy" decoding="async" />
                    </CaseCard>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 pb-6 md:pb-10">
        <Container>
          <div className="w-fit rounded-[12px] bg-white/90 p-5 text-forest shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] backdrop-blur-md">
            <Caption label={b.label} text={b.text} />
          </div>
        </Container>
      </div>
      <p className="sr-only">{b.text} Schermen: {b.columns.flat().map((s) => s.alt).join(", ")}.</p>
    </section>
  );
}

function Film({ b }: { b: Extract<CaseBlock, { kind: "film" }> }) {
  return (
    <section className="bg-cream pb-20 text-forest md:pb-40">
      <Container>{b.visual}</Container>
    </section>
  );
}

function Phones({ b }: { b: Extract<CaseBlock, { kind: "phones" }> }) {
  return (
    <section className="bg-cream py-20 text-forest md:py-40">
      <Container>
        <div className="max-w-xl">
          <Label className="text-forest/50">{b.label}</Label>
          <h2 className="mt-5 t-section">{b.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-forest/70">{b.body}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-3 items-start gap-3 md:mt-20 md:gap-16 lg:gap-24">
          {b.phones.map((p, i) => (
            <div key={p.src} className="[--step:2.5rem] md:[--step:7rem]" style={{ marginTop: `calc(${i} * var(--step))` }}>
              <CasePhone src={p.src} alt={p.alt} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Split({ b }: { b: Extract<CaseBlock, { kind: "split" }> }) {
  return (
    <section className="grid md:grid-cols-2">
      <div className="relative min-h-[70svh] overflow-hidden md:min-h-[72svh]">{b.left}</div>
      <div className={`relative min-h-[70svh] overflow-hidden md:min-h-[72svh] ${b.dark ? "text-cream" : "text-forest"}`}>
        {b.right}
        <Caption label={b.label} text={b.text} className="absolute bottom-6 left-6 md:bottom-10 md:left-10" />
      </div>
    </section>
  );
}

function Photo({ b }: { b: Extract<CaseBlock, { kind: "photo" }> }) {
  return (
    <section data-zone="green" className="relative isolate flex min-h-[88svh] items-center justify-center overflow-hidden px-6 text-center text-white">
      <img src={b.src} alt={b.alt} className="absolute inset-0 -z-10 size-full object-cover" style={b.pos ? { objectPosition: b.pos } : undefined} loading="lazy" decoding="async" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),rgba(0,0,0,0.3))]" aria-hidden="true" />
      <div className="max-w-3xl [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
        <Label>{b.label}</Label>
        <p className="mt-4 t-section">{b.text}</p>
      </div>
    </section>
  );
}

/** Suitsupply's component video: the pieces of the shop on white cards, rows drifting both ways */
function Kit({ b }: { b: Extract<CaseBlock, { kind: "kit" }> }) {
  return (
    <section className="overflow-hidden bg-[#e8e6e1] py-20 text-forest md:py-36">
      <Container className="grid gap-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Label className="text-forest/50">{b.label}</Label>
          <h2 className="mt-5 t-section">{b.title}</h2>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-forest/70 md:text-xl lg:col-span-5 lg:col-start-8 lg:pt-10">{b.body}</p>
      </Container>
      <div className="mt-12 space-y-4 md:mt-20">
        {b.rows.map((row, i) => (
          <Marquee key={i} speed="slow" reverse={i % 2 === 1} gap="gap-4" fade={false} className="py-2">
            {row.map((piece, j) => <div key={j} className="flex shrink-0 items-center">{piece}</div>)}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

/* ---------- the page ---------- */

export default function CaseStudy({ data: c }: { data: CaseData }) {
  const cases = work.filter((w) => w.href?.startsWith("/werk/"));
  const next = cases[(cases.findIndex((w) => w.name === c.name) + 1) % cases.length];
  let chapter = 0;
  return (
    <>
      {/* the hero (Lake): the client's ground as an inset card, the logo big, the services as pills,
          and whatever the case puts on it (the phones) close under them, running on past the card's
          bottom edge onto the cream: the card stops short of the section by about 40% of a phone. Scrolling, the card grows out to the
          window's edges (CaseHeroGround) */}
      <section data-zone="green" className="relative isolate bg-cream p-2 md:p-3">
        <CaseHeroGround
          className={`absolute inset-x-2 top-2 -z-10 overflow-hidden rounded-[18px] md:inset-x-3 md:top-3 ${c.heroVisual ? "bottom-[100px] md:bottom-[200px] lg:bottom-[240px]" : "bottom-2 md:bottom-3"}`}
          style={c.heroBg}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-transparent" />
        </CaseHeroGround>
        <div className={`text-cream ${c.heroVisual ? "" : "pb-24 md:pb-32"}`}>
          <div className="w-full px-6 pt-32 text-center md:pt-40">
            <h1 className="mx-auto max-w-4xl">
              {c.logo ? (
                <img src={c.logo.src} alt={c.name} width={c.logo.width} height={c.logo.height} className="mx-auto block h-auto w-full max-w-[860px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]" loading="eager" decoding="async" />
              ) : (
                <span className="t-hero">{c.name}</span>
              )}
            </h1>
            <ul className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Wat ik maakte">
              <li className="rounded-full bg-cream px-3 py-1.5 text-[12px] font-semibold text-forest">Case</li>
              {c.services.map((s) => (
                <li key={s} className="rounded-full bg-white/15 px-3 py-1.5 text-[12px] font-medium ring-1 ring-white/30 backdrop-blur-md">{s}</li>
              ))}
            </ul>
          </div>
          {c.heroVisual && <div className="mt-10 w-full md:mt-12">{c.heroVisual}</div>}
        </div>
      </section>

      {/* the story (Lake): one big sentence with its first line indented, a short paragraph under it in
          grey, and beside it (Clay) the services in bold and the facts */}
      <section className="bg-cream py-20 text-forest md:py-36">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <Label className="text-forest/50">De case</Label>
            <p className="mt-8 font-display text-[clamp(1.6rem,3vw,2.9rem)] font-medium leading-[1.14] tracking-[-0.03em] [text-indent:12%]">{c.intro.lead}</p>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-forest/60">{c.intro.body}</p>
          </div>
          <aside className="lg:col-span-3 lg:col-start-10 lg:pt-14">
            <ul className="space-y-2 font-display text-lg font-semibold tracking-tight">
              {c.services.map((s) => <li key={s}>{s}</li>)}
            </ul>
            <dl className="mt-10 space-y-4 border-t border-forest/15 pt-6 text-[15px]">
              {c.facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-4">
                  <dt className="text-forest/50">{f.label}</dt>
                  <dd className="text-right font-medium">
                    {f.href ? (
                      <a href={f.href} target="_blank" rel="noopener noreferrer" className="underline decoration-forest/30 underline-offset-4 hover:decoration-forest">{f.value}</a>
                    ) : f.value}
                  </dd>
                </div>
              ))}
            </dl>
            <Button variant="dark" className="mt-8 px-6 py-3.5" href={c.liveUrl}>Bekijk de live site</Button>
          </aside>
        </Container>
      </section>

      {c.blocks.map((b, i) => {
        switch (b.kind) {
          case "chapter": return <Chapter key={i} b={b} n={++chapter} />;
          case "challenge": return <Challenge key={i} b={b} n={++chapter} bleed={c.blocks[i + 1]?.kind === "phones"} />;
          case "statement": return <Statement key={i} b={b} />;
          case "wall": return <Wall key={i} b={b} />;
          case "film": return <Film key={i} b={b} />;
          case "phones": return <Phones key={i} b={b} />;
          case "split": return <Split key={i} b={b} />;
          case "photo": return <Photo key={i} b={b} />;
          case "kit": return <Kit key={i} b={b} />;
        }
      })}

      {/* the result (Lake): offset to the right on the dark ground, then the figures and the quote */}
      <section data-zone="green" className="bg-forest py-20 text-cream md:py-36">
        <Container>
          <div className="lg:ml-[41.666%] lg:max-w-[52rem]">
            <Label className="text-lime">Het resultaat</Label>
            <p className="mt-8 font-display text-[clamp(1.6rem,3vw,2.9rem)] font-medium leading-[1.14] tracking-[-0.03em] [text-indent:12%]">{c.result.lead}</p>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/60">{c.result.body}</p>
          </div>
          {c.stats && (
            <dl className="mt-16 grid gap-8 border-t border-cream/15 pt-10 sm:grid-cols-3 md:mt-24">
              {c.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-5xl tabular-nums tracking-[-0.04em] md:text-7xl">
                    <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-2 text-sm text-cream/60">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
          {c.quote && (
            <figure className="mt-16 max-w-3xl border-l-[3px] border-lime pl-6 md:mt-24">
              <blockquote className="font-display text-2xl leading-snug md:text-3xl">&ldquo;{c.quote.text}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-cream/60">{c.quote.who}</figcaption>
            </figure>
          )}
          {c.closing && (
            <div className="mt-20 overflow-hidden rounded-[14px] md:mt-32">
              <img src={c.closing.src} alt={c.closing.alt} className="aspect-[4/3] w-full object-cover md:aspect-[16/8]" style={c.closing.pos ? { objectPosition: c.closing.pos } : undefined} loading="lazy" decoding="async" />
            </div>
          )}
        </Container>
      </section>

      {/* what I did, as the roles in a few columns */}
      <section className="bg-cream py-20 text-forest md:py-40">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Label className="text-forest/50">Wat ik deed</Label>
            <h2 className="mt-5 t-section">Eén maker, <span className="serif-italic">van schets tot live</span></h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:grid-cols-4 lg:pt-4">
            {c.roles.map((r) => (
              <div key={r.group}>
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest/55">{r.group}</h3>
                <ul className="mt-4 space-y-2 text-[15px]">
                  {r.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* the next case (Build in Amsterdam's "Next up"): one big, calm photo over the full width, the
          name in serif in the middle and a thin outlined button; the whole picture is the link */}
      {next && next.name !== c.name && (
        <section data-zone="green" className="bg-forest">
          <a href={next.href} className="group relative isolate flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-6 text-center text-white md:min-h-[92svh]">
            <img src={next.cover?.src ?? next.img} alt="" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.03]" style={{ objectPosition: next.cover?.pos ?? next.pos }} loading="lazy" decoding="async" />
            <span className="absolute inset-0 -z-10 bg-black/35" aria-hidden="true" />
            <span className="t-section [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]">Volgende case — <span className="serif-italic">{next.name}</span></span>
            <span className="mt-8 border border-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 group-hover:bg-white group-hover:text-forest">Bekijk de case</span>
          </a>
        </section>
      )}
    </>
  );
}
