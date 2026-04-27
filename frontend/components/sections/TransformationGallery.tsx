"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const transformations = [
  {
    id: 1,
    name: "Ada Lovelace",
    role: "Marketing Director",
    before: "/assets/comparison/Lovelace/before.jpg",
    after: "/assets/comparison/Lovelace/after.png",
  },
  {
    id: 2,
    name: "Michael Torres",
    role: "Software Engineer",
    before: "/assets/comparison/ben/healthcare.jpg",
    after: "/assets/comparison/ben/monochrome.jpg",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Financial Analyst",
   before: "/assets/comparison/charlotte/healthcare.jpg",
    after: "/assets/comparison/charlotte/monochrome.jpg",
  },
  {
    id: 4,
    name: "James Park",
    role: "Product Manager",
    before: "/assets/comparison/victor/healthcare.jpg",
    after: "/assets/comparison/victor/monochrome.jpg",
  },
];

export default function TransformationGallery() {
  return (
    <section className="bg-secondary/30 py-24" id="transformation-gallery">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
            See the transformation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From casual photos to studio-quality professional headshots in minutes
          </p>
        </div>

        {/* Transformation Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {transformations.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
            >
              {/* Before/After Images */}
              <div className="relative aspect-square overflow-hidden">
                {/* Before Image (visible by default, fades on hover) */}
                <Image
                  src={item.before}
                  alt={`${item.name} before`}
                  fill
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                {/* After Image (hidden by default, appears on hover) */}
                <Image
                  src={item.after}
                  alt={`${item.name} after`}
                  fill
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                
                {/* Labels */}
                <div className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
                  Before
                </div>
                <div className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  After
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-medium text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            View more transformations
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
