"use client";

import { useOptimistic, useState, useTransition, type ReactNode } from "react";
import { moveCard } from "@/app/dashboard/actions";

/* A kanban board: cards are rendered on the server and handed in; this component only moves them.
   Drag a card onto another column, or use the small menu on the card (keyboard and phones). The
   card jumps at once and the database follows; if saving fails the page refresh puts it back. */

export type BoardCard = { id: string; column: string; node: ReactNode; value?: number };

export default function Board({
  kind,
  columns,
  cards,
  format,
}: {
  kind: "project" | "task";
  columns: { key: string; label: string; hint?: string }[];
  cards: BoardCard[];
  /** shows the summed `value` of a column in its head, e.g. euros */
  format?: "euro";
}) {
  const [optimistic, move] = useOptimistic(cards, (list, m: { id: string; to: string }) => list.map((c) => (c.id === m.id ? { ...c, column: m.to } : c)));
  const [, start] = useTransition();
  const [over, setOver] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);

  const go = (id: string, to: string) => {
    if (optimistic.find((c) => c.id === id)?.column === to) return;
    start(async () => {
      move({ id, to });
      await moveCard(kind, id, to);
    });
  };
  const euro = (n: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
      <div className="flex items-start gap-3">
        {columns.map((col) => {
          const list = optimistic.filter((c) => c.column === col.key);
          const sum = list.reduce((s, c) => s + (c.value ?? 0), 0);
          return (
            <section
              key={col.key}
              aria-label={col.label}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(col.key);
              }}
              onDragLeave={() => setOver((o) => (o === col.key ? null : o))}
              onDrop={(e) => {
                e.preventDefault();
                setOver(null);
                const id = e.dataTransfer.getData("text/plain");
                if (id) go(id, col.key);
              }}
              className={`w-[300px] shrink-0 rounded-[14px] p-2.5 transition-colors ${over === col.key ? "bg-lime/50 ring-2 ring-forest/30" : "bg-forest/[0.05]"}`}
            >
              <h2 className="mb-2.5 flex items-baseline justify-between gap-2 px-1.5 pt-0.5">
                <span className="text-sm font-semibold">{col.label}</span>
                <span className="text-xs tabular-nums text-forest/55">
                  {list.length}
                  {format === "euro" && sum > 0 ? ` · ${euro(sum)}` : ""}
                </span>
              </h2>
              {col.hint && list.length === 0 && <p className="px-1.5 pb-2 text-xs text-forest/45">{col.hint}</p>}
              <ul className="min-h-16 space-y-2">
                {list.map((c) => (
                  <li
                    key={c.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", c.id);
                      e.dataTransfer.effectAllowed = "move";
                      setDragging(c.id);
                    }}
                    onDragEnd={() => setDragging(null)}
                    className={`group relative cursor-grab rounded-[12px] bg-paper ring-1 ring-forest/10 transition-[box-shadow,opacity] hover:shadow-[0_10px_30px_-18px_rgba(2,38,30,0.45)] active:cursor-grabbing ${dragging === c.id ? "opacity-40" : ""}`}
                  >
                    {c.node}
                    <label className="absolute right-2 top-2 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100 max-lg:opacity-100">
                      <span className="sr-only">Verplaats naar</span>
                      <select
                        value={c.column}
                        onChange={(e) => go(c.id, e.target.value)}
                        className="cursor-pointer appearance-none rounded-full bg-cream py-0.5 pl-2 pr-5 text-[11px] text-forest/70 ring-1 ring-forest/15 [background-image:linear-gradient(45deg,transparent_50%,currentColor_50%),linear-gradient(135deg,currentColor_50%,transparent_50%)] [background-position:calc(100%-9px)_50%,calc(100%-6px)_50%] [background-repeat:no-repeat] [background-size:3px_3px]"
                      >
                        {columns.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
                      </select>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
