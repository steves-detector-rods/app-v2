import type { Metadata } from "next";
import { FinderFlow } from "@/components/compatibility/FinderFlow";

export const metadata: Metadata = {
  title: "Find Your Shaft — Compatibility Finder",
  description:
    "Pick your detector brand and model and we'll show every shaft, lower rod, and accessory we build for it.",
};

export default function FindYourShaftPage() {
  return <FinderFlow />;
}
