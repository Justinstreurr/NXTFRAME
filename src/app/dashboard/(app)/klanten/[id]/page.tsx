import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { Card, Empty, Field, PageHead, Stat, Submit, inputClass } from "@/components/dashboard/ui";
import { DocumentList, ProjectCard, ProjectFields } from "@/components/dashboard/parts";
import DocumentUpload from "@/components/dashboard/DocumentUpload";
import { ago, euro, type Client, type Doc, type Project, type Submission } from "@/lib/dashboard/data";
import { createProject, deleteClient, updateClient } from "../../../actions";

export const metadata = { title: "Klant" };

/* One client's portal: their details, every project with its progress, their documents and the
   requests they sent in. */
export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { supabase } = await requireAdmin();
  const [{ data: client }, { data: projects }, { data: docs }, { data: subs }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", id).maybeSingle<Client>(),
    supabase.from("projects").select("*").eq("client_id", id).order("created_at", { ascending: false }).returns<Project[]>(),
    supabase.from("documents").select("*").eq("client_id", id).order("created_at", { ascending: false }).returns<Doc[]>(),
    supabase.from("submissions").select("id, onderwerp, bericht, created_at").eq("client_id", id).returns<Submission[]>(),
  ]);
  if (!client) notFound();
  const ps = projects ?? [];
  const value = ps.reduce((s, p) => s + (p.price ?? 0), 0);
  const monthly = ps.reduce((s, p) => s + (p.status === "live" || p.status === "onderhoud" ? p.monthly ?? 0 : 0), 0);

  return (
    <>
      <p className="mb-2 text-sm"><Link href="/dashboard/klanten" className="text-forest/60 hover:underline">← Klanten</Link></p>
      <PageHead title={client.name} intro={[client.contact_name, client.email, client.phone].filter(Boolean).join(" · ") || undefined}>
        {client.website && (
          <a href={client.website.startsWith("http") ? client.website : `https://${client.website}`} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2 text-sm ring-1 ring-forest/20 hover:bg-forest/[0.06]">
            {client.website.replace(/^https?:\/\//, "")} ↗
          </a>
        )}
      </PageHead>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Projecten" value={ps.length} />
        <Stat label="Totale waarde" value={euro(value)} accent />
        <Stat label="Per maand" value={euro(monthly)} hint="onderhoud van live projecten" />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          <Card title="Projecten">
            {ps.length ? <div className="grid gap-2 sm:grid-cols-2">{ps.map((p) => <ProjectCard key={p.id} project={p} />)}</div> : <Empty>Nog geen project voor deze klant.</Empty>}
            <details className="mt-4 rounded-[10px] bg-cream/60 p-4">
              <summary className="cursor-pointer text-sm font-semibold">+ Nieuw project</summary>
              <form action={createProject} className="mt-4 space-y-3">
                <input type="hidden" name="client_id" value={client.id} />
                <ProjectFields />
                <Submit>Project aanmaken</Submit>
              </form>
            </details>
          </Card>

          <Card title="Documenten">
            <DocumentUpload clientId={client.id} />
            <div className="mt-4"><DocumentList docs={docs ?? []} /></div>
          </Card>
        </div>

        <div className="space-y-3">
          <Card title="Gegevens">
            <form action={updateClient} className="space-y-3">
              <input type="hidden" name="id" value={client.id} />
              <Field label="Bedrijfsnaam"><input name="name" required defaultValue={client.name} className={inputClass} /></Field>
              <Field label="Contactpersoon"><input name="contact_name" defaultValue={client.contact_name ?? ""} className={inputClass} /></Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="E-mail"><input name="email" type="email" defaultValue={client.email ?? ""} className={inputClass} /></Field>
                <Field label="Telefoon"><input name="phone" defaultValue={client.phone ?? ""} className={inputClass} /></Field>
              </div>
              <Field label="Website"><input name="website" defaultValue={client.website ?? ""} className={inputClass} /></Field>
              <Field label="Notities"><textarea name="notes" rows={5} defaultValue={client.notes ?? ""} className={inputClass} /></Field>
              <Submit>Opslaan</Submit>
            </form>
          </Card>

          {!!subs?.length && (
            <Card title="Aanvragen van deze klant">
              <ul className="space-y-3 text-sm">
                {subs.map((s) => (
                  <li key={s.id}>
                    <Link href={`/dashboard/aanvragen#${s.id}`} className="font-medium hover:underline">{s.onderwerp ?? "Aanvraag"}</Link>
                    <span className="text-xs text-forest/55"> · {ago(s.created_at)}</span>
                    <p className="line-clamp-2 text-forest/65">{s.bericht}</p>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* two steps, so one stray click can't wipe a client */}
          <details className="text-right text-sm text-forest/60">
            <summary className="cursor-pointer list-none hover:text-forest">Klant verwijderen…</summary>
            <form action={deleteClient} className="mt-2 rounded-[10px] bg-paper p-4 text-left ring-1 ring-forest/10">
              <input type="hidden" name="id" value={client.id} />
              <p className="mb-3">Dit verwijdert {client.name} met alle projecten, taken en documenten. Dat kan niet terug.</p>
              <Submit>Ja, definitief verwijderen</Submit>
            </form>
          </details>
        </div>
      </div>
    </>
  );
}
