"use client";

import React, { useState } from "react";
import { Table, Chip } from "@heroui/react";

const initialTransactions = [
    {
        id: "TXN-1001",
        type: "subscription",
        email: "john@example.com",
        amount: 19.99,
        date: "2025-06-20",
    },
    {
        id: "TXN-1002",
        type: "purchase",
        email: "artist@example.com",
        amount: 250.0,
        date: "2025-06-21",
    },
    {
        id: "TXN-1003",
        type: "purchase",
        email: "sarah@example.com",
        amount: 120.5,
        date: "2025-06-22",
    },
    {
        id: "TXN-1004",
        type: "subscription",
        email: "mike@example.com",
        amount: 9.99,
        date: "2025-06-23",
    },
];

const ViewAllTransactions = () => {
    const [transactions] = useState(initialTransactions);

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
                                <Table.Row key={transaction.id}>
                                    <Table.Cell>
                                        {transaction.id}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Chip
                                            color={getTypeColor(transaction.type)}
                                            variant="flat"
                                        >
                                            {transaction.type}
                                        </Chip>
                                    </Table.Cell>

                                    <Table.Cell>
                                        {transaction.email}
                                    </Table.Cell>

                                    <Table.Cell>
                                        ${transaction.amount.toFixed(2)}
                                    </Table.Cell>

                                    <Table.Cell>
                                        {transaction.date}
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

export default ViewAllTransactions;