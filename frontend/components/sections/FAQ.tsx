"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "What makes Aragon the most realistic AI headshot?", a: "Aragon is the leading AI headshot generator. Built by AI researchers and alumni from MIT, Meta, and Google, our technology produces lifelike photos that are virtually indistinguishable from traditional photography." },
  { q: "What resolution are your pictures?", a: "Our Basic / Standard package photos are 896 x 1088 pixels, which meet or exceed the needs of most applications. For our Executive package, the resolution is upgraded to 1792 x 2176 pixels, perfect for high-quality prints." },
  { q: "Do you offer branded team headshots?", a: "Yes! We can do branded headshots for teams of all sizes, from local roofing stores to Fortune 500 companies." },
  { q: "What is your refund policy?", a: "If you're unhappy with your photos for any reason, we offer a full refund, given that you haven't downloaded your photos." },
  { q: "What do you do with my data?", a: "As a paid product, we prioritize user privacy and transparency. See our Privacy Policy for details." },
  { q: "What if I'm unsatisfied with my AI photos?", a: "We have a 99% satisfaction rate. If you're unhappy, we offer a free redo or a refund." },
  { q: "Who owns my AI photos?", a: "Your AI-generated photos are yours to use however you'd like, including social media, professional profiles, and print." },
  { q: "How does Aragon compare to competitors?", a: "We are built by AI researchers from top tech companies, backed by top VCs, SOC 2 compliant, and have generated over 40M headshots." },
  { q: "I love your product! How can I spread the word?", a: "We offer a referral program and an affiliate program where you can earn 30% commission on each sale." },
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredFaqs = faqs.filter(
    faq => faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
           faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-foreground text-balance"><span className="text-orange-500">Have a question?</span> {"We're here to help"}</h2>
            <p className="mt-2 text-gray-600">Customer satisfaction is our number one priority. Our live agents are available 7am - 11pm (PT), 5 days a week.</p>
            <div className="mt-6 relative">
              <input 
                type="text" 
                placeholder="Search for keywords" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">Popular:</span>
              <button onClick={() => setSearchTerm("refund")} className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700 hover:bg-orange-200 transition-colors">Refund</button>
              <button onClick={() => setSearchTerm("resolution")} className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700 hover:bg-orange-200 transition-colors">Resolution</button>
              <button onClick={() => setSearchTerm("data")} className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700 hover:bg-orange-200 transition-colors">Privacy</button>
            </div>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-orange-500 py-4">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFaqs.length === 0 && (
              <p className="text-center text-gray-500 py-8">No results found. Try a different search term.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
