import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/server";
import { BarList, Card, Empty, PageHead, PeriodTabs, Stat } from "@/components/dashboard/ui";
import { countBy, pct, period, since, uniq, type ClickRow, type PageView } from "@/lib/dashboard/data";

export const metadata = { title: "Klikgedrag" };

/* What people click: per page the buttons and links, the calls to action, the way out, and a
   click map that shows where on the page the clicks land. */
export default async function Clicks({ searchParams }: { searchParams: Promise<{ p?: string; pagina?: string }> }) {
  const sp = await searchParams;
  const p = period(sp.p);
  const { supabase } = await requireAdmin();
  const [clicks, views] = await Promise.all([
    since<ClickRow>(supabase, "clicks", "view_id, path, label, href, kind, x, y, created_at", p.since),
    since<Pick<PageView, "id" | "visitor" | "path">>(supabase, "page_views", "id, visitor, path, created_at", p.since),
  ]);

  const pages = countBy(clicks, (c) => c.path);
  const page = sp.pagina && pages.some((x) => x.label === sp.pagina) ? sp.pagina : null;
  const scoped = page ? clicks.filter((c) => c.path === page) : clicks;
  const scopedViews = page ? views.filter((v) => v.path === page) : views;

  const toContact = scoped.filter((c) => c.href?.startsWith("/contact") || c.href?.startsWith("mailto:") || c.href?.startsWith("tel:"));
  const viewsWithContact = new Set(toContact.map((c) => c.view_id)).size;
  const external = scoped.filter((c) => c.kind === "extern");
  const faq = scoped.filter((c) => c.kind === "vraag");
  const elements = countBy(scoped, (c) => `${c.label}${c.href && !page ? ` → ${c.href}` : ""}`);

  // the click map: x as a share of the screen width, y in pixels down the page, scaled to the deepest click
  const maxY = Math.max(...scoped.map((c) => c.y ?? 0), 1);

  return (
    <>
      <PageHead title="Klikgedrag" intro={page ? `Alleen de pagina ${page}.` : "Alle pagina's samen. Kies hieronder een pagina voor de klikkaart."}>
        <PeriodTabs active={p.key} base="/dashboard/klikken" query={page ? `&pagina=${encodeURIComponent(page)}` : ""} />
      </PageHead>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <Link href={`/dashboard/klikken?p=${p.key}`} className={`rounded-full px-3 py-1 text-sm ring-1 ring-forest/15 ${!page ? "bg-forest text-cream" : "hover:bg-forest/[0.06]"}`}>Alle pagina&apos;s</Link>
        {pages.slice(0, 20).map((x) => (
          <Link key={x.label} href={`/dashboard/klikken?p=${p.key}&pagina=${encodeURIComponent(x.label)}`} className={`rounded-full px-3 py-1 text-sm ring-1 ring-forest/15 ${page === x.label ? "bg-forest text-cream" : "hover:bg-forest/[0.06]"}`}>
            {x.label} <span className="opacity-60">{x.value}</span>
          </Link>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Klikken" value={scoped.length} hint={`${uniq(scopedViews, (v) => v.visitor)} bezoekers`} />
        <Stat label="Naar contact" value={toContact.length} hint={`${pct(viewsWithContact, scopedViews.length)} van de weergaven`} accent />
        <Stat label="Vragen opengeklapt" value={faq.length} />
        <Stat label="Naar buiten" value={external.length} hint="links naar andere sites" />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[1.3fr_1fr]">
        <Card title="Waar op geklikt wordt">
          <BarList rows={elements.slice(0, 25)} empty="Nog geen klikken in deze periode." />
        </Card>
        <Card title={page ? "Klikkaart" : "Klikkaart (kies een pagina)"}>
          {page && scoped.length ? (
            <>
              <div className="relative mx-auto aspect-[9/16] max-h-[560px] overflow-hidden rounded-[10px] bg-cream ring-1 ring-forest/10" role="img" aria-label={`Klikkaart van ${page}: ${scoped.length} klikken`}>
                {[0.25, 0.5, 0.75].map((g) => <span key={g} className="absolute inset-x-0 border-t border-dashed border-forest/10" style={{ top: `${g * 100}%` }} aria-hidden="true" />)}
                {scoped.map((c, i) => (
                  <span
                    key={i}
                    title={`${c.label}${c.href ? ` → ${c.href}` : ""}`}
                    className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/40 ring-2 ring-cream"
                    style={{ left: `${c.x ?? 50}%`, top: `${((c.y ?? 0) / maxY) * 100}%` }}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-forest/70">Boven is de bovenkant van de pagina, onder de diepste klik ({Math.round(maxY)} px). Donkerder is vaker. Wijs een stip aan voor het element.</p>
            </>
          ) : (
            <Empty>{page ? "Geen klikken op deze pagina." : "Kies een pagina hierboven."}</Empty>
          )}
        </Card>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Card title="Klikken richting contact"><BarList rows={countBy(toContact, (c) => `${c.label} (${c.path})`).slice(0, 10)} empty="Nog niemand klikte naar contact." /></Card>
        <Card title="Links naar buiten"><BarList rows={countBy(external, (c) => c.href ?? c.label).slice(0, 10)} empty="Geen klikken naar andere sites." /></Card>
      </div>
    </>
  );
}
