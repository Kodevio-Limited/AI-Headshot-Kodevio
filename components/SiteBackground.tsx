"use client";

import { useEffect, useState } from "react";
import PixelBlast from "@/components/PixelBlast";

function readThemeVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export default function SiteBackground() {
  const [blastColor, setBlastColor] = useState("#4f7cf7");

  useEffect(() => {
    const syncColor = () => {
      setBlastColor(readThemeVar("--pixel-blast-color", "#4f7cf7"));
    };

    syncColor();

    const observer = new MutationObserver(syncColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.32]">
      <PixelBlast
              className="h-full w-full"
              color={blastColor}
              variant="square"
              pixelSize={4}
              patternScale={2.2}
              patternDensity={0.95}
              pixelSizeJitter={0.2}
              enableRipples
              rippleIntensityScale={0.7}
              rippleThickness={0.12}
              rippleSpeed={0.28}
              liquid
              liquidStrength={0.07}
              liquidRadius={1.1}
              liquidWobbleSpeed={4.2}
              edgeFade={0.22}
              speed={0.45}
              transparent style={undefined}      />
    </div>
  );
}
