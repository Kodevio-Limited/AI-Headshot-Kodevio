"use client";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Products", href: "#", dropdown: true },
  { name: "For Teams", href: "/headshots-for-teams" },
  { name: "Reviews", href: "/reviews" },
  { name: "Pricing", href: "/pricing" },
  { name: "Resources", href: "#", dropdown: true },
  { name: "Privacy", href: "/privacy-page" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-4 z-[999] mx-auto w-[96%] rounded-xl border bg-white shadow-md md:w-[98%] xl:w-[90%]">
      <div className="flex h-[60px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-orange-600 to-orange-300"></div>
          <span className="text-xl font-bold">Aragon.ai</span>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex space-x-4">
            {navLinks.map((item) => (
              <li key={item.name}>
                {item.dropdown ? (
                  <button className="flex items-center gap-1 rounded-md p-2 text-sm font-semibold">
                    {item.name} <ChevronDown className="h-3 w-3" />
                  </button>
                ) : (
                  <Link href={item.href} className="rounded-md p-2 text-sm font-semibold hover:bg-gray-100">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 sm:flex">
          <Link href="/login" className="font-bold hover:opacity-80">Log in</Link>
          <Button asChild className="bg-orange-600 text-white hover:bg-orange-700">
            <Link href="/login?template=avatar_professional">Create your headshots now</Link>
          </Button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t p-4 lg:hidden">
          <ul className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="block py-2 text-base font-semibold">
                  {item.name}
                </Link>
              </li>
            ))}
            <li><Link href="/login" className="block py-2 font-semibold">Log in</Link></li>
            <li><Button className="w-full bg-orange-600 text-white">Create your headshots now</Button></li>
          </ul>
        </div>
      )}
    </header>
  );
}
