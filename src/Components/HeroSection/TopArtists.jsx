import React from 'react';
import Link from 'next/link';
import { Card, Avatar } from "@heroui/react";
import { topArtist } from '@/lib/api/artist';


export default async function TopArtists() {
    const topArtists = await topArtist();

    if (!topArtists || topArtists.length === 0) {
        return null; 
    }

    return (
        <div className="border-t border-default-100 pt-10 max-w-[80%] mx-auto mb-10">
            <div className="flex flex-col space-y-1 mb-6">
                <h2 className="text-xl font-black text-default-900 tracking-tight">Top Artists</h2>
                <p className="text-xs text-default-400">Creators with the most masterpiece acquisitions this month</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {topArtists.map((artist, index) => (
                    <Card
                        key={artist.id || index}
                        className="p-4 border border-default-200/60 bg-default-50/30 dark:bg-default-100/5 hover:border-default-300 transition-all duration-200 rounded-2xl shadow-sm group"
                    >
                        <Link href={`/artists/${artist.id}`} className="flex items-center gap-4 w-full">
                            <div className="relative">
                                <Avatar
                                    src={artist.avatar }
                                    name={artist.name}
                                    size="md"
                                    isBordered
                                    color={index === 0 ? "primary" : "default"}
                                />
                                <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-default-900 text-[10px] font-black text-white dark:bg-white dark:text-black shadow-sm">
                                    {index + 1}
                                </span>
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-bold text-sm text-default-800 truncate group-hover:text-blue-500 transition-colors">
                                    {artist.name}
                                </h3>
                                <p className="text-xs text-default-400 mt-0.5 font-medium">
                                    {artist.sales} masterpieces sold
                                </p>
                            </div>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}