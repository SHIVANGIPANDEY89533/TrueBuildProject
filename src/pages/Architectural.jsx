import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteImages } from '../context/SiteImagesContext';

const PROJECTS = [
  {
    title: 'Abu Dhabi Luxury Villa',
    location: 'Abu Dhabi, UAE',
    area: '12,000 sq ft',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    desc: 'A grand residence blending contemporary architecture with traditional Arabic aesthetics, featuring expansive marble interiors and bespoke furnishings.',
  },
  {
    title: 'Dubai Mansions Project',
    location: 'Dubai, UAE',
    area: '18,500 sq ft',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    desc: 'Series of luxurious mansions showcasing seamless integration of modern architecture with elegant interiors and curated art pieces.',
  },
  {
    title: 'Coastal Villa — Alibaug',
    location: 'Alibaug, Maharashtra',
    area: '8,200 sq ft',
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    desc: 'A coastal retreat designed around natural light and ocean views, merging indoor-outdoor living with luxurious comfort.',
  },
  {
    title: 'Hill Estate — Lonavala',
    location: 'Lonavala, Maharashtra',
    area: '10,400 sq ft',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    desc: 'Nestled in the Sahyadri hills, this estate features stone facades, timber accents and sweeping valley views.',
  },
];

const FEATURES = [
  { icon: '◈', title: 'Grand Facades',       desc: 'Architecturally striking exteriors that command attention and set the tone for the luxury within.' },
  { icon: '◉', title: 'Expansive Layouts',   desc: 'Open, flowing floor plans designed for both grand entertaining and intimate everyday living.' },
  { icon: '◇', title: 'Premium Materials',   desc: 'Marble, polished wood, glass and sumptuous fabrics sourced from the finest global suppliers.' },
  { icon: '◎', title: 'Bespoke Interiors',   desc: 'Every interior element — from furniture to art — is custom-designed to complement the architecture.' },
];

const Architectural = () => {
  const [isMobile,   setIsMobile]   = useState(window.innerWidth < 768);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeProj, setActiveProj] = useState(0);
  const { images } = useSiteImages(); // ✅ Get images from context

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Map Unsplash URLs to context images
  const PROJECT_IMAGES = [
    images['architectural.card1'],
    images['architectural.card2'],
    images['architectural.card3'],
    images['architectural.card4'],
  ];

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: isMobile ? '50vh' : '65vh', overflow: 'hidden' }}>
        <img
          src={images['architectural.image']}
          alt="Architectural"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))' }} />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center', padding: '0 20px',
        }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', marginBottom: '16px' }}>
            <Link to="/services" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Services</Link>
            {' '} / Architectural
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300', letterSpacing: '6px',
            textTransform: 'uppercase', margin: '0 0 16px' }}>
            Architectural
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 20px' }} />
          <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '0.9rem' : '1.05rem', fontWeight: '300',
            maxWidth: '560px', lineHeight: '1.9' }}>
            Grand facades, expansive layouts and luxurious residences designed from foundation to finish.
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
            Our Expertise
          </p>
          <h2 style={{ fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '1.8rem' : '2.6rem',
            fontWeight: '300', color: '#1a1a1a',
            margin: '0 0 24px', lineHeight: '1.3' }}>
            Architecture meets<br />artistry
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', marginBottom: '24px' }} />
          <p style={{ fontFamily: "'Georgia', serif", fontSize: '1rem', color: '#555',
            lineHeight: '2', fontWeight: '300', marginBottom: '16px' }}>
            TrueBuild Projects is crafting a series of luxurious mansions and villas in Delhi NCR, showcasing expertise in both architectural design and interior decoration.
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: '1rem', color: '#555',
            lineHeight: '2', fontWeight: '300', marginBottom: '32px' }}>
            These residences reflect a seamless integration of modern architecture with elegant interiors, embodying a sophisticated blend of contemporary luxury and traditional charm.
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
            Start a Project →
          </Link>
        </div>
        <div style={{ position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
            alt="Architecture"
            style={{ width: '100%', height: isMobile ? '300px' : '480px',
              objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', bottom: isMobile ? '-12px' : '-20px',
            right: isMobile ? '-10px' : '-20px',
            width: '100px', height: '100px',
            border: '2px solid #c9a96e', zIndex: -1,
          }} />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{
        background: '#1a1a1a',
        padding: isMobile ? '60px 24px' : '80px 80px',
        boxSizing: 'border-box',
      }}>
        <p style={{ textAlign: 'center', fontSize: '0.6rem', letterSpacing: '5px',
          textTransform: 'uppercase', color: '#c9a96e',
          marginBottom: '14px', fontFamily: 'sans-serif' }}>
          What We Offer
        </p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '300',
          color: '#fff', margin: '0 0 56px', letterSpacing: '1px' }}>
          Our Architectural Approach
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '32px' : '2px',
          maxWidth: '1100px', margin: '0 auto',
        }}>
          {FEATURES.map((f, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.04)',
              padding: '36px 28px', textAlign: 'center',
              borderRight: !isMobile && idx < FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              transition: 'background 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}>
              <div style={{ fontSize: '2rem', color: '#c9a96e', marginBottom: '18px' }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Georgia', serif", color: '#fff',
                fontSize: '1.05rem', fontWeight: '300', margin: '0 0 14px', letterSpacing: '1px' }}>
                {f.title}
              </h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.5)', lineHeight: '1.8', margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS SHOWCASE ── */}
      <section style={{
        padding: isMobile ? '60px 24px' : '100px 80px',
        boxSizing: 'border-box',
      }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: '#c9a96e', marginBottom: '14px', fontFamily: 'sans-serif',
          textAlign: 'center' }}>
          Featured Projects
        </p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '300',
          color: '#1a1a1a', margin: '0 0 48px', letterSpacing: '1px' }}>
          Architectural Works
        </h2>

        {/* Tab selector */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
          gap: '2px', marginBottom: '40px' }}>
          {PROJECTS.map((p, idx) => (
            <button key={idx} onClick={() => setActiveProj(idx)} style={{
              padding: '10px 20px',
              background: activeProj === idx ? '#1a1a1a' : 'transparent',
              color: activeProj === idx ? '#fff' : '#888',
              border: `1px solid ${activeProj === idx ? '#1a1a1a' : '#ddd'}`,
              cursor: 'pointer', fontSize: '0.62rem',
              letterSpacing: '1.5px', textTransform: 'uppercase',
              fontFamily: 'sans-serif', transition: 'all 0.3s',
            }}>
              {p.title.split(' — ')[0].split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>

        {/* Active project display */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '0', maxWidth: '1100px', margin: '0 auto',
          background: '#fff', boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
        }}>
          <div style={{ height: isMobile ? '260px' : '420px', overflow: 'hidden' }}>
            <img
              src={PROJECT_IMAGES[activeProj] || PROJECTS[activeProj].img}
              alt={PROJECTS[activeProj].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover',
                display: 'block', transition: 'opacity 0.3s' }}
            />
          </div>
          <div style={{ padding: isMobile ? '32px 24px' : '52px 48px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: '0.58rem', letterSpacing: '4px',
              textTransform: 'uppercase', color: '#c9a96e',
              marginBottom: '12px', fontFamily: 'sans-serif' }}>
              {PROJECTS[activeProj].location}
            </p>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: isMobile ? '1.3rem' : '1.8rem',
              fontWeight: '300', color: '#1a1a1a', margin: '0 0 20px' }}>
              {PROJECTS[activeProj].title}
            </h3>
            <div style={{ width: '32px', height: '1px', background: '#c9a96e', marginBottom: '20px' }} />
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem',
              color: '#666', lineHeight: '1.9', marginBottom: '24px' }}>
              {PROJECTS[activeProj].desc}
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.58rem',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: '#bbb', marginBottom: '4px' }}>Area</p>
                <p style={{ fontFamily: "'Georgia', serif", fontSize: '1rem',
                  color: '#1a1a1a', margin: 0 }}>
                  {PROJECTS[activeProj].area}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: '#f5f0ea', padding: isMobile ? '60px 24px' : '80px 60px',
        textAlign: 'center', boxSizing: 'border-box',
      }}>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: isMobile ? '1.6rem' : '2rem',
          fontWeight: '300', color: '#1a1a1a', margin: '0 0 16px' }}>
          Have an architectural vision?
        </h2>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#888',
          lineHeight: '1.9', margin: '0 auto 32px', maxWidth: '480px' }}>
          We bring structures to life — from concept sketches to final installation.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{
            padding: '13px 36px', background: '#1a1a1a', color: '#fff',
            textDecoration: 'none', fontSize: '0.62rem',
            letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
            onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
            Get in Touch
          </Link>
          <Link to="/services" style={{
            padding: '13px 36px', background: 'transparent', color: '#1a1a1a',
            textDecoration: 'none', border: '1px solid #ddd',
            fontSize: '0.62rem', letterSpacing: '3px',
            textTransform: 'uppercase', fontFamily: 'sans-serif',
          }}>
            ← All Services
          </Link>
        </div>
      </section>

    </main>
  );
};

export default Architectural;