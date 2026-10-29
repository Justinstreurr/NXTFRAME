import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaqList, Platform, type PathStep } from "@/components/Sections";
import StackCards, { type StackCard } from "@/components/StackCards";
import { ArrowIcon, Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { FrameGlyph } from "@/components/Logo";
import { CodeIcon, LaunchIcon, MapIcon, PenIcon, TalkIcon } from "@/components/StepIcons";
import { tiers } from "@/components/pricing";
import { faq } from "@/components/faq";

/**
 * Landingspagina laten maken: the service page for the search "landingspagina laten maken", built in
 * the template of /webshop-laten-maken. Order follows what someone running a campaign wants to know:
 * why the clicks they pay for come to nothing (stacking cards), what a landing page from me includes
 * (three big cards in the brand colours), an example (the Hypotheekhaven rekentools, each a page with
 * one goal), what it costs and what comes on top, how it runs (the zigzag steps), and the questions.
 * Price and lead time come from the Landingspagina tier in pricing.ts.
 *
 * DRAFT COPY: everything on this page is a first version for Justin to check.
 */
export const metadata: Metadata = {
  title: "Landingspagina laten maken | Eén pagina, één doel | NXT Frame",
  description:
    "Een landingspagina laten maken die aanvragen oplevert: één doel, een heldere boodschap en een formulier of afsprakenplanner. Voor je campagne, dienst of branche. Tekst, ontwerp en bouw door één maker.",
  alternates: { canonical: "/landingspagina-laten-maken" },
};

const page = tiers.find((t) => t.name === "Landingspagina")!;

/* the round check of the /aanpak table and the /diensten cards; colours per ground */
function Tick({ className = "bg-forest text-lime" }: { className?: string }) {
  return (
    <span className={`grid size-6 shrink-0 place-items-center rounded-full ${className}`}>
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true"><path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

/* where the clicks of a campaign get lost, as stacking cards */
const leaks: StackCard[] = [
  {
    label: "Bestemming", img: "/images/pain-mobiel.webp", pos: "50% 40%",
    title: <>Je advertentie stuurt naar <span className="serif-italic">je homepage</span></>,
    body: "De bezoeker klikt op één aanbod en komt uit op een pagina over alles. Hij moet zelf gaan zoeken, en dat doet bijna niemand. Je betaalt voor de klik, niet voor het resultaat.",
    cta: "Zo werkt één doel", href: "#wat-je-krijgt",
  },
  {
    label: "Boodschap", img: "/images/herkenbaar-2.webp", pos: "50% 28%",
    title: <>Niemand snapt <span className="serif-italic">in vijf seconden</span> wat je biedt</>,
    body: "Lange teksten, vage koppen en drie knoppen die elk iets anders willen. Wie niet meteen ziet wat hij krijgt en wat hij moet doen, is weg.",
    cta: "Bekijk wat erin zit", href: "#wat-je-krijgt",
  },
  {
    label: "Snelheid", img: "/images/traag-mobiel.webp", pos: "58% 50%",
    title: <>De pagina laadt <span className="serif-italic">traag op een telefoon</span></>,
    body: "Het meeste advertentieverkeer komt van een telefoon. Elke seconde wachten kost bezoekers, en dus geld dat je al hebt uitgegeven.",
    cta: "Zo bouw ik snelle pagina's", href: "#wat-je-krijgt",
  },
  {
    label: "Meten", img: "/images/slim-desk.webp", pos: "50% 18%",
    title: <>Je weet niet <span className="serif-italic">wat het oplevert</span></>,
    body: "Hoeveel aanvragen kwamen er uit die campagne? Zonder goede meting weet je niet of je moet doorgaan, bijsturen of stoppen.",
    cta: "Bekijk de meting", href: "#wat-je-krijgt",
  },
];

/* what a landing page from me includes: three big cards, each with its ticks */
const parts = [
  {
    label: "Boodschap",
    title: <>Eén doel, <span className="serif-italic">één verhaal</span></>,
    body: "De pagina vertelt één ding, voor één soort bezoeker, en leidt naar één actie. Alles wat afleidt, gaat eruit.",
    items: ["Kop die zegt wat je krijgt", "Tekst geschreven op je doelgroep", "Bewijs: reviews, cijfers of logo's", "Eén duidelijke knop, steeds in beeld"],
    tone: { card: "bg-lime text-forest", muted: "text-forest/75", tick: "bg-forest text-lime" },
  },
  {
    label: "Aanvragen",
    title: <>Van bezoeker <span className="serif-italic">naar aanvraag</span></>,
    body: "Aanvragen of afspraak maken moet net zo makkelijk zijn als de advertentie aanklikken. Kort, duidelijk en op een telefoon in een paar tikken.",
    items: ["Formulier met alleen de nodige vragen", "Of direct een afspraak in je agenda", "Bevestiging per mail, voor jou en de klant", "Aanvragen in je inbox of CRM"],
    tone: { card: "bg-[#fcbbb9] text-[#440220]", muted: "text-[#440220]/80", tick: "bg-[#440220] text-[#fcbbb9]" },
  },
  {
    label: "Meten",
    title: <>Snel, vindbaar <span className="serif-italic">en meetbaar</span></>,
    body: "Een pagina die snel laadt, ook gevonden wordt zonder advertentie, en laat zien wat je campagne oplevert.",
    items: ["Snel op elke telefoon", "Gericht op één zoekvraag in Google", "Meting van aanvragen en bronnen", "Klaar voor Google Ads en Meta"],
    tone: { card: "bg-paper text-forest", muted: "text-forest/75", tick: "bg-forest text-lime" },
  },
];

/* what the fixed price includes, and what a landing page costs on top of it */
const included = [...page.items, "Teksten geschreven, jij keurt goed", "Snel op elke telefoon", "Meting van aanvragen", "Zelf aan te passen"];
const extra = [
  { title: "Je advertentiebudget", body: "Wat je uitgeeft aan Google, Meta of LinkedIn betaal je rechtstreeks aan het platform. Ik verdien niets aan je klikken." },
  { title: "Hosting", body: "Een klein bedrag per maand, of op je bestaande site als die het aankan." },
  { title: "Varianten en onderhoud", body: "Een extra versie voor een andere doelgroep, of aanpassingen na de start, als je dat wilt." },
];

/* the steps of a landing page project on the zigzag path */
const steps: PathStep[] = [
  { title: "Kennismaking", body: "Een half uur over je aanbod, je doelgroep en waar het verkeer vandaan komt. Daarna krijg je één vaste prijs.", Icon: TalkIcon },
  { title: "Doel en boodschap", body: "Wat de bezoeker moet doen, wat hem overtuigt en welke twijfels de pagina moet wegnemen. Daar schrijf ik de tekst op.", Icon: MapIcon },
  { title: "Ontwerp", body: "Eerst op een telefoon ontworpen, daarna op desktop. Jij kijkt mee in overzichtelijke rondes.", Icon: PenIcon },
  { title: "Bouw en meting", body: "De pagina gebouwd, het formulier of de agenda gekoppeld en de meting ingericht, zodat je vanaf dag één ziet wat er binnenkomt.", Icon: CodeIcon },
  { title: "Lancering", body: "Live, gekoppeld aan je campagne. Daarna kijken we samen naar de cijfers en sturen bij waar dat loont.", Icon: LaunchIcon },
];

/* landing page questions, plus two from the shared FAQ (vindbaar in ChatGPT, na de lancering) */
const questions = [
  {
    q: "Wat kost een landingspagina laten maken?",
    a: `Een landingspagina begint bij mij vanaf € ${page.from} exclusief btw. Daarin zitten de tekst, het ontwerp, de bouw, het formulier of de afsprakenplanner en de meting. Je advertentiebudget betaal je los aan het platform. Na de kennismaking krijg je één vaste prijs.`,
  },
  {
    q: "Hoe lang duurt het om een landingspagina te laten maken?",
    a: `Een landingspagina staat in ${page.time} live, gerekend vanaf het moment dat je informatie, beeld en toegang binnen zijn. Heb je een campagne met een vaste startdatum, zeg het dan in de kennismaking, dan plannen we daarop.`,
  },
  {
    q: "Wat is het verschil tussen een landingspagina en een website?",
    a: "Een website vertelt alles over je bedrijf, voor iedereen die langskomt. Een landingspagina heeft één doel en één doelgroep, bijvoorbeeld de bezoekers van één campagne. Daardoor levert hij meestal meer aanvragen op. Veel bedrijven hebben allebei: een website als basis en landingspagina's voor campagnes.",
  },
  {
    q: "Kan de landingspagina op mijn bestaande website staan?",
    a: "Ja, als je site dat toelaat, bijvoorbeeld als jouwsite.nl/actie. Anders zet ik hem op een eigen subdomein, zoals actie.jouwsite.nl. Voor de bezoeker voelt het als één geheel.",
  },
  {
    q: "Schrijf je ook de teksten?",
    a: "Ja. Op een landingspagina doet de tekst het meeste werk, dus die schrijf ik op je doelgroep en je aanbod. Jij levert de kennis, ik maak er een tekst van die je bezoeker in één keer snapt. Jij keurt alles goed voordat het live gaat.",
  },
  {
    q: "Doe je ook de advertenties zelf?",
    a: "Nee, ik maak de pagina waar je advertenties naartoe sturen, en zorg dat die klaar is voor Google Ads en Meta. Heb je nog niemand voor de campagnes, dan denk ik mee over wie daar goed bij past.",
  },
  {
    q: "Kan ik verschillende versies testen?",
    a: "Ja. Een tweede versie met een andere kop, ander beeld of een andere doelgroep is een kleine uitbreiding. Met de meting zie je welke beter werkt.",
  },
  faq[4],
  faq[6],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Landingspagina laten maken",
      serviceType: "Landingspagina ontwerp en development",
      provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      url: "https://nxtframe.ai/landingspagina-laten-maken",
      description: metadata.description,
      offers: {
        "@type": "Offer",
        name: page.name,
        price: page.from.replace(".", ""),
        priceCurrency: "EUR",
        priceSpecification: { "@type": "PriceSpecification", minPrice: page.from.replace(".", ""), priceCurrency: "EUR", valueAddedTaxIncluded: false },
      },
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
        {/* Hero, the frame of the other service pages (720px on desktop, the nav floating over it):
            the promise on the left over a full-width photo, black from the left to carry the type.
            On phones too the copy sits on the photo, under a shade. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.66)_0%,rgb(0_0_0/0.52)_28%,rgb(0_0_0/0.2)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-12 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[50%]">
              <Eyebrow tone="light" className="max-w-xl">Landingspagina laten maken</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Eén pagina,
                <br />
                <span className="serif-italic text-lime">één doel</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Een pagina voor je campagne, gemaakt om van klikken aanvragen te maken. Een heldere boodschap, één knop en snel op een telefoon. De tekst schrijf ik zelf, net als het ontwerp en de bouw, en de prijs staat vooraf vast.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#prijzen">Bekijk wat het kost</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {[`Vanaf € ${page.from}`, `Live in ${page.time}`, "Teksten inbegrepen"].map((t) => (
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
            <source srcSet="/images/makelaars-zoeken.webp" type="image/webp" />
            <img
              src="/images/makelaars-zoeken.jpg"
              alt="Een man in een roze shirt werkt op zijn laptop op een zonnig terras aan zee"
              className="size-full object-cover object-[75%_50%] lg:object-[80%_50%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* where the clicks get lost: the stacking cards of the homepage and the over page */}
        <section data-zone="cherry" className="bg-cream py-12 text-forest md:py-32">
          <Container>
            <div className="mb-12 grid gap-10 md:mb-20 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Herken je dit?</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Waar je campagne <span className="serif-italic">klikken verliest</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-forest/75 md:text-xl">
                Je betaalt voor elke klik. Toch komt er weinig binnen. Meestal zit het lek niet in de advertentie, maar op de pagina erachter.
              </p>
            </div>
            <StackCards items={leaks} />
          </Container>
        </section>

        {/* what a landing page includes: three big cards in the brand colours, each with its ticks */}
        <section id="wat-je-krijgt" data-zone="green" className="scroll-mt-20 bg-forest py-12 text-paper md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow tone="light" className="max-w-xl">Wat je krijgt</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Gemaakt voor één actie, <span className="serif-italic text-lime">niet voor alles tegelijk</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                Een goede landingspagina weet precies wie er binnenkomt en wat die moet doen. De rest laat hij weg.
              </p>
            </div>
            <ol className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
              {parts.map((p, i) => (
                <li key={p.label} className={`flex flex-col rounded-3xl p-8 md:p-10 ${p.tone.card}`}>
                  <p className="flex items-center gap-3 text-[15px] font-medium">
                    <span className="grid h-10 w-14 place-items-center rounded-full border border-current font-display text-base font-semibold italic">{i + 1}</span>
                    {p.label}
                  </p>
                  <h3 className="mt-10 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.02] tracking-[-0.03em]">{p.title}</h3>
                  <p className={`mt-5 text-base leading-relaxed ${p.tone.muted}`}>{p.body}</p>
                  <ul className="mt-8 space-y-3">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[15px] leading-snug">
                        <Tick className={p.tone.tick} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* an example: the rekentools of Hypotheekhaven, each a page with one goal (the kennismaking) */}
        <section data-zone="cherry" className="bg-cream py-12 text-forest md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Uit de praktijk</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Hypotheekhaven, <span className="serif-italic">elke pagina één doel</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-forest/75 md:text-xl">
                De rekentools van Hypotheekhaven werken als landingspagina: iemand zoekt wat zijn maandlasten worden, krijgt in een paar stappen antwoord en plant daarna een gratis kennismaking.
              </p>
            </div>
            <article className="mt-12 grid overflow-hidden rounded-3xl bg-[#081534] text-[#f5f0ea] md:mt-16 lg:grid-cols-2">
              {/* phones get the phone screenshot: the desktop one was unreadable and cut off at that width */}
              <picture>
                <source media="(min-width: 1024px)" srcSet="/images/cases/hypotheekhaven/d-maandlasten.webp" />
                <img
                  src="/images/cases/hypotheekhaven/m-maandlasten.webp"
                  alt="De maandlasten-rekentool van Hypotheekhaven"
                  className="aspect-[4/5] size-full bg-paper object-cover object-top lg:aspect-auto lg:min-h-[480px]"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="flex flex-col p-8 md:p-12 lg:p-14">
                <p className="text-[15px] font-medium text-[#f5f0ea]/80">Rekentools · tekst, ontwerp en bouw</p>
                <ul className="mt-10 space-y-4">
                  {["Eén vraag per pagina: maandlasten, rentevast, wat kan ik lenen", "Antwoord in een paar stappen, in gewone taal", "Daarna één volgende stap: de gratis kennismaking"].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[17px] leading-snug">
                      <Tick className="bg-[#8e4f4b] text-white" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#f5f0ea]/20 pt-6 lg:mt-auto">
                  <Link href="/werk/hypotheekhaven" className="group inline-flex items-center gap-2 border-b border-current/40 pb-0.5 text-[15px] font-semibold transition-colors hover:border-current">
                    Bekijk de case
                    <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link href="/website-laten-maken" className="group inline-flex items-center gap-2 border-b border-current/40 pb-0.5 text-[15px] font-semibold transition-colors hover:border-current">
                    Liever een hele website?
                    <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          </Container>
        </section>

        {/* what it costs: the price card in lime, what the fixed price includes on paper and what
            comes on top in blush, all three with the round ticks */}
        <section id="prijzen" data-zone="green" className="scroll-mt-20 bg-forest py-12 text-paper md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow tone="light" className="max-w-xl">Wat kost het</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Vooraf weten <span className="serif-italic text-lime">wat het kost</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                Na de kennismaking krijg je één prijs voor de hele pagina, tekst en meting inbegrepen. Je ziet ook meteen wat er los bij komt.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
              <div className="flex flex-col rounded-3xl bg-lime p-8 text-forest md:p-10">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{page.name}</h3>
                <p className="mt-6 font-display text-5xl tracking-[-0.04em]">
                  <span className="align-top text-2xl font-normal tracking-normal opacity-60">vanaf </span>€ {page.from}
                </p>
                <p className="mt-2 text-sm text-forest/65">exclusief btw · live in {page.time}</p>
                <p className="mt-6 text-base leading-relaxed text-forest/80">{page.body}</p>
                <Button variant="dark" className="mt-10 w-full lg:mt-auto" href="/contact">Plan een kennismaking</Button>
              </div>
              <div className="rounded-3xl bg-paper p-8 text-forest md:p-10">
                <h3 className="font-display text-2xl font-semibold tracking-tight">In de vaste prijs</h3>
                <ul className="mt-8 space-y-3">
                  {included.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-[15px] leading-snug">
                      <Tick />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-[#fcbbb9] p-8 text-[#440220] md:p-10">
                <h3 className="font-display text-2xl font-semibold tracking-tight">Betaal je los</h3>
                <ul className="mt-8 space-y-5">
                  {extra.map((e) => (
                    <li key={e.title} className="flex items-start gap-3">
                      <Tick className="bg-[#440220] text-[#fcbbb9]" />
                      <span>
                        <span className="block text-[15px] font-semibold leading-snug">{e.title}</span>
                        <span className="mt-1 block text-[15px] leading-relaxed text-[#440220]/80">{e.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-paper/70">
              Meerdere landingspagina&apos;s of een hele site nodig? Dan kom je vaak voordeliger uit met een website. Alle prijzen op een rij staan op <a href="/prijzen" className="border-b border-paper/40 font-semibold text-paper hover:border-paper">de prijzenpagina</a>.
            </p>
          </Container>
        </section>

        {/* how a landing page project runs: the zigzag path, cream */}
        <div id="aanpak" className="scroll-mt-20">
          <Platform
            eyebrow="Zo werkt het"
            title={<>Van eerste gesprek <span className="serif-italic">tot eerste aanvraag</span></>}
            intro="Je weet altijd hoe ver de pagina is en wat ik van je nodig heb. Tekst, ontwerp en bouw doe ik zelf, dus er gaat onderweg niets verloren tussen mensen."
            action={<TextLink light className="mt-8" href="/aanpak">Lees meer over de aanpak</TextLink>}
            items={steps}
            tone="cream"
          />
        </div>

        {/* the questions, laid out like the homepage FAQ; also FAQPage structured data (see jsonLd) */}
        <section className="bg-cream pb-12 pt-8 text-forest md:pb-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Vragen over <span className="serif-italic">je landingspagina</span>
              </h2>
              <p className="mt-6 max-w-md text-forest/75 t-lead">Staat je vraag er niet bij? Mail naar hallo@nxtframe.ai of plan een kennismaking.</p>
            </div>
            <FaqList items={questions} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
