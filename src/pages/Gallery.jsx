import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GALLERY_ITEMS = [
  { id: 1,  category: 'Interiors',   img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',  title: 'Living Room — Juhu Residence',     size: 'large'  },
  { id: 2,  category: 'Furniture',   img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',  title: 'Bespoke Sofa Collection',          size: 'small'  },
  { id: 3,  category: 'Decor',       img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',  title: 'Curated Artefacts',               size: 'small'  },
  { id: 4,  category: 'Interiors',   img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',  title: 'Master Bedroom — Bandra',         size: 'large'  },
  { id: 5,  category: 'Studio',      img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',  title: 'Studio Flagship — Raghuvanshi',   size: 'small'  },
  { id: 6,  category: 'Furniture',   img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',  title: 'Custom Dining Table',             size: 'small'  },
  { id: 7,  category: 'Studio',      img: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',  title: 'Juhu Showroom — Main Hall',       size: 'large'  },
  { id: 8,  category: 'Decor',       img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80',  title: 'Art Wall — Private Residence',    size: 'small'  },
  { id: 9,  category: 'Interiors',   img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80',  title: 'Home Office — Khar',              size: 'small'  },
  { id: 10, category: 'Furniture',   img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',  title: 'Statement Chair — Gold Edition',  size: 'large'  },
  { id: 11, category: 'Studio',      img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',  title: 'Design Consultation Room',        size: 'small'  },
  { id: 12, category: 'Decor',       img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80',  title: 'Signature Lamp Collection',       size: 'small'  },
];

const CATEGORIES = ['All', 'Interiors', 'Furniture', 'Decor', 'Studio'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImg,    setLightboxImg]    = useState(null);
  const [lightboxTitle,  setLightboxTitle]  = useState('');
  const [isMobile,       setIsMobile]       = useState(window.innerWidth < 768);
  const [hoveredId,      setHoveredId]      = useState(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightboxImg(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filtered = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.category === activeCategory);

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* ══════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════ */}
      <div style={{ position: 'relative', height: isMobile ? '45vh' : '55vh', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=80"
          alt="Gallery"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.65))',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: '0 20px',
        }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', marginBottom: '16px' }}>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>About</Link>
            {' '} / Gallery
          </p>
          <h1 style={{
            fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300', letterSpacing: '6px',
            textTransform: 'uppercase', margin: '0 0 16px',
          }}>
            The Gallery
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 18px' }} />
          <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '0.85rem' : '1rem', fontWeight: '300',
            maxWidth: '480px', lineHeight: '1.8', letterSpacing: '0.5px' }}>
            A visual journey through spaces we have imagined, crafted, and brought to life.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SECTION 2: FILTER + GRID
      ══════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '40px 20px 60px' : '60px 60px 80px', boxSizing: 'border-box' }}>

        {/* Category filter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px',
          flexWrap: 'wrap', marginBottom: '48px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '9px 20px', border: '1px solid',
              borderColor: activeCategory === cat ? '#1a1a1a' : '#ddd',
              background: activeCategory === cat ? '#1a1a1a' : 'transparent',
              color: activeCategory === cat ? '#fff' : '#888',
              fontSize: '0.62rem', letterSpacing: '2px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
              cursor: 'pointer', transition: 'all 0.3s',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* ── MASONRY-STYLE GRID ── */}
        <div style={{
          columns: isMobile ? 1 : 3,
          columnGap: '8px',
          maxWidth: '1200px', margin: '0 auto',
        }}>
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => { setLightboxImg(item.img); setLightboxTitle(item.title); }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                breakInside: 'avoid',
                marginBottom: '8px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'block',
              }}>
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: '100%',
                  height: item.size === 'large'
                    ? isMobile ? '280px' : '420px'
                    : isMobile ? '220px' : '280px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s ease',
                  transform: hoveredId === item.id ? 'scale(1.05)' : 'scale(1)',
                }}
              />
              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.5)',
                opacity: hoveredId === item.id ? 1 : 0,
                transition: 'opacity 0.3s ease',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '20px',
              }}>
                <span style={{ color: '#c9a96e', fontSize: '0.58rem',
                  letterSpacing: '3px', textTransform: 'uppercase',
                  fontFamily: 'sans-serif', marginBottom: '10px' }}>
                  {item.category}
                </span>
                <h3 style={{ fontFamily: "'Georgia', serif", color: '#fff',
                  fontSize: '1rem', fontWeight: '300', margin: '0 0 14px',
                  letterSpacing: '1px' }}>
                  {item.title}
                </h3>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.4rem' }}>⊕</span>
              </div>

              {/* Category badge */}
              <span style={{
                position: 'absolute', top: '12px', left: '12px',
                background: 'rgba(255,255,255,0.92)',
                padding: '3px 10px', fontSize: '0.55rem',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#888', fontFamily: 'sans-serif',
                opacity: hoveredId === item.id ? 0 : 1,
                transition: 'opacity 0.3s',
              }}>
                {item.category}
              </span>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', fontFamily: "'Georgia', serif",
            fontSize: '1.1rem', color: '#bbb', padding: '60px 0' }}>
            No images in this category yet.
          </p>
        )}
      </section>

      {/* ══════════════════════════════════════
          SECTION 3: QUOTE BANNER
      ══════════════════════════════════════ */}
      <section style={{
        background: '#1a1a1a',
        padding: isMobile ? '60px 24px' : '80px 60px',
        textAlign: 'center', boxSizing: 'border-box',
      }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: '#c9a96e', marginBottom: '20px', fontFamily: 'sans-serif' }}>
          The Philosophy
        </p>
        <blockquote style={{
          fontFamily: "'Georgia', serif", color: '#fff',
          fontSize: isMobile ? '1.3rem' : '1.8rem',
          fontWeight: '300', lineHeight: '1.7',
          maxWidth: '760px', margin: '0 auto 24px',
          fontStyle: 'italic', letterSpacing: '0.5px',
        }}>
          "It's not a store or a showroom. It's a curated home — designed to feel warm, inviting, and emotionally resonant."
        </blockquote>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.68rem',
          letterSpacing: '3px', textTransform: 'uppercase',
          color: '#c9a96e' }}>
          — TrueBuild Projects
        </p>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4: CTA
      ══════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '60px 24px' : '80px 60px',
        background: '#faf8f5', textAlign: 'center',
        boxSizing: 'border-box',
      }}>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: isMobile ? '1.6rem' : '2rem',
          fontWeight: '300', color: '#1a1a1a', margin: '0 0 16px', letterSpacing: '1px' }}>
          Inspired by what you see?
        </h2>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#888',
          lineHeight: '1.8', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
          Let us design a space that reflects your unique personality and lifestyle.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{
            padding: '13px 32px', background: '#1a1a1a',
            color: '#fff', textDecoration: 'none',
            fontSize: '0.62rem', letterSpacing: '3px',
            textTransform: 'uppercase', fontFamily: 'sans-serif',
            transition: 'background 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
            onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
            Start a Project
          </Link>
          <Link to="/about" style={{
            padding: '13px 32px', background: 'transparent',
            color: '#1a1a1a', textDecoration: 'none',
            border: '1px solid #ddd', fontSize: '0.62rem',
            letterSpacing: '3px', textTransform: 'uppercase',
            fontFamily: 'sans-serif', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#1a1a1a'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#ddd'; }}>
            ← Back to About
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LIGHTBOX MODAL
      ══════════════════════════════════════ */}
      {lightboxImg && (
        <>
          <div onClick={() => setLightboxImg(null)} style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 3000, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            padding: '20px', boxSizing: 'border-box',
          }}>
            <button onClick={() => setLightboxImg(null)} style={{
              position: 'fixed', top: '24px', right: '28px',
              background: 'none', border: 'none', color: '#fff',
              fontSize: '1.8rem', cursor: 'pointer', zIndex: 3001,
              lineHeight: 1,
            }}>✕</button>
            <div onClick={e => e.stopPropagation()}
              style={{ maxWidth: '900px', width: '100%' }}>
              <img src={lightboxImg} alt={lightboxTitle} style={{
                width: '100%', maxHeight: '80vh',
                objectFit: 'contain', display: 'block',
              }} />
              <p style={{ fontFamily: "'Georgia', serif", color: 'rgba(255,255,255,0.7)',
                fontSize: '0.88rem', textAlign: 'center',
                marginTop: '16px', letterSpacing: '1px',
                fontStyle: 'italic' }}>
                {lightboxTitle}
              </p>
            </div>
          </div>
        </>
      )}

    </main>
  );
};

export default Gallery;