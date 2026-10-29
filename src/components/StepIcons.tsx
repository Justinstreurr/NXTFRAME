/* Animated line icons for the five process steps. Animations live in globals.css (.si-*). */
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** 01 Kennismaking: two speech bubbles taking turns */
export function TalkIcon({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...common}>
      <path d="M6 10h22v14H14l-8 6z" className="si-bubble-a" />
      <path d="M42 20H24v12h10l8 6z" className="si-bubble-b" />
    </svg>
  );
}

/** 02 Strategie en structuur: sitemap nodes connecting */
export function MapIcon({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...common}>
      <rect x="18" y="6" width="12" height="9" rx="2" />
      <path d="M24 15v7M12 22h24M12 22v6M24 22v6M36 22v6" className="si-lines" />
      <rect x="6" y="28" width="12" height="9" rx="2" className="si-node si-node-1" />
      <rect x="18" y="28" width="12" height="9" rx="2" className="si-node si-node-2" />
      <rect x="30" y="28" width="12" height="9" rx="2" className="si-node si-node-3" />
    </svg>
  );
}

/** 03 Ontwerp: pen drawing a frame */
export function PenIcon({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...common}>
      <rect x="8" y="10" width="32" height="24" rx="3" className="si-draw" />
      <g className="si-pen">
        <path d="M30 32l8-8 4 4-8 8h-4z" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** 04 Bouw: code brackets with a blinking cursor */
export function CodeIcon({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...common}>
      <path d="M16 14 6 24l10 10" />
      <path d="M32 14l10 10-10 10" />
      <path d="M27 12 21 36" className="si-slash" />
    </svg>
  );
}

/** 05 Lancering en doorgroei: rocket lifting with a rising line */
export function LaunchIcon({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...common}>
      <path d="M6 40c6-2 10-6 12-12" className="si-trail" opacity="0.6" />
      <g className="si-rocket">
        <path d="M26 30c-4-4-4-12 4-20 8 8 8 16 4 20l-1 6-3-3h-0l-3 3z" />
        <circle cx="30" cy="18" r="2.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
