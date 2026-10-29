import type { ReactNode } from "react";
import { FrameGlyph } from "./Logo";

export function Button({
  children,
  variant = "lime",
  className = "",
  href = "#",
}: {
  children: ReactNode;
  variant?: "lime" | "dark" | "outline" | "light" | "custom";
  className?: string;
  href?: string;
}) {
  const styles = {
    lime: "bg-lime text-forest hover:bg-lime-hover",
    dark: "bg-forest text-paper hover:bg-forest-hover",
    light: "bg-paper text-forest hover:bg-cream",
    outline: "border border-forest/30 text-forest hover:bg-forest hover:text-paper",
    custom: "",
  }[variant];
  return (
    <a
      href={href}
      className={`btn-slide inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-semibold transition-colors ${styles} ${className}`}
    >
      {/* the label twice: on hover the first slides up and out, the second comes in from below */}
      <span className="btn-slide-text">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </a>
  );
}

/**
 * The label above a title, after the Conversie tag: a small stack of rings running into a filled
 * pill, the front ring carrying the brand's frame corners and lying on top of the pill. Each ring is
 * edged in the ground colour,
 * so they read as cut out of each other. `dark` sits on light grounds (forest with lime), `light`
 * on dark grounds (lime with forest).
 */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light" | "blush" | "lime" | "wine";
  className?: string;
}) {
  const t = {
    dark: { fill: "bg-forest", ink: "text-lime", edge: "border-cream" },
    light: { fill: "bg-lime", ink: "text-forest", edge: "border-forest" },
    blush: { fill: "bg-[#440220]", ink: "text-[#fcbbb9]", edge: "border-cream" },
    lime: { fill: "bg-lime", ink: "text-forest", edge: "border-forest" },
    wine: { fill: "bg-[#fcbbb9]", ink: "text-[#440220]", edge: "border-[#440220]" },
  }[tone];
  return (
    <p className={`flex w-fit items-center ${className}`}>
      <span className={`relative -mr-2.5 size-7 rounded-full border-2 opacity-30 ${t.fill} ${t.edge}`} aria-hidden="true" />
      <span className={`relative -mr-2.5 size-7 rounded-full border-2 opacity-60 ${t.fill} ${t.edge}`} aria-hidden="true" />
      <span className={`relative z-10 -mr-2.5 grid size-7 place-items-center rounded-full border-2 ${t.fill} ${t.edge} ${t.ink}`} aria-hidden="true">
        <FrameGlyph className="size-3" />
      </span>
      <span className={`relative rounded-full border-2 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${t.fill} ${t.edge} ${t.ink}`}>
        {children}
      </span>
    </p>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-(--site-max) px-6 md:px-12 xl:px-20 ${className}`}>{children}</div>;
}

export function Marquee({
  children,
  speed = "normal",
  reverse = false,
  className = "",
  gap = "",
  fade = true,
}: {
  children: ReactNode;
  speed?: "normal" | "slow";
  reverse?: boolean;
  className?: string;
  /** gap classes between the pieces, e.g. "gap-2" */
  gap?: string;
  /** soften both ends; false cuts the row off hard at its box */
  fade?: boolean;
}) {
  const anim = reverse
    ? speed === "slow" ? "animate-marquee-reverse-slow" : "animate-marquee-reverse"
    : speed === "slow" ? "animate-marquee-slow" : "animate-marquee";
  return (
    <div className={`${fade ? "marquee-mask" : ""} w-full overflow-hidden ${className}`}>
      <div className={`flex w-max ${gap} ${anim}`}>
        <div className={`flex shrink-0 ${gap}`}>{children}</div>
        <div className={`flex shrink-0 ${gap}`} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The secondary action: an underlined text link with an arrow. Every page keeps one filled button,
 * "Plan een kennismaking"; everything else (see the work, the services, the approach) is this, so
 * the main action never has to compete. `light` for dark grounds.
 */
export function TextLink({ children, href, light = false, className = "" }: { children: ReactNode; href: string; light?: boolean; className?: string }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 border-b pb-0.5 text-[15px] font-semibold transition-colors ${light ? "border-cream/40 text-cream hover:border-cream" : "border-forest/30 text-forest hover:border-forest"} ${className}`}
    >
      {children}
      <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

/** The line that takes the doubt away, under the main button: free, short, no strings. */
export function Reassure({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <p className={`text-[13px] ${light ? "text-cream/70" : "text-forest/60"} ${className}`}>Gratis · 30 minuten · vrijblijvend</p>
  );
}
