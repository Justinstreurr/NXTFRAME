"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, userClient } from "@/lib/supabase/server";
import { PROJECT_KINDS, PROJECT_STATUS, SUBMISSION_STATUS, TASK_STATUS } from "@/lib/dashboard/data";

/* Every change made in the dashboard. Each action checks the admin first; the database policies
   check again, so a forged request without the right Google account changes nothing. */

const text = (f: FormData, k: string, max = 2000) => {
  const v = String(f.get(k) ?? "").trim().slice(0, max);
  return v || null;
};
const money = (f: FormData, k: string) => {
  const v = text(f, k, 20)?.replace(/\./g, "").replace(",", ".");
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
};
const day = (f: FormData, k: string) => (/^\d{4}-\d{2}-\d{2}$/.test(String(f.get(k))) ? String(f.get(k)) : null);
const UUID = /^[0-9a-f-]{36}$/i;
const id = (f: FormData, k = "id") => {
  const v = String(f.get(k) ?? "");
  if (!UUID.test(v)) throw new Error("ongeldig id");
  return v;
};
const oneOf = <T extends string>(v: unknown, list: readonly T[], fallback: T): T => (list.includes(v as T) ? (v as T) : fallback);

export async function signOut() {
  const supabase = await userClient();
  await supabase.auth.signOut();
  redirect("/dashboard/login");
}

/* ---------- requests ---------- */

export async function updateSubmission(f: FormData) {
  const { supabase } = await requireAdmin();
  await supabase
    .from("submissions")
    .update({ status: oneOf(f.get("status"), SUBMISSION_STATUS.map((s) => s.key), "nieuw"), notes: text(f, "notes") })
    .eq("id", id(f));
  revalidatePath("/dashboard", "layout");
}

/** a request becomes a client with a first project, and the request is marked as such */
export async function submissionToClient(f: FormData) {
  const { supabase } = await requireAdmin();
  const subId = id(f);
  const { data: s } = await supabase.from("submissions").select("*").eq("id", subId).single();
  if (!s) return;
  const { data: client } = await supabase
    .from("clients")
    .insert({ name: s.website ? s.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "") : s.naam, contact_name: s.naam, email: s.email, phone: s.telefoon, website: s.website, notes: s.bericht })
    .select("id")
    .single();
  if (!client) return;
  const kind = (s.onderwerp ?? "").toLowerCase().includes("webshop") ? "webshop" : (s.onderwerp ?? "").toLowerCase().includes("landing") ? "landingspagina" : (s.onderwerp ?? "").toLowerCase().includes("redesign") ? "redesign" : "website";
  await supabase.from("projects").insert({ client_id: client.id, name: s.onderwerp || "Nieuwe website", kind, status: "lead" });
  await supabase.from("submissions").update({ status: "klant", client_id: client.id }).eq("id", subId);
  revalidatePath("/dashboard", "layout");
  redirect(`/dashboard/klanten/${client.id}`);
}

export async function deleteSubmission(f: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("submissions").delete().eq("id", id(f));
  revalidatePath("/dashboard", "layout");
}

/* ---------- clients ---------- */

function clientFields(f: FormData) {
  return {
    name: text(f, "name", 200) ?? "Naamloze klant",
    contact_name: text(f, "contact_name", 200),
    email: text(f, "email", 200),
    phone: text(f, "phone", 50),
    website: text(f, "website", 300),
    notes: text(f, "notes", 5000),
  };
}

export async function createClientAction(f: FormData) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("clients").insert(clientFields(f)).select("id").single();
  revalidatePath("/dashboard", "layout");
  if (data) redirect(`/dashboard/klanten/${data.id}`);
}

export async function updateClient(f: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("clients").update(clientFields(f)).eq("id", id(f));
  revalidatePath("/dashboard", "layout");
}

export async function deleteClient(f: FormData) {
  const { supabase } = await requireAdmin();
  const clientId = id(f);
  // the files go too: the rows cascade, the stored files have to be removed by hand
  const { data: docs } = await supabase.from("documents").select("path").eq("client_id", clientId);
  if (docs?.length) await supabase.storage.from("documenten").remove(docs.map((d) => d.path));
  await supabase.from("clients").delete().eq("id", clientId);
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard/klanten");
}

/* ---------- projects ---------- */

function projectFields(f: FormData) {
  return {
    name: text(f, "name", 200) ?? "Nieuw project",
    kind: oneOf(f.get("kind"), PROJECT_KINDS, "website"),
    status: oneOf(f.get("status"), PROJECT_STATUS.map((s) => s.key), "offerte"),
    price: money(f, "price"),
    monthly: money(f, "monthly"),
    start_date: day(f, "start_date"),
    deadline: day(f, "deadline"),
    live_url: text(f, "live_url", 300),
    notes: text(f, "notes", 5000),
  };
}

export async function createProject(f: FormData) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("projects").insert({ ...projectFields(f), client_id: id(f, "client_id") }).select("id").single();
  revalidatePath("/dashboard", "layout");
  if (data) redirect(`/dashboard/projecten/${data.id}`);
}

export async function updateProject(f: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").update(projectFields(f)).eq("id", id(f));
  revalidatePath("/dashboard", "layout");
}

export async function setPhase(f: FormData) {
  const { supabase } = await requireAdmin();
  const phase = Math.min(4, Math.max(0, Number(f.get("phase")) || 0));
  await supabase.from("projects").update({ phase }).eq("id", id(f));
  revalidatePath("/dashboard", "layout");
}

export async function setProjectStatus(f: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").update({ status: oneOf(f.get("status"), PROJECT_STATUS.map((s) => s.key), "offerte") }).eq("id", id(f));
  revalidatePath("/dashboard", "layout");
}

export async function deleteProject(f: FormData) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("projects").select("client_id").eq("id", id(f)).single();
  await supabase.from("projects").delete().eq("id", id(f));
  revalidatePath("/dashboard", "layout");
  redirect(data ? `/dashboard/klanten/${data.client_id}` : "/dashboard/projecten");
}

/* ---------- tasks ---------- */

export async function addTask(f: FormData) {
  const { supabase } = await requireAdmin();
  const title = text(f, "title", 300);
  if (title) await supabase.from("tasks").insert({ project_id: id(f, "project_id"), title, due: day(f, "due") });
  revalidatePath("/dashboard", "layout");
}

export async function toggleTask(f: FormData) {
  const { supabase } = await requireAdmin();
  const done = f.get("done") === "true";
  await supabase.from("tasks").update({ done, status: done ? "klaar" : "todo" }).eq("id", id(f));
  revalidatePath("/dashboard", "layout");
}

/* ---------- the boards (called straight from the drag and drop, not from a form) ---------- */

export async function moveCard(kind: "project" | "task", cardId: string, to: string) {
  const { supabase } = await requireAdmin();
  if (!UUID.test(cardId)) throw new Error("ongeldig id");
  if (kind === "project") {
    await supabase.from("projects").update({ status: oneOf(to, PROJECT_STATUS.map((s) => s.key), "offerte") }).eq("id", cardId);
  } else {
    const status = oneOf(to, TASK_STATUS.map((s) => s.key), "todo");
    await supabase.from("tasks").update({ status, done: status === "klaar" }).eq("id", cardId);
  }
  revalidatePath("/dashboard", "layout");
}

export async function deleteTask(f: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("tasks").delete().eq("id", id(f));
  revalidatePath("/dashboard", "layout");
}

/* ---------- documents (the file itself is uploaded from the browser, see DocumentUpload) ---------- */

export async function registerDocument(input: { clientId: string; projectId: string | null; name: string; path: string; size: number; mime: string }) {
  const { supabase } = await requireAdmin();
  if (!UUID.test(input.clientId) || !input.path.startsWith(`${input.clientId}/`)) throw new Error("ongeldig pad");
  await supabase.from("documents").insert({
    client_id: input.clientId,
    project_id: input.projectId && UUID.test(input.projectId) ? input.projectId : null,
    name: input.name.slice(0, 300),
    path: input.path,
    size: input.size,
    mime: input.mime.slice(0, 100),
  });
  revalidatePath("/dashboard", "layout");
}

export async function deleteDocument(f: FormData) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("documents").select("path").eq("id", id(f)).single();
  if (data) await supabase.storage.from("documenten").remove([data.path]);
  await supabase.from("documents").delete().eq("id", id(f));
  revalidatePath("/dashboard", "layout");
}
