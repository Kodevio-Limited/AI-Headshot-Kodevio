import Hero from "@/components/sections/Hero";
import TransformationGallery from "@/components/sections/TransformationGallery";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import TrustCTA from "@/components/sections/TrustCTA";
import BeforeAfterSlider from "../components/sections/BeforeAfterSlider";

export default function Home() {
  return (
    <>
      <Hero />
      <BeforeAfterSlider />
      <TransformationGallery />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <TrustCTA />
    </>
  );
}
