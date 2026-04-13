"use client";
import { Button } from "@/components/ui/button";
import { Lock, Upload, Smartphone, Clock, Sparkles } from "lucide-react";
import { useState, useCallback } from "react";

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
    // Handle file upload logic here
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white pb-20 pt-10">
      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-orange-800">
              <Sparkles className="h-4 w-4" />
              #1 RANKED AI HEADSHOT COMPANY
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
              The <span className="text-orange-500">Fastest</span> AI Headshot Generator
            </h1>
            <p className="mt-4 text-lg text-gray-600 text-pretty max-w-xl mx-auto lg:mx-0">
              Transform your selfie into a professional photo in <span className="font-bold text-orange-600">30 seconds</span>. 
              Studio-quality headshots powered by AI. Save hundreds of dollars and hours of your time.
            </p>
            
            {/* Speed Stats */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-foreground">30s</p>
                  <p className="text-xs text-gray-500">Generation Time</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  <Sparkles className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-foreground">40M+</p>
                  <p className="text-xs text-gray-500">Photos Generated</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-1">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5756 9.19382C17.5756 8.58953 17.5214 8.00849 17.4207 7.45068H9.39453V10.751H13.9809C13.7795 11.8124 13.1752 12.7111 12.2688 13.3154V15.4613H15.0345C16.646 13.9739 17.5756 11.7891 17.5756 9.19382Z" fill="#4285F4" />
                  <path d="M9.39296 17.522C11.6939 17.522 13.623 16.7628 15.033 15.4612L12.2672 13.3152C11.508 13.8266 10.5396 14.1365 9.39296 14.1365C7.17724 14.1365 5.29466 12.6412 4.62065 10.627H1.78516V12.8272C3.18741 15.6084 6.06164 17.522 9.39296 17.522Z" fill="#34A853" />
                  <path d="M4.62076 10.6192C4.45032 10.1079 4.34961 9.56561 4.34961 9.00006C4.34961 8.43451 4.45032 7.8922 4.62076 7.38088V5.18066H1.78527C1.20423 6.32726 0.871094 7.62105 0.871094 9.00006C0.871094 10.3791 1.20423 11.6729 1.78527 12.8195L3.99324 11.0996L4.62076 10.6192Z" fill="#FBBC05" />
                  <path d="M9.39296 3.87108C10.648 3.87108 11.7636 4.30493 12.6546 5.14163L15.0949 2.70124C13.6152 1.32223 11.6939 0.477783 9.39296 0.477783C6.06164 0.477783 3.18741 2.39135 1.78516 5.18037L4.62065 7.38059C5.29466 5.3663 7.17724 3.87108 9.39296 3.87108Z" fill="#EA4335" />
                </svg>
                <span className="font-bold">4.8</span>
                <span className="text-sm text-gray-500">Google</span>
              </div>
              <div className="flex items-center gap-1">
                <svg fill="none" viewBox="0 0 26 26" className="h-5 w-5">
                  <path d="m13 19.3 5.5-1.4 2.31 7.1L13 19.3Zm12.68-9.17h-9.7L13 1l-2.98 9.13H.32l7.85 5.66-2.98 9.13 7.85-5.66 4.83-3.47 7.8-5.66Z" fill="#219653" />
                </svg>
                <span className="font-bold">4.9</span>
                <span className="text-sm text-gray-500">Trustpilot</span>
              </div>
              <span className="text-sm text-gray-500">7.8K+ reviews</span>
            </div>
          </div>

          {/* Right Column - Upload Interface */}
          <div className="relative">
            <div 
              className={`relative rounded-2xl border-2 border-dashed p-8 transition-all duration-300 ${
                isDragging 
                  ? "border-orange-500 bg-orange-50" 
                  : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <Upload className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Upload Your Photo</h3>
                <p className="mt-1 text-sm text-gray-500">Get your AI Headshot in seconds</p>
                
                <div className="mt-6 space-y-3">
                  <Button size="lg" className="w-full bg-orange-600 text-white hover:bg-orange-700">
                    <Upload className="mr-2 h-5 w-5" />
                    Click to Upload
                  </Button>
                  <p className="text-xs text-gray-400">or drag and drop your photo here</p>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-400">or</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="lg" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Upload from Phone
                  </Button>
                </div>
                
                <div className="mt-6 flex items-center justify-center gap-1 text-xs text-gray-500">
                  <Lock className="h-3 w-3" />
                  Your photo is used only to generate your AI headshots
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -left-4 top-8 hidden lg:block">
              <div className="rounded-lg bg-white px-3 py-2 shadow-lg">
                <p className="text-xs font-bold text-orange-600">AI-Powered</p>
              </div>
            </div>
            <div className="absolute -right-4 bottom-8 hidden lg:block">
              <div className="rounded-lg bg-white px-3 py-2 shadow-lg">
                <p className="text-xs font-bold text-green-600">Studio Quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
