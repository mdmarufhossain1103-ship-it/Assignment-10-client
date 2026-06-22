import React from 'react';

const Loading = () => {
    return (
        <div style={styles.container}>
            <div style={styles.spinner}></div>
            <p style={styles.text}>Loading...</p>
        </div>
    );
};

// Simple inline styles for easy copying
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#f9f9f9',
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '5px solid #e0e0e0',
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    text: {
        marginTop: '15px',
        fontFamily: 'sans-serif',
        color: '#555',
        fontSize: '1.1rem',
    }
};

// Note: To make the spinner actually rotate using inline styles, 
// you can add keyframes to your global.css, or just use Tailwind if you have it set up!
export default Loading;