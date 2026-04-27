import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Michael Torres",
    role: "Software Engineer",
    company: "TechCorp",
    image: "/assets/comparison/ben/healthcare.jpg",
    headshot: "/assets/comparison/ben/monochrome.jpg",
    quote:
      "The quality exceeded my expectations. I use my AI headshot for LinkedIn, company profiles, and speaking events. It looks completely natural.",
  },
  {
    id: 2,
    name: "Emily Watson",
    role: "Financial Analyst",
    company: "Startup Inc",
    image: "/assets/comparison/charlotte/healthcare.jpg",
    headshot: "/assets/comparison/charlotte/monochrome.jpg",
    quote:
      "I needed a professional photo quickly for a job application. Got studio-quality results in under 10 minutes. Highly recommend.",
  },
  {
    id: 3,
    name: "James Park",
    role: "Consultant",
    company: "Advisory Group",
    image: "/assets/comparison/victor/healthcare.jpg",
    headshot: "/assets/comparison/victor/monochrome.jpg",
    quote:
      "As someone who works with clients globally, having a polished headshot is essential. This tool delivered exactly what I needed.",
  },
];

const stats = [
  { value: "10,000+", label: "Professionals served" },
  { value: "4.9", label: "Average rating" },
  { value: "50+", label: "Countries" },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
            Trusted by professionals
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their online presence
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-8 border-y border-border py-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold text-foreground sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
            >
              {/* Quote Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Quote className="h-5 w-5 text-accent" />
              </div>

              {/* Quote Text */}
              <p className="mt-4 text-muted-foreground leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author Info */}
              <div className="mt-6 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Generated Headshot Preview */}
              <div className="mt-6 overflow-hidden rounded-xl border border-border">
                <Image
                  src={testimonial.headshot}
                  alt={`${testimonial.name}'s AI headshot`}
                  width={400}
                  height={400}
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
