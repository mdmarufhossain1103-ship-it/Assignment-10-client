'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars } from '@gravity-ui/icons';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
    const {data: session} = authClient.useSession()
    const user = session?.user;
    console.log(user)
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(false);

    const navLinkClass = (path) =>
        `px-3 py-2 rounded-md transition ${pathname === path
            ? 'text-blue-600 font-semibold bg-blue-50'
            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
        }`;

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    {/* <Link
                        href="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        ArtGallery
                    </Link> */}
                    <Image src="/logo.png" alt="logo" width={80} height={80} />

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link href="/" className={navLinkClass('/')}>
                            Home
                        </Link>

                        <Link
                            href="/artworks"
                            className={navLinkClass('/artworks')}
                        >
                            Browse Artworks
                        </Link>
                        {/* Dashboard Dropdown */}
                        {user && (
                            <Link href={`/dashboard/${user?.role}`}>
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setDashboardOpen(!dashboardOpen)
                                        }
                                        className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </button>


                                </div>
                           </Link>
                        )}

                        {user ? (
                            <button onClick={handleSignOut} className="ml-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-md hover:bg-gray-100"
                    >
                        <Bars className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden border-t py-3 space-y-2">
                        <Link
                            href="/"
                            className={`block ${navLinkClass('/')}`}
                        >
                            Home
                        </Link>

                        <Link
                            href="/artworks"
                            className={`block ${navLinkClass('/artworks')}`}
                        >
                            Browse Artworks
                        </Link>

                        {user && (
                            <>
                                <Link href={`/dashboard/${user?.role}`}>
                                    <div className="px-3 py-2 font-medium text-gray-500">
                                        Dashboard
                                    </div>
                                </Link>

                            </>
                        )}

                        {user ? (
                            <button className="w-full rounded-md bg-red-500 px-4 py-2 text-white">
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="block rounded-md bg-blue-600 px-4 py-2 text-center text-white"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;