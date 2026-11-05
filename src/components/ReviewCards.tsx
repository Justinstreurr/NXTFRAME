import type { ReactNode } from "react";

export type Review = {
  name: string;
  /** the company, for the logo's alt text */
  brand: string;
  role: string;
  logo: string;
  href: string;
  quote: string;
  /** a few words taken literally from the quote, for the headline */
  lead: string;
  /** the rest of the headline after the quote, with the client's name in it */
  story: ReactNode;
  /** a 16:9 photo from the case (public/images/stories) */
  img: string;
  /** optional upright photo for phones, where the card stands 4:5 */
  imgPortrait?: string;
};

/**
 * Client stories as large photo cards side by side, after the customer stories of Superside: an
 * outlined tag top left, a headline that opens with the client's own words and names them in the
 * serif italic, "Bekijk de case" bottom left and their logo in white bottom right. The photo gets a
 * shade from the left so the white type always reads. Still: no motion, only the photo easing in
 * a little under the pointer.
 */
export default function ReviewCards({ reviews }: { reviews: Review[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {reviews.map((r) => (
        <li key={r.name}>
          <a href={r.href} className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-forest text-cream sm:aspect-[16/10] lg:aspect-[16/9]">
            <picture>
              {r.imgPortrait && <source media="(max-width: 639px)" srcSet={r.imgPortrait} />}
            <img
              src={r.img}
              alt=""
              width={1600}
              height={900}
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            </picture>
            <span className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0/0.72),rgb(0_0_0/0.45)_45%,rgb(0_0_0/0.15))]" aria-hidden="true" />
            <span className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
              <span>
                <span className="inline-block rounded-full border border-cream/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Klantverhaal
                </span>
                <span className="mt-5 block max-w-[22ch] font-display text-[clamp(1.4rem,2.3vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.02em]">
                  &ldquo;{r.lead}&rdquo;{r.story}
                </span>
              </span>
              <span className="flex items-end justify-between gap-6">
                <span className="inline-flex items-center gap-1.5 text-[15px] font-medium underline-offset-4 group-hover:underline">
                  Bekijk de case
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 11 11 5M6 5h5v5" />
                  </svg>
                </span>
                <img src={r.logo} alt={r.brand} className="h-5 w-auto brightness-0 invert md:h-6" loading="lazy" />
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** the client's name in the headline, set in the serif italic */
export const Brand = ({ children }: { children: ReactNode }) => <span className="serif-italic">{children}</span>;
