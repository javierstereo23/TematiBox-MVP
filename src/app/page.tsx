import { HeroSection } from "@/components/home/HeroSection";
import { LiveDemoSection } from "@/components/home/LiveDemoSection";
import { DualSplitSection } from "@/components/home/DualSplitSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedThemes } from "@/components/home/FeaturedThemes";
import { DigitalShowcase } from "@/components/home/DigitalShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PillarsSection } from "@/components/home/PillarsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveDemoSection />
      <DualSplitSection />
      <HowItWorks />
      <FeaturedThemes />
      <DigitalShowcase />
      <TestimonialsSection />
      <PillarsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
