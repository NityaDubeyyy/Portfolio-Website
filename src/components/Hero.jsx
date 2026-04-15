import { useEffect, useState } from 'react';

const phrases = [
  'intelligent systems.',
  'scalable backends.',
  'beautiful UIs.',
  'the future.',
];

function useTyping(phrases) {
  const [text, setText] = useState('');
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = phrases[pi];
    let timeout;
    if (!deleting) {
      if (ci < cur.length) {
        timeout = setTimeout(() => setCi(c => c + 1), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (ci > 0) {
        timeout = setTimeout(() => setCi(c => c - 1), 45);
      } else {
        setDeleting(false);
        setPi(p => (p + 1) % phrases.length);
        timeout = setTimeout(() => { }, 400);
      }
    }
    setText(cur.substring(0, ci));
    return () => clearTimeout(timeout);
  }, [ci, deleting, pi, phrases]);

  return text;
}

export default function Hero() {
  const typedText = useTyping(phrases);

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'flex-start',
      padding: '0 10vw',
      position: 'relative', zIndex: 1,
    }}>


      <h1 style={{
        fontSize: 'clamp(3.5rem, 8vw, 7rem)',
        fontWeight: 800, lineHeight: 1, letterSpacing: '-2px',
        marginBottom: '1rem',
        opacity: 0, animation: 'fadeUp 0.8s 0.4s forwards',
      }}>
        Nitya<br />
        <span style={{
          color: 'transparent',
          WebkitTextStroke: '1.5px var(--accent)',
          display: 'block',
        }}>
          Dubey
        </span>
      </h1>

      <p style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
        color: 'var(--muted)', marginBottom: '2.5rem', fontWeight: 400,
        opacity: 0, animation: 'fadeUp 0.8s 0.6s forwards',
      }}>
        <span style={{ color: 'var(--accent3)', fontWeight: 700 }}>Full Stack Developer</span>
        {' & '}
        <span style={{ color: 'var(--accent3)', fontWeight: 700 }}>AI/ML Enthusiast</span>
        <br />
        Building{' '}
        <span style={{
          color: 'var(--accent)',
          borderRight: '2px solid var(--accent)',
          animation: 'blink 0.7s infinite',
          paddingRight: '2px',
        }}>
          {typedText}
        </span>
      </p>

      <div style={{
        display: 'flex', gap: '1.2rem',
        opacity: 0, animation: 'fadeUp 0.8s 0.8s forwards',
      }}>
        <a href="#projects" className="btn-primary hoverable" style={{
          padding: '0.85rem 2rem',
          borderRadius: '4px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase',
          textDecoration: 'none',
          background: 'var(--accent)', color: 'var(--bg)', fontWeight: 700,
          boxShadow: 'var(--glow)',
          transition: 'all 0.3s',
        }}>
          View Projects
        </a>
        <a href="#contact" className="btn-ghost hoverable" style={{
          padding: '0.85rem 2rem',
          borderRadius: '4px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase',
          textDecoration: 'none',
          border: '1px solid var(--border)', color: 'var(--text)',
          transition: 'all 0.3s',
        }}>
          Get In Touch
        </a>
      </div>

      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        opacity: 0, animation: 'fadeUp 0.8s 1.2s forwards',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
          color: 'var(--muted)', letterSpacing: '3px', textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          animation: 'scrollPulse 2s infinite',
        }} />
      </div>
    </section>
  );
}
