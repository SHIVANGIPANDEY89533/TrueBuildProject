import React, { useEffect, useState } from 'react';
import { ROTATING_WORDS } from '../constants/data';

const MarqueeText = () => {
  const [index,   setIndex]   = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      // Fade out → swap word → fade in
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: '90px 0 80px', maxWidth: '860px' }}>
      {/* Section label */}
      <p style={{
        fontSize: '0.65rem', letterSpacing: '5px',
        textTransform: 'uppercase', color: '#bbb',
        marginBottom: '28px', fontFamily: 'sans-serif',
      }}>
        choose us
      </p>

      {/* Main rotating sentence */}
      <h2 style={{
        fontSize:   'clamp(1.6rem, 3.5vw, 2.8rem)',
        fontWeight: '300', color: '#1a1a1a',
        lineHeight:  '1.6', letterSpacing: '0.5px', margin: 0,
      }}>
        Infuse artistry and a unique personality into your space with exquisite{' '}
        {/* Rotating gold word with fade animation */}
        <span style={{
          color:      '#c9a96e',
          fontStyle:  'italic',
          opacity:     visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          display:    'inline-block',
        }}>
          {ROTATING_WORDS[index]}.
        </span>
      </h2>
    </div>
  );
};

export default MarqueeText;