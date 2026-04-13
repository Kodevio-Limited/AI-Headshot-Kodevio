const steps = [
  { number: 1, title: "Select your attire and backgrounds", desc: "Choose from our selection of curated outfits and backgrounds." },
  { number: 2, title: "Upload a few photos of yourself", desc: "Selfies work great. Six uploads is all you need - focus on quality over quantity for the best results." },
  { number: 3, title: "We create a custom AI model just for you", desc: "Our AI model gets to work. Just wait for your results and we&apos;ll email you when your headshots are ready!" },
  { number: 4, title: "View, edit, and download your favorites!", desc: "You&apos;ll receive up to 100 high-quality headshots to use however you want." },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-foreground text-balance">Get your headshots in <span className="text-orange-500">minutes</span>, not days</h2>
        <p className="mt-2 text-center text-gray-600">{"It's as easy as 1-2-3-4!"}</p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="text-center md:text-left">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-gradient-to-br from-orange-50 to-orange-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-orange-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-600">{step.number}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">{step.number}</div>
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
              </div>
              <p className="mt-2 text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
