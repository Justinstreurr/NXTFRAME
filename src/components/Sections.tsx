import { Fragment } from "react";
import MoreOnMobile from "./MoreOnMobile";
import { ArrowIcon, Button, Container, Eyebrow, Reassure, TextLink } from "./ui";
import Reveal from "./Reveal";
import ZigzagPath from "./ZigzagPath";
import PathWalker from "./PathWalker";
import { CodeIcon, LaunchIcon, MapIcon, PenIcon, TalkIcon } from "./StepIcons";
import PillarTabs from "./PillarTabs";
import { DesignDemo, SearchDemo, SpeedDemo } from "./PillarDemos";
import WorkCursor from "./WorkCursor";
import { tiers } from "./pricing";
import { faq } from "./faq";
import ConvertShowcase from "./ConvertShowcase";
import BranchCarousel, { type Segment } from "./BranchCarousel";
import StackCards, { type StackCard } from "./StackCards";
import BgOnCenter from "./BgOnCenter";
import LetterFill from "./LetterFill";
import BranchIcon from "./BranchIcons";
import WorkCases from "./WorkCases";
import DarkOnArrive from "./DarkOnArrive";
import { FrameGlyph } from "./Logo";
import { work } from "./workData";
import { services, type ServiceCard } from "./services";
import SmartBento from "./SmartBento";

/* ---------- The future of creative work ---------- */
/* ---------- Wat je krijgt: the statement, the three pillars and "Slim gebouwd" in one section ---------- */
const gains: StackCard[] = [
  {
    label: "Snel", img: "/images/slim-desk.webp", pos: "50% 18%",
    title: <>Snelheid <span className="serif-italic">en laadtijd</span></>,
    body: "Gebouwd met moderne code, zonder ballast. Je site laadt snel, ook op mobiel. Bezoekers haken minder snel af en vragen vaker iets aan.",
    cta: "Bekijk de aanpak", href: "/aanpak",
  },
  {
    label: "Vindbaar", img: "/images/slim-search.webp", pos: "48% 50%",
    title: <>Vindbaar <span className="serif-italic">in Google en AI</span></>,
    body: "Een opbouw en teksten die Google en ChatGPT goed kunnen lezen. Zo vergroot je de kans dat mensen die nu al naar jouw dienst zoeken, bij jou uitkomen.",
    cta: "Bekijk de diensten", href: "/diensten",
  },
  {
    label: "Kloppend", img: "/images/slim-palette.webp", pos: "42% 50%",
    title: <>Design dat <span className="serif-italic">klopt bij jouw klant</span></>,
    body: "Geen template, maar een ontwerp dat past bij jouw merk en je klanten. Elk onderdeel heeft een doel, zodat bezoekers weten wat de volgende stap is.",
    cta: "Bekijk het werk", href: "/werk",
  },
];

/** The statement between Herkenbaar and Wat je krijgt: the sentence on the left, the mascot building a site on the right. */
export function Statement() {
  return (
    <section className="statement-bg bg-cream py-16 text-forest md:py-32">
      {/* the background turns sand once the sentence sits in the middle of the window */}
      <BgOnCenter className="is-sand" />
      <Container className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <h2 className="max-w-5xl font-serif text-[2rem] sm:text-[clamp(2.5rem,5vw,5rem)] leading-[1.02] tracking-[-0.02em] text-forest">
          Websites die <span className="italic">snel laden, gevonden worden</span> en het merk voelbaar maken.{" "}
          <LetterFill parts={[{ text: "Gebouwd rond " }, { text: "jouw klant.", italic: true }]} start={0.6} end={0.3} />
        </h2>
        {/* the mascot building a site from blocks: header, photo and the lime button on top */}
        <picture className="mx-auto block w-32 sm:w-44 md:mx-0 md:w-56 lg:w-64">
          <source srcSet="/images/mascot-build.webp" type="image/webp" />
          <img src="/images/mascot-build.png" alt="De NXT Frame-mascotte bouwt een website van blokken" width={846} height={1230} className="h-auto w-full drop-shadow-[0_24px_30px_rgba(2,38,30,0.18)]" loading="lazy" />
        </picture>
      </Container>
    </section>
  );
}

export function AiFirst() {
  return (
    <section data-zone="cherry" className="slim-light slim-bg bg-cream pb-12 pt-4 text-forest md:pb-16 md:pt-8">
      <Container>
        <Eyebrow className="mx-auto w-fit">Wat je krijgt</Eyebrow>
      </Container>
      {/* the title stays put in the flow; only the cards below it stack while you scroll */}
      <div className="bg-inherit">
        <div className="bg-inherit">
          <Container>
            <h2 className="mt-6 text-center t-section text-forest md:mt-0 md:whitespace-nowrap md:py-3">
              Moderne techniek. <span className="serif-italic">Menselijke smaak.</span>
            </h2>
          </Container>
        </div>
        <Container>
          <p className="mx-auto mt-6 max-w-xl text-center text-forest/75 t-lead">
            Snel, goed te vinden en passend bij je merk, gebouwd om aanvragen op te leveren. Elke keuze maak ik zelf: geen template, geen standaardwerk.
          </p>
          {/* the three pillars as cards that stack while you scroll (StackCards) */}
          <div className="mt-12 md:mt-16">
            <StackCards items={gains} />
          </div>
        </Container>
      </div>
      <Container className="mt-8 text-center md:mt-10">
        <Button variant="dark" href="/contact">Plan een kennismaking</Button>
      </Container>
    </section>
  );
}

/* ---------- Your creative advantage ---------- */
export function CreativePartner() {
  // one calm card with a turning product mockup, no pinned scroll scene (ConvertShowcase)
  return <ConvertShowcase />;
}

/* ---------- Easy & hassle-free: pillars ---------- */
const pillars = [
  {
    title: (
      <>
        Snelheid <span className="serif-italic">en laadtijd</span>
      </>
    ),
    body: "Gebouwd met de nieuwste code, zonder ballast. Je site laadt in een fractie van een seconde, ook op mobiel. Snelle sites houden bezoekers vast en converteren beter.",
    cta: "Bekijk de aanpak",
    href: "/aanpak",
    Demo: SpeedDemo,
  },
  {
    title: (
      <>
        Vindbaar <span className="serif-italic">in Google en AI</span>
      </>
    ),
    body: "Structuur en content die zoekmachines én ChatGPT begrijpen. Zo word je gevonden door mensen die nu al naar jouw dienst zoeken, en wordt verkeer klanten.",
    cta: "Bekijk de diensten",
    href: "/diensten",
    Demo: SearchDemo,
  },
  {
    title: (
      <>
        Design dat <span className="serif-italic">klopt bij jouw klant</span>
      </>
    ),
    body: "Geen template, maar ontwerp rond jouw merk en jouw doelgroep. Elke sectie heeft een doel, zodat bezoekers precies weten wat ze moeten doen.",
    cta: "Bekijk het werk",
    href: "/werk",
    Demo: DesignDemo,
  },
];

export function Pillars() {
  return (
    <section data-zone="green" className="bg-cream py-16 md:py-32">
      <Container>
        {/* Heading, the three claims on the left and one card on the right that follows the
            chosen one, pinned together while the scroll steps through the claims. See PillarTabs;
            the demos themselves are drawn in markup and moved by CSS, see PillarDemos. */}
        <Reveal threshold={0.15} className="pillar-stage">
          <PillarTabs
            heading={
              <>
                <Eyebrow className="max-w-xl">Drie pijlers</Eyebrow>
                <h2 className="mt-6 max-w-4xl t-section text-forest md:mt-8">
                  Snel. Vindbaar. Kloppend.{" "}
                  <span className="serif-italic">Met conversie als rode draad.</span>
                </h2>
              </>
            }
            titles={pillars.map((p, i) => (
              <span key={i}>{p.title}</span>
            ))}
            copy={pillars.map((p, i) => (
              <div key={i}>
                <p className="max-w-md text-[15px] leading-relaxed text-forest/70 md:text-base">{p.body}</p>
                <a
                  href={p.href}
                  className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest"
                >
                  {p.cta}
                  <ArrowIcon className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </a>
              </div>
            ))}
          >
            {pillars.map((p, i) => (
              <div
                key={i}
                className="pillar-demo absolute inset-0 overflow-hidden rounded-[14px] bg-paper ring-1 ring-forest/10 shadow-[0_28px_60px_-40px_rgba(2,38,30,0.6)]"
              >
                <p.Demo />
              </div>
            ))}
          </PillarTabs>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- Success in numbers ---------- */
const stats = [
  { value: "400", suffix: "+", label: "Top global brands trust Superside with their creative." },
  { value: "12", suffix: "k+", label: "AI-powered projects delivered with ~35% more efficiency." },
  { value: "94", suffix: "%", label: "Brands see a three-year ROI of 94% on their Superside subscription." },
  { value: "6", suffix: " months", label: "Brands see a 6-month payback period on their Superside subscription." },
];

export function Stats() {
  return (
    <section className="bg-forest py-16 text-paper md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div>
            <Eyebrow tone="light">Success in numbers</Eyebrow>
            <h2 className="mt-6 t-section md:mt-8">
              The best return on <span className="serif-italic">your investment</span>
            </h2>
            <p className="mt-6 max-w-md text-paper/80 t-lead">
              Startup, enterprises and mid-market companies trust Superside to deliver pixel-perfect creative, at scale.
            </p>
          </div>
          <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {stats.map((s) => (
              <div key={s.value + s.suffix} className="border-t border-paper/20 pt-6">
                <dt className="font-display text-6xl tracking-[-0.04em] md:text-7xl">
                  {s.value}
                  <span className="text-pink">{s.suffix}</span>
                </dt>
                <dd className="mt-4 max-w-xs text-base text-paper/80">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Customer stories ---------- */
const stories = [
  {
    brand: "Colgate-Palmolive",
    title: "“A brand that better reflects our purpose:” How Superside became Colgate-Palmolive’s strategic creative partner",
    img: "/images/tile-2.jpg",
  },
  {
    brand: "Mekanism",
    title: "“Bringing in the AI perspective”: Why Mekanism chose Superside as a partner for their AI journey",
    img: "/images/tile-5.jpg",
  },
];

export function CustomerStories() {
  return (
    <section className="bg-forest pb-16 text-paper md:pb-32">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {stories.map((s) => (
            <article key={s.brand} className="group relative overflow-hidden rounded-3xl">
              <img src={s.img} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <span className="eyebrow text-paper/80">Customer Stories</span>
                <div>
                  <h3 className="max-w-md font-display text-2xl leading-tight tracking-tight md:text-3xl">{s.title}</h3>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    <span className="grid size-10 place-items-center rounded-full bg-lime text-forest">
                      <svg viewBox="0 0 24 24" className="ml-0.5 size-4" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                    Play video
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Diensten ---------- */
/* the six services and their type live in services.ts, shared with the homepage wheel (ServicesWheel) */
export type { ServiceCard };

/**
 * The services grid: cream cards on forest, the one under the pointer turns lime. The homepage
 * shows the six services; other pages (website-laten-maken) pass their own heading and cards so
 * the section looks the same everywhere. Cards without an href render as plain cards.
 */
export function Services({
  eyebrow = "Diensten",
  title = (
    <>
      Van eerste schets tot <span className="serif-italic">site die verkoopt</span>
    </>
  ),
  intro,
  action = <Button variant="dark" href="/diensten">Alle diensten</Button>,
  items = services,
  overlap = false,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: string;
  action?: React.ReactNode;
  items?: ServiceCard[];
  /** rounded top corners that slide up over the section before it (the lime scene on the homepage) */
  overlap?: boolean;
} = {}) {
  return (
    <section data-zone="cherry" className={`bg-cream py-16 text-forest md:py-32 ${overlap ? "relative z-20 -mt-12 rounded-t-[36px] md:-mt-16 md:rounded-t-[48px]" : ""}`}>
      {/* centred heading, then the services as a quiet three-column list: an icon tile, the name
          and one line each. No cards, so the cream ground stays calm. */}
      <Container className="text-center">
        <Eyebrow className="mx-auto">{eyebrow}</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-4xl t-section text-forest md:mt-8">
          {title}
        </h2>
        {intro && <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">{intro}</p>}
      </Container>
      <Container>
        <ul className="mt-12 grid md:mt-16 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-20">
          {items.map((d) => {
            const Item = d.href ? "a" : "div";
            return (
              <li key={d.title}>
                <Item href={d.href} className="group block">
                  <span className="grid size-20 place-items-center rounded-2xl bg-forest/[0.06] text-forest transition-colors duration-500 group-hover:bg-lime">
                    <BranchIcon name={d.icon ?? "grid"} className="size-8" />
                  </span>
                  <h3 className="mt-10 font-display text-2xl font-medium tracking-tight md:text-[1.7rem]">{d.title}</h3>
                  <p className="mt-2.5 max-w-sm text-base leading-relaxed text-forest/70">{d.body}</p>
                </Item>
              </li>
            );
          })}
        </ul>
        {action && <div className="mt-12 text-center md:mt-16">{action}</div>}
      </Container>
    </section>
  );
}

/* ---------- Ons werk ---------- */

export function Work({ turnDark = true }: { /** false keeps the section cream all the way (the aanpak page) */ turnDark?: boolean } = {}) {
  return (
    // starts in the cream of Wat je krijgt and turns black once its own halfway point reaches the middle of the window
    // (DarkOnArrive sets is-dark; the colours and their fade are .work-section in globals.css)
    <section data-zone="green" id="ons-werk" className="work-section relative pb-16 pt-12 md:pb-32 md:pt-20">
      {turnDark && <DarkOnArrive />}
      {/* heading and photos keep to the same width as the rest of the site (Container): title left,
          the way to all work right, a hairline under both */}
      <Container className="work-rows relative">
        <div className="work-line flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b pb-8 md:pb-10">
          <div>
            <Eyebrow className="work-when-light max-w-xl">Mijn werk</Eyebrow>
            <Eyebrow tone="wine" className="work-when-dark max-w-xl">Mijn werk</Eyebrow>
            <h2 className="mt-6 max-w-3xl t-section md:mt-8">
              Echte klanten en <span className="work-accent serif-italic">concepten per branche</span>
            </h2>
          </div>
          <TextLink href="/werk" className="work-when-light mb-2">Bekijk al het werk</TextLink>
          <TextLink light href="/werk" className="work-when-dark mb-2">Bekijk al het werk</TextLink>
        </div>
        <WorkCases items={work} />
        <WorkCursor />
      </Container>
    </section>
  );
}


/* ---------- NXT Frame vs. alternatieven ---------- */
const criteria = ["Snelheid en laadtijd", "Vindbaar in Google en AI", "Design op maat", "Gericht op aanvragen", "Eén aanspreekpunt", "Prijs en doorlooptijd"];
type Score = 2 | 1 | 0;
const columns: { name: string; body: string; scores: Score[]; highlight?: boolean }[] = [
  { name: "NXT Frame", body: "Ontwerp, techniek en vindbaarheid in één hand. Eén persoon die het hele traject doet, van eerste schets tot livegang.", scores: [2, 2, 2, 2, 2, 2], highlight: true },
  { name: "Bureau", body: "Sterk in strategie en design, maar vaak duurder en trager, met veel schijven tussen jou en de mensen die het maken.", scores: [1, 1, 2, 1, 0, 0] },
  { name: "Freelancer", body: "Flexibel en betaalbaar, maar meestal één specialisme. Design óf techniek óf vindbaarheid, zelden alle drie.", scores: [1, 0, 1, 1, 2, 2] },
  { name: "AI-sitebuilder", body: "Snel iets online, maar generiek. Geen eigen ontwerp, matige snelheid en geen strategie om gevonden te worden.", scores: [1, 0, 0, 0, 1, 2] },
];

function ScoreIcon({ s, highlight, delay = 0 }: { s: Score; highlight?: boolean; delay?: number }) {
  const style = { "--d": `${delay}ms` } as React.CSSProperties;
  if (s === 2)
    return (
      <span style={style} className={`score grid size-7 place-items-center rounded-full ${highlight ? "bg-brown text-pink" : "bg-brown/10 text-brown"}`}>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-label="Ja"><path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    );
  if (s === 1)
    return (
      <span style={style} className="score grid size-7 place-items-center rounded-full bg-brown/10 text-brown">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-label="Deels"><path d="M6 12h12" strokeLinecap="round" /></svg>
      </span>
    );
  return (
    <span style={style} className="score grid size-7 place-items-center rounded-full bg-brown/5 text-brown/40">
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-label="Nee"><path d="M7 7l10 10M17 7 7 17" strokeLinecap="round" /></svg>
    </span>
  );
}

export function Comparison() {
  return (
    <section data-zone="cherry" className="bg-cream py-16 md:py-32">
      <Container>
        <Eyebrow className="max-w-xl">NXT Frame vs. de alternatieven</Eyebrow>
        <h2 className="mt-6 max-w-4xl t-section text-brown md:mt-8">
          Bureau, freelancer of AI-tool, <span className="serif-italic text-brown">naast elkaar gezet</span>
        </h2>
        {/* phones: the same comparison as a compact grid, the criteria down the side and the four
            options as narrow icon columns (NXT Frame on pink), with what sets NXT Frame apart under it */}
        <div className="mt-10 rounded-3xl bg-paper p-4 text-brown md:hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_repeat(4,2.9rem)] items-center gap-y-2.5">
            <span />
            {columns.map((c) => (
              <span key={c.name} className={`mx-auto max-w-full rounded-full px-1 py-1 text-center text-[11px] font-semibold leading-tight [hyphens:manual] ${c.highlight ? "bg-pink" : "text-brown/70"}`}>
                {c.highlight ? "NXT" : c.name === "AI-sitebuilder" ? "AI-tool" : c.name === "Freelancer" ? "Free­lancer" : c.name}
              </span>
            ))}
            {criteria.map((crit, ri) => (
              <Fragment key={crit}>
                <span className="hyphens-auto border-t border-brown/10 pt-2.5 pr-1 text-sm leading-snug text-brown/80 [overflow-wrap:anywhere]">{crit}</span>
                {columns.map((c) => (
                  <span key={c.name} className="grid place-items-center border-t border-brown/10 pt-2.5">
                    <ScoreIcon s={c.scores[ri]} highlight={c.highlight} />
                  </span>
                ))}
              </Fragment>
            ))}
          </div>
          <p className="mt-5 rounded-2xl bg-pink p-4 text-sm leading-relaxed text-brown/80">{columns[0].body}</p>
        </div>        <Reveal threshold={0.35} className="cmp mt-16 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[860px] border-separate border-spacing-x-3 border-spacing-y-0 text-left">
            <thead>
              <tr>
                <th className="w-44 align-bottom pb-4" />
                {columns.map((c) => (
                  <th key={c.name} className={`rounded-t-3xl px-6 pt-8 pb-4 align-top font-display text-xl font-semibold tracking-tight ${c.highlight ? "bg-pink text-brown" : "bg-paper text-brown"}`}>
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((crit, ri) => (
                <tr key={crit}>
                  <th scope="row" className="py-3 pr-4 text-sm font-medium text-brown/80">{crit}</th>
                  {columns.map((c, ci) => (
                    <td key={c.name} className={`px-6 py-3 ${c.highlight ? "bg-pink" : "bg-paper"}`}>
                      <ScoreIcon s={c.scores[ri]} highlight={c.highlight} delay={(ri * columns.length + ci) * 70} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td />
                {columns.map((c) => (
                  <td key={c.name} className={`rounded-b-3xl px-6 pt-4 pb-8 align-top text-sm leading-relaxed ${c.highlight ? "bg-pink text-brown/80" : "bg-paper text-brown/70"}`}>
                    {c.body}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>

      </Container>
    </section>
  );
}

/* ---------- Reviews ---------- */
/* DRAFT QUOTES written for the clients to approve: have Happy Flops and Sabrina confirm (or rewrite)
   them, and fill in the Happy Flops name, before going live */
const reviews = [
  {
    name: "Happy Flops",
    role: "Eigenaar, Happy Flops",
    quote: "De nieuwe webshop laadt snel, ook op mobiel, en het afrekenen gaat in een paar tikken. Justin dacht mee als ondernemer, niet alleen als bouwer. Dat zie je terug in de bestellingen.",
  },
  {
    name: "Sabrina",
    role: "Hypotheekadviseur, Hypotheekhaven",
    quote: "Justin vertaalde mijn persoonlijke manier van werken naar een site die rust en vertrouwen uitstraalt. Klanten weten na het lezen al wie ik ben en plannen makkelijker een gesprek. En als ik iets wilde aanpassen, was het snel geregeld.",
  },
];

/** `dark` puts the reviews on the black of the work above them (the over page), so the two read as one block */
export function Testimonials({ dark = false }: { dark?: boolean } = {}) {
  return (
    <section
      data-zone={dark ? "green" : "cherry"}
      {...(dark && { "data-follow-dark": "" })}
      className={`py-16 md:py-32 ${dark ? "follow-dark -mt-px text-cream" : "bg-cream text-brown"}`}
    >
      <Container>
        <Eyebrow tone={dark ? "wine" : undefined} className="max-w-xl">Reviews</Eyebrow>
        <h2 className={`mt-6 t-section md:mt-8 ${dark ? "text-cream" : "text-brown"}`}>
          Wat klanten <span className={`serif-italic ${dark ? "text-[#fcbbb9]" : ""}`}>erover zeggen</span>
        </h2>
        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
          {reviews.map((r, i) => (
            <figure key={i} className="relative flex flex-col justify-between rounded-3xl bg-paper p-8 md:p-10">
              <FrameGlyph className="size-5 text-forest" />
              <blockquote className="mt-6 font-display text-xl leading-snug tracking-tight text-brown md:text-[28px]">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="size-11 rounded-full bg-pink/60" aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-brown">{r.name}</span>
                  <span className="block text-sm text-brown/60">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Aanpak ---------- */
/* the token overrides per tone of the path section (Platform); forest needs none */
const platformTones: Record<"forest" | "wine" | "cream", Record<string, string> | undefined> = {
  forest: undefined,
  wine: { "--color-forest": "#440220", "--color-lime": "#fcbbb9" },
  cream: { "--color-forest": "#f7f1e8", "--color-lime": "#02261e", "--color-paper": "#02261e", "--color-cream": "#02261e" },
};

export type PathStep = { title: string; body: string; Icon: (props: { className?: string }) => React.ReactNode };

const steps: PathStep[] = [
  { title: "Kennismaking", body: "We bespreken je bedrijf, je klanten en wat de site moet opleveren. Geen verkooppraatje, wel een eerlijk advies over wat zin heeft.", Icon: TalkIcon },
  { title: "Strategie en structuur", body: "Doelgroep, zoekgedrag en doelen vertaald naar een sitestructuur. Zo weten we per pagina wat hij moet doen voordat er iets wordt ontworpen.", Icon: MapIcon },
  { title: "Ontwerp", body: "Een ontwerp dat past bij jouw merk en jouw klant. Je kijkt mee en denkt mee, in rondes die overzichtelijk blijven.", Icon: PenIcon },
  { title: "Bouw", body: "Gebouwd op moderne techniek, met snelheid en vindbaarheid vanaf de eerste regel code. Getest op mobiel en desktop.", Icon: CodeIcon },
  { title: "Lancering en doorgroei", body: "Live zetten, meten en verbeteren. Nieuwe pagina's, campagnes en content zodra je bedrijf verder groeit.", Icon: LaunchIcon },
];

/**
 * The steps on the zigzag path. The homepage uses the defaults; website-laten-maken passes its own
 * heading and intro. The path draws itself through however many steps there are, so a page can
 * also pass its own (`items`, as the branches hub does with three).
 */
export function Platform({
  eyebrow = "Aanpak",
  title = (
    <>
      Van kennismaking <span className="serif-italic">tot lancering en verder</span>
    </>
  ),
  intro = "Vijf stappen, één aanspreekpunt. Je weet altijd waar het traject staat en wat de volgende stap is.",
  action = <TextLink light className="mt-8" href="/aanpak">Bekijk de aanpak</TextLink>,
  person = false,
  items = steps,
  straight = false,
  tone = "forest",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: string;
  action?: React.ReactNode;
  /** the homepage version: the one-person story (who you work with) opens the steps */
  person?: boolean;
  /** the steps to walk; the five of the approach by default */
  items?: PathStep[];
  /** every step on the same side, so the line runs straight down instead of zigzagging; smaller nodes, moved in from the left */
  straight?: boolean;
  /** `wine` sets the section in the second colour pair (wine ground, blush accents); `cream` turns it light (cream ground, forest type and accents) */
  tone?: "forest" | "wine" | "cream";
} = {}) {
  if (person) {
    eyebrow = "Zo werkt het";
    title = <><span className="serif-italic">Eén persoon,</span> geen ticketsysteem</>;
  }
  return (
    <section
      data-zone="green"
      // wine and cream: the section redefines the colour tokens for everything inside it, so the
      // nodes, the line, the numbers, the label and the links all follow without a second set of
      // classes. These keep the full top padding, since the ground differs from the section above.
      style={platformTones[tone] as React.CSSProperties | undefined}
      className={`bg-forest text-paper ${tone === "forest" ? "pb-16 pt-4 md:pb-32 md:pt-8" : "py-16 md:py-32"}`}
    >
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          {/* sticky intro: who you work with, kept short */}
          <div className="self-start lg:sticky lg:top-28">
            <Eyebrow tone="light" className="max-w-xl">{eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-xl t-section md:mt-8">
              {title}
            </h2>
            {person ? (
              <>
                <p className="mt-6 max-w-md text-paper/80 t-lead">
                  Ik ben Justin Streur. Ik ontwerp, bouw én koppel, dus wat we samen bedenken is precies wat je
                  krijgt. Van de eerste schets tot ver na de lancering praat je met dezelfde persoon.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                  <TextLink light href="/aanpak">Bekijk de aanpak</TextLink>
                  <TextLink light href="/over">Meer over mij</TextLink>
                </div>
              </>
            ) : (
              <>
                <p className="mt-6 max-w-md text-paper/80 t-lead">{intro}</p>
                {action}
              </>
            )}
          </div>

          {/* the path: the steps on the zigzag (or one under the other with `straight`), the mascot walking it as you scroll */}
          <div className="relative">
            <ZigzagPath />
            <PathWalker onLight={tone === "cream"} />
            <ol className="space-y-10 md:space-y-20">
              {items.map((st, i) => {
                const left = i % 2 === 0;
                return (
                  <li key={st.title}>
                    <Reveal threshold={0.5} className={`step relative grid items-center gap-6 pl-20 md:pl-0 ${straight ? "md:grid-cols-[4rem_1fr] md:gap-8 md:pl-16" : "md:grid-cols-2 md:gap-0"}`}>
                      <div
                        className={`step-node absolute left-0 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-forest text-lime ring-2 ring-lime md:static md:row-start-1 md:translate-y-0 ${straight ? "md:size-16" : "md:size-24"} ${
                          straight ? "md:col-start-1" : left ? "md:col-start-2 md:justify-self-start md:ml-16" : "md:col-start-1 md:justify-self-end md:mr-16"
                        }`}
                      >
                        <st.Icon className={`size-6 ${straight ? "md:size-9" : "md:size-14"}`} />
                      </div>
                      <div className={`step-text md:row-start-1 ${straight ? "md:col-start-2" : left ? "md:col-start-1 md:pr-8 md:text-right" : "md:col-start-2 md:pl-8"}`}>
                        <span className="text-sm text-lime">0{i + 1}</span>
                        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-[26px]">{st.title}</h3>
                        <p className={`mt-3 text-[15px] leading-relaxed text-paper/70 ${straight ? "max-w-md" : "max-w-sm"} ${left && !straight ? "md:ml-auto" : ""}`}>{st.body}</p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Voor wie ---------- */
const segments: Segment[] = [
  { label: "Makelaars", icon: "house", title: "Lokaal gevonden, meer bezichtigingen", tags: ["woningaanbod", "waardebepaling", "lokale SEO"], img: "/images/segment-makelaars.jpg", href: "/makelaars" },
  { label: "Webshops", icon: "bag", title: "Snel laden, meer bestellingen", tags: ["productpagina's", "checkout", "AI-vindbaar"], img: "/images/happyflops-hero-3.jpg", href: "/branches/webshops" },
  { label: "Adviseurs", icon: "chart", title: "Vertrouwen vóór het eerste gesprek", tags: ["hypotheek", "financieel", "juridisch"], img: "/images/tile-14.jpg", href: "/financieel-advies" },
  { label: "Horeca", icon: "cup", title: "Van zoekopdracht naar reservering", tags: ["reserveren", "menukaart", "Google-profiel"], img: "/images/tile-10.jpg", href: "/branches/horeca" },
  { label: "Coaches en trainers", icon: "chat", title: "Van volger naar klant", tags: ["programma's", "boekingen", "persoonlijk merk"], img: "/images/woman-cup.jpg", href: "/branches/coaches-en-adviseurs" },
  { label: "Bouw en installatie", icon: "wrench", title: "Offerteaanvragen die binnenkomen", tags: ["projecten", "offerte", "regio's"], img: "/images/ladder.jpg", href: "/branches/bouw-en-installatie" },
];

export function Difference({
  title = (
    <>
      Gebouwd rond <span className="serif-italic">jouw branche</span>
    </>
  ),
  lead = "Een makelaar heeft andere vragen dan een restaurant. Per branche weet ik wat de site moet doen, en voor de meeste staat een werkend concept online.",
  exclude,
}: {
  title?: React.ReactNode;
  lead?: string;
  /** the label of a branch to leave out: the one whose page this is */
  exclude?: string;
} = {}) {
  return (
    <section data-zone="cherry" className="overflow-hidden bg-cream pb-16 pt-4 text-forest md:pb-32 md:pt-8">
      {/* heading left with the arrows on the right, the branch cards as a carousel under it (BranchCarousel) */}
      <BranchCarousel
        items={exclude ? segments.filter((s) => s.label !== exclude) : segments}
        header={
          <>
            <Eyebrow className="max-w-xl">Voor wie</Eyebrow>
            <h2 className="mt-6 t-section text-forest md:mt-8">{title}</h2>
            <p className="mt-6 max-w-xl text-forest/75 t-lead">{lead}</p>
          </>
        }
      />
    </section>
  );
}

/* ---------- Veelgestelde vragen: five from the hub FAQ, with FAQPage structured data ---------- */
/* plus one homepage-only question that goes with "Meer dan een website" (not in the shared faq yet,
   so the other pages stay as they are) */
const homeFaq = [
  ...[0, 1, 2, 4, 3].map((i) => faq[i]),
  {
    q: "Kun je ook een AI-assistent, rekentool of koppeling bouwen?",
    a: "Ja. Een rekentool, een assistent die vragen beantwoordt met de kennis van jouw bedrijf of een koppeling met het pakket dat je al gebruikt: ik bouw het erbij, ook in een bestaande site. Ik zoek vooraf uit wat kan en zeg eerlijk wat het kost, voordat er iets gebouwd wordt.",
  },
];

export function HomeFaq() {
  // the homepage's one JSON-LD block: who NXT Frame is, the site itself, and these questions
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://nxtframe.ai/#organization",
        name: "NXT Frame",
        url: "https://nxtframe.ai",
        logo: "https://nxtframe.ai/icon-512.png",
        email: "hallo@nxtframe.ai",
        founder: { "@type": "Person", name: "Justin Streur" },
        areaServed: { "@type": "Country", name: "Nederland" },
      },
      {
        "@type": "WebSite",
        "@id": "https://nxtframe.ai/#website",
        url: "https://nxtframe.ai",
        name: "NXT Frame",
        inLanguage: "nl",
        publisher: { "@id": "https://nxtframe.ai/#organization" },
      },
      {
        "@type": "FAQPage",
        mainEntity: homeFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
  return (
    <section className="bg-cream pb-16 pt-8 text-forest md:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="self-start lg:sticky lg:top-28">
          <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
          <h2 className="mt-6 t-section md:mt-8">
            Nog twijfels?
            <br />
            <span className="serif-italic">Dit vragen de meesten.</span>
          </h2>
          <a href="/prijzen" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold">
            Alle vragen en prijzen
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <FaqList items={homeFaq} />
      </Container>
    </section>
  );
}

/** The questions as a list that folds open, one hairline between each; shared by the homepage and the sub pages. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    // on phones the first six questions, the rest behind a button
    <MoreOnMobile show={6} label={`Toon alle ${items.length} vragen`} className="faq divide-y divide-forest/15 border-y border-forest/15">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-semibold tracking-tight md:text-xl">
            {f.q}
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest/[0.06] transition-colors group-open:bg-lime" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-300 group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </span>
          </summary>
          <p className="faq-answer max-w-2xl pb-7 text-base leading-relaxed text-forest/75">{f.a}</p>
        </details>
      ))}
    </MoreOnMobile>
  );
}

/* ---------- Meer dan een website: a short teaser on the homepage only, three cards and one link
   (a full /slimme-tools page comes later; its content already waits in smartTools.ts) ---------- */
export function SmartExtras() {
  return (
    <section data-zone="cherry" className="bg-cream py-16 text-forest md:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <Eyebrow className="max-w-xl">Meer dan een website</Eyebrow>
            <h2 className="mt-6 t-section md:mt-8">
              Een site die ook <span className="serif-italic">werk uit handen neemt</span>
            </h2>
          </div>
          <p className="max-w-md text-forest/75 t-lead">
            Een rekentool, een assistent die vragen beantwoordt of een koppeling met het systeem dat je al gebruikt. Ik bouw het erbij, zodat je site meer doet dan er goed uitzien.
          </p>
        </div>
        {/* four tools as a bento grid, each with a small looping film of the tool at work (SmartBento) */}
        <div className="mt-12 md:mt-16">
          <SmartBento />
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <TextLink href="/contact">Vraag wat er kan voor jouw bedrijf</TextLink>
          <p className="text-[15px] text-forest/60">Iets anders in gedachten? Vraag het gerust, dan zoek ik uit of het kan.</p>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Wat kost het: the three starting prices, built like an editorial opener ---------- */
/* the price cards in turn: white, forest (the one most pick), white */
const priceTones = [
  { card: "bg-paper text-forest ring-1 ring-forest/10", muted: "text-forest/70", pill: "bg-forest text-lime", line: "border-forest/15", check: "bg-forest text-lime" },
  { card: "bg-forest text-cream", muted: "text-cream/70", pill: "bg-lime text-forest", line: "border-cream/15", check: "bg-lime text-forest" },
  { card: "bg-paper text-forest ring-1 ring-forest/10", muted: "text-forest/70", pill: "bg-forest text-lime", line: "border-forest/15", check: "bg-forest text-lime" },
];

export function Prices() {
  return (
    <section className="bg-cream pb-16 pt-4 text-forest md:pb-32 md:pt-8">
      <Container>
        {/* the heading centred, like the other sections */}
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mx-auto">Wat kost het</Eyebrow>
          <h2 className="mt-6 t-section md:mt-8">
            Eerlijke prijzen, <span className="serif-italic">vooraf vast</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">
            Dit zijn vanaf-prijzen, zodat je weet waar je aan toe bent. Na de kennismaking krijg je één vaste prijs voor het hele traject. De doorlooptijd telt vanaf het moment dat teksten, foto&apos;s en toegang binnen zijn.
          </p>
        </div>

        {/* three solid colour cards: the name, the price, what it is and how long it takes, everything
            that is in it, and the button at the foot; the middle one stands a little forward */}
        <ul className="mt-12 grid items-stretch gap-5 md:mt-16 lg:grid-cols-3">
          {tiers.map((t, i) => {
            const c = priceTones[i % priceTones.length];
            return (
              <li key={t.name} className={t.highlight ? "order-first lg:order-none lg:-my-4" : ""}>
                <a href="/prijzen" className={`group flex h-full flex-col rounded-[14px] p-6 md:p-8 ${c.card} ${t.highlight ? "lg:pb-12 lg:pt-12" : ""}`}>
                  <span className="flex items-center justify-between gap-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${c.pill}`}>
                      <FrameGlyph className="size-2.5" />
                      {t.name}
                    </span>
                    {t.highlight && <span className={`text-xs font-semibold ${c.muted}`}>Meest gekozen</span>}
                  </span>

                  <span className="mt-8 block">
                    <span className={`block text-sm ${c.muted}`}>vanaf</span>
                    <span className="block font-display text-5xl font-semibold leading-none tracking-[-0.03em] md:text-6xl">€ {t.from}</span>
                  </span>
                  <span className={`mt-5 block text-base leading-relaxed ${c.muted}`}>{t.body}</span>
                  <span className={`mt-4 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${c.line}`}>
                    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="8" cy="8" r="6.2" /><path d="M8 4.8V8l2.2 1.4" strokeLinecap="round" /></svg>
                    Live in {t.time}
                  </span>

                  {/* on phones the full list only on the highlighted card; the others fold to their summary, and the card itself opens /prijzen */}
                  <span className={`mt-7 border-t pt-6 ${c.line} ${t.highlight ? "block" : "hidden md:block"}`}>
                    <span className="grid gap-3">
                      {t.items.map((it) => (
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
                    Bekijk wat erin zit
                    <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        {/* one decision under the cards: the main button, the line that takes the doubt away, and the question */}
        <div className="mt-12 flex flex-col items-center gap-3 text-center md:mt-16">
          <Button variant="dark" className="px-8 py-4 text-base" href="/contact">
            Plan een kennismaking
          </Button>
          <Reassure />
          <p className="mt-2 max-w-md text-[15px] text-forest/70">Twijfel je welke past? In de kennismaking kijken we samen wat jouw site moet doen.</p>
        </div>
      </Container>
    </section>
  );
}
