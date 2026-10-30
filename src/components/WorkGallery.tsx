"use client";

import { useState, type ReactNode } from "react";
import { FrameCorners } from "./Logo";
import { work, type WorkItem } from "./workData";

/**
 * The Werk page body: a filter row (all, clients, concepts) with a stack/grid switch, the page
 * statement, and the cases. "Stack" is the editorial layout: the blocks alternate wide and
 * narrow, two to a row, each with its own photo height, and the name, a sentence and the tag sit
 * under the photo. "Grid" is the overview: four equal squares to a row with only name and tag.
 */
type Filter = "alle" | WorkItem["kind"];
type Display = "grid" | "stack";

const filters: { key: Filter; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "Klant", label: "Klanten" },
  { key: "Concept", label: "Concepten" },
];

/* wide, narrow / narrow, wide: the rhythm of the rows */
const slots = [
  { span: "lg:col-span-7", wide: true },
  { span: "lg:col-span-5", wide: false },
  { span: "lg:col-span-5", wide: false },
  { span: "lg:col-span-7", wide: true },
];

export default function WorkGallery({ statement }: { statement: ReactNode }) {
  const [filter, setFilter] = useState<Filter>("alle");
  const [display, setDisplay] = useState<Display>("stack");
  const items = filter === "alle" ? work : work.filter((w) => w.kind === filter);
  const grid = display === "grid";

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-forest/15 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Label>Filter:</Label>
          {filters.map((f) => (
            <Pill key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label}
            </Pill>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Label>Weergave:</Label>
          <Pill active={display === "stack"} onClick={() => setDisplay("stack")}>
            <StackIcon /> Stack
          </Pill>
          <Pill active={display === "grid"} onClick={() => setDisplay("grid")}>
            <GridIcon /> Grid
          </Pill>
        </div>
      </div>

      {statement}

      {grid ? (
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-20 md:gap-x-6 lg:grid-cols-4">
          {items.map((w) => (
            <li key={w.name}>
              <WorkCard item={w} ratio="aspect-square" compact />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-14 grid gap-x-6 gap-y-14 md:mt-20 lg:grid-cols-12">
          {items.map((w, i) => {
            const slot = slots[i % slots.length];
            return (
              <li key={w.name} className={slot.span}>
                <WorkCard item={w} ratio={slot.wide ? "aspect-[16/10]" : "aspect-[4/3]"} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

/* the filter row parts, shared with the Branches page (BranchGallery) */
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

/* compact: the grid version, only the name and the tag under the photo */
function WorkCard({ item: w, ratio, compact = false }: { item: WorkItem; ratio: string; compact?: boolean }) {
  const external = w.href?.startsWith("http") ?? false;
  const live = w.kind === "Concept" && external;
  return (
    <a href={w.href ?? "#"} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group block">
      <div className={`relative overflow-hidden rounded-3xl bg-forest ${ratio}`}>
        <img
          src={w.img}
          alt=""
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={w.pos ? { objectPosition: w.pos } : undefined}
          loading="lazy"
        />
        <FrameCorners className="text-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100" inset="inset-5" corners="anti" />
        {live && (
          <span className="absolute left-5 top-5 rounded-full bg-lime px-3 py-1 text-xs font-semibold text-forest">Concept live</span>
        )}
      </div>
      {compact ? (
        <h2 className="mt-4 font-display text-xl font-medium tracking-tight text-forest md:text-2xl">{w.name}</h2>
      ) : (
        <>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[15px]">
            <span className="font-medium text-forest">{w.name}</span>
            <span className="text-forest/70">{w.tags}</span>
          </div>
          <h2 className="mt-2 max-w-2xl font-display text-2xl leading-snug tracking-tight text-forest md:text-[1.75rem]">{w.headline}</h2>
        </>
      )}
      <p className={`${compact ? "mt-1.5" : "mt-3"} text-xs font-medium uppercase tracking-[0.14em] text-forest/70`}># {w.kind}</p>
    </a>
  );
}

function StackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="2.5" width="12" height="4.5" rx="1" />
      <rect x="2" y="9" width="12" height="4.5" rx="1" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  );
}
