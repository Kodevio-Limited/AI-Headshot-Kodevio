"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NativeSelect } from "@/components/ui/native-select";
import { fetchDashboardStats, fetchPopularImages, fetchTrafficData } from "@/lib/api/dashboard";
import { TrafficPoint } from "@/types/traffic";
import { Eye, Image as ImageIcon, LayoutGrid, Users, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Area, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <Card className="rounded-md border shadow-[0px_12px_40px_-16px_rgba(0,0,0,0.2)]">
            <CardContent className="flex flex-col items-center justify-center gap-3 p-4 text-center">
                <div className="[&_svg]:size-10">{icon}</div>
                <div className="space-y-1">
                    <p className="text-lg">{label}</p>
                    <p className="text-2xl font-semibold">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}

function TrafficChart() {
    const [year, setYear] = useState("2026");
    const [data, setData] = useState<TrafficPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasSize, setHasSize] = useState(false);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let mounted = true;
        const loadTraffic = async () => {
            setLoading(true);
            const fetchedData = await fetchTrafficData(year);
            if (mounted) {
                setData(fetchedData);
                setLoading(false);
            }
        };
        loadTraffic();
        return () => { mounted = false; };
    }, [year]);

    useEffect(() => {
        const element = chartContainerRef.current;
        if (!element) return;

        const updateSizeState = () => {
            const { width, height } = element.getBoundingClientRect();
            setHasSize(width > 0 && height > 0);
        };

        updateSizeState();

        const observer = new ResizeObserver(() => {
            updateSizeState();
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <Card className="rounded-[20px] border border-border bg-background shadow-[0px_12px_40px_-16px_rgba(0,0,0,0.2)]">
            <CardHeader className="flex flex-row items-start justify-between gap-4 px-6 pb-0 pt-6">
                <h3 className="text-[24px] font-semibold leading-[1.2] text-foreground">Traffic Overview</h3>

                <NativeSelect value={year} onChange={(event) => setYear(event.target.value)}>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                </NativeSelect>
            </CardHeader>

            <CardContent className="px-6 pb-6 pt-6">
                <div ref={chartContainerRef} className="h-82 w-full min-w-0 relative">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : null}

                    {hasSize && data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 8, right: 8, left: -14, bottom: 12 }}>
                                <CartesianGrid stroke="#ececec" strokeDasharray="0" vertical={false} />

                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    height={40}
                                    tickMargin={10}
                                    tick={{ fill: "#333333", fontSize: 14 }}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    ticks={[0, 1000, 2000, 3000, 4000, 5000]}
                                    domain={[0, 5000]}
                                    tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}k`)}
                                    tick={{ fill: "#333333", fontSize: 14 }}
                                />

                                <Area type="natural" dataKey="value" stroke="none" fill="#000000" fillOpacity={0.06} />

                                <Line type="natural" dataKey="value" stroke="#111111" strokeWidth={1.5} dot={false} activeDot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    );
}

function PopularImageCard({ image, title, views }: { image: string; title: string; views: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-[5px] bg-[#d9d9d9]">
                <Image src={image} alt={title} fill unoptimized className="object-cover" />
            </div>

            <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-foreground">{title}</p>
                <div className="flex items-center gap-1 text-foreground">
                    <Eye className="size-3.5" />
                    <span className="text-xs font-medium">{views}</span>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const [stats, setStats] = useState<{
        totalViews: string;
        mediaUploads: string;
        activeUsers: string;
        totalCategories: string;
    } | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [statsData, imagesData] = await Promise.all([
                    fetchDashboardStats(),
                    fetchPopularImages()
                ]);
                setStats(statsData);
                setImages(imagesData);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading || !stats) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 bg-background">
            {/* Top Stats */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard icon={<Eye />} label="Website View" value={stats.totalViews} />
                <StatCard icon={<ImageIcon />} label="Media Uploads" value={stats.mediaUploads} />
                <StatCard icon={<LayoutGrid />} label="Headshot Generated" value={stats.totalCategories} />
                <StatCard icon={<Users />} label="Paid Users" value={stats.activeUsers} />
            </div>

            {/* Chart and Popular Images */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]">
                {/* Traffic Charts here */}
                <TrafficChart />

                {/* Popular Images */}
                <Card className="rounded-[20px] border border-border bg-background shadow-[0px_12px_40px_-16px_rgba(0,0,0,0.2)]">
                    <CardHeader className="flex flex-row items-start justify-between gap-4 px-6 pb-0 pt-6">
                        <h3 className="text-[24px] font-semibold leading-[1.2] text-foreground">Popular Images</h3>
                        <Button variant="ghost" size="xs">
                            View all
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4 px-6 pb-6 pt-6">
                        {images.map((image) => (
                            <PopularImageCard key={image} image={image} title="Metropolitan Twilight Skyline" views="30k" />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}