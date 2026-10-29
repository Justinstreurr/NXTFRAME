import type { ReactNode } from "react";
import PageShell from "./PageShell";
import { TextLink } from "./ui";

export type LegalSection = { id: string; title: string; body: ReactNode };

/* the running text of a legal section: paragraphs, lists, links and the odd table, styled from the
   wrapper so the page files stay plain markup */
const prose =
  "max-w-2xl text-base leading-relaxed text-forest/75 " +
  "[&_p+p]:mt-4 [&_ul+p]:mt-4 [&_ol+p]:mt-4 [&_table+p]:mt-5 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 " +
  "[&_li]:marker:text-forest/40 [&_strong]:font-semibold [&_strong]:text-forest " +
  "[&_a]:border-b [&_a]:border-forest/30 [&_a]:font-medium [&_a]:text-forest [&_a]:transition-colors hover:[&_a]:border-forest " +
  "[&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-forest [&_h3+p]:mt-2 " +
  "[&_table]:mt-5 [&_table]:w-full max-md:[&_table]:block max-md:[&_table]:overflow-x-auto max-md:[&_td]:min-w-[11rem] max-md:[&_th]:min-w-[11rem] [&_table]:text-left [&_table]:text-[15px] [&_th]:border-b [&_th]:border-forest/15 [&_th]:py-3 [&_th]:pr-4 [&_th]:font-semibold [&_th]:text-forest " +
  "[&_td]:border-b [&_td]:border-forest/10 [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top";

/**
 * Shared frame for the legal pages (privacy, voorwaarden): the PageShell header, then the contents
 * as a sticky list on the left and the numbered sections on the right, built like the FAQ so the
 * long read stays calm. Pages only pass their sections.
 */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  /** when the text was last changed, written out: "12 oktober 2026" */
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <PageShell eyebrow={eyebrow} title={title} intro={intro}>
      <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <nav aria-label="Op deze pagina" className="self-start lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/60">Op deze pagina</p>
          <ol className="mt-4 space-y-1">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="group flex gap-3 py-2 text-[15px] text-forest/70 transition-colors hover:text-forest">
                  <span className="tabular-nums text-forest/40 transition-colors group-hover:text-forest">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t border-forest/15 pt-6 text-[13px] text-forest/60">Laatst bijgewerkt op {updated}</p>
          <TextLink href="/contact" className="mt-4">Vraag erover? Neem contact op</TextLink>
        </nav>

        <div className="divide-y divide-forest/15 border-y border-forest/15">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 py-10 md:py-12">
              <span className="text-sm tabular-nums text-forest/50">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 t-sub text-forest">{s.title}</h2>
              <div className={`mt-5 ${prose}`}>{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
