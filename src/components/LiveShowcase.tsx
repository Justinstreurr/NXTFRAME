import type { ReactNode } from "react";
import { ArrowIcon, Container, Eyebrow, TextLink } from "./ui";

/** a page of the live site: what it shows, and a screenshot of it in a browser window */
export type LivePage = {
  label: string;
  title: string;
  body: string;
  /** the page's path on the live site (liveUrl ends in a slash), "" for the homepage */
  path: string;
  src: string;
  /** the card's ground and type */
  tone: string;
  muted: string;
  /** the card's shape in the grid */
  span: string;
  /** a phone screenshot that stands in front of the window, bottom right */
  phone?: string;
};

/* a browser window with the screenshot, running off the foot of the card */
function Window({ url, src, alt }: { url: string; src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-t-xl bg-paper shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition-transform duration-700 ease-out group-hover:-translate-y-2">
      <div className="flex h-7 items-center gap-3 border-b border-black/5 bg-[#f3f4f0] px-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex h-[18px] flex-1 items-center truncate rounded-md bg-paper px-2 text-[10px] text-forest/70">{url}</span>
      </div>
      <img src={src} alt={alt} className="block w-full" loading="lazy" decoding="async" />
    </div>
  );
}

/**
 * The real site of a client, page by page: the heading and what it achieves on top, then a bento of
 * cards, each a page of the live site as a screenshot in a browser window that runs off the foot of
 * the card, with what that page does above it. The screenshots are taken from the live site
 * (public/images/showcase/<client>/live); retake them when the site changes.
 */
export default function LiveShowcase({
  title,
  lead,
  stats,
  caseHref,
  liveUrl,
  pages,
}: {
  title: ReactNode;
  lead: string;
  stats: { value: string; label: string }[];
  caseHref: string;
  liveUrl: string;
  pages: LivePage[];
}) {
  /* the address in the window's bar: the live site's host, without the protocol */
  const host = liveUrl.replace("https://", "").replace(/\/$/, "");
  return (
    <section className="bg-cream pt-16 text-forest md:pt-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Eyebrow className="max-w-xl">Het voorbeeld</Eyebrow>
            <h2 className="mt-6 t-section md:mt-8">{title}</h2>
          </div>
          <div>
            <p className="max-w-md text-lg leading-relaxed text-forest/75 md:text-xl">{lead}</p>
            <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4">
              <dl className="flex gap-x-10">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dd className="font-display text-4xl tracking-[-0.03em]">{s.value}</dd>
                    <dt className="text-sm text-forest/70">{s.label}</dt>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-x-8 gap-y-3 pb-1">
                <TextLink href={caseHref}>Lees de case</TextLink>
                <TextLink href={liveUrl}>Bekijk de live site</TextLink>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:gap-5 lg:grid-cols-12">
          {pages.map((p) => (
            <a
              key={p.title}
              href={`${liveUrl}${p.path}`}
              className={`group relative flex h-[460px] flex-col overflow-hidden rounded-[14px] md:h-[520px] ${p.tone} ${p.span}`}
            >
              <div className="relative z-10 max-w-md p-7 md:p-9">
                <p className={`text-sm font-medium ${p.muted}`}>{p.label}</p>
                <h3 className="mt-2 font-display text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[1.9rem]">{p.title}</h3>
                <p className={`mt-3 text-[15px] leading-relaxed ${p.muted}`}>{p.body}</p>
              </div>
              <div className="relative mt-auto px-6 md:px-9">
                <Window url={`${host}/${p.path}`} src={p.src} alt={`${p.title}: een pagina van de live site`} />
                {p.phone && (
                  <div className="absolute -bottom-6 right-4 w-[24%] min-w-[110px] overflow-hidden rounded-[22px] border-[5px] border-[#111] bg-[#111] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:-translate-y-3 md:right-10">
                    <img src={p.phone} alt="" className="block w-full rounded-[17px]" loading="lazy" decoding="async" />
                  </div>
                )}
              </div>
              <span className={`absolute right-6 top-6 grid size-9 place-items-center rounded-full ring-1 ring-current/20 opacity-60 transition-opacity group-hover:opacity-100 md:right-8 md:top-8`} aria-hidden="true">
                <ArrowIcon className="size-3.5" />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
