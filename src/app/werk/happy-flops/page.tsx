import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui";
import HappyFlopsKit from "@/components/HappyFlopsKit";
import CaseBgShift, { BgMark } from "@/components/CaseBgShift";
import { Parallax } from "@/components/CaseDarkFx";
import {
  CaseDarkDevices, CaseDarkField, CaseDarkHero, CaseDarkIntro, CaseDarkMonitor, CaseDarkNote, CaseDarkOthers,
  CaseDarkPhoto, CaseDarkResult, CaseDarkRoles, CaseDarkStatement, CaseDarkTitle,
} from "@/components/CaseDark";

export const metadata = {
  title: "Happy Flops case | NXT Frame",
  alternates: { canonical: "/werk/happy-flops" },
  description: "Hoe ik de Shopify-webshop van Happy Flops opnieuw opbouwde, met de telefoon als uitgangspunt. Een case van NXT Frame.",
};

/* The Happy Flops case, in the layout of CaseDark (after Instrument's Nike case): black, then forest
   green, cream, black and lime to the end. PLACEHOLDERS: the texts are a first version for Happy Flops
   to check. */

const shot = (n: string) => `/images/cases/happy-flops/${n}.webp`;
const ui = (n: string) => `/images/hf-ui/${n}.webp`;
const reel = (n: string) => `/images/hf-reel/${n}.webp`;

export default function Page() {
  return (
    <>
      <Nav theme="photo" />
      <CaseBgShift bg="#111" fg="#fff">
        <CaseDarkHero
          logo="/images/hf-ui/logo-white.webp"
          alt="Happy Flops"
          phones={[
            { src: shot("m-verhaal"), alt: "De pagina Ons verhaal van Happy Flops op een telefoon" },
            { src: shot("m-cushers"), alt: "De productpagina van de HappyCushers op een telefoon" },
            { src: shot("m-faq"), alt: "De pagina met veelgestelde vragen van Happy Flops op een telefoon" },
          ]}
        />

        <CaseDarkIntro crumb="Happy Flops webshop" tags={["Webshop", "Design"]}>
          Happy Flops verkoopt slippers en pantoffels met een zacht voetbed, voor volwassenen en kinderen. Het merk groeide en de webshop moest mee. Ik bouwde de shop opnieuw op, rond de producten en de mensen die ze dragen. Hij moest vooral goed werken op een telefoon en er net zo vrolijk uitzien als het merk. Ik deed alles zelf, van de eerste schets tot de livegang.
        </CaseDarkIntro>

        <CaseDarkTitle>Een webshop zo zacht als de slippers</CaseDarkTitle>

        <BgMark bg="#02261e" fg="#f7f1e8" />

        <CaseDarkMonitor src={shot("d-home-full")} alt="De homepage van Happy Flops op een beeldscherm" />

        <CaseDarkStatement lead="De uitdaging:">Een merk dat groeide, en een webshop die moest kunnen meegroeien.</CaseDarkStatement>

        {/* two pictures at different heights and speeds */}
        <Container>
          <div className="grid grid-cols-12 gap-4">
            <Parallax speed={-6} className="col-span-12 md:col-span-5">
              <img src="/images/happyflops-phones.jpg" alt="Twee handen met telefoons waarop de webshop van Happy Flops staat" className="aspect-square w-full object-cover" loading="lazy" />
            </Parallax>
            <Parallax speed={8} className="col-span-12 md:col-span-6 md:col-start-7 md:mt-8">
              <img src="/images/happyflops-grass.jpg" alt="De webshop van Happy Flops op een telefoon in het gras" className="aspect-[4/5] w-full rounded-[14px] object-cover" loading="lazy" />
            </Parallax>
          </div>
        </Container>

        <CaseDarkNote title="Een basis voor een merk dat groeit">
          De oude shop was gegroeid uit losse apps en aanpassingen aan het thema. Elke nieuwe collectie kostte veel handwerk. Ik begon bij de basis: één vaste opbouw voor de homepage, de collecties en de productpagina&apos;s, zodat nieuwe producten er zonder gepuzzel bij passen.
        </CaseDarkNote>

        <Container>
          <HappyFlopsKit />
        </Container>

        <BgMark bg="#f7f1e8" fg="#02261e" />

        <CaseDarkStatement lead="Het systeem:">Vaste bouwstenen, zodat elke nieuwe collectie er meteen uitziet als Happy Flops.</CaseDarkStatement>

        {/* a collage that moves at three speeds */}
        <Container>
          <div className="relative grid grid-cols-12 items-start gap-4">
            <Parallax speed={4} className="col-span-4 mt-28 md:col-span-3 md:mt-40">
              <img src={reel("lp6")} alt="Een vrouw in Happy Flops op een terras in de sneeuw" className="aspect-[4/5] w-full object-cover" loading="lazy" />
            </Parallax>
            <Parallax speed={-4} className="col-span-8 md:col-span-5">
              <img src="/images/happyflops-hero-2.jpg" alt="Een Happy Flops slipper op een groene bank" className="aspect-[4/5] w-full rounded-[14px] object-cover" loading="lazy" />
            </Parallax>
            <Parallax speed={10} className="col-span-6 col-start-4 -mt-16 md:col-span-4 md:col-start-auto md:mt-64">
              <div className="flex aspect-[5/4] items-center justify-center rounded-[10px] bg-[#f5f5f5] p-8">
                <img src={reel("p-sky")} alt="Een lichtblauwe HappyFlops Original" className="w-full" loading="lazy" />
              </div>
            </Parallax>
          </div>
        </Container>

        <CaseDarkNote title="Klaar voor wat komt">
          Nieuwe collecties, acties en kleuren gaan erop met dezelfde bouwstenen, dus zonder dat er iets opnieuw ontworpen hoeft te worden. Elke categorie en elk product heeft gestructureerde gegevens die Google en ChatGPT kunnen lezen. Zo maakt Happy Flops meer kans om gevonden te worden door mensen die het merk nog niet kennen.
        </CaseDarkNote>

        <BgMark bg="#111" fg="#fff" />

        <CaseDarkPhoto src="/images/happyflops-fold.webp" alt="Twee handen met een vouwtelefoon waarop de winterhomepage van Happy Flops openstaat" />

        <CaseDarkField
          cards={[
            { src: ui("blk-tree"), x: 2, y: 12, z: 0.7, w: 9 },
            { src: ui("card-original"), x: 13, y: 52, z: 0.2, w: 12 },
            { src: ui("blk-sofa"), x: 25, y: 6, z: 0.85, w: 8 },
            { src: shot("m-product"), x: 37, y: 40, z: 0.45, w: 10 },
            { src: ui("card-kids"), x: 50, y: 2, z: 0, w: 16 },
            { src: ui("blk-bike"), x: 64, y: 55, z: 0.6, w: 10 },
            { src: ui("card-cusher"), x: 74, y: 8, z: 0.3, w: 11 },
            { src: shot("m-collection"), x: 86, y: 38, z: 0.75, w: 8 },
            { src: ui("blk-limited"), x: 93, y: 2, z: 0.9, w: 7 },
            { src: ui("card-stockholm"), x: 30, y: 68, z: 0.95, w: 7 },
          ]}
        />

        <CaseDarkStatement lead="Het voordeel:">Op een telefoon net zo makkelijk te gebruiken als op een groot scherm.</CaseDarkStatement>

        <CaseDarkDevices
          site="happyflops.nl"
          page="Home"
          desktop={{ src: shot("d-home"), alt: "De homepage van Happy Flops op desktop" }}
          mobile={{ src: shot("m-home"), alt: "De homepage van Happy Flops op een telefoon" }}
        />

        <BgMark bg="#dafc92" fg="#02261e" at={1} />

        <CaseDarkResult words={["Snel", "Vindbaar", "Vrolijk"]} />

        <CaseDarkRoles
          roles={[
            { group: "Strategie", items: ["Structuur en navigatie", "Conversie", "Vindbaarheid"] },
            { group: "Design", items: ["Webdesign", "Mobiel eerst", "Productpagina's"] },
            { group: "Development", items: ["Shopify", "Snelheid", "Koppelingen"] },
            { group: "Teksten", items: ["Webteksten", "Productdata"] },
          ]}
        />

        <CaseDarkOthers current="/werk/happy-flops" />
      </CaseBgShift>
      <Footer flat />
    </>
  );
}
