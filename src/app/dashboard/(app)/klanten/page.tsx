import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/server";
import { Badge, Card, Empty, Field, PageHead, Submit, Table, inputClass } from "@/components/dashboard/ui";
import { date, euro, statusLabel, type Client, type Project } from "@/lib/dashboard/data";
import { createClientAction } from "../../actions";

export const metadata = { title: "Klanten" };

/* Every client with their projects at a glance, and a form to add one. */
export default async function Clients() {
  const { supabase } = await requireAdmin();
  const [{ data: clients }, { data: projects }, { data: docs }] = await Promise.all([
    supabase.from("clients").select("*").order("name").returns<Client[]>(),
    supabase.from("projects").select("id, client_id, name, status, price, monthly").returns<Project[]>(),
    supabase.from("documents").select("client_id").returns<{ client_id: string }[]>(),
  ]);
  const byClient = new Map<string, Project[]>();
  for (const p of projects ?? []) byClient.set(p.client_id, [...(byClient.get(p.client_id) ?? []), p]);
  const docCount = new Map<string, number>();
  for (const d of docs ?? []) docCount.set(d.client_id, (docCount.get(d.client_id) ?? 0) + 1);

  return (
    <>
      <PageHead title="Klanten" intro="Elk klantportaal met projecten, voortgang en documenten." />

      <div className="grid gap-3 xl:grid-cols-[1fr_340px]">
        <Card title={`${clients?.length ?? 0} klanten`}>
          {clients?.length ? (
            <Table head={["Klant", "Projecten", "Status", "Waarde", "Documenten", "Sinds"]}>
              {clients.map((c) => {
                const ps = byClient.get(c.id) ?? [];
                const value = ps.reduce((s, p) => s + (p.price ?? 0), 0);
                const monthly = ps.reduce((s, p) => s + (p.status === "live" || p.status === "onderhoud" ? p.monthly ?? 0 : 0), 0);
                return (
                  <tr key={c.id} className="hover:bg-forest/[0.03]">
                    <td className="px-5 py-3 md:px-6">
                      <Link href={`/dashboard/klanten/${c.id}`} className="font-medium hover:underline">{c.name}</Link>
                      {c.contact_name && <span className="block text-xs text-forest/70">{c.contact_name}</span>}
                    </td>
                    <td className="px-5 py-3 tabular-nums md:px-6">{ps.length}</td>
                    <td className="px-5 py-3 md:px-6">
                      <span className="flex flex-wrap gap-1">{ps.map((p) => <Badge key={p.id} tone={p.status === "bezig" ? "lime" : "soft"}>{statusLabel(p.status)}</Badge>)}</span>
                    </td>
                    <td className="px-5 py-3 tabular-nums md:px-6">{euro(value)}{monthly > 0 && <span className="block text-xs text-forest/70">+ {euro(monthly)} p/m</span>}</td>
                    <td className="px-5 py-3 tabular-nums md:px-6">{docCount.get(c.id) ?? 0}</td>
                    <td className="px-5 py-3 text-forest/70 md:px-6">{date(c.created_at)}</td>
                  </tr>
                );
              })}
            </Table>
          ) : (
            <Empty>Nog geen klanten. Voeg er een toe, of maak er een van een aanvraag.</Empty>
          )}
        </Card>

        <Card title="Nieuwe klant">
          <form action={createClientAction} className="space-y-3">
            <Field label="Bedrijfsnaam"><input name="name" required className={inputClass} /></Field>
            <Field label="Contactpersoon"><input name="contact_name" className={inputClass} /></Field>
            <Field label="E-mail"><input name="email" type="email" className={inputClass} /></Field>
            <Field label="Telefoon"><input name="phone" className={inputClass} /></Field>
            <Field label="Website"><input name="website" placeholder="bedrijf.nl" className={inputClass} /></Field>
            <Submit>Klant toevoegen</Submit>
          </form>
        </Card>
      </div>
    </>
  );
}
