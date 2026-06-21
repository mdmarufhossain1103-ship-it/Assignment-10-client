import React from 'react';
import Link from 'next/link';
import { Card, Button, Chip } from "@heroui/react";
import { artDetails } from '@/lib/api/art/art';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-default-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
);

const ArtDetailsPage = async ({ params }) => {
    const { id } = await params;
    const art = await artDetails(id);

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    if (!art) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <Card className="p-8 text-center max-w-sm border border-default-200 shadow-sm rounded-2xl">
                    <p className="text-xl font-bold text-danger">Artwork Not Found</p>
                    <p className="text-sm text-default-400 mt-2">The piece you are looking for might have been moved or archived.</p>
                    <Link href="/" className="mt-5 inline-flex justify-center px-4 py-2 bg-default-100 hover:bg-default-200 text-default-700 rounded-xl text-sm font-medium transition">
                        Back to Gallery
                    </Link>
                </Card>
            </div>
        );
    }

    const isArtistTheBuyer = user && (user.id === art.artistId || user.email === art.artist);

    const formattedDate = art.createdAt
        ? new Date(art.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : "N/A";

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
            {/* Main Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

                {/* LEFT COLUMN: Premium High-Res Artwork Showcase */}
                <div className="lg:col-span-7 w-full lg:sticky lg:top-24">
                    <Card className="overflow-hidden border border-default-200/60 bg-default-50 dark:bg-default-100/10 shadow-xl rounded-2xl">
                        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center p-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#334155_1px,transparent_1px)]">
                            <img
                                src={art.image}
                                alt={art.title}
                                className="w-full h-full object-contain rounded-xl shadow-sm transition-transform duration-500 hover:scale-[1.01]"
                            />
                        </div>
                    </Card>
                </div>

                {/* RIGHT COLUMN: Interactive Information Dashboard */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Category Label & Title */}
                    <div className="space-y-3">
                        <Chip
                            size="sm"
                            variant="flat"
                            color="primary"
                            className="font-semibold uppercase tracking-wider text-[10px] px-2.5 py-0.5"
                        >
                            {art.category || "Fine Art"}
                        </Chip>

                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-default-900 leading-tight">
                            {art.title}
                        </h1>

                        {/* Creator Profile Chip Link */}
                        <div className="pt-1">
                            <Link
                                href={`/artists/${art.artistId || art.artist}`}
                                className="inline-block group"
                            >
                                <div className="flex items-center gap-3 bg-default-100/60 hover:bg-default-200/80 border border-default-200/40 rounded-full pr-4 pl-1.5 py-1.5 transition-all duration-200">
                                    <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold uppercase text-xs shadow-sm">
                                        {art.artist?.charAt(0) || "A"}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-default-400 font-medium uppercase tracking-wider leading-none">Creator</p>
                                        <p className="text-sm font-bold text-default-700 group-hover:text-blue-500 transition-colors mt-0.5">
                                            {art.artist}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <hr className="border-default-100" />

                    {/* Metadata Box */}
                    <div className="flex items-center gap-2 text-default-600">
                        <CalendarIcon />
                        <div className="text-xs">
                            <span className="text-default-400 font-medium">Uploaded on </span>
                            <span className="font-semibold text-default-700">{formattedDate}</span>
                        </div>
                    </div>

                    <hr className="border-default-100" />

                    {/* Artwork Description Segment */}
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-default-400">
                            About this masterpiece
                        </h3>
                        <p className="text-default-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                            {art.description || "The artist left no description for this item, letting the vibrant visual profile speak completely for itself."}
                        </p>
                    </div>

                    {/* Smart Checkout Action Box */}
                    <Card className="p-6 border border-default-200/80 bg-default-50/50 backdrop-blur-sm rounded-2xl mt-6 shadow-sm">
                        <div className="flex flex-col space-y-4">
                            <div className="flex justify-between items-baseline">
                                <span className="text-xs font-bold uppercase tracking-wider text-default-400">Valuation Price</span>
                                <span className="text-3xl font-black text-default-900 tracking-tight">
                                    ${art.price?.toLocaleString()}
                                </span>
                            </div>

                            {/* Conditional Rendering State Engine */}
                            {user ? (
                                isArtistTheBuyer ? (
                                    <Button
                                        disabled
                                        size="lg"
                                        className="w-full py-6 rounded-xl font-bold text-sm bg-default-100 text-default-400 cursor-not-allowed border border-default-200/60 shadow-none"
                                    >
                                        🚫 You own this masterpiece
                                    </Button>
                                ) : (
                                    <Link
                                        href={`/checkout/${art._id || id}`}
                                        className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide bg-blue-500 dark:bg-white text-white dark:text-black text-center shadow-md hover:opacity-90 active:scale-[0.99] transition-all duration-200"
                                    >
                                        Buy Now
                                    </Link>
                                )
                            ) : (
                                <Link
                                    href="/login"
                                    className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide bg-blue-500 text-white text-center shadow-md hover:bg-blue-600 active:scale-[0.99] transition-all duration-200"
                                >
                                    Sign In to Purchase
                                </Link>
                            )}

                            <p className="text-center text-[11px] text-default-400 pt-1">
                                Includes secure verified physical transfer & certificate authenticity.
                            </p>
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default ArtDetailsPage;