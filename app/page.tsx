import Hero from "@/components/Hero";
import TransformationGallery from "@/components/TransformationGallery";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import TrustCTA from "@/components/TrustCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TransformationGallery />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <TrustCTA />
    </>
  );
}
