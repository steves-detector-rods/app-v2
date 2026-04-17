import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Returns & Warranty",
  description:
    "30-day return window on standard items. Lifetime warranty on carbon fiber, one year on hardware.",
};

export default function Page() {
  return <PolicyPage slug="returns" eyebrow="Policies" />;
}
