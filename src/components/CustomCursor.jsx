// import { useEffect, useRef, useState } from 'react';

// export default function CustomCursor({ mousePos }) {
//   const ringRef = useRef(null);
//   const rxRef = useRef(0);
//   const ryRef = useRef(0);
//   const [hovered, setHovered] = useState(false);
//   const [pos, setPos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMove = (e) => {
//       setPos({ x: e.clientX, y: e.clientY });
//       mousePos.current = { x: e.clientX, y: e.clientY };
//     };
//     window.addEventListener('mousemove', handleMove);
//     return () => window.removeEventListener('mousemove', handleMove);
//   }, [mousePos]);

//   useEffect(() => {
//     let animId;
//     function animCursor() {
//       rxRef.current += (pos.x - rxRef.current) * 0.12;
//       ryRef.current += (pos.y - ryRef.current) * 0.12;
//       if (ringRef.current) {
//         ringRef.current.style.left = rxRef.current + 'px';
//         ringRef.current.style.top = ryRef.current + 'px';
//       }
//       animId = requestAnimationFrame(animCursor);
//     }
//     animCursor();
//     return () => cancelAnimationFrame(animId);
//   }, [pos]);

//   useEffect(() => {
//     const targets = document.querySelectorAll('a, button, .hoverable');
//     const enter = () => setHovered(true);
//     const leave = () => setHovered(false);
//     targets.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });
//     return () => targets.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
//   });

//   return (
//     <>
//       <div style={{
//         width: hovered ? 6 : 12,
//         height: hovered ? 6 : 12,
//         background: 'var(--accent)',
//         borderRadius: '50%',
//         position: 'fixed',
//         pointerEvents: 'none',
//         zIndex: 9999,
//         left: pos.x,
//         top: pos.y,
//         transform: 'translate(-50%, -50%)',
//         transition: 'width 0.2s, height 0.2s',
//         boxShadow: '0 0 15px var(--accent)',
//       }} />
//       <div ref={ringRef} style={{
//         width: hovered ? 60 : 36,
//         height: hovered ? 60 : 36,
//         border: `1.5px solid ${hovered ? 'rgba(0,245,212,0.8)' : 'rgba(0,245,212,0.5)'}`,
//         borderRadius: '50%',
//         position: 'fixed',
//         pointerEvents: 'none',
//         zIndex: 9998,
//         transform: 'translate(-50%, -50%)',
//         transition: 'width 0.2s, height 0.2s, border-color 0.2s',
//       }} />
//     </>
//   );
// }


import { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ mousePos }) {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  // Using refs for coordinates to avoid heavy re-renders during animation
  const cursorCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });

  const [hovered, setHovered] = useState(false);

  // 1. Optimized Mouse Move
  useEffect(() => {
    const handleMove = (e) => {
      cursorCoords.current = { x: e.clientX, y: e.clientY };
      if (mousePos) mousePos.current = { x: e.clientX, y: e.clientY };

      // Update the center dot immediately for zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mousePos]);

  // 2. High-Performance Animation Loop (LERP)
  useEffect(() => {
    let animId;
    const render = () => {
      // Smoothing factor: 0.15 (Adjust for more/less 'lag')
      ringCoords.current.x += (cursorCoords.current.x - ringCoords.current.x) * 0.15;
      ringCoords.current.y += (cursorCoords.current.y - ringCoords.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringCoords.current.x}px, ${ringCoords.current.y}px) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // 3. Optimized Event Delegation for Hover
  useEffect(() => {
    const handleOver = (e) => {
      if (e.target.closest('a, button, .hoverable, input, textarea')) setHovered(true);
    };
    const handleOut = (e) => {
      if (e.target.closest('a, button, .hoverable, input, textarea')) setHovered(false);
    };

    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <>
      {/* The Core Dot - Sharp and Reactive */}
      <div
        ref={dotRef}
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent)', // Your accent color
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: hovered ? '0 0 10px var(--accent)' : 'none',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s',
          transform: 'translate(-100px, -100px)', // Start off-screen
        }}
      />

      {/* The Outer Ring - Smooth and Aesthetic */}
      <div
        ref={ringRef}
        style={{
          width: hovered ? '60px' : '30px',
          height: hovered ? '60px' : '30px',
          border: '2px solid var(--accent)',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.3s ease-out, height 0.3s ease-out, border-color 0.3s',
          opacity: 0.6,
          backgroundColor: hovered ? 'var(--accent)' : 'transparent', // Using accent for fill
          transform: 'translate(-100px, -100px)',
        }}
      />
    </>
  );
}