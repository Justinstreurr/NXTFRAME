"use server";

import { headers } from "next/headers";
import { serviceClient } from "@/lib/supabase/server";
import { topics, type ContactField, type ContactState } from "./fields";

/* The contact form's server side: check the fields, then mail the request to NXT Frame.
   Delivery runs through Resend's HTTP API and needs three environment variables:
     RESEND_API_KEY   the API key
     CONTACT_FROM     a sender on a domain verified at Resend, e.g. "NXT Frame <site@nxtframe.ai>"
     CONTACT_TO       where requests land (defaults to hallo@nxtframe.ai)
   Without a key nothing can be sent: the visitor is told so and offered a ready-made mail instead,
   so a request is never lost silently. To use another mail service, replace deliver() only. */

const text = (data: FormData, key: string, max: number) => String(data.get(key) ?? "").trim().slice(0, max);

/* at most 5 requests per visitor per 10 minutes, so a script can't flood the inbox. Kept in memory:
   on serverless hosting each instance counts on its own, which is enough to stop a burst. */
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

async function tooMany(): Promise<boolean> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

async function deliver(v: Record<ContactField, string>): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!key || !from) {
    // development only: show the request in the terminal so the form can be tried without a mail service
    if (process.env.NODE_ENV === "development") {
      console.warn("[contact] RESEND_API_KEY or CONTACT_FROM is not set: this request was NOT mailed.", v);
      return true;
    }
    return false;
  }
  const lines = [
    `Naam: ${v.naam}`,
    `E-mail: ${v.email}`,
    ...(v.telefoon ? [`Telefoon: ${v.telefoon}`] : []),
    ...(v.website ? [`Huidige website: ${v.website}`] : []),
    ...(v.onderwerp ? [`Onderwerp: ${v.onderwerp}`] : []),
    "",
    v.bericht,
  ];
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: process.env.CONTACT_TO ?? "hallo@nxtframe.ai",
        reply_to: v.email,
        subject: `Aanvraag via de site: ${v.naam}${v.onderwerp ? ` (${v.onderwerp})` : ""}`,
        text: lines.join("\n"),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* keeps the request in Supabase for the dashboard (Aanvragen); false when Supabase isn't connected */
async function store(v: Record<ContactField, string>, mailed: boolean): Promise<boolean> {
  const db = serviceClient();
  if (!db) return false;
  const h = await headers();
  const from = h.get("referer");
  const { error } = await db.from("submissions").insert({
    naam: v.naam,
    email: v.email,
    telefoon: v.telefoon || null,
    website: v.website || null,
    onderwerp: v.onderwerp || null,
    bericht: v.bericht,
    mailed,
    path: from ? new URL(from).pathname : null,
  });
  if (error) console.error("[contact] not stored:", error.message);
  return !error;
}

export async function sendContact(_prev: ContactState, data: FormData): Promise<ContactState> {
  // the honeypot: a field no person sees or fills in. A bot that does gets a quiet "sent".
  if (text(data, "fax", 200)) return { status: "sent" };

  const onderwerp = text(data, "onderwerp", 40);
  const values: Record<ContactField, string> = {
    naam: text(data, "naam", 120),
    email: text(data, "email", 200),
    telefoon: text(data, "telefoon", 40),
    website: text(data, "website", 200),
    onderwerp: (topics as readonly string[]).includes(onderwerp) ? onderwerp : "",
    bericht: text(data, "bericht", 4000),
  };

  const errors: ContactState["errors"] = {};
  if (!values.naam) errors.naam = "Vul je naam in.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Vul een geldig e-mailadres in.";
  if (values.bericht.length < 10) errors.bericht = "Vertel in een paar zinnen waar het om gaat.";
  if (Object.keys(errors).length) return { status: "invalid", errors, values };
  // over the limit counts as a failed send: the visitor still gets the ready-made mail
  if (await tooMany()) return { status: "failed", values };

  const mailed = await deliver(values);
  // every request also lands in the dashboard, mailed or not, so none gets lost
  const stored = await store(values, mailed);
  return mailed || stored ? { status: "sent", values: { email: values.email } } : { status: "failed", values };
}
