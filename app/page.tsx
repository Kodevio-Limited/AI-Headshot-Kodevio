import Hero from "@/components/Hero";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import TrustedBy from "@/components/TrustedBy";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import PhotoShowcase from "@/components/PhotoShowcase";
import TeamsFeatures from "@/components/TeamsFeatures";
import EditingTools from "@/components/EditingTools";
import Pricing from "@/components/Pricing";
import News from "@/components/News";
import SecurityPrivacy from "@/components/SecurityPrivacy";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BeforeAfterSlider />
      <TrustedBy />
      <HowItWorks />
      <Testimonials />
      <PhotoShowcase />
      <TeamsFeatures />
      <EditingTools />
      <Pricing />
      <News />
      <SecurityPrivacy />
      <FAQ />
      <CTA />
    </>
  );
}
