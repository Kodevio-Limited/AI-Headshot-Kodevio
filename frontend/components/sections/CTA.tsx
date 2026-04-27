import { Button } from "@/components/ui/button";
import Image from "next/image";

const ctaImages = [
  "/assets/testimonials/individual/1.jpg",
  "/assets/testimonials/individual/2.jpg",
  "/assets/testimonials/individual/3.jpg",
  "/assets/testimonials/individual/4.jpg",
  "/assets/testimonials/individual/5.jpg",
  "/assets/testimonials/individual/6.jpg",
  "/assets/testimonials/individual/7.jpg",
  "/assets/testimonials/individual/8.jpg",
  "/assets/testimonials/individual/9.jpg",
  "/assets/testimonials/individual/10.jpg",
];

export default function CTA() {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground text-balance">Get your <span className="text-orange-500">AI headshots</span> today</h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">Join over 2 million professionals who have transformed their online presence with Aragon AI headshots.</p>
        <Button size="lg" className="mt-6 bg-orange-600 text-lg text-white hover:bg-orange-700">Create your headshots now</Button>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {ctaImages.map((src, i) => (
            <div key={i} className="relative h-20 w-20 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Image src={src} alt={`AI headshot example ${i + 1}`} fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
