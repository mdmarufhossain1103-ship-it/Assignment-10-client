'use client';

import React from 'react';
import { Table, Button } from '@heroui/react';
import { Pencil, TrashBin } from '@gravity-ui/icons';

const artworks = [
    { id: 1, title: 'Sunset Dreams', price: 250 },
    { id: 2, title: 'Ocean Waves', price: 180 },
    { id: 3, title: 'Abstract Vision', price: 420 },
];

const ArtistDashboardPage = () => {
    const handleEdit = (artwork) => {
        console.log('Edit:', artwork);
    };

    const handleDelete = (artwork) => {
        console.log('Delete:', artwork);
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Manage Artworks</h1>
                <p className="text-default-500">
                    View, edit, and delete your artworks.
                </p>
            </div>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Manage artworks table">

                        {/* HEADER */}
                        <Table.Header>
                            <Table.Column isRowHeader>
                                Title
                            </Table.Column>

                            <Table.Column>
                                Price
                            </Table.Column>

                            <Table.Column>
                                Actions
                            </Table.Column>
                        </Table.Header>

                        {/* BODY */}
                        <Table.Body>
                            {artworks.map((artwork) => (
                                <Table.Row key={artwork.id}>
                                    {/* IMPORTANT FIX */}
                                    <Table.Cell isRowHeader>
                                        {artwork.title}
                                    </Table.Cell>

                                    <Table.Cell>
                                        ${artwork.price}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="flat"
                                                color="primary"
                                                onPress={() => handleEdit(artwork)}
                                            >
                                                <Pencil />
                                            </Button>

                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="flat"
                                                color="danger"
                                                onPress={() => handleDelete(artwork)}
                                            >
                                                <TrashBin />
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>

                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default ArtistDashboardPage;