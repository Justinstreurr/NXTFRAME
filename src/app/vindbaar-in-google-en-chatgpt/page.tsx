import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MoreOnMobile from "@/components/MoreOnMobile";
import { FaqList, Platform, Work, type PathStep } from "@/components/Sections";
import StackCards, { type StackCard } from "@/components/StackCards";
import { ArrowIcon, Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { FrameGlyph } from "@/components/Logo";
import { CodeIcon, LaunchIcon, MapIcon, PenIcon, TalkIcon } from "@/components/StepIcons";
import Reveal from "@/components/Reveal";
import { faq } from "@/components/faq";

/**
 * Vindbaar in Google en ChatGPT: the service page for "vindbaar worden in Google", "gevonden worden
 * in ChatGPT" and "SEO en AI-zoekmachines". Order: the promise (hero), how I work on it (the zigzag
 * steps), what Google and AI search engines look at (the tick table: one foundation serves both),
 * the honest part (no guaranteed position, as stacking cards), for a new or an existing site (two
 * big cards), the proof and the questions. The footer carries the closing call to action.
 *
 * DRAFT COPY: everything on this page is a first version for Justin to check. No numbers, no client
 * results and no price are claimed here on purpose; the service has no separate price, so the page
 * links to /prijzen and /contact.
 */
export const metadata: Metadata = {
  title: "Vindbaar in Google en ChatGPT | SEO en AI-zoekmachines | NXT Frame",
  description:
    "Beter gevonden worden op de vragen van je klant, in Google en in AI-zoekmachines zoals ChatGPT en Perplexity. Met een kloppende opbouw, heldere teksten en goede techniek, zonder beloftes over plek 1.",
  alternates: { canonical: "/vindbaar-in-google-en-chatgpt" },
};

/* how I work on findability: five steps on the zigzag path (Platform with its own items) */
const steps: PathStep[] = [
  {
    title: "Zoekvragen van je klanten in kaart",
    body: "Waar zoekt je klant op, en welke vragen stelt hij aan Google of ChatGPT voordat hij belt? Die vragen bepalen welke pagina's je site nodig heeft.",
    Icon: TalkIcon,
  },
  {
    title: "Pagina's per dienst en per vraag",
    body: "Eén pagina per dienst, per belangrijke vraag en waar het klopt per regio. Zo is er voor elke zoekvraag één duidelijke pagina die het antwoord geeft.",
    Icon: MapIcon,
  },
  {
    title: "Teksten met heldere antwoorden",
    body: "Het antwoord bovenaan, daarna de uitleg. Korte alinea's, duidelijke kopjes en vragen die je klant echt stelt. Dat leest prettig voor mensen, en zoekmachines kunnen het makkelijk citeren.",
    Icon: PenIcon,
  },
  {
    title: "Techniek die zoekmachines helpt",
    body: "Een snelle site waarvan elke zoekmachine de tekst meteen kan lezen. Met extra gegevens achter de schermen die vertellen wie je bent, wat je doet en waar je zit.",
    Icon: CodeIcon,
  },
  {
    title: "Aanmelden, meten en bijsturen",
    body: "De site aangemeld bij Google en Bing, met een sitemap erbij. Daarna kijk ik wat er gevonden wordt en waar het beter kan.",
    Icon: LaunchIcon,
  },
];

/* what Google and AI search engines look at: one row per point, ticked in both columns. That is
   the point of the table: the same foundation serves both. */
const signals: { title: string; body: string }[] = [
  {
    title: "Een pagina per dienst en per vraag",
    body: "Eén onderwerp per pagina maakt duidelijk waarop die pagina gevonden moet worden.",
  },
  {
    title: "Heldere antwoorden in de tekst",
    body: "AI-zoekmachines halen stukken tekst uit je pagina. Een kort, duidelijk antwoord wordt eerder overgenomen.",
  },
  {
    title: "Tekst die elke zoekmachine kan lezen",
    body: "Sommige sites laden hun tekst pas later in, en niet elke zoekmachine wacht daarop. Staat je tekst er meteen, dan kan elke zoekmachine hem lezen.",
  },
  {
    title: "Gestructureerde gegevens",
    body: "Een vaste, onzichtbare beschrijving van je bedrijf, je diensten en je veelgestelde vragen, zodat zoekmachines niet hoeven te raden.",
  },
  {
    title: "Snelheid op de telefoon",
    body: "Google meet hoe snel en stabiel je pagina's laden. En een trage site verliest bezoekers, waar ze ook vandaan komen.",
  },
  {
    title: "Lokale gegevens die overal kloppen",
    body: "Dezelfde naam, hetzelfde adres en dezelfde contactgegevens op je site en in je Google-bedrijfsprofiel.",
  },
  {
    title: "Aangemeld bij Google én Bing",
    body: "ChatGPT gebruikt bij het zoeken onder meer resultaten van Bing. Wie alleen aan Google denkt, slaat die over.",
  },
];

/* the honest part: what I do not promise, as stacking cards (lime, wine, blush) */
const honest: StackCard[] = [
  {
    label: "Geen garantie", img: "/images/slim-search.webp", pos: "48% 50%",
    title: <>Plek 1 <span className="serif-italic">belooft niemand</span></>,
    body: "Niemand bepaalt wat Google of ChatGPT laat zien, ook ik niet. Wie je een vaste plek garandeert, vertelt je iets dat niet kan. Ik zorg dat je site alles op orde heeft om gevonden te worden.",
    cta: "Plan een kennismaking", href: "/contact",
  },
  {
    label: "Geen trucjes", img: "/images/slim-choice.webp", pos: "50% 40%",
    title: <>Goed werk <span className="serif-italic">in plaats van trucjes</span></>,
    body: "Geen pagina's vol zoekwoorden en geen geheime AI-instelling. Wat helpt, is een site waar je klant echt iets aan heeft.",
    cta: "Bekijk de aanpak", href: "/aanpak",
  },
  {
    label: "Tijd", img: "/images/ladder.jpg", pos: "45% 40%",
    title: <>Vindbaarheid <span className="serif-italic">groeit mee</span></>,
    body: "Een nieuwe pagina staat niet de volgende dag bovenaan. Vindbaarheid bouw je op, met elke pagina en elke vraag die je beantwoordt. Daarom hoort het bij doorontwikkeling na de lancering.",
    cta: "Bekijk de prijzen", href: "/prijzen",
  },
];

/* for a new site or an existing one: two big cards in the brand colours, like the services on /diensten */
const routes = [
  {
    title: "Bij een nieuwe website",
    lead: "Vindbaarheid zit in elke site die ik bouw, vanaf de eerste schets. Het hoort bij de structuur, de teksten en de techniek, niet bij een los pakket achteraf.",
    items: ["Zoekvragen in de strategie", "Pagina's per dienst en vraag", "Gestructureerde gegevens", "Aangemeld bij Google en Bing"],
    link: { href: "/website-laten-maken", label: "Alles over een website laten maken" },
    tone: { card: "bg-forest text-paper", muted: "text-paper/75", tick: "bg-lime text-forest", line: "border-paper/15" },
  },
  {
    title: "Voor je bestaande site",
    lead: "Heb je al een site, maar word je niet gevonden? Dan kijk ik wat er ontbreekt en wat er beter kan. Soms is dat een paar pagina's, soms is een redesign slimmer. Dat hoor je eerlijk.",
    items: ["Analyse van je huidige site", "Ontbrekende pagina's en vragen", "Techniek en gegevens op orde", "Een plan met prioriteiten"],
    link: { href: "/contact", label: "Laat je site bekijken" },
    tone: { card: "bg-lime text-forest", muted: "text-forest/75", tick: "bg-forest text-lime", line: "border-forest/15" },
  },
];

/* the round check of the tables on /aanpak and /diensten, ticked off as the table scrolls in */
function Tick({ delay = 0, tone = "bg-forest text-lime" }: { delay?: number; tone?: string }) {
  return (
    <span style={{ "--d": `${delay}ms` } as React.CSSProperties} className={`score grid size-7 shrink-0 place-items-center rounded-full ${tone}`}>
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true"><path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span className="sr-only">telt mee</span>
    </span>
  );
}

/* the questions: the existing "vindbaar in ChatGPT" answer, plus the ones specific to this page */
const questions = [
  faq[4],
  {
    q: "Kun je garanderen dat ik bovenaan kom in Google of ChatGPT?",
    a: "Nee, en dat kan niemand. Google en AI-zoekmachines bepalen zelf wat ze laten zien, en dat verandert steeds. Wat ik wel doe: zorgen dat je site alles op orde heeft om gevonden te worden, met de juiste pagina's, heldere antwoorden en techniek die klopt.",
  },
  {
    q: "Wat is het verschil tussen SEO en vindbaar zijn in AI-zoekmachines?",
    a: "Er is veel overlap. Bij SEO gaat het om gevonden worden in de zoekresultaten van Google. AI-zoekmachines zoals ChatGPT en Perplexity geven een antwoord en noemen daarbij bronnen. Voor allebei heb je duidelijke pagina's, goede antwoorden en een site nodig die zoekmachines goed kunnen lezen. De basis is dus grotendeels dezelfde.",
  },
  {
    q: "Hoe lang duurt het voordat ik gevonden word?",
    a: "Dat verschilt per branche, per regio en per zoekvraag, dus een vaste termijn noem ik niet. Een nieuwe site moet eerst ontdekt en gelezen worden, en vindbaarheid bouw je daarna op met elke pagina die een vraag van je klant beantwoordt.",
  },
  {
    q: "Kun je ook mijn bestaande website beter vindbaar maken?",
    a: "Ja. Ik kijk wat er ontbreekt: pagina's, antwoorden, techniek of gegevens. Soms is dat met aanvullingen op te lossen, soms is een redesign de betere keuze. Na de kennismaking weet je wat het is en wat het kost.",
  },
  {
    q: "Wat kost het?",
    a: "Bij een nieuwe website zit het werk aan vindbaarheid er gewoon in. Voor een bestaande site hangt het af van wat er nodig is. Op de prijzenpagina zie je waar je ongeveer aan moet denken, en na de kennismaking krijg je een vaste prijs.",
  },
  faq[6],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Vindbaar in Google en ChatGPT",
      serviceType: "Zoekmachineoptimalisatie en vindbaarheid in AI-zoekmachines",
      description: metadata.description,
      provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      url: "https://nxtframe.ai/vindbaar-in-google-en-chatgpt",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Wat er bij vindbaarheid hoort",
        itemListElement: steps.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.body } })),
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
            TEMPORARY photo: the mascot on a chair on a sunny hilltop (/images/hero-hill-v1, unused
            elsewhere), until the generated photo for this page is in. On phones the photo follows the
            copy as its own block. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.66)_0%,rgb(0_0_0/0.52)_28%,rgb(0_0_0/0.2)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-16 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[52%]">
              <Eyebrow tone="light" className="max-w-xl">Vindbaar in Google en AI</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Gevonden worden
                <br />
                <span className="serif-italic text-lime">waar je klant zoekt</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                In Google, en steeds vaker in ChatGPT en andere AI-zoekmachines. Ik zorg voor de structuur, de teksten en de techniek waarmee je site daar een goede kans maakt om genoemd te worden.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#zo-werkt-het">Zo pak ik het aan</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {["Google én AI-zoekmachines", "Nieuwe of bestaande site", "Geen beloftes over plek 1"].map((t) => (
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
            <source srcSet="/images/hero-hill-v1.webp" type="image/webp" />
            <img
              src="/images/hero-hill-v1.jpg"
              alt="De NXT Frame-mascotte zit met een laptop op een stoel boven op een zonnige heuvel vol bloemen"
              className="aspect-[4/3] w-full object-cover object-[68%_50%] lg:aspect-auto lg:size-full lg:object-[70%_50%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* how I work on it: the zigzag path with this page's five steps, cream like on /aanpak */}
        <div id="zo-werkt-het" className="scroll-mt-20">
          <Platform
            eyebrow="Zo werkt het"
            title={<>Van zoekvraag <span className="serif-italic">tot gevonden pagina</span></>}
            intro="Vindbaarheid is geen knop die je aanzet. Het zit in hoe je site in elkaar zit: welke pagina's er zijn, wat erop staat en hoe hij gebouwd is."
            items={steps}
            action={null}
            tone="cream"
          />
        </div>

        {/* what Google and AI search engines look at, on the forest ground: the tick table of /aanpak.
            Phones get one card per point; wider screens the table with a blush and a paper column. */}
        <section data-zone="green" className="bg-forest py-16 text-paper md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow tone="light" className="max-w-xl">Google en AI</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Eén goede basis, <span className="serif-italic text-lime">voor allebei</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                Google toont een lijst met resultaten, ChatGPT en Perplexity geven een antwoord met bronnen. Wat ze van je site nodig hebben, is grotendeels hetzelfde.
              </p>
            </div>

            <MoreOnMobile show={3} label={"Toon alle signalen"} as="ol" className="mt-12 space-y-4 md:hidden">
              {signals.map((s) => (
                <li key={s.title} className="overflow-hidden rounded-3xl bg-paper text-forest">
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-forest/75">{s.body}</p>
                  </div>
                  <div className="grid grid-cols-2 bg-[#fcbbb9] text-[#440220]">
                    <p className="flex min-w-0 items-center gap-2 px-4 py-4 text-[15px] font-medium sm:gap-3 sm:px-6">
                      <Tick tone="bg-[#440220] text-[#fcbbb9]" />
                      Google
                    </p>
                    <p className="flex min-w-0 items-center gap-2 px-4 py-4 text-[15px] font-medium sm:gap-3 sm:px-6">
                      <Tick tone="bg-[#440220] text-[#fcbbb9]" />
                      <span className="sm:hidden">AI-zoeken</span>
                      <span className="hidden sm:inline">AI-zoekmachines</span>
                    </p>
                  </div>
                </li>
              ))}
            </MoreOnMobile>

            <Reveal threshold={0.2} className="cmp mt-16 hidden md:block">
              <table className="w-full border-separate border-spacing-x-3 border-spacing-y-0 text-left">
                <thead>
                  <tr>
                    <th className="w-[52%] pb-4" />
                    <th className="rounded-t-3xl bg-[#fcbbb9] px-6 pb-4 pt-8 text-center align-top font-display text-xl font-semibold tracking-tight text-[#440220]">
                      <Logo src="/images/logos/google.webp" />
                      Google
                    </th>
                    <th className="rounded-t-3xl bg-paper px-6 pb-4 pt-8 text-center align-top font-display text-xl font-semibold tracking-tight text-forest">
                      <Logo src="/images/logos/chatgpt.webp" />
                      ChatGPT en andere AI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {signals.map((s, i) => {
                    const last = i === signals.length - 1;
                    return (
                      <tr key={s.title}>
                        <th scope="row" className={`py-6 pr-6 align-top font-normal ${last ? "" : "border-b border-paper/15"}`}>
                          <span className="block font-display text-xl font-semibold tracking-tight lg:text-2xl">{s.title}</span>
                          <span className="mt-2 block max-w-xl text-[15px] leading-relaxed text-paper/70">{s.body}</span>
                        </th>
                        <td className={`bg-[#fcbbb9] px-6 py-6 align-middle text-[#440220] ${last ? "rounded-b-3xl pb-8" : ""}`}>
                          <span className={`flex justify-center ${last ? "" : "border-b border-[#440220]/15 pb-6"}`}>
                            <Tick delay={i * 120} tone="bg-[#440220] text-[#fcbbb9]" />
                          </span>
                        </td>
                        <td className={`bg-paper px-6 py-6 align-middle text-forest ${last ? "rounded-b-3xl pb-8" : ""}`}>
                          <span className={`flex justify-center ${last ? "" : "border-b border-forest/10 pb-6"}`}>
                            <Tick delay={i * 120 + 60} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Reveal>
            <p className="mx-auto mt-12 max-w-2xl text-center text-[15px] leading-relaxed text-paper/70">
              Hoe zoekmachines precies kiezen, maken ze niet bekend, en het verandert steeds. Daarom bouw ik op wat al jaren telt: een site die je klant helpt en die elke zoekmachine goed kan lezen.
            </p>
          </Container>
        </section>

        {/* the honest part: no guaranteed position, as stacking cards like "Waar ik voor sta" on /over */}
        <section data-zone="cherry" className="bg-cream py-16 text-forest md:py-32">
          <Container className="text-center">
            <Eyebrow className="mx-auto w-fit">Eerlijk is eerlijk</Eyebrow>
            <h2 className="mt-6 t-section md:mt-8">
              Wat ik <span className="serif-italic">niet beloof</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">
              Over vindbaarheid wordt veel beloofd. Dit is wat je wel en niet van mij kunt verwachten.
            </p>
          </Container>
          <Container className="mt-12 md:mt-16">
            <StackCards items={honest} />
          </Container>
        </section>

        {/* for a new or an existing site: two big cards in the brand colours, the build of /diensten */}
        <section data-zone="cherry" className="bg-cream pb-16 text-forest md:pb-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Voor wie</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Nieuwe site <span className="serif-italic">of bestaande site</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-forest/75 md:text-xl">
                Vindbaarheid is geen los product. Het zit in elke site die ik bouw, en ik kan het ook voor je huidige site oppakken.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-2 lg:gap-8">
              {routes.map((r, i) => (
                <article key={r.title} className={`flex flex-col rounded-3xl p-8 md:p-12 ${r.tone.card}`}>
                  <span className="grid h-10 w-14 place-items-center rounded-full border border-current font-display text-base font-semibold italic">
                    {i + 1}
                  </span>
                  <h3 className="mt-8 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.03em]">{r.title}</h3>
                  <p className={`mt-5 max-w-xl text-base leading-relaxed md:text-lg ${r.tone.muted}`}>{r.lead}</p>
                  <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {r.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[15px] leading-snug">
                        <span className={`grid size-6 shrink-0 place-items-center rounded-full ${r.tone.tick}`}>
                          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true"><path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t pt-6 lg:mt-auto ${r.tone.line}`}>
                    <a href={r.link.href} className="group inline-flex items-center gap-2 border-b border-current/40 pb-0.5 text-[15px] font-semibold transition-colors hover:border-current">
                      {r.link.label}
                      <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <a href="/prijzen" className={`text-[15px] underline underline-offset-4 decoration-current/30 hover:decoration-current ${r.tone.muted}`}>
                      Bekijk de prijzen
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* the proof: sites built this way */}
        <Work turnDark={false} />

        {/* the questions about findability, laid out like the homepage FAQ */}
        <section className="bg-cream pb-16 pt-8 text-forest md:pb-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Vragen over <span className="serif-italic">vindbaarheid</span>
              </h2>
              <p className="mt-6 max-w-md text-forest/75 t-lead">Staat je vraag er niet bij? In een kennismaking van een half uur kijken we samen naar je site.</p>
            </div>
            <FaqList items={questions} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* the brand mark above a column of the Google / AI table: the logo on a white disc, so the ChatGPT
   mark (on white, no transparency) and the Google G sit the same way on blush and on paper */
function Logo({ src }: { src: string }) {
  return (
    <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-white shadow-[0_6px_18px_-8px_rgb(0_0_0/0.35)]" aria-hidden="true">
      <img src={src} alt="" className="size-8 object-contain" loading="lazy" decoding="async" />
    </span>
  );
}
