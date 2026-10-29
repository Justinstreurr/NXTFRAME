import Nav from "./Nav";
import Footer from "./Footer";
import SellerGrid from "./SellerGrid";
import BranchPricing from "./BranchPricing";
import { FrameGlyph } from "./Logo";
import { Difference, FaqList, Platform } from "./Sections";
import { Button, Container, Eyebrow, TextLink } from "./ui";
import { branchPages, stepsFor } from "./branchPages";
import { branchSections } from "./branchSectionContent";
import { BranchFind, BranchLinks, BranchPains } from "./BranchSections";
import { faqFor, type Branch } from "./menuData";

/**
 * One template for every branch page without a page of its own, in the shape of /makelaars and
 * /financieel-advies: the promise over a photo, what goes wrong today (Herkenbaar), the six parts
 * of the site (Wat je krijgt), the links with what they already use (Koppelingen), where customers
 * look (Vindbaar, with the searches over a photo), the steps (Zo werkt het),
 * three ways to start with what is always included (Investering), the questions, and the other
 * branches. Shared copy comes from menuData.ts, the page's own from branchPages.tsx.
 */
export default function BranchPage({ branch }: { branch: Branch }) {
  const page = branchPages[branch.slug];
  const sections = branchSections[branch.slug];
  const faq = faqFor(branch);
  const pains = branch.pains.map((p, n) => ({ ...p, ...page.painArt[n] }));
  const proof = branch.proof;
  const concept = branch.concept;

  /* the same questions, once for the reader and once for Google and the AI answers */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Website laten maken voor ${branch.name}`,
        provider: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
        areaServed: { "@type": "Country", name: "Nederland" },
        description: branch.intro,
        offers: { "@type": "Offer", priceCurrency: "EUR", price: branch.price.from.replace(".", ""), description: `Vanaf € ${branch.price.from}` },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Branches", item: "https://nxtframe.ai/branches" },
          { "@type": "ListItem", position: 2, name: branch.label, item: `https://nxtframe.ai/branches/${branch.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <Nav theme="photo" />
      <main id="main">
        {/* Hero, the frame of /makelaars (720px on desktop, the nav floating over it): the promise on
            the left over a full-width photo, black from the left to carry the type. On phones too the copy sits on the photo, under a shade. */}
        <section data-zone="green" className="relative isolate overflow-hidden bg-forest text-cream">
          <div
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(0_0_0/0.86)_0%,rgb(0_0_0/0.72)_28%,rgb(0_0_0/0.3)_46%,transparent_58%)] lg:block"
            aria-hidden="true"
          />
          <Container className="relative z-10 flex flex-col justify-center pb-12 pt-28 sm:pt-36 lg:min-h-[720px] lg:pb-28 lg:pt-32">
            <div className="max-w-2xl lg:max-w-[52%]">
              <Eyebrow tone="light" className="max-w-xl">Website voor {branch.name}</Eyebrow>
              <h1 className="mt-6 t-hero text-paper md:mt-8">
                {branch.title.lead}
                <br />
                <span className="serif-italic text-lime">{branch.title.italic}</span>
              </h1>
              <p className="mt-6 max-w-lg text-paper t-lead">{page.heroLead}</p>
              <div data-hero-cta className="mt-8">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button className="px-8 py-4 text-base" href="/contact">
                    Plan een kennismaking
                  </Button>
                  {proof && <TextLink light href={proof.href}>Bekijk {proof.name}</TextLink>}
                  {!proof && concept && <TextLink light href={`https://${concept.url}/`}>Bekijk het concept live</TextLink>}
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-[15px] text-paper/90">
                  {branch.musts.map((m) => (
                    <li key={m.title} className="flex items-center gap-2">
                      <FrameGlyph className="size-3 text-lime" />
                      {m.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
          {/* phones: the copy sits on the photo, so a shade from the top (copy) to the foot (buttons) keeps it readable */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.72)_0%,rgb(0_0_0/0.5)_45%,rgb(0_0_0/0.68)_100%)] lg:hidden" aria-hidden="true" />
          <picture className="absolute inset-0 -z-20">
            <img
              src={page.hero.src}
              alt={page.hero.alt}
              className="size-full object-cover"
              style={page.hero.pos ? { objectPosition: page.hero.pos } : undefined}
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </picture>
        </section>

        {/* recognition before any solution. Herkenbaar, kept plain (BranchPains): title and lead on the
            left, this branch's own three pains stacked on the right */}
        <BranchPains
          title={
            <>
              Waar het nu <span className="serif-italic">misgaat</span>
            </>
          }
          lead="Drie dingen die ik bij bijna elke site in deze branche tegenkom. Herken je er één, dan loop je waarschijnlijk klanten mis."
          pains={pains}
        />

        {/* what you get: the six parts of the site, each with what it brings, as the quiet grid of
            /makelaars on sand (SellerGrid) */}
        <section id="wat-je-krijgt" data-zone="green" className="scroll-mt-20 bg-sand py-12 text-forest md:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
              <div>
                <Eyebrow className="max-w-xl">Wat je krijgt</Eyebrow>
                <h2 className="mt-6 t-section md:mt-8">
                  Gebouwd voor <span className="serif-italic">{branch.name}</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-forest/75 md:text-xl">
                Geen template met een paar pagina&rsquo;s, maar de onderdelen die jouw vak nodig heeft. Bij elk onderdeel staat wat het je oplevert.
              </p>
            </div>

            <div className="mt-12 md:mt-16">
              <SellerGrid items={page.features} />
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              <p className="text-[15px] text-forest/65">Heb je iets anders nodig, dan bouw ik dat erbij.</p>
              <TextLink href="/contact">Bespreek wat jij nodig hebt</TextLink>
            </div>
          </Container>
        </section>

        {/* what the site works with (BranchLinks): what comes in, the requests going back, and three
            plain facts */}
        <BranchLinks content={sections.links} />

        {/* found where customers look (BranchFind): Google, the map and ChatGPT, then the searches
            the pages are built on, floating around the photo. No promise of a position. */}
        <BranchFind content={sections.find} />

        {/* how it goes: the path of "Zo werkt het", four steps on a straight line */}
        <Platform
          eyebrow="Zo werkt het"
          title={
            <>
              Van kennismaking <span className="serif-italic">naar je nieuwe site</span>
            </>
          }
          intro="Vier stappen, één aanspreekpunt. Je weet altijd waar het traject staat en wat de volgende stap is."
          action={<TextLink light className="mt-8" href="/aanpak">Bekijk de aanpak</TextLink>}
          items={stepsFor(page.intake)}
          straight
          tone="cream"
        />

        {/* what it costs: three ways to start and what every site comes with (BranchPricing).
            PLACEHOLDER figures: they live in menuData.ts */}
        <BranchPricing
          title={<>Wat het kost, <span className="serif-italic">vooraf vast</span></>}
          intro={page.pricingIntro}
          ways={page.ways(branch.price.from, branch.price.span)}
          includedTitle={`Bij elke ${page.siteName} inbegrepen`}
          included={page.included}
          smallPrint={`Prijzen exclusief btw. Niet inbegrepen: ${page.notIncluded}`}
        />

        {/* the questions this branch actually asks, also FAQPage structured data (see jsonLd) */}
        <section className="bg-cream pb-12 pt-4 text-forest md:pb-32 md:pt-8">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-28">
              <Eyebrow className="max-w-xl">Veelgestelde vragen</Eyebrow>
              <h2 className="mt-6 t-section md:mt-8">
                Vragen van <span className="serif-italic">{branch.name}</span>
              </h2>
              <p className="mt-6 max-w-md text-forest/75 t-lead">Staat je vraag er niet bij? Stel hem in de kennismaking, of mail me.</p>
              <TextLink href="mailto:hallo@nxtframe.ai" className="mt-8">hallo@nxtframe.ai</TextLink>
            </div>
            <FaqList items={faq} />
          </Container>
        </section>

        {/* the other branches: the carousel of "Voor wie" on the homepage, without this one */}
        <Difference
          title={
            <>
              Ook voor <span className="serif-italic">andere branches</span>
            </>
          }
          lead="Voor elk vak bouw ik een site rond de vragen van dat vak. Kijk gerust verder."
          exclude={page.segment}
        />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
