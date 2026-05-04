import React, { useState, useEffect } from 'react';
import { useProjects, PROJECT_CATEGORIES } from '../context/ProjectsContext';

const Projects = () => {
  const { projects, loading } = useProjects();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxData, setLightboxData] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

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
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Only show categories that have at least one project
  const activeCategories = PROJECT_CATEGORIES.filter(cat =>
    cat === 'All' || projects.some(p => p.category === cat)
  );

  if (loading) {
    return (
      <main style={{ paddingTop: '90px', minHeight: '100vh', background: '#faf8f5',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '42px', height: '42px',
            border: '2px solid #e8e3db', borderTop: '2px solid #c9a96e',
            borderRadius: '50%', animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.6rem',
            letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb' }}>
            Loading Projects...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '90px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* ── HERO ── */}
      <div style={{ padding: isMobile ? '50px 24px 36px' : '70px 60px 50px' }}>
        <p style={{
          fontSize: '0.62rem', letterSpacing: '5px',
          textTransform: 'uppercase', color: '#c9a96e',
          marginBottom: '14px', fontFamily: 'sans-serif',
        }}>Portfolio</p>
        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '2.2rem' : 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: '300', letterSpacing: '5px',
          color: '#1a1a1a', textTransform: 'uppercase', margin: '0 0 12px',
        }}>Our Projects</h1>
        <div style={{ width: '40px', height: '1px', background: '#c9a96e', marginBottom: '12px' }} />
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem',
          color: '#999', lineHeight: '1.8', maxWidth: '480px', margin: 0 }}>
          {projects.length} project{projects.length !== 1 ? 's' : ''} delivered — from first stone to final finish.
        </p>
      </div>

      {/* ── CATEGORY FILTER ── */}
      <div style={{
        display: 'flex', justifyContent: isMobile ? 'flex-start' : 'center',
        gap: '6px', flexWrap: 'wrap',
        padding: isMobile ? '0 24px 32px' : '0 60px 40px',
        overflowX: isMobile ? 'auto' : 'visible',
      }}>
        {activeCategories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '8px 18px', border: '1px solid',
            borderColor: activeCategory === cat ? '#1a1a1a' : '#ddd',
            background: activeCategory === cat ? '#1a1a1a' : 'transparent',
            color: activeCategory === cat ? '#fff' : '#888',
            fontSize: '0.6rem', letterSpacing: '2px',
            textTransform: 'uppercase', fontFamily: 'sans-serif',
            cursor: 'pointer', transition: 'all 0.25s', whiteSpace: 'nowrap',
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* ── PROJECTS GRID ── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ color: '#bbb', fontFamily: "'Georgia', serif", fontSize: '1rem' }}>
            No projects in this category yet.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '4px',
          padding: isMobile ? '0 0 60px' : '0 60px 80px',
        }}>
          {filtered.map(p => (
            <div
              key={p.id}
              style={{
                position: 'relative', height: '340px',
                overflow: 'hidden', cursor: 'zoom-in',
              }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => { setLightboxImg(p.img); setLightboxData(p); }}
            >
              <img src={p.img} alt={p.title} style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                transition: 'transform 0.6s ease',
                transform: hoveredId === p.id ? 'scale(1.06)' : 'scale(1)',
              }} />

              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: hoveredId === p.id
                  ? 'linear-gradient(transparent 30%, rgba(0,0,0,0.75))'
                  : 'linear-gradient(transparent, rgba(0,0,0,0.55))',
                transition: 'background 0.35s',
              }} />

              {/* Caption */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px',
                transform: hoveredId === p.id ? 'translateY(0)' : 'translateY(4px)',
                transition: 'transform 0.35s',
              }}>
                <p style={{
                  color: '#c9a96e', fontSize: '0.56rem',
                  letterSpacing: '3px', textTransform: 'uppercase',
                  margin: '0 0 5px', fontFamily: 'sans-serif',
                }}>{p.category}</p>
                <p style={{
                  color: '#fff', fontFamily: "'Georgia', serif",
                  fontSize: '1.1rem', fontWeight: '300',
                  letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 4px',
                }}>{p.title}</p>
                {p.location && (
                  <p style={{
                    color: 'rgba(255,255,255,0.55)', fontSize: '0.65rem',
                    fontFamily: 'sans-serif', margin: '0',
                    opacity: hoveredId === p.id ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}>
                    📍 {p.location}{p.year ? ` · ${p.year}` : ''}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {lightboxImg && lightboxData && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 5000,
            background: 'rgba(0,0,0,0.94)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px', boxSizing: 'border-box', cursor: 'zoom-out',
          }}
        >
          <button onClick={() => setLightboxImg(null)} style={{
            position: 'absolute', top: '20px', right: '28px',
            background: 'none', border: 'none',
            color: '#fff', fontSize: '1.8rem', cursor: 'pointer', lineHeight: 1,
          }}>✕</button>

          <div
            style={{
              display: 'flex', flexDirection: isMobile ? 'column' : 'row',
              gap: '32px', maxWidth: '1000px', width: '100%',
              alignItems: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            <img src={lightboxImg} alt={lightboxData.title} style={{
              maxWidth: isMobile ? '100%' : '62%',
              maxHeight: '75vh', objectFit: 'contain',
              display: 'block', flex: '0 0 auto',
            }} />
            <div style={{ flex: 1, padding: isMobile ? '0' : '20px 0' }}>
              <p style={{ fontSize: '0.56rem', letterSpacing: '4px',
                textTransform: 'uppercase', color: '#c9a96e',
                fontFamily: 'sans-serif', margin: '0 0 10px' }}>
                {lightboxData.category}
              </p>
              <h2 style={{ fontFamily: "'Georgia', serif", color: '#fff',
                fontSize: isMobile ? '1.4rem' : '1.8rem',
                fontWeight: '300', letterSpacing: '2px',
                textTransform: 'uppercase', margin: '0 0 12px' }}>
                {lightboxData.title}
              </h2>
              {(lightboxData.location || lightboxData.year) && (
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.45)', margin: '0 0 18px', letterSpacing: '1px' }}>
                  {lightboxData.location}{lightboxData.location && lightboxData.year ? ' · ' : ''}{lightboxData.year}
                </p>
              )}
              {lightboxData.description && (
                <p style={{ fontFamily: "'Georgia', serif", color: 'rgba(255,255,255,0.72)',
                  fontSize: '0.9rem', lineHeight: '1.9', margin: 0, fontWeight: '300' }}>
                  {lightboxData.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default Projects;