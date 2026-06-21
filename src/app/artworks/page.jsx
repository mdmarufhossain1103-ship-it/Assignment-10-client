import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { browseArts } from "@/lib/api/art/art";

const ArtworksPage = async () => {
    const arts = await browseArts();

    return (
        <div className="max-w-[80%] mx-auto px-4 py-6 my-10">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {arts?.map((art) => (
                    <Card
                        key={art._id}
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        {/* Artwork Image */}
                        <div className="aspect-square overflow-hidden">
                            <img
                                src={art.image}
                                alt={art.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <Card.Header className="flex flex-col items-start gap-1">
                            <Card.Title className="text-sm md:text-base line-clamp-1">
                                {art.title}
                            </Card.Title>

                            <Card.Description className="line-clamp-1">
                                By {art.artist}
                            </Card.Description>
                        </Card.Header>

                        <Card.Content>
                            <p className="font-bold text-lg text-primary">
                                ${art.price}
                            </p>
                        </Card.Content>

                        <Card.Footer>
                            <Button
                                href={`/artworks/${art._id}`}
                                variant="flat"
                                size="sm"
                                className="w-full bg-blue-400"
                            >
                                View Details
                            </Button>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ArtworksPage;