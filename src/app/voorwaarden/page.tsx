import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

/*
 * DRAFT. These terms are a first version written to match what the site promises (fixed price,
 * no hourly billing, lead times that depend on the client, no ranking guarantees). They are not
 * legal advice: have a lawyer review them before the site goes live.
 *
 * The numbers (quote validity, 50/50 payment, 14-day term, 5 working days to respond, 30 days
 * stalled, 2+1 feedback rounds, 10 working days to approve, 30 days of free fixes, maintenance
 * monthly with 1 month notice and no minimum, CBS indexation, liability cap = amount paid or the
 * last 6 months, 12 months to report, 2 months force majeure, rechtbank Noord-Holland) are common
 * defaults filled in on 6 Nov 2026; Justin can change any of them. VAT number: says it is on every
 * quote and invoice until Justin adds the number itself.
 *
 * Choices of principle (written as a default, change if you want it differently)
 *  - art. 3: extra work is quoted as a fixed amount up front, never billed by the hour afterwards,
 *    because the site says "geen uurtje-factuurtje"
 *  - art. 7: the client gets a perpetual right to use design and code after full payment, and may
 *    have another party work on the site; reusable building blocks stay with NxtFrame. The
 *    alternative is a full transfer of rights, usually at a higher price.
 *  - art. 7: portfolio use is allowed unless the client objects in writing
 *  - art. 8: hosting, domain and third-party accounts are in the client's name where possible
 *  - art. 12: on early termination the client pays for the work done so far; the deposit is set
 *    off against that, not kept on top of it
 *  - art. 13: whether a data processing agreement is offered as a standard document
 *  - art. 1: these terms apply to business clients only; consumers are out of scope
 */

export const metadata: Metadata = {
  title: "Algemene voorwaarden | NxtFrame",
  description:
    "De afspraken die gelden als je een website of webshop laat maken door NxtFrame: prijs en betaling, feedback, oplevering, eigendom, onderhoud en aansprakelijkheid.",
  alternates: { canonical: "/voorwaarden" },
};

const sections: LegalSection[] = [
  {
    id: "wie-en-wanneer",
    title: "Wie ik ben en wanneer dit geldt",
    body: (
      <>
        <p>
          NxtFrame is de eenmanszaak van Justin Streur, gevestigd in Purmerend. Waar hier &quot;ik&quot; staat, bedoel ik NxtFrame. Met &quot;jij&quot; bedoel ik het
          bedrijf of de ondernemer die mij een opdracht geeft.
        </p>
        <ul>
          <li>E-mail: <a href="mailto:hallo@nxtframe.ai">hallo@nxtframe.ai</a></li>
          <li>Website: nxtframe.ai</li>
          <li>KvK-nummer: 42102903</li>
          <li>Btw-nummer: staat op elke offerte en factuur</li>
          <li>Adres: Kanaalkade 15 D, 1441 KC Purmerend</li>
        </ul>
        <p>
          Deze voorwaarden gelden voor elke offerte en elke opdracht: het ontwerpen en bouwen van een website of webshop, en het onderhoud en de
          doorontwikkeling daarna. Ik werk alleen voor ondernemers en organisaties, niet voor consumenten.
        </p>
        <p>
          Spreken we in de offerte iets anders af dan hier staat, dan gaat de offerte voor. Je eigen inkoop- of andere voorwaarden gelden alleen als ik daar schriftelijk
          mee akkoord ben gegaan.
        </p>
      </>
    ),
  },
  {
    id: "offerte-en-opdracht",
    title: "Offerte en opdracht",
    body: (
      <>
        <p>
          De kennismaking is gratis en verplicht je tot niets. De prijzen op de site zijn vanaf-prijzen, bedoeld als richting. Na de kennismaking krijg je een offerte
          met wat ik maak, wat het kost en wanneer het ongeveer klaar is.
        </p>
        <p>
          Een offerte is geldig tot 30 dagen na de offertedatum. De opdracht begint zodra je schriftelijk akkoord
          geeft. Een akkoord per e-mail is genoeg.
        </p>
        <p>Wat niet in de offerte staat, hoort niet bij de opdracht. Twijfel je of iets erin zit, vraag het dan voor je akkoord geeft. Dan zet ik het erbij.</p>
      </>
    ),
  },
  {
    id: "prijs-en-betaling",
    title: "Prijs en betaling",
    body: (
      <>
        <p>
          Je betaalt de vaste prijs uit de offerte voor het werk dat in de offerte staat. Ik reken geen uren achteraf. Alle bedragen zijn in euro en exclusief btw.
        </p>
        <p>
          Ik factureer in delen: 50% bij de start en 50% bij de oplevering. Je betaalt een factuur binnen{" "}
          14 dagen na de factuurdatum.
        </p>
        <p>
          Kosten van derden zitten niet in de prijs, tenzij de offerte dat zegt. Denk aan hosting, een domeinnaam, betaalde lettertypen, stockfoto&apos;s en abonnementen
          op software. Zulke kosten bespreek ik altijd vooraf met je.
        </p>
        <p>
          Betaal je niet op tijd, dan stuur ik eerst een herinnering. Blijft betaling daarna uit, dan mag ik het werk stilleggen tot er betaald is en ben je de
          wettelijke handelsrente en redelijke incassokosten verschuldigd.
        </p>
      </>
    ),
  },
  {
    id: "aanleveren-en-planning",
    title: "Wat jij aanlevert en de planning",
    body: (
      <>
        <p>
          Een site maak ik niet alleen. Ik heb van jou informatie over je bedrijf nodig, toegang tot bestaande accounts, en de teksten, foto&apos;s en het logo die je al
          hebt. Ontbreekt er content, dan spreken we in de offerte af of ik die maak of dat jij die aanlevert.
        </p>
        <p>
          De doorlooptijden op de site en in de offerte zijn een planning, geen harde deadline. Ze gaan ervan uit dat content en feedback op tijd binnenkomen. Een
          verzoek om content of feedback beantwoord je binnen 5 werkdagen.
        </p>
        <p>
          Duurt het langer, dan schuift de planning mee op. Dat kan meer zijn dan de dagen die het wachten duurde, omdat ik in de tussentijd ander werk inplan. Loop ik
          zelf uit, dan laat ik dat op tijd weten en krijg je een nieuwe datum.
        </p>
        <p>
          Ligt het traject langer dan 30 dagen stil omdat ik op jou wacht, dan mag ik het werk dat tot dan toe is gedaan
          factureren. Zodra je weer verder wilt, plannen we het vervolg opnieuw in.
        </p>
        <p>
          Jij staat ervoor in dat je alles wat je aanlevert mag gebruiken: teksten, foto&apos;s, logo&apos;s, lettertypen en gegevens. Krijg ik een claim omdat dat niet zo
          blijkt te zijn, dan komt die voor jouw rekening.
        </p>
      </>
    ),
  },
  {
    id: "feedback-en-meerwerk",
    title: "Feedbackrondes en meerwerk",
    body: (
      <>
        <p>
          Je kijkt mee in het ontwerp en in de bouw. In de prijs zitten 2 feedbackrondes op het ontwerp en 1 ronde op de bouw.
          Een ronde is één verzameld overzicht van je opmerkingen, zodat ik alles in één keer kan verwerken.
        </p>
        <p>
          Meerwerk is alles wat buiten de offerte valt. Bijvoorbeeld extra pagina&apos;s, een extra koppeling, extra feedbackrondes of een nieuwe richting nadat je een
          ontwerp al had goedgekeurd.
        </p>
        <p>
          Meerwerk doe ik pas nadat jij akkoord bent met de prijs. Je krijgt dus vooraf een vast bedrag en een nieuwe planning, geen rekening achteraf. Een fout van mij
          herstellen is nooit meerwerk.
        </p>
      </>
    ),
  },
  {
    id: "oplevering",
    title: "Oplevering en goedkeuring",
    body: (
      <>
        <p>
          Als de site klaar is, krijg je een testversie om na te lopen. Je hebt 10 werkdagen om hem goed te keuren of je
          laatste punten door te geven.
        </p>
        <p>
          Hoor ik in die periode niets, of zet je de site zelf in gebruik, dan geldt hij als goedgekeurd. Kleine punten die het gebruik niet in de weg staan, houden de
          oplevering niet tegen. Die los ik daarna op.
        </p>
        <p>
          De site gaat live zodra hij is goedgekeurd en de facturen tot dat moment zijn betaald. Bij de lancering meld ik de site aan bij Google en Bing.
        </p>
        <p>
          Fouten in mijn werk die je binnen 30 dagen na de lancering meldt, herstel ik zonder kosten. Dat geldt niet voor
          problemen die ontstaan door wijzigingen van jou of van iemand anders, of door een dienst van een derde.
        </p>
      </>
    ),
  },
  {
    id: "eigendom",
    title: "Eigendom en gebruiksrecht",
    body: (
      <>
        <h3>Jouw content</h3>
        <p>Alles wat jij aanlevert, blijft van jou: teksten, foto&apos;s, logo, merk en gegevens. Ik gebruik het alleen voor jouw opdracht.</p>
        <h3>Ontwerp en code</h3>
        <p>
          De rechten op het ontwerp en de code die ik maak, liggen bij mij. Zodra je de opdracht volledig hebt betaald, krijg je het recht om de site onbeperkt en
          zonder einddatum te gebruiken voor je eigen bedrijf. Je mag hem zelf aanpassen of dat door een ander laten doen. Op verzoek krijg je de broncode.
        </p>
        <p>
          Je mag de site niet doorverkopen of als sjabloon aan anderen leveren. Bouwstenen die ik in meer projecten gebruik, zoals eigen componenten en gereedschap,
          mag ik blijven hergebruiken. Wil je de rechten volledig overnemen, dan spreken we dat apart af in de offerte.
        </p>
        <p>Voor software, lettertypen en beeld van derden gelden de licenties van die partijen.</p>
        <h3>Portfolio</h3>
        <p>
          Ik mag het werk laten zien in mijn portfolio en je bedrijfsnaam als klant noemen. Wil je dat niet, laat het me schriftelijk weten, dan doe ik het niet.
          Cijfers over je resultaten deel ik alleen met jouw toestemming.
        </p>
      </>
    ),
  },
  {
    id: "diensten-van-derden",
    title: "Diensten van derden",
    body: (
      <>
        <p>
          Een site draait op diensten van anderen: hosting, een domeinnaam, betaalproviders, boekingssystemen, voorraad- of boekhoudsoftware en andere koppelingen.
          Waar het kan, staan die accounts op jouw naam, zodat jij de eigenaar blijft. De kosten en de voorwaarden van die partijen gelden rechtstreeks tussen jou en
          hen.
        </p>
        <p>
          Ik kies deze diensten met zorg en richt ze goed in. Ik ben niet aansprakelijk voor storingen, prijswijzigingen, gewijzigde voorwaarden of het stoppen van een
          dienst van een derde. Verandert een derde iets waardoor een koppeling aangepast moet worden, dan valt dat onder onderhoud of is het meerwerk.
        </p>
      </>
    ),
  },
  {
    id: "onderhoud",
    title: "Onderhoud en doorontwikkeling",
    body: (
      <>
        <p>
          Teksten, foto&apos;s en pagina&apos;s beheer je na de oplevering zelf. Onderhoud en doorontwikkeling per maand zijn een keuze, geen verplichting. Zonder zo&apos;n
          afspraak houd ik de techniek van je site niet bij en bewaak ik hem niet.
        </p>
        <p>
          Kies je er wel voor, dan staat in de offerte wat er per maand in zit en wat het kost. Het maandbedrag factureer ik vooraf. Je kunt per maand opzeggen met een
          opzegtermijn van 1 maand. Er is geen minimale looptijd.
        </p>
        <p>
          Het maandbedrag mag ik één keer per jaar aanpassen aan de prijsindex van het CBS. Dat laat ik je 2 maanden vooraf weten, zodat je kunt opzeggen als je dat wilt.
        </p>
        <p>Stop je met onderhoud, dan blijft de site gewoon van jou en blijft hij werken. Ik help je met een nette overdracht als je dat wilt.</p>
      </>
    ),
  },
  {
    id: "vindbaarheid",
    title: "Vindbaarheid zonder garantie",
    body: (
      <>
        <p>
          Elke site die ik bouw, richt ik in op vindbaarheid in Google en in AI-zoekmachines zoals ChatGPT. Daar doe ik mijn best voor, met structuur, techniek en
          teksten die daarvoor nodig zijn.
        </p>
        <p>
          Wat ik niet doe, is een resultaat garanderen. Ik beloof geen positie in Google, geen vermelding in ChatGPT of een andere AI-dienst, en geen aantal bezoekers,
          aanvragen of bestellingen. Zoekmachines en AI-diensten bepalen zelf wat ze tonen en veranderen hun werkwijze regelmatig. Ook je concurrenten en je eigen
          content tellen mee.
        </p>
        <p>
          Hetzelfde geldt voor cijfers op de site, zoals laadtijden en resultaten bij andere klanten. Dat zijn voorbeelden, geen toezegging voor jouw site. Spreken we
          een meetbaar doel af, dan staat dat in de offerte.
        </p>
      </>
    ),
  },
  {
    id: "aansprakelijkheid",
    title: "Aansprakelijkheid",
    body: (
      <>
        <p>Ik doe mijn werk zorgvuldig. Gaat er toch iets mis door mijn fout, dan krijg ik eerst de kans om het binnen een redelijke termijn te herstellen.</p>
        <p>
          Lukt dat niet, dan ben ik alleen aansprakelijk voor directe schade, tot maximaal{" "}
          het bedrag dat je voor de opdracht hebt betaald. Bij maandelijks werk is dat het bedrag dat je over de laatste 6 maanden hebt betaald.
          Voor indirecte schade ben ik niet aansprakelijk. Denk aan gemiste omzet, gemiste klanten, verloren gegevens of reputatieschade.
        </p>
        <p>
          Je meldt schade zo snel mogelijk, en in elk geval binnen 12 maanden nadat je haar hebt ontdekt. Deze beperkingen
          gelden niet als de schade komt door opzet of bewuste roekeloosheid van mij.
        </p>
        <p>
          Kan ik door overmacht tijdelijk niet werken, bijvoorbeeld door ziekte of een storing bij een leverancier, dan schuift de planning op zonder dat ik daarvoor
          schade vergoed. Duurt dat langer dan 2 maanden, dan mogen we allebei stoppen. Je betaalt dan alleen het werk dat is gedaan.
        </p>
      </>
    ),
  },
  {
    id: "stoppen",
    title: "Tussentijds stoppen",
    body: (
      <>
        <p>
          Je mag een lopend traject op elk moment schriftelijk stoppen. Je betaalt dan het werk dat tot dat moment is gedaan en de kosten die ik voor jouw opdracht al
          bij derden heb gemaakt. Wat je al hebt betaald, verreken ik daarmee.
        </p>
        <p>
          Ik mag stoppen als je een factuur ondanks een herinnering niet betaalt, als samenwerken niet meer mogelijk is doordat ik niet krijg wat ik nodig heb, of als
          je bedrijf failliet gaat of uitstel van betaling krijgt.
        </p>
        <p>
          Na het stoppen krijg je het werk waarvoor je hebt betaald, in de staat waarin het op dat moment is. Het gebruiksrecht uit artikel 7 geldt voor dat betaalde
          deel.
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    title: "Privacy en vertrouwelijkheid",
    body: (
      <>
        <p>
          Hoe ik met persoonsgegevens omga, lees je in de <Link href="/privacy">privacyverklaring</Link>.
        </p>
        <p>
          Verwerk ik voor jouw site persoonsgegevens van jouw klanten, bijvoorbeeld via een formulier of een koppeling, dan ben jij daarvoor verantwoordelijk en doe ik
          dat in jouw opdracht. We leggen dat vast in een verwerkersovereenkomst.
        </p>
        <p>Wat we over elkaars bedrijf te weten komen en wat duidelijk vertrouwelijk is, houden we allebei voor ons. Ook nadat de opdracht is afgelopen.</p>
      </>
    ),
  },
  {
    id: "recht-en-geschillen",
    title: "Toepasselijk recht en geschillen",
    body: (
      <>
        <p>Op deze voorwaarden en op elke opdracht is Nederlands recht van toepassing.</p>
        <p>
          Ben je ergens niet tevreden over, mail dan naar <a href="mailto:hallo@nxtframe.ai">hallo@nxtframe.ai</a>. Dan zoeken we eerst samen een oplossing. Komen we er
          niet uit, dan leggen we het geschil voor aan{" "}
          de rechtbank Noord-Holland.
        </p>
        <p>
          Ik mag deze voorwaarden aanpassen. Voor een lopende opdracht blijft de versie gelden die bij je akkoord hoorde, tenzij we samen iets anders afspreken. Blijkt
          een bepaling niet geldig, dan blijft de rest gewoon van kracht.
        </p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      eyebrow="Voorwaarden"
      title={<>Heldere afspraken, <span className="serif-italic">in gewone taal</span></>}
      intro="Dit zijn de afspraken die gelden als ik een website of webshop voor je maak. Zo weet je vooraf waar je aan toe bent."
      updated="12 oktober 2026"
      sections={sections}
    />
  );
}
