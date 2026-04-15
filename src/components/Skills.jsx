import { useEffect, useRef, useState } from 'react';

function useVisible() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const skillCategories = [
  {
    title: '// Frontend',

    skills: ['React.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: '// Backend',

    skills: ['Node.js', 'Express.js', 'Java', 'REST APIs', 'JWT Auth', 'SQL'],
  },
  {
    title: '// AI / ML Systems',

    skills: ['Computer Vision', 'NLP', 'NumPy', 'Matplotlib', 'Data Visualiaztion'],
  },
  {
    title: '// Databases & Tools',

    skills: ['MongoDB', 'MySQL', 'Git / GitHub', 'Postman', 'VS Code', 'Jupyter'],
  },
];

function SkillBadge({ skill }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
        padding: '0.5rem 1rem', borderRadius: '6px',
        background: hovered ? 'var(--accent)' : 'rgba(255, 255, 255, 0.03)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        color: hovered ? '#000' : 'var(--text)',
        letterSpacing: '1px',
        transform: hovered ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0deg)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        display: 'inline-block',
        boxShadow: hovered ? '0 0 15px var(--accent)' : 'none',
        zIndex: hovered ? 10 : 1
      }}
    >
      {skill}
    </span>
  );
}

function SkillCard({ category, delay }) {
  const [ref, visible] = useVisible();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--card)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '16px', padding: '2.5rem',
        backdropFilter: 'blur(15px)',
        position: 'relative', overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transitionDelay: `${delay}ms`,
        boxShadow: hovered ? 'var(--glow)' : 'none',
      }}
    >
      {/* Background Gradient Pulse */}
      <div style={{
        position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
        background: `radial-gradient(circle at center, var(--accent) 0%, transparent 70%)`,
        opacity: hovered ? 0.05 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }} />

      <h3 style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
        color: 'var(--accent)', letterSpacing: '4px', textTransform: 'uppercase',
        marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px'
      }}>
        <span style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }} />
        {category.title}
      </h3>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', position: 'relative', zIndex: 2 }}>
        {category.skills.map(skill => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{
      padding: '100px 5vw',
      position: 'relative',
      background: 'var(--bg)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '5rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)',
            letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '1rem'
          }}>
            Technical Arsenal
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900 }}>
            Skills & <span style={{ color: 'var(--accent)', WebkitTextStroke: '1px var(--accent)', WebkitTextFillColor: 'transparent' }}>Expertise</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {skillCategories.map((cat, i) => (
            <SkillCard key={i} category={cat} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}