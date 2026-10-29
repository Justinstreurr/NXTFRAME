import SlideLab from "@/components/slide/SlideLab";

/* internal test bench for the 3D slide; not linked from the site */
export const metadata = { title: "Slide lab", robots: { index: false, follow: false } };

export default async function Page({ searchParams }: { searchParams: Promise<{ view?: string; pair?: string }> }) {
  const { view = "side", pair } = await searchParams;
  return (
    <main style={{ width: "100vw", height: "100vh", background: "#f4f4f2" }}>
      <SlideLab view={view} pair={pair === "1"} />
    </main>
  );
}
