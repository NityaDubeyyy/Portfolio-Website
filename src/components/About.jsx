

import { useState } from "react";
import { ArrowRight, Repeat2 } from "lucide-react";

function CardFlip() {
  const [isFlipped, setIsFlipped] = useState(false);


  const faceStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: '24px',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(16px)',
  };

  return (
    <div
      style={{ perspective: '2000px', width: '320px', height: '400px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>

        {/* FRONT SIDE */}
        <div style={{
          ...faceStyle,
          background: 'rgba(15, 23, 42, 0.45)',
          backgroundImage: 'linear-gradient(to bottom, rgba(10, 15, 30, 0.7), rgba(15, 23, 42, 0.45))',
          padding: '2.5rem 2rem',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: isFlipped ? 0 : 2,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}>
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--accent)',
            boxShadow: '0 0 25px rgba(0, 245, 212, 0.4)',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--bg2)',
            transition: 'all 0.3s ease',
          }}>
            <img
              src="/profile.jpg"
              alt="Nitya Dubey"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%'
              }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-bright)' }}>Full Stack Dev</h3>
            <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '1px', marginTop: '4px' }}>AI & ML ENTHUSIAST</p>
          </div>
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'var(--accent)', opacity: 0.8 }}>
            <Repeat2 size={20} />
          </div>
        </div>

        {/* BACK SIDE */}
        <div style={{
          ...faceStyle,
          background: 'rgba(15, 23, 42, 0.6)',
          backgroundImage: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.65), rgba(10, 15, 30, 0.8))',
          padding: '2.5rem 2rem',
          transform: 'rotateY(180deg)',
          justifyContent: 'space-between',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}>
          <div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 700, 
              marginBottom: '1.25rem',
              color: 'var(--text-bright)',
              letterSpacing: '0.5px' 
            }}>Specializations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'MERN Stack Architecture', desc: 'Scalable web applications' },
                { name: 'AI & Machine Learning', desc: 'Intelligent integrations' },
                { name: 'Full-Stack Development', desc: 'End-to-end solutions' },
                { name: 'Java Data Structures', desc: 'Optimized algorithms' }
              ].map((spec) => (
                <div key={spec.name} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{
                    marginTop: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'rgba(0, 245, 212, 0.1)',
                    border: '1px solid rgba(0, 245, 212, 0.3)'
                  }}>
                    <ArrowRight size={10} color="var(--accent)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>{spec.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>{spec.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <a href="#projects" style={{
            padding: '12px',
            background: 'linear-gradient(135deg, var(--accent) 0%, #059669 100%)',
            borderRadius: '12px',
            textAlign: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
            color: '#030712',
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 245, 212, 0.2)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 245, 212, 0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 245, 212, 0.2)';
          }}>
            VIEW PROJECTS
          </a>
        </div>
      </div>
    </div>
  );
}


export default function About() {
  const stats = [
    { num: '3+', label: 'Years Exp' },
    { num: '10+', label: 'Projects' },
    { num: '10+', label: 'Tech Stack' },
  ];

  return (
    <section id="about" style={{
      padding: '8rem 10vw',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '6rem',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
    }}>
      <div>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem',
          letterSpacing: '-0.02em',
        }}>
          About <br />
          <em style={{
            color: 'var(--accent)',
            fontStyle: 'normal',
            textShadow: '0 0 30px rgba(0, 245, 212, 0.3)'
          }}>Me</em>
        </h2>

        <div style={{
          color: 'var(--muted)', 
          lineHeight: '1.8', 
          fontSize: '1.025rem',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          fontWeight: 400,
        }}>
          <p>
            I am an aspiring <strong style={{ color: 'var(--text-bright)', fontWeight: 600 }}>Software Development Engineer</strong> with hands-on experience building modern, scalable web applications. My expertise spans across <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>Full-Stack Development</strong>, specializing in the <strong style={{ color: 'var(--text-bright)', fontWeight: 600 }}>MERN Stack</strong> (MongoDB, Express, React, Node.js) and <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>AI-powered integrations</strong>.
          </p>
          <p>
            Proficient in <strong style={{ color: 'var(--text-bright)', fontWeight: 600 }}>Java, React.js, Express, MongoDB, and SQL</strong>, I focus on engineering robust solutions with RESTful APIs, secure authentication systems, and optimized database models. Underpinned by a strong foundation in <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>Data Structures & Algorithms</strong>, <strong style={{ color: 'var(--text-bright)', fontWeight: 600 }}>OOP</strong>, and <strong style={{ color: 'var(--text-bright)', fontWeight: 600 }}>DBMS</strong>, I have a passion for building impactful, user-centric products.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {stats.map(({ num, label }) => (
            <div key={label} style={{
              border: '1px solid var(--border)', 
              padding: '1.5rem 1rem',
              borderRadius: '16px', 
              textAlign: 'center',
              background: 'rgba(15, 23, 42, 0.45)', 
              backgroundImage: 'linear-gradient(to bottom, rgba(10, 15, 30, 0.5), rgba(15, 23, 42, 0.45))',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 245, 212, 0.15)';
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.transform = 'none';
              }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>{num}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CardFlip />
      </div>
    </section>
  );
}