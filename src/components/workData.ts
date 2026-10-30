/* ---------- Ons werk: the cases shown on the homepage rows and on the Werk page ---------- */
export type WorkItem = {
  name: string;
  kind: "Klant" | "Concept";
  /** what the site does, in a few words */
  tags: string;
  /** a short title of two to four words, for the cards on the homepage */
  short: string;
  /** one sentence on what the site achieves, shown under the photo on the Werk page */
  headline: string;
  img: string;
  /** a silent loop shown instead of the photo on the homepage cards (the photo stays for the Werk page) */
  video?: string;
  /** CSS object-position, to choose which part of the photo survives the crop */
  pos?: string;
  /** the case page, or the live concept site */
  href?: string;
  /** a big, calm photo shown full-bleed when this case is next up at the bottom of another case page */
  cover?: { src: string; pos?: string };
  mockup?: { url: string; bg: string };
  /** one result, shown as a lime tag on the homepage cards. PLACEHOLDERS for the clients until the
   *  real numbers are in; the concepts carry a measured, true-to-the-concept fact */
  result?: string;
};

export const work: WorkItem[] = [
  {
    name: "Happy Flops", kind: "Klant", tags: "Webshop, branding, vindbaarheid", short: "Een webshop die verkoopt",
    headline: "Een webshop met een eigen gezicht, gebouwd om gevonden te worden.",
    img: "/images/happyflops-fold.webp", pos: "50% 45%", href: "/werk/happy-flops",
    cover: { src: "/images/happyflops-hero-2.jpg", pos: "50% 55%" },
    result: "+40% bestellingen",
  },
  {
    name: "Hypotheekhaven", kind: "Klant", tags: "Website, leadgeneratie", short: "Van advies naar afspraak",
    headline: "Van hypotheekadvies naar een site die afspraken oplevert.",
    img: "/images/hypotheekhaven-fauteuil.webp", pos: "70% 55%", href: "/werk/hypotheekhaven",
    cover: { src: "/images/hypotheekhaven-fauteuil.webp", pos: "60% 50%" },
    result: "2x meer afspraken",
  },
  {
    name: "Horeca", kind: "Concept", tags: "Reserveren, menukaart, Google-profiel", short: "Van zoeken naar reserveren",
    headline: "Reserveren, de menukaart en het Google-profiel, klaar om te testen.",
    img: "/images/prijzen-hero.webp", pos: "40% 55%", href: "/horeca-website",
    result: "Reserveren in 3 tikken",
  },
  {
    name: "Bouw en installatie", kind: "Concept", tags: "Projecten, offerte, regio's", short: "Offertes die binnenkomen",
    headline: "Een site die offerteaanvragen binnenhaalt, met foto-upload vanaf de bouwplaats.",
    img: "/images/mascot-build.webp", href: "/bouw-en-installatie-website",
    result: "Offerte in 1 minuut",
  },
  {
    name: "Zorg en praktijken", kind: "Concept", tags: "Afspraken, toegankelijkheid", short: "Rust vanaf de eerste blik",
    headline: "Een rustige site waar patiënten zelf online een afspraak maken.",
    img: "/images/slim-choice.webp", href: "/praktijk-website",
    result: "Afspraak in 3 tikken",
  },
];
