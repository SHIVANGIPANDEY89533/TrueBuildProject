import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ─────────────────────────────────────────────
// ALL CATEGORIES from truebuildproject.in/bespoke-furniture
// ─────────────────────────────────────────────
const CATEGORIES = [
  'All', 'Armchair', 'Artwork', 'Bed', 'Bookshelf',
  'Beach House Collection', 'Bench', 'Coffee Table',
  'Console', 'Crockery Unit', 'Dining Chair',
  'Dining Table', 'Lamp', 'Mirror',
  'Sculptures', 'Side Table', 'Sofa', 'Screens', 'Totems',
];

// ─────────────────────────────────────────────
// PRODUCTS DATA
// ─────────────────────────────────────────────
const PRODUCTS = [
  // ARMCHAIR
  { id: 1,  name: 'Antique Handrest Armchair',                   category: 'Armchair',            img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80' },
  { id: 2,  name: 'Beige Cushioned Lounge Chair',                category: 'Armchair',            img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  { id: 3,  name: 'Chic Black and White Armchair',               category: 'Armchair',            img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  { id: 4,  name: 'Comfortable Swivel Armchair',                 category: 'Armchair',            img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80' },
  { id: 5,  name: 'Cozy Beige Lounge Chair',                     category: 'Armchair',            img: 'https://images.unsplash.com/photo-1571079520814-c2840ce6ec7b?w=600&q=80' },
  { id: 6,  name: 'Designer Armchair with Metal Touches',        category: 'Armchair',            img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80' },
  { id: 7,  name: 'Plush Fluffy Armchair',                       category: 'Armchair',            img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80' },
  { id: 8,  name: 'Vibrant Floral Accent Chair',                 category: 'Armchair',            img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
  // ARTWORK
  { id: 9,  name: 'Chair of Thoughts',                           category: 'Artwork',             img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80' },
  { id: 10, name: 'Chandelier Chronicles',                       category: 'Artwork',             img: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=600&q=80' },
  { id: 11, name: 'Echoes of the Earth',                         category: 'Artwork',             img: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600&q=80' },
  { id: 12, name: 'Layers of Imperfection',                      category: 'Artwork',             img: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&q=80' },
  { id: 13, name: 'Tools of Expression',                         category: 'Artwork',             img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  // BED
  { id: 14, name: 'Minimalist Inviting Bed',                     category: 'Bed',                 img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80' },
  { id: 15, name: 'Contemporary White Haven Bed',                category: 'Bed',                 img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80' },
  { id: 16, name: 'Luxe Grey Velvet Bed',                        category: 'Bed',                 img: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80' },
  { id: 17, name: 'Opulent Beige Classic Bed',                   category: 'Bed',                 img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80' },
  { id: 18, name: 'Dramatic Black and Grey Bookshelf',           category: 'Bookshelf',           img: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=600&q=80' },
  { id: 19, name: 'Flowing Organic Shape Bookcase',              category: 'Bookshelf',           img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
  { id: 20, name: 'Rustic Bookshelf',                            category: 'Bookshelf',           img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80' },
  // BEACH HOUSE
  { id: 21, name: 'Chic Lounge with Wooden Shelves',             category: 'Beach House Collection', img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80' },
  { id: 22, name: 'Earthen Luxe Lounge',                        category: 'Beach House Collection', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80' },
  { id: 23, name: 'Grand Space with Modular Seating',           category: 'Beach House Collection', img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80' },
  // BENCH
  { id: 24, name: 'Artisanal Stone Bench',                       category: 'Bench',               img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  { id: 25, name: 'Emerald Green Bench',                         category: 'Bench',               img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  { id: 26, name: 'Raw Elegance Bench',                          category: 'Bench',               img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80' },
  // COFFEE TABLE
  { id: 27, name: 'Organic Shape Black Rock Table',              category: 'Coffee Table',        img: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&q=80' },
  { id: 28, name: 'White Rock Coffee Table',                     category: 'Coffee Table',        img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
  { id: 29, name: 'Chic Fluted Grey Coffee Table',               category: 'Coffee Table',        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  { id: 30, name: 'High-End Black Oval Coffee Table',            category: 'Coffee Table',        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  { id: 31, name: 'Luxe Plateau',                                category: 'Coffee Table',        img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80' },
  // CONSOLE
  { id: 32, name: 'Bold Black Console Table',                    category: 'Console',             img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80' },
  { id: 33, name: 'Eye-catching Red Console',                    category: 'Console',             img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80' },
  { id: 34, name: 'Grey Marble Elegant Console',                 category: 'Console',             img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80' },
  { id: 35, name: 'Marble-Wood Console with Planter',           category: 'Console',             img: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&q=80' },
  { id: 36, name: 'Organic Modern Rust Console',                 category: 'Console',             img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  // CROCKERY UNIT
  { id: 37, name: 'Abstract Organic Shape Crockery Unit',        category: 'Crockery Unit',       img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
  { id: 38, name: 'Chic Fluted Crockery Display',                category: 'Crockery Unit',       img: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=600&q=80' },
  { id: 39, name: 'Elegant Crockery Unit Design',                category: 'Crockery Unit',       img: 'https://images.unsplash.com/photo-1599619585752-c3edb42a414c?w=600&q=80' },
  // DINING CHAIR
  { id: 40, name: 'Rich Burgundy Dining Chair',                  category: 'Dining Chair',        img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80' },
  { id: 41, name: 'Opulent Green Velvet Chair',                  category: 'Dining Chair',        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  { id: 42, name: 'Stylish Sage Green Dining Chair',             category: 'Dining Chair',        img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80' },
  // DINING TABLE
  { id: 43, name: 'Artistic Abstract Dining Table',              category: 'Dining Table',        img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80' },
  { id: 44, name: 'Regal Wooden Gold Dining Table',              category: 'Dining Table',        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  { id: 45, name: 'Minimalist Oval Dining Table',                category: 'Dining Table',        img: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&q=80' },
  { id: 46, name: 'Signature Dining Table',                      category: 'Dining Table',        img: 'https://images.unsplash.com/photo-1571079520814-c2840ce6ec7b?w=600&q=80' },
  // LAMP
  { id: 47, name: 'Chic Floor Lamp with Bookshelf',              category: 'Lamp',                img: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80' },
  { id: 48, name: 'Sleek Elegant Lamp',                          category: 'Lamp',                img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80' },
  // MIRROR
  { id: 49, name: 'Modern Dresser Mirror',                       category: 'Mirror',              img: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=600&q=80' },
  { id: 50, name: 'Curved Organic Shape Mirror',                 category: 'Mirror',              img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 51, name: 'Luxe Mirror with Metal Accents',              category: 'Mirror',              img: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&q=80' },
  // SCULPTURES
  { id: 52, name: "Apollo's Contemplation",                      category: 'Sculptures',          img: 'https://images.unsplash.com/photo-1544413660-299165566b1d?w=600&q=80' },
  { id: 53, name: 'Grace of Antiquity',                          category: 'Sculptures',          img: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=600&q=80' },
  { id: 54, name: 'Resonant Echoes',                             category: 'Sculptures',          img: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&q=80' },
  { id: 55, name: 'Whispering Stones',                           category: 'Sculptures',          img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80' },
  // SIDE TABLE
  { id: 56, name: 'Antique Oak Side Table',                      category: 'Side Table',          img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
  { id: 57, name: 'Organic Rock Side Table',                     category: 'Side Table',          img: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&q=80' },
  { id: 58, name: 'Vintage Oak Round Side Table',                category: 'Side Table',          img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80' },
  // SOFA
  { id: 59, name: 'Chic Comfy Sofa',                             category: 'Sofa',                img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  { id: 60, name: 'Contemporary Sofa with Brass Highlights',     category: 'Sofa',                img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80' },
  { id: 61, name: 'Plush Cloud-Style Sofa',                      category: 'Sofa',                img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80' },
  { id: 62, name: 'Stylish Curved Sofa',                         category: 'Sofa',                img: 'https://images.unsplash.com/photo-1571079520814-c2840ce6ec7b?w=600&q=80' },
  { id: 63, name: 'Trendy Animal Print Sofa',                    category: 'Sofa',                img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80' },
  { id: 64, name: 'Sophisticated Grey Sofa with Brass Legs',     category: 'Sofa',                img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80' },
  // SCREENS
  { id: 65, name: 'Black Wooden Screen with Display Shelf',      category: 'Screens',             img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80' },
  { id: 66, name: 'Elegant White Stone Screen',                  category: 'Screens',             img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80' },
  { id: 67, name: 'Lattice Mirage',                              category: 'Screens',             img: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&q=80' },
  { id: 68, name: 'Prism Cascade',                               category: 'Screens',             img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80' },
  // TOTEMS
  { id: 69, name: 'Luxury Artistic Stone and Metal Totems',      category: 'Totems',              img: 'https://images.unsplash.com/photo-1544413660-299165566b1d?w=600&q=80' },
  { id: 70, name: 'Lumina Spire',                                category: 'Totems',              img: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=600&q=80' },
  { id: 71, name: 'Seraphic Prism',                              category: 'Totems',              img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80' },
  { id: 72, name: 'Aurora Monolith',                             category: 'Totems',              img: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&q=80' },
];

// ─────────────────────────────────────────────
// ENQUIRY MODAL
// ─────────────────────────────────────────────
const EnquiryModal = ({ product, onClose }) => {
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', message: '' });
  const [sent,    setSent]    = useState(false);
  const overlayRef            = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 4000,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px', boxSizing: 'border-box',
      }}>
      <div style={{
        background: '#fff', maxWidth: '540px', width: '100%',
        maxHeight: '90vh', overflowY: 'auto',
        position: 'relative',
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '20px',
          background: 'none', border: 'none',
          fontSize: '1.4rem', cursor: 'pointer', color: '#aaa',
          lineHeight: 1,
        }}>✕</button>

        {!sent ? (
          <div style={{ padding: '40px 36px 36px' }}>
            {/* Product preview */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '28px',
              alignItems: 'center' }}>
              <img src={product.img} alt={product.name}
                style={{ width: '80px', height: '80px',
                  objectFit: 'cover', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '0.55rem', letterSpacing: '3px',
                  textTransform: 'uppercase', color: '#c9a96e',
                  fontFamily: 'sans-serif', margin: '0 0 6px' }}>
                  {product.category}
                </p>
                <h4 style={{ fontFamily: "'Georgia', serif", fontSize: '1rem',
                  fontWeight: '300', color: '#1a1a1a', margin: 0 }}>
                  {product.name}
                </h4>
              </div>
            </div>

            <p style={{ fontSize: '0.6rem', letterSpacing: '4px',
              textTransform: 'uppercase', color: '#c9a96e',
              marginBottom: '8px', fontFamily: 'sans-serif' }}>
              Enquire Now
            </p>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1.4rem',
              fontWeight: '300', color: '#1a1a1a', margin: '0 0 24px' }}>
              Get in touch to own this piece
            </h3>

            <form onSubmit={handleSubmit}>
              {[
                { key: 'name',    placeholder: 'Your Name *',         type: 'text',  required: true  },
                { key: 'email',   placeholder: 'Email Address *',     type: 'email', required: true  },
                { key: 'phone',   placeholder: 'Phone Number',        type: 'tel',   required: false },
              ].map(f => (
                <input key={f.key} type={f.type} placeholder={f.placeholder}
                  required={f.required}
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  style={{
                    width: '100%', padding: '12px 14px',
                    border: '1px solid #e8e3db', outline: 'none',
                    fontSize: '0.88rem', fontFamily: 'sans-serif',
                    color: '#333', background: '#fdfcfb',
                    boxSizing: 'border-box', marginBottom: '12px',
                  }}
                />
              ))}
              <textarea placeholder="Additional message or customization request..."
                rows={3} value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                style={{
                  width: '100%', padding: '12px 14px',
                  border: '1px solid #e8e3db', outline: 'none',
                  fontSize: '0.88rem', fontFamily: 'sans-serif',
                  color: '#333', background: '#fdfcfb',
                  boxSizing: 'border-box', marginBottom: '20px',
                  resize: 'vertical', minHeight: '80px',
                }}
              />
              <button type="submit" style={{
                width: '100%', padding: '14px',
                background: '#1a1a1a', color: '#fff',
                border: 'none', cursor: 'pointer',
                fontSize: '0.65rem', letterSpacing: '3px',
                textTransform: 'uppercase', fontFamily: 'sans-serif',
                transition: 'background 0.3s',
              }}
                onMouseEnter={e => e.target.style.background = '#c9a96e'}
                onMouseLeave={e => e.target.style.background = '#1a1a1a'}>
                Send Enquiry
              </button>
            </form>
          </div>
        ) : (
          /* Success state */
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✓</div>
            <p style={{ fontSize: '0.6rem', letterSpacing: '4px',
              textTransform: 'uppercase', color: '#c9a96e',
              marginBottom: '12px', fontFamily: 'sans-serif' }}>
              Thank You
            </p>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1.4rem',
              fontWeight: '300', color: '#1a1a1a', margin: '0 0 14px' }}>
              Enquiry received!
            </h3>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem',
              color: '#888', lineHeight: '1.8', margin: '0 0 28px' }}>
              Our team will get in touch with you shortly regarding <strong>{product.name}</strong>.
            </p>
            <button onClick={onClose} style={{
              padding: '12px 32px', background: '#1a1a1a',
              color: '#fff', border: 'none', cursor: 'pointer',
              fontSize: '0.62rem', letterSpacing: '3px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
            }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────
const ProductCard = ({ product, onEnquire }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', overflow: 'hidden',
        boxShadow: hovered
          ? '0 8px 40px rgba(0,0,0,0.12)'
          : '0 2px 12px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s',
        display: 'flex', flexDirection: 'column',
      }}>

      {/* Image */}
      <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
        <img src={product.img} alt={product.name} style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transition: 'transform 0.6s ease',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
        }} />
        {/* Hover overlay with enquire button */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <button onClick={() => onEnquire(product)} style={{
            padding: '11px 28px',
            background: '#c9a96e', color: '#fff',
            border: 'none', cursor: 'pointer',
            fontSize: '0.62rem', letterSpacing: '3px',
            textTransform: 'uppercase', fontFamily: 'sans-serif',
            transition: 'background 0.3s',
            transform: hovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
            onMouseLeave={e => e.currentTarget.style.background = '#c9a96e'}>
            Enquire Now
          </button>
        </div>
        {/* Category badge */}
        <span style={{
          position: 'absolute', top: '10px', left: '10px',
          background: 'rgba(255,255,255,0.92)',
          padding: '3px 9px', fontSize: '0.52rem',
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: '#888', fontFamily: 'sans-serif',
          opacity: hovered ? 0 : 1,
          transition: 'opacity 0.2s',
        }}>
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px 20px', flex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <h3 style={{ fontFamily: "'Georgia', serif", fontWeight: '300',
          fontSize: '0.92rem', color: '#1a1a1a', margin: '0 0 14px',
          lineHeight: '1.4', letterSpacing: '0.3px' }}>
          {product.name}
        </h3>
        <button onClick={() => onEnquire(product)} style={{
          alignSelf: 'flex-start',
          background: 'none', border: 'none',
          fontSize: '0.6rem', letterSpacing: '2px',
          textTransform: 'uppercase', fontFamily: 'sans-serif',
          color: '#c9a96e', cursor: 'pointer', padding: 0,
          borderBottom: '1px solid #c9a96e', paddingBottom: '2px',
        }}>
          Get in Touch →
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
const Bespoke = () => {
  const [isMobile,       setIsMobile]       = useState(window.innerWidth < 768);
  const [activeCategory, setActiveCategory] = useState('All');
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [visibleCount,   setVisibleCount]   = useState(12);
  const categoryBarRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, searchQuery]);

  const filtered = PRODUCTS.filter(p => {
    const matchCat    = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const visible = filtered.slice(0, visibleCount);

  // Scroll category into view on mobile
  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
  };

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <div style={{ position: 'relative', height: isMobile ? '50vh' : '65vh', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80"
          alt="Bespoke Furniture"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.72))' }} />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center', padding: '0 20px',
        }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', marginBottom: '16px' }}>
            Luxury Meets Convenience
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300', letterSpacing: '6px',
            textTransform: 'uppercase', margin: '0 0 16px' }}>
            Bespoke Furniture
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 20px' }} />
          <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '0.9rem' : '1.05rem', fontWeight: '300',
            maxWidth: '520px', lineHeight: '1.9' }}>
            Get in touch to own our top-tier, exclusive products — each piece crafted with unmatched artistry.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SEARCH BAR
      ══════════════════════════════════════ */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #f0ebe3',
        padding: isMobile ? '16px 20px' : '20px 60px',
        boxSizing: 'border-box',
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
          <span style={{
            position: 'absolute', left: '14px', top: '50%',
            transform: 'translateY(-50%)', color: '#bbb', fontSize: '0.9rem',
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search furniture, art, décor..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '12px 14px 12px 38px',
              border: '1px solid #e8e3db', outline: 'none',
              fontSize: '0.85rem', fontFamily: 'sans-serif',
              color: '#333', background: '#fdfcfb',
              boxSizing: 'border-box',
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{
              position: 'absolute', right: '12px', top: '50%',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none',
              cursor: 'pointer', color: '#bbb', fontSize: '1rem',
            }}>✕</button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          CATEGORY FILTER BAR (Horizontal Scroll)
      ══════════════════════════════════════ */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #f0ebe3',
        position: 'sticky', top: '80px', zIndex: 100,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}>
        <div
          ref={categoryBarRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '0',
            padding: isMobile ? '0 12px' : '0 40px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}>
          {CATEGORIES.map(cat => {
            const count = cat === 'All'
              ? PRODUCTS.length
              : PRODUCTS.filter(p => p.category === cat).length;
            return (
              <button key={cat} onClick={() => handleCategoryClick(cat)} style={{
                padding: isMobile ? '14px 16px' : '16px 22px',
                background: 'none',
                borderBottom: activeCategory === cat
                  ? '2px solid #c9a96e' : '2px solid transparent',
                color: activeCategory === cat ? '#1a1a1a' : '#999',
                border: 'none',
                borderBottom: activeCategory === cat
                  ? '2px solid #c9a96e' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: isMobile ? '0.6rem' : '0.62rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
                whiteSpace: 'nowrap',
                fontWeight: activeCategory === cat ? '600' : '400',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}>
                {cat}
                <span style={{
                  marginLeft: '6px',
                  fontSize: '0.55rem',
                  color: activeCategory === cat ? '#c9a96e' : '#bbb',
                }}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════
          PRODUCT GRID
      ══════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '32px 16px 60px' : '48px 60px 80px',
        boxSizing: 'border-box',
      }}>
        {/* Results count */}
        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '28px',
          maxWidth: '1400px', margin: '0 auto 28px' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.72rem',
            color: '#aaa', letterSpacing: '1px' }}>
            Showing <strong style={{ color: '#1a1a1a' }}>{Math.min(visibleCount, filtered.length)}</strong> of{' '}
            <strong style={{ color: '#1a1a1a' }}>{filtered.length}</strong> items
            {activeCategory !== 'All' && (
              <> in <span style={{ color: '#c9a96e' }}>{activeCategory}</span></>
            )}
          </p>
          {activeCategory !== 'All' && (
            <button onClick={() => setActiveCategory('All')} style={{
              background: 'none', border: '1px solid #ddd',
              padding: '6px 14px', cursor: 'pointer',
              fontSize: '0.6rem', letterSpacing: '2px',
              textTransform: 'uppercase', fontFamily: 'sans-serif', color: '#888',
            }}>
              Clear Filter ✕
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ fontFamily: "'Georgia', serif", fontSize: '1.1rem',
              color: '#bbb', letterSpacing: '2px' }}>
              No results found for "{searchQuery}"
            </p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} style={{
              marginTop: '20px', padding: '12px 28px',
              background: '#1a1a1a', color: '#fff', border: 'none',
              cursor: 'pointer', fontSize: '0.65rem', letterSpacing: '3px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
            }}>
              Clear Search
            </button>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? 'repeat(2, 1fr)'
                : 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: isMobile ? '10px' : '16px',
              maxWidth: '1400px', margin: '0 auto',
            }}>
              {visible.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEnquire={setEnquiryProduct}
                />
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filtered.length && (
              <div style={{ textAlign: 'center', marginTop: '48px' }}>
                <button onClick={() => setVisibleCount(prev => prev + 12)} style={{
                  padding: '14px 48px',
                  background: 'none', border: '1px solid #1a1a1a',
                  color: '#1a1a1a', cursor: 'pointer',
                  fontSize: '0.65rem', letterSpacing: '3px',
                  textTransform: 'uppercase', fontFamily: 'sans-serif',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background='#1a1a1a'; e.currentTarget.style.color='#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color='#1a1a1a'; }}>
                  Load More ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ══════════════════════════════════════
          CRAFTSMANSHIP SECTION
      ══════════════════════════════════════ */}
      <section style={{
        background: '#1a1a1a',
        padding: isMobile ? '60px 24px' : '80px 80px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '40px' : '80px',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}>
        <div>
          <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
            color: '#c9a96e', marginBottom: '16px', fontFamily: 'sans-serif' }}>
            Our Promise
          </p>
          <h2 style={{ fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '1.8rem' : '2.4rem',
            fontWeight: '300', color: '#fff',
            margin: '0 0 24px', lineHeight: '1.4' }}>
            Every piece tells<br />a story
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', marginBottom: '24px' }} />
          <p style={{ fontFamily: "'Georgia', serif", fontSize: '1rem',
            color: 'rgba(255,255,255,0.65)', lineHeight: '2', fontWeight: '300',
            marginBottom: '16px' }}>
            Each piece in our bespoke collection is designed and crafted with meticulous attention to detail. From the choice of materials to the final finish, no compromise is made.
          </p>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: '1rem',
            color: 'rgba(255,255,255,0.65)', lineHeight: '2', fontWeight: '300',
            marginBottom: '32px' }}>
            Customization is at the heart of what we do. Every item can be tailored to your exact dimensions, material preferences and colour palette.
          </p>
          {[
            'Fully customizable dimensions & materials',
            'Global sourcing — Paris, Milan, New York',
            'Expert craftsmen with 13+ years experience',
            'White-glove delivery and installation service',
          ].map((pt, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px',
              alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ color: '#c9a96e', marginTop: '3px', flexShrink: 0 }}>◆</span>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: '1.7' }}>
                {pt}
              </p>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
          {[
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
          ].map((src, i) => (
            <img key={i} src={src} alt={`Craft ${i}`}
              style={{ width: '100%', height: isMobile ? '130px' : '200px',
                objectFit: 'cover', display: 'block' }}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section style={{
        background: '#f5f0ea',
        padding: isMobile ? '60px 24px' : '80px 60px',
        textAlign: 'center', boxSizing: 'border-box',
      }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: '#c9a96e', marginBottom: '14px', fontFamily: 'sans-serif' }}>
          Commission a Piece
        </p>
        <h2 style={{ fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.6rem' : '2rem',
          fontWeight: '300', color: '#1a1a1a', margin: '0 0 16px', letterSpacing: '1px' }}>
          Can't find what you're looking for?
        </h2>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: '#888',
          lineHeight: '1.9', margin: '0 auto 32px', maxWidth: '480px' }}>
          We design bespoke furniture from scratch — tailored to your space, your style and your vision.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{
            padding: '13px 40px', background: '#1a1a1a', color: '#fff',
            textDecoration: 'none', fontSize: '0.62rem',
            letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
            transition: 'background 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
            onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
            Commission a Custom Piece
          </Link>
          <Link to="/shop" style={{
            padding: '13px 36px', background: 'transparent', color: '#1a1a1a',
            textDecoration: 'none', border: '1px solid #ddd',
            fontSize: '0.62rem', letterSpacing: '3px',
            textTransform: 'uppercase', fontFamily: 'sans-serif',
          }}>
            Visit Shop →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ENQUIRY MODAL
      ══════════════════════════════════════ */}
      {enquiryProduct && (
        <EnquiryModal
          product={enquiryProduct}
          onClose={() => setEnquiryProduct(null)}
        />
      )}

    </main>
  );
};

export default Bespoke;