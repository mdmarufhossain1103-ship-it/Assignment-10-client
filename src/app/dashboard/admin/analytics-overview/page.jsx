"use client";

import React from "react";
import { Card } from "@heroui/react";

const AnalyticsOverview = () => {
    const stats = [
        {
            title: "Total Users",
            value: 1250,
            description: "Registered users",
        },
        {
            title: "Total Artists",
            value: 185,
            description: "Verified artists",
        },
        {
            title: "Total Artworks Sold",
            value: 3420,
            description: "Completed sales",
        },
        {
            title: "Total Revenue",
            value: "$98,750",
            description: "Platform earnings",
        },
    ];

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">
                Analytics Overview
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <Card key={item.title}>
                        <Card.Header>
                            <div>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Description>
                                    {item.description}
                                </Card.Description>
                            </div>
                        </Card.Header>

                        <Card.Content>
                            <p className="text-4xl font-bold">
                                {item.value}
                            </p>
                        </Card.Content>

                        <Card.Footer>
                            <span className="text-sm text-default-500">
                                Updated recently
                            </span>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AnalyticsOverview;