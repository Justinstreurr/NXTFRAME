import { preload } from "react-dom";
import { ArrowIcon, Button, Container, Reassure, TextLink } from "./ui";
import { FrameGlyph } from "./Logo";
import LogoTicker, { type TickerLogo } from "./LogoTicker";

/* phones in portrait get their own crop of the photo, just the chair and the sky around it (a
   third of the bytes); every other screen gets the full picture */
const PHONE = "(max-width: 639px) and (max-aspect-ratio: 5/8)";
const HERO_M = "/images/hero-hill-m.webp";
const HERO = "/images/hero-hill.webp?v=3";

/* the brands under the hero copy, in cream on the dark photo */
const logos: TickerLogo[] = [
  { name: "Happy Flops", src: "/images/happy-flops-logo.png", avif: "/images/happy-flops-logo.avif", h: "h-6 md:h-7", href: "/werk/happy-flops" },
  { name: "Hypotheekhaven", src: "/images/hypotheekhaven-logo.svg", h: "h-5 md:h-6", href: "/werk/hypotheekhaven" },
];

/**
 * Homepage hero, built like the Branches hero: left-aligned cream copy straight over a
 * full-width photo, the nav floating see-through over the top (Nav theme="photo"). The photo
 * is the mascot itself, sitting on a chair on a hill in the right third of the frame, working
 * on its MacBook (a generated render, /images/hero-hill); the left two thirds are open sky for
 * the copy. A forest tint runs heavy on the left and at the foot, so the cream type reads and
 * the hero melts into the page, and stays light on the right to keep the mascot in the sun.
 * On phones the picture runs under the copy, cropped to the chair. The brands we worked for
 * close the hero at the bottom.
 */
export default function Hero() {
  // the photo is the largest thing on the first screen: ask for it in the <head>, ahead of the fonts and scripts
  preload(HERO_M, { as: "image", type: "image/webp", fetchPriority: "high", media: PHONE });
  preload(HERO, { as: "image", type: "image/webp", fetchPriority: "high", media: `not all and ${PHONE}` });

  return (
    <section data-zone="green" className="hero relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest text-cream lg:block lg:min-h-0">
      {/* the picture fills the hero edge to edge on every screen: anchored top right on desktop so the
          mascot on its cloud stays in frame, cropped onto the mascot on phones */}
      <picture className="absolute inset-0 -z-20">
        <source srcSet={HERO_M} media={PHONE} type="image/webp" />
        <source srcSet={HERO} type="image/webp" />
        <img
          src="/images/hero-hill.jpg?v=3"
          alt="De NXT Frame-mascotte, werkend op een MacBook op een wolk"
          className="size-full object-cover object-[76%_62%] lg:object-[80%_30%]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable={false}
        />
      </picture>
      {/* desktop: one black gradient over the left half only, gone before the chair, so the cream copy
          reads on the bright sky; phones: black from the top behind the copy and from the foot behind
          the buttons, the mascot clear in between (see .hero-shade / .hero-shade-m in globals.css) */}
      <div className="hero-shade absolute inset-0 -z-10 hidden lg:block" aria-hidden="true" />
      <div className="hero-shade-m absolute inset-0 -z-10 lg:hidden" aria-hidden="true" />

      {/* two groups: headline with its text, and one bottom row with the buttons and the brands. On
          phones the copy sits at the top and the buttons at the foot, with the mascot between them. */}
      <Container className="relative z-10 flex flex-1 flex-col pt-28 sm:pt-40 md:pt-48 lg:min-h-[640px] lg:pt-32">
        {/* the headline block: at the top on phones, in the vertical middle of the hero on desktop */}
        <div className="flex flex-1 flex-col justify-start pb-8 lg:justify-center lg:pb-10">
          <div className="max-w-2xl lg:max-w-[52%]">
            <h1 className="t-hero">
              Websites die
              <br />
              <span className="serif-italic text-lime">gevonden worden</span>
              <br />
              en{" "}
              <span className="word-reveal relative inline-block align-baseline">
                <span className="wr-inner inline-block">verkopen.</span>
                <span
                  className="wr-tl pointer-events-none absolute size-6 rounded-tl-md border-l-[3px] border-t-[3px] border-lime md:size-8 md:border-l-4 md:border-t-4"
                  aria-hidden="true"
                />
                <span
                  className="wr-br pointer-events-none absolute size-6 rounded-br-md border-b-[3px] border-r-[3px] border-lime md:size-8 md:border-b-4 md:border-r-4"
                  aria-hidden="true"
                />
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-cream/80 t-lead">
              Vindbaar in Google en ChatGPT, snel op elk scherm en gebouwd om aanvragen op te leveren.
              {/* phones keep the hero to the promise; the second line comes from sm up */}
              <span className="hidden sm:inline"> Je werkt direct met de maker, niet met een bureau.</span>
            </p>
            {/* one line of proof under the promise; PLACEHOLDERS until the real Happy Flops numbers are in */}
            <ul className="mt-7 hidden flex-wrap items-center gap-x-6 gap-y-2 text-[15px] font-medium text-cream/90 sm:flex">
              {["0,9 s laadtijd", "100 PageSpeed", "Vindbaar in Google en AI"].map((t, i) => (
                <li key={t} className="flex items-center gap-2" style={{ "--i": i } as React.CSSProperties}>
                  <span className="proof-glyph inline-flex"><FrameGlyph className="size-3 text-lime" /></span>
                  {/* every 5 s a band of light sweeps across the words and the glyph flares, one after another */}
                  <span className="proof-shine">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* the foot of the hero: the buttons on the left, the brands we already worked for on the right */}
      <Container className="relative z-10 pb-8 pt-6 md:pb-12 lg:pb-14 lg:pt-0">
        <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-8">
          {/* one filled button, the case as a quiet link next to it, and the line that takes the doubt away */}
          <div data-hero-cta className="flex w-full flex-col gap-x-7 gap-y-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-start lg:flex-nowrap">
            <span className="flex flex-col gap-2">
              <Button className="w-full px-7 py-4 text-base sm:w-auto" href="/contact">
                Plan een kennismaking
              </Button>
              <Reassure light className="text-center sm:text-left" />
            </span>
            <TextLink light href="/werk/happy-flops" className="self-center sm:mt-4 sm:self-auto">
              Bekijk de Happy Flops case
            </TextLink>
          </div>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-5 md:gap-x-16">
            {/* the brands side by side; every few seconds they slide up and out and swap places from below */}
            <LogoTicker logos={logos} />
            <a
              href="/contact"
              className="group hidden items-center gap-2 rounded-full border border-dashed border-cream/35 px-4 py-2 text-sm font-medium text-cream/75 transition-colors hover:border-lime hover:bg-lime hover:text-forest sm:inline-flex"
            >
              Jouw merk hier?
              <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
