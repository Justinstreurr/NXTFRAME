"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button, Container, Eyebrow, Reassure, TextLink } from "./ui";

/* the scene is drawn at this size and scaled to fit, so every position on its timeline holds */
const W = 460;
const H = 330;
const LOOP_S = 18;

/* the laptop film (public/videos/conversie-macbook-v3.mp4, 1600 x 766, 18 s, the full width of the Raylight frame): made in Raylight from a
   recording of the Film below, on exactly the section's cream so it melts into the page. Its timeline
   matches the Film's, so the chapters below still line up. */
const VIDEO = { src: "/videos/conversie-macbook-v3.mp4", poster: "/images/conversie-macbook-poster-v3.webp", w: 1600, h: 766 };

/* chapters under the progress bar, at their share of the loop */
const chapters = [
  { at: 0, label: "Product" },
  { at: 20, label: "Winkelwagen" },
  { at: 37, label: "Afrekenen" },
  { at: 62, label: "iDEAL" },
  { at: 82, label: "Resultaat" },
];

/* Happy Flops' own colours, as on happyflops.nl and its checkout */
const HF = { yellow: "#f9c823", button: "#f7d64a", sky: "#79aedb", cream: "#fdf3d0", ideal: "#c2006b" };

/* the colour picker: the product photo, tinted for the colours we have no photo of */
const colours = [
  { name: "Beige", src: "/images/slipper-3.jpg", filter: "sepia(0.7) saturate(0.45) hue-rotate(-12deg) brightness(1.04)" },
  { name: "Zwart", src: "/images/slipper-3.jpg", filter: "grayscale(1) brightness(0.32) contrast(1.2)" },
  { name: "Groen", src: "/images/slipper-3.jpg", filter: "hue-rotate(115deg) saturate(0.55) brightness(0.92)" },
  { name: "Roze", src: "/images/slipper-3.jpg", filter: "none" },
  { name: "Navy", src: "/images/slipper-4.jpg", filter: "brightness(0.45) saturate(1.5)" },
  { name: "Lichtblauw", src: "/images/slipper-4.jpg", filter: "none" },
];
const sizes = ["34/35", "36/37", "38/39", "40/41", "42/43", "44/45", "46/47"];

/* a fixed, QR-looking pattern for the iDEAL page (21 x 21 modules, the three finder squares) */
const qr: [number, number][] = [];
for (let y = 0; y < 21; y++) {
  for (let x = 0; x < 21; x++) {
    const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
    if (finder) {
      const fx = x > 13 ? x - 14 : x;
      const fy = y > 13 ? y - 14 : y;
      const ring = fx === 0 || fx === 6 || fy === 0 || fy === 6;
      const core = fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4;
      if (ring || core) qr.push([x, y]);
    } else if (((x * 7 + y * 13 + x * y) % 5) < 2) {
      qr.push([x, y]);
    }
  }
}

/**
 * The film: the Happy Flops checkout, rebuilt after a screen recording of happyflops.nl, on one
 * 18-second timeline that loops seamlessly. The product page (black USP bar, blue promo bar, photo
 * grid, colour and size pickers) where the cursor picks pink and 40/41 and adds it; the cart
 * drawer with the free-pair progress, where it ups the quantity to 2 and checks out; the Shopify
 * checkout, where the e-mail types itself, the address fills in, shipping turns free and iDEAL |
 * Wero is chosen; the iDEAL page with its QR code, paid; the thank-you page with confetti; then
 * three result tiles in NXT Frame's colours. The customer details are made up. Every moving part
 * runs on CSS keyframes in globals.css (.cs3-*), transform, opacity and clip only.
 */
/** The checkout film as markup: the source of the laptop video. Re-record it (headless Firefox, frame
 * by frame) when it changes, then rebuild the video in Raylight. */
export function Film() {
  return (
    <div className="absolute left-0 top-0 overflow-hidden rounded-xl bg-white shadow-[0_30px_80px_-24px_rgba(68,2,32,0.5)] ring-1 ring-black/10" style={{ width: W, height: H }}>
      {/* browser chrome */}
      <div className="flex h-[30px] items-center gap-3 border-b border-black/10 bg-[#f6f6f6] px-3">
        <span className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="size-2 rounded-full" style={{ background: c }} />
          ))}
        </span>
        <span className="relative h-[15px] flex-1 overflow-hidden rounded-md bg-white text-center text-[9px] leading-[15px] text-black/55">
          <span className="cs2-a cs3-url1 absolute inset-0">happyflops.nl/products/happyflops-original</span>
          <span className="cs2-a cs3-url2 absolute inset-0">happyflops.nl/checkouts</span>
          <span className="cs2-a cs3-url3 absolute inset-0">ideal.nl/betalen</span>
        </span>
        <span className="w-10" />
      </div>

      {/* the body: everything below sits on a 460 x 300 grid */}
      <div className="relative h-[300px] overflow-hidden text-[#111]">
        {/* ---- the product page ---- */}
        <div className="absolute inset-0 bg-white">
          <div className="flex h-[11px] items-center justify-between bg-black px-[14px] text-[5.5px] text-white">
            <span>30 dagen geld-terug-garantie</span>
            <span>Gratis verzending bij bestellingen boven €50</span>
            <span>1,000,000+ blije klanten</span>
          </div>
          <div className="flex h-[20px] items-center px-[14px]">
            <img src="/images/happy-flops-logo.png" alt="" className="h-[8px] w-auto" />
            <span className="mx-auto flex gap-2.5 text-[5.5px]">
              <span>Shop Alles</span>
              <span className="underline">Volwassenen ▾</span>
              <span>Kids ▾</span>
              <span>Contact</span>
              <span>FAQ</span>
              <span>Track je Order</span>
            </span>
            <span className="mr-2.5 text-[5px] text-black/70">Nederland (EUR €)</span>
            <span className="relative">
              <svg viewBox="0 0 24 24" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
                <path d="M2 3h3l2.6 12h11.4l2-8H6.2" />
              </svg>
              <span className="cs2-a cs3-badge absolute -right-1.5 -top-1.5 grid size-2.5 place-items-center rounded-full text-[5px] font-bold" style={{ background: HF.yellow }}>
                <span className="cs2-a cs3-q1 absolute">1</span>
                <span className="cs2-a cs3-q2 absolute">2</span>
              </span>
            </span>
          </div>
          <div className="grid h-[10px] place-items-center text-[5.5px] text-white" style={{ background: HF.sky }}>
            <span>
              <b>Tijdelijke actie:</b> 2+1 gratis op alle producten
            </span>
          </div>

          {/* photo grid: the top two follow the colour, the lifestyle shots stay */}
          {[
            { x: 14, y: 48, blue: "/images/slipper-4.jpg", pink: "/images/slipper-3.jpg", flip: false },
            { x: 124, y: 48, blue: "/images/slipper-4.jpg", pink: "/images/slipper-3.jpg", flip: true },
          ].map((g) => (
            <span key={g.x} className="absolute h-[106px] w-[106px] overflow-hidden rounded-[4px] bg-[#f3f3f3]" style={{ left: g.x, top: g.y }}>
              <img src={g.blue} alt="" className={`absolute inset-0 size-full object-cover ${g.flip ? "-scale-x-100" : ""}`} />
              <img src={g.pink} alt="" className={`cs2-a cs3-pink absolute inset-0 size-full object-cover ${g.flip ? "-scale-x-100" : ""}`} />
            </span>
          ))}
          <img src="/images/happyflops-grass.jpg" alt="" className="absolute left-[14px] top-[158px] h-[106px] w-[106px] rounded-[4px] object-cover" />
          <img src="/images/happyflops-hero-2.jpg" alt="" className="absolute left-[124px] top-[158px] h-[106px] w-[106px] rounded-[4px] object-cover" />

          {/* the buy box */}
          <div className="absolute left-[252px] top-[48px] w-[194px]">
            <p className="flex items-center gap-1 text-[5.5px] text-black/60">
              <span className="tracking-[0.5px]" style={{ color: HF.yellow }}>★★★★★</span>
              (16,892)
            </p>
            <p className="mt-1 font-display text-[12px] font-black leading-none tracking-tight">HappyFlops Original</p>
            <span className="mt-1.5 block space-y-[2px] text-[5.5px]">
              <span className="block">✓ Ultiem comfort, de hele dag</span>
              <span className="block">✓ Voor elk voettype gemaakt</span>
              <span className="block">✓ 12+ uur aan zonder klachten</span>
            </span>
            <p className="mt-1.5 border-b border-black/10 pb-1.5 text-[9px] font-semibold">€34,95</p>
            <p className="relative mt-1.5 h-[8px] text-[6px]">
              Kleur:
              <span className="cs2-a cs3-blue-label absolute left-[20px] text-black/55">Lichtblauw</span>
              <span className="cs2-a cs3-pink-label absolute left-[20px] text-black/55">Roze</span>
            </p>
            <span className="relative mt-1 flex gap-[4px]">
              {colours.map((c) => (
                <span key={c.name} className="h-[22px] w-[29px] overflow-hidden rounded-[3px] bg-[#f3f3f3]">
                  <img src={c.src} alt="" className="size-full object-cover" style={{ filter: c.filter }} />
                </span>
              ))}
              <span className="cs2-a cs3-swatch absolute left-0 top-0 h-[22px] w-[29px] rounded-[3px] border border-black" />
            </span>
            <p className="relative mt-2 h-[8px] text-[6px]">
              Maat:
              <span className="cs2-a cs3-size-a absolute left-[18px] text-black/55">34/35</span>
              <span className="cs2-a cs3-size-b absolute left-[18px] text-black/55">40/41</span>
            </p>
            <span className="relative mt-1 flex gap-[4px]">
              {sizes.map((s) => (
                <span key={s} className="grid h-[16px] w-[24px] place-items-center rounded-[3px] bg-[#f3f3f3] text-[5.5px]">
                  {s}
                </span>
              ))}
              <span className="cs2-a cs3-size absolute left-0 top-0 h-[16px] w-[24px] rounded-[3px] border border-black" />
            </span>
            <p className="mt-1.5 rounded-[3px] bg-[#f4f4f4] py-[2px] text-center text-[4.5px] text-black/55">Valt normaal uit — kies je gebruikelijke maat.</p>
            <p className="mt-1.5 flex items-center gap-1 text-[5px] text-[#2a9d55]">
              <span className="size-1 rounded-full bg-[#2a9d55]" />
              Op voorraad
            </p>
            <span className="cs2-a cs3-add relative mt-1 grid h-[20px] place-items-center overflow-hidden rounded-[3px] bg-black text-[6.5px] font-semibold text-white">
              In Winkelwagen
              <span className="cs2-a cs3-adding absolute inset-0 grid place-items-center bg-[#666]">Toevoegen...</span>
            </span>
            <p className="mt-1.5 rounded-[3px] border border-dashed border-[#9cc9e8] bg-[#eef8fd] py-[3px] text-center text-[5.5px]">
              <b>Tijdelijke actie:</b> 2+1 gratis op alle producten
            </p>
            <p className="mt-1 rounded-[3px] bg-[#f4f4f4] py-[3px] text-center text-[5px] text-black/60">Gratis verzending vanaf €50 naar 🇳🇱 Nederland</p>
          </div>
        </div>

        {/* ---- the cart drawer ---- */}
        <span className="cs2-a cs3-dim absolute inset-0 bg-black" />
        <div className="cs2-a cs3-drawer absolute bottom-0 right-0 top-0 w-[190px] bg-white px-[10px] shadow-[-20px_0_40px_-20px_rgba(0,0,0,0.35)]">
          <p className="flex h-[26px] items-center gap-1.5 border-b border-black/[0.07] text-[8px] font-semibold">
            Winkelwagen
            <span className="relative grid size-[10px] place-items-center rounded-full text-[5.5px] font-bold" style={{ background: HF.yellow }}>
              <span className="cs2-a cs3-q1 absolute">1</span>
              <span className="cs2-a cs3-q2 absolute">2</span>
            </span>
            <span className="ml-auto text-[8px] font-normal">✕</span>
          </p>
          <p className="mt-1.5 text-center text-[5.5px] font-semibold">Voeg Meer Toe Voor Gratis HappyFlops!</p>
          <span className="relative mx-1 mt-2 block h-[2px] rounded-full bg-black/10">
            <span className="cs2-a cs3-ship absolute inset-y-0 left-0 w-full origin-left rounded-full" style={{ background: HF.yellow }} />
            {[0, 50, 100].map((p) => (
              <span key={p} className="absolute top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${p}%`, background: p === 0 ? HF.yellow : "#e9e9e9" }} />
            ))}
          </span>
          <span className="mt-2 grid grid-cols-3 text-[4.5px]">
            <span>
              <b>✓ Bespaar €0</b>
              <br />✓ Gratis verzending boven €50
            </span>
            <span className="text-center">
              <b>Gratis Paar</b>
              <br />3 halen, 2 betalen
            </span>
            <span className="text-right">
              <b>2x Gratis Paar</b>
              <br />5 halen, 3 betalen
            </span>
          </span>
          {/* the slipper, with the quantity going from 1 to 2 */}
          <div className="mt-2.5 flex items-center gap-2 rounded-[4px] border border-black/[0.08] p-1.5">
            <img src="/images/slipper-3.jpg" alt="" className="h-[30px] w-[34px] rounded-[3px] object-cover" />
            <div className="flex-1">
              <p className="text-[6.5px] font-semibold">HappyFlops Original</p>
              <p className="text-[5px] text-black/60">Roze • 40/41</p>
              <p className="mt-0.5 text-[6.5px] font-semibold">€34,95</p>
            </div>
            <span className="flex items-center gap-1 text-[6px]">
              <span className="grid size-[10px] place-items-center rounded-[2px] bg-black text-white">−</span>
              <span className="relative w-[6px] text-center">
                <span className="cs2-a cs3-q1 absolute inset-0">1</span>
                <span className="cs2-a cs3-q2 absolute inset-0">2</span>
              </span>
              <span className="cs2-a cs3-plus grid size-[10px] place-items-center rounded-[2px] bg-black text-white">+</span>
            </span>
          </div>
          <p className="mt-3 text-[7px] font-semibold">Deze zul je geweldig vinden</p>
          <div className="mt-1.5 flex items-center gap-2 rounded-[4px] border border-black/[0.08] p-1.5">
            <img src="/images/slipper-3.jpg" alt="" className="h-[26px] w-[30px] rounded-[3px] object-cover" style={{ filter: colours[0].filter }} />
            <span className="flex-1 text-[5.5px]">
              <b>HappyFlops Original</b>
              <br />
              <span className="text-black/60">Beige</span>
            </span>
            <span className="rounded-[3px] bg-black px-1.5 py-1 text-[5.5px] font-semibold text-white">+ €34,95</span>
          </div>
          <div className="absolute inset-x-[10px] bottom-[38px] flex items-center justify-between rounded-[4px] border border-black/[0.08] px-2 py-1.5">
            <span className="text-[5.5px]">
              <b>Bescherming van verzending: €1,99</b>
              <br />
              <span className="text-black/60">Tegen schade, verlies of diefstal</span>
            </span>
            <span className="h-[8px] w-[14px] rounded-full bg-black/15" />
          </div>
          <span className="cs2-a cs3-checkout absolute inset-x-[10px] bottom-[10px] grid h-[22px] place-items-center rounded-[3px] bg-black text-[6.5px] font-semibold text-white">
            <span className="cs2-a cs3-q1 absolute">Afrekenen • €34,95</span>
            <span className="cs2-a cs3-q2 absolute">Afrekenen • €69,90</span>
          </span>
        </div>

        {/* ---- the Shopify checkout ---- */}
        <div className="cs2-a cs3-co absolute inset-0 bg-white">
          <div className="flex h-[38px] items-center pt-[10px] justify-center gap-2 border-b border-black/[0.07]">
            <svg viewBox="0 0 40 14" className="h-[9px] w-[26px]">
              <path d="M3 3c8 9 26 9 34 0" fill="none" stroke={HF.yellow} strokeWidth="4.5" strokeLinecap="round" />
            </svg>
            <span className="text-center">
              <span className="block text-[7px] font-semibold">1,000,000+ blije klanten wereldwijd</span>
              <span className="block text-[5px] text-black/60">🚚 Gratis verzending Benelux | ✔ Veilig afrekenen</span>
            </span>
          </div>
          {/* the order summary, on Happy Flops' cream yellow */}
          <div className="absolute bottom-0 left-[262px] right-0 top-[38px] px-3 pt-3" style={{ background: HF.cream }}>
            <span className="flex items-center gap-2">
              <span className="relative">
                <img src="/images/slipper-3.jpg" alt="" className="size-[26px] rounded-[4px] border border-black/10 bg-white object-cover" />
                <span className="absolute -right-1 -top-1 grid size-[9px] place-items-center rounded-full bg-black text-[5px] text-white">2</span>
              </span>
              <span className="flex-1 text-[6px]">
                <span className="block font-semibold">HappyFlops Original</span>
                <span className="block text-black/60">Roze / 40/41</span>
              </span>
              <span className="text-[6px]">€ 69,90</span>
            </span>
            <span className="mt-2.5 flex gap-1.5">
              <span className="h-[16px] flex-1 rounded-[3px] border border-black/15 bg-white px-1.5 text-[5px] leading-[16px] text-black/60">Kortingscode of cadeaubon</span>
              <span className="grid h-[16px] place-items-center rounded-[3px] px-1.5 text-[5px] font-semibold text-black/60" style={{ background: "#f6e7a6" }}>
                Toepassen
              </span>
            </span>
            <span className="mt-3 block space-y-1 text-[6px]">
              <span className="flex justify-between">
                <span>Subtotaal</span>
                <span>€ 69,90</span>
              </span>
              <span className="relative flex justify-between">
                <span>Verzending</span>
                <span className="cs2-a cs3-ship-a text-black/60">Bezorgadres invoeren</span>
                <span className="cs2-a cs3-ship-b absolute right-0 font-semibold">GRATIS</span>
              </span>
              <span className="flex justify-between pt-1 text-[8px] font-bold">
                <span>Totaal</span>
                <span>
                  <span className="text-[5px] font-normal text-black/60">EUR </span>€ 69,90
                </span>
              </span>
            </span>
          </div>
          {/* the form */}
          <div className="absolute left-[40px] top-[44px] w-[210px]">
            <p className="flex items-baseline justify-between text-[8px] font-semibold">
              Contact
              <span className="text-[5.5px] font-normal text-[#2463c7] underline">Inloggen</span>
            </p>
            <span className="relative mt-1 flex h-[16px] items-center rounded-[3px] border border-black/20 px-1.5 text-[6px]">
              <span className="cs2-a cs3-email-ph absolute text-black/60">E-mail</span>
              <span className="cs2-a cs3-type whitespace-nowrap">anna@voorbeeld.nl</span>
            </span>
            <p className="mt-2 text-[8px] font-semibold">Bezorging</p>
            {[
              [
                { w: "1fr", ph: "Voornaam (optioneel)", v: "Anna", d: 1 },
                { w: "1fr", ph: "Achternaam", v: "de Vries", d: 1 },
              ],
              [{ w: "1fr", ph: "Adres", v: "Zonnelaan 12", d: 2 }],
              [
                { w: "1fr", ph: "Postcode", v: "1234 AB", d: 3 },
                { w: "1fr", ph: "Stad", v: "Amsterdam", d: 3 },
              ],
            ].map((row, r) => (
              <span key={r} className="mt-1 grid gap-1" style={{ gridTemplateColumns: row.map((f) => f.w).join(" ") }}>
                {row.map((f) => (
                  <span key={f.ph} className="relative flex h-[16px] items-center rounded-[3px] border border-black/20 px-1.5 text-[6px]">
                    <span className={`cs2-a cs3-ph${f.d} absolute text-black/60`}>{f.ph}</span>
                    <span className={`cs2-a cs3-fill${f.d}`}>{f.v}</span>
                  </span>
                ))}
              </span>
            ))}
            <p className="mt-2 text-[7px] font-semibold">Verzendwijze</p>
            <span className="relative mt-1 block h-[14px]">
              <span className="cs2-a cs3-ship-a absolute inset-0 grid place-items-center rounded-[3px] bg-[#f3f3f3] text-[5px] text-black/60">
                Voer je bezorgadres in om de verzendmethoden te zien.
              </span>
              <span className="cs2-a cs3-ship-b absolute inset-0 flex items-center justify-between rounded-[3px] border border-[#2463c7] bg-[#f2f7ff] px-1.5 text-[5.5px] font-semibold">
                Standaardverzending (incl. Track&amp;Trace)
                <span>GRATIS</span>
              </span>
            </span>
            <p className="mt-2 text-[8px] font-semibold">Betaling</p>
            <span className="relative mt-1 block overflow-hidden rounded-[3px] border border-black/15">
              {[
                { n: "iDEAL | Wero", logo: "iD" },
                { n: "Creditcard", logo: "VISA" },
                { n: "Pay With Klarna", logo: "K." },
              ].map((p, i) => (
                <span key={p.n} className={`flex h-[16px] items-center gap-1.5 px-1.5 text-[6px] ${i ? "border-t border-black/10" : ""}`}>
                  <span className="size-[6px] rounded-full border border-black/30" />
                  {p.n}
                  <span className="ml-auto rounded-[2px] px-1 text-[4.5px] font-bold" style={{ background: i === 0 ? HF.ideal : i === 1 ? "#1a1f71" : "#ffb3c7", color: i === 2 ? "#111" : "#fff" }}>
                    {p.logo}
                  </span>
                </span>
              ))}
              {/* iDEAL | Wero, once picked */}
              <span className="cs2-a cs3-ideal absolute inset-x-0 top-0 flex h-[16px] items-center gap-1.5 border border-[#2463c7] bg-[#f2f7ff] px-1.5 text-[6px] font-semibold">
                <span className="grid size-[6px] place-items-center rounded-full bg-[#2463c7]">
                  <span className="size-[2px] rounded-full bg-white" />
                </span>
                iDEAL | Wero
                <span className="ml-auto rounded-[2px] px-1 text-[4.5px] font-bold text-white" style={{ background: HF.ideal }}>
                  iD
                </span>
              </span>
            </span>
            <span className="cs2-a cs3-pay relative mt-3 grid h-[20px] place-items-center overflow-hidden rounded-[4px] text-[6.5px] font-semibold" style={{ background: HF.button }}>
              Bestelling nakijken
              <span className="cs2-a cs3-spin absolute inset-0 grid place-items-center" style={{ background: HF.button }}>
                <span className="size-[8px] rounded-full border-[1.5px] border-black/70 border-t-transparent" />
              </span>
            </span>
          </div>
        </div>

        {/* ---- the iDEAL | Wero page ---- */}
        <div className="cs2-a cs3-idealpage absolute inset-0 bg-[#1f1f1f] text-white">
          <div className="flex h-[40px] items-center pt-[10px] px-[40px]" style={{ background: HF.ideal }}>
            <span className="flex items-center gap-1 text-[6px] font-bold">
              <span className="grid size-[12px] place-items-center rounded-[2px] bg-white text-[5px]" style={{ color: HF.ideal }}>
                iD
              </span>
              | wero
            </span>
            <span className="mx-auto text-center leading-tight">
              <span className="block text-[6px]">Happy Flops</span>
              <span className="block text-[8px] font-bold">€69,90</span>
            </span>
            <span className="w-[30px]" />
          </div>
          <div className="absolute inset-x-0 bottom-[20px] top-[60px] grid grid-cols-2">
            <div className="grid place-items-center border-r border-white/20">
              <div className="text-center">
                <span className="relative mx-auto grid size-[74px] place-items-center rounded-[6px] bg-white">
                  <svg viewBox="0 0 21 21" className="size-[63px]" shapeRendering="crispEdges">
                    {qr.map(([x, y]) => (
                      <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#111" />
                    ))}
                  </svg>
                  <span className="absolute grid size-[14px] place-items-center rounded-[2px] bg-white text-[5px] font-bold" style={{ color: HF.ideal }}>
                    iD
                  </span>
                  {/* paid in the bank app */}
                  <span className="cs2-a cs3-paid absolute inset-0 grid place-items-center rounded-[6px] bg-white/90">
                    <span className="grid size-[26px] place-items-center rounded-full bg-[#2a9d55] text-[13px] font-bold text-white">✓</span>
                  </span>
                </span>
                <p className="mt-2.5 font-serif text-[9px] leading-tight">
                  Scan met je bank app
                  <br />
                  om te betalen
                </p>
              </div>
            </div>
            <div className="grid place-items-center">
              <div className="text-center">
                <p className="font-serif text-[9px] leading-tight">
                  Of log in via
                  <br />
                  internetbankieren
                </p>
                <span className="mt-2 inline-block rounded-full border border-white/80 px-5 py-1 text-[6px] font-semibold">Kies je bank</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---- the thank-you page ---- */}
        <div className="cs2-a cs3-done absolute inset-0 bg-white">
          <div className="flex h-[38px] items-center pt-[10px] justify-center gap-2 border-b border-black/[0.07]">
            <svg viewBox="0 0 40 14" className="h-[9px] w-[26px]">
              <path d="M3 3c8 9 26 9 34 0" fill="none" stroke={HF.yellow} strokeWidth="4.5" strokeLinecap="round" />
            </svg>
            <span className="text-[7px] font-semibold">1,000,000+ blije klanten wereldwijd</span>
          </div>
          <div className="absolute left-[40px] top-[54px] w-[220px]">
            <span className="flex items-center gap-2">
              <span className="cs2-a cs3-check grid size-[24px] place-items-center rounded-full text-[12px] font-bold" style={{ background: HF.yellow }}>
                ✓
              </span>
              <span>
                <span className="block text-[6px] text-black/60">Bestelling #HF10482</span>
                <span className="block font-display text-[12px] font-black tracking-tight">Bedankt, Anna!</span>
              </span>
            </span>
            <span className="mt-3 block rounded-[4px] border border-black/10 p-2 text-[6px]">
              <b>Je bestelling is bevestigd</b>
              <br />
              <span className="text-black/55">Je ontvangt zo een e-mail met je Track&amp;Trace.</span>
            </span>
          </div>
          <div className="absolute bottom-0 left-[262px] right-0 top-[38px]" style={{ background: HF.cream }} />
          {/* confetti in the shop's colours */}
          {[
            { x: 70, c: HF.yellow, d: 0 },
            { x: 120, c: "#f6b8c4", d: 1 },
            { x: 170, c: HF.sky, d: 2 },
            { x: 215, c: HF.yellow, d: 1 },
            { x: 300, c: "#f6b8c4", d: 0 },
            { x: 345, c: HF.sky, d: 2 },
            { x: 250, c: "#111111", d: 3 },
            { x: 395, c: HF.yellow, d: 3 },
          ].map((p, i) => (
            <span key={i} className={`cs2-a cs3-confetti${p.d} absolute top-0 block h-[7px] w-[4px] rounded-[1px]`} style={{ left: p.x, background: p.c }} />
          ))}
        </div>

        {/* ---- the result, in NXT Frame's colours ---- */}
        <div className="cs2-a cs3-result absolute inset-x-[14px] bottom-[30px] grid grid-cols-3 gap-2">
          {[
            { k: "3 stappen", v: "van product tot betaald", tone: "bg-forest text-lime" },
            { k: "iDEAL", v: "en Klarna direct in de checkout", tone: "bg-[#440220] text-[#fcbbb9]" },
            { k: "+40%", v: "bestellingen", tone: "bg-lime text-forest" },
          ].map((t) => (
            <span key={t.k} className={`rounded-lg p-2.5 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.5)] ${t.tone}`}>
              <span className="block font-display text-[15px] font-semibold leading-none tracking-tight">{t.k}</span>
              <span className="mt-1 block text-[7px] leading-tight opacity-80">{t.v}</span>
            </span>
          ))}
        </div>
        <span className="cs2-a cs3-result absolute bottom-[12px] right-[14px] text-[7px] text-black/60">Voorbeeld, ter illustratie</span>

        {/* the cursor, with a ring at every click */}
        <span className="cs2-a cs3-ring absolute left-0 top-0 size-6 rounded-full border-2 border-black/70" />
        <svg className="cs2-a cs3-cursor absolute left-0 top-0 size-[18px] drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]" viewBox="0 0 24 24">
          <path d="M5 3l14 8-6 1.5L10 19z" fill="#111" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/**
 * "Niet alleen mooi, ook converterend": one calm card that scrolls past like any other section (no
 * pinning, no scroll script): the tag, statement and copy on the left, straight on the page, the proof
 * and buttons at its foot, and on the right the laptop film (Raylight) with a progress bar with
 * chapters like a video player. It only plays while on screen, and motion-free visitors get the
 * poster standing still.
 */
export default function ConvertShowcase() {
  const host = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  // the film (1.1 MB) is only fetched once the section comes within a screen or so; until then the poster shows
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    const ahead = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setNear(true);
      ahead.disconnect();
    }, { rootMargin: "800px 0px" });
    ahead.observe(el);
    return () => {
      io.disconnect();
      ahead.disconnect();
    };
  }, []);

  // the video starts when the section scrolls into view (from the top the first time, so the laptop
  // arrives), pauses when it leaves; the progress bar follows the video's own clock. Visitors who
  // prefer less motion get the poster: the laptop open on the checkout.
  const started = useRef(false);
  useEffect(() => {
    const v = video.current;
    if (!v || !near || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!onScreen) {
      v.pause();
      return;
    }
    if (!started.current) {
      v.currentTime = 0;
      started.current = true;
    }
    v.play().catch(() => {});
    let raf = 0;
    const tick = () => {
      if (progress.current && v.duration) progress.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onScreen, near]);

  const live = onScreen;

  return (
    <section ref={host} data-zone="green" className="overflow-x-clip bg-cream pb-16 pt-14 text-forest md:pb-40 md:pt-16">
      <Container>
        {/* the copy on the left, straight on the page; the laptop playing the film on the right */}
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/* left on desktop: tag, statement and copy at the top, the proof and the buttons at the foot. On
              phones this wrapper dissolves (contents) so the order becomes: copy, the film, then the proof. */}
          <div className="contents lg:flex lg:flex-col lg:justify-between lg:gap-12 lg:py-8">
            <div className="order-1 lg:order-none">
              <Eyebrow>Conversie</Eyebrow>
              <h2 className="mt-6 t-section text-forest md:mt-8">
                Niet alleen mooi, <span className="serif-italic text-forest">ook converterend</span>
              </h2>
              <p className="mt-6 max-w-md text-forest/75 t-lead">
                Een website moet kloppen bij jouw merk én bezoekers omzetten in klanten. Zo wordt design geen kostenpost,
                maar je beste verkoper.
              </p>
            </div>

            <div className="order-3 lg:order-none">
              {/* proof: the clients' marks, and one result */}
              <span className="inline-flex items-center">
                <span className="grid h-10 place-items-center rounded-xl bg-paper px-3 shadow-sm">
                  <img src="/images/happy-flops-logo.png" alt="Happy Flops" className="h-4 w-auto" loading="lazy" />
                </span>
                <span className="-ml-1.5 grid h-10 place-items-center rounded-xl bg-paper px-3 shadow-sm">
                  <img src="/images/hypotheekhaven-logo.svg" alt="Hypotheekhaven" className="h-3.5 w-auto" loading="lazy" />
                </span>
              </span>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-forest/75">
                <span className="font-semibold text-forest">Happy Flops</span> kreeg 40% meer bestellingen met een webshop die
                gebouwd is om te verkopen.
              </p>
              <div className="mt-7 flex flex-wrap items-start gap-x-8 gap-y-4">
                <span className="flex flex-col gap-2">
                  <Button variant="dark" href="/contact">
                    Plan een kennismaking
                  </Button>
                  <Reassure />
                </span>
                <TextLink href="/aanpak" className="mt-3">Zo werk ik</TextLink>
              </div>
            </div>
          </div>

          {/* right: the laptop playing the film, straight on the page */}
          <div
            className={`cs2 relative order-2 grid lg:order-none place-items-center pb-16 md:pb-20 pt-6 sm:pt-10 lg:min-h-[560px] ${live ? "" : "cs2-paused"}`}
            style={{ "--T": `${LOOP_S}s` } as CSSProperties}
          >
            {/* a soft floor of shade under the laptop */}
            <span className="pointer-events-none absolute inset-x-[10%] bottom-[16%] h-24 rounded-[50%] bg-[radial-gradient(closest-side,rgba(2,38,30,0.12),transparent)]" aria-hidden="true" />

            {/* a card floating just over the window's edge, for depth (wide screens only) */}
            <span className="cs-float cs-float-late pointer-events-none absolute bottom-[20%] right-[3%] z-10 hidden items-center gap-2 rounded-xl bg-forest px-3 py-2 text-xs text-paper shadow-[0_18px_40px_-16px_rgba(2,38,30,0.6)] lg:inline-flex" aria-hidden="true">
              <span className="grid size-6 place-items-center rounded-full bg-lime text-[11px] font-bold text-forest">3</span>
              <span>
                <span className="block font-semibold">Afrekenen in 3 stappen</span>
                <span className="block text-[11px] text-paper/60">product, winkelwagen, iDEAL</span>
              </span>
            </span>

            {/* the laptop film: the full width of the Raylight frame, wider than its column so the laptop reads
                large; its cream drops out against the page (.cs-video, darken), so it never reads as a box
                over the copy, and it never catches clicks */}
            <video
              ref={video}
              src={near ? VIDEO.src : undefined}
              // the poster waits too: it is far below the first screen
              poster={near ? VIDEO.poster : undefined}
              width={VIDEO.w}
              height={VIDEO.h}
              muted
              loop
              playsInline
              preload={near ? "auto" : "none"}
              aria-hidden="true"
              className="cs-video pointer-events-none relative w-[154%] max-w-none lg:-ml-[30%] lg:w-[167%] lg:justify-self-start xl:-ml-[32%] xl:w-[178%]"
            />

            {/* one progress bar for the whole loop, with its chapters */}
            <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 sm:inset-x-8">
              <div className="relative flex-1 pb-4" aria-hidden="true">
                <span className="block h-1 overflow-hidden rounded-full bg-forest/15">
                  <span ref={progress} className="block h-full origin-left rounded-full bg-forest" style={{ transform: "scaleX(0)" }} />
                </span>
                {chapters.map((c) => (
                  <span key={c.label} className="absolute top-0 h-1 w-px bg-cream" style={{ left: `${c.at}%` }}>
                    <span className={`absolute top-2.5 hidden whitespace-nowrap text-[10px] text-forest/70 sm:block ${c.at === 0 ? "left-0" : "-translate-x-1/2"}`}>{c.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
