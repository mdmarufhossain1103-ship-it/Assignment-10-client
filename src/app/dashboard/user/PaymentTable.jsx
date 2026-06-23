"use client";

import { Card } from "@heroui/react";

const PaymentTable = ({ purchases }) => {
    const safePurchases = Array.isArray(purchases) ? purchases : [];

    const totalSpent = safePurchases.reduce(
        (acc, item) => acc + Number(item.price || 0),
        0
    );

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <Card className="p-4 border">
                    <p>Total Purchases</p>
                    <h3 className="text-2xl font-bold">
                        {safePurchases.length}
                    </h3>
                </Card>

                <Card className="p-4 border">
                    <p>Total Spent</p>
                    <h3 className="text-2xl font-bold text-green-600">
                        ${totalSpent}
                    </h3>
                </Card>

                <Card className="p-4 border">
                    <p>Latest Purchase</p>
                    <h3>
                        {safePurchases[0]?.title || "No purchases yet"}
                    </h3>
                </Card>
            </div>

            {/* SIMPLE TABLE (no HeroUI = no error) */}
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
                        {safePurchases.map((item) => (
                            <tr key={item._id || item.sessionId} className="border-t">
                                <td className="p-3">{item.title}</td>
                                <td className="p-3">{item.artist}</td>
                                <td className="p-3">${item.price}</td>
                                <td className="p-3">
                                    {item.purchaseDate
                                        ? new Date(item.purchaseDate).toLocaleDateString()
                                        : "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentTable;