/* Supabase settings, read in one place. Without them the site runs as before: the tracker and the
   contact form skip storing, and the dashboard shows how to connect it. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** the one account that may open the dashboard; the database policies (supabase/schema.sql) say the same */
export const ADMIN_EMAIL = "justinstreurr@gmail.com";

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
