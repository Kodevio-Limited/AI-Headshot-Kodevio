"use client";
import { useState, useRef } from "react";
import Image from "next/image";

const beforeAfterPairs = [
  { before: "/assets/comparison/before.jpg", after: "/assets/comparison/after.jpg" },
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
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl">
          <div ref={containerRef} className="relative aspect-9/12 cursor-ew-resize" onMouseMove={handleMove} onTouchMove={handleMove}>
            <div className="absolute inset-0">
              <Image src={beforeAfterPairs[activeIndex].before} alt="Before" fill className="object-cover" unoptimized />
            </div>
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
              <Image src={beforeAfterPairs[activeIndex].after} alt="After" fill className="object-cover" unoptimized />
            </div>
            <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${sliderPosition}%` }}>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow">
                <div className="h-6 w-6 rounded-full bg-orange-500"></div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white">
              Before
            </div>
            <div className="absolute bottom-4 right-4 rounded-md bg-orange-500 px-2 py-1 text-xs font-semibold text-white">
              After
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {beforeAfterPairs.map((_, i) => (
              <button type="button" aria-label={`Show comparison ${i + 1}`} key={i} onClick={() => setActiveIndex(i)} className={`h-2 w-2 rounded-full ${i === activeIndex ? "bg-orange-500" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
