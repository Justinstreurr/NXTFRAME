import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { FaqList } from "@/components/Sections";
import { faq } from "@/components/faq";
import { Container, Eyebrow, Reassure, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact | Plan een kennismaking | NXT Frame",
  description:
    "Plan een gratis kennismaking van een half uur. Vertel kort over je bedrijf en wat je site moet doen, en je krijgt antwoord van de maker zelf, meestal binnen één werkdag.",
  alternates: { canonical: "/contact" },
};

/* what happens after sending, so nobody wonders what they are signing up for */
const next = [
  { title: "Je stuurt je aanvraag", body: "Een paar zinnen is genoeg. Je hoeft nog niets klaar te hebben." },
  { title: "Ik reageer zelf", body: "Meestal binnen één werkdag, met een voorstel voor een moment om te bellen." },
  { title: "We bellen een half uur", body: "Over je bedrijf, je klanten en wat de site moet opleveren. Daarna krijg je één vaste prijs." },
];

/* the three questions people have right before they send: what to bring, what it costs, how long it takes */
const questions = [5, 0, 1].map((i) => faq[i]);

export default function Page() {
  return (
    <>
      <Nav theme="photo" />
      <main id="main">
        {/* Hero, built like the homepage one: cream copy on the left over a full-width photo, the nav
            floating over the top. The photo is the mascot's arm letting a lime receiver dangle on its
            cord in the right third of a cloudy sky (a generated image, /images/contact-hero); a forest
            tint on the left carries the type. On phones the tint comes from the top and the receiver
            hangs under the copy. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <picture className="absolute inset-0 -z-20">
            <source srcSet="/images/contact-hero.webp" type="image/webp" />
            <img
              src="/images/contact-hero.jpg"
              alt="Een limegroene telefoonhoorn bungelt aan zijn krulsnoer aan de arm van de NXT Frame-mascotte, tegen een wolkenlucht"
              className="size-full object-cover object-[78%_50%] lg:object-[100%_40%]"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
          <div className="hero-shade absolute inset-0 -z-10 hidden lg:block" aria-hidden="true" />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.9)_0%,rgb(0_0_0/0.72)_38%,rgb(0_0_0/0.2)_60%,transparent_72%)] lg:hidden"
            aria-hidden="true"
          />

          <Container className="flex min-h-[600px] flex-col justify-start pb-56 pt-28 sm:pt-36 lg:min-h-[720px] lg:justify-center lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[54%]">
              <Eyebrow tone="light" className="max-w-xl">Contact</Eyebrow>
              <h1 className="mt-6 t-hero md:mt-8">
                Plan een <span className="serif-italic text-lime">kennismaking</span>
              </h1>
              <p className="mt-6 max-w-lg text-cream/85 t-lead">
                Vertel kort over je bedrijf en wat je site moet doen. Je krijgt antwoord van mij zelf, meestal binnen één werkdag.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <TextLink light href="#formulier">Naar het formulier</TextLink>
                <Reassure light />
              </div>
            </div>
          </Container>
        </section>

        {/* the form, straight under the photo */}
        <section id="formulier" className="scroll-mt-20 bg-cream py-16 text-forest md:pb-32 md:pt-24">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            {/* on phones this column comes apart (contents): the heading, then the form, then the steps and the mail link */}
            <div className="contents lg:sticky lg:top-28 lg:block lg:self-start">
              <div>
                <Eyebrow className="max-w-xl">Zo gaat het verder</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Een paar zinnen <span className="serif-italic">is genoeg</span>
                </h2>
              </div>

              <ol className="order-last space-y-6 border-t border-forest/15 pt-8 lg:order-none lg:mt-12">
                {next.map((n, i) => (
                  <li key={n.title} className="flex gap-4">
                    <span className="grid h-10 w-14 shrink-0 place-items-center rounded-full border border-forest font-display text-base font-semibold italic">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold tracking-tight">{n.title}</span>
                      <span className="mt-1 block max-w-sm text-[15px] leading-relaxed text-forest/70">{n.body}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="order-last flex flex-wrap items-center gap-x-6 gap-y-3 lg:order-none lg:mt-10">
                <p className="text-[15px] text-forest/70">Liever gewoon mailen?</p>
                <TextLink href="mailto:hallo@nxtframe.ai">hallo@nxtframe.ai</TextLink>
              </div>
            </div>

            <ContactForm />
          </Container>
        </section>

        <section className="bg-cream pb-16 pt-4 text-forest md:pb-32 md:pt-8">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Vooraf</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Drie vragen <span className="serif-italic">die bijna iedereen stelt</span>
              </h2>
              <TextLink href="/prijzen" className="mt-8">Alle vragen en prijzen</TextLink>
            </div>
            <FaqList items={questions} />
          </Container>
        </section>
      </main>
      <Footer cta={false} />
    </>
  );
}
