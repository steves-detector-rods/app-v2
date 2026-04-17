import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Custom builds, questions, support",
  description:
    "Have a question? Need a custom build? Contact Steve directly — we typically reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="bg-surface">
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
            — Contact
          </div>
          <h1
            className="font-sans font-bold text-text"
            style={{
              fontSize: 56,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Have a question? Need a custom build?
          </h1>
        </div>
      </div>

      <section style={{ padding: "60px 24px 100px" }}>
        <div
          className="mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]"
          style={{ maxWidth: 1000, gap: 60 }}
        >
          <Suspense
            fallback={
              <div className="text-text-muted" style={{ fontSize: 14 }}>
                Loading form…
              </div>
            }
          >
            <ContactForm />
          </Suspense>
          <div>
            <div
              className="text-bg"
              style={{ padding: 28, background: "#0F1018", marginBottom: 20 }}
            >
              <div
                className="font-mono uppercase"
                style={{
                  color: "#B8452F",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  marginBottom: 10,
                }}
              >
                DIRECT
              </div>
              <div style={{ fontSize: 18, marginBottom: 8 }}>
                steve@stevesdetectorrods.com
              </div>
              <div
                className="text-[13px]"
                style={{ color: "#888", lineHeight: 1.6 }}
              >
                We typically reply within 24 hours, Mon–Fri.
              </div>
            </div>
            <div
              className="bg-surface-alt border border-border"
              style={{ padding: 28 }}
            >
              <div
                className="font-mono uppercase"
                style={{
                  color: "#9A3624",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  marginBottom: 10,
                }}
              >
                THE SHOP
              </div>
              <div className="text-text" style={{ fontSize: 15, lineHeight: 1.6 }}>
                Norman, Oklahoma
                <br />
                USA
              </div>
              <div
                className="text-text-muted"
                style={{ marginTop: 14, fontSize: 12, lineHeight: 1.7 }}
              >
                Shop is by appointment — email first. We don&apos;t do walk-ins (the coffee
                machine is usually broken).
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
