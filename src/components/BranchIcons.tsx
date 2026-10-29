/** Small line icons for the menu and branch pages, drawn in currentColor. */
export type IconKey =
  | "house" | "cup" | "bag" | "chart" | "wrench" | "heart" | "sparkle" | "chat"
  | "grid" | "search" | "cart" | "refresh" | "layout" | "pen" | "eye";

const paths: Record<IconKey, React.ReactNode> = {
  house: <><path d="M4 11.5 12 5l8 6.5" /><path d="M6.5 10v9h11v-9" /><path d="M10 19v-5h4v5" /></>,
  cup: <><path d="M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8z" /><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" /><path d="M8 4.5c0 1 1 1 1 2M11 4.5c0 1 1 1 1 2" /></>,
  bag: <><path d="M5.5 9h13l-1 11h-11l-1-11z" /><path d="M9 9V7a3 3 0 0 1 6 0v2" /></>,
  chart: <><path d="M4 19h16" /><path d="M7 16v-5M12 16V8M17 16v-8" /><path d="M6 6l4 3 3-4 5 2" /></>,
  wrench: <><path d="M14.5 5.5a4 4 0 0 0 4.9 4.9L12 17.8 8.2 21 4 16.8l3.2-3.8 7.3-7.5z" /><path d="M6 18l1.5-1.5" /></>,
  heart: <><path d="M12 20s-7-4.4-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 2.5C19 15.6 12 20 12 20z" /><path d="M10 12h4M12 10v4" /></>,
  sparkle: <><path d="M12 4l1.8 5.2L19 11l-5.2 1.8L12 18l-1.8-5.2L5 11l5.2-1.8z" /><path d="M18.5 4.5v3M17 6h3" /></>,
  chat: <><path d="M5 6h14v9H10l-4 3.5V15H5z" /><path d="M8.5 10.5h7" /></>,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></>,
  search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>,
  cart: <><path d="M4 5h2.5l2 10h9l2-7H8" /><circle cx="10" cy="19" r="1.2" /><circle cx="17" cy="19" r="1.2" /></>,
  refresh: <><path d="M19 12a7 7 0 0 1-12 5" /><path d="M5 12a7 7 0 0 1 12-5" /><path d="M17 4v3h-3M7 20v-3h3" /></>,
  layout: <><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M4 10h16M10 10v9" /></>,
  pen: <><path d="m5 19 3.5-.8L18 8.7a1.8 1.8 0 0 0-2.5-2.5L6 15.7 5 19z" /><path d="m13.5 8 2.5 2.5" /></>,
  eye: <><path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" /><circle cx="12" cy="12" r="2.5" /></>,
};

export default function BranchIcon({ name, className = "size-5" }: { name: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
