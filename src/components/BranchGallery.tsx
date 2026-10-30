"use client";

import { useState, type ReactNode } from "react";
import BranchIcon from "./BranchIcons";
import { FrameCorners } from "./Logo";
import { ArrowIcon, Container } from "./ui";
import { Label, Pill } from "./WorkGallery";
import WaterHover from "./WaterHover";
import { branches, branchHref } from "./menuData";

/**
 * The Branches page body, built like the Werk page: the section heading, a filter row (all,
 * live, in the making), and then the branches as one edge-to-edge grid of three, flush against
 * each other with square corners and the title inside the photo. With every branch showing, a
 * blush tile closes the grid for the visitor whose branch is not in it.
 */
type Filter = "alle" | "live" | "maak";

const filters: { key: Filter; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "live", label: "Concept live" },
  { key: "maak", label: "In de maak" },
];

export default function BranchGallery({ header }: { header: ReactNode }) {
  const [filter, setFilter] = useState<Filter>("alle");
  const items = filter === "alle" ? branches : branches.filter((b) => (filter === "live" ? Boolean(b.concept) : !b.concept));
  const live = branches.filter((b) => b.concept).length;

  return (
    <>
      <Container>
        {header}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-forest/15 pt-6 md:mt-12">
          <div className="flex flex-wrap items-center gap-2">
            <Label>Filter:</Label>
            {filters.filter((f) => f.key !== "live" || live > 0).map((f) => (
              <Pill key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label}
              </Pill>
            ))}
          </div>
          {live > 0 && (
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-forest/70">
              {live} van de {branches.length} concepten live
            </p>
          )}
        </div>
      </Container>

      {/* three in a row, flush, square corners, from the left edge of the window to the right */}
      <ul className="mt-8 grid grid-cols-2 md:mt-10 lg:grid-cols-3">
        {items.map((b) => (
          <li key={b.slug}>
            <a href={branchHref(b)} className="group relative block aspect-[3/4] overflow-hidden bg-forest text-paper sm:aspect-[4/5] lg:aspect-square">
              {/* the photo, under water while the mouse is over the tile (WaterHover), as on the Ons werk cards */}
              <WaterHover>
                <img
                  src={b.img}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </WaterHover>
              <FrameCorners className="text-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100" inset="inset-5" corners="anti" />
              <span
                className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold sm:left-5 sm:top-5 sm:px-3 sm:text-xs ${
                  b.concept ? "bg-lime text-forest" : "bg-black/45 text-paper/90 backdrop-blur-sm"
                }`}
              >
                {b.concept ? "Concept live" : "In de maak"}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 pb-4 pt-16 sm:px-6 sm:pb-6 sm:pt-24">
                <span className="flex items-center gap-2 font-display text-lg font-medium leading-tight tracking-tight sm:gap-2.5 sm:text-2xl md:text-3xl">
                  <BranchIcon name={b.icon} className="size-4 shrink-0 text-lime sm:size-5 md:size-6" />
                  {b.label}
                </span>
                <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-paper/15 transition-colors group-hover:bg-lime group-hover:text-forest sm:grid">
                  <ArrowIcon className="size-4" />
                </span>
              </div>
            </a>
          </li>
        ))}
        {/* the ninth tile: not a branch but the way in for everyone else */}
        {filter === "alle" && (
          <li className="col-span-2 lg:col-span-1">
            <a href="/contact" className="group flex h-full min-h-[240px] flex-col justify-between gap-6 bg-[#fcbbb9] px-6 pb-12 pt-10 text-[#440220] sm:min-h-[320px] md:p-8">
              <span className="w-fit rounded-full bg-[#440220] px-3 py-1 text-xs font-semibold text-[#fcbbb9]">Jouw branche</span>
              <span>
                <span className="block font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl">
                  Staat jouw vak er <span className="serif-italic">nog niet bij?</span>
                </span>
                <span className="mt-4 block max-w-sm text-[15px] leading-relaxed text-[#440220]/80">
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
