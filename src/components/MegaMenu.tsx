"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { ArrowIcon, Container, TextLink } from "./ui";
import type { MenuItem } from "./menuData";

/**
 * Desktop menu. Items with cards/links open on hover or focus as one cream sheet that starts at the
 * top of the window and runs behind the bar, so the bar and the menu are a single surface: a
 * hairline under the bar, then a plain list of links on the left and three photo cards with a title
 * and one line on the right, and a quiet foot with the way to everything and to a kennismaking.
 * The sheet is portalled into the <header> (behind its contents) and the page behind blurs (overlay
 * portalled to <body>, under the header). Closes on mouse-out, Escape, or when focus leaves. The
 * photos play the same slat reveal as the Ons werk photos each time a menu opens.
 */
function SlatIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    // force a style pass with the slats still down, so flipping the class actually transitions
    void ref.current?.offsetHeight;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(r);
  }, []);
  return (
    <div ref={ref} className={`${on ? "in " : ""}${className}`}>
      {children}
    </div>
  );
}

const label = "text-xs font-semibold uppercase tracking-[0.16em] text-forest/55";

export default function MegaMenu({
  items,
  linkClass,
  floating = false,
}: {
  items: MenuItem[];
  linkClass: string;
  /** the bar floats as a pill below the top of the window (Nav theme="photo"), so it sits 8px lower */
  floating?: boolean;
}) {
  const [open, setOpen] = useState<string | null>(null);
  // the header the sheet is portalled into, found from the nav once it mounts
  const [host, setHost] = useState<HTMLElement | null>(null);
  const findHost = useCallback((el: HTMLElement | null) => setHost(el?.closest("header") ?? null), []);
  const timer = useRef(0);
  const show = (l: string) => {
    window.clearTimeout(timer.current);
    setOpen(l);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(null), 220);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer.current);
    };
  }, []);

  // the menu stays open anywhere on the header (the bar and the sheet are one surface) and closes
  // a moment after the pointer leaves it
  useEffect(() => {
    if (!host) return;
    const leave = () => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setOpen(null), 220);
    };
    const enter = () => window.clearTimeout(timer.current);
    host.addEventListener("mouseleave", leave);
    host.addEventListener("mouseenter", enter);
    return () => {
      host.removeEventListener("mouseleave", leave);
      host.removeEventListener("mouseenter", enter);
    };
  }, [host]);

  const active = items.find((i) => i.label === open && i.cards);

  return (
    <>
      <nav ref={findHost} className="col-start-2 hidden items-center gap-8 justify-self-center lg:flex" aria-label="Main">
        {items.map((i) => {
          // while a menu is open the other links step back, so the open one reads as the heading of the sheet
          const dim = active && active.label !== i.label ? "opacity-45!" : "";
          return i.cards ? (
            <a
              key={i.href}
              href={i.href}
              onMouseEnter={() => show(i.label)}
              onFocus={() => show(i.label)}
              aria-expanded={open === i.label}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 text-[15px] font-medium transition-opacity duration-300 ${linkClass} ${dim}`}
            >
              {i.label}
              <svg viewBox="0 0 16 16" className={`size-3.5 transition-transform duration-300 ${open === i.label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m4 6 4 4 4-4" />
              </svg>
            </a>
          ) : (
            <a key={i.href} href={i.href} onMouseEnter={hide} onFocus={hide} className={`text-[15px] font-medium transition-opacity duration-300 ${linkClass} ${dim}`}>
              {i.label}
            </a>
          );
        })}
      </nav>

      {active &&
        host &&
        createPortal(
          <div
            className="mega-sheet absolute inset-x-0 top-0 -z-10 hidden rounded-b-[48px] bg-cream text-forest lg:block"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
            }}
          >
            {/* the room the bar itself takes, so the hairline sits right under it */}
            <div className={floating ? "h-[80px]" : "h-[72px]"} aria-hidden="true" />
            <Container>
              <div key={active.label} className="grid gap-12 border-t border-forest/10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)] xl:gap-20">
                {/* the links: plain type, an arrow slides in under the pointer */}
                <div className="mega-rise">
                  <p className={label}>{active.listLabel}</p>
                  <ul className={`mt-5 grid gap-x-8 ${active.links!.length > 6 ? "xl:grid-cols-2" : ""}`}>
                    {active.links!.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target={l.external ? "_blank" : undefined}
                          rel={l.external ? "noopener noreferrer" : undefined}
                          className="group flex items-center gap-2 py-2 font-display text-[1.15rem] font-medium tracking-tight text-forest/75 transition-colors hover:text-forest"
                        >
                          {l.label}
                          <ArrowIcon className="size-3.5 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* three photo cards, each with a title and one line */}
                <div>
                  <p className={`mega-rise ${label}`}>{active.cardsLabel}</p>
                  <SlatIn className="mt-5 grid grid-cols-3 gap-5">
                    {active.cards!.map((c, n) => (
                      <a
                        key={c.title}
                        href={c.href}
                        target={c.external ? "_blank" : undefined}
                        rel={c.external ? "noopener noreferrer" : undefined}
                        className="mega-rise group block"
                        style={{ "--i": n + 1 } as CSSProperties}
                      >
                        <span className="relative block aspect-[4/3] overflow-hidden rounded-3xl bg-forest">
                          <span className="absolute inset-0 block transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                            <img src={c.img} alt="" className="size-full object-cover" style={{ objectPosition: c.pos }} loading="eager" decoding="async" />
                          </span>
                          {c.tag && <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-forest">{c.tag}</span>}
                          <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-cream text-forest transition-colors duration-300 group-hover:bg-lime">
                            <ArrowIcon className="size-4" />
                          </span>
                        </span>
                        <span className="mt-4 block font-display text-xl font-medium tracking-tight">{c.title}</span>
                        <span className="mt-1.5 block text-[15px] leading-relaxed text-forest/65">{c.body}</span>
                      </a>
                    ))}
                  </SlatIn>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3 border-t border-forest/10 py-6">
                <TextLink href={active.href}>Alles over {active.label.toLowerCase()}</TextLink>
                <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <span className="text-[13px] text-forest/60">Gratis · 30 minuten · vrijblijvend</span>
                  <TextLink href="/contact">Plan een kennismaking</TextLink>
                </span>
              </div>
            </Container>
          </div>,
          host,
        )}

      {active &&
        createPortal(
          <div className="mega-backdrop fixed inset-0 z-40 hidden bg-forest/30 backdrop-blur-md lg:block" onMouseEnter={hide} aria-hidden="true" />,
          document.body,
        )}
    </>
  );
}
