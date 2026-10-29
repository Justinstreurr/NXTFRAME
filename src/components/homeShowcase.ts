import type { ShowcasePage } from "./SiteShowcase";
import { happyFlopsHome } from "./HfShowcase";

/**
 * The film in the homepage hero: three sites in a row, each scrolled on the bare screen and then
 * taken apart into its own blocks. Pixels live in public/images/showcase/<site>/ (and hf-ui for
 * Happy Flops); stops are in screenshot pixels, 780 wide.
 */
const nxt = (name: string) => `/images/showcase/nxtframe/${name}.webp`;
const hh = (name: string) => `/images/showcase/hypotheekhaven/${name}.webp`;

export const nxtFramePage: ShowcasePage = {
  full: nxt("page-home"),
  screen: nxt("phone-screen"),
  stops: [0, 1500, 2860, 3522, 4600, 5712],
  cards: [
    { src: nxt("card-01"), w: 210 },
    { src: nxt("card-02"), w: 240 },
    { src: nxt("card-03"), w: 200 },
    { src: nxt("card-04"), w: 210 },
    { src: nxt("card-05"), w: 220 },
    { src: nxt("card-06"), w: 230 },
    { src: nxt("card-07"), w: 200 },
    { src: nxt("card-08"), w: 190 },
    { src: nxt("hero-desktop"), w: 300 },
    { src: nxt("nav"), w: 320 },
    { src: nxt("card-09"), w: 180 },
    { src: nxt("card-10"), w: 190 },
  ],
};

export const hypotheekhavenPage: ShowcasePage = {
  full: hh("page-home"),
  screen: hh("phone-screen"),
  stops: [0, 1500, 2700, 4033, 4825, 5639],
  cards: [
    { src: hh("card-01"), w: 210 },
    { src: hh("card-02"), w: 240 },
    { src: hh("card-03"), w: 200 },
    { src: hh("card-04"), w: 210 },
    { src: hh("card-05"), w: 220 },
    { src: hh("card-06"), w: 230 },
    { src: hh("card-07"), w: 200 },
    { src: hh("card-08"), w: 190 },
    { src: hh("hero-desktop"), w: 300 },
    { src: hh("nav"), w: 320 },
    { src: hh("card-09"), w: 180 },
    { src: hh("card-10"), w: 190 },
  ],
};

/* our own site first, then the two client sites */
export const homeShowcase: ShowcasePage[] = [nxtFramePage, happyFlopsHome, hypotheekhavenPage];
