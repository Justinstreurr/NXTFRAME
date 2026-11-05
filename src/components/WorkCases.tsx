import Link from "next/link";
import type { ReactNode } from "react";
import BranchIcon, { type IconKey } from "./BranchIcons";
import { FrameGlyph } from "./Logo";
import type { WorkItem } from "./workData";

/* the client's own mark, white in the middle of the photo; concepts get their name set large instead */
const logos: Record<string, { src: string; className: string }> = {
  "Happy Flops": { src: "/images/happy-flops-logo.png", className: "h-10 md:h-12" },
  Hypotheekhaven: { src: "/images/hypotheekhaven-logo.svg", className: "h-8 md:h-10" },
};

/* the icon in each caption: what kind of site it is, as in the branch menu */
const icons: Record<string, IconKey> = {
  "Happy Flops": "bag",
  Hypotheekhaven: "chart",
  Horeca: "cup",
  "Bouw en installatie": "wrench",
  "Zorg en praktijken": "heart",
};

/** the small square in the caption, like an app icon: dark glass-like (a tint and a fine light edge,
 *  no blur, so it costs nothing while scrolling) with the branch icon in lime */
function Mark({ w }: { w: WorkItem }) {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-black/45 text-lime ring-1 ring-inset ring-white/25 shadow-[0_4px_14px_-4px_rgb(0_0_0/0.5)]" aria-hidden="true">
      <BranchIcon name={icons[w.name] ?? "sparkle"} className="size-[18px]" />
    </span>
  );
}

/**
 * One case as a tall photo tile, after the work grid of design studios like Haptic: the photo fills
 * the tile, a small tag sits top right on the concepts, and the caption sits bottom left as a small
 * app-like mark with the name and one line under it. Deliberately still: no scroll animation, no
 * filters while scrolling. The brand sits in the middle of the photo. Under the pointer the photo
 * softens (a blur, on that one tile only) so the brand stands out, and the caption is underlined:
 * it is clear the tile can be clicked.
 */
function Tile({ w }: { w: WorkItem }) {
  const external = w.href?.startsWith("http");
  return (
    <a
      href={w.href ?? "#"}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative block aspect-[4/5] overflow-hidden bg-forest text-cream"
    >
      <img
        src={w.card?.src ?? w.img}
        alt=""
        width={800}
        height={1000}
        className="absolute inset-0 size-full object-cover transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.04] group-hover:blur-[6px] group-focus-visible:scale-[1.04] group-focus-visible:blur-[6px]"
        style={{ objectPosition: w.card?.pos ?? w.pos }}
        loading="lazy"
        decoding="async"
      />
      {/* a light shade over the whole photo, a little deeper under the pointer, so the brand in the middle reads */}
      <span className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/35" aria-hidden="true" />
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgb(0_0_0/0.55),transparent)]" aria-hidden="true" />
      <span className="absolute inset-0 grid place-items-center px-6 text-center" aria-hidden="true">
        {logos[w.name] ? (
          <img src={logos[w.name].src} alt="" className={`w-auto max-w-[80%] brightness-0 invert ${logos[w.name].className}`} loading="lazy" decoding="async" />
        ) : (
          <span className="font-display text-[clamp(1.75rem,2.6vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{w.name}</span>
        )}
      </span>
      {w.kind === "Concept" && (
        <span className="absolute right-3 top-3 rounded bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cream">
          Concept
        </span>
      )}
      <span className="absolute inset-x-3 bottom-3 flex items-center gap-2.5">
        <Mark w={w} />
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-semibold leading-tight decoration-cream/80 underline-offset-[3px] group-hover:underline group-focus-visible:underline">{w.name}</span>
          <span className="block truncate text-[13px] leading-tight text-cream/75">{w.tags}</span>
        </span>
      </span>
    </a>
  );
}

/**
 * The last tile, to round the grid off: an invitation instead of a case. Forest green, a small label
 * with the frame mark beside it, the question, two lines on what a first talk
 * gives you, and a lime button. The whole tile is the link; under the pointer the mark grows a
 * little and the button turns its arrow, like the photo tiles react.
 */
function YoursTile() {
  return (
    <Link href="/contact" className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-forest p-6 text-cream md:p-7">
            <span className="relative flex items-start justify-between gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lime">Jouw bedrijf hier?</span>
        <FrameGlyph className="size-9 text-lime transition-transform duration-500 ease-out group-hover:scale-110" />
      </span>
      <span className="relative">
        <span className="block font-display text-[clamp(1.6rem,2.3vw,2.2rem)] font-medium leading-[1.08] tracking-[-0.025em]">
          Wil jij ook een site die <span className="serif-italic text-lime">klanten oplevert?</span>
        </span>
        <span className="mt-4 block max-w-[30ch] text-[15px] leading-relaxed text-cream/80">
          Vertel in een half uur wat je doet en wie je wilt bereiken. Je krijgt eerlijk advies en één vaste prijs, zonder verplichting.
        </span>
        <span className="mt-6 inline-flex items-center gap-3 rounded-full bg-lime py-1.5 pl-5 pr-1.5 text-[14px] font-semibold text-forest">
          <span className="underline-offset-[3px] group-hover:underline group-focus-visible:underline">Plan een kennismaking</span>
          <span className="grid size-7 place-items-center rounded-full bg-forest text-lime transition-transform duration-300 group-hover:rotate-45" aria-hidden="true">
            <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11 11 5M6 5h5v5" /></svg>
          </span>
        </span>
      </span>
    </Link>
  );
}

/**
 * Ons werk as a studio work grid: three tall tiles a row on desktop with tight gutters, the cases
 * first and a green "Jouw bedrijf" tile to round the grid off; on phones a row you swipe. `header`
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
