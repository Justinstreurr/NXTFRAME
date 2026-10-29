import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BranchGallery from "@/components/BranchGallery";
import { FrameGlyph } from "@/components/Logo";
import { branches } from "@/components/menuData";
import ShiftSection from "@/components/ShiftSection";
import StackCards, { type StackCard, type StackTone } from "@/components/StackCards";
import { Platform, type PathStep } from "@/components/Sections";
import { LaunchIcon, MapIcon, PenIcon } from "@/components/StepIcons";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Websites per branche | Makelaars, horeca, webshops en meer | NXT Frame",
  description:
    "Een website gebouwd rond jouw branche: makelaars, horeca, webshops, adviseurs, bouw, zorg, beauty en coaches. Per branche lees je wat de site moet doen, en hoe ik dat voor jou bouw.",
  alternates: { canonical: "/branches" },
};

/* how many branches have a concept site online; the copy below follows this number, so it never claims more than there is */

/* why a site per branch beats a template with another logo: three cards that stack while you scroll, as
   "Wat je krijgt" on the homepage (StackCards) */
const reasons: StackCard[] = [
  {
    label: "Vindbaar", img: "/images/slim-search.webp", pos: "48% 50%",
    title: <>Gevonden op <span className="serif-italic">de vraag van jouw klant</span></>,
    body: "Een makelaar wordt anders gezocht dan een tandarts. Daarom bouw ik structuur en teksten rond wat mensen in die ene branche intypen, in Google en in ChatGPT.",
    cta: "Bekijk de branches", href: "#branches",
  },
  {
    label: "Passend", img: "/images/slim-palette.webp", pos: "42% 50%",
    title: <>De juiste onderdelen, <span className="serif-italic">op de juiste plek</span></>,
    body: "Woningaanbod, een reserveringsknop, een afspraakplanner of een offertevraag: per branche ligt vast wat de site moet doen, en dat staat waar de bezoeker het verwacht.",
    cta: "Bekijk de aanpak", href: "/aanpak",
  },
  {
    label: "Vooraf helder", img: "/images/slim-desk.webp", pos: "50% 18%",
    title: <>Zien <span className="serif-italic">voordat je beslist</span></>,
    body: "Per branche lees je precies wat de site gaat doen, en in de cases zie je hoe het eruitziet als het af is: open ze op je telefoon en voel hoe snel ze laden.",
    cta: "Bekijk het werk", href: "/werk",
  },
];

/* the cards' colours on the wine ground: lime, blush, and forest where the homepage has wine */
const reasonTones: StackTone[] = [
  { card: "bg-lime text-forest", body: "text-forest/80" },
  { card: "bg-[#fcbbb9] text-[#440220]", body: "text-[#440220]/80" },
  { card: "bg-forest text-lime", body: "text-[#f7f1e8]/85" },
];

/* from branch page to your own site, in three steps on the zigzag path (Platform) */
const steps: PathStep[] = [
  { title: "Kies je branche", body: "Bekijk de pagina die bij jouw vak hoort, of het dichtst in de buurt komt.", Icon: MapIcon },
  { title: "Kijk wat de site moet doen", body: "Je leest wat er nu misgaat, wat de site oplost en wat het kost.", Icon: PenIcon },
  { title: "Ik bouw jouw versie", body: "Met je eigen naam, aanbod en werkgebied. De branchepagina geeft de basis, de kennismaking de rest.", Icon: LaunchIcon },
];

export default function Page() {
  return (
    <>
      <Nav theme="photo" />
      <main id="main">
        {/* Hero, the same frame as the other pages (720px on desktop, the nav floating over it): the
            promise on the left over a full-width photo (the mascot walking down a Dutch shopping street
            past a shopkeeper and two women on a terrace; a generated image, /images/branches-hero-straat).
            The mascot walks in the middle of the frame, so the copy keeps to a narrow column on the
            shadow side of the street, under a forest tint. On phones the photo follows the copy as its
            own block. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          {/* a firmer tint than on the other heroes: the street behind the copy is in full sun */}
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.82)_0%,rgb(0_0_0/0.68)_28%,rgb(0_0_0/0.28)_44%,transparent_56%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-12 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[44%]">
              <Eyebrow tone="light" className="max-w-xl">Branches</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Gebouwd rond
                <br />
                <span className="serif-italic text-lime">jouw branche</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Een makelaar heeft andere vragen dan een restaurant. Per branche weet ik wat de site moet doen.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#branches">Bekijk de branches</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {[`${branches.length} branches`, "Een plan per branche", "Gebouwd door één maker"].map((t) => (
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
            <source srcSet="/images/branches-hero-straat.webp" type="image/webp" />
            <img
              src="/images/branches-hero-straat.jpg"
              alt="De NXT Frame-mascotte loopt met een laptop onder de arm door een zonnige Nederlandse winkelstraat, nagekeken door een winkelier en twee vrouwen op een terras"
              className="aspect-[4/3] w-full object-cover object-[78%_50%] lg:aspect-auto lg:size-full lg:object-[35%_50%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* every branch as one edge-to-edge grid, with the filter above it (BranchGallery). No padding at the
            foot: the photos run straight into the forest section below */}
        <section id="branches" data-zone="cherry" className="scroll-mt-20 bg-cream pt-16 text-forest md:pt-24">
          <BranchGallery
            header={
              <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
                <div>
                  <Eyebrow className="max-w-xl">Kies je vak</Eyebrow>
                  <h2 className="mt-6 t-section md:mt-8">
                    Acht branches, <span className="serif-italic">elk met een eigen pagina</span>
                  </h2>
                </div>
                <p className="max-w-md text-forest/75 t-lead">
                  Op elke pagina staat wat een site in die branche moet doen.
                </p>
              </div>
            }
          />
        </section>

        {/* why per branch: the heading centred and the three reasons as stacking cards, the same design as
            "Wat je krijgt" on the homepage, here on wine with blush type. One card is forest
            instead of wine, or it would vanish into the ground. Halfway down the section the ground
            turns cream and the type wine (ShiftSection). */}
        <ShiftSection className="bg-[#440220] py-12 text-[#fcbbb9] data-[shifted=true]:bg-cream data-[shifted=true]:text-[#440220] md:py-32">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow tone="wine" className="mx-auto">Waarom per branche</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Geen template met <span className="serif-italic">een ander logo</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl opacity-85 t-lead">
                Een goede site begint bij de vraag van de klant, en die vraag verschilt per vak. Daarom denk ik elke site vanaf de eerste schets uit rond één
                branche.
              </p>
            </div>
            <div className="mt-12 md:mt-16">
              <StackCards items={reasons} tones={reasonTones} />
            </div>
            <div className="mt-8 text-center md:mt-10">
              <Button variant="custom" className="bg-[#fcbbb9] text-[#440220] hover:bg-[#ffd0ce] group-data-[shifted=true]:bg-[#440220] group-data-[shifted=true]:text-[#fcbbb9] group-data-[shifted=true]:hover:bg-[#5a0a2e]" href="/contact">Plan een kennismaking</Button>
            </div>
          </Container>
        </ShiftSection>

        {/* how it works: the path of "Zo werkt het" on the homepage, with three steps and the line kept straight */}
        <Platform
          eyebrow="Zo werkt het"
          title={
            <>
              Van branchepagina <span className="serif-italic">naar jouw site</span>
            </>
          }
          intro="Drie stappen, één aanspreekpunt. Je kiest je vak, je ziet wat de site moet doen, en daarna bouw ik jouw versie."
          action={<TextLink light className="mt-8" href="/aanpak">Bekijk de aanpak</TextLink>}
          items={steps}
          straight
          tone="cream"
        />
      </main>
      <Footer />
    </>
  );
}
