import { useEffect, useRef, useState } from 'react';

// Custom Hook for Scroll Animations
function useVisible() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const experiences = [
  {
    icon: '🤖',
    date: 'March 2026 - Present',
    title: 'Next.js Developer',
    company: 'AI Zoned',
    desc: 'Developed an innovative Interview AI website. Leveraged Next.js to create a responsive and dynamic user experience, integrating advanced AI features for automated interviews.',
    tags: ['Next.js', 'React', 'AI', 'Web Development'],
  },
  {
    icon: '🎓',
    date: 'May - June 2025',
    title: 'Summer Bootcamp',
    company: 'Sharda University',
    desc: 'Participated in a comprehensive summer coding bootcamp at Sharda University. Engaged in hands-on open-source development, collaborative projects, and industry-standard workflows.',
    tags: ['Bootcamp', 'Collaboration', 'Coding', 'Open Source'],
  },
];

function ExpItem({ exp, delay, isLast }) {
  const [ref, visible] = useVisible();

  return (
    <div ref={ref} style={{
      display: 'flex', gap: '2rem', position: 'relative',
      paddingBottom: isLast ? 0 : '4rem',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}ms`,
    }}>
      {/* Timeline Indicator */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: '50px', height: '50px', borderRadius: '12px',
          background: 'var(--bg2)', border: '1px solid var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', zIndex: 2, boxShadow: visible ? 'var(--glow)' : 'none',
          transition: 'all 0.5s ease', transform: visible ? 'rotate(0deg)' : 'rotate(-45deg)',
        }}>
          {exp.icon}
        </div>
        {!isLast && <div style={{
          width: '2px', flex: 1,
          background: visible ? 'linear-gradient(to bottom, var(--accent), transparent)' : 'transparent',
          marginTop: '10px', transition: 'all 1s ease 0.5s'
        }} />}
      </div>

      {/* Content Card */}
      <div
        className="hoverable"
        style={{
          flex: 1, padding: '2rem', borderRadius: '16px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
          transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          cursor: 'default',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0, 245, 212, 0.2)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <span style={{
          color: 'var(--accent)', fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase'
        }}>
          {exp.date}
        </span>
        <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem', color: 'var(--text-bright)' }}>{exp.title}</h3>
        <p style={{ color: 'var(--muted)', fontWeight: 500, marginBottom: '1rem' }}>{exp.company}</p>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{exp.desc}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.5rem' }}>
          {exp.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.7rem', padding: '0.4rem 0.8rem', borderRadius: '6px',
              background: 'rgba(0, 245, 212, 0.05)', color: 'var(--accent)',
              border: '1px solid rgba(0, 245, 212, 0.2)', fontFamily: 'var(--font-mono)'
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '100px 5vw', color: 'var(--text)', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}>
            My <span style={{ color: 'var(--accent)', WebkitTextStroke: '1px var(--accent)', WebkitTextFillColor: 'transparent' }}>Experience</span>
          </h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--accent)', borderRadius: '2px' }} />
        </div>

        <div style={{ position: 'relative' }}>
          {experiences.map((exp, i) => (
            <ExpItem
              key={i}
              exp={exp}
              delay={i * 200}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}