import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MascotHero from "@/components/MascotHero";
import { LogoMark } from "@/components/Logo";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pagina niet gevonden | NXT Frame",
  description: "Deze pagina bestaat niet of is verhuisd. Ga terug naar home of kijk bij werk, diensten of contact.",
};

// the pages people look for most, as quiet links next to the one filled button
const links = [
  { label: "Werk", href: "/werk" },
  { label: "Diensten", href: "/diensten" },
  { label: "Website laten maken", href: "/website-laten-maken" },
  { label: "Contact", href: "/contact" },
];

// forest with lime, like the eyebrow on a light ground
const palette = { "--hp-brand": "var(--color-forest)", "--hp-btn-fg": "var(--color-lime)" } as CSSProperties;

/**
 * The 404 page, for every address the site does not know and for `notFound()` calls. Built like the
 * PageShell header, but one screen tall and with the way back as the main action. Next.js sends
 * the 404 status and the noindex robots tag itself.
 */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* one screen minus the 72px nav bar, so the footer's call to action starts right below the fold */}
        <section data-zone="cherry" className="flex min-h-[calc(100svh-72px)] items-center bg-cream py-12 text-forest md:py-32">
          <Container className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
            <div>
              <Eyebrow>404</Eyebrow>
              <h1 className="mt-6 max-w-4xl t-hero text-forest md:mt-8">
                Deze pagina is <span className="serif-italic">niet gevonden</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-forest/75 t-lead">
                Ik bouw websites die gevonden worden, maar deze pagina zit er niet bij. Misschien is de link verouderd, of staat er
                een tikfout in het adres.
              </p>
              <div className="mt-10">
                <Button variant="dark" className="px-8 py-4 text-base" href="/">Terug naar home</Button>
              </div>
              <nav aria-label="Veelgezochte pagina's" className="mt-10">
                <p className="text-[13px] text-forest/70">Of ga direct naar</p>
                <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
                  {links.map((l) => (
                    <li key={l.href}>
                      <TextLink href={l.href}>{l.label}</TextLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* The mascot points the way back. On desktop he stands right of the text and is mirrored, so
                his arm and the "next" chevron both aim at the title and the button; on mobile he stands
                above the text and points along the line. With reduced motion the box is display: none,
                so it never comes near the viewport and the 3D scene is not loaded at all. */}
            <div className="order-first md:order-none" style={palette}>
              <MascotHero
                pose="point"
                interactive={false}
                className="h-36 w-44 motion-reduce:hidden md:h-72 md:w-80 md:-scale-x-100 lg:h-96 lg:w-[26rem]"
              />
              {/* still stand-in for visitors who asked for less motion: the mark the mascot is built from */}
              <span className="hidden size-20 place-items-center rounded-2xl bg-forest text-lime motion-reduce:grid md:size-28" aria-hidden="true">
                <LogoMark className="size-10 md:size-14" />
              </span>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
