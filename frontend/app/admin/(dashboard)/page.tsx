"use client";

import { CircleHelp, Library, Music2, QrCode } from "lucide-react";

type StatCardData = {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
};

type SongRowData = {
    title: string;
    artist: string;
    year: string;
};

const statCards: StatCardData[] = [
    { title: "Total Songs", value: "10", icon: Music2 },
    { title: "Active Cards", value: "10", icon: QrCode },
    { title: "Unmapped Songs", value: "10", icon: CircleHelp },
    { title: "Collections", value: "10", icon: Library },
];

const recentSongs: SongRowData[] = [
    { title: "Dreams", artist: "Fleetwood Mac", year: "1977" },
    { title: "Dreams", artist: "Fleetwood Mac", year: "1977" },
    { title: "Dreams", artist: "Fleetwood Mac", year: "1977" },
    { title: "Dreams", artist: "Fleetwood Mac", year: "1977" },
];

function StatCard({ title, value, icon: Icon }: StatCardData) {
    return (
        <article className="h-41 rounded-[10px] border border-[#dadada] bg-white px-8 py-5.75">
            <div className="flex size-12.5 items-center justify-center rounded-full bg-[#f5f5f5]">
                <Icon className="size-5 text-[#333333]" />
            </div>

            <p className="mt-3.5 text-[16px] leading-6 text-[#666666]">{title}</p>
            <p className="text-[24px] font-semibold leading-normal text-[#333333]">{value}</p>
        </article>
    );
}

function SongRow({ title, artist, year }: SongRowData) {
    return (
        <article className="flex h-27.5 items-center justify-between rounded-[10px] bg-white px-5 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3">
                <div className="flex size-15 items-center justify-center rounded-[10px] bg-[#f5f5f5]">
                    <Music2 className="size-5 text-[#333333]" />
                </div>

                <div className="leading-none">
                    <p className="text-[20px] font-medium leading-8 text-[#333333]">{title}</p>
                    <p className="mt-1 text-[16px] leading-6 text-[#666666]">{artist}</p>
                </div>
            </div>

            <p className="text-[20px] font-medium leading-normal text-[#333333]">{year}</p>
        </article>
    );
}

export default function Dashboard() {
    return (
        <section className="mx-auto w-full pb-10">
            <div className="grid grid-cols-1 gap-4.25 md:grid-cols-2 xl:grid-cols-4">
                {statCards.map((card) => (
                    <StatCard key={card.title} {...card} />
                ))}
            </div>

            <div className="mt-7.5 rounded-[20px] border border-[#dadada]">
                <header className="border-b border-[#dadada] px-4 py-3">
                    <h2 className="text-[32px] font-semibold leading-normal text-[#333333]">Recent Songs</h2>
                </header>

                <div className="space-y-5 p-4 md:p-8">
                    {recentSongs.map((song, index) => (
                        <SongRow key={`${song.title}-${index}`} {...song} />
                    ))}
                </div>
            </div>
        </section>
    );
}
