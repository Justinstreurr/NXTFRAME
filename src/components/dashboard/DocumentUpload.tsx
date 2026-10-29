"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { browserClient } from "@/lib/supabase/browser";
import { registerDocument } from "@/app/dashboard/actions";

/* Uploads straight from the browser to the private Supabase bucket (no size limit of the server in
   between), then records the file in the documents table. Up to 50 MB per file. */
export default function DocumentUpload({ clientId, projectId = null }: { clientId: string; projectId?: string | null }) {
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [state, setState] = useState<{ busy: boolean; error?: string }>({ busy: false });

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setState({ busy: true });
    const supabase = browserClient();
    for (const file of Array.from(files)) {
      if (file.size > 50 * 1024 * 1024) {
        setState({ busy: false, error: `${file.name} is groter dan 50 MB.` });
        return;
      }
      const safe = file.name.normalize("NFKD").replace(/[^\w.\-]+/g, "-").slice(-120);
      const path = `${clientId}/${crypto.randomUUID()}-${safe}`;
      const { error } = await supabase.storage.from("documenten").upload(path, file, { contentType: file.type || undefined });
      if (error) {
        setState({ busy: false, error: `${file.name}: ${error.message}` });
        return;
      }
      await registerDocument({ clientId, projectId, name: file.name, path, size: file.size, mime: file.type });
    }
    if (input.current) input.current.value = "";
    setState({ busy: false });
    router.refresh();
  };

  return (
    <div>
      <label
        className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-[10px] border border-dashed border-forest/25 px-4 py-6 text-center text-sm transition-colors hover:border-forest hover:bg-cream/60"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          upload(e.dataTransfer.files);
        }}
      >
        <span className="font-semibold">{state.busy ? "Bezig met uploaden…" : "Sleep bestanden hierheen of klik"}</span>
        <span className="text-xs text-forest/55">Offertes, contracten, briefings, logo&apos;s. Tot 50 MB per bestand.</span>
        <input ref={input} type="file" multiple className="sr-only" disabled={state.busy} onChange={(e) => upload(e.target.files)} />
      </label>
      {state.error && <p className="mt-2 text-sm text-forest" role="alert">{state.error}</p>}
    </div>
  );
}
