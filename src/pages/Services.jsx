import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CONSTRUCTION_PROJECTS } from '../constants/data';
import { useSiteImages } from '../context/SiteImagesContext';

const SERVICE_CARDS = [
  {
    title:    'Construction Services',
    subtitle: 'Complete Build',
    desc:     'From groundbreaking to final finish — structurally sound, beautifully executed buildings across all residential and commercial project types.',
    img:      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    path:     '/services/construction',
    tag:      'Structural',
    points:   ['Excavation', 'Structure — Foundation to Roof', 'Masonry Work', 'Plaster Work'],
  },
  {
    title:    'MEP Services',
    subtitle: 'Veins & Nerves',
    desc:     'We integrate complete electrical and plumbing systems with a focus on safety and long-term durability — wiring, panels, smart home, leak-proof piping, and drainage.',
    img:      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80',
    path:     '/services/mep',
    tag:      'Electrical & Plumbing',
    points:   ['Complete Electrical Wiring', 'Smart Home Integration', 'Plumbing & Drainage Systems'],
  },
  {
    title:    'Finishing & Aesthetics',
    subtitle: 'Where House Meets Home',
    desc:     'Premium textures, weather-proof coatings, marble & granite flooring, and modern POP false ceilings — every finish is a statement of craftsmanship.',
    img:      'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=800&q=80',
    path:     '/services/finishing',
    tag:      'Finishing',
    points:   ['Interior & Exterior Painting', 'Marble, Granite & Tile Flooring', 'False Ceiling & POP Work'],
  },
  {
    title:    'Interior Design & Furniture',
    subtitle: 'Made to Measure',
    desc:     'Full space planning, 3D visualization, modular kitchens, custom wardrobes, and bespoke handcrafted furniture — designed exclusively for your space.',
    img:      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    path:     '/services/interiors',
    tag:      'Interiors',
    // ✅ Updated points here:
    points:   [
      'Living Space', 
      'Luxury Bedroom', 
      'Modern Washroom', 
      'Wall Panelling', 
      'False Ceiling'
    ],
  },
];

const Services = () => {
  const [isMobile,   setIsMobile]   = useState(window.innerWidth < 768);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [hoveredCon, setHoveredCon] = useState(null);
  const { images } = useSiteImages(); // ✅

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: isMobile ? '45vh' : '55vh', overflow: 'hidden' }}>
        {/* ✅ services.hero = img8 */}
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
        padding: isMobile ? '20px 24px' : '18px 60px',
        display: 'flex', justifyContent: 'center',
        flexWrap: 'wrap', gap: isMobile ? '12px 24px' : '0',
      }}>
        {['🏗️ Construction', '⚡ MEP Services', '🎨 Finishing', '🛋️ Interior Design'].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center',
            color: '#fff', fontFamily: 'sans-serif',
            fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase',
            padding: isMobile ? '0' : '0 32px',
            borderRight: !isMobile && i < 3 ? '1px solid rgba(255,255,255,0.35)' : 'none',
          }}>
            {item}
          </div>
        ))}
      </div>

      {/* ── SERVICE CARDS GRID ── */}
      <section style={{
        padding: isMobile ? '50px 20px 60px' : '80px 60px',
        boxSizing: 'border-box',
      }}>
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '24px', maxWidth: '1100px', margin: '0 auto',
        }}>
          {SERVICE_CARDS.map((svc, idx) => (
            <Link key={idx} to={svc.path} style={{ textDecoration: 'none' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}>
              <div style={{
                background: '#fff', overflow: 'hidden',
                boxShadow: hoveredIdx === idx ? '0 12px 48px rgba(0,0,0,0.12)' : '0 2px 16px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.3s', height: '100%',
              }}>
                <div style={{ height: isMobile ? '220px' : '260px', overflow: 'hidden', position: 'relative' }}>
                  <img src={svc.img} alt={svc.title} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    display: 'block', transition: 'transform 0.6s ease',
                    transform: hoveredIdx === idx ? 'scale(1.06)' : 'scale(1)',
                  }} />
                  <span style={{
                    position: 'absolute', top: '14px', left: '14px',
                    background: 'rgba(255,255,255,0.92)',
                    padding: '4px 10px', fontSize: '0.55rem',
                    letterSpacing: '2px', textTransform: 'uppercase',
                    color: '#888', fontFamily: 'sans-serif',
                  }}>
                    {svc.tag}
                  </span>
                </div>
                <div style={{ padding: '28px 28px 32px' }}>
                  <p style={{ fontSize: '0.58rem', letterSpacing: '4px',
                    textTransform: 'uppercase', color: '#c9a96e',
                    marginBottom: '8px', fontFamily: 'sans-serif' }}>
                    {svc.subtitle}
                  </p>
                  <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1.4rem',
                    fontWeight: '300', color: '#1a1a1a', margin: '0 0 12px', letterSpacing: '1px' }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem',
                    color: '#888', lineHeight: '1.8', margin: '0 0 18px' }}>
                    {svc.desc}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px' }}>
                    {svc.points.map((pt, pi) => (
                      <li key={pi} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        fontFamily: 'sans-serif', fontSize: '0.75rem',
                        color: '#666', padding: '4px 0',
                        borderBottom: pi < svc.points.length - 1 ? '1px solid #f0ebe3' : 'none',
                      }}>
                        <span style={{ color: '#c9a96e', fontSize: '0.5rem' }}>◆</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <span style={{
                    fontSize: '0.62rem', letterSpacing: '3px',
                    textTransform: 'uppercase', fontFamily: 'sans-serif',
                    color: '#1a1a1a', borderBottom: '1px solid #1a1a1a', paddingBottom: '2px',
                  }}>
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TRUEBUILD PROMISE ── */}
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
                <p style={{ fontFamily: "'Georgia', serif", fontSize: isMobile ? '2rem' : '2.4rem',
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

      {/* ── BUILDING CONSTRUCTION GALLERY ── */}
      <section style={{
        padding: isMobile ? '60px 24px 70px' : '100px 80px',
        background: '#1a1a1a', boxSizing: 'border-box',
      }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '64px' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
            color: '#c9a96e', marginBottom: '12px', fontFamily: 'sans-serif' }}>
            Our Work
          </p>
          <h2 style={{ fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '300', color: '#fff',
            margin: '0 0 16px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            Building Construction
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 20px' }} />
          <p style={{ fontFamily: "'Georgia', serif", fontSize: isMobile ? '0.9rem' : '1rem',
            color: 'rgba(255,255,255,0.5)', lineHeight: '1.9',
            maxWidth: '560px', margin: '0 auto', fontWeight: '300' }}>
            From ground-up construction to complete structural builds — precision-engineered
            for lasting strength and timeless aesthetics.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '16px' : '20px',
          maxWidth: '1200px', margin: '0 auto 52px',
        }}>
          {CONSTRUCTION_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredCon(idx)}
              onMouseLeave={() => setHoveredCon(null)}
              style={{
                position: 'relative', overflow: 'hidden',
                aspectRatio: isMobile ? '4/3' : idx === 0 ? '3/4' : '4/3',
                cursor: 'default',
              }}>
              <img
                src={project.img}
                alt={project.title}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  transition: 'transform 0.6s ease',
                  transform: hoveredCon === idx ? 'scale(1.06)' : 'scale(1)',
                }}
              />
              {!isMobile && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
                  opacity: hoveredCon === idx ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'flex-end', padding: '28px',
                }}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.55rem', letterSpacing: '3px',
                    textTransform: 'uppercase', color: '#c9a96e', margin: '0 0 6px' }}>
                    {project.category}
                  </p>
                  <p style={{ fontFamily: "'Georgia', serif", fontSize: '1.1rem',
                    color: '#fff', margin: 0, fontWeight: '300', letterSpacing: '1px' }}>
                    {project.title}
                  </p>
                </div>
              )}
              {isMobile && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.82), transparent)',
                  padding: '24px 16px 14px',
                }}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.5rem', letterSpacing: '3px',
                    textTransform: 'uppercase', color: '#c9a96e', margin: '0 0 4px' }}>
                    {project.category}
                  </p>
                  <p style={{ fontFamily: "'Georgia', serif", fontSize: '0.9rem',
                    color: '#fff', margin: 0, fontWeight: '300' }}>
                    {project.title}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex', gap: '10px', justifyContent: 'center',
          flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto 52px',
        }}>
          {['Structural Design', 'Commercial Builds', 'Residential Projects', 'Architectural Planning', 'Site Management'].map((tag, i) => (
            <span key={i} style={{
              padding: '8px 20px', border: '1px solid rgba(201,169,110,0.3)',
              color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif',
              fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/contact" style={{
            display: 'inline-block', padding: '13px 40px',
            background: '#c9a96e', color: '#fff', textDecoration: 'none',
            fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase',
            fontFamily: 'sans-serif', transition: 'background 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#b8935a'}
            onMouseLeave={e => e.currentTarget.style.background = '#c9a96e'}>
            Discuss Your Construction Project →
          </Link>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{
        background: '#f5f0ea',
        padding: isMobile ? '60px 24px' : '80px 60px',
        textAlign: 'center', boxSizing: 'border-box',
      }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: '#c9a96e', marginBottom: '16px', fontFamily: 'sans-serif' }}>
          Start a Project
        </p>
        <h2 style={{ fontFamily: "'Georgia', serif", color: '#1a1a1a',
          fontSize: isMobile ? '1.6rem' : '2rem',
          fontWeight: '300', margin: '0 0 20px', letterSpacing: '1px' }}>
          Have a project in mind?
        </h2>
        <p style={{ color: '#888', fontFamily: 'sans-serif', fontSize: '0.85rem',
          lineHeight: '1.9', maxWidth: '480px', margin: '0 auto 32px' }}>
          We handle everything — from architectural planning to the final finishing touch.
        </p>
        <Link to="/contact" style={{
          display: 'inline-block', padding: '14px 40px',
          background: '#1a1a1a', color: '#fff', textDecoration: 'none',
          fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase',
          fontFamily: 'sans-serif', transition: 'background 0.3s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
          onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
          Book a Free Consultation
        </Link>
      </section>

    </main>
  );
};

export default Services;