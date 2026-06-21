'use client'
import React, { useState, useEffect } from 'react';

const Animation = () => {
    const art = [
        {
            "id": 1,
            "title": "Discover Inspiring Artworks",
            "description": "Explore thousands of unique paintings, illustrations, and digital creations from talented artists around the world.",
            "image": "https://i.ibb.co.com/MDYV6dnK/picture-1.jpg"
        },
        {
            "id": 2,
            "title": "Showcase Your Creativity",
            "description": "Create your portfolio, share your masterpieces, and connect with a vibrant community of art enthusiasts.",
            "image": "https://i.ibb.co.com/Vph8VSHj/picture-2.jpg"
        },
        {
            "id": 3,
            "title": "Join Live Art Challenges",
            "description": "Participate in weekly competitions, improve your skills, and gain recognition through exciting creative challenges.",
            "image": "https://i.ibb.co.com/GQHRgxsp/picture-3.png"
        },
        {
            "id": 4,
            "title": "Learn from Professional Artists",
            "description": "Access tutorials, workshops, and expert tips to enhance your artistic journey and unlock new techniques.",
            "image": "https://i.ibb.co.com/9kRwSpS5/picture-4.jpg"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === art.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(slideInterval);
    }, [art.length]);

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#000',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}>

            {art.map((item, index) => (
                <img
                    key={item.id}
                    src={item.image}
                    alt={item.title}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: currentIndex === index ? 1 : 0,
                        transform: currentIndex === index ? 'scale(1)' : 'scale(1.05)',
                        transition: 'opacity 1.2s ease-in-out, transform 1.2s ease-in-out',
                        zIndex: currentIndex === index ? 1 : 0
                    }}
                />
            ))}

            {/* Premium Fullscreen Vignette Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                // Dark gradient from bottom-left to top-right to maximize typography contrast perfectly
                background: 'linear-gradient(45deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 100%)',
                zIndex: 2,
                pointerEvents: 'none'
            }} />

            {/* Modern Layout Foreground */}
            <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Vertically balances framing standard
                paddingLeft: 'max(5%, 40px)',
                paddingRight: 'max(5%, 40px)',
                boxSizing: 'border-box',
                zIndex: 3
            }}>

                {/* Text & Interaction Content Block */}
                <div style={{ maxWidth: '640px' }}>
                    {art.map((item, index) => (
                        <div
                            key={item.id}
                            style={{
                                display: currentIndex === index ? 'block' : 'none',
                                animation: 'fadeInUp 0.6s ease out forward'
                            }}
                        >
                            {/* Accent tag context */}
                            <span style={{
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontSize: '12px',
                                fontWeight: '700',
                                color: '#3b82f6',
                                display: 'inline-block',
                                marginBottom: '12px'
                            }}>
                                Creative Community
                            </span>

                            <h1 style={{
                                fontSize: 'clamp(32px, 5vw, 48px)',
                                fontWeight: '800',
                                lineHeight: '1.15',
                                color: '#ffffff',
                                margin: '0 0 16px 0',
                                letterSpacing: '-0.02em'
                            }}>
                                {item.title}
                            </h1>

                            <p style={{
                                fontSize: 'clamp(16px, 2vw, 18px)',
                                lineHeight: '1.6',
                                color: '#cbd5e1',
                                margin: '0 0 32px 0',
                                fontWeight: '400'
                            }}>
                                {item.description}
                            </p>
                        </div>
                    ))}

                    {/* Standard Action Button CTA Setup */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
                        <button style={{
                            padding: '14px 28px',
                            borderRadius: '30px',
                            border: 'none',
                            backgroundColor: '#ffffff',
                            color: '#0f172a',
                            fontWeight: '600',
                            fontSize: '15px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            transition: 'transform 0.2s ease'
                        }}>
                            Get Started
                        </button>
                    </div>

                    {/* Slide Navigation Progress Indicators (Dots) */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {art.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    width: currentIndex === index ? '32px' : '8px',
                                    height: '8px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    backgroundColor: currentIndex === index ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Animation;