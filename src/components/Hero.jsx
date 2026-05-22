import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL, CONTACT } from '../data/portfolio';

function useTypewriter(words) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx];
    let t;
    if (!deleting) {
      if (displayed.length < word.length) t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90);
      else t = setTimeout(() => setDeleting(true), 1800);
    } else {
      if (displayed.length > 0) t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 55);
      else { setDeleting(false); setWordIdx(i => (i + 1) % words.length); }
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIdx, words]);
  return displayed;
}

export default function Hero() {
  const typed = useTypewriter(PERSONAL.roles);
  const tiltRef = useRef(null);
  const chip1Ref = useRef(null);
  const chip2Ref = useRef(null);
  const chip3Ref = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const currX = useRef(0), currY = useRef(0);
  const targetX = useRef(0), targetY = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const onMove = (e) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      targetX.current = ((e.clientY - cy) / cy) * 12;
      targetY.current = -((e.clientX - cx) / cx) * 12;
      const mx = e.clientX / window.innerWidth - 0.5;
      const my = e.clientY / window.innerHeight - 0.5;
      if (chip1Ref.current) chip1Ref.current.style.transform = `translate(${mx * 10}px,${my * 10}px)`;
      if (chip2Ref.current) chip2Ref.current.style.transform = `translate(${mx * 16}px,${my * 16}px)`;
      if (chip3Ref.current) chip3Ref.current.style.transform = `translate(${mx * 8}px,${my * 8}px)`;
      if (ring1Ref.current) ring1Ref.current.style.transform = `translate(calc(-50% + ${mx * 6}px),calc(-50% + ${my * 6}px))`;
      if (ring2Ref.current) ring2Ref.current.style.transform = `translate(calc(-50% + ${mx * 10}px),calc(-50% + ${my * 10}px))`;
      if (ring3Ref.current) ring3Ref.current.style.transform = `translate(calc(-50% + ${mx * 14}px),calc(-50% + ${my * 14}px))`;
    };
    const animTilt = () => {
      currX.current += (targetX.current - currX.current) * 0.06;
      currY.current += (targetY.current - currY.current) * 0.06;
      if (tiltRef.current) tiltRef.current.style.transform = `perspective(800px) rotateX(${currX.current}deg) rotateY(${currY.current}deg)`;
      rafRef.current = requestAnimationFrame(animTilt);
    };
    animTilt();
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  const anim = (d = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ${d}s ease, transform 0.7s ${d}s ease`,
  });

  const chipStyle = (top, bottom, left, right, color, borderColor, animDelay) => ({
    position: 'absolute', top, bottom, left, right,
    background: 'rgba(6,1,15,0.85)', backdropFilter: 'blur(16px)',
    border: `1px solid ${borderColor}`, borderRadius: 14,
    padding: '0.45rem 0.9rem', fontSize: '0.72rem', fontWeight: 700,
    color, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem',
    zIndex: 3, animation: `floatY 3s ${animDelay} ease-in-out infinite`,
    transition: 'transform 0.12s ease-out',
  });

  return (
    <section id="hero" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(5rem,10vw,8rem) clamp(1.25rem,4vw,2.5rem) 4rem',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)',
        gap: 'clamp(2rem,5vw,4rem)', alignItems: 'center',
      }}>

        {/* LEFT */}
        <div>
          <div style={{ ...anim(0), display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.22)',
            padding: '0.4rem 1rem', borderRadius: 999, fontSize: '0.7rem', fontWeight: 600,
            color: '#FFD700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <span style={{ width: 6, height: 6, background: '#2dd4bf', borderRadius: '50%',
              animation: 'pulseDot 2s infinite', display: 'inline-block' }} />
            {PERSONAL.tagline}
          </div>

          <h1 style={{ ...anim(0.1), fontFamily: "'Playfair Display',serif", fontWeight: 900,
            fontSize: 'clamp(2.6rem,5.5vw,4.8rem)', lineHeight: 1.05, marginBottom: '0.75rem' }}>
            Hi, I'm<br />
            <em style={{ fontStyle: 'italic',
              background: 'linear-gradient(135deg,#FFD700,#a78bfa,#2dd4bf)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto', animation: 'gradientShift 4s ease infinite' }}>
              {PERSONAL.name}
            </em>
          </h1>

          <div style={{ ...anim(0.2), fontFamily: "'Orbitron',monospace", fontSize: '0.7rem',
            letterSpacing: '0.12em', color: '#2dd4bf', marginBottom: '1.25rem',
            textTransform: 'uppercase', minHeight: '1.4rem' }}>
            {typed}<span style={{ borderRight: '2px solid #2dd4bf', marginLeft: 2,
              animation: 'blink 1s infinite', display: 'inline-block' }} />
          </div>

          <p style={{ ...anim(0.3), fontSize: 'clamp(0.88rem,1.5vw,0.96rem)', lineHeight: 1.9,
            color: 'rgba(245,240,255,0.55)', maxWidth: 460, marginBottom: '2rem' }}>
            {PERSONAL.bio}
          </p>

          <div style={{ ...anim(0.4), display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '0.8rem 1.9rem', borderRadius: 999, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#FFD700,#b8860b)', color: '#000', fontWeight: 700,
                fontSize: '0.9rem', boxShadow: '0 0 24px rgba(255,215,0,0.3)', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 0 40px rgba(255,215,0,0.5)'; }}
              onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 0 24px rgba(255,215,0,0.3)'; }}>
              View My Work ✦
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '0.8rem 1.9rem', borderRadius: 999, cursor: 'pointer',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#f5f0ff', fontWeight: 500, fontSize: '0.9rem', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.target.style.borderColor = '#2dd4bf'; e.target.style.color = '#2dd4bf'; }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.color = '#f5f0ff'; }}>
              Hire Me
            </button>
          </div>

          <div style={{ ...anim(0.5), display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {PERSONAL.stats.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div style={{ width: 1, background: 'rgba(255,215,0,0.12)', alignSelf: 'stretch' }} />}
                <div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.9rem', fontWeight: 900,
                    background: 'linear-gradient(135deg,#FFD700,#a78bfa)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.num}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(245,240,255,0.55)', marginTop: '0.1rem' }}>{s.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div style={{ ...anim(0.6), display: 'flex', gap: '0.7rem' }}>
            {[
              { icon: '🎨', href: CONTACT.behance, label: 'Behance' },
              { icon: '💻', href: CONTACT.github, label: 'GitHub' },
              { icon: '💼', href: CONTACT.linkedin, label: 'LinkedIn' },
              { icon: '✉️', href: `mailto:${CONTACT.email}`, label: 'Email' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                style={{ width: 38, height: 38, borderRadius: 10, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '1rem', transition: 'all 0.25s', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,215,0,0.15)'; e.currentTarget.style.borderColor = '#FFD700'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = ''; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — ANIMATED PHOTO */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeUp 0.8s 0.3s ease both' }}>
          <div ref={tiltRef} style={{ position: 'relative', transformStyle: 'preserve-3d' }}>

            {/* PULSE RINGS */}
            {[
              { size: 300, color: 'rgba(255,215,0,0.1)', ref: ring1Ref, delay: '0s' },
              { size: 350, color: 'rgba(45,212,191,0.07)', ref: ring2Ref, delay: '0.6s' },
              { size: 400, color: 'rgba(124,58,237,0.05)', ref: ring3Ref, delay: '1.2s' },
            ].map((r, i) => (
              <div key={i} ref={r.ref} style={{
                position: 'absolute', width: r.size, height: r.size, borderRadius: '50%',
                border: `1px solid ${r.color}`, top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                animation: `ringPulse 4s ${r.delay} ease-in-out infinite`,
                pointerEvents: 'none', transition: 'transform 0.15s ease-out',
              }} />
            ))}

            {/* SPINNING BORDER */}
            <div style={{
              position: 'relative',
              width: 'clamp(220px,25vw,280px)', height: 'clamp(220px,25vw,280px)',
              borderRadius: '50%', padding: 4,
              background: 'conic-gradient(from 0deg,#FFD700,#a78bfa,#2dd4bf,#FFD700)',
              animation: 'spinBorder 4s linear infinite',
              boxShadow: '0 0 40px rgba(255,215,0,0.2), 0 0 80px rgba(124,58,237,0.12)',
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%',
                background: '#06010f', animation: 'spinBorderReverse 4s linear infinite',
                overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {PERSONAL.heroImage ? (
                  <img src={PERSONAL.heroImage} alt={PERSONAL.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%',
                    background: 'linear-gradient(135deg,#1a0535,#051a20,#0d0a25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'clamp(4rem,8vw,6rem)' }}>👩img</div>
                )}
              </div>
            </div>

            {/* FLOATING CHIPS */}
            <div ref={chip1Ref} style={{ position: 'absolute', top: -5, right: -20, transition: 'transform 0.12s ease-out' }}>
              <div style={chipStyle(undefined, undefined, undefined, undefined, '#FFD700', 'rgba(255,215,0,0.3)', '0s')}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFD700', display: 'inline-block' }} />
                Figma Expert ✦
              </div>
            </div>
            <div ref={chip2Ref} style={{ position: 'absolute', bottom: 25, left: -30, transition: 'transform 0.12s ease-out' }}>
              <div style={chipStyle(undefined, undefined, undefined, undefined, '#2dd4bf', 'rgba(45,212,191,0.3)', '1s')}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2dd4bf', display: 'inline-block' }} />
                Open to Work
              </div>
            </div>
            <div ref={chip3Ref} style={{ position: 'absolute', top: 60, left: -35, transition: 'transform 0.12s ease-out' }}>
              <div style={chipStyle(undefined, undefined, undefined, undefined, '#a78bfa', 'rgba(167,139,250,0.3)', '2s')}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', display: 'inline-block' }} />
                ⚛️ React Dev
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseDot{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.6);opacity:0.5;}}
        @keyframes gradientShift{0%,100%{background-position:0%;}50%{background-position:100%;}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
        @keyframes spinBorder{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes spinBorderReverse{from{transform:rotate(0deg);}to{transform:rotate(-360deg);}}
        @keyframes ringPulse{0%,100%{opacity:0.4;transform:translate(-50%,-50%) scale(1);}50%{opacity:1;transform:translate(-50%,-50%) scale(1.04);}}
        @media(max-width:768px){
          #hero>div{grid-template-columns:1fr !important;}
          #hero>div>div:last-child{display:none !important;}
        }
      `}</style>
    </section>
  );
}
