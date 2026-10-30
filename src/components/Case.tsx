import { ArrowIcon, Button, Container, Eyebrow } from "./ui";
import Reveal from "./Reveal";
import CornerReveal from "./CornerReveal";
import DoorImage from "./DoorImage";

/* PLACEHOLDERS: replace with the real Happy Flops results before going live */
const stats = [
  { value: "0,9s", label: "laadtijd op mobiel" },
  { value: "100", label: "PageSpeed-score" },
  { value: "+40%", label: "meer bestellingen" },
];

/* Slippers that fan out from behind the logo on hover */
const slippers = [
  { src: "/images/slipper-1.jpg", x: "-150%", y: "-95%", rot: "-14deg", delay: "0ms" },
  { src: "/images/slipper-2.jpg", x: "60%", y: "-110%", rot: "10deg", delay: "60ms" },
  { src: "/images/slipper-3.jpg", x: "-135%", y: "45%", rot: "8deg", delay: "120ms" },
  { src: "/images/slipper-4.jpg", x: "80%", y: "35%", rot: "-10deg", delay: "180ms" },
];

export default function Case() {
  return (
    <section className="bg-cream py-12 text-forest md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Text column */}
          <div className="flex flex-col">
            <Eyebrow className="max-w-xl">Case: Happy Flops</Eyebrow>

            <a href="/werk/happy-flops" className="group relative mt-12 inline-block w-fit py-6" aria-label="Happy Flops">
              {slippers.map((s) => (
                <span
                  key={s.src}
                  aria-hidden="true"
                  className="slipper pointer-events-none absolute left-1/2 top-1/2 block size-20 overflow-hidden rounded-2xl bg-paper shadow-xl md:size-24"
                  style={{ "--x": s.x, "--y": s.y, "--rot": s.rot, transitionDelay: s.delay } as React.CSSProperties}
                >
                  <img src={s.src} alt="" className="size-full object-cover" loading="lazy" />
                </span>
              ))}
              <picture className="relative z-10 flex items-center transition-transform duration-500 group-hover:scale-105">
                <source srcSet="/images/happy-flops-logo.avif" type="image/avif" />
                <img src="/images/happy-flops-logo.png" alt="Happy Flops" width={500} height={84} className="h-9 w-auto md:h-11" />
              </picture>
            </a>

            <h2 className="mt-6 t-hero md:mt-8">
              Een webshop die <span className="serif-italic">net zo lekker loopt</span> als de slippers
            </h2>
            <p className="mt-6 max-w-xl text-forest/75 t-lead">
              Happy Flops groeide hard, maar de oude site remde af: traag op mobiel, slecht vindbaar en een checkout
              waar klanten afhaakten. De nieuwe site is gebouwd op snelheid, vindbaarheid in Google en AI, en een
              ontwerp dat het merk voelbaar maakt.
            </p>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-forest/20 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-4xl tracking-[-0.04em] text-forest md:text-5xl">{s.value}</dt>
                  <dd className="mt-2 text-sm text-forest/70">{s.label}</dd>
                </div>
              ))}
            </dl>

            <figure className="mt-12 border-l-[3px] border-lime pl-6">
              <blockquote className="text-lg leading-relaxed text-forest/85">
                &ldquo;Quote van Happy Flops komt hier. Twee zinnen over de samenwerking en wat de nieuwe site heeft
                opgeleverd.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm text-forest/70">Naam, functie bij Happy Flops</figcaption>
            </figure>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button href="https://happyflops.nl/">Bekijk de live site</Button>
              <a href="/contact" className="group inline-flex items-center gap-2 text-base font-medium text-forest/70 hover:text-forest">
                Word jij de volgende?
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Visual column */}
          <Reveal className="grid grid-cols-2 gap-4 self-center">
            <CornerReveal src="/images/happyflops-mockup.jpg" alt="De nieuwe Happy Flops webshop op laptop en telefoon" className="col-span-2 aspect-[4/5]" />
            <DoorImage src="/images/happyflops-hero.jpg" className="aspect-square" />
            <DoorImage src="/images/happyflops-hero-3.jpg" className="aspect-square" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
