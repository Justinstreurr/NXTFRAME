/**
 * Corner reveal: the photo starts as a tiny frame in its centre and grows to full size,
 * so the top-left corner travels up-left and the bottom-right corner travels down-right,
 * led by the two brand frame corners. Plays once a parent gets the `in` class (see Reveal).
 */
export default function CornerReveal({
  src,
  alt = "",
  className = "",
  corners = "tl-br",
}: {
  src: string;
  alt?: string;
  className?: string;
  /** Which two opposite corners lead the reveal. */
  corners?: "tl-br" | "tr-bl";
}) {
  const c = "pointer-events-none absolute size-8 border-lime";
  return (
    <div className={`corner-reveal relative ${className}`}>
      <div className="cr-box absolute inset-0 overflow-hidden rounded-2xl">
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" loading="eager" decoding="async" />
      </div>
      {corners === "tl-br" ? (
        <>
          <span className={`cr-tl ${c} left-3 top-3 rounded-tl-lg border-l-4 border-t-4`} aria-hidden="true" />
          <span className={`cr-br ${c} bottom-3 right-3 rounded-br-lg border-b-4 border-r-4`} aria-hidden="true" />
        </>
      ) : (
        <>
          <span className={`cr-tr ${c} right-3 top-3 rounded-tr-lg border-r-4 border-t-4`} aria-hidden="true" />
          <span className={`cr-bl ${c} bottom-3 left-3 rounded-bl-lg border-b-4 border-l-4`} aria-hidden="true" />
        </>
      )}
    </div>
  );
}
