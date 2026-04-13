import { Button } from "@/components/ui/button";
import { Shield, Lock, Zap, ArrowRight } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption protects your data at every step",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your photos are deleted immediately after processing",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "AI-powered processing delivers results in minutes",
  },
];

export default function TrustCTA() {
  return (
    <section className="bg-transparent py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Trust Features */}
        <div className="grid gap-8 md:grid-cols-3">
          {trustFeatures.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 rounded-3xl border border-border bg-secondary/30 p-12 text-center lg:p-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
            Ready to transform your professional image?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Join thousands of professionals who have elevated their online presence with AI-powered headshots.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground px-8 h-12 text-base font-medium transition-all hover:bg-accent/90 hover:glow-primary"
            >
              Create Your Headshot
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground">
              No credit card required to start
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
