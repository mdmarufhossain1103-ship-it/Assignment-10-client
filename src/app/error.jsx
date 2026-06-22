"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';

const ErrorPage = ({ error, reset }) => {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
            <h1 className="text-6xl font-bold text-red-500">Something went wrong!</h1>
            <p className="text-gray-600 mt-4 max-w-md">
                An unexpected error occurred. We apologize for the inconvenience.
            </p>

            {error?.message && (
                <code className="mt-4 p-2 bg-gray-100 rounded text-red-600 text-sm font-mono max-w-xl break-all">
                    {error.message}
                </code>
            )}

            <div className="flex gap-4 mt-6">
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-200 shadow-md"
                >
                    Try Again
                </button>
                <Link
                    href="/"
                    className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition duration-200 shadow-md"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;