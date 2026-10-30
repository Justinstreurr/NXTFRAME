import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/server";
import { Badge, Card, Empty, Field, PageHead, Submit, inputClass } from "@/components/dashboard/ui";
import { SUBMISSION_STATUS, ago, date, type Submission } from "@/lib/dashboard/data";
import { deleteSubmission, submissionToClient, updateSubmission } from "../../actions";

export const metadata = { title: "Aanvragen" };

/* Every contact form request, newest first, with its status, notes and a button that turns it into a client. */
export default async function Requests({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const { supabase } = await requireAdmin();
  let q = supabase.from("submissions").select("*").order("created_at", { ascending: false }).limit(300);
  if (status && SUBMISSION_STATUS.some((s) => s.key === status)) q = q.eq("status", status);
  const { data } = await q.returns<Submission[]>();
  const list = data ?? [];

  return (
    <>
      <PageHead title="Aanvragen" intro="Alles wat via het contactformulier binnenkwam, ook als de mail niet aankwam." />

      <div className="mb-4 flex flex-wrap gap-1.5">
        {[{ key: "", label: "Alle" }, ...SUBMISSION_STATUS].map((s) => (
          <Link
            key={s.key}
            href={s.key ? `/dashboard/aanvragen?status=${s.key}` : "/dashboard/aanvragen"}
            className={`rounded-full px-3 py-1 text-sm ring-1 ring-forest/15 ${(status ?? "") === s.key ? "bg-forest text-cream" : "hover:bg-forest/[0.06]"}`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {list.length ? (
        <div className="space-y-3">
          {list.map((s) => (
            <Card key={s.id}>
              <article id={s.id} className="scroll-mt-24">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-semibold tracking-tight">{s.naam}{s.onderwerp && <span className="font-normal text-forest/70"> · {s.onderwerp}</span>}</h2>
                    <p className="mt-1 text-sm text-forest/65">
                      <a href={`mailto:${s.email}?subject=${encodeURIComponent(`Re: je aanvraag bij NXT Frame`)}`} className="underline underline-offset-4">{s.email}</a>
                      {s.telefoon && <> · <a href={`tel:${s.telefoon}`} className="underline underline-offset-4">{s.telefoon}</a></>}
                      {s.website && <> · <a href={s.website.startsWith("http") ? s.website : `https://${s.website}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{s.website}</a></>}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-forest/70">
                    <Badge tone={s.status === "nieuw" ? "lime" : s.status === "klant" ? "forest" : "soft"}>{SUBMISSION_STATUS.find((x) => x.key === s.status)?.label}</Badge>
                    {!s.mailed && <Badge tone="muted">niet gemaild</Badge>}
                    <span title={date(s.created_at, true)}>{ago(s.created_at)}</span>
                    {s.path && <span>via {s.path}</span>}
                  </div>
                </div>

                <p className="mt-4 whitespace-pre-line rounded-[10px] bg-cream/70 p-4 text-sm leading-relaxed">{s.bericht}</p>

                <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto]">
                  <form action={updateSubmission} className="grid gap-3 sm:grid-cols-[180px_1fr_auto] sm:items-end">
                    <input type="hidden" name="id" value={s.id} />
                    <Field label="Status">
                      <select name="status" defaultValue={s.status} className={inputClass}>
                        {SUBMISSION_STATUS.map((x) => <option key={x.key} value={x.key}>{x.label}</option>)}
                      </select>
                    </Field>
                    <Field label="Notitie">
                      <input name="notes" defaultValue={s.notes ?? ""} placeholder="Gebeld op…, offerte gestuurd…" className={inputClass} />
                    </Field>
                    <Submit>Opslaan</Submit>
                  </form>
                  <div className="flex items-end gap-2">
                    {s.client_id ? (
                      <Link href={`/dashboard/klanten/${s.client_id}`} className="rounded-full bg-lime px-4 py-2 text-sm font-semibold hover:bg-lime-hover">Naar klant</Link>
                    ) : (
                      <form action={submissionToClient}>
                        <input type="hidden" name="id" value={s.id} />
                        <Submit tone="lime">Maak klant</Submit>
                      </form>
                    )}
                    <form action={deleteSubmission}>
                      <input type="hidden" name="id" value={s.id} />
                      <Submit tone="ghost">Verwijder</Submit>
                    </form>
                  </div>
                </div>
              </article>
            </Card>
          ))}
        </div>
      ) : (
        <Empty>Nog geen aanvragen{status ? " met deze status" : ""}.</Empty>
      )}
    </>
  );
}
