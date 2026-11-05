import { Container, Eyebrow } from "./ui";

/* PLACEHOLDER: 0,9 s, +40% and 2x are not confirmed yet (see OVERDRACHT.md, "Cijfers nog niet
   bevestigd"); replace them with measured figures before they are relied on. The three steps are
   simply what the Happy Flops checkout is. */
const figures = [
  { value: "0,9 s", body: "laadtijd op een telefoon voor de webshop van Happy Flops, ook op 4G.", link: { label: "Bekijk de case", href: "/werk/happy-flops" } },
  { value: "+40%", body: "meer bestellingen voor Happy Flops na de nieuwe webshop." },
  { value: "2x", body: "meer afspraken voor Hypotheekhaven, met een site die al vertelt wie de adviseur is.", link: { label: "Bekijk de case", href: "/werk/hypotheekhaven" } },
  { value: "3", body: "stappen van product tot betaald: product, winkelwagen, iDEAL. Ook op een telefoon." },
];

/**
 * Conversie as a page of numbers, after the "success in numbers" block of Superside: a centred
 * label and statement (the second line in the serif italic), then the figures two by two, each with
 * its explanation on the left and the number large in the upright serif on the right, over a
 * hairline. No film and no motion: it reads at once and costs nothing while scrolling.
 */
export default function ConversionNumbers() {
  return (
    <section data-zone="green" className="bg-cream pb-16 pt-14 text-forest md:pb-32 md:pt-24">
      <Container>
        <div className="text-center">
          <Eyebrow className="mx-auto max-w-xl justify-center">Conversie</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-3xl t-section text-forest md:mt-8">
            Niet alleen mooi,
            <br />
            <span className="serif-italic">ook converterend</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-forest/75 t-lead">
            Een site die klopt bij je merk en bezoekers omzet in klanten. Dit is wat dat opleverde.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-16 md:mt-20 md:grid-cols-2">
          {figures.map((f) => (
            <li key={f.value} className="flex items-end justify-between gap-6 border-b border-forest/15 py-8 md:py-10">
              <div className="max-w-[26ch] pb-2">
                <p className="text-[15px] leading-relaxed text-forest/70 md:text-[16px]">{f.body}</p>
                {f.link && (
                  <a href={f.link.href} className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-medium text-forest underline-offset-4 hover:underline">
                    {f.link.label}
                    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 11 11 5M6 5h5v5" />
                    </svg>
                  </a>
                )}
              </div>
              <p className="shrink-0 font-serif text-[clamp(4rem,9vw,7.5rem)] leading-[0.85] tracking-[-0.02em]">{f.value}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
