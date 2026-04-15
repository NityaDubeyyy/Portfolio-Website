import { useRef } from 'react';
import './styles/globals.css';

import StarCanvas from './components/StarCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Resume from './components/Resume';

function App() {
  const mousePos = useRef({ x: 0, y: 0 });

  return (
    <>
      {/* Background Effects */}
      <StarCanvas mousePos={mousePos} />

      {/* Floating Orbs */}
      <div style={{
        position: 'fixed', width: 500, height: 500,
        background: 'var(--orb1)',
        borderRadius: '50%', filter: 'blur(120px)',
        top: -100, right: -100, zIndex: 0, pointerEvents: 'none',
        animation: 'orbFloat 8s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'fixed', width: 400, height: 400,
        background: 'var(--orb2)',
        borderRadius: '50%', filter: 'blur(120px)',
        bottom: '20%', left: -100, zIndex: 0, pointerEvents: 'none',
        animation: 'orbFloat 8s ease-in-out 3s infinite alternate',
      }} />

      {/* Custom Cursor */}
      <CustomCursor mousePos={mousePos} />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Layout */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />

        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
