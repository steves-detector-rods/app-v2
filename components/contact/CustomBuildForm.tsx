"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

type BuildKind = "detector" | "scoop";

const KINDS: Array<{ value: BuildKind; label: string; hint: string }> = [
  {
    value: "detector",
    label: "Detector shaft",
    hint: "Upper, lower, or complete rod",
  },
  {
    value: "scoop",
    label: "Sand scoop handle",
    hint: "Handle for a scoop you already own",
  },
];

const FIELD_STYLE: React.CSSProperties = {
  border: "1px solid #E3E1D6",
  padding: "12px 14px",
  fontSize: 14,
  background: "#FFFFFF",
  outline: "none",
  width: "100%",
};

export function CustomBuildForm() {
  const params = useSearchParams();
  const kindParam = params.get("kind");

  const [kind, setKind] = useState<BuildKind>(kindParam === "scoop" ? "scoop" : "detector");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [make, setMake] = useState(params.get("make") ?? "");
  const [model, setModel] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const kindLabel = KINDS.find((k) => k.value === kind)?.label ?? "Custom build";
  const subject = `Custom build request — ${kindLabel}`;

  async function submit(e: FormEvent) {
    e.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      // No endpoint configured — fall back to mailto: so the form is still useful
      // during local dev. Mirrors the fallback in ContactForm.
      window.location.href = `mailto:steve@stevesdetectorrods.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nBuilding for: ${kindLabel}\nMake: ${make}\nModel: ${model}\n\nMeasurements:\n${
          dimensions || "(none yet)"
        }\n\n${message}`
      )}`;
      setStatus("success");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          buildFor: kindLabel,
          make,
          model,
          dimensions,
          message,
        }),
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
          Thanks — request sent.
        </div>
        <p className="text-text-muted" style={{ fontSize: 15, lineHeight: 1.6 }}>
          Steve reads these himself and replies within 24 hours (Mon–Fri). He&apos;ll tell
          you whether he can build it, what he still needs to see, and what it would cost.
        </p>
        <p className="text-text-muted" style={{ fontSize: 15, lineHeight: 1.6, marginTop: 14 }}>
          Have photos? Send them to <strong>steve@stevesdetectorrods.com</strong>{" "}
          and mention your make and model — photos of the mount move a quote along faster
          than anything else.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col" style={{ gap: 18 }}>
      <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
        <legend
          className="font-semibold uppercase text-text"
          style={{ fontSize: 11, letterSpacing: "0.1em", marginBottom: 8 }}
        >
          What are we building?
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
          {KINDS.map((k) => {
            const selected = kind === k.value;
            return (
              <label
                key={k.value}
                className="bg-surface cursor-pointer flex items-start"
                style={{
                  gap: 10,
                  padding: "14px 16px",
                  border: `1px solid ${selected ? "#B8452F" : "#E3E1D6"}`,
                  borderLeft: `3px solid ${selected ? "#B8452F" : "#E3E1D6"}`,
                }}
              >
                <input
                  type="radio"
                  name="kind"
                  value={k.value}
                  checked={selected}
                  onChange={() => setKind(k.value)}
                  style={{ accentColor: "#B8452F", marginTop: 3 }}
                />
                <span>
                  <span
                    className="font-sans font-semibold text-text block"
                    style={{ fontSize: 15, letterSpacing: "-0.005em" }}
                  >
                    {k.label}
                  </span>
                  <span className="text-text-muted block" style={{ fontSize: 13, marginTop: 2 }}>
                    {k.hint}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

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

      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 18 }}>
        <Field label={kind === "scoop" ? "Scoop make" : "Detector make"}>
          <input
            required
            value={make}
            onChange={(e) => setMake(e.target.value)}
            style={FIELD_STYLE}
            placeholder={kind === "scoop" ? "e.g. Anderson" : "e.g. Nokta"}
          />
        </Field>
        <Field label="Model">
          <input
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={FIELD_STYLE}
            placeholder={kind === "scoop" ? "e.g. 12-inch sifter" : "e.g. Legend"}
          />
        </Field>
      </div>

      <Field
        label="Measurements (optional)"
        hint={
          kind === "scoop"
            ? "Outside diameter of the existing handle, overall length, and how it attaches to the scoop."
            : "Outside diameter of the existing rod, overall length, and how the mount and coil ears attach."
        }
      >
        <textarea
          rows={4}
          value={dimensions}
          onChange={(e) => setDimensions(e.target.value)}
          style={{ ...FIELD_STYLE, resize: "vertical" }}
          placeholder="Whatever you have. No calipers? Leave it blank — Steve will tell you what to measure."
        />
      </Field>

      <Field label="Tell Steve what you need">
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...FIELD_STYLE, resize: "vertical" }}
          placeholder="What you're running now, what you want changed, length preference, anything unusual about the mount…"
        />
      </Field>

      <p className="text-text-muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
        This form can&apos;t take attachments. Photos of the mount from two or three angles
        are the single most useful thing you can send — email them to{" "}
        <strong>steve@stevesdetectorrods.com</strong>{" "}
        once you&apos;ve sent this, or just reply to Steve&apos;s response.
      </p>

      {status === "error" && (
        <div className="text-[14px]" style={{ color: "#9A3624" }}>
          Something went wrong sending this request. Email Steve directly at{" "}
          <strong>steve@stevesdetectorrods.com</strong>.
        </div>
      )}

      <Button
        variant="primary"
        type="submit"
        disabled={status === "loading"}
        className="self-start"
      >
        {status === "loading" ? "Sending…" : "Send request"}
      </Button>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col" style={{ gap: 8 }}>
      <span
        className="font-semibold uppercase text-text"
        style={{ fontSize: 11, letterSpacing: "0.1em" }}
      >
        {label}
      </span>
      {hint && (
        <span
          className="text-text-muted"
          style={{ fontSize: 13, lineHeight: 1.55, marginTop: -2 }}
        >
          {hint}
        </span>
      )}
      {children}
    </label>
  );
}
