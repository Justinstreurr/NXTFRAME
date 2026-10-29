import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui";
import HypotheekhavenKit from "@/components/HypotheekhavenKit";
import CaseBgShift, { BgMark } from "@/components/CaseBgShift";
import { Parallax } from "@/components/CaseDarkFx";
import {
  CaseDarkDevices, CaseDarkField, CaseDarkHero, CaseDarkIntro, CaseDarkMonitor, CaseDarkNote, CaseDarkOthers,
  CaseDarkPhoto, CaseDarkResult, CaseDarkRoles, CaseDarkStatement, CaseDarkTitle,
} from "@/components/CaseDark";

export const metadata = {
  title: "Hypotheekhaven case | NXT Frame",
  alternates: { canonical: "/werk/hypotheekhaven" },
  description: "Hoe ik voor hypotheekadviseur Sabrina van Hypotheekhaven een website met rekentools bouwde. Een case van NXT Frame.",
};

/* The Hypotheekhaven case, in the layout of CaseDark (after Instrument's Nike case), the same run of
   grounds as Happy Flops: black, forest green, cream, black and lime to the end. No large photos of
   Sabrina (her wish). PLACEHOLDERS: the texts are a first version for Sabrina to check. */

const img = (n: string) => `/images/cases/hypotheekhaven/${n}.webp`;

export default function Page() {
  return (
    <>
      <Nav theme="photo" />
      <CaseBgShift bg="#111" fg="#fff">
        <CaseDarkHero
          logo="/images/cases/hypotheekhaven/logo-white.svg"
          alt="Hypotheekhaven"
          phones={[
            { src: img("m-werkwijze"), alt: "De werkwijze van Hypotheekhaven op een telefoon" },
            { src: img("m-maandlasten"), alt: "De maandlasten-rekentool van Hypotheekhaven op een telefoon" },
            { src: img("m-reviews"), alt: "De reviews van Hypotheekhaven op een telefoon" },
          ]}
        />

        <CaseDarkIntro crumb="Hypotheekhaven website" tags={["Website", "Rekentools"]}>
          Hypotheekhaven is het hypotheek- en verzekeringsadvies van Sabrina in Noord-Holland. Je hebt één vast aanspreekpunt, van het eerste gesprek tot de sleutel bij de notaris. Die persoonlijke aanpak wilde ze ook online laten zien. Ik bouwde een nieuwe site rond de vragen die mensen vooraf hebben, met uitleg over de kosten en de werkwijze en rekentools die direct een indicatie geven. Een gratis kennismaking plan je er zelf in.
        </CaseDarkIntro>

        <CaseDarkTitle>Advies dat vertrouwd voelt, online</CaseDarkTitle>

        <BgMark bg="#02261e" fg="#f7f1e8" />

        <CaseDarkMonitor src={img("d-home-full")} alt="De homepage van Hypotheekhaven op een beeldscherm" to="-92%" />

        <CaseDarkStatement lead="De uitdaging:">Vertrouwen opbouwen voordat iemand voor het eerst belt.</CaseDarkStatement>

        {/* two pictures at different heights and speeds */}
        <Container>
          <div className="grid grid-cols-12 gap-4">
            <Parallax speed={-6} className="col-span-12 md:col-span-5">
              <img src={img("foto-hero-kaartje")} alt="Een hand met het visitekaartje van Hypotheekhaven" className="aspect-square w-full object-cover" loading="lazy" />
            </Parallax>
            <Parallax speed={8} className="col-span-12 md:col-span-6 md:col-start-7 md:mt-8">
              <img src={img("foto-woonkamer-breed")} alt="Een lichte woonkamer" className="aspect-[4/5] w-full rounded-[14px] object-cover" loading="lazy" />
            </Parallax>
          </div>
        </Container>

        <CaseDarkNote title="Antwoord, nog voor het eerste gesprek">
          Wie een hypotheek zoekt, heeft eerst vragen: wat kan ik lenen, wat kost het per maand, wat moet ik regelen. Ik gaf die vragen een plek op de site, met rekentools die in een paar stappen een eerlijke indicatie geven en uitleg in gewone taal. Zo weet iemand al een stuk meer als hij aan tafel komt.
        </CaseDarkNote>

        <Container>
          <HypotheekhavenKit />
        </Container>

        <BgMark bg="#f7f1e8" fg="#02261e" />

        <CaseDarkStatement lead="Het systeem:">Rustige bouwstenen in de kleuren van het merk, zodat elke nieuwe pagina er meteen bij past.</CaseDarkStatement>

        {/* a collage that moves at three speeds */}
        <Container>
          <div className="relative grid grid-cols-12 items-start gap-4">
            <Parallax speed={4} className="col-span-4 mt-28 md:col-span-3 md:mt-40">
              <img src={img("foto-sleutel")} alt="Een sleutel in een lege woning" className="aspect-[4/5] w-full object-cover" loading="lazy" />
            </Parallax>
            <Parallax speed={-4} className="col-span-8 md:col-span-5">
              <img src={img("foto-planner-bank")} alt="Een planner op een gele bank" className="aspect-[4/5] w-full rounded-[14px] object-cover" loading="lazy" />
            </Parallax>
            <Parallax speed={10} className="col-span-6 col-start-4 -mt-16 md:col-span-4 md:col-start-auto md:mt-64">
              <img src={img("ui-review-0")} alt="Een review van Hypotheekhaven" className="w-full rounded-[10px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]" loading="lazy" />
            </Parallax>
          </div>
        </Container>

        <CaseDarkNote title="Klaar voor wat komt">
          Ik werk de rekentools elk jaar bij met de nieuwe regels, en nieuwe diensten of blogs komen erbij in dezelfde stijl. Elke pagina heeft gestructureerde gegevens die Google en ChatGPT kunnen lezen. Zo maakt Hypotheekhaven meer kans om gevonden te worden door mensen in de regio die Sabrina nog niet kennen.
        </CaseDarkNote>

        <BgMark bg="#111" fg="#fff" />

        <CaseDarkPhoto src="/images/hypotheekhaven-fauteuil.webp" alt="Een map van Hypotheekhaven op een roestbruine fauteuil" />

        <CaseDarkField
          cards={[
            { src: img("ui-dienst-0"), x: 2, y: 12, z: 0.7, w: 9 },
            { src: img("ui-review-1"), x: 12, y: 50, z: 0.2, w: 14 },
            { src: img("ui-dienst-2"), x: 26, y: 6, z: 0.85, w: 8 },
            { src: img("m-diensten"), x: 37, y: 40, z: 0.45, w: 10 },
            { src: img("ui-banner-0"), x: 49, y: 4, z: 0, w: 18 },
            { src: img("ui-dienst-3"), x: 66, y: 55, z: 0.6, w: 9 },
            { src: img("ui-review-2"), x: 74, y: 10, z: 0.3, w: 13 },
            { src: img("m-rentevast"), x: 87, y: 38, z: 0.75, w: 8 },
            { src: img("ui-dienst-4"), x: 93, y: 2, z: 0.9, w: 7 },
            { src: img("ui-dienst-1"), x: 30, y: 68, z: 0.95, w: 7 },
          ]}
        />

        <CaseDarkStatement lead="Het voordeel:">Bezoekers rekenen eerst zelf, en plannen daarna online hun gratis kennismaking.</CaseDarkStatement>

        <CaseDarkDevices
          site="hypotheekhaven.nl"
          page="Maandlasten berekenen"
          desktop={{ src: img("d-maandlasten"), alt: "De maandlasten-rekentool van Hypotheekhaven op desktop" }}
          mobile={{ src: img("m-maandlasten"), alt: "De maandlasten-rekentool van Hypotheekhaven op een telefoon" }}
        />

        <BgMark bg="#dafc92" fg="#02261e" at={1} />

        <CaseDarkResult words={["Helder", "Vindbaar", "Persoonlijk"]} />

        <CaseDarkRoles
          roles={[
            { group: "Strategie", items: ["Structuur en navigatie", "Conversie", "Vindbaarheid"] },
            { group: "Design", items: ["Webdesign", "Mobiel eerst", "Rekentools"] },
            { group: "Development", items: ["Rekentools", "Snelheid", "Formulieren"] },
            { group: "Teksten", items: ["Webteksten", "Uitleg en FAQ"] },
          ]}
        />

        <CaseDarkOthers current="/werk/hypotheekhaven" />
      </CaseBgShift>
      <Footer flat />
    </>
  );
}
