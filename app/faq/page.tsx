import type { Metadata } from "next";
import faqData from "@/data/faq.json";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "FAQ — Ordering, shipping, products",
  description:
    "Answers to common questions about ordering, shipping, custom builds, CarbonPro, returns, and warranty.",
};

interface FAQEntry {
  category: string;
  question: string;
  answer: string;
}

const FAQ = faqData as FAQEntry[];

const CATEGORIES = [
  "Ordering & Payment",
  "Shipping",
  "Products",
  "CarbonPro",
  "Returns & Warranty",
];

export default function FAQPage() {
  // FAQ JSON-LD for Google rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        className="border-b border-border"
        style={{ padding: "60px 24px" }}
      >
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{
              color: "#9A3624",
              letterSpacing: "0.25em",
              marginBottom: 14,
            }}
          >
            — FAQ
          </div>
          <h1
            className="font-sans font-bold text-text"
            style={{
              fontSize: 56,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Everything you might ask.
          </h1>
        </div>
      </div>

      <section style={{ padding: "60px 24px 120px" }}>
        <div
          className="mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr]"
          style={{ maxWidth: 1000, gap: 48 }}
        >
          <nav
            className="self-start"
            style={{ position: "sticky", top: 90 }}
          >
            <div
              className="font-sans font-semibold uppercase text-text mb-4"
              style={{ fontSize: 12, letterSpacing: "0.12em" }}
            >
              Jump to
            </div>
            <ul className="flex flex-col gap-2">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <a
                    href={`#${slug(c)}`}
                    className="text-text-muted text-[13px]"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            {CATEGORIES.map((cat) => {
              const items = FAQ.filter((f) => f.category === cat);
              if (items.length === 0) return null;
              return (
                <section
                  key={cat}
                  id={slug(cat)}
                  style={{ marginBottom: 48, scrollMarginTop: 100 }}
                >
                  <h2
                    className="font-sans font-semibold text-text mb-4"
                    style={{
                      fontSize: 24,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {cat}
                  </h2>
                  <Accordion
                    items={items.map((i, idx) => ({
                      id: `${slug(cat)}-${idx}`,
                      question: i.question,
                      answer: i.answer,
                    }))}
                  />
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
