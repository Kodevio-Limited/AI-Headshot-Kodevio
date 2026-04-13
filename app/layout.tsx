import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "The Leading AI Headshot Generator",
  description: "Get professional AI headshots in minutes with our new AI headshot generator. Save hundreds of dollars and hours of your time. Built by AI researchers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, "bg-background")}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Banner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
