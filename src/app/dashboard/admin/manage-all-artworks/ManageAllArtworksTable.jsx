"use client";

import React, { useState } from "react";
import { Table, Button } from "@heroui/react";
import { deleteArtwork } from "@/lib/api/artist";

const ManageAllArtworksTable = ({ initialArtworks }) => {
    const [artworks, setArtworks] = useState(initialArtworks);

    // DELETE
    const handleDelete = async (id) => {
        const ok = confirm("Delete this artwork?");
        if (!ok) return;

        try {
            const res = await deleteArtwork(id);

            if (res.deletedCount > 0) {
                setArtworks((prev) =>
                    prev.filter((a) => a._id !== id)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-3 sm:p-6 overflow-x-auto">
            <h1 className="mb-6 text-2xl font-bold">
                Manage All Artworks
            </h1>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Manage artworks table">
                        <Table.Header>
                            <Table.Column isRowHeader>
                                Title
                            </Table.Column>
                            <Table.Column>Artist Name</Table.Column>
                            <Table.Column>Price</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {artworks.map((artwork) => (
                                <Table.Row key={artwork._id}>
                                    <Table.Cell>
                                        {artwork.title}
                                    </Table.Cell>

                                    <Table.Cell>
                                        {artwork.artist}
                                    </Table.Cell>

                                    <Table.Cell>
                                        ${artwork.price}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Button
                                            size="sm"
                                            color="danger"
                                            variant="flat"
                                            className="text-red-500"
                                            onPress={() =>
                                                handleDelete(artwork._id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>

                <Table.Footer>
                    Total Artworks: {artworks.length}
                </Table.Footer>
            </Table>
        </div>
    );
};

export default ManageAllArtworksTable;