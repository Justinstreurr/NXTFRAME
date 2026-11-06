import type { ReactNode } from "react";
import { morePosts } from "./blogPostsMore";

/* ---------- Blog: the articles on /blog ----------
   Each article answers one real search question (checked against Google's suggestions when it was
   written) and opens with the short answer, so Google and AI search can quote it. Facts that can
   change (laws, dates) carry a source at the foot of the article. Prices follow pricing.ts.
   Written by Claude from research, to be read and approved by Justin before it goes live. */

export type BlogSection = { id: string; title: string; body: ReactNode };

export type BlogPost = {
  slug: string;
  title: string;
  /** the meta description and the lead under the title: the short answer in one or two sentences */
  description: string;
  category: string;
  /** ISO dates */
  published: string;
  updated: string;
  readMinutes: number;
  img: string;
  imgAlt: string;
  pos?: string;
  sections: BlogSection[];
  faq: { q: string; a: string }[];
  sources?: { label: string; href: string }[];
  /** the service page this article leads to */
  next: { label: string; href: string };
};

/* a wide table scrolls sideways on a phone; the wrapper can take keyboard focus so it can be scrolled without a mouse */
const Scroll = ({ label, children }: { label: string; children: ReactNode }) => (
  <div role="region" aria-label={label} tabIndex={0} className="mt-5 overflow-x-auto">
    {children}
  </div>
);

const A = ({ href, children }: { href: string; children: ReactNode }) => <a href={href}>{children}</a>;

const firstPosts: BlogPost[] = [
  {
    slug: "wat-kost-een-website-laten-maken",
    title: "Wat kost een website laten maken in 2026?",
    description:
      "Een professionele website voor een kleine onderneming kost in 2026 meestal tussen de € 2.000 en € 7.500, plus € 20 tot € 200 per maand voor hosting en onderhoud. Hieronder zie je waar dat verschil vandaan komt, wat een site je over drie jaar echt kost en waar je op let.",
    category: "Website laten maken",
    published: "2026-11-05",
    updated: "2026-11-05",
    readMinutes: 8,
    img: "/images/prijzen-hero.webp",
    imgAlt: "De NxtFrame-mascotte aan een laptop in een café",
    pos: "50% 40%",
    next: { label: "Bekijk wat een website bij mij kost", href: "/prijzen" },
    sections: [
      {
        id: "kort-antwoord",
        title: "Het korte antwoord",
        body: (
          <>
            <p>
              Een website die je zelf in elkaar zet met een sitebouwer kost € 10 tot € 50 per maand. Een eenvoudige site van een freelancer op een
              bestaand thema kost € 750 tot € 2.500. Een site op maat, met teksten, ontwerp en vindbaarheid erbij, kost bij een zelfstandige maker of
              een bureau meestal € 2.500 tot € 10.000. Een webshop of een site met koppelingen begint rond de € 4.500.
            </p>
            <p>
              Daar komen vaste kosten bij: hosting, je domeinnaam en onderhoud. Reken op € 20 tot € 200 per maand, afhankelijk van hoeveel er voor
              je wordt gedaan. Wie alleen naar de bouwprijs kijkt, vergelijkt dus maar de helft.
            </p>
          </>
        ),
      },
      {
        id: "vijf-manieren",
        title: "Vijf manieren om aan een website te komen",
        body: (
          <>
            <p>De prijs hangt vooral af van wie het werk doet. Dit zijn de gangbare bedragen in Nederland, exclusief btw:</p>
            <Scroll label="Vijf manieren en wat ze kosten">
            <table>
              <thead>
                <tr>
                  <th>Manier</th>
                  <th>Eenmalig</th>
                  <th>Per maand</th>
                  <th>Past bij</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Zelf bouwen met een sitebouwer (Wix, Squarespace)</td>
                  <td>€ 0</td>
                  <td>€ 10 tot € 50</td>
                  <td>Starters met tijd en een klein budget</td>
                </tr>
                <tr>
                  <td>Een AI-sitebouwer</td>
                  <td>€ 0</td>
                  <td>€ 5 tot € 50</td>
                  <td>Snel iets online zetten om een idee te testen</td>
                </tr>
                <tr>
                  <td>Freelancer met een bestaand thema</td>
                  <td>€ 750 tot € 2.500</td>
                  <td>€ 10 tot € 50</td>
                  <td>Een visitekaartje dat er netjes uitziet</td>
                </tr>
                <tr>
                  <td>Zelfstandige maker, op maat</td>
                  <td>€ 2.000 tot € 7.500</td>
                  <td>€ 25 tot € 150</td>
                  <td>Een bedrijf dat aanvragen wil uit zijn site</td>
                </tr>
                <tr>
                  <td>Webbureau</td>
                  <td>€ 3.000 tot € 15.000</td>
                  <td>€ 50 tot € 200</td>
                  <td>Grotere sites, meerdere mensen aan tafel</td>
                </tr>
              </tbody>
            </table>
            </Scroll>
            <p>
              Een bureau is niet per se beter dan een zelfstandige, en andersom. Bij een bureau betaal je ook voor projectleiding en overleg tussen
              mensen. Bij een zelfstandige spreek je de maker zelf, maar is er één persoon die het moet kunnen. Vraag in beide gevallen naar werk dat
              lijkt op wat jij nodig hebt.
            </p>
          </>
        ),
      },
      {
        id: "wat-bepaalt-de-prijs",
        title: "Wat bepaalt de prijs?",
        body: (
          <>
            <p>Twee sites van vijf pagina&apos;s kunnen duizenden euro&apos;s schelen. Dat zit bijna altijd in deze punten:</p>
            <ul>
              <li>
                <strong>Teksten.</strong> Schrijf je ze zelf, of worden ze voor je geschreven op de vragen die je klanten echt stellen? Teksten zijn
                vaak het werk dat het langst duurt, en het werk dat het meest bepaalt of een bezoeker contact opneemt.
              </li>
              <li>
                <strong>Ontwerp.</strong> Een bestaand thema met je logo erin is snel klaar. Een ontwerp op maat kost meer tijd, maar past bij je
                bedrijf en is gebouwd rond wat de bezoeker moet doen.
              </li>
              <li>
                <strong>Aantal pagina&apos;s.</strong> Niet elke pagina kost evenveel, maar een pagina per dienst en per werkgebied telt op. Die
                pagina&apos;s zijn wel vaak de pagina&apos;s waarop je gevonden wordt.
              </li>
              <li>
                <strong>Functies en koppelingen.</strong> Online afspraken, een rekentool, een webshop of een koppeling met je boekhouding of
                agenda maken een site duurder, en besparen je daarna werk.
              </li>
              <li>
                <strong>Vindbaarheid.</strong> Een technisch goede basis, snelle pagina&apos;s en een opbouw die Google en AI-zoekmachines kunnen
                lezen. Dat hoort erbij, maar niet elke aanbieder doet het even grondig.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "per-maand-en-per-jaar",
        title: "Wat kost een website per maand en per jaar?",
        body: (
          <>
            <p>Na de lancering lopen er vaste kosten door. Dit zijn de posten:</p>
            <Scroll label="Vaste kosten per maand en per jaar">
            <table>
              <thead>
                <tr>
                  <th>Kostenpost</th>
                  <th>Gangbaar bedrag</th>
                  <th>Wat het is</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Domeinnaam</td>
                  <td>€ 10 tot € 15 per jaar</td>
                  <td>Je adres, zoals jouwbedrijf.nl</td>
                </tr>
                <tr>
                  <td>Hosting</td>
                  <td>€ 5 tot € 50 per maand</td>
                  <td>De plek waar je site draait. Snel en veilig is belangrijker dan goedkoop</td>
                </tr>
                <tr>
                  <td>Onderhoud</td>
                  <td>€ 0 tot € 200 per maand</td>
                  <td>Updates, back-ups, beveiliging en kleine aanpassingen</td>
                </tr>
                <tr>
                  <td>Zakelijke e-mail</td>
                  <td>€ 6 tot € 12 per maand per persoon</td>
                  <td>Mail op je eigen domein, bij Google of Microsoft</td>
                </tr>
                <tr>
                  <td>Licenties</td>
                  <td>€ 0 tot € 40 per maand</td>
                  <td>Betaalde plug-ins of een sitebouwer met abonnement</td>
                </tr>
              </tbody>
            </table>
            </Scroll>
            <p>
              Let bij onderhoud op wat erin zit. &ldquo;Onderhoud&rdquo; kan betekenen dat alleen de software bijgewerkt wordt, maar ook dat je elke
              maand iets mag laten aanpassen. Vraag het na voordat je tekent.
            </p>
          </>
        ),
      },
      {
        id: "rekenvoorbeeld",
        title: "Rekenvoorbeeld: wat kost een site over drie jaar?",
        body: (
          <>
            <p>
              Een eerlijke vergelijking kijkt naar drie jaar, want zo lang gaat een site minstens mee. Een rekenvoorbeeld met gemiddelde bedragen uit
              de tabellen hierboven:
            </p>
            <Scroll label="Rekenvoorbeeld over drie jaar">
            <table>
              <thead>
                <tr>
                  <th>Manier</th>
                  <th>Bouw</th>
                  <th>36 maanden vaste kosten</th>
                  <th>Totaal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sitebouwer, zelf gedaan</td>
                  <td>€ 0</td>
                  <td>36 × € 30 = € 1.080</td>
                  <td>€ 1.080 plus je eigen uren</td>
                </tr>
                <tr>
                  <td>Freelancer, bestaand thema</td>
                  <td>€ 1.500</td>
                  <td>36 × € 30 = € 1.080</td>
                  <td>€ 2.580</td>
                </tr>
                <tr>
                  <td>Op maat, met onderhoud</td>
                  <td>€ 3.500</td>
                  <td>36 × € 75 = € 2.700</td>
                  <td>€ 6.200</td>
                </tr>
              </tbody>
            </table>
            </Scroll>
            <p>
              De goedkoopste optie lijkt dan duidelijk. Maar zet er tegenover wat een site oplevert. Levert een site op maat je één extra klus per
              kwartaal op, dan is het verschil voor de meeste vakmensen en adviseurs binnen een jaar terugverdiend. Levert hij niets op, dan is ook
              € 1.080 te veel. De vraag is dus niet wat een site kost, maar wat hij moet doen.
            </p>
          </>
        ),
      },
      {
        id: "anders-in-2026",
        title: "Wat is er anders in 2026?",
        body: (
          <>
            <h3>Mensen zoeken ook in ChatGPT en in de AI-antwoorden van Google</h3>
            <p>
              Steeds vaker staat bovenaan in Google een samenvatting die door AI is geschreven, en stellen mensen hun vraag direct aan ChatGPT. Die
              antwoorden worden opgebouwd uit sites die duidelijk antwoord geven op een vraag, technisch goed in elkaar zitten en betrouwbaar
              overkomen. Een site die alleen mooi is, komt daar niet in voor. Garanties zijn er niet, maar een goede opbouw vergroot je kans.
            </p>
            <h3>AI-sitebouwers zijn goed genoeg om te beginnen</h3>
            <p>
              Met een AI-sitebouwer heb je in een middag een site die er redelijk uitziet. Voor een starter die een idee wil testen is dat prima.
              Waar ze tekortschieten: teksten die op elke site lijken, weinig eigen gezicht en weinig controle over hoe je gevonden wordt. Zodra je
              site klanten moet opleveren, loont maatwerk.
            </p>
            <h3>Toegankelijkheid telt mee</h3>
            <p>
              Sinds 28 juni 2025 geldt de Europese toegankelijkheidswet voor onder meer webshops die aan consumenten verkopen. Micro-ondernemingen,
              met minder dan tien mensen en een jaaromzet of balanstotaal tot € 2 miljoen, zijn voor diensten uitgezonderd. Ook als het voor jou niet verplicht is, is een
              toegankelijke site gewoon prettiger voor iedereen: grote knoppen, goed contrast, duidelijke taal.
            </p>
            <h3>Snelheid op de telefoon</h3>
            <p>
              De meeste bezoekers komen via hun telefoon, vaak op 4G. Een site die traag laadt, verliest ze voordat ze iets gelezen hebben. Vraag
              een aanbieder naar de laadtijd van sites die hij al gebouwd heeft, en test die zelf op je telefoon.
            </p>
          </>
        ),
      },
      {
        id: "waar-let-je-op",
        title: "Zes vragen voordat je tekent",
        body: (
          <ol>
            <li>
              <strong>Is de prijs vast, of rekent de maker in uren?</strong> Bij uren weet je pas achteraf wat het kost.
            </li>
            <li>
              <strong>Wie schrijft de teksten?</strong> Moet jij ze aanleveren, dan ligt het grootste werk alsnog bij jou.
            </li>
            <li>
              <strong>Van wie is de site straks?</strong> Kun je verhuizen naar een andere partij, met je domein en je inhoud?
            </li>
            <li>
              <strong>Wat zit er in het onderhoud?</strong> Alleen updates, of ook aanpassingen en hulp?
            </li>
            <li>
              <strong>Kun je zelf dingen aanpassen?</strong> Een openingstijd of een nieuw project wil je niet hoeven aanvragen.
            </li>
            <li>
              <strong>Wat gebeurt er met je oude site?</strong> Bij een nieuwe site moeten de oude adressen doorverwijzen, anders verlies je wat je
              in Google had opgebouwd.
            </li>
          </ol>
        ),
      },
      {
        id: "bij-nxt-frame",
        title: "Wat een website bij mij kost",
        body: (
          <>
            <p>
              Ik ben Justin Streur en ik bouw websites als zelfstandige maker. Een complete website begint bij mij bij € 2.500, een grotere site of een
              webshop bij € 4.500, en maatwerk op offerte, allemaal exclusief btw. Teksten, ontwerp, bouw en een goede basis voor Google en
              AI-zoekmachines zitten erin. Na een kennismaking van een half uur krijg je één vaste prijs, zodat je vooraf weet waar je aan toe bent.
            </p>
            <p>
              Alle bedragen en wat erbij hoort staan op de pagina <A href="/prijzen">prijzen</A>.
            </p>
          </>
        ),
      },
    ],
    faq: [
      {
        q: "Wat kost een website gemiddeld?",
        a: "Een professionele website voor een kleine onderneming kost gemiddeld € 2.000 tot € 7.500 om te laten maken, plus € 20 tot € 200 per maand voor hosting en onderhoud. Een site die je zelf bouwt met een sitebouwer kost € 10 tot € 50 per maand.",
      },
      {
        q: "Wat kost een website per maand?",
        a: "Reken op € 5 tot € 50 per maand voor hosting en € 0 tot € 200 voor onderhoud, afhankelijk van wat erin zit. Daarnaast betaal je € 10 tot € 15 per jaar voor je domeinnaam.",
      },
      {
        q: "Kan ik een website laten maken door AI?",
        a: "Ja, met een AI-sitebouwer heb je snel een site. Dat is goed om een idee te testen. Voor een site die klanten moet opleveren zijn de teksten vaak te algemeen en heb je weinig invloed op hoe je gevonden wordt.",
      },
      {
        q: "Wat kost een website voor een zzp'er?",
        a: "Een zzp'er heeft meestal genoeg aan een site van vier tot acht pagina's. Bij een freelancer op een bestaand thema betaal je € 750 tot € 2.500, op maat met teksten erbij € 2.000 tot € 5.000.",
      },
      {
        q: "Waarom verschillen de prijzen zo veel?",
        a: "Vooral door wat er voor je gedaan wordt: wie de teksten schrijft, of het ontwerp op maat is, hoeveel pagina's er zijn en of er koppelingen of een webshop bij komen.",
      },
    ],
    sources: [
      { label: "EUR-Lex: Richtlijn (EU) 2019/882, de Europese toegankelijkheidswet", href: "https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=CELEX:32019L0882" },
      { label: "Google: Creating helpful, reliable, people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    ],
  },

  {
    slug: "offertes-en-facturen-automatiseren-bouw-en-installatie",
    title: "Offertes en facturen automatiseren als installateur of aannemer",
    description:
      "Je kunt het opzoek- en rekenwerk van offertes en facturen laten doen door een tool, zodat jij alleen nog nakijkt en verstuurt. Dit lees je: wat er al kan, waar ChatGPT tekortschiet, wat er op een factuur moet (ook bij btw verlegd) en wat de verplichte e-factuur vanaf 2030 voor je betekent.",
    category: "Bouw en installatie",
    published: "2026-11-05",
    updated: "2026-11-05",
    readMinutes: 9,
    img: "/images/bouw-mascotte.webp",
    imgAlt: "De NxtFrame-mascotte met een tablet op een bouwplaats, tussen getekende vakmensen aan het werk",
    pos: "45% 55%",
    next: { label: "Bekijk de website voor bouw en installatie", href: "/bouw-en-installatie-website" },
    sections: [
      {
        id: "kort-antwoord",
        title: "Het korte antwoord",
        body: (
          <>
            <p>
              Een offerte maken kost je geen uren omdat het moeilijk is, maar omdat je alles moet opzoeken: de maten, de materialen, je prijzen, de
              gegevens van de klant. Dat opzoek- en rekenwerk kan een tool voor je doen. Hij zet een concept klaar, jij kijkt het na, past aan wat
              afwijkt en verstuurt het. Na akkoord gaat het net zo met de factuur.
            </p>
            <p>
              Volledig automatisch versturen, zonder dat jij ernaar kijkt, raad ik niet aan. Een verkeerde prijs of een vergeten post staat dan op
              papier bij de klant, en jij bent verantwoordelijk voor wat er op je factuur staat.
            </p>
          </>
        ),
      },
      {
        id: "waar-de-tijd-zit",
        title: "Waar de tijd nu in zit",
        body: (
          <>
            <p>Bij de meeste vakmensen ziet een offerte er ongeveer zo uit:</p>
            <ol>
              <li>Een klant belt of mailt, vaak terwijl jij op de klus staat.</li>
              <li>Je rijdt langs om in te meten, of vraagt om foto&apos;s.</li>
              <li>&apos;s Avonds zoek je de prijzen van materialen op en reken je uren uit.</li>
              <li>Je zet het in Word, Excel of je boekhoudpakket en mailt het.</li>
              <li>Je hoort niets, en vergeet na te bellen.</li>
              <li>Na de klus maak je de factuur, en neem je alles nog een keer over.</li>
            </ol>
            <p>
              Stap 2 tot en met 6 zijn grotendeels opzoeken, overtypen en onthouden. Precies het werk dat een computer beter doet dan jij om tien uur
              &apos;s avonds.
            </p>
          </>
        ),
      },
      {
        id: "drie-manieren",
        title: "Drie manieren om het sneller te doen",
        body: (
          <>
            <h3>1. Je boekhoudpakket of een offerteprogramma</h3>
            <p>
              De meeste boekhoudpakketten kunnen ook offertes maken, en er zijn programma&apos;s speciaal voor de bouw en installatie, met
              artikellijsten en calculatie. Je zet je producten en tarieven er één keer in, en daarna stel je een offerte samen uit vaste regels.
              Een akkoord zet je met één klik om in een factuur.
            </p>
            <p>
              Goed als je veel vergelijkbare klussen doet. Het opzoekwerk doe je nog wel zelf: het programma weet niet wat de klant via je site heeft
              gevraagd.
            </p>
            <h3>2. ChatGPT of een andere AI-assistent</h3>
            <p>
              Met ChatGPT schrijf je snel een nette offertetekst of een begeleidende mail. Maar het kent jouw prijzen niet, weet niet wat je
              leverancier rekent en kan zich zelfverzekerd vergissen in een berekening. Gebruik het voor de tekst, niet voor de bedragen, en plak
              geen klantgegevens in een gratis account.
            </p>
            <h3>3. Een hulpmiddel dat aan je site en je pakket gekoppeld is</h3>
            <p>
              Dit is de stap verder, en het werkt zo. De klant vraagt een offerte aan op je site. Het hulpmiddel zoekt je vaste prijzen en
              materialen erbij, rekent het uit en zet een concept klaar in je eigen huisstijl. Jij krijgt een melding, kijkt het na, past aan wat
              anders is en verstuurt. Zegt de klant ja, dan maak je er met één klik een factuur van, en na jouw controle gaat die naar je
              boekhouding.
            </p>
            <p>
              Hier verdwijnt het meeste werk, omdat ook het opzoeken en het overtypen wegvallen. Het werkt het best voor standaardklussen: een
              cv-ketel, een badkamer, een dakkapel, een laadpaal. Voor een complete verbouwing blijf je zelf rekenen, met de tool als hulp.
            </p>
          </>
        ),
      },
      {
        id: "zelf-nakijken",
        title: "Waarom je altijd zelf nakijkt",
        body: (
          <>
            <p>Een tool die alles klaarzet, maakt je sneller. Een tool die alles zelf verstuurt, maakt je kwetsbaar. Drie redenen:</p>
            <ul>
              <li>
                <strong>Elke klus wijkt ergens af.</strong> Een lastige meterkast, een schuin dak, een klant die al materiaal heeft. Dat ziet een tool
                niet altijd.
              </li>
              <li>
                <strong>Een offerte is een belofte.</strong> Zegt de klant ja op een te lage prijs, dan zit je eraan vast.
              </li>
              <li>
                <strong>Jij bent verantwoordelijk voor je factuur.</strong> Een verkeerd btw-tarief of een vergeten btw-nummer is jouw probleem bij de
                Belastingdienst, niet dat van de software.
              </li>
            </ul>
            <p>Nakijken kost een paar minuten per offerte. Uitzoeken en opstellen kostte je een uur.</p>
          </>
        ),
      },
      {
        id: "wat-op-een-factuur",
        title: "Wat moet er op een factuur?",
        body: (
          <>
            <p>Of je de factuur nu zelf maakt of laat klaarzetten, deze gegevens moeten erop:</p>
            <ul>
              <li>Je naam en adres, en die van je klant</li>
              <li>Je btw-identificatienummer en je KvK-nummer</li>
              <li>De factuurdatum en een uniek, doorlopend factuurnummer</li>
              <li>Wat je hebt geleverd of gedaan, en wanneer</li>
              <li>Het bedrag exclusief btw, het btw-tarief en het btw-bedrag</li>
            </ul>
            <h3>Btw verlegd bij onderaanneming</h3>
            <p>
              Werk je als onderaannemer in de bouw voor een andere aannemer? Dan geldt meestal de verleggingsregeling. Je rekent dan geen btw, maar
              zet op de factuur &ldquo;btw verlegd&rdquo; en het btw-identificatienummer van je opdrachtgever. Het bedrag vermeld je per btw-tarief,
              zoals het zou zijn zonder verlegging. Jij blijft verantwoordelijk voor de juiste toepassing. Een goede tool vraagt bij elke klus of het
              voor een particulier of een aannemer is, en zet de juiste vermelding erop.
            </p>
            <p>
              Dit is een samenvatting en geen fiscaal advies. Twijfel je, kijk dan op de site van de Belastingdienst of vraag het je boekhouder.
            </p>
          </>
        ),
      },
      {
        id: "e-facturatie-2030",
        title: "E-facturatie wordt verplicht: wat betekent dat?",
        body: (
          <>
            <p>
              Het kabinet wil e-facturatie per 1 juli 2030 verplicht maken voor facturen tussen bedrijven, ook binnen Nederland. Een pdf in de mail
              telt dan niet meer: de factuur moet in een vast digitaal formaat worden verstuurd, zodat het systeem van de ontvanger hem automatisch kan
              inlezen. Per 1 juli 2031 komt daar een digitale rapportage aan de Belastingdienst bij.
            </p>
            <p>
              Het wetsvoorstel wordt nog uitgewerkt en gaat naar verwachting voor de zomer van 2027 naar de Tweede Kamer. Ondernemers in de
              kleineondernemersregeling (KOR) zijn uitgezonderd. Facturen aan particulieren vallen er niet onder.
            </p>
            <p>
              Werk je veel voor aannemers of andere bedrijven, kies dan nu al een manier van factureren die straks e-facturen aankan. Met een
              boekhoudpakket dat dit ondersteunt, of een hulpmiddel dat de factuur in zo&apos;n pakket klaarzet, hoef je in 2030 niets om te gooien.
            </p>
          </>
        ),
      },
      {
        id: "waar-begin-je",
        title: "Waar begin je?",
        body: (
          <ol>
            <li>
              <strong>Kies je drie meest voorkomende klussen.</strong> Daar zit de meeste herhaling, dus daar levert het meteen iets op.
            </li>
            <li>
              <strong>Zet je prijzen op een rij.</strong> Uurtarief, voorrijkosten, vaste posten en de materialen die je standaard gebruikt.
            </li>
            <li>
              <strong>Laat de klant het werk doen bij de aanvraag.</strong> Een formulier met de juiste vragen scheelt je bellen. Laat de klant er
              ook een paar foto&apos;s bij doen, van de oude badkamer of de meterkast: dan zie jij vooraf waar je aan begint en rijd je minder vaak
              voor niets langs.
            </li>
            <li>
              <strong>Koppel het aan wat je al gebruikt.</strong> Je boekhoudpakket blijft, de tool zet er alleen dingen in klaar.
            </li>
            <li>
              <strong>Kijk elke offerte na voordat hij weggaat.</strong> Na een paar weken weet je precies waar de tool goed in is, en waar jij nog
              moet bijsturen.
            </li>
          </ol>
        ),
      },
      {
        id: "bij-nxt-frame",
        title: "Hoe ik dit bouw",
        body: (
          <>
            <p>
              Ik ben Justin Streur en ik bouw websites voor bouw- en installatiebedrijven, met een simpel offerteformulier erin. Daar bouw ik
              dit hulpmiddel bij: het zoekt je prijzen en materialen op, zet de offerte en na akkoord de factuur klaar, en jij kijkt het na voordat het
              de deur uitgaat. Werk je met een boekhoudpakket, dan koppel ik het eraan.
            </p>
            <p>
              Hoe dat er op een site uitziet, zie je op de pagina <A href="/bouw-en-installatie-website">website voor bouw en installatie</A>.
            </p>
          </>
        ),
      },
    ],
    faq: [
      {
        q: "Kan ik ChatGPT mijn offertes laten maken?",
        a: "Voor de tekst wel, voor de bedragen niet. ChatGPT kent je prijzen niet en kan zich vergissen in berekeningen. Gebruik het om een nette tekst of mail te schrijven, en zet de bedragen er zelf in of laat een tool ze uit je eigen prijslijst halen.",
      },
      {
        q: "Gaan offertes en facturen dan vanzelf naar de klant?",
        a: "Dat kan technisch, maar ik raad het af. Laat een tool het opzoeken en opstellen doen, en kijk zelf na voordat iets verstuurd wordt. Dat kost een paar minuten en voorkomt een te lage prijs of een fout op je factuur.",
      },
      {
        q: "Wat zet ik op een factuur met btw verlegd?",
        a: "Je rekent geen btw, zet 'btw verlegd' op de factuur en vermeldt het btw-identificatienummer van je opdrachtgever. Het bedrag vermeld je per btw-tarief, zoals het zonder verlegging zou zijn.",
      },
      {
        q: "Wordt e-facturatie verplicht voor mijn bedrijf?",
        a: "Het kabinet wil e-facturatie per 1 juli 2030 verplicht maken voor facturen tussen bedrijven, ook binnen Nederland. Ondernemers in de kleineondernemersregeling zijn uitgezonderd, en facturen aan particulieren vallen er niet onder. Het wetsvoorstel wordt nog uitgewerkt.",
      },
      {
        q: "Wat is het verschil tussen offertesoftware en een boekhoudpakket?",
        a: "Een boekhoudpakket maakt offertes en facturen uit regels die je zelf invult. Offertesoftware voor de bouw heeft vaak artikellijsten en calculatie. Een gekoppeld hulpmiddel gaat een stap verder: het leest de aanvraag van je klant en zet de offerte voor je klaar in het pakket dat je al hebt.",
      },
    ],
    sources: [
      {
        label: "Rijksoverheid: Kabinet kiest voor invoering e-facturatie en rapportage voor bedrijven (11 september 2026)",
        href: "https://www.rijksoverheid.nl/actueel/nieuws/2026/09/11/kabinet-kiest-voor-invoering-e-facturatie-en-rapportage-voor-bedrijven",
      },
      {
        label: "Belastingdienst: Hoe werkt btw verleggen?",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/waarover_btw_berekenen/verleggingsregeling/hoe_werkt_btw_verleggen",
      },
      {
        label: "Belastingdienst: Verlegging bij onderaanneming en personeel uitlenen",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/waarover_btw_berekenen/verleggingsregeling/wanneer_btw_verleggen/bij_onderaanneming_en_personeel_uitlenen/verlegging_bij_onderaanneming_en_personeel_uitlenen",
      },
    ],
  },
];

/** every article; the hub sorts them by date */
export const posts: BlogPost[] = [...firstPosts, ...morePosts];

export const postHref = (p: BlogPost) => `/blog/${p.slug}`;

/** "5 november 2026" */
export const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
