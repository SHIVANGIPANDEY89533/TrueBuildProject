import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteImages } from '../context/SiteImagesContext';
import { useServices } from '../context/ServicesContext';

const Services = () => {
  const [isMobile,   setIsMobile]   = useState(window.innerWidth < 768);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [expanded,   setExpanded]   = useState(null);
  const { images } = useSiteImages();
  const { services, loading } = useServices();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Default image fallbacks from SiteImagesContext
  const IMG_FALLBACKS = [
    images['services.card.construction'],
    images['services.card.mep'],
    images['services.card.finishing'],
    images['services.card.interior'],
  ];

  const getImg = (svc, idx) => svc.img || IMG_FALLBACKS[idx % IMG_FALLBACKS.length] || images['services.hero'];

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: isMobile ? '45vh' : '55vh', overflow: 'hidden' }}>
        <img
          src={images['services.hero']}
          alt="TrueBuild Services"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 20px',
        }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', marginBottom: '16px' }}>
            One Team · One Vision · Zero Stress
          </p>
          <h1 style={{
            fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300', letterSpacing: '6px',
            textTransform: 'uppercase', margin: '0 0 16px',
          }}>
            Our Services
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 20px' }} />
          <p style={{
            color: 'rgba(255,255,255,0.65)', fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '0.85rem' : '1rem',
            fontWeight: '300', lineHeight: '1.8', maxWidth: '560px',
          }}>
            From the first shovel in the ground to the final coat of paint — quality, integrity, and precision.
          </p>
        </div>
      </div>

      {/* ── PROMISE STRIP ── */}
      <div style={{
        background: '#c9a96e',
        padding: isMobile ? '16px 24px' : '16px 60px',
        display: 'flex', justifyContent: 'center',
        flexWrap: 'wrap', gap: isMobile ? '10px 20px' : '0',
      }}>
        {(loading ? ['…', '…', '…', '…'] : services.map(s => `${s.tag || s.title}`))
          .slice(0, 6).map((item, i, arr) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center',
            color: '#fff', fontFamily: 'sans-serif',
            fontSize: '0.58rem', letterSpacing: '2px', textTransform: 'uppercase',
            padding: isMobile ? '0' : '0 28px',
            borderRight: !isMobile && i < arr.length - 1 ? '1px solid rgba(255,255,255,0.35)' : 'none',
          }}>
            {item}
          </div>
        ))}
      </div>

      {/* ── SECTION HEADER ── */}
      <section style={{ padding: isMobile ? '50px 20px 20px' : '80px 60px 40px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '36px' : '56px' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
            color: '#c9a96e', marginBottom: '12px', fontFamily: 'sans-serif' }}>
            What We Offer
          </p>
          <h2 style={{ fontFamily: "'Georgia', serif", fontWeight: '300',
            fontSize: isMobile ? '1.8rem' : '2.4rem', color: '#1a1a1a',
            margin: '0 0 16px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            End-to-End Project Delivery
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto' }} />
        </div>

        {/* ── SERVICE CARDS GRID ── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{
              width: '40px', height: '40px',
              border: '2px solid #e8e3db', borderTop: '2px solid #c9a96e',
              borderRadius: '50%', animation: 'spin 0.8s linear infinite',
              margin: '0 auto 16px',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '24px', maxWidth: '1100px', margin: '0 auto',
          }}>
            {services.map((svc, idx) => (
              <div
                key={svc.id}
                style={{
                  background: '#fff', overflow: 'hidden',
                  boxShadow: hoveredIdx === idx
                    ? '0 12px 48px rgba(0,0,0,0.12)'
                    : '0 2px 16px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Image */}
                <div style={{ height: isMobile ? '200px' : '240px', overflow: 'hidden', position: 'relative' }}>
                  <img src={getImg(svc, idx)} alt={svc.title} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    display: 'block', transition: 'transform 0.6s ease',
                    transform: hoveredIdx === idx ? 'scale(1.06)' : 'scale(1)',
                  }} />
                  {svc.tag && (
                    <span style={{
                      position: 'absolute', top: '14px', left: '14px',
                      background: 'rgba(255,255,255,0.92)',
                      padding: '4px 10px', fontSize: '0.55rem',
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: '#888', fontFamily: 'sans-serif',
                    }}>
                      {svc.tag}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '28px 28px 32px' }}>
                  {svc.subtitle && (
                    <p style={{ fontSize: '0.58rem', letterSpacing: '4px',
                      textTransform: 'uppercase', color: '#c9a96e',
                      marginBottom: '8px', fontFamily: 'sans-serif' }}>
                      {svc.subtitle}
                    </p>
                  )}
                  <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1.4rem',
                    fontWeight: '300', color: '#1a1a1a', margin: '0 0 12px', letterSpacing: '1px' }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem',
                    color: '#888', lineHeight: '1.8', margin: '0 0 16px' }}>
                    {svc.desc}
                  </p>

                  {/* Bullet Points */}
                  {svc.points && svc.points.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
                      {(expanded === idx ? svc.points : svc.points.slice(0, 3)).map((pt, pi) => (
                        <li key={pi} style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          fontFamily: 'sans-serif', fontSize: '0.75rem',
                          color: '#666', padding: '5px 0',
                          borderBottom: pi < Math.min(expanded === idx ? svc.points.length : 3, svc.points.length) - 1
                            ? '1px solid #f0ebe3' : 'none',
                        }}>
                          <span style={{ color: '#c9a96e', fontSize: '0.5rem', flexShrink: 0 }}>◆</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Show more / less */}
                  {svc.points && svc.points.length > 3 && (
                    <button
                      onClick={() => setExpanded(expanded === idx ? null : idx)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: '0.6rem', letterSpacing: '2px',
                        textTransform: 'uppercase', fontFamily: 'sans-serif',
                        color: '#c9a96e', padding: '0 0 16px',
                      }}>
                      {expanded === idx ? '− Show Less' : `+ ${svc.points.length - 3} More`}
                    </button>
                  )}

                  <Link to="/contact" style={{
                    display: 'inline-block',
                    fontSize: '0.62rem', letterSpacing: '3px',
                    textTransform: 'uppercase', fontFamily: 'sans-serif',
                    color: '#1a1a1a', borderBottom: '1px solid #1a1a1a',
                    paddingBottom: '2px', textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#c9a96e'; e.currentTarget.style.borderColor = '#c9a96e'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.borderColor = '#1a1a1a'; }}>
                    Enquire Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── PROMISE SECTION ── */}
      <section style={{
        background: '#f5f0ea',
        padding: isMobile ? '60px 24px' : '80px 60px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '80px', alignItems: 'center',
        }}>
          <div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
              color: '#c9a96e', marginBottom: '16px', fontFamily: 'sans-serif' }}>
              The TrueBuild Promise
            </p>
            <h2 style={{ fontFamily: "'Georgia', serif", fontWeight: '300',
              fontSize: isMobile ? '1.8rem' : '2.2rem', color: '#1a1a1a',
              margin: '0 0 20px', letterSpacing: '2px', lineHeight: '1.35' }}>
              One Team.<br />One Vision.<br />Zero Stress.
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 0 24px' }} />
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#666',
              lineHeight: '1.9', margin: '0 0 24px' }}>
              We manage every phase of the project, ensuring seamless transitions between
              structural work and interior finishing.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Complete project management — start to finish',
                'Seamless transition from structure to interiors',
                'Transparent timelines and fixed-cost contracts',
                'Dedicated site manager for every project',
              ].map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#c9a96e', marginTop: '2px', fontSize: '0.7rem' }}>✓</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#555', lineHeight: '1.6' }}>
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { num: '6+',   label: 'Years of Experience' },
              { num: '200+', label: 'Projects Delivered'  },
              { num: '100%', label: 'Client Satisfaction' },
              { num: '1',    label: 'Team, Every Phase'   },
            ].map((stat, i) => (
              <div key={i} style={{
                background: '#fff',
                padding: isMobile ? '24px 16px' : '32px 24px',
                textAlign: 'center',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              }}>
                <p style={{ fontFamily: "'Georgia', serif",
                  fontSize: isMobile ? '2rem' : '2.4rem',
                  color: '#c9a96e', fontWeight: '300', margin: '0 0 8px', letterSpacing: '2px' }}>
                  {stat.num}
                </p>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.6rem', color: '#888',
                  letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{
        background: '#1a1a1a',
        padding: isMobile ? '60px 24px' : '80px 60px',
        textAlign: 'center', boxSizing: 'border-box',
      }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: '#c9a96e', marginBottom: '16px', fontFamily: 'sans-serif' }}>
          Start a Project
        </p>
        <h2 style={{ fontFamily: "'Georgia', serif", color: '#fff',
          fontSize: isMobile ? '1.6rem' : '2rem',
          fontWeight: '300', margin: '0 0 20px', letterSpacing: '1px' }}>
          Have a project in mind?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', fontSize: '0.85rem',
          lineHeight: '1.9', maxWidth: '480px', margin: '0 auto 32px' }}>
          We handle everything — from architectural planning to the final finishing touch.
        </p>
        <Link to="/contact" style={{
          display: 'inline-block', padding: '14px 40px',
          background: '#c9a96e', color: '#fff', textDecoration: 'none',
          fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase',
          fontFamily: 'sans-serif', transition: 'background 0.3s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#b8935a'}
          onMouseLeave={e => e.currentTarget.style.background = '#c9a96e'}>
          Book a Free Consultation
        </Link>
      </section>

    </main>
  );
};

export default Services;