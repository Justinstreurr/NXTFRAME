"use client";

import { useEffect } from "react";

/* Microsoft Clarity, but only once the visitor has said yes to "statistieken" in the Cookiebot banner.
   Takes the choice back the moment they withdraw it (footer > Cookie-instellingen). */

type Win = Window & {
  Cookiebot?: { consent?: { statistics?: boolean }; hasResponse?: boolean; renew?: () => void };
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
};

export default function ClarityOnConsent({ id }: { id: string }) {
  useEffect(() => {
    const w = window as Win;
    let loaded = false;

    const apply = () => {
      const yes = !!w.Cookiebot?.consent?.statistics;
      if (yes && !loaded) {
        loaded = true;
        // Clarity's own snippet: a queue first, then the script
        w.clarity = w.clarity || Object.assign((...args: unknown[]) => { (w.clarity!.q = w.clarity!.q || []).push(args); }, {});
        const s = document.createElement("script");
        s.async = true;
        s.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
        document.head.appendChild(s);
      }
      if (loaded) w.clarity?.("consent", yes);
    };

    // Cookiebot may already have a stored answer by the time this runs
    if (w.Cookiebot?.hasResponse) apply();
    const events = ["CookiebotOnConsentReady", "CookiebotOnAccept", "CookiebotOnDecline"];
    events.forEach((e) => window.addEventListener(e, apply));
    return () => events.forEach((e) => window.removeEventListener(e, apply));
  }, [id]);

  return null;
}
