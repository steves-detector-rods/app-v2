import { WeavePlaceholder } from "@/components/ui/WeavePlaceholder";
import type { Product } from "@/types/product";

interface EngineeringContentProps {
  product: Product;
}

export function EngineeringContent({ product: p }: EngineeringContentProps) {
  // v1: render a common "material + construction" explainer. When we migrate
  // real design-highlights content per product, it lands in p.designHighlights.
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2"
      style={{ gap: 40, maxWidth: 1100 }}
    >
      <div>
        <h3
          className="font-sans font-bold text-text"
          style={{ fontSize: 22, marginBottom: 14, letterSpacing: "-0.01em" }}
        >
          Material &amp; construction
        </h3>
        <p
          className="text-text-muted"
          style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}
        >
          {p.material === "glass-fiber"
            ? "This rod is pulled from a non-conductive glass-fiber composite. Because it doesn't carry electrical signature into the coil, it eliminates the phantom targets and ground-loop false signals that aluminum and carbon-fiber rods can introduce in saltwater or over mineralized soil."
            : "3K carbon fiber in a twill weave is stiffer pound-for-pound than 6061 aluminum and has near-zero thermal expansion. We specify pre-preg tubes from a US supplier, pulled at a 45-degree bias to maximize torsional stiffness."}
        </p>
        <h3
          className="font-sans font-bold text-text"
          style={{ fontSize: 22, marginBottom: 14, letterSpacing: "-0.01em" }}
        >
          Cam lock design
        </h3>
        <p
          className="text-text-muted"
          style={{ fontSize: 14, lineHeight: 1.7 }}
        >
          The lock is injection-molded glass-filled nylon with a machined camming surface. The
          cam geometry generates radial clamping force across the full circumference, not just
          two contact points — the rod cannot twist under load.
        </p>
      </div>
      <div>
        <div style={{ aspectRatio: "4/3", marginBottom: 12 }}>
          <WeavePlaceholder color="black" aspect="4/3" label="CAM LOCK DETAIL" />
        </div>
        <div style={{ aspectRatio: "4/3" }}>
          <WeavePlaceholder
            color="black"
            aspect="4/3"
            label={
              p.material === "glass-fiber" ? "GLASS-FIBER · MATTE" : "3K TWILL — 45° BIAS"
            }
          />
        </div>
      </div>
    </div>
  );
}
