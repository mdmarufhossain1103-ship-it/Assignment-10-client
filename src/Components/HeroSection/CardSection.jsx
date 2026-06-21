import React from 'react';
import Link from "next/link";
import { Card } from "@heroui/react";

const CardSection = ({ arts }) => {
    const latestArts = [...(arts || [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {latestArts.map((art) => (
                <Card
                    key={art._id}
                    className="group overflow-hidden border border-default-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                        <img
                            src={art.image}
                            alt={art.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Price Badge */}
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow">
                            <span className="font-semibold text-sm">
                                ${art.price}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-4">
                        <div className="mb-4">
                            <h3 className="font-semibold text-lg line-clamp-1">
                                {art.title}
                            </h3>

                            <p className="text-sm text-default-500 mt-1">
                                by {art.artist}
                            </p>
                        </div>

                        {/* Button */}
                        <div className="mt-auto">
                            <Link
                                href={`/artworks/${art._id}`}
                                className="flex items-center justify-center w-full rounded-xl bg-blue-400 text-white py-2.5 text-sm font-medium transition hover:bg-neutral-800"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default CardSection;