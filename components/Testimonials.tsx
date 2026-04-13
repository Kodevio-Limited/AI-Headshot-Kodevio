"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

const individualExamples = [
  "/assets/testimonials/individual/1.jpg",
  "/assets/testimonials/individual/2.jpg",
  "/assets/testimonials/individual/3.jpg",
  "/assets/testimonials/individual/4.jpg",
  "/assets/testimonials/individual/5.jpg",
  "/assets/testimonials/individual/6.jpg",
  "/assets/testimonials/individual/7.jpg",
  "/assets/testimonials/individual/8.jpg",
  "/assets/testimonials/individual/9.jpg",
  "/assets/testimonials/individual/10.jpg",
];

const teamExamples = [
  "/assets/testimonials/teams/1.jpg",
  "/assets/testimonials/teams/2.jpg",
  "/assets/testimonials/teams/3.jpg",
  "/assets/testimonials/teams/4.jpg",
  "/assets/testimonials/teams/5.jpg",
  "/assets/testimonials/teams/6.jpg",
  "/assets/testimonials/teams/7.jpg",
  "/assets/testimonials/teams/8.jpg",
  "/assets/testimonials/teams/9.jpg",
  "/assets/testimonials/teams/10.jpg",
];

const reviews = [
  { name: "David C", rating: 5, text: "Very happy with results", date: "9 hours ago" },
  { name: "Rusty Hendrix", rating: 5, text: "It was an extremely easy process.", date: "yesterday" },
  { name: "Squirrel Squirrel", rating: 5, text: "Love it. Great site and helpful", date: "yesterday" },
  { name: "Galia Cochella", rating: 5, text: "good, I love it", date: "2 days ago" },
  { name: "Bettie Wall", rating: 5, text: "Quality, User experience, Application", date: "2 days ago" },
  { name: "customer", rating: 5, text: "amazing *****", date: "2 days ago" },
  { name: "LCA", rating: 5, text: "Perfect! Very good I love it", date: "3 days ago" },
  { name: "Cynthia Juarez", rating: 5, text: "Love it!! Would recommend", date: "4 days ago" },
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-foreground text-balance">
          We do AI photoshoots for both <span className="text-orange-500">individuals</span> and <span className="text-orange-500">teams</span>
        </h2>
        <p className="mt-2 text-center text-gray-600">Real photos generated for our real customers. See our results and reviews for yourself.</p>

        <Tabs defaultValue="individual" className="mt-10">
          <TabsList className="mx-auto flex w-fit gap-2 rounded-full border p-1">
            <TabsTrigger value="individual" className="rounded-full px-4">Individuals</TabsTrigger>
            <TabsTrigger value="team" className="rounded-full px-4">Teams</TabsTrigger>
          </TabsList>
          <TabsContent value="individual" className="mt-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {individualExamples.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={src} alt={`Headshot ${i + 1}`} fill className="object-cover" unoptimized />
                  <div className="absolute bottom-2 right-2 rounded-md bg-white px-2 py-1 shadow">
                    <span className="text-xs font-bold text-foreground">AI Generated</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="team" className="mt-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {teamExamples.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={src} alt={`Team headshot ${i + 1}`} fill className="object-cover" unoptimized />
                  <div className="absolute bottom-2 right-2 rounded-md bg-white px-2 py-1 shadow">
                    <span className="text-xs font-bold text-foreground">AI Generated</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {reviews.map((review, i) => (
            <Card key={i} className="min-w-70 shrink-0">
              <CardContent className="p-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_,j) => <Star key={j} className="h-4 w-4 fill-green-600 text-green-600" />)}
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">{review.text}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                  <span>{review.name}</span>
                  <span>{review.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
