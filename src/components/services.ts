import type { IconKey } from "./BranchIcons";

/* ---------- Diensten: the six services, shared by the homepage wheel and the services grid ----------
   The wheel photos are NXT Frame's own: the mascot and mockups of real client work, no stock. */
export type ServiceCard = { title: string; body: string; href?: string; icon?: IconKey; /** four photos for the homepage wheel */ imgs?: string[] };

export const services: ServiceCard[] = [
  {
    title: "Nieuwe website", body: "Van strategie en structuur tot ontwerp en lancering. Een snelle site, opgebouwd rond wat jouw klant zoekt.", href: "/website-laten-maken", icon: "layout",
    imgs: ["/images/happyflops-laptop-hands.webp", "/images/hypotheekhaven-fauteuil.webp", "/images/showcase/nxtframe/card-04.webp", "/images/advies-hero-laptop.webp"],
  },
  {
    title: "Redesign", body: "Je huidige site opnieuw ontworpen en gebouwd op moderne techniek, met zorg voor de vindbaarheid die je al hebt.", href: "/website-redesign", icon: "sparkle",
    imgs: ["/images/andere-tijd.webp", "/images/showcase/nxtframe/card-07.webp", "/images/happyflops-duo.webp", "/images/conversie-macbook-poster-v3.webp"],
  },
  {
    title: "Landingspagina's", body: "Voor een campagne, branche of product. Eén pagina met één doel, en alles erop werkt daarnaartoe.", href: "/landingspagina-laten-maken", icon: "grid",
    imgs: ["/images/happyflops-mockup.webp", "/images/showcase/hypotheekhaven/card-03.webp", "/images/showcase/nxtframe/card-09.webp", "/images/hero-hill.webp"],
  },
  {
    title: "Vindbaar in Google en AI", body: "Structuur, content en techniek waarmee je beter gevonden wordt in Google, ChatGPT en andere AI-zoekmachines.", href: "/vindbaar-in-google-en-chatgpt", icon: "search",
    imgs: ["/images/slim-search.webp", "/images/herkenbaar-2.webp", "/images/branches-hero-straat.webp", "/images/pain-mobiel.webp"],
  },
  {
    title: "Doorontwikkeling en onderhoud", body: "Na de lancering gaat het door: nieuwe pagina's, verbeteringen op basis van data en snelheid die op peil blijft.", href: "/website-onderhoud", icon: "refresh",
    imgs: ["/images/slim-desk.webp", "/images/slim-choice.webp", "/images/over-mascot.webp", "/images/traag-mobiel.webp"],
  },
  {
    title: "Teksten en content", body: "Duidelijke teksten die bezoekers en zoekmachines begrijpen, en die uitnodigen tot de volgende stap.", href: "/website-teksten", icon: "pen",
    imgs: ["/images/hero-hill-v1.webp", "/images/showcase/hypotheekhaven/card-01.webp", "/images/showcase/nxtframe/card-06.webp", "/images/showcase/nxtframe/card-03.webp"],
  },
];
