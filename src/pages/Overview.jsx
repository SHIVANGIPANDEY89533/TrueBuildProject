import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── Animated Counter Hook
const useCounter = (target, duration = 2000, startCounting) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [startCounting, target]);
  return count;
};

const STATS = [
  { value: 10, label: 'Years of Engineering Excellence', suffix: '+' },
  { value: 300, label: 'Projects Delivered', suffix: '+' },
  { value: 150, label: 'Happy Clients', suffix: '+' },
];

const HOW_WE_STARTED = [
  {
    num: '01',
    icon: '◫',
    title: 'Years of proven expertise',
    desc: 'Before founding TrueBuild, both partners worked across a wide range of demanding engineering and construction projects — gaining deep, practical experience in design, execution, and delivery under real-world conditions.',
  },
  {
    num: '02',
    icon: '◎',
    title: 'A gap we knew how to fill',
    desc: 'We saw clients struggle to manage multiple contractors, unclear timelines, and fragmented work. We decided to build a company that solves this — offering every building service under one roof, led by engineers who have done it themselves.',
  },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'We begin with an in-depth conversation to understand your requirements, budget, and vision for the project.',
    icon: '◇',
  },
  {
    num: '02',
    title: 'Planning & Design',
    desc: 'Our team develops detailed architectural plans, structural layouts, and material specifications tailored to your brief.',
    icon: '◈',
  },
  {
    num: '03',
    title: 'Construction',
    desc: 'Skilled engineers and workers execute every phase — from foundation to furniture — with precision and quality.',
    icon: '◉',
  },
  {
    num: '04',
    title: 'Final Handover',
    desc: 'We do a thorough quality check and hand over your completed project on time, every time.',
    icon: '◎',
  },
];

const Overview = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const c0 = useCounter(STATS[0].value, 2000, statsVisible);
  const c1 = useCounter(STATS[1].value, 2000, statsVisible);
  const c2 = useCounter(STATS[2].value, 2000, statsVisible);
  const counts = [c0, c1, c2];

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* SECTION 1: HERO BANNER */}
      <div style={{ position: 'relative', height: isMobile ? '50vh' : '65vh', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
          alt="Construction Overview"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 20px',
        }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', marginBottom: '16px' }}>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>About</Link>
            {' '} / Overview
          </p>
          <h1 style={{
            fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300', letterSpacing: '6px',
            textTransform: 'uppercase', margin: '0 0 20px',
          }}>
            Our Story
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 20px' }} />
          <p style={{
            color: 'rgba(255,255,255,0.8)', fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            fontWeight: '300', maxWidth: '560px', lineHeight: '1.8',
          }}>
            Two engineers. One vision. Your complete building partner.
          </p>
        </div>
      </div>

      {/* SECTION 2: HOW WE STARTED */}
      <section style={{
        padding: isMobile ? '60px 24px' : '100px 80px',
        boxSizing: 'border-box',
        background: '#fff',
      }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '64px' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
            color: '#c9a96e', marginBottom: '12px', fontFamily: 'sans-serif' }}>
            How We Started
          </p>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: isMobile ? '1.8rem' : '2.4rem',
            fontWeight: '300', color: '#1a1a1a', margin: '0 0 16px', letterSpacing: '1px' }}>
            Built on experience. Driven by purpose.
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '32px' : '40px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {HOW_WE_STARTED.map((item, idx) => (
            <div key={idx} style={{
              background: '#faf8f5', padding: '36px 32px',
              transition: 'box-shadow 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.55rem',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: '#c9a96e', marginBottom: '14px' }}>
                {item.num}
              </p>
              <div style={{ fontSize: '2rem', color: '#1a1a1a', marginBottom: '16px', lineHeight: 1 }}>
                {item.icon}
              </div>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1.2rem',
                fontWeight: '400', color: '#1a1a1a', margin: '0 0 14px', letterSpacing: '0.5px' }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem',
                color: '#777', lineHeight: '1.9', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: ANIMATED STATS */}
      <section ref={statsRef} style={{
        background: '#1a1a1a',
        padding: isMobile ? '60px 24px' : '80px 60px',
        boxSizing: 'border-box',
      }}>
        <p style={{ textAlign: 'center', fontSize: '0.6rem', letterSpacing: '5px',
          textTransform: 'uppercase', color: '#c9a96e',
          marginBottom: '16px', fontFamily: 'sans-serif' }}>
          Our Numbers
        </p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '300',
          color: '#fff', margin: '0 0 60px', letterSpacing: '1px' }}>
          Numbers that speak for themselves
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '40px' : '0',
          maxWidth: '900px', margin: '0 auto',
          textAlign: 'center',
        }}>
          {STATS.map((stat, idx) => (
            <div key={idx} style={{
              padding: isMobile ? '0' : '0 40px',
              borderRight: !isMobile && idx < STATS.length - 1
                ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{ fontFamily: "'Georgia', serif",
                fontSize: isMobile ? '3rem' : '4rem',
                color: '#c9a96e', fontWeight: '300',
                lineHeight: 1, marginBottom: '12px' }}>
                {counts[idx]}{stat.suffix}
              </div>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.72rem',
                letterSpacing: '2px', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: '1.6' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: WORKING PROCESS */}
      <section style={{
        padding: isMobile ? '60px 24px' : '100px 80px',
        background: '#faf8f5', boxSizing: 'border-box',
      }}>
        <p style={{ textAlign: 'center', fontSize: '0.6rem', letterSpacing: '5px',
          textTransform: 'uppercase', color: '#c9a96e',
          marginBottom: '16px', fontFamily: 'sans-serif' }}>
          Working Process
        </p>
        <h2 style={{ textAlign: 'center', fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.6rem' : '2.2rem', fontWeight: '300',
          color: '#1a1a1a', margin: '0 0 60px', letterSpacing: '1px' }}>
          How we bring your vision to life
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '32px' : '2px',
          maxWidth: '1100px', margin: '0 auto',
        }}>
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} style={{
              background: '#fff', padding: '36px 28px',
              textAlign: 'center', position: 'relative',
              transition: 'box-shadow 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.58rem',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: '#c9a96e', marginBottom: '16px' }}>
                {step.num}
              </p>
              <div style={{ fontSize: '2rem', color: '#1a1a1a', marginBottom: '18px', lineHeight: 1 }}>
                {step.icon}
              </div>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1.1rem',
                fontWeight: '400', color: '#1a1a1a', margin: '0 0 14px', letterSpacing: '1px' }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.78rem',
                color: '#888', lineHeight: '1.8', margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: CTA BANNER */}
      <section style={{ position: 'relative', overflow: 'hidden',
        padding: isMobile ? '80px 24px' : '100px 60px', boxSizing: 'border-box' }}>
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80"
          alt="CTA"
          style={{ position: 'absolute', inset: 0, width: '100%',
            height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1,
          background: 'rgba(0,0,0,0.65)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
            color: '#c9a96e', marginBottom: '16px', fontFamily: 'sans-serif' }}>
            Get In Touch
          </p>
          <h2 style={{ fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '1.8rem' : '2.8rem',
            fontWeight: '300', margin: '0 0 20px', letterSpacing: '2px' }}>
            Ready to start your project?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'sans-serif',
            fontSize: '0.88rem', lineHeight: '1.9', marginBottom: '36px',
            maxWidth: '500px', margin: '0 auto 36px' }}>
            From interior design to full building construction — we handle it all under one roof.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              padding: '14px 36px', background: '#c9a96e',
              color: '#fff', textDecoration: 'none',
              fontSize: '0.62rem', letterSpacing: '3px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
              transition: 'background 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#b8935a'}
              onMouseLeave={e => e.currentTarget.style.background = '#c9a96e'}>
              Book a Consultation
            </Link>
            <Link to="/about/gallery" style={{
              padding: '14px 36px', background: 'transparent',
              color: '#fff', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.5)',
              fontSize: '0.62rem', letterSpacing: '3px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
              View Gallery
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Overview;