import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import BranchIcon, { type IconKey } from "./BranchIcons";
import { Container, Eyebrow } from "./ui";

/* PARKED: not on any page right now. It stood on /prijzen between the packages and "Altijd inbegrepen";
   to bring it back, render <PriceFactors /> there. */

const factors: { title: string; icon: IconKey; body: string; down: string; up: string }[] = [
  {
    title: "Aantal pagina's",
    icon: "layout",
    body: "Elke pagina met een eigen doel vraagt ontwerp en tekst.",
    down: "Pagina's die dezelfde opbouw delen, zoals een reeks diensten of projecten. Eén keer ontwerpen, daarna vullen.",
    up: "Veel pagina's die elk een eigen ontwerp en een eigen verhaal nodig hebben.",
  },
  {
    title: "Koppelingen",
    icon: "refresh",
    body: "Alles wat de site moet doorgeven aan een ander systeem.",
    down: "Een formulier of afsprakenplanner. Dat zit er standaard in.",
    up: "Een koppeling met je CRM, reserveringssysteem of woningaanbod. Hoe minder standaard het systeem, hoe meer werk.",
  },
  {
    title: "Content",
    icon: "pen",
    body: "Teksten en foto's: aanleveren of samen maken.",
    down: "Je levert teksten en foto's aan die klaar zijn om te plaatsen. Ik zet ze in de structuur.",
    up: "We maken de teksten samen, of er zijn nieuwe foto's nodig. Kost meer, en is vaak het grootste verschil in resultaat.",
  },
  {
    title: "Omvang van de webshop",
    icon: "cart",
    body: "Een shop met tien producten is een ander project dan een shop met duizend.",
    down: "Een overzichtelijk assortiment, weinig varianten en standaard verzending.",
    up: "Veel producten en varianten, filters, meerdere talen of landen, of afwijkende verzendregels.",
  },
];

/** The mark for a factor's direction, after the score marks in the comparison table: lime with an arrow down for less, forest with an arrow up for more. */
function Direction({ dir, delay = 0 }: { dir: "down" | "up"; delay?: number }) {
  return (
    <span
      style={{ "--d": `${delay}ms` } as CSSProperties}
      className={`score grid size-7 shrink-0 place-items-center rounded-full ${dir === "down" ? "bg-lime text-forest" : "bg-forest text-lime"}`}
    >
      <svg viewBox="0 0 24 24" className={`size-4 ${dir === "up" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 5v14M6 13l6 6 6-6" />
      </svg>
    </span>
  );
}

/**
 * What moves the price: the four factors side by side as four panels, built like the comparison
 * table (Comparison in Sections.tsx), each read downwards: what it is, when it costs less, when it
 * costs more. Phones get the same four panels stacked.
 */
export default function PriceFactors() {
  return (
  <section data-zone="green" className="bg-forest py-12 text-paper md:py-32">
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
        <div>
          <Eyebrow tone="light" className="max-w-xl">Wat bepaalt de prijs</Eyebrow>
          <h2 className="mt-6 t-section md:mt-8">
            Wat de prijs <span className="serif-italic text-lime">omhoog of omlaag brengt</span>
          </h2>
        </div>
        <p className="max-w-md text-paper/80 t-lead">
          Vier dingen bepalen waar jouw offerte uitkomt. Je hoort in de kennismaking al welke kant het op gaat, en waarom.
        </p>
      </div>

      {/* phones and tablets: one panel per factor */}
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
        {factors.map((f) => (
          <li key={f.title} className="rounded-3xl bg-paper p-6 text-forest">
            <span className="grid size-12 place-items-center rounded-2xl bg-forest/[0.06]">
              <BranchIcon name={f.icon} className="size-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-forest/70">{f.body}</p>
            <dl className="mt-5 space-y-4 border-t border-forest/10 pt-5 text-[15px] leading-relaxed">
              <div>
                <dt className="flex items-center gap-2 text-sm font-semibold"><Direction dir="down" /> Lager als</dt>
                <dd className="mt-2 text-forest/75">{f.down}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-sm font-semibold"><Direction dir="up" /> Hoger als</dt>
                <dd className="mt-2 text-forest/75">{f.up}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {/* desktop: the four panels as columns of one table, the three questions as its rows */}
      <Reveal threshold={0.25} className="cmp mt-12 md:mt-16 hidden lg:block">
        <table className="w-full table-fixed border-separate border-spacing-x-3 border-spacing-y-0 text-left">
          <thead>
            <tr>
              <td className="w-36" />
              {factors.map((f) => (
                <th key={f.title} scope="col" className="rounded-t-3xl bg-paper px-6 pb-2 pt-8 align-top text-forest">
                  <span className="grid size-12 place-items-center rounded-2xl bg-forest/[0.06]">
                    <BranchIcon name={f.icon} className="size-6" />
                  </span>
                  <span className="mt-5 block font-display text-xl font-semibold tracking-tight">{f.title}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pr-4 align-top text-sm font-medium text-paper/70" />
              {factors.map((f) => (
                <td key={f.title} className="bg-paper px-6 pb-6 align-top text-[15px] leading-relaxed text-forest/70">
                  {f.body}
                </td>
              ))}
            </tr>
            {(["down", "up"] as const).map((dir, ri) => (
              <tr key={dir}>
                <th scope="row" className="py-5 pr-4 align-top text-sm font-medium text-paper/80">{dir === "down" ? "Lager als" : "Hoger als"}</th>
                {factors.map((f, ci) => (
                  <td
                    key={f.title}
                    className={`bg-paper px-6 pt-5 align-top text-[15px] leading-relaxed text-forest/80 ${dir === "up" ? "rounded-b-3xl pb-8" : "pb-5"}`}
                  >
                    <span className="block border-t border-forest/10 pt-5">
                      <Direction dir={dir} delay={(ri * factors.length + ci) * 70} />
                      <span className="mt-3 block">{f[dir]}</span>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-paper/70 lg:mt-10">
        Past wat je wilt niet in je budget? Dan zeg ik dat eerlijk en kijken we wat eerst moet en wat later kan.
      </p>
    </Container>
  </section>
  );
}
