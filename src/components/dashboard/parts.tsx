import Link from "next/link";
import { Badge, Empty, Field, inputClass } from "./ui";
import { PHASES, PROJECT_KINDS, PROJECT_STATUS, bytes, date, euro, statusLabel, type Doc, type Project } from "@/lib/dashboard/data";
import { deleteDocument, setPhase } from "@/app/dashboard/actions";

/* Pieces the client and project pages share. */

/** the project fields, for both the new-project form and the edit form */
export function ProjectFields({ project }: { project?: Project }) {
  const money = (n: number | null | undefined) => (n == null ? "" : String(n).replace(".", ","));
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Naam" className="sm:col-span-2"><input name="name" required defaultValue={project?.name} placeholder="Nieuwe website" className={inputClass} /></Field>
      <Field label="Soort">
        <select name="kind" defaultValue={project?.kind ?? "website"} className={inputClass}>
          {PROJECT_KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
      </Field>
      <Field label="Status">
        <select name="status" defaultValue={project?.status ?? "offerte"} className={inputClass}>
          {PROJECT_STATUS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </Field>
      <Field label="Prijs (eenmalig, excl. btw)"><input name="price" inputMode="decimal" defaultValue={money(project?.price)} placeholder="4500" className={inputClass} /></Field>
      <Field label="Per maand (onderhoud)"><input name="monthly" inputMode="decimal" defaultValue={money(project?.monthly)} placeholder="95" className={inputClass} /></Field>
      <Field label="Start"><input name="start_date" type="date" defaultValue={project?.start_date ?? ""} className={inputClass} /></Field>
      <Field label="Deadline"><input name="deadline" type="date" defaultValue={project?.deadline ?? ""} className={inputClass} /></Field>
      <Field label="Live-adres" className="sm:col-span-2"><input name="live_url" defaultValue={project?.live_url ?? ""} placeholder="https://" className={inputClass} /></Field>
      <Field label="Notities" className="sm:col-span-2"><textarea name="notes" rows={3} defaultValue={project?.notes ?? ""} className={inputClass} /></Field>
    </div>
  );
}

/** the five steps as a row of tabs: done steps forest, the current one lime; a click sets the step */
export function PhaseSteps({ project, editable = false }: { project: Pick<Project, "id" | "phase">; editable?: boolean }) {
  return (
    <ol className="grid grid-cols-5 gap-1.5" aria-label="Fase">
      {PHASES.map((name, i) => {
        const tone = i < project.phase ? "bg-forest text-cream" : i === project.phase ? "bg-lime text-forest" : "bg-forest/[0.06] text-forest/55";
        const body = (
          <>
            <span className="block text-[11px] font-semibold tabular-nums opacity-70">{i + 1}</span>
            <span className="block truncate text-xs font-medium sm:text-sm">{name}</span>
          </>
        );
        return (
          <li key={name} aria-current={i === project.phase ? "step" : undefined}>
            {editable ? (
              <form action={setPhase}>
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="phase" value={i} />
                <button type="submit" className={`w-full rounded-[10px] px-2.5 py-2 text-left transition-opacity hover:opacity-85 ${tone}`} title={`Zet op: ${name}`}>{body}</button>
              </form>
            ) : (
              <div className={`rounded-[10px] px-2.5 py-2 ${tone}`}>{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** a project as a card: full title (it wraps, never cut off), client, phase bar, value and deadline,
    and on the board the open tasks with the one to do next. Only the title is a link, so the
    card itself can be dragged. */
export function ProjectCard({ project, client, openTasks, next, bare = false }: {
  project: Project;
  client?: string;
  openTasks?: number;
  next?: string;
  /** without its own background and ring, for inside a board column that draws them */
  bare?: boolean;
}) {
  const shell = bare ? "" : "rounded-[12px] bg-paper ring-1 ring-forest/10 transition-shadow hover:shadow-[0_10px_30px_-18px_rgba(2,38,30,0.45)]";
  return (
    <article className={`relative p-4 ${shell}`}>
      {client && <p className="pr-24 text-xs font-medium uppercase tracking-[0.06em] text-forest/50 [overflow-wrap:anywhere]">{client}</p>}
      <h3 className="mt-1 pr-2 font-display text-[15px] font-semibold leading-snug [overflow-wrap:anywhere]">
        <Link href={`/dashboard/projecten/${project.id}`} draggable={false} className="after:absolute after:inset-0 after:rounded-[12px] hover:underline">
          {project.name}
        </Link>
      </h3>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-forest/10" role="img" aria-label={`Fase ${project.phase + 1} van 5: ${PHASES[project.phase]}`}>
        <span className="block h-full rounded-full bg-forest" style={{ width: `${((project.phase + 1) / PHASES.length) * 100}%` }} />
      </div>
      <p className="mt-2 text-xs text-forest/60">Fase {project.phase + 1}: {PHASES[project.phase]}</p>
      {next && (
        <p className="mt-3 rounded-[8px] bg-cream/80 px-2.5 py-2 text-xs leading-snug">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-forest/45">Volgende taak</span>
          {next}
        </p>
      )}
      <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-forest/60">
        {!bare && <Badge tone={project.status === "bezig" ? "lime" : "soft"}>{statusLabel(project.status)}</Badge>}
        {project.price ? <span className="font-semibold tabular-nums text-forest">{euro(project.price)}</span> : null}
        {project.monthly ? <span className="tabular-nums">+ {euro(project.monthly)} p/m</span> : null}
        {project.deadline && <Badge tone="muted">deadline {date(project.deadline)}</Badge>}
        {openTasks ? <span className="ml-auto tabular-nums">{openTasks} open</span> : null}
      </p>
    </article>
  );
}

export function DocumentList({ docs }: { docs: Doc[] }) {
  if (!docs.length) return <Empty>Nog geen documenten.</Empty>;
  return (
    <ul className="divide-y divide-forest/[0.07]">
      {docs.map((d) => (
        <li key={d.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
          <a href={`/dashboard/doc/${d.id}`} className="min-w-0 truncate font-medium hover:underline">{d.name}</a>
          <span className="flex shrink-0 items-center gap-3 text-xs text-forest/55">
            {bytes(d.size)} · {date(d.created_at)}
            <form action={deleteDocument}>
              <input type="hidden" name="id" value={d.id} />
              <button type="submit" className="underline-offset-4 hover:text-forest hover:underline" aria-label={`Verwijder ${d.name}`}>Verwijder</button>
            </form>
          </span>
        </li>
      ))}
    </ul>
  );
}
