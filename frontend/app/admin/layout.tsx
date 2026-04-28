import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Admin Dashboard | HeadshotAI",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-full flex flex-col">{children}</div>
    );
}

