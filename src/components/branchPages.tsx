import type { ReactNode } from "react";
import type { SiteFeature } from "./SellerGrid";
import type { PriceWay } from "./BranchPricing";
import type { PathStep } from "./Sections";
import { LaunchIcon, MapIcon, PenIcon, TalkIcon } from "./StepIcons";

/* ---------- What a branch page shows beyond menuData: the page in the shape of /makelaars ----------
   menuData.ts holds what the menu, the hub and the page share (title, intro, pains, musts, price,
   questions). This file holds what only the page needs: the photos, the pain titles with their
   serif-italic words, the six parts of the site, the ways to start and what is always included.
   PLACEHOLDER photos: borrowed from elsewhere on the site until each branch has its own.
   PLACEHOLDER ways: the second and third way to start are a proposal, to confirm. */
export type BranchPageData = {
  hero: { src: string; alt: string; pos?: string };
  /** the three pains from menuData, in the same order, with the key words in serif italic and a photo */
  painArt: { label: string; title: ReactNode; src: string; pos?: string }[];
  features: SiteFeature[];
  /** the hero's line under the title: what the owner wins, not what the site is */
  heroLead: string;
  /** the line under Investering's title, with the sum that puts the price in proportion */
  pricingIntro: string;
  /** what this branch's first conversation is about, for the first step of Zo werkt het */
  intake: string;
  ways: (from: string, span: string) => PriceWay[];
  /** the site's name in "Bij elke ... inbegrepen" and "Complete ..." */
  siteName: string;
  included: string[];
  /** what the price leaves out, after "Prijzen exclusief btw." */
  notIncluded: string;
  /** the card in the "Voor wie" carousel to leave out, where this branch has one */
  segment?: string;
};

/* the same for every branch, the first four of "Bij elke ... inbegrepen" */
const always = ["Ontwerp op maat, geen template", "Snel op elke telefoon", "Vindbaar in Google en AI", "Teksten en foto's die je zelf bijwerkt"];

const i = (t: string) => <span className="serif-italic">{t}</span>;

export const stepsFor = (intake: string): PathStep[] => [
  { title: "Kennismaking", body: intake, Icon: TalkIcon },
  { title: "Plan en teksten", body: "Ik leg vast welke pagina's er komen en schrijf de teksten. Jij leest ze, geeft feedback, en pas na jouw akkoord gaan ze verder.", Icon: MapIcon },
  { title: "Ontwerp en bouw", body: "Je kijkt mee op een testadres, met de echte teksten en je eigen foto's erin. Geen voorbeeldteksten.", Icon: PenIcon },
  { title: "Lancering", body: "Elke oude pagina verwijst door naar de nieuwe, zodat wat je in Google hebt opgebouwd meeverhuist.", Icon: LaunchIcon },
];

export const branchPages: Record<string, BranchPageData> = {
  horeca: {
    hero: { src: "/images/prijzen-hero.webp", alt: "De NXT Frame-mascotte aan een laptop in een café", pos: "50% 40%" },
    painArt: [
      { label: "Menukaart", title: <>Je menukaart is {i("een pdf")}</>, src: "/images/slim-search.webp" },
      { label: "Reserveren", title: <>Reserveringen komen {i("binnen via DM")}</>, src: "/images/pain-mobiel.webp", pos: "50% 40%" },
      { label: "Google", title: <>Google heeft {i("verouderde informatie")}</>, src: "/images/herkenbaar-2.webp", pos: "50% 28%" },
    ],
    features: [
      { icon: "speed", title: "Reserveren in drie tikken", body: "Een reserveerknop die op elke pagina meereist, gekoppeld aan het systeem dat je al gebruikt.", result: "Minder appjes tijdens de service" },
      { icon: "edit", title: "Een menukaart die je zelf bijwerkt", body: "Geen pdf, maar een kaart die snel laadt en die je op je telefoon aanpast als de daghap verandert.", result: "Altijd de juiste kaart online" },
      { icon: "area", title: "Een Google-profiel dat klopt", body: "Openingstijden, feestdagen en foto's die overal hetzelfde zeggen als je site.", result: "Gevonden in de buurt" },
      { icon: "sold", title: "Sfeer en reviews", body: "Je zaak, je gerechten en wat gasten ervan vinden, op de plek waar iemand nog twijfelt.", result: "Gekozen vóór het eerste bezoek" },
      { icon: "team", title: "Groepen en events", body: "Een eigen pagina voor groepen, borrels en besloten feesten, met een aanvraag die je rustig afhandelt.", result: "Grotere tafels, beter gepland" },
      { icon: "cost", title: "Allergenen en vragen", body: "Allergenen per gerecht en antwoorden op wat gasten altijd vragen: parkeren, honden, kinderen.", result: "Minder vragen aan de telefoon" },
    ],
    heroLead: "Voor restaurants, cafés en lunchrooms. Gasten die vanavond willen eten, vinden je kaart en reserveren zelf, zonder dat iemand tijdens de service de telefoon hoeft te pakken.",
    pricingIntro: "Meestal kiezen zaken voor een complete site. Zet het bedrag af tegen een paar extra gedekte tafels per week en minder telefoon tijdens de service. Na de kennismaking krijg je één vaste prijs.",
    intake: "Een halfuur over je zaak, je gasten en het reserveringssysteem dat je al gebruikt.",
    siteName: "horecasite",
    ways: (from, span) => [
      { name: "Losse uitbreiding", body: "Je site staat er, maar reserveren gaat nog via de telefoon. Dan bouw ik alleen dat stuk erbij.", time: "Planning in overleg", items: ["Reserveren gekoppeld aan je systeem", "Een menukaart die je zelf bijwerkt", "Je Google-profiel ingericht", "Past in je huidige site"] },
      { name: "Complete horecasite", from, body: "Een nieuwe site met online reserveren en een kaart die op elke telefoon goed leest.", time: `Live in ${span}`, items: ["Reserveren in drie tikken", "Menukaart met allergenen", "Een Google-profiel dat klopt", "Pagina voor groepen en events", "Oude pagina's verhuizen mee"], highlight: true },
      { name: "Meerdere zaken", body: "Eén merk met per zaak een eigen pagina, eigen kaart en eigen openingstijden.", time: "Planning in overleg", items: ["Alles van de complete site", "Een pagina per zaak", "Kaart en tijden per zaak", "Een Google-profiel per zaak"] },
    ],
    included: [...always, "Reserveren gekoppeld aan je systeem", "Menukaart met allergenen", "Google-profiel ingericht", "Oude pagina's verwijzen door naar de nieuwe"],
    notIncluded: "het abonnement van je reserveringssysteem, en hosting en onderhoud na de lancering.",
    segment: "Horeca",
  },

  webshops: {
    hero: { src: "/images/happyflops-laptop-hands.webp", alt: "De webshop van Happy Flops op een roze laptop, in twee handen", pos: "50% 45%" },
    painArt: [
      { label: "Snelheid", title: <>Je shop laadt {i("traag op 4G")}</>, src: "/images/traag-mobiel.webp", pos: "58% 50%" },
      { label: "Checkout", title: <>Bezoekers haken af {i("in de checkout")}</>, src: "/images/happyflops-phones.jpg" },
      { label: "Advertenties", title: <>Al je omzet komt {i("uit advertenties")}</>, src: "/images/herkenbaar-2.webp", pos: "50% 28%" },
    ],
    features: [
      { icon: "sold", title: "Productpagina's die overtuigen", body: "Sterke beelden, duidelijke keuzes, voorraad en levertijd in beeld en reviews waar de twijfel zit.", result: "Meer bestellingen per bezoek" },
      { icon: "value", title: "Een checkout zonder afhakers", body: "Geen verplicht account, verzendkosten vooraf duidelijk en iDEAL, Bancontact en Apple Pay.", result: "Minder verlaten winkelmandjes" },
      { icon: "speed", title: "Snel op 4G", body: "Gebouwd om snel te laden op een telefoon onderweg, zonder tien apps die alles vertragen.", result: "Minder bezoekers die afhaken" },
      { icon: "read", title: "Gevonden op productniveau", body: "Categorieën, filters en productdata die Google en ChatGPT begrijpen.", result: "Verkeer dat niet uit advertenties komt" },
      { icon: "area", title: "Verzending en boekhouding gekoppeld", body: "Sendcloud, MyParcel, Mollie, Moneybird of Exact: als er een koppeling bestaat, bouw ik hem in.", result: "Niets dubbel invoeren" },
      { icon: "edit", title: "Zelf beheren", body: "Producten, prijzen en acties pas je zelf aan, zonder dat het ontwerp scheef gaat.", result: "Geen bureau nodig voor een prijswijziging" },
    ],
    heroLead: "Voor merken en webwinkels. Een shop die op een telefoon net zo goed verkoopt als op een laptop, en die klanten trekt die je niet hoeft te huren met advertenties.",
    pricingIntro: "De meeste merken kiezen een complete shop. Elke bestelling die niet via een advertentie binnenkomt, kost je geen klikgeld. Na de kennismaking krijg je één vaste prijs, per onderdeel uitgesplitst.",
    intake: "Een halfuur over je merk, je producten en het platform waar je shop nu op draait.",
    siteName: "webshop",
    ways: (from, span) => [
      { name: "Losse uitbreiding", body: "Je shop draait, maar laadt traag of verliest klanten in de checkout. Dan pak ik dat deel aan.", time: "Planning in overleg", items: ["Snellere productpagina's", "Een checkout zonder afhakers", "Productdata voor Google en AI", "Op je huidige platform"] },
      { name: "Complete webshop", from, body: "Een nieuwe shop die op een telefoon net zo goed verkoopt als op een laptop.", time: `Live in ${span}`, items: ["Productpagina's die overtuigen", "Checkout met de bekende betaalmethoden", "Verzending en boekhouding gekoppeld", "Je producten overgezet", "Oude pagina's verhuizen mee"], highlight: true },
      { name: "Grote catalogus", body: "Honderden producten, varianten of zakelijke klanten met eigen prijzen.", time: "Planning in overleg", items: ["Alles van de complete shop", "Filters voor een grote catalogus", "Koppeling met je voorraad", "Zakelijke prijzen en accounts"] },
    ],
    included: [...always, "Checkout met iDEAL en Apple Pay", "Verzending en betalen gekoppeld", "Producten overgezet", "Oude pagina's verwijzen door naar de nieuwe"],
    notIncluded: "het abonnement van je shopplatform, transactiekosten, en hosting en onderhoud na de lancering.",
    segment: "Webshops",
  },

  "bouw-en-installatie": {
    hero: { src: "/images/mascot-build.webp", alt: "De NXT Frame-mascotte bouwt een website van blokken", pos: "50% 35%" },
    painArt: [
      { label: "Je werk", title: <>Je beste werk staat {i("op je telefoon")}</>, src: "/images/pain-mobiel.webp", pos: "50% 40%" },
      { label: "Offertes", title: <>Offertes lopen via de telefoon {i("tijdens het werk")}</>, src: "/images/traag-mobiel.webp", pos: "58% 50%" },
      { label: "Vindbaar", title: <>Je wordt gevonden {i("op je bedrijfsnaam")}</>, src: "/images/herkenbaar-2.webp", pos: "50% 28%" },
    ],
    features: [
      { icon: "sold", title: "Projecten als bewijs", body: "Echte foto's, voor en na, wat de klus inhield en wat de klant ervan vond.", result: "Vertrouwen vóór het inmeten" },
      { icon: "cost", title: "Offerte met foto's", body: "Een aanvraag die met één hand op een telefoon in te vullen is, met foto's van de situatie.", result: "Minder ritjes voor niets" },
      { icon: "area", title: "Een pagina per dienst en plaats", body: "Van badkamer tot warmtepomp, per werkgebied een eigen pagina met echte inhoud.", result: "Gevonden op de klus die je wilt" },
      { icon: "read", title: "Certificeringen en garanties", body: "VCA, Sterkin, KOMO of je garantieregeling op een vaste, zichtbare plek.", result: "Zekerheid bij een grote klus" },
      { icon: "value", title: "Offertes en facturen vanzelf", body: "Standaardklussen krijgen meteen een offerte met jouw prijzen, en een akkoord wordt een factuur. Jij past alleen aan wat afwijkt.", result: "Geen papierwerk meer 's avonds" },
      { icon: "edit", title: "Zelf projecten toevoegen", body: "Foto's en een paar regels tekst vanaf je telefoon, in een paar minuten.", result: "Je portfolio groeit mee" },
    ],
    heroLead: "Voor aannemers, installateurs en vakmensen. Je opgeleverde werk staat erop, en een offerte aanvragen kan 's avonds met een paar foto's erbij. Jij belt terug als het jou uitkomt.",
    pricingIntro: "De meeste vakmensen kiezen een complete site. Leg het naast wat één extra badkamer of warmtepomp je oplevert. Je krijgt na de kennismaking één vaste prijs.",
    intake: "Een halfuur over je vak, je werkgebied en de klussen die je het liefste doet.",
    siteName: "bedrijfssite",
    ways: (from, span) => [
      { name: "Losse uitbreiding", body: "Je hebt een nette site, maar de aanvragen blijven uit. Dan voeg ik toe wat daarvoor nodig is.", time: "Planning in overleg", items: ["Een offerteformulier met foto's", "Projectpagina's", "Pagina's per dienst en plaats", "Past in je huidige site"] },
      { name: "Complete bedrijfssite", from, body: "Een nieuwe site die je werk laat zien en offertes binnenhaalt.", time: `Live in ${span}`, items: ["Projecten met echte foto's", "Offerte met foto-upload", "Een pagina per dienst en plaats", "Je certificeringen in beeld", "Oude pagina's verhuizen mee"], highlight: true },
      { name: "Meerdere vestigingen", body: "Eén site voor je hele bedrijf, met per vestiging een eigen werkgebied en Google-profiel.", time: "Planning in overleg", items: ["Alles van de complete site", "Een pagina per vestiging", "Werkgebieden per vestiging", "Een Google-profiel per vestiging"] },
    ],
    included: [...always, "Offerteformulier met foto-upload", "Offerte- en factuurtool voor standaardklussen", "Projectpagina's", "Pagina's per dienst en werkgebied", "Oude pagina's verwijzen door naar de nieuwe"],
    notIncluded: "hosting en onderhoud na de lancering.",
    segment: "Bouw en installatie",
  },

  "zorg-en-praktijken": {
    hero: { src: "/images/slim-choice.webp", alt: "De NXT Frame-mascotte aan het werk in een bloeiende weide", pos: "50% 40%" },
    painArt: [
      { label: "De telefoon", title: <>De telefoon gaat {i("de hele ochtend")}</>, src: "/images/pain-mobiel.webp", pos: "50% 40%" },
      { label: "Aanmelden", title: <>Nieuwe patiënten weten niet {i("of je plek hebt")}</>, src: "/images/herkenbaar-2.webp", pos: "50% 28%" },
      { label: "Verouderd", title: <>Je site is gebouwd toen {i("de praktijk kleiner was")}</>, src: "/images/andere-tijd.webp" },
    ],
    features: [
      { icon: "speed", title: "Online een afspraak", body: "Inplannen, verzetten of een terugbelverzoek, zichtbaar op elke pagina.", result: "Minder telefoontjes in de ochtend" },
      { icon: "cost", title: "Wachttijd en aanmelden", body: "Of je aanneemt, hoe lang het duurt en wat iemand meeneemt naar de eerste afspraak.", result: "Rust aan beide kanten" },
      { icon: "team", title: "Behandelaars met gezicht", body: "Elke behandelaar met foto, specialisatie en BIG-registratie.", result: "Gekozen om wie er werkt" },
      { icon: "read", title: "Toegankelijk gebouwd", body: "Grote knoppen, rustig contrast, heldere taal en werkend met een schermlezer, volgens WCAG.", result: "Bruikbaar voor iedere patiënt" },
      { icon: "area", title: "Gevonden op je specialisme", body: "Een eigen pagina per behandeling en klacht, in je eigen plaats.", result: "Nieuwe patiënten uit de buurt" },
      { icon: "value", title: "Vergoeding en verzekeraars", body: "Met welke verzekeraars je een contract hebt en wat een behandeling kost, op een vaste plek. Zo weet een patiënt vooraf waar hij aan toe is.", result: "Geen verrassing op de rekening" },
    ],
    heroLead: "Voor tandartsen, fysiotherapeuten, psychologen en andere praktijken. Patiënten zien of je plek hebt en plannen zelf hun afspraak, zodat de telefoon 's ochtends stiller is.",
    pricingIntro: "De meeste praktijken starten met een complete site. Elke afspraak die een patiënt zelf online regelt, is tijd terug voor de balie. Na de kennismaking krijg je één vaste prijs.",
    intake: "Een halfuur over je praktijk, je patiënten en het afsprakensysteem dat je al gebruikt.",
    siteName: "praktijksite",
    ways: (from, span) => [
      { name: "Losse uitbreiding", body: "Je site voldoet, alleen gaat de telefoon nog de hele ochtend. Dan bouw ik online afspraken en de wachttijd erbij.", time: "Planning in overleg", items: ["Online afspraken gekoppeld", "Wachttijd en aanmeldstop", "Pagina's per behandeling", "Past in je huidige site"] },
      { name: "Complete praktijksite", from, body: "Een nieuwe, toegankelijke site waarop patiënten zelf een afspraak maken.", time: `Live in ${span}`, items: ["Online een afspraak maken", "Wachttijd die je zelf bijwerkt", "Een pagina per behandelaar", "Toegankelijk volgens WCAG", "Oude pagina's verhuizen mee"], highlight: true },
      { name: "Meerdere locaties", body: "Eén site voor je hele praktijk, met per locatie eigen behandelaars en tijden.", time: "Planning in overleg", items: ["Alles van de complete site", "Een pagina per locatie", "Behandelaars per locatie", "Een Google-profiel per locatie"] },
    ],
    included: [...always, "Online afspraken gekoppeld", "Wachttijd en aanmeldstop", "Toegankelijk volgens WCAG", "Oude pagina's verwijzen door naar de nieuwe"],
    notIncluded: "het abonnement van je afsprakensysteem, en hosting en onderhoud na de lancering.",
  },

  "beauty-en-wellness": {
    hero: { src: "/images/slim-palette.webp", alt: "De NXT Frame-mascotte met kleurstalen in de hand", pos: "50% 40%" },
    painArt: [
      { label: "Instagram", title: <>Je bio-link is {i("je website")}</>, src: "/images/pain-mobiel.webp", pos: "50% 40%" },
      { label: "Je agenda", title: <>Gaten in je agenda zie je {i("pas 's avonds")}</>, src: "/images/slim-desk.webp" },
      { label: "Nieuwe klanten", title: <>Nieuwe klanten vinden je alleen {i("als ze je al volgen")}</>, src: "/images/herkenbaar-2.webp", pos: "50% 28%" },
    ],
    features: [
      { icon: "speed", title: "Online boeken", body: "Behandeling, duur, prijs en beschikbaarheid in één overzicht, gebouwd op bezoek dat van Instagram komt.", result: "Gaten in je agenda gevuld" },
      { icon: "value", title: "Behandelingen met prijs", body: "Wat het is, wat het kost en hoe lang het duurt, per behandeling.", result: "Minder vragen in je DM" },
      { icon: "sold", title: "Je werk in beeld", body: "Beeld, kleur en typografie die bij jouw studio horen, met je eigen werk voorop.", result: "Geboekt op wat ze zien" },
      { icon: "area", title: "Een pagina per behandeling", body: "Elke behandeling met je stad of wijk, plus een Google-profiel dat klopt.", result: "Gevonden zonder te adverteren" },
      { icon: "team", title: "Herinneringen tegen no-shows", body: "Een herinnering per mail of sms vóór de afspraak, en als je wilt een aanbetaling bij het boeken.", result: "Minder lege plekken" },
      { icon: "edit", title: "Zelf prijzen en acties", body: "Een prijs wijzigen of een actie plaatsen doe je zelf.", result: "Aanpassen wanneer het jou uitkomt" },
    ],
    heroLead: "Voor salons, studio's en spa's. Nieuwe klanten vinden je zonder dat ze je al volgen, en een afzegging kan meteen weer online geboekt worden.",
    pricingIntro: "Bijna elke salon begint met een complete site. Een afzegging die alsnog online geboekt wordt, is omzet die je anders kwijt was. Na de kennismaking krijg je één vaste prijs.",
    intake: "Een halfuur over je studio, je behandelingen en het boekingssysteem dat je al gebruikt.",
    siteName: "salonsite",
    ways: (from, span) => [
      { name: "Losse uitbreiding", body: "Je hebt een site, maar boeken gaat nog via je DM. Dan koppel ik je boekingssysteem en zet ik je behandelingen erop.", time: "Planning in overleg", items: ["Online boeken gekoppeld", "Behandelingen met prijs", "Pagina's per behandeling", "Past in je huidige site"] },
      { name: "Complete salonsite", from, body: "Een nieuwe site met de sfeer van je studio, waarop klanten zelf boeken.", time: `Live in ${span}`, items: ["Online boeken", "Behandelingen met prijs", "Een pagina per behandeling", "Je behandelaars te kiezen", "Een Google-profiel dat klopt"], highlight: true },
      { name: "Salon met shop", body: "Je behandelingen en een kleine shop met de producten die je klanten al bij je kopen.", time: "Planning in overleg", items: ["Alles van de complete site", "Een kleine productshop", "Betalen met iDEAL", "Voorraad die je zelf bijhoudt"] },
    ],
    included: [...always, "Online boeken gekoppeld", "Behandelingen met prijs", "Google-profiel ingericht", "Oude pagina's verwijzen door naar de nieuwe"],
    notIncluded: "het abonnement van je boekingssysteem, fotografie, en hosting en onderhoud na de lancering.",
  },

  "coaches-en-adviseurs": {
    hero: { src: "/images/over-mascot.webp", alt: "De NXT Frame-mascotte op de bank met een laptop", pos: "50% 40%" },
    painArt: [
      { label: "Je aanbod", title: <>Je aanbod is niet te begrijpen {i("zonder gesprek")}</>, src: "/images/hero-hill-v1.webp" },
      { label: "Kennismakingen", title: <>Kennismakingen die {i("nooit iets worden")}</>, src: "/images/pain-mobiel.webp", pos: "50% 40%" },
      { label: "LinkedIn", title: <>Je beste inzichten {i("verdwijnen in LinkedIn")}</>, src: "/images/herkenbaar-2.webp", pos: "50% 28%" },
    ],
    features: [
      { icon: "team", title: "Jij als merk", body: "Foto's en teksten die klinken zoals jij praat. Mensen kiezen een coach, geen bedrijf.", result: "Gekozen om wie je bent" },
      { icon: "value", title: "Aanbod met prijs", body: "Trajecten, duur, prijs en resultaat in één oogopslag.", result: "Kennismakingen die wél iets worden" },
      { icon: "cost", title: "Kennismaking plannen", body: "Je agenda gekoppeld, met je eigen beschikbaarheid en een automatische bevestiging.", result: "Geen mailwisseling meer" },
      { icon: "read", title: "Artikelen die blijven", body: "Je stukken op je eigen site, gestructureerd voor Google en AI-antwoorden.", result: "Jarenlang gevonden" },
      { icon: "area", title: "Een pagina per doelgroep", body: "Loopbaancoaching voor starters leest anders dan teamcoaching voor directies.", result: "De juiste klant voelt zich aangesproken" },
      { icon: "edit", title: "Zelf publiceren", body: "Schrijven in een eenvoudige editor, opmaak en vindbaarheid regelt de site.", result: "Je LinkedIn-stukken krijgen een thuis" },
    ],
    heroLead: "Voor coaches, trainers en consultants. Bezoekers snappen in één keer wat je aanbiedt en wat het kost, dus wie een kennismaking plant, weet al waar hij aan begint.",
    pricingIntro: "De meeste coaches starten met een complete site. Leg het naast de prijs van je trajecten, dan zie je hoeveel extra klanten het moet opleveren. Na de kennismaking krijg je één vaste prijs.",
    intake: "Een halfuur over jou, je aanbod en de klanten met wie je het liefste werkt.",
    siteName: "coachsite",
    ways: (from, span) => [
      { name: "Losse uitbreiding", body: "Je site staat, maar je aanbod is lastig te volgen of er komen weinig kennismakingen uit. Dan maak ik je aanbod helder en zet ik een planner erbij.", time: "Planning in overleg", items: ["Je aanbod met prijs", "Kennismaking plannen", "Een plek om te publiceren", "Past in je huidige site"] },
      { name: "Complete coachsite", from, body: "Een nieuwe site rond jou en je werk, met een aanbod dat in één keer te snappen is.", time: `Live in ${span}`, items: ["Jij als merk", "Trajecten met prijs", "Kennismaking plannen", "Zelf artikelen publiceren", "Een pagina per doelgroep"], highlight: true },
      { name: "Met online programma", body: "Een betaalde inschrijving of een afgeschermde omgeving met video's en opdrachten.", time: "Planning in overleg", items: ["Alles van de complete site", "Online betalen en inschrijven", "Een afgeschermde omgeving", "Video's en opdrachten"] },
    ],
    included: [...always, "Agenda gekoppeld", "Trajecten met prijs", "Zelf artikelen publiceren", "Oude pagina's verwijzen door naar de nieuwe"],
    notIncluded: "het abonnement van je agendatool, en hosting en onderhoud na de lancering.",
    segment: "Coaches en trainers",
  },
};
