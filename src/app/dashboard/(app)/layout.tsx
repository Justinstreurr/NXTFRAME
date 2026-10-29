import Link from "next/link";
import Logo from "@/components/Logo";
import SideNav from "@/components/dashboard/SideNav";
import { requireAdmin } from "@/lib/supabase/server";
import { signOut } from "../actions";

/* Everything behind the login: the guard runs here for every dashboard page, then the forest
   side bar with the menu and the cream work area. */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { supabase, email } = await requireAdmin();
  const { count } = await supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "nieuw");

  return (
    <div className="lg:grid lg:min-h-svh lg:grid-cols-[240px_1fr]">
      <aside className="bg-forest px-4 py-4 text-cream lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:px-5 lg:py-7">
        <div className="flex items-center justify-between gap-4 lg:block">
          <Link href="/dashboard" aria-label="Dashboard"><Logo size="sm" className="text-cream" /></Link>
          <Link href="/" className="text-xs text-cream/55 hover:text-cream lg:mt-2 lg:block">Naar de site</Link>
        </div>
        <div className="mt-4 lg:mt-10">
          <SideNav badge={count ?? 0} />
        </div>
        <form action={signOut} className="mt-4 hidden border-t border-cream/10 pt-4 text-xs text-cream/55 lg:mt-auto lg:block">
          <p className="truncate">{email}</p>
          <button type="submit" className="mt-1 underline underline-offset-4 hover:text-cream">Uitloggen</button>
        </form>
      </aside>
      <main id="main" className="min-w-0 px-4 py-8 md:px-8 lg:px-12 lg:py-12">{children}</main>
    </div>
  );
}
