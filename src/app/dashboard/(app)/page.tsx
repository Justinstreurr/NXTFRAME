import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/server";
import { Badge, BarList, Card, DayColumns, Empty, PageHead, PeriodTabs, Stat } from "@/components/dashboard/ui";
import {
  ago, countBy, date, dayFromNow, duration, minutesAgo, euro, median, pct, perDay, period, since, source, statusLabel, uniq,
  type Client, type PageView, type Project, type Submission, type Task,
} from "@/lib/dashboard/data";

export const metadata = { title: "Overzicht" };

/* The first screen: how the site is doing, what needs doing today, and where the money is. */
export default async function Overview({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const p = period((await searchParams).p);
  const { supabase } = await requireAdmin();
  const fiveMinAgo = minutesAgo(5);

  const [views, subs, { data: projects }, { data: clients }, { data: tasks }, { data: newSubs }] = await Promise.all([
    since<PageView>(supabase, "page_views", "id, visitor, path, referrer, utm_source, duration_ms, created_at", p.since),
    since<Submission>(supabase, "submissions", "id, created_at", p.since),
    supabase.from("projects").select("*").not("status", "in", "(afgerond,gestopt)").returns<Project[]>(),
    supabase.from("clients").select("id, name").returns<Pick<Client, "id" | "name">[]>(),
    supabase.from("tasks").select("*").eq("done", false).order("due", { ascending: true, nullsFirst: false }).limit(50).returns<Task[]>(),
    supabase.from("submissions").select("*").eq("status", "nieuw").order("created_at", { ascending: false }).limit(5).returns<Submission[]>(),
  ]);

  const visitors = uniq(views, (v) => v.visitor);
  const live = uniq(views.filter((v) => v.created_at >= fiveMinAgo), (v) => v.visitor);
  const times = views.map((v) => v.duration_ms ?? 0).filter((ms) => ms > 1000);
  const clientName = new Map((clients ?? []).map((c) => [c.id, c.name]));
  const list = projects ?? [];
  const pipeline = list.filter((x) => x.status === "lead" || x.status === "offerte").reduce((s, x) => s + (x.price ?? 0), 0);
  const running = list.filter((x) => x.status === "bezig").reduce((s, x) => s + (x.price ?? 0), 0);
  const monthly = list.filter((x) => x.status === "live" || x.status === "onderhoud").reduce((s, x) => s + (x.monthly ?? 0), 0);

  // what needs attention: open tasks due within a week (or overdue) and deadlines within two weeks
  const today = dayFromNow();
  const dueTasks = (tasks ?? []).filter((t) => t.due && t.due <= dayFromNow(7));
  const deadlines = list.filter((x) => x.deadline && x.deadline <= dayFromNow(14)).sort((a, b) => (a.deadline! < b.deadline! ? -1 : 1));
  const projectName = new Map(list.map((x) => [x.id, x.name]));

  return (
    <>
      <PageHead title="Goedemorgen, Justin" intro={`${live ? `${live} ${live === 1 ? "bezoeker" : "bezoekers"} nu op de site. ` : ""}Cijfers over ${p.label.toLowerCase()}.`}>
        <PeriodTabs active={p.key} base="/dashboard" />
      </PageHead>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Bezoekers" value={visitors} hint={`${views.length} paginaweergaven`} />
        <Stat label="Gem. tijd op pagina" value={times.length ? duration(median(times)) : "–"} hint="mediaan, langer dan 1 s" />
        <Stat label="Aanvragen" value={subs.length} hint={`conversie ${pct(subs.length, visitors)}`} accent />
        <Stat label="Lopende projecten" value={list.filter((x) => x.status === "bezig").length} hint={`${euro(running)} in uitvoering`} />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[1.6fr_1fr]">
        <Card title="Bezoekers per dag" action={<Link href={`/dashboard/verkeer?p=${p.key}`} className="text-xs text-forest/60 underline underline-offset-4">Alles over bezoekers</Link>}>
          <DayColumns days={perDay(views, p.days === 1 ? 1 : p.days)} />
        </Card>
        <Card title="Waar ze vandaan komen">
          <BarList rows={countBy(views, (v) => source(v)).slice(0, 7)} />
        </Card>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <Card title="Nieuwe aanvragen" action={<Link href="/dashboard/aanvragen" className="text-xs text-forest/60 underline underline-offset-4">Alle aanvragen</Link>}>
          {newSubs?.length ? (
            <ul className="divide-y divide-forest/[0.07]">
              {newSubs.map((s) => (
                <li key={s.id} className="py-2.5 first:pt-0">
                  <Link href={`/dashboard/aanvragen#${s.id}`} className="block hover:underline">
                    <span className="font-medium">{s.naam}</span>
                    {s.onderwerp && <span className="text-forest/55"> · {s.onderwerp}</span>}
                  </Link>
                  <p className="mt-0.5 line-clamp-1 text-xs text-forest/55">{ago(s.created_at)} · {s.bericht}</p>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Geen nieuwe aanvragen. Alles is opgevolgd.</Empty>
          )}
        </Card>

        <Card title="Deze week te doen">
          {dueTasks.length || deadlines.length ? (
            <ul className="space-y-2 text-sm">
              {deadlines.map((x) => (
                <li key={x.id} className="flex items-start justify-between gap-3">
                  <Link href={`/dashboard/projecten/${x.id}`} className="hover:underline">Deadline: {x.name}<span className="block text-xs text-forest/55">{clientName.get(x.client_id)}</span></Link>
                  <Badge tone={x.deadline! < today ? "forest" : "lime"}>{date(x.deadline)}</Badge>
                </li>
              ))}
              {dueTasks.map((t) => (
                <li key={t.id} className="flex items-start justify-between gap-3">
                  <Link href={`/dashboard/projecten/${t.project_id}`} className="hover:underline">{t.title}<span className="block text-xs text-forest/55">{projectName.get(t.project_id)}</span></Link>
                  <Badge tone={t.due! < today ? "forest" : "soft"}>{date(t.due)}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Niets met een datum deze week.</Empty>
          )}
        </Card>

        <Card title="Omzet">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-forest/60">In de pijplijn (lead, offerte)</dt><dd className="font-semibold tabular-nums">{euro(pipeline)}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-forest/60">In uitvoering</dt><dd className="font-semibold tabular-nums">{euro(running)}</dd></div>
            <div className="flex justify-between gap-3 border-t border-forest/10 pt-3"><dt className="text-forest/60">Terugkerend per maand</dt><dd className="font-semibold tabular-nums">{euro(monthly)}</dd></div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {["lead", "offerte", "bezig", "live", "onderhoud"].map((s) => {
              const n = list.filter((x) => x.status === s).length;
              return n ? <Badge key={s} tone={s === "bezig" ? "lime" : "soft"}>{statusLabel(s)}: {n}</Badge> : null;
            })}
          </div>
        </Card>
      </div>
    </>
  );
}

