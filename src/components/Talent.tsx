import { Button, Container, Eyebrow } from "./ui";
import { FrameCorners, FrameGlyph } from "./Logo";

const facts = [
  {
    k: "Ontwerp én bouw",
    v: "Wat we samen bedenken, maak ik ook. Geen overdracht, geen ruis.",
  },
  {
    k: "Eén aanspreekpunt",
    v: "Van de eerste schets tot ver na de lancering praat je met dezelfde persoon.",
  },
  {
    k: "Op afstand, heel Nederland",
    v: "Kennismaken kan online of bij jou op locatie.",
  },
];

/* PLACEHOLDER: fill in your name */
export default function Talent() {
  return (
    <section data-zone="cherry" className="bg-cream py-16 text-brown md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* portrait: one photo of the mascot, the same two-column set-up as Slim gebouwd */}
          <div className="relative self-start overflow-hidden rounded-3xl">
            <picture>
              <source srcSet="/images/over-mascot.webp" type="image/webp" />
              <img
                src="/images/over-mascot.jpg"
                alt="De NXT Frame mascotte wijst naar een website op een laptop"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </picture>
            <FrameCorners className="text-pink" inset="inset-5" size="size-7" corners="anti" />
            <span className="absolute left-6 top-6 rounded-full bg-pink px-3 py-1 text-xs font-semibold tracking-wide text-brown">
              Dat ben ik
            </span>
          </div>

          {/* copy */}
          <div className="self-start lg:sticky lg:top-28">
            <Eyebrow className="max-w-xl">
              Over NXT Frame
            </Eyebrow>
            <h2 className="mt-6 t-section md:mt-8">
              <span className="serif-italic">Eén persoon,</span>
              <br />
              geen ticketsysteem
            </h2>
            <p className="mt-10 max-w-xl text-2xl leading-snug md:text-3xl">
              Ik ben [naam], creatieve webbouwer. Ik ontwerp én bouw, dus wat we
              samen bedenken is precies wat je krijgt.
            </p>
            <ul className="mt-12 max-w-2xl divide-y divide-brown/15 border-y border-brown/15">
              {facts.map((f) => (
                <li
                  key={f.k}
                  className="grid gap-1 py-5 sm:grid-cols-[220px_1fr] sm:gap-6"
                >
                  <span className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
                    <FrameGlyph className="size-3 shrink-0 text-pink" />
                    {f.k}
                  </span>
                  <span className="text-[15px] leading-relaxed text-brown/75">
                    {f.v}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button
                variant="custom"
                className="bg-brown text-peach hover:bg-brown-hover"
                href="/over"
              >
                Meer over mij
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
