'use client';
import ArtData from '@/Components/ArtData';
import { getdata } from '@/lib/api/art/art';
import React, { useEffect, useState } from 'react';

const ArtworksPage = () => {
    const [arts, setArts] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchArts = async () => {
            try {
                setLoading(true);
                const data = await getdata({
                    search,
                    minPrice,
                    maxPrice,
                    sort,
                    page,
                });
                setArts(data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchArts();
    }, [search, minPrice, maxPrice, sort,page]);

    return (
        <div className="max-w-7xl mx-auto p-5">
            {/* Page Header */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold">Discover Artworks</h1>
                <p className="text-default-500 mt-2">
                    Explore unique creations from talented artists
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input type="text" placeholder='Search by arts title...' value={search} onChange={(e) => setSearch(e.target.value)} className='border border-gray-300 p-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500' />

                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border p-3 rounded-lg"
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border p-3 rounded-lg"
                />

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border p-3 rounded-lg"
                >
                    <option value="newest">Newest</option>
                    <option value="priceLowHigh">Price Low → High</option>
                    <option value="priceHighLow">Price High → Low</option>
                </select>
            </div>

            {loading && (
                <div className='text-center text-lg font-medium'>Loading arts...</div>
            )}

            {!loading && arts?.data?.length === 0 && (
                <div>No arts found</div>
            )}

            {!loading && arts?.data?.length > 0 && (
                <ArtData arts={arts} page={page} setPage={setPage} />
            )}
        </div>
    );
};

export default ArtworksPage;