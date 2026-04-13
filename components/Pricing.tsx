"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const individualPlans = [
  { name: "Basic", price: 12, original: 35, headshots: 40, time: "45 mins", attire: "1", bg: "1", resolution: "Standard" },
  { name: "Standard", price: 15, original: 45, headshots: 60, time: "30 mins", attire: "2", bg: "2", resolution: "Standard", popular: true },
  { name: "Executive", price: 25, original: 75, headshots: 100, time: "15 mins", attire: "All", bg: "All", resolution: "Enhanced", bestValue: true },
];

const teamPlans = [
  { name: "Small Team", price: 10, original: 25, headshots: 40, time: "45 mins", members: "5-10", features: ["Consistent styling", "Basic customization"] },
  { name: "Business", price: 8, original: 20, headshots: 60, time: "30 mins", members: "11-50", features: ["Consistent styling", "Brand colors", "Priority support"], popular: true },
  { name: "Enterprise", price: 6, original: 15, headshots: 100, time: "15 mins", members: "51+", features: ["Consistent styling", "Full branding", "API access", "Dedicated support"], bestValue: true },
];

export default function Pricing() {
  const [tab, setTab] = useState<"individual" | "team">("individual");
  const plans = tab === "individual" ? individualPlans : teamPlans;
  
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-bold">20% off all packages</span>
          <h2 className="mt-4 text-3xl font-bold text-balance">Professional-grade photoshoots for a <span className="text-orange-400">fraction</span> of the cost</h2>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 p-1">
            <button onClick={() => setTab("individual")} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${tab === "individual" ? "bg-white text-black" : "text-gray-300 hover:text-white"}`}>Individual Pricing</button>
            <button onClick={() => setTab("team")} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${tab === "team" ? "bg-white text-black" : "text-gray-300 hover:text-white"}`}>Teams Pricing</button>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-6 ${plan.popular ? "bg-white text-black shadow-xl ring-2 ring-orange-500" : "bg-gray-800"}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                {plan.popular && <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">83% pick this</span>}
                {plan.bestValue && <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">Best Value</span>}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className={`line-through ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>${plan.original}</span>
                {tab === "team" && <span className="text-sm text-gray-400">/person</span>}
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-orange-500" /> {plan.headshots} headshots</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-orange-500" /> {plan.time} generation</li>
                {tab === "individual" ? (
                  <>
                    <li className="flex items-center gap-2"><Check className="h-5 w-5 text-orange-500" /> {(plan as typeof individualPlans[0]).attire} attire choice</li>
                    <li className="flex items-center gap-2"><Check className="h-5 w-5 text-orange-500" /> {(plan as typeof individualPlans[0]).bg} background choice</li>
                    <li className="flex items-center gap-2"><Check className="h-5 w-5 text-orange-500" /> {(plan as typeof individualPlans[0]).resolution} resolution</li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2"><Check className="h-5 w-5 text-orange-500" /> {(plan as typeof teamPlans[0]).members} team members</li>
                    {(plan as typeof teamPlans[0]).features?.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2"><Check className="h-5 w-5 text-orange-500" /> {feature}</li>
                    ))}
                  </>
                )}
              </ul>
              <Button className={`mt-8 w-full ${plan.popular ? "bg-orange-600 text-white hover:bg-orange-700" : "bg-white text-black hover:bg-gray-100"}`}>
                Select
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
