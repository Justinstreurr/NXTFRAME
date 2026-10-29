import type { CSSProperties, ReactNode } from "react";
import { Pausable } from "./CaseDarkFx";

/* ---------- The Hypotheekhaven building blocks, each one moving on its own tile ----------
   The same layout as HappyFlopsKit, with the real parts of hypotheekhaven.vercel.app (checked 28 Oct
   2026): the four steps of the maandlasten tool with "Jouw berekening" beside them, the bordeaux
   "Plan een gratis kennismaking" button (square corners), the term buttons (30 to 10 jaar),
   Annuïtair / Lineair, the scores on Google and Trustoo and the questions that open and close. The
   site's colours are night blue #081534, bordeaux #8E4F4B and sand #F5F0EA; its font is Satoshi, Inter
   stands in. Everything moves with the hhk-* keyframes in globals.css, one 4.8s loop. */

const NAVY = "#081534";
const WINE = "#8E4F4B";

function Tile({ label, children, className = "", bg = "#fff" }: { label: string; children: ReactNode; className?: string; bg?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center rounded-[14px] px-4 pb-12 pt-8 text-[#081534] ${className}`} style={{ background: bg }}>
      <div className="flex flex-1 items-center justify-center">{children}</div>
      <p className="absolute inset-x-0 bottom-5 text-center text-[15px] text-black/50 md:bottom-6 md:text-base">{label}</p>
    </div>
  );
}

const loop = (name: string, extra = ""): CSSProperties => ({ animation: `${name} 4.8s ${extra || "cubic-bezier(0.65,0,0.35,1)"} infinite` });

const steps = ["Je situatie", "Het huis", "Je hypotheek", "Je inkomen"];
const terms = ["30 jaar", "25 jaar", "20 jaar", "15 jaar", "10 jaar"];

export default function HypotheekhavenKit() {
  return (
    <Pausable className="grid gap-2 md:grid-cols-[1fr_1fr] md:gap-2.5">
      {/* the maandlasten tool: the steps light up one by one, then the outcome appears */}
      <Tile label="Rekentool" className="min-h-[380px] md:min-h-0" bg="#f5f0ea">
        <div className="grid w-[min(92%,520px)] gap-3 sm:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3 bg-white px-4 py-3.5 text-[15px]" style={loop(`hhk-row-${i}`, "steps(1)")}>
                <span className="flex size-6 flex-none items-center justify-center rounded-full border text-[11px]" style={loop(`hhk-dot-${i}`, "steps(1)")}>{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          <div className="flex flex-col bg-white p-4">
            <p className="font-serif text-lg">Jouw berekening</p>
            <span className="my-3 h-px bg-[#081534]/10" />
            <p className="text-[11px] opacity-60">Netto per maand</p>
            <p className="relative mt-1 h-9 font-serif text-3xl">
              <span className="absolute" style={loop("hhk-res-0", "steps(1)")}>–</span>
              <span className="absolute" style={loop("hhk-res-1", "ease-out")}>€ 1.142</span>
            </p>
            <p className="mt-auto pt-4 text-[10px] leading-snug opacity-50">Indicatie, geen advies en geen aanbod.</p>
          </div>
        </div>
      </Tile>

      <div className="grid gap-2 sm:grid-cols-2 md:gap-2.5">
        {/* the call to action, pressed, its arrow nudging on */}
        <Tile label="Knoppen" className="aspect-square">
          <span className="flex h-[50px] items-center gap-3 whitespace-nowrap px-5 text-[14px] font-medium text-white" style={{ background: WINE, ...loop("hhk-press") }}>
            Plan een gratis kennismaking
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={loop("hhk-arrow")} aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5" /></svg>
          </span>
        </Tile>

        {/* the term: the chosen button moves along */}
        <Tile label="Looptijd" className="aspect-square">
          <div className="flex flex-wrap justify-center gap-1.5 text-[13px]">
            {terms.map((t, i) => (
              <span key={t} className="flex h-10 w-[74px] items-center justify-center border" style={loop(`hhk-term-${i}`, "steps(1)")}>{t}</span>
            ))}
          </div>
        </Tile>

        {/* a question opening and closing again */}
        <Tile label="Veelgestelde vragen" className="pb-16 sm:row-span-2 md:pb-20">
          <div className="w-[min(100%,260px)] text-[14px]">
            <div className="border-b border-[#081534]/15 pb-3">
              <p className="flex items-start justify-between gap-3" style={loop("hhk-q", "steps(1)")}>
                Wat is het verschil tussen bruto en netto?
                <span className="relative mt-1.5 flex size-3 flex-none items-center justify-center">
                  <span className="absolute h-px w-3 bg-current" />
                  <span className="absolute h-3 w-px bg-current" style={loop("hhk-plus")} />
                </span>
              </p>
              <div className="overflow-hidden" style={loop("hhk-open")}>
                <p className="pt-2 text-[12px] leading-relaxed opacity-70">Bruto is wat je elke maand aan de bank betaalt. Netto is wat je er echt aan kwijt bent, omdat je een deel van de rente terugkrijgt.</p>
              </div>
            </div>
            {["Annuïtair of lineair, wat is het verschil?", "Wat is het eigenwoningforfait?"].map((q) => (
              <p key={q} className="flex items-start justify-between gap-3 border-b border-[#081534]/15 py-3">
                {q}
                <span className="relative mt-1.5 flex size-3 flex-none items-center justify-center"><span className="absolute h-px w-3 bg-current" /><span className="absolute h-3 w-px bg-current" /></span>
              </p>
            ))}
          </div>
        </Tile>

        {/* annuïtair or lineair: the dark block slides across */}
        <Tile label="Aflossing" className="min-h-[190px]">
          <div className="relative flex border text-[13px]" style={{ borderColor: NAVY }}>
            <span className="absolute inset-y-0 left-0 w-1/2" style={{ background: NAVY, ...loop("hhk-switch") }} />
            {["Annuïtair", "Lineair"].map((t, i) => (
              <span key={t} className="relative flex h-10 w-[96px] items-center justify-center" style={loop(`hhk-sw-${i}`, "steps(1)")}>{t}</span>
            ))}
          </div>
        </Tile>

        {/* the scores, Google and Trustoo in turn */}
        <Tile label="Reviews" className="min-h-[190px]">
          <div className="relative h-14 w-44 text-center">
            {[["5,0", "op Google"], ["9,8", "op Trustoo"]].map(([score, where], i) => (
              <div key={where} className="absolute inset-0 flex flex-col items-center justify-center" style={loop(`hhk-rev-${i}`, "ease-in-out")}>
                <p className="flex items-baseline gap-2"><span className="font-serif text-3xl">{score}</span><span className="text-[13px] opacity-70">{where}</span></p>
                <p className="mt-1 text-[13px] tracking-[0.2em] text-[#e6a817]">★★★★★</p>
              </div>
            ))}
          </div>
        </Tile>
      </div>
    </Pausable>
  );
}
