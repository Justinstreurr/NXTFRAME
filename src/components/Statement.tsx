import LetterFill from "./LetterFill";
import BranchIcon, { type IconKey } from "./BranchIcons";
import { Container } from "./ui";

/**
 * The homepage statement under the hero, built like Oura's intro: one centred serif sentence (the
 * second half fills in letter by letter as it scrolls up), a short line under it, two dark pill
 * buttons, and a row of photo cards for the four promises. Each card carries a frosted label with
 * an icon top left and a round "+" top right. The row scrolls sideways on narrow screens.
 */
const cards: { label: string; icon: IconKey; img: string; href: string; pos?: string }[] = [
  { label: "Snel laden", icon: "refresh", img: "/images/slim-desk.jpg", href: "/diensten" },
  { label: "Gevonden worden", icon: "search", img: "/images/slim-choice.jpg", href: "/vindbaar-in-google-en-chatgpt" },
  { label: "Het merk voelbaar", icon: "sparkle", img: "/images/happyflops-hero-2.jpg", href: "/werk/happy-flops" },
  { label: "Rond jouw klant", icon: "heart", img: "/images/talent.jpg", href: "/aanpak" },
];

export default function Statement() {
  return (
    <section className="bg-cream py-16 text-forest md:py-32">
      <Container className="text-center">
        <h2 className="mx-auto max-w-5xl font-serif text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-forest">
          Websites die <span className="italic">snel laden, gevonden worden</span> en het merk voelbaar maken.{" "}
          <LetterFill parts={[{ text: "Gebouwd rond " }, { text: "jouw klant.", italic: true }]} />
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-forest/75 t-lead">
          Van eerste schets tot lancering: één aanspreekpunt, een site die elke dag voor je werkt.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="/aanpak" className="rounded-full bg-forest px-6 py-3.5 text-[15px] font-medium text-cream transition-colors hover:bg-forest-hover">Waarom NXT Frame</a>
          <a href="/website-laten-maken" className="rounded-full bg-forest px-6 py-3.5 text-[15px] font-medium text-cream transition-colors hover:bg-forest-hover">Zo werkt het</a>
        </div>
      </Container>

      <Container className="mt-16 md:mt-20">
        <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
          {cards.map((c) => (
            <li key={c.label} className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto">
              <a href={c.href} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-forest">
                <img src={c.img} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" style={c.pos ? { objectPosition: c.pos } : undefined} loading="lazy" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2.5 rounded-full bg-black/35 px-4 py-2.5 text-sm font-medium text-paper backdrop-blur-md">
                  <BranchIcon name={c.icon} className="size-4" />
                  {c.label}
                </span>
                <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-paper text-forest transition-colors group-hover:bg-lime" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
