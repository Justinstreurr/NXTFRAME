import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaqList, Platform, type PathStep } from "@/components/Sections";
import SmartGrid from "@/components/SmartGrid";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { FrameGlyph } from "@/components/Logo";
import BranchIcon from "@/components/BranchIcons";
import { CodeIcon, LaunchIcon, MapIcon, TalkIcon } from "@/components/StepIcons";
import { integrations, smartFaq, tools } from "@/components/smartTools";

/**
 * AI-oplossingen: the page for "AI voor bedrijven / AI-assistent op website / offertes automatiseren /
 * AI automatisering mkb". What can be built on top of a site: the tools at work (the homepage grid),
 * all six kinds of tools with examples, how a job runs, the systems it connects to, what it costs and
 * the questions. Content from smartTools.ts, shared with the homepage.
 *
 * DRAFT COPY: the hero, the section intros, the steps and the price block are a first version for
 * Justin to check. No amounts are named: every tool gets a fixed price after a short look, and an
 * assistant has small monthly costs for the AI model (as the FAQ already says).
 */
export const metadata: Metadata = {
  title: "AI-oplossingen voor je bedrijf | AI-assistent, rekentools en automatisering | NxtFrame",
  description:
    "AI en slimme tools op je website: een assistent die vragen beantwoordt, rekentools, offertes en facturen klaargezet om na te kijken, opvolging van aanvragen en koppelingen met je systemen. Vaste prijs vooraf.",
  alternates: { canonical: "/ai-oplossingen" },
};

/* how a job runs, on the zigzag path */
const SearchStepIcon = ({ className }: { className?: string }) => <BranchIcon name="search" className={className} />;
const steps: PathStep[] = [
  { title: "Kennismaken", body: "We kijken samen naar je werkdag: waar gaan de uren heen, wat doe je elke week opnieuw met de hand?", Icon: TalkIcon },
  { title: "Uitzoeken", body: "Ik zoek uit wat kan met de pakketten die je al gebruikt, en wat het meeste tijd scheelt.", Icon: SearchStepIcon },
  { title: "Voorstel", body: "Je krijgt een plan met een vaste prijs. Eerlijk over wat kan, en wat niet.", Icon: MapIcon },
  { title: "Bouwen en testen", body: "Ik bouw het en we testen het samen met echte voorbeelden uit jouw bedrijf, voordat klanten het zien.", Icon: CodeIcon },
  { title: "Live en bijsturen", body: "Het gaat live. Je kunt alles teruglezen, en ik stuur bij waar het beter kan.", Icon: LaunchIcon },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "AI-oplossingen en slimme tools voor je website",
      serviceType: "AI-assistent, automatisering en koppelingen",
      provider: { "@type": "Organization", name: "NxtFrame", url: "https://nxtframe.ai" },
      areaServed: { "@type": "Country", name: "Nederland" },
      description: metadata.description,
      url: "https://nxtframe.ai/ai-oplossingen",
    },
    {
      "@type": "FAQPage",
      mainEntity: smartFaq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <Nav theme="photo" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main">
        {/* Hero, the frame of the other pages (720px on desktop, the nav floating over it, cream copy on
            the left). There is no generated photo for AI yet, so the ground is a deep forest with a lime
            and mint aurora on the right, the glossy koppelingen icon floating in it. Swap in a photo
            (/images/ai-hero) later with the same <picture> as /over. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-20 bg-[radial-gradient(55%_75%_at_78%_55%,rgb(218_252_146/0.55)_0%,rgb(218_252_146/0.22)_35%,transparent_70%),radial-gradient(40%_50%_at_100%_0%,rgb(186_236_214/0.45),transparent_70%),radial-gradient(45%_55%_at_95%_100%,rgb(252_187_185/0.28),transparent_70%),linear-gradient(120deg,#011a14_0%,#02261e_45%,#0a3a2a_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.55)_0%,rgb(0_0_0/0.35)_30%,transparent_55%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 grid items-center gap-10 pb-16 pt-28 sm:pt-36 lg:min-h-[720px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl">
              <Eyebrow tone="light" className="max-w-xl">AI-oplossingen</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Slimme tools die <span className="serif-italic text-lime">werk uit handen nemen</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Een assistent die vragen beantwoordt, offertes die klaarstaan om na te kijken, aanvragen die vanzelf worden opgevolgd. Gebouwd bovenop je site en gekoppeld aan wat je al gebruikt.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#tools">Bekijk wat er kan</TextLink>
                </div>
                <ul className="mt-6 flex flex-col gap-2 font-display text-[15px] text-paper/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                  {["Vaste prijs vooraf", "Jij houdt de controle", "Geen overstap nodig"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <FrameGlyph className="size-3 text-lime" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative mx-auto grid w-full max-w-[520px] place-items-center" aria-hidden="true">
              <img src="/images/icon-koppelingen.webp" alt="" width={600} height={600} className="sb-float w-[72%] drop-shadow-[0_40px_60px_rgb(0_0_0/0.45)]" loading="eager" decoding="async" />
            </div>
          </Container>
        </section>

        {/* the tools at work: the grid of the homepage */}
        <section data-zone="cherry" className="bg-cream py-12 text-forest md:py-24">
          <Container>
            <div className="text-center">
              <Eyebrow className="mx-auto">Zo ziet het eruit</Eyebrow>
              <h2 className="mx-auto mt-6 max-w-4xl t-section md:mt-8">
                Het werk naast je werk, <span className="serif-italic">klaargezet</span>
              </h2>
            </div>
            <div className="mt-12 md:mt-16">
              <SmartGrid />
            </div>
          </Container>
        </section>

        {/* all six kinds of tools, with examples */}
        <section id="tools" data-zone="cherry" className="scroll-mt-20 bg-paper py-12 text-forest md:py-32">
          <Container>
            <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Wat ik bouw</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Zes manieren om <span className="serif-italic">tijd terug te winnen</span>
                </h2>
              </div>
              <p className="max-w-md text-forest/75 t-lead">
                Geen AI om de AI. Eerst kijken we waar de uren zitten, dan bouw ik wat het meeste scheelt.
              </p>
            </div>
            <ul className="mt-12 grid gap-px bg-forest/10 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((t) => (
                <li key={t.title} className="flex flex-col bg-paper p-7 md:p-9">
                  <span className="grid size-11 place-items-center bg-forest text-lime" aria-hidden="true">
                    <BranchIcon name={t.icon} className="size-5" />
                  </span>
                  <h3 className="mt-6 font-display text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.02em]">{t.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-forest/75">{t.body}</p>
                  <ul className="mt-5 space-y-2 border-t border-forest/10 pt-5 text-[14px]">
                    {t.examples.map((e) => (
                      <li key={e} className="flex items-start gap-2.5">
                        <FrameGlyph className="mt-1 size-3 shrink-0" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* how a job runs */}
        <Platform
          eyebrow="Zo werkt het"
          title={<>Eerst uitzoeken, <span className="serif-italic">dan bouwen</span></>}
          intro="Je weet vooraf wat het wordt en wat het kost. En je houdt zelf de controle: niets gaat zonder jouw akkoord de deur uit."
          action={<TextLink light className="mt-8" href="/contact">Plan een kennismaking</TextLink>}
          items={steps}
        />

        {/* the systems it connects to */}
        <section data-zone="cherry" className="bg-cream py-12 text-forest md:py-32">
          <Container>
            <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Koppelingen</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Werkt met wat <span className="serif-italic">je al gebruikt</span>
                </h2>
              </div>
              <p className="max-w-md text-forest/75 t-lead">
                Je hoeft niet over te stappen. Een paar pakketten waar vaak mee gekoppeld wordt; staat de jouwe er niet bij, dan zoek ik het uit.
              </p>
            </div>
            <div className="mt-12 grid gap-px bg-forest/10 sm:grid-cols-2 md:mt-16 lg:grid-cols-5">
              {integrations.map((g) => (
                <div key={g.group} className="bg-cream p-6">
                  <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-forest/70">
                    <BranchIcon name={g.icon} className="size-4" />
                    {g.group}
                  </p>
                  <ul className="mt-4 space-y-1.5 font-display text-[1.05rem]">
                    {g.systems.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* what it costs, in words: a fixed price per tool after a short look */}
        <section data-zone="cherry" className="bg-cream pb-12 text-forest md:pb-32">
          <Container>
            <div className="grid gap-px bg-forest/10 lg:grid-cols-2">
              <div className="bg-forest p-8 text-cream md:p-12">
                <Eyebrow tone="light" className="max-w-xl">Wat kost het</Eyebrow>
                <h2 className="mt-6 t-sub">Een vaste prijs, vooraf</h2>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-cream/80">
                  Elke tool is anders, dus je krijgt na een korte verkenning een plan met één vaste prijs. Het bouwen betaal je eenmalig. Een AI-assistent heeft daarnaast kleine kosten per maand voor het gebruik, die reken ik vooraf voor je uit.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button href="/contact">Plan een kennismaking</Button>
                  <TextLink light href="/prijzen">Bekijk de prijzen voor een website</TextLink>
                </div>
              </div>
              <div className="bg-lime p-8 md:p-12">
                <h2 className="t-sub">Ook in je huidige site</h2>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-forest/80">
                  Een rekentool, een assistent of een koppeling kan vaak ook in een bestaande site. Is je site te oud om op voort te bouwen, dan hoor je dat eerlijk, en bouwen we het mee in een nieuwe.
                </p>
                <TextLink className="mt-8" href="/website-laten-maken">Website laten maken</TextLink>
              </div>
            </div>
          </Container>
        </section>

        {/* the questions */}
        <section className="bg-cream pb-12 pt-8 text-forest md:pb-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Vragen over <span className="serif-italic">AI en koppelingen</span>
              </h2>
            </div>
            <FaqList items={smartFaq} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
