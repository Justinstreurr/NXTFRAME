import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaqList, Work } from "@/components/Sections";
import { ArrowIcon, Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { FrameGlyph } from "@/components/Logo";
import BranchIcon, { type IconKey } from "@/components/BranchIcons";
import { tiers } from "@/components/pricing";
import { faq } from "@/components/faq";

/**
 * Diensten: the overview of everything NXT Frame does. A row of pills jumps to each service; every
 * service is a block with a photo, what it is, what you get and (where there is one) the starting
 * price and lead time. The anchors (#webshop, #redesign, #vindbaarheid, ...) are the ones the
 * homepage wheel and the menu link to, until a service gets a page of its own; then its block
 * links there. The footer carries the closing call to action.
 */
export const metadata: Metadata = {
  title: "Diensten | Website, webshop, redesign en vindbaarheid | NXT Frame",
  description:
    "Een nieuwe website, webshop of landingspagina, een redesign, vindbaar worden in Google en ChatGPT, onderhoud en teksten. Alles van één maker, met vaste prijzen vooraf.",
  alternates: { canonical: "/diensten" },
};

const tier = (name: string) => tiers.find((t) => t.name === name);

type Service = {
  id: string;
  icon: IconKey;
  title: string;
  lead: string;
  items: string[];
  img: string;
  pos?: string;
  /** a cut-out photo (transparent ground): shown whole on the card colour instead of cropped */
  contain?: boolean;
  alt: string;
  /** the starting price and lead time, for the services with a tier in pricing.ts */
  price?: { from: string; time: string };
  link?: { href: string; label: string };
};

/* DRAFT COPY: the services and what each includes, for Justin to check */
const list: Service[] = [
  {
    id: "website", icon: "layout", title: "Nieuwe website",
    lead: "De complete site voor een bedrijf dat gevonden wil worden en aanvragen wil. Van strategie en structuur tot ontwerp, bouw en lancering.",
    items: ["Strategie en sitestructuur", "Ontwerp op maat, geen template", "Gebouwd op moderne techniek", "Ingericht op Google en AI", "Zelf te beheren"],
    img: "/images/advies-hero-laptop.webp", pos: "75% 50%", alt: "Een laptop op een groene bank met de website van Hypotheekhaven",
    price: tier("Website") && { from: tier("Website")!.from, time: tier("Website")!.time },
    link: { href: "/website-laten-maken", label: "Alles over een website laten maken" },
  },
  {
    id: "webshop", icon: "cart", title: "Webshop",
    lead: "Duidelijke productpagina's en een checkout waarin afrekenen makkelijk gaat. Snel op een telefoon, want daar wordt het meest besteld.",
    items: ["Productpagina's en categorieën", "Checkout en betaalmethoden", "Koppeling met voorraad of boekhouding", "Snel op mobiel"],
    img: "/images/happyflops-laptop-hands.webp", pos: "50% 100%", contain: true, alt: "Handen op een laptop met de webshop van Happy Flops",
    price: tier("Webshop") && { from: tier("Webshop")!.from, time: tier("Webshop")!.time },
    link: { href: "/webshop-laten-maken", label: "Alles over een webshop laten maken" },
  },
  {
    id: "landingspaginas", icon: "grid", title: "Landingspagina's",
    lead: "Eén pagina, één doel. Voor een campagne, een dienst of een branche, en gericht op die ene stap die je bezoeker moet zetten.",
    items: ["Strategie en tekststructuur", "Ontwerp op maat", "Formulier of afsprakenplanner", "Ingericht op één zoekvraag"],
    img: "/images/advies-hero.webp", pos: "50% 50%", alt: "Een landingspagina van Hypotheekhaven op een telefoon",
    price: tier("Landingspagina") && { from: tier("Landingspagina")!.from, time: tier("Landingspagina")!.time },
    link: { href: "/landingspagina-laten-maken", label: "Alles over een landingspagina laten maken" },
  },
  {
    id: "redesign", icon: "sparkle", title: "Redesign",
    lead: "Je huidige site opnieuw ontworpen en gebouwd op moderne techniek. Met oude adressen netjes doorgestuurd, zodat je zo min mogelijk van je opgebouwde vindbaarheid verliest.",
    items: ["Analyse van je huidige site", "Nieuw ontwerp en nieuwe techniek", "Oude adressen netjes doorgestuurd", "Teksten en structuur verbeterd"],
    img: "/images/andere-tijd.webp", pos: "50% 40%", alt: "De NXT Frame-mascotte krabt zich achter het hoofd voor een ouderwetse website op een oude computer",
    link: { href: "/website-redesign", label: "Alles over een redesign" },
  },
  {
    id: "vindbaarheid", icon: "search", title: "Vindbaar in Google en AI",
    lead: "Structuur, content en techniek waarmee je beter gevonden wordt op de vragen van je klant, in Google en in ChatGPT en andere AI-zoekmachines.",
    items: ["Zoekvragen van je klanten in kaart", "Pagina's per dienst en per vraag", "Gestructureerde gegevens voor Google en AI", "Aangemeld bij Google en Bing"],
    img: "/images/slim-search.webp", pos: "48% 50%", alt: "Een zoekbalk met de vraag waar een klant naar zoekt",
    link: { href: "/vindbaar-in-google-en-chatgpt", label: "Alles over vindbaar worden" },
  },
  {
    id: "onderhoud", icon: "refresh", title: "Onderhoud en doorontwikkeling",
    lead: "Na de lancering gaat het door. Nieuwe pagina's, verbeteringen op basis van wat bezoekers doen, en techniek en snelheid die op peil blijven.",
    items: ["Updates en beveiliging", "Snelheid en vindbaarheid gemeten", "Nieuwe pagina's en campagnes", "Eén vast aanspreekpunt"],
    img: "/images/slim-desk.webp", pos: "50% 18%", alt: "Een bureau met een laptop in de ochtendzon",
    link: { href: "/website-onderhoud", label: "Alles over onderhoud" },
  },
  {
    id: "content", icon: "pen", title: "Teksten en content",
    lead: "Duidelijke teksten die bezoekers en zoekmachines begrijpen, en die uitnodigen tot de volgende stap. Heb je ze al, dan maak ik ze scherper.",
    items: ["Teksten per pagina, rond één doel", "Geschreven op de zoekvragen van je klant", "Kopjes en knoppen die uitnodigen", "Samen afgestemd op jouw toon"],
    img: "/images/slim-palette.webp", pos: "42% 50%", alt: "Kleurstalen en schetsen voor een ontwerp op een tafel",
    link: { href: "/website-teksten", label: "Alles over teksten laten schrijven" },
  },
];

/* the colours of the service cards, in turn: forest, lime, wine, blush, paper (the pairs of the
   stacking cards on the homepage). `tick` is the round check, `line` the hairline above the price. */
const tones = [
  { card: "bg-forest text-paper", muted: "text-paper/75", tick: "bg-lime text-forest", line: "border-paper/15" },
  { card: "bg-lime text-forest", muted: "text-forest/75", tick: "bg-forest text-lime", line: "border-forest/15" },
  { card: "bg-[#440220] text-[#fcbbb9]", muted: "text-cream/80", tick: "bg-[#fcbbb9] text-[#440220]", line: "border-[#fcbbb9]/20" },
  { card: "bg-[#fcbbb9] text-[#440220]", muted: "text-[#440220]/80", tick: "bg-[#440220] text-[#fcbbb9]", line: "border-[#440220]/15" },
  { card: "bg-paper text-forest ring-1 ring-forest/10", muted: "text-forest/75", tick: "bg-forest text-lime", line: "border-forest/15" },
];

/* the questions about choosing a service: what it costs, why not a builder, editing yourself, AI, after launch */
const questions = [0, 2, 3, 4, 6].map((i) => faq[i]);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...list.map((s) => ({
      "@type": "Service",
      name: s.title,
      description: s.lead,
      provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      url: `https://nxtframe.ai/diensten#${s.id}`,
      ...(s.price && { offers: { "@type": "Offer", price: s.price.from.replace(".", ""), priceCurrency: "EUR" } }),
    })),
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
        {/* Hero, the frame of the werk, over and aanpak pages (720px on desktop, the nav floating over
            it): the promise on the left over a full-width photo, black from the left to carry the type.
            The photo: a baker in her sunlit shop door holding up her phone with her new bakery site
            (/images/aanpak-hero). On phones the photo follows the copy as its own block. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-12 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[52%]">
              <Eyebrow tone="light" className="max-w-xl">Diensten</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Alles wat je site
                <br />
                <span className="serif-italic text-lime">nodig heeft</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Een nieuwe website of webshop, een redesign, vindbaarheid in Google en AI, en doorontwikkeling na de lancering. Alles van één maker.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#overzicht">Bekijk de diensten</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {["Vaste prijs vooraf", "Ontwerp én bouw", "Eén aanspreekpunt"].map((t) => (
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
            <source srcSet="/images/aanpak-hero.webp" type="image/webp" />
            <img
              src="/images/aanpak-hero.jpg"
              alt="Een bakker met een limegroene schort laat in de deur van haar zonnige bakkerij trots haar nieuwe website op haar telefoon zien"
              className="aspect-[4/3] w-full object-cover object-[70%_40%] lg:aspect-auto lg:size-full lg:object-[70%_35%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* the overview: centred heading and a row of pills that jump to each service */}
        <section id="overzicht" data-zone="cherry" className="scroll-mt-20 bg-cream pb-8 pt-16 text-forest md:pt-32">
          <Container className="text-center">
            <Eyebrow className="mx-auto w-fit">Wat ik doe</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-4xl t-section md:mt-8">
              Zeven diensten, <span className="serif-italic">één doel</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">
              Een site die gevonden wordt en verkoopt. Kies wat je nodig hebt, of begin bij de kennismaking en we bepalen het samen.
            </p>
            <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
              {list.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-forest/20 px-5 py-2.5 text-[15px] font-medium transition-colors hover:border-forest hover:bg-forest hover:text-paper"
                  >
                    <BranchIcon name={s.icon} className="size-4" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* the services, one big card each in the brand colours (the set of the stacking cards on the
            homepage): the photo fills one half and switches sides, the copy with ticks in the other */}
        <section data-zone="cherry" className="bg-cream pb-12 pt-8 text-forest md:pb-32 md:pt-12">
          <Container>
            {/* lg:auto-rows-fr: every row as tall as the tallest card, so all seven cards are the same
                size. The copy sets that height; the photo only fills its half (absolutely placed), so a
                portrait photo can never stretch a card. */}
            <ol className="grid gap-6 md:gap-8 lg:auto-rows-fr">
              {list.map((s, i) => {
                const t = tones[i % tones.length];
                return (
                  <li key={s.id} id={s.id} className="scroll-mt-24">
                    <article className={`grid h-full overflow-hidden rounded-3xl lg:grid-cols-2 ${t.card}`}>
                      <div className={`relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-auto ${i % 2 ? "lg:order-last" : ""}`}>
                        <img
                          src={s.img}
                          alt={s.alt}
                          className={`absolute inset-0 size-full ${s.contain ? "object-contain px-6 pt-8 md:px-10 md:pt-12" : "object-cover"}`}
                          style={{ objectPosition: s.pos }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="flex flex-col p-8 md:p-12 lg:p-14">
                        <p className="flex items-center gap-3 text-[15px] font-medium">
                          <span className="grid h-10 w-14 place-items-center rounded-full border border-current font-display text-base font-semibold italic">
                            {i + 1}
                          </span>
                          <BranchIcon name={s.icon} className="size-5" />
                        </p>
                        <h2 className="mt-8 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.03em]">{s.title}</h2>
                        <p className={`mt-5 max-w-xl text-base leading-relaxed md:text-lg ${t.muted}`}>{s.lead}</p>
                        <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:mb-12">
                          {s.items.map((it) => (
                            <li key={it} className="flex items-start gap-3 text-[15px] leading-snug">
                              <span className={`grid size-6 shrink-0 place-items-center rounded-full ${t.tick}`}>
                                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true"><path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              </span>
                              {it}
                            </li>
                          ))}
                        </ul>
                        {(s.price || s.link) && (
                          // pushed to the bottom of the card on wide screens, so prices line up with the photo's edge
                          <div className={`mt-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t pt-6 lg:mt-auto ${t.line}`}>
                            {s.price && (
                              <p>
                                <span className="block font-serif text-4xl leading-none md:text-5xl">vanaf € {s.price.from}</span>
                                <span className={`mt-2 block text-sm ${t.muted}`}>exclusief btw · live in {s.price.time}</span>
                              </p>
                            )}
                            {s.link && (
                              <a href={s.link.href} className="group inline-flex items-center gap-2 border-b border-current/40 pb-0.5 text-[15px] font-semibold transition-colors hover:border-current">
                                {s.link.label}
                                <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>

        {/* the proof */}
        <Work turnDark={false} />

        {/* the questions about choosing, laid out like the homepage FAQ */}
        <section className="bg-cream pb-12 pt-8 text-forest md:pb-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Welke dienst <span className="serif-italic">past bij jou?</span>
              </h2>
              <p className="mt-6 max-w-md text-forest/75 t-lead">Twijfel je? In een kennismaking van een half uur bepalen we samen wat zin heeft.</p>
            </div>
            <FaqList items={questions} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
