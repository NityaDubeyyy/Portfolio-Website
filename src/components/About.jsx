

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
          background: 'var(--card)',
          backgroundImage: 'linear-gradient(to bottom, var(--bg2), var(--card))',
          padding: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: isFlipped ? 0 : 2,
        }}>
          <div style={{ fontSize: '6rem', marginBottom: '1.5rem' }}>👩‍💻</div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)' }}>Full Stack Dev</h3>
            <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>AI & ML ENTHUSIAST</p>
          </div>
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'var(--accent)' }}>
            <Repeat2 size={20} />
          </div>
        </div>

        {/* BACK SIDE */}
        <div style={{
          ...faceStyle,
          background: 'var(--card)',
          padding: '2rem',
          transform: 'rotateY(180deg)',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Specializations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {['MERN Stack Architecture', 'AI & ML', 'Full Stack Dev', 'Java Data Structures'].map((skill) => (
                <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--muted)' }}>
                  <ArrowRight size={14} color="var(--accent)" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div style={{
            padding: '12px',
            background: 'var(--bg2)',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid var(--border)',
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)' }}>VIEW PROJECTS</span>
          </div>
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

        <p style={{
          color: 'var(--muted)', lineHeight: 1.9, fontSize: '0.95rem',
          fontFamily: 'var(--font-mono)', marginBottom: '2rem',
        }}>
          I am a Full Stack Developer and AI/ML Enthusiast dedicated to building the next generation of intelligent applications.
          My approach combines the logic of Java-based Data Structures with the agility of modern JavaScript frameworks.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {stats.map(({ num, label }) => (
            <div key={label} style={{
              border: '1px solid var(--border)', padding: '1.2rem',
              borderRadius: '6px', textAlign: 'center',
              background: 'var(--card)', backdropFilter: 'blur(10px)',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 212, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{num}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</div>
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