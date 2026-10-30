import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkGallery from "@/components/WorkGallery";
import { FrameGlyph } from "@/components/Logo";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";

export const metadata = {
  title: "Werk | NXT Frame",
  alternates: { canonical: "/werk" },
  description: "Alle cases en concepten van NXT Frame op één plek: websites voor klanten en concepten per branche.",
};

export default function Page() {
  return (
    <>
      <Nav theme="photo" />
      <main id="main">
        {/* Hero, the frame of the branch pages (720px on desktop, the nav floating over it): the promise
            on the left over a full-width photo, black from the left to carry the type. The photo: a man
            in a diner booth sipping an orange soda and giving the okay to the Happy Flops homepage on
            his laptop (a generated photo with a screenshot of happyflops.nl mapped onto the screen,
            /images/werk-hero). On phones too the copy sits on the photo, under a shade. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-12 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[48%]">
              <Eyebrow tone="light" className="max-w-xl">Werk</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                Werk dat je
                <br />
                <span className="serif-italic text-lime">zelf kunt bekijken</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">
                Websites voor klanten als Happy Flops en Hypotheekhaven, en per branche een concept van wat de site daar moet doen.
              </p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <TextLink light href="#overzicht">Bekijk het werk</TextLink>
                </div>
                <ul className="mt-6 flex flex-col gap-2 font-display text-[15px] text-paper/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
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
          {/* phones: the copy sits on the photo, so a shade from the top (copy) to the foot (buttons) keeps it readable */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.72)_0%,rgb(0_0_0/0.5)_45%,rgb(0_0_0/0.68)_100%)] lg:hidden" aria-hidden="true" />
          <picture className="absolute inset-0 -z-20">
            <source srcSet="/images/werk-hero.webp" type="image/webp" />
            <img
              src="/images/werk-hero.jpg"
              alt="Een man in een diner drinkt een sinaasappelfrisdrank en geeft een goedkeurend gebaar bij de homepage van Happy Flops op zijn laptop"
              className="size-full object-cover object-[80%_50%] lg:object-[70%_45%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* every case as one edge-to-edge grid, with the filter above it (WorkGallery), built like the
            Branches page. No padding at the foot: the photos run straight into the footer */}
        <section id="overzicht" data-zone="cherry" className="scroll-mt-20 bg-cream pt-16 text-forest md:pt-24">
          <WorkGallery
            header={
              <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
                <div>
                  <Eyebrow className="max-w-xl">Ons werk</Eyebrow>
                  <h2 className="mt-6 t-section md:mt-8">
                    Klanten en concepten, <span className="serif-italic">alles op één plek</span>
                  </h2>
                </div>
                <p className="max-w-md text-forest/75 t-lead">
                  Sites voor echte klanten, en per branche een concept voor een bedrijf dat (nog) niet bestaat. Open ze op je telefoon en voel hoe snel ze laden.
                </p>
              </div>
            }
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
