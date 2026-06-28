"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";

const PaymentTable = ({ purchases }) => {
    const [isMounted, setIsMounted] = useState(false);
    const safePurchases = Array.isArray(purchases) ? purchases : [];

    useEffect(() => {
        setIsMounted(false);
        setIsMounted(true);
    }, []);

    const totalSpent = safePurchases.reduce(
        (acc, item) => acc + Number(item.price || 0),
        0
    );

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        if (!isMounted) return "Loading...";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 border">
                    <p className="text-gray-500 text-sm">Total Purchases</p>
                    <h3 className="text-2xl font-bold">
                        {safePurchases.length}
                    </h3>
                </Card>

                <Card className="p-4 border">
                    <p className="text-gray-500 text-sm">Total Spent</p>
                    <h3 className="text-2xl font-bold text-green-600">
                        ${totalSpent.toFixed(2)}
                    </h3>
                </Card>

                <Card className="p-4 border">
                    <p className="text-gray-500 text-sm">Latest Purchase</p>
                    <h3 className="text-lg font-semibold truncate">
                        {safePurchases[0]?.title || "No purchases yet"}
                    </h3>
                </Card>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Artwork</th>
                            <th className="p-3 text-left">Artist</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {safePurchases.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            safePurchases.map((item, index) => (
                                <tr key={item._id || item.sessionId || index} className="border-t">
                                    <td className="p-3 font-medium">{item.title || "Untitled"}</td>
                                    <td className="p-3">{item.artist || "Unknown"}</td>
                                    <td className="p-3">${Number(item.price || 0).toFixed(2)}</td>
                                    <td className="p-3">
                                        {formatDate(item.purchaseDate)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentTable;