import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

/*
 * TO FILL IN OR CONFIRM BEFORE GOING LIVE (search this file for "[INVULLEN"):
 *
 * Missing facts, marked in the text:
 *  - KvK number: filled in (42102903)            (section "wie")
 *  - business / postal address                   (section "wie")
 *  - hosting provider of nxtframe.ai, where it stores data and how long it keeps
 *    server logs                                 (sections "gegevens", "delen", "bewaren")
 *  - service behind the contact form and/or scheduler on /contact
 *                                                (section "delen")
 *  - e-mail provider behind hallo@nxtframe.ai    (section "delen")
 *  - invoicing / bookkeeping software or bookkeeper, if any
 *                                                (section "delen")
 *
 * Proposed, to be confirmed by Justin:
 *  - retention of requests that do not become a project: 12 months after last contact
 *  - retention of project correspondence: 2 years after the project ends
 *  - (7 years for invoices and bookkeeping is the statutory tax retention period, not a proposal)
 *  - reply to privacy requests "within a month" is the legal maximum; fine unless he wants shorter
 *  - the statement that data leaving the EEA is covered by standard contractual clauses:
 *    check against the processors once they are chosen
 *  - the promise to sign a data processing agreement with every processor
 *
 * Keep in sync with the code:
 *  - the form fields in the table mirror src/components/ContactForm.tsx (naam, e-mail, telefoon,
 *    website, onderwerp, bericht); adjust the table if the form changes
 *  - the form mails through the service set up in src/app/contact/actions.ts (Resend, once its key
 *    is configured): name that service under "Contactformulier" below when it is live
 *  - "no cookies, own cookieless analytics (components/Tracker.tsx) plus Vercel Speed Insights (layout.tsx), no third-party trackers" is true for the code as of 30 October 2026; rewrite the
 *    section "cookies" (and add a consent banner where needed) the moment analytics, a pixel, an
 *    embedded scheduler or any other third-party script is added
 *  - `updated` below
 */

export const metadata: Metadata = {
  title: "Privacyverklaring | NXT Frame",
  description:
    "Welke gegevens NXT Frame van je verwerkt, waarvoor en hoe lang. Geen cookies, geen verkoop van gegevens, en je kunt altijd vragen om inzage of verwijdering.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    id: "wie",
    title: "Wie ik ben",
    body: (
      <>
        <p>
          NXT Frame is het bedrijf van Justin Streur. Ik werk alleen, dus ik ben ook zelf verantwoordelijk voor wat er met je gegevens gebeurt. Er is geen
          aparte functionaris gegevensbescherming: met een vraag over privacy kom je direct bij mij uit.
        </p>
        <ul>
          <li>
            <strong>Bedrijf:</strong> NXT Frame, Justin Streur
          </li>
          <li>
            <strong>E-mail:</strong> <a href="mailto:hallo@nxtframe.ai">hallo@nxtframe.ai</a>
          </li>
          <li>
            <strong>Website:</strong> nxtframe.ai
          </li>
          <li>
            <strong>Adres:</strong> Kanaalkade 15 D, 1441 KC Purmerend
          </li>
          <li>
            <strong>KvK:</strong> 42102903
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "gegevens",
    title: "Welke gegevens en waarvoor",
    body: (
      <>
        <p>
          Ik verwerk alleen wat nodig is om je te antwoorden en om mijn werk voor je te doen. Je kunt de hele site bekijken zonder iets in te vullen of een
          account aan te maken.
        </p>
        {/* scrolls sideways on phones, so it takes keyboard focus to be scrolled with the arrow keys */}
        <table tabIndex={0}>
          <thead>
            <tr>
              <th>Gegeven</th>
              <th>Doel</th>
              <th>Grondslag</th>
              <th>Bewaartermijn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Naam, e-mailadres, je bericht en, als je ze invult, je telefoonnummer, je huidige website en het soort project, als je het contactformulier invult of mij mailt</td>
              <td>Reageren op je aanvraag en een kennismaking inplannen</td>
              <td>Jouw verzoek, als stap naar een mogelijke opdracht</td>
              <td>Tot 12 maanden na ons laatste contact, als er geen opdracht uit komt</td>
            </tr>
            <tr>
              <td>Contactgegevens en alles wat je mij voor een project aanlevert</td>
              <td>De opdracht uitvoeren en met je overleggen</td>
              <td>Uitvoering van onze overeenkomst</td>
              <td>Tot 2 jaar na afloop van het project</td>
            </tr>
            <tr>
              <td>Bedrijfsnaam, factuuradres en betaalgegevens</td>
              <td>Factureren en mijn boekhouding voeren</td>
              <td>Wettelijke verplichting</td>
              <td>7 jaar, de fiscale bewaarplicht</td>
            </tr>
            <tr>
              <td>Bezoekstatistieken: welke pagina&apos;s je bekijkt, hoe lang, hoe ver je scrolt, waarop je klikt, waar je vandaan kwam, het soort apparaat en browser en het land. Gekoppeld aan een anonieme code die elke dag verandert, niet aan je naam of IP-adres</td>
              <td>Zien welke pagina&apos;s werken en de site verbeteren</td>
              <td>Gerechtvaardigd belang: een site die bezoekers helpt</td>
              <td>13 maanden, daarna automatisch verwijderd</td>
            </tr>
            <tr>
              <td>Laadsnelheid: hoe snel een pagina bij je verschijnt en reageert, met de pagina, het soort apparaat en browser en het land. Niet gekoppeld aan je naam of IP-adres</td>
              <td>Zien of de site bij echte bezoekers snel is, en dat verbeteren</td>
              <td>Gerechtvaardigd belang: een snelle site</td>
              <td>[INVULLEN: bewaartermijn Vercel Speed Insights]</td>
            </tr>
            <tr>
              <td>IP-adres, tijdstip en opgevraagde pagina in de serverlogs</td>
              <td>De site afleveren, storingen oplossen en misbruik tegengaan</td>
              <td>Gerechtvaardigd belang: een veilige, werkende site</td>
              <td>[INVULLEN: bewaartermijn serverlogs van de hostingpartij]</td>
            </tr>
          </tbody>
        </table>
        <p>
          Die laatste regel geldt voor elke website: zonder je IP-adres kan een server je geen pagina sturen. Ik gebruik die logs niet om je te volgen of te
          herkennen.
        </p>
        <p>
          Ik vraag niet om bijzondere persoonsgegevens, zoals gegevens over je gezondheid. Zet die dus ook niet in je bericht. Ik neem geen besluiten op basis
          van geautomatiseerde verwerking en ik maak geen profielen.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies en statistieken",
    body: (
      <>
        <p>Deze site plaatst geen cookies en slaat niets op in je browser. Daarom zie je ook geen cookiemelding.</p>
        <ul>
          <li>
            Ik meet wel hoe de site gebruikt wordt, met een eigen meting zonder cookies: welke pagina&apos;s bekeken worden, hoe lang, en waarop geklikt wordt.
            Je IP-adres wordt daarvoor niet opgeslagen. Er wordt alleen een code van gemaakt die elke dag verandert, zodat ik bezoekers niet van dag tot dag
            kan volgen en niet kan zien wie je bent. Er gaat niets naar Google of andere partijen.
          </li>
          <li>
            Ook meet ik hoe snel de pagina&apos;s bij bezoekers laden, met Speed Insights van Vercel, de partij die de site host. Ook zonder cookies: het
            gaat om laadtijden per pagina, apparaatsoort en land, niet om wie je bent.
          </li>
          <li>Staat <em>Do Not Track</em> of <em>Global Privacy Control</em> aan in je browser? Dan meet ik je bezoek helemaal niet.</li>
          <li>Geen advertentiepixels of trackers van sociale media.</li>
          <li>Geen ingesloten video&apos;s of kaarten van andere partijen. Beeld en video komen van de site zelf.</li>
          <li>De lettertypen staan op de eigen server. Je browser haalt dus niets op bij Google.</li>
        </ul>
        <p>
          Verandert dit, bijvoorbeeld omdat ik een afsprakenplanner van een andere partij inbouw? Dan pas ik deze pagina eerst aan. Waar
          de wet om toestemming vraagt, vraag ik die vooraf.
        </p>
        <p>
          Op de site staan links naar sites van klanten en naar concepten die ik heb gebouwd. Klik je daarop, dan gelden de regels van die site, niet deze
          verklaring.
        </p>
      </>
    ),
  },
  {
    id: "delen",
    title: "Met wie ik gegevens deel",
    body: (
      <>
        <p>Ik verkoop je gegevens niet en ik geef ze niet door voor reclame van anderen.</p>
        <p>Wel werk ik met een paar leveranciers die gegevens voor mij verwerken. Zij mogen daar zelf niets anders mee doen:</p>
        <ul>
          <li>
            <strong>Hosting van deze site:</strong> Vercel Inc. (Verenigde Staten). De site draait op hun servers in Frankfurt (Duitsland) en wordt geleverd via hun wereldwijde netwerk. Voor gegevens die buiten de EU komen, gebruikt Vercel de standaardcontractbepalingen van de Europese Commissie. Vercel meet ook de laadsnelheid (Speed Insights)
          </li>
          <li>
            <strong>Contactformulier:</strong> Resend verstuurt je aanvraag naar mijn mailbox (servers in Ierland)
          </li>
          <li>
            <strong>Opslag van aanvragen, projectgegevens en bezoekstatistieken:</strong> Supabase [INVULLEN: regio van het Supabase-project]
          </li>
          <li>
            <strong>E-mail:</strong> Google Workspace (Google Ireland Limited)
          </li>
          <li>
            <strong>Facturen en boekhouding:</strong> [INVULLEN: boekhoudprogramma of boekhouder]
          </li>
        </ul>
        <p>
          Met elke leverancier die persoonsgegevens voor mij verwerkt, sluit ik een verwerkersovereenkomst. Staan gegevens bij een leverancier buiten de
          Europese Economische Ruimte, dan gebeurt dat alleen met de waarborgen die de AVG daarvoor eist, zoals de modelcontracten van de Europese Commissie.
        </p>
        <p>Verder deel ik gegevens alleen als de wet mij daartoe verplicht, bijvoorbeeld met de Belastingdienst.</p>
      </>
    ),
  },
  {
    id: "bewaren",
    title: "Hoe lang ik gegevens bewaar",
    body: (
      <>
        <p>Niet langer dan nodig voor het doel waarvoor je ze gaf:</p>
        <ul>
          <li>
            <strong>Aanvragen zonder opdracht:</strong> tot 12 maanden na ons laatste contact. Daarna verwijder ik ze.
          </li>
          <li>
            <strong>Projectgegevens en correspondentie:</strong> tot 2 jaar na afloop van het project, zodat ik je bij vragen of een vervolg kan helpen.
          </li>
          <li>
            <strong>Facturen en boekhouding:</strong> 7 jaar. Dat moet van de Belastingdienst.
          </li>
          <li>
            <strong>Bezoekstatistieken:</strong> 13 maanden. Oudere metingen worden automatisch verwijderd.
          </li>
          <li>
            <strong>Serverlogs:</strong> [INVULLEN: bewaartermijn serverlogs van de hostingpartij]
          </li>
        </ul>
        <p>Wil je dat ik iets eerder verwijder? Mail mij. Ik doe dat, tenzij de wet mij verplicht het te bewaren.</p>
      </>
    ),
  },
  {
    id: "beveiliging",
    title: "Beveiliging",
    body: (
      <>
        <p>Ik ga zorgvuldig met je gegevens om en neem maatregelen die passen bij een klein bedrijf:</p>
        <ul>
          <li>De site werkt alleen over een versleutelde verbinding (https).</li>
          <li>Alleen ik heb toegang tot je gegevens.</li>
          <li>Mijn accounts zijn beveiligd met sterke, unieke wachtwoorden en waar het kan met tweestapsverificatie.</li>
          <li>Ik bewaar zo weinig mogelijk, en wat ik niet heb, kan ook niet lekken.</li>
        </ul>
        <p>
          Gaat er toch iets mis en loopt jouw privacy daardoor risico? Dan laat ik je dat zo snel mogelijk weten en meld ik het waar nodig bij de Autoriteit
          Persoonsgegevens.
        </p>
      </>
    ),
  },
  {
    id: "rechten",
    title: "Jouw rechten",
    body: (
      <>
        <p>Het blijven jouw gegevens. Je mag mij altijd vragen om:</p>
        <ul>
          <li>
            <strong>Inzage:</strong> zien welke gegevens ik van je heb.
          </li>
          <li>
            <strong>Correctie:</strong> gegevens laten aanpassen die niet kloppen.
          </li>
          <li>
            <strong>Verwijdering:</strong> je gegevens laten wissen.
          </li>
          <li>
            <strong>Bezwaar of beperking:</strong> mij vragen te stoppen met een bepaald gebruik, of dat tijdelijk stil te zetten.
          </li>
          <li>
            <strong>Overdracht:</strong> je gegevens meekrijgen in een gangbaar bestand.
          </li>
        </ul>
        <p>
          Mail je verzoek naar <a href="mailto:hallo@nxtframe.ai">hallo@nxtframe.ai</a>. Je krijgt binnen een maand antwoord en het kost je niets. Soms vraag ik
          eerst om te bevestigen dat jij het bent, zodat ik geen gegevens naar de verkeerde persoon stuur.
        </p>
        <p>
          Ben je het niet eens met hoe ik met je gegevens omga? Laat het mij weten, dan los ik het graag met je op. Je mag ook altijd een klacht indienen bij
          de{" "}
          <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
            Autoriteit Persoonsgegevens
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "wijzigingen",
    title: "Wijzigingen",
    body: (
      <>
        <p>
          Verandert de site of mijn manier van werken, dan pas ik deze verklaring aan. De datum bij &quot;Laatst bijgewerkt&quot; laat zien wanneer dat voor het
          laatst is gebeurd. Bij een grote wijziging die jou raakt, laat ik het je weten als ik je contactgegevens heb.
        </p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title={
        <>
          Jouw gegevens, <span className="serif-italic">zo min mogelijk</span>
        </>
      }
      intro="Ik verzamel zo weinig mogelijk en gebruik het alleen om je te antwoorden en mijn werk te doen. Hier lees je precies wat, waarom en hoe lang."
      updated="29 oktober 2026"
      sections={sections}
    />
  );
}
