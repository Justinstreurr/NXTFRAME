import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { ArrowIcon } from "@/components/ui";
import { longDate, postHref, posts } from "@/components/blogPosts";

export const metadata: Metadata = {
  title: "Blog | Eerlijke antwoorden over websites | NXT Frame",
  description:
    "Antwoorden op de vragen die ondernemers stellen over hun website: wat het kost, hoe je gevonden wordt en wat je slim kunt automatiseren. Geschreven door Justin Streur van NXT Frame.",
  alternates: { canonical: "/blog" },
};

/* newest first */
const list = [...posts].sort((a, b) => b.published.localeCompare(a.published));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog van NXT Frame",
  url: "https://nxtframe.ai/blog",
  description: metadata.description,
  publisher: { "@type": "Organization", name: "NXT Frame", url: "https://nxtframe.ai" },
  blogPost: list.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `https://nxtframe.ai${postHref(p)}`,
    datePublished: p.published,
    dateModified: p.updated,
  })),
};

/**
 * The blog hub: every article as a card with its photo, the subject, the title and the short answer,
 * newest first. No tags or author pages: there is one writer and a handful of articles.
 */
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell
        eyebrow="Blog"
        title={<>Eerlijke antwoorden <span className="serif-italic">op wat je zoekt</span></>}
        intro="Wat een website kost, hoe je gevonden wordt en wat je slim kunt automatiseren. Ik schrijf op wat ondernemers me vragen, met het antwoord bovenaan."
      >
        <ul className="mt-12 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-2">
          {list.map((p) => (
            <li key={p.slug}>
              <a href={postHref(p)} className="group block">
                <span className="block aspect-[16/10] overflow-hidden rounded-3xl bg-forest">
                  <img
                    src={p.img}
                    alt=""
                    width={1600}
                    height={1000}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ objectPosition: p.pos }}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-forest/70">
                  <span className="font-semibold uppercase tracking-[0.14em]">{p.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={p.published}>{longDate(p.published)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{p.readMinutes} min lezen</span>
                </span>
                <h2 className="mt-3 flex items-start gap-3 font-display text-[1.6rem] font-medium leading-tight tracking-tight md:text-[1.9rem]">
                  {p.title}
                  <ArrowIcon className="mt-2 size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-forest/75">{p.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </PageShell>
    </>
  );
}
