import Link from "next/link";
import { Card } from "@heroui/react";
import { getdata } from "@/lib/api/art/art";

const CardSection = async () => {
    const data = await getdata();
    const arts = await data.data;

    const latestArts = arts.slice(0, 6);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[80%] mx-auto my-10">
            {latestArts.map((art) => (
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

                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow">
                            <span className="font-semibold text-sm">
                                ${art.price}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 p-4">
                        <div className="mb-4">
                            <h3 className="font-semibold text-lg line-clamp-1">
                                {art.title}
                            </h3>

                            <p className="text-sm text-default-500 mt-1">
                                by {art.artist}
                            </p>
                        </div>

                        <div className="mt-auto">
                            <Link
                                href={`/artworks/${art._id}`}
                                className="flex items-center justify-center w-full rounded-xl bg-blue-500 text-white py-2.5 text-sm font-medium hover:bg-blue-600 transition"
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