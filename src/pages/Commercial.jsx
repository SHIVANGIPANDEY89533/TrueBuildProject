import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  { title: 'Manish Malhotra — Dubai Mall',        location: 'Dubai, UAE',         img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', category: 'Retail' },
  { title: 'Manish Malhotra — Jio World Plaza',   location: 'Mumbai',             img: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80', category: 'Retail' },
  { title: 'Bollyglow',                           location: 'Mumbai',             img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80', category: 'Beauty' },
  { title: 'Grandmama Café',                      location: 'Mumbai',             img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', category: 'F&B' },
  { title: 'Art Café — Jio Convention Center',    location: 'Mumbai',             img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80', category: 'F&B' },
  { title: 'Falguni Shane Peacock Store',         location: 'Mumbai & Delhi',     img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80', category: 'Retail' },
  { title: 'Radio Show Project',                  location: 'Mumbai',             img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80', category: 'Media' },
  { title: 'Manish Malhotra Dubai Store',         location: 'Dubai, UAE',         img: 'https://images.unsplash.com/photo-1576176539998-0237d1ac6a46?w=800&q=80', category: 'Retail' },
];

const CATEGORIES = ['All', 'Retail', 'F&B', 'Beauty', 'Media'];

const Commercial = () => {
  const [isMobile,   setIsMobile]   = useState(window.innerWidth < 768);
  const [filter,     setFilter]     = useState('All');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: isMobile ? '50vh' : '65vh', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
          alt="Commercial"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
            {' / Interiors / Commercial'}
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300', letterSpacing: '6px',
            textTransform: 'uppercase', margin: '0 0 16px' }}>
            Commercial
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 20px' }} />
          <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: '300',
            maxWidth: '520px', lineHeight: '1.9', fontStyle: 'italic' }}>
            "The commercial spaces we design are a statement of purpose and ambition. Each one unrivaled."
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
            Spaces for Success
          </p>
          <h2 style={{ fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '1.8rem' : '2.6rem',
            fontWeight: '300', color: '#1a1a1a',
            margin: '0 0 24px', lineHeight: '1.3' }}>
            Designed to inspire,<br />built to impress
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', marginBottom: '24px' }} />
          {/* ── INTRO — replace karo ye do paragraphs ── */}
<p style={{
  fontFamily: "'Georgia', serif", fontSize: '1rem', color: '#555',
  lineHeight: '2', fontWeight: '300', marginBottom: '16px',
}}>
  From high-end retail boutiques to luxury cafés and media studios, TrueBuild Projects
  spans industries where design is a competitive advantage. Proudly serving Delhi NCR
  and Uttar Pradesh, we specialize in the end-to-end delivery of Luxury Stores &amp; Shops,
  Modern Commercial Offices, Restaurants and Large-scale Warehouse Construction.
</p>
<p style={{
  fontFamily: "'Georgia', serif", fontSize: '1rem', color: '#555',
  lineHeight: '2', fontWeight: '300', marginBottom: '32px',
}}>
  We have collaborated with Manish Malhotra, Falguni Shane Peacock and several of
  India and UAE's most prestigious commercial brands.
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
            Discuss Your Space →
          </Link>
        </div>
        <div style={{ position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
            alt="Commercial Design"
            style={{ width: '100%', height: isMobile ? '300px' : '460px',
              objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', bottom: '-20px', right: '-20px',
            width: '100px', height: '100px',
            border: '2px solid #c9a96e', zIndex: -1,
          }} />
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section style={{
        background: '#fff',
        padding: isMobile ? '50px 24px 60px' : '80px 80px',
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
          Commercial Projects
        </h2>

        {/* Filter */}
        <div style={{ display: 'flex', justifyContent: 'center',
          gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: '8px 18px', border: '1px solid',
              borderColor: filter === cat ? '#1a1a1a' : '#ddd',
              background: filter === cat ? '#1a1a1a' : 'transparent',
              color: filter === cat ? '#fff' : '#888',
              fontSize: '0.6rem', letterSpacing: '2px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
              cursor: 'pointer', transition: 'all 0.3s',
            }}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '2px', maxWidth: '1200px', margin: '0 auto',
        }}>
          {filtered.map((proj, idx) => (
            <div key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ position: 'relative', overflow: 'hidden',
                height: isMobile ? '220px' : '260px', cursor: 'pointer' }}>
              <img src={proj.img} alt={proj.title} style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                transition: 'transform 0.6s ease',
                transform: hoveredIdx === idx ? 'scale(1.08)' : 'scale(1)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.6)',
                opacity: hoveredIdx === idx ? 1 : 0,
                transition: 'opacity 0.3s',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '16px',
              }}>
                <span style={{ color: '#c9a96e', fontSize: '0.56rem',
                  letterSpacing: '3px', textTransform: 'uppercase',
                  fontFamily: 'sans-serif', margin: '0 0 8px', display: 'block' }}>
                  {proj.category}
                </span>
                <h3 style={{ fontFamily: "'Georgia', serif", color: '#fff',
                  fontSize: '0.9rem', fontWeight: '300', margin: '0 0 6px' }}>
                  {proj.title}
                </h3>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                  📍 {proj.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: '#f5f0ea', padding: isMobile ? '60px 24px' : '80px 60px',
        textAlign: 'center', boxSizing: 'border-box',
      }}>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: isMobile ? '1.6rem' : '2rem',
          fontWeight: '300', color: '#1a1a1a', margin: '0 0 16px' }}>
          Planning a commercial space?
        </h2>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#888',
          lineHeight: '1.9', margin: '0 auto 32px', maxWidth: '460px' }}>
          We design retail stores, offices, restaurants and more — spaces that make your brand unforgettable.
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

export default Commercial;