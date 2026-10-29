import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaqList, Platform, Work, type PathStep } from "@/components/Sections";
import StackCards, { type StackCard } from "@/components/StackCards";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { FrameGlyph } from "@/components/Logo";
import BranchIcon from "@/components/BranchIcons";
import { CodeIcon, LaunchIcon, MapIcon, PenIcon } from "@/components/StepIcons";
import Reveal from "@/components/Reveal";
import { tiers } from "@/components/pricing";
import { faq } from "@/components/faq";

/**
 * Website redesign: the page for "website redesign / website vernieuwen / website laten vernieuwen".
 * The visitor has a site that is slow, dated, not found or not converting, and is afraid of losing
 * the rankings it has built up. Order follows that worry: the promise (hero), the signs a redesign
 * is due, how the findability is kept (stacking cards), the five steps of a redesign, what stays
 * and what gets better (the ticked table of the aanpak page), what it costs, the proof and the
 * questions. The footer carries the closing call to action, so there is no lime band.
 *
 * DRAFT COPY: everything on this page is a first version for Justin to check, in particular the
 * price paragraph (a redesign priced like a new website), the follow-up after launch ("de weken
 * erna") and the FAQ answers about platforms and lead time.
 */
export const metadata: Metadata = {
  title: "Website redesign | Je website laten vernieuwen zonder vindbaarheid te verliezen | NXT Frame",
  description:
    "Je huidige site opnieuw ontworpen en gebouwd op moderne techniek. Oude adressen netjes doorgestuurd, wat werkt blijft, zodat je de vindbaarheid die je al hebt opgebouwd zo veel mogelijk houdt.",
  alternates: { canonical: "/website-redesign" },
};

const website = tiers.find((t) => t.name === "Website")!;

/* the signs a visitor recognises: the paper cards of the website-laten-maken hub */
const signs = [
  { title: "Traag op een telefoon", body: "Je site laadt seconden lang. Bezoekers haken af voordat ze iets gezien hebben, en Google merkt dat ook." },
  { title: "Gedateerd uiterlijk", body: "Je bedrijf is gegroeid, je site niet. Hij vertelt een verhaal van een paar jaar geleden en wekt weinig vertrouwen." },
  { title: "Niet gevonden", body: "Op je bedrijfsnaam sta je bovenaan, maar op wat je doet niet. De structuur en techniek helpen je niet verder." },
  { title: "Bezoekers, geen aanvragen", body: "Er komt verkeer binnen, maar niemand belt, mailt of bestelt. En zelf iets aanpassen is een gedoe." },
];

/* how the findability is kept: four cards that stack while you scroll */
const keep: StackCard[] = [
  {
    label: "In kaart", img: "/images/slim-search.webp", pos: "48% 50%",
    title: <>Eerst alles <span className="serif-italic">in kaart</span></>,
    body: "Voordat er iets verandert, zet ik elke pagina van je huidige site op een rij. Met daarbij welke pagina's bezoekers en zoekverkeer opleveren. Zo weten we wat we moeten beschermen.",
    cta: "Plan een kennismaking", href: "/contact",
  },
  {
    label: "Doorgestuurd", img: "/images/andere-tijd.webp", pos: "50% 40%",
    title: <>Oude adressen <span className="serif-italic">netjes doorgestuurd</span></>,
    body: "Elk oud adres krijgt een vaste doorverwijzing (een 301) naar de nieuwe pagina die erbij past. Bezoekers en Google komen niet op een foutpagina uit, en links naar je site blijven werken.",
    cta: "Bekijk de stappen", href: "#stappen",
  },
  {
    label: "Behouden", img: "/images/slim-palette.webp", pos: "42% 50%",
    title: <>Wat werkt, <span className="serif-italic">blijft staan</span></>,
    body: "Teksten die goed scoren gooi ik niet zomaar weg. Paginatitels, beschrijvingen en gegevens voor zoekmachines zet ik over, en maak ik beter waar dat kan.",
    cta: "Bekijk het werk", href: "/werk",
  },
  {
    label: "Gecontroleerd", img: "/images/slim-desk.webp", pos: "50% 18%",
    title: <>Na de lancering <span className="serif-italic">gecontroleerd</span></>,
    body: "De nieuwe site meld ik aan bij Google en Bing, en de weken erna houd ik in de gaten of alles goed wordt opgepikt. Duikt er een gemiste doorverwijzing op, dan los ik die op.",
    cta: "Bekijk de prijzen", href: "/prijzen",
  },
];

/* the five steps of a redesign, on the zigzag path; the analysis gets the search icon */
const SearchStepIcon = ({ className }: { className?: string }) => <BranchIcon name="search" className={className} />;
const steps: PathStep[] = [
  { title: "Analyse van je huidige site", body: "Wat gaat er goed, wat niet? Welke pagina's brengen bezoekers en zoekverkeer, en waar haken mensen af? Je krijgt een eerlijk beeld, ook als een paar gerichte aanpassingen genoeg blijken.", Icon: SearchStepIcon },
  { title: "Nieuwe structuur en adressenkaart", body: "Een nieuwe opzet rond de vragen van je klant, en een lijst met elk oud adres en de nieuwe pagina waar het naartoe gaat.", Icon: MapIcon },
  { title: "Ontwerp", body: "Een nieuw ontwerp dat past bij je merk en je klant. Je kijkt mee en denkt mee, in rondes die overzichtelijk blijven.", Icon: PenIcon },
  { title: "Bouw en overzetten", body: "Gebouwd op moderne techniek. Teksten, titels en beelden die werken gaan mee, en alle doorverwijzingen worden getest voordat de site live gaat.", Icon: CodeIcon },
  { title: "Lancering en controle", body: "Live op je eigen domein, aangemeld bij Google en Bing. Daarna kijk ik of alles goed wordt opgepikt en stuur ik bij waar nodig.", Icon: LaunchIcon },
];

/* what stays and what gets better, per part of the site (the table of the aanpak page) */
const parts = [
  {
    title: "Domein en adressen",
    stay: "Je domeinnaam blijft. Elk oud adres stuurt door naar de nieuwe pagina die erbij past.",
    get: ["Geen foutpagina's", "Links naar je site blijven werken"],
  },
  {
    title: "Teksten",
    stay: "Wat goed scoort blijft staan. De rest maak ik scherper, rond de vragen van je klant.",
    get: ["Per pagina één doel", "Kopjes en knoppen die zeggen wat er gebeurt"],
  },
  {
    title: "Ontwerp",
    stay: "Je logo en kleuren blijven herkenbaar, tenzij je zelf iets nieuws wilt.",
    get: ["Ontwerp op maat, op desktop en telefoon", "Een versie die je kunt doorklikken"],
  },
  {
    title: "Techniek",
    stay: "Trage plugins en verouderde code gaan eruit. Je bezoekers merken alleen dat het sneller is.",
    get: ["Gebouwd op moderne techniek", "Snel op een telefoon", "Zelf teksten en foto's aanpassen"],
  },
  {
    title: "Structuur",
    stay: "Pagina's die niets doen worden samengevoegd of verdwijnen, altijd met een doorverwijzing.",
    get: ["Een duidelijke pagina per dienst", "Beter vindbaar in Google en ChatGPT"],
  },
];

/* the round check of the aanpak table: lime on forest, on the paper column */
function Tick({ delay = 0, className = "bg-forest text-lime" }: { delay?: number; className?: string }) {
  return (
    <span style={{ "--d": `${delay}ms` } as React.CSSProperties} className={`score grid size-6 shrink-0 place-items-center rounded-full ${className}`}>
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true"><path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

/* what moves the price of a redesign, ticked off in the lime card */
const priceFactors = [
  "Hoeveel pagina's er meegaan",
  "Of de teksten blijven of nieuw worden",
  "Koppelingen, zoals een agenda of CRM",
  "Hoeveel oude adressen er doorgestuurd worden",
];

/* the redesign questions first, then the general ones that apply */
const questions = [
  {
    q: "Verlies ik mijn plek in Google door een redesign?",
    a: "Niet als het goed wordt gedaan. Elk oud adres stuurt door naar de nieuwe pagina, wat werkt blijft staan en na de lancering controleer ik of alles goed wordt opgepikt. Een korte schommeling in de eerste weken kan voorkomen. Een garantie op posities geeft niemand, ik ook niet. Wel een site die sneller is en beter in elkaar zit dan de oude.",
  },
  {
    q: "Wat is een 301-doorverwijzing?",
    a: "Een vaste verwijzing van een oud adres naar een nieuw adres. Typt iemand het oude adres in, of klikt iemand op een oude link, dan komt hij vanzelf op de nieuwe pagina. Google begrijpt zo dat de pagina is verhuisd en kan de opgebouwde waarde overzetten naar het nieuwe adres.",
  },
  {
    q: "Blijven mijn domeinnaam en e-mail werken?",
    a: "Ja. Je domeinnaam blijft van jou en blijft hetzelfde. Bij de overstap wordt alleen aangepast waar je website draait; je e-mail heeft eigen instellingen, die ik bij de overstap laat staan. Zo blijft je mail gewoon werken.",
  },
  {
    q: "Mijn site draait op WordPress of Wix. Kan dat?",
    a: "Ja. Het maakt niet uit waar je huidige site op draait: ik zet de pagina's, teksten en beelden die werken over naar de nieuwe site, en stuur de oude adressen door.",
  },
  {
    q: "Is een redesign altijd nodig?",
    a: "Nee. Soms lossen een paar gerichte aanpassingen het probleem op, zoals een snellere pagina of een duidelijker formulier. Dat hoor je dan na de analyse. Liever een eerlijk advies dan een project dat niets oplevert.",
  },
  {
    q: "Hoe lang duurt een redesign?",
    a: `Ongeveer zo lang als een nieuwe website: ${website.time}, gerekend vanaf het moment dat teksten, foto's en toegang binnen zijn. Daarna hangt het vooral af van het aantal pagina's en hoe snel feedback binnenkomt. Bij de start spreken we een beoogde lanceerdatum af.`,
  },
  faq[2],
  faq[3],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Website redesign",
      serviceType: "Website redesign",
      provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      description: metadata.description,
      url: "https://nxtframe.ai/website-redesign",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "PriceSpecification", minPrice: website.from.replace(".", ""), priceCurrency: "EUR" },
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
        {/* Hero, the frame of the aanpak and over pages (720px on desktop, the nav floating over it):
            the promise on the left over a full-width photo, black from the left to carry the type.
            The photo, for now: a phone with the Hypotheekhaven site leaning on orange padded tubes
            (/images/advies-hero, an earlier financieel-advies hero). To be replaced by a generated
            photo of an older person repainting a storefront. On phones the photo follows the copy. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-16 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[52%]">
              <Eyebrow tone="light" className="max-w-xl">Website redesign</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Een nieuwe site,
                <br />
                <span className="serif-italic text-lime">zonder opnieuw te beginnen</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Je huidige site is traag, verouderd of levert niets op. Ik ontwerp en bouw hem opnieuw op moderne techniek, en neem mee wat al werkt: je adressen, je sterke teksten en de vindbaarheid die je hebt opgebouwd.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#vindbaarheid">Zo houd je je vindbaarheid</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {["Oude adressen doorgestuurd", "Vaste prijs vooraf", "Eén aanspreekpunt"].map((t) => (
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
            <source srcSet="/images/advies-hero.webp" type="image/webp" />
            <img
              src="/images/advies-hero.jpg"
              alt="Een telefoon met een vernieuwde website leunt tegen oranje, gecapitonneerde buizen"
              className="aspect-[4/3] w-full object-cover object-[72%_50%] lg:aspect-auto lg:size-full lg:object-[70%_50%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* the signs: the paper cards of the website-laten-maken hub, lighting up one after another */}
        <section data-zone="cherry" className="bg-cream py-16 text-forest md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Herken je dit?</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Vier signalen dat je site <span className="serif-italic">aan vernieuwing toe is</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-forest/75 md:text-xl">
                Uitgekeken zijn op je eigen site is geen goede reden. Klanten mislopen wel. Herken je er één of meer, dan is een redesign het overwegen waard.
              </p>
            </div>
            <ul className="mt-16 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-4">
              {signs.map((p, i) => (
                <li key={p.title} style={{ "--i": i } as React.CSSProperties} className="pain-card rounded-3xl bg-paper p-8 text-forest ring-1 ring-forest/10">
                  <span className="text-sm font-medium text-forest/45">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-forest/75">{p.body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* how the findability is kept: built like "Waar ik voor sta" on the over page, the heading
            centred and four cards that stack while you scroll. Paper, to part it from the cream above */}
        <section id="vindbaarheid" data-zone="cherry" className="scroll-mt-20 bg-paper py-16 text-forest md:py-32">
          <Container className="text-center">
            <Eyebrow className="mx-auto w-fit">Je vindbaarheid</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-4xl t-section md:mt-8">
              Wat je hebt opgebouwd, <span className="serif-italic">neem je mee</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">
              De grootste zorg bij een redesign: verdwijn ik uit Google? Niet als je het zorgvuldig doet. Een garantie op posities geeft niemand, wel deze vier afspraken.
            </p>
          </Container>
          <Container className="mt-12 md:mt-16">
            <StackCards items={keep} />
          </Container>
        </section>

        {/* the five steps of a redesign on the zigzag path, light */}
        <div id="stappen" className="scroll-mt-20">
          <Platform
            eyebrow="Zo werkt het"
            title={<>Vijf stappen <span className="serif-italic">van oud naar nieuw</span></>}
            intro="Geen accountmanager ertussen: de persoon die je huidige site analyseert, is de persoon die de nieuwe ontwerpt en bouwt. Er is dus geen overdracht waarin iets kwijtraakt."
            // `light` on purpose: the cream tone remaps the cream token to forest
            action={<TextLink light className="mt-8" href="/aanpak">Bekijk de aanpak</TextLink>}
            items={steps}
            tone="cream"
          />
        </div>

        {/* what stays and what gets better: the table of the aanpak page, on the forest ground, a
            blush column for how each part is handled and a paper one ticked off as it scrolls in */}
        <section data-zone="green" className="bg-forest py-16 text-paper md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow tone="light" className="max-w-xl">Oud en nieuw</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Wat blijft, <span className="serif-italic text-lime">en wat beter wordt</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                Een redesign is geen sloop. Per onderdeel van je site weet je vooraf wat er meegaat en wat je ervoor terugkrijgt.
              </p>
            </div>
            {/* phones: one card per part, how it is handled on top and the ticks in a paper block under it */}
            <ol className="mt-12 space-y-4 md:hidden">
              {parts.map((d, i) => (
                <li key={d.title} className="overflow-hidden rounded-3xl bg-[#fcbbb9] text-[#440220]">
                  <div className="p-6">
                    <span className="text-sm font-medium text-[#440220]/55">0{i + 1}</span>
                    <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">{d.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#440220]/85">{d.stay}</p>
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
            <Reveal threshold={0.25} className="cmp mt-16 hidden md:block">
              <table className="w-full border-separate border-spacing-x-3 border-spacing-y-0 text-left">
                <thead>
                  <tr>
                    <th className="w-[26%] pb-4" />
                    <th className="w-[34%] rounded-t-3xl bg-[#fcbbb9] px-8 pb-4 pt-8 align-top font-display text-xl font-semibold tracking-tight text-[#440220]">Hoe ik ermee omga</th>
                    <th className="rounded-t-3xl bg-paper px-8 pb-4 pt-8 align-top font-display text-xl font-semibold tracking-tight text-forest">Wat je krijgt</th>
                  </tr>
                </thead>
                <tbody>
                  {parts.map((d, i) => {
                    const last = i === parts.length - 1;
                    return (
                      <tr key={d.title}>
                        <th scope="row" className={`py-6 pr-4 align-top ${last ? "" : "border-b border-paper/15"}`}>
                          <span className="text-sm font-medium text-lime">0{i + 1}</span>
                          <span className="mt-1 block font-display text-xl font-semibold tracking-tight lg:text-2xl">{d.title}</span>
                        </th>
                        <td className={`bg-[#fcbbb9] px-8 py-6 align-top text-[15px] leading-relaxed text-[#440220]/85 ${last ? "rounded-b-3xl pb-8" : ""}`}>
                          <span className={`block ${last ? "" : "border-b border-[#440220]/15 pb-6"}`}>{d.stay}</span>
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
          </Container>
        </section>

        {/* what it costs: two big cards in the brand colours, the starting price on forest and what
            moves the price on lime, ticked like the service cards on /diensten */}
        <section id="prijs" className="scroll-mt-24 bg-cream py-16 text-forest md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Wat kost het</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Een vaste prijs, <span className="serif-italic">na de analyse</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-forest/75 md:text-xl">
                Een redesign is een nieuwe website met je huidige site als startpunt. Na de kennismaking krijg je één vaste prijs voor het hele traject. Geen uren achteraf.
              </p>
            </div>
            <div className="mt-16 grid gap-6 lg:grid-cols-2">
              <article className="flex flex-col rounded-3xl bg-forest p-8 text-paper md:p-12">
                <p className="flex items-center gap-3 text-[15px] font-medium">
                  <span className="grid size-10 place-items-center rounded-full border border-current">
                    <BranchIcon name="refresh" className="size-5" />
                  </span>
                  Redesign van een website
                </p>
                <p className="mt-10 font-serif text-5xl leading-none text-lime md:text-6xl">vanaf € {website.from}</p>
                <p className="mt-3 text-sm text-paper/60">exclusief btw · live in {website.time}</p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-paper/80 md:text-lg">
                  Dezelfde basis als een nieuwe website: ontwerp op maat, moderne techniek en gebouwd om gevonden te worden in Google en ChatGPT. Met de analyse en het doorsturen van je oude adressen erbij.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-paper/15 pt-6 lg:mt-auto">
                  <Button href="/contact">Plan een kennismaking</Button>
                  <TextLink light href="/prijzen">Bekijk alle prijzen</TextLink>
                </div>
              </article>
              <article className="flex flex-col rounded-3xl bg-lime p-8 text-forest md:p-12">
                <p className="flex items-center gap-3 text-[15px] font-medium">
                  <span className="grid size-10 place-items-center rounded-full border border-current">
                    <BranchIcon name="chart" className="size-5" />
                  </span>
                  Wat de prijs bepaalt
                </p>
                <h3 className="mt-10 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.03em]">
                  Hoe groot <span className="serif-italic">je huidige site is</span>
                </h3>
                <ul className="mt-8 grid gap-y-3">
                  {priceFactors.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px] leading-snug">
                      <Tick />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </Container>
        </section>

        {/* the proof */}
        <Work turnDark={false} />

        {/* the questions about a redesign, laid out like the homepage FAQ */}
        <section className="bg-cream pb-16 pt-8 text-forest md:pb-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Vragen over <span className="serif-italic">een redesign</span>
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
