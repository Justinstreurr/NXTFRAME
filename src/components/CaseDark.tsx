import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Container, Eyebrow, TextLink } from "./ui";
import WorkCases from "./WorkCases";
import WorkCursor from "./WorkCursor";
import { CasePhone } from "./CaseStudy";
import { work } from "./workData";
import { Deblur, FillWords, Pausable, ScrollLine } from "./CaseDarkFx";

/* ---------- The pieces of a case page, laid out after Instrument's Nike case ----------
   A page (see /werk/happy-flops) runs inside CaseBgShift, so the whole background changes colour at
   the BgMark markers between these pieces; the text takes the colour of the ground (currentColor),
   so every piece works on dark and light. Only the layout and the motion are Instrument's; the
   content is the client's. */

/** the client's logo big, and three pages of their site on phones under it, the middle one higher */
export function CaseDarkHero({ logo, alt, phones }: { logo: string; alt: string; phones: { src: string; alt: string }[] }) {
  return (
    <section data-zone="green" className="px-6 pb-20 pt-32 md:pb-32 md:pt-40">
      <img src={logo} alt={alt} className="mx-auto w-[min(82vw,1040px)]" />
      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-3 items-start gap-3 md:mt-20 md:gap-10">
        {phones.map((p, i) => (
          <CasePhone key={p.src} src={p.src} alt={p.alt} className={`ring-1 ring-white/15 ${i === 1 ? "" : "mt-10 md:mt-20"}`} eager />
        ))}
      </div>
    </section>
  );
}

/** the breadcrumb with the tags, and the story as one big paragraph */
export function CaseDarkIntro({ crumb, tags, children }: { crumb: string; tags: string[]; children: ReactNode }) {
  return (
    <Container>
      <div className="flex items-center justify-between border-b border-current/15 pb-3 text-[11px] uppercase tracking-[0.08em]">
        <p><Link href="/" className="hover:underline">Home</Link> <span className="opacity-40">/</span> <Link href="/werk" className="hover:underline">Werk</Link> <span className="opacity-40">/</span> <span className="opacity-50">{crumb}</span></p>
        <p className="hidden gap-4 opacity-50 sm:flex">{tags.map((t) => <span key={t}>#{t}</span>)}</p>
      </div>
      <p className="mt-8 font-display text-[clamp(1.35rem,0.9rem+1.3vw,2.15rem)] font-medium leading-[1.18] tracking-[-0.02em]">{children}</p>
    </Container>
  );
}

/** "Wat ik deed": a giant title that comes into focus, a line filling beside it */
export function CaseDarkTitle({ children }: { children: ReactNode }) {
  return (
    <section className="relative pb-10 pt-32 md:pt-48">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.12em]">Wat ik deed</p>
      <ScrollLine className="absolute left-[6%] top-48 hidden h-40 md:block" />
      <Container>
        <Deblur className="mx-auto mt-10 max-w-5xl text-center font-display text-[clamp(3.2rem,1rem+8vw,9.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.045em] will-change-[filter,transform]">
          {children}
        </Deblur>
      </Container>
    </section>
  );
}

export const panel = "overflow-hidden rounded-[14px] bg-[#f1f1f1]";

/** a full-page screenshot scrolling by itself on a monitor, on a light panel */
export function CaseDarkMonitor({ src, alt, to = "-83%" }: { src: string; alt: string; to?: string }) {
  return (
    <Container className="pt-24 md:pt-32">
      <Pausable className={`${panel} px-[8%] pb-[6%] pt-[5%]`}>
        <div className="mx-auto w-full max-w-4xl">
          <div className="overflow-hidden rounded-[10px] border-[6px] border-[#111] bg-white">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={src} alt={alt} className="hfd-move absolute inset-x-0 top-0 w-full" style={{ "--to": to, animation: "hfd-scroll 18s cubic-bezier(0.45,0,0.55,1) infinite alternate" } as CSSProperties} />
            </div>
          </div>
          <div className="mx-auto h-[9vw] max-h-28 w-[18%] bg-gradient-to-b from-[#3a3a3a] to-[#222]" />
          <div className="mx-auto h-2 w-[22%] rounded-sm bg-[#1b1b1b] shadow-[0_18px_30px_-6px_rgba(0,0,0,0.35)]" />
        </div>
      </Pausable>
    </Container>
  );
}

/** a faded lead-in and a statement: "De uitdaging: …" */
export function CaseDarkStatement({ lead, children }: { lead: string; children: ReactNode }) {
  return (
    <Container className="py-24 md:py-40">
      <p className="max-w-3xl font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.03em]">
        <span className="block opacity-45">{lead}</span>
        {children}
      </p>
    </Container>
  );
}

/** a short heading and a paragraph in a narrow centred column */
export function CaseDarkNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Container className="py-20 md:py-32">
      <div className="mx-auto max-w-xl">
        <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">{title}</h3>
        <p className="mt-5 text-[17px] leading-relaxed opacity-80">{children}</p>
      </div>
    </Container>
  );
}

/** one photo full width, slowly breathing */
export function CaseDarkPhoto({ src, alt, ratio = "3/2" }: { src: string; alt: string; ratio?: string }) {
  return (
    <Container>
      <Pausable className="overflow-hidden rounded-[14px]">
        <img src={src} alt={alt} className="hfd-move w-full object-cover" style={{ aspectRatio: ratio, animation: "hfd-float 14s ease-in-out infinite alternate", "--x0": "0%", "--x1": "0%", "--s": "1.04" } as CSSProperties} loading="lazy" />
      </Pausable>
    </Container>
  );
}

/** a field of cards in depth on black, drifting by: x/y in %, z from 0 (near, sharp) to 1 (far, blurred) */
export function CaseDarkField({ cards }: { cards: { src: string; x: number; y: number; z: number; w: number }[] }) {
  return (
    <Container className="pt-24 md:pt-40">
      <Pausable className="relative aspect-[2.7/1] min-h-[280px] overflow-hidden rounded-[14px] bg-black">
        {cards.map((c) => (
          <div key={c.src + c.x} className="absolute" style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, zIndex: Math.round((1 - c.z) * 10) }}>
            <div className="hfd-move overflow-hidden rounded-[4px] bg-white" style={{ filter: `blur(${(c.z * 7).toFixed(1)}px) brightness(${(1 - c.z * 0.45).toFixed(2)})`, animation: `hfd-float ${(16 + c.z * 18).toFixed(0)}s ease-in-out infinite alternate`, "--x0": `${10 - c.z * 6}%`, "--x1": `${-10 + c.z * 6}%` } as CSSProperties}>
              <img src={c.src} alt="" className="block w-full" loading="lazy" />
            </div>
          </div>
        ))}
      </Pausable>
    </Container>
  );
}

/** a page on desktop, the same page on a phone over its left side, with small labels */
export function CaseDarkDevices({ site, page, desktop, mobile }: { site: string; page: string; desktop: { src: string; alt: string }; mobile: { src: string; alt: string } }) {
  return (
    <Container className="pb-24 md:pb-40">
      <div className="relative md:pl-[16%]">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] opacity-70">{site} — desktop<br /><span className="opacity-35">{page}</span></p>
        <div className="overflow-hidden rounded-[8px] bg-white">
          <img src={desktop.src} alt={desktop.alt} className="block w-full" loading="lazy" />
        </div>
        <div className="mt-8 w-[46%] md:absolute md:left-0 md:top-[32%] md:mt-0 md:w-[19%]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] opacity-70">{site} — mobiel<br /><span className="opacity-35">{page}</span></p>
          <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
            <img src={mobile.src} alt={mobile.alt} className="block w-full" loading="lazy" />
          </div>
        </div>
      </div>
    </Container>
  );
}

/** "Resultaat:" and giant words that fill in as they scroll by */
export function CaseDarkResult({ words }: { words: string[] }) {
  return (
    <section className="overflow-hidden pb-24 md:pb-40">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.12em] opacity-70">Resultaat:</p>
      {/* as big as fits: the longest word just spans the window */}
      <div style={{ fontSize: `min(17rem, calc((100vw - 2rem) / ${(Math.max(...words.map((w) => w.length)) * 0.66).toFixed(2)}))` }}>
        <FillWords words={words} className="mt-8 text-center font-display font-extrabold uppercase leading-[0.82] tracking-[-0.05em]" />
      </div>
    </section>
  );
}

/** "Mijn rollen" in two columns */
export function CaseDarkRoles({ roles }: { roles: { group: string; items: string[] }[] }) {
  return (
    <Container className="pb-24 md:pb-40">
      <div className="mx-auto max-w-3xl">
        <h3 className="font-display text-2xl font-medium tracking-[-0.02em] opacity-80">Mijn rollen</h3>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          {roles.map((r) => (
            <div key={r.group}>
              <p className="text-[10px] uppercase tracking-[0.12em] opacity-60">{r.group}</p>
              <ul className="mt-4 space-y-2 text-[15px] opacity-75">{r.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

/** the other cases, as on the home page: the header line and the magazine spread of WorkCases */
export function CaseDarkOthers({ current }: { current: string }) {
  const others = work.filter((w) => w.href !== current).slice(0, 4);
  return (
    <Container className="pb-24 md:pb-32">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-b border-forest/20 pb-8 md:pb-10">
        <div>
          <Eyebrow className="max-w-xl">Meer werk</Eyebrow>
          <h2 className="mt-6 max-w-3xl t-section md:mt-8">
            Andere cases en <span className="serif-italic">concepten per branche</span>
          </h2>
        </div>
        <TextLink href="/werk" className="mb-2">Bekijk al het werk</TextLink>
      </div>
      <WorkCases items={others} />
      <WorkCursor />
    </Container>
  );
}
