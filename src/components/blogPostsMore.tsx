import type { ReactNode } from "react";
import type { BlogPost } from "./blogPosts";

/* ---------- More articles for /blog (6 November 2026) ----------
   Topics picked from search research (Google autocomplete, Google Trends NL, the current results
   page); see the notes per article. Written to Google's people-first guidance: the short answer
   first, first-hand experience where there is some, facts with a source at the foot, no promises
   about rankings. Written by Claude from research, for Justin to read and adjust. */

const A = ({ href, children }: { href: string; children: ReactNode }) => <a href={href}>{children}</a>;

const Scroll = ({ label, children }: { label: string; children: ReactNode }) => (
  <div role="region" aria-label={label} tabIndex={0} className="mt-5 overflow-x-auto">
    {children}
  </div>
);

export const morePosts: BlogPost[] = [
  /* "ai seo" is searched more often than "website laten maken" in Google Trends NL (12 months);
     autocomplete: "seo voor ai", "seo voor chatgpt", "hoe word je vindbaar in chatgpt", "vindbaar in google ai mode" */
  {
    slug: "gevonden-worden-in-chatgpt-en-google-ai-mode",
    title: "Gevonden worden in ChatGPT en Google AI Mode: wat werkt echt?",
    description:
      "Je komt in ChatGPT en in de AI-antwoorden van Google door dezelfde basis als in gewone zoekresultaten: een site die ze mogen lezen, duidelijke antwoorden in gewone tekst, en bewijs van buiten je eigen site. Een geheim trucje bestaat niet. Dit lees je: hoe die antwoorden tot stand komen, wat onderzoek laat zien en wat je kunt overslaan.",
    category: "Vindbaar in Google en AI",
    published: "2026-11-06",
    updated: "2026-11-06",
    readMinutes: 9,
    img: "/images/slim-search.webp",
    imgAlt: "De NXT Frame-mascotte met een vergrootglas naast een zoekbalk, in een weiland",
    pos: "50% 45%",
    next: { label: "Bekijk hoe ik sites vindbaar maak in Google en AI", href: "/vindbaar-in-google-en-chatgpt" },
    sections: [
      {
        id: "kort-antwoord",
        title: "Het korte antwoord",
        body: (
          <>
            <p>
              ChatGPT en Google AI Mode zoeken op het internet en bouwen hun antwoord uit pagina&apos;s die ze daar vinden. Om genoemd te worden moet
              je site dus te lezen zijn voor hun zoekrobots, moet er in gewone tekst staan wat je doet en voor wie, en moet je vragen van klanten
              helder beantwoorden. Daarnaast helpt het als anderen over je schrijven: reviews, vermeldingen, een goed ingevuld Google-bedrijfsprofiel.
            </p>
            <p>
              Google zegt het zelf: voor de AI-antwoorden in de zoekresultaten gelden <em>geen extra technische eisen</em>. Wat werkt voor gewone
              SEO, werkt hier ook. Iemand die je een speciaal &ldquo;AI-bestand&rdquo; of een garantie op een vermelding verkoopt, verkoopt lucht.
            </p>
          </>
        ),
      },
      {
        id: "hoe-het-werkt",
        title: "Hoe ChatGPT en Google aan hun antwoorden komen",
        body: (
          <>
            <p>
              Beide werken ongeveer hetzelfde. Ze maken van een vraag een reeks zoekopdrachten, halen de beste pagina&apos;s op en schrijven daar
              een antwoord uit, met links naar de bronnen. Google noemt dat uitwaaieren van één vraag naar veel zoekopdrachten <em>query fan-out</em>.
            </p>
            <ul>
              <li>
                <strong>Google AI Mode en AI Overviews</strong> gebruiken de gewone Google-index. Een pagina komt in aanmerking als hij geïndexeerd
                is en een tekstfragment in de zoekresultaten mag tonen. AI Mode is sinds oktober 2025 ook in Nederland en in het Nederlands te
                gebruiken, en Nederland staat in Google&apos;s lijst van landen met AI Overviews.
              </li>
              <li>
                <strong>ChatGPT</strong> gebruikt een eigen zoekrobot, <code>OAI-SearchBot</code>. Blokkeer je die, dan verschijnt je site volgens
                OpenAI niet in de antwoorden van ChatGPT search. Een andere robot, <code>GPTBot</code>, verzamelt tekst om modellen te trainen. Die
                staat los van zoeken: je kunt de één toestaan en de ander blokkeren. OpenAI werkt daarnaast samen met andere zoekaanbieders.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "wat-er-verandert",
        title: "Wat er verandert voor je bezoekers",
        body: (
          <>
            <p>
              AI-chatbots zijn geen niche meer. Volgens het CBS heeft 90% van de Nederlanders van 18 tot 25 jaar er al eens een gebruikt, 75% van
              de 25- tot 45-jarigen en 57% van de 45- tot 65-jarigen. Je klanten stellen hun vraag dus steeds vaker aan een chatbot in plaats van
              aan een zoekmachine.
            </p>
            <p>
              En als er een AI-antwoord boven de zoekresultaten staat, wordt er minder doorgeklikt. Pew Research mat dat mensen in 8% van de
              bezoeken op een resultaat klikten als er een AI-samenvatting stond, tegen 15% zonder. Op de links in die samenvatting zelf klikte 1%.
              Ahrefs zag in december 2025 dat de nummer één in Google 58% minder kliks kreeg als er een AI Overview boven stond.
            </p>
            <p>
              Dat betekent twee dingen. Genoemd worden in het antwoord wordt belangrijker dan bovenaan staan. En wie wél doorklikt, heeft het
              antwoord al gelezen en komt om iets te regelen: een offerte, een afspraak. Je site moet die stap makkelijk maken.
            </p>
          </>
        ),
      },
      {
        id: "wat-werkt",
        title: "Zeven dingen die wel werken",
        body: (
          <ol>
            <li>
              <strong>Laat de zoekrobots binnen.</strong> Kijk in je <code>robots.txt</code> of <code>OAI-SearchBot</code> en Googlebot niet
              geblokkeerd worden, ook niet door je hosting of een beveiligingsdienst als Cloudflare. Een aanpassing in robots.txt heeft bij OpenAI
              ongeveer een dag nodig.
            </li>
            <li>
              <strong>Zet het belangrijkste in gewone tekst.</strong> Wat je doet, voor wie, waar, wat het ongeveer kost. Niet alleen in een
              afbeelding of een filmpje, maar als tekst op de pagina.
            </li>
            <li>
              <strong>Begin met het antwoord.</strong> Een vraag als kop, en meteen daaronder in twee of drie zinnen het antwoord. Dat leest prettig
              voor mensen en is makkelijk over te nemen voor een AI-antwoord.
            </li>
            <li>
              <strong>Gebruik feiten, cijfers en bronnen.</strong> In het bekendste onderzoek naar dit onderwerp (Princeton en Georgia Tech, 2024)
              werden pagina&apos;s tot 40% vaker zichtbaar in AI-antwoorden als ze citaten, cijfers of bronvermeldingen toevoegden. Keyword stuffing,
              een zoekwoord zo vaak mogelijk herhalen, deed het juist slechter dan niets doen.
            </li>
            <li>
              <strong>Laat zien wat alleen jij weet.</strong> Google raadt &ldquo;niet-inwisselbare&rdquo; content aan: je eigen ervaring, je
              werkwijze, echte voorbeelden. Een samenvatting van wat al overal staat, voegt niets toe en wordt ook niet genoemd.
            </li>
            <li>
              <strong>Zorg dat anderen over je schrijven.</strong> Onderzoek van de Universiteit van Toronto (2025) laat zien dat AI-zoekmachines
              sterk de voorkeur geven aan bronnen van derden boven wat een bedrijf over zichzelf zegt. Denk aan reviews, vermeldingen bij een
              brancheorganisatie of een lokaal nieuwsbericht. Houd je Google-bedrijfsprofiel bij: volgens Google helpt dat in de AI-antwoorden en in
              de gewone resultaten.
            </li>
            <li>
              <strong>Houd het actueel, maar eerlijk.</strong> Werk een pagina bij als er echt iets verandert. Alleen de datum aanpassen zonder de
              inhoud te veranderen noemt Google uitdrukkelijk als iets wat je niet moet doen.
            </li>
          </ol>
        ),
      },
      {
        id: "overslaan",
        title: "Wat je kunt overslaan",
        body: (
          <>
            <p>Er wordt veel verkocht onder de naam GEO of AI-SEO. Google noemt een paar dingen die je gerust kunt laten liggen:</p>
            <ul>
              <li>
                <strong>Een llms.txt-bestand.</strong> Google Search gebruikt het niet, en het helpt of schaadt je zichtbaarheid niet. Ik heb er
                zelf wel een, omdat het niets kost, maar reken er niet op.
              </li>
              <li>
                <strong>Speciale code of &ldquo;AI-schema&rdquo;.</strong> Gestructureerde gegevens zijn niet nodig voor de AI-antwoorden en er
                bestaat geen speciale variant voor.
              </li>
              <li>
                <strong>Je teksten in hapklare stukjes hakken</strong> of herschrijven &ldquo;voor AI&rdquo;. Schrijf voor mensen.
              </li>
              <li>
                <strong>Een aparte pagina voor elke variant van een vraag.</strong> Dat valt volgens Google onder misbruik door massaal gemaakte
                content, ook als een AI-tool die pagina&apos;s voor je schrijft.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "zo-check-je",
        title: "Zo check je of je gevonden wordt",
        body: (
          <ol>
            <li>
              <strong>Vraag het.</strong> Stel in ChatGPT (met zoeken aan) en in Google AI Mode de vraag die een klant zou stellen, bijvoorbeeld
              &ldquo;goede installateur voor een warmtepomp in Amersfoort&rdquo;. Kijk wie er genoemd wordt en welke pagina&apos;s als bron staan.
            </li>
            <li>
              <strong>Kijk in Google Search Console.</strong> Bezoeken uit AI Overviews en AI Mode tellen mee onder &ldquo;Web&rdquo;. Zie je je
              vertoningen stijgen maar je kliks niet, dan staat er waarschijnlijk vaker een AI-antwoord boven je.
            </li>
            <li>
              <strong>Kijk wat er in je antwoorden ontbreekt.</strong> Noemt ChatGPT een concurrent omdat die een duidelijke prijspagina of veel
              reviews heeft? Dan weet je wat je volgende stap is.
            </li>
          </ol>
        ),
      },
      {
        id: "bij-nxt-frame",
        title: "Hoe ik het zelf aanpak",
        body: (
          <>
            <p>
              Op nxtframe.ai staan alle zoekrobots open, ook die van ChatGPT. Elke pagina en elk artikel begint met het korte antwoord, de feiten
              hebben een bron, en elke dienst heeft een eigen pagina met een gewone uitleg en een prijsindicatie. Zo bouw ik ook de sites van
              klanten: eerst uitzoeken welke vragen je klanten stellen, dan voor elke vraag een helder antwoord op de juiste pagina.
            </p>
            <p>
              Een plek in ChatGPT of bovenaan Google beloof ik niet; dat kan niemand eerlijk beloven. Wel een site die alles op orde heeft om
              gevonden te worden. Hoe dat werkt, lees je op <A href="/vindbaar-in-google-en-chatgpt">vindbaar in Google en AI</A>.
            </p>
          </>
        ),
      },
    ],
    faq: [
      {
        q: "Hoe word je vindbaar in ChatGPT?",
        a: "Zorg dat de zoekrobot van ChatGPT (OAI-SearchBot) je site mag lezen, zet in gewone tekst wat je doet, voor wie en waar, beantwoord de vragen van je klanten helder en zorg voor vermeldingen en reviews op andere sites. Een plek in de antwoorden is nooit gegarandeerd.",
      },
      {
        q: "Wat is GEO?",
        a: "GEO staat voor generative engine optimization: je site zo inrichten dat AI-zoekmachines als ChatGPT, Perplexity en Google AI Mode hem gebruiken en noemen in hun antwoorden. In de praktijk overlapt het grotendeels met goede SEO.",
      },
      {
        q: "Heb ik een llms.txt nodig?",
        a: "Nee. Google zegt dat Google Search het bestand niet gebruikt en dat het je zichtbaarheid niet helpt of schaadt. Het kan geen kwaad om er een te hebben, maar het is geen manier om in AI-antwoorden te komen.",
      },
      {
        q: "Is Google AI Mode beschikbaar in Nederland?",
        a: "Ja. Google maakte AI Mode in oktober 2025 beschikbaar in ruim 40 nieuwe landen en 35 nieuwe talen, waaronder Nederland en het Nederlands. AI Overviews, de AI-samenvattingen boven de gewone resultaten, worden ook in Nederland getoond.",
      },
      {
        q: "Kan ik voorkomen dat ChatGPT mijn teksten gebruikt om te trainen?",
        a: "Ja. Blokkeer GPTBot in je robots.txt. Dat is de robot die tekst verzamelt voor training. Laat OAI-SearchBot toe als je wel in de zoekresultaten van ChatGPT wilt verschijnen; die twee staan los van elkaar.",
      },
    ],
    sources: [
      { label: "Google Search Central: AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
      { label: "Google Search Central: Optimizing for generative AI features", href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" },
      { label: "Google: AI Mode expands to more languages and locations (7 oktober 2025)", href: "https://blog.google/products-and-platforms/products/search/ai-mode-expands-languages-locations/" },
      { label: "OpenAI: Overview of OpenAI crawlers", href: "https://developers.openai.com/api/docs/bots" },
      { label: "CBS: AI in de samenleving, ervaringen en opinies (25 februari 2026)", href: "https://www.cbs.nl/nl-nl/longread/diversen/2026/ai-in-de-samenleving-ervaringen-en-opinies" },
      { label: "Pew Research Center: Google users are less likely to click on links when an AI summary appears (22 juli 2025)", href: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/" },
      { label: "Ahrefs: AI Overviews reduce clicks, update (4 februari 2026)", href: "https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/" },
      { label: "Aggarwal e.a.: GEO, Generative Engine Optimization (KDD 2024)", href: "https://arxiv.org/abs/2311.09735" },
      { label: "Chen e.a., Universiteit van Toronto: Generative Engine Optimization, how to dominate AI search (2025)", href: "https://arxiv.org/abs/2509.08919" },
    ],
  },

  /* autocomplete: "offerte maken met ai", "offerte maken met chatgpt"; "offerte maken" scores 20 against
     "website laten maken" 100 in Google Trends NL. A different question than the article on automating
     quotes: here the reader wants to do it himself with ChatGPT */
  {
    slug: "offerte-maken-met-chatgpt",
    title: "Offerte maken met ChatGPT: wat wel en wat niet",
    description:
      "ChatGPT is goed in de tekst van een offerte, en niet te vertrouwen met je bedragen of de gegevens van je klant. Gebruik het voor de begeleidende tekst en de opbouw, reken zelf (of met je eigen prijslijst), en zet er in wat wettelijk op een offerte moet. Met een voorbeeldprompt die je zo kunt gebruiken.",
    category: "AI voor ondernemers",
    published: "2026-11-06",
    updated: "2026-11-06",
    readMinutes: 7,
    img: "/images/herkenbaar-2.webp",
    imgAlt: "Een laptop met het logo van ChatGPT op het scherm, op een groene bank",
    pos: "50% 50%",
    next: { label: "Lees hoe een tool offertes voor je klaarzet", href: "/blog/offertes-en-facturen-automatiseren-bouw-en-installatie" },
    sections: [
      {
        id: "kort-antwoord",
        title: "Het korte antwoord",
        body: (
          <>
            <p>
              Laat ChatGPT de woorden doen, niet de getallen. Het schrijft in een paar seconden een nette inleiding, een duidelijke omschrijving
              van het werk en een vriendelijke begeleidende mail. Maar het kent jouw prijzen niet, kan zich vergissen in een optelsom en is geen
              plek voor de naam, het adres of de foto&apos;s van je klant.
            </p>
            <p>
              De bedragen zet je er zelf in, uit je eigen prijslijst of calculatie. En je controleert of alles op de offerte staat wat er hoort te
              staan. Hieronder lees je hoe.
            </p>
          </>
        ),
      },
      {
        id: "waar-het-goed-in-is",
        title: "Waar ChatGPT goed in is",
        body: (
          <ul>
            <li>
              <strong>Een omschrijving van het werk</strong> die een klant snapt. Jij typt in steekwoorden wat er moet gebeuren, ChatGPT maakt er
              gewone zinnen van.
            </li>
            <li>
              <strong>Een vaste opbouw.</strong> Laat het een sjabloon maken met alle kopjes, en gebruik dat elke keer.
            </li>
            <li>
              <strong>De begeleidende mail</strong> en een vriendelijke herinnering als de klant na een week nog niets heeft laten horen.
            </li>
            <li>
              <strong>Je eigen tekst nalopen</strong> op spelfouten en onduidelijke zinnen.
            </li>
          </ul>
        ),
      },
      {
        id: "waar-het-misgaat",
        title: "Waar het misgaat",
        body: (
          <>
            <h3>De bedragen</h3>
            <p>
              ChatGPT weet niet wat jij per uur rekent, wat je leverancier vraagt voor een warmtepomp of hoeveel tegels er in een badkamer van
              acht vierkante meter gaan. Vraag je het toch, dan krijg je een bedrag dat er overtuigend uitziet en nergens op gebaseerd is. Ook
              rekenen gaat niet altijd goed: in een onderzoek uit 2025 kreeg GPT-4o, het model achter de gratis ChatGPT van toen, maar twee van
              de dertig vermenigvuldigingen van twee getallen van vijf cijfers goed. De fout zat vaak in de laatste stap, het optellen.
            </p>
            <h3>De gegevens van je klant</h3>
            <p>
              In de gratis versie van ChatGPT (en Plus en Pro) mag OpenAI je gesprekken standaard gebruiken om zijn modellen te verbeteren. De
              Autoriteit Persoonsgegevens kreeg in 2024 meerdere meldingen van datalekken omdat medewerkers gegevens van klanten of patiënten in
              een chatbot hadden gezet, en waarschuwt vooral voor gratis versies. Zet er dus geen namen, adressen, telefoonnummers of foto&apos;s van
              iemands huis in. Schrijf &ldquo;de klant&rdquo; en &ldquo;het adres&rdquo; en vul dat later zelf in.
            </p>
            <p>
              Wil je het toch gebruiken? Zet in de instellingen onder <em>Gegevensbeheer</em> de optie <em>Het model verbeteren voor iedereen</em>{" "}
              uit. In de zakelijke versies (ChatGPT Business en Enterprise) worden je gegevens standaard niet gebruikt voor training.
            </p>
          </>
        ),
      },
      {
        id: "wat-erop-moet",
        title: "Wat er op een offerte moet",
        body: (
          <>
            <p>ChatGPT weet niet welke regels voor jou gelden. Loop dit lijstje zelf na:</p>
            <ul>
              <li>Je bedrijfsgegevens, met je KvK-nummer. Dat moet wettelijk op offertes, facturen, je site en zakelijke mail.</li>
              <li>De gegevens van de klant, de datum en een offertenummer.</li>
              <li>Een omschrijving van het werk en de prijs: een totaalprijs of je tarief.</li>
              <li>
                Aan particulieren: prijzen <strong>inclusief btw</strong> en inclusief alle extra kosten. Dat eist de ACM in elk aanbod aan
                consumenten.
              </li>
              <li>Hoe lang de offerte geldig is, en of je een aanbetaling vraagt. Van een particulier mag dat bij een product maximaal 50% zijn.</li>
              <li>
                Een verwijzing naar je algemene voorwaarden als je die gebruikt, en de voorwaarden zelf meesturen. Je moet kunnen aantonen dat de
                klant ze heeft gehad.
              </li>
              <li>
                Bedenktijd: sluit je de afspraak met een particulier af via internet, telefoon of bij de klant thuis (vanaf € 50), dan heeft die
                klant 14 dagen bedenktijd. Dat moet je vermelden, met uitleg hoe hij kan annuleren. Vergeet je dat, dan loopt de bedenktijd tot een
                jaar langer door. Er zijn uitzonderingen, zoals maatwerk en spoedreparaties. Aan bedrijven geldt geen bedenktijd.
              </li>
            </ul>
            <p>Stuur de offerte als pdf. Een getekende offerte is een bindende overeenkomst.</p>
          </>
        ),
      },
      {
        id: "prompt",
        title: "Een prompt die je zo kunt gebruiken",
        body: (
          <>
            <p>Kopieer dit, vul de steekwoorden in, en laat de bedragen leeg:</p>
            <blockquote>
              <p>
                Je helpt een [installateur / aannemer / schilder] met het schrijven van een offerte aan een particulier. Schrijf in duidelijk,
                vriendelijk Nederlands, zonder vakjargon. Gebruik deze kopjes: inleiding, omschrijving van het werk, planning, prijs, geldigheid,
                voorwaarden. Laat bij prijs de bedragen open als [BEDRAG]; reken zelf niets uit en verzin geen prijzen. Gebruik geen namen of
                adressen, schrijf &ldquo;de klant&rdquo;. Het werk in steekwoorden: [steekwoorden].
              </p>
            </blockquote>
            <p>
              Lees het resultaat altijd na. ChatGPT schrijft zelfverzekerd, ook als het iets verkeerd heeft begrepen. Klopt de omschrijving niet
              met wat je met de klant hebt afgesproken, dan is dat jouw offerte, niet die van ChatGPT.
            </p>
          </>
        ),
      },
      {
        id: "een-stap-verder",
        title: "Als je veel offertes maakt",
        body: (
          <>
            <p>
              Maak je er elke week een paar, dan zit de meeste tijd niet in de tekst maar in het opzoeken: maten, materialen, je prijzen, de
              gegevens van de klant. Dat kan ChatGPT niet voor je doen, omdat het je prijslijst en je klanten niet kent.
            </p>
            <p>
              Wat wel kan: een hulpmiddel dat aan je site en je prijzen gekoppeld is. Een klant vraagt een offerte aan op je site, het hulpmiddel
              zet er een concept van klaar met jouw vaste prijzen, en jij kijkt het na en verstuurt het. Hoe dat werkt, lees je in{" "}
              <A href="/blog/offertes-en-facturen-automatiseren-bouw-en-installatie">offertes en facturen automatiseren</A>.
            </p>
          </>
        ),
      },
    ],
    faq: [
      {
        q: "Kan ChatGPT een offerte maken?",
        a: "Het kan de tekst en de opbouw van een offerte schrijven. De bedragen moet je zelf invullen: ChatGPT kent je prijzen niet en kan zich vergissen in berekeningen. Controleer daarna of alles op de offerte staat wat er wettelijk op moet.",
      },
      {
        q: "Mag ik klantgegevens in ChatGPT zetten?",
        a: "Liever niet. In de gratis versie mag OpenAI je gesprekken standaard gebruiken om modellen te verbeteren, en de Autoriteit Persoonsgegevens waarschuwt dat het invoeren van klantgegevens een datalek kan zijn. Schrijf 'de klant' en vul de gegevens later zelf in.",
      },
      {
        q: "Wat moet er verplicht op een offerte?",
        a: "Je KvK-nummer is wettelijk verplicht. Verder horen erop: je bedrijfs- en klantgegevens, datum, offertenummer, omschrijving van het werk, prijs (aan particulieren inclusief btw), geldigheid, eventuele aanbetaling en een verwijzing naar je algemene voorwaarden. Bij verkoop aan huis of op afstand aan particulieren ook de 14 dagen bedenktijd.",
      },
      {
        q: "Is een offerte bindend?",
        a: "Een offerte die de klant accepteert, is een bindende overeenkomst. Zet er daarom een geldigheidsduur op, zodat je niet maanden later nog aan een oude prijs vastzit.",
      },
      {
        q: "Hoe zet ik training uit in ChatGPT?",
        a: "Ga naar Instellingen, Gegevensbeheer, en zet 'Het model verbeteren voor iedereen' uit. Je gesprekken blijven bewaard, maar worden niet meer gebruikt om modellen te trainen.",
      },
    ],
    sources: [
      { label: "Ondernemersplein (KVK): Stappenplan offerte maken", href: "https://ondernemersplein.overheid.nl/bedrijfsvoering/administratie/stappenplan-offerte-maken/" },
      { label: "KVK: KVK-nummer, alles wat je moet weten", href: "https://www.kvk.nl/over-het-handelsregister/kvk-nummer-alles-wat-je-moet-weten/" },
      { label: "ACM: Prijzen vermelden", href: "https://www.acm.nl/nl/verkoop-aan-consumenten/consumenten-informeren/prijzen-vermelden" },
      { label: "Ondernemersplein: Bedenktijd bij verkoop", href: "https://ondernemersplein.overheid.nl/wetten-en-regels/bedenktijd-bij-verkoop/" },
      { label: "Autoriteit Persoonsgegevens: Let op, gebruik AI-chatbot kan leiden tot datalekken (6 augustus 2024)", href: "https://www.autoriteitpersoonsgegevens.nl/actueel/let-op-gebruik-ai-chatbot-kan-leiden-tot-datalekken" },
      { label: "OpenAI Help: Data controls in ChatGPT", href: "https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt" },
      { label: "Onderzoek naar rekenfouten van taalmodellen (arXiv 2508.09932, 2025)", href: "https://arxiv.org/html/2508.09932v1" },
    ],
  },

  /* autocomplete: "website onderhoud kosten", "website onderhoud uitbesteden", "onderhoudskosten website";
     the results page holds small Dutch agencies with 2026 prices, so a clear overview can stand out */
  {
    slug: "wat-kost-website-onderhoud",
    title: "Wat kost website onderhoud per maand in 2026?",
    description:
      "Website onderhoud kost in 2026 meestal € 25 tot € 50 per maand voor een eenvoudige site, € 50 tot € 150 voor een gemiddelde bedrijfssite en € 150 tot € 500 of meer voor een webshop. Hieronder zie je wat erin hoort te zitten, waarom je het niet moet overslaan en waar je op let bij een aanbieder.",
    category: "Onderhoud",
    published: "2026-11-06",
    updated: "2026-11-06",
    readMinutes: 6,
    img: "/images/andere-tijd.webp",
    imgAlt: "De NXT Frame-mascotte krabt zich achter het hoofd voor een ouderwetse website op een oude computer",
    pos: "50% 40%",
    next: { label: "Bekijk wat onderhoud bij mij inhoudt", href: "/website-onderhoud" },
    sections: [
      {
        id: "kort-antwoord",
        title: "Het korte antwoord",
        body: (
          <>
            <p>
              Ik heb de prijzen naast elkaar gezet die Nederlandse webbouwers in 2026 zelf publiceren. Daar komt een vrij duidelijk beeld uit:
            </p>
            <Scroll label="Wat website onderhoud per maand kost">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Soort site</th>
                    <th scope="col">Per maand</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Eenvoudige informatieve site, alleen het minimum</td><td>€ 25 tot € 50</td></tr>
                  <tr><td>Gemiddelde bedrijfssite, vaak met hosting</td><td>€ 50 tot € 150</td></tr>
                  <tr><td>Webshop of maatwerk</td><td>€ 150 tot € 500 of meer</td></tr>
                  <tr><td>Extra werk buiten het pakket</td><td>€ 60 tot € 120 per uur</td></tr>
                </tbody>
              </table>
            </Scroll>
            <p>
              Bedragen zijn exclusief btw. Let vooral op wat er voor dat bedrag in zit: het ene pakket van € 50 is het andere niet.
            </p>
          </>
        ),
      },
      {
        id: "wat-erin-zit",
        title: "Wat er in onderhoud hoort te zitten",
        body: (
          <>
            <p>Een pakket dat zijn geld waard is, heeft in elk geval:</p>
            <ul>
              <li><strong>Updates</strong> van de software, het thema en de plugins, met een controle achteraf of alles nog werkt.</li>
              <li><strong>Back-ups</strong> die ook echt terug te zetten zijn, liefst dagelijks en op een andere plek dan je site.</li>
              <li><strong>Beveiliging:</strong> een firewall, een scan op malware en een SSL-certificaat (het slotje in je browser).</li>
              <li><strong>Monitoring:</strong> iemand die merkt dat je site plat ligt voordat je klanten het merken.</li>
              <li><strong>Formulieren testen.</strong> Een kapot contactformulier zie je zelf niet, je mist alleen de aanvragen.</li>
              <li><strong>Een aanspreekpunt</strong> dat binnen een redelijke tijd reageert.</li>
            </ul>
            <p>
              Vaak los betaald: hosting (€ 4 tot € 40 per maand, afhankelijk van het soort), je domeinnaam (zo&apos;n € 10 tot € 15 per jaar
              voor een .nl) en licenties voor betaalde plugins.
            </p>
          </>
        ),
      },
      {
        id: "waarom-niet-overslaan",
        title: "Waarom je het niet moet overslaan",
        body: (
          <>
            <p>
              Vooral bij WordPress, waar de meeste kleine bedrijfssites op draaien, is onderhoud geen luxe. Beveiligingsbedrijf Patchstack telde in
              2025 11.334 nieuwe beveiligingslekken in WordPress-sites, 42% meer dan het jaar ervoor. 91% zat in plugins. Bij de lekken die het
              meest werden misbruikt, duurde het gemiddeld maar 5 uur tot aanvallers er op grote schaal gebruik van maakten.
            </p>
            <p>
              Een site die een jaar niet is bijgewerkt, loopt dus echt risico. En het opruimen van een gehackte site kost bijna altijd meer dan
              een jaar onderhoud.
            </p>
          </>
        ),
      },
      {
        id: "waar-op-letten",
        title: "Waar je op let bij een aanbieder",
        body: (
          <ol>
            <li><strong>Wat zit er precies in?</strong> Vraag om een lijstje. &ldquo;Updates en support&rdquo; zegt weinig.</li>
            <li><strong>Hoeveel kleine aanpassingen?</strong> Een tekst of foto wisselen, valt dat binnen het bedrag?</li>
            <li><strong>Wat kost noodwerk?</strong> Malware opruimen of een site die plat ligt na een update, is dat inbegrepen of per uur?</li>
            <li><strong>Wordt er eerst getest?</strong> Goede aanbieders testen updates op een kopie van je site (een staging-omgeving).</li>
            <li><strong>Kun je opzeggen?</strong> Per maand opzegbaar is prettiger dan een contract voor drie jaar.</li>
            <li><strong>Is de site van jou?</strong> Als je stopt, krijg je dan je site en je gegevens mee?</li>
          </ol>
        ),
      },
      {
        id: "minder-onderhoud",
        title: "Kan het met minder onderhoud?",
        body: (
          <p>
            Ja. Hoe minder losse plugins en bewegende delen, hoe minder er bij te houden is. Een site die op maat gebouwd is, zonder stapel
            plugins, heeft minder updates nodig en minder plekken waar een lek in kan zitten. Dat is ook een van de redenen dat ik sites zonder
            WordPress-plugins bouw. Onderhoud blijft nodig, maar het gaat dan vooral over meten en verbeteren, en minder over brandjes blussen.
          </p>
        ),
      },
      {
        id: "bij-nxt-frame",
        title: "Onderhoud bij mij",
        body: (
          <p>
            Bij mij is onderhoud één vast bedrag per maand, met hosting, updates, beveiliging en back-ups, en ik houd snelheid en vindbaarheid in
            de gaten. Kleine aanpassingen doe ik binnen het abonnement, een grotere uitbreiding krijgt vooraf een vaste prijs. Wat erin zit, lees je
            op <A href="/website-onderhoud">website onderhoud</A>.
          </p>
        ),
      },
    ],
    faq: [
      {
        q: "Wat kost website onderhoud per maand?",
        a: "Meestal € 25 tot € 50 voor een eenvoudige site, € 50 tot € 150 voor een gemiddelde bedrijfssite en € 150 tot € 500 of meer voor een webshop, exclusief btw. Extra werk kost meestal € 60 tot € 120 per uur.",
      },
      {
        q: "Wat kost een website per jaar aan onderhoud?",
        a: "Reken voor een gemiddelde bedrijfssite op € 600 tot € 1.800 per jaar, inclusief hosting. Daar kunnen een domeinnaam en licenties voor betaalde plugins bij komen.",
      },
      {
        q: "Is website onderhoud nodig?",
        a: "Ja, zeker bij WordPress. In 2025 werden er ruim 11.000 nieuwe beveiligingslekken gevonden, vooral in plugins. Zonder updates en back-ups loopt je site risico, en een gehackte site opruimen kost meestal meer dan een jaar onderhoud.",
      },
      {
        q: "Kan ik mijn website zelf onderhouden?",
        a: "Updates installeren kan iedereen, maar je moet ook back-ups maken, controleren of alles daarna nog werkt en een fout kunnen terugdraaien. Heb je daar geen tijd of zin in, dan is uitbesteden meestal goedkoper dan een probleem achteraf.",
      },
      {
        q: "Wat is het verschil tussen hosting en onderhoud?",
        a: "Hosting is de plek waar je site staat, een soort huur voor de ruimte op een server. Onderhoud is het bijhouden van de site zelf: updates, back-ups, beveiliging en kleine aanpassingen. Veel aanbieders bieden ze samen aan.",
      },
    ],
    sources: [
      { label: "weCare Media: Wat zijn de kosten van website onderhoud nu écht? (september 2025)", href: "https://www.wecaremedia.nl/blog/wat-zijn-de-kosten-van-website-onderhoud-nu-echt/" },
      { label: "webwrk: Website onderhoud kosten (oktober 2026)", href: "https://www.webwrk.nl/blog/website-onderhoud-kosten" },
      { label: "Cristel Balke: Website onderhoud kosten per maand (oktober 2026)", href: "https://cristelbalke.nl/website-onderhoud-kosten/" },
      { label: "No Limit Design: Website onderhoud kosten 2026", href: "https://nolimitdesign.nl/inspiratiehub/website-onderhoud-bespaar-kosten-met-slim-onderhoud/" },
      { label: "Patchstack: State of WordPress Security in 2026 (februari 2026)", href: "https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/" },
    ],
  },

  /* autocomplete: "toegankelijkheid website verplicht", "european accessibility act nederland", "... 2026";
     too small to measure in Google Trends, so a niche topic, but with a clear question behind it */
  {
    slug: "toegankelijke-website-verplicht",
    title: "Toegankelijke website verplicht: geldt het ook voor jou?",
    description:
      "Sinds 28 juni 2025 moeten websites en apps waarop consumenten iets kunnen kopen, boeken of afsluiten toegankelijk zijn voor mensen met een beperking. Kleine ondernemingen met minder dan 10 medewerkers en maximaal € 2 miljoen omzet zijn uitgezonderd. Een site die alleen informatie geeft, valt er waarschijnlijk niet onder. Zo zoek je uit of het voor jou geldt en wat je dan moet doen.",
    category: "Wet- en regelgeving",
    published: "2026-11-06",
    updated: "2026-11-06",
    readMinutes: 7,
    img: "/images/traag-mobiel.webp",
    imgAlt: "De NXT Frame-mascotte kijkt op een telefoon in een drukke winkelstraat",
    pos: "60% 40%",
    next: { label: "Bekijk hoe ik een website laat maken", href: "/website-laten-maken" },
    sections: [
      {
        id: "kort-antwoord",
        title: "Het korte antwoord",
        body: (
          <>
            <p>
              De Europese toegankelijkheidswet (de European Accessibility Act) geldt in Nederland sinds 28 juni 2025, via de{" "}
              <em>Implementatiewet toegankelijkheidsvoorschriften producten en diensten</em>. Voor websites komt het hierop neer:
            </p>
            <ul>
              <li>Kan een consument op je site of in je app iets kopen, huren, bestellen, boeken of zich ergens voor aanmelden? Dan valt die onder de wet.</li>
              <li>Heb je minder dan 10 medewerkers én maximaal € 2 miljoen omzet per jaar? Dan ben je voor diensten uitgezonderd.</li>
              <li>Geeft je site alleen informatie, en bestellen of boeken gaat via mail of telefoon? Dan valt hij er volgens de omschrijving van de ACM waarschijnlijk niet onder.</li>
            </ul>
            <p>Ben je niet verplicht, dan is een toegankelijke site nog steeds verstandig. Waarom, lees je hieronder.</p>
          </>
        ),
      },
      {
        id: "voor-wie",
        title: "Voor wie geldt het?",
        body: (
          <>
            <p>
              De ACM houdt toezicht op zogenoemde e-handelsdiensten: elke website of app waarop een consument iets kan kopen, huren, bestellen,
              boeken of afsluiten. Ook als dat maar op een deel van je site kan, en ook als de klant &ldquo;betaalt&rdquo; met zijn gegevens, zoals
              bij een aanmelding. Denk aan een webshop, een site waar je een tafel reserveert of een behandeling boekt, of een online abonnement.
            </p>
            <p>
              Je bent zelf verantwoordelijk, ook als iemand anders je site heeft gebouwd. Voor banken, e-books, vervoer en telefonie gelden
              dezelfde regels, met andere toezichthouders.
            </p>
            <h3>De uitzondering voor kleine bedrijven</h3>
            <p>
              Een micro-onderneming hoeft voor haar diensten niet aan de wet te voldoen. De ACM noemt als grens: minder dan 10 medewerkers en een
              jaaromzet van maximaal € 2 miljoen. Dat geldt voor veel zzp&apos;ers, salons, praktijken en kleine installatiebedrijven.
            </p>
            <h3>En een gewone bedrijfssite?</h3>
            <p>
              Een site met informatie over je diensten, waar klanten via mail of telefoon contact opnemen, is geen e-handelsdienst volgens de
              omschrijving van de ACM. Een officiële uitspraak daarover bestaat niet, dus het blijft een uitleg. Twijfel je, bijvoorbeeld omdat
              klanten online een afspraak kunnen boeken, ga dan uit van de strengste lezing.
            </p>
          </>
        ),
      },
      {
        id: "wat-moet",
        title: "Wat moet je doen als het voor je geldt?",
        body: (
          <ol>
            <li>
              <strong>Voldoe aan WCAG 2.1 niveau AA</strong>, via de Europese norm EN 301 549. De ACM verwacht dat WCAG 2.2 AA in de loop van 2026
              de nieuwe standaard wordt en raadt aan daar nu al op te bouwen.
            </li>
            <li>
              <strong>Publiceer een toegankelijkheidsverklaring</strong> die makkelijk te vinden is, zelf toegankelijk is en ook gesproken wordt
              aangeboden, bijvoorbeeld als audio.
            </li>
            <li><strong>Zorg dat je klantenservice</strong> informatie over toegankelijkheid kan geven.</li>
            <li><strong>Houd het bij.</strong> Na elke wijziging moet je site toegankelijk blijven.</li>
            <li>
              <strong>Meld problemen die je niet meteen kunt oplossen</strong> bij de ACM, met een plan: binnen een week bij ernstige problemen,
              binnen een maand bij kleinere. Gebrek aan tijd of kennis telt daarbij niet als reden.
            </li>
          </ol>
        ),
      },
      {
        id: "wat-betekent-toegankelijk",
        title: "Wat betekent toegankelijk in de praktijk?",
        body: (
          <>
            <p>Een paar voorbeelden van wat WCAG vraagt, en wat in de praktijk het vaakst misgaat:</p>
            <ul>
              <li><strong>Genoeg contrast</strong> tussen tekst en achtergrond, zodat slechtzienden het kunnen lezen.</li>
              <li><strong>Alles met het toetsenbord</strong> te bedienen, ook menu&apos;s en het afrekenen.</li>
              <li><strong>Teksten bij afbeeldingen</strong> (alt-teksten), zodat een schermlezer kan voorlezen wat er staat.</li>
              <li><strong>Formulieren met duidelijke labels</strong> en foutmeldingen die zeggen wat er mis is.</li>
              <li><strong>Geen informatie die alleen uit kleur blijkt</strong>, zoals een rood veld zonder tekst.</li>
            </ul>
            <p>
              Hoe ver de praktijk achterloopt, liet de ACM in maart 2026 zien: bij 61% van de grote Nederlandse webwinkels konden mensen die
              hulpmiddelen gebruiken niet bestellen, en bij nog eens 33% waren er serieuze problemen. De ACM benadert de slechtst scorende winkels
              en kan handhaven als ze niet verbeteren.
            </p>
          </>
        ),
      },
      {
        id: "ook-als-het-niet-moet",
        title: "Ook als het niet moet",
        body: (
          <p>
            Een toegankelijke site is ook beter voor iedereen: duidelijke knoppen, leesbare tekst en formulieren die gewoon werken, helpen elke
            bezoeker, ook op een telefoon in de zon. En veel van wat toegankelijkheid vraagt, zoals echte koppen, tekst in plaats van afbeeldingen
            van tekst en duidelijke labels, is precies wat zoekmachines en AI-zoekmachines helpt je site te begrijpen. Groei je later boven de
            grens, of ga je online verkopen, dan hoef je niet opnieuw te beginnen.
          </p>
        ),
      },
      {
        id: "bij-nxt-frame",
        title: "Hoe ik het doe",
        body: (
          <p>
            Ik bouw elke site volgens WCAG 2.2 AA, ook als de wet het niet eist. Elke pagina test ik met een toegankelijkheidscheck en op het
            toetsenbord, en ik let op contrast, labels en alt-teksten. Deze site haalt een score van 100 op toegankelijkheid in de test van Google
            (Lighthouse). Dat is geen keurmerk, maar wel een goede basis. Meer over hoe ik een site bouw, lees je op{" "}
            <A href="/website-laten-maken">website laten maken</A>.
          </p>
        ),
      },
    ],
    faq: [
      {
        q: "Is een toegankelijke website verplicht?",
        a: "Sinds 28 juni 2025 wel voor websites en apps waarop consumenten iets kunnen kopen, boeken of afsluiten, zoals webshops. Micro-ondernemingen (minder dan 10 medewerkers en maximaal € 2 miljoen omzet) zijn voor diensten uitgezonderd. Voor overheidssites gold al een eigen verplichting.",
      },
      {
        q: "Geldt de European Accessibility Act voor mijn kleine bedrijf?",
        a: "Heb je minder dan 10 medewerkers en maximaal € 2 miljoen jaaromzet, dan ben je voor je diensten uitgezonderd. Je mag natuurlijk wel een toegankelijke site hebben, en dat is ook verstandig.",
      },
      {
        q: "Wie controleert of mijn webshop toegankelijk is?",
        a: "Voor webshops en andere e-handelsdiensten is dat de ACM. Die kiest zelf sites uit om te controleren, benadert bedrijven die slecht scoren en kan handhaven als ze niet verbeteren.",
      },
      {
        q: "Aan welke norm moet mijn website voldoen?",
        a: "Aan WCAG 2.1 niveau AA, via de Europese norm EN 301 549. De ACM verwacht dat in de loop van 2026 WCAG 2.2 AA de standaard wordt en raadt aan daar nu al op te bouwen. Een keurmerk of audit is niet verplicht.",
      },
      {
        q: "Wat is een toegankelijkheidsverklaring?",
        a: "Een pagina op je site waarin je uitlegt in hoeverre je site toegankelijk is en hoe je eraan werkt. Als de wet voor je geldt, moet die verklaring makkelijk te vinden zijn, zelf toegankelijk zijn en ook gesproken worden aangeboden.",
      },
    ],
    sources: [
      { label: "Staatsblad 2024, 87: Implementatiewet toegankelijkheidsvoorschriften producten en diensten", href: "https://zoek.officielebekendmakingen.nl/stb-2024-87.html" },
      { label: "ACM: Toegankelijkheid van e-handelsdiensten en elektronische communicatiediensten", href: "https://www.acm.nl/nl/toegankelijkheid/toegankelijkheid-van-e-handelsdiensten-en-elektronische-communicatiediensten" },
      { label: "ACM: Klant met beperking kan bij merendeel grote webwinkels niet terecht (24 maart 2026)", href: "https://www.acm.nl/nl/publicaties/acm-klant-met-beperking-kan-bij-merendeel-grote-webwinkels-niet-terecht" },
      { label: "Rijksoverheid: Producten en diensten toegankelijker voor mensen met een beperking", href: "https://www.rijksoverheid.nl/themas/familie-zorg-en-gezondheid/leven-met-een-beperking/producten-en-diensten-toegankelijker-voor-mensen-met-beperking" },
    ],
  },

  /* "ai website maken" scores 15 against "website laten maken" 100 in Google Trends NL; autocomplete:
     "website laten maken door ai", "ai website builder", "ai website maken gratis". The results page
     is almost all product pages of the builders themselves, so an honest comparison is missing */
  {
    slug: "ai-websitebouwer-of-website-laten-maken",
    title: "AI-websitebouwer of website laten maken: wat past bij jou?",
    description:
      "Een AI-websitebouwer zoals JouwWeb, Wix of TransIP zet in een paar minuten een site neer voor een paar tientjes per maand. Dat is genoeg om te beginnen. Wil je een site die opvalt, aanvragen binnenhaalt, aan je systemen gekoppeld is en van jou blijft, dan laat je hem maken. Hieronder de echte prijzen, de grenzen en een eerlijk overzicht.",
    category: "Website laten maken",
    published: "2026-11-06",
    updated: "2026-11-06",
    readMinutes: 8,
    img: "/images/mascot-build.webp",
    imgAlt: "De NXT Frame-mascotte bouwt met blokken aan een website",
    pos: "50% 35%",
    next: { label: "Bekijk wat een website laten maken bij mij inhoudt", href: "/website-laten-maken" },
    sections: [
      {
        id: "kort-antwoord",
        title: "Het korte antwoord",
        body: (
          <>
            <p>
              Begin je net, heb je weinig budget en is een visitekaartje online genoeg? Dan is een AI-websitebouwer een prima start. Je beschrijft je
              bedrijf, de AI maakt een opzet met teksten en beelden, en jij past het aan.
            </p>
            <p>
              Moet je site werk opleveren, zoals aanvragen, afspraken of bestellingen, en wil je opvallen tussen concurrenten die dezelfde
              sjablonen gebruiken? Dan laat je hem maken. Dat kost meer, maar je krijgt een site die op jouw klanten is afgestemd, die je kunt
              koppelen aan wat je al gebruikt en die je mee kunt nemen als je ooit overstapt.
            </p>
          </>
        ),
      },
      {
        id: "wat-het-kost",
        title: "Wat een AI-websitebouwer echt kost",
        body: (
          <>
            <p>De bouwers die je in Google ziet, met hun prijzen zoals ze op 6 november 2026 op hun eigen site stonden:</p>
            <Scroll label="Prijzen van AI-websitebouwers">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Bouwer</th>
                    <th scope="col">Per maand</th>
                    <th scope="col">Let op</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>JouwWeb</td>
                    <td>€ 5,50 tot € 20 (eerste jaar de helft)</td>
                    <td>Gratis versie zonder eigen domein; goedkoopste pakket met advertenties; domein na jaar 1 € 20 per jaar</td>
                  </tr>
                  <tr>
                    <td>TransIP Sitebuilder</td>
                    <td>€ 7,99 tot € 24,99</td>
                    <td>Instapprijzen gelden de eerste maanden; Start heeft formulieren met maar 3 velden</td>
                  </tr>
                  <tr>
                    <td>Wix</td>
                    <td>$ 17 tot $ 159 (jaarbetaling)</td>
                    <td>Pas vanaf Core ($ 29) kun je betalingen ontvangen; prijzen in dollars</td>
                  </tr>
                  <tr>
                    <td>Yourhosting Smart Start</td>
                    <td>Actieprijs, daarna € 17,49 tot € 34,99</td>
                    <td>Een AI-hulp bovenop WordPress, met een contract van 1 of 3 jaar</td>
                  </tr>
                </tbody>
              </table>
            </Scroll>
            <p>
              Reken dus op € 60 tot € 400 per jaar. Daar komt je eigen tijd bij: de AI zet een opzet neer, maar teksten die kloppen, foto&apos;s
              van je eigen werk en een site die echt over jouw bedrijf gaat, maak je zelf.
            </p>
          </>
        ),
      },
      {
        id: "waar-het-goed-in-is",
        title: "Waar een AI-websitebouwer goed in is",
        body: (
          <ul>
            <li><strong>Snel en goedkoop online.</strong> Binnen een middag staat er iets.</li>
            <li>
              <strong>Snelheid is meestal in orde.</strong> Dat verrast misschien, maar volgens de cijfers over 2026 halen sites op Wix vaker de
              snelheidsnormen van Google dan sites op WordPress (ongeveer 79% tegen 48% op mobiel). Een bouwer is niet per se traag.
            </li>
            <li><strong>Geen technisch onderhoud.</strong> Updates en beveiliging regelt de aanbieder.</li>
            <li><strong>Zelf aanpassen</strong> zonder iemand te bellen.</li>
          </ul>
        ),
      },
      {
        id: "grenzen",
        title: "Waar je tegenaan loopt",
        body: (
          <>
            <h3>Je site blijft bij de bouwer</h3>
            <p>
              Wix zegt het zelf in zijn helpcentrum: een Wix-site moet op de servers van Wix draaien en kan niet naar een andere host. Je domeinnaam
              kun je meenemen, je site niet. Bij JouwWeb kun je bestellingen en formulieren exporteren, maar ik vond geen manier om de site zelf
              mee te nemen. Stop je, dan begin je opnieuw.
            </p>
            <h3>Je lijkt op je concurrent</h3>
            <p>
              De AI begint vanuit dezelfde sjablonen voor iedereen in jouw branche. Je krijgt snel een nette site, maar zelden een die laat zien
              waarom klanten juist bij jou moeten zijn.
            </p>
            <h3>De teksten moet je zelf goed krijgen</h3>
            <p>
              AI-teksten mogen van Google, zolang ze bezoekers helpen. Google raadt aan alles wat een AI schrijft zelf na te lopen, tot de titels
              en de beschrijvingen van afbeeldingen aan toe. Algemene teksten die op elke site kunnen staan, helpen je niet om gevonden te worden,
              en bij AI-zoekmachines al helemaal niet.
            </p>
            <h3>Koppelingen en eigen tools</h3>
            <p>
              Een rekentool die precies werkt zoals jouw prijzen, een koppeling met je agenda, boekhouding of woningaanbod, een offerteformulier
              dat een concept-offerte klaarzet: dat gaat in een bouwer niet, of alleen met losse apps die je per maand betaalt.
            </p>
          </>
        ),
      },
      {
        id: "vergelijking",
        title: "Naast elkaar",
        body: (
          <Scroll label="AI-websitebouwer en website laten maken naast elkaar">
            <table>
              <thead>
                <tr>
                  <th scope="col">Onderdeel</th>
                  <th scope="col">AI-websitebouwer</th>
                  <th scope="col">Laten maken</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Kosten</td><td>€ 60 tot € 400 per jaar, plus je eigen tijd</td><td>Eenmalig vanaf een paar duizend euro, plus onderhoud</td></tr>
                <tr><td>Tijd</td><td>Een middag tot een paar dagen</td><td>Meestal 4 tot 12 weken</td></tr>
                <tr><td>Ontwerp</td><td>Sjabloon, aangepast</td><td>Op maat, voor jouw klanten</td></tr>
                <tr><td>Teksten</td><td>Door AI, door jou nagelopen</td><td>Geschreven op wat je klanten zoeken</td></tr>
                <tr><td>Koppelingen en tools</td><td>Beperkt, via apps</td><td>Wat je nodig hebt</td></tr>
                <tr><td>Meenemen naar een andere partij</td><td>Meestal niet</td><td>Ja, als het in je afspraken staat</td></tr>
              </tbody>
            </table>
          </Scroll>
        ),
      },
      {
        id: "keuze",
        title: "Zo kies je",
        body: (
          <>
            <p>Een AI-websitebouwer past als:</p>
            <ul>
              <li>je net begint en eerst wilt zien of je bedrijf loopt;</li>
              <li>je site vooral een visitekaartje is en klanten via mond-tot-mondreclame komen;</li>
              <li>je zelf tijd en zin hebt om teksten en foto&apos;s te maken.</li>
            </ul>
            <p>Laten maken past als:</p>
            <ul>
              <li>je site aanvragen, afspraken of bestellingen moet opleveren;</li>
              <li>je wilt opvallen in een branche waar iedereen er hetzelfde uitziet;</li>
              <li>je iets nodig hebt wat een bouwer niet kan, zoals een rekentool of een koppeling;</li>
              <li>je de site wilt kunnen meenemen als je overstapt.</li>
            </ul>
          </>
        ),
      },
      {
        id: "bij-nxt-frame",
        title: "Wat ik anders doe",
        body: (
          <p>
            Ik gebruik zelf AI, maar als gereedschap, niet als bouwer. Een site bij mij begint bij de vragen van je klanten: wat zoeken ze, wat
            willen ze weten voordat ze contact opnemen? Daarop schrijf ik de teksten en ontwerp ik de pagina&apos;s. Een complete site begint bij mij
            bij € 2.500, en de site is daarna van jou. Lees meer op <A href="/website-laten-maken">website laten maken</A> of bekijk de{" "}
            <A href="/prijzen">prijzen</A>.
          </p>
        ),
      },
    ],
    faq: [
      {
        q: "Kan AI een website voor me maken?",
        a: "Ja. AI-websitebouwers als JouwWeb, Wix en TransIP maken op basis van een korte beschrijving een opzet met teksten en beelden. Je moet de teksten wel zelf nalopen en aanvullen, en je site blijft bij die bouwer.",
      },
      {
        q: "Wat kost een website maken met AI?",
        a: "De bekende Nederlandse AI-websitebouwers kosten ongeveer € 5 tot € 35 per maand, of € 60 tot € 400 per jaar. Voor een eigen domein, geen advertenties en een webshop heb je meestal een duurder pakket nodig.",
      },
      {
        q: "Is een AI-website slecht voor Google?",
        a: "Niet per se. Google heeft niets tegen AI-teksten zolang ze bezoekers helpen, en sites op bouwers als Wix zijn vaak snel genoeg. Algemene teksten die nergens over jouw bedrijf gaan, helpen je alleen niet om gevonden te worden.",
      },
      {
        q: "Kan ik mijn Wix- of JouwWeb-site later verhuizen?",
        a: "Je domeinnaam wel, de site zelf meestal niet. Wix zegt in zijn helpcentrum dat een Wix-site alleen op de servers van Wix kan draaien. Stap je over, dan bouw je de site opnieuw.",
      },
      {
        q: "Wat kost een website laten maken?",
        a: "Voor een kleine onderneming meestal € 2.000 tot € 7.500, plus hosting en onderhoud. Bij mij begint een complete site bij € 2.500.",
      },
    ],
    sources: [
      { label: "JouwWeb: Tarieven", href: "https://www.jouwweb.nl/tarieven" },
      { label: "TransIP: Website builder", href: "https://www.transip.nl/website-builder/" },
      { label: "Wix: Premium plans", href: "https://www.wix.com/plans" },
      { label: "Yourhosting: AI website builder (november 2026)", href: "https://www.yourhosting.nl/website-maken/ai-website-builder/" },
      { label: "Wix Help Center: Exporting or embedding your Wix site elsewhere", href: "https://support.wix.com/en/article/exporting-or-embedding-your-wix-site-elsewhere" },
      { label: "Google Search Central: Guidance on using generative AI content", href: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content" },
      { label: "Google Search Central: Spam policies (scaled content abuse)", href: "https://developers.google.com/search/docs/essentials/spam-policies" },
      { label: "PageSpeed Matters: Core Web Vitals pass rates (2026)", href: "https://www.pagespeedmatters.com/resources/data-studies/core-web-vitals-pass-rates" },
    ],
  },

  /* "chatbot website" scores 12 against "website laten maken" 100 in Google Trends NL, "ai chatbot website"
     rose 110% in a year; autocomplete: "ai chatbot op website", "ai chatbot voor website" */
  {
    slug: "ai-chatbot-op-je-website",
    title: "AI-chatbot op je website: wat kan het, wat kost het en wat mag het?",
    description:
      "Een AI-chatbot beantwoordt vragen van bezoekers met de kennis van jouw bedrijf, ook 's avonds, en kan een afspraak inplannen. Een kant-en-klaar pakket kost al snel € 100 tot € 300 per maand; het AI-model zelf kost bij een kleine site maar een paar euro. Sinds 2 augustus 2026 moet je duidelijk maken dat het een AI is, en moet een klant altijd een mens kunnen bereiken.",
    category: "AI voor ondernemers",
    published: "2026-11-06",
    updated: "2026-11-06",
    readMinutes: 8,
    img: "/images/laptop-assistent.webp",
    imgAlt: "Een laptop met een chatvenster van een AI-assistent op het scherm",
    pos: "50% 50%",
    next: { label: "Bekijk wat ik bouw aan AI-oplossingen", href: "/ai-oplossingen" },
    sections: [
      {
        id: "kort-antwoord",
        title: "Het korte antwoord",
        body: (
          <>
            <p>
              Een AI-chatbot op je site leest je eigen informatie, zoals je diensten, prijzen, openingstijden en voorwaarden, en beantwoordt daarmee
              vragen van bezoekers in gewone taal. Een goede chatbot plant ook een afspraak in en zet de vraag door naar jou als hij het antwoord
              niet weet.
            </p>
            <p>
              Het loont als je vaak dezelfde vragen krijgt, of als klanten &apos;s avonds of in het weekend contact zoeken. Krijg je weinig vragen,
              dan is een duidelijke pagina met veelgestelde vragen goedkoper en net zo goed.
            </p>
          </>
        ),
      },
      {
        id: "wat-het-kan",
        title: "Wat een AI-chatbot kan, en wat niet",
        body: (
          <>
            <p>Wat goed gaat:</p>
            <ul>
              <li>Vragen over prijzen, levertijden, openingstijden en werkwijze beantwoorden, ook buiten kantooruren.</li>
              <li>Helpen kiezen: welke behandeling, welk pakket, welke maat.</li>
              <li>Een afspraak of terugbelverzoek inplannen in je agenda.</li>
              <li>Gegevens voor een offerte uitvragen en netjes aan jou doorgeven.</li>
            </ul>
            <p>Wat je niet aan een chatbot overlaat:</p>
            <ul>
              <li>Beloftes over prijzen of afspraken die niet in je informatie staan.</li>
              <li>Klachten en lastige gesprekken: daar wil een klant een mens.</li>
              <li>Medisch, financieel of juridisch advies, tenzij jij de antwoorden vooraf hebt vastgelegd.</li>
            </ul>
          </>
        ),
      },
      {
        id: "wat-het-kost",
        title: "Wat het kost",
        body: (
          <>
            <p>Er zijn grofweg drie manieren, met prijzen zoals ze op 6 november 2026 op de sites van de aanbieders stonden:</p>
            <Scroll label="Wat een AI-chatbot kost">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Soort</th>
                    <th scope="col">Voorbeeld</th>
                    <th scope="col">Kosten</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chatbot-dienst, zelf instellen</td>
                    <td>Chatbase</td>
                    <td>$ 32 tot $ 400 per maand, afhankelijk van het aantal berichten</td>
                  </tr>
                  <tr>
                    <td>Klantenservicepakket met AI</td>
                    <td>Trengo, Watermelon</td>
                    <td>€ 119 tot € 499 per maand, vaak plus € 0,25 tot € 0,50 per AI-gesprek; bij Watermelon € 995 voor de start</td>
                  </tr>
                  <tr>
                    <td>Betalen per opgeloste vraag</td>
                    <td>Intercom Fin</td>
                    <td>$ 0,99 per opgeloste vraag, plus een abonnement</td>
                  </tr>
                  <tr>
                    <td>Op maat gebouwd</td>
                    <td>Een eigen assistent in je site</td>
                    <td>Eenmalig bouwen, daarna de kosten van het AI-model en onderhoud</td>
                  </tr>
                </tbody>
              </table>
            </Scroll>
            <p>
              Het AI-model zelf is het goedkoopste deel. Een rekenvoorbeeld met de prijzen van de kleine modellen van OpenAI en Anthropic: 1.000
              gesprekken per maand komen uit op minder dan een paar euro. De abonnementen betaal je vooral voor het pakket eromheen: het
              chatvenster, het overzicht van gesprekken en de koppelingen.
            </p>
          </>
        ),
      },
      {
        id: "regels",
        title: "Wat de regels zeggen",
        body: (
          <>
            <h3>Zeg dat het een AI is</h3>
            <p>
              Sinds 2 augustus 2026 geldt artikel 50 van de Europese AI-verordening: wie met een AI-systeem praat, moet weten dat het een AI is,
              tenzij dat al overduidelijk is. De uitstelregeling van de EU uit 2026 heeft deze datum niet verschoven. Een naam als
              &ldquo;Assistent&rdquo; met een zinnetje als &ldquo;Ik ben een AI-assistent&rdquo; is genoeg.
            </p>
            <h3>Een mens moet bereikbaar blijven</h3>
            <p>
              De Autoriteit Persoonsgegevens en de ACM schreven in oktober 2025 samen dat een chatbot een mens niet volledig mag vervangen: een
              klant moet altijd met een medewerker kunnen praten, het moet duidelijk zijn dat hij met een bot praat, en de bot mag geen onjuiste,
              ontwijkende of misleidende informatie geven. Dat sluit aan bij wat klanten zelf willen: in een onderzoek van Gartner uit 2026 vond 87%
              een mens als optie onmisbaar.
            </p>
            <h3>Wat je chatbot zegt, zeg jij</h3>
            <p>
              In 2024 moest Air Canada een klant schadeloos stellen omdat de chatbot op de site een verkeerde terugbetalingsregel had genoemd. Het
              argument dat de chatbot een &ldquo;aparte entiteit&rdquo; was, werd van tafel geveegd: een bedrijf is verantwoordelijk voor alle
              informatie op zijn site, ook voor wat de chatbot zegt.
            </p>
            <h3>Privacy</h3>
            <p>
              Gesprekken bevatten vaak persoonsgegevens. Zorg dat duidelijk is wat er met die gesprekken gebeurt, dat de aanbieder de gegevens niet
              gebruikt om modellen te trainen, en dat de bot geen vertrouwelijke informatie kan prijsgeven.
            </p>
          </>
        ),
      },
      {
        id: "goede-chatbot",
        title: "Zo herken je een goede chatbot",
        body: (
          <ol>
            <li><strong>Hij antwoordt alleen uit jouw informatie</strong>, en zegt het eerlijk als hij iets niet weet.</li>
            <li><strong>Hij zet door naar een mens</strong>, met de vraag en de gegevens erbij, zodat de klant niet opnieuw hoeft te beginnen.</li>
            <li><strong>Je kunt de gesprekken teruglezen</strong> en hem bijsturen.</li>
            <li><strong>Hij zegt dat hij een AI is.</strong></li>
            <li><strong>Hij doet iets</strong>: een afspraak inplannen of een aanvraag klaarzetten, niet alleen praten.</li>
          </ol>
        ),
      },
      {
        id: "bij-nxt-frame",
        title: "Hoe ik een assistent bouw",
        body: (
          <p>
            Ik bouw een assistent in je eigen site, die antwoordt uit de informatie die jij hebt goedgekeurd, afspraken in je agenda zet en de vraag
            aan jou doorgeeft als hij het niet weet. Het bouwen betaal je eenmalig; daarna betaal je een klein bedrag per maand voor het AI-model
            en het onderhoud, dat ik vooraf voor je uitreken. Wat er nog meer kan, zie je op <A href="/ai-oplossingen">AI-oplossingen</A>.
          </p>
        ),
      },
    ],
    faq: [
      {
        q: "Wat kost een AI-chatbot voor mijn website?",
        a: "Kant-en-klare pakketten kosten meestal € 30 tot € 500 per maand, soms met een bedrag per gesprek erbij. Het AI-model zelf kost bij een kleine site maar een paar euro per maand; je betaalt vooral voor het pakket eromheen. Een op maat gebouwde assistent betaal je eenmalig, plus een klein bedrag per maand.",
      },
      {
        q: "Moet ik melden dat mijn chatbot een AI is?",
        a: "Ja. Sinds 2 augustus 2026 moet je volgens de Europese AI-verordening duidelijk maken dat iemand met een AI praat, tenzij dat overduidelijk is. Een korte zin in het chatvenster is genoeg.",
      },
      {
        q: "Ben ik aansprakelijk voor wat mijn chatbot zegt?",
        a: "Ja, dat is het uitgangspunt. In de zaak tegen Air Canada (2024) moest het bedrijf een klant schadeloos stellen voor verkeerde informatie van de chatbot. Laat je chatbot daarom alleen antwoorden uit informatie die jij hebt goedgekeurd.",
      },
      {
        q: "Kan een chatbot een medewerker vervangen?",
        a: "Niet helemaal, en dat mag ook niet: de AP en de ACM vinden dat een klant altijd een mens moet kunnen bereiken. Een chatbot neemt de herhalende vragen over, zodat jij tijd hebt voor de gesprekken die ertoe doen.",
      },
      {
        q: "Wanneer loont een chatbot?",
        a: "Als je veel dezelfde vragen krijgt, als klanten buiten kantooruren contact zoeken, of als de chatbot direct iets regelt, zoals een afspraak. Krijg je maar een paar vragen per week, dan is een goede pagina met veelgestelde vragen goedkoper.",
      },
    ],
    sources: [
      { label: "AI-verordening, artikel 50: transparantieverplichtingen", href: "https://artificialintelligenceact.eu/article/50/" },
      { label: "Baker Botts: EU AI Act Article 50 transparency obligations go live (september 2026)", href: "https://www.bakerbotts.com/thought-leadership/publications/2026/september/eu-ai-act-article-50-transparency-obligations-go-live" },
      { label: "AP en ACM: Chatbot mag mens niet volledig vervangen bij klantenservice (2 oktober 2025)", href: "https://www.autoriteitpersoonsgegevens.nl/actueel/ap-en-acm-chatbot-mag-mens-niet-volledig-vervangen-bij-klantenservice" },
      { label: "Moffatt v. Air Canada, 2024 BCCRT 149", href: "https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html" },
      { label: "Gartner: 87% of customers say companies using GenAI for customer service must provide access to a human (4 augustus 2026)", href: "https://www.gartner.com/en/newsroom/press-releases/2026-08-04-gartner-survey-finds-87-percent-of-customers-say-companies-using-genai-for-customer-service-must-provide-access-to-a-human-agent0" },
      { label: "Chatbase: Pricing", href: "https://www.chatbase.co/pricing" },
      { label: "Trengo: Prijzen", href: "https://trengo.com/prices" },
      { label: "Watermelon: Pricing", href: "https://watermelon.ai/pricing" },
      { label: "Intercom: Pricing", href: "https://www.intercom.com/pricing" },
    ],
  },
];
