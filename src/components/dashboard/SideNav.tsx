"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Overzicht" },
  { href: "/dashboard/verkeer", label: "Bezoekers" },
  { href: "/dashboard/klikken", label: "Klikgedrag" },
  { href: "/dashboard/aanvragen", label: "Aanvragen" },
  { href: "/dashboard/klanten", label: "Klanten" },
  { href: "/dashboard/projecten", label: "Projecten" },
];

/** the dashboard menu; `badge` puts the number of new requests next to Aanvragen */
export default function SideNav({ badge }: { badge: number }) {
  const path = usePathname();
  return (
    <nav aria-label="Dashboard" className="flex gap-1 overflow-x-auto lg:flex-col">
      {items.map((it) => {
        const active = it.href === "/dashboard" ? path === it.href : path.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center justify-between gap-3 rounded-full px-4 py-2 text-sm transition-colors lg:rounded-[10px] ${active ? "bg-lime font-semibold text-forest" : "text-cream/75 hover:bg-cream/10 hover:text-cream"}`}
          >
            {it.label}
            {it.href === "/dashboard/aanvragen" && badge > 0 && (
              <span className={`rounded-full px-2 text-xs font-semibold tabular-nums ${active ? "bg-forest text-lime" : "bg-lime text-forest"}`}>{badge}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
