"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BRANDS, MODELS_BY_BRAND } from "@/lib/compatibility";
import { getProductBySlug } from "@/lib/products";
import { Button } from "@/components/ui/Button";

const SUBJECTS = [
  "General question",
  "Custom build request",
  "Order issue",
  "Wholesale / dealer",
];

const FIELD_STYLE: React.CSSProperties = {
  border: "1px solid #E3E1D6",
  padding: "12px 14px",
  fontSize: 14,
  background: "#FFFFFF",
  outline: "none",
  width: "100%",
};

export function ContactForm() {
  const params = useSearchParams();
  const productSlug = params.get("product") ?? "";
  const product = productSlug ? getProductBySlug(productSlug) : undefined;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(product ? "Custom build request" : SUBJECTS[0]);
  const [detector, setDetector] = useState(
    product?.compat[0] ? `${product.compat[0].brand}|${product.compat[0].model}` : ""
  );
  const [message, setMessage] = useState(
    product ? `Looking for a custom build based on your ${product.shortName} (${product.sku}).\n\n` : ""
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(e: FormEvent) {
    e.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      // No endpoint configured — fall back to mailto: so the form is still useful
      // during local dev. Wired up properly in M15 deploy prep.
      window.location.href = `mailto:steve@stevesdetectorrods.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nDetector: ${detector}\n\n${message}`
      )}`;
      setStatus("success");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, subject, detector, message, productSlug }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="bg-surface-alt border border-border"
        style={{ padding: 36, borderLeft: "3px solid #B8452F" }}
      >
        <div
          className="font-sans font-semibold text-text mb-2"
          style={{ fontSize: 20, letterSpacing: "-0.01em" }}
        >
          Thanks — message sent.
        </div>
        <p className="text-text-muted" style={{ fontSize: 15, lineHeight: 1.6 }}>
          We&apos;ll reply within 24 hours (Mon–Fri). If it&apos;s urgent, email Steve directly
          at <strong>steve@stevesdetectorrods.com</strong>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col"
      style={{ gap: 18 }}
    >
      <Field label="Name">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={FIELD_STYLE}
          placeholder="Your name"
        />
      </Field>
      <Field label="Email">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={FIELD_STYLE}
          placeholder="you@email.com"
        />
      </Field>
      <Field label="Subject">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="sdr-select"
          style={FIELD_STYLE}
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Detector model">
        <select
          value={detector}
          onChange={(e) => setDetector(e.target.value)}
          className="sdr-select"
          style={FIELD_STYLE}
        >
          <option value="">Select your detector…</option>
          {BRANDS.flatMap((b) =>
            MODELS_BY_BRAND[b.slug].map((m) => (
              <option key={`${b.slug}|${m.slug}`} value={`${b.slug}|${m.slug}`}>
                {b.name} {m.name}
              </option>
            ))
          )}
          <option value="other">Other / not listed</option>
        </select>
      </Field>
      <Field label="Message">
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...FIELD_STYLE, resize: "vertical" }}
          placeholder="Tell us what you're looking for…"
        />
      </Field>
      {status === "error" && (
        <div
          className="text-[14px]"
          style={{ color: "#9A3624" }}
        >
          Something went wrong sending this message. Email Steve directly at{" "}
          <strong>steve@stevesdetectorrods.com</strong>.
        </div>
      )}
      <Button
        variant="primary"
        type="submit"
        disabled={status === "loading"}
        className="self-start"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col" style={{ gap: 8 }}>
      <span
        className="font-semibold uppercase text-text"
        style={{ fontSize: 11, letterSpacing: "0.1em" }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
