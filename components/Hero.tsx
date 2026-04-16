"use client";

import { Button } from "@/components/ui/button";
import { Upload, Shield, ArrowRight } from "lucide-react";
import { useState, useCallback } from "react";
import Image from "next/image";

export default function Hero() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent pt-28 pb-20 lg:pt-32">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Subtle Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
              Trusted by professionals worldwide
            </div>

            {/* Headline */}
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance leading-[1.1]">
              Professional Headshots.{" "}
              <span className="text-gradient">Instantly.</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg text-muted-foreground text-pretty max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Transform any photo into studio-quality professional portraits with AI. 
              No photoshoot required.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground px-8 h-12 text-base font-medium transition-all hover:bg-accent/90 hover:glow-primary"
              >
                Create Your Headshot
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 border-border text-foreground hover:bg-muted"
              >
                View Examples
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-muted"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-foreground">10,000+</span>{" "}
                  <span className="text-muted-foreground">professionals</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 fill-amber-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">4.9</span>
                <span className="text-sm text-muted-foreground">rating</span>
              </div>
            </div>
          </div>

          {/* Right Column - Upload Interface & Preview */}
          <div className="relative">
            {/* Main Upload Card */}
            <div
              className={`relative rounded-2xl border bg-card p-8 shadow-lg transition-all duration-300 ${
                isDragging
                  ? "border-primary glow-primary"
                  : "border-border hover:border-primary/30"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Preview Grid */}
              <div className="mb-8 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden rounded-xl bg-muted"
                  >
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=Style ${i}`}
                      alt={`Headshot style ${i}`}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Upload Area */}
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <Upload className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Upload Your Photo
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Drag and drop or click to upload
                </p>

                <Button
                  size="lg"
                  className="mt-6 w-full bg-accent text-accent-foreground font-medium hover:bg-accent/90"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Select Photo
                </Button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Your photos are encrypted and never shared</span>
                </div>
              </div>
            </div>

            {/* Floating Elements - Subtle */}
            <div className="absolute -left-4 top-12 hidden lg:block">
              <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src="/assets/comparison/Lovelace/before.jpg"
                      alt="Before headshot"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Before</p>
                    <p className="text-sm font-medium text-foreground">Casual selfie</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-20 hidden lg:block">
              <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src="/assets/comparison/Lovelace/after.png"
                      alt="After headshot"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">After</p>
                    <p className="text-sm font-medium text-foreground">Professional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
