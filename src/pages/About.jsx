import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteImages } from '../context/SiteImagesContext';
import { useContent } from '../context/ContentContext';

const About = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { images } = useSiteImages();
  const { content } = useContent(); // ✅ Get content from context

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* SECTION 1: HERO */}
      <div style={{
        padding: isMobile ? '60px 24px 40px' : '100px 80px 60px',
        boxSizing: 'border-box',
      }}>
        <p style={{
          fontSize: '0.62rem', letterSpacing: '5px',
          textTransform: 'uppercase', color: '#c9a96e',
          marginBottom: '14px', fontFamily: 'sans-serif',
        }}>
          {content['about.hero.label']}
        </p>
        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '2.2rem' : 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: '300', letterSpacing: '5px',
          color: '#1a1a1a', textTransform: 'uppercase', margin: '0 0 12px',
        }}>
          {content['about.hero.title1']}
        </h1>
        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '2.2rem' : 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: '300', letterSpacing: '5px',
          color: '#1a1a1a', textTransform: 'uppercase', margin: '0 0 8px',
        }}>
          {content['about.hero.title2']}
        </h1>
        <h2 style={{
          fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.2rem' : 'clamp(1.1rem, 2.5vw, 1.8rem)',
          fontWeight: '300', letterSpacing: '2px',
          color: '#c9a96e', textTransform: 'none', margin: '0 0 24px',
          fontStyle: 'italic',
        }}>
          {content['about.hero.subtitle']}
        </h2>
        <div style={{ width: '40px', height: '1px', background: '#c9a96e', marginBottom: '28px' }} />
        <p style={{
          fontFamily: "'Georgia', serif", fontSize: isMobile ? '0.95rem' : '1.05rem',
          color: '#666', lineHeight: '2', fontWeight: '300',
          maxWidth: '600px',
        }}>
          {content['about.hero.text']}
        </p>
      </div>

      {/* SECTION 2: NAVIGATION CARDS */}
      <section style={{
        padding: isMobile ? '20px 20px 60px' : '20px 80px 80px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '24px',
          maxWidth: '1000px',
        }}>

          {/* Overview Card */}
          <Link
            to="/about/overview"
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setHoveredCard('overview')}
            onMouseLeave={() => setHoveredCard(null)}>
            <div style={{
              background: '#fff', overflow: 'hidden',
              boxShadow: hoveredCard === 'overview'
                ? '0 12px 48px rgba(0,0,0,0.12)'
                : '0 2px 20px rgba(0,0,0,0.06)',
              transition: 'box-shadow 0.3s ease',
              cursor: 'pointer',
            }}>
              <div style={{ height: '240px', overflow: 'hidden' }}>
                <img
                  src={images['about.card.overview']}
                  alt="Overview"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    display: 'block', transition: 'transform 0.6s ease',
                    transform: hoveredCard === 'overview' ? 'scale(1.06)' : 'scale(1)',
                  }}
                />
              </div>
              <div style={{ padding: '28px 28px 32px' }}>
                <p style={{
                  fontSize: '0.58rem', letterSpacing: '4px',
                  textTransform: 'uppercase', color: '#c9a96e',
                  marginBottom: '10px', fontFamily: 'sans-serif',
                }}>
                  {content['about.card1.label']}
                </p>
                <h3 style={{
                  fontFamily: "'Georgia', serif", fontSize: '1.5rem',
                  fontWeight: '300', color: '#1a1a1a',
                  margin: '0 0 12px', letterSpacing: '1px',
                }}>
                  {content['about.card1.title']}
                </h3>
                <p style={{
                  fontFamily: 'sans-serif', fontSize: '0.8rem',
                  color: '#888', lineHeight: '1.8', margin: '0 0 22px',
                }}>
                  {content['about.card1.text']}
                </p>
                <span style={{
                  fontSize: '0.62rem', letterSpacing: '3px',
                  textTransform: 'uppercase', fontFamily: 'sans-serif',
                  color: '#1a1a1a', borderBottom: '1px solid #1a1a1a',
                  paddingBottom: '2px',
                }}>
                  {content['about.card1.link']}
                </span>
              </div>
            </div>
          </Link>

          {/* Gallery Card */}
          <Link
            to="/about/gallery"
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setHoveredCard('gallery')}
            onMouseLeave={() => setHoveredCard(null)}>
            <div style={{
              background: '#fff', overflow: 'hidden',
              boxShadow: hoveredCard === 'gallery'
                ? '0 12px 48px rgba(0,0,0,0.12)'
                : '0 2px 20px rgba(0,0,0,0.06)',
              transition: 'box-shadow 0.3s ease',
              cursor: 'pointer',
            }}>
              <div style={{ height: '240px', overflow: 'hidden' }}>
                <img
                  src={images['about.card.gallery']}
                  alt="Gallery"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    display: 'block', transition: 'transform 0.6s ease',
                    transform: hoveredCard === 'gallery' ? 'scale(1.06)' : 'scale(1)',
                  }}
                />
              </div>
              <div style={{ padding: '28px 28px 32px' }}>
                <p style={{
                  fontSize: '0.58rem', letterSpacing: '4px',
                  textTransform: 'uppercase', color: '#c9a96e',
                  marginBottom: '10px', fontFamily: 'sans-serif',
                }}>
                  {content['about.card2.label']}
                </p>
                <h3 style={{
                  fontFamily: "'Georgia', serif", fontSize: '1.5rem',
                  fontWeight: '300', color: '#1a1a1a',
                  margin: '0 0 12px', letterSpacing: '1px',
                }}>
                  {content['about.card2.title']}
                </h3>
                <p style={{
                  fontFamily: 'sans-serif', fontSize: '0.8rem',
                  color: '#888', lineHeight: '1.8', margin: '0 0 22px',
                }}>
                  {content['about.card2.text']}
                </p>
                <span style={{
                  fontSize: '0.62rem', letterSpacing: '3px',
                  textTransform: 'uppercase', fontFamily: 'sans-serif',
                  color: '#1a1a1a', borderBottom: '1px solid #1a1a1a',
                  paddingBottom: '2px',
                }}>
                  {content['about.card2.link']}
                </span>
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* SECTION 3: QUOTE */}
      <section style={{
        background: '#1a1a1a',
        padding: isMobile ? '60px 24px' : '80px 80px',
        boxSizing: 'border-box', textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.58rem', letterSpacing: '5px',
          textTransform: 'uppercase', color: '#c9a96e',
          marginBottom: '20px', fontFamily: 'sans-serif',
        }}>
          {content['about.quote.label']}
        </p>
        <blockquote style={{
          fontFamily: "'Georgia', serif", color: '#fff',
          fontSize: isMobile ? '1.2rem' : '1.7rem',
          fontWeight: '300', lineHeight: '1.8',
          maxWidth: '700px', margin: '0 auto 20px',
          fontStyle: 'italic', letterSpacing: '0.5px',
        }}>
          {content['about.quote.text']}
        </blockquote>
        <p style={{
          fontFamily: 'sans-serif', fontSize: '0.65rem',
          letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a96e',
        }}>
          {content['about.quote.author']}
        </p>
      </section>


    </main>
  );
};

export default About;