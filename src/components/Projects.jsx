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

const projects = [
  {
    icon: '🤖',
    num: '// 01',
    category: 'AI/ML',
    name: 'Athena-AI Chatbot',
    desc: 'A real-time conversational AI platform built with API, featuring streaming responses and conversation memory.',
    tags: ['React', 'Node.js', 'MongoDB', 'Groq API', 'ImageKit', 'JWT'],
    demo: 'https://athena-ai-chatbot-server.vercel.app/',
    github: 'https://github.com/NityaDubeyyy/Athena-Ai-Chatbot',
  },
  {
    icon: '📊',
    num: '// 02',
    category: 'Full Stack',
    name: 'Campus Crave',
    desc: 'University food ordering ecosystem. Solving queue management with a high-performance MERN dashboard.',
    tags: ['Java', 'React.js', 'MongoDB', 'Node.js'],
    demo: 'https://uni-crave.vercel.app/',
    github: 'https://github.com/NityaDubeyyy/Campus-Crave',
  },
  {
    icon: '📸',
    num: '// 03',
    category: 'AI/ML',
    name: 'Smart Attendance System',
    desc: 'An automated attendance tracking solution using face recognition, featuring student profile management and real-time dashboard analytics.',
    tags: ['React', 'Flask', 'Face Recognition', 'Dlib', 'OpenCV'],
    demo: '#',
    github: '#',
  },
  {
    icon: '🌐',
    num: '// 04',
    category: 'Full Stack',
    name: 'CyberGuardian',
    desc: 'AI-based tool for detecting cyberbullying and hate speech integrated into a social platform.',
    tags: ['MERN', 'AI/ML', 'Socket.io'],
    demo: '#',
    github: '#',
  }
];

function ProjectCard({ project, delay }) {
  const [ref, visible] = useVisible();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--card)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '16px',
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? `perspective(1000px) rotateX(${(mousePos.y - 150) / 25}deg) rotateY(${(mousePos.x - 150) / -25}deg)` : 'translateY(30px)',
        transition: hovered ? 'none' : 'all 0.6s ease',
        boxShadow: hovered ? 'var(--glow)' : 'none',
      }}
    >
      {/* Spotlight Effect */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,245,212,0.08), transparent 40%)`,
        opacity: hovered ? 1 : 0,
        pointerEvents: 'none',
        transition: 'opacity 0.3s',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '3rem' }}>{project.icon}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '2px 8px', borderRadius: '4px' }}>
            {project.category}
          </span>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)', marginTop: '1.5rem' }}>{project.num}</p>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.5rem 0' }}>{project.name}</h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', minHeight: '80px' }}>{project.desc}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.65rem', padding: '0.3rem 0.8rem', borderRadius: '4px',
              background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--border)'
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <a href={project.demo} style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>LIVE DEMO ↗</a>
          <a href={project.github} style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '0.8rem', opacity: 0.6 }}>CODE ⌥</a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Full Stack', 'AI/ML'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ padding: '8rem 5vw', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Crafted <span style={{ color: 'var(--accent)' }}>Solutions</span></h2>
            <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>A collection of my work in engineering and research.</p>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '8px 20px', borderRadius: '8px', border: 'none',
                  background: filter === cat ? 'var(--accent)' : 'transparent',
                  color: filter === cat ? '#000' : 'var(--text)',
                  cursor: 'pointer', transition: '0.3s', fontWeight: 600, fontSize: '0.8rem'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {filteredProjects.map((p, i) => (
            <ProjectCard key={p.name} project={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}