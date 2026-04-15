import { useEffect, useRef } from 'react';

export default function StarCanvas({ mousePos }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function rand(min, max) { return Math.random() * (max - min) + min; }

    class Star {
      constructor() { this.init(W, H); }
      init(w, h) {
        this.x = rand(0, w);
        this.y = rand(0, h);
        this.z = rand(0.1, 1);
        this.size = rand(0.3, 2) * this.z;
        this.speedX = rand(-0.3, 0.3) * this.z;
        this.speedY = rand(-0.3, 0.3) * this.z;
        this.opacity = rand(0.3, 1) * this.z;
        this.twinkleSpeed = rand(0.005, 0.02);
        this.twinkleDir = 1;
        const r = Math.random();
        if (r < 0.6) this.colorBase = '226,232,240';
        else if (r < 0.8) this.colorBase = '0,245,212';
        else this.colorBase = '124,58,237';
      }
      update(mx, my) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.twinkleSpeed * this.twinkleDir;
        if (this.opacity > 1 || this.opacity < 0.1) this.twinkleDir *= -1;
        if (this.x < 0 || this.x > W) this.speedX *= -1;
        if (this.y < 0 || this.y > H) this.speedY *= -1;
        const dx = (mx - this.x) * 0.00003 * this.z;
        const dy = (my - this.y) * 0.00003 * this.z;
        this.x += dx;
        this.y += dy;
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.abs(this.opacity);
        ctx.fillStyle = `rgba(${this.colorBase},${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class ShootingStar {
      constructor(w, h) { this.W = w; this.H = h; this.reset(); }
      reset() {
        this.x = rand(0, this.W * 0.7);
        this.y = rand(0, this.H * 0.3);
        this.len = rand(80, 200);
        this.speed = rand(8, 16);
        this.opacity = 1;
        this.active = false;
        this.timer = rand(3000, 8000);
        this.born = Date.now();
      }
      update() {
        const now = Date.now();
        if (!this.active && now - this.born > this.timer) this.active = true;
        if (!this.active) return;
        this.x += this.speed;
        this.y += this.speed * 0.5;
        this.opacity -= 0.03;
        if (this.opacity <= 0) this.reset();
      }
      draw(ctx) {
        if (!this.active) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        const grad = ctx.createLinearGradient(this.x, this.y, this.x - this.len, this.y - this.len * 0.5);
        grad.addColorStop(0, 'rgba(0,245,212,1)');
        grad.addColorStop(1, 'rgba(0,245,212,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.len, this.y - this.len * 0.5);
        ctx.stroke();
        ctx.restore();
      }
    }

    starsRef.current = Array.from({ length: 250 }, () => new Star());
    shootingStarsRef.current = [new ShootingStar(W, H), new ShootingStar(W, H)];

    function drawConnections(ctx, stars) {
      const maxDist = 100;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = 'rgba(0,245,212,1)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      const mx = mousePos.current?.x || 0;
      const my = mousePos.current?.y || 0;
      starsRef.current.forEach(s => { s.update(mx, my); s.draw(ctx); });
      drawConnections(ctx, starsRef.current);
      shootingStarsRef.current.forEach(s => { s.update(); s.draw(ctx); });
      animRef.current = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
