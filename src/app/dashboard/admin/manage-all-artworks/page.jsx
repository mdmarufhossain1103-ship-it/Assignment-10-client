"use client";

import React, { useState } from "react";
import { Table, Button } from "@heroui/react";

const initialArtworks = [
    {
        id: 1,
        title: "Sunset Dreams",
        artistName: "John Doe",
        price: 1200,
    },
    {
        id: 2,
        title: "Ocean Waves",
        artistName: "Sarah Smith",
        price: 950,
    },
    {
        id: 3,
        title: "Golden Forest",
        artistName: "Michael Brown",
        price: 1800,
    },
];

const ManageAllArtwork = () => {
    const [artworks, setArtworks] = useState(initialArtworks);

    const handleDelete = (id) => {
        setArtworks((prev) => prev.filter((artwork) => artwork.id !== id));

        // TODO: Delete artwork from database
        // await fetch(`/api/artworks/${id}`, {
        //   method: "DELETE",
        // });
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">Manage All Artworks</h1>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Manage artworks table">
                        <Table.Header>
                            <Table.Column isRowHeader>Title</Table.Column>
                            <Table.Column>Artist Name</Table.Column>
                            <Table.Column>Price</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {artworks.map((artwork) => (
                                <Table.Row key={artwork.id}>
                                    <Table.Cell>{artwork.title}</Table.Cell>

                                    <Table.Cell>{artwork.artistName}</Table.Cell>

                                    <Table.Cell>${artwork.price}</Table.Cell>

                                    <Table.Cell>
                                        <Button
                                            size="sm"
                                            color="danger"
                                            variant="flat"
                                            onPress={() => handleDelete(artwork.id)}
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

export default ManageAllArtwork;