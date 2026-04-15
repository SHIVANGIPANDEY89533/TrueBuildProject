import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedCounter, MarqueeText, ServiceCard } from '../components';
import { SERVICES, STUDIO_STORY, PROJECTS } from '../constants/data';
import img9 from '../assets/images/img9.jpeg';
import img5 from '../assets/images/img5.jpeg';
import img6 from '../assets/images/img6.jpeg';
import img7 from '../assets/images/img7.jpeg';
import img8 from '../assets/images/img8.jpeg';

// ── BLACK BOLD BUTTON ──
const KnowMoreBtn = ({ to, light = false, label = 'Know More' }) => (
  <Link to={to} style={{
    display: 'inline-block', marginTop: '28px',
    padding: '14px 36px', textDecoration: 'none',
    background: light ? '#fff' : '#1a1a1a',
    color: light ? '#1a1a1a' : '#fff',
    border: `2px solid ${light ? '#fff' : '#1a1a1a'}`,
    fontSize: '0.68rem', letterSpacing: '3px',
    textTransform: 'uppercase', fontFamily: 'sans-serif',
    fontWeight: '700',
    transition: 'all 0.3s ease',
  }}
    onMouseEnter={e => {
      e.currentTarget.style.background = light ? 'transparent' : '#c9a96e';
      e.currentTarget.style.borderColor = light ? '#fff' : '#c9a96e';
      e.currentTarget.style.color = '#fff';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = light ? '#fff' : '#1a1a1a';
      e.currentTarget.style.borderColor = light ? '#fff' : '#1a1a1a';
      e.currentTarget.style.color = light ? '#1a1a1a' : '#fff';
    }}>
    {label}
  </Link>
);

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <main style={{ background: '#faf8f5' }}>

      {/* ── SECTION 1: HERO IMAGE ── */}
      <section id="home" style={{
        height: '100vh', position: 'relative',
        overflow: 'hidden', display: 'flex',
        alignItems: 'flex-end',
        padding: isMobile ? '50px 24px' : '80px 60px',
        boxSizing: 'border-box',
      }}>
        <img src={img9} alt="TrueBuild Projects" style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 55%)',
        }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{
            color: '#c9a96e', fontSize: '0.68rem',
            letterSpacing: '6px', textTransform: 'uppercase',
            marginBottom: '14px', fontFamily: 'sans-serif',
          }}>The Studio</p>
          <h1 style={{
            color: '#fff', fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '2rem' : 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: '300', letterSpacing: isMobile ? '4px' : '8px',
            textTransform: 'uppercase', margin: '0 0 20px',
          }}>TrueBuild Projects</h1>
          <div style={{ width: '55px', height: '1px', background: '#c9a96e' }} />
        </div>
      </section>

      {/* ── SECTION 2: ABOUT / COUNTER + STORY ── */}
      <section id="about" style={{
        padding: isMobile ? '60px 24px' : '100px 60px',
        display: 'flex', alignItems: 'center',
        gap: isMobile ? '40px' : '70px',
        flexDirection: isMobile ? 'column' : 'row',
        background: '#faf8f5', boxSizing: 'border-box',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '0.62rem', letterSpacing: '5px',
            textTransform: 'uppercase', color: '#bbb',
            marginBottom: '10px', fontFamily: 'sans-serif',
          }}>Started in</p>
          <AnimatedCounter target={2018} />
        </div>
        {!isMobile && <div style={{ width: '1px', height: '140px', background: '#ddd', flexShrink: 0 }} />}
        <div style={{ flex: 1, maxWidth: '580px' }}>
          <p style={{
            fontSize: '0.62rem', letterSpacing: '5px',
            textTransform: 'uppercase', color: '#c9a96e',
            marginBottom: '18px', fontFamily: 'sans-serif',
          }}>Our Story</p>
          <h2 style={{
            fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '1.3rem' : 'clamp(1.2rem, 2.5vw, 1.8rem)',
            fontWeight: '300', color: '#1a1a1a',
            lineHeight: '1.6', marginBottom: '22px',
          }}>
            It began at home, like it does with all great things.
          </h2>
          <p style={{
            fontSize: '0.86rem', color: '#888',
            lineHeight: '2.2', margin: 0, fontFamily: 'sans-serif',
          }}>
            {STUDIO_STORY}
          </p>
          <KnowMoreBtn to="/about" label="Know More" />
        </div>
      </section>

      {/* ── SECTION 3: FULL WIDTH IMAGE ── */}
      <section style={{ height: isMobile ? '40vh' : '65vh', overflow: 'hidden' }}>
        <img src={img5} alt="Interior" style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
        }} />
      </section>

      {/* ── SECTION 4: SERVICES ── */}
      <section id="services" style={{ background: '#fff', paddingTop: '80px', paddingBottom: '80px' }}>
        <p style={{
          textAlign: 'center', fontSize: '0.62rem',
          letterSpacing: '5px', textTransform: 'uppercase',
          color: '#c9a96e', marginBottom: '12px', fontFamily: 'sans-serif',
        }}>What We Do</p>
        <h2 style={{
          textAlign: 'center', fontFamily: "'Georgia', serif",
          fontWeight: '300', fontSize: isMobile ? '1.4rem' : '2rem',
          color: '#1a1a1a', letterSpacing: '3px',
          marginBottom: '48px',
        }}>Our Expertise</h2>
        <div style={{
          display: 'flex', gap: '3px',
          flexDirection: isMobile ? 'column' : 'row',
        }}>
          {SERVICES.map(s => (
            <ServiceCard key={s.id} title={s.title} img={s.img} />
          ))}
        </div>
      </section>

      {/* ── SECTION 5: MARQUEE ── */}
      <section style={{ background: '#fff', padding: isMobile ? '0 24px' : '0 60px' }}>
        <MarqueeText />
      </section>

      {/* ── SECTION 6: OUR WORK ── */}
      <section id="our-work" style={{
        padding: isMobile ? '60px 24px' : '100px 60px',
        background: '#faf8f5', boxSizing: 'border-box',
      }}>
        <p style={{
          fontSize: '0.62rem', letterSpacing: '5px',
          textTransform: 'uppercase', color: '#c9a96e',
          marginBottom: '12px', fontFamily: 'sans-serif',
          textAlign: 'center',
        }}>Portfolio</p>
        <h2 style={{
          textAlign: 'center', fontFamily: "'Georgia', serif",
          fontWeight: '300', fontSize: isMobile ? '1.4rem' : '2rem',
          color: '#1a1a1a', letterSpacing: '3px', marginBottom: '48px',
        }}>Our Work</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '3px',
        }}>
          {PROJECTS.map(project => (
            <div key={project.id} style={{
              position: 'relative', overflow: 'hidden', height: '380px',
            }}>
              <img src={project.img} alt={project.title} style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                transition: 'transform 0.6s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
              }} />
              <div style={{ position: 'absolute', bottom: '28px', left: '28px' }}>
                <p style={{
                  fontSize: '0.58rem', letterSpacing: '3px',
                  textTransform: 'uppercase', color: '#c9a96e',
                  fontFamily: 'sans-serif', margin: '0 0 6px',
                }}>{project.category}</p>
                <h3 style={{
                  color: '#fff', fontFamily: "'Georgia', serif",
                  fontWeight: '300', fontSize: '1.3rem',
                  letterSpacing: '2px', margin: 0,
                }}>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <KnowMoreBtn to="/projects" label="View All Projects" />
        </div>
      </section>

      {/* ── SECTION 7: TRUEBUILD SIGNATURE BLOCK ── */}
      <section style={{
        position: 'relative', minHeight: isMobile ? '50vh' : '72vh',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
      }}>
        <img src={img6} alt="Signature" style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
        <div style={{
          position: 'relative', zIndex: 1,
          padding: isMobile ? '60px 24px' : '80px 60px',
        }}>
          <p style={{
            fontSize: '0.62rem', letterSpacing: '5px',
            textTransform: 'uppercase', color: '#c9a96e',
            marginBottom: '18px', fontFamily: 'sans-serif',
          }}>Creative Director</p>
          <h2 style={{
            fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '2.5rem' : 'clamp(2.5rem, 5vw, 5rem)',
            fontWeight: '300', color: '#fff',
            letterSpacing: '6px', textTransform: 'uppercase', margin: 0,
          }}>TrueBuild Projects</h2>
          <div style={{ width: '55px', height: '1px', background: '#c9a96e', margin: '26px 0' }} />
          <p style={{
            fontSize: '0.72rem', color: '#ccc',
            letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'sans-serif',
          }}>Design. Build. Inspire.</p>
          <KnowMoreBtn to="/about" light={true} label="About Us" />
        </div>
      </section>

    </main>
  );
};

export default Home;