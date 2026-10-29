/**
 * The hero background: an aurora in the brand palette. Five soft fields of colour (lime, blush,
 * a lighter green, a cool teal and a mint core that only breathes in the middle) drift very slowly over a deep forest ground, under a fine
 * grain so the gradients never band. A scrim keeps the left half dark enough for the cream copy
 * and fades the foot into forest for the logo row. Pure CSS, no blur filters: every field is a
 * radial gradient, so it costs the GPU next to nothing. Stops moving for reduced-motion.
 */
export default function HeroAurora({ className = "" }: { className?: string }) {
  return (
    <div className={`aurora pointer-events-none absolute inset-0 -z-20 overflow-hidden ${className}`} aria-hidden="true">
      <div className="aurora-field aurora-lime" />
      <div className="aurora-field aurora-teal" />
      <div className="aurora-field aurora-core" />
      <div className="aurora-field aurora-blush" />
      <div className="aurora-field aurora-moss" />
      <div className="aurora-grain" />
      <div className="aurora-scrim" />
    </div>
  );
}
