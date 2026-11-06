import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button, Container, Eyebrow, TextLink } from "@/components/ui";
import { longDate, postHref, posts } from "@/components/blogPosts";

type Params = Promise<{ slug: string }>;

const SITE = "https://nxtframe.ai";
const find = (slug: string) => posts.find((p) => p.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return { title: "Blog | NxtFrame" };
  return {
    title: `${p.title} | NxtFrame`,
    description: p.description,
    alternates: { canonical: postHref(p) },
    openGraph: { type: "article", title: p.title, description: p.description, publishedTime: p.published, modifiedTime: p.updated, authors: ["Justin Streur"] },
  };
}

/* the running text: paragraphs, lists, tables and links styled from the wrapper, as on the legal
   pages, so the articles stay plain markup */
const prose =
  "max-w-2xl text-[17px] leading-relaxed text-forest/80 " +
  "[&_p+p]:mt-4 [&_ul+p]:mt-4 [&_ol+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 " +
  "[&_li]:marker:text-forest/40 [&_strong]:font-semibold [&_strong]:text-forest " +
  "[&_a]:border-b [&_a]:border-forest/30 [&_a]:font-medium [&_a]:text-forest [&_a]:transition-colors hover:[&_a]:border-forest " +
  "[&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-forest [&_h3+p]:mt-2 " +
  "[&_div+p]:mt-5 [&_table]:w-full max-md:[&_td]:min-w-[10rem] max-md:[&_th]:min-w-[10rem] [&_table]:text-left [&_table]:text-[15px] [&_th]:border-b [&_th]:border-forest/15 [&_th]:py-3 [&_th]:pr-4 [&_th]:font-semibold [&_th]:text-forest " +
  "[&_td]:border-b [&_td]:border-forest/10 [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top " +
  "[&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:border-forest/30 [&_blockquote]:bg-paper [&_blockquote]:p-5 [&_blockquote]:text-[15px] [&_blockquote+p]:mt-4 " +
  "[&_code]:bg-forest/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_code]:text-forest";

/**
 * One article: breadcrumb, subject, title and the short answer as the lead, the author and dates,
 * a wide photo, then the contents as a sticky list beside the sections (like the legal pages), the
 * questions people also ask, the sources, who wrote it and the way on to the matching service.
 */
export default async function Page({ params }: { params: Params }) {
  const p = find((await params).slug);
  if (!p) notFound();
  const url = `${SITE}${postHref(p)}`;
  const others = posts.filter((o) => o.slug !== p.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        url,
        mainEntityOfPage: url,
        image: `${SITE}${p.img}`,
        datePublished: p.published,
        dateModified: p.updated,
        inLanguage: "nl-NL",
        author: { "@type": "Person", "@id": `${SITE}/#justin`, name: "Justin Streur", url: `${SITE}/over` },
        publisher: { "@type": "Organization", name: "NxtFrame", url: SITE },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main">
        <article data-zone="cherry" className="bg-cream pb-16 pt-12 text-forest md:pb-32 md:pt-24">
          <Container>
            <nav aria-label="Kruimelpad" className="text-[13px] text-forest/70">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-forest">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/blog" className="hover:text-forest">Blog</Link></li>
              </ol>
            </nav>
            <Eyebrow className="mt-8 max-w-xl">{p.category}</Eyebrow>
            <h1 className="mt-6 max-w-4xl t-section text-forest md:mt-8">{p.title}</h1>
            <p className="mt-6 max-w-2xl text-forest/80 t-lead">{p.description}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-forest/70">
              <span>
                Door <Link href="/over" className="font-medium text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest">Justin Streur</Link>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Bijgewerkt op <time dateTime={p.updated}>{longDate(p.updated)}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span>{p.readMinutes} min lezen</span>
            </p>

            <div className="mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-forest md:mt-14 md:aspect-[21/9]">
              <img src={p.img} alt={p.imgAlt} width={1600} height={900} className="size-full object-cover" style={{ objectPosition: p.pos }} fetchPriority="high" />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-[1fr_2fr] lg:gap-20">
              <nav aria-label="In dit artikel" className="self-start lg:sticky lg:top-28">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/70">In dit artikel</p>
                <ol className="mt-4 space-y-1">
                  {p.sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="group flex gap-3 py-2 text-[15px] text-forest/70 transition-colors hover:text-forest">
                        <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#vragen" className="group flex gap-3 py-2 text-[15px] text-forest/70 transition-colors hover:text-forest">
                      <span className="tabular-nums">{String(p.sections.length + 1).padStart(2, "0")}</span>
                      Veelgestelde vragen
                    </a>
                  </li>
                </ol>
                <TextLink href={p.next.href} className="mt-8">{p.next.label}</TextLink>
              </nav>

              <div>
                <div className="divide-y divide-forest/15 border-y border-forest/15">
                  {p.sections.map((s) => (
                    <section key={s.id} id={s.id} className="scroll-mt-28 py-10 md:py-12">
                      <h2 className="t-sub text-forest">{s.title}</h2>
                      <div className={`mt-5 ${prose}`}>{s.body}</div>
                    </section>
                  ))}
                  <section id="vragen" className="scroll-mt-28 py-10 md:py-12">
                    <h2 className="t-sub text-forest">Veelgestelde vragen</h2>
                    <dl className="mt-6 max-w-2xl divide-y divide-forest/10">
                      {p.faq.map((f) => (
                        <div key={f.q} className="py-5">
                          <dt className="font-display text-lg font-semibold tracking-tight text-forest">{f.q}</dt>
                          <dd className="mt-2 text-[17px] leading-relaxed text-forest/80">{f.a}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                </div>

                {p.sources && p.sources.length > 0 && (
                  <div className="mt-10">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/70">Bronnen</h2>
                    <ul className="mt-4 space-y-2 text-[15px]">
                      {p.sources.map((s) => (
                        <li key={s.href}>
                          <a href={s.href} rel="noopener noreferrer" target="_blank" className="text-forest/80 underline decoration-forest/30 underline-offset-4 hover:text-forest hover:decoration-forest">
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* who wrote it: one person, with a way to check him */}
                <aside className="mt-12 flex flex-col gap-6 rounded-3xl bg-forest p-8 text-paper md:flex-row md:items-center md:justify-between md:p-10">
                  <div className="max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/70">Geschreven door</p>
                    <p className="mt-3 font-display text-2xl font-medium tracking-tight">Justin Streur</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-paper/80">
                      Eigenaar van NxtFrame. Ik ontwerp en bouw websites voor ondernemers, van de eerste schets tot ver na de lancering. Vraag over dit
                      artikel? Mail me op hallo@nxtframe.ai.
                    </p>
                  </div>
                  <Button variant="custom" href="/contact" className="shrink-0 bg-lime px-6 py-3 text-forest hover:bg-lime-hover">
                    Plan een kennismaking
                  </Button>
                </aside>

                {others.length > 0 && (
                  <div className="mt-14">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/70">Lees ook</h2>
                    <ul className="mt-4 divide-y divide-forest/15 border-y border-forest/15">
                      {others.map((o) => (
                        <li key={o.slug}>
                          <a href={postHref(o)} className="block py-5 font-display text-xl font-medium tracking-tight text-forest transition-colors hover:text-forest/70">
                            {o.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
