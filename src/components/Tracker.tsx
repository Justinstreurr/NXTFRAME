"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* The site's own analytics, without cookies or local storage: every page view gets a random id,
   and when the visitor leaves the page (or moves on inside the site) one beacon reports how long
   they stayed, how far they scrolled and what they clicked. The server turns the visitor into a
   hash that changes every day, so nobody can be followed from one day to the next.
   Visitors with Do Not Track or Global Privacy Control on are not counted. */

const ENDPOINT = "/api/t";
const SKIP = ["/dashboard", "/auth", "/lab"];

type Click = { label: string; href?: string; kind: string; x: number; y: number };

function send(body: unknown) {
  const data = JSON.stringify(body);
  if (navigator.sendBeacon?.(ENDPOINT, new Blob([data], { type: "application/json" }))) return;
  fetch(ENDPOINT, { method: "POST", body: data, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
}

function labelOf(el: Element): string {
  const own = el.getAttribute("aria-label") || el.getAttribute("title") || (el as HTMLElement).innerText || "";
  return own.replace(/\s+/g, " ").trim().slice(0, 80) || el.tagName.toLowerCase();
}

export default function Tracker() {
  const path = usePathname();

  useEffect(() => {
    if (SKIP.some((p) => path.startsWith(p))) return;
    // only the live site counts: not the dev server, a phone on the local network, or a Vercel preview
    if (!/(^|\.)nxtframe\.ai$/.test(location.hostname)) return;
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (nav.doNotTrack === "1" || nav.globalPrivacyControl) return;

    const id = crypto.randomUUID();
    const start = performance.now();
    let hidden = 0; // time spent in a background tab doesn't count as reading
    let hiddenAt = 0;
    let scroll = 0;
    const clicks: Click[] = [];
    let ended = false;

    const q = new URLSearchParams(location.search);
    send({
      t: "view",
      id,
      path,
      ref: document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : null,
      utm: { source: q.get("utm_source"), medium: q.get("utm_medium"), campaign: q.get("utm_campaign") },
      w: window.innerWidth,
    });

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) scroll = Math.max(scroll, Math.min(100, Math.round((window.scrollY / max) * 100)));
    };
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest("a, button, summary, [role=button], input[type=submit]");
      if (!el) return;
      const href = el instanceof HTMLAnchorElement ? el.getAttribute("href") ?? undefined : undefined;
      const kind = el.tagName === "A" ? (href?.startsWith("http") && !href.startsWith(location.origin) ? "extern" : "link") : el.tagName === "SUMMARY" ? "vraag" : "knop";
      if (clicks.length < 100) {
        clicks.push({ label: labelOf(el), href, kind, x: Math.round((e.clientX / window.innerWidth) * 100), y: Math.round(e.pageY) });
      }
    };
    const end = () => {
      if (ended) return;
      ended = true;
      const away = hiddenAt ? performance.now() - hiddenAt : 0;
      send({ t: "end", id, path, ms: Math.round(performance.now() - start - hidden - away), scroll, clicks });
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        hiddenAt = performance.now();
        // phones often never fire pagehide: report now, the page may be gone before it comes back
        end();
      } else if (hiddenAt) {
        hidden += performance.now() - hiddenAt;
        hiddenAt = 0;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", end);
    return () => {
      end();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", end);
    };
  }, [path]);

  return null;
}
