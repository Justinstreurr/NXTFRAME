import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./env";

/** Supabase in the browser, as the logged-in admin: the Google login and document uploads. */
export const browserClient = () => createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
