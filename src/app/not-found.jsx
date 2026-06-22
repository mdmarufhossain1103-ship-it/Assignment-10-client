import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
            <h1 className="text-9xl font-bold text-blue-600 animate-bounce">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-2 max-w-md">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>
            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFoundPage;