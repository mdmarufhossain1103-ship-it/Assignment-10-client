'use client';

import React from 'react';
import { Table } from '@heroui/react';

const SalesHistoryTable = ({ salesData = [] }) => {
    return (
        <div className="p-6">
            <h1 className="mb-4 text-xl font-semibold">Sales History</h1>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Sales history table">
                        <Table.Header>
                            <Table.Column isRowHeader allowsSorting>
                                {({ sortDirection }) => (
                                    <Table.SortableColumnHeader sortDirection={sortDirection}>
                                        Artwork Title
                                    </Table.SortableColumnHeader>
                                )}
                            </Table.Column>

                            <Table.Column>
                                Buyer Name
                            </Table.Column>

                            <Table.Column>
                                Purchase Date
                            </Table.Column>

                            <Table.Column>
                                Amount
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {salesData.length > 0 ? (
                                salesData.map((item) => (
                                    <Table.Row key={item._id}>
                                        <Table.Cell>{item.title}</Table.Cell>
                                        <Table.Cell>{item.userName}</Table.Cell>
                                        <Table.Cell>
                                            {item.purchaseDate
                                                ? new Date(item.purchaseDate).toLocaleDateString()
                                                : '-'}
                                        </Table.Cell>
                                        <Table.Cell>
                                            ${Number(item.price).toFixed(2)}
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell>No sales history found.</Table.Cell>
                                    <Table.Cell />
                                    <Table.Cell />
                                    <Table.Cell />
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>

                <Table.Footer />
            </Table>
        </div>
    );
};

export default SalesHistoryTable;