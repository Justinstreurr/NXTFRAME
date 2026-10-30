import type { CSSProperties } from "react";
import { phoneBars } from "./phoneBars";

/**
 * A phone screenshot in an iPhone: titanium rim, black bezel, Dynamic Island, a status bar (9:41,
 * signal, wifi, battery) in the colour of the page's own top edge, the home indicator and the side
 * buttons. Every measure is in container units (cqw), so the phone keeps its proportions at any
 * size, from a 90px thumbnail to a 400px hero. The screen has the iPhone's own ratio (393 x 852):
 * the status bar takes its top, the screenshot fills the rest from the top down.
 */
export default function PhoneFrame({
  src,
  alt = "",
  className = "",
  eager = false,
  style,
}: {
  src: string;
  alt?: string;
  className?: string;
  eager?: boolean;
  style?: CSSProperties;
}) {
  const bar = phoneBars[src.split("?")[0]] ?? { bg: "#000000", dark: false };
  const ink = bar.dark ? "#0b0b0c" : "#ffffff";
  return (
    <div className={`@container relative ${className}`} style={style}>
      {/* side buttons: action and volume left, power right, in the rim's titanium */}
      <span className="absolute left-[-1.1cqw] top-[17%] h-[5%] w-[1.6cqw] rounded-l-[1cqw] bg-[#3a3a3e]" aria-hidden="true" />
      <span className="absolute left-[-1.1cqw] top-[25%] h-[8.5%] w-[1.6cqw] rounded-l-[1cqw] bg-[#3a3a3e]" aria-hidden="true" />
      <span className="absolute left-[-1.1cqw] top-[35%] h-[8.5%] w-[1.6cqw] rounded-l-[1cqw] bg-[#3a3a3e]" aria-hidden="true" />
      <span className="absolute right-[-1.1cqw] top-[27%] h-[13%] w-[1.6cqw] rounded-r-[1cqw] bg-[#3a3a3e]" aria-hidden="true" />

      {/* the rim: a thin band of dark titanium with a little light along it */}
      <div className="rounded-[18cqw] bg-[linear-gradient(145deg,#5b5b60_0%,#2a2a2d_28%,#1b1b1d_55%,#46464b_100%)] p-[0.9cqw] shadow-[0_40px_70px_-28px_rgba(0,0,0,0.6),inset_0_0_0_0.3cqw_rgba(255,255,255,0.08)]">
        {/* the bezel */}
        <div className="rounded-[17cqw] bg-black p-[3.1cqw]">
          {/* the screen */}
          <div className="keep-round relative aspect-[393/852] overflow-hidden rounded-[13.8cqw]" style={{ backgroundColor: bar.bg }}>
            <div className="flex h-[13.5cqw] items-center justify-between px-[8cqw] pt-[1cqw]" style={{ color: ink }} aria-hidden="true">
              <span className="w-[22cqw] text-center text-[4.1cqw] font-semibold tracking-[-0.01em]">9:41</span>
              <span className="flex w-[22cqw] items-center justify-center gap-[1.4cqw]">
                {/* signal */}
                <svg viewBox="0 0 18 12" className="h-[2.9cqw] w-auto" fill="currentColor">
                  <rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" />
                </svg>
                {/* wifi */}
                <svg viewBox="0 0 16 12" className="h-[2.9cqw] w-auto" fill="currentColor">
                  <path d="M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.6 10.6 0 0 0 8 .4C5.2.4 2.6 1.4.5 3.4l1.2 1.3C3.4 3.1 5.6 2.2 8 2.2Z" />
                  <path d="M8 5.6c1.5 0 2.9.6 4 1.6l1.2-1.3A7.6 7.6 0 0 0 8 3.8c-2 0-3.8.8-5.2 2.1L4 7.2c1.1-1 2.5-1.6 4-1.6Z" />
                  <path d="M8 9c.6 0 1.2.2 1.7.7L8 11.6 6.3 9.7c.5-.5 1.1-.7 1.7-.7Z" />
                </svg>
                {/* battery */}
                <svg viewBox="0 0 27 13" className="h-[3cqw] w-auto">
                  <rect x="0.5" y="0.5" width="22" height="12" rx="3.6" fill="none" stroke="currentColor" strokeOpacity="0.4" />
                  <rect x="2" y="2" width="19" height="9" rx="2.2" fill="currentColor" />
                  <path d="M24 4.3v4.4c.9-.4 1.5-1.2 1.5-2.2s-.6-1.8-1.5-2.2Z" fill="currentColor" fillOpacity="0.45" />
                </svg>
              </span>
            </div>
            {/* the Dynamic Island */}
            <span className="absolute left-1/2 top-[2.7cqw] h-[8.6cqw] w-[29cqw] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
            <img src={src} alt={alt} className="block h-[calc(100%-13.5cqw)] w-full object-cover object-top" loading={eager ? "eager" : "lazy"} decoding="async" />
            {/* the home indicator */}
            <span className="absolute bottom-[2.2cqw] left-1/2 h-[1.3cqw] w-[35cqw] -translate-x-1/2 rounded-full bg-black/80 mix-blend-normal" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
