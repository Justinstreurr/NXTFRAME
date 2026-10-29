"use client";

import { useEffect, useState } from "react";
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
 * Items with sub-links (branches, werk, diensten) open as an accordion.
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

  // lock scroll while open, close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const fg = hero ? "text-(--hp-fg) hp-t" : "text-brown";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`grid size-11 place-items-center rounded-full ring-1 ring-current/25 transition-colors hover:bg-current/10 lg:hidden ${fg}`}
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
          <Link href="/" aria-label="NXT Frame home" onClick={() => setOpen(false)}>
            <Logo size="md" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center rounded-full"
            aria-label="Menu sluiten"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-4" aria-label="Mobiel menu">
          <ul className="my-auto space-y-1">
            {items.map((l) =>
              l.links ? (
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
                      {l.links.map((s) => (
                        <li key={s.label}>
                          <a href={s.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl py-2 text-base font-medium text-brown/85">
                            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brown/[0.06]">
                              <BranchIcon name={s.icon} className="size-4.5" />
                            </span>
                            {s.label}
                          </a>
                        </li>
                      ))}
                      <li>
                        <a href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 pl-1 text-sm font-semibold text-brown/60">
                          Alles over {l.label.toLowerCase()} <ArrowIcon className="size-3.5" />
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-brown/10 py-4 font-display text-3xl font-semibold tracking-tight"
                >
                  {l.label}
                  <ArrowIcon className="size-4 text-brown/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              ),
            )}
            <li>
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-4 font-display text-3xl font-semibold tracking-tight"
              >
                Contact
                <ArrowIcon className="size-4 text-brown/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          </ul>
        </nav>

        <div className="px-6 pb-8 pt-4">
          <Button variant="custom" className="w-full bg-pink px-6 py-4 text-base text-brown hover:bg-pink-hover" href="/contact">
            Plan een kennismaking
          </Button>
          <p className="mt-4 text-center text-sm text-brown/60">hallo@nxtframe.ai</p>
        </div>
      </div>,
          document.body,
        )}
    </>
  );
}
