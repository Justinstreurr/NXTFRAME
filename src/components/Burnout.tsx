import type { ReactNode } from "react";
import { Button, Container, Eyebrow } from "./ui";
import { FrameGlyph } from "./Logo";
import LetterFill from "./LetterFill";

export type Pain = { title: ReactNode; body: string; src: string; pos?: string };

/* the caption panel colours in turn: forest, sand, lime */
const panels = [
  { panel: "bg-forest text-cream group-hover:bg-forest-hover", accent: "group-hover:text-lime" },
  { panel: "bg-sand text-forest group-hover:bg-[#f7efe7]", accent: "" },
  { panel: "bg-lime text-forest group-hover:bg-[#e6fdb0]", accent: "" },
];

const homePains: Pain[] = [
  {
    title: (
      <>
        Traag <span className="serif-italic">op mobiel</span>
      </>
    ),
    body: "Elke seconde laadtijd kost bezoekers. Op een telefoon haken ze af voordat je aanbod in beeld is.",
    src: "/images/traag-mobiel.webp",
    pos: "58% 50%",
  },
  {
    title: (
      <>
        <span className="serif-italic">Onvindbaar</span> in Google en AI
      </>
    ),
    body: "Zoekmachines en ChatGPT begrijpen je site niet. Klanten die nu al zoeken, komen bij een ander uit.",
    src: "/images/herkenbaar-2.webp",
    pos: "50% 28%",
  },
  {
    title: (
      <>
        Gebouwd voor <span className="serif-italic">een andere tijd</span>
      </>
    ),
    body: "Een template van jaren terug, met tekst die niemand meer leest. Het voelt niet als jouw bedrijf van nu.",
    src: "/images/andere-tijd.webp",
  },
];

/**
 * Herkenbaar: the pains as tall photo cards. The homepage uses the defaults; a branch page passes
 * its own heading, lead and pains, so both read as the same section.
 */
export default function Burnout({
  title = (
    <>
      Je huidige site{" "}
      {/* "kost je klanten" fills in letter by letter, light grey to dark, as it scrolls up */}
      <span className="serif-italic"><LetterFill parts={[{ text: "kost je klanten" }]} /></span>
    </>
  ),
  lead = "Traag, onvindbaar en gebouwd in een tijd dat niemand ChatGPT om advies vroeg. Drie signalen die je waarschijnlijk herkent.",
  pains = homePains,
}: { title?: ReactNode; lead?: string; pains?: Pain[] } = {}) {
  return (
    <section data-zone="green" className="bg-cream py-16 text-forest md:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Eyebrow className="max-w-xl">Herkenbaar?</Eyebrow>
            <h2 className="mt-6 t-section md:mt-8">{title}</h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-forest/75 md:text-xl">{lead}</p>
        </div>

        {/* Photo cards: a caption panel sits on the photo; on hover it keeps its own colour, a shade
            lighter, and the body text unfolds beneath it (always unfolded on touch screens). */}
        <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
          {pains.map((p, i) => {
            const t = panels[i % panels.length];
            return (
              <li key={p.src} className="group relative h-[360px] overflow-hidden rounded-b-3xl bg-moss sm:h-[520px] md:h-[600px]">
                <img
                  src={p.src}
                  alt=""
                  style={p.pos ? { objectPosition: p.pos } : undefined}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className={`absolute inset-x-0 bottom-0 p-8 transition-colors duration-500 ease-out md:p-10 ${t.panel}`}>
                  {/* two lines tall on desktop, so the three caption bars line up whatever the title length */}
                  <h3 className={`font-display text-[1.65rem] leading-tight tracking-tight transition-colors duration-500 md:min-h-[2.5em] md:text-3xl ${t.accent}`}>
                    {p.title}
                  </h3>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-4 text-[15px] leading-relaxed opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-85 [@media(hover:none)]:opacity-85">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 flex flex-col items-start gap-6 border-t border-forest/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="flex max-w-xl items-center gap-3 text-lg text-forest/80">
            <FrameGlyph className="size-3.5 shrink-0 text-forest" />
            In een half uur bekijken we samen waar je site nu klanten laat liggen.
          </p>
          <Button variant="dark" className="px-7 py-4 text-base" href="/contact">
            Plan een kennismaking
          </Button>
        </div>
      </Container>
    </section>
  );
}
