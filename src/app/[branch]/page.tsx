import { notFound } from "next/navigation";
import BranchPage from "@/components/BranchPage";
import { branches, branchHref, branchSeo } from "@/components/menuData";

/* the branch pages on the shared template, each at its own search-shaped address (/horeca-website,
   /praktijk-website ...); every other top-level address that isn't a page of its own is a 404 */
type Params = Promise<{ branch: string }>;

const onTemplate = branches.filter((b) => branchSeo[b.slug]?.template);
const find = (path: string) => onTemplate.find((b) => branchHref(b) === `/${path}`);

export const dynamicParams = false;

export function generateStaticParams() {
  return onTemplate.map((b) => ({ branch: branchHref(b).slice(1) }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const branch = find((await params).branch);
  if (!branch) return { title: "Branches | NXT Frame" };
  return { title: `${branchSeo[branch.slug].title} | NXT Frame`, description: branch.intro, alternates: { canonical: branchHref(branch) } };
}

export default async function Page({ params }: { params: Params }) {
  const branch = find((await params).branch);
  if (!branch) notFound();
  return <BranchPage branch={branch} />;
}
