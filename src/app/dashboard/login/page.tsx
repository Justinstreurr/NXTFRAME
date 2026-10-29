import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import LoginButton from "@/components/dashboard/LoginButton";
import { SUPABASE_ANON_KEY, SUPABASE_URL, supabaseConfigured } from "@/lib/supabase/env";
import { userClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Inloggen" };

const errors: Record<string, string> = {
  "geen-toegang": "Dit Google-account heeft geen toegang tot het dashboard.",
  "inloggen-mislukt": "Inloggen is niet gelukt. Probeer het nog een keer.",
};

/* Supabase says which login providers are on; without Google the button would only lead to an error page */
async function googleEnabled() {
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/settings`, { headers: { apikey: SUPABASE_ANON_KEY }, cache: "no-store" });
    return Boolean((await res.json())?.external?.google);
  } catch {
    return true;
  }
}

export default async function Login({ searchParams }: { searchParams: Promise<{ fout?: string }> }) {
  const { fout } = await searchParams;
  if (supabaseConfigured) {
    const { data } = await (await userClient()).auth.getUser();
    if (data.user && !fout) redirect("/dashboard");
  }

  return (
    <main id="main" className="grid min-h-svh place-items-center bg-forest px-4 py-16 text-cream">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <Logo size="xl" className="text-cream" />
        <h1 className="mt-12 font-display text-3xl font-semibold tracking-[-0.03em]">Dashboard</h1>
        <p className="mt-2 text-sm text-cream/70">Bezoekers, aanvragen, klanten en projecten op één plek. Alleen voor Justin.</p>

        {fout && errors[fout] && <p className="mt-6 w-full rounded-[10px] bg-cream/10 px-4 py-3 text-sm text-cream" role="alert">{errors[fout]}</p>}

        {supabaseConfigured && !(await googleEnabled()) ? (
          <div className="mt-8 w-full rounded-[14px] bg-cream/10 p-5 text-sm leading-relaxed text-cream/85" role="alert">
            <p className="font-semibold text-lime">Google staat nog uit in Supabase</p>
            <p className="mt-2">Zet in Supabase onder Authentication › Sign In / Providers › Google de provider aan, met de Client ID en het Client secret uit Google Cloud.</p>
          </div>
        ) : supabaseConfigured ? (
          <LoginButton />
        ) : (
          <div className="mt-8 w-full rounded-[14px] bg-cream/10 p-5 text-sm leading-relaxed text-cream/85">
            <p className="font-semibold text-lime">Nog niet gekoppeld</p>
            <p className="mt-2">
              Zet <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en <code>SUPABASE_SERVICE_ROLE_KEY</code> in
              {" "}<code>.env.local</code> (en bij Vercel). Daarna verschijnt hier de Google-login.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
