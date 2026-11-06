import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import BrandCursor from "@/components/BrandCursor";
import Tracker from "@/components/Tracker";
import Script from "next/script";
import Consent, { consentDefault, cookiebotId } from "@/components/Consent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
/* the serif in two parts: the italic is in the homepage headline, so it loads first; the upright
   face only appears further down and on sub pages, so it isn't preloaded */
const instrumentItalic = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-italic",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-instrument",
  display: "swap",
  preload: false,
});

/* Vercel preview and development deployments stay out of Google; production, and any host that
   isn't Vercel, is indexed as normal */
const isPreview = process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";

/* defaults for every page. The pages set their own title, description and canonical; the Open Graph
   block has no title on purpose, so shares fall back to each page's own <title> and description.
   The share image (opengraph-image.jpg) and the icons sit next to this file. */
export const metadata: Metadata = {
  metadataBase: new URL("https://nxtframe.ai"),
  title: "NxtFrame | Websites die gevonden worden en verkopen",
  description:
    "Creatieve webbouwer voor websites die snel laden, gevonden worden in Google en ChatGPT, en converteren. Ontworpen rond jouw klant.",
  openGraph: { type: "website", locale: "nl_NL", siteName: "NxtFrame" },
  twitter: { card: "summary_large_image" },
  ...(isPreview && { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = { themeColor: "#02261e" };

/* the business itself, on every page, so Google ties the site, the Google Business Profile and the
   socials to one entity (and not to the TCL NXTFRAME television). A service-area business: no street
   address shown, the area it serves instead. sameAs: the Business Profile (its review link for now;
   swap in the Maps link once the profile shows in Maps) and the socials once they are known. */
const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://nxtframe.ai/#organization",
  name: "NxtFrame",
  url: "https://nxtframe.ai",
  logo: "https://nxtframe.ai/apple-icon.png",
  image: "https://nxtframe.ai/opengraph-image.jpg",
  description: "Websites, webshops en AI-oplossingen voor ondernemers, ontworpen en gebouwd door één maker.",
  email: "hallo@nxtframe.ai",
  founder: { "@type": "Person", "@id": "https://nxtframe.ai/#justin", name: "Justin Streur" },
  address: { "@type": "PostalAddress", addressLocality: "Purmerend", addressCountry: "NL" },
  areaServed: { "@type": "Country", name: "Nederland" },
  identifier: { "@type": "PropertyValue", propertyID: "KvK", value: "42102903" },
  sameAs: ["https://g.page/r/CecKFPBta6z2EBM/review"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior: Next 16 only turns the smooth scrolling off during a page change with this, so a new page opens at the top
    <html lang="nl" data-scroll-behavior="smooth" className={`${inter.variable} ${interTight.variable} ${instrument.variable} ${instrumentItalic.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        {/* cookie banner first: Consent Mode starts at "denied", then Cookiebot; Consent renders the tools
            that wait for its answer (see Consent.tsx) */}
        {cookiebotId && (
          <>
            <Script id="consent-default" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: consentDefault }} />
            <Script id="Cookiebot" strategy="beforeInteractive" src="https://consent.cookiebot.com/uc.js" data-cbid={cookiebotId} />
          </>
        )}
        <Consent />
        {/* the first stop for keyboard users: straight past the menu to the content */}
        <a href="#main" className="skip-link">Naar de inhoud</a>
        {children}
        <BrandCursor />
        <Tracker />
        {/* Vercel Speed Insights: load speed as real visitors get it (the Real Experience Score), no cookies */}
        <SpeedInsights />
      </body>
    </html>
  );
}
