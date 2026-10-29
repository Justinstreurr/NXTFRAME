import { NextResponse, type NextRequest } from "next/server";
import { userClient } from "@/lib/supabase/server";

/* Google sends the visitor back here (via Supabase) with a one-time code; swap it for a session
   cookie and go on to the dashboard, which checks whether this account may enter. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (code) {
    const supabase = await userClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}/dashboard`);
  }
  return NextResponse.redirect(`${origin}/dashboard/login?fout=inloggen-mislukt`);
}
