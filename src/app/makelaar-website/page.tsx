import type { ReactNode } from "react";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SellerGrid, { type SiteFeature } from "@/components/SellerGrid";
import { BranchFind, BranchLinks, BranchPains } from "@/components/BranchSections";
import { branchSections } from "@/components/branchSectionContent";
import { FrameGlyph } from "@/components/Logo";
import { branches, faqFor } from "@/components/menuData";
import { Difference, FaqList, Platform, type PathStep } from "@/components/Sections";
import { LaunchIcon, MapIcon, PenIcon, TalkIcon } from "@/components/StepIcons";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";
import BranchPricing, { type PriceWay } from "@/components/BranchPricing";

/* makelaars is the one branch with its own page instead of the shared template (BranchPage). The
   pains, the price and the questions still come from menuData.ts, so the menu, the hub and this page
   tell the same story. */
const makelaars = branches.find((b) => b.slug === "makelaars")!;

export const metadata: Metadata = {
  title: "Makelaar website laten maken | Woningaanbod uit je CRM | NXT Frame",
  description:
    "Een makelaarswebsite met je woningaanbod uit je eigen pakket (zoals Realworks, Kolibri of Skarabee), een waardebepaling zonder drempel en een pagina per plaats waar je werkt.",
  alternates: { canonical: "/makelaar-website" },
};

/* the three pains from menuData, with the key words in serif italic (the photos are no longer shown) */
const painArt: { label: string; title: ReactNode; src: string; pos?: string }[] = [
  { label: "Doorgeefluik", title: <>Je site is een <span className="serif-italic">doorgeefluik naar Funda</span></>, src: "/images/pain-mobiel.webp", pos: "50% 40%" },
  { label: "De verkoper", title: <>De verkoper zoekt <span className="serif-italic">iets anders</span></>, src: "/images/segment-makelaars.jpg", pos: "50% 45%" },
  { label: "Waardebepaling", title: <>Elke waardebepaling <span className="serif-italic">begint met bellen</span></>, src: "/images/slim-search.webp", pos: "78% 50%" },
];
const pains = makelaars.pains.map((p, i) => ({ ...p, ...painArt[i] }));

/* what is on a makelaar's site: each part, what it does and what it brings the office. The
   listings from the package are left out here: Koppelingen right below is about them. */
const features: SiteFeature[] = [
  {
    icon: "value", title: "Online waardebepaling",
    body: "Een verkoper vult zijn adres en een paar gegevens in, zonder eerst te hoeven bellen. De aanvraag komt direct in je mail of in je CRM.",
    result: "Meer verkoopgesprekken",
  },
  {
    icon: "area", title: "Een pagina per plaats",
    body: "Voor elke plaats in je werkgebied een eigen pagina, met je verkochte woningen en wat je van die buurt weet.",
    result: "Beter vindbaar op ‘makelaar + plaats’",
  },
  {
    icon: "sold", title: "Verkocht en reviews",
    body: "Je verkochte woningen en je Google-reviews op je eigen site, in plaats van alleen op Funda.",
    result: "Vertrouwen vóór het eerste contact",
  },
  {
    icon: "team", title: "Je team met gezicht",
    body: "Elk teamlid met foto, specialisme en een rechtstreeks nummer. Een verkoper kiest een persoon.",
    result: "Een gezicht bij je kantoor",
  },
  {
    icon: "speed", title: "Snel op elke telefoon",
    body: "Gebouwd om snel te laden, ook met tientallen woningfoto's. De meeste verkopers kijken eerst op hun mobiel.",
    result: "Minder bezoekers die afhaken",
  },
  {
    icon: "edit", title: "Zelf bij te werken",
    body: "Teksten, nieuws en foto's pas je zelf aan. Het aanbod loopt vanzelf mee uit je pakket.",
    result: "Geen bureau nodig voor kleine dingen",
  },
];



const steps: PathStep[] = [
  { title: "Kennismaking", body: "Een halfuur over je kantoor, je werkgebied en het pakket waar je aanbod in staat.", Icon: TalkIcon },
  { title: "Plan en koppeling", body: "Ik leg vast welke pagina's er komen, schrijf de teksten en test de koppeling met je aanbod. Jij leest de teksten en geeft feedback.", Icon: MapIcon },
  { title: "Ontwerp en bouw", body: "Je kijkt mee op een testadres, met je eigen woningen erin. Geen voorbeeldteksten, geen stockfoto's.", Icon: PenIcon },
  { title: "Lancering", body: "Elke oude pagina verwijst door naar de nieuwe, zodat wat je in Google hebt opgebouwd meeverhuist.", Icon: LaunchIcon },
];

/* the three ways to start (BranchPricing). Only the complete site has a figure (from menuData); the
   other two are quoted. PLACEHOLDER: the options are a proposal, to confirm */
const ways: PriceWay[] = [
  {
    name: "Losse uitbreiding",
    body: "Je site is goed, maar er komen geen verkopers binnen. Dan bouw ik erbij wat ontbreekt.",
    time: "Planning in overleg",
    items: ["Een online waardebepaling", "Pagina's per plaats en per dienst", "De koppeling met je pakket", "Past in je huidige site"],
  },
  {
    name: "Complete makelaarssite", from: makelaars.price.from,
    body: "Een nieuwe site, gebouwd voor verkopers, met je aanbod uit je eigen pakket.",
    time: `Live in ${makelaars.price.span}`,
    items: ["Woningaanbod uit je eigen pakket", "Online waardebepaling", "Een pagina voor elke plaats", "Je team en je verkochte woningen", "Oude pagina's verhuizen mee"],
    highlight: true,
  },
  {
    name: "Meerdere vestigingen",
    body: "Eén site en één aanbod, met per vestiging een eigen pagina en Google-profiel.",
    time: "Planning in overleg",
    items: ["Alles van de complete site", "Een pagina per vestiging", "Eigen team per vestiging", "Een kloppend Google-profiel per vestiging"],
  },
];
/* what every makelaar's site comes with, in two columns under the cards */
const included = [
  "Woningaanbod uit je eigen pakket",
  "Ontwerp op maat, geen template",
  "Waardebepaling en bezichtiging aanvragen",
  "Snel op elke telefoon",
  "Pagina's per plaats en per dienst",
  "Technisch klaar voor Google en ChatGPT",
  "Teksten en foto's die je zelf bijwerkt",
  "Oude pagina's verwijzen door naar de nieuwe",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Website laten maken voor makelaars",
      serviceType: "Webdesign en webdevelopment voor makelaars",
      provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      description: metadata.description,
      offers: { "@type": "Offer", priceCurrency: "EUR", price: makelaars.price.from.replace(".", ""), description: `Vanaf € ${makelaars.price.from}` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqFor(makelaars).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Branches", item: "https://nxtframe.ai/branches" },
        { "@type": "ListItem", position: 2, name: "Makelaars", item: "https://nxtframe.ai/makelaar-website" },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <Nav theme="photo" />
      <main id="main">
        {/* Hero, the same frame as the other pages (720px on desktop, the nav floating over it): the
            promise on the left over a full-width photo (the mascot walking past an estate agent's
            window in evening sun, the agent in the doorway; a generated image, /images/makelaars-hero).
            The left of the photo is a dark doorway, with a forest tint on top to carry the type. On phones too the copy sits on the photo, under a shade. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-12 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[52%]">
              <Eyebrow tone="light" className="max-w-xl">Website voor makelaars</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Een website voor
                <br />
                <span className="serif-italic text-lime">makelaars</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Gebouwd om verkopers aan te trekken: je aanbod uit je eigen pakket, een waardebepaling zonder drempel en een pagina per plaats.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#koppelingen">Zo werkt de koppeling</TextLink>
                </div>
                <ul className="mt-6 flex flex-col gap-2 font-display text-[15px] text-paper/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                  {["Aanbod uit je eigen CRM", "Waardebepaling als eerste stap", "Een pagina per plaats"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <FrameGlyph className="size-3 text-lime" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
          {/* phones: the copy sits on the photo, so a shade from the top (copy) to the foot (buttons) keeps it readable */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.72)_0%,rgb(0_0_0/0.5)_45%,rgb(0_0_0/0.68)_100%)] lg:hidden" aria-hidden="true" />
          <picture className="absolute inset-0 -z-20">
            <source srcSet="/images/makelaars-hero.webp" type="image/webp" />
            <img
              src="/images/makelaars-hero.jpg"
              alt="De NXT Frame-mascotte loopt met een laptop onder de arm langs de etalage van een makelaar, waar de makelaar in de deuropening staat"
              className="size-full object-cover object-[80%_50%] lg:object-[70%_50%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* what it costs today: recognition before any solution. Herkenbaar, kept plain (BranchPains):
            title and lead on the left, the makelaar's own three pains stacked on the right */}
        <BranchPains
          title={
            <>
              Waar het nu <span className="serif-italic">misgaat</span>
            </>
          }
          lead="Je omzet zit bij de verkoper, maar de meeste makelaarssites zijn gebouwd voor de koper. Drie dingen die je waarschijnlijk herkent."
          pains={pains}
        />

        {/* what you get: the six parts of a makelaar's site, each with what it brings the office, as a
            quiet grid between hairlines on sand, a shade darker than Herkenbaar above; on hover dots burst out from the middle of a cell (SellerGrid) */}
        <section id="wat-je-krijgt" data-zone="green" className="scroll-mt-20 bg-sand py-12 text-forest md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Wat je krijgt</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Gebouwd om <span className="serif-italic">verkopers binnen te halen</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-forest/75 md:text-xl">
                De onderdelen die voor een makelaar het verschil maken, op maat gebouwd voor je kantoor. Bij elk onderdeel staat wat het je kantoor oplevert.
              </p>
            </div>

            <div className="mt-12 md:mt-16">
              <SellerGrid items={features} />
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              <p className="text-[15px] text-forest/65">Wat je kantoor verder nodig heeft, bouw ik erbij.</p>
              <TextLink href="/contact">Bespreek wat jouw kantoor nodig heeft</TextLink>
            </div>
          </Container>
        </section>

        {/* the link with the makelaar's own software (BranchLinks): the listings coming in from the
            package, the requests going back, and three plain facts */}
        <BranchLinks content={branchSections.makelaars.links} />

        {/* found locally (BranchFind): the three places a seller looks for a makelaar, then the
            searches the pages are built on, floating around the photo. No promise of a position. */}
        <BranchFind content={branchSections.makelaars.find} />

        {/* how it goes: the path of "Zo werkt het", four steps on a straight line */}
        <Platform
          eyebrow="Zo werkt het"
          title={
            <>
              Van kennismaking <span className="serif-italic">naar je nieuwe site</span>
            </>
          }
          intro="Vier stappen, één aanspreekpunt. De koppeling met je aanbod test ik als eerste, want daar zit de meeste onzekerheid."
          action={<TextLink light className="mt-8" href="/aanpak">Bekijk de aanpak</TextLink>}
          items={steps}
          straight
          tone="cream"
        />

        {/* what it costs: three ways to start and what every site comes with (BranchPricing).
            PLACEHOLDER figures: they live in menuData.ts */}
        <BranchPricing
          title={<>Wat het kost, <span className="serif-italic">vooraf vast</span></>}
          intro="Voor de meeste kantoren is een complete site de logische start. Na de kennismaking krijg je één vaste prijs voor het hele traject."
          ways={ways}
          includedTitle="Bij elke makelaarssite inbegrepen"
          included={included}
          smallPrint="Prijzen exclusief btw. Niet inbegrepen: wat je softwareleverancier rekent voor de toegang tot je aanbod, en hosting en onderhoud na de lancering."
        />

        {/* the questions a makelaar asks, also FAQPage structured data (see jsonLd) */}
        <section className="bg-cream pb-12 pt-4 text-forest md:pb-32 md:pt-8">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Vragen van <span className="serif-italic">makelaars</span>
              </h2>
              <p className="mt-6 max-w-md text-forest/75 t-lead">Staat je vraag er niet bij? Stel hem in de kennismaking, of mail me.</p>
              <TextLink href="mailto:hallo@nxtframe.ai" className="mt-8">hallo@nxtframe.ai</TextLink>
            </div>
            <FaqList items={faqFor(makelaars)} />
          </Container>
        </section>

{/* the other branches: the carousel of "Voor wie" on the homepage, without makelaars */}
        <Difference
          title={
            <>
              Ook voor <span className="serif-italic">andere branches</span>
            </>
          }
          lead="Werk je samen met een hypotheekadviseur, een aannemer of een stylist? Voor hun vak staat hier ook een pagina."
          exclude="Makelaars"
        />
      </main>
      {/* the footer closes with the main action: "Plan een kennismaking" */}
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
