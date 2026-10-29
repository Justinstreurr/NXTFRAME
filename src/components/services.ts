import type { IconKey } from "./BranchIcons";

/* ---------- Diensten: the six services, shared by the homepage wheel and the services grid ---------- */
export type ServiceCard = { title: string; body: string; href?: string; icon?: IconKey; /** four photos for the homepage wheel */ imgs?: string[] };

export const services: ServiceCard[] = [
  {
    title: "Nieuwe website", body: "Van strategie en structuur tot ontwerp en lancering. Een snelle site, opgebouwd rond wat jouw klant zoekt.", href: "/website-laten-maken", icon: "layout",
    imgs: ["/images/tile-14.jpg", "/images/showcase/nxtframe/card-10.webp", "/images/tile-2.jpg", "/images/slim-desk.webp"],
  },
  {
    title: "Redesign", body: "Je huidige site opnieuw ontworpen en gebouwd op moderne techniek, met zorg voor de vindbaarheid die je al hebt.", href: "/website-redesign", icon: "sparkle",
    imgs: ["/images/tile-6.jpg", "/images/tile-1.jpg", "/images/tile-8.jpg", "/images/tile-9.jpg"],
  },
  {
    title: "Landingspagina's", body: "Voor een campagne, branche of product. Eén pagina met één doel, en alles erop werkt daarnaartoe.", href: "/landingspagina-laten-maken", icon: "grid",
    imgs: ["/images/tile-3.jpg", "/images/tile-4.jpg", "/images/tile-7.jpg", "/images/showcase/nxtframe/card-05.webp"],
  },
  {
    title: "Vindbaar in Google en AI", body: "Structuur, content en techniek waarmee je beter gevonden wordt in Google, ChatGPT en andere AI-zoekmachines.", href: "/vindbaar-in-google-en-chatgpt", icon: "search",
    imgs: ["/images/herkenbaar-2.webp", "/images/showcase/nxtframe/card-02.webp", "/images/pain-mobiel.webp", "/images/showcase/nxtframe/card-01.webp"],
  },
  {
    title: "Doorontwikkeling en onderhoud", body: "Na de lancering gaat het door: nieuwe pagina's, verbeteringen op basis van data en snelheid die op peil blijft.", href: "/website-onderhoud", icon: "refresh",
    imgs: ["/images/slim-choice.webp", "/images/over-mascot.webp", "/images/workflow.jpg", "/images/tile-11.jpg"],
  },
  {
    title: "Teksten en content", body: "Duidelijke teksten die bezoekers en zoekmachines begrijpen, en die uitnodigen tot de volgende stap.", href: "/website-teksten", icon: "pen",
    imgs: ["/images/talent.jpg", "/images/woman-cup.jpg", "/images/work-oosting.jpg", "/images/tile-12.jpg"],
  },
];
