import React, { useState } from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

const Resume = () => {
    const [hovered, setHovered] = useState(false);


    const resumeUrl = "/resume7.pdf";

    return (
        <section id="resume" style={{
            padding: '100px 5vw',
            background: 'var(--bg)',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '4rem' }}>
                    <p style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)',
                        letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '1rem'
                    }}>

                    </p>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900 }}>
                        Professional <span style={{ color: 'var(--accent)', WebkitTextStroke: '1px var(--accent)', WebkitTextFillColor: 'transparent' }}>Resume</span>
                    </h2>
                </div>

                <div
                    className="resume-container hoverable"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '24px',
                        padding: '3rem',
                        backdropFilter: 'blur(15px)',
                        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                        boxShadow: hovered ? 'var(--glow)' : 'none',
                        transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
                        cursor: 'default',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                        opacity: hovered ? 0.05 : 0,
                        transition: 'opacity 0.5s ease',
                        pointerEvents: 'none'
                    }} />

                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'var(--bg2)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem',
                            color: 'var(--accent)',
                            border: '1px solid var(--border)',
                            boxShadow: hovered ? '0 0 20px var(--accent)' : 'none',
                            transition: 'all 0.5s'
                        }}>
                            <FileText size={40} />
                        </div>

                        <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-bright)' }}>
                            Nitya
                        </h3>
                        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                            Currently pursuing  B.Tech in Computer Science at Sharda University.
                            View my full background in Full-Stack development Projects
                        </p>

                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>

                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hoverable"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '1rem 2rem',
                                    background: 'var(--accent)',
                                    color: '#000',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    transition: 'all 0.3s',
                                    fontSize: '0.9rem',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase'
                                }}
                            >
                                <ExternalLink size={20} /> View Resume
                            </a>


                            <a
                                href={resumeUrl}
                                download="Nitya_Resume.pdf"
                                className="hoverable"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '1rem 2rem',
                                    background: 'transparent',
                                    color: 'var(--text)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    transition: 'all 0.3s',
                                    fontSize: '0.9rem',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase'
                                }}
                            >
                                <Download size={20} /> Download PDF
                            </a>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    {/* Contact: nityadubeyyy@gmail.com [cite: 1] */}
                </div>
            </div>

            <style>
                {`
                    .resume-container:hover {
                        border-color: var(--accent);
                    }
                    
                    @media (max-width: 768px) {
                        .resume-container {
                            padding: 2rem;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default Resume;