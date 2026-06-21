'use client'
import React from "react";
import {
    FaFacebook,
    FaInstagram,
    FaXTwitter,
    FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* 3-Column Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                    {/* 1. Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a href="/about" className="hover:text-white transition">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-white transition">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/privacy-policy" className="hover:text-white transition">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 2. Newsletter Signup (Frontend Only Placeholder) */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
                        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-md text-black bg-white outline-none text-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition text-sm font-medium"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* 3. Social Media Icons (Dummy Links) & Copyright info */}
                    <div className="flex flex-col md:items-end">
                        <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mb-6">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition" aria-label="Facebook">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-400 transition" aria-label="Instagram">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition" aria-label="X (Twitter)">
                                <FaXTwitter size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition" aria-label="LinkedIn">
                                <FaLinkedin size={24} />
                            </a>
                        </div>

                        {/* Copyright Information */}
                        <p className="text-gray-400 text-sm text-left md:text-right">
                            © {new Date().getFullYear()} My Website. All rights reserved.
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;