import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { serviceClient } from "@/lib/supabase/server";

/* Receives the tracker's beacons (components/Tracker.tsx) and stores them. No cookies: the visitor
   is a hash of IP, browser and today's date plus a secret, so it can't be reversed and resets
   every day. The IP itself is never stored. Bots and anything malformed are dropped quietly. */

const BOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|monitor|curl|wget|python|node-fetch/i;
const ok = () => new Response(null, { status: 204 });

const str = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);
const int = (v: unknown, min: number, max: number) =>
  typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : null;
const isId = (v: unknown): v is string => typeof v === "string" && /^[0-9a-f-]{36}$/i.test(v);
const isPath = (v: unknown): v is string => typeof v === "string" && v.startsWith("/") && v.length <= 300;

function device(ua: string, width: number | null) {
  if (/ipad|tablet/i.test(ua) || (width && width >= 600 && width < 1024 && /mobile|android/i.test(ua))) return "tablet";
  if (/mobi|iphone|android/i.test(ua)) return "mobiel";
  return "desktop";
}

function browser(ua: string) {
  if (/edg\//i.test(ua)) return "Edge";
  if (/opr\//i.test(ua)) return "Opera";
  if (/samsungbrowser/i.test(ua)) return "Samsung";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/safari/i.test(ua)) return "Safari";
  return "Anders";
}

export async function POST(req: NextRequest) {
  const db = serviceClient();
  const ua = req.headers.get("user-agent") ?? "";
  if (!db || !ua || BOT.test(ua)) return ok();
  // only beacons from the site itself
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) return ok();

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return ok();
  }
  if (!isId(body.id) || !isPath(body.path)) return ok();

  if (body.t === "view") {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "";
    const day = new Date().toISOString().slice(0, 10);
    const salt = process.env.TRACK_SALT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    const visitor = createHash("sha256").update(`${salt}|${day}|${ip}|${ua}`).digest("hex").slice(0, 24);
    const utm = (body.utm ?? {}) as Record<string, unknown>;
    const width = int(body.w, 0, 10000);
    await db.from("page_views").insert({
      id: body.id,
      visitor,
      path: body.path,
      referrer: str(body.ref, 500),
      utm_source: str(utm.source, 100),
      utm_medium: str(utm.medium, 100),
      utm_campaign: str(utm.campaign, 100),
      device: device(ua, width),
      browser: browser(ua),
      country: str(req.headers.get("x-vercel-ip-country"), 2),
    });
    // the privacy statement promises 13 months: about once in 200 views, clear out what is older (clicks go with their view)
    if (Math.random() < 0.005) {
      const cutoff = new Date();
      cutoff.setMonth(cutoff.getMonth() - 13);
      await db.from("page_views").delete().lt("created_at", cutoff.toISOString());
    }
    return ok();
  }

  if (body.t === "end") {
    await db
      .from("page_views")
      .update({ duration_ms: int(body.ms, 0, 4 * 60 * 60 * 1000), max_scroll: int(body.scroll, 0, 100) })
      .eq("id", body.id);
    const clicks = Array.isArray(body.clicks) ? body.clicks.slice(0, 100) : [];
    const rows = clicks
      .map((c: Record<string, unknown>) => ({
        view_id: body.id as string,
        path: body.path as string,
        label: str(c.label, 80),
        href: str(c.href, 300),
        kind: str(c.kind, 10),
        x: int(c.x, 0, 100),
        y: int(c.y, 0, 100000),
      }))
      .filter((r) => r.label);
    if (rows.length) await db.from("clicks").insert(rows);
  }
  return ok();
}
