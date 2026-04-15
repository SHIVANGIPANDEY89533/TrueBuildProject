import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants/data';


const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/truebuild_project?utm_source=qr&igsh=ZmpjM2hteXl5NGxt' },
  { label: 'Facebook',  href: 'https://www.facebook.com/people/TrueBuild-Projects/61583582405966/' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/truebuild-projects/' },
];


const Footer = () => (
  <footer style={{
    background: '#111', color: '#888',
    padding: '80px 60px 36px',
    boxSizing: 'border-box',
  }}>
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '50px', marginBottom: '60px',
    }}>

      {/* Left — Brand + Contact */}
      <div style={{ maxWidth: '320px' }}>
        <h4 style={{
          fontFamily: "'Georgia', serif", color: '#fff',
          fontSize: '1rem', letterSpacing: '5px',
          textTransform: 'uppercase', marginBottom: '24px', fontWeight: '300',
        }}>
          TrueBuild Projects
        </h4>

        {/* Address 1 */}
        <p style={{ fontSize: '0.6rem', letterSpacing: '3px',
          textTransform: 'uppercase', color: '#c9a96e',
          fontFamily: 'sans-serif', margin: '0 0 4px' }}>
          Address 1
        </p>
        <p style={{ fontSize: '0.78rem', lineHeight: '2',
          margin: '0 0 16px', fontFamily: 'sans-serif', color: '#666' }}>
          KH-576M, Durga Enclave, GB Nagar,<br />
          Ghaziabad, Uttar Pradesh — 201009
        </p>

        {/* Address 2 */}
        <p style={{ fontSize: '0.6rem', letterSpacing: '3px',
          textTransform: 'uppercase', color: '#c9a96e',
          fontFamily: 'sans-serif', margin: '0 0 4px' }}>
          Address 2
        </p>
        <p style={{ fontSize: '0.78rem', lineHeight: '2',
          margin: '0 0 20px', fontFamily: 'sans-serif', color: '#666' }}>
          Village Agraula Kalan, Near Chhoti Masjid,<br />
          Hasanpur, Amroha, Uttar Pradesh — 244241
        </p>

        {/* Email */}
        <a href="mailto:truebuildproject@gmail.com"
          style={{ display: 'block', fontFamily: 'sans-serif',
            fontSize: '0.78rem', color: '#666',
            textDecoration: 'none', lineHeight: '2.2',
            transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = '#c9a96e'}
          onMouseLeave={e => e.target.style.color = '#666'}>
          truebuildproject@gmail.com
        </a>

        {/* Phone 1 */}
        <a href="tel:+917055185315"
          style={{ display: 'block', fontFamily: 'sans-serif',
            fontSize: '0.78rem', color: '#666',
            textDecoration: 'none', lineHeight: '2.2',
            transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = '#c9a96e'}
          onMouseLeave={e => e.target.style.color = '#666'}>
          +91 70551 85315
        </a>

        {/* Phone 2 */}
        <a href="tel:+917217310020"
          style={{ display: 'block', fontFamily: 'sans-serif',
            fontSize: '0.78rem', color: '#666',
            textDecoration: 'none', lineHeight: '2.2',
            transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = '#c9a96e'}
          onMouseLeave={e => e.target.style.color = '#666'}>
          +91 72173 10020
        </a>

        {/* Social Media Icons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          {SOCIAL_LINKS.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}>
              <span style={{
                display: 'inline-block', padding: '6px 14px',
                border: '1px solid #2a2a2a',
                color: '#555', fontFamily: 'sans-serif',
                fontSize: '0.58rem', letterSpacing: '2px',
                textTransform: 'uppercase', transition: 'all 0.3s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.target.style.borderColor='#c9a96e'; e.target.style.color='#c9a96e'; }}
                onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#555'; }}>
                {s.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Right — Quick Links */}
      <div>
        <h5 style={{
          color: '#c9a96e', fontSize: '0.62rem',
          letterSpacing: '4px', textTransform: 'uppercase',
          marginBottom: '22px', fontWeight: '400',
        }}>
          Quick Links
        </h5>
        {NAV_LINKS.map(link => (
          <Link key={link.path} to={link.path} style={{
            display: 'block', color: '#666',
            textDecoration: 'none', fontSize: '0.78rem',
            marginBottom: '12px', letterSpacing: '1.5px',
            fontFamily: 'sans-serif',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#c9a96e'}
            onMouseLeave={e => e.target.style.color = '#666'}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>

    {/* ── Bottom copyright bar ── */}
    <div style={{
      borderTop: '1px solid #222', paddingTop: '24px',
      textAlign: 'center', fontSize: '0.7rem',
      color: '#3a3a3a', letterSpacing: '1.5px',
      fontFamily: 'sans-serif', lineHeight: '2',
    }}>
      <div>© 2026 TrueBuild Projects. All rights reserved.</div>
      <div style={{ marginTop: '6px', fontSize: '0.65rem', color: '#2a2a2a' }}>
        Built by{' '}
        <a
          href="https://www.techquantum.in/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#c9a96e',
            textDecoration: 'none',
            letterSpacing: '1px',
            transition: 'color 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#c9a96e'}
        >
          CyvantaTechQuantum Pvt. Ltd.
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;