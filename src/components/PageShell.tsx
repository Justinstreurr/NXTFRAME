import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Container, Eyebrow } from "./ui";

/**
 * Shared frame for the inner pages: nav, a cream page header with eyebrow, title and intro,
 * optional page content underneath, and the footer.
 */
export default function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main id="main">
        <section data-zone="cherry" className="bg-cream pt-16 pb-12 text-forest md:pt-32 md:pb-32">
          <Container>
            <Eyebrow className="max-w-xl">{eyebrow}</Eyebrow>
            <h1 className="mt-6 max-w-5xl t-hero text-forest md:mt-8">
              {title}
            </h1>
            {intro && <p className="mt-6 max-w-2xl text-forest/75 t-lead">{intro}</p>}
            {children}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
