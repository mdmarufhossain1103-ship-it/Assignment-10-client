'use client';

import React from 'react';
import { Card, Button } from '@heroui/react';

const plans = [
    {
        name: 'Free',
        price: '$0',
        purchases: '3 paintings',
        description: 'Perfect for getting started.',
        current: true,
    },
    {
        name: 'Pro',
        price: '$9.99',
        purchases: '9 paintings',
        description: 'Great for regular art collectors.',
        popular: true,
    },
    {
        name: 'Premium',
        price: '$19.99',
        purchases: 'Unlimited',
        description: 'Unlimited access for serious collectors.',
    },
];

const SubscriptionPage = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold">
                    Subscription Plans
                </h1>

                <p className="text-default-500 mt-2">
                    Choose the plan that fits your artwork purchasing needs.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid gap-6 md:grid-cols-3">

                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`p-6 relative border ${plan.popular
                                ? 'border-blue-500 shadow-lg'
                                : ''
                            }`}
                    >
                        {plan.popular && (
                            <span className="absolute top-4 right-4 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                                Popular
                            </span>
                        )}

                        <div className="space-y-4">

                            <div>
                                <h2 className="text-2xl font-bold">
                                    {plan.name}
                                </h2>

                                <p className="text-default-500 text-sm mt-1">
                                    {plan.description}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-4xl font-bold">
                                    {plan.price}
                                </h3>

                                <p className="text-default-500 text-sm">
                                    per month
                                </p>
                            </div>

                            <div className="border-t pt-4">
                                <p className="font-medium">
                                    Max Purchases Allowed
                                </p>

                                <p className="text-lg mt-1">
                                    {plan.purchases}
                                </p>
                            </div>

                            <form action="/api/subscription" method='POST'>
                                <Button
                                type='submit'
                                    color={
                                        plan.current
                                            ? 'default'
                                            : 'primary'
                                    }
                                    className="w-full"
                                >
                                    {plan.current
                                        ? 'Current Plan'
                                        : 'Upgrade Plan'}
                                </Button>
                            </form>

                        </div>
                    </Card>
                ))}
            </div>

            {/* Overview Table Style Section */}
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Subscription Tier Overview
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-3">Tier</th>
                                <th className="py-3">Max Purchases Allowed</th>
                                <th className="py-3">Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <td className="py-3">Free (Default)</td>
                                <td className="py-3">3 paintings</td>
                                <td className="py-3">$0</td>
                            </tr>

                            <tr className="border-b">
                                <td className="py-3">Pro</td>
                                <td className="py-3">9 paintings</td>
                                <td className="py-3">$9.99</td>
                            </tr>

                            <tr>
                                <td className="py-3">Premium</td>
                                <td className="py-3">Unlimited</td>
                                <td className="py-3">$19.99</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>

        </div>
    );
};

export default SubscriptionPage;