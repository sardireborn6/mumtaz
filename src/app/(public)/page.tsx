import { Hero } from "@/components/landing/hero";
import { TrustBar } from "@/components/landing/trust-bar";
import { Categories } from "@/components/landing/categories";
import { FeaturedProducts } from "@/components/landing/featured-products";
import { WhyUs } from "@/components/landing/why-us";
import { Process } from "@/components/landing/process";
import { Branches } from "@/components/landing/branches";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CtaBanner } from "@/components/landing/cta-banner";
import { getFeaturedProducts } from "@/lib/data/get-products";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="flex-1">
      <Hero />
      <TrustBar />
      <Categories />
      <FeaturedProducts products={featuredProducts} />
      <WhyUs />
      <Process />
      <Branches />
      <Testimonials />
      <FAQ />
      <CtaBanner />
    </main>
  );
}
