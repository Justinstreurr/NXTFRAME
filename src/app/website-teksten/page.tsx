import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaqList, Platform, Work, type PathStep } from "@/components/Sections";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { FrameGlyph } from "@/components/Logo";
import Reveal from "@/components/Reveal";
import StackCards, { type StackCard } from "@/components/StackCards";
import BranchIcon, { type IconKey } from "@/components/BranchIcons";
import { LaunchIcon, PenIcon, TalkIcon } from "@/components/StepIcons";
import { faq } from "@/components/faq";
import { textsFaq } from "@/components/menuData";

/**
 * Website teksten: the page for "website teksten laten schrijven", "webteksten", "SEO-teksten".
 * Order: the promise (hero), what you get (four cards in the brand colours), a fictional before
 * and after (the table of the aanpak page), the four steps on the path, the three places you can
 * start from (stacking cards), the proof, and the questions. No price of its own: texts are part
 * of a website project (the "Content" factor), so the page links to /prijzen and /contact. The
 * footer carries the closing call to action.
 *
 * DRAFT COPY: everything on this page is a first version for Justin to check. In particular: that
 * he also takes on texts for an existing site, the "schrijf je liever zelf" card, and who owns the
 * texts after delivery.
 */
export const metadata: Metadata = {
  title: "Website teksten laten schrijven | Webteksten die werken | NXT Frame",
  description:
    "Webteksten in de woorden van je klant, zodat bezoekers snappen wat je doet en contact opnemen. In jouw toon, met jouw akkoord. Heb je al teksten, dan maak ik ze scherper.",
  alternates: { canonical: "/website-teksten" },
};

/* what you get: the four points of the content block on /diensten, one big card each */
const gets: { icon: IconKey; title: string; body: string }[] = [
  {
    icon: "layout",
    title: "Per pagina één doel",
    body: "Elke pagina heeft één taak: een telefoontje, een offerte, een afspraak. De tekst werkt daar naartoe, zonder omwegen.",
  },
  {
    icon: "search",
    title: "Op de zoekvragen van je klant",
    body: "Geschreven in de woorden die je klant zelf intypt, niet in vakjargon. Zo snappen bezoekers én zoekmachines meteen waar de pagina over gaat.",
  },
  {
    icon: "eye",
    title: "Kopjes en knoppen die duidelijk zijn",
    body: "De meeste bezoekers scannen eerst. Kopjes die zeggen wat ze krijgen en knoppen die zeggen wat er gebeurt, doen het meeste werk.",
  },
  {
    icon: "pen",
    title: "Afgestemd op jouw toon",
    body: "Je of u, nuchter of warm: de teksten klinken zoals jij met klanten praat. Samen afgestemd, niet bedacht achter een bureau.",
  },
];

/* the colours of the cards, in turn: forest, lime, wine, blush (the set of /diensten) */
const tones = [
  { card: "bg-forest text-paper", muted: "text-paper/75" },
  { card: "bg-lime text-forest", muted: "text-forest/75" },
  { card: "bg-[#440220] text-[#fcbbb9]", muted: "text-cream/80" },
  { card: "bg-[#fcbbb9] text-[#440220]", muted: "text-[#440220]/80" },
];

/* before and after, for a made-up installer: what you often see, how I would write it, and why */
const examples = [
  {
    part: "Kopje",
    before: "Welkom bij Jansen Installatietechniek",
    after: "Je nieuwe cv-ketel, zonder gedoe geplaatst",
    why: "Zegt meteen wat de bezoeker krijgt",
  },
  {
    part: "Eerste zin",
    before: "Wij zijn een dynamisch bedrijf met jarenlange ervaring en passie voor ons vak.",
    after: "Jij kiest de ketel, wij regelen de rest: advies, offerte, plaatsing en het afvoeren van je oude ketel.",
    why: "Gaat over de klant, niet over het bedrijf",
  },
  {
    part: "Knop",
    before: "Klik hier",
    after: "Vraag een offerte aan",
    why: "Zegt wat er gebeurt als je klikt",
  },
  {
    part: "Titel in Google",
    before: "Home | Jansen",
    after: "Cv-ketel laten vervangen | Jansen Installatie",
    why: "Sluit aan op wat je klant zoekt",
  },
];

/* the tick in the "Zo schrijf ik het" column, as on the aanpak page */
function Tick({ delay = 0 }: { delay?: number }) {
  return (
    <span style={{ "--d": `${delay}ms` } as React.CSSProperties} className="score grid size-6 shrink-0 place-items-center rounded-full bg-forest text-lime">
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true"><path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

/* how the texts come about: four steps on the path */
const SearchStepIcon = ({ className }: { className?: string }) => <BranchIcon name="search" className={className} />;
const steps: PathStep[] = [
  {
    title: "Een gesprek",
    body: "Over je bedrijf, je klanten en hoe jij praat. Oude teksten, folders of mails aan klanten zijn welkom, maar niet nodig.",
    Icon: TalkIcon,
  },
  {
    title: "Zoekvragen en structuur",
    body: "Welke vragen stelt je klant? Per pagina kies ik één doel en de vragen die hij moet beantwoorden, voordat er een zin staat.",
    Icon: SearchStepIcon,
  },
  {
    title: "Schrijven",
    body: "Ik schrijf per pagina, direct in de opzet van het ontwerp. Kopjes, knoppen en de titels en beschrijvingen voor Google horen erbij.",
    Icon: PenIcon,
  },
  {
    title: "Feedback en akkoord",
    body: "Je leest mee en geeft feedback in de rondes die we vooraf afspreken. Pas na jouw akkoord gaat een tekst online.",
    Icon: LaunchIcon,
  },
];

/* where you start from: three cards that stack while you scroll */
const starts: StackCard[] = [
  {
    label: "Nog niets", img: "/images/slim-desk.webp", pos: "50% 18%",
    title: <>Nog geen <span className="serif-italic">letter op papier</span></>,
    body: "Geen probleem, dat is eerder regel dan uitzondering. Uit één goed gesprek haal ik genoeg om te beginnen. Jouw tijd zit in praten en nalezen, niet in schrijven.",
    cta: "Plan een kennismaking", href: "/contact",
  },
  {
    label: "Wel teksten", img: "/images/andere-tijd.webp", pos: "50% 40%",
    title: <>Teksten die <span className="serif-italic">niet werken</span></>,
    body: "Dan maak ik ze scherper: korter, duidelijker en op de vragen van je klant. Wat goed is, blijft staan. Wat bezoekers wegjaagt, gaat eruit.",
    cta: "Bekijk de aanpak", href: "/aanpak",
  },
  {
    label: "Zelf schrijven", img: "/images/slim-palette.webp", pos: "42% 50%",
    title: <>Je schrijft <span className="serif-italic">liever zelf</span></>,
    body: "Ook goed. Dan krijg je per pagina een opzet: het doel, de kopjes en de vragen die erin moeten. Ik lees daarna mee en maak de tekst af waar het nodig is.",
    cta: "Bekijk de prijzen", href: "/prijzen",
  },
];

/* the questions about texts: two of the shared ones, and their own */
const questions = [
  textsFaq,
  {
    q: "Hoe krijg je mijn toon te pakken?",
    a: "Door goed te luisteren. In het gesprek let ik op hoe jij over je werk en je klanten praat, en ik kijk naar wat je al hebt geschreven. Daarna leggen we samen vast hoe je klinkt: je of u, zakelijk of persoonlijk, kort of uitgebreid. Klinkt een zin niet als jou, dan hoor ik dat in de feedback.",
  },
  {
    q: "Schrijf je voor Google of voor mensen?",
    a: "Voor mensen, op de vragen die ze aan Google stellen. Een tekst vol zoekwoorden leest niemand graag, en zoekmachines herkennen dat ook. Ik schrijf helder en volledig in de woorden van je klant, en regel de techniek eromheen: paginatitels, beschrijvingen en een logische opbouw.",
  },
  {
    q: "Kom ik met goede teksten bovenaan in Google?",
    a: "Dat belooft niemand eerlijk. Goede teksten zijn wel de basis: een pagina die precies antwoord geeft op de vraag van je klant, heeft een betere kans om gevonden en gekozen te worden. Hoe hoog je komt, hangt ook af van je concurrentie en van je site als geheel.",
  },
  {
    q: "Hoeveel feedbackrondes zijn er?",
    a: "Hoeveel rondes er in het traject zitten, spreken we vooraf af en staat in het voorstel. Zo weet je waar je aan toe bent, en blijft de tekst vooruitgaan in plaats van rond te draaien.",
  },
  {
    q: "Wat kosten teksten laten schrijven?",
    a: "Teksten maak ik als onderdeel van je website. Of je ze zelf aanlevert of dat we ze samen maken, is een van de dingen die de prijs bepalen. Na de kennismaking krijg je één vaste prijs voor het hele traject, teksten inbegrepen. Op de prijzenpagina zie je waar een website begint.",
  },
  {
    q: "Schrijf je ook teksten voor mijn bestaande website?",
    a: "Meestal schrijf ik teksten bij een nieuwe website of een redesign, omdat tekst en ontwerp dan samen kloppen. Wil je alleen je huidige teksten laten verbeteren? Vertel het in de kennismaking, dan kijken we samen wat zinvol is.",
  },
  {
    q: "Van wie zijn de teksten?",
    a: "Van jou. Na de oplevering mag je ze gebruiken waar je wilt: op je site, in een folder of in een mail aan klanten.",
  },
  faq[3],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Website teksten laten schrijven",
      serviceType: "Webteksten en content",
      description: metadata.description,
      provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      url: "https://nxtframe.ai/website-teksten",
    },
    {
      "@type": "FAQPage",
      mainEntity: questions.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <Nav theme="photo" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main">
        {/* Hero, the frame of the aanpak and over pages (720px on desktop, the nav floating over it):
            the promise on the left over a full-width photo, black from the left to carry the type.
            The photo is temporary: the mascot at work on a laptop on a sunny hill (/images/hero-hill-meadow),
            until the generated photo of an older person writing is in. On phones the photo follows the
            copy as its own block. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-12 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[56%]">
              <Eyebrow tone="light" className="max-w-xl">Teksten en content</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                <span className="sm:whitespace-nowrap">Teksten die je klant</span>
                <br />
                <span className="serif-italic text-lime">meteen snapt</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Begrijpelijk voor je klant en voor zoekmachines, en geschreven om bezoekers te laten bellen, mailen of boeken. Heb je al teksten, dan maak ik ze scherper.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#voorbeeld">Bekijk een voorbeeld</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {["In jouw toon", "Op de zoekvragen van je klant", "Pas online na jouw akkoord"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <FrameGlyph className="size-3 text-lime" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
          <picture className="block lg:absolute lg:inset-0 lg:-z-20">
            <source srcSet="/images/hero-hill-meadow.webp" type="image/webp" />
            <img
              src="/images/hero-hill-meadow.jpg"
              alt="De NXT Frame-mascotte zit met een laptop op een stoel boven op een zonnige heuvel vol bloemen"
              className="aspect-[4/3] w-full object-cover object-[70%_30%] lg:aspect-auto lg:size-full lg:object-[70%_32%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* what you get: centred heading, then four big cards in the brand colours (the cards of /diensten) */}
        <section data-zone="cherry" className="bg-cream py-12 text-forest md:py-32">
          <Container>
            <div className="text-center">
              <Eyebrow className="mx-auto w-fit">Wat je krijgt</Eyebrow>
              <h2 className="mx-auto mt-6 max-w-4xl t-section md:mt-8">
                Geschreven om <span className="serif-italic">gelezen te worden</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">
                Een mooi ontwerp trekt de aandacht, de tekst doet de verkoop. Daarom krijgt elke pagina tekst die een taak heeft.
              </p>
            </div>
            <ol className="mt-12 grid gap-6 md:mt-16 md:gap-8 lg:grid-cols-2">
              {gets.map((g, i) => {
                const t = tones[i % tones.length];
                return (
                  <li key={g.title}>
                    <article className={`flex h-full flex-col rounded-3xl p-8 md:p-12 ${t.card}`}>
                      <p className="flex items-center gap-3 text-[15px] font-medium">
                        <span className="grid h-10 w-14 place-items-center rounded-full border border-current font-display text-base font-semibold italic">
                          {i + 1}
                        </span>
                        <BranchIcon name={g.icon} className="size-5" />
                      </p>
                      <h3 className="mt-10 font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.04] tracking-[-0.03em] md:mt-16">{g.title}</h3>
                      <p className={`mt-4 max-w-md text-base leading-relaxed md:text-lg ${t.muted}`}>{g.body}</p>
                    </article>
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>

        {/* before and after: the table of the aanpak page on forest, what you often see in a blush
            column and how I would write it in a paper column, ticked off as it scrolls in */}
        <section id="voorbeeld" data-zone="green" className="scroll-mt-20 bg-forest py-12 text-paper md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow tone="light" className="max-w-xl">Voor en na</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Hetzelfde bedrijf, <span className="serif-italic text-lime">andere woorden</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                Een verzonnen installateur, vier plekken op een pagina. Een paar woorden anders, en een bezoeker weet meteen wat hij kan doen.
              </p>
            </div>
            {/* phones: one card per part, the weak version on top and the strong one in a paper block under it */}
            <ol className="mt-12 space-y-4 md:hidden">
              {examples.map((e) => (
                <li key={e.part} className="overflow-hidden rounded-3xl bg-[#fcbbb9] text-[#440220]">
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{e.part}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#440220]/85">
                      <span className="font-semibold">Vaak: </span>
                      <span className="line-through decoration-[#440220]/40">{e.before}</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-paper p-6 text-forest">
                    <Tick />
                    <p className="text-[15px] leading-snug">
                      <span className="block font-semibold">{e.after}</span>
                      <span className="mt-1 block text-forest/60">{e.why}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            {/* wider screens: the parts down the side, a blush column for the weak version, a paper one for the strong */}
            <Reveal threshold={0.25} className="cmp mt-12 md:mt-16 hidden md:block">
              <table className="w-full border-separate border-spacing-x-3 border-spacing-y-0 text-left">
                <thead>
                  <tr>
                    <th className="w-[20%] pb-4" />
                    <th className="w-[36%] rounded-t-3xl bg-[#fcbbb9] px-8 pb-4 pt-8 align-top font-display text-xl font-semibold tracking-tight text-[#440220]">Zo staat het er vaak</th>
                    <th className="rounded-t-3xl bg-paper px-8 pb-4 pt-8 align-top font-display text-xl font-semibold tracking-tight text-forest">Zo schrijf ik het</th>
                  </tr>
                </thead>
                <tbody>
                  {examples.map((e, i) => {
                    const last = i === examples.length - 1;
                    return (
                      <tr key={e.part}>
                        <th scope="row" className={`py-6 pr-4 align-top ${last ? "" : "border-b border-paper/15"}`}>
                          <span className="text-sm font-medium text-lime">0{i + 1}</span>
                          <span className="mt-1 block font-display text-xl font-semibold tracking-tight lg:text-2xl">{e.part}</span>
                        </th>
                        <td className={`bg-[#fcbbb9] px-8 py-6 align-top text-[15px] leading-relaxed text-[#440220]/85 ${last ? "rounded-b-3xl pb-8" : ""}`}>
                          <span className={`block ${last ? "" : "border-b border-[#440220]/15 pb-6"}`}>
                            <span className="line-through decoration-[#440220]/40">{e.before}</span>
                          </span>
                        </td>
                        <td className={`bg-paper px-8 py-6 align-top text-forest ${last ? "rounded-b-3xl pb-8" : ""}`}>
                          <div className={`flex items-start gap-3 ${last ? "" : "border-b border-forest/10 pb-6"}`}>
                            <Tick delay={i * 120} />
                            <p className="text-[15px] leading-snug">
                              <span className="block font-semibold">{e.after}</span>
                              <span className="mt-1 block text-forest/60">{e.why}</span>
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Reveal>
          </Container>
        </section>

        {/* how the texts come about: four steps on the zigzag path, light */}
        <div id="stappen" className="scroll-mt-20">
          <Platform
            eyebrow="Zo werkt het"
            title={<>Van gesprek <span className="serif-italic">tot tekst</span></>}
            intro="Je hoeft niets klaar te hebben. Het meeste haal ik uit een gesprek met jou; daarna lees je mee tot de tekst klopt."
            action={<TextLink light className="mt-8" href="/aanpak">Bekijk de hele aanpak</TextLink>}
            items={steps}
            tone="cream"
          />
        </div>

        {/* where you start from: centred heading and three cards that stack while you scroll. Paper,
            to part it from the cream above */}
        <section data-zone="cherry" className="bg-paper py-12 text-forest md:py-32">
          <Container className="text-center">
            <Eyebrow className="mx-auto w-fit">Waar je begint</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-4xl t-section md:mt-8">
              Elk startpunt <span className="serif-italic">is goed</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">
              Nog niets, teksten die niet werken of liever zelf schrijven: ik begin waar jij staat.
            </p>
          </Container>
          <Container className="mt-12 md:mt-16">
            <StackCards items={starts} />
          </Container>
        </section>

        {/* the proof */}
        <Work turnDark={false} />

        {/* the questions about texts, laid out like the homepage FAQ */}
        <section className="bg-cream pb-12 pt-8 text-forest md:pb-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Vragen over <span className="serif-italic">teksten</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                <TextLink href="/prijzen">Bekijk de prijzen</TextLink>
                <TextLink href="/contact">Stel je vraag</TextLink>
              </div>
            </div>
            <FaqList items={questions} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
