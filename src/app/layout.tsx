import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import BrandCursor from "@/components/BrandCursor";
import Tracker from "@/components/Tracker";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

/* Vercel preview and development deployments stay out of Google; production, and any host that
   isn't Vercel, is indexed as normal */
const isPreview = process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";

/* defaults for every page. The pages set their own title, description and canonical; the Open Graph
   block has no title on purpose, so shares fall back to each page's own <title> and description.
   The share image (opengraph-image.jpg) and the icons sit next to this file. */
export const metadata: Metadata = {
  metadataBase: new URL("https://nxtframe.ai"),
  title: "NXT Frame | Websites die gevonden worden en verkopen",
  description:
    "Creatieve webbouwer voor websites die snel laden, gevonden worden in Google en ChatGPT, en converteren. Ontworpen rond jouw klant.",
  openGraph: { type: "website", locale: "nl_NL", siteName: "NXT Frame" },
  twitter: { card: "summary_large_image" },
  ...(isPreview && { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = { themeColor: "#02261e" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior: Next 16 only turns the smooth scrolling off during a page change with this, so a new page opens at the top
    <html lang="nl" data-scroll-behavior="smooth" className={`${inter.variable} ${interTight.variable} ${instrument.variable}`}>
      <body>
        {/* the first stop for keyboard users: straight past the menu to the content */}
        <a href="#main" className="skip-link">Naar de inhoud</a>
        {children}
        <BrandCursor />
        <Tracker />
      </body>
    </html>
  );
}
