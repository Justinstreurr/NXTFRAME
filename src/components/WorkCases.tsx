import type { ReactNode } from "react";
import CardVideo from "./CardVideo";
import { ArrowIcon } from "./ui";
import WaterHover from "./WaterHover";
import type { WorkItem } from "./workData";

/* the spread on tablets and up: where each of the four cases sits, and the shape of its photo */
const layout = [
  { cell: "md:col-span-7 md:row-span-2", frame: "aspect-[4/3] md:aspect-auto md:min-h-[520px] md:flex-1" },
  { cell: "md:col-span-5", frame: "aspect-[16/10]" },
  { cell: "md:col-span-5", frame: "aspect-[16/10]" },
  { cell: "md:col-span-12", frame: "aspect-[16/9] lg:aspect-[21/8]" },
];

/* the client's own mark, in white on the photo; concepts get their name set large instead */
const marks: Record<string, { src: string; className: string }> = {
  "Happy Flops": { src: "/images/happy-flops-logo.png", className: "h-12 md:h-16 lg:h-20" },
  Hypotheekhaven: { src: "/images/hypotheekhaven-logo.svg", className: "h-9 md:h-12 lg:h-14" },
};

function Media({ w }: { w: WorkItem }) {
  const cls = "case-photo absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]";
  return w.video ? (
    <CardVideo src={w.video} className={cls} />
  ) : (
    <img src={w.img} alt="" className={cls} style={w.pos ? { objectPosition: w.pos } : undefined} loading="lazy" decoding="async" />
  );
}

/**
 * One case: a big photo with the number and the kind in the top corners, the brand large and white
 * in the middle, what we did as pills at the foot and a round arrow; under the photo the short title
 * with an arrow and one line on what it achieved.
 */
function CaseCard({ w, n, frame = "aspect-[4/3]", className = "" }: { w: WorkItem; n: number; frame?: string; className?: string }) {
  const external = w.href?.startsWith("http");
  const mark = marks[w.name];
  const pills = w.tags.split(",").map((t) => t.trim()).slice(0, 3);
  return (
    <a
      href={w.href ?? "#"}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`case-item group flex flex-col ${className}`}
    >
      <span className={`case-media relative block overflow-hidden rounded-3xl bg-forest text-cream ${frame}`}>
        {/* the photo, under water while the mouse is over it (WaterHover) */}
        <WaterHover>
          <Media w={w} />
        </WaterHover>
        {/* a soft shade so the white mark and the pills read on any photo */}
        <span className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.25),rgb(0_0_0/0.15)_40%,rgb(0_0_0/0.45))] transition-colors duration-500 group-hover:bg-black/20" aria-hidden="true" />

        <span className="absolute inset-x-5 top-5 flex justify-between text-[12px] font-semibold uppercase tracking-[0.18em] text-cream/85 md:inset-x-6 md:top-6">
          <span>{String(n).padStart(2, "0")}</span>
          <span>{w.kind}</span>
        </span>

        <span className="absolute inset-0 grid place-items-center px-8">
          {mark ? (
            <img src={mark.src} alt={w.name} className={`w-auto brightness-0 invert ${mark.className}`} />
          ) : (
            <span className="text-center font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.03em]">{w.name}</span>
          )}
        </span>

        <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-6 md:bottom-6">
          <span className="flex flex-wrap gap-2">
            {w.result && <span className="rounded-full bg-lime px-3 py-1.5 text-xs font-semibold text-forest">{w.result}</span>}
            {pills.map((p) => (
              <span key={p} className="hidden rounded-full border border-cream/35 bg-black/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm sm:inline-block">
                {p}
              </span>
            ))}
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-cream/50 transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-forest" aria-hidden="true">
            <ArrowIcon className="size-4" />
          </span>
        </span>
      </span>

      {/* the short title and one line under the photo */}
      <span className="mt-5 flex items-center gap-3 font-display text-[1.5rem] font-medium leading-tight tracking-tight md:text-[1.75rem]">
        {w.short}
        <ArrowIcon className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </span>
      <span className="mt-2 block max-w-lg text-[15px] leading-relaxed opacity-70">{w.headline}</span>
    </a>
  );
}

/**
 * Ons werk: four cases, two clients and two concepts, as big photo cards laid out like a magazine
 * spread, the photos drifting gently with the scroll (.case-media in globals.css) (inspired
 * by editorial agency case grids). Phones: the same cards in a row you swipe.
 */
export default function WorkCases({ items, header }: { items: WorkItem[]; header?: ReactNode }) {
  const cases = items.slice(0, 4);
  return (
    <>
      {header}
      {/* phones: a row you swipe */}
      <div className="-mx-6 mt-10 snap-x snap-mandatory scroll-pl-6 overflow-x-auto pb-2 pl-6 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex w-max gap-4 pr-6">
          {cases.map((w, i) => (
            <li key={w.name} className="w-[84vw] max-w-[380px] shrink-0 snap-start">
              <CaseCard w={w} n={i + 1} />
            </li>
          ))}
        </ul>
      </div>
      {/* tablet and up, like a magazine spread: the lead case large on the left over two rows, two
          cases stacked on the right, and one wide case across the full width under them */}
      <ul className="mt-12 hidden gap-x-6 gap-y-12 md:grid md:grid-cols-12 lg:gap-x-8 lg:gap-y-14">
        {cases.map((w, i) => (
          <li key={w.name} className={layout[i].cell}>
            <CaseCard w={w} n={i + 1} frame={layout[i].frame} className="h-full" />
          </li>
        ))}
      </ul>
    </>
  );
}
