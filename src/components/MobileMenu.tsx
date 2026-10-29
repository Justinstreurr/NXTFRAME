"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Logo from "./Logo";
import { ArrowIcon, Button } from "./ui";
import BranchIcon from "./BranchIcons";
import type { MenuItem } from "./menuData";

/**
 * Hamburger + full-screen overlay for phones and tablets (the inline links only show from lg).
 * The overlay is portalled to <body>: the sticky header's backdrop-filter would otherwise
 * become the containing block for `position: fixed` and clip it to the header.
 * Items with sub-links (branches, werk, diensten) open as an accordion. Each group lists its links
 * plus the featured cards of the desktop panel that aren't links already (the cases under Werk,
 * Redesign under Diensten), so a phone can reach everything the desktop menu shows.
 * While open, the page behind is inert and focus stays in the menu; closing hands focus back to the
 * hamburger.
 */
export default function MobileMenu({
  items,
  hero,
}: {
  items: MenuItem[];
  hero: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<string | null>(null);
  const burger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // lock scroll, make the page behind inert, move focus in; undo all of it on close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const behind = [...document.body.children].filter((el): el is HTMLElement => el instanceof HTMLElement && el.id !== "mobile-menu" && !el.inert);
    behind.forEach((el) => (el.inert = true));
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = burger.current;
    return () => {
      document.body.style.overflow = prev;
      behind.forEach((el) => (el.inert = false));
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const fg = hero ? "text-(--hp-fg) hp-t" : "text-brown";
  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={burger}
        type="button"
        onClick={() => setOpen(true)}
        className={`grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-current/25 transition-colors hover:bg-current/10 lg:hidden ${fg}`}
        aria-label="Menu openen"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 9h14M5 15h14" />
        </svg>
      </button>

      {/* only rendered while open, so it never renders on the server (no portal target there) */}
      {open &&
        createPortal(
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="glass-sheet fixed inset-0 z-[60] flex flex-col text-brown lg:hidden"
      >
        <div className="flex h-[72px] items-center justify-between px-6">
          <Link href="/" aria-label="NXT Frame home" onClick={close} className="py-2">
            <Logo size="md" />
          </Link>
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            className="grid size-11 place-items-center rounded-full"
            aria-label="Menu sluiten"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-4" aria-label="Mobiel menu">
          <ul className="mt-2 space-y-1">
            {items.map((l) => {
              if (!l.links) {
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={close}
                      className="flex items-center justify-between border-b border-brown/10 py-4 font-display text-3xl font-semibold tracking-tight"
                    >
                      {l.label}
                      <ArrowIcon className="size-4 rotate-45 text-brown/40" />
                    </Link>
                  </li>
                );
              }
              // the group's own overview link closes the list, so a link to the same page is left out
              const links = l.links.filter((s) => s.href !== l.href);
              const extra = (l.cards ?? []).filter((c) => !l.links!.some((s) => s.href === c.href));
              return (
                <li key={l.href} className="border-b border-brown/10">
                  <button
                    type="button"
                    onClick={() => setGroup(group === l.label ? null : l.label)}
                    aria-expanded={group === l.label}
                    className="flex w-full items-center justify-between py-4 font-display text-3xl font-semibold tracking-tight"
                  >
                    {l.label}
                    <svg viewBox="0 0 16 16" className={`size-5 text-brown/40 transition-transform duration-300 ${group === l.label ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m4 6 4 4 4-4" />
                    </svg>
                  </button>
                  {group === l.label && (
                    <ul className="grid gap-1 pb-4 sm:grid-cols-2">
                      {extra.map((c) => (
                        <li key={c.href}>
                          <MenuLink href={c.href} external={c.external} onClick={close}>
                            <img src={c.img} alt="" className="size-9 shrink-0 rounded-full object-cover" style={{ objectPosition: c.pos }} />
                            {c.title}
                          </MenuLink>
                        </li>
                      ))}
                      {links.map((s) => (
                        <li key={s.label}>
                          <MenuLink href={s.href} external={s.external} onClick={close}>
                            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brown/[0.06]">
                              <BranchIcon name={s.icon} className="size-4.5" />
                            </span>
                            {s.label}
                          </MenuLink>
                        </li>
                      ))}
                      <li>
                        <Link href={l.href} onClick={close} className="flex items-center gap-2 py-3 pl-1 text-sm font-semibold text-brown/60">
                          Alles over {l.label.toLowerCase()} <ArrowIcon className="size-3.5 rotate-45" />
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              );
            })}
            <li>
              <Link
                href="/contact"
                onClick={close}
                className="flex items-center justify-between py-4 font-display text-3xl font-semibold tracking-tight"
              >
                Contact
                <ArrowIcon className="size-4 rotate-45 text-brown/40" />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="px-6 pb-8 pt-4">
          <Button variant="custom" className="w-full bg-pink px-6 py-4 text-base text-brown hover:bg-pink-hover" href="/contact">
            Plan een kennismaking
          </Button>
          <p className="mt-2 text-center">
            <a href="mailto:hallo@nxtframe.ai" className="inline-block py-2 text-sm text-brown/60">hallo@nxtframe.ai</a>
          </p>
        </div>
      </div>,
          document.body,
        )}
    </>
  );
}

/** a sub-link in an open group: internal pages through the router, concept sites in a new tab */
function MenuLink({ href, external, onClick, children }: { href: string; external?: boolean; onClick: () => void; children: React.ReactNode }) {
  const cls = "flex items-center gap-3 rounded-xl py-2 text-base font-medium text-brown/85";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>
      {children}
      <ArrowIcon className="size-3.5 text-brown/40" />
    </a>
  ) : (
    <Link href={href} onClick={onClick} className={cls}>
      {children}
    </Link>
  );
}
