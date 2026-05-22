import { useEffect, useRef } from 'react';

export default function MouseEffect() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const spotlightRef = useRef(null);
  const trailsRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Create cursor dot
    const cursor = document.createElement('div');
    cursor.id = 'cursor-dot';
    cursor.style.cssText = `
      position:fixed;width:10px;height:10px;
      background:linear-gradient(135deg,#FFD700,#2dd4bf);
      border-radius:50%;pointer-events:none;z-index:99999;
      transform:translate(-50%,-50%);
      transition:width 0.2s,height 0.2s,background 0.2s;
      mix-blend-mode:difference;
    `;
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    // Create follower ring
    const ring = document.createElement('div');
    ring.id = 'cursor-ring';
    ring.style.cssText = `
      position:fixed;width:36px;height:36px;
      border:1.5px solid rgba(255,215,0,0.6);
      border-radius:50%;pointer-events:none;z-index:99998;
      transform:translate(-50%,-50%);
      transition:width 0.3s,height 0.3s,border-color 0.3s;
    `;
    document.body.appendChild(ring);
    followerRef.current = ring;

    // Create spotlight glow that follows mouse
    const spotlight = document.createElement('div');
    spotlight.id = 'cursor-spotlight';
    spotlight.style.cssText = `
      position:fixed;width:500px;height:500px;
      background:radial-gradient(circle,rgba(124,58,237,0.06) 0%,rgba(45,212,191,0.03) 40%,transparent 70%);
      border-radius:50%;pointer-events:none;z-index:0;
      transform:translate(-50%,-50%);
      transition:opacity 0.3s;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    // Create trail dots
    const trails = [];
    for (let i = 0; i < 8; i++) {
      const trail = document.createElement('div');
      const size = 6 - i * 0.5;
      trail.style.cssText = `
        position:fixed;width:${size}px;height:${size}px;
        background:rgba(255,215,0,${0.5 - i * 0.06});
        border-radius:50%;pointer-events:none;z-index:99997;
        transform:translate(-50%,-50%);
        transition:opacity 0.3s;
      `;
      document.body.appendChild(trail);
      trails.push({ el: trail, x: 0, y: 0 });
    }
    trailsRef.current = trails;

    // Track mouse
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Move cursor dot instantly
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      // Move spotlight
      spotlight.style.left = e.clientX + 'px';
      spotlight.style.top = e.clientY + 'px';
    };

    // Animate follower & trails smoothly
    const animate = () => {
      // Smooth follower
      follower.current.x += (mouse.current.x - follower.current.x) * 0.1;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.1;
      ring.style.left = follower.current.x + 'px';
      ring.style.top = follower.current.y + 'px';

      // Trail chain — each follows the previous
      trails.forEach((t, i) => {
        const prev = i === 0 ? follower.current : trails[i - 1];
        t.x += (prev.x - t.x) * (0.18 - i * 0.015);
        t.y += (prev.y - t.y) * (0.18 - i * 0.015);
        t.el.style.left = t.x + 'px';
        t.el.style.top = t.y + 'px';
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Hover effects on interactive elements
    const grow = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.background = 'linear-gradient(135deg,#a78bfa,#2dd4bf)';
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(167,139,250,0.8)';
    };
    const shrink = () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursor.style.background = 'linear-gradient(135deg,#FFD700,#2dd4bf)';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(255,215,0,0.6)';
    };
    const addHover = () => {
      document.querySelectorAll('a,button,.glass,.proj-card,.skill-card').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    };
    addHover();
    // Re-apply after DOM updates
    const interval = setInterval(addHover, 2000);

    // Parallax effect on sections
    const onScroll = () => {
      const sections = document.querySelectorAll('section, [id]');
      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          const progress = 1 - rect.top / window.innerHeight;
          sec.style.setProperty('--parallax', `${progress * 20}px`);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    window.addEventListener('mousemove', onMove);

    // Hide default cursor
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'cursor-style';
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
      clearInterval(interval);
      cursor.remove();
      ring.remove();
      spotlight.remove();
      trails.forEach(t => t.el.remove());
      document.body.style.cursor = '';
      document.getElementById('cursor-style')?.remove();
    };
  }, []);

  return null; // No JSX — all DOM manipulation
}
