import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSiteImages } from '../context/SiteImagesContext';

// ... (CATEGORIES aur PRODUCTS arrays bilkul same rahenge)

const Bespoke = () => {
  const [isMobile,       setIsMobile]       = useState(window.innerWidth < 768);
  const [activeCategory, setActiveCategory] = useState('All');
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [visibleCount,   setVisibleCount]   = useState(12);
  const categoryBarRef = useRef(null);
  const { images } = useSiteImages(); // ✅

  // ... (useEffect, filtered, visible — same rahega)

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: isMobile ? '50vh' : '65vh', overflow: 'hidden' }}>
        {/* ✅ bespoke.hero */}
        <img
          src={images['bespoke.hero']}
          alt="Bespoke Furniture"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* ... baaki hero content same ... */}
      </div>

      {/* ... search bar, category filter, product grid — SAME ... */}

      {/* ── CRAFTSMANSHIP SECTION ── */}
      <section style={{
        background: '#1a1a1a',
        padding: isMobile ? '60px 24px' : '80px 80px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '40px' : '80px',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}>
        {/* Left text — same */}
        <div> {/* ... same content ... */} </div>

        {/* Right — 2x2 image grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
          {/* ✅ 4 craft images */}
          {[
            images['bespoke.craft1'],
            images['bespoke.craft2'],
            images['bespoke.craft3'],
            images['bespoke.craft4'],
          ].map((src, i) => (
            <img key={i} src={src} alt={`Craft ${i}`}
              style={{ width: '100%', height: isMobile ? '130px' : '200px',
                objectFit: 'cover', display: 'block' }}
            />
          ))}
        </div>
      </section>

      {/* ... CTA + Modal — same ... */}
    </main>
  );
};

export default Bespoke;