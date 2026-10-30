import type { IconKey } from "./BranchIcons";

/* ---------- Branches: every branch gets its own page (and, over time, a live concept site) ----------
   The rule for everything in here: swap the branch for another one and the sentence has to break.
   A line that still holds for a hairdresser belongs on /diensten, not on a branch page. */
export type Branch = {
  slug: string;
  name: string;
  /** label in the menu */
  label: string;
  icon: IconKey;
  img: string;
  title: { lead: string; italic: string };
  intro: string;
  /** what today's situation costs this branch: recognition first, before any solution */
  pains: { title: string; body: string }[];
  musts: { title: string; body: string }[];
  concept?: { url: string; img: string };
  /** the closest piece of real work; only set where one exists, the section is skipped otherwise */
  proof?: { name: string; kind: string; body: string; href: string; img: string; pos?: string };
  /** the Uitgebreid package of pricing.ts (4.500, 8 tot 12 weken) for every branch, as each branch site includes a koppeling;
      PLACEHOLDER until the prices in pricing.ts are confirmed */
  price: { from: string; span: string; note: string };
  /** the questions this branch actually asks, answered. Feeds the page and the FAQPage JSON-LD */
  faq: { q: string; a: string }[];
};

export const branches: Branch[] = [
  {
    slug: "makelaars", name: "makelaars", label: "Makelaars", icon: "house", img: "/images/branches-hero-straat.webp",
    title: { lead: "Een website die", italic: "huizen én kopers aantrekt" },
    intro: "Lokaal vindbaar, snel op mobiel, met woningaanbod en een waardebepaling die leads oplevert. Gebouwd voor makelaars.",
    pains: [
      {
        title: "Je site is een doorgeefluik naar Funda",
        body: "Bezoekers klikken binnen tien seconden door naar het aanbod op Funda, en daar sta je naast elke andere makelaar in je plaats. De naam die ze onthouden is Funda, niet die van jou.",
      },
      {
        title: "De verkoper zoekt iets anders dan de koper",
        body: "Kopers zoeken een huis, verkopers zoeken een makelaar. Die tweede groep is je omzet, en voor hen is op de meeste makelaarssites geen enkele pagina gebouwd.",
      },
      {
        title: "Elke waardebepaling begint met bellen",
        body: "Wie zijn huis overweegt te verkopen, wil eerst anoniem rondkijken. Een telefoonnummer als eerste stap is een drempel op precies het moment dat de twijfel het grootst is.",
      },
    ],
    musts: [
      { title: "Woningaanbod dat werkt", body: "Je aanbod uit Realworks, Kolibri of je eigen feed, filters die kopers echt gebruiken en een detailpagina die de bezichtiging verkoopt." },
      { title: "Gevonden in je regio", body: "Een eigen pagina per plaats en per dienst, opgebouwd voor Google en ChatGPT, zodat je kans maakt op 'makelaar' plus de plaatsen waar je werkt." },
      { title: "Leads uit waardebepaling", body: "Een waardebepaling in een paar stappen die verkopers nieuwsgierig maakt, met de uitkomst per mail en de aanvraag bij jou, ook in je CRM." },
    ],
    price: { from: "4.500", span: "8 tot 12 weken", note: "Inclusief de koppeling met je aanbod en een waardebepaling die leads oplevert." },
    faq: [
      {
        q: "Wat kost een website voor een makelaar?",
        a: "Vanaf € 4.500 exclusief btw voor een complete site met je woningaanbod en een waardebepaling. Het eindbedrag hangt af van het aantal pagina's, het aantal vestigingen en wat je erbij wilt. Na de kennismaking krijg je een offerte waarin dat per onderdeel staat.",
      },
      {
        q: "Kun je mijn aanbod uit Realworks, Kolibri of Skarabee halen?",
        a: "De meeste makelaarspakketten leveren een feed of een API, en daar leest de site je aanbod uit. Nieuwe woningen, statuswijzigingen en verkocht onder voorbehoud komen dan automatisch op de site, zonder dat jij iets dubbel invoert. De toegang vraag je zelf aan bij je leverancier; ik help je met wat je moet vragen.",
      },
      {
        q: "Rekent mijn softwareleverancier iets voor de koppeling?",
        a: "Dat verschilt per leverancier en per abonnement. Sommige geven de toegang tot je aanbod gratis mee, andere rekenen een bedrag per maand of eenmalig. Dat zoeken we uit voordat je een offerte tekent, zodat je het hele plaatje kent.",
      },
      {
        q: "Komen aanvragen ook in mijn CRM terecht?",
        a: "Aanvragen voor een bezichtiging of waardebepaling komen altijd per mail binnen. Of ze daarnaast direct in je CRM landen, hangt af van wat je pakket toelaat. Dat test ik aan het begin van het traject, tegelijk met de koppeling van je aanbod.",
      },
      {
        q: "Hoe lang duurt het voordat de site live staat?",
        a: "Reken op 8 tot 12 weken vanaf het moment dat ik je teksten, foto's en de toegang tot je aanbod heb. De koppeling test ik als eerste, want daar zit de meeste onzekerheid.",
      },
      {
        q: "Wat gebeurt er als ik van CRM wissel?",
        a: "De koppeling staat los van de rest van de site. Wissel je van pakket, dan vervang ik dat ene koppelstuk en blijft alles eromheen staan. Je site hoeft er niet voor opnieuw gebouwd te worden.",
      },
      {
        q: "Verlies ik mijn positie in Google als ik overstap?",
        a: "Niet als het goed gebeurt. Voor de lancering leg ik je huidige pagina's en posities vast en krijgt elke oude pagina een doorverwijzing naar de nieuwe. Een garantie op posities kan niemand geven, maar zo verhuist wat je hebt opgebouwd mee.",
      },
      {
        q: "Heb ik Funda dan nog nodig?",
        a: "Ja, voor het bereik onder kopers. Het verschil is dat je eigen site daarnaast het werk doet waar Funda je niet bij helpt: verkopers binnenhalen die zich oriënteren op een makelaar in hun eigen plaats.",
      },
      {
        q: "Kan ik zelf pagina's en teksten aanpassen?",
        a: "Ja. Teksten, foto's, teampagina's en nieuwsberichten beheer je zelf, zonder dat je iets kunt breken aan het ontwerp. Voor het woningaanbod hoef je niets te doen, dat loopt via de koppeling.",
      },
      {
        q: "Werk je ook voor makelaars met meerdere vestigingen?",
        a: "Ja. Elke vestiging krijgt dan een eigen vindbare pagina met eigen team, eigen aanbod en een eigen Google-profiel, onder één merk en één beheeromgeving.",
      },
    ],
  },
  {
    slug: "horeca", name: "horeca", label: "Horeca", icon: "cup", img: "/images/prijzen-hero.webp",
    title: { lead: "Een horeca website die", italic: "tafels vult" },
    intro: "Reserveren in drie tikken, een menukaart die goed leest op een telefoon en een Google-profiel dat klopt.",
    pains: [
      {
        title: "Je menukaart is een pdf",
        body: "Op een telefoon moet je gast knijpen en slepen om te lezen wat er te eten is, vaak staand voor je deur. Google leest een pdf nauwelijks, dus op je gerechten word je niet gevonden.",
      },
      {
        title: "Reserveringen komen binnen via DM",
        body: "Een appje, een Instagram-bericht, een gemiste oproep tijdens de service. Het kost je personeel tijd op het drukste moment, en de reservering die niemand terugbelt komt niet.",
      },
      {
        title: "Google heeft verouderde informatie",
        body: "Oude openingstijden, foto's van twee verbouwingen geleden en een feestdag die niet klopt. Wie 'restaurant bij mij in de buurt' zoekt, ziet dat eerst, nog voor je site.",
      },
    ],
    musts: [
      { title: "Reserveren zonder gedoe", body: "Een reserveerknop die op elke pagina meereist, via het systeem dat je al gebruikt, en die op een klein scherm in drie tikken klaar is." },
      { title: "Een kaart voor de telefoon", body: "Geen pdf, maar een menukaart die snel laadt, per gerecht vindbaar is, allergenen toont en die je zelf in een minuut aanpast als de daghap verandert." },
      { title: "Google Maps op orde", body: "Openingstijden, feestdagen en foto's die in Google hetzelfde zeggen als op je site, zodat wie in de buurt zoekt niet voor een dichte deur staat." },
    ],
    price: { from: "4.500", span: "8 tot 12 weken", note: "Inclusief reserveren via je eigen systeem en een menukaart die je zelf bijwerkt." },
    faq: [
      {
        q: "Koppelt dit met mijn reserveringssysteem?",
        a: "Meestal wel. Systemen als Formitable, Resengo, TheFork en Zenchef bieden een reserveermodule of een reserveerlink, en die bouw ik zo in dat hij bij je site past in plaats van er als een vreemd blok in te hangen. Stuur me de naam van je systeem, dan kijk ik vooraf wat er kan. Heb je nog geen systeem, dan help ik je kiezen.",
      },
      {
        q: "Kan ik de menukaart zelf aanpassen?",
        a: "Ja, en dat is het hele punt. De daghap wijzigen of een gerecht van de kaart halen doe je op je telefoon in minder dan een minuut, en de wijziging staat direct live.",
      },
      {
        q: "Ik heb twee zaken, kan dat op één site?",
        a: "Dat kan, en meestal is het slimmer om elke zaak een eigen vindbare pagina te geven met eigen adres, eigen openingstijden en eigen menukaart, onder één merk. Zo word je per locatie in de buurt gevonden.",
      },
      {
        q: "Doe je ook mijn Google-bedrijfsprofiel?",
        a: "Ja, ik richt het in en zorg dat openingstijden, feestdagen, adres en categorie overeenkomen met je site. Voor horeca is dat vaak de kortste weg naar meer gasten, want veel mensen komen nooit verder dan dat blok in de zoekresultaten.",
      },
      {
        q: "Heb ik professionele foto's nodig?",
        a: "Het scheelt enorm, want eten verkoopt op beeld. Heb je die niet, dan starten we met wat er is en ontwerp ik de pagina's zo dat ze ook met minder foto's kloppen.",
      },
      {
        q: "Werkt het ook voor afhalen en bezorgen?",
        a: "Ja. Bestellen kan via je bestelsysteem als dat een koppeling heeft, of als eenvoudige afhaalbestelling op de site zelf. Welke van de twee verstandig is, hangt af van je volume en je marge.",
      },
    ],
  },
  {
    slug: "webshops", name: "webshops", label: "Webshops", icon: "bag", img: "/images/happyflops-hero-2.jpg",
    title: { lead: "Een webshop die", italic: "op elke telefoon verkoopt" },
    intro: "Productpagina's met alles wat een koper wil weten, een korte checkout en producten die in Google te vinden zijn.",
    pains: [
      {
        title: "Je shop laadt traag op 4G",
        body: "Bijna al je bezoek komt van een telefoon, vaak onderweg. Elke seconde extra laadtijd kost je bestellingen, en op een zware themashop met tien apps loopt dat hard op.",
      },
      {
        title: "Bezoekers haken af in de checkout",
        body: "Een verplicht account, verzendkosten die pas in de laatste stap zichtbaar worden of een betaalmethode die ontbreekt. De klant was al overtuigd en valt alsnog af.",
      },
      {
        title: "Al je omzet komt uit advertenties",
        body: "Zet je de advertenties uit, dan stopt de omzet. Er komt geen verkeer binnen op je producten zelf, dus je huurt je klanten in plaats van ze op te bouwen.",
      },
    ],
    musts: [
      { title: "Productpagina's die overtuigen", body: "Goede foto's, duidelijke keuzes, voorraad en levertijd in beeld en reviews op de plek waar een koper twijfelt. Wat hij wil weten, staat erbij." },
      { title: "Checkout zonder afhakers", body: "Kort, zonder verplicht account, met verzendkosten die vooraf duidelijk zijn en de betaalmethoden die jouw klant verwacht: iDEAL, Bancontact, Apple Pay." },
      { title: "Gevonden op productniveau", body: "Categorieën, filters en productdata die Google en ChatGPT begrijpen, zodat ook mensen die je merk nog niet kennen je producten kunnen vinden." },
    ],
    proof: {
      name: "Happy Flops", kind: "Klant", href: "/werk/happy-flops", img: "/images/happyflops-mockup.jpg", pos: "50% 62%",
      body: "Een webshop met een eigen merk, eigen fotografie en productpagina's die op een telefoon net zo goed werken als op een laptop.",
    },
    price: { from: "4.500", span: "8 tot 12 weken", note: "Inclusief productpagina's, checkout, betaal- en verzendkoppelingen en het overzetten van je bestaande producten." },
    faq: [
      {
        q: "Werk je met Shopify, WooCommerce of maatwerk?",
        a: "Met alle drie, en de keuze hangt af van je aantal producten en hoe bijzonder je verkoopproces is. Shopify voor gemak en betrouwbaarheid, WooCommerce als je al in WordPress zit, maatwerk als snelheid en een eigen flow het verschil maken. Ik kies wat jou het minste werk kost, niet wat mij het beste uitkomt.",
      },
      {
        q: "Wat gebeurt er met mijn producten en bestellingen bij een overstap?",
        a: "Producten, varianten, foto's, klanten en bestelgeschiedenis worden overgezet. De oude shop blijft draaien tot de nieuwe getest en goedgekeurd is, dus je verkoopt geen dag minder.",
      },
      {
        q: "Verlies ik mijn Google-posities?",
        a: "Niet als de overstap goed wordt voorbereid. Elke oude product- en categoriepagina krijgt een doorverwijzing naar zijn nieuwe adres. Een garantie op posities kan niemand geven, maar zo neem je mee wat je hebt opgebouwd.",
      },
      {
        q: "Koppelt het met mijn verzending en boekhouding?",
        a: "Meestal wel. Voor verzending (Sendcloud, MyParcel, DHL, PostNL), betalingen (Mollie, Stripe) en boekhouding (Moneybird, Exact, e-Boekhouden) bestaan vaak kant-en-klare koppelingen. Als er een koppeling bestaat voor jouw combinatie, bouw ik hem in. Dat zoek ik uit voordat je de offerte krijgt.",
      },
      {
        q: "Kan ik zelf producten toevoegen en prijzen wijzigen?",
        a: "Ja, dat beheer je volledig zelf. Je krijgt bij de oplevering een korte uitleg en een handleiding, zodat je niet voor elke prijswijziging hoeft te bellen.",
      },
      {
        q: "Hoe zorg je dat ik gevonden word zonder advertenties?",
        a: "Door je categorieën en producten op te bouwen rond wat mensen echt intypen, en daar content omheen te zetten die hun vraag beantwoordt. Dat werkt trager dan adverteren, maar dat verkeer blijft van jou als je de kraan dichtdraait.",
      },
    ],
  },
  {
    slug: "financieel-advies", name: "financieel adviseurs", label: "Financieel advies", icon: "chart", img: "/images/advies-hero.webp",
    title: { lead: "Een website die", italic: "vertrouwen wekt en leads oplevert" },
    intro: "Voor hypotheekadviseurs, accountants en planners. Helder over wat je doet, met een eerste stap die weinig moeite kost.",
    pains: [
      {
        title: "Je site legt uit wat je doet, niet waarom jij",
        body: "Hypotheekadvies, oversluiten, financiële planning: dat biedt iedereen in je plaats aan. Wie jou vergelijkt met de adviseur twee straten verderop, ziet op beide sites dezelfde woorden staan.",
      },
      {
        title: "De eerste stap is een telefoonnummer",
        body: "Iemand met een hypotheekvraag oriënteert zich 's avonds op de bank, niet tijdens kantooruren aan de telefoon. Zonder laagdrempelige eerste stap gaat die bezoeker naar de partij die er wel een heeft.",
      },
      {
        title: "Je concurreert met vergelijkingssites",
        body: "Op de brede zoektermen win je het niet van de grote vergelijkers, en wie via hen bij jou komt, betaal je als lead. Op de vraag achter die zoekterm, en op je eigen regio en specialisme, is nog volop ruimte, maar daar is meestal geen pagina voor.",
      },
    ],
    musts: [
      { title: "Helder over je aanbod", body: "Geen jargon, maar een uitleg die een klant in één keer snapt: wat je doet, wat het kost, wat het oplevert en wat er van hem verwacht wordt." },
      { title: "Drempelloos kennismaken", body: "Een afspraakplanner of rekentool die de eerste stap makkelijk maakt, direct vanaf de homepage, zodat iemand 's avonds om tien uur al iets kan vastleggen." },
      { title: "Vindbaar op je specialisme", body: "Een eigen pagina per dienst, doelgroep en regio, van starters tot oversluiten, zodat je gevonden wordt op precies de vraag die je klant stelt." },
    ],
    proof: {
      name: "Hypotheekhaven", kind: "Klant", href: "/werk/hypotheekhaven", img: "/images/hypotheekhaven-fauteuil.webp",
      body: "Een adviespraktijk met een site die uitlegt hoe het werkt en de eerste afspraak zo licht mogelijk maakt.",
    },
    price: { from: "4.500", span: "8 tot 12 weken", note: "Inclusief een afspraakplanner, pagina's per dienst en een vaste plek voor je verplichte informatie." },
    faq: [
      {
        q: "Moet mijn site aan regels van de AFM voldoen?",
        a: "Als je financieel advies geeft, gelden er eisen aan wat je moet vermelden en hoe je je dienstverlening presenteert. Ik bouw de site zo dat je vergunningnummer, dienstenwijzer, tarieven en klachtenregeling een vaste, vindbare plek hebben. De inhoud toets je zelf of met je compliance-adviseur, want daar ga ik niet over.",
      },
      {
        q: "Moet ik de teksten zelf schrijven?",
        a: "Nee. Ik schrijf ze, op basis van de kennismaking en wat je me vertelt over je klanten en je manier van adviseren. Je krijgt ze ter controle, geeft feedback, en pas na jouw akkoord gaan ze online. Jouw tijd zit in een gesprek en het nalezen, niet in het schrijven.",
      },
      {
        q: "Wie houdt de rekentools actueel?",
        a: "Dat doe ik. Ik bouw de rekentools zelf en houd ze bij binnen het abonnement: veranderen de leennormen, de NHG-grens of de rentes, dan pas ik de uitgangspunten aan. Bij elke berekening staat waar hij van uitgaat, en dat een uitkomst een indicatie is en geen advies.",
      },
      {
        q: "Kan ik een afspraakplanner koppelen?",
        a: "Ja. Calendly, Cal.com of Microsoft Bookings zijn zo ingebouwd, en dan sluit de planner aan op je eigen agenda. Bezoekers kiezen zelf een moment, jij houdt er geen belrondje aan over.",
      },
      {
        q: "Kan er een rekentool op de site?",
        a: "Ja, en voor adviseurs is dat vaak de sterkste lead: wie zijn maximale hypotheek of maandlast berekent, is serieus aan het oriënteren. De uitkomst mailen we naar de bezoeker, en de aanvraag komt bij jou binnen.",
      },
      {
        q: "Hoe zit het met de AVG en de gegevens uit mijn formulieren?",
        a: "Formulieren versturen versleuteld, gegevens worden binnen de EU verwerkt en er komen geen financiële details in een gewone mailbox terecht als dat niet hoeft. Voor gevoelige stukken gebruiken we een beveiligde upload in plaats van e-mail.",
      },
      {
        q: "Mag ik klantverhalen op mijn site zetten?",
        a: "Ja, met toestemming van de klant en zonder herleidbare financiële details. In de praktijk werkt een kort verhaal over de situatie en de uitkomst beter dan bedragen, en het is meteen een stuk veiliger.",
      },
      {
        q: "Ik werk onder een franchise of serviceprovider, kan ik dan een eigen site?",
        a: "Meestal wel, maar er zitten vaak afspraken aan vast over merk en uitingen. Stuur me die afspraken en ik zeg je binnen een dag wat er wel en niet kan.",
      },
    ],
  },
  {
    slug: "bouw-en-installatie", name: "bouw- en installatiebedrijven", label: "Bouw en installatie", icon: "wrench", img: "/images/mascot-build.webp",
    title: { lead: "Een bouw- en installatiewebsite die", italic: "offertes binnenhaalt" },
    intro: "Voor aannemers, installateurs en vakmensen. Laat je werk zien en maak het aanvragen van een offerte simpel.",
    pains: [
      {
        title: "Je beste werk staat op je telefoon",
        body: "Foto's van opgeleverde badkamers, daken en installaties gaan naar de appgroep en verdwijnen daarna. Op je site staat een stockfoto van gereedschap, terwijl je eigen werk het sterkste argument is dat je hebt.",
      },
      {
        title: "Offertes lopen via de telefoon tijdens het werk",
        body: "Je staat op een ladder als iemand belt, dus je belt later terug. Tegen die tijd heeft hij er nog twee gebeld en is de eerste die opnam de klus aan het inmeten.",
      },
      {
        title: "Je wordt gevonden op je bedrijfsnaam",
        body: "Mensen zoeken niet op jouw naam, die kennen ze nog niet. Ze zoeken op 'warmtepomp installeren' plus hun plaats, en daar heeft je site geen pagina voor.",
      },
    ],
    musts: [
      { title: "Je werk als bewijs", body: "Projectpagina's met echte foto's, voor en na, wat de klus inhield en wat de klant ervan vond. Dat overtuigt meer dan elke tekst over vakmanschap." },
      { title: "Offerte in een minuut", body: "Een aanvraagformulier dat met één hand op een telefoon in te vullen is, met foto-upload van de situatie, zodat je kunt inschatten zonder eerst langs te rijden." },
      { title: "Gevonden per dienst en plaats", body: "Van badkamer renoveren tot warmtepomp installeren, elke dienst een eigen pagina per werkgebied, zodat je gevonden kunt worden op de klussen die je het liefst doet." },
      { title: "Offertes en facturen vanzelf", body: "Een offerte- en factuurtool achter je site: standaardklussen krijgen meteen een offerte met jouw prijzen, een akkoord wordt een factuur, en alles staat klaar voor je boekhouding." },
    ],
    price: { from: "4.500", span: "8 tot 12 weken", note: "Inclusief projectpagina's, een offerteformulier met foto-upload, een offerte- en factuurtool en een pagina per dienst en werkgebied." },
    faq: [
      {
        q: "Ik heb geen goede foto's van mijn werk, wat nu?",
        a: "Dat hoor ik vaak, en het is zelden een probleem. Telefoonfoto's van opgeleverd werk zijn prima als ze scherp en licht zijn, en ik laat zien welke drie of vier je van elke klus moet maken. Vanaf dat moment bouw je je eigen portfolio op, elke week een beetje.",
      },
      {
        q: "Kunnen klanten foto's meesturen bij een aanvraag?",
        a: "Ja, en dat scheelt je de meeste tijd. Iemand fotografeert zijn meterkast, badkamer of dak, en jij weet vooraf waar je aan begint. Veel aanvragen kun je daardoor afhandelen zonder eerst langs te gaan.",
      },
      {
        q: "Ik werk in meerdere plaatsen, kan ik daar apart op gevonden worden?",
        a: "Ja. Elk werkgebied krijgt een eigen pagina met echte inhoud over wat je daar doet en wat je er hebt opgeleverd. Vier goede plaatsnaampagina's doen meer dan acht lege.",
      },
      {
        q: "Moet ik zelf mijn projecten bijhouden?",
        a: "Je kunt een project in een paar minuten zelf toevoegen vanaf je telefoon: foto's, een paar regels tekst, klaar. Wil je dat liever niet, dan doe ik het periodiek voor je op basis van wat je aanlevert.",
      },
      {
        q: "Kunnen mijn certificeringen erop?",
        a: "Ja, en dat hoort ook. VCA, Sterkin, Techniek Nederland, KOMO of een garantieregeling zijn voor een particulier vaak het verschil tussen twijfel en vertrouwen, zeker bij een grote klus.",
      },
      {
        q: "Ik werk vooral voor aannemers, niet voor particulieren. Heeft een site dan zin?",
        a: "Ja, maar dan een andere. Zakelijke opdrachtgevers checken je site voordat ze je uitnodigen, en kijken naar capaciteit, referenties en certificering in plaats van naar prijzen. Dezelfde site, andere inhoud.",
      },
    ],
  },
  {
    slug: "zorg-en-praktijken", name: "zorgpraktijken", label: "Zorg en praktijken", icon: "heart", img: "/images/slim-choice.webp",
    title: { lead: "Een praktijkwebsite die", italic: "rust geeft en afspraken maakt" },
    intro: "Voor tandartsen, fysiotherapeuten, psychologen en andere praktijken. Een site die ook je oudere patiënten zonder hulp kunnen gebruiken.",
    pains: [
      {
        title: "De telefoon gaat de hele ochtend",
        body: "Afspraken maken, verzetten en afzeggen gaan allemaal via dezelfde lijn. Je assistente is er uren mee kwijt, terwijl de helft van die gesprekken een handeling is die de patiënt prima zelf kan doen.",
      },
      {
        title: "Nieuwe patiënten weten niet of je plek hebt",
        body: "Neem je aan? Hoe lang is de wachttijd? Wie het niet op je site kan vinden, belt of zoekt verder. Dat kost jou telefoontjes die nergens toe leiden, en hun het gevoel dat ze aan het leuren zijn.",
      },
      {
        title: "Je site is gebouwd toen de praktijk kleiner was",
        body: "Er zijn behandelaars bij gekomen, een specialisatie, misschien een tweede locatie. De site vertelt nog het verhaal van een paar jaar terug en klopt niet meer met wat mensen aantreffen.",
      },
    ],
    musts: [
      { title: "Afspraak in een paar tikken", body: "Online inplannen, verzetten of een terugbelverzoek achterlaten, zichtbaar op elke pagina, ook voor wie minder handig is met een telefoon." },
      { title: "Toegankelijk voor iedereen", body: "Grote knoppen, rustig contrast, heldere taal en werkend met een schermlezer. Gebouwd volgens de toegankelijkheidsrichtlijnen, niet als sluitstuk maar vanaf het ontwerp." },
      { title: "Duidelijk over wachttijd en aanmelden", body: "Of je aanneemt, hoe lang het duurt en wat iemand moet meenemen naar de eerste afspraak. Dat scheelt telefoontjes en geeft rust, aan beide kanten." },
    ],
    price: { from: "4.500", span: "8 tot 12 weken", note: "Inclusief online afspraken, toegankelijkheid volgens WCAG en een pagina per behandelaar." },
    faq: [
      {
        q: "Kan het koppelen met mijn afsprakensysteem?",
        a: "In de meeste gevallen wel. Veel praktijksystemen leveren een agendamodule of een widget voor online afspraken, en die bouw ik in zodat hij bij je site past. Stuur me de naam van je pakket, dan zeg ik je precies wat er kan.",
      },
      {
        q: "Moet mijn site toegankelijk zijn?",
        a: "Voor de meeste particuliere praktijken is het geen wettelijke plicht, maar het is wel precies jouw doelgroep: ouderen, mensen met een beperking, mensen die slecht zien. Ik bouw standaard volgens de WCAG-richtlijnen, want in de zorg is dat geen extra maar de kern.",
      },
      {
        q: "Mag ik ervaringen van patiënten op de site zetten?",
        a: "Alleen met uitdrukkelijke toestemming en zonder medische details die naar iemand te herleiden zijn. In de praktijk werkt een algemene ervaring over de bejegening en de praktijk beter dan een verhaal over een behandeling, en het is een stuk veiliger.",
      },
      {
        q: "Hoe zit het met de AVG bij mijn contactformulier?",
        a: "Een contactformulier op een site is nooit de plek voor medische gegevens. Ik bouw hem zo dat mensen daar ook niet toe worden uitgenodigd: naam, bereikbaarheid en de reden in één regel, de rest bespreek je aan de telefoon of in een beveiligde omgeving.",
      },
      {
        q: "Kan ik wachttijden en een aanmeldstop zelf bijwerken?",
        a: "Ja, en dat is bewust zo gebouwd. Met één schakelaar zet je aan of je nieuwe patiënten aanneemt, en je vult de actuele wachttijd in. Voor nieuwe patiënten is dat vaak het eerste wat ze zoeken.",
      },
      {
        q: "We werken met meerdere behandelaars, krijgt iedereen een eigen pagina?",
        a: "Ja. Elke behandelaar een eigen pagina met foto, specialisatie en BIG-registratie. Mensen kiezen liever een persoon dan een praktijk, en op een specialisatie kun je bovendien apart gevonden worden.",
      },
    ],
  },
  {
    slug: "beauty-en-wellness", name: "beauty- en wellnessondernemers", label: "Beauty en wellness", icon: "sparkle", img: "/images/slim-palette.webp",
    title: { lead: "Een salonwebsite die", italic: "je agenda vult" },
    intro: "Voor salons, studio's en spa's. Een site met de sfeer van je zaak, waar klanten zelf online een plek boeken.",
    pains: [
      {
        title: "Je bio-link is je website",
        body: "Alles loopt via Instagram: je werk, je prijzen, je afspraken. Dat werkt tot het algoritme je posts niet meer laat zien, en dan heb je geen enkele plek die van jou is.",
      },
      {
        title: "Gaten in je agenda zie je pas 's avonds",
        body: "Een afzegging om elf uur betekent een leeg uur om twee uur. Zonder online agenda die iedereen kan zien, blijft dat uur leeg, terwijl iemand het misschien meteen had geboekt.",
      },
      {
        title: "Nieuwe klanten vinden je alleen als ze je al volgen",
        body: "Wie zoekt op jouw behandeling in jouw stad, komt uit bij de salon die daar wel een pagina voor heeft. Al je bereik komt uit je eigen kring, en die groeit langzamer dan je agenda leegloopt.",
      },
    ],
    musts: [
      { title: "Online boeken", body: "Behandelingen, duur, prijs en beschikbaarheid in één overzicht, en boeken in een paar tikken, ook voor wie via Instagram binnenkomt en weinig geduld heeft." },
      { title: "Je eigen sfeer", body: "Beeld, kleur en letters die bij jouw studio horen. Klanten kiezen ook op uitstraling, en die moet meteen kloppen, ook op een klein scherm." },
      { title: "Gevonden in de buurt", body: "Een eigen pagina per behandeling in combinatie met je stad of wijk, plus een Google-profiel dat klopt, zodat nieuwe klanten je ook zonder advertenties kunnen vinden." },
    ],
    price: { from: "4.500", span: "8 tot 12 weken", note: "Inclusief de koppeling met je boekingssysteem en een pagina per behandeling." },
    faq: [
      {
        q: "Koppelt dit met mijn boekingssysteem?",
        a: "Meestal wel. Systemen als Salonized, Treatwell, Booksy en Fresha hebben een boekingsmodule, en die bouw ik zo in dat hij bij je merk past. Je houdt één agenda, dus geen dubbele boekingen.",
      },
      {
        q: "Ik verkoop ook producten, kan dat erbij?",
        a: "Ja. Een kleine shop naast je behandelingen kan prima, en werkt het best als je een paar producten voert die je klanten toch al bij je kopen. Een volledige webshop is een ander traject, dat bespreken we dan apart.",
      },
      {
        q: "Kan ik prijzen en behandelingen zelf aanpassen?",
        a: "Ja, volledig. Prijzen wijzigen, een behandeling toevoegen of een actie plaatsen doe je zelf, zonder dat het ontwerp scheef gaat.",
      },
      {
        q: "Ik werk met meerdere behandelaars, kan de klant kiezen?",
        a: "Ja. Klanten komen vaak terug voor een vaste persoon, dus dat helpt. Elke behandelaar krijgt een eigen profiel en is in de boeking te kiezen.",
      },
      {
        q: "Heb ik professionele foto's nodig?",
        a: "In deze branche wel, want je verkoopt sfeer en resultaat. Goede foto's van je ruimte en je werk verdienen zich terug. Heb je ze niet, dan starten we met je beste eigen beeld en vullen later aan.",
      },
      {
        q: "Hoe word ik gevonden op mijn behandelingen?",
        a: "Door per behandeling een echte pagina te maken die de vraag erachter beantwoordt: wat het is, wat het kost, wat het doet en hoe lang het duurt. Dat is precies wat mensen intypen, en waar de meeste salons alleen een regel in een prijslijst hebben staan.",
      },
    ],
  },
  {
    slug: "coaches-en-adviseurs", name: "coaches en adviseurs", label: "Coaches en adviseurs", icon: "chat", img: "/images/over-mascot.webp",
    title: { lead: "Een coachwebsite die", italic: "je aanbod uitlegt en gesprekken oplevert" },
    intro: "Voor coaches, trainers en consultants. Een site die klinkt zoals jij, met een aanbod dat mensen ook zonder gesprek begrijpen.",
    pains: [
      {
        title: "Je aanbod is niet te begrijpen zonder gesprek",
        body: "Trajecten, sessies, intakes en losse gesprekken staan door elkaar. Wie op je site komt, snapt niet wat hij koopt, hoe lang het duurt en wat het hem oplevert, dus stelt hij de beslissing uit.",
      },
      {
        title: "Je voert kennismakingen die nooit iets worden",
        body: "Omdat er geen prijs op de site staat, praat je een halfuur met mensen die het bedrag nooit hadden willen betalen. Dat kost je de tijd die je aan echte klanten had willen geven.",
      },
      {
        title: "Je beste inzichten verdwijnen in LinkedIn",
        body: "Je schrijft goede stukken, ze doen het twee dagen goed en zijn daarna onvindbaar. Op je eigen site kunnen diezelfde stukken jaren gevonden worden, in Google en in ChatGPT.",
      },
    ],
    musts: [
      { title: "Jij als merk", body: "Persoonlijk, met foto's en teksten die klinken zoals jij praat. Mensen kiezen een coach, geen bedrijf, en dat moet je site vanaf de eerste regel laten zien." },
      { title: "Aanbod dat helder is", body: "Trajecten, duur, prijs en resultaat in één oogopslag, met een kennismakingsgesprek als logische volgende stap in plaats van als enige optie." },
      { title: "Gevonden op je expertise", body: "Artikelen en pagina's over je specialisme, opgebouwd voor Google en ChatGPT. Elk stuk dat je schrijft, is een extra ingang naar je site." },
    ],
    price: { from: "4.500", span: "8 tot 12 weken", note: "Inclusief een agendakoppeling, pagina's per traject en een plek om zelf te publiceren." },
    faq: [
      {
        q: "Moet ik mijn prijzen op de site zetten?",
        a: "Meestal wel, al is het een bandbreedte of een vanafprijs. Het filtert de gesprekken die toch nooit iets worden, en het geeft vertrouwen: wie zijn tarief durft te noemen, oogt zekerder dan wie het achterhoudt tot het gesprek.",
      },
      {
        q: "Kan ik mijn agenda koppelen?",
        a: "Ja. Calendly, Cal.com of Google Agenda staan er zo in, met je eigen beschikbaarheid en automatische bevestiging. Een kennismaking plannen kost je bezoeker dan geen mailwisseling meer.",
      },
      {
        q: "Kan ik zelf artikelen plaatsen?",
        a: "Ja, en voor coaches is dat de belangrijkste knop op de site. Je schrijft in een eenvoudige editor; de opmaak en de basis voor vindbaarheid, zoals titels en structuur, regelt de site. Je LinkedIn-stukken opnieuw publiceren is vaak het snelste begin.",
      },
      {
        q: "Ik bedien meerdere doelgroepen, hoe los je dat op?",
        a: "Met een eigen pagina per doelgroep in plaats van één pagina die iedereen probeert aan te spreken. Loopbaancoaching voor starters leest anders dan teamcoaching voor directies, en wordt ook anders gezocht.",
      },
      {
        q: "Kan ik online een programma of training verkopen?",
        a: "Ja. Van een eenvoudige betaalde inschrijving tot een afgeschermde omgeving met video's en opdrachten. Wat verstandig is, hangt af van hoeveel je ervan verwacht te verkopen, en dat bespreken we voordat we iets bouwen.",
      },
      {
        q: "Hoe word ik genoemd in ChatGPT en andere AI-antwoorden?",
        a: "Garanderen kan niemand. Wat wel helpt: je expertise opschrijven in duidelijke, goed gestructureerde pagina's die een vraag echt beantwoorden. AI-modellen halen hun antwoorden vaak uit bronnen die helder en navolgbaar zijn, en zo bouw ik de site op.",
      },
    ],
  },
];

/* every branch at the address people search for ("horeca website", "makelaar website"), with the
   page title to match. Makelaars and financieel advies have a page of their own, webshops share the
   service page /webshop-laten-maken (one page per search, so they don't compete); the rest run on the
   shared template ([branch]/page.tsx). The old /branches/... addresses redirect (next.config.ts). */
export const branchSeo: Record<string, { path: string; title: string; template?: true }> = {
  makelaars: { path: "/makelaar-website", title: "Makelaar website laten maken" },
  horeca: { path: "/horeca-website", title: "Horeca website laten maken", template: true },
  webshops: { path: "/webshop-laten-maken", title: "Webshop laten maken" },
  "financieel-advies": { path: "/financieel-adviseur-website", title: "Website voor financieel adviseurs laten maken" },
  "bouw-en-installatie": { path: "/bouw-en-installatie-website", title: "Website laten maken voor bouw en installatie", template: true },
  "zorg-en-praktijken": { path: "/praktijk-website", title: "Website voor je praktijk laten maken", template: true },
  "beauty-en-wellness": { path: "/salon-website", title: "Website voor je salon laten maken", template: true },
  "coaches-en-adviseurs": { path: "/coach-website", title: "Website voor coaches laten maken", template: true },
};
export const branchHref = (b: Branch) => branchSeo[b.slug]?.path ?? "/branches";

/* the question every branch asks sooner or later, answered the same way everywhere (texts are
   written by NXT Frame and checked by the client); placed third, after the branch's own first two */
export const textsFaq = {
  q: "Moet ik de teksten zelf schrijven?",
  a: "Nee. Ik schrijf ze, op basis van de kennismaking en wat je me vertelt over je bedrijf en je klanten. Je krijgt ze ter controle, geeft feedback, en pas na jouw akkoord gaan ze online. Jouw tijd zit in een gesprek en het nalezen, niet in het schrijven.",
};
export const faqFor = (b: Branch) =>
  b.faq.some((f) => f.q === textsFaq.q) ? b.faq : [...b.faq.slice(0, 2), textsFaq, ...b.faq.slice(2)];

/* ---------- Main menu ---------- */
/* a card in the open menu: a photo with a title and one line under it; `tag` is the small label on the photo */
export type MenuCard = { title: string; body: string; href: string; img: string; pos?: string; tag?: string; external?: boolean };
export type MenuLink = { label: string; href: string; icon: IconKey; external?: boolean };
/* `listLabel` and `cardsLabel` are the small headings over the two halves of the open menu */
export type MenuItem = { label: string; href: string; listLabel?: string; cardsLabel?: string; cards?: MenuCard[]; links?: MenuLink[] };

export const menu: MenuItem[] = [
  {
    label: "Branches",
    href: "/branches",
    listLabel: "Per branche",
    cardsLabel: "Uitgelicht",
    cards: [
      { title: "Makelaars", body: "Woningaanbod, waardebepaling en lokaal gevonden worden.", href: "/makelaar-website", img: "/images/branches-hero-straat.webp" },
      { title: "Webshops", body: "Productpagina's die overtuigen en een checkout zonder afhakers.", href: "/webshop-laten-maken", img: "/images/happyflops-hero-2.jpg" },
      { title: "Horeca", body: "Reserveren in drie tikken en een menukaart die leest op een telefoon.", href: "/horeca-website", img: "/images/prijzen-hero.webp", pos: "50% 40%" },
    ],
    links: branches.map((b) => ({ label: b.label, href: branchHref(b), icon: b.icon })),
  },
  {
    label: "Werk",
    href: "/werk",
    listLabel: "Bekijk",
    cardsLabel: "Cases",
    cards: [
      { title: "Happy Flops", body: "Een webshop die net zo lekker loopt als de slippers.", href: "/werk/happy-flops", img: "/images/happyflops-mockup.jpg", pos: "50% 62%", tag: "Klant" },
      { title: "Hypotheekhaven", body: "Van hypotheekadvies naar een site die afspraken oplevert.", href: "/werk/hypotheekhaven", img: "/images/hypotheekhaven-fauteuil.webp", pos: "70% 55%", tag: "Klant" },
    ],
    links: [
      { label: "Alle cases", href: "/werk", icon: "grid" },
      { label: "Concepten per branche", href: "/branches", icon: "layout" },
    ],
  },
  {
    label: "Diensten",
    href: "/diensten",
    listLabel: "Wat ik doe",
    cardsLabel: "Meest gevraagd",
    cards: [
      { title: "Website laten maken", body: "Van strategie tot lancering. Snel, vindbaar en gebouwd rond jouw klant.", href: "/website-laten-maken", img: "/images/happyflops-laptop-hands.webp" },
      { title: "Redesign", body: "Je huidige site opnieuw gebouwd, zonder verlies van vindbaarheid.", href: "/website-redesign", img: "/images/andere-tijd.webp" },
      { title: "Vindbaar in Google en AI", body: "Structuur en content die Google én ChatGPT begrijpen.", href: "/vindbaar-in-google-en-chatgpt", img: "/images/slim-search.webp", pos: "48% 50%" },
    ],
    links: [
      { label: "Website laten maken", href: "/website-laten-maken", icon: "layout" },
      { label: "Vindbaar in Google en AI", href: "/vindbaar-in-google-en-chatgpt", icon: "search" },
      { label: "Webshop", href: "/webshop-laten-maken", icon: "cart" },
      { label: "Landingspagina", href: "/landingspagina-laten-maken", icon: "grid" },
      { label: "Onderhoud en doorontwikkeling", href: "/website-onderhoud", icon: "refresh" },
      { label: "Teksten en content", href: "/website-teksten", icon: "pen" },
      { label: "Prijzen", href: "/prijzen", icon: "chart" },
    ],
  },
  { label: "Aanpak", href: "/aanpak" },
  { label: "Over", href: "/over" },
];
