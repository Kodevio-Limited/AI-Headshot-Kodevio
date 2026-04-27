"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LayoutGrid, Menu, Settings, User, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


function SidebarNav() { // This component is used in both the mobile sheet and the desktop sidebar, so it needs to be self-contained.
    const pathname = usePathname();

    const navItems = [
        { label: "Dashboard", href: "/admin", icon: LayoutGrid },
        { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
        { label: "Users", href: "/admin/users", icon: User },
        { label: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <nav className="flex flex-col items-center gap-2 px-3 py-6">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex h-14 w-full max-w-56.25 items-center gap-2 rounded-[20px] px-4 text-[20px] font-medium leading-7 transition-colors",
                            isActive ? "bg-[#333333] text-white" : "text-[#333333] hover:bg-[#f5f5f5]"
                        )}>
                        <Icon className="size-6" />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}



// Admin Dashboard Layout
export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const avatarImage = "/user_avater.png";
    const logoImage = "/logo_hitster.png";

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center border-b border-border bg-background shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between w-full px-6">
                    <div className="flex items-center gap-3">
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger
                                    render={
                                        <button
                                            className="inline-flex items-center justify-center rounded-md border p-2 hover:bg-muted"
                                            aria-label="Open menu"
                                        >
                                            <Menu className="h-5 w-5" />
                                        </button>
                                    }
                                ></SheetTrigger>
                                <SheetContent side="left" className="w-[calc(100vw-1rem)] max-w-72 p-0">
                                    <div className="border-b px-4 py-5">
                                        <Image src={logoImage} alt="Logo" width={52} height={52} unoptimized />
                                    </div>
                                    <SidebarNav />
                                </SheetContent>
                            </Sheet>
                        </div>

                        <Image src={logoImage} alt="Logo" width={52} height={52} unoptimized />
                    </div>

                    <div className="flex items-center gap-3">
                        <Avatar className="size-12">
                            <AvatarImage src={avatarImage} alt="Rumi Aktar" />
                            <AvatarFallback>RA</AvatarFallback>
                        </Avatar>
                        <span className="text-[20px] font-semibold leading-normal text-[#333333]">Rumi Aktar</span>
                    </div>
                </div>
            </header>

            {/* Body */}
            <div className="flex pt-20">
                {/* Desktop Sidebar */}
                <aside className="fixed left-0 top-20 hidden h-[calc(100vh-80px)] w-63.25 border-r border-border bg-background md:block">
                    <SidebarNav />
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-10 md:ml-63.25">{children}</main>
            </div>
        </div>
    );
}