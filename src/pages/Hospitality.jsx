import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteImages } from '../context/SiteImagesContext';

const BENEFITS = [
  { icon: '◈', title: 'Creative Spaces',       desc: 'Work with a close-knit team of creative enthusiasts who push boundaries to craft truly exceptional hospitality environments.' },
  { icon: '◉', title: 'Smart Planning',         desc: 'Time is crucial and we understand it to the tee. We emphasize timely completion — every aspect of your interior, on schedule.' },
  { icon: '◇', title: 'Style & Sophistication', desc: 'Our hospitality projects are a perfect mélange of style and sophistication — spaces guests remember long after they leave.' },
  { icon: '◎', title: 'Unrivaled Finesse',      desc: 'The execution of a design speaks volumes. We give optimum attention to the finishing and finesse of every hospitality project.' },
];

const PROJECTS = [
  { title: 'The Leela — Suite Design',  location: 'Mumbai', key: 'hospitality.project1', type: 'Hotel'  },
  { title: 'Grandmama Café',            location: 'Mumbai', key: 'hospitality.project2', type: 'Café'   },
  { title: 'Art Café — Jio Convention', location: 'Mumbai', key: 'hospitality.project3', type: 'Café'   },
  { title: 'Luxury Resort Lounge',      location: 'Goa',    key: 'hospitality.project4', type: 'Resort' },
  { title: 'Hotel Lobby — Delhi',       location: 'Delhi',  key: 'hospitality.project5', type: 'Hotel'  },
  { title: 'Private Club — Mumbai',     location: 'Mumbai', key: 'hospitality.project6', type: 'Club'   },
];

const Hospitality = () => {
  const [isMobile,   setIsMobile]   = useState(window.innerWidth < 768);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [filter,     setFilter]     = useState('All');
  const { images } = useSiteImages(); // ✅

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const types = ['All', ...new Set(PROJECTS.map(p => p.type))];
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === filter);

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: isMobile ? '50vh' : '65vh', overflow: 'hidden' }}>
        {/* ✅ hospitality.hero */}
        <img src={images['hospitality.hero']}
          alt="Hospitality"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.72))' }} />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center', padding: '0 20px',
        }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', marginBottom: '16px' }}>
            <Link to="/services" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Services</Link>
            {' / Interiors / Hospitality'}
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300', letterSpacing: '6px',
            textTransform: 'uppercase', margin: '0 0 16px' }}>
            Hospitality
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 20px' }} />
          <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: '300',
            maxWidth: '520px', lineHeight: '1.9', fontStyle: 'italic' }}>
            "While fashioning environs for guests to unwind or meet over business, we have created our niche in the hospitality space."
          </p>
        </div>
      </div>

      {/* ── INTRO ── */}
      <section style={{
        padding: isMobile ? '60px 24px' : '100px 80px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '40px' : '80px',
        alignItems: 'center',
        maxWidth: '1200px', margin: '0 auto',
        boxSizing: 'border-box',
      }}>
        <div>
          <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
            color: '#c9a96e', marginBottom: '16px', fontFamily: 'sans-serif' }}>
            Inviting Admiration
          </p>
          <h2 style={{ fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '1.8rem' : '2.6rem',
            fontWeight: '300', color: '#1a1a1a',
            margin: '0 0 24px', lineHeight: '1.3' }}>
            Spaces where guests<br />feel at home
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', marginBottom: '24px' }} />
          <p style={{ fontFamily: "'Georgia', serif", fontSize: '1rem', color: '#555',
            lineHeight: '2', fontWeight: '300', marginBottom: '16px' }}>
            Great hospitality design does more than look beautiful — it creates an emotional atmosphere. Guests should feel welcomed, comfortable and inspired from the moment they walk in.
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: '1rem', color: '#555',
            lineHeight: '2', fontWeight: '300', marginBottom: '32px' }}>
            From intimate boutique cafés to grand hotel lobbies and resort lounges, our team crafts hospitality environments that leave lasting impressions.
          </p>
          <Link to="/contact" style={{
            display: 'inline-block', padding: '13px 32px',
            border: '1px solid #1a1a1a', color: '#1a1a1a',
            textDecoration: 'none', fontSize: '0.62rem',
            letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background='#1a1a1a'; e.currentTarget.style.color='#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#1a1a1a'; }}>
            Discuss Your Project →
          </Link>
        </div>
        <div style={{ position: 'relative' }}>
          {/* ✅ hospitality.intro */}
          <img src={images['hospitality.intro']}
            alt="Hospitality interior"
            style={{ width: '100%', height: isMobile ? '300px' : '460px',
              objectFit: 'cover', display: 'block' }} />
          <div style={{
            position: 'absolute', top: '-20px', left: '-20px',
            width: '100px', height: '100px',
            border: '2px solid #c9a96e', zIndex: -1,
          }} />
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{
        background: '#1a1a1a',
        padding: isMobile ? '60px 24px' : '80px 80px',
        boxSizing: 'border-box',
      }}>
        <p style={{ textAlign: 'center', fontSize: '0.6rem', letterSpacing: '5px',
          textTransform: 'uppercase', color: '#c9a96e',
          marginBottom: '14px', fontFamily: 'sans-serif' }}>
          Why Work With Us
        </p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '300',
          color: '#fff', margin: '0 0 56px', letterSpacing: '1px' }}>
          Benefits of Associating With Us
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '32px' : '2px',
          maxWidth: '1100px', margin: '0 auto',
        }}>
          {BENEFITS.map((b, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.04)',
              padding: '36px 28px', textAlign: 'center',
              borderRight: !isMobile && idx < BENEFITS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              transition: 'background 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}>
              <div style={{ fontSize: '2rem', color: '#c9a96e', marginBottom: '18px' }}>{b.icon}</div>
              <h3 style={{ fontFamily: "'Georgia', serif", color: '#fff',
                fontSize: '1.05rem', fontWeight: '300', margin: '0 0 14px', letterSpacing: '1px' }}>
                {b.title}
              </h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.5)', lineHeight: '1.8', margin: 0 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECT GRID ── */}
      <section style={{
        padding: isMobile ? '60px 24px 40px' : '80px 80px 60px',
        boxSizing: 'border-box',
      }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: '#c9a96e', marginBottom: '14px', fontFamily: 'sans-serif',
          textAlign: 'center' }}>
          Portfolio
        </p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '300',
          color: '#1a1a1a', margin: '0 0 32px' }}>
          Hospitality Projects
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center',
          gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: '8px 18px', border: '1px solid',
              borderColor: filter === t ? '#1a1a1a' : '#ddd',
              background: filter === t ? '#1a1a1a' : 'transparent',
              color: filter === t ? '#fff' : '#888',
              fontSize: '0.6rem', letterSpacing: '2px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
              cursor: 'pointer', transition: 'all 0.3s',
            }}>{t}</button>
          ))}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2px', maxWidth: '1100px', margin: '0 auto',
        }}>
          {filtered.map((proj, idx) => (
            <div key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ position: 'relative', overflow: 'hidden',
                height: isMobile ? '240px' : '300px', cursor: 'pointer' }}>
              {/* ✅ images[proj.key] */}
              <img src={images[proj.key]} alt={proj.title} style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                transition: 'transform 0.6s ease',
                transform: hoveredIdx === idx ? 'scale(1.08)' : 'scale(1)',
              }} />
              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
                opacity: hoveredIdx === idx ? 1 : 0,
                transition: 'opacity 0.3s',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '20px',
              }}>
                <p style={{ color: '#c9a96e', fontSize: '0.58rem',
                  letterSpacing: '3px', textTransform: 'uppercase',
                  fontFamily: 'sans-serif', margin: '0 0 8px' }}>
                  {proj.type}
                </p>
                <h3 style={{ fontFamily: "'Georgia', serif", color: '#fff',
                  fontSize: '1rem', fontWeight: '300', margin: '0 0 6px' }}>
                  {proj.title}
                </h3>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                  📍 {proj.location}
                </p>
              </div>
              <span style={{
                position: 'absolute', bottom: '12px', left: '12px',
                background: 'rgba(255,255,255,0.92)',
                padding: '3px 10px', fontSize: '0.55rem',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#888', fontFamily: 'sans-serif',
                opacity: hoveredIdx === idx ? 0 : 1,
                transition: 'opacity 0.3s',
              }}>
                {proj.type}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA (with background image) ── */}
      <section style={{ position: 'relative', overflow: 'hidden',
        padding: isMobile ? '80px 24px' : '100px 60px', boxSizing: 'border-box' }}>
        {/* ✅ hospitality.cta */}
        <img
          src={images['hospitality.cta']}
          alt="CTA"
          style={{ position: 'absolute', inset: 0, width: '100%',
            height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1,
          background: 'rgba(0,0,0,0.65)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '1.8rem' : '2.4rem',
            fontWeight: '300', margin: '0 0 16px', letterSpacing: '1px' }}>
            Designing a hospitality space?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'sans-serif',
            fontSize: '0.88rem', lineHeight: '1.9',
            margin: '0 auto 36px', maxWidth: '480px' }}>
            Let's create an environment your guests will never forget.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              padding: '14px 40px', background: '#c9a96e', color: '#fff',
              textDecoration: 'none', fontSize: '0.62rem',
              letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#b8935a'}
              onMouseLeave={e => e.currentTarget.style.background = '#c9a96e'}>
              Book a Consultation
            </Link>
            <Link to="/services" style={{
              padding: '14px 36px', background: 'transparent',
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.4)',
              fontSize: '0.62rem', letterSpacing: '3px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
            }}>
              ← All Services
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Hospitality;