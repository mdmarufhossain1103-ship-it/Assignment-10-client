'use client'
import React from 'react';
import { Table, Card } from "@heroui/react";

const purchases = [
    {
        id: 1,
        name: "Sunset Dreams",
        artist: "John Doe",
        price: 120,
        date: "2026-06-20"
    },
    {
        id: 2,
        name: "Ocean Breeze",
        artist: "Jane Smith",
        price: 200,
        date: "2026-06-18"
    },
    {
        id: 3,
        name: "Mountain View",
        artist: "Alex Brown",
        price: 150,
        date: "2026-06-15"
    }
];

const totalSpent = purchases.reduce((acc, item) => acc + item.price, 0);

const UserDashboard = () => {
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">

            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold">
                    Purchase History
                </h2>
                <p className="text-gray-500 mt-1">
                    Track all your artwork purchases in one place
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <Card className="p-4 shadow-sm border">
                    <p className="text-gray-500 text-sm">Total Purchases</p>
                    <h3 className="text-2xl font-bold">
                        {purchases.length}
                    </h3>
                </Card>

                <Card className="p-4 shadow-sm border">
                    <p className="text-gray-500 text-sm">Total Spent</p>
                    <h3 className="text-2xl font-bold text-green-600">
                        ${totalSpent}
                    </h3>
                </Card>

                <Card className="p-4 shadow-sm border">
                    <p className="text-gray-500 text-sm">Latest Purchase</p>
                    <h3 className="text-lg font-semibold">
                        {purchases[0]?.name}
                    </h3>
                </Card>

            </div>

            {/* Table */}
            <Card className="border shadow-sm">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Purchase History Table">

                            {/* Header (FIXED: isRowHeader added) */}
                            <Table.Header>
                                <Table.Column isRowHeader>
                                    Artwork
                                </Table.Column>

                                <Table.Column>
                                    Artist
                                </Table.Column>

                                <Table.Column>
                                    Price
                                </Table.Column>

                                <Table.Column>
                                    Date
                                </Table.Column>
                            </Table.Header>

                            {/* Body */}
                            <Table.Body items={purchases}>
                                {(item) => (
                                    <Table.Row
                                        key={item.id}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <Table.Cell className="font-medium">
                                            {item.name}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {item.artist}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                                                ${item.price}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell className="text-gray-500">
                                            {new Date(item.date).toLocaleDateString()}
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>

                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </Card>

        </div>
    );
};

export default UserDashboard;