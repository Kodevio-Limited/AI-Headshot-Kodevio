"use client";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const news = [
  { source: "WBAL TV", title: "\"We like Aragon because the photos look legitimate.\"", link: "https://www.wbaltv.com/article/professional-headshots-from-selfies-ai/46411821" },
  { source: "PetaPixel", title: "Three-Quarters of Recruiters Prefer AI Headshots to Real Photos, According to Study", link: "https://petapixel.com/2024/09/18/three-quarters-of-recruiters-prefer-ai-headshots-to-real-photos-according-to-study" },
  { source: "Washington Post", title: "\"It just makes traditional photography accessible to everyone.\"", link: "https://www.washingtonpost.com/technology/2024/02/08/ai-professional-headshots" },
  { source: "Business Insider", title: "\"Indistinguishable from real photographs.\"", link: "https://www.businessinsider.com/why-aragon-ai-founder-chose-startup-accelerator-neo-over-ycombinator" },
  { source: "Entrepreneur", title: "\"Aragon AI worked the most magic with AI headshots\"", link: "https://www.entrepreneur.com/business-news/i-tried-3-ai-headshot-generators-1-might-work-for-linkedin/470065" },
];

export default function News() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ 
        left: direction === "left" ? -scrollAmount : scrollAmount, 
        behavior: "smooth" 
      });
    }
  };
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{"We've been in the news:"}</h2>
          <div className="hidden gap-2 lg:flex">
            <button onClick={() => scroll("left")} className="rounded-full border p-2 hover:bg-gray-100 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scroll("right")} className="rounded-full border p-2 hover:bg-gray-100 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="mt-8 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {news.map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="min-w-[300px] shrink-0 rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-600">{item.source}</span>
                <ExternalLink className="h-4 w-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-4 text-lg font-semibold text-foreground leading-snug">{item.title}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
