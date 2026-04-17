"use client";

import { FormEvent, useState } from "react";

interface NewsletterFormProps {
  inFooter?: boolean;
}

export function NewsletterForm({ inFooter = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // TODO(M15): POST to Buttondown/Mailchimp/ConvertKit via env-driven endpoint
    await new Promise((r) => setTimeout(r, 400));
    setStatus("success");
    setEmail("");
  };

  if (inFooter) {
    return (
      <form className="flex border border-ink-line-soft" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 bg-transparent border-none outline-none"
          style={{ padding: "10px 12px", fontSize: 13, color: "#F3F1E8" }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="cursor-pointer border-none uppercase font-semibold"
          style={{
            background: "#B8452F",
            color: "#0A0B10",
            padding: "0 14px",
            fontSize: 11,
            letterSpacing: "0.1em",
          }}
        >
          {status === "success" ? "✓" : status === "loading" ? "…" : "Join"}
        </button>
      </form>
    );
  }

  // Inline/standalone variant (used on homepage M3)
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 border border-border bg-surface"
        style={{ padding: "12px 14px", fontSize: 14 }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="cursor-pointer font-semibold uppercase"
        style={{
          background: "#B8452F",
          color: "#0A0B10",
          padding: "0 20px",
          fontSize: 12,
          letterSpacing: "0.1em",
        }}
      >
        {status === "success" ? "Subscribed ✓" : status === "loading" ? "…" : "Subscribe"}
      </button>
    </form>
  );
}
