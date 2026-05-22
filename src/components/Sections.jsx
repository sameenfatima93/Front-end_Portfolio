import React, { useEffect, useRef, useState } from 'react';
import { SKILLS, PROJECTS, RESUMES, CONTACT } from '../data/portfolio';

/* ── STARS ── */
export function Stars() {
  useEffect(() => {
    const container = document.getElementById('stars-bg');
    if (!container || container.children.length > 0) return;
    for (let i = 0; i < 120; i++) {
      const s = document.createElement('div');
      const size = Math.random() * 2.5 + 0.5;
      s.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:#fff;border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:twinkle ${2+Math.random()*4}s ${Math.random()*4}s infinite;`;
      container.appendChild(s);
    }
  }, []);
  return <div id="stars-bg" style={{ position:'fixed',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden' }} />;
}

/* ── REVEAL HOOK ── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

/* ── SKILL CARD ── */
function SkillCard({ skill, delay }) {
  const [ref, visible] = useReveal(delay);
  const [hovered, setHovered] = useState(false);
  const tagColors = { purple:'rgba(124,58,237,0.15)', teal:'rgba(45,212,191,0.1)', gold:'rgba(255,215,0,0.08)' };
  const textColors = { purple:'#a78bfa', teal:'#2dd4bf', gold:'#FFD700' };
  const borderColors = { purple:'rgba(124,58,237,0.25)', teal:'rgba(45,212,191,0.2)', gold:'rgba(255,215,0,0.2)' };
  return (
    <div ref={ref} className="glass"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding:'1.5rem', opacity: visible ? 1 : 0,
        transform: hovered ? 'translateY(-5px)' : visible ? 'translateY(0)' : 'translateY(24px)',
        transition:'all 0.5s ease',
      }}>
      <div style={{ fontSize:'1.8rem', marginBottom:'0.75rem' }}>{skill.icon}</div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'1.05rem', marginBottom:'0.4rem' }}>{skill.name}</div>
      <p style={{ fontSize:'0.8rem', color:'rgba(245,240,255,0.55)', lineHeight:1.65, marginBottom:'0.9rem' }}>{skill.desc}</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
        {skill.tags.map(t => (
          <span key={t.label} style={{
            padding:'0.18rem 0.55rem', borderRadius:6, fontSize:'0.68rem', fontWeight:600,
            background: tagColors[t.color], border:`1px solid ${borderColors[t.color]}`,
            color: textColors[t.color],
          }}>{t.label}</span>
        ))}
      </div>
    </div>
  );
}

/* ── PROJECT CARD ── */
function ProjectCard({ project, delay }) {
  const [ref, visible] = useReveal(delay);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} className="glass"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: hovered ? 'translateY(-6px)' : visible ? 'translateY(0)' : 'translateY(24px)',
        transition:'all 0.5s ease',
      }}>
      {/* THUMBNAIL */}
      <div style={{
        height:155, display:'flex', alignItems:'center', justifyContent:'center',
        background: project.bg, position:'relative', overflow:'hidden',
      }}>
        {project.useImage && project.emoji ? (
          <img src={project.emoji} alt={project.title}
            style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        ) : (
          <span style={{ fontSize:'3rem' }}>{project.emoji}</span>
        )}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to bottom,transparent 50%,rgba(6,1,15,0.8))',
        }}/>
        <span style={{
          position:'absolute', top:10, left:10,
          padding:'0.25rem 0.6rem', borderRadius:8,
          fontSize:'0.65rem', fontWeight:700,
          background:'rgba(255,215,0,0.15)', border:'1px solid rgba(255,215,0,0.3)',
          color:'#FFD700',
        }}>{project.badge}</span>
      </div>

      {/* BODY */}
      <div style={{ padding:'1.25rem' }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'1.05rem', marginBottom:'0.4rem' }}>{project.title}</div>
        <p style={{ fontSize:'0.8rem', color:'rgba(245,240,255,0.55)', lineHeight:1.65, marginBottom:'0.85rem' }}>{project.desc}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.3rem', marginBottom:'1rem' }}>
          {project.techs.map(t => (
            <span key={t} style={{
              padding:'0.15rem 0.5rem', borderRadius:5, fontSize:'0.65rem', fontWeight:600,
              background:'rgba(255,255,255,0.05)', color:'rgba(245,240,255,0.55)',
              border:'1px solid rgba(255,255,255,0.08)',
            }}>{t}</span>
          ))}
        </div>
        {project.inProgress ? (
          <div style={{
            textAlign:'center', padding:'0.55rem', borderRadius:10,
            fontSize:'0.8rem', fontWeight:700,
            background:'rgba(255,255,255,0.04)', color:'rgba(245,240,255,0.55)',
            border:'1px solid rgba(255,255,255,0.08)',
          }}>In Progress 🚀</div>
        ) : project.liveLink ? (
          <a href={project.liveLink} target="_blank" rel="noreferrer" style={{
            display:'block', textAlign:'center', padding:'0.55rem', borderRadius:10,
            fontSize:'0.8rem', fontWeight:700,
            background:'linear-gradient(135deg,rgba(124,58,237,0.6),rgba(45,212,191,0.6))',
            color:'#fff', border:'1px solid rgba(255,255,255,0.1)',
            backdropFilter:'blur(8px)', transition:'all 0.25s',
          }}
            onMouseEnter={e => e.currentTarget.style.background='linear-gradient(135deg,#7c3aed,#2dd4bf)'}
            onMouseLeave={e => e.currentTarget.style.background='linear-gradient(135deg,rgba(124,58,237,0.6),rgba(45,212,191,0.6))'}>
            Live Demo ↗
          </a>
        ) : project.behanceLink ? (
          <a href={project.behanceLink} target="_blank" rel="noreferrer" style={{
            display:'block', textAlign:'center', padding:'0.55rem', borderRadius:10,
            fontSize:'0.8rem', fontWeight:700,
            background:'linear-gradient(135deg,rgba(255,215,0,0.3),rgba(124,58,237,0.4))',
            color:'#FFD700', border:'1px solid rgba(255,215,0,0.2)',
            transition:'all 0.25s',
          }}>View on Behance ↗</a>
        ) : null}
      </div>
    </div>
  );
}

/* ── SKILLS SECTION ── */
export function Skills() {
  return (
    <section id="skills" style={{ padding:'5rem clamp(1.25rem,4vw,2.5rem)', background:'rgba(13,5,32,0.5)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="sec-tag">What I Do</div>
        <h2 className="sec-h">My <em>Skills</em></h2>
        <div className="sec-bar"/>
        <div className="grid-4">
          {SKILLS.map((s,i) => <SkillCard key={s.name} skill={s} delay={i*80} />)}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS SECTION ── */
export function Projects() {
  return (
    <section id="projects" style={{ padding:'5rem clamp(1.25rem,4vw,2.5rem)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="sec-tag">My Work</div>
        <h2 className="sec-h">Featured <em>Projects</em></h2>
        <div className="sec-bar"/>
        <div className="grid-auto">
          {PROJECTS.map((p,i) => <ProjectCard key={p.title} project={p} delay={i*80} />)}
        </div>
      </div>
    </section>
  );
}

/* ── RESUME SECTION ── */
/* ── RESUME CARD ── */
function ResumeCard({ resume, delay }) {
  const [ref, visible] = useReveal(delay);
  return (
    <div className="glass" style={{
      padding:'2rem 2.5rem', textAlign:'center', minWidth:190,
      opacity: visible ? 1:0, transform: visible ? 'translateY(0)':'translateY(20px)',
      transition:`all 0.5s`,
    }} ref={ref}>
      <div style={{ fontSize:'2rem', marginBottom:'0.75rem' }}>{resume.icon}</div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:'1rem', marginBottom:'0.25rem' }}>{resume.title}</div>
      <div style={{ fontSize:'0.75rem', color:'rgba(245,240,255,0.55)', marginBottom:'1rem' }}>{resume.sub}</div>
      <a href={resume.link} download style={{
        display:'inline-block', padding:'0.5rem 1.3rem', borderRadius:999,
        background:'linear-gradient(135deg,#FFD700,#a07840)',
        color:'#000', fontSize:'0.78rem', fontWeight:700, transition:'opacity 0.2s',
      }}
        onMouseEnter={e=>e.target.style.opacity='0.85'}
        onMouseLeave={e=>e.target.style.opacity='1'}>
        Download PDF ↓
      </a>
    </div>
  );
}

export function ResumeSection() {
  return (
    <section id="resume" style={{ padding:'5rem clamp(1.25rem,4vw,2.5rem)', background:'rgba(13,5,32,0.5)', position:'relative', zIndex:1, textAlign:'center' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="sec-tag">Download</div>
        <h2 className="sec-h">My <em>Resumes</em></h2>
        <div className="sec-bar" style={{ margin:'0 auto 0.75rem' }}/>
        <p style={{ color:'rgba(245,240,255,0.55)', fontSize:'0.88rem', maxWidth:440, margin:'0 auto 2.5rem' }}>
          Three specialized resumes — pick the one that fits your opening!
        </p>
        <div style={{ display:'flex', gap:'1.25rem', justifyContent:'center', flexWrap:'wrap' }}>
          {RESUMES.map((r, i) => (
            <ResumeCard key={r.title} resume={r} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT SECTION ── */
export function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);
  const [leftRef, leftVis] = useReveal(0);
  const [rightRef, rightVis] = useReveal(150);

  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name:'',email:'',subject:'',message:'' });
    setTimeout(() => setSent(false), 3000);
  };

  const inp = {
    background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)',
    borderRadius:10, padding:'0.75rem 0.9rem', color:'#f5f0ff',
    fontFamily:"'DM Sans',sans-serif", fontSize:'0.88rem', outline:'none',
    transition:'border-color 0.25s', resize:'none', width:'100%',
  };

  const links = [
    { icon:'✉️', label:'Email', val: CONTACT.email, href:`mailto:${CONTACT.email}` },
    { icon:'🎨', label:'Behance Portfolio', val:'behance.net/sameenfatima13', href: CONTACT.behance },
    { icon:'💻', label:'GitHub', val:'github.com/sameenfatima93', href: CONTACT.github },
    { icon:'💼', label:'LinkedIn', val:'Sameen Fatima', href: CONTACT.linkedin },
  ];

  return (
    <section id="contact" style={{ padding:'5rem clamp(1.25rem,4vw,2.5rem)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div className="sec-tag">Let's Talk</div>
        <h2 className="sec-h">Get In <em>Touch</em></h2>
        <div className="sec-bar"/>
        <div className="grid-2">
          {/* LEFT */}
          <div ref={leftRef} style={{ opacity: leftVis?1:0, transform: leftVis?'translateX(0)':'translateX(-20px)', transition:'all 0.6s' }}>
            <p style={{ color:'rgba(245,240,255,0.55)', fontSize:'0.9rem', lineHeight:1.85, marginBottom:'1.5rem' }}>
              I'm always open to job opportunities, freelance projects, and collaborations. Whether you have an opening or a project idea — let's connect!
            </p>
            {links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="glass"
                style={{ display:'flex', alignItems:'center', gap:'0.9rem', padding:'0.9rem 1rem', marginBottom:'0.75rem', color:'#f5f0ff', transition:'all 0.25s' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateX(5px)'}
                onMouseLeave={e => e.currentTarget.style.transform=''}>
                <div style={{ width:34, height:34, borderRadius:8, background:'linear-gradient(135deg,#7c3aed,#2dd4bf)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem', flexShrink:0 }}>{l.icon}</div>
                <div>
                  <div style={{ fontSize:'0.72rem', color:'rgba(245,240,255,0.55)' }}>{l.label}</div>
                  <div style={{ fontSize:'0.85rem', fontWeight:600 }}>{l.val}</div>
                </div>
              </a>
            ))}
          </div>

          {/* RIGHT — FORM */}
          <div ref={rightRef} style={{ opacity: rightVis?1:0, transform: rightVis?'translateX(0)':'translateX(20px)', transition:'all 0.6s 0.15s' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'0.75rem' }}>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                <label style={{ fontSize:'0.75rem', fontWeight:600, color:'rgba(245,240,255,0.55)' }}>Your Name</label>
                <input style={inp} placeholder="Ahmed Khan" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} onFocus={e=>e.target.style.borderColor='#FFD700'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'} />
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                <label style={{ fontSize:'0.75rem', fontWeight:600, color:'rgba(245,240,255,0.55)' }}>Email</label>
                <input style={inp} type="email" placeholder="ahmed@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} onFocus={e=>e.target.style.borderColor='#FFD700'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'} />
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem', marginBottom:'0.75rem' }}>
              <label style={{ fontSize:'0.75rem', fontWeight:600, color:'rgba(245,240,255,0.55)' }}>Subject</label>
              <input style={inp} placeholder="Job Opportunity / Project" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} onFocus={e=>e.target.style.borderColor='#FFD700'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'} />
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem', marginBottom:'0.75rem' }}>
              <label style={{ fontSize:'0.75rem', fontWeight:600, color:'rgba(245,240,255,0.55)' }}>Message</label>
              <textarea style={inp} rows={5} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} onFocus={e=>e.target.style.borderColor='#FFD700'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.12)'} />
            </div>
            <button onClick={submit} style={{
              width:'100%', padding:'0.85rem', border:'none', borderRadius:12, cursor:'pointer',
              background: sent ? 'linear-gradient(135deg,#2dd4bf,#00897b)' : 'linear-gradient(135deg,#FFD700,#a07840)',
              color: sent ? '#fff' : '#000', fontWeight:700, fontSize:'0.92rem',
              fontFamily:"'DM Sans',sans-serif", transition:'all 0.3s',
              boxShadow:'0 4px 24px rgba(255,215,0,0.2)',
            }}
              onMouseEnter={e=>{e.target.style.transform='translateY(-2px)';e.target.style.boxShadow='0 8px 32px rgba(255,215,0,0.35)';}}
              onMouseLeave={e=>{e.target.style.transform='';e.target.style.boxShadow='0 4px 24px rgba(255,215,0,0.2)';}}>
              {sent ? '✅ Sent! I\'ll be in touch soon.' : 'Send Message ✦'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
export function Footer() {
  return (
    <footer style={{ textAlign:'center', padding:'2rem', borderTop:'1px solid rgba(255,215,0,0.1)', color:'rgba(245,240,255,0.55)', fontSize:'0.82rem', position:'relative', zIndex:1, background:'rgba(6,1,15,0.8)' }}>
      <p>Designed & Built with ❤️ by{' '}
        <strong style={{ color:'#FFD700' }}>{PERSONAL.name}</strong>
        {' '}· {PERSONAL.location} · 2026
      </p>
    </footer>
  );
}
