import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const links = ['about', 'experience', 'projects', 'skills', 'contact', 'resume'];

export default function Navbar() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1.2rem 4rem',
      background: 'var(--bg-nav)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ThemeToggle style={{ position: 'static', margin: 0 }} />
        <a href="#hero" style={{
          fontFamily: 'var(--font-mono)', fontSize: '1.1rem',
          color: 'var(--accent)', letterSpacing: '2px', textDecoration: 'none',
        }}>
          {/* dev<span style={{ color: 'var(--accent2)' }}>.</span>folio */}
        </a>
      </div>

      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {links.map(link => (
          <li key={link}>
            <a
              href={`#${link}`}
              style={{
                color: active === link ? 'var(--accent)' : 'var(--muted)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
                transition: 'color 0.3s',
              }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
