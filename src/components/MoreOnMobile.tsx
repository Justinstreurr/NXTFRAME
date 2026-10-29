"use client";

import { Children, useState, type ReactNode } from "react";

/**
 * Keeps long lists short on phones: below md only the first `show` children of the list are
 * visible, with a button under it for the rest (show={0} folds the whole block behind the button).
 * From md up, and once opened, everything shows as before. The hidden part stays in the HTML, so
 * search engines still read it. The hiding itself is CSS ([data-fold] in globals.css).
 *
 * `as` and `className` are the list element's own, so a grid or ul keeps its layout.
 */
export default function MoreOnMobile({
  show,
  label,
  less = "Toon minder",
  as: Tag = "div",
  className = "",
  buttonClassName = "",
  children,
}: {
  show: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** the button text while folded, e.g. "Toon alle 6 voordelen" */
  label: string;
  less?: string;
  as?: "div" | "ul" | "ol" | "dl";
  className?: string;
  /** e.g. text colour on a dark section */
  buttonClassName?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  // nothing to fold: render the list as it is
  if (show > 0 && Children.count(children) <= show) return <Tag className={className}>{children}</Tag>;
  return (
    <>
      <Tag data-fold={show} className={`${open ? "is-open" : ""} ${className}`}>
        {children}
      </Tag>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-current/25 px-5 text-sm font-semibold md:hidden ${buttonClassName}`}
      >
        {open ? less : label}
        <svg viewBox="0 0 16 16" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>
    </>
  );
}
