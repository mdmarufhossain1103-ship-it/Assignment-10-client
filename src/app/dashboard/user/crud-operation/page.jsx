'use client';

import React from 'react';
import { Card, Input, TextArea, Button } from '@heroui/react';

const mockComments = [
    {
        id: 1,
        user: 'John Doe',
        comment: 'Amazing artwork! Loved the colors.',
        date: '2026-06-20',
    },
    {
        id: 2,
        user: 'Jane Smith',
        comment: 'This piece really speaks to me.',
        date: '2026-06-18',
    },
];

const CURDOperationPage = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    Comments Management
                </h1>
                <p className="text-default-500 mt-1">
                    You can create and view comments on artworks only.
                </p>
            </div>

            {/* Restriction Notice */}
            <Card className="p-4 border border-warning-300 bg-warning-50">
                <p className="text-sm">
                    🚫 You cannot create, edit, or delete artworks.
                    You only have permission to manage comments.
                </p>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">

                {/* Create Comment */}
                <Card className="p-6 space-y-4">

                    <h2 className="text-xl font-semibold">
                        Create Comment
                    </h2>

                    <Input
                        label="Your Name"
                        placeholder="Enter your name"
                    />

                    {/* FIXED: no DOM warning */}
                    <TextArea
                        label="Comment"
                        placeholder="Write your comment..."
                        rows={4}
                    />

                    <Button color="primary" className="w-full">
                        Post Comment
                    </Button>

                </Card>

                {/* Comment List */}
                <Card className="p-6 space-y-4">

                    <h2 className="text-xl font-semibold">
                        Recent Comments
                    </h2>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto">

                        {mockComments.map((item) => (
                            <div
                                key={item.id}
                                className="border rounded-lg p-3 space-y-1"
                            >
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">
                                        {item.user}
                                    </span>
                                    <span className="text-default-400">
                                        {item.date}
                                    </span>
                                </div>

                                <p className="text-sm text-default-600">
                                    {item.comment}
                                </p>
                            </div>
                        ))}

                    </div>
                </Card>

            </div>

        </div>
    );
};

export default CURDOperationPage;