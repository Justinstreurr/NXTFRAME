"use client";

import { useState, type ReactNode } from "react";
import { FrameCorners } from "./Logo";
import { ArrowIcon, Container } from "./ui";
import WaterHover from "./WaterHover";
import { work, type WorkItem } from "./workData";

/**
 * The Werk page body, built like the Branches page (BranchGallery): the section heading, a filter
 * row (all, clients, concepts), and then the cases as one edge-to-edge grid of three, flush against
 * each other with square corners and the name inside the photo. With every case showing, a blush
 * tile closes the grid for the visitor who wants theirs in it.
 */
type Filter = "alle" | WorkItem["kind"];

const filters: { key: Filter; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "Klant", label: "Klanten" },
  { key: "Concept", label: "Concepten" },
];

export default function WorkGallery({ header }: { header: ReactNode }) {
  const [filter, setFilter] = useState<Filter>("alle");
  const items = filter === "alle" ? work : work.filter((w) => w.kind === filter);
  const clients = work.filter((w) => w.kind === "Klant").length;
  // on phones (two to a row) an odd number of cases leaves one cell open for the last tile
  const half = items.length % 2 === 1;

  return (
    <>
      <Container>
        {header}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-forest/15 pt-6 md:mt-12">
          <div className="flex flex-wrap items-center gap-2">
            <Label>Filter:</Label>
            {filters.map((f) => (
              <Pill key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label}
              </Pill>
            ))}
          </div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-forest/70">
            {clients} klanten · {work.length - clients} concepten
          </p>
        </div>
      </Container>

      {/* three in a row, flush, square corners, from the left edge of the window to the right */}
      <ul className="mt-8 grid grid-cols-2 md:mt-10 lg:grid-cols-3">
        {items.map((w) => (
          <li key={w.name}>
            <a href={w.href ?? "/contact"} className="group relative block aspect-[3/4] overflow-hidden bg-forest text-paper sm:aspect-[4/5] lg:aspect-square">
              {/* the photo, under water while the mouse is over the tile (WaterHover), as on the branch tiles */}
              <WaterHover>
                <img
                  src={w.img}
                  alt=""
                  style={w.pos ? { objectPosition: w.pos } : undefined}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </WaterHover>
              <FrameCorners className="text-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100" inset="inset-5" corners="anti" />
              <span
                className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold sm:left-5 sm:top-5 sm:px-3 sm:text-xs ${
                  w.kind === "Klant" ? "bg-lime text-forest" : "bg-black/45 text-paper/90 backdrop-blur-sm"
                }`}
              >
                {w.kind}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-4 pt-16 sm:px-6 sm:pb-6 sm:pt-24">
                <span className="block">
                  <span className="block font-display text-lg font-medium leading-tight tracking-tight sm:text-2xl md:text-3xl">{w.name}</span>
                  <span className="mt-1 hidden text-sm text-paper/80 sm:block">{w.tags}</span>
                </span>
                <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-paper/15 transition-colors group-hover:bg-lime group-hover:text-forest sm:grid">
                  <ArrowIcon className="size-4" />
                </span>
              </div>
            </a>
          </li>
        ))}
        {/* the last tile: not a case but the way in for the visitor who wants to be the next one. It fills
            the rest of the last row: one cell on phones when the cases leave one open, else the full row */}
        {filter === "alle" && (
          <li className={`${half ? "col-span-1" : "col-span-2"} ${items.length % 3 === 2 ? "lg:col-span-1" : items.length % 3 === 1 ? "lg:col-span-2" : "lg:col-span-3"}`}>
            <a href="/contact" className={`group flex h-full flex-col justify-between gap-6 bg-[#fcbbb9] text-[#440220] sm:min-h-[320px] md:p-8 ${half ? "px-4 pb-6 pt-5" : "min-h-[240px] px-6 pb-12 pt-10"}`}>
              <span className="w-fit rounded-full bg-[#440220] px-3 py-1 text-xs font-semibold text-[#fcbbb9]">Jouw site</span>
              <span>
                <span className={`block font-display font-medium leading-tight tracking-tight md:text-4xl ${half ? "text-2xl sm:text-3xl" : "text-3xl"}`}>
                  Jouw bedrijf <span className="serif-italic">hier?</span>
                </span>
                <span className={`mt-4 max-w-sm text-[15px] leading-relaxed text-[#440220]/80 ${half ? "hidden sm:block" : "block"}`}>
                  Dan zoeken we samen uit wat jouw site moet doen. Dat begint met een gesprek van een half uur.
                </span>
                <span className="mt-6 inline-flex items-center gap-2 border-b border-[#440220]/40 pb-0.5 text-[15px] font-semibold transition-colors group-hover:border-[#440220]">
                  Plan een kennismaking
                  <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </a>
          </li>
        )}
      </ul>
    </>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <span className="mr-1 text-xs font-medium uppercase tracking-[0.14em] text-forest/70">{children}</span>;
}

export function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
        active ? "bg-forest text-cream" : "bg-forest/[0.07] text-forest hover:bg-forest/[0.12]"
      }`}
    >
      {children}
    </button>
  );
}
