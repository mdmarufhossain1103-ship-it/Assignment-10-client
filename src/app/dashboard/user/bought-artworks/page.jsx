import React from 'react';
import Link from 'next/link';
import { Card } from '@heroui/react';
import { showPaymentData } from '@/lib/actions/payment';


const BoughtArtworks = async() => {
    const purchasedArtworks = await showPaymentData();
    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    Bought Artworks
                </h1>
                <p className="text-default-500 mt-1">
                    View all artworks you have purchased.
                </p>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedArtworks.map((artwork) => (
                    <Card
                        key={artwork._id}
                        className="overflow-hidden border border-default-200 hover:shadow-lg transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="aspect-square overflow-hidden">
                            <img
                                src={artwork.image}
                                alt={artwork.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="font-semibold text-lg line-clamp-1">
                                {artwork.title}
                            </h3>

                            <p className="text-sm text-default-500 mt-1">
                                by {artwork.artist}
                            </p>

                            <Link
                                href={`/artworks/${artwork.id}`}
                                className="inline-flex items-center justify-center mt-4 w-full rounded-lg bg-blue-600 text-white py-2.5 text-sm font-medium hover:bg-blue-700 transition"
                            >
                                View Details
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>

        </div>
    );
};

export default BoughtArtworks;