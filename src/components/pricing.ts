/* The three price cards, shared by the homepage, /prijzen, the website-laten-maken hub and the
   other service pages: a website for most businesses, a bigger site or a webshop, and custom
   work that only gets a price after a first look. `from: null` is "op offerte". */
/* PLACEHOLDER: the times are indications, to be confirmed by NxtFrame */
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
    items: ["Teksten geschreven, in jouw toon", "Ontwerp op maat, geen template", "Tot 8 pagina's, elk met een doel", "Reserveren, boeken of je agenda ingebouwd", "Vindbaar in Google en AI", "Zelf te beheren"],
    highlight: true,
  },
  {
    name: "Uitgebreid",
    from: "4.500",
    img: "/images/happyflops-mockup.jpg",
    time: "8 tot 12 weken",
    body: "Als je site gegevens uitwisselt met een ander systeem, of groot is: een webshop, je woningaanbod, rekentools of meer dan 8 pagina's.",
    items: ["Alles van de website", "Een webshop met iDEAL en verzending", "Woningaanbod of voorraad uit je pakket", "Rekentools en koppelingen met je boekhouding of CRM", "Meer pagina's, ook in meerdere talen"],
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

/** the tier a webshop falls under, under its own name on the webshop pages */
export const webshop: Tier = {
  ...tiers[1],
  name: "Webshop",
  body: "Een shop die op een telefoon net zo goed verkoopt als op een laptop, met betalen, verzending en je voorraad gekoppeld.",
  items: ["Alles van de website", "Een webshop met iDEAL en verzending", "Voorraad uit je pakket", "Koppeling met je boekhouding", "Meer pagina's, ook in meerdere talen"],
};

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
