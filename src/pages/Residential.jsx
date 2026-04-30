import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteImages } from '../context/SiteImagesContext';

// ✅ Default project metadata (title, location, type)
// Naye admin-added images ke liye fallback metadata
const PROJECT_META = {
  'residential.project1': { title: 'Karan Johar Residence', location: 'Bandra, Mumbai',  type: 'Private Residence' },
  'residential.project2': { title: 'Manish Malhotra Home',  location: 'Juhu, Mumbai',    type: 'Private Residence' },
  'residential.project3': { title: 'Juhu Penthouse',        location: 'Juhu, Mumbai',    type: 'Penthouse'         },
  'residential.project4': { title: 'Bandra Sea View Flat',  location: 'Bandra, Mumbai',  type: 'Apartment'         },
  'residential.project5': { title: 'Lodha Trump Tower',     location: 'Worli, Mumbai',   type: 'Luxury Apartment'  },
  'residential.project6': { title: 'Hill View Villa',       location: 'Lonavala',        type: 'Villa'             },
};

const WHY_US = [
  { title: 'Personality-Driven Design', desc: "Every residence is a reflection of its owner's unique character, lifestyle and aspirations." },
  { title: 'End-to-End Execution',      desc: "From concept to final installation — we handle every detail so you don't have to." },
];

const Residential = () => {
  const [isMobile,   setIsMobile]   = useState(window.innerWidth < 768);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [filter,     setFilter]     = useState('All');
  const { images, getSectionImages } = useSiteImages(); // ✅

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ✅ Saari images dynamic — default + admin added dono
  const allSectionImages = getSectionImages('residential');

  // Hero aur intro alag
  const heroUrl  = images['residential.hero'];
  const introUrl = images['residential.intro'];

  // ✅ Project images — keys jo .project contain kare
  const PROJECTS = allSectionImages
    .filter(item => item.key.includes('.project'))
    .map(item => ({
      key:      item.key,
      img:      item.url,
      title:    PROJECT_META[item.key]?.title    || `Project ${item.key.split('.project')[1]}`,
      location: PROJECT_META[item.key]?.location || 'India',
      type:     PROJECT_META[item.key]?.type     || 'Residential',
    }));

  const types    = ['All', ...new Set(PROJECTS.map(p => p.type))];
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === filter);

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: isMobile ? '50vh' : '65vh', overflow: 'hidden' }}>
        <img src={heroUrl}
          alt="Residential"
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
            <Link to="/services" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              Services
            </Link>
            {' / Interiors / Residential'}
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300', letterSpacing: '6px',
            textTransform: 'uppercase', margin: '0 0 16px' }}>
            Residential
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 20px' }} />
          <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '0.9rem' : '1.05rem', fontWeight: '300',
            maxWidth: '520px', lineHeight: '1.9', fontStyle: 'italic' }}>
            "From unique design ideas to elements that reflect the owner's personality,
            the abodes we lovingly bring to life leave most speechless."
          </p>
        </div>
      </div>

      {/* ── INTRO + IMAGE ── */}
      <section style={{
        padding: isMobile ? '60px 24px' : '100px 80px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '40px' : '80px',
        alignItems: 'center', maxWidth: '1200px',
        margin: '0 auto', boxSizing: 'border-box',
      }}>
        <div style={{ position: 'relative' }}>
          <img src={introUrl}
            alt="Residential interior"
            style={{ width: '100%', height: isMobile ? '300px' : '480px',
              objectFit: 'cover', display: 'block' }} />
          <div style={{
            position: 'absolute', top: isMobile ? '-10px' : '-20px',
            left: isMobile ? '-10px' : '-20px',
            width: '100px', height: '100px',
            border: '2px solid #c9a96e', zIndex: -1,
          }} />
        </div>

        <div>
          <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
            color: '#c9a96e', marginBottom: '16px', fontFamily: 'sans-serif' }}>
            About This Service
          </p>
          <h2 style={{ fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '1.8rem' : '2.6rem',
            fontWeight: '300', color: '#1a1a1a',
            margin: '0 0 24px', lineHeight: '1.3' }}>
            Homes that tell<br />your story
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', marginBottom: '24px' }} />
          <p style={{ fontFamily: "'Georgia', serif", fontSize: '1rem', color: '#555',
            lineHeight: '2', fontWeight: '300', marginBottom: '32px' }}>
            From high-end retail boutiques to luxury cafés and media studios, TrueBuild Projects
            spans industries where design is a competitive advantage. Proudly serving{' '}
            <strong style={{ color: '#1a1a1a' }}>Delhi NCR and Uttar Pradesh</strong>, we specialize
            in the end-to-end delivery of Luxury Stores & Shops, Modern Commercial Offices,
            Restaurants and Large-scale Warehouse Construction.
          </p>
          {WHY_US.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '14px',
              alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ color: '#c9a96e', marginTop: '3px' }}>◆</span>
              <div>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.78rem',
                  fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px', letterSpacing: '0.5px' }}>
                  {item.title}
                </p>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.75rem',
                  color: '#888', margin: 0, lineHeight: '1.7' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECT GRID ── */}
      <section style={{
        padding: isMobile ? '0 24px 60px' : '0 80px 80px',
        boxSizing: 'border-box',
      }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: '#c9a96e', marginBottom: '14px', fontFamily: 'sans-serif', textAlign: 'center' }}>
          Our Work
        </p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '300',
          color: '#1a1a1a', margin: '0 0 32px' }}>
          Residential Projects
          {/* ✅ Live count dikhega */}
          <span style={{ fontFamily: 'sans-serif', fontSize: '0.75rem',
            color: '#c9a96e', marginLeft: '12px', letterSpacing: '2px' }}>
            ({PROJECTS.length})
          </span>
        </h2>

        {/* Filter */}
        <div style={{ display: 'flex', justifyContent: 'center',
          gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: '8px 18px', border: '1px solid',
              borderColor: filter === t ? '#1a1a1a' : '#ddd',
              background:  filter === t ? '#1a1a1a' : 'transparent',
              color:        filter === t ? '#fff'    : '#888',
              fontSize: '0.6rem', letterSpacing: '2px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
              cursor: 'pointer', transition: 'all 0.3s',
            }}>
              {t}
            </button>
          ))}
        </div>

        {/* ✅ Grid — ab dynamically render hoga, naye images automatically aayenge */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2px', maxWidth: '1100px', margin: '0 auto',
        }}>
          {filtered.map((proj, idx) => (
            <div key={proj.key}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ position: 'relative', overflow: 'hidden',
                height: isMobile ? '240px' : '300px', cursor: 'pointer' }}>
              <img src={proj.img} alt={proj.title} style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                transition: 'transform 0.6s ease',
                transform: hoveredIdx === idx ? 'scale(1.08)' : 'scale(1)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.55)',
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

      {/* ── CTA ── */}
      <section style={{
        background: '#1a1a1a',
        padding: isMobile ? '60px 24px' : '80px 60px',
        textAlign: 'center', boxSizing: 'border-box',
      }}>
        <h2 style={{ fontFamily: "'Georgia', serif", color: '#fff',
          fontSize: isMobile ? '1.6rem' : '2rem',
          fontWeight: '300', margin: '0 0 16px' }}>
          Ready to design your dream home?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif',
          fontSize: '0.85rem', lineHeight: '1.9', margin: '0 auto 32px', maxWidth: '480px' }}>
          Every home has a story. Let's design yours together.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{
            padding: '13px 36px', background: '#c9a96e', color: '#fff',
            textDecoration: 'none', fontSize: '0.62rem',
            letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#b8935a'}
            onMouseLeave={e => e.currentTarget.style.background = '#c9a96e'}>
            Start Your Project
          </Link>
          <Link to="/services" style={{
            padding: '13px 36px', background: 'transparent',
            color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.3)',
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

export default Residential;