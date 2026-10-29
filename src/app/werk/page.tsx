import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkGallery from "@/components/WorkGallery";
import { FrameGlyph } from "@/components/Logo";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";
import LetterFill from "@/components/LetterFill";

export const metadata = {
  title: "Werk | NXT Frame",
  alternates: { canonical: "/werk" },
  description: "Alle cases en concepten van NXT Frame op één plek: websites voor klanten en per branche een werkend concept dat live staat.",
};

/* the words that matter, in italic: lime is unreadable on cream, italic is the site accent on light backgrounds */
function Mark({ children }: { children: React.ReactNode }) {
  return <span className="italic">{children}</span>;
}

export default function Page() {
  return (
    <>
      <Nav theme="photo" />
      <main id="main">
        {/* Hero, the frame of the branch pages (720px on desktop, the nav floating over it): the promise
            on the left over a full-width photo, black from the left to carry the type. The photo: a man
            in a diner booth sipping an orange soda and giving the okay to the Happy Flops homepage on
            his laptop (a generated photo with a screenshot of happyflops.nl mapped onto the screen,
            /images/werk-hero). On phones the photo follows the copy as its own block. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-16 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[48%]">
              <Eyebrow tone="light" className="max-w-xl">Werk</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Werk dat je
                <br />
                <span className="serif-italic text-lime">zelf kunt testen</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Websites voor klanten als Happy Flops en Hypotheekhaven, en per branche een werkend concept dat live staat. Klik ze gerust open.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#overzicht">Bekijk het werk</TextLink>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {["Echte klanten", "Live te bekijken", "Een concept per branche"].map((t) => (
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
            <source srcSet="/images/werk-hero.webp" type="image/webp" />
            <img
              src="/images/werk-hero.jpg"
              alt="Een man in een diner drinkt een sinaasappelfrisdrank en geeft een goedkeurend gebaar bij de homepage van Happy Flops op zijn laptop"
              className="aspect-[4/3] w-full object-cover object-[80%_50%] lg:aspect-auto lg:size-full lg:object-[70%_45%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* filter row, one big serif statement, then the cases as an editorial grid (WorkGallery) */}
        <section id="overzicht" data-zone="cherry" className="scroll-mt-20 bg-cream pb-16 pt-10 text-forest md:pb-32 md:pt-14">
          <Container>
            <WorkGallery
              statement={
                <h2 className="mt-14 max-w-6xl font-serif text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-forest md:mt-20">
                  Websites die <Mark>snel laden, gevonden worden</Mark> en daarna ook verkopen.{" "}
                  {/* the second sentence opens light grey and fills in letter by letter on load */}
                  <LetterFill parts={[{ text: "Voor klanten, en per branche als " }, { text: "werkend concept", italic: true }, { text: "." }]} />
                </h2>
              }
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
