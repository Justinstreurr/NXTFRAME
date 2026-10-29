import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MoreOnMobile from "@/components/MoreOnMobile";
import CountUp from "@/components/CountUp";
import { Comparison, Difference, FaqList, Platform, Work } from "@/components/Sections";
import StackCards, { type StackCard } from "@/components/StackCards";
import Reveal from "@/components/Reveal";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { FrameCorners, FrameGlyph } from "@/components/Logo";
import { tiers } from "@/components/pricing";
import { faq } from "@/components/faq";

/**
 * The hub for "website laten maken": the page every other commercial page hangs under.
 * Order follows the search intent: the proof and the problems a visitor recognises (stacking cards),
 * what every site includes (three big cards in the brand colours), what it costs, how the process
 * runs (the zigzag steps), what you deliver and what is yours at the end (the ticked table of
 * /aanpak), the work, the comparison, the branches and the questions. The footer carries the
 * closing call to action, so there is no lime band. The FAQ doubles as FAQPage structured data,
 * the page as a Service entity with the three tiers as offers.
 *
 * DRAFT COPY: the hero, the "wat je krijgt" cards, the price factors panel, the
 * aanleveren/eigendom/na-de-lancering table and the two new questions (eigendom, kosten per maand)
 * are a first version for Justin to check. The pains and the price factors are the earlier copy.
 */
export const metadata: Metadata = {
  title: "Website laten maken | Snel, vindbaar in Google en AI | NXT Frame",
  description:
    "Een website laten maken die gevonden wordt en verkoopt. Op maat ontworpen en zo gebouwd dat Google en ChatGPT je kunnen vinden. Vanaf € 4.500, in 6 tot 10 weken.",
  alternates: { canonical: "/website-laten-maken" },
};

const site = tiers.find((t) => t.name === "Website")!;

/* the round check of the /aanpak table and the /diensten cards; colours per ground */
function Tick({ className = "bg-forest text-lime", delay }: { className?: string; delay?: number }) {
  return (
    <span
      style={delay === undefined ? undefined : ({ "--d": `${delay}ms` } as React.CSSProperties)}
      className={`${delay === undefined ? "" : "score "}grid size-6 shrink-0 place-items-center rounded-full ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true"><path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

/* PLACEHOLDERS: the same Happy Flops results as on the case page; replace before going live */
const proof: { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }[] = [
  { value: 0.9, decimals: 1, suffix: "s", label: "laadtijd op mobiel" },
  { value: 100, label: "PageSpeed-score" },
  { value: 40, prefix: "+", suffix: "%", label: "meer bestellingen" },
];

/* the situations a visitor recognises before they start searching for a builder, as stacking cards
   (lime, wine, blush, lime) */
const pains: StackCard[] = [
  {
    label: "Snelheid", img: "/images/pain-mobiel.webp", pos: "50% 35%",
    title: <>Traag <span className="serif-italic">op een telefoon</span></>,
    body: "Veel bezoekers wachten geen drie seconden. En Google weegt snelheid mee in hoe hoog je komt.",
    cta: "Zo bouw ik snelle sites", href: "#wat-je-krijgt",
  },
  {
    label: "Vindbaarheid", img: "/images/slim-search.webp", pos: "48% 50%",
    title: <>Onvindbaar <span className="serif-italic">op je eigen dienst</span></>,
    body: "Op je bedrijfsnaam sta je bovenaan. Op 'wat je doet' in 'waar je zit' niet, en daar zoekt je klant.",
    cta: "Vindbaar in Google en AI", href: "/vindbaar-in-google-en-chatgpt",
  },
  {
    label: "Aanvragen", img: "/images/herkenbaar-2.webp", pos: "50% 28%",
    title: <>Bezoekers, <span className="serif-italic">maar geen aanvragen</span></>,
    body: "Er komt verkeer, maar niemand belt, mailt of bestelt. De site vertelt over jou, niet over hun probleem.",
    cta: "Bekijk wat erin zit", href: "#wat-je-krijgt",
  },
  {
    label: "Eigen gezicht", img: "/images/andere-tijd.webp", pos: "50% 40%",
    title: <>Een template <span className="serif-italic">met jouw logo</span></>,
    body: "Dezelfde blokken als de concurrent. Niets laat zien wie je bent, dus de bezoeker heeft geen reden om voor jou te kiezen.",
    cta: "Bekijk het werk", href: "#ons-werk",
  },
];

/* what every website from me includes: the six basics of the earlier grid, in three big cards */
const parts = [
  {
    label: "Gevonden worden",
    title: <>Gebouwd om <span className="serif-italic">gevonden te worden</span></>,
    body: "Eerst wie je klant is en wat die zoekt. Daaruit volgt welke pagina's je nodig hebt, opgebouwd zodat Google en AI-zoekmachines ze begrijpen en kunnen citeren.",
    items: ["Strategie en sitestructuur", "Een pagina per dienst en per vraag", "Klaar voor Google en AI-zoekmachines","Aangemeld bij Google en Bing"],
    tone: { card: "bg-lime text-forest", muted: "text-forest/75", tick: "bg-forest text-lime" },
  },
  {
    label: "Vertrouwen",
    title: <>Ontworpen op maat, <span className="serif-italic">geen template</span></>,
    body: "Een ontwerp dat bij je merk past en er meteen betrouwbaar uitziet. Gebouwd met moderne code, zonder trage plugins.",
    items: ["Ontwerp rond jouw merk", "Eerst ontworpen voor de telefoon", "Snel, ook op een ouder toestel", "Geen stapel plugins om bij te houden"],
    tone: { card: "bg-[#fcbbb9] text-[#440220]", muted: "text-[#440220]/80", tick: "bg-[#440220] text-[#fcbbb9]" },
  },
  {
    label: "Aanvragen",
    title: <>Elke pagina <span className="serif-italic">met één doel</span></>,
    body: "Een aanvraag, een afspraak of een bestelling. Knoppen, formulieren en teksten werken daar naartoe. En wat je wilt wijzigen, pas je zelf aan.",
    items: ["Duidelijke knoppen en korte formulieren", "Teksten rond de vraag van je klant", "Teksten, foto's en pagina's zelf beheren", "Eén persoon die je belt"],
    tone: { card: "bg-paper text-forest", muted: "text-forest/75", tick: "bg-forest text-lime" },
  },
];

const priceFactors = [
  { title: "Aantal pagina's", body: "Elke pagina met een eigen doel kost ontwerp- en schrijftijd. Tien sterke pagina's zijn beter dan dertig dunne." },
  { title: "Koppelingen", body: "Reserveringssysteem, CRM, woningaanbod, voorraad: elke koppeling is werk, maar scheelt je daarna handwerk." },
  { title: "Content", body: "Heb je teksten en foto's, of maken we ze samen? Goede teksten en foto's maken vaak meer verschil dan het ontwerp." },
  { title: "Doorontwikkeling", body: "Na de lancering kun je kiezen voor onderhoud per maand. Dan houd ik de site bij en bouw ik verder waar dat nodig is." },
];

/* what you deliver and what you get, from the start to after the launch (the table of /aanpak).
   DRAFT: ownership (domain on the client's name, all logins) and "nergens aan vast" for Justin to confirm. */
const handover = [
  {
    title: "Voor de start",
    you: "Een half uur voor de kennismaking. Heb je al een logo, huisstijl, teksten of foto's, stuur ze mee. Zo niet, dan maken we ze in het traject.",
    get: ["Eén vaste prijs voor het hele traject", "Een planning met een lanceerdatum"],
  },
  {
    title: "Tijdens het traject",
    you: "Meekijken in de feedbackrondes, teksten aanleveren of goedkeuren, en toegang geven tot je huidige domein.",
    get: ["Een ontwerp dat je kunt doorklikken", "Een testversie, getest op telefoon en desktop"],
  },
  {
    title: "Bij de oplevering",
    you: "Een laatste akkoord op de testversie.",
    get: ["De site en je domein op jouw naam", "Alle inloggegevens", "Uitleg om zelf teksten en foto's aan te passen"],
  },
  {
    title: "Na de lancering",
    you: "Kiezen of je zelf verdergaat, of dat ik de site bijhoud en laat doorgroeien.",
    get: ["Aangemeld bij Google en Bing", "Gemeten op snelheid en vindbaarheid", "Onderhoud per maand, als je dat wilt"],
  },
];

/* the shared hub questions, plus two the best Dutch pages answer and this one did not yet
   (DRAFT: ownership and the monthly costs, no amounts until Justin confirms them) */
const questions = [
  ...faq.slice(0, 7),
  {
    q: "Van wie is de website als hij klaar is?",
    a: "Van jou. Het domein staat op jouw naam, je krijgt alle inloggegevens, en de teksten en het ontwerp die we voor je site maken, zijn van jou. Wil je later verder met iemand anders, dan kan dat. Je zit nergens aan vast.",
  },
  {
    q: "Wat kost een website per maand na de lancering?",
    a: "Naast de eenmalige prijs betaal je voor je domeinnaam en hosting. Wil je dat ik de site bijhoud en laat doorgroeien, dan kan dat met onderhoud per maand. Welke bedragen daarbij horen, staat vooraf in het voorstel, zodat je niet voor verrassingen komt te staan.",
  },
  faq[7],
];

/* Service + FAQPage structured data, generated from the same content as the page */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Website laten maken",
      serviceType: "Webdesign en webdevelopment",
      provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      url: "https://nxtframe.ai/website-laten-maken",
      description: metadata.description,
      offers: tiers.map((t) => ({
        "@type": "Offer",
        name: t.name,
        price: t.from.replace(".", ""),
        priceCurrency: "EUR",
        priceSpecification: { "@type": "PriceSpecification", minPrice: t.from.replace(".", ""), priceCurrency: "EUR", valueAddedTaxIncluded: false },
      })),
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
        {/* Hero, the frame of the aanpak, over and diensten pages (720px on desktop, the nav floating
            over it): the promise on the left over a full-width photo, black from the left to carry the
            type. TEMPORARY photo: the Hypotheekhaven site on a laptop on a plinth in a flowering meadow
            (/images/advies-hero-weide, an earlier version of the financieel-advies hero), until the
            generated hero (an older owner in warm late sun, lime accent) is in. On phones the photo
            follows the copy as its own block. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.66)_0%,rgb(0_0_0/0.52)_28%,rgb(0_0_0/0.2)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-12 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[52%]">
              <Eyebrow tone="light" className="max-w-xl">Website laten maken</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Een website die
                <br />
                <span className="serif-italic text-lime">gevonden wordt en verkoopt</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Ontworpen rond wat jouw klant zoekt, en zo gebouwd dat Google en ChatGPT je kunnen vinden. Ik doe alles zelf, van plan tot lancering, voor een prijs die vooraf vaststaat.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#prijzen">Bekijk wat het kost</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {[`Vanaf € ${site.from}`, `Live in ${site.time}`, "De site is van jou"].map((t) => (
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
            <source srcSet="/images/advies-hero-weide.webp" type="image/webp" />
            <img
              src="/images/advies-hero-weide.jpg"
              alt="Een laptop met de website van Hypotheekhaven op een witte sokkel in een bloeiende weide in de late zon"
              className="aspect-[4/3] w-full object-cover object-[72%_60%] lg:aspect-auto lg:size-full lg:object-[80%_55%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* the proof and the problems a visitor recognises: the Happy Flops numbers, then the
            stacking cards of the homepage and the webshop page */}
        <section data-zone="cherry" className="bg-cream py-12 text-forest md:py-32">
          <Container>
            {/* three numbers on the container grid: the first on the left edge, the last on the right */}
            <dl className="grid gap-8 sm:grid-cols-3">
              {proof.map((s, i) => (
                <div key={s.label} className={i === 1 ? "sm:text-center" : i === 2 ? "sm:text-right" : ""}>
                  <dt className="relative inline-block px-5 py-3 font-display text-5xl tracking-[-0.04em] text-forest md:text-6xl">
                    <FrameCorners className="text-lime" corners="diagonal" inset="inset-0" size="size-5" />
                    <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-2 text-sm text-forest/60">{s.label} · Happy Flops</dd>
                </div>
              ))}
            </dl>
            <div className="mb-12 mt-12 grid gap-10 border-t border-forest/10 pt-16 md:mb-20 md:mt-20 md:pt-20 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Herken je dit?</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  De meeste websites zijn <span className="serif-italic">een online folder</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-forest/75 md:text-xl">
                Mooi op de dag van lancering, en daarna stil. Een website die werkt, wordt gevonden en maakt het een bezoeker makkelijk om contact op te nemen.
              </p>
            </div>
            <StackCards items={pains} />
          </Container>
        </section>

        {/* what every site includes: three big cards in the brand colours, each with its ticks (the cards of /webshop-laten-maken) */}
        <section id="wat-je-krijgt" data-zone="green" className="scroll-mt-20 bg-forest py-12 text-paper md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow tone="light" className="max-w-xl">Wat je krijgt</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Geen pakketten met sterretjes, <span className="serif-italic text-lime">wel een complete site</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                Dit zit in elke website die ik maak, van één pagina tot een webshop.
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

        {/* what it costs: the three tiers (outside white, middle forest), then what moves the price
            in one paper panel with the number pills of the cards above */}
        <section id="prijzen" data-zone="cherry" className="scroll-mt-20 bg-cream py-12 text-forest md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Wat kost het</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Eerlijke prijzen, <span className="serif-italic">vooraf vast</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-forest/75 md:text-xl">
                Dit zijn vanaf-prijzen, zodat je weet waar je aan toe bent. Na de kennismaking krijg je één vaste prijs voor het hele traject. Geen uren achteraf.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
              {tiers.map((t) => (
                <div key={t.name} className={`flex flex-col rounded-3xl p-8 md:p-10 ${t.highlight ? "bg-forest text-paper" : "bg-paper text-forest ring-1 ring-forest/10"}`}>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{t.name}</h3>
                    {t.highlight && <span className="rounded-full bg-lime px-3 py-1 text-xs font-semibold text-forest">Meest gekozen</span>}
                  </div>
                  <p className={`mt-6 font-display text-5xl tracking-[-0.04em] ${t.highlight ? "text-lime" : "text-forest"}`}>
                    <span className="align-top text-2xl font-normal tracking-normal opacity-60">vanaf </span>€ {t.from}
                  </p>
                  <p className={`mt-2 text-sm ${t.highlight ? "text-paper/60" : "text-forest/60"}`}>exclusief btw · live in {t.time}</p>
                  <p className={`mt-6 text-base leading-relaxed ${t.highlight ? "text-paper/80" : "text-forest/70"}`}>{t.body}</p>
                  {/* on phones the list of the other two tiers folds behind a button */}
                  <MoreOnMobile show={t.highlight ? 6 : 0} label="Wat zit erin" as="ul" className="mt-8 flex-1 space-y-3" buttonClassName="self-start">
                    {t.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[15px] leading-snug">
                        <Tick className={t.highlight ? "bg-lime text-forest" : "bg-forest text-lime"} />
                        {it}
                      </li>
                    ))}
                  </MoreOnMobile>
                  <Button variant={t.highlight ? "lime" : "dark"} className="mt-10 w-full" href="/contact">Plan een kennismaking</Button>
                </div>
              ))}
            </div>
            {/* what moves the price */}
            <div className="mt-6 rounded-3xl bg-paper p-8 ring-1 ring-forest/10 md:p-10 lg:p-14">
              <h3 className="t-sub">
                Wat bepaalt <span className="serif-italic">de prijs</span>
              </h3>
              <MoreOnMobile show={1} label={`Toon alle ${priceFactors.length}`} as="ol" className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
                {priceFactors.map((f, i) => (
                  <li key={f.title}>
                    <span className="grid h-10 w-14 place-items-center rounded-full border border-forest/30 font-display text-base font-semibold italic">{i + 1}</span>
                    <h4 className="mt-6 font-display text-xl font-semibold tracking-tight">{f.title}</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-forest/70">{f.body}</p>
                  </li>
                ))}
              </MoreOnMobile>
            </div>
            <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-forest/70">
              Alle prijzen op een rij, ook voor onderhoud na de lancering, staan op <a href="/prijzen" className="border-b border-forest/40 font-semibold text-forest hover:border-forest">de prijzenpagina</a>.
            </p>
          </Container>
        </section>

        {/* the five steps on the zigzag path, cream, so it gets the full top padding */}
        <div id="aanpak" className="scroll-mt-20">
          <Platform
            eyebrow="Zo werkt het"
            title={<>Vijf stappen, <span className="serif-italic">één aanspreekpunt</span></>}
            intro="Je weet altijd waar het traject staat en wat de volgende stap is. Er zit geen accountmanager tussen: je spreekt mij, en ik bouw ook."
            action={<TextLink light className="mt-8" href="/aanpak">Lees meer over de aanpak</TextLink>}
            tone="cream"
          />
        </div>

        {/* what you deliver and what is yours: the table of /aanpak on forest, a blush column for
            what you do and a paper one for what you get, ticked off as it scrolls in */}
        <section data-zone="green" className="bg-forest py-12 text-paper md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow tone="light" className="max-w-xl">Aanleveren en opleveren</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Wat je aanlevert, <span className="serif-italic text-lime">en wat van jou is</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                Je hoeft niets klaar te hebben om te beginnen. En aan het eind is alles van jou: de site, het domein en de inloggegevens.
              </p>
            </div>
            {/* phones: one card per moment, what you do on top and the ticks in a paper block under it */}
            <MoreOnMobile show={1} label={`Toon alle ${handover.length} momenten`} as="ol" className="mt-12 space-y-4 md:hidden">
              {handover.map((d, i) => (
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
            </MoreOnMobile>
            <Reveal threshold={0.25} className="cmp mt-12 md:mt-16 hidden md:block">
              <table className="w-full border-separate border-spacing-x-3 border-spacing-y-0 text-left">
                <thead>
                  <tr>
                    <th className="w-[26%] pb-4" />
                    <th className="w-[34%] rounded-t-3xl bg-[#fcbbb9] px-8 pb-4 pt-8 align-top font-display text-xl font-semibold tracking-tight text-[#440220]">Wat jij doet</th>
                    <th className="rounded-t-3xl bg-paper px-8 pb-4 pt-8 align-top font-display text-xl font-semibold tracking-tight text-forest">Wat je krijgt</th>
                  </tr>
                </thead>
                <tbody>
                  {handover.map((d, i) => {
                    const last = i === handover.length - 1;
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
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              <TextLink light href="/website-onderhoud">Over onderhoud na de lancering</TextLink>
              <TextLink light href="/website-teksten">Hulp bij je teksten</TextLink>
            </div>
          </Container>
        </section>

        {/* proof, the comparison and the branches: the homepage sections, cream all the way */}
        <Work turnDark={false} />
        <Comparison />
        <Difference />

        {/* FAQ, laid out like the homepage; also FAQPage structured data (see jsonLd) */}
        <section className="bg-cream pb-12 pt-8 text-forest md:pb-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Alles wat je wilt weten <span className="serif-italic">voordat je begint</span>
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
