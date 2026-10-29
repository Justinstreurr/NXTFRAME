/* Animated line icons for the three pillars. Animations live in globals.css (.pi-*). */

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Snelheid: gauge with a sweeping needle and speed lines */
export function SpeedIcon({ className = "size-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" {...common}>
      <path d="M22 84a42 42 0 1 1 76 0" className="pi-arc" />
      <path d="M60 42v6M33 55l5 3M87 55l-5 3M27 78h6M93 78h-6" opacity="0.5" />
      <g className="pi-needle">
        <path d="M60 84 L60 52" strokeWidth="3.5" />
        <circle cx="60" cy="84" r="4" fill="currentColor" stroke="none" />
      </g>
      <g className="pi-lines" opacity="0.7">
        <path d="M6 96h20" />
        <path d="M2 104h14" />
      </g>
    </svg>
  );
}

/** Vindbaarheid: magnifier with a pulsing ring and an orbiting AI spark */
export function SearchIcon({ className = "size-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" {...common}>
      <circle cx="52" cy="52" r="24" />
      <circle cx="52" cy="52" r="24" className="pi-pulse" opacity="0.5" />
      <path d="M70 70l22 22" strokeWidth="3.5" />
      <path d="M40 52a12 12 0 0 1 12-12" opacity="0.6" />
      <g className="pi-orbit">
        <path d="M52 8l2.5 6.5L61 17l-6.5 2.5L52 26l-2.5-6.5L43 17l6.5-2.5z" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** Design: layout blocks that slide into place, with a cursor */
export function DesignIcon({ className = "size-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" {...common}>
      <rect x="22" y="22" width="76" height="18" rx="4" className="pi-block pi-block-1" />
      <rect x="22" y="48" width="34" height="50" rx="4" className="pi-block pi-block-2" />
      <rect x="64" y="48" width="34" height="22" rx="4" className="pi-block pi-block-3" />
      <rect x="64" y="76" width="34" height="22" rx="4" className="pi-block pi-block-4" />
      <g className="pi-cursor">
        <path d="M78 66l16 6-7 2.5-2.5 7z" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
