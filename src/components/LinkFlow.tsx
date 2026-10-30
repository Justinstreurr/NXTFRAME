import type { CSSProperties } from "react";
import { FrameGlyph } from "./Logo";
import BranchIcon, { type IconKey } from "./BranchIcons";

/**
 * The two pictures of Koppelingen on the branch pages (the makelaars content is the default), after Relume's "The engine": a faint grid
 * that breaks up into squares at its foot, so the picture dissolves into the card under it.
 * LinkIn: the packages on the left feed a hub, the hub feeds the listings on the site; small
 * dashes run along the lines. LinkOut: the requests that come back, a stack of cards where the
 * front one drops away and the next moves up. Pure CSS motion (see .lf- in globals.css).
 */

/* which cells of the two square rows at the foot are cut out (1), so the edge looks pixelated */
const EDGE = [
  "100110100010110010011010010110100",
  "111111011101111111101111011111111",
];

/* the colour of the card's text part under each picture: wine for what comes in, lime for what goes
   back. The squares at the picture's foot take that colour, so the picture breaks up into it. */
export const cardTones = {
  wine: "bg-[#440220]",
  lime: "bg-lime",
};

function PixelEdge({ tone }: { tone: keyof typeof cardTones }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20" aria-hidden="true">
      {EDGE.map((row, r) => (
        <div key={r} className="flex">
          {[...row].map((c, i) => (
            <span key={i} className={`aspect-square flex-1 ${c === "1" ? cardTones[tone] : ""}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* the grid ground both pictures share: quiet sand, the colour sits in the text part below */
const ground: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgb(2 38 30 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(2 38 30 / 0.07) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

export function Frame({ tone, children }: { tone: keyof typeof cardTones; children: React.ReactNode }) {
  return (
    <div className="relative h-[300px] overflow-hidden bg-sand md:h-[340px]" style={ground}>
      {children}
      <PixelEdge tone={tone} />
    </div>
  );
}

/* what feeds the site, top to bottom on the left: a logo where there is one, else an icon */
export type LinkSource = { name: string; src?: string; icon?: IconKey };
/* a tile on the drawn page of the site, with the label that came along from the source */
export type LinkTile = { status: string; tone: string };
/* a request that comes back to the owner */
export type LinkRequest = { title: string; meta: string; tag: string };

/* the three source tiles sit at these heights, in % of the picture */
const ys = [17, 43, 69];

const makelaarsSources: LinkSource[] = [
  { name: "Realworks", src: "/images/logos/realworks.webp" },
  { name: "Kolibri", src: "/images/logos/kolibri.webp" },
  { name: "Feed", icon: "refresh" },
];

/* the drawn listings on the site, each with the status that came along from the package */
const makelaarsTiles: LinkTile[] = [
  { status: "Nieuw", tone: "bg-lime text-forest" },
  { status: "Verkocht o.v.", tone: "bg-[#440220] text-[#fcbbb9]" },
  { status: "Te koop", tone: "bg-paper text-forest" },
  { status: "Open huis", tone: "bg-forest text-paper" },
];

export function LinkIn({
  sources: given = makelaarsSources,
  page = "Aanbod",
  tiles = makelaarsTiles,
  icon = "house",
}: { sources?: LinkSource[]; page?: string; tiles?: LinkTile[]; icon?: IconKey } = {}) {
  const sources = given.slice(0, 3).map((x, n) => ({ ...x, y: ys[n] }));
  return (
    <Frame tone="wine">
      {/* the lines, in a 100x100 box stretched over the picture: package to hub, hub to site */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {sources.map((s) => (
          <g key={s.name}>
            <path d={`M16 ${s.y} C 30 ${s.y}, 30 46, 44 46`} className="lf-line" vectorEffect="non-scaling-stroke" />
            <path d={`M16 ${s.y} C 30 ${s.y}, 30 46, 44 46`} className="lf-dash" pathLength={100} vectorEffect="non-scaling-stroke" />
          </g>
        ))}
        <path d="M56 46 L 66 46" className="lf-line" vectorEffect="non-scaling-stroke" />
        <path d="M56 46 L 66 46" className="lf-dash" pathLength={100} vectorEffect="non-scaling-stroke" />
      </svg>

      {/* the source tiles: a glossy tile with the logo, or an icon on a lime badge, and the name as a
          small dark label hanging under it */}
      {sources.map((s) => (
        <span
          key={s.name}
          className="absolute left-[16%] z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${s.y}%` }}
        >
          <span className="grid size-12 place-items-center rounded-2xl bg-[linear-gradient(180deg,#ffffff_0%,#f3f1ea_100%)] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_12px_24px_-12px_rgba(2,38,30,0.45)] ring-1 ring-forest/10 md:size-14">
            {s.src ? (
              <img src={s.src} alt="" className="size-7 object-contain md:size-8" loading="lazy" />
            ) : (
              <span className="grid size-8 place-items-center rounded-xl bg-lime text-forest shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] md:size-9">
                <BranchIcon name={s.icon ?? "grid"} className="size-[18px] md:size-5" />
              </span>
            )}
          </span>
          <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-forest px-2 py-0.5 text-[10px] font-semibold tracking-wide text-cream shadow-[0_6px_12px_-8px_rgba(0,0,0,0.5)]">
            {s.name}
          </span>
        </span>
      ))}

      {/* the hub: the site itself, the glossy icon of the homepage card "Koppelingen met je systemen",
          floating gently over its shadow, a pulse running out from it */}
      <span className="absolute left-1/2 top-[46%] z-10 size-24 -translate-x-1/2 -translate-y-1/2 md:size-28" aria-hidden="true">
        <span className="absolute inset-x-[18%] -bottom-2 h-3 rounded-[50%] bg-black/35 blur-md" />
        <span className="sb-float absolute inset-0">
          <span className="lf-pulse absolute inset-[6%] rounded-[24%]" />
          <img src="/images/icon-koppelingen.webp" alt="" className="relative size-full" loading="lazy" decoding="async" />
        </span>
      </span>

      {/* where it lands: the listings page of the site, drawn (no screenshot), running off the right edge */}
      <div
        className="absolute left-[66%] top-[46%] w-[280px] -translate-y-1/2 rounded-xl bg-paper p-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)] md:w-[320px]"
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5 px-1 pb-3">
          <span className="size-1.5 rounded-full bg-forest/20" />
          <span className="size-1.5 rounded-full bg-forest/20" />
          <span className="size-1.5 rounded-full bg-forest/20" />
          <span className="ml-2 text-[11px] font-semibold text-forest/70">{page}</span>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {tiles.map((l) => (
            <li key={l.status} className="rounded-lg bg-cream p-2">
              <span className="relative grid h-14 place-items-center rounded-md bg-sand text-forest/30 md:h-16">
                <BranchIcon name={icon} className="size-5" />
                <span className={`absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${l.tone}`}>{l.status}</span>
              </span>
              <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-forest/20" />
              <span className="mt-1 block h-1.5 w-1/2 rounded-full bg-forest/10" />
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

/* the requests that come back, in the order they cycle */
const makelaarsRequests: LinkRequest[] = [
  { title: "Nieuwe waardebepaling", meta: "Dorpsstraat 12, Haaksbergen", tag: "In je CRM" },
  { title: "Bezichtiging aangevraagd", meta: "Zaterdag 10:30 · Molenweg 4", tag: "Per mail" },
  { title: "Terugbelverzoek", meta: "Na 17:00 · over verkopen", tag: "Voor Miriam" },
];

export function LinkOut({ requests = makelaarsRequests }: { requests?: LinkRequest[] } = {}) {
  return (
    <Frame tone="lime">
      <ul className="absolute inset-x-0 top-[54%] mx-auto h-0 w-[80%] max-w-[360px]">
        {requests.map((r, i) => (
          <li
            key={r.title}
            className="lf-card absolute inset-x-0 -translate-y-1/2 rounded-2xl bg-paper p-4 shadow-[0_18px_36px_-18px_rgba(0,0,0,0.4)] ring-1 ring-forest/10 md:p-5"
            style={{ "--i": i } as CSSProperties}
          >
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lime" aria-hidden="true">
                <FrameGlyph className="size-3 text-forest" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-forest">{r.title}</span>
                <span className="block truncate text-[13px] text-forest/70">{r.meta}</span>
              </span>
              <span className="shrink-0 rounded-full border border-forest/15 px-2.5 py-1 text-[11px] font-medium text-forest/70">{r.tag}</span>
            </div>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
