import type { ReactNode } from "react";
import CardVideo from "./CardVideo";
import { ArrowIcon } from "./ui";
import type { WorkItem } from "./workData";

/**
 * Ons werk in four card designs, each case with a short title (workData `short`):
 *   panel    the photo on top, a coloured panel with the text under it
 *   wide     a coloured card with the text, the photo running to its edges (rounded inner corners)
 *   clean    just the photo, the text quietly under it on the page, no panel
 *   overlay  the photo fills the card, the text on a dark fade at its foot
 * Desktop, three rows of 440px: panel (blush) + wide (wine); clean + overlay as two halves;
 * wide (forest) + panel (lime). Phones and tablets: a row you swipe, panel and wide in turn,
 * blush, wine, lime, forest, blush, wine.
 */
type Tone = { card: string; eyebrow: string; muted: string; light: boolean };
const tone = {
  blush: { card: "bg-[#fcbbb9] text-[#440220]", eyebrow: "text-[#440220]/75", muted: "text-[#440220]/70", light: false },
  lime: { card: "bg-lime text-forest", eyebrow: "text-forest/70", muted: "text-forest/70", light: false },
  wine: { card: "bg-[#440220] text-cream", eyebrow: "text-[#fcbbb9]", muted: "text-cream/70", light: true },
  forest: { card: "bg-forest text-cream", eyebrow: "text-lime", muted: "text-cream/70", light: true },
} satisfies Record<string, Tone>;

type Kind = "panel" | "wide" | "clean" | "overlay";
/* desktop: the design, the width (of 12 columns) and the colour of each case, in order */
const desktop: { kind: Kind; span: string; t?: Tone }[] = [
  { kind: "panel", span: "lg:col-span-4", t: tone.blush },
  { kind: "wide", span: "lg:col-span-8", t: tone.wine },
  { kind: "clean", span: "lg:col-span-6" },
  { kind: "overlay", span: "lg:col-span-6" },
  { kind: "wide", span: "lg:col-span-8", t: tone.forest },
  { kind: "panel", span: "lg:col-span-4", t: tone.lime },
];
/* phones: panel and wide in turn */
const phoneTones: Tone[] = [tone.blush, tone.wine, tone.lime, tone.forest, tone.blush, tone.wine];

function Media({ w, className }: { w: WorkItem; className: string }) {
  return w.video ? (
    <CardVideo src={w.video} className={`${className} object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]`} />
  ) : (
    <img
      src={w.img}
      alt=""
      className={`${className} object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
      style={w.pos ? { objectPosition: w.pos } : undefined}
      loading="lazy"
      decoding="async"
    />
  );
}

/* "Bekijk de case ->" with a hairline under it, the result as a small pill on the right */
function Foot({ w, light, className = "mt-5" }: { w: WorkItem; light?: boolean; className?: string }) {
  return (
    <span className={`flex flex-wrap items-center justify-between gap-3 ${className}`}>
      <span className={`inline-flex items-center gap-2 border-b pb-0.5 text-sm font-medium ${light ? "border-paper/50" : "border-current/40"}`}>
        {w.kind === "Klant" ? "Bekijk de case" : "Bekijk het concept"}
        <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      {w.result && (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${light ? "bg-lime text-forest" : "bg-forest text-paper"}`}>{w.result}</span>
      )}
    </span>
  );
}

function Eyebrow({ w, className = "" }: { w: WorkItem; className?: string }) {
  return (
    <span className={`block text-[13px] font-semibold uppercase tracking-[0.12em] ${className}`}>
      {w.kind} · {w.name}
    </span>
  );
}

/* the short title: a few words, so it can be big */
function Title({ w, className = "" }: { w: WorkItem; className?: string }) {
  return <span className={`mt-2 block font-display text-[1.6rem] font-medium leading-[1.05] tracking-tight lg:text-[1.9rem] ${className}`}>{w.short}</span>;
}

/* panel: photo on top, the coloured panel with the text under it */
function PanelCard({ w, t }: { w: WorkItem; t: Tone }) {
  return (
    <span className={`flex h-full flex-col overflow-hidden rounded-3xl ${t.card}`}>
      <span className="relative block min-h-0 flex-1 overflow-hidden rounded-3xl">
        <Media w={w} className="absolute inset-0 size-full" />
      </span>
      <span className="block p-5 lg:p-6">
        <Eyebrow w={w} className={t.eyebrow} />
        <Title w={w} />
        <Foot w={w} light={t.light} />
      </span>
    </span>
  );
}

/* wide: the text, and the photo running to the card's edges with rounded inner corners (right
   half on desktop, across the full width between the text and the link on phones) */
function WideCard({ w, t }: { w: WorkItem; t: Tone }) {
  return (
    <span className={`flex h-full flex-col overflow-hidden rounded-3xl lg:flex-row ${t.card}`}>
      <span className="flex flex-col p-5 pb-4 lg:w-[42%] lg:justify-center lg:p-8">
        <Eyebrow w={w} className={t.eyebrow} />
        <Title w={w} className="lg:text-[2.25rem]" />
        <span className={`mt-3 hidden max-w-xs text-sm leading-relaxed lg:block ${t.muted}`}>{w.tags}</span>
        <Foot w={w} light={t.light} className="mt-6 hidden lg:flex" />
      </span>
      <span className="relative block min-h-0 flex-1 overflow-hidden rounded-3xl">
        <Media w={w} className="absolute inset-0 size-full" />
      </span>
      <Foot w={w} light={t.light} className="p-5 pt-4 lg:hidden" />
    </span>
  );
}

/* clean: just the photo, and the text quietly under it on the page */
function CleanCard({ w }: { w: WorkItem }) {
  return (
    <span className="flex h-full flex-col text-forest">
      <span className="relative block min-h-0 flex-1 overflow-hidden rounded-3xl">
        <Media w={w} className="absolute inset-0 size-full" />
      </span>
      <span className="block pt-4">
        <Eyebrow w={w} className="text-forest/60" />
        <Title w={w} />
        <Foot w={w} className="mt-3" />
      </span>
    </span>
  );
}

/* overlay: the photo fills the card, the text on a dark fade at its foot */
function OverlayCard({ w }: { w: WorkItem }) {
  return (
    <span className="relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-forest p-6 text-cream">
      <Media w={w} className="absolute inset-0 size-full" />
      <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden="true" />
      <span className="relative block [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
        <Eyebrow w={w} className="text-lime" />
        <Title w={w} />
        <Foot w={w} light />
      </span>
    </span>
  );
}

function CaseLink({ w, className = "", children }: { w: WorkItem; className?: string; children: ReactNode }) {
  const external = w.href?.startsWith("http");
  return (
    <a
      href={w.href ?? "#"}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group block ${className}`}
    >
      {children}
    </a>
  );
}

export default function WorkBento({ items }: { items: WorkItem[] }) {
  const cases = items.slice(0, desktop.length);
  return (
    <>
      {/* phones and tablets: a row you swipe, panel and wide in turn */}
      <div className="-mx-6 snap-x snap-mandatory scroll-pl-6 overflow-x-auto pb-2 pl-6 md:-mx-12 md:scroll-pl-12 md:pl-12 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex w-max gap-3 pr-6 md:pr-12">
          {cases.map((w, i) => (
            <li key={w.name} className="w-[82vw] max-w-[360px] shrink-0 snap-start">
              <CaseLink w={w} className="h-[470px]">
                {i % 2 ? <WideCard w={w} t={phoneTones[i]} /> : <PanelCard w={w} t={phoneTones[i]} />}
              </CaseLink>
            </li>
          ))}
        </ul>
      </div>

      {/* desktop: three rows of 440px in four designs */}
      <ul className="hidden gap-4 lg:grid lg:grid-cols-12 lg:auto-rows-[440px]">
        {cases.map((w, i) => {
          const d = desktop[i];
          return (
            <li key={w.name} className={d.span}>
              <CaseLink w={w} className="h-full">
                {d.kind === "panel" && d.t && <PanelCard w={w} t={d.t} />}
                {d.kind === "wide" && d.t && <WideCard w={w} t={d.t} />}
                {d.kind === "clean" && <CleanCard w={w} />}
                {d.kind === "overlay" && <OverlayCard w={w} />}
              </CaseLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}
