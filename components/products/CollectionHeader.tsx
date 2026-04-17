import Link from "next/link";

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface CollectionHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Breadcrumb[];
}

export function CollectionHeader({ title, subtitle, breadcrumbs }: CollectionHeaderProps) {
  return (
    <div
      className="border-b border-border bg-surface"
      style={{ padding: "60px 24px 40px" }}
    >
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <div
          className="font-mono text-text-muted"
          style={{ fontSize: 12, letterSpacing: "0.08em", marginBottom: 20 }}
        >
          {breadcrumbs.map((b, i) => (
            <span key={`${b.label}-${i}`}>
              {b.href ? (
                <Link
                  href={b.href}
                  className="uppercase"
                  style={{ color: i === breadcrumbs.length - 1 ? "#14151E" : "#6A6B73" }}
                >
                  {b.label}
                </Link>
              ) : (
                <span
                  className="uppercase"
                  style={{ color: i === breadcrumbs.length - 1 ? "#14151E" : "#6A6B73" }}
                >
                  {b.label}
                </span>
              )}
              {i < breadcrumbs.length - 1 && <span style={{ margin: "0 10px" }}>/</span>}
            </span>
          ))}
        </div>
        <h1
          className="font-sans font-bold text-text"
          style={{
            fontSize: 56,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            marginBottom: 14,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-text-muted" style={{ fontSize: 16, maxWidth: 640 }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
