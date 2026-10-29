import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Comparison, FaqList, Testimonials, Work } from "@/components/Sections";
import StackCards, { type StackCard } from "@/components/StackCards";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { FrameGlyph } from "@/components/Logo";
import { faq } from "@/components/faq";

/**
 * Over: the page people open to answer "who is behind this, and can I trust them?". Order follows
 * that question: who you work with (hero), why NXT Frame exists (a signed letter), what I stand for,
 * the proof (work and reviews), how one maker compares to the alternatives, the plain facts a
 * visitor checks before getting in touch and a few questions. The footer carries the closing call
 * to action, as on the werk page, so there is no lime band.
 *
 * DRAFT COPY: the letter and the principles are a first version for Justin to rewrite in his own
 * words (search for "[INVULLEN").
 */
export const metadata: Metadata = {
  title: "Over NXT Frame | Eén maker, geen bureau",
  description:
    "Achter NXT Frame zit één persoon: Justin Streur. Ik ontwerp én bouw websites die gevonden worden en verkopen, en ben van de kennismaking tot na de lancering je aanspreekpunt.",
  alternates: { canonical: "/over" },
};

/* what I stand for: four promises a visitor can hold me to, as stacking cards like "Wat je krijgt"
   on the homepage (StackCards, lime, wine, blush) */
const principles: StackCard[] = [
  {
    label: "Eerlijk", img: "/images/andere-tijd.webp", pos: "30% 30%",
    title: <>Eerlijk advies, <span className="serif-italic">ook als het nee is</span></>,
    body: "Past een andere oplossing beter, of heb je geen nieuwe site nodig? Dan hoor je dat. Liever een eerlijk gesprek dan een project dat niets oplevert.",
    cta: "Plan een kennismaking", href: "/contact",
  },
  {
    label: "Vast", img: "/images/mascot-build.webp", pos: "50% 25%",
    title: <>Eén vaste prijs <span className="serif-italic">vooraf</span></>,
    body: "Na de kennismaking weet je wat het kost en wat je ervoor krijgt. Geen uren achteraf, geen meerwerk dat je pas op de factuur ziet.",
    cta: "Bekijk de prijzen", href: "/prijzen",
  },
  {
    label: "Persoonlijk", img: "/images/contact-hero.webp", pos: "80% 45%",
    title: <>De maker is <span className="serif-italic">je aanspreekpunt</span></>,
    body: "Geen accountmanager ertussen. Wie je spreekt, ontwerpt en bouwt ook. Van de eerste schets tot na de lancering heb je met mij te maken, niet met een doorgeefluik.",
    cta: "Bekijk de aanpak", href: "/aanpak",
  },
  {
    label: "Realistisch", img: "/images/slim-search.webp", pos: "48% 50%",
    title: <>Geen beloftes <span className="serif-italic">die niet kloppen</span></>,
    body: "Niemand kan plek 1 in Google of ChatGPT garanderen, dus dat doe ik ook niet. Wel een site die snel laadt, technisch klopt en die zoekmachines goed kunnen lezen.",
    cta: "Bekijk het werk", href: "/werk",
  },
];

/* the plain facts people check before they get in touch */
const facts = [
  { k: "Wie", v: "Justin Streur, eigenaar en maker" },
  { k: "Wat", v: "Websites, webshops en landingspagina's" },
  { k: "Waar", v: "Heel Nederland, online of op locatie" },
  { k: "Reactie", v: "Van mij zelf, meestal binnen één werkdag" },
  { k: "Contact", v: "hallo@nxtframe.ai", href: "mailto:hallo@nxtframe.ai" },
  { k: "KvK", v: "42102903" },
];

/* the questions about working with one person */
const questions = [
  {
    q: "Wat gebeurt er als je ziek bent of op vakantie?",
    a: "Vakanties zet ik vooraf in de planning, dus die weet je ruim van tevoren. Je site draait op goede hosting en blijft gewoon online als ik een week weg ben. Ben ik ziek, dan hoor je dat van mij en schuift de planning op.",
  },
  {
    q: "Kan één persoon net zoveel als een bureau?",
    a: "Voor de websites die ik maak wel. Ontwerp en bouw zitten in één hoofd, dus er gaat niets verloren in een overdracht. Waar specialistisch werk nodig is, zoals fotografie, zeg ik dat vooraf en regelen we het samen.",
  },
  faq[5],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      name: metadata.title,
      description: metadata.description,
      url: "https://nxtframe.ai/over",
      mainEntity: { "@id": "https://nxtframe.ai/#justin" },
    },
    {
      "@type": "Person",
      "@id": "https://nxtframe.ai/#justin",
      name: "Justin Streur",
      jobTitle: "Webdesigner en developer",
      worksFor: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
      email: "hallo@nxtframe.ai",
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
        {/* Hero, the frame of the werk and branch pages (720px on desktop, the nav floating over it):
            the promise on the left over a full-width photo, black from the left to carry the type.
            The photo: an older man in a lime cap at a seaside café table, giving a thumbs-up over
            his laptop, in the right half of the frame (a generated photo, /images/over-hero). On phones the photo follows the copy as its own block. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-16 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[48%]">
              <Eyebrow tone="light" className="max-w-xl">Over NXT Frame</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Eén maker,
                <br />
                <span className="serif-italic text-lime">geen bureau</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Je wilt weten met wie je in zee gaat. Met mij: Justin Streur. Ik ontwerp én bouw je website, en ik ben je aanspreekpunt van de kennismaking tot na de lancering.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#verhaal">Lees waarom</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {["Ontwerp én bouw", "Eén aanspreekpunt", "Heel Nederland"].map((t) => (
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
            <source srcSet="/images/over-hero.webp" type="image/webp" />
            <img
              src="/images/over-hero.jpg"
              alt="Een oudere man met een limegroene pet zit op een terras aan zee achter zijn laptop en steekt tevreden zijn duim op"
              className="aspect-[4/3] w-full object-cover object-[78%_50%] lg:aspect-auto lg:size-full lg:object-[75%_40%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* why NXT Frame exists: a short letter, signed, in the first person, stacked on the left; the
            photo on the right sticks while the letter scrolls past. On phones the photo follows the letter. */}
        <section id="verhaal" className="scroll-mt-20 bg-paper py-16 text-forest md:py-32">
          <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="max-w-2xl">
              <Eyebrow className="max-w-xl">Waarom NXT Frame</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Veel sites <span className="serif-italic">leveren niets op</span>
              </h2>
              <p className="mt-10 font-display text-2xl leading-snug tracking-tight md:text-3xl">
                Ik zag het steeds weer: ondernemers die een mooie site laten maken, en daarna niets meer horen. Geen aanvragen, geen bestellingen, geen idee waarom.
              </p>
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-forest/75">
                <p>
                  Dat ligt zelden aan de ondernemer. Het ligt aan hoe sites gemaakt worden: een ontwerper die iets moois tekent, een bouwer die het in een template perst, en een accountmanager die ertussen zit. Ergens onderweg verdwijnt de vraag waar het om draait: wat moet deze site opleveren?
                </p>
                <p>
                  Daarom werk ik alleen. Ik denk mee over je klant, ontwerp de pagina&apos;s en schrijf de code zelf. Wat we samen bedenken, is precies wat er live gaat. En omdat ik de code zelf schrijf, zonder trage plugins, laadt de site snel en kunnen Google en ChatGPT hem goed lezen.
                </p>
                <p>[INVULLEN: een paar zinnen over je eigen achtergrond: hoe je begon, wat je hiervoor deed]</p>
              </div>
              <div className="mt-12 flex items-center gap-4 border-t border-forest/15 pt-8">
                <span className="grid size-12 place-items-center rounded-full bg-forest text-lime" aria-hidden="true">
                  <FrameGlyph className="size-4" />
                </span>
                <span>
                  <span className="block font-serif text-2xl italic leading-none">Justin Streur</span>
                  <span className="mt-1 block text-sm text-forest/60">Eigenaar en maker, NXT Frame</span>
                </span>
              </div>
            </div>
            <picture className="block self-start overflow-hidden rounded-3xl lg:sticky lg:top-28">
              <source srcSet="/images/laptop-logo-bank.webp" type="image/webp" />
              <img
                src="/images/laptop-logo-bank.jpg"
                alt="Een laptop met het logo van NXT Frame op een groene fluwelen bank in de zon"
                width={1024}
                height={1536}
                className="aspect-[4/5] w-full object-cover object-[50%_35%]"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </Container>
        </section>

        {/* what I stand for: built like "Wat je krijgt" on the homepage (AiFirst), the heading centred
            and the four promises as cards that stack while you scroll */}
        <section data-zone="cherry" className="bg-cream py-16 text-forest md:py-32">
          <Container className="text-center">
            <Eyebrow className="mx-auto w-fit">Waar ik voor sta</Eyebrow>
            <h2 className="mt-6 t-section md:mt-8">
              Vier dingen <span className="serif-italic">waar je me aan mag houden</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">
              Dit zijn afspraken, geen slogans. Ze gelden voor elk traject, groot of klein.
            </p>
          </Container>
          <Container className="mt-12 md:mt-16">
            <StackCards items={principles} />
          </Container>
        </section>

        {/* the proof: the work, then what clients say */}
        <Work />
        <Testimonials dark />

        {/* one maker against the alternatives */}
        <Comparison />

        {/* the plain facts as a row of cards, the same paper cards as the pains on the hub */}
        <section className="bg-cream pb-16 text-forest md:pb-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Goed om te weten</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Zwart op wit, <span className="serif-italic">voordat je belt</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-snug text-forest/75 md:text-xl">
                De praktische dingen die je wilt weten voordat je contact opneemt.
              </p>
            </div>
            <dl className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {facts.map((f) => (
                <div key={f.k} className="rounded-3xl bg-paper p-8 ring-1 ring-forest/10">
                  <dt className="flex items-center gap-2.5 text-sm font-medium text-forest/55">
                    <FrameGlyph className="size-3 shrink-0 text-forest" />
                    {f.k}
                  </dt>
                  <dd className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight">
                    {f.href ? <a href={f.href} className="underline underline-offset-4 decoration-forest/30 hover:decoration-forest">{f.v}</a> : f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* the questions about working with one person, laid out like the homepage FAQ */}
        <section className="bg-cream pb-16 text-forest md:pb-32">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Werken met <span className="serif-italic">één persoon</span>
              </h2>
            </div>
            <FaqList items={questions} />
          </Container>
        </section>      </main>
      <Footer />
    </>
  );
}
