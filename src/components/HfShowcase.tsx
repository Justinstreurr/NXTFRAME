import SiteShowcase, { type ShowcaseCard, type ShowcasePage } from "./SiteShowcase";

/**
 * The Happy Flops film: the SiteShowcase timeline with the shop's own pixels (public/images/hf-ui).
 * The homepage hero reuses these pages between the other sites (see homeShowcase.ts).
 */
const hf = (name: string) => `/images/hf-ui/${name}.webp`;

/* the shop taken apart, in the order the pile is built */
export const happyFlopsCards: ShowcaseCard[] = [
  { src: hf("blk-bestsellers"), w: 210 },
  { src: hf("blk-bike"), w: 240 },
  { src: hf("card-original"), w: 200 },
  { src: hf("card-cusher"), w: 210 },
  { src: hf("blk-tree"), w: 220 },
  { src: hf("blk-sofa"), w: 230 },
  { src: hf("blk-collectie"), w: 200 },
  { src: hf("blk-grid1"), w: 190 },
  { src: hf("hero-desktop"), w: 300 },
  { src: hf("nav"), w: 320 },
  { src: hf("card-kids"), w: 180 },
  { src: hf("blk-grid2"), w: 190 },
];

/* the pages the screen scrolls through, alternating; stops are in screenshot pixels (780 wide) */
export const happyFlopsHome: ShowcasePage = {
  full: hf("page-home"),
  screen: hf("phone-screen"),
  stops: [0, 1900, 2730, 3640, 4460, 5360],
  cards: happyFlopsCards,
};
export const happyFlopsCollection: ShowcasePage = {
  full: hf("page-collection"),
  screen: hf("phone-screen-collection"),
  stops: [0, 1580, 2260, 2960, 3700, 4500],
  cards: happyFlopsCards,
};

const pages = [happyFlopsHome, happyFlopsCollection];

export default function HfShowcase({ scale = 1, className = "" }: { scale?: number; className?: string }) {
  return <SiteShowcase pages={pages} scale={scale} className={className} label="De Happy Flops webshop, in beweging" />;
}
