import type { MetadataRoute } from "next";

/* everything open to search engines and AI crawlers, except the test pages under /lab and the
   private parts: the dashboard, its login callback and the tracker endpoint */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/lab/", "/dashboard", "/auth/", "/api/"] },
    sitemap: "https://nxtframe.ai/sitemap.xml",
  };
}
