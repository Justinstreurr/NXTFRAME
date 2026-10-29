import type { FindSectionContent, LinksContent } from "./BranchSections";

/* ---------- Koppelingen and Vindbaar per branch: the same two sections on every branch page ----------
   Names in the films are always "Jouw ..." and places "jouw plaats": they show the shape, not a
   client. Figures in the films (reviews, numbers) are examples. Nothing promises a position. */

const i = (t: string) => <span className="serif-italic">{t}</span>;

const wine = "bg-[#440220] text-[#fcbbb9]";
const lime = "bg-lime text-forest";
const paper = "bg-paper text-forest";
const dark = "bg-forest text-paper";

export const branchSections: Record<string, { links: LinksContent; find: FindSectionContent }> = {
  makelaars: {
    links: {
      title: <>Je aanbod komt uit {i("je eigen pakket")}</>,
      lead: "Je blijft werken zoals je werkt. De site haalt de woningen op uit je makelaarssoftware en stuurt aanvragen terug naar jou.",
      into: {
        title: "Je voert een woning één keer in", icon: "house",
        body: "In Realworks, Kolibri of het pakket waar je al mee werkt. Nieuwe woningen, prijswijzigingen en ‘verkocht onder voorbehoud’ staan vanzelf op je site.",
        sources: [{ name: "Realworks", src: "/images/logos/realworks.webp" }, { name: "Kolibri", src: "/images/logos/kolibri.webp" }, { name: "Feed", icon: "refresh" }],
        page: "Aanbod", tileIcon: "house",
        tiles: [{ status: "Nieuw", tone: lime }, { status: "Verkocht o.v.", tone: wine }, { status: "Te koop", tone: paper }, { status: "Open huis", tone: dark }],
      },
      back: {
        title: "Elke aanvraag komt bij jou binnen", icon: "chat",
        body: "Bezichtigingen, waardebepalingen en terugbelverzoeken. Altijd per mail, en laat je pakket het toe, dan ook direct in je CRM.",
        requests: [
          { title: "Nieuwe waardebepaling", meta: "Dorpsstraat 12, jouw plaats", tag: "In je CRM" },
          { title: "Bezichtiging aangevraagd", meta: "Zaterdag 10:30 · Molenweg 4", tag: "Per mail" },
          { title: "Terugbelverzoek", meta: "Na 17:00 · over verkopen", tag: "Voor jou" },
        ],
      },
      facts: [
        { title: "De toegang vraag je aan bij je leverancier", body: "De sleutel tot je aanbod is van jou en komt van je softwareleverancier. Sommige rekenen daar een bedrag voor. Dat zoeken we samen uit voordat je iets tekent." },
        { title: "De koppeling staat los van de site", body: "Wissel je later van pakket, dan vervang ik dat ene koppelstuk. Ontwerp, teksten en posities in Google blijven staan." },
        { title: "En Funda?", body: "Dat blijft lopen via je pakket, zoals nu. Je eigen site komt ernaast, voor het werk dat Funda niet doet: verkopers binnenhalen." },
      ],
    },
    find: {
      title: <>Gevonden waar {i("verkopers zoeken")}</>,
      lead: "Een koper zoekt een huis op Funda. Een verkoper zoekt een makelaar, en dat doet hij in Google, op de kaart of in ChatGPT.",
      bento: {
        google: {
          title: "Een pagina voor elke plaats", result: "Gevonden op ‘makelaar + plaats’",
          body: "Per plaats en per dienst een eigen pagina met een echt antwoord: wat je er verkocht hebt, wat een woning er doet, wie je bent.",
          query: "makelaar in jouw plaats", others: [["funda.nl › makelaars", "Makelaars in jouw plaats vergelijken"], ["makelaarsland.nl", "Makelaar nodig? Bekijk de mogelijkheden"]],
          url: "jouwkantoor.nl › makelaar-jouw-plaats", page: "Makelaar in jouw plaats | Jouw kantoor", snippet: "32 woningen verkocht in jouw plaats. Gratis waardebepaling binnen 2 dagen.",
        },
        map: { title: "Je bedrijfsprofiel klopt", result: "In beeld op de kaart", body: "Adres, openingstijden en reviews op je site komen overeen met je Google-profiel, per vestiging.", name: "Jouw kantoor", meta: "Makelaar · Nu open · Marktstraat 12" },
        ai: {
          result: "Kans om genoemd te worden",
          body: "Je kantoor, je werkgebied en je antwoorden staan ook als gestructureerde gegevens in de pagina, zodat een AI ze kan overnemen en jou kan noemen.",
          question: "Welke makelaar in mijn plaats raad je aan voor de verkoop van mijn huis?", name: "Jouw kantoor",
          answer: "Ze verkochten vorig jaar 32 woningen in jouw plaats en je kunt online een gratis waardebepaling aanvragen.", source: "jouwkantoor.nl",
        },
      },
      who: "verkopers",
      searches: [
        { q: "makelaar in [plaats]", on: "google" }, { q: "huis verkopen [plaats]", on: "google" }, { q: "welke makelaar raad je aan?", on: "chatgpt" }, { q: "wat is mijn huis waard", on: "google" },
        { q: "gratis waardebepaling", on: "google" }, { q: "makelaar in de buurt", on: "maps" }, { q: "wat kost een makelaar?", on: "chatgpt" }, { q: "taxatie woning [plaats]", on: "google" },
      ],
    },
  },

  "financieel-advies": {
    links: {
      title: <>Je site werkt mee {i("met wat je al gebruikt")}</>,
      lead: "Links wat de bezoeker op je site doet, rechts wat er bij jou binnenkomt. Rekentools en je agenda werken samen, zonder dat je iets dubbel bijhoudt.",
      into: {
        title: "Bezoekers rekenen zelf", icon: "chart", calculator: true,
        body: "Wat kan ik lenen, wat worden mijn maandlasten, loopt mijn rente af? Rekentools die ik voor je bouw en actueel houd. Na de berekening plant een bezoeker direct een kennismaking.",
        sources: [{ name: "Agenda", icon: "grid" }, { name: "Google", src: "/images/logos/google.webp" }, { name: "Trustoo", icon: "sparkle" }],
        page: "Je site", tileIcon: "chart",
        tiles: [{ status: "Maandlasten", tone: lime }, { status: "Rente loopt af", tone: wine }, { status: "5,0 Google", tone: paper }, { status: "Kennismaking", tone: dark }],
      },
      back: {
        title: "Elke aanvraag en afspraak komt bij jou binnen", icon: "chat",
        body: "Kennismakingen in je eigen agenda, berekeningen en terugbelverzoeken in je mail, met wat de bezoeker al heeft ingevuld. Zo begin je het eerste gesprek voorbereid.",
        requests: [
          { title: "Nieuwe kennismaking", meta: "Do 19:30 · eerste huis kopen", tag: "In je agenda" },
          { title: "Berekening maandlasten", meta: "€ 1.229 per maand · jouw plaats", tag: "Per mail" },
          { title: "Terugbelverzoek", meta: "Na 17:00 · rentevaste periode", tag: "Voor jou" },
        ],
      },
      facts: [
        { title: "Je agenda blijft van jou", body: "Calendly, Cal.com of Microsoft Bookings: de site gebruikt de agenda die je al hebt. Bezoekers zien alleen de momenten die jij vrijgeeft." },
        { title: "Geen gevoelige gegevens in je mailbox", body: "Formulieren vragen alleen wat nodig is voor een eerste gesprek. Voor stukken met financiële details gebruiken we een beveiligde upload." },
        { title: "Rekentools die je kunt uitleggen", body: "De uitgangspunten van elke berekening staan erbij. Een uitkomst is een indicatie en geen advies, en zo staat het er ook." },
      ],
    },
    find: {
      title: <>Gevonden op {i("de vraag achter de zoekterm")}</>,
      lead: "Op 'hypotheek' win je het niet van de grote vergelijkers. Op de vraag van iemand in jouw regio, met jouw specialisme, wel.",
      bento: {
        google: {
          title: "Gevonden op je specialisme", result: "Gevonden op de vraag die iemand stelt",
          body: "Eerste huis, scheiden, oversluiten, ondernemer: per vraag een eigen pagina met een echt antwoord en de regio waarin je werkt.",
          query: "hypotheekadviseur jouw plaats", others: [["independer.nl › hypotheek", "Hypotheekadviseurs vergelijken"], ["hypotheker.nl", "Hypotheekadvies bij jou in de buurt"]],
          url: "jouwadvies.nl › hypotheekadvies-jouw-plaats", page: "Hypotheekadviseur in jouw plaats | Jouw advies", snippet: "Onafhankelijk advies, online of bij je thuis. Gratis kennismaking, ook 's avonds.",
        },
        map: { title: "Je bedrijfsprofiel klopt", result: "In beeld op de kaart", body: "Adres, openingstijden, reviews en of je ook thuis langskomt, overal hetzelfde als op je site.", name: "Jouw advies", meta: "Hypotheekadviseur · Ook aan huis" },
        ai: {
          result: "Kans om genoemd te worden",
          body: "Je diensten, je werkgebied en je antwoorden staan ook als gestructureerde gegevens in de pagina, zodat een AI ze kan overnemen en jou kan noemen.",
          question: "Mijn rentevaste periode loopt af. Bij wie in de buurt kan ik advies vragen?", name: "Jouw advies",
          answer: "Ze helpen bij oversluiten en verlengen, en je kunt online een gratis kennismaking plannen, ook 's avonds.", source: "jouwadvies.nl",
        },
      },
      who: "klanten",
      searches: [
        { q: "hypotheekadviseur [plaats]", on: "google" }, { q: "hoeveel kan ik lenen", on: "google" }, { q: "moet ik nu oversluiten?", on: "chatgpt" }, { q: "rentevaste periode loopt af", on: "google" },
        { q: "onafhankelijk hypotheekadvies", on: "google" }, { q: "hypotheekadviseur in de buurt", on: "maps" }, { q: "wat kost hypotheekadvies?", on: "chatgpt" }, { q: "hypotheek bij scheiding", on: "google" },
      ],
    },
  },

  horeca: {
    links: {
      title: <>Je reserveringen lopen {i("via je eigen systeem")}</>,
      lead: "Je blijft werken met het systeem dat je kent. De site toont je kaart, tijden en beschikbaarheid, en elke reservering komt daar binnen.",
      into: {
        title: "Je past het één keer aan", icon: "cup",
        body: "Je kaart, je openingstijden en je beschikbaarheid. Wat je in je systeem of op je telefoon wijzigt, staat direct op je site.",
        sources: [{ name: "Reserveren", icon: "grid" }, { name: "Google", src: "/images/logos/google.webp" }, { name: "Menukaart", icon: "cup" }],
        page: "Je site", tileIcon: "cup",
        tiles: [{ status: "Daghap", tone: lime }, { status: "Vol vanavond", tone: wine }, { status: "Open tot 23:00", tone: paper }, { status: "Nieuw op de kaart", tone: dark }],
      },
      back: {
        title: "Elke reservering komt bij jou binnen", icon: "chat",
        body: "Tafels, groepen en vragen. In je reserveringssysteem en je mail, niet in je DM tijdens de service.",
        requests: [
          { title: "Nieuwe reservering", meta: "Vr 19:30 · 4 personen", tag: "In je systeem" },
          { title: "Groepsaanvraag", meta: "Za 14 dec · 22 personen, borrel", tag: "Per mail" },
          { title: "Vraag over allergenen", meta: "Glutenvrij, notenallergie", tag: "Voor jou" },
        ],
      },
      facts: [
        { title: "Je houdt je eigen systeem", body: "Werk je met Formitable, Resengo, TheFork of Zenchef, dan bouw ik hun reserveermodule in, in de stijl van je zaak." },
        { title: "Openingstijden die overal kloppen", body: "Bij de lancering zet ik je site en je Google-profiel gelijk, en ik laat zien hoe je ze samen bijwerkt. Zo staat er geen gast voor een dichte deur." },
        { title: "Geen pdf meer", body: "Je kaart staat als echte tekst op de site, dus Google leest je gerechten en je gast hoeft niet te knijpen." },
      ],
    },
    find: {
      title: <>Gevonden waar {i("gasten zoeken")}</>,
      lead: "Wie vanavond uit eten wil, pakt zijn telefoon, vaak pas kort van tevoren. Hij kijkt in Google, op de kaart of vraagt het aan ChatGPT.",
      bento: {
        google: {
          title: "Gevonden op je gerechten", result: "Gevonden op wat gasten zoeken",
          body: "Je kaart als echte tekst, per gerecht vindbaar, met een pagina voor groepen, lunch en terras.",
          query: "restaurant jouw plaats terras", others: [["thefork.nl › jouw plaats", "De beste restaurants in jouw plaats"], ["iens.nl", "Restaurants in jouw plaats met terras"]],
          url: "jouwzaak.nl › terras", page: "Eten op het terras in jouw plaats | Jouw zaak", snippet: "Zonnig terras aan het water. Vanavond nog plek, reserveer in drie tikken.",
        },
        map: { title: "Je bedrijfsprofiel klopt", result: "In beeld op de kaart", body: "Openingstijden, feestdagen, foto's en reviews die overal hetzelfde zeggen als je site.", name: "Jouw zaak", meta: "Restaurant · Open tot 23:00" },
        ai: {
          result: "Kans om genoemd te worden",
          body: "Je kaart, je tijden en wat je zaak bijzonder maakt staan ook als gestructureerde gegevens in de pagina, zodat een AI ze kan overnemen.",
          question: "Waar kan ik vanavond in de buurt goed eten met een groep van acht?", name: "Jouw zaak",
          answer: "Ze hebben een aparte ruimte voor groepen en je kunt direct online reserveren.", source: "jouwzaak.nl",
        },
      },
      who: "gasten",
      searches: [
        { q: "restaurant [plaats]", on: "google" }, { q: "lunch in de buurt", on: "maps" }, { q: "waar kan ik vanavond eten?", on: "chatgpt" }, { q: "terras [plaats]", on: "google" },
        { q: "restaurant voor groepen", on: "google" }, { q: "nu open bij mij in de buurt", on: "maps" }, { q: "leuk restaurant voor een date?", on: "chatgpt" }, { q: "glutenvrij eten [plaats]", on: "google" },
      ],
    },
  },

  webshops: {
    links: {
      title: <>Je shop praat met {i("wat je al gebruikt")}</>,
      lead: "Betalen, verzenden en boekhouden lopen door de systemen die je kent. Niets dubbel invoeren, en elke bestelling komt goed binnen.",
      into: {
        title: "Je voert een product één keer in", icon: "bag",
        body: "Voorraad, prijzen en varianten op één plek. Wat je wijzigt, staat direct goed in je shop en in de productdata voor Google.",
        sources: [{ name: "Voorraad", icon: "grid" }, { name: "Betalen", icon: "cart" }, { name: "Verzenden", icon: "refresh" }],
        page: "Je shop", tileIcon: "bag",
        tiles: [{ status: "Nieuw", tone: lime }, { status: "Bijna op", tone: wine }, { status: "Op voorraad", tone: paper }, { status: "Sale", tone: dark }],
      },
      back: {
        title: "Elke bestelling komt goed binnen", icon: "cart",
        body: "Met verzending en boekhouding gekoppeld komt een bestelling betaald binnen, met het label klaar en de factuur geboekt. Jij pakt in.",
        requests: [
          { title: "Nieuwe bestelling", meta: "2 artikelen · betaald met iDEAL", tag: "Label klaar" },
          { title: "Retour aangemeld", meta: "Maat te klein · omruilen", tag: "Per mail" },
          { title: "Factuur geboekt", meta: "Bestelling 1042 · € 64,90", tag: "In je boekhouding" },
        ],
      },
      facts: [
        { title: "Je kiest zelf je platform", body: "Shopify, WooCommerce of maatwerk: ik kies wat jou het minste werk kost, niet wat mij het beste uitkomt." },
        { title: "Koppelingen staan los van het ontwerp", body: "Stap je over naar een andere vervoerder of boekhouding, dan vervang ik dat ene koppelstuk. De shop blijft staan." },
        { title: "Je verkoopt door tijdens de overstap", body: "De oude shop draait tot de nieuwe getest en goedgekeurd is, dus je verkoopt geen dag minder." },
      ],
    },
    find: {
      title: <>Gevonden waar {i("kopers zoeken")}</>,
      lead: "Wie een product zoekt, kent je merk nog niet. Hij zoekt op wat hij nodig heeft, in Google, in Shopping of in ChatGPT.",
      bento: {
        google: {
          title: "Gevonden op productniveau", result: "Verkeer zonder advertenties",
          body: "Categorieën, filters en productdata die Google begrijpt, met een pagina die de vraag achter de zoekterm beantwoordt.",
          query: "slippers met voetbed dames", others: [["bol.com › slippers", "Slippers dames kopen"], ["zalando.nl", "Slippers voor dames online"]],
          url: "jouwshop.nl › slippers-voetbed", page: "Slippers met voetbed voor dames | Jouw shop", snippet: "Zacht voetbed, in 8 kleuren. Voor 22:00 besteld, morgen in huis.",
        },
        map: { title: "Je winkel op de kaart", result: "Gevonden in de buurt", body: "Heb je ook een winkel of afhaalpunt, dan staan adres, tijden en voorraad overal hetzelfde.", name: "Jouw shop", meta: "Winkel · Afhalen mogelijk" },
        ai: {
          result: "Kans om genoemd te worden",
          body: "Je producten, prijzen en voorraad staan ook als gestructureerde gegevens in de pagina. Dat maakt het voor een AI makkelijker om ze over te nemen en jou te noemen.",
          question: "Welke slippers met een goed voetbed raad je aan voor de zomer?", name: "Jouw shop",
          answer: "Ze hebben slippers met een zacht voetbed in acht kleuren, en voor 22:00 besteld is morgen in huis.", source: "jouwshop.nl",
        },
      },
      who: "kopers",
      searches: [
        { q: "[product] kopen", on: "google" }, { q: "[product] in de aanbieding", on: "google" }, { q: "welke [product] is het best?", on: "chatgpt" }, { q: "[product] morgen in huis", on: "google" },
        { q: "[merk] review", on: "google" }, { q: "[product] winkel in de buurt", on: "maps" }, { q: "cadeau-idee onder € 50?", on: "chatgpt" }, { q: "[product] duurzaam", on: "google" },
      ],
    },
  },

  "bouw-en-installatie": {
    links: {
      title: <>Je werk gaat {i("van de klus op je site")}</>,
      lead: "Je fotografeert op de klus, de site maakt er een project van. En elke aanvraag komt binnen met wat je nodig hebt om in te schatten.",
      into: {
        title: "Je maakt foto's op de klus", icon: "wrench",
        body: "Vanaf je telefoon voeg je een project toe: foto's, wat het was, waar. Zo groeit je portfolio mee met je werk, zonder dat je er avonden achter zit.",
        sources: [{ name: "Foto's", icon: "eye" }, { name: "Google", src: "/images/logos/google.webp" }, { name: "Keurmerk", icon: "sparkle" }],
        page: "Projecten", tileIcon: "wrench",
        tiles: [{ status: "Badkamer", tone: lime }, { status: "Warmtepomp", tone: wine }, { status: "Dakkapel", tone: paper }, { status: "Opgeleverd", tone: dark }],
      },
      back: {
        title: "Elke aanvraag komt bij jou binnen", icon: "chat",
        body: "Offertes met foto's van de situatie, terugbelverzoeken en vragen. In je mail, zodat je 's avonds rustig inschat in plaats van op de ladder op te nemen.",
        requests: [
          { title: "Offerte aangevraagd", meta: "Badkamer · 3 foto's bijgevoegd", tag: "Per mail" },
          { title: "Terugbelverzoek", meta: "Na 18:00 · warmtepomp", tag: "Voor jou" },
          { title: "Vraag over planning", meta: "Dakkapel · voorjaar", tag: "Per mail" },
        ],
      },
      facts: [
        { title: "Telefoonfoto's zijn genoeg", body: "Scherp en licht is alles wat telt. Ik laat zien welke drie of vier je van elke klus maakt." },
        { title: "Foto's van de klant schelen ritjes", body: "Een meterkast, badkamer of dak op de foto, en je weet vooraf waar je aan begint." },
        { title: "Je certificering op een vaste plek", body: "VCA, Sterkin of je garantieregeling staan zichtbaar, juist bij de grote klussen waar het telt." },
      ],
    },
    find: {
      title: <>Gevonden op {i("de klus die je wilt")}</>,
      lead: "Wie een vakman zoekt, kent je naam nog niet. Hij zoekt op de klus en zijn plaats: in Google, op de kaart of in ChatGPT.",
      bento: {
        google: {
          title: "Een pagina per dienst en plaats", result: "Gevonden op dienst + plaats",
          body: "Elke dienst een eigen pagina per werkgebied, met echte projecten uit die buurt.",
          query: "warmtepomp installeren jouw plaats", others: [["werkspot.nl", "Vakmensen voor een warmtepomp vergelijken"], ["milieucentraal.nl", "Warmtepomp: alles wat je moet weten"]],
          url: "jouwbedrijf.nl › warmtepomp-jouw-plaats", page: "Warmtepomp installeren in jouw plaats | Jouw bedrijf", snippet: "28 warmtepompen geplaatst in de regio. Offerte met foto's, binnen 2 dagen.",
        },
        map: { title: "Je bedrijfsprofiel klopt", result: "In beeld op de kaart", body: "Je werkgebied, reviews en certificeringen overal hetzelfde als op je site.", name: "Jouw bedrijf", meta: "Installateur · Werkt in de regio" },
        ai: {
          result: "Kans om genoemd te worden",
          body: "Je diensten, je werkgebied en je projecten staan er ook in een vorm die een AI direct kan lezen. Dat vergroot de kans dat jij genoemd wordt.",
          question: "Wie kan in mijn regio een warmtepomp installeren?", name: "Jouw bedrijf",
          answer: "Ze hebben in de regio al veel warmtepompen geplaatst en je kunt online een offerte met foto's aanvragen.", source: "jouwbedrijf.nl",
        },
      },
      who: "klanten",
      searches: [
        { q: "badkamer renoveren [plaats]", on: "google" }, { q: "warmtepomp installateur", on: "google" }, { q: "wat kost een dakkapel?", on: "chatgpt" }, { q: "aannemer [plaats]", on: "google" },
        { q: "loodgieter spoed", on: "google" }, { q: "installateur in de buurt", on: "maps" }, { q: "is een warmtepomp het waard?", on: "chatgpt" }, { q: "zonnepanelen laten leggen", on: "google" },
      ],
    },
  },

  "zorg-en-praktijken": {
    links: {
      title: <>Je agenda en je site {i("zeggen hetzelfde")}</>,
      lead: "Online afspraken lopen via je eigen systeem. Wachttijd en aanmeldstop zet je zelf, en de site toont het meteen.",
      into: {
        title: "Je zet het één keer goed", icon: "heart",
        body: "Of je aanneemt, hoe lang de wachttijd is en welke behandelaar er wanneer is. Wat je aanpast, staat direct op je site.",
        sources: [{ name: "Agenda", icon: "grid" }, { name: "Google", src: "/images/logos/google.webp" }, { name: "Wachttijd", icon: "refresh" }],
        page: "Je site", tileIcon: "heart",
        tiles: [{ status: "Neemt aan", tone: lime }, { status: "Wachttijd 3 wk", tone: wine }, { status: "Fysio", tone: paper }, { status: "Vandaag open", tone: dark }],
      },
      back: {
        title: "Elke afspraak komt bij jou binnen", icon: "chat",
        body: "Afspraken, verzettingen en terugbelverzoeken. In je agenda, zonder dat je assistente er de hele ochtend aan de telefoon voor zit.",
        requests: [
          { title: "Nieuwe afspraak", meta: "Di 09:15 · intake", tag: "In je agenda" },
          { title: "Afspraak verzet", meta: "Van do naar vr 14:00", tag: "In je agenda" },
          { title: "Terugbelverzoek", meta: "Na 12:00 · aanmelden", tag: "Voor de balie" },
        ],
      },
      facts: [
        { title: "Je houdt je eigen systeem", body: "Veel praktijksystemen hebben een module voor online afspraken. Die bouw ik in, in de stijl van je praktijk." },
        { title: "Geen medische gegevens in een formulier", body: "Het contactformulier vraagt alleen naam, bereikbaarheid en de reden in één regel. De rest bespreek je in een veilige omgeving." },
        { title: "Toegankelijk vanaf het ontwerp", body: "Grote knoppen, rustig contrast en werkend met een schermlezer, volgens WCAG. Geen sluitstuk, maar het begin." },
      ],
    },
    find: {
      title: <>Gevonden waar {i("patiënten zoeken")}</>,
      lead: "Wie last heeft, zoekt op zijn klacht en zijn plaats. In Google, op de kaart of in ChatGPT, vaak 's avonds.",
      bento: {
        google: {
          title: "Een pagina per behandeling", result: "Gevonden op klacht + plaats",
          body: "Per behandeling en klacht een eigen pagina die uitlegt wat je doet, voor wie en hoe snel iemand terecht kan.",
          query: "fysiotherapeut rugklachten jouw plaats", others: [["zorgkaartnederland.nl", "Fysiotherapeuten in jouw plaats"], ["thuisarts.nl", "Rugpijn: wat kun je zelf doen?"]],
          url: "jouwpraktijk.nl › rugklachten", page: "Fysiotherapie bij rugklachten in jouw plaats | Jouw praktijk", snippet: "Nieuwe patiënten welkom. Wachttijd nu 1 week, online een afspraak maken.",
        },
        map: { title: "Je praktijkprofiel klopt", result: "In beeld op de kaart", body: "Adres, tijden, toegankelijkheid en of je aanneemt, overal hetzelfde als op je site.", name: "Jouw praktijk", meta: "Fysiotherapeut · Neemt aan" },
        ai: {
          result: "Kans om genoemd te worden",
          body: "Je behandelingen, je behandelaars en je wachttijd staan ook als gestructureerde gegevens in de pagina, zodat een AI ze kan overnemen en jou kan noemen.",
          question: "Welke fysiotherapeut in de buurt neemt nog nieuwe patiënten aan?", name: "Jouw praktijk",
          answer: "Ze nemen nieuwe patiënten aan en je kunt online een afspraak maken.", source: "jouwpraktijk.nl",
        },
      },
      who: "patiënten",
      searches: [
        { q: "fysiotherapeut [plaats]", on: "google" }, { q: "tandarts neemt patiënten aan", on: "google" }, { q: "wat helpt tegen rugpijn?", on: "chatgpt" }, { q: "psycholoog wachttijd", on: "google" },
        { q: "praktijk zonder verwijzing", on: "google" }, { q: "huisarts in de buurt", on: "maps" }, { q: "moet ik naar de fysio?", on: "chatgpt" }, { q: "afspraak online maken", on: "google" },
      ],
    },
  },

  "beauty-en-wellness": {
    links: {
      title: <>Je boekingen lopen {i("via je eigen systeem")}</>,
      lead: "Boeken loopt via het systeem dat je al gebruikt. Je behandelingen, prijzen en vrije plekken staan op je site, in de stijl van je studio.",
      into: {
        title: "Je werkt in je eigen boekingssysteem", icon: "sparkle",
        body: "Behandelingen, prijzen en je vrije plekken. Wat je in je boekingssysteem zet, staat direct op je site.",
        sources: [{ name: "Boeken", icon: "grid" }, { name: "Google", src: "/images/logos/google.webp" }, { name: "Instagram", icon: "eye" }],
        page: "Je site", tileIcon: "sparkle",
        tiles: [{ status: "Nog plek", tone: lime }, { status: "Volgeboekt", tone: wine }, { status: "Nieuw", tone: paper }, { status: "Actie", tone: dark }],
      },
      back: {
        title: "Elke boeking komt bij jou binnen", icon: "chat",
        body: "Boekingen, verzettingen en vragen. In je agenda, niet in je DM, en een vrijgekomen plek staat meteen weer online.",
        requests: [
          { title: "Nieuwe boeking", meta: "Wo 14:00 · gelaatsbehandeling", tag: "In je agenda" },
          { title: "Plek gevuld", meta: "Afzegging 11:00 · nu geboekt", tag: "In je agenda" },
          { title: "Vraag over behandeling", meta: "Gevoelige huid", tag: "Per mail" },
        ],
      },
      facts: [
        { title: "Je houdt je eigen systeem", body: "Werk je met Salonized, Treatwell, Booksy of Fresha, dan bouw ik hun boekingsmodule in. Eén agenda, dus geen dubbele boekingen." },
        { title: "Instagram blijft, je site komt ernaast", body: "Je bio-link wijst naar je site, waar boeken in een paar tikken gaat. Je site blijft van jou, wat het algoritme ook doet." },
        { title: "Kies je behandelaar", body: "Werk je met meerdere behandelaars, dan kiest de klant zelf bij wie. Mensen komen voor een persoon terug." },
      ],
    },
    find: {
      title: <>Gevonden door {i("nieuwe klanten")}</>,
      lead: "Wie je nog niet volgt, zoekt op de behandeling plus de stad. Meestal in Google of op de kaart, en steeds vaker in ChatGPT.",
      bento: {
        google: {
          title: "Een pagina per behandeling", result: "Gevonden op behandeling + stad",
          body: "Wat het is, wat het kost, wat het doet en hoe lang het duurt, per behandeling, in jouw stad.",
          query: "wenkbrauwen laten doen jouw plaats", others: [["treatwell.nl › jouw plaats", "Wenkbrauwbehandelingen in jouw plaats"], ["salonized.com", "Salons in jouw plaats"]],
          url: "jouwstudio.nl › wenkbrauwen", page: "Brow lamination in jouw plaats | Jouw studio", snippet: "45 minuten, € 49. Deze week nog plek, boek direct online.",
        },
        map: { title: "Je bedrijfsprofiel klopt", result: "In beeld op de kaart", body: "Adres, tijden, foto's en reviews die overal hetzelfde zeggen als je site.", name: "Jouw studio", meta: "Schoonheidssalon · Nu open" },
        ai: {
          result: "Kans om genoemd te worden",
          body: "Behandelingen, prijzen en vrije plekken staan er ook als gestructureerde gegevens in, zodat een AI ze kan lezen en jou kan noemen.",
          question: "Waar kan ik deze week in de buurt mijn wenkbrauwen laten doen?", name: "Jouw studio",
          answer: "Ze doen brow lamination in 45 minuten en je kunt direct online een plek boeken.", source: "jouwstudio.nl",
        },
      },
      who: "klanten",
      searches: [
        { q: "nagelstudio [plaats]", on: "google" }, { q: "massage in de buurt", on: "maps" }, { q: "wat is brow lamination?", on: "chatgpt" }, { q: "kapper [plaats] online boeken", on: "google" },
        { q: "gezichtsbehandeling prijs", on: "google" }, { q: "schoonheidssalon open", on: "maps" }, { q: "cadeaubon wellness?", on: "chatgpt" }, { q: "lash lift [plaats]", on: "google" },
      ],
    },
  },

  "coaches-en-adviseurs": {
    links: {
      title: <>Je agenda en je stukken {i("komen samen")}</>,
      lead: "Kennismakingen lopen via je eigen agenda, je artikelen krijgen een vaste plek. Wat je schrijft en plant, werkt voor je site.",
      into: {
        title: "Je schrijft het één keer", icon: "chat",
        body: "Een stuk dat je voor LinkedIn schrijft, zet je ook op je site, vindbaar en netjes opgemaakt. Je agenda bepaalt welke momenten je vrijgeeft.",
        sources: [{ name: "LinkedIn", icon: "pen" }, { name: "Agenda", icon: "grid" }, { name: "Google", src: "/images/logos/google.webp" }],
        page: "Je site", tileIcon: "chat",
        tiles: [{ status: "Nieuw artikel", tone: lime }, { status: "Traject", tone: wine }, { status: "Kennismaking", tone: paper }, { status: "Training", tone: dark }],
      },
      back: {
        title: "Elke aanvraag komt bij jou binnen", icon: "chat",
        body: "Kennismakingen, inschrijvingen en vragen. In je agenda en je mail, met wat iemand al vertelde, zodat het eerste gesprek meteen ergens over gaat.",
        requests: [
          { title: "Nieuwe kennismaking", meta: "Ma 10:00 · loopbaancoaching", tag: "In je agenda" },
          { title: "Inschrijving training", meta: "Voorjaar · 2 deelnemers", tag: "Per mail" },
          { title: "Vraag over traject", meta: "Teamcoaching · 12 personen", tag: "Voor jou" },
        ],
      },
      facts: [
        { title: "Je agenda blijft van jou", body: "Calendly, Cal.com of Google Agenda: bezoekers zien alleen de momenten die jij vrijgeeft, met een automatische bevestiging." },
        { title: "Je stukken blijven vindbaar", body: "Wat op LinkedIn na twee dagen wegzakt, wordt op je eigen site jarenlang gevonden." },
        { title: "Een prijs filtert", body: "Een vanafprijs bij je trajecten scheelt kennismakingen met mensen die het bedrag toch nooit hadden betaald." },
      ],
    },
    find: {
      title: <>Gevonden op {i("je expertise")}</>,
      lead: "Wie een coach zoekt, zoekt op zijn vraag. In Google, en steeds vaker in ChatGPT, en kiest dan de persoon die het antwoord gaf.",
      bento: {
        google: {
          title: "Een pagina per doelgroep", result: "Gevonden op de vraag van je klant",
          body: "Per doelgroep en per vraag een eigen pagina, met artikelen over je specialisme.",
          query: "loopbaancoach jouw plaats", others: [["noloc.nl", "Loopbaanprofessionals vinden"], ["coachfinder.nl", "Coaches in jouw plaats"]],
          url: "jouwnaam.nl › loopbaancoaching", page: "Loopbaancoaching in jouw plaats | Jouw naam", snippet: "Trajecten vanaf € 950. Plan direct een gratis kennismaking.",
        },
        map: { title: "Je praktijk op de kaart", result: "In beeld op de kaart", body: "Werk je vanuit een praktijk, dan staan adres en reviews overal hetzelfde als op je site.", name: "Jouw naam", meta: "Loopbaancoach · Ook online" },
        ai: {
          result: "Kans om genoemd te worden",
          body: "Je aanbod en je artikelen zijn zo opgebouwd dat een AI ze kan lezen en jou kan noemen. Een garantie is er niet, wel een eerlijke kans.",
          question: "Ik wil van baan veranderen maar weet niet wat. Wie kan me helpen?", name: "Jouw naam",
          answer: "Een loopbaancoach met trajecten vanaf € 950, en je kunt online een gratis kennismaking plannen.", source: "jouwnaam.nl",
        },
      },
      who: "klanten",
      searches: [
        { q: "loopbaancoach [plaats]", on: "google" }, { q: "burn-out coach", on: "google" }, { q: "hoe vind ik een goede coach?", on: "chatgpt" }, { q: "teamcoaching", on: "google" },
        { q: "leiderschapstraining", on: "google" }, { q: "coach in de buurt", on: "maps" }, { q: "wat kost een coachtraject?", on: "chatgpt" }, { q: "mindfulness training", on: "google" },
      ],
    },
  },
};
