import type { Metadata } from "next";

/* the whole dashboard stays out of search engines, whatever robots.txt says */
export const metadata: Metadata = {
  title: { default: "Dashboard | NXT Frame", template: "%s | Dashboard NXT Frame" },
  robots: { index: false, follow: false },
};

export default function DashboardRoot({ children }: { children: React.ReactNode }) {
  return <div className="min-h-svh bg-cream text-forest">{children}</div>;
}
