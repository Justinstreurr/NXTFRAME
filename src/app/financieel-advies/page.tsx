import type { ReactNode } from "react";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BranchFind, BranchLinks, BranchPains } from "@/components/BranchSections";
import { branchSections } from "@/components/branchSectionContent";
import SellerGrid, { type SiteFeature } from "@/components/SellerGrid";
import BranchPricing, { type PriceWay } from "@/components/BranchPricing";
import { FrameGlyph } from "@/components/Logo";
import { branches } from "@/components/menuData";
import { Difference, FaqList, Platform, type PathStep } from "@/components/Sections";
import { LaunchIcon, MapIcon, PenIcon, TalkIcon } from "@/components/StepIcons";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";

/* financieel advies has its own page, like /makelaars, built around a real client: Hypotheekhaven.
   The pains, the price and the questions come from menuData.ts, so the menu, the hub and this page
   tell the same story. */
const advies = branches.find((b) => b.slug === "financieel-advies")!;

export const metadata: Metadata = {
  title: "Website laten maken voor hypotheek- en financieel adviseurs | NXT Frame",
  description:
    "Een adviseurswebsite met een kennismaking die je online plant, rekentools waarmee bezoekers zelf rekenen en een pagina per dienst en levensmoment. Voorbeeld: Hypotheekhaven.",
  alternates: { canonical: "/financieel-advies" },
};

/* the three pains from menuData, with the key words in serif italic (the photos are no longer shown) */
const painArt: { label: string; title: ReactNode; src: string; pos?: string }[] = [
  { label: "Hetzelfde verhaal", title: <>Je site zegt wat je doet, <span className="serif-italic">niet waarom jij</span></>, src: "/images/andere-tijd.webp" },
  { label: "De eerste stap", title: <>De eerste stap is <span className="serif-italic">een telefoonnummer</span></>, src: "/images/pain-mobiel.webp", pos: "50% 40%" },
  { label: "Vergelijkers", title: <>Je concurreert met <span className="serif-italic">vergelijkingssites</span></>, src: "/images/herkenbaar-2.webp", pos: "50% 28%" },
];
const pains = advies.pains.map((p, i) => ({ ...p, ...painArt[i] }));

/* what is on an adviser's site: each part, what it does and what it brings the practice */
const features: SiteFeature[] = [
  {
    icon: "value", title: "Rekentools",
    body: "Wat kan ik lenen, wat worden mijn maandlasten, loopt mijn rente af? Een bezoeker rekent 's avonds zelf een indicatie uit en laat daarna zijn gegevens achter. Ik bouw ze en houd ze actueel.",
    result: "Leads uit de oriëntatie",
  },
  {
    icon: "cost", title: "Makkelijk kennismaken",
    body: "Een kennismaking plannen, bellen of appen, vanaf elke pagina. Geen formulier met tien velden.",
    result: "Meer eerste gesprekken",
  },
  {
    icon: "area", title: "Een pagina per levensmoment",
    body: "Eerste huis, verhuizen, scheiden, oversluiten, ondernemer: voor elke vraag een eigen pagina met een echt antwoord.",
    result: "Vindbaar op de vraag achter de zoekterm",
  },
  {
    icon: "sold", title: "Reviews in beeld",
    body: "Je Google- en Trustoo-reviews op je eigen site, op de plek waar iemand twijfelt of hij je zal bellen.",
    result: "Vertrouwen vóór het eerste gesprek",
  },
  {
    icon: "team", title: "Jij als adviseur",
    body: "Je gezicht, je verhaal en je manier van adviseren. Bij een hypotheek kiest iemand een persoon, geen logo.",
    result: "Een gezicht bij je advies",
  },
  {
    icon: "read", title: "Verplichte informatie op orde",
    body: "Dienstenwijzer, vergunning, kosten en klachtenregeling op een vaste, vindbare plek, zonder dat ze de rest van de site in de weg zitten.",
    result: "Makkelijk te vinden",
  },
];

const steps: PathStep[] = [
  { title: "Kennismaking", body: "Een halfuur over je praktijk, je klanten en hoe een eerste afspraak nu tot stand komt.", Icon: TalkIcon },
  { title: "Plan en teksten", body: "Ik leg vast welke pagina's er komen en schrijf de teksten. Jij leest ze en geeft feedback. Pas na jouw akkoord gaan ze de site in.", Icon: MapIcon },
  { title: "Ontwerp en bouw", body: "Je kijkt mee op een testadres, met je eigen teksten, foto's en reviews erin. Geen voorbeeldteksten.", Icon: PenIcon },
  { title: "Lancering", body: "Elke oude pagina verwijst door naar de nieuwe, zodat wat je in Google hebt opgebouwd meeverhuist.", Icon: LaunchIcon },
];

/* the three ways to start (BranchPricing). Only the complete site has a figure (from menuData); the
   other two are quoted. PLACEHOLDER: the options are a proposal, to confirm */
const ways: PriceWay[] = [
  {
    name: "Losse uitbreiding",
    body: "Je site is goed, maar levert weinig afspraken op. Dan bouw ik erbij wat ontbreekt.",
    time: "Planning in overleg",
    items: ["Een rekentool, bijvoorbeeld voor maandlasten", "Online een kennismaking plannen", "Pagina's per dienst of levensmoment", "Past in je huidige site"],
  },
  {
    name: "Complete adviseurssite", from: advies.price.from,
    body: "Een nieuwe site die vertrouwen wekt en de eerste afspraak makkelijk maakt.",
    time: `Live in ${advies.price.span}`,
    items: ["Teksten die ik voor je schrijf", "Online een kennismaking plannen", "Rekentools voor je bezoekers", "Een pagina per dienst en levensmoment", "Je reviews en jij als adviseur", "Een vaste plek voor je verplichte informatie"],
    highlight: true,
  },
  {
    name: "Meerdere adviseurs",
    body: "Eén site voor je hele kantoor, met per adviseur een eigen pagina en agenda.",
    time: "Planning in overleg",
    items: ["Alles van de complete site", "Een pagina per adviseur", "De afspraak bij de juiste adviseur", "Een Google-profiel per vestiging"],
  },
];

/* what every adviser's site comes with, in two columns under the cards */
const included = [
  "Ontwerp op maat, geen template",
  "Teksten geschreven, jij keurt goed",
  "Kennismaking plannen, bellen of appen",
  "Rekentools die ik actueel houd",
  "Snel op elke telefoon",
  "Pagina's per dienst en levensmoment",
  "Technisch klaar voor Google en ChatGPT",
  "Vaste plek voor dienstenwijzer en vergunning",
  "Teksten en foto's die je zelf bijwerkt",
  "Oude pagina's verwijzen door naar de nieuwe",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Website laten maken voor financieel adviseurs",
      serviceType: "Webdesign en webdevelopment voor hypotheek- en financieel adviseurs",
      provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      description: metadata.description,
      offers: { "@type": "Offer", priceCurrency: "EUR", price: advies.price.from.replace(".", ""), description: `Vanaf € ${advies.price.from}` },
    },
    {
      "@type": "FAQPage",
      mainEntity: advies.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Branches", item: "https://nxtframe.ai/branches" },
        { "@type": "ListItem", position: 2, name: "Financieel advies", item: "https://nxtframe.ai/financieel-advies" },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <Nav theme="photo" />
      <main id="main">
        {/* Hero, the frame of /makelaars (720px on desktop, the nav floating over it): the promise on
            the left over a full-width photo, black from the left to carry the type. The photo: a
            woman in a pink suit on a velvet sofa in the evening, champagne in hand, giving a thumbs-up
            to the Hypotheekhaven homepage on her laptop: the customer who has found her adviser (a
            generated photo with a screenshot of the live homepage mapped onto the screen, /images/advies-hero-avond; earlier versions: advies-hero-weide, advies-hero-laptop,
            advies-hero). On
            phones the photo follows the copy as its own block. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-12 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[52%]">
              <Eyebrow tone="light" className="max-w-xl">Website voor financieel adviseurs</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Een website die
                <br />
                <span className="serif-italic text-lime">je eigen klanten</span> binnenhaalt
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Voor hypotheekadviseurs en financieel planners. Zodat mensen die &rsquo;s avonds zelf al gerekend hebben, bij jou een kennismaking plannen. Zonder dat je leads hoeft te kopen.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="/werk/hypotheekhaven">Bekijk Hypotheekhaven</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {["Kennismaking als eerste stap", "Rekentools op je eigen site", "Een pagina per levensmoment"].map((t) => (
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
            <source srcSet="/images/advies-hero-avond.webp" type="image/webp" />
            <img
              src="/images/advies-hero-avond.jpg"
              alt="Een vrouw in een roze pak op een fluwelen bank steekt haar duim op bij de homepage van Hypotheekhaven op haar laptop"
              className="aspect-[4/3] w-full object-cover object-[88%_50%] lg:aspect-auto lg:size-full lg:object-[100%_45%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* recognition before any solution. Herkenbaar, kept plain (BranchPains): title and lead on the
            left, the adviser's own three pains stacked on the right */}
        <BranchPains
          title={
            <>
              Waar het nu <span className="serif-italic">misgaat</span>
            </>
          }
          lead="Iemand met een hypotheekvraag oriënteert zich 's avonds op de bank. De meeste adviseurssites helpen hem dan niet verder. Drie dingen die je waarschijnlijk herkent."
          pains={pains}
        />

        {/* what you get: the six parts of an adviser's site, each with what it brings the practice, as
            the quiet grid of /makelaars on sand (SellerGrid) */}
        <section id="wat-je-krijgt" data-zone="green" className="scroll-mt-20 bg-sand py-12 text-forest md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Wat je krijgt</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Gebouwd voor <span className="serif-italic">de eerste afspraak</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-forest/75 md:text-xl">
                De onderdelen die voor een adviseur het verschil maken, op maat gebouwd voor je praktijk. Bij elk onderdeel staat wat het je praktijk oplevert.
              </p>
            </div>

            <div className="mt-12 md:mt-16">
              <SellerGrid items={features} />
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              <p className="text-[15px] text-forest/65">Wat je praktijk verder nodig heeft, bouw ik erbij.</p>
              <TextLink href="/contact">Bespreek wat jouw praktijk nodig heeft</TextLink>
            </div>
          </Container>
        </section>

        {/* what the site works with (BranchLinks): calculators, the diary and the reviews coming in,
            the requests going back, and three plain facts */}
        <BranchLinks content={branchSections["financieel-advies"].links} />

        {/* found on the question behind the search (BranchFind): the three places someone with a
            mortgage question looks, then the searches the pages are built on. No promise of a position. */}
        <BranchFind content={branchSections["financieel-advies"].find} />

        {/* how it goes: the path of "Zo werkt het", four steps on a straight line */}
        <Platform
          eyebrow="Zo werkt het"
          title={
            <>
              Van kennismaking <span className="serif-italic">naar je nieuwe site</span>
            </>
          }
          intro="Vier stappen, één aanspreekpunt. Je weet altijd waar het traject staat en wat de volgende stap is."
          action={<TextLink light className="mt-8" href="/aanpak">Bekijk de aanpak</TextLink>}
          items={steps}
          straight
          tone="cream"
        />

        {/* what it costs: three ways to start and what every site comes with (BranchPricing).
            PLACEHOLDER figures: they live in menuData.ts */}
        <BranchPricing
          title={<>Wat het kost, <span className="serif-italic">vooraf vast</span></>}
          intro="Voor de meeste adviseurs is een complete site de logische start. Na de kennismaking krijg je één vaste prijs voor het hele traject."
          ways={ways}
          includedTitle="Bij elke adviseurssite inbegrepen"
          included={included}
          smallPrint="Prijzen exclusief btw. Hosting, onderhoud en het actueel houden van je rekentools lopen na de lancering via een abonnement. De inhoud van je verplichte informatie toets je zelf of met je compliance-adviseur."
        />

        {/* the questions an adviser asks, also FAQPage structured data (see jsonLd) */}
        <section className="bg-cream pb-12 pt-4 text-forest md:pb-32 md:pt-8">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Vragen van <span className="serif-italic">adviseurs</span>
              </h2>
              <p className="mt-6 max-w-md text-forest/75 t-lead">Staat je vraag er niet bij? Stel hem in de kennismaking, of mail me.</p>
              <TextLink href="mailto:hallo@nxtframe.ai" className="mt-8">hallo@nxtframe.ai</TextLink>
            </div>
            <FaqList items={advies.faq} />
          </Container>
        </section>

        {/* the other branches: the carousel of "Voor wie" on the homepage, without the advisers */}
        <Difference
          title={
            <>
              Ook voor <span className="serif-italic">andere branches</span>
            </>
          }
          lead="Werk je samen met een makelaar, een aannemer of een coach? Voor hun vak staat hier ook een pagina."
          exclude="Adviseurs"
        />
      </main>
      {/* the footer closes with the main action: "Plan een kennismaking" */}
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
