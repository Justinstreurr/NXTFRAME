import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

/* Shared vocabulary and helpers for the dashboard pages. */

export const PERIODS = [
  { key: "1", label: "Vandaag", days: 1 },
  { key: "7", label: "7 dagen", days: 7 },
  { key: "30", label: "30 dagen", days: 30 },
  { key: "90", label: "90 dagen", days: 90 },
] as const;

export function period(p: string | string[] | undefined) {
  const found = PERIODS.find((x) => x.key === p) ?? PERIODS[2];
  const since = new Date();
  if (found.days === 1) since.setHours(0, 0, 0, 0);
  else since.setDate(since.getDate() - found.days);
  return { ...found, since: since.toISOString() };
}

/** the five steps of a project, the same as on /aanpak */
export const PHASES = ["Kennismaking", "Strategie en structuur", "Ontwerp", "Bouw", "Lancering en doorgroei"] as const;

export const PROJECT_STATUS = [
  { key: "lead", label: "Lead" },
  { key: "offerte", label: "Offerte" },
  { key: "bezig", label: "In uitvoering" },
  { key: "live", label: "Live" },
  { key: "onderhoud", label: "Onderhoud" },
  { key: "afgerond", label: "Afgerond" },
  { key: "gestopt", label: "Gestopt" },
] as const;
export type ProjectStatus = (typeof PROJECT_STATUS)[number]["key"];
export const statusLabel = (s: string) => PROJECT_STATUS.find((x) => x.key === s)?.label ?? s;

export const PROJECT_KINDS = ["website", "webshop", "landingspagina", "redesign", "onderhoud", "teksten", "rekentool", "koppeling"] as const;

export const SUBMISSION_STATUS = [
  { key: "nieuw", label: "Nieuw" },
  { key: "opgevolgd", label: "Opgevolgd" },
  { key: "klant", label: "Klant geworden" },
  { key: "afgewezen", label: "Afgewezen" },
] as const;

export type PageView = {
  id: string;
  visitor: string;
  path: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  device: string | null;
  browser: string | null;
  country: string | null;
  duration_ms: number | null;
  max_scroll: number | null;
  created_at: string;
};
export type ClickRow = { view_id: string | null; path: string; label: string; href: string | null; kind: string | null; x: number | null; y: number | null; created_at: string };
export type Submission = {
  id: string; naam: string; email: string; telefoon: string | null; website: string | null; onderwerp: string | null;
  bericht: string; status: string; notes: string | null; mailed: boolean; path: string | null; client_id: string | null; created_at: string;
};
export type Client = { id: string; name: string; contact_name: string | null; email: string | null; phone: string | null; website: string | null; notes: string | null; created_at: string };
export type Project = {
  id: string; client_id: string; name: string; kind: string; status: string; phase: number; price: number | null; monthly: number | null;
  start_date: string | null; deadline: string | null; live_url: string | null; notes: string | null; created_at: string;
};
export type Task = { id: string; project_id: string; title: string; done: boolean; status: TaskStatus; due: string | null; created_at: string };

/** the columns of the task board; `done` in the database follows "klaar" */
export const TASK_STATUS = [
  { key: "todo", label: "Te doen" },
  { key: "bezig", label: "Bezig" },
  { key: "klaar", label: "Klaar" },
] as const;
export type TaskStatus = (typeof TASK_STATUS)[number]["key"];
export type Doc = { id: string; client_id: string; project_id: string | null; name: string; path: string; size: number | null; mime: string | null; created_at: string };

/** Supabase hands out 1000 rows per request; this pages through everything since `since`, up to `max` rows. */
export async function since<T>(db: SupabaseClient, table: string, columns: string, iso: string, max = 50000): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; from < max; from += 1000) {
    const { data, error } = await db.from(table).select(columns).gte("created_at", iso).order("created_at", { ascending: false }).range(from, from + 999);
    if (error || !data) break;
    out.push(...(data as T[]));
    if (data.length < 1000) break;
  }
  return out;
}

/* ---------- small aggregations ---------- */

export function countBy<T>(rows: T[], key: (r: T) => string | null | undefined) {
  const m = new Map<string, number>();
  for (const r of rows) {
    const k = key(r);
    if (k) m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

export const uniq = <T>(rows: T[], key: (r: T) => string) => new Set(rows.map(key)).size;

export function median(nums: number[]) {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** where a visit came from, in words: a campaign, a search engine, a site, or direct */
export function source(v: Pick<PageView, "referrer" | "utm_source">) {
  if (v.utm_source) return v.utm_source.toLowerCase();
  if (!v.referrer) return "Direct";
  try {
    const host = new URL(v.referrer).hostname.replace(/^www\./, "");
    if (/google\./.test(host)) return "Google";
    if (/bing\./.test(host)) return "Bing";
    if (/chatgpt|openai/.test(host)) return "ChatGPT";
    if (/perplexity/.test(host)) return "Perplexity";
    if (/linkedin|lnkd/.test(host)) return "LinkedIn";
    if (/instagram/.test(host)) return "Instagram";
    if (/facebook|fb\./.test(host)) return "Facebook";
    return host;
  } catch {
    return "Direct";
  }
}

/** visitors per day over the period, oldest first, days without visits included */
export function perDay(rows: PageView[], days: number) {
  const n = Math.max(days, 1);
  const out: { day: string; visitors: number; views: number }[] = [];
  const byDay = new Map<string, PageView[]>();
  for (const r of rows) {
    const d = r.created_at.slice(0, 10);
    byDay.set(d, [...(byDay.get(d) ?? []), r]);
  }
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const list = byDay.get(key) ?? [];
    out.push({ day: key, visitors: uniq(list, (r) => r.visitor), views: list.length });
  }
  return out;
}

/* ---------- the clock (outside the components, which must stay pure) ---------- */

/** ISO time `min` minutes ago */
export const minutesAgo = (min: number) => new Date(Date.now() - min * 60000).toISOString();
/** YYYY-MM-DD, `n` days from today (0 = today) */
export const dayFromNow = (n = 0) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);

/* ---------- formatting ---------- */

export const euro = (n: number | null | undefined) =>
  n == null ? "–" : new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export function duration(ms: number) {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")} min`;
}

export const date = (iso: string | null | undefined, withTime = false) =>
  iso
    ? new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "short", ...(withTime && { hour: "2-digit", minute: "2-digit" }) }).format(new Date(iso))
    : "–";

export function ago(iso: string) {
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 1) return "zojuist";
  if (min < 60) return `${min} min geleden`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} uur geleden`;
  const d = Math.round(h / 24);
  return d === 1 ? "gisteren" : `${d} dagen geleden`;
}

export const bytes = (n: number | null) =>
  n == null ? "" : n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;

export const pct = (part: number, whole: number) => (whole ? `${((part / whole) * 100).toFixed(1).replace(".", ",")}%` : "–");
