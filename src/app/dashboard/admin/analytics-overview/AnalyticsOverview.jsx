"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { getAnalytics } from "@/lib/api/artist";


const AnalyticsOverview = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const data = await getAnalytics();

                setStats([
                    {
                        title: "Total Users",
                        value: data?.totalUsers || 0,
                        description: "Registered users",
                    },
                    {
                        title: "Total Artists",
                        value: data?.totalArtist || 0,
                        description: "Verified artists",
                    },
                    {
                        title: "Artworks Sold",
                        value: data?.totalWorkSold || 0,
                        description: "Completed sales",
                    },
                    {
                        title: "Total Revenue",
                        value: `$${Number(data?.totalRevenue || 0).toFixed(2)}`,
                        description: "Platform earnings",
                    },
                ]);
            } catch (error) {
                console.error("Analytics error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <h1 className="text-xl font-bold">Loading analytics...</h1>
            </div>
        );
    }

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
                                Live data
                            </span>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AnalyticsOverview;