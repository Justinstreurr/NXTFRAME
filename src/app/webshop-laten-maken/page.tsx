import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CountUp from "@/components/CountUp";
import { FaqList, Platform, type PathStep } from "@/components/Sections";
import StackCards, { type StackCard } from "@/components/StackCards";
import { ArrowIcon, Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { FrameCorners, FrameGlyph } from "@/components/Logo";
import { CodeIcon, LaunchIcon, MapIcon, PenIcon, TalkIcon } from "@/components/StepIcons";
import { webshop } from "@/components/pricing";
import { faq } from "@/components/faq";

/**
 * Webshop laten maken: the service page for the search "webshop laten maken". Order follows what a
 * small shop owner wants to know: where a shop loses sales (stacking cards), what a shop from me
 * includes (three big cards in the brand colours), the proof (Happy Flops), what it costs and what
 * comes on top, how the project runs (the zigzag steps), and the questions. The footer carries the
 * closing call to action, so there is no lime band. Price and lead time come from the Webshop tier
 * in pricing.ts (the Uitgebreid tier, under the name Webshop). It is also the webshops branch page.
 *
 * DRAFT COPY: everything on this page is a first version for Justin to check.
 */
export const metadata: Metadata = {
  title: "Webshop laten maken | Snel op mobiel, vindbaar in Google en AI | NXT Frame",
  description:
    "Een webshop laten maken die verkoopt: snelle productpagina's, een korte checkout met iDEAL en producten die je zelf beheert. Ontworpen en gebouwd door één maker, voor een vaste prijs.",
  alternates: { canonical: "/webshop-laten-maken" },
};

const shop = webshop;

/* the round check of the /aanpak table and the /diensten cards; colours per ground */
function Tick({ className = "bg-forest text-lime" }: { className?: string }) {
  return (
    <span className={`grid size-6 shrink-0 place-items-center rounded-full ${className}`}>
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true"><path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

/* where a small shop loses its sales, as stacking cards (lime, wine, blush, lime) */
const leaks: StackCard[] = [
  {
    label: "Snelheid", img: "/images/traag-mobiel.webp", pos: "58% 50%",
    title: <>Je shop laadt <span className="serif-italic">traag op een telefoon</span></>,
    body: "Het meeste bezoek komt van een telefoon, vaak onderweg. Wie moet wachten, klikt weg. Een zware shop met veel apps en plugins voelt dat als eerste.",
    cta: "Zo bouw ik snelle shops", href: "#wat-je-krijgt",
  },
  {
    label: "Checkout", img: "/images/happyflops-phones.jpg", pos: "65% 50%",
    title: <>Klanten haken af <span className="serif-italic">in de checkout</span></>,
    body: "Een verplicht account, verzendkosten die pas in de laatste stap verschijnen of een betaalmethode die ontbreekt. De klant was al overtuigd en bestelt alsnog niet.",
    cta: "Bekijk wat erin zit", href: "#wat-je-krijgt",
  },
  {
    label: "Vindbaarheid", img: "/images/herkenbaar-2.webp", pos: "50% 28%",
    title: <>Al je omzet komt <span className="serif-italic">uit advertenties</span></>,
    body: "Zet je de advertenties uit, dan stopt de omzet. Je producten en categorieën worden zelf niet gevonden, in Google niet en in ChatGPT niet.",
    cta: "Vindbaar in Google en AI", href: "/vindbaar-in-google-en-chatgpt",
  },
  {
    label: "Handwerk", img: "/images/slim-desk.webp", pos: "50% 18%",
    title: <>Elke bestelling <span className="serif-italic">is handwerk</span></>,
    body: "Orders overtypen in je boekhouding, verzendlabels los aanmaken, voorraad bijhouden in een lijstje. Tijd die je liever in je producten steekt.",
    cta: "Bekijk de koppelingen", href: "#wat-je-krijgt",
  },
];

/* what a webshop from me includes: three big cards, each with its ticks. Payment methods,
   carriers and accounting packages are the ones the webshops branch names in menuData. */
const parts = [
  {
    label: "Verkopen",
    title: <>Productpagina&apos;s <span className="serif-italic">die overtuigen</span></>,
    body: "Elke productpagina beantwoordt de vragen die een klant heeft voordat hij bestelt, en laadt snel op een telefoon.",
    items: ["Duidelijke foto's en keuzes", "Voorraad en levertijd in beeld", "Reviews op de plek waar de twijfel zit", "Categorieën en filters die kloppen"],
    tone: { card: "bg-lime text-forest", muted: "text-forest/75", tick: "bg-forest text-lime" },
  },
  {
    label: "Afrekenen",
    title: <>Een checkout <span className="serif-italic">zonder omwegen</span></>,
    body: "Afrekenen moet net zo vertrouwd voelen als in de winkel. Zo min mogelijk stappen, en geen verrassingen aan het eind.",
    items: ["Bestellen zonder verplicht account", "Verzendkosten vooraf duidelijk", "iDEAL, Bancontact en Apple Pay", "Gemaakt voor een duim op een telefoon"],
    tone: { card: "bg-[#fcbbb9] text-[#440220]", muted: "text-[#440220]/80", tick: "bg-[#440220] text-[#fcbbb9]" },
  },
  {
    label: "Beheren",
    title: <>Zelf beheren, <span className="serif-italic">slim gekoppeld</span></>,
    body: "Producten, prijzen en acties pas je zelf aan. Verzending, betalen en boekhouding praten met elkaar, zodat je niets dubbel invoert.",
    items: ["Producten en prijzen zelf aanpassen", "Verzending via Sendcloud of MyParcel", "Betalen via Mollie of Stripe", "Moneybird, Exact of e-Boekhouden"],
    tone: { card: "bg-paper text-forest", muted: "text-forest/75", tick: "bg-forest text-lime" },
  },
];

/* PLACEHOLDERS: the same Happy Flops results as on /website-laten-maken and the case page
   (0,9 s, 100 PageSpeed, +40% bestellingen are not confirmed yet); replace before going live */
const proof: { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }[] = [
  { value: 0.9, decimals: 1, suffix: "s", label: "laadtijd op mobiel" },
  { value: 100, label: "PageSpeed-score" },
  { value: 40, prefix: "+", suffix: "%", label: "meer bestellingen" },
];

/* what the fixed price includes, and what a shop costs on top of it (the notIncluded of the branch page) */
const included = [...shop.items.slice(1), "Ontwerp op maat, geen template", "Snel op elke telefoon", "Klaar voor Google en AI-zoekmachines", "Je bestaande producten overgezet"];
const extra = [
  { title: "Je shopplatform", body: "Het abonnement van bijvoorbeeld Shopify, per maand, rechtstreeks bij het platform." },
  { title: "Transactiekosten", body: "Een klein bedrag per betaling, bij je betaalprovider. Hoeveel hangt af van de provider en de betaalmethode." },
  { title: "Hosting en onderhoud", body: "Na de lancering, als je dat wilt: updates, snelheid en nieuwe pagina's per maand." },
];

/* the steps of a webshop project on the zigzag path */
const steps: PathStep[] = [
  { title: "Kennismaking", body: "Een half uur over je producten, je klanten en het platform waar je shop nu op draait. Daarna krijg je één vaste prijs.", Icon: TalkIcon },
  { title: "Plan en productstructuur", body: "Welke categorieën, filters en productpagina's er komen, welk platform past en welke koppelingen nodig zijn.", Icon: MapIcon },
  { title: "Ontwerp", body: "Productpagina, categorie en checkout eerst op een telefoon ontworpen, daarna op desktop. Jij kijkt mee in overzichtelijke rondes.", Icon: PenIcon },
  { title: "Bouw en producten overzetten", body: "De shop gebouwd en gekoppeld, je producten overgezet en testbestellingen gedaan met elke betaalmethode.", Icon: CodeIcon },
  { title: "Lancering", body: "Elke oude pagina verwijst door naar de nieuwe, zodat wat je in Google hebt opgebouwd meeverhuist. Daarna meten en verbeteren.", Icon: LaunchIcon },
];

/* webshop questions, plus two from the shared FAQ (vindbaar in ChatGPT, na de lancering) */
const questions = [
  {
    q: "Wat kost een webshop laten maken?",
    a: `Een webshop begint bij mij vanaf € ${shop.from} exclusief btw. Daarin zitten ontwerp, bouw, productpagina's, de checkout met betaalmethoden en de koppeling met je voorraad of boekhouding. Los daarvan betaal je het abonnement van je shopplatform en transactiekosten per betaling. Na de kennismaking krijg je één vaste prijs.`,
  },
  {
    q: "Hoe lang duurt het om een webshop te laten maken?",
    a: `Een webshop staat in ${shop.time} live, gerekend vanaf het moment dat je producten, foto's en de toegang tot je systemen binnen zijn. Daarna hangt het vooral af van het aantal koppelingen en hoe snel feedback binnenkomt.`,
  },
  {
    q: "Werk je met Shopify, WooCommerce of maatwerk?",
    a: "Met alle drie. De keuze hangt af van je aantal producten en hoe bijzonder je verkoopproces is. Shopify voor gemak en betrouwbaarheid, WooCommerce als je al in WordPress zit, maatwerk als snelheid en een eigen flow het verschil maken. Ik kies wat jou het minste werk kost, niet wat mij het beste uitkomt.",
  },
  {
    q: "Welke betaalmethoden kan ik aanbieden?",
    a: "De betaalmethoden die jouw klant verwacht, zoals iDEAL, Bancontact, Apple Pay en creditcard. Dat loopt via een betaalprovider zoals Mollie of Stripe, of via de betaaloplossing van je platform. Welke het beste past, bespreken we in de kennismaking.",
  },
  {
    q: "Kan ik zelf producten toevoegen en prijzen wijzigen?",
    a: "Ja, dat beheer je volledig zelf, net als acties en voorraad. Bij de oplevering krijg je uitleg, zodat je niet voor elke prijswijziging hoeft te bellen.",
  },
  {
    q: "Koppelt het met mijn verzending en boekhouding?",
    a: "Ja. Sendcloud, MyParcel, DHL en PostNL voor verzending, Mollie of Stripe voor betalingen, Moneybird, Exact of e-Boekhouden voor je administratie. Bestaat er een koppeling voor je platform, dan richt ik die in.",
  },
  {
    q: "Ik heb al een webshop. Moet alles opnieuw?",
    a: "Niet per se. Laadt je shop traag of verlies je klanten in de checkout, dan kan ik ook alleen dat deel aanpakken, op je huidige platform. Bij een overstap worden producten, foto's en klanten overgezet en blijft de oude shop draaien tot de nieuwe getest en goedgekeurd is.",
  },
  {
    q: "Verlies ik mijn Google-posities als ik overstap?",
    a: "Niet als de overstap goed wordt voorbereid. Elke oude product- en categoriepagina krijgt een doorverwijzing naar zijn nieuwe adres. Een garantie op een plek in Google kan niemand geven, maar zo gaat er niets verloren van wat je al hebt opgebouwd.",
  },
  faq[4],
  faq[6],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Webshop laten maken",
      serviceType: "Webshop ontwerp en development",
      provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      url: "https://nxtframe.ai/webshop-laten-maken",
      description: metadata.description,
      offers: {
        "@type": "Offer",
        name: shop.name,
        price: shop.from!.replace(".", ""),
        priceCurrency: "EUR",
        priceSpecification: { "@type": "PriceSpecification", minPrice: shop.from!.replace(".", ""), priceCurrency: "EUR", valueAddedTaxIncluded: false },
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
            The photo is the baker of the diensten hero (/images/aanpak-hero), until the generated hero (older shop owner packing
            parcels) is in. On phones too the copy sits on the photo, under a shade. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-12 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[50%]">
              <Eyebrow tone="light" className="max-w-xl">Webshop laten maken</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Een webshop
                <br />
                <span className="serif-italic text-lime">die verkoopt</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Snel op een telefoon, met een korte checkout en producten die je zelf beheert. Ik ontwerp en bouw de shop zelf, en je weet vooraf wat het kost.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#prijzen">Bekijk wat het kost</TextLink>
                </div>
                <ul className="mt-6 flex flex-col gap-2 font-display text-[15px] text-paper/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                  {[`Vanaf € ${shop.from}`, `Live in ${shop.time}`, "Met iDEAL en Apple Pay"].map((t) => (
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
            <source srcSet="/images/aanpak-hero.webp" type="image/webp" />
            <img
              src="/images/aanpak-hero.jpg"
              alt="Een bakker met een limegroene schort laat in de deur van haar zonnige bakkerij trots haar webshop op haar telefoon zien"
              className="size-full object-cover object-[70%_40%] lg:object-[70%_35%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* where a shop loses its sales: the stacking cards of the homepage and the over page */}
        <section data-zone="cherry" className="bg-cream py-12 text-forest md:py-32">
          <Container>
            <div className="mb-12 grid gap-10 md:mb-20 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Herken je dit?</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Waar een webshop <span className="serif-italic">omzet laat liggen</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-forest/75 md:text-xl">
                De bezoeker wilde iets kopen. Toch komt er geen bestelling. Meestal zit het lek op een van deze vier plekken.
              </p>
            </div>
            <StackCards items={leaks} />
          </Container>
        </section>

        {/* what a shop includes: three big cards in the brand colours, each with its ticks (the cards of /diensten) */}
        <section id="wat-je-krijgt" data-zone="green" className="scroll-mt-20 bg-forest py-12 text-paper md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow tone="light" className="max-w-xl">Wat je krijgt</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Gebouwd om te verkopen, <span className="serif-italic text-lime">niet om te pronken</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                Een mooie shop is de basis. Wat telt is dat een bezoeker vindt wat hij zoekt, overtuigd raakt en zonder gedoe afrekent.
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

        {/* the proof: Happy Flops, the numbers framed like on /website-laten-maken next to the shop on a laptop */}
        <section data-zone="cherry" className="bg-cream py-12 text-forest md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Uit de praktijk</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Happy Flops, <span className="serif-italic">een shop die loopt</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-forest/75 md:text-xl">
                Een slippermerk met een eigen gezicht, eigen fotografie en productpagina&apos;s die op een telefoon net zo goed werken als op een laptop.
              </p>
            </div>
            <article className="mt-12 grid overflow-hidden rounded-3xl bg-[#440220] text-[#fcbbb9] md:mt-16 lg:grid-cols-2">
              <img
                src="/images/happyflops-laptop-hands.webp"
                alt="Handen houden een laptop vast met de webshop van Happy Flops"
                className="aspect-[4/3] size-full bg-paper object-cover lg:aspect-auto lg:min-h-[520px]"
                loading="lazy"
                decoding="async"
              />
              <div className="flex flex-col p-8 md:p-12 lg:p-14">
                <p className="text-[15px] font-medium text-cream/80">Webshop op Shopify · ontwerp, bouw en vindbaarheid</p>
                {/* the numbers step down from left to right, one under the other; side by side where they fit */}
                <dl className="mt-10 grid gap-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {proof.map((s, i) => (
                    <div key={s.label} className={i === 1 ? "text-center" : i === 2 ? "text-right" : ""}>
                      <dt className="relative inline-block px-5 py-3 font-display text-5xl tracking-[-0.04em]">
                        <FrameCorners className="text-[#fcbbb9]" corners="diagonal" inset="inset-0" size="size-5" />
                        <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                      </dt>
                      <dd className="mt-2 text-sm text-cream/70">{s.label}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#fcbbb9]/20 pt-6 lg:mt-auto">
                  <a href="/werk/happy-flops" className="group inline-flex items-center gap-2 border-b border-current/40 pb-0.5 text-[15px] font-semibold transition-colors hover:border-current">
                    Bekijk de case
                    <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
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
                  Eén vaste prijs, <span className="serif-italic text-lime">en geen verrassingen</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                Na de kennismaking krijg je één prijs voor het hele traject. Je ziet ook meteen wat een webshop daarnaast per maand kost, zodat je niets vergeet mee te rekenen.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
              <div className="flex flex-col rounded-3xl bg-lime p-8 text-forest md:p-10">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{shop.name}</h3>
                <p className="mt-6 font-display text-5xl tracking-[-0.04em]">
                  <span className="align-top text-2xl font-normal tracking-normal opacity-60">vanaf </span>€ {shop.from}
                </p>
                <p className="mt-2 text-sm text-forest/65">exclusief btw · live in {shop.time}</p>
                <p className="mt-6 text-base leading-relaxed text-forest/80">{shop.body}</p>
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
              Wil je je huidige shop houden en alleen de snelheid of de checkout verbeteren? Dat kan ook, op je eigen platform. Alle prijzen op een rij staan op <a href="/prijzen" className="border-b border-paper/40 font-semibold text-paper hover:border-paper">de prijzenpagina</a>.
            </p>
          </Container>
        </section>

        {/* how a webshop project runs: the zigzag path, cream */}
        <div id="aanpak" className="scroll-mt-20">
          <Platform
            eyebrow="Zo werkt het"
            title={<>Van eerste gesprek <span className="serif-italic">tot eerste bestelling</span></>}
            intro="Je weet altijd wat ik van je nodig heb en wanneer de shop live gaat. Je hebt één aanspreekpunt, en dat is ook degene die hem ontwerpt en bouwt."
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
                Vragen over <span className="serif-italic">je webshop</span>
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
