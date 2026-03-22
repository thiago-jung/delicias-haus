// src/app/page.tsx
// Responsabilidade: Página Home — composição de todas as seções

import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <BentoFeatures />
      <ProductShowcase />
      <Testimonials />
      <CTASection />
    </>
  );
}
