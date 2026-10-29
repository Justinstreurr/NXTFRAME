import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MoreOnMobile from "@/components/MoreOnMobile";
import { Comparison, FaqList } from "@/components/Sections";
import { Button, Container, Eyebrow, Reassure, TextLink } from "@/components/ui";
import { FrameGlyph } from "@/components/Logo";
import { tiers } from "@/components/pricing";
import { faq } from "@/components/faq";

/**
 * The prices page, for "wat kost een website laten maken". The answer comes first (the three
 * starting prices and the fixed price after the call), then the packages, what moves the price,
 * what is always included, the costs after launch, the comparison and the price questions.
 * Every amount comes from pricing.ts; nothing is typed over here.
 *
 * TO CONFIRM OR FILL IN BEFORE GOING LIVE
 *  - All prices in pricing.ts are indicative and still to be confirmed by Justin.
 *  - pricing.ts says webshop from 7.500; the webshops branch page in menuData.ts says from 6.500.
 *  - pricing.ts says website from 4.500; the beauty and coaches branch pages say from 3.000.
 *    This page follows pricing.ts and calls the amounts a direction, not a floor.
 *  - After launch: one visible [INVULLEN] placeholder, the monthly amount of the maintenance
 *    subscription. What the subscription holds (hosting, updates, back-ups, small changes on
 *    request) and "ik help bij het overzetten" without one are a proposal: confirm or change.
 *    Decided 12 Oct 2026: NXT Frame offers hosting; the domain name is in the client's name and
 *    paid by the client.
 *  - "Hosting en domein staan waar het kan op jouw naam" and "meerwerk krijgt vooraf een vaste
 *    prijs" follow the defaults in /voorwaarden (art. 8 and art. 3), which are still open there.
 *  - Payment schedule and deposit are not chosen: the FAQ says they are agreed in the quote.
 *  - "Altijd inbegrepen" lists self-management and the Google and Bing sign-up for every package,
 *    as the hub and the FAQ promise; in pricing.ts those two items only appear from Website up.
 *  - "Exclusief btw" follows /voorwaarden and the hub.
 */

const [landing, site, shop] = tiers;

export const metadata: Metadata = {
  title: "Wat kost een website laten maken? Prijzen | NXT Frame",
  description: `Wat kost een website laten maken? Een landingspagina vanaf € ${landing.from}, een website vanaf € ${site.from} en een webshop vanaf € ${shop.from}. Na de kennismaking krijg je één vaste prijs.`,
  alternates: { canonical: "/prijzen" },
};

/* the price cards in turn, as on the homepage: white, forest (the one most pick), white */
const tones = [
  { card: "bg-paper text-forest ring-1 ring-forest/10", muted: "text-forest/70", pill: "bg-forest text-lime", line: "border-forest/15", check: "bg-forest text-lime" },
  { card: "bg-forest text-cream", muted: "text-cream/70", pill: "bg-lime text-forest", line: "border-cream/15", check: "bg-lime text-forest" },
  { card: "bg-paper text-forest ring-1 ring-forest/10", muted: "text-forest/70", pill: "bg-forest text-lime", line: "border-forest/15", check: "bg-forest text-lime" },
];

/* what moves the fixed price, in both directions; no amounts, those follow from the call */

/* in every project, whatever the package; the same promises as on the hub and the homepage */
const always = [
  { title: "Snel op mobiel", body: "Gebouwd op moderne code, zonder trage plugins, en getest op telefoon, tablet en desktop." },
  { title: "Ingericht op Google en AI", body: "Structuur en teksten die zoekmachines en AI-zoekmachines kunnen lezen en begrijpen." },
  { title: "Ontwerp op maat", body: "Geen template. Een ontwerp rond jouw merk en jouw klant, waarin elke sectie een doel heeft." },
  { title: "Zelf te beheren", body: "Teksten, foto's en pagina's pas je zelf aan, zonder technische kennis." },
  { title: "Aangemeld bij Google en Bing", body: "Bij de lancering meld ik de site aan, zodat zoekmachines hem sneller oppikken." },
  { title: "Eén aanspreekpunt", body: "De persoon die je spreekt, is de persoon die ontwerpt en bouwt. Van eerste schets tot na de lancering." },
];

/* after the launch: with the maintenance subscription or without. THE MONTHLY AMOUNT DOES NOT EXIST YET (the
   first card ends on a placeholder), and the lists are a proposal for Justin to confirm */
const after: { label: string; title: string; body: string; items: string[]; price?: string; highlight?: boolean }[] = [
  {
    label: "Mijn advies",
    title: "Met onderhoudsabonnement",
    body: "Je site draait bij mij en ik houd hem bij. Eén vast bedrag per maand, en als er iets is, weet je wie je belt.",
    items: ["Hosting van je site", "Updates en beveiliging", "Back-ups", "Kleine aanpassingen op verzoek", "Eén aanspreekpunt als er iets is"],
    highlight: true,
  },
  {
    label: "Zelf doen",
    title: "Zonder abonnement",
    body: "Je krijgt de site opgeleverd en hij is van jou. Je regelt de hosting en het bijhouden zelf, of laat dat aan iemand anders over.",
    items: ["De site is van jou, inclusief de code", "Hosting regel je zelf, ik help bij het overzetten", "Updates en back-ups doe je zelf", "Aanpassingen op aanvraag, met vooraf een vaste prijs"],
    price: "Geen maandbedrag",
  },
];

/* the price questions: two from the shared FAQ, the rest only asked here. Payment terms and the
   deposit are not decided yet, so those answers point to the quote instead of naming a schedule. */
const questions = [
  faq[0],
  {
    q: "Waarom staan er vanaf-prijzen en geen vaste bedragen?",
    a: "Omdat geen twee sites hetzelfde zijn. De vanaf-prijzen geven de richting, zodat je weet waar je aan toe bent. Na de kennismaking weet ik genoeg om één vast bedrag te noemen voor het hele traject.",
  },
  {
    q: "Zijn de prijzen inclusief btw?",
    a: "Nee. Alle bedragen op deze pagina zijn exclusief btw. In de offerte en op de factuur staat de btw apart vermeld.",
  },
  {
    q: "Kan ik in termijnen betalen?",
    a: "Hoe en wanneer je betaalt, spreken we af in de offerte. Daar staat ook of er een aanbetaling bij hoort. Je ziet het schema voordat je akkoord geeft.",
  },
  {
    q: "Wat als het meer werk wordt dan gedacht?",
    a: "De vaste prijs geldt voor alles wat in de offerte staat. Wil je onderweg iets erbij, dan krijg je daar eerst een prijs voor en beslis jij of het doorgaat. Ik reken geen uren achteraf.",
  },
  {
    q: "Wat kost een website na de lancering?",
    a: "Dat kies je zelf. Met het onderhoudsabonnement regel ik de hosting en houd ik de site bij, voor één vast bedrag per maand. Zonder abonnement is de site van jou en regel je hosting en onderhoud zelf. Je domeinnaam staat altijd op jouw naam en betaal je zelf.",
  },
  faq[1],
  {
    q: "Kost de kennismaking iets?",
    a: "Nee. De kennismaking duurt een half uur, is gratis en verplicht je tot niets. Daarna krijg je een offerte met wat ik maak, wat het kost en wanneer het ongeveer klaar is.",
  },
];

/* Service (with the three offers) + FAQPage structured data, built like the hub's */
const amount = (from: string) => from.replace(".", "");
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Website, webshop of landingspagina laten maken",
      serviceType: "Webdesign en webdevelopment",
      provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      description: metadata.description,
      offers: tiers.map((t) => ({
        "@type": "Offer",
        name: t.name,
        description: t.body,
        price: amount(t.from),
        priceCurrency: "EUR",
        priceSpecification: { "@type": "PriceSpecification", minPrice: amount(t.from), priceCurrency: "EUR", valueAddedTaxIncluded: false },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: questions.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

/* the tones of the Altijd inbegrepen cards: the label and the line under the title per ground. Wine and blush are
   the same pair as the stacking cards on the homepage (StackCards). */
const copyTones = {
  dark: { label: "text-forest/55", body: "text-forest/70" },
  light: { label: "text-lime", body: "text-cream/80" },
  wine: { label: "text-[#440220]/60", body: "text-[#440220]/80" },
  blush: { label: "text-[#fcbbb9]/70", body: "text-cream/85" },
};

/** The copy of one card in the Altijd inbegrepen bento: a small label, the title and one line. `tone` follows the card's ground. */
function IncludedCopy({ label, item, tone = "dark", className = "" }: { label: string; item: { title: string; body: string }; tone?: keyof typeof copyTones; className?: string }) {
  const t = copyTones[tone];
  return (
    <div className={className}>
      <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${t.label}`}>{label}</p>
      <h3 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight">{item.title}</h3>
      <p className={`mt-2 max-w-sm text-[15px] leading-relaxed ${t.body}`}>{item.body}</p>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Nav theme="photo" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main">
        {/* Hero, built like the homepage one: the question and the answer on the left over a full-width
            photo (the mascot at work with two clients, seen through a window; a generated image,
            /images/prijzen-hero), the nav floating over the top. The left half of the photo is the dark
            window frame, with a forest tint on top to carry the type. On phones the photo would put
            faces under the title, so there it follows the copy as its own block. On desktop the hero is
            720px tall, the same as the case pages (werk/happy-flops), so the copy is kept to what fits. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div className="hero-shade absolute inset-0 -z-10 hidden lg:block" aria-hidden="true" />
          <Container className="flex flex-col justify-center pb-10 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[52%]">
              <Eyebrow tone="light" className="max-w-xl">Prijzen</Eyebrow>
              {/* one line on desktop, set to the given spec: Inter Tight 400 at 88px on a 88px line, the serif
                  word in italic at 92px, in lime. Below 1440px it scales down with the window. */}
              <h1 className="mt-6 t-hero font-normal text-paper md:mt-8 lg:whitespace-nowrap lg:text-[length:min(6.11vw,5.5rem)]! lg:leading-none!">
                Wat kost een <span className="serif-italic text-[1.0455em] text-lime">website?</span>
              </h1>
              {/* set to the given spec: Inter Tight 400, 18px on a 26px line */}
              <p className="mt-6 max-w-lg font-display text-[18px] font-normal leading-[26px] text-paper">
                Een website laten maken heeft bij mij een vaste prijs. Hieronder zie je de vanaf-prijzen per pakket, en na de kennismaking krijg je één bedrag voor
                het hele traject. De doorlooptijd telt vanaf het moment dat teksten, foto&apos;s en toegang binnen zijn.
              </p>

              {/* the button and the quiet link on one line; under them the three reassurances as their own row,
                  each with the frame mark, like the proof line in the homepage hero */}
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#pakketten">Bekijk wat erin zit</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {["Gratis", "30 minuten", "Vrijblijvend"].map((t) => (
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
            <source srcSet="/images/prijzen-hero.webp" type="image/webp" />
            <img
              src="/images/prijzen-hero.jpg"
              alt="De NXT Frame-mascotte werkt op een laptop aan een houten tafel, terwijl twee klanten lachend meekijken, gezien door een raam in warm avondlicht"
              className="aspect-[4/3] w-full object-cover object-[77%_50%] lg:aspect-auto lg:size-full lg:object-[70%_45%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* the three packages, straight under the photo: outer cards white, the middle one forest, as on the homepage */}
        <section id="pakketten" className="scroll-mt-20 bg-cream py-16 text-forest md:pb-32 md:pt-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow className="mx-auto">De pakketten</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Drie pakketten, <span className="serif-italic">één vaste prijs</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">
                Elk pakket bouwt voort op het vorige. De vanaf-prijs geeft de richting, de offerte na de kennismaking het vaste bedrag.
              </p>
            </div>

            <ul className="mt-12 grid items-stretch gap-5 md:mt-16 lg:grid-cols-3">
              {tiers.map((t, i) => {
                const c = tones[i % tones.length];
                return (
                  <li key={t.name} className={t.highlight ? "order-first lg:order-none lg:-my-4" : ""}>
                    <article className={`flex h-full flex-col rounded-[14px] p-6 md:p-8 ${c.card} ${t.highlight ? "lg:pb-12 lg:pt-12" : ""}`}>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${c.pill}`}>
                          <FrameGlyph className="size-2.5" />
                          {t.name}
                        </h3>
                        {t.highlight && <span className={`text-xs font-semibold ${c.muted}`}>Meest gekozen</span>}
                      </div>

                      <p className="mt-8">
                        <span className={`block text-sm ${c.muted}`}>vanaf</span>
                        <span className="block font-display text-5xl font-semibold leading-none tracking-[-0.03em] md:text-6xl">€ {t.from}</span>
                        <span className={`mt-2 block text-sm ${c.muted}`}>exclusief btw</span>
                      </p>
                      <p className={`mt-5 text-base leading-relaxed ${c.muted}`}>{t.body}</p>
                      <p className={`mt-4 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${c.line}`}>
                        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="8" cy="8" r="6.2" /><path d="M8 4.8V8l2.2 1.4" strokeLinecap="round" /></svg>
                        Live in {t.time}
                      </p>

                      <ul className={`mt-7 grid gap-3 border-t pt-6 ${c.line}`}>
                        {t.items.map((it) => (
                          <li key={it} className="flex items-start gap-3 text-[15px] leading-snug">
                            <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${c.check}`} aria-hidden="true">✓</span>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </li>
                );
              })}
            </ul>

            <div className="mt-12 flex flex-col items-center gap-3 text-center md:mt-16">
              <Button variant="dark" className="px-8 py-4 text-base" href="/contact">
                Plan een kennismaking
              </Button>
              <Reassure />
              <p className="mt-2 max-w-md text-[15px] text-forest/70">Twijfel je welke past? In de kennismaking kijken we samen wat jouw site moet doen.</p>
            </div>
          </Container>
        </section>

        {/* the section on what moves the price is parked in components/PriceFactors.tsx: put <PriceFactors />
            back here when it is wanted again */}

        {/* What every project includes, as a bento of six cards after the Clay resource grid: two tall
            cards with the picture on top, a wide one with the picture beside the copy, two with the
            copy over the picture and one plain lime card. On desktop the grid is twelve columns and
            three rows and the cards place themselves in this order. */}
        <section className="bg-cream pb-16 pt-4 text-forest md:pb-32 md:pt-8">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow className="mx-auto">Altijd inbegrepen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Dit zit erin, <span className="serif-italic">welk pakket je ook kiest</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">
                Geen pakketten met sterretjes. Dit is de basis van alles wat ik maak, van één pagina tot een webshop.
              </p>
            </div>

            <MoreOnMobile show={3} label={"Toon alles wat erbij zit"} as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-12 md:gap-5 lg:grid-cols-12 lg:grid-rows-[repeat(3,250px)]">
              {/* tall, picture on top */}
              <li className="flex flex-col overflow-hidden rounded-[14px] bg-[#fcbbb9] text-[#440220] lg:col-span-4 lg:row-span-2">
                <img src="/images/slim-palette.webp" alt="" className="aspect-[4/3] w-full rounded-[14px] object-cover object-[50%_30%] lg:aspect-auto lg:min-h-0 lg:flex-1" loading="lazy" decoding="async" />
                <IncludedCopy label="Ontwerp" item={always[2]} tone="wine" className="p-6 md:p-8" />
              </li>

              {/* wide, picture on the right */}
              <li className="flex flex-col gap-6 rounded-[14px] bg-[#440220] p-6 text-[#fcbbb9] sm:col-span-2 sm:flex-row sm:items-center md:p-8 lg:col-span-8">
                <IncludedCopy label="Samenwerken" item={always[5]} tone="blush" className="flex-1" />
                <img src="/images/slim-choice.webp" alt="" className="aspect-[4/3] w-full rounded-3xl object-cover object-[40%_35%] sm:aspect-square sm:w-[38%] lg:w-auto lg:self-stretch" loading="lazy" decoding="async" />
              </li>

              {/* the copy over the picture */}
              <li className="relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[14px] bg-forest text-cream lg:col-span-4 lg:min-h-0">
                <img src="/images/slim-desk.webp" alt="" className="absolute inset-0 -z-20 size-full object-cover object-[50%_35%]" loading="lazy" decoding="async" />
                <span className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/60 to-transparent" aria-hidden="true" />
                <IncludedCopy label="Snelheid" item={always[0]} tone="light" className="p-6 md:p-8" />
              </li>

              {/* tall, picture on top, on forest */}
              <li className="flex flex-col overflow-hidden rounded-[14px] bg-forest text-cream lg:col-span-4 lg:row-span-2">
                <img src="/images/slim-search.webp" alt="" className="aspect-[4/3] w-full rounded-[14px] object-cover object-[50%_40%] lg:aspect-auto lg:min-h-0 lg:flex-1" loading="lazy" decoding="async" />
                <IncludedCopy label="Vindbaarheid" item={always[1]} tone="light" className="p-6 md:p-8" />
              </li>

              {/* the copy over the picture, again */}
              <li className="relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[14px] bg-[#440220] text-[#fcbbb9] lg:col-span-4 lg:min-h-0">
                <img src="/images/over-mascot.webp" alt="" className="absolute inset-0 -z-20 size-full object-cover object-[40%_40%]" loading="lazy" decoding="async" />
                <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[#440220] via-[#440220]/65 to-transparent" aria-hidden="true" />
                <IncludedCopy label="Beheer" item={always[3]} tone="blush" className="p-6 md:p-8" />
              </li>

              {/* plain lime, with the two search engines the site is signed up with as tiles in the corner */}
              <li className="relative flex min-h-[220px] flex-col justify-end rounded-[14px] bg-lime p-6 md:p-8 lg:col-span-4 lg:min-h-0">
                <span className="absolute right-6 top-6 flex -space-x-2 md:right-8 md:top-8">
                  <span className="grid size-11 place-items-center rounded-full bg-paper ring-2 ring-lime">
                    <img src="/images/logos/google.webp" alt="Google" className="h-5 w-auto" loading="lazy" decoding="async" />
                  </span>
                  <span className="grid size-11 place-items-center rounded-full bg-paper ring-2 ring-lime">
                    <img src="/images/logos/bing.webp" alt="Bing" className="h-5 w-auto" loading="lazy" decoding="async" />
                  </span>
                </span>
                <IncludedCopy label="Lancering" item={always[4]} />
              </li>
            </MoreOnMobile>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-forest/15 pt-8">
              <p className="max-w-2xl text-[15px] leading-relaxed text-forest/70">
                Wat ik niet beloof: een vaste plek in Google of ChatGPT. Die kan niemand garanderen. Wat wel vaststaat, is dat de techniek en de structuur
                kloppen, zodat je site er klaar voor is.
              </p>
              <TextLink href="/aanpak">Bekijk de aanpak</TextLink>
            </div>
          </Container>
        </section>

        {/* after the launch there is one choice: the maintenance subscription (hosting included) or not.
            The monthly amount is still open (see the note at the top). The domain name is a line of
            its own: always in the client's name, paid by the client. */}
        <section data-zone="green" className="bg-forest py-16 text-paper md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow tone="light" className="max-w-xl">Na de lancering</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Daarna kies je: <span className="serif-italic text-lime">met of zonder onderhoud</span>
                </h2>
              </div>
              <p className="max-w-md text-paper/80 t-lead">
                De bouw is een eenmalig bedrag. Daarna is er één keuze: je laat hosting en onderhoud aan mij, of je regelt het zelf.
              </p>
            </div>

            <ul className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-2">
              {after.map((a) => (
                <li key={a.title} className={`flex flex-col rounded-[14px] p-6 md:p-10 ${a.highlight ? "bg-lime text-forest" : "bg-paper/[0.06] text-paper ring-1 ring-paper/15"}`}>
                  <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${a.highlight ? "bg-forest text-lime" : "border border-paper/25 text-paper/80"}`}>
                    {a.label}
                  </span>
                  <h3 className="mt-6 t-sub">{a.title}</h3>
                  <p className={`mt-4 max-w-md text-base leading-relaxed ${a.highlight ? "text-forest/80" : "text-paper/75"}`}>{a.body}</p>
                  <ul className={`mt-7 grid flex-1 content-start gap-3 border-t pt-6 ${a.highlight ? "border-forest/15" : "border-paper/15"}`}>
                    {a.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[15px] leading-snug">
                        <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${a.highlight ? "bg-forest text-lime" : "bg-paper/15 text-paper"}`}>✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-8 border-t pt-5 font-display text-xl font-semibold tracking-tight ${a.highlight ? "border-forest/15" : "border-paper/15"}`}>
                    {a.price ?? <span>[INVULLEN: bedrag onderhoudsabonnement per maand]</span>}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-4 border-t border-paper/15 pt-8 lg:grid-cols-[1fr_2fr] lg:gap-20">
              <h3 className="font-display text-xl font-semibold tracking-tight">En je domeinnaam?</h3>
              <p className="max-w-2xl text-[15px] leading-relaxed text-paper/75">
                Die staat altijd op jouw naam en betaal je zelf, rechtstreeks aan de aanbieder. Zo blijft je adres van jou, wat er ook gebeurt. Ik regel de
                aanvraag en de instellingen voor je. Heb je al een domeinnaam, dan gebruik je die gewoon verder.
              </p>
            </div>
          </Container>
        </section>

        {/* the comparison with an agency, a freelancer and an AI site builder, as it is */}
        <Comparison />

        {/* the price questions, also FAQPage structured data (see jsonLd) */}
        <section className="bg-cream pb-16 pt-4 text-forest md:pb-32 md:pt-8">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Vragen over <span className="serif-italic">prijs en betalen</span>
              </h2>
              <p className="mt-6 max-w-md text-forest/75 t-lead">Staat je vraag er niet bij? Stel hem in de kennismaking, of mail me.</p>
              <TextLink href="mailto:hallo@nxtframe.ai" className="mt-8">hallo@nxtframe.ai</TextLink>
            </div>
            <FaqList items={questions} />
          </Container>
        </section>
      </main>
      {/* the footer closes with the main action: "Plan een kennismaking" */}
      <Footer />
    </>
  );
}
