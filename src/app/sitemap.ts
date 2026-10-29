import type { MetadataRoute } from "next";
import { branches, branchHref } from "@/components/menuData";

const SITE = "https://nxtframe.ai";

/* every page Google should find: the main pages, the services, the cases and one page per branch
   (the branches come from menuData, so a new branch lands here by itself). /lab stays out. */
const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/website-laten-maken", priority: 0.9 },
  { path: "/webshop-laten-maken", priority: 0.9 },
  { path: "/landingspagina-laten-maken", priority: 0.9 },
  { path: "/website-redesign", priority: 0.8 },
  { path: "/vindbaar-in-google-en-chatgpt", priority: 0.8 },
  { path: "/website-onderhoud", priority: 0.7 },
  { path: "/website-teksten", priority: 0.7 },
  { path: "/diensten", priority: 0.8 },
  { path: "/prijzen", priority: 0.8 },
  { path: "/werk", priority: 0.7 },
  { path: "/werk/happy-flops", priority: 0.6 },
  { path: "/werk/hypotheekhaven", priority: 0.6 },
  { path: "/branches", priority: 0.7 },
  { path: "/aanpak", priority: 0.6 },
  { path: "/over", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy", priority: 0.2 },
  { path: "/voorwaarden", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const branchPages = branches.map((b) => ({ path: branchHref(b), priority: 0.7 }));
  const all = [...pages, ...branchPages.filter((b) => !pages.some((p) => p.path === b.path))];
  return all.map((p) => ({ url: `${SITE}${p.path}`, lastModified: new Date(), changeFrequency: "monthly", priority: p.priority }));
}
