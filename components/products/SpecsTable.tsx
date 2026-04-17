import type { Product } from "@/types/product";

const ALWAYS: Array<[string, (p: Product) => string]> = [
  ["Model Number", (p) => p.sku],
  ["Product Type", (p) => p.typeName],
  [
    "Material",
    (p) =>
      p.material === "glass-fiber"
        ? "Glass-fiber (non-conductive)"
        : "Carbon-fiber (3K twill, glossy)",
  ],
];

const TRAILING: Array<[string, (p: Product) => string]> = [
  [
    "Compatible Detectors",
    (p) => p.compat.map((c) => c.name).join(", ") || p.compatText || "—",
  ],
];

interface SpecsTableProps {
  product: Product;
}

export function SpecsTable({ product: p }: SpecsTableProps) {
  const custom = Object.entries(p.specs ?? {}).filter(([k]) => {
    // avoid duplicating Material, which we render in ALWAYS
    return k !== "Material";
  });

  const rows: Array<[string, string]> = [
    ...ALWAYS.map(([k, fn]) => [k, fn(p)] as [string, string]),
    ...custom,
    ...TRAILING.map(([k, fn]) => [k, fn(p)] as [string, string]),
  ];

  return (
    <div style={{ maxWidth: 800 }}>
      <table
        className="w-full"
        style={{ borderCollapse: "collapse" }}
      >
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k} className="border-b border-border">
              <td
                className="font-mono uppercase text-text-muted"
                style={{
                  padding: "14px 0",
                  fontSize: 13,
                  letterSpacing: "0.04em",
                  width: 240,
                }}
              >
                {k}
              </td>
              <td
                className="font-mono text-text"
                style={{ padding: "14px 0", fontSize: 14 }}
              >
                {v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
