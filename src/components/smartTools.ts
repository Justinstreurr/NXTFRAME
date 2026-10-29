import type { IconKey } from "./BranchIcons";

/* ---------- Slimme tools en koppelingen: shared by the homepage teaser and /slimme-tools ---------- */

/** what can be built on top of a site; `teaser` marks the three the homepage shows */
export type SmartTool = { title: string; body: string; examples: string[]; icon: IconKey; teaser?: boolean };

export const tools: SmartTool[] = [
  {
    title: "Rekentools en configurators",
    body: "Een bezoeker rekent zelf uit wat hij kan lenen, wat zijn verbouwing ongeveer kost of welk pakket past. Hij blijft langer, laat zijn gegevens achter en jij krijgt een warme aanvraag.",
    examples: ["Maximale hypotheek en maandlasten", "Offerte- of prijsindicatie", "Product- of pakketkiezer"],
    icon: "chart",
    teaser: true,
  },
  {
    title: "AI-assistent op je site",
    body: "Beantwoordt dag en nacht vragen met de kennis van jouw bedrijf: diensten, prijzen, openingstijden, voorwaarden. Helpt kiezen en plant een afspraak in. Weet hij het niet, dan zet hij de vraag door naar jou.",
    examples: ["Vragen beantwoorden 24/7", "Afspraak of bezichtiging inplannen", "Doorzetten naar een mens"],
    icon: "chat",
    teaser: true,
  },
  {
    title: "Slimme opvolging van aanvragen",
    body: "Elke aanvraag wordt direct gelezen en gelabeld. De klant krijgt meteen een persoonlijke bevestiging, jij een korte samenvatting met wat hij zoekt. Geen aanvraag blijft meer liggen.",
    examples: ["Persoonlijke bevestiging per mail", "Samenvatting en label per lead", "Rechtstreeks in je CRM"],
    icon: "sparkle",
  },
  {
    title: "Koppelingen met je systemen",
    body: "Je site praat met de pakketten die je al gebruikt: je woningaanbod, je webshop, je betalingen, je agenda of je boekhouding. Je hoeft niets dubbel in te voeren en je hoeft niet over te stappen.",
    examples: ["Aanbod en voorraad automatisch op de site", "Betalen, verzenden en factureren", "Afspraken direct in je agenda"],
    icon: "refresh",
    teaser: true,
  },
  {
    title: "Automatiseringen",
    body: "Terugkerend werk dat nu met de hand gaat: offertes opstellen, gegevens overzetten tussen systemen, mails sorteren. Eerst kijken we samen waar de uren zitten, dan bouw ik wat de meeste tijd scheelt.",
    examples: ["Offertes en documenten opstellen", "Gegevens tussen systemen overzetten", "Mails en formulieren verwerken"],
    icon: "wrench",
  },
  {
    title: "Overzicht en dashboards",
    body: "Leads, klanten en afspraken in één overzicht in plaats van verspreid over Excel, mail en losse lijstjes. Gekoppeld aan je site, zodat elke aanvraag er vanzelf in komt.",
    examples: ["Eenvoudig CRM op maat", "Dashboard met aanvragen en resultaat", "Gekoppeld aan site en mail"],
    icon: "grid",
  },
];

/** the systems a visitor may already run, per kind of business; plain names, no partnership implied */
export const integrations: { group: string; icon: IconKey; systems: string[] }[] = [
  { group: "Makelaars", icon: "house", systems: ["Realworks", "Kolibri", "Skarabee", "Eigen woningfeed"] },
  { group: "Webshops", icon: "cart", systems: ["Shopify", "WooCommerce", "Medusa", "Lightspeed"] },
  { group: "Betalen", icon: "bag", systems: ["Mollie", "Stripe", "iDEAL", "Klarna"] },
  { group: "Verzenden en boekhouden", icon: "chart", systems: ["Sendcloud", "MyParcel", "Moneybird", "Exact Online"] },
  { group: "Agenda en CRM", icon: "chat", systems: ["Google Agenda", "Calendly", "HubSpot", "ActiveCampaign"] },
];

export const smartFaq: { q: string; a: string }[] = [
  {
    q: "Mijn systeem staat er niet bij. Kan het dan niet?",
    a: "Bijna altijd wel. De meeste pakketten hebben een koppeling of een export waar een site mee kan werken. Ik zoek het vooraf voor je uit en zeg eerlijk wat kan, wat het kost en waar de grenzen liggen, voordat er iets gebouwd wordt.",
  },
  {
    q: "Moet ik overstappen naar een ander pakket?",
    a: "Nee. Het uitgangspunt is dat je blijft werken zoals je gewend bent. De site sluit aan op wat je al hebt. Wissel je later toch van pakket, dan vervang ik alleen dat ene koppelstuk.",
  },
  {
    q: "Wat als een koppeling een keer stopt met werken?",
    a: "Dan merk ik het, want koppelingen worden in de gaten gehouden. Met onderhoud per maand los ik het op voordat jij of je klanten er last van hebben.",
  },
  {
    q: "Wat kost een AI-assistent per maand?",
    a: "Het bouwen is eenmalig. Daarna betaal je een klein bedrag per maand voor het gebruik van het AI-model en het onderhoud. Hoeveel precies hangt af van het aantal gesprekken; dat reken ik vooraf voor je uit.",
  },
  {
    q: "Geeft een AI-assistent geen verkeerde antwoorden?",
    a: "Hij antwoordt alleen op basis van de informatie die jij hebt goedgekeurd, en zegt het eerlijk als hij iets niet weet. Dan zet hij de vraag door naar jou. Je kunt de gesprekken teruglezen en hem bijsturen.",
  },
  {
    q: "Kan dit ook zonder nieuwe website?",
    a: "Vaak wel. Een rekentool, een assistent of een koppeling kan ook in een bestaande site. Is je huidige site te oud om op voort te bouwen, dan hoor je dat eerlijk.",
  },
];
