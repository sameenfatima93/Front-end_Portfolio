import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ABOUT } from '../data/portfolio';

function MagneticCard({ children, style }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    ref.current.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  }, []);
  return (
    <div ref={ref} className="glass" style={style} onMouseMove={onMove}>
      {children}
    </div>
  );
}

function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setVisible(true), delay);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

export default function About() {
  const [leftRef, leftVis] = useReveal(0);
  const [rightRef, rightVis] = useReveal(150);

  return (
    <section id="about" style={{
      padding: '6rem clamp(1.25rem,4vw,2.5rem)',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* HEADER */}
        <div className="sec-tag">{ABOUT.greeting}</div>
        <h2 className="sec-h">About <em>Me</em></h2>
        <div className="sec-bar" />

        {/* MAIN GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: 'clamp(2rem,5vw,4rem)',
          alignItems: 'start',
          marginBottom: '3rem',
        }} className="about-grid">

          {/* LEFT — TEXT */}
          <div ref={leftRef} style={{
            opacity: leftVis ? 1 : 0,
            transform: leftVis ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.7s ease',
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.3rem,2.5vw,1.8rem)',
              fontWeight: 900, fontStyle: 'italic',
              marginBottom: '1.5rem', lineHeight: 1.2,
              background: 'linear-gradient(135deg,#FFD700,#a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{ABOUT.headline}</h3>

            {[ABOUT.bio1, ABOUT.bio2, ABOUT.bio3].map((bio, i) => (
              <p key={i} style={{
                fontSize: 'clamp(0.88rem,1.4vw,0.96rem)',
                lineHeight: 1.9, color: 'rgba(245,240,255,0.65)',
                marginBottom: '1.1rem',
              }}>{bio}</p>
            ))}

            {/* PERSONAL INFO CHIPS */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
              {[
                { icon: '📍', text: 'Karachi, Pakistan' },
                { icon: '🎓', text: 'SMIT — MERN Stack' },
                { icon: '💼', text: 'Open to Work' },
                { icon: '🌐', text: 'Remote Friendly' },
              ].map(c => (
                <div key={c.text} style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,215,0,0.15)',
                  borderRadius: 999, padding: '0.35rem 0.9rem',
                  fontSize: '0.78rem', fontWeight: 500,
                  color: 'rgba(245,240,255,0.8)',
                }}>
                  <span>{c.icon}</span>{c.text}
                </div>
              ))}
            </div>

            {/* DOWNLOAD CV BUTTON */}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/resumes/sameen-uiux-resume.pdf" download style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.8rem 1.8rem', borderRadius: 999,
                background: 'linear-gradient(135deg,#FFD700,#b8860b)',
                color: '#000', fontWeight: 700, fontSize: '0.88rem',
                textDecoration: 'none', transition: 'all 0.3s',
                boxShadow: '0 0 24px rgba(255,215,0,0.25)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(255,215,0,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 24px rgba(255,215,0,0.25)'; }}>
                ↓ Download Resume
              </a>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.8rem 1.8rem', borderRadius: 999, cursor: 'pointer',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
                  color: '#f5f0ff', fontWeight: 500, fontSize: '0.88rem', transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2dd4bf'; e.currentTarget.style.color = '#2dd4bf'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#f5f0ff'; }}>
                Let's Talk →
              </button>
            </div>
          </div>

          {/* RIGHT — HIGHLIGHT CARDS */}
          <div ref={rightRef} style={{
            opacity: rightVis ? 1 : 0,
            transform: rightVis ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.7s ease 0.15s',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
          }}>
            {ABOUT.highlights.map((h, i) => (
              <MagneticCard key={h.title} style={{
                padding: '1.5rem 1.25rem',
                opacity: rightVis ? 1 : 0,
                transform: rightVis ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${0.2 + i * 0.1}s`,
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{h.icon}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem',
                  color: '#f5f0ff',
                }}>{h.title}</div>
                <p style={{
                  fontSize: '0.78rem', color: 'rgba(245,240,255,0.55)', lineHeight: 1.7,
                }}>{h.desc}</p>
              </MagneticCard>
            ))}
          </div>
        </div>

        {/* BOTTOM STATS BAR */}
        <div className="glass" style={{
          padding: '2rem clamp(1.5rem,4vw,3rem)',
          display: 'flex', justifyContent: 'space-around',
          flexWrap: 'wrap', gap: '1.5rem',
        }}>
          {[
            { num: '15+', label: 'Projects Completed', color: '#FFD700' },
            { num: '3',   label: 'Real Internships', color: '#a78bfa' },
            { num: '8+',  label: 'Live Websites', color: '#2dd4bf' },
            { num: '100%', label: 'Colleagues & Owner Satisfaction', color: '#FFD700' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 900,
                background: `linear-gradient(135deg,${s.color},#a78bfa)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{s.num}</div>
              <div style={{
                fontSize: '0.78rem', color: 'rgba(245,240,255,0.55)',
                marginTop: '0.25rem', fontWeight: 500,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-grid > div:last-child > div { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:480px) {
          .about-grid > div:last-child > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
