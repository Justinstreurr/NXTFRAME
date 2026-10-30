import type { NextConfig } from "next";

/* security headers on every response (aim: an A on securityheaders.com). No Content-Security-Policy
   yet: the site loads no third-party scripts, and a strict CSP needs nonces for Next's own inline scripts */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  /* in development, let a phone on the same network open the site (http://192.168.x.x:3000) with
     its scripts and live reload; has no effect on the built site */
  allowedDevOrigins: ["192.168.*.*"],
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  /* the branch pages moved to the addresses people search for (30 Oct 2026, see branchSeo in
     menuData.ts); the old ones redirect for good, so links and anything Google already knows keep working */
  async redirects() {
    const moved: [string, string][] = [
      ["/makelaars", "/makelaar-website"],
      ["/financieel-advies", "/financieel-adviseur-website"],
      ["/branches/makelaars", "/makelaar-website"],
      ["/branches/financieel-advies", "/financieel-adviseur-website"],
      ["/branches/horeca", "/horeca-website"],
      ["/branches/webshops", "/webshop-laten-maken"],
      ["/branches/bouw-en-installatie", "/bouw-en-installatie-website"],
      ["/branches/zorg-en-praktijken", "/praktijk-website"],
      ["/branches/beauty-en-wellness", "/salon-website"],
      ["/branches/coaches-en-adviseurs", "/coach-website"],
    ];
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
