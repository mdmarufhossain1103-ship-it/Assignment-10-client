import Link from 'next/link';
import React from 'react';

const UnauthorizedPage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>403</h1>
                <h2 style={styles.subtitle}>Unauthorized Access</h2>
                <p style={styles.text}>
                    You don’t have permission to view this page.
                </p>

                <Link
                    style={styles.button}
                    href={'/'}
                >
                    Go Back
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif',
    },
    card: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: '64px',
        margin: '0',
        color: '#e74c3c',
    },
    subtitle: {
        margin: '10px 0',
        fontSize: '24px',
    },
    text: {
        marginBottom: '20px',
        color: '#555',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: '#3498db',
        color: '#fff',
        fontSize: '16px',
    },
};

export default UnauthorizedPage;