import React, { useState, useEffect, useRef } from 'react';

export default function TerminalLoader({ onComplete }) {
  const canvasRef = useRef(null);

  // States
  const [terminalColor, setTerminalColor] = useState('cyan');
  const [systemInfo, setSystemInfo] = useState({
    os: 'detecting...',
    browser: 'detecting...',
    display: 'detecting...',
    time: 'detecting...',
    location: 'detecting...'
  });

  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Theme configuration helpers
  const getThemeHex = (color) => {
    if (color === 'green') return '#00ff66';
    if (color === 'amber') return '#ffb000';
    return '#00f5d4'; // default cyan
  };

  const getThemeTextHex = (color) => {
    if (color === 'green') return '#33ff33';
    if (color === 'amber') return '#ffb000';
    return '#e2e8f0'; // cyan theme has standard cool off-white text
  };

  const getLabelColor = (type, color) => {
    if (color === 'green') {
      if (type === 'system') return '#00ff66';
      if (type === 'info') return '#00aa33';
      if (type === 'secure') return '#66ff66';
      return '#a3ffa3';
    }
    if (color === 'amber') {
      if (type === 'system') return '#ffb000';
      if (type === 'info') return '#cc7a00';
      if (type === 'secure') return '#ffcc33';
      return '#ffe066';
    }
    // Cyan Theme (Default)
    if (type === 'system') return '#00f5d4';
    if (type === 'info') return '#a78bfa'; // light purple
    if (type === 'secure') return '#60a5fa'; // light blue
    return '#34d399'; // light green
  };

  // ASCII art - NITYA DUBEY (compact & mobile friendly)
  const asciiArt = `_  _ _ ___ _   _ ____    ___  _  _ ___  ____ _  _
|\\ | |  |   \\_/  |__|    |  \\ |  | |__] |___  \\/ 
| \\| |  |    |   |  |    |__/ |__| |__] |___ _/\\_`;

  // 1. Detect System Information & Location
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    let os = 'unknown_os';
    if (userAgent.indexOf("win") !== -1) os = "windows";
    else if (userAgent.indexOf("mac") !== -1) os = "macos";
    else if (userAgent.indexOf("linux") !== -1) os = "linux";
    else if (userAgent.indexOf("android") !== -1) os = "android";
    else if (userAgent.indexOf("like mac") !== -1) os = "ios";

    let browser = 'browser';
    if (userAgent.indexOf("chrome") !== -1 && userAgent.indexOf("edge") === -1 && userAgent.indexOf("opr") === -1) {
      browser = "chrome";
    } else if (userAgent.indexOf("safari") !== -1 && userAgent.indexOf("chrome") === -1) {
      browser = "safari";
    } else if (userAgent.indexOf("firefox") !== -1) {
      browser = "firefox";
    } else if (userAgent.indexOf("edge") !== -1 || userAgent.indexOf("edg") !== -1) {
      browser = "edge";
    } else if (userAgent.indexOf("opr") !== -1 || userAgent.indexOf("opera") !== -1) {
      browser = "opera";
    }

    const display = `${window.screen.width}x${window.screen.height}`;

    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const time = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

    const defaultLoc = { city: 'New Delhi', country: 'India', lat: '28.6139' };

    setSystemInfo({
      os,
      browser,
      display,
      time,
      location: `${defaultLoc.city}, ${defaultLoc.country} · ${defaultLoc.lat}`
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data.city && data.country_name) {
          const latStr = data.latitude ? Number(data.latitude).toFixed(4) : '';
          setSystemInfo(prev => ({
            ...prev,
            location: `${data.city}, ${data.country_name}${latStr ? ' · ' + latStr : ''}`
          }));
        }
      })
      .catch(() => {
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          let guessedLoc = defaultLoc;
          if (tz && (tz.includes('Kolkata') || tz.includes('India'))) {
            guessedLoc = { city: 'Delhi', country: 'India', lat: '28.6139' };
          } else if (tz && tz.includes('London')) {
            guessedLoc = { city: 'London', country: 'United Kingdom', lat: '51.5074' };
          } else if (tz && (tz.includes('New_York') || tz.includes('America'))) {
            guessedLoc = { city: 'New York', country: 'USA', lat: '40.7128' };
          } else if (tz && tz.includes('Tokyo')) {
            guessedLoc = { city: 'Tokyo', country: 'Japan', lat: '35.6762' };
          }
          setSystemInfo(prev => ({
            ...prev,
            location: `${guessedLoc.city}, ${guessedLoc.country} · ${guessedLoc.lat}`
          }));
        } catch (e) {}
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  // 2. Matrix Digital Rain Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize) + 1;
    const rainDrops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)'; // trails
      ctx.fillRect(0, 0, width, height);

      // Color synchronization
      ctx.fillStyle = getThemeHex(terminalColor);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [terminalColor]);

  // 3. Define structured log lines
  const rawLines = [
    { type: 'system', label: 'SYSTEM', text: 'initializing nityadubey.me Core Systems...' },
    { type: 'info', label: 'HARDWARE', text: `OS: ${systemInfo.os} · Browser: ${systemInfo.browser} · Display: ${systemInfo.display}` },
    { type: 'info', label: 'TIMESTAMP', text: `session_time: ${systemInfo.time}` },
    { type: 'info', label: 'NETWORK', text: `origin: ${systemInfo.location}` },
    { type: 'secure', label: 'SECURITY', text: 'handshaking SSL tunnel... verified.' },
    { type: 'success', label: 'LAUNCH', text: 'booting portfolio engine... ready.' }
  ];

  // 4. Typist Engine
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (currentLineIndex >= rawLines.length) {
      setIsDone(true);
      const timer = setTimeout(() => {
        setFadeOut(true);
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 600);
        return () => clearTimeout(completeTimer);
      }, 950);
      return () => clearTimeout(timer);
    }

    const currentLine = rawLines[currentLineIndex];
    let typedLength = 0;
    const baseSpeed = currentLineIndex === 0 || currentLineIndex === rawLines.length - 1 ? 20 : 10;

    const typingInterval = setInterval(() => {
      if (typedLength < currentLine.text.length) {
        setCurrentText(currentLine.text.substring(0, typedLength + 1));
        typedLength++;
      } else {
        clearInterval(typingInterval);
        const linePause = setTimeout(() => {
          setVisibleLines(prev => [...prev, currentLine]);
          setCurrentText('');
          setCurrentLineIndex(idx => idx + 1);
        }, 150);
        return () => clearTimeout(linePause);
      }
    }, baseSpeed);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, systemInfo]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const activeTextColor = getThemeTextHex(terminalColor);
  const activeAccentColor = getThemeHex(terminalColor);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#050505',
      color: activeTextColor,
      fontFamily: "var(--font-mono), 'Space Mono', Courier New, monospace",
      fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
      lineHeight: '1.8',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      zIndex: 999999,
      transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: fadeOut ? 0 : 1,
      transform: fadeOut ? 'scale(1.02)' : 'scale(1)',
      pointerEvents: isDone ? 'none' : 'all',
      boxSizing: 'border-box',
      cursor: 'default',
    }}>
      {/* Matrix Rain Canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        opacity: 0.06,
        pointerEvents: 'none',
      }} />

      {/* Retro scanline CRT overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
        backgroundSize: '100% 4px',
        zIndex: 10,
        opacity: 0.85,
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.75) 100%)',
        pointerEvents: 'none',
        zIndex: 11,
      }} />

      <style>{`
        @keyframes crt-flicker {
          0% { opacity: 0.97; }
          50% { opacity: 1; }
          100% { opacity: 0.98; }
        }
        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .crt-container {
          animation: crt-flicker 0.15s infinite;
          width: 100%;
          max-width: 900px;
          margin-top: 8vh;
          margin-left: 5vw;
          z-index: 12;
          position: relative;
        }
        .cursor-blink {
          animation: terminal-blink 1s infinite;
          display: inline-block;
          margin-left: 3px;
          color: ${activeAccentColor};
        }
        .theme-selector {
          position: absolute;
          top: 2.5rem;
          right: 2.5rem;
          display: flex;
          gap: 1rem;
          z-index: 15;
          font-family: inherit;
          fontSize: 0.8rem;
          align-items: center;
        }
        .theme-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.75rem;
          text-transform: uppercase;
          transition: all 0.2s;
        }
        .skip-btn {
          position: absolute;
          bottom: 2.5rem;
          right: 2.5rem;
          background: transparent;
          border: 1px solid rgba(226, 232, 240, 0.2);
          color: rgba(226, 232, 240, 0.6);
          padding: 0.6rem 1.2rem;
          fontSize: 0.75rem;
          fontFamily: inherit;
          borderRadius: 4px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          zIndex: 15;
          cursor: pointer;
        }
        .skip-btn:hover {
          border-color: ${activeAccentColor};
          color: #ffffff;
          box-shadow: 0 0 12px ${activeAccentColor}4d;
          transform: translateY(-2px);
        }
        .skip-btn:active {
          transform: translateY(0);
        }
      `}</style>

      {/* Interactive Color Switcher */}
      <div className="theme-selector">
        <span style={{ color: 'rgba(226, 232, 240, 0.35)', fontSize: '0.75rem', letterSpacing: '1px' }}>T-THEME:</span>
        {['cyan', 'green', 'amber'].map(color => (
          <button
            key={color}
            onClick={() => setTerminalColor(color)}
            className="theme-btn"
            style={{
              color: terminalColor === color ? getThemeHex(color) : 'rgba(226, 232, 240, 0.4)',
              fontWeight: terminalColor === color ? '700' : '400',
              textShadow: terminalColor === color ? `0 0 8px ${getThemeHex(color)}` : 'none',
            }}
          >
            {color}
          </button>
        ))}
      </div>

      <div className="crt-container">
        {/* ASCII Banner Header */}
        <pre style={{
          color: activeAccentColor,
          textShadow: `0 0 8px ${activeAccentColor}80`,
          marginBottom: '2.5rem',
          fontSize: 'clamp(0.4rem, 1.2vw, 0.8rem)',
          lineHeight: '1.25',
          fontWeight: 'bold',
          whiteSpace: 'pre',
          overflowX: 'auto',
          borderBottom: `1px dashed ${activeAccentColor}33`,
          paddingBottom: '1.5rem',
        }}>
          {asciiArt}
        </pre>

        {/* Render already typed lines with stylized badges */}
        {visibleLines.map((line, idx) => (
          <div key={idx} style={{ whiteSpace: 'pre-wrap', marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{
              color: getLabelColor(line.type, terminalColor),
              marginRight: '12px',
              fontWeight: '700',
              minWidth: '100px',
              display: 'inline-block'
            }}>[ {line.label} ]</span>
            <span style={{ color: terminalColor === 'cyan' ? '#e2e8f0' : activeTextColor }}>{line.text}</span>
          </div>
        ))}

        {/* Render currently typing line */}
        {currentLineIndex < rawLines.length && (
          <div style={{ whiteSpace: 'pre-wrap', marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{
              color: getLabelColor(rawLines[currentLineIndex].type, terminalColor),
              marginRight: '12px',
              fontWeight: '700',
              minWidth: '100px',
              display: 'inline-block'
            }}>[ {rawLines[currentLineIndex].label} ]</span>
            <span>
              {currentText}
              <span className="cursor-blink">█</span>
            </span>
          </div>
        )}

        {/* If completely done typing */}
        {isDone && (
          <div style={{ whiteSpace: 'pre-wrap', marginTop: '15px' }}>
            <span style={{ color: activeAccentColor }}>&gt; Core startup sequence completed. Redirecting...</span>
            <span className="cursor-blink">█</span>
          </div>
        )}
      </div>

      {/* Skip Button */}
      {!isDone && (
        <button
          onClick={() => {
            setFadeOut(true);
            setTimeout(onComplete, 600);
          }}
          className="skip-btn"
        >
          SKIP
        </button>
      )}
    </div>
  );
}
