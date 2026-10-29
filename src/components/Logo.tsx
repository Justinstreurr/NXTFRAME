/**
 * NXT Frame logo: a viewfinder "frame" mark with a forward chevron ("next") inside,
 * followed by the wordmark. Inherits colour from `currentColor`.
 */
export function LogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* frame corners */}
      <path d="M2 10V2h8" />
      <path d="M22 2h8v8" />
      <path d="M30 22v8h-8" />
      <path d="M10 30H2v-8" />
      {/* next chevron */}
      <path d="M13 9.5 19.5 16 13 22.5" strokeWidth="3.5" />
    </svg>
  );
}

/** The brand "frame" glyph: two opposite viewfinder corners. Reused across the site. */
export function FrameGlyph({ className = "size-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`inline-block shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 10V2h8" />
      <path d="M22 14v8h-8" />
    </svg>
  );
}

/** Four viewfinder corners hugging a `relative` parent. Use for photos and cards. */
export function FrameCorners({
  className = "text-lime",
  size = "size-5",
  inset = "inset-3",
  corners = "all",
}: {
  className?: string;
  size?: string;
  inset?: string;
  /** Which corners to draw: all four, only top-left + bottom-right (like the brand glyph),
   *  or only top-right + bottom-left ("anti"). */
  corners?: "all" | "diagonal" | "anti";
}) {
  const c = `absolute ${size} border-current`;
  const tlbr = corners !== "anti";
  const trbl = corners !== "diagonal";
  return (
    <span className={`pointer-events-none absolute ${inset} ${className}`} aria-hidden="true">
      {tlbr && <span className={`${c} left-0 top-0 rounded-tl-md border-l-[3px] border-t-[3px]`} />}
      {trbl && <span className={`${c} right-0 top-0 rounded-tr-md border-r-[3px] border-t-[3px]`} />}
      {tlbr && <span className={`${c} bottom-0 right-0 rounded-br-md border-b-[3px] border-r-[3px]`} />}
      {trbl && <span className={`${c} bottom-0 left-0 rounded-bl-md border-b-[3px] border-l-[3px]`} />}
    </span>
  );
}

export default function Logo({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const s = {
    sm: { text: "text-[22px]", serif: "text-[27px]", dot: "size-[0.55em]" },
    md: { text: "text-[26px]", serif: "text-[32px]", dot: "size-[0.55em]" },
    lg: { text: "text-[36px]", serif: "text-[44px]", dot: "size-[0.55em]" },
    xl: { text: "text-[52px] md:text-[64px]", serif: "text-[63px] md:text-[78px]", dot: "size-[0.55em]" },
  }[size];
  return (
    <span className={`inline-flex items-baseline leading-none ${className}`} role="img" aria-label="NXT Frame">
      <span className={`font-display font-bold tracking-[-0.03em] ${s.text}`}>nxt</span>
      <span className={`serif-italic ml-[0.03em] tracking-[-0.01em] ${s.serif}`}>frame</span>
      <FrameGlyph className={`ml-[0.2em] translate-y-[-0.02em] ${s.dot}`} />
    </span>
  );
}
