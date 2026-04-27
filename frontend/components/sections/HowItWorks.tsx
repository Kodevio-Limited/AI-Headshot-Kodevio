import { Upload, Sparkles, Download } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Upload,
    title: "Upload your photo",
    desc: "Select any clear photo of yourself. A casual selfie works perfectly.",
  },
  {
    number: 2,
    icon: Sparkles,
    title: "AI transforms your image",
    desc: "Our AI analyzes and enhances your photo with professional studio quality.",
  },
  {
    number: 3,
    icon: Download,
    title: "Download your headshots",
    desc: "Choose from multiple professional styles and download in high resolution.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-transparent py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to your professional headshot
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-px w-full bg-border md:block" />
              )}

              <div className="relative flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                  <step.icon className="h-10 w-10 text-accent" />
                </div>

                {/* Step Number */}
                <div className="mt-6 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground max-w-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
