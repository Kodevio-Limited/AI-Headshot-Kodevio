"use client";
import { useState } from "react";
import { Users, Palette, Camera, Zap } from "lucide-react";

const features = [
  { 
    icon: Users,
    title: "Consistent Headshots", 
    desc: "Get uniform headshots across team members, perfect for company websites and marketing assets.",
    image: "/assets/teams/consistent-headshots.jpg"
  },
  { 
    icon: Palette,
    title: "Brand Customization", 
    desc: "Create cohesive, on-brand headshots with advanced customization options for teams.",
    image: "/assets/teams/brand-customization.jpg"
  },
  { 
    icon: Camera,
    title: "Studio-Quality Results", 
    desc: "Get lifelike, high-resolution headshots that match professional studio photography.",
    image: "/assets/teams/studio-quality.jpg"
  },
  { 
    icon: Zap,
    title: "Integrations & API", 
    desc: "Integrate headshot creation into your existing workflows and connect Aragon to over 8,000 apps.",
    image: "/assets/teams/integrations.jpg"
  },
];

export default function TeamsFeatures() {
  const [active, setActive] = useState(0);
  const ActiveIcon = features[active].icon;
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground text-balance">Everything your <span className="text-orange-500">company needs</span></h2>
        <p className="mt-2 text-gray-600">Companies use us for all sorts of use cases, from in-person conferences to company websites.</p>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <button 
                  key={i} 
                  onClick={() => setActive(i)} 
                  className={`flex w-full gap-4 rounded-xl border p-4 text-left transition ${active === i ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:bg-gray-50"}`}
                >
                  <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${active === i ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${active === i ? "text-foreground" : "text-gray-500"}`}>{f.title}</h3>
                    <p className="text-gray-500">{f.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-linear-to-br from-orange-100 to-orange-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-500 text-white">
                  <ActiveIcon className="h-10 w-10" />
                </div>
                <p className="mt-4 text-xl font-bold text-foreground">{features[active].title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
