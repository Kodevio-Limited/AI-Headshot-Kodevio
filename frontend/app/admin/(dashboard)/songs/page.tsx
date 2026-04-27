"use client";

import { AddSongDialogContent } from "@/components/dashboard/add-song-dialog-content";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { songsData } from "@/lib/data/songs-data";
import { ChevronDown, Plus, Search } from "lucide-react";

export default function SongsPage() {
    return (
        <Dialog>
            <section className="w-full space-y-6">
                <div className="dashboard-page-header">
                    <h1 className="dashboard-page-title">Songs</h1>
                    <p className="dashboard-page-subtitle">Manage your game contents and system configuration.</p>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full lg:w-116">
                        <Input type="search" placeholder="Search" />
                        <Search className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                    </div>

                    <DialogTrigger asChild>
                        <Button className="h-11.5 rounded-[5px] bg-black px-3 text-[16px] font-medium text-white hover:bg-black/95">
                            <Plus className="size-6" />
                            Add New Song
                        </Button>
                    </DialogTrigger>
                </div>

                <div className="space-y-3 md:hidden">
                    {songsData.map((song) => (
                        <article key={`mobile-${song.spotifyId}`} className="rounded-lg border border-border bg-card p-4 shadow-sm">
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">Song #{song.spotifyId}</p>
                                <h3 className="text-base font-semibold text-foreground">{song.songName}</h3>
                                <p className="break-all text-sm text-muted-foreground">{song.ArtistName}</p>
                            </div>
                            <div className="mt-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="inline-flex h-8 items-center justify-center gap-1 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground">
                                        Action
                                        <ChevronDown className="size-4" />
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="start" className="w-40">
                                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                                        <DropdownMenuItem>Disable</DropdownMenuItem>
                                        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="hidden w-full overflow-x-auto md:block">
                    <div className="min-w-180">
                        <table className="w-full table-fixed border-collapse">
                            <thead>
                                <tr className="h-11.5 bg-primary">
                                    <th className="w-30 border border-border px-2 text-left text-base leading-normal font-medium text-primary-foreground lg:text-[20px]">
                                        Song Name
                                    </th>
                                    <th className="w-30 border border-border px-2 text-left text-base leading-normal font-medium text-primary-foreground lg:text-[20px]">
                                        Artist Name
                                    </th>
                                    <th className="w-15 border border-border px-2 text-left text-base leading-normal font-medium text-primary-foreground lg:text-[20px]">
                                        Release Year
                                    </th>
                                    <th className="w-30 border border-border px-2 text-left text-base leading-normal font-medium text-primary-foreground lg:text-[20px]">
                                        Spotify ID
                                    </th>
                                    <th className="w-10 border border-border px-2 text-left text-base leading-normal font-medium text-primary-foreground lg:text-[20px]">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {songsData.map((song) => (
                                    <tr key={song.spotifyId} className="h-13">
                                        <td className="border border-border px-2 text-sm leading-6 font-normal text-muted-foreground lg:text-[16px]">
                                            {song.songName}
                                        </td>
                                        <td className="border border-border px-2 text-sm leading-6 font-normal text-muted-foreground lg:text-[16px]">
                                            {song.ArtistName}
                                        </td>
                                        <td className="border border-border px-2 text-sm leading-[1.2] font-normal text-muted-foreground lg:text-[16px]">
                                            {song.releaseYear}
                                        </td>
                                        <td className="border border-border px-2 text-sm leading-6 font-normal text-muted-foreground lg:text-[16px]">
                                            {song.spotifyId}
                                        </td>
                                        <td className="border border-border px-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center gap-1 rounded-[5px] bg-primary px-2 text-sm leading-[1.2] font-normal text-primary-foreground lg:text-[16px]">
                                                    Action
                                                    <ChevronDown className="size-4" />
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="start" className="w-40">
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Disable</DropdownMenuItem>
                                                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col gap-4 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p className="px-2 text-sm leading-6 font-medium">Showing 1-10 out of 10</p>

                    <div className="flex items-center gap-2.5 px-2 py-1 text-sm leading-6 font-medium lg:text-[16px]">
                        <button type="button" className="cursor-pointer px-1 py-0.5">
                            Previous
                        </button>
                        <button type="button" className="h-6 w-6 bg-primary px-1 py-0.5 text-primary-foreground">
                            1
                        </button>
                        <button type="button" className="h-6 w-6 px-1 py-0.5">
                            2
                        </button>
                        <button type="button" className="h-6 w-6 px-1 py-0.5">
                            3
                        </button>
                        <button type="button" className="cursor-pointer px-1 py-0.5">
                            Next
                        </button>
                    </div>
                </div>

                <AddSongDialogContent />
            </section>
        </Dialog>
    );
}
