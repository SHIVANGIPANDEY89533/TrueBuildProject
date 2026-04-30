import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteImages } from '../context/SiteImagesContext';

const GALLERY_ITEMS = [
  { id: 1,  category: 'Interiors', key: 'gallery.item1',  title: 'Living Room — Juhu Residence',    size: 'large' },
  { id: 2,  category: 'Furniture', key: 'gallery.item2',  title: 'Bespoke Sofa Collection',         size: 'small' },
  { id: 3,  category: 'Decor',     key: 'gallery.item3',  title: 'Curated Artefacts',              size: 'small' },
  { id: 4,  category: 'Interiors', key: 'gallery.item4',  title: 'Master Bedroom — Bandra',        size: 'large' },
  { id: 5,  category: 'Studio',    key: 'gallery.item5',  title: 'Studio Flagship — Raghuvanshi',  size: 'small' },
  { id: 6,  category: 'Furniture', key: 'gallery.item6',  title: 'Custom Dining Table',            size: 'small' },
  { id: 7,  category: 'Studio',    key: 'gallery.item7',  title: 'Juhu Showroom — Main Hall',      size: 'large' },
  { id: 8,  category: 'Decor',     key: 'gallery.item8',  title: 'Art Wall — Private Residence',   size: 'small' },
  { id: 9,  category: 'Interiors', key: 'gallery.item9',  title: 'Home Office — Khar',             size: 'small' },
  { id: 10, category: 'Furniture', key: 'gallery.item10', title: 'Statement Chair — Gold Edition', size: 'large' },
  { id: 11, category: 'Studio',    key: 'gallery.item11', title: 'Design Consultation Room',       size: 'small' },
  { id: 12, category: 'Decor',     key: 'gallery.item12', title: 'Signature Lamp Collection',      size: 'small' },
];

const CATEGORIES = ['All', 'Interiors', 'Furniture', 'Decor', 'Studio'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImg,    setLightboxImg]    = useState(null);
  const [lightboxTitle,  setLightboxTitle]  = useState('');
  const [isMobile,       setIsMobile]       = useState(window.innerWidth < 768);
  const [hoveredId,      setHoveredId]      = useState(null);
  const { images } = useSiteImages(); // ✅

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: isMobile ? '45vh' : '55vh', overflow: 'hidden' }}>
        {/* ✅ gallery.hero */}
        <img
          src={images['gallery.hero']}
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

      {/* ── FILTER + GRID ── */}
      <section style={{ padding: isMobile ? '40px 20px 60px' : '60px 60px 80px', boxSizing: 'border-box' }}>
        {/* Filter */}
        <div style={{ display: 'flex', justifyContent: 'center',
          gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '8px 20px', border: '1px solid',
              borderColor: activeCategory === cat ? '#1a1a1a' : '#ddd',
              background: activeCategory === cat ? '#1a1a1a' : 'transparent',
              color: activeCategory === cat ? '#fff' : '#888',
              fontSize: '0.62rem', letterSpacing: '2px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
              cursor: 'pointer', transition: 'all 0.3s',
            }}>{cat}</button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '12px',
          maxWidth: '1100px', margin: '0 auto',
        }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => { setLightboxImg(images[item.key]); setLightboxTitle(item.title); }}
              style={{
                position: 'relative', overflow: 'hidden', cursor: 'pointer',
                gridRow: !isMobile && item.size === 'large' ? 'span 2' : 'span 1',
                height: isMobile ? '240px' : item.size === 'large' ? '500px' : '240px',
              }}>
              {/* ✅ images[item.key] */}
              <img src={images[item.key]} alt={item.title} style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                transition: 'transform 0.6s ease',
                transform: hoveredId === item.id ? 'scale(1.06)' : 'scale(1)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.5)',
                opacity: hoveredId === item.id ? 1 : 0,
                transition: 'opacity 0.3s',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '20px',
              }}>
                <p style={{ color: '#c9a96e', fontSize: '0.56rem', letterSpacing: '3px',
                  textTransform: 'uppercase', fontFamily: 'sans-serif', margin: '0 0 8px' }}>
                  {item.category}
                </p>
                <h3 style={{ fontFamily: "'Georgia', serif", color: '#fff',
                  fontSize: '0.95rem', fontWeight: '300', margin: '0 0 10px' }}>
                  {item.title}
                </h3>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem',
                  fontFamily: 'sans-serif', letterSpacing: '1px' }}>
                  Click to enlarge
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 5000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', padding: '20px',
            boxSizing: 'border-box', cursor: 'zoom-out',
          }}>
          <button onClick={() => setLightboxImg(null)} style={{
            position: 'absolute', top: '20px', right: '28px',
            background: 'none', border: 'none',
            color: '#fff', fontSize: '1.8rem', cursor: 'pointer', lineHeight: 1,
          }}>✕</button>
          <div style={{ textAlign: 'center', maxWidth: '900px', width: '100%' }}>
            <img src={lightboxImg} alt={lightboxTitle} style={{
              maxWidth: '100%', maxHeight: '75vh',
              objectFit: 'contain', display: 'block', margin: '0 auto',
            }} />
            <p style={{ fontFamily: "'Georgia', serif", color: 'rgba(255,255,255,0.7)',
              fontSize: '0.85rem', marginTop: '16px', letterSpacing: '1px' }}>
              {lightboxTitle}
            </p>
          </div>
        </div>
      )}

    </main>
  );
};

export default Gallery;