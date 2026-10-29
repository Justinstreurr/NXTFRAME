import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaqList, Platform, Work, type PathStep } from "@/components/Sections";
import StackCards, { type StackCard } from "@/components/StackCards";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { FrameGlyph } from "@/components/Logo";
import BranchIcon from "@/components/BranchIcons";
import { CodeIcon, LaunchIcon, MapIcon } from "@/components/StepIcons";
import Reveal from "@/components/Reveal";
import { faq } from "@/components/faq";

/**
 * Website onderhoud: the page for "website onderhoud / website onderhoud abonnement / website laten
 * onderhouden / doorontwikkeling website". The visitor has (or is about to have) a site built by
 * NXT Frame and wants to know what happens after the launch. Order: the promise (hero), what the
 * subscription holds (stacking cards), how it runs (the zigzag path), without versus with
 * maintenance (the ticked table of the aanpak page), what it costs (the two big cards of the
 * redesign page, the amount a placeholder as on /prijzen), the proof and the questions. The footer
 * carries the closing call to action, so there is no lime band.
 *
 * DRAFT COPY: everything on this page is a first version for Justin to check. In particular:
 *  - The monthly amount does not exist yet: the same visible [INVULLEN] placeholder as on /prijzen.
 *  - What the subscription holds follows the list on /prijzen (hosting, updates and security,
 *    back-ups, small changes on request, one point of contact) plus the /diensten items (speed and
 *    findability measured, new pages and campaigns). Whether new pages and campaigns sit inside the
 *    monthly amount is not decided: this page says small changes are included and larger work gets
 *    a fixed price beforehand.
 *  - Cancelling: per month, the notice period and minimum term are still open in /voorwaarden.
 *  - No response times, uptime figures or frequencies are promised on purpose.
 *  - The page is about sites built by NXT Frame; maintenance of other sites is not mentioned.
 */
export const metadata: Metadata = {
  title: "Website onderhoud | Onderhoud en doorontwikkeling per maand | NXT Frame",
  description:
    "Website onderhoud per maand: hosting, updates, beveiliging en back-ups, snelheid en vindbaarheid gemeten, en verbeteringen op basis van wat bezoekers doen. Eén vast bedrag, één aanspreekpunt.",
  alternates: { canonical: "/website-onderhoud" },
};

/* what the subscription holds: four cards that stack while you scroll */
const included: StackCard[] = [
  {
    label: "Bijgehouden", img: "/images/slim-desk.webp", pos: "50% 18%",
    title: <>Techniek die <span className="serif-italic">bij blijft</span></>,
    body: "Hosting, updates, beveiliging en back-ups: de techniek onder je site houd ik bij. Jij merkt er niets van, behalve dat alles blijft werken.",
    cta: "Bekijk de prijzen", href: "#prijs",
  },
  {
    label: "Gemeten", img: "/images/slim-search.webp", pos: "48% 50%",
    title: <>Snelheid en vindbaarheid, <span className="serif-italic">gemeten</span></>,
    body: "Ik houd in de gaten hoe snel je site laadt en hoe hij gevonden wordt. Zakt er iets weg, dan zoek ik uit waarom en stuur ik bij.",
    cta: "Zo werkt het", href: "#stappen",
  },
  {
    label: "Doorontwikkeld", img: "/images/slim-palette.webp", pos: "42% 50%",
    title: <>Beter op basis van <span className="serif-italic">wat bezoekers doen</span></>,
    body: "Waar haken bezoekers af, welke pagina werkt goed? Daar komen voorstellen uit: een duidelijker formulier, een pagina voor een nieuwe dienst, een pagina voor je campagne.",
    cta: "Bekijk het werk", href: "/werk",
  },
  {
    label: "Eén aanspreekpunt", img: "/images/slim-choice.webp", pos: "50% 50%",
    title: <>Eén persoon die <span className="serif-italic">je site kent</span></>,
    body: "Geen helpdesk of ticketsysteem. Je mailt de persoon die je site heeft ontworpen en gebouwd, en die weet meteen waar het over gaat.",
    cta: "Meer over mij", href: "/over",
  },
];

/* how maintenance runs after the launch, on the zigzag path */
const SearchStepIcon = ({ className }: { className?: string }) => <BranchIcon name="search" className={className} />;
const ChartStepIcon = ({ className }: { className?: string }) => <BranchIcon name="chart" className={className} />;
const steps: PathStep[] = [
  { title: "Live en aangemeld", body: "De site gaat live, wordt aangemeld bij Google en Bing en gemeten op snelheid. Dat is het startpunt.", Icon: LaunchIcon },
  { title: "Bijhouden", body: "Hosting, updates, beveiliging en back-ups lopen door op de achtergrond. Daar heb jij geen omkijken naar.", Icon: CodeIcon },
  { title: "Meten", body: "Ik kijk naar snelheid, vindbaarheid en wat bezoekers op je site doen. Zo zie je wat werkt en wat niet.", Icon: SearchStepIcon },
  { title: "Voorstellen", body: "Wat er beter kan, hoor je van mij, met een concreet voorstel. Jij beslist wat er gebeurt.", Icon: MapIcon },
  { title: "Verbeteren", body: "Kleine aanpassingen doe ik binnen het abonnement. Een grotere uitbreiding krijgt vooraf een vaste prijs.", Icon: ChartStepIcon },
];

/* without versus with maintenance, per part of the site (the table of the aanpak page) */
const parts = [
  {
    title: "Hosting",
    without: "Regel je zelf, of laat je aan iemand anders over. Ik help bij het overzetten.",
    with: ["Je site draait bij mij", "Geen losse hostingpartij om te regelen"],
  },
  {
    title: "Updates en beveiliging",
    without: "Houd je zelf bij. Zonder afspraak bewaak ik de techniek van je site niet.",
    with: ["Updates en beveiliging bijgehouden", "Back-ups"],
  },
  {
    title: "Snelheid en vindbaarheid",
    without: "Niemand die meekijkt of je site snel en vindbaar blijft.",
    with: ["Snelheid gemeten", "Vindbaarheid in de gaten gehouden"],
  },
  {
    title: "Aanpassingen",
    without: "Teksten en foto's pas je zelf aan. Al het andere op aanvraag, met vooraf een vaste prijs.",
    with: ["Kleine aanpassingen op verzoek", "Voorstellen op basis van wat bezoekers doen"],
  },
  {
    title: "Als er iets is",
    without: "Je zoekt het zelf uit, of vraagt een losse opdracht aan.",
    with: ["Eén aanspreekpunt", "Ik zoek het uit en los het op"],
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

/* what the subscription holds: the list of /prijzen, word for word */
const inSubscription = ["Hosting van je site", "Updates en beveiliging", "Back-ups", "Kleine aanpassingen op verzoek", "Eén aanspreekpunt als er iets is"];

/* the maintenance questions first, then the general ones that apply */
const questions = [
  {
    q: "Wat zit er in het onderhoudsabonnement?",
    a: "Hosting van je site, updates en beveiliging, back-ups, kleine aanpassingen op verzoek en één aanspreekpunt als er iets is. Daarnaast houd ik snelheid en vindbaarheid in de gaten en hoor je van mij wat er beter kan.",
  },
  {
    q: "Wat kost website onderhoud?",
    a: "Eén vast bedrag per maand, exclusief btw. Het bedrag staat op de prijzenpagina en in de offerte, zodat je vooraf weet waar je aan toe bent.",
  },
  {
    q: "Betaal ik per maand of per uur?",
    a: "Per maand, een vast bedrag. Ik reken geen uren achteraf. Wil je iets groters, zoals een nieuwe pagina of een campagne, dan krijg je daar eerst een vaste prijs voor en beslis jij of het doorgaat.",
  },
  {
    q: "Wat als er iets niet werkt?",
    a: "Met het abonnement mail je mij. Ik zoek uit wat er aan de hand is en los het op. Je hoeft niet uit te leggen hoe je site in elkaar zit: ik heb hem gebouwd.",
  },
  {
    q: "Moet ik onderhoud afnemen?",
    a: "Nee. Onderhoud is een keuze, geen verplichting. Zonder abonnement is de site van jou en regel je hosting en onderhoud zelf. Aanpassingen kun je dan los aanvragen, met vooraf een vaste prijs.",
  },
  {
    q: "Kan ik het abonnement opzeggen?",
    a: "Ja, per maand. De opzegtermijn staat in de voorwaarden. Je zit niet vast aan een lang contract.",
  },
  {
    q: "Is de site van mij als ik stop?",
    a: "Ja. Stop je met onderhoud, dan blijft de site van jou, inclusief de code, en blijft hij werken. Ik help je met een nette overdracht als je dat wilt. Je domeinnaam staat altijd op jouw naam.",
  },
  faq[3],
  faq[6],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Website onderhoud en doorontwikkeling",
      serviceType: "Website onderhoud",
      provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      description: metadata.description,
      url: "https://nxtframe.ai/website-onderhoud",
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
            The photo, for now: a soft blue sky (/images/hero-sky, unused elsewhere). To be replaced
            by a generated photo of an older person tending something with care (a gardener pruning
            a hedge). On phones the photo follows the copy as its own block. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-16 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[52%]">
              <Eyebrow tone="light" className="max-w-xl">Website onderhoud</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                <span className="sm:whitespace-nowrap">Na de lancering</span>
                <br />
                <span className="serif-italic text-lime">gaat het door</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Ik houd je site snel en veilig, let op hoe hij gevonden wordt en bouw hem verder uit op basis van wat bezoekers doen. Eén vast bedrag per maand, één aanspreekpunt.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#inbegrepen">Bekijk wat erin zit</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {["Vast bedrag per maand", "Eén aanspreekpunt", "De site blijft van jou"].map((t) => (
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
            <img
              src="/images/hero-sky.jpg"
              alt="Een zachtblauwe lucht met wolken"
              className="aspect-[4/3] w-full object-cover object-[50%_30%] lg:aspect-auto lg:size-full lg:object-[50%_30%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* what the subscription holds: built like "Je vindbaarheid" on the redesign page, the heading
            centred and four cards that stack while you scroll. Paper, to part it from the dark hero */}
        <section id="inbegrepen" data-zone="cherry" className="scroll-mt-20 bg-paper py-16 text-forest md:py-32">
          <Container className="text-center">
            <Eyebrow className="mx-auto w-fit">Wat erin zit</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-4xl t-section md:mt-8">
              Een site die bij blijft, <span className="serif-italic">en beter wordt</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">
              Een website is na de lancering niet klaar. De techniek veroudert, je bedrijf groeit en bezoekers laten zien wat beter kan. Met onderhoud loopt je site daarin mee.
            </p>
          </Container>
          <Container className="mt-12 md:mt-16">
            <StackCards items={included} />
          </Container>
        </section>

        {/* how it runs after the launch, on the zigzag path, light */}
        <div id="stappen" className="scroll-mt-20">
          <Platform
            eyebrow="Zo werkt het"
            title={<>Bijhouden, meten <span className="serif-italic">en verbeteren</span></>}
            intro="Geen helpdesk ertussen: de persoon die je site heeft gebouwd, houdt hem ook bij. Zo hoef je nooit opnieuw uit te leggen hoe het zit."
            // `light` on purpose: the cream tone remaps the cream token to forest
            action={<TextLink light className="mt-8" href="/aanpak">Bekijk de aanpak</TextLink>}
            items={steps}
            tone="cream"
          />
        </div>

        {/* without versus with maintenance: the table of the aanpak page, on the forest ground, a
            blush column for without and a paper one for with, ticked off as it scrolls in */}
        <section data-zone="green" className="bg-forest py-16 text-paper md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow tone="light" className="max-w-xl">Het verschil</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Zonder onderhoud, <span className="serif-italic text-lime">of met</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-paper/75 md:text-xl">
                Je kiest het zelf. Per onderdeel van je site zie je wat er gebeurt als je het zelf regelt, en wat je krijgt als je het aan mij laat.
              </p>
            </div>
            {/* phones: one card per part, without on top and the ticks of with in a paper block under it */}
            <ol className="mt-12 space-y-4 md:hidden">
              {parts.map((d, i) => (
                <li key={d.title} className="overflow-hidden rounded-3xl bg-[#fcbbb9] text-[#440220]">
                  <div className="p-6">
                    <span className="text-sm font-medium text-[#440220]/55">0{i + 1}</span>
                    <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">{d.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#440220]/85">
                      <span className="font-semibold">Zonder: </span>
                      {d.without}
                    </p>
                  </div>
                  <ul className="space-y-3 bg-paper p-6 text-forest">
                    {d.with.map((g) => (
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
                    <th className="w-[34%] rounded-t-3xl bg-[#fcbbb9] px-8 pb-4 pt-8 align-top font-display text-xl font-semibold tracking-tight text-[#440220]">Zonder onderhoud</th>
                    <th className="rounded-t-3xl bg-paper px-8 pb-4 pt-8 align-top font-display text-xl font-semibold tracking-tight text-forest">Met onderhoud</th>
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
                          <span className={`block ${last ? "" : "border-b border-[#440220]/15 pb-6"}`}>{d.without}</span>
                        </td>
                        <td className={`bg-paper px-8 py-6 align-top text-forest ${last ? "rounded-b-3xl pb-8" : ""}`}>
                          <ul className={`space-y-3 ${last ? "" : "border-b border-forest/10 pb-6"}`}>
                            {d.with.map((g, j) => (
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

        {/* what it costs: two big cards in the brand colours, the subscription on forest (the amount the
            placeholder of /prijzen) and what it holds on lime, ticked like the service cards on /diensten */}
        <section id="prijs" className="scroll-mt-24 bg-cream py-16 text-forest md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Wat kost het</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Eén vast bedrag, <span className="serif-italic">per maand</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-forest/75 md:text-xl">
                Geen uren achteraf en geen verrassingen. Wil je iets groters, zoals een nieuwe pagina of een campagne, dan krijg je daar eerst een vaste prijs voor.
              </p>
            </div>
            <div className="mt-16 grid gap-6 lg:grid-cols-2">
              <article className="flex flex-col rounded-3xl bg-forest p-8 text-paper md:p-12">
                <p className="flex items-center gap-3 text-[15px] font-medium">
                  <span className="grid size-10 place-items-center rounded-full border border-current">
                    <BranchIcon name="refresh" className="size-5" />
                  </span>
                  Onderhoudsabonnement
                </p>
                <p className="mt-10 font-serif text-4xl leading-tight text-lime md:text-5xl">[INVULLEN: bedrag onderhoudsabonnement per maand]</p>
                <p className="mt-3 text-sm text-paper/60">exclusief btw · per maand opzegbaar</p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-paper/80 md:text-lg">
                  Je site draait bij mij en ik houd hem bij. Eén vast bedrag per maand, en je hebt er geen omkijken naar.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-paper/15 pt-6 lg:mt-auto">
                  <Button href="/contact">Plan een kennismaking</Button>
                  <TextLink light href="/prijzen">Bekijk alle prijzen</TextLink>
                </div>
              </article>
              <article className="flex flex-col rounded-3xl bg-lime p-8 text-forest md:p-12">
                <p className="flex items-center gap-3 text-[15px] font-medium">
                  <span className="grid size-10 place-items-center rounded-full border border-current">
                    <BranchIcon name="wrench" className="size-5" />
                  </span>
                  Wat erin zit
                </p>
                <h3 className="mt-10 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.03em]">
                  Wat je site <span className="serif-italic">gezond houdt</span>
                </h3>
                <ul className="mt-8 grid gap-y-3">
                  {inSubscription.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px] leading-snug">
                      <Tick />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-forest/15 pt-5 text-[15px] leading-relaxed text-forest/75">
                  Stop je, dan blijft de site van jou, inclusief de code. Je domeinnaam staat altijd op jouw naam.
                </p>
              </article>
            </div>
          </Container>
        </section>

        {/* the proof */}
        <Work turnDark={false} />

        {/* the questions about maintenance, laid out like the homepage FAQ */}
        <section className="bg-cream pb-16 pt-8 text-forest md:pb-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Vragen over <span className="serif-italic">onderhoud</span>
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
