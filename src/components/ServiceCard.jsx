import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, img }) => {
  const [hovered, setHovered] = useState(false);

  // Map title to correct route
  const getPath = (title) => {
    const t = title.toLowerCase();
    if (t.includes('architectural')) return '/services/architectural';
    if (t.includes('interior'))      return '/services/interiors';
    if (t.includes('bespoke'))       return '/bespoke';
    return '/services';
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        height: '520px',
        cursor: 'pointer',
      }}
    >
      {/* Background Image */}
      <img
        src={img}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.6s ease',
        }}
      />

      {/* Dark overlay — darker on hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: hovered
          ? 'rgba(0,0,0,0.55)'
          : 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 50%)',
        transition: 'background 0.4s ease',
      }} />

      {/* Bottom content — Title always visible */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
      }}>
        {/* Title */}
        <h3 style={{
          color: '#fff',
          fontFamily: "'Georgia', serif",
          fontWeight: '300',
          fontSize: '1.1rem',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          margin: 0,
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 0.4s ease',
        }}>
          {title}
        </h3>

        {/* Gold line */}
        <div style={{
          width: hovered ? '40px' : '30px',
          height: '1px',
          background: '#c9a96e',
          transition: 'width 0.4s ease',
        }} />

        {/* Know More Button — slides up on hover */}
        <Link
          to={getPath(title)}
          style={{
            display: 'inline-block',
            padding: '11px 28px',
            background: '#1a1a1a',
            color: '#fff',
            border: '2px solid #fff',
            textDecoration: 'none',
            fontSize: '0.62rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            fontWeight: '700',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s ease',
            pointerEvents: hovered ? 'auto' : 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#c9a96e';
            e.currentTarget.style.borderColor = '#c9a96e';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#1a1a1a';
            e.currentTarget.style.borderColor = '#fff';
          }}
        >
          Know More
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;