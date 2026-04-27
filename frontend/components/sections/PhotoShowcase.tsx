"use client";
import { useState } from "react";
import Image from "next/image";

const people = ["Ben", "Charlotte", "Victor", "Thea"];
const categories = ["Healthcare", "Monochrome", "Old Money", "Startup Founder", "Fantasy", "Travel", "Modeling", "Dating", "Glamour"];

const categoryImages: Record<string, Record<string, string>> = {
  Victor: {
    Healthcare: "/assets/gallery/victor/healthcare.jpg",
    Monochrome: "/assets/gallery/victor/monochrome.jpg",
    "Old Money": "/assets/gallery/victor/monochrome.jpg",
    "Startup Founder": "/assets/gallery/victor/startup-founder.jpg",
    Fantasy: "/assets/gallery/victor/healthcare.jpg",
    Travel: "/assets/gallery/victor/startup-founder.jpg",
    Modeling: "/assets/gallery/victor/monochrome.jpg",
    Dating: "/assets/gallery/victor/healthcare.jpg",
    Glamour: "/assets/gallery/victor/startup-founder.jpg",
  },
  Charlotte: {
    Healthcare: "/assets/gallery/charlotte/healthcare.jpg",
    Monochrome: "/assets/gallery/charlotte/monochrome.jpg",
    "Old Money": "/assets/gallery/charlotte/monochrome.jpg",
    "Startup Founder": "/assets/gallery/charlotte/startup-founder.jpg",
    Fantasy: "/assets/gallery/charlotte/healthcare.jpg",
    Travel: "/assets/gallery/charlotte/startup-founder.jpg",
    Modeling: "/assets/gallery/charlotte/monochrome.jpg",
    Dating: "/assets/gallery/charlotte/healthcare.jpg",
    Glamour: "/assets/gallery/charlotte/startup-founder.jpg",
  },
  Ben: {
    Healthcare: "/assets/gallery/ben/healthcare.jpg",
    Monochrome: "/assets/gallery/ben/monochrome.jpg",
    "Old Money": "/assets/gallery/ben/monochrome.jpg",
    "Startup Founder": "/assets/gallery/ben/startup-founder.jpg",
    Fantasy: "/assets/gallery/ben/healthcare.jpg",
    Travel: "/assets/gallery/ben/startup-founder.jpg",
    Modeling: "/assets/gallery/ben/monochrome.jpg",
    Dating: "/assets/gallery/ben/healthcare.jpg",
    Glamour: "/assets/gallery/ben/startup-founder.jpg",
  },
  Thea: {
    Healthcare: "/assets/gallery/thea/healthcare.jpg",
    Monochrome: "/assets/gallery/thea/monochrome.jpg",
    "Old Money": "/assets/gallery/thea/monochrome.jpg",
    "Startup Founder": "/assets/gallery/thea/startup-founder.jpg",
    Fantasy: "/assets/gallery/thea/healthcare.jpg",
    Travel: "/assets/gallery/thea/startup-founder.jpg",
    Modeling: "/assets/gallery/thea/monochrome.jpg",
    Dating: "/assets/gallery/thea/healthcare.jpg",
    Glamour: "/assets/gallery/thea/startup-founder.jpg",
  },
};

export default function PhotoShowcase() {
  const [activePerson, setActivePerson] = useState("Victor");
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground text-balance">Reimagine yourself with <span className="text-orange-500">Aragon</span></h2>
        <p className="mt-2 text-gray-600 text-pretty">We started with professional headshots, but our mission is to build the next era of photography. With our AI, you can reimagine yourself for any occasion.</p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="font-semibold text-foreground">Unlock infinite yous. Our AI generates photos on demand.</p>
          <div className="flex gap-2 overflow-x-auto">
            {people.map((person) => (
              <button key={person} onClick={() => setActivePerson(person)} className={`rounded-lg border px-4 py-2 font-semibold transition-colors ${activePerson === person ? "bg-orange-100 border-orange-300 text-orange-700" : "bg-white text-foreground hover:bg-gray-50"}`}>
                {person}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => (
            <div key={cat} className="group relative aspect-3/4 overflow-hidden rounded-2xl bg-gray-200">
              <Image
                src={categoryImages[activePerson]?.[cat] || "/assets/gallery/victor/healthcare.jpg"}
                alt={`${activePerson} - ${cat}`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-xs font-bold text-white">{cat}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
