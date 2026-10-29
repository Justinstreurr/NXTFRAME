import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaqList, Platform, Work } from "@/components/Sections";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { FrameCorners, FrameGlyph } from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { tiers } from "@/components/pricing";
import { faq } from "@/components/faq";

/**
 * Aanpak: the page for the visitor who wants to know what a project actually looks like before
 * getting in touch. Order: the promise (hero), the five steps on the zigzag path, per step what you
 * do and what you get, how long it takes per kind of site, the proof, and the questions about the
 * process. The footer carries the closing call to action.
 *
 * DRAFT COPY: the per-step details are a first version for Justin to check against how he works.
 */
export const metadata: Metadata = {
  title: "Aanpak | Zo verloopt een website laten maken | NXT Frame",
  description:
    "Van kennismaking tot lancering in vijf stappen, met één aanspreekpunt. Per stap weet je wat je van mij krijgt, wat ik van jou nodig heb en hoe lang het duurt.",
  alternates: { canonical: "/aanpak" },
};

/* per step: what the visitor does, and the list of what they get back (ticked off in the table) */
const details = [
  {
    title: "Kennismaking",
    you: "Een half uur vertellen over je bedrijf, je klanten en wat de site moet opleveren.",
    get: ["Eerlijk advies over wat zin heeft", "Eén vaste prijs voor het hele traject"],
  },
  {
    title: "Strategie en structuur",
    you: "Vragen beantwoorden over je klant en je aanbod, en delen wat je al hebt.",
    get: ["Alle pagina's op een rij", "Per pagina een doel", "De zoekvragen waarop je gevonden wilt worden"],
  },
  {
    title: "Ontwerp",
    you: "Meekijken en feedback geven, in overzichtelijke rondes.",
    get: ["Ontwerp op maat, op desktop en telefoon", "Een versie die je kunt doorklikken"],
  },
  {
    title: "Bouw",
    you: "De laatste teksten en beelden aanleveren of goedkeuren.",
    get: ["Een werkende testversie online", "Getest op telefoon, tablet en desktop"],
  },
  {
    title: "Lancering en doorgroei",
    you: "Een laatste akkoord. Daarna kies je of je wilt doorgroeien.",
    get: ["De site live, aangemeld bij Google en Bing", "Gemeten op snelheid", "Uitleg om zelf teksten en foto's aan te passen"],
  },
];

/* the tick in the "Wat je krijgt" column: the check of the comparison table, lime on forest, on the paper column */
function Tick({ delay = 0 }: { delay?: number }) {
  return (
    <span style={{ "--d": `${delay}ms` } as React.CSSProperties} className="score grid size-6 shrink-0 place-items-center rounded-full bg-forest text-lime">
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true"><path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

/* the process questions: how long, what you need, what happens after, plus two of its own */
const questions = [
  faq[1],
  faq[5],
  {
    q: "Hoeveel feedbackrondes zijn er?",
    a: "Hoeveel rondes er in het traject zitten, spreken we vooraf af en staat in het voorstel. Zo weet je waar je aan toe bent, en blijft het ontwerp vooruitgaan in plaats van rond te draaien.",
  },
  {
    q: "Wat als ik halverwege iets anders wil?",
    a: "Dat kan. Kleine aanpassingen nemen we mee. Wil je iets toevoegen dat niet in het voorstel stond, dan hoor je eerst wat het kost en beslis jij of het erbij komt. Je krijgt nooit een factuur voor werk waar je geen ja op hebt gezegd.",
  },
  faq[6],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "Zo verloopt een website laten maken bij NXT Frame",
      description: metadata.description,
      step: details.map((d, i) => ({ "@type": "HowToStep", position: i + 1, name: d.title, text: `${d.you} Je krijgt: ${d.get.join(", ").toLowerCase()}.`})),
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
        {/* Hero, the frame of the werk and over pages (720px on desktop, the nav floating over it):
            the promise on the left over a full-width photo, black from the left to carry the type.
            The photo: an older man at the wheel of a pale lime vintage convertible on a sunlit desert
            driveway, ready to go (a generated photo, /images/aanpak-hero-cabrio). The bakery version
            with a site on her phone stays in /images/aanpak-hero as an alternative. On phones the photo follows the
            copy as its own block. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-16 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[56%]">
              <Eyebrow tone="light" className="max-w-xl">Aanpak</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                <span className="sm:whitespace-nowrap">Van kennismaking</span>
                <br />
                <span className="serif-italic text-lime">tot lancering</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Vijf stappen, één aanspreekpunt. Je weet altijd waar het traject staat, wat ik van je nodig heb en wat de volgende stap is.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#stappen">Bekijk de stappen</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {["Vaste prijs vooraf", "Eén aanspreekpunt", "Live in 3 tot 14 weken"].map((t) => (
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
            <source srcSet="/images/aanpak-hero-cabrio.webp" type="image/webp" />
            <img
              src="/images/aanpak-hero-cabrio.jpg"
              alt="Een oudere man zit ontspannen achter het stuur van een lichtgroene vintage cabriolet op een zonnige oprit tussen de palmbomen"
              className="aspect-[4/3] w-full object-cover object-[75%_50%] lg:aspect-auto lg:size-full lg:object-[70%_45%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* the five steps on the zigzag path, the homepage section with this page's heading. Cream, so
            it gets the full top padding instead of hanging on to the dark hero */}
        <div id="stappen" className="scroll-mt-20">
          <Platform
            eyebrow="Zo werkt het"
            title={<>Vijf stappen, <span className="serif-italic">één aanspreekpunt</span></>}
            intro="Geen accountmanager ertussen: de persoon die je spreekt, is de persoon die ontwerpt en bouwt. Zo gaat er niets verloren in een overdracht."
            action={null}
            tone="cream"
          />
        </div>

        {/* per step: what you do, what you get, on the forest ground: a blush column for what you do and a paper one for what you get */}
        <section data-zone="green" className="bg-forest py-16 text-paper md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow tone="light" className="max-w-xl">Per stap</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Wat ik van je nodig heb, <span className="serif-italic text-lime">en wat je krijgt</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                Je hoeft niets klaar te hebben om te beginnen. Per stap weet je wat er van je verwacht wordt, en wat er aan het eind op tafel ligt.
              </p>
            </div>
            {/* phones: one card per step, what you do on top and the ticks in a paper block under it */}
            <ol className="mt-12 space-y-4 md:hidden">
              {details.map((d, i) => (
                <li key={d.title} className="overflow-hidden rounded-3xl bg-[#fcbbb9] text-[#440220]">
                  <div className="p-6">
                    <span className="text-sm font-medium text-[#440220]/55">0{i + 1}</span>
                    <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">{d.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#440220]/85">
                      <span className="font-semibold">Jij: </span>
                      {d.you}
                    </p>
                  </div>
                  <ul className="space-y-3 bg-paper p-6 text-forest">
                    {d.get.map((g) => (
                      <li key={g} className="flex items-start gap-3 text-[15px]">
                        <Tick />
                        {g}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            {/* wider screens: the table of the comparison section. The steps down the side, a paper
                column for what you do, a paper column for what you get, ticked off as it scrolls in */}
            <Reveal threshold={0.25} className="cmp mt-16 hidden md:block">
              <table className="w-full border-separate border-spacing-x-3 border-spacing-y-0 text-left">
                <thead>
                  <tr>
                    <th className="w-[26%] pb-4" />
                    <th className="w-[34%] rounded-t-3xl bg-[#fcbbb9] px-8 pb-4 pt-8 align-top font-display text-xl font-semibold tracking-tight text-[#440220]">Wat jij doet</th>
                    <th className="rounded-t-3xl bg-paper px-8 pb-4 pt-8 align-top font-display text-xl font-semibold tracking-tight text-forest">Wat je krijgt</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((d, i) => {
                    const last = i === details.length - 1;
                    return (
                      <tr key={d.title}>
                        <th scope="row" className={`py-6 pr-4 align-top ${last ? "" : "border-b border-paper/15"}`}>
                          <span className="text-sm font-medium text-lime">0{i + 1}</span>
                          <span className="mt-1 block font-display text-xl font-semibold tracking-tight lg:text-2xl">{d.title}</span>
                        </th>
                        <td className={`bg-[#fcbbb9] px-8 py-6 align-top text-[15px] leading-relaxed text-[#440220]/85 ${last ? "rounded-b-3xl pb-8" : ""}`}>
                          <span className={`block ${last ? "" : "border-b border-[#440220]/15 pb-6"}`}>{d.you}</span>
                        </td>
                        <td className={`bg-paper px-8 py-6 align-top text-forest ${last ? "rounded-b-3xl pb-8" : ""}`}>
                          <ul className={`space-y-3 ${last ? "" : "border-b border-forest/10 pb-6"}`}>
                            {d.get.map((g, j) => (
                              <li key={g} className="flex items-start gap-3 text-[15px] leading-snug">
                                <Tick delay={(i * 3 + j) * 90} />
                                {g}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Reveal>

            {/* how long it takes, per kind of site: the numbers framed like the proof on the hub */}
            <div className="mt-20 border-t border-paper/15 pt-16 md:mt-24 md:pt-20">
              <h3 className="text-center t-sub">
                Hoe lang <span className="serif-italic">het duurt</span>
              </h3>
              {/* centred: the numbers large in Instrument Serif, "tot" and "weken" small in between */}
              <dl className="mt-12 grid gap-10 text-center sm:grid-cols-3">
                {tiers.map((t) => {
                  const [from, to] = t.time.replace(" weken", "").split(" tot ");
                  return (
                    <div key={t.name}>
                      <dt className="relative inline-block px-6 py-4 font-serif text-7xl leading-none tracking-[-0.02em] text-paper md:text-8xl">
                        <FrameCorners className="text-lime" corners="diagonal" inset="inset-0" size="size-5" />
                        {from}
                        <span className="mx-2 align-middle text-2xl italic tracking-normal text-paper/60 md:text-3xl">tot</span>
                        {to}
                        <span className="ml-2 text-2xl tracking-normal text-paper/60 md:text-3xl">weken</span>
                      </dt>
                      <dd className="mt-3 text-base text-paper/60">{t.name}</dd>
                    </div>
                  );
                })}
              </dl>
              <p className="mx-auto mt-12 max-w-2xl text-center text-[15px] leading-relaxed text-paper/70">
                De doorlooptijd hangt vooral af van hoe snel teksten en feedback binnenkomen. Bij de start spreken we een planning af met een beoogde lanceerdatum.
              </p>
            </div>
          </Container>
        </section>

        {/* the proof: sites that went through these steps */}
        <Work turnDark={false} />

        {/* the questions about the process, laid out like the homepage FAQ */}
        <section className="bg-cream pb-16 pt-8 text-forest md:pb-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Vragen over <span className="serif-italic">het traject</span>
              </h2>
            </div>
            <FaqList items={questions} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
