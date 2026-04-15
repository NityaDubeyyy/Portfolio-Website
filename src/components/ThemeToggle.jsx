import React, { useState, useEffect } from 'react';

const ThemeToggle = ({ style }) => {
    const [isDark, setIsDark] = useState(true);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Defaulting to dark as per user request
        const isDarkTheme = initialTheme === 'dark';

        setIsDark(isDarkTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const toggleTheme = () => {
        const nextTheme = isDark ? 'light' : 'dark';
        setIsDark(!isDark);
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
    };

    return (
        <div
            className="theme-toggle-container"
            style={{
                position: 'fixed',
                top: '1.5rem',
                left: '1.5rem',
                zIndex: 9999,
                ...style
            }}
        >
            <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label="Toggle Theme"
                style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    width: '64px',
                    height: '32px',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                    boxShadow: isDark ? '0 0 15px rgba(0, 245, 212, 0.2)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    overflow: 'hidden'
                }}
            >
                {/* Track Icons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0 8px',
                    fontSize: '14px',
                    pointerEvents: 'none',
                    opacity: 0.6
                }}>
                    <span>🌙</span>
                    <span>☀️</span>
                </div>

                {/* Sliding Thumb */}
                <div
                    style={{
                        position: 'absolute',
                        left: isDark ? '4px' : '36px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                        boxShadow: '0 0 10px var(--accent)',
                        transform: `rotate(${isDark ? 0 : 180}deg)`,
                    }}
                >
                    {isDark ? (
                        <div style={{ transform: 'scale(0.8)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </div>
                    ) : (
                        <div style={{ transform: 'scale(0.8)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            </svg>
                        </div>
                    )}
                </div>
            </button>

            <style>
                {`
          .theme-toggle-btn:hover {
            transform: translateY(-2px);
            border-color: var(--accent);
            background: var(--bg2);
          }
          
          .theme-toggle-btn:hover div[style*="background: var(--accent)"] {
             filter: brightness(1.2);
             box-shadow: 0 0 20px var(--accent);
          }

          /* Global theme transition */
          :root {
            transition: all 0.4s ease-in-out;
          }
          * {
            transition: background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          }
           /* Disable transition for canvas to prevent flickering if needed */
          canvas {
            transition: opacity 1s ease !important;
          }
        `}
            </style>
        </div>
    );
};

export default ThemeToggle;