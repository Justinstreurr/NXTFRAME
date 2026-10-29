import { notFound } from "next/navigation";
import BranchPage from "@/components/BranchPage";
import { branches, branchHref } from "@/components/menuData";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return branches.filter((b) => branchHref(b).startsWith("/branches/")).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const branch = branches.find((b) => b.slug === slug);
  if (!branch) return { title: "Branches | NXT Frame" };
  return { title: `Websites voor ${branch.name} | NXT Frame`, description: branch.intro, alternates: { canonical: branchHref(branch) } };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const branch = branches.find((b) => b.slug === slug);
  if (!branch) notFound();
  return <BranchPage branch={branch} />;
}
