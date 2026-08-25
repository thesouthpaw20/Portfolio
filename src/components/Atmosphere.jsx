/**
 * The fixed backdrop every section sits on: a slow aurora field, a faint
 * measuring grid that fades out down the page, and a film grain over the top.
 * Purely decorative — hidden from assistive tech, inert to the pointer.
 */
export default function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere__aurora" />
      <div className="atmosphere__grid" />
      <div className="atmosphere__grain" />
    </div>
  );
}
