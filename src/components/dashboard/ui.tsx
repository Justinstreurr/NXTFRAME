import Link from "next/link";
import type { ReactNode } from "react";
import { FrameGlyph } from "@/components/Logo";
import { PERIODS } from "@/lib/dashboard/data";

/* The dashboard's building blocks, in the site's style: cream page, paper cards with a hairline,
   forest ink, lime for the one thing that matters. Charts are a single series in forest, with a
   tooltip on hover; numbers always sit in ink, never in the bar colour. */

export function PageHead({ title, intro, children }: { title: ReactNode; intro?: string; children?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{title}</h1>
        {intro && <p className="mt-2 max-w-2xl text-sm text-forest/60">{intro}</p>}
      </div>
      {children}
    </header>
  );
}

export function Card({ title, action, children, className = "" }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[14px] bg-paper p-5 ring-1 ring-forest/10 md:p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && (
            <h2 className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
              <FrameGlyph className="size-2.5 text-forest/40" />
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint, accent = false }: { label: string; value: ReactNode; hint?: ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-[14px] p-5 ring-1 ${accent ? "bg-forest text-cream ring-forest" : "bg-paper ring-forest/10"}`}>
      <p className={`text-xs font-medium uppercase tracking-[0.08em] ${accent ? "text-lime" : "text-forest/55"}`}>{label}</p>
      <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] tabular-nums md:text-4xl">{value}</p>
      {hint && <p className={`mt-1 text-xs ${accent ? "text-cream/70" : "text-forest/55"}`}>{hint}</p>}
    </div>
  );
}

/** horizontal bars with the label and value in ink; the bar shows the share of the largest */
export function BarList({ rows, format = (n) => String(n), empty = "Nog geen data", hrefFor }: {
  rows: { label: string; value: number; sub?: string }[];
  format?: (n: number) => string;
  empty?: string;
  hrefFor?: (label: string) => string;
}) {
  if (!rows.length) return <Empty>{empty}</Empty>;
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <ul className="space-y-1.5">
      {rows.map((r) => {
        const inner = (
          <>
            <span className="absolute inset-y-0 left-0 rounded-[4px] bg-lime/70" style={{ width: `${Math.max(2, (r.value / max) * 100)}%` }} aria-hidden="true" />
            <span className="relative min-w-0 truncate">{r.label}</span>
            <span className="relative ml-auto shrink-0 pl-3 tabular-nums text-forest/70">
              {format(r.value)}
              {r.sub && <span className="ml-2 text-forest/45">{r.sub}</span>}
            </span>
          </>
        );
        return (
          <li key={r.label} className="text-sm">
            {hrefFor ? (
              <Link href={hrefFor(r.label)} className="relative flex items-center rounded-[4px] px-2.5 py-1.5 hover:bg-forest/[0.04]">{inner}</Link>
            ) : (
              <div className="relative flex items-center px-2.5 py-1.5">{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** one column per day; hover shows the day and both numbers */
export function DayColumns({ days }: { days: { day: string; visitors: number; views: number }[] }) {
  const max = Math.max(...days.map((d) => d.visitors), 1);
  const fmt = new Intl.DateTimeFormat("nl-NL", { weekday: "short", day: "numeric", month: "short" });
  const step = Math.ceil(days.length / 6);
  return (
    <div>
      <div className="relative flex h-44 items-end gap-[2px] border-b border-forest/15">
        {[0.5, 1].map((g) => (
          <span key={g} className="pointer-events-none absolute inset-x-0 border-t border-dashed border-forest/10" style={{ bottom: `${g * 100}%` }} aria-hidden="true" />
        ))}
        <span className="pointer-events-none absolute -top-1 right-0 -translate-y-full text-[11px] tabular-nums text-forest/45">{max}</span>
        {days.map((d) => (
          <div key={d.day} className="group relative flex h-full flex-1 items-end">
            <div className="w-full rounded-t-[4px] bg-forest transition-colors group-hover:bg-forest-hover" style={{ height: `${(d.visitors / max) * 100}%`, minHeight: d.visitors ? 3 : 0 }} />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-forest px-3 py-2 text-xs text-cream shadow-lg group-hover:block">
              <span className="block font-semibold">{fmt.format(new Date(d.day))}</span>
              {d.visitors} bezoekers · {d.views} weergaven
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex text-[11px] text-forest/45">
        {days.map((d, i) => (
          <span key={d.day} className="flex-1 text-center">{i % step === 0 ? new Date(d.day).getDate() : ""}</span>
        ))}
      </div>
    </div>
  );
}

/** `query` keeps other filters in the link, e.g. "&pagina=/contact" */
export function PeriodTabs({ active, base, query = "" }: { active: string; base: string; query?: string }) {
  return (
    <nav className="flex gap-1 rounded-full bg-paper p-1 ring-1 ring-forest/10" aria-label="Periode">
      {PERIODS.map((p) => (
        <Link
          key={p.key}
          href={`${base}?p=${p.key}${query}`}
          aria-current={p.key === active ? "page" : undefined}
          className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${p.key === active ? "bg-forest text-cream" : "text-forest/70 hover:bg-forest/[0.06]"}`}
        >
          {p.label}
        </Link>
      ))}
    </nav>
  );
}

const tones: Record<string, string> = {
  lime: "bg-lime text-forest",
  forest: "bg-forest text-cream",
  soft: "bg-forest/[0.07] text-forest/80",
  muted: "bg-transparent text-forest/50 ring-1 ring-forest/15",
};
export function Badge({ children, tone = "soft" }: { children: ReactNode; tone?: keyof typeof tones }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-[10px] border border-dashed border-forest/15 px-4 py-6 text-center text-sm text-forest/50">{children}</p>;
}

/* ---------- forms ---------- */

export const inputClass =
  "w-full rounded-[10px] border border-forest/15 bg-cream/60 px-3 py-2 text-sm text-forest outline-none transition-colors placeholder:text-forest/35 focus:border-forest focus:bg-paper";

export function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block text-xs font-medium text-forest/60 ${className}`}>
      {label}
      <span className="mt-1 block">{children}</span>
    </label>
  );
}

export function Submit({ children, tone = "forest" }: { children: ReactNode; tone?: "forest" | "lime" | "ghost" }) {
  const t = { forest: "bg-forest text-cream hover:bg-forest-hover", lime: "bg-lime text-forest hover:bg-lime-hover", ghost: "text-forest/60 hover:bg-forest/[0.06] hover:text-forest" }[tone];
  return <button type="submit" className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${t}`}>{children}</button>;
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="-mx-5 overflow-x-auto md:-mx-6">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-forest/10 text-xs uppercase tracking-[0.06em] text-forest/50">
            {head.map((h, i) => <th key={i} className="px-5 py-2.5 font-medium first:pl-5 md:px-6">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-forest/[0.07]">{children}</tbody>
      </table>
    </div>
  );
}
