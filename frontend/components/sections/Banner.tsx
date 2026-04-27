"use client";
import { useState } from "react";
import { ArrowRight, X } from "lucide-react";

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className="relative flex items-center justify-between bg-black px-4 py-2 text-center text-sm text-white md:py-3">
      <div className="mx-auto flex flex-wrap items-center justify-center gap-2">
        <span className="font-bold">Local pricing is live: Aragon AI is now priced for your region.</span>
        <a href="#" className="inline-flex items-center font-semibold hover:underline">
          Create your headshots now <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
      <button onClick={() => setIsVisible(false)} className="absolute right-4">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
