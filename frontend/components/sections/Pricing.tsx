import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Essential",
    description: "Perfect for trying out",
    price: 19,
    features: [
      "20 AI headshots",
      "3 professional styles",
      "Standard resolution",
      "24-hour delivery",
    ],
  },
  {
    name: "Professional",
    description: "Most popular choice",
    price: 39,
    featured: true,
    features: [
      "50 AI headshots",
      "10 professional styles",
      "High resolution downloads",
      "1-hour express delivery",
      "Background variations",
      "Retouching adjustments",
    ],
  },
  {
    name: "Executive",
    description: "For maximum impact",
    price: 79,
    features: [
      "100 AI headshots",
      "Unlimited styles",
      "4K resolution downloads",
      "15-minute delivery",
      "Custom backgrounds",
      "Advanced retouching",
      "LinkedIn optimization",
      "Priority support",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-transparent py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Invest in your professional image. No subscriptions, no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl border p-8 transition-all duration-300",
                plan.featured
                  ? "border-accent bg-card shadow-lg ring-1 ring-accent"
                  : "border-border bg-card hover:border-accent/30 hover:shadow-lg"
              )}
            >
              {/* Featured Badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
                    Recommended
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mt-6 text-center">
                <span className="text-5xl font-semibold tracking-tight text-foreground">
                  ${plan.price}
                </span>
                <span className="ml-1 text-muted-foreground">one-time</span>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-3 w-3 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={cn(
                  "mt-8 w-full",
                  plan.featured
                    ? "bg-accent text-accent-foreground hover:bg-accent/90 hover:glow-primary"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                size="lg"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          All plans include commercial usage rights and are covered by our satisfaction guarantee.
        </p>
      </div>
    </section>
  );
}
