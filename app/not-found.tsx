import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto" style={{ maxWidth: 1440, padding: "120px 24px 180px" }}>
      <div
        className="font-mono text-[11px] uppercase mb-4"
        style={{ color: "#9A3624", letterSpacing: "0.25em" }}
      >
        — 404
      </div>
      <h1 className="font-sans font-bold text-display mb-6 text-balance">
        This page doesn&apos;t exist.
      </h1>
      <p
        className="text-[17px] mb-10"
        style={{ color: "#6A6B73", lineHeight: 1.6, maxWidth: 560 }}
      >
        It might have been moved in the rebuild, or it may never have existed. Try one of the paths below.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/">
          <Button variant="primary">Home</Button>
        </Link>
        <Link href="/find-your-shaft">
          <Button variant="secondary">Find Your Shaft</Button>
        </Link>
        <Link href="/products">
          <Button variant="ghost">Browse products</Button>
        </Link>
      </div>
    </div>
  );
}
