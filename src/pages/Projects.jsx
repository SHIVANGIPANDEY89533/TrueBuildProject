import React from 'react';
import { PROJECTS } from '../constants/data';

const Projects = () => (
  <main style={{ paddingTop: '90px', minHeight: '100vh', background: '#faf8f5' }}>
    <div style={{ padding: '70px 60px 50px' }}>
      <p style={{
        fontSize: '0.62rem', letterSpacing: '5px',
        textTransform: 'uppercase', color: '#c9a96e',
        marginBottom: '14px', fontFamily: 'sans-serif',
      }}>Portfolio</p>
      <h1 style={{
        fontFamily: "'Georgia', serif",
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: '300', letterSpacing: '5px',
        color: '#1a1a1a', textTransform: 'uppercase', margin: 0,
      }}>Our Projects</h1>
    </div>

    {/* Projects grid */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
      gap: '4px', padding: '0 60px 80px',
    }}>
      {PROJECTS.map(p => (
        <div key={p.id} style={{
          position: 'relative', height: '340px',
          overflow: 'hidden', cursor: 'pointer',
        }}
          onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
          <img src={p.img} alt={p.title} style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            transition: 'transform 0.6s ease',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
            padding: '30px 24px',
          }}>
            <p style={{
              color: '#bbb', fontSize: '0.6rem',
              letterSpacing: '3px', textTransform: 'uppercase',
              margin: '0 0 6px', fontFamily: 'sans-serif',
            }}>{p.category}</p>
            <p style={{
              color: '#fff', fontFamily: "'Georgia', serif",
              fontSize: '1.1rem', fontWeight: '300',
              letterSpacing: '3px', textTransform: 'uppercase', margin: 0,
            }}>{p.title}</p>
          </div>
        </div>
      ))}
    </div>
  </main>
);

export default Projects;