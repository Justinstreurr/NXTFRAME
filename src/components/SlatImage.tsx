import type { CSSProperties } from "react";

/**
 * Slat reveal: the photo is cut into vertical slats that rise from the bottom one after
 * another, while the photo itself eases from a slight zoom to its true size. Plays once a
 * parent gets the `in` class (see Reveal). Every slat shows the same full-width image,
 * offset so the strips line up seamlessly.
 */
export default function SlatImage({
  src,
  alt = "",
  className = "",
  slats = 5,
  pos,
}: {
  src: string;
  alt?: string;
  className?: string;
  slats?: number;
  /** CSS object-position, to choose which part of the photo survives the crop. */
  pos?: string;
}) {
  const w = 100 / slats;
  return (
    <div className={`slats relative overflow-hidden rounded-2xl ${className}`}>
      {Array.from({ length: slats }, (_, i) => (
        <div
          key={i}
          className="slat absolute inset-y-0 overflow-hidden"
          style={{ left: `${i * w}%`, width: `calc(${w}% + 1px)`, "--i": i } as CSSProperties}
        >
          <img
            src={src}
            alt={i === 0 ? alt : ""}
            aria-hidden={i > 0 || undefined}
            className="absolute inset-y-0 h-full max-w-none object-cover"
            style={{ width: `${slats * 100}%`, left: `${-i * 100}%`, objectPosition: pos }}
            loading="eager"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
