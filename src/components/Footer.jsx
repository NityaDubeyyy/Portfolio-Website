export default function Footer() {
  return (
    <footer style={{
      padding: '2rem 10vw',
      borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)',
      position: 'relative', zIndex: 1,
    }}>
      {/* <span>// Designed &amp;</span> */}
      <span>
        Nitya Dubey · <span style={{ color: 'var(--accent)' }}>2026</span>
      </span>
    </footer>
  );
}
