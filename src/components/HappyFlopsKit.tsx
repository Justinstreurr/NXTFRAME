import type { CSSProperties, ReactNode } from "react";
import { Pausable } from "./CaseDarkFx";

/* ---------- The Happy Flops building blocks, each one moving on its own tile ----------
   After Instrument's Feeld case: a tall tile on the left and a grid of small tiles on the right, each
   showing one part of the shop doing its thing, with its name under it. The parts are the real ones
   from happyflops.nl (product and collection page, checked 28 Oct 2026): the black "In Winkelwagen"
   button (6px corners), the colour picker with photo swatches and "Kleur: …", the size chips 34/35 to
   46/47 with "Maat: …", "Op voorraad" with the "Tijdelijke actie" box, and the collection tabs
   (All Products, Nieuw Binnen, Best Sellers). The shop's font is Helvetica Now; Inter stands in.
   Everything moves with the hfk-* keyframes in globals.css (one 4.8s loop, so the tiles keep time);
   the play/pause button stops them all. */

const R = "/images/hf-reel/";

function Tile({ label, children, className = "", bg = "#fff" }: { label: string; children: ReactNode; className?: string; bg?: string }) {
  return (
    <div className={`relative flex h-[340px] w-[82%] shrink-0 snap-start flex-col items-center justify-center rounded-[14px] px-4 pb-12 pt-8 md:h-auto md:w-auto text-[#111] ${className}`} style={{ background: bg }}>
      <div className="flex flex-1 items-center justify-center">{children}</div>
      <p className="absolute inset-x-0 bottom-5 text-center text-[15px] text-black/50 md:bottom-6 md:text-base">{label}</p>
    </div>
  );
}

const loop = (name: string, extra = ""): CSSProperties => ({ animation: `${name} 4.8s ${extra || "cubic-bezier(0.65,0,0.35,1)"} infinite` });

/* the colours shown, in the order the picker goes through them (as named on the shop) */
const kleuren = [
  { n: "p-green", name: "Groen" },
  { n: "p-rose", name: "Roze" },
  { n: "p-sky", name: "Lichtblauw" },
];
const maten = ["34/35", "36/37", "38/39", "40/41", "42/43", "44/45", "46/47"];
/* the sizes the picker visits, in order (hfk-size moves the outline to these chips) */
const gekozen = ["38/39", "40/41", "42/43", "36/37"];

export default function HappyFlopsKit() {
  return (
    <Pausable>
      {/* phones: one swipe row, a tile and a half in view; from md the tall tile left and the grid right */}
      <div className="-mx-6 flex snap-x snap-mandatory scroll-pl-6 gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-[1fr_1fr] md:gap-2.5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
      {/* a slipper, floating gently over its shadow */}
      <Tile label="Zacht voetbed" className="min-h-[300px] sm:min-h-[360px] md:min-h-0" bg="#f7f7f7">
        <div className="relative flex w-[min(86%,520px)] flex-col items-center">
          <img src={R + "p-sky-clean.webp"} alt="" className="relative z-10 w-full" style={loop("hfk-float", "ease-in-out")} />
          <span className="mt-4 h-5 w-[70%] rounded-[50%] bg-black/20 blur-md" style={loop("hfk-shadow", "ease-in-out")} />
        </div>
      </Tile>

      <div className="contents md:grid md:grid-cols-2 md:gap-2.5">
        {/* "In Winkelwagen": pressed, it loads, says it is added, and the cart counts one */}
        <Tile label="Knoppen" className="min-h-[170px] sm:aspect-square sm:min-h-0">
          <div className="flex w-52 flex-col items-end gap-4">
            <span className="relative">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 4h2l2.2 10.5h10.6L20 7H6.2" /><circle cx="9" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></svg>
              <span className="absolute -right-2 -top-2 flex size-[18px] items-center justify-center rounded-full bg-[#fcb716] text-[10px] font-bold" style={loop("hfk-badge", "cubic-bezier(0.34,1.56,0.64,1)")}>1</span>
            </span>
            <span className="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-[6px] bg-black text-[15px] font-medium text-white" style={loop("hfk-press")}>
              <span className="absolute" style={loop("hfk-out")}>In Winkelwagen</span>
              <span className="absolute size-5 rounded-full border-2 border-white/30 border-t-white" style={loop("hfk-load", "linear")} />
              <span className="absolute flex items-center gap-1.5" style={loop("hfk-in")}>
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" /></svg>
                Toegevoegd
              </span>
            </span>
          </div>
        </Tile>

        {/* the colour picker: photo swatches, the name after "Kleur:" and the slipper change together */}
        <Tile label="Kleur" className="min-h-[170px] sm:aspect-square sm:min-h-0">
          <div className="flex flex-col items-start gap-3">
            <div className="relative h-14 w-44">
              {kleuren.map((k, i) => (
                <img key={k.n} src={`${R}${k.n}.webp`} alt="" className="absolute inset-0 m-auto max-h-full w-full object-contain" style={loop(`hfk-swap-${i}`, "ease-in-out")} />
              ))}
            </div>
            <p className="relative h-5 w-44 text-[13px] font-light">
              Kleur:{kleuren.map((k, i) => <span key={k.name} className="absolute ml-1" style={loop(`hfk-o-${i}`, "steps(1)")}>{k.name}</span>)}
            </p>
            <div className="relative flex gap-2">
              <span className="absolute left-0 top-0 z-10 h-12 w-14 rounded-[6px] border border-black" style={loop("hfk-ring")} />
              {kleuren.map((k) => (
                <span key={k.n} className="flex h-12 w-14 items-center justify-center rounded-[6px] bg-[#f7f7f7] p-1.5">
                  <img src={`${R}${k.n}.webp`} alt="" className="w-full" />
                </span>
              ))}
            </div>
          </div>
        </Tile>

        {/* the size picker: "Maat: …" and the outlined chip move from size to size */}
        <Tile label="Maat" className="pb-12 sm:row-span-2 md:pb-20">
          <div className="flex flex-col gap-3">
            <p className="relative h-5 text-[13px] font-light">
              Maat:{gekozen.map((m, i) => <span key={m} className="absolute ml-1" style={loop(`hfk-m-${i}`, "steps(1)")}>{m}</span>)}
            </p>
            <div className="relative grid grid-cols-4 gap-1.5 text-[13px]">
              <span className="absolute left-0 top-0 z-10 h-10 w-[52px] rounded-[6px] border border-black" style={loop("hfk-size")} />
              {maten.map((m) => (
                <span key={m} className="relative flex h-10 w-[52px] items-center justify-center rounded-[6px] bg-[#f7f7f7] font-light">{m}</span>
              ))}
            </div>
          </div>
        </Tile>

        {/* in stock, and the offer box under the button */}
        <Tile label="Voorraad" className="min-h-[150px] sm:min-h-[190px]">
          <div className="flex w-52 flex-col gap-3">
            <p className="flex items-center gap-2 text-[13px] font-light text-[#2e2a39]/75">
              <span className="relative flex size-2.5">
                <span className="absolute inset-0 rounded-full bg-[#3ac25b]" style={loop("hfk-ping", "ease-out")} />
                <span className="relative size-2.5 rounded-full bg-[#3ac25b]" />
              </span>
              Op voorraad
            </p>
            <p className="rounded-[6px] border border-dashed border-[#4b9ecf] bg-[#eef7fc] px-2 py-2 text-center text-[11px]" style={loop("hfk-nudge", "ease-in-out")}>
              <b className="font-semibold">Tijdelijke actie:</b> 2+1 gratis op alle producten
            </p>
          </div>
        </Tile>

        {/* the collection tabs: the black one moves along */}
        <Tile label="Filters" className="min-h-[150px] sm:min-h-[190px]">
          <div className="flex gap-1.5 text-[11.5px]">
            {["All Products", "Nieuw Binnen", "Best Sellers"].map((t, i) => (
              <span key={t} className="flex h-9 w-[88px] items-center justify-center rounded-[6px] border border-black/15" style={loop(`hfk-tab-${i}`, "steps(1)")}>{t}</span>
            ))}
          </div>
        </Tile>
      </div>
      </div>
    </Pausable>
  );
}
