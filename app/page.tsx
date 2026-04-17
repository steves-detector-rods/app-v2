import { Hero } from "@/components/home/Hero";
import { ShopByDetector } from "@/components/home/ShopByDetector";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyCarbon } from "@/components/home/WhyCarbon";
import { TestimonialRow } from "@/components/home/TestimonialRow";
import { HandcraftedBanner } from "@/components/home/HandcraftedBanner";
import { organizationJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationJsonLd() }}
      />
      <Hero />
      <ShopByDetector />
      <CategoryCards />
      <FeaturedProducts />
      <WhyCarbon />
      <TestimonialRow />
      <HandcraftedBanner />
    </>
  );
}
