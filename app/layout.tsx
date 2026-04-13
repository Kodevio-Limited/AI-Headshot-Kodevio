import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteBackground from "@/components/SiteBackground";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap",
  
});

export const metadata: Metadata = {
  title: "Professional AI Headshots | Studio-Quality Portraits in Minutes",
  description: "Transform any photo into stunning professional headshots with AI. Studio-quality results in minutes. Trusted by professionals worldwide.",
};

export const viewport: Viewport = {
  themeColor: "#1e1b4b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, "bg-background")} suppressHydrationWarning>
      <body className="relative flex min-h-screen flex-col overflow-x-hidden font-sans">
        <SiteBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
