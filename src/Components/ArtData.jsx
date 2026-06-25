import Link from 'next/link';
import { Card } from '@heroui/react';

const ArtData = ({ arts, page, setPage }) => {
    const artsData = arts?.data || [];
    const totalPages = arts?.totalPage || 1;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {artsData.map((art) => (
                    <Card
                        key={art._id}
                        className="group overflow-hidden border border-default-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="relative aspect-square overflow-hidden">
                            <img
                                src={art.image}
                                alt={art.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full shadow">
                                <span className="font-semibold text-sm">
                                    ${art.price}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col flex-1 p-4">
                            <div className="mb-4">
                                <h3 className="font-semibold text-lg">
                                    {art.title}
                                </h3>

                                <p className="text-sm text-default-500">
                                    by {art.artist}
                                </p>
                            </div>

                            <div className="mt-auto">
                                <Link
                                    href={`/artworks/${art._id}`}
                                    className="flex items-center justify-center w-full rounded-xl bg-blue-400 text-white py-2.5 text-sm font-medium hover:bg-blue-500"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-10">

                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, index) => {
                    const p = index + 1;

                    return (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`px-4 py-2 rounded ${p === page
                                    ? 'bg-blue-500 text-white'
                                    : 'border'
                                }`}
                        >
                            {p}
                        </button>
                    );
                })}

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Next
                </button>

            </div>
        </div>
    );
};

export default ArtData;