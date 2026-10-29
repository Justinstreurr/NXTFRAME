import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { Badge, Card, Empty, PageHead, Submit, inputClass } from "@/components/dashboard/ui";
import { DocumentList, PhaseSteps, ProjectFields } from "@/components/dashboard/parts";
import DocumentUpload from "@/components/dashboard/DocumentUpload";
import { PHASES, date, dayFromNow, euro, statusLabel, type Client, type Doc, type Project, type Task } from "@/lib/dashboard/data";
import { addTask, deleteProject, deleteTask, toggleTask, updateProject } from "../../../actions";

export const metadata = { title: "Project" };

/* One project: where it stands in the five steps, the to-do list, its documents and its details. */
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { supabase } = await requireAdmin();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).maybeSingle<Project>();
  if (!project) notFound();
  const [{ data: client }, { data: tasks }, { data: docs }] = await Promise.all([
    supabase.from("clients").select("id, name").eq("id", project.client_id).maybeSingle<Pick<Client, "id" | "name">>(),
    supabase.from("tasks").select("*").eq("project_id", id).order("done").order("due", { nullsFirst: false }).order("created_at").returns<Task[]>(),
    supabase.from("documents").select("*").eq("project_id", id).order("created_at", { ascending: false }).returns<Doc[]>(),
  ]);
  const today = dayFromNow();
  const open = (tasks ?? []).filter((t) => !t.done).length;

  return (
    <>
      <p className="mb-2 text-sm">
        <Link href="/dashboard/projecten" className="text-forest/60 hover:underline">← Projecten</Link>
        {client && <> · <Link href={`/dashboard/klanten/${client.id}`} className="text-forest/60 hover:underline">{client.name}</Link></>}
      </p>
      <PageHead title={project.name} intro={`${project.kind} · ${euro(project.price)}${project.monthly ? ` + ${euro(project.monthly)} p/m` : ""}${project.deadline ? ` · deadline ${date(project.deadline)}` : ""}`}>
        <div className="flex items-center gap-2">
          <Badge tone={project.status === "bezig" ? "lime" : "soft"}>{statusLabel(project.status)}</Badge>
          {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2 text-sm ring-1 ring-forest/20 hover:bg-forest/[0.06]">Live site ↗</a>}
        </div>
      </PageHead>

      <Card title={`Fase ${project.phase + 1} van ${PHASES.length}: ${PHASES[project.phase]}`}>
        <PhaseSteps project={project} editable />
        <p className="mt-3 text-xs text-forest/55">Klik op een stap om het project daarop te zetten.</p>
      </Card>

      <div className="mt-3 grid gap-3 xl:grid-cols-[1.2fr_1fr]">
        <div className="space-y-3">
          <Card title={`Taken${open ? ` (${open} open)` : ""}`}>
            {tasks?.length ? (
              <ul className="divide-y divide-forest/[0.07]">
                {tasks.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 py-2 text-sm">
                    <form action={toggleTask}>
                      <input type="hidden" name="id" value={t.id} />
                      <input type="hidden" name="done" value={String(!t.done)} />
                      <button
                        type="submit"
                        aria-label={t.done ? `Zet ${t.title} terug op open` : `Vink ${t.title} af`}
                        className={`grid size-5 place-items-center rounded-[6px] ring-1 transition-colors ${t.done ? "bg-forest text-lime ring-forest" : "ring-forest/30 hover:ring-forest"}`}
                      >
                        {t.done && <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>}
                      </button>
                    </form>
                    <span className={`flex-1 ${t.done ? "text-forest/45 line-through" : ""}`}>{t.title}</span>
                    {t.due && <Badge tone={!t.done && t.due < today ? "forest" : "muted"}>{date(t.due)}</Badge>}
                    <form action={deleteTask}>
                      <input type="hidden" name="id" value={t.id} />
                      <button type="submit" aria-label={`Verwijder ${t.title}`} className="text-forest/35 hover:text-forest">×</button>
                    </form>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>Nog geen taken.</Empty>
            )}
            <form action={addTask} className="mt-4 flex flex-wrap gap-2">
              <input type="hidden" name="project_id" value={project.id} />
              <input name="title" required placeholder="Nieuwe taak, bv. teksten ontvangen" aria-label="Nieuwe taak" className={`${inputClass} min-w-0 flex-1`} />
              <input name="due" type="date" aria-label="Datum" className={`${inputClass} w-auto`} />
              <Submit>Toevoegen</Submit>
            </form>
          </Card>

          <Card title="Documenten bij dit project">
            <DocumentUpload clientId={project.client_id} projectId={project.id} />
            <div className="mt-4"><DocumentList docs={docs ?? []} /></div>
          </Card>
        </div>

        <div className="space-y-3">
          <Card title="Gegevens">
            <form action={updateProject} className="space-y-3">
              <input type="hidden" name="id" value={project.id} />
              <ProjectFields project={project} />
              <Submit>Opslaan</Submit>
            </form>
          </Card>
          <details className="text-right text-sm text-forest/60">
            <summary className="cursor-pointer list-none hover:text-forest">Project verwijderen…</summary>
            <form action={deleteProject} className="mt-2 rounded-[10px] bg-paper p-4 text-left ring-1 ring-forest/10">
              <input type="hidden" name="id" value={project.id} />
              <p className="mb-3">Dit verwijdert het project en de taken. Documenten blijven bij de klant staan.</p>
              <Submit>Ja, verwijderen</Submit>
            </form>
          </details>
        </div>
      </div>
    </>
  );
}
