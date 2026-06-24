"use client";

import React, { useState } from "react";
import { Table, Chip } from "@heroui/react";

const TransactionsTable = ({ initialTransactions }) => {
    const [transactions] = useState(() => {
        if (Array.isArray(initialTransactions)) return initialTransactions;
        if (Array.isArray(initialTransactions?.data))
            return initialTransactions.data;
        return [];
    });

    const getTypeColor = (type) => {
        switch (type) {
            case "subscription":
                return "secondary";
            case "purchase":
                return "success";
            default:
                return "default";
        }
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">
                View All Transactions
            </h1>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Transactions table">
                        <Table.Header>
                            <Table.Column isRowHeader>
                                Transaction ID
                            </Table.Column>
                            <Table.Column>Type</Table.Column>
                            <Table.Column>User / Artist Email</Table.Column>
                            <Table.Column>Amount</Table.Column>
                            <Table.Column>Date</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {transactions.map((transaction) => (
                                <Table.Row key={transaction._id}>
                                    <Table.Cell>
                                        {transaction._id}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Chip
                                            color={getTypeColor(transaction.type)}
                                            variant="flat"
                                        >
                                            {transaction.paymentType}
                                        </Chip>
                                    </Table.Cell>

                                    <Table.Cell>
                                        {transaction.userEmail}
                                    </Table.Cell>

                                    <Table.Cell>
                                        ${Number(transaction.price).toFixed(2)}
                                    </Table.Cell>

                                    <Table.Cell>
                                        {transaction.purchaseDate}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>

                <Table.Footer>
                    Total Transactions: {transactions.length}
                </Table.Footer>
            </Table>
        </div>
    );
};

export default TransactionsTable;