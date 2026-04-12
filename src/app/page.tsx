import { HeroSection } from "@/components/home/HeroSection";
import { DigitalShowcase } from "@/components/home/DigitalShowcase";
import { DualSplitSection } from "@/components/home/DualSplitSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedThemes } from "@/components/home/FeaturedThemes";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PillarsSection } from "@/components/home/PillarsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DigitalShowcase />
      <DualSplitSection />
      <HowItWorks />
      <FeaturedThemes />
      <SocialProofSection />
      <TestimonialsSection />
      <PillarsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
