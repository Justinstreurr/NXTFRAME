import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { AiFirst, CreativePartner, Difference, Platform, Testimonials, Work, HomeFaq, Prices, SmartExtras } from "@/components/Sections";
import Burnout from "@/components/Burnout";
import ServicesWheel from "@/components/ServicesWheel";
import Footer from "@/components/Footer";

// title and description come from the layout
export const metadata: Metadata = { alternates: { canonical: "/" } };

/**
 * The homepage as one story: the promise, the problem the visitor recognises, what they get, the
 * proof (work, then reviews straight after it), how it converts, the services and the steps, what
 * it costs, who it is for, the last questions, and the call to action in the footer. The
 * Statement and the Comparison table live on the sub pages, to keep this page short.
 */
export default function Home() {
  return (
    <>
      <Nav theme="photo" />
      <main id="main">
        <Hero />
        {/* the problem the visitor recognises: what their current site costs them */}
        <Burnout />
        {/* what you get: the three pillars as stacking cards */}
        <AiFirst />
        {/* the proof: the work, then what clients say about it */}
        <Work />
        <Testimonials dark />
        {/* how a site converts, then the services and the steps */}
        <CreativePartner />
        <ServicesWheel overlap />
        <Platform person />
        {/* more than a website: tools and integrations, kept short (a full page follows later) */}
        <SmartExtras />
        {/* what it costs, who it is for, the last questions */}
        <Prices />
        <Difference />
        <HomeFaq />
      </main>
      <Footer />
    </>
  );
}
