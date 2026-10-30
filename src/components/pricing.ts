/* The three price cards, shared by the homepage, /prijzen, the website-laten-maken hub and the
   other service pages: a website for most businesses, a bigger site or a webshop, and custom
   work that only gets a price after a first look. `from: null` is "op offerte". */
/* PLACEHOLDER: the times are indications, to be confirmed by NXT Frame */
export type Tier = {
  name: string;
  /** the starting price in euros as shown ("2.500"), or null for a quote */
  from: string | null;
  img: string;
  time: string;
  body: string;
  items: string[];
  highlight?: boolean;
};

export const tiers: Tier[] = [
  {
    name: "Website",
    from: "2.500",
    img: "/images/hypotheekhaven-fauteuil.webp",
    time: "4 tot 6 weken",
    body: "Een complete site voor een bedrijf dat gevonden wil worden en aanvragen wil. Genoeg pagina's voor wat je doet, elk met een doel.",
    items: ["Strategie en tekststructuur", "Ontwerp op maat, geen template", "Tot 8 pagina's, elk met een doel", "Vindbaar in Google en AI", "Zelf te beheren", "Aangemeld bij Google en Bing"],
    highlight: true,
  },
  {
    name: "Uitgebreid",
    from: "4.500",
    img: "/images/happyflops-mockup.jpg",
    time: "8 tot 12 weken",
    body: "Voor een grote klus: meer pagina's, een webshop of een koppeling met de systemen die je al gebruikt.",
    items: ["Alles van de website", "Meer pagina's, ook in meerdere talen", "Een webshop met iDEAL en verzending", "Koppeling met voorraad, agenda of boekhouding"],
  },
  {
    name: "Maatwerk",
    from: null,
    img: "/images/slim-desk.webp",
    time: "12 tot 20 weken",
    body: "Een platform, een klantomgeving of een eigen tool. Na een eerste verkenning krijg je een plan en een vaste prijs.",
    items: ["Alles van uitgebreid", "Eigen tools, portalen of een klantomgeving", "Koppelingen met meerdere systemen", "Plan en prijs na een verkenning"],
  },
];

/* the landing page has its own page, but no card among the three */
export const landing: Tier = {
  name: "Landingspagina",
  from: "1.950",
  img: "/images/advies-hero.webp",
  time: "3 tot 4 weken",
  body: "Eén pagina, één doel. Voor een campagne, een dienst of een branche.",
  items: ["Strategie en tekststructuur", "Ontwerp op maat", "Formulier of afsprakenplanner", "Gericht op één zoekvraag"],
};

/** the tier a webshop falls under, under its own name on the webshop pages */
export const webshop: Tier = { ...tiers[1], name: "Webshop" };

/** "€ 2.500", or "Op offerte" when there is no starting price */
export const price = (t: Tier) => (t.from ? `€ ${t.from}` : "Op offerte");

/** the tiers with a starting price, as schema.org offers */
export const offers = (list: Tier[]) =>
  list
    .filter((t) => t.from)
    .map((t) => {
      const amount = t.from!.replace(".", "");
      return {
        "@type": "Offer",
        name: t.name,
        description: t.body,
        price: amount,
        priceCurrency: "EUR",
        priceSpecification: { "@type": "PriceSpecification", minPrice: amount, priceCurrency: "EUR", valueAddedTaxIncluded: false },
      };
    });
