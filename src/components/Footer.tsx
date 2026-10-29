import Link from "next/link";
import { FrameGlyph } from "./Logo";
import FooterWordmark from "./FooterWordmark";
import { ArrowIcon, Button, Reassure } from "./ui";
import MascotHero from "./MascotHero";
import FooterPanel from "./FooterPanel";

const diensten = ["Nieuwe website", "Redesign", "Landingspagina's", "Vindbaar in Google en AI", "Doorontwikkeling en onderhoud", "Teksten en content"];
const navigatie = ["Werk", "Diensten", "Prijzen", "Aanpak", "Voor makelaars", "Over", "Contact"];
const branches = ["Makelaars", "Webshops", "Adviseurs", "Horeca"];
const hrefs: Record<string, string> = { "Nieuwe website": "/website-laten-maken", Werk: "/werk", Diensten: "/diensten", Prijzen: "/prijzen", Aanpak: "/aanpak", "Voor makelaars": "/makelaars", Over: "/over", Contact: "/contact", Makelaars: "/makelaars", Redesign: "/website-redesign", "Landingspagina's": "/landingspagina-laten-maken", "Vindbaar in Google en AI": "/vindbaar-in-google-en-chatgpt", "Doorontwikkeling en onderhoud": "/website-onderhoud", "Teksten en content": "/website-teksten", Webshops: "/branches/webshops", Adviseurs: "/financieel-advies", Horeca: "/branches/horeca" };

/** a column of links; with `href` its heading links to the overview page */
function Col({ name, items, arrow = true, href }: { name: string; items: string[]; arrow?: boolean; href?: string }) {
  const head = "inline-flex items-center gap-1.5 font-display text-[18px] font-medium tracking-tight text-paper whitespace-nowrap";
  return (
    <div>
      {href ? (
        <a href={href} className={`${head} hover:text-lime`}>{name} {arrow && <ArrowIcon className="size-3.5" />}</a>
      ) : (
        <p className={head}>{name}</p>
      )}
      <ul className="mt-5 space-y-3.5">
        {items.map((i) => (
          <li key={i}>
            <a href={hrefs[i] ?? "#"} className="text-[15px] text-paper/60 transition-colors hover:text-paper">{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const socials: { label: string; path: string }[] = [
  { label: "LinkedIn", path: "M6.94 8.5V19H3.56V8.5h3.38ZM5.25 3.5a1.97 1.97 0 1 1 0 3.94 1.97 1.97 0 0 1 0-3.94ZM20.5 19h-3.37v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V19H10.1V8.5h3.24v1.43h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V19Z" },
  { label: "Instagram", path: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.85-7.8a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0ZM12 3c-2.44 0-2.75.01-3.71.05-3.4.16-5.1 1.87-5.24 5.24C3 9.25 3 9.56 3 12s.01 2.75.05 3.71c.15 3.38 1.85 5.09 5.24 5.24.96.04 1.27.05 3.71.05s2.75-.01 3.71-.05c3.38-.16 5.09-1.87 5.24-5.24.04-.96.05-1.27.05-3.71s-.01-2.75-.05-3.71c-.15-3.38-1.85-5.09-5.24-5.24C14.75 3.01 14.44 3 12 3Zm0 1.62c2.4 0 2.68.01 3.63.05 2.52.12 3.7 1.31 3.82 3.82.04.95.05 1.23.05 3.63s-.01 2.68-.05 3.63c-.12 2.5-1.3 3.7-3.82 3.82-.95.04-1.23.05-3.63.05s-2.68-.01-3.63-.05c-2.53-.12-3.7-1.32-3.82-3.82-.04-.95-.05-1.23-.05-3.63s.01-2.68.05-3.63c.12-2.51 1.3-3.7 3.82-3.82.95-.04 1.23-.05 3.63-.05Z" },
];

/** `cta={false}` leaves out the closing call to action, for the pages where it would point at itself (contact).
    `flat` gives the call to action a plain lime ground, so it runs on from a lime section above it. */
export default function Footer({ cta = true, flat = false }: { cta?: boolean; flat?: boolean } = {}) {
  return (
    // overflow-x-clip, not overflow-hidden: a hidden overflow would turn this into a scroll box and
    // stop the call to action from sticking
    <div className="relative overflow-x-clip bg-cream" data-zone="green">

      {/* Final CTA: a lime field that stays put while the footer panel slides up over it */}
      {cta && <section className={`footer-cta ${flat ? "footer-cta-flat" : ""} flex flex-col items-center justify-center px-6 py-20 md:sticky md:top-0 md:min-h-[72svh] md:py-16 text-center text-forest`}>
        {/* the mascot waves the visitor in; forest on the lime field, like the logo on a light ground */}
        <MascotHero
          pose="wave"
          className="mx-auto mb-2 h-36 w-44 md:h-44 md:w-52"
          style={{ "--hp-brand": "var(--color-forest)", "--hp-btn-fg": "var(--color-cream)" } as React.CSSProperties}
        />
        <h2 className="mx-auto max-w-4xl t-hero">
          Websites die <span className="serif-italic">gevonden worden</span>
          <br />
          en verkopen.
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-forest/70">
          Een gesprek van een half uur is genoeg om te weten of het klikt.
        </p>
        <div className="mt-10">
          <Button variant="dark" className="px-8 py-4 text-base" href="/contact">Plan een kennismaking</Button>
          <Reassure className="mt-3" />
        </div>
      </section>}

      {/* Footer: a forest panel with rounded shoulders that slides up over the lime field and widens
          as it rises (FooterPanel) */}
      <FooterPanel>
      <footer className="relative rounded-t-[36px] bg-forest text-paper md:rounded-t-[48px]">
        <div className="mx-auto w-full max-w-(--site-max) px-6 pb-16 pt-16 md:px-12 md:pt-24 xl:px-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-paper/20 pt-8 sm:gap-16 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr] lg:gap-10">
          <Col name="Diensten" items={diensten} arrow={false} href="/diensten" />
          <Col name="Navigatie" items={navigatie} arrow={false} />
          <Col name="Branches" items={branches} arrow={false} href="/branches" />
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-[18px] font-medium tracking-tight text-paper">Contact</p>
            <ul className="mt-5 space-y-3.5 text-[15px] text-paper/60">
              <li><a href="mailto:hallo@nxtframe.ai" className="hover:text-paper">hallo@nxtframe.ai</a></li>
              <li>Purmerend, werkt in heel Nederland</li>
              <li>KvK 42102903</li>
              <li><a href="/contact" className="inline-flex items-center gap-1.5 text-lime hover:text-paper">Plan een kennismaking <ArrowIcon className="size-3.5" /></a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex md:mt-24 flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[15px] text-paper/60">© 2026 NXT Frame · nxtframe.ai · Alle rechten voorbehouden.</p>
          </div>
          <ul className="flex flex-wrap gap-6 text-sm text-paper/60">
            {["Privacy", "Voorwaarden"].map((l) => (
              <li key={l}>
                <a href={`/${l.toLowerCase()}`} className="underline underline-offset-4 decoration-paper/30 hover:text-paper">{l}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="grid size-12 place-items-center rounded-full border border-paper/70 text-paper transition-colors hover:bg-paper hover:text-forest">
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
              </a>
            ))}
            <Link href="/" aria-label="NXT Frame, naar de homepage" className="ml-2 grid size-11 place-items-center rounded-lg bg-lime text-forest">
              <FrameGlyph className="size-5" />
            </Link>
          </div>
        </div>
        {/* the wordmark closes the page, full width, settling into place as you scroll */}
        <FooterWordmark />
        </div>
      </footer>
      </FooterPanel>
    </div>
  );
}
