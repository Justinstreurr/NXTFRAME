import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/server";
import { Badge, Empty, PageHead } from "@/components/dashboard/ui";
import Board, { type BoardCard } from "@/components/dashboard/Board";
import { ProjectCard } from "@/components/dashboard/parts";
import { PROJECT_STATUS, TASK_STATUS, date, dayFromNow, type Client, type Project, type Task } from "@/lib/dashboard/data";

export const metadata = { title: "Projecten" };

/* The work board, two ways round: first the tasks of every project as a scrum board (te doen, bezig,
   klaar), then the projects through the pipeline (lead to maintenance). Cards move by dragging. */
export default async function Projects({ searchParams }: { searchParams: Promise<{ view?: string; project?: string }> }) {
  const sp = await searchParams;
  const view = sp.view === "projecten" ? "projecten" : "taken";
  const { supabase } = await requireAdmin();
  const [{ data: projects }, { data: clients }, { data: tasks }] = await Promise.all([
    supabase.from("projects").select("*").order("deadline", { ascending: true, nullsFirst: false }).returns<Project[]>(),
    supabase.from("clients").select("id, name").returns<Pick<Client, "id" | "name">[]>(),
    supabase.from("tasks").select("*").order("due", { ascending: true, nullsFirst: false }).order("created_at").returns<Task[]>(),
  ]);
  const clientName = new Map((clients ?? []).map((c) => [c.id, c.name]));
  const list = projects ?? [];
  const allTasks = (tasks ?? []).map((t) => ({ ...t, status: t.status ?? (t.done ? "klaar" : "todo") }));
  const today = dayFromNow();

  const tabs = (
    <nav className="flex gap-1 rounded-full bg-paper p-1 ring-1 ring-forest/10" aria-label="Weergave">
      {[{ key: "taken", label: "Taken" }, { key: "projecten", label: "Projecten" }].map((t) => (
        <Link key={t.key} href={t.key === "projecten" ? "/dashboard/projecten?view=projecten" : "/dashboard/projecten"} aria-current={view === t.key ? "page" : undefined}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${view === t.key ? "bg-forest text-cream" : "text-forest/70 hover:bg-forest/[0.06]"}`}>
          {t.label}
        </Link>
      ))}
    </nav>
  );

  if (!list.length) {
    return (
      <>
        <PageHead title="Projecten">{tabs}</PageHead>
        <Empty>Nog geen projecten. Maak eerst een klant aan, of maak een klant van een aanvraag.</Empty>
      </>
    );
  }

  if (view === "projecten") {
    const cards: BoardCard[] = list.map((p) => {
      const open = allTasks.filter((t) => t.project_id === p.id && t.status !== "klaar");
      return { id: p.id, column: p.status, value: p.price ?? 0, node: <ProjectCard bare project={p} client={clientName.get(p.client_id)} openTasks={open.length} next={open.find((t) => t.status === "bezig")?.title ?? open[0]?.title} /> };
    });
    return (
      <>
        <PageHead title="Projecten" intro="Sleep een project naar een andere kolom om de status te wijzigen. Een nieuw project maak je aan bij de klant.">{tabs}</PageHead>
        <Board kind="project" format="euro" columns={PROJECT_STATUS.map((s) => ({ key: s.key, label: s.label }))} cards={cards} />
      </>
    );
  }

  // tasks: optionally for one project
  const pick = sp.project && list.some((p) => p.id === sp.project) ? sp.project : null;
  const shown = pick ? allTasks.filter((t) => t.project_id === pick) : allTasks;
  const projectOf = new Map(list.map((p) => [p.id, p]));
  const cards: BoardCard[] = shown.map((t) => {
    const p = projectOf.get(t.project_id);
    return {
      id: t.id,
      column: t.status,
      node: (
        <div className="p-3.5 pr-24">
          <p className={`text-sm font-medium leading-snug [overflow-wrap:anywhere] ${t.status === "klaar" ? "text-forest/70 line-through" : ""}`}>{t.title}</p>
          <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-forest/70">
            {p && <Link href={`/dashboard/projecten/${p.id}`} draggable={false} className="hover:underline">{clientName.get(p.client_id)} · {p.name}</Link>}
            {t.due && <Badge tone={t.status !== "klaar" && t.due < today ? "forest" : "muted"}>{date(t.due)}</Badge>}
          </p>
        </div>
      ),
    };
  });

  return (
    <>
      <PageHead title="Taken" intro="Alle taken van alle projecten. Sleep een taak naar Bezig of Klaar; een nieuwe taak voeg je toe op de projectpagina.">{tabs}</PageHead>
      <div className="mb-4 flex flex-wrap gap-1.5">
        <Link href="/dashboard/projecten?view=taken" className={`rounded-full px-3 py-1 text-sm ring-1 ring-forest/15 ${!pick ? "bg-forest text-cream" : "hover:bg-forest/[0.06]"}`}>Alle projecten</Link>
        {list.filter((p) => allTasks.some((t) => t.project_id === p.id)).map((p) => (
          <Link key={p.id} href={`/dashboard/projecten?view=taken&project=${p.id}`} className={`rounded-full px-3 py-1 text-sm ring-1 ring-forest/15 ${pick === p.id ? "bg-forest text-cream" : "hover:bg-forest/[0.06]"}`}>
            {clientName.get(p.client_id)} · {p.name}
          </Link>
        ))}
      </div>
      {shown.length ? (
        <Board kind="task" columns={TASK_STATUS.map((s) => ({ key: s.key, label: s.label }))} cards={cards} />
      ) : (
        <Empty>Nog geen taken. Voeg ze toe op een projectpagina.</Empty>
      )}
    </>
  );
}
