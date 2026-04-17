import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Standard build times, shipping rates, international orders, and tracking.",
};

export default function Page() {
  return <PolicyPage slug="shipping" eyebrow="Policies" />;
}
