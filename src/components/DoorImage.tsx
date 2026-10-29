/**
 * Sliding-door reveal: the photo is split in two halves that start hidden at the centre
 * and slide outward (left half to the left, right half to the right) once a parent gets the `in` class.
 */
export default function DoorImage({
  src,
  alt = "",
  className = "",
  pos,
}: {
  src: string;
  alt?: string;
  className?: string;
  /** CSS object-position, to choose which part of the photo survives the crop */
  pos?: string;
}) {
  const style = pos ? { objectPosition: pos } : undefined;
  return (
    <div className={`door relative overflow-hidden rounded-2xl ${className}`}>
      <div className="door-l absolute inset-y-0 left-0 w-1/2 overflow-hidden">
        <img src={src} alt={alt} className="absolute inset-y-0 left-0 h-full w-[200%] max-w-none object-cover" style={style} loading="eager" decoding="async" />
      </div>
      <div className="door-r absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        <img src={src} alt="" aria-hidden="true" className="absolute inset-y-0 right-0 h-full w-[200%] max-w-none object-cover" style={style} loading="eager" decoding="async" />
      </div>
    </div>
  );
}
