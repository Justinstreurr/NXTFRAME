import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/supabase/server";

/* Opens a client document: a signed link that works for one minute, so files never get a public URL. */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: doc } = await supabase.from("documents").select("path, name").eq("id", id).single();
  if (!doc) return new NextResponse("Niet gevonden", { status: 404 });
  const { data } = await supabase.storage.from("documenten").createSignedUrl(doc.path, 60, { download: doc.name });
  if (!data) return new NextResponse("Kon het bestand niet openen", { status: 500 });
  return NextResponse.redirect(data.signedUrl);
}
