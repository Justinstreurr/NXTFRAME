import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { ADMIN_EMAIL, SUPABASE_ANON_KEY, SUPABASE_URL, supabaseConfigured } from "./env";

/** Supabase as the logged-in visitor: everything it reads or writes passes the database policies. */
export async function userClient() {
  const store = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        // Server Components can't set cookies; the proxy refreshes the session instead
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {}
      },
    },
  });
}

/** Supabase with the service role: bypasses the policies. Only for the site's own writes
    (tracker, contact form), never with anything a visitor can steer beyond plain values. */
export function serviceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseConfigured || !key) return null;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** The admin's Supabase client, or a redirect to the login. Every dashboard page and action starts here. */
export async function requireAdmin() {
  if (!supabaseConfigured) redirect("/dashboard/login");
  const supabase = await userClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  if (!email) redirect("/dashboard/login");
  if (email !== ADMIN_EMAIL) {
    await supabase.auth.signOut();
    redirect("/dashboard/login?fout=geen-toegang");
  }
  return { supabase, email };
}
