"use client";

import { useEffect, useRef } from "react";

/**
 * Puts `is-dark` on the parent section once the section's own halfway point has risen to the
 * middle of the window, and takes it off again when the visitor scrolls back above that point.
 * It watches an invisible marker placed halfway down the section (the section must be
 * position: relative). The colours themselves, and their fade, live in CSS; this only flips the
 * class.
 *
 * A section right after it marked `data-follow-dark` (the black reviews) goes along: it gets the
 * same class at the same moment, so both fade together, and the switch also fires as soon as that
 * section's top enters the window. Without that, a fast scroll showed the reviews already black
 * under a work section still on its way from cream.
 */
export default function DarkOnArrive() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = marker.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    const next = section.nextElementSibling;
    const follower = next instanceof HTMLElement && next.hasAttribute("data-follow-dark") ? next : null;
    follower?.classList.add("has-leader");

    let markerPassed = false;
    let followerInView = false;
    const apply = () => {
      const dark = markerPassed || followerInView;
      section.classList.toggle("is-dark", dark);
      follower?.classList.toggle("is-dark", dark);
    };
    // dark once the marker is above the middle of the window, and it stays dark further down
    const io = new IntersectionObserver(
      ([e]) => {
        markerPassed = e.isIntersecting || e.boundingClientRect.top < 0;
        apply();
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    io.observe(el);
    // ... or once the follower's top shows at the foot of the window (or it lies above it)
    const followIo = follower
      ? new IntersectionObserver(([e]) => {
          followerInView = e.isIntersecting || e.boundingClientRect.top < 0;
          apply();
        })
      : null;
    if (follower) followIo?.observe(follower);
    return () => {
      io.disconnect();
      followIo?.disconnect();
      section.classList.remove("is-dark");
      follower?.classList.remove("is-dark", "has-leader");
    };
  }, []);

  return <span ref={marker} className="pointer-events-none absolute left-0 top-1/2 h-px w-px" aria-hidden="true" />;
}
