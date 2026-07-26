import type { Metadata } from "next";
import { Suspense } from "react";
import { CustomBuildForm } from "@/components/contact/CustomBuildForm";
import { Accordion } from "@/components/ui/Accordion";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request a Custom Build — Detector Shafts & Scoop Handles",
  description:
    "We don't stock parts for every machine. Send Steve the make, the model, and a few measurements and he'll tell you what he can build.",
};

const FAQ = [
  {
    question: "Can you build for a detector you don't list?",
    answer:
      "Often, yes. Steve has built one-offs for machines that never had an aftermarket rod made for them. He can't promise a fit sight unseen — he needs the make, the model, and enough measurement or photos to work from before he can say yes and put a number on it.",
  },
  {
    question: "What measurements does Steve need?",
    answer:
      "The outside diameter of the rod or handle you're running now, its overall length, and how it attaches at each end — the mount at the top and the coil ears or scoop at the bottom. Photos from two or three angles are worth more than exact numbers. If you don't have calipers, send what you have and Steve will tell you what to measure.",
  },
  {
    question: "What does a custom build cost?",
    answer:
      "It depends on the machine and how much fabrication the mount needs. There's no standard custom price — Steve quotes each build individually once he's seen the dimensions.",
  },
  {
    question: "How long does a custom build take?",
    answer:
      "Longer than a catalog order, since the parts don't exist until he makes them. Steve gives you a timeline along with the quote, once he knows what the build actually involves.",
  },
  {
    question: "Does the quote include mounting hardware?",
    answer:
      "That varies build to build — some machines reuse their factory hardware, some need new. Steve spells out exactly what is and isn't included when he sends the quote.",
  },
];

export default function CustomBuildPage() {
  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(FAQ) }}
      />

      <div className="border-b border-border" style={{ padding: "60px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{ color: "#9A3624", letterSpacing: "0.25em", marginBottom: 14 }}
          >
            — Custom Builds
          </div>
          <h1
            className="font-sans font-bold text-text"
            style={{ fontSize: 56, letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            Your machine isn&apos;t on the list.
          </h1>
          <p
            className="text-text-muted"
            style={{ fontSize: 17, lineHeight: 1.6, maxWidth: 640, marginTop: 18 }}
          >
            That doesn&apos;t mean we can&apos;t build for it. Steve makes one-off shafts and
            scoop handles all the time — he just needs to see what he&apos;s working with
            first.
          </p>
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
            <CustomBuildForm />
          </Suspense>

          <div>
            <div
              className="bg-surface-alt border border-border"
              style={{ padding: 28, borderLeft: "3px solid #B8452F", marginBottom: 20 }}
            >
              <div
                className="font-mono uppercase"
                style={{
                  color: "#9A3624",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  marginBottom: 12,
                }}
              >
                WHAT MOVES A QUOTE FASTEST
              </div>
              <ul
                className="text-text"
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  paddingLeft: 18,
                  margin: 0,
                  listStyle: "disc",
                }}
              >
                <li>The exact make and model, including the variant</li>
                <li>Photos of the mount, from two or three angles</li>
                <li>Outside diameter of the rod or handle you run now</li>
                <li>Overall length, and the length you actually want</li>
              </ul>
              <p
                className="text-text-muted"
                style={{ fontSize: 13, lineHeight: 1.6, marginTop: 14 }}
              >
                Missing a few of those? Send the request anyway. Steve would rather start the
                conversation than have you guess at numbers.
              </p>
            </div>

            <div className="text-bg" style={{ padding: 28, background: "#0F1018" }}>
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
              <div style={{ fontSize: 18, marginBottom: 8, wordBreak: "break-word" }}>
                steve@stevesdetectorrods.com
              </div>
              <div className="text-[13px]" style={{ color: "#888", lineHeight: 1.6 }}>
                Send photos here — the form can&apos;t take attachments. We typically reply
                within 24 hours, Mon–Fri.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-border"
        style={{ padding: "60px 24px 100px" }}
      >
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <h2
            className="font-sans font-semibold text-text"
            style={{ fontSize: 32, letterSpacing: "-0.02em", marginBottom: 24 }}
          >
            Before you ask
          </h2>
          <Accordion
            items={FAQ.map((f, i) => ({
              id: `custom-build-${i}`,
              question: f.question,
              answer: f.answer,
            }))}
          />
        </div>
      </section>
    </div>
  );
}
