/**
 * Browser-window mockup for site screenshots. The window sits on a coloured backdrop,
 * slightly offset so it bleeds out of the bottom-right corner of the card.
 */
export default function BrowserMockup({
  src,
  alt = "",
  url,
  bg = "bg-forest",
  className = "",
}: {
  src: string;
  alt?: string;
  url?: string;
  bg?: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden ${bg} ${className}`}>
      {/* subtle glow */}
      <div className="absolute -left-1/4 -top-1/3 size-[80%] rounded-full bg-paper/10 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-[9%] right-[-10%] top-[12%] overflow-hidden rounded-t-xl bg-paper shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover:-translate-y-2">
        {/* window chrome */}
        <div className="flex h-8 items-center gap-3 border-b border-black/5 bg-[#f3f4f0] px-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          {url && (
            <span className="ml-1 flex h-5 flex-1 items-center rounded-md bg-paper px-2 text-[10px] text-forest/50">
              {url}
            </span>
          )}
        </div>
        <img src={src} alt={alt} className="block w-full object-cover object-top" loading="lazy" />
      </div>
    </div>
  );
}
