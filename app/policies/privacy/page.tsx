import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What we collect, what we use it for, and how we handle payment and analytics data.",
};

export default function Page() {
  return <PolicyPage slug="privacy" eyebrow="Policies" />;
}
