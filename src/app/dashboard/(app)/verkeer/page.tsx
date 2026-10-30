import { requireAdmin } from "@/lib/supabase/server";
import { BarList, Card, DayColumns, Empty, PageHead, PeriodTabs, Stat, Table } from "@/components/dashboard/ui";
import { countBy, duration, median, pct, perDay, period, since, source, uniq, type PageView } from "@/lib/dashboard/data";

export const metadata = { title: "Bezoekers" };

/* Who comes, from where, on what, and how long they stay on each page. */
export default async function Traffic({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const p = period((await searchParams).p);
  const { supabase } = await requireAdmin();
  const views = await since<PageView>(supabase, "page_views", "*", p.since);

  const visitors = uniq(views, (v) => v.visitor);
  const timed = views.filter((v) => (v.duration_ms ?? 0) > 1000);
  // a visitor's first page in the period is where they landed
  const firstView = new Map<string, PageView>();
  for (const v of [...views].reverse()) if (!firstView.has(v.visitor)) firstView.set(v.visitor, v);
  const landings = [...firstView.values()];
  const single = [...countBy(views, (v) => v.visitor)].filter((x) => x.value === 1).length;

  const byPath = new Map<string, PageView[]>();
  for (const v of views) byPath.set(v.path, [...(byPath.get(v.path) ?? []), v]);
  const pages = [...byPath.entries()]
    .map(([path, list]) => {
      const t = list.map((v) => v.duration_ms ?? 0).filter((ms) => ms > 1000);
      const s = list.map((v) => v.max_scroll ?? 0);
      return { path, views: list.length, visitors: uniq(list, (v) => v.visitor), time: median(t), scroll: Math.round(median(s)) };
    })
    .sort((a, b) => b.views - a.views);

  const campaigns = countBy(views.filter((v) => v.utm_campaign), (v) => `${v.utm_campaign} (${v.utm_source ?? "?"})`);

  return (
    <>
      <PageHead title="Bezoekers" intro="Zonder cookies gemeten: een bezoeker is een anonieme code die elke dag verandert. Bots en mensen met Do Not Track tellen niet mee.">
        <PeriodTabs active={p.key} base="/dashboard/verkeer" />
      </PageHead>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Bezoekers" value={visitors} />
        <Stat label="Paginaweergaven" value={views.length} hint={visitors ? `${(views.length / visitors).toFixed(1).replace(".", ",")} per bezoeker` : undefined} />
        <Stat label="Gem. tijd op pagina" value={timed.length ? duration(median(timed.map((v) => v.duration_ms!))) : "–"} hint="mediaan" />
        <Stat label="Eén pagina en weg" value={pct(single, visitors)} hint="bekeek maar één pagina" />
      </div>

      <Card title="Bezoekers per dag" className="mt-3">
        <DayColumns days={perDay(views, p.days)} />
      </Card>

      <Card title="Per pagina" className="mt-3">
        {pages.length ? (
          <Table head={["Pagina", "Weergaven", "Bezoekers", "Tijd op pagina", "Gescrold"]}>
            {pages.map((r) => (
              <tr key={r.path}>
                <td className="px-5 py-2.5 md:px-6"><a href={r.path} target="_blank" rel="noopener noreferrer" className="hover:underline">{r.path}</a></td>
                <td className="px-5 py-2.5 tabular-nums md:px-6">{r.views}</td>
                <td className="px-5 py-2.5 tabular-nums md:px-6">{r.visitors}</td>
                <td className="px-5 py-2.5 tabular-nums md:px-6">{r.time ? duration(r.time) : "–"}</td>
                <td className="px-5 py-2.5 md:px-6">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-16 overflow-hidden rounded-full bg-forest/10"><span className="block h-full rounded-full bg-forest" style={{ width: `${r.scroll}%` }} /></span>
                    <span className="tabular-nums text-forest/70">{r.scroll}%</span>
                  </span>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <Empty>Nog geen bezoeken in deze periode.</Empty>
        )}
      </Card>

      <div className="mt-3 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        <Card title="Bronnen"><BarList rows={countBy(landings, (v) => source(v)).slice(0, 10)} /></Card>
        <Card title="Binnengekomen op"><BarList rows={countBy(landings, (v) => v.path).slice(0, 10)} /></Card>
        <Card title="Campagnes (utm)"><BarList rows={campaigns.slice(0, 10)} empty="Geen links met utm-codes gebruikt" /></Card>
        <Card title="Apparaat"><BarList rows={countBy(landings, (v) => v.device)} /></Card>
        <Card title="Browser"><BarList rows={countBy(landings, (v) => v.browser)} /></Card>
        <Card title="Land"><BarList rows={countBy(landings, (v) => v.country).slice(0, 10)} empty="Land is pas zichtbaar op Vercel" /></Card>
      </div>
    </>
  );
}
