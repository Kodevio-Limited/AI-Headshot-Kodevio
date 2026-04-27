"use client";
import { useState, useRef } from "react";
import Image from "next/image";

const beforeAfterPairs = [
  { before: "/assets/comparison/Lovelace/before.jpg", after: "/assets/comparison/Lovelace/after.png" },
];

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, pos)));
  };

  return (
    <section className="relative overflow-hidden bg-secondary/30 py-6 md:py-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-0 h-56 w-56 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-52 w-52 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card/90 shadow-lg backdrop-blur-sm">
          <div ref={containerRef} className="relative aspect-9/12 cursor-ew-resize" onMouseMove={handleMove} onTouchMove={handleMove}>
            <div className="absolute inset-0">
              <Image src={beforeAfterPairs[activeIndex].before} alt="Before" fill className="object-cover" unoptimized />
            </div>
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
              <Image src={beforeAfterPairs[activeIndex].after} alt="After" fill className="object-cover" unoptimized />
            </div>
            <div className="absolute top-0 bottom-0 w-1 bg-background/90 shadow-lg" style={{ left: `${sliderPosition}%` }}>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card p-2 shadow">
                <div className="h-6 w-6 rounded-full bg-accent"></div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 rounded-md bg-accent px-2 py-1 text-xs font-semibold text-background backdrop-blur-sm">
              After
            </div>
            <div className="absolute bottom-4 right-4 rounded-md bg-background/85 px-2 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
              Before
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {beforeAfterPairs.map((_, i) => (
              <button type="button" aria-label={`Show comparison ${i + 1}`} key={i} onClick={() => setActiveIndex(i)} className={`h-2 w-2 rounded-full transition-colors ${i === activeIndex ? "bg-accent" : "bg-muted"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
