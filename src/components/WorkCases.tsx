import Link from "next/link";
import type { ReactNode } from "react";
import { FrameGlyph } from "./Logo";
import type { WorkItem } from "./workData";

const initials = (s: string) =>
  s
    .split(/\s+/)
    .filter((w) => w.length > 2 || /^[A-Z]/.test(w))
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** the small square mark in the caption, like an app icon: the client's initials, or the frame glyph for a concept */
function Mark({ w }: { w: WorkItem }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-md bg-cream text-[11px] font-bold tracking-tight text-forest" aria-hidden="true">
      {w.kind === "Klant" ? initials(w.name) : <FrameGlyph className="size-4" />}
    </span>
  );
}

/**
 * One case as a tall photo tile, after the work grid of design studios like Haptic: the photo fills
 * the tile, a small tag sits top right on the concepts, and the caption sits bottom left as a small
 * app-like mark with the name and one line under it. Deliberately still: no scroll animation, no
 * filters, only the photo easing in a little under the pointer (a transform, handled by the GPU).
 */
function Tile({ w }: { w: WorkItem }) {
  const external = w.href?.startsWith("http");
  return (
    <a
      href={w.href ?? "#"}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-forest text-cream"
    >
      <img
        src={w.card?.src ?? w.img}
        alt=""
        width={800}
        height={1000}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={{ objectPosition: w.card?.pos ?? w.pos }}
        loading="lazy"
        decoding="async"
      />
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgb(0_0_0/0.6),transparent)]" aria-hidden="true" />
      {w.kind === "Concept" && (
        <span className="absolute right-3 top-3 rounded bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cream">
          Concept
        </span>
      )}
      <span className="absolute inset-x-3 bottom-3 flex items-center gap-2.5">
        <Mark w={w} />
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-semibold leading-tight">{w.name}</span>
          <span className="block truncate text-[13px] leading-tight text-cream/75">{w.tags}</span>
        </span>
      </span>
    </a>
  );
}

/** the last tile when there is room: black, the frame mark large in the middle, and the way to a first talk */
function YoursTile() {
  return (
    <Link href="/contact" className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-black text-cream">
      <span className="absolute inset-0 grid place-items-center">
        <FrameGlyph className="size-24 text-cream transition-transform duration-700 ease-out group-hover:scale-110 md:size-28" />
      </span>
      <span className="absolute inset-x-3 bottom-3 flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-md bg-lime text-forest" aria-hidden="true">
          <FrameGlyph className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold leading-tight">Jouw bedrijf</span>
          <span className="block text-[13px] leading-tight text-cream/75">Plan een kennismaking</span>
        </span>
      </span>
    </Link>
  );
}

/**
 * Ons werk as a studio work grid: three tall tiles a row on desktop with tight gutters, the cases
 * first and a black "Jouw bedrijf" tile to round the grid off; on phones a row you swipe. `header`
 * replaces the heading line (the case pages bring their own).
 */
export default function WorkCases({ items, header, yours = true }: { items: WorkItem[]; header?: ReactNode; yours?: boolean }) {
  const cases = items.slice(0, 5);
  const withYours = yours && cases.length % 3 !== 0;
  return (
    <>
      {header}
      <ul className="-mx-6 mt-6 flex snap-x snap-mandatory scroll-pl-6 gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
        {cases.map((w) => (
          <li key={w.name} className="w-[78vw] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none">
            <Tile w={w} />
          </li>
        ))}
        {withYours && (
          <li className="w-[78vw] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none">
            <YoursTile />
          </li>
        )}
      </ul>
    </>
  );
}
