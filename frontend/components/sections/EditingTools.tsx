"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Shirt, Sparkles, Move, Eraser } from "lucide-react";
import Image from "next/image";

const tools = [
  { 
    id: "background", 
    name: "Background Changer", 
    icon: ImageIcon,
    description: "Change your background to any location or style you want.",
    before: "/assets/editing-tools/background-before.jpg",
    after: "/assets/editing-tools/background-after.jpg"
  },
  { 
    id: "clothing", 
    name: "Clothing Changer", 
    icon: Shirt,
    description: "Try on different outfits without changing clothes.",
    before: "/assets/editing-tools/clothing-before.jpg",
    after: "/assets/editing-tools/clothing-after.jpg"
  },
  { 
    id: "hair", 
    name: "Hair & Makeup Editor", 
    icon: Sparkles,
    description: "Experiment with different hairstyles and makeup looks.",
    before: "/assets/editing-tools/hair-makeup-before.jpg",
    after: "/assets/editing-tools/hair-makeup-after.jpg"
  },
  { 
    id: "pose", 
    name: "Pose Editor", 
    icon: Move,
    description: "Adjust your pose to look more natural and professional.",
    before: "/assets/editing-tools/pose-before.jpg",
    after: "/assets/editing-tools/pose-after.jpg"
  },
  { 
    id: "blemish", 
    name: "Blemish Remover", 
    icon: Eraser,
    description: "Remove pimples, scars, dark spots, and more!",
    before: "/assets/editing-tools/blemish-before.jpg",
    after: "/assets/editing-tools/blemish-after.jpg"
  },
];

export default function EditingTools() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground text-balance">Enhance your photos and brand with our most popular <span className="text-orange-500">tools</span></h2>
        <p className="mt-2 text-gray-600">Touch up your photos even further with our suite of photo editing tools and features.</p>
        <Tabs defaultValue="blemish" className="mt-8">
          <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <TabsTrigger 
                  key={tool.id} 
                  value={tool.id}
                  className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:border-orange-500"
                >
                  <Icon className="h-4 w-4" />
                  {tool.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {tools.map((tool) => (
            <TabsContent key={tool.id} value={tool.id} className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{tool.name}</h3>
                  <p className="mt-2 text-gray-600">{tool.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="relative w-full aspect-3/4">
                      <Image src={tool.before} alt="Before" fill className="rounded-lg object-cover" unoptimized />
                    </div>
                    <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white">Before</div>
                  </div>
                  <div className="relative">
                    <div className="relative w-full aspect-3/4">
                      <Image src={tool.after} alt="After" fill className="rounded-lg object-cover" unoptimized />
                    </div>
                    <div className="absolute bottom-2 left-2 rounded bg-orange-500 px-2 py-1 text-xs font-semibold text-white">After</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
