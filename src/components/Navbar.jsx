import React, { useState, useEffect } from 'react';
import { PERSONAL } from '../data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = ['about', 'skills', 'projects', 'contact'];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      padding: '1rem 2.5rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled ? 'rgba(6,1,15,0.92)' : 'rgba(6,1,15,0.7)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255,215,0,0.1)',
      transition: 'background 0.3s',
    }}>
      {/* LOGO */}
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic', fontWeight: 900, fontSize: '1.6rem',
        background: 'linear-gradient(135deg, #FFD700, #a78bfa, #2dd4bf)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        cursor: 'pointer',
      }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {PERSONAL.logo}
      </div>

      {/* DESKTOP LINKS */}
      <div style={{ display: 'flex', gap: '2rem' }} className="hide-mobile-nav">
        {navLinks.map(id => (
          <button key={id} onClick={() => scrollTo(id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(245,240,255,0.55)', fontSize: '0.85rem', fontWeight: 500,
            letterSpacing: '0.03em', transition: 'color 0.3s',
            fontFamily: "'DM Sans', sans-serif",
          }}
            onMouseEnter={e => e.target.style.color = '#FFD700'}
            onMouseLeave={e => e.target.style.color = 'rgba(245,240,255,0.55)'}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
      </div>

      {/* MOBILE HAMBURGER */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: 'none', background: 'none', border: 'none',
        color: '#FFD700', fontSize: '1.5rem', cursor: 'pointer',
      }} className="hamburger">☰</button>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0,
          background: 'rgba(6,1,15,0.97)', backdropFilter: 'blur(24px)',
          padding: '1.5rem', display: 'flex', flexDirection: 'column',
          gap: '1rem', borderBottom: '1px solid rgba(255,215,0,0.1)', zIndex: 99,
        }}>
          {navLinks.map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(245,240,255,0.8)', fontSize: '1rem', fontWeight: 500,
              textAlign: 'left', padding: '0.5rem 0',
              fontFamily: "'DM Sans', sans-serif",
            }}>{id.charAt(0).toUpperCase() + id.slice(1)}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
