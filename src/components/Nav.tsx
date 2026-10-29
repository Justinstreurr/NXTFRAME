import Link from "next/link";
import Logo from "./Logo";
import { Button } from "./ui";
import NavPalette from "./NavPalette";
import MobileMenu from "./MobileMenu";
import NavReveal from "./NavReveal";
import NavTint from "./NavTint";
import NavCta from "./NavCta";
import MegaMenu from "./MegaMenu";
import { menu } from "./menuData";

/**
 * `theme="hero"` is used on the homepage: the nav then follows the hero palette
 * (forest green on load, cherry after scrolling) via the `--hp-*` tokens in globals.css.
 * `theme="photo"` floats the bar over a photo hero as a pill of liquid glass: fixed, see-through
 * and in cream on load, turning to frosted cream once the visitor scrolls or opens a menu
 * (NavTint + .nav-photo / .nav-glass in globals.css).
 * Menu structure lives in menuData.ts; MegaMenu renders the desktop dropdown panels.
 */
export default function Nav({ theme = "cherry" }: { theme?: "cherry" | "hero" | "photo" }) {
  const hero = theme === "hero";
  const photo = theme === "photo";
  const tokens = hero || photo;
  const headerBg = hero ? "nav-hero sticky bg-(--hp-nav-bg)" : photo ? "nav-photo fixed inset-x-0 px-3 pt-3 md:px-5 md:pt-4" : "sticky bg-cream";
  // over a photo hero the bar is a floating pill of liquid glass (see .nav-glass in globals.css). Header
  // gutter + pill padding add up to the Container gutter (24/48/80px), so the logo and the CTA sit on
  // the same lines as the page content below.
  const bar = photo
    ? "nav-glass mx-auto grid h-[64px] w-full max-w-[calc(var(--site-max)-40px)] grid-cols-[auto_1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr] rounded-full px-3 md:px-7 xl:px-15"
    : "mx-auto grid h-[72px] w-full max-w-(--site-max) grid-cols-[auto_1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr] px-6 md:px-12 xl:px-20";
  const fg = tokens ? "text-(--hp-fg) hp-t" : "text-brown";
  const link = tokens
    ? "text-(--hp-fg) opacity-90 hover:opacity-100 hp-t"
    : "text-brown/90 hover:text-brown";
  const btn = tokens
    ? "hp-t bg-(--hp-brand) text-(--hp-btn-fg) hover:bg-(--hp-btn-hover)"
    : "bg-pink text-brown hover:bg-pink-hover";

  return (
    <header className={`nav-bar top-0 z-50 ${headerBg}`}>
      <NavReveal />
      {hero && <NavPalette />}
      {photo && <NavTint />}
      <div className={bar}>
        <Link href="/" className={`col-start-1 justify-self-start ${fg}`} aria-label="NXT Frame home">
          <span className="sm:hidden"><Logo size="sm" /></span>
          <span className="hidden sm:inline"><Logo size="md" /></span>
        </Link>
        <MegaMenu items={menu} linkClass={link} floating={photo} />
        <div className="col-start-3 flex items-center gap-2 justify-self-end sm:gap-5">
          <a href="/contact" className={`hidden text-[15px] font-medium lg:block ${link}`}>
            Contact
          </a>
          {/* over a photo hero the button waits until the hero's own buttons have scrolled away */}
          <NavCta waitForHero={photo}>
            {/* on phones the full label didn't fit next to the logo and the menu button, and was cut off */}
            <Button variant="custom" className={`whitespace-nowrap px-4 py-2 text-[13px] sm:px-5 sm:py-2.5 sm:text-sm ${btn}`} href="/contact">
              <span className="sm:hidden">Kennismaken</span>
              <span className="hidden sm:inline">Plan een kennismaking</span>
            </Button>
          </NavCta>
          <MobileMenu items={menu} hero={tokens} />
        </div>
      </div>
    </header>
  );
}
